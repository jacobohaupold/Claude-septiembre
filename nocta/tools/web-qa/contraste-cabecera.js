// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/contraste-cabecera.js
/* El menú de la portada va en blanco sobre el vídeo. Un vídeo cambia de fotograma y el CMS puede
   cambiar el vídeo entero, así que no vale con mirarlo: hay que medir el peor píxel que queda
   DEBAJO de cada letra y exigir que el blanco siga leyéndose.
   Se mide la tinta real (rango de texto), no la caja con relleno del enlace, que sobresale del vídeo. */
const http = require('http'); const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright'); const PNG = require('pngjs').PNG;
const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const CASOS = [[1440, 900, 'escritorio'], [1024, 800, 'portátil'], [390, 844, 'móvil']];
const MINIMO = 4.5;  // AA para texto pequeño
const TIPOS = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json',
  '.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2','.avif':'image/avif','.ico':'image/x-icon' };
const servidor = () => http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/index.html';
  let f = path.join(RAIZ, p); if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
const lum = (r, g, b) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }; return .2126*f(r) + .7152*f(g) + .0722*f(b); };

(async () => {
  const s = servidor(); await new Promise(r => s.listen(0, r)); const base = 'http://127.0.0.1:' + s.address().port;
  const nav = await chromium.launch(); let fallos = 0, total = 0;
  for (const [w, h, nombre] of CASOS) {
    const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    await pg.addInitScript(() => { try { localStorage.setItem('n_popup8', 'done'); localStorage.setItem('n_ck', 'ess'); } catch (e) {} });
    await pg.goto(base + '/index.html', { waitUntil: 'networkidle' }); await pg.waitForTimeout(1100);
    // Caja de la TINTA: un rango sobre el nodo de texto da la caja de las letras, no la del enlace con su relleno.
    const piezas = await pg.evaluate(() => {
      const out = [];
      const tinta = el => { const t = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
        if (t) { const r = document.createRange(); r.selectNodeContents(t); const b = r.getBoundingClientRect(); if (b.width && b.height) return b; }
        const svg = el.querySelector('svg'); return svg ? svg.getBoundingClientRect() : el.getBoundingClientRect(); };
      document.querySelectorAll('.n-logo, .n-main a, .n-cart, .n-top__in > .n-icon').forEach(el => {
        if (!el.getClientRects().length) return; const b = tinta(el);
        out.push({ q: (el.textContent.trim() || el.getAttribute('aria-label') || 'icono').slice(0, 22),
          x: Math.floor(b.x), y: Math.floor(b.y), w: Math.ceil(b.width), h: Math.ceil(b.height) });
      });
      return out;
    });
    await pg.evaluate(() => document.querySelectorAll('.n-logo, .n-main, .n-cart, .n-icon').forEach(e => e.style.visibility = 'hidden'));
    await pg.waitForTimeout(150);
    let peorGlobal = 99, culpable = '';
    for (const z of piezas) {
      if (z.w < 1 || z.h < 1) continue;
      const png = PNG.sync.read(await pg.screenshot({ clip: { x: z.x, y: z.y, width: z.w, height: z.h } }));
      let peor = 99;
      for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (png.width * y + x) << 2;
        const r = 1.05 / (lum(png.data[i], png.data[i+1], png.data[i+2]) + .05);
        if (r < peor) peor = r;
      }
      total++; if (peor < MINIMO) { fallos++; }
      if (peor < peorGlobal) { peorGlobal = peor; culpable = z.q; }
    }
    console.log(`  ${nombre.padEnd(10)} ${String(w).padStart(4)}px · ${piezas.length} elementos · peor ${peorGlobal.toFixed(2)}:1 en «${culpable}» ${peorGlobal >= MINIMO ? 'ok' : 'ILEGIBLE'}`);
    await ctx.close();
  }
  await nav.close(); s.close();
  console.log(`\n${total - fallos}/${total} elementos de la cabecera se leen sobre el vídeo (mínimo ${MINIMO}:1)`);
  process.exit(fallos ? 1 : 0);
})();
