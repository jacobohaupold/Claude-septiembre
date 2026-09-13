// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/crm-qa/prueba-mapa.mjs
/* Prueba el módulo «En vivo» con el código real del CRM: carga core.js, mundo.js y m-live.js en
   un navegador de verdad, le da una respuesta de /api/admin/live y comprueba lo que dibuja.
   No comprueba que «no pete»: cuenta puntos, haces y filas, y verifica que las coordenadas
   caen donde tienen que caer (Madrid sobre España, Tokio sobre Japón). */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const ADMIN = path.resolve(AQUI, '..', '..', 'web', 'public', 'admin');

// Datos con la forma exacta que devuelve el RPC live_map, repartidos por el mundo.
const CIUDADES = [
  ['Madrid', 'ES', -3.703, 40.417], ['Barcelona', 'ES', 2.173, 41.385], ['Sevilla', 'ES', -5.984, 37.389],
  ['Valencia', 'ES', -0.376, 39.470], ['Bilbao', 'ES', -2.935, 43.263], ['Lisboa', 'PT', -9.139, 38.722],
  ['París', 'FR', 2.352, 48.857], ['Milán', 'IT', 9.19, 45.464], ['Berlín', 'DE', 13.405, 52.52],
  ['Londres', 'GB', -0.128, 51.507], ['Nueva York', 'US', -74.006, 40.713], ['Los Ángeles', 'US', -118.244, 34.052],
  ['Ciudad de México', 'MX', -99.133, 19.433], ['Bogotá', 'CO', -74.072, 4.711], ['Buenos Aires', 'AR', -58.382, -34.604],
  ['Santiago', 'CL', -70.669, -33.449], ['São Paulo', 'BR', -46.633, -23.551], ['Tokio', 'JP', 139.692, 35.690],
  ['Seúl', 'KR', 126.978, 37.567], ['Sídney', 'AU', 151.209, -33.868], ['Dubái', 'AE', 55.271, 25.205],
  ['Casablanca', 'MA', -7.589, 33.573], ['Lagos', 'NG', 3.379, 6.524], ['Bombay', 'IN', 72.878, 19.076],
];
const EVS = ['page_view', 'view_item', 'add_to_cart', 'begin_checkout', 'purchase', 'lead', 'open_cart', 'quiz_done'];
const datos = () => {
  const puntos = CIUDADES.map((c, i) => ({
    id: 'p' + i, lon: c[2], lat: c[3], ciudad: c[0], pais: c[1], dev: ['mobile', 'desktop', 'tablet'][i % 3],
    nivel: [0, 1, 1, 2, 2, 3, 4][i % 7], n: 1 + (i * 3) % 22, path: ['/', '/catalogo.html', '/producto.html', '/checkout.html'][i % 4],
    aprox: i % 9 === 0, hace: (i * 37) % 280,
  }));
  const ventas = [0, 6, 10, 17, 21].map((i, k) => ({
    lon: CIUDADES[i][2], lat: CIUDADES[i][3], ciudad: CIUDADES[i][0], pais: CIUDADES[i][1],
    total: [16.95, 28.66, 44.9, 72.5, 21.9][k], pedido: 'N100' + k, hace: k * 640,
  }));
  const feed = Array.from({ length: 28 }, (_, i) => {
    const c = CIUDADES[i % CIUDADES.length];
    return { id: 'p' + (i % CIUDADES.length), ev: EVS[i % EVS.length], ciudad: c[0], pais: c[1], dev: 'mobile', path: '/producto.html',
      slug: 'parches-nariz', valor: i % 5 === 4 ? 28.66 : null, hace: i * 23 };
  });
  const minutos = Array.from({ length: 31 }, (_, i) => ({
    m: String(10 + Math.floor(i / 2)).padStart(2, '0') + ':' + String((i * 2) % 60).padStart(2, '0'),
    v: Math.round(6 + 9 * Math.sin(i / 3) + (i % 4)), p: 2 + (i % 5),
  }));
  return {
    t: '2026-09-13T16:40:00.000Z', ventana_min: 5,
    ahora: { personas: puntos.length, visitas: puntos.length + 4, navegando: 11, carrito: 6, pagando: 4, comprando: 3 },
    hoy: { visitas: 412, personas: 358, vistas: 1290, pedidos: 9, ventas: 284.51, carritos: 37 },
    ayer: { visitas: 350, vistas: 1402, pedidos: 11, ventas: 331.2 },
    puntos, ventas, feed, minutos,
    paises: [['ES', 180], ['FR', 44], ['MX', 31], ['US', 28], ['PT', 19], ['IT', 12], ['DE', 9], ['AR', 7], ['JP', 5], ['AU', 3]],
    paginas: [['/', 402], ['/producto.html', 318], ['/catalogo.html', 190], ['/checkout.html', 96], ['/como-usar.html', 61]],
  };
};

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
const srv = http.createServer((q, r) => {
  const u = q.url.split('?')[0];
  if (u === '/api/admin/live') { r.writeHead(200, { 'content-type': 'application/json' }); return r.end(JSON.stringify(datos())); }
  const f = path.join(ADMIN, u === '/' ? 'index.html' : u.replace(/^\/admin\//, '/'));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});

const PAGINA = `<!doctype html><meta charset=utf-8><title>prueba</title>
<link rel=stylesheet href="/admin.css">
<body><div id=toasts></div><div id=modals></div><div class=main id=main></div>
<script src="/core.js"></script><script src="/mundo.js"></script><script src="/m-live.js"></script>
<script>
  A.token = () => 'prueba';
  window.NOCTA_PRODUCTS = [{slug:'parches-nariz',name:'Parches de nariz'}];
  window.__listo = A.mods.live.render(document.getElementById('main'), [], {}).then(()=>true).catch(e=>{window.__err=e.message;return false});
</script>`;

await new Promise(r => srv.listen(0, r));
const base = 'http://127.0.0.1:' + srv.address().port;
srv.on('request', () => {});
const nav = await chromium.launch();
let fallos = 0, total = 0;
const ok = (nombre, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${nombre}${extra ? ' · ' + extra : ''}`); };

for (const [w, h, etiqueta] of [[1440, 950, 'escritorio'], [820, 1000, 'tableta'], [390, 900, 'móvil']]) {
  console.log(`\n${etiqueta} ${w}×${h}`);
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  const errores = [];
  pg.on('pageerror', e => errores.push(e.message));
  pg.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  await pg.route('**/admin/prueba.html', route => route.fulfill({ body: PAGINA, contentType: 'text/html; charset=utf-8' }));
  await pg.goto(base + '/admin/prueba.html');
  await pg.waitForFunction(() => window.__listo !== undefined, null, { timeout: 15000 });
  await pg.evaluate(() => window.__listo);
  await pg.waitForTimeout(700);

  const m = await pg.evaluate(() => {
    const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
    const caja = s => { const e = $(s); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
    // Centro de un país en coordenadas de pantalla, para comprobar que un punto cae encima.
    const centroPais = c => {
      const p = $$('#lvpaises .lv-pais').find(z => z.dataset.c === c); if (!p) return null;
      const b = p.getBBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, w: b.width, h: b.height };
    };
    // Los puntos salen en el mismo orden que llegan del API, asi que el indice basta.
    const puntoDe = i => {
      const g = $$('#lvpuntos .lv-pt')[i]; if (!g) return null;
      const t = g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\)/);
      return { x: +t[1], y: +t[2] };
    };
    return {
      err: window.__err || null,
      puntos: $$('#lvpuntos .lv-pt').length,
      haces: $$('#lvhaces .lv-haz').length,
      paises: $$('#lvpaises .lv-pais').length,
      paisesOn: $$('#lvpaises .lv-pais.on').length,
      noche: ($('#lvnoche').getAttribute('d') || '').length,
      feed: $$('#lvfeed .feed__i').length,
      barras: $$('.lv__pb i').length,
      kpis: $$('#lvk .kpi').length,
      rank: $$('.lv__rk').length,
      ahora: $('#lvnow').textContent,
      mapa: caja('.lv__svgwrap'),
      main: caja('#main'),
      docW: document.documentElement.scrollWidth, winW: innerWidth,
      es: centroPais('ES'), jp: centroPais('JP'),
      conId: $$('#lvpuntos .lv-pt[data-id]').length,
      feedEnlaces: $$('#lvfeed .feed__a[href^="#/people/"]').length,
      pMadrid: puntoDe(0), pTokio: puntoDe(17),
    };
  });

  ok('el módulo se dibuja sin error', !m.err, m.err || '');
  ok('sin errores de JavaScript', errores.length === 0, errores.slice(0, 2).join(' | '));
  ok('176 países en el mapa', m.paises === 176, m.paises + '');
  ok('24 visitantes pintados', m.puntos === 24, m.puntos + '');
  ok('5 ventas con su haz de luz', m.haces === 5, m.haces + '');
  ok('países con visitas resaltados', m.paisesOn === 10, m.paisesOn + '');
  ok('la zona de noche está calculada', m.noche > 400, m.noche + ' caracteres de ruta');
  ok('28 líneas en el feed', m.feed === 28, m.feed + '');
  ok('31 barras de pulso', m.barras === 31, m.barras + '');
  ok('4 indicadores arriba', m.kpis === 4, m.kpis + '');
  ok('contador de «ahora mismo»', m.ahora === '24', m.ahora);
  ok('el mapa no se sale de la página', m.docW <= m.winW, `documento ${m.docW} · ventana ${m.winW}`);
  ok('la tarjeta del mapa cabe', m.mapa && m.mapa.w <= m.main.w + 1, m.mapa ? `${Math.round(m.mapa.w)} ≤ ${Math.round(m.main.w)}` : '');
  // Lo que de verdad importa: que la proyección coloque a cada uno en su sitio.
  const dentro = (p, c) => p && c && Math.abs(p.x - c.x) < c.w && Math.abs(p.y - c.y) < c.h;
  ok('Madrid cae sobre España', dentro(m.pMadrid, m.es));
  ok('Tokio cae sobre Japón', dentro(m.pTokio, m.jp));
  ok('cada visitante lleva a su recorrido', m.conId === 24, m.conId + '');
  ok('cada línea del feed enlaza a la persona', m.feedEnlaces === 28, m.feedEnlaces + '');

  await pg.screenshot({ path: `/tmp/mapa_${etiqueta}.png`, fullPage: true });
  await ctx.close();
}
await nav.close(); srv.close();
console.log(`\n${total - fallos}/${total} comprobaciones correctas`);
process.exit(fallos ? 1 : 0);
