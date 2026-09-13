// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/portada.js
/* El héroe de la portada en el teléfono. Lo que se defiende aquí:
     1. el titular va en DOS renglones, el primero con peso y el segundo sin él. El tope de 12ch
        que había antes partía el segundo renglón en dos y dejaba un titular de tres líneas;
     2. el bloque y el botón van centrados de verdad dentro de la caja, no «casi»;
     3. la caja es lo bastante baja para que el pago rápido de la primera fila de «lo más vendido»
        entre en pantalla CON la barra de Safari puesta, que es donde se veía cortado. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.avif': 'image/avif' };
// Se mide sobre la ventana ÚTIL, no sobre la nominal: Safari en iPhone se queda con la barra de
// direcciones y la de pestañas, y es justo ahí donde se veía cortado el pago rápido. Un 390×844
// de catálogo deja unos 735 px de alto de verdad.

function servidor() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    if (p === '/api/catalog.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); return res.end('window.NOCTA_CFG={pricing:{sub_pct:20,multi:{2:0,3:0}}};'); }
    let f = path.join(RAIZ, p);
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f = f + '.html';
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
}

(async () => {
  const srv = servidor(); await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  let fallos = 0, total = 0;
  const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

  const nav = await chromium.launch();
  const mide = async (w, h) => {
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, isMobile: w < 760, hasTouch: w < 760 });
    await ctx.addInitScript(() => { try { ['n_pop', 'n_popup', 'n_cookies', 'n_ck'].forEach(k => localStorage.setItem(k, '1')); } catch (e) { } });
    const pg = await ctx.newPage();
    const errs = []; pg.on('pageerror', e => errs.push(e.message));
    await pg.goto(base + '/', { waitUntil: 'networkidle' });
    await pg.waitForSelector('.n-pm .n-pay');
    await pg.waitForTimeout(700);
    await pg.evaluate(() => document.querySelectorAll('.n-mail,.n-ck,[class*="cookie"]').forEach(e => e.remove()));
    const d = await pg.evaluate(() => {
      const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect();
        return { x: Math.round(b.left), d: Math.round(b.right), y: Math.round(b.top), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height), cx: Math.round(b.left + b.width / 2) }; };
      const l1 = document.querySelector('.n-hero5__l1'), l2 = document.querySelector('.n-hero5__l2');
      const peso = e => +getComputedStyle(e).fontWeight;
      const filas = e => e.getClientRects().length;
      return { hero: r('.n-hero5'), txt: r('.n-hero5__t'), h1: r('#h1'), cta: r('#herocta'), pay: r('.n-pm .n-pay'),
        l1: l1 && { t: l1.textContent.trim(), peso: peso(l1), filas: filas(l1), disp: getComputedStyle(l1).display },
        l2: l2 && { t: l2.textContent.trim(), peso: peso(l2), filas: filas(l2), disp: getComputedStyle(l2).display, cursiva: getComputedStyle(l2).fontStyle },
        palabras: document.querySelectorAll('#h1 span').length };
    });
    await ctx.close();
    return { d, errs };
  };

  console.log('\nTeléfono 390×844 nominal · 735 útiles\n');
  {
    const { d, errs } = await mide(390, 735);
    ok('la portada carga sin errores', errs.length === 0, errs.join(' | '));
    ok('el titular va en dos renglones', !!d.l1 && !!d.l2 && d.l1.disp === 'block' && d.l2.disp === 'block',
      d.l1 && d.l2 ? `«${d.l1.t}» / «${d.l2.t}»` : 'falta alguno');
    ok('y cada renglón ocupa una sola línea', d.l1.filas === 1 && d.l2.filas === 1, `${d.l1.filas} / ${d.l2.filas}`);
    ok('el primero pesa más que el segundo', d.l1.peso > d.l2.peso, `${d.l1.peso} vs ${d.l2.peso}`);
    // La variable de Inter que se carga sólo cubre 400-600: pedir un 300 lo sintetizaría el
    // navegador y se vería sucio. Se exige que los dos pesos estén dentro del rango real.
    ok('los dos pesos existen en la fuente cargada (400-600)', d.l1.peso <= 600 && d.l2.peso >= 400, `${d.l2.peso}-${d.l1.peso}`);
    ok('el segundo renglón no sale en cursiva', d.l2.cursiva === 'normal', d.l2.cursiva);
    ok('la animación sigue siendo palabra a palabra', d.palabras === 4, d.palabras + ' palabras');
    ok('el titular está centrado en la caja', Math.abs(d.h1.cx - d.hero.cx) <= 1, `${d.h1.cx} vs ${d.hero.cx}`);
    ok('y el botón también, justo debajo', Math.abs(d.cta.cx - d.hero.cx) <= 1 && d.cta.y >= d.h1.b, `${d.cta.cx} vs ${d.hero.cx}`);
    ok('el botón queda dentro de la caja', d.cta.b <= d.hero.b - 8, `${d.cta.b} / ${d.hero.b}`);
    ok('la caja del héroe es más baja que antes de tocarla', d.hero.h < 260, d.hero.h + 'px (antes 281)');
    ok('el pago rápido de la primera fila entra con la barra de Safari', d.pay.b <= 735, `${d.pay.b} ≤ 735`);
  }

  console.log('\nTeléfono pequeño 360×780 nominal · 679 útiles\n');
  {
    const { d } = await mide(360, 679);
    ok('sigue en dos renglones de una línea cada uno', d.l1.filas === 1 && d.l2.filas === 1, `${d.l1.filas} / ${d.l2.filas}`);
    ok('sigue centrado', Math.abs(d.h1.cx - d.hero.cx) <= 1 && Math.abs(d.cta.cx - d.hero.cx) <= 1);
    ok('y el pago rápido también entra', d.pay.b <= 679, `${d.pay.b} ≤ 679`);
  }

  console.log('\nEscritorio 1440×950\n');
  {
    const { d } = await mide(1440, 950);
    ok('dos renglones, uno por línea', d.l1.filas === 1 && d.l2.filas === 1, `${d.l1.filas} / ${d.l2.filas}`);
    ok('el primero sigue pesando más', d.l1.peso > d.l2.peso, `${d.l1.peso} vs ${d.l2.peso}`);
    ok('el bloque sigue alineado a la derecha, no centrado', d.txt.cx > d.hero.cx, `${d.txt.cx} vs ${d.hero.cx}`);
    ok('el botón cae debajo del titular', d.cta.y >= d.h1.b);
  }

  await nav.close(); srv.close();
  console.log(`\n${total - fallos}/${total} comprobaciones correctas en la portada`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
