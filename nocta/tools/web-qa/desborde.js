// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/desborde.js
/* Audita el desbordamiento horizontal de todas las páginas de la tienda.
   Uso: node nocta/tools/web-qa/desborde.js
   Levanta un servidor estático sobre web/public, abre cada página a varios anchos
   y comprueba dos cosas por página:
     1. Que el documento no sea más ancho que la ventana (que no se pueda arrastrar la página).
     2. Qué elemento concreto sobresale, para poder arreglarlo sin adivinar. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const ANCHOS = [320, 360, 390, 414, 480, 768, 1024, 1280, 1440, 1920];
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.avif': 'image/avif' };

function servidor() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    let f = path.join(RAIZ, p);
    if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f = f + '.html';
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
}

const CULPABLES = () => {
  const w = document.documentElement.clientWidth;
  const fuera = [];
  const vistos = new Set();
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const est = getComputedStyle(el);
    if (est.position === 'fixed') return;
    const der = Math.round(r.right);
    const izq = Math.round(r.left);
    if (der <= w + 1 && izq >= -1) return;
    // nos quedamos con el elemento más profundo que sobresale, no con todos sus padres
    let hijoCulpable = false;
    for (const h of el.children) {
      const rh = h.getBoundingClientRect();
      if (Math.round(rh.right) > w + 1 || Math.round(rh.left) < -1) hijoCulpable = true;
    }
    if (hijoCulpable) return;
    const sel = el.tagName.toLowerCase()
      + (el.id ? '#' + el.id : '')
      + (el.className && typeof el.className === 'string'
        ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
    const clave = sel + '|' + izq + '|' + der;
    if (vistos.has(clave)) return;
    vistos.add(clave);
    fuera.push({ sel, izq, der, ancho: Math.round(r.width), sobra: Math.max(der - w, -izq) });
  });
  fuera.sort((a, b) => b.sobra - a.sobra);
  return {
    scrollW: document.documentElement.scrollWidth,
    clientW: w,
    bodyScrollW: document.body.scrollWidth,
    culpables: fuera.slice(0, 6),
  };
};

(async () => {
  const srv = servidor();
  await new Promise(r => srv.listen(0, r));
  const port = srv.address().port;
  const paginas = fs.readdirSync(RAIZ).filter(f => f.endsWith('.html')).sort();
  const nav = await chromium.launch();
  let fallos = 0, checks = 0;
  const informe = [];

  for (const pag of paginas) {
    for (const ancho of ANCHOS) {
      const ctx = await nav.newContext({
        viewport: { width: ancho, height: 900 },
        deviceScaleFactor: 1,
        isMobile: ancho < 768,
        hasTouch: ancho < 768,
      });
      const page = await ctx.newPage();
      try {
        await page.goto(`http://127.0.0.1:${port}/${pag}`, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) {
        await page.goto(`http://127.0.0.1:${port}/${pag}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      }
      await page.waitForTimeout(350);
      // bajamos del todo y volvemos: hay desbordes que solo aparecen al animar al hacer scroll
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(250);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      const r = await page.evaluate(CULPABLES);
      checks++;
      const sobra = r.scrollW - r.clientW;
      if (sobra > 1) {
        fallos++;
        informe.push({ pag, ancho, sobra, culpables: r.culpables });
      }
      await ctx.close();
    }
  }
  await nav.close();
  srv.close();

  console.log(`comprobaciones: ${checks} (${paginas.length} páginas x ${ANCHOS.length} anchos)`);
  console.log(`páginas-ancho con desborde horizontal: ${fallos}`);
  if (informe.length) {
    const porPagina = {};
    informe.forEach(i => { (porPagina[i.pag] = porPagina[i.pag] || []).push(i); });
    for (const [pag, lista] of Object.entries(porPagina)) {
      console.log(`\n${pag}  ->  ${lista.map(l => l.ancho + 'px(+' + l.sobra + ')').join('  ')}`);
      const c = lista[0].culpables;
      c.forEach(x => console.log(`    ${x.sel}  izq ${x.izq} der ${x.der} ancho ${x.ancho} sobra ${x.sobra}px`));
    }
    process.exitCode = 1;
  } else {
    console.log('\nNINGUNA PÁGINA SE PUEDE ARRASTRAR HACIA LOS LADOS.');
  }
})();
