// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/ficha.js
/* Comprueba la ficha de producto v7.7: navegar la galería sin rueda, y la mensualidad.
   Lo que se rompió de verdad y por eso se comprueba:
     · en escritorio las fotos se apilaban una debajo de otra y había que bajar con la rueda
       para ver la segunda, perdiendo de vista el panel de compra;
     · el descuento de la mensualidad vivía escrito a mano («−15 %») en cinco sitios distintos,
       así que cambiarlo en el CRM dejaba textos mintiendo por la web;
     · la nota personal de cada producto se colaba por delante del título en móvil, porque
       .n-pd__head es display:contents ahí y el orden por defecto la ponía la primera. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.avif': 'image/avif' };
const PCT = 20; // el mismo que content.pricing.sub_pct en Supabase

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

(async () => {
  const srv = servidor(); await new Promise(r => srv.listen(0, r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  let fallos = 0, total = 0;
  const ok = (n, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${n}${extra ? ' · ' + extra : ''}`); };

  const nav = await chromium.launch();
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  // sin el popup de bienvenida no se puede pulsar nada: se marca como visto antes de cargar
  await ctx.addInitScript(() => { try { ['n_pop', 'n_popup', 'n_cookies', 'n_ck'].forEach(k => localStorage.setItem(k, '1')); } catch (e) { } });
  const abre = async (slug, w = 1440, h = 900) => {
    const pg = await ctx.newPage(); await pg.setViewportSize({ width: w, height: h });
    await pg.goto(`${base}/producto.html?p=${slug}`, { waitUntil: 'networkidle' });
    await pg.waitForSelector('#gtrack .n-pd-gal__s');
    await pg.evaluate(() => document.querySelectorAll('.n-mail,.n-ck,[class*="cookie"]').forEach(e => e.remove()));
    return pg;
  };

  console.log('Galería en escritorio: una foto, y se cambia con las flechas\n');
  {
    const pg = await abre('parches-nariz');
    const n = await pg.evaluate(() => document.querySelectorAll('#gtrack .n-pd-gal__s').length);
    ok('hay varias fotos que navegar', n > 1, n + ' fotos');
    // 1. una sola foto visible: la galería no puede ser más alta que la ventana
    const caja = await pg.evaluate(() => { const g = document.querySelector('.n-pd-gal').getBoundingClientRect(); return { alto: g.height, ventana: innerHeight }; });
    ok('la galería cabe en la ventana (sin rueda para ver la foto)', caja.alto <= caja.ventana, Math.round(caja.alto) + 'px de ' + caja.ventana);
    // 2. las fotos van en fila, no apiladas: la segunda empieza a la derecha de la primera
    const fila = await pg.evaluate(() => { const s = [...document.querySelectorAll('#gtrack .n-pd-gal__s')]; return s[1].offsetLeft > s[0].offsetLeft && s[1].offsetTop === s[0].offsetTop; });
    ok('las fotos van en fila, no apiladas hacia abajo', fila);
    // 3. las dos flechas existen, se ven, y la de atrás empieza desactivada
    const fl = await pg.evaluate(() => { const a = document.querySelector('#gprev'), b = document.querySelector('#gnext'); const v = e => getComputedStyle(e).display !== 'none' && +getComputedStyle(e).opacity > 0;
      return { hay: !!a && !!b, verN: v(b), izq: a.getBoundingClientRect().left, der: b.getBoundingClientRect().right, gal: document.querySelector('.n-pd-gal').getBoundingClientRect(), prev: a.getAttribute('aria-disabled'), next: b.getAttribute('aria-disabled') }; });
    ok('hay una flecha a cada lado y se ven', fl.hay && fl.verN);
    ok('una a la izquierda y otra a la derecha de la foto', fl.izq < fl.gal.left + fl.gal.width / 2 && fl.der > fl.gal.left + fl.gal.width / 2);
    ok('en la primera foto la flecha de atrás está apagada', fl.prev === 'true' && fl.next === 'false');
    // 4. avanzar mueve el carril y el contador, y no se pasa del final
    let ant = 0;
    for (let i = 1; i < n; i++) {
      await pg.click('#gnext'); await pg.waitForTimeout(600);
      const e = await pg.evaluate(() => ({ c: document.querySelector('#gcount').textContent, sx: document.querySelector('#gtrack').scrollLeft, on: [...document.querySelectorAll('#gdots i')].findIndex(d => d.classList.contains('is-on')) }));
      if (i === 1 || i === n - 1) {
        ok(`foto ${i + 1}: contador, carril y puntos van juntos`, e.c === `${i + 1}/${n}` && e.sx > ant && e.on === i, `${e.c} · sx ${Math.round(e.sx)} · punto ${e.on + 1}`);
      }
      ant = e.sx;
    }
    const fin = await pg.evaluate(() => ({ next: document.querySelector('#gnext').getAttribute('aria-disabled'), prev: document.querySelector('#gprev').getAttribute('aria-disabled') }));
    ok('en la última foto la flecha de avanzar se apaga', fin.next === 'true' && fin.prev === 'false');
    // 5. teclado
    await pg.focus('#gal'); await pg.keyboard.press('ArrowLeft'); await pg.waitForTimeout(600);
    ok('las flechas del teclado también cambian de foto', await pg.evaluate(() => document.querySelector('#gcount').textContent) === `${n - 1}/${n}`);
    // 6. el sello de dermatólogos, arriba y sin taparse con la chapa del producto
    const sello = await pg.evaluate(() => { const d = document.querySelector('.n-pd-gal__derm'), b = document.querySelector('.n-pd-gal__badge');
      if (!d) return null; const r = d.getBoundingClientRect(), g = document.querySelector('.n-pd-gal').getBoundingClientRect();
      return { txt: d.textContent.trim(), ico: !!d.querySelector('svg'), arriba: r.top - g.top < g.height / 3, choca: b ? !(r.bottom <= b.getBoundingClientRect().top || b.getBoundingClientRect().bottom <= r.top) : false }; });
    ok('el sello «Recomendado por dermatólogos» está arriba en la foto', !!sello && /dermat/i.test(sello.txt) && sello.arriba, sello && sello.txt);
    ok('el sello lleva su estrella de verificado', !!sello && sello.ico);
    ok('el sello no se solapa con la chapa del producto', !!sello && !sello.choca);
    await pg.close();
  }

  console.log('\nMensualidad: nombre, cartelito y precio\n');
  {
    const pg = await abre('parches-nariz');
    const seg = await pg.evaluate(() => { const l = [...document.querySelectorAll('.n-pd__seg label')];
      const f = document.querySelector('.n-pd__segflag');
      return { etiquetas: l.map(x => x.querySelector('b').textContent.trim()), flag: f && f.textContent.trim(), dentro: !!(f && l[1].contains(f)),
        precios: l.map(x => x.querySelector('span.n-num').textContent.trim()) }; });
    ok('ya no dice «Suscripción»', !seg.etiquetas.some(t => /suscrip/i.test(t)), seg.etiquetas.join(' / '));
    ok('dice «Mensualidad»', seg.etiquetas.some(t => /mensualidad/i.test(t)));
    ok('el cartelito va dentro del botón de mensualidad', seg.dentro);
    ok(`el cartelito canta el −${PCT} %`, !!seg.flag && seg.flag.includes('−' + PCT + ' %'), seg.flag);
    ok('y pone «Recomendado»', !!seg.flag && /recomendado/i.test(seg.flag));
    // el precio de la mensualidad es el de la ficha menos el %
    const nums = seg.precios.map(t => parseFloat(t.replace(/[^\d,]/g, '').replace(',', '.')));
    ok(`la mensualidad descuenta el ${PCT} % de verdad`, Math.abs(nums[1] - +(nums[0] * (1 - PCT / 100)).toFixed(2)) < 0.02, nums.join(' → '));
    // al elegirla, cambia el precio grande, el del botón y el pie
    await pg.click('.n-pd__seg--sub'); await pg.waitForTimeout(400);
    const tras = await pg.evaluate(() => ({ grande: document.querySelector('#pdpprice').textContent.trim(), boton: document.querySelector('#addprice').textContent.trim(), pie: document.querySelector('#segnote').textContent, sub: document.querySelector('#addbtn').dataset.sub }));
    ok('al elegirla baja el precio grande y el del botón', tras.grande === seg.precios[1] && tras.boton === seg.precios[1], tras.grande + ' / ' + tras.boton);
    ok('y el botón de comprar se lleva la mensualidad al carrito', tras.sub === '1');
    ok('el pie explica el −' + PCT + ' % y cómo cancelar', tras.pie.includes('−' + PCT + ' %') && /cancél|cancel/i.test(tras.pie));
    // El precio por parche colgaba del precio de compra única: con la mensualidad puesta se leía
    // «2,12 € por parche» al lado de un total de 13,56 €, que no sale de ninguna cuenta.
    const uso = await pg.evaluate(() => ({ unidad: document.querySelector('#pdpunit').textContent,
      tier: document.querySelector('.n-tier .n-tier__u').textContent }));
    const esperado = (13.56 / 8).toFixed(2).replace('.', ',') + ' € por parche';
    ok('el precio por parche se recalcula con la mensualidad', uso.unidad.includes(esperado), uso.unidad.trim());
    ok('y también dentro de «1 unidad»', uso.tier.trim() === esperado, uso.tier.trim());
    await pg.close();
  }

  console.log('\nUn pack: el ahorro y los plazos siguen al modo elegido\n');
  {
    const pg = await abre('duo-poros');
    const lee = () => pg.evaluate(() => ({ precio: document.querySelector('#pdpprice').textContent.trim(),
      ahorro: document.querySelector('#pdpsave').textContent.trim(),
      tachado: document.querySelector('.n-pd__price s').textContent.trim(),
      klarna: document.querySelector('#pdpklarna').hidden ? '' : document.querySelector('#pdpklarna').textContent.trim() }));
    const num = t => parseFloat((t.match(/[\d.]+,\d{2}/) || ['0'])[0].replace(/\./g, '').replace(',', '.'));
    const a = await lee();
    ok('de partida el ahorro cuadra con el precio tachado', Math.abs(num(a.tachado) - num(a.precio) - num(a.ahorro)) < 0.02,
      `${a.tachado} − ${a.precio} = ${a.ahorro}`);
    await pg.click('.n-pd__seg--sub'); await pg.waitForTimeout(400);
    const b = await lee();
    ok('con la mensualidad el ahorro sube y sigue cuadrando', num(b.ahorro) > num(a.ahorro) && Math.abs(num(b.tachado) - num(b.precio) - num(b.ahorro)) < 0.02,
      `${a.ahorro} → ${b.ahorro}`);
    ok('los plazos de Klarna siguen la regla del precio que se paga', num(b.precio) >= 35 ? /Klarna/.test(b.klarna) : b.klarna === '',
      b.klarna || '(sin plazos, por debajo de 35 €)');
    await pg.close();
  }

  console.log('\nPersonalización: nota por producto, motivos por kit, avisos por zona\n');
  {
    const pg = await abre('parches-nariz');
    const per = await pg.evaluate(() => { const e = document.querySelector('.n-pd__pers'); return e && { t: e.textContent.trim(), rec: e.classList.contains('is-rec') }; });
    ok('los parches de nariz llevan su nota personal', !!per && per.t.length > 40, per && per.t.slice(0, 48) + '…');
    ok('y están marcados como lo más recomendado', !!per && per.rec);
    await pg.close();
    const m = await abre('parches-nariz', 390, 844);
    const orden = await m.evaluate(() => { const p = document.querySelector('.n-pd__pers'), t = document.querySelector('.n-pd__title');
      return p.getBoundingClientRect().top > t.getBoundingClientRect().top; });
    ok('en móvil la nota no se cuela por delante del título', orden);
    await m.close();
    for (const [slug, n] of [['duo-poros', 3], ['kit-t-zone', 3], ['kit-cara-completa', 3], ['plan-mensual', 3], ['plan-semanal', 3]]) {
      const k = await abre(slug);
      const mot = await k.evaluate(() => [...document.querySelectorAll('.n-pd__mot-l li')].map(li => ({ t: li.querySelector('b').textContent.trim(), d: li.querySelector('p').textContent.trim() })));
      ok(`${slug}: ${n} motivos propios y detallados`, mot.length === n && mot.every(x => x.t.length > 12 && x.d.length > 90), mot.length + ' motivos');
      ok(`${slug}: los motivos no son los genéricos de antes`, !mot.some(x => /^\d+ pasos?$/.test(x.t)));
      await k.close();
    }
    const pl = await abre('plan-mensual');
    await pl.waitForSelector('.n-plb__tips li');
    const tips = await pl.evaluate(() => ({ n: document.querySelectorAll('.n-plb__tips li').length,
      rec: [...document.querySelectorAll('.n-plb__tips li')].some(li => li.classList.contains('is-rec') && /nariz/i.test(li.textContent)),
      estrella: !!document.querySelector('.n-plb__pills button.is-rec') }));
    ok('la mensualidad avisa de lo que llevas elegido', tips.n >= 2, tips.n + ' avisos');
    ok('los parches de nariz salen como «lo más recomendado»', tips.rec);
    ok('y su pastilla lleva la marca de recomendado', tips.estrella);
    // al cambiar de zona, el aviso cambia con ella
    await pl.click('.n-plb__pills button[data-z="Barbilla"]'); await pl.waitForTimeout(300);
    ok('al añadir una zona aparece su aviso', await pl.evaluate(() => [...document.querySelectorAll('.n-plb__tips li')].some(li => /barbilla/i.test(li.textContent))));
    await pl.close();
  }

  await nav.close(); srv.close();
  console.log(`\n${total - fallos}/${total} comprobaciones correctas en la ficha de producto`);
  process.exit(fallos ? 1 : 0);
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
