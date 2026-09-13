// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/cabecera.js
/* Comprueba que la cabecera que va SOBRE el vídeo del hero cae dentro de la tarjeta del vídeo.
   El logo y el carrito van en blanco; si su caja se sale de la tarjeta (que está metida hacia
   dentro y tiene las esquinas redondeadas) el blanco cae sobre el fondo crema y desaparece.
   Mide, no adivina: compara la caja del logo y del carrito con la caja del hero, y exige
   holgura suficiente para librar el radio de la esquina. */
const http = require('http'); const fs = require('fs'); const path = require('path');
const { chromium } = require('playwright');
const RAIZ = path.resolve(__dirname, '..', '..', 'web', 'public');
const ANCHOS = [360, 390, 768, 1024, 1280, 1440, 1920];
const TIPOS = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json',
  '.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2','.avif':'image/avif','.ico':'image/x-icon' };
const servidor = () => http.createServer((req,res)=>{ let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/')p='/index.html';
  let f=path.join(RAIZ,p); if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f=f+'.html';
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end('no');}
  res.writeHead(200,{'content-type':TIPOS[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(res); });

(async () => {
  const s = servidor(); await new Promise(r => s.listen(0, r)); const base = 'http://127.0.0.1:' + s.address().port;
  const nav = await chromium.launch(); let fallos = 0, pruebas = 0;
  for (const w of ANCHOS) {
    const ctx = await nav.newContext({ viewport:{ width:w, height:900 }, deviceScaleFactor:1 });
    const pg = await ctx.newPage();
    await pg.goto(base + '/index.html', { waitUntil:'networkidle' });
    await pg.waitForTimeout(500);
    const m = await pg.evaluate(() => {
      const r = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { x:b.x, y:b.y, r:b.right, w:b.width, h:b.height }; };
      const hero = document.querySelector('.n-hero5');
      const cs = hero ? getComputedStyle(hero) : null;
      return { hero:r(hero), radio: cs ? parseFloat(cs.borderTopLeftRadius) : 0,
        logo:r(document.querySelector('.n-logo')), carrito:r(document.querySelector('.n-cart')),
        menu:r(document.querySelector('.n-icon')), nav:r(document.querySelector('.n-main')),
        velo: getComputedStyle(document.querySelector('.n-hero5'), '::after').backgroundImage.slice(0,60) };
    });
    if (!m.hero) { console.log(`  ${w}px · sin hero, se salta`); await ctx.close(); continue; }
    // El elemento más a la izquierda de la cabecera y el más a la derecha.
    // Sólo lo que se ve: un elemento con display:none devuelve una caja 0x0 en el origen y falsearía la medida.
    const vis = x => x && x.w > 0 && x.h > 0;
    const izq = [m.logo, m.menu, m.nav].filter(vis).sort((a,b)=>a.x-b.x)[0];
    const der = [m.carrito, m.nav].filter(vis).sort((a,b)=>b.r-a.r)[0];
    const holguraIzq = izq.x - m.hero.x;
    const holguraDer = m.hero.r - der.r;
    const min = 0; // como mínimo, dentro de la tarjeta
    const ok1 = holguraIzq >= min, ok2 = holguraDer >= min;
    pruebas += 2; if (!ok1) fallos++; if (!ok2) fallos++;
    console.log(`  ${String(w).padStart(4)}px · radio ${m.radio}px · izquierda ${holguraIzq.toFixed(1)}px ${ok1?'ok':'SE SALE'} · derecha ${holguraDer.toFixed(1)}px ${ok2?'ok':'SE SALE'}`);

    // Con scroll la cabecera se vuelve una barra sólida. Tiene que ocupar TODO el ancho y su
    // contenido quedar centrado: si no, se queda una barra corta pegada a un lado.
    await pg.evaluate(() => window.scrollTo(0, Math.max(900, innerHeight * 1.4)));
    // Se espera a la CONDICIÓN, no a un reloj: con una espera fija la comprobación se saltaba
    // en silencio de vez en cuando, que es peor que fallar, porque no se ve.
    let llegó = true;
    try { await pg.waitForFunction(() => document.querySelector('.n-top').classList.contains('is-scrolled'), null, { timeout: 4000 }); }
    catch (e) { llegó = false; }
    pruebas++; if (!llegó) { fallos++; console.log('        con scroll · la cabecera NO pasa a barra sólida'); }
    const sc = !llegó ? null : await pg.evaluate(() => {
      const t = document.querySelector('.n-top');
      const r = el => { const b = el.getBoundingClientRect(); return { x: b.x, r: b.right, w: b.width }; };
      const cs = getComputedStyle(t);
      const fondo = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? t : document.querySelector('.n-top__in');
      // En móvil el logo va centrado por diseño y el elemento más a la izquierda es el botón de
      // menú; en escritorio es el logo. Se mide el que de verdad marca el margen izquierdo.
      const vis = el => el && el.getClientRects().length && el.getBoundingClientRect().width > 0;
      const izqEl = [document.querySelector('.n-top__in > .n-icon'), document.querySelector('.n-logo')].find(vis);
      return { barra: r(fondo), ventana: innerWidth, izq: r(izqEl), carro: r(document.querySelector('.n-cart')) };
    });
    if (sc) {
      const anchoCompleto = sc.barra.w >= sc.ventana - 1;
      // Centrado: lo que sobra a la izquierda del logo y a la derecha del carrito, parecido.
      const izq2 = sc.izq.x, der2 = sc.ventana - sc.carro.r;
      const centrado = Math.abs(izq2 - der2) <= 2;
      pruebas += 2; if (!anchoCompleto) fallos++; if (!centrado) fallos++;
      console.log(`        con scroll · barra ${sc.barra.w.toFixed(0)}px de ${sc.ventana}px ${anchoCompleto ? 'ok' : 'CORTA'}`
        + ` · márgenes ${izq2.toFixed(0)}/${der2.toFixed(0)} ${centrado ? 'ok' : 'DESCENTRADO'}`);
    }
    await pg.evaluate(() => window.scrollTo(0, 0));
  }
  await nav.close(); s.close();
  console.log(`\n${pruebas - fallos}/${pruebas} comprobaciones correctas`);
  process.exit(fallos ? 1 : 0);
})();
