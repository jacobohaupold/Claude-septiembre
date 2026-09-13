// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/descuentos.js
/* El descuento es lo único de la web pintado en terracota. Esta prueba defiende esa regla y las
   tres cosas que se rompen cuando se toca:
     1. que en cada producto se vea el descuento, y sobre todo el de la mensualidad, que era el
        que no se veía por ninguna parte fuera de la ficha;
     2. que no se repita el mismo descuento dos veces en la misma tarjeta (pasó: la chapa de la
        esquina decía «−25 %» y la píldora de debajo repetía «−25 %»);
     3. que la fila de tarjetas siga alineada. La píldora ocupa sitio en el flujo, así que una
        tarjeta sin chapa empezaba 26 px más arriba que sus vecinas.
   Y que la animación del brillo desaparezca con prefers-reduced-motion. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const PCT = 20;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.avif': 'image/avif' };

function servidor() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    if (p === '/api/catalog.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end(`window.NOCTA_CFG={pricing:{sub_pct:${PCT},multi:{2:0,3:0}}};`); }
    let f = path.join(RAIZ, p);
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f = f + '.html';
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
}
// terracota de marca: #C8553D. Se comprueba el tono, no el texto exacto de la regla CSS.
const esTerracota = c => { const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || ''); if (!m) return false;
  const [r, g, b] = [+m[1], +m[2], +m[3]]; return r > 140 && r < 225 && g > 50 && g < 130 && b > 30 && b < 110 && r - b > 60; };

(async () => {
  const srv = servidor(); await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  let fallos = 0, total = 0;
  const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

  const nav = await chromium.launch();
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 1000 } });
  await ctx.addInitScript(() => { try { ['n_pop', 'n_popup', 'n_cookies', 'n_ck'].forEach(k => localStorage.setItem(k, '1')); } catch (e) { } });
  const abre = async (ruta, sel) => { const pg = await ctx.newPage(); await pg.goto(base + ruta, { waitUntil: 'networkidle' });
    await pg.waitForSelector(sel); await pg.waitForTimeout(500);
    await pg.evaluate(() => document.querySelectorAll('.n-mail,.n-ck,[class*="cookie"]').forEach(e => e.remove())); return pg; };

  for (const [nombre, ruta, tarjeta] of [['Portada · lo más vendido', '/', '.n-pm'], ['Catálogo', '/catalogo.html', '.n-pc']]) {
    console.log(`\n${nombre}\n`);
    const pg = await abre(ruta, tarjeta);
    const datos = await pg.evaluate(({ tarjeta }) => [...document.querySelectorAll(tarjeta)].map(c => {
      const marcas = [...c.querySelectorAll('.n-dto')].map(d => ({ t: d.textContent.trim(), bg: getComputedStyle(d).backgroundColor, alto: d.getBoundingClientRect().height,
        px: parseFloat(getComputedStyle(d).fontSize), brillo: getComputedStyle(d).animationName }));
      const n = c.querySelector('.n-pm__i b,.n-pc__t b');
      return { p: n ? n.textContent.trim() : '?', plan: /plan|mensual|semanal/i.test(c.dataset.slug || ''), marcas,
        y: Math.round(c.getBoundingClientRect().top), alto: Math.round(c.getBoundingClientRect().height),
        yNombre: n ? Math.round(n.getBoundingClientRect().top) : 0 };
    }), { tarjeta });

    ok('todas las tarjetas llevan su descuento', datos.every(d => d.plan || d.marcas.length),
      datos.filter(d => !d.plan && !d.marcas.length).map(d => d.p).join(', ') || datos.length + ' tarjetas');
    // La tarjeta enseña UN número y nada más: ni «cada mes» (eso se cuenta en la ficha) ni dos
    // porcentajes distintos peleándose por la atención.
    ok('un solo descuento por tarjeta', datos.every(d => d.marcas.length <= 1), (datos.find(d => d.marcas.length > 1) || {}).p || '');
    ok('en la rejilla no se dice que sea mensualidad', datos.every(d => d.marcas.every(m => !/mes|mensual/i.test(m.t))),
      (datos.find(d => d.marcas.some(m => /mes/i.test(m.t))) || {}).p || '');
    ok(`los productos sueltos cantan el −${PCT} %`, datos.some(d => d.marcas.some(m => m.t === `−${PCT} %`)));
    // El pack lo canta a su manera según la tarjeta: en % sobre el precio tachado en la portada,
    // en euros («ahorra 12 €») en el catálogo. Lo que se exige es que lo cante.
    ok('y los packs cantan el suyo, en % o en euros', datos.some(d => d.marcas.some(m => (/^−\d+ %$/.test(m.t) && m.t !== `−${PCT} %`) || /ahorra/i.test(m.t))));
    ok('el descuento se pinta en terracota', datos.every(d => !d.marcas.length || d.marcas.some(m => esTerracota(m.bg))));
    ok('como mucho una píldora a tope por tarjeta', datos.every(d => d.marcas.filter(m => esTerracota(m.bg) && parseFloat((m.bg.match(/[\d.]+\)$/) || ['1'])[0]) > .5).length <= 1));
    // más grande que una etiqueta normal: al menos 10 px de letra y 20 px de alto
    const min = datos.flatMap(d => d.marcas);
    ok('se lee más grande que una etiqueta cualquiera', min.every(m => m.px >= 10 && m.alto >= 20),
      `mínimo ${Math.min(...min.map(m => m.px))}px / ${Math.min(...min.map(m => m.alto))}px de alto`);
    ok('lleva el brillo suave', min.every(m => m.brillo === 'n-dto-brillo' || !esTerracota(m.bg)));
    ok('y el brillo no crea ninguna caja que desborde', await pg.evaluate(() => [...document.querySelectorAll('.n-dto')].every(d => {
      const a = getComputedStyle(d, '::after'); return a.content === 'none' || a.animationName === 'none'; })));
    // alineación: todas las tarjetas de la primera fila empiezan su nombre a la misma altura
    const fila = datos.filter(d => d.y === datos[0].y);
    const ys = [...new Set(fila.map(d => d.yNombre))];
    ok('la fila no se desalinea por llevar o no chapa', ys.length === 1, fila.length + ' tarjetas · ' + ys.join('/'));
    ok('y todas miden lo mismo', new Set(fila.map(d => d.alto)).size === 1, [...new Set(fila.map(d => d.alto))].join('/'));
    await pg.close();
  }

  console.log('\nFicha de producto\n');
  {
    const pg = await abre('/producto.html?p=duo-poros', '.n-pd__save');
    const d = await pg.evaluate(() => { const s = document.querySelector('.n-pd__save'), f = document.querySelector('.n-pd__segflag');
      const m = e => e && { t: e.textContent.trim(), bg: getComputedStyle(e).backgroundColor, px: parseFloat(getComputedStyle(e).fontSize), alto: e.getBoundingClientRect().height, brillo: getComputedStyle(e).animationName };
      return { save: m(s), flag: m(f) }; });
    ok('«Ahorras X €» está en terracota y no en verde', esTerracota(d.save.bg), d.save.bg);
    ok('y se lee más grande que antes (10 px → 12 px)', d.save.px >= 12 && d.save.alto >= 26, `${d.save.px}px / ${Math.round(d.save.alto)}px`);
    ok('el cartelito de la mensualidad también creció', d.flag.px >= 10.5 && d.flag.alto >= 22, `${d.flag.px}px / ${Math.round(d.flag.alto)}px`);
    ok('los dos llevan el brillo', d.save.brillo === 'n-dto-brillo' && d.flag.brillo === 'n-dto-brillo');
    await pg.close();
  }

  console.log('\nQuien pide menos movimiento no ve ninguno\n');
  {
    const c2 = await nav.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await c2.addInitScript(() => { try { ['n_pop', 'n_popup', 'n_cookies', 'n_ck'].forEach(k => localStorage.setItem(k, '1')); } catch (e) { } });
    const pg = await c2.newPage(); await pg.goto(base + '/catalogo.html', { waitUntil: 'networkidle' });
    await pg.waitForSelector('.n-dto'); await pg.waitForTimeout(300);
    const anim = await pg.evaluate(() => [...document.querySelectorAll('.n-dto:not(.n-dto--2)')].map(d => getComputedStyle(d).animationName));
    ok('el brillo se apaga con prefers-reduced-motion', anim.every(a => a === 'none'), [...new Set(anim)].join(','));
    const pg2 = await c2.newPage(); await pg2.goto(base + '/producto.html?p=duo-poros', { waitUntil: 'networkidle' });
    await pg2.waitForSelector('.n-pd__save'); await pg2.waitForTimeout(300);
    ok('también en la ficha', await pg2.evaluate(() => getComputedStyle(document.querySelector('.n-pd__save')).animationName === 'none'
      && getComputedStyle(document.querySelector('.n-pd__segflag')).animationName === 'none'));
    await c2.close();
  }

  await nav.close(); srv.close();
  console.log(`\n${total - fallos}/${total} comprobaciones correctas sobre los descuentos`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
