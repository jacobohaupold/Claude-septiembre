// NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/crm-qa/prueba-mapa.mjs
/* Prueba el módulo «En vivo» con el código real del CRM: carga core.js, mundo.js y m-live.js en un
   navegador de verdad, le sirve una respuesta de /api/admin/live y comprueba lo que dibuja y cómo
   se maneja. No comprueba que «no pete»: mide.

   Lo que de verdad se está probando aquí:
     · que la proyección coloque a cada visitante dentro de su país;
     · que los marcadores NO crezcan con el zoom (la razón de que vivan fuera del grupo de cámara);
     · que los grupos de visitantes se abran solos al acercarse;
     · que teclado, rueda, doble clic y arrastre muevan la cámara, y que los topes la sujeten. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const ADMIN = path.resolve(AQUI, '..', '..', 'web', 'public', 'admin');

// Ciudades repartidas por el mundo, con varias muy juntas en España para poder probar los grupos.
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
    nivel: [0, 1, 1, 2, 2, 3, 4][i % 7], n: 1 + (i * 3) % 22,
    path: ['/', '/catalogo.html', '/producto.html', '/checkout.html'][i % 4],
    aprox: i % 9 === 0, hace: (i * 37) % 280,
  }));
  const ventas = [0, 6, 10, 17, 21].map((i, k) => ({
    lon: CIUDADES[i][2], lat: CIUDADES[i][3], ciudad: CIUDADES[i][0], pais: CIUDADES[i][1],
    total: [16.95, 28.66, 44.9, 72.5, 21.9][k], pedido: 'N100' + k, hace: k * 640,
  }));
  const feed = Array.from({ length: 28 }, (_, i) => {
    const c = CIUDADES[i % CIUDADES.length];
    return { id: 'p' + (i % CIUDADES.length), ev: EVS[i % EVS.length], ciudad: c[0], pais: c[1], dev: 'mobile',
      path: '/producto.html', slug: 'parches-nariz', valor: i % 5 === 4 ? 28.66 : null, hace: i * 23 };
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
    horas: Array.from({ length: 17 }, (_, i) => ({ h: String(6 + i).padStart(2, '0'),
      visitas: Math.round(8 + 26 * Math.sin(i / 3.4) + i), vistas: Math.round(30 + 80 * Math.sin(i / 3.1)),
      pedidos: i % 3 === 0 ? 1 : 0, ventas: i % 3 === 0 ? 24.9 + i : 0 })),
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
  /* Ayudas de medida: leen el estado real de la cámara del módulo desde su transformación. */
  window.camara = () => {
    const t = document.getElementById('lvcam').getAttribute('transform') || '';
    const s = +(t.match(/scale\\(([-\\d.]+)\\)/) || [0, 1])[1];
    const m = t.match(/translate\\(([-\\d.]+) ([-\\d.]+)\\)/) || [0, 0, 0];
    const W = window.MUNDO.w, H = window.MUNDO.h;
    return { z: s, cx: (W / 2 - +m[1]) / s, cy: (H / 2 - +m[2]) / s };
  };
  window.aPantalla = (mx, my) => { const c = window.camara(), W = window.MUNDO.w, H = window.MUNDO.h;
    return [(mx - c.cx) * c.z + W / 2, (my - c.cy) * c.z + H / 2]; };
  window.__listo = A.mods.live.render(document.getElementById('main'), [], {}).then(()=>true).catch(e=>{window.__err=e.message;return false});
</script>`;

await new Promise(r => srv.listen(0, r));
const base = 'http://127.0.0.1:' + srv.address().port;
const nav = await chromium.launch();
let fallos = 0, total = 0;
const ok = (nombre, cond, extra = '') => { total++; if (!cond) fallos++; console.log(`  ${cond ? '✓' : '✗'} ${nombre}${extra ? ' · ' + extra : ''}`); };

// Espera a que la cámara deje de moverse (las animaciones son suaves, no instantáneas).
const quieta = async pg => {
  let a = null;
  for (let i = 0; i < 40; i++) {
    const c = await pg.evaluate(() => window.camara());
    const k = c.z.toFixed(4) + '|' + c.cx.toFixed(2) + '|' + c.cy.toFixed(2);
    if (k === a) return c;
    a = k; await pg.waitForTimeout(60);
  }
  return pg.evaluate(() => window.camara());
};

for (const [w, h, etiqueta] of [[1440, 950, 'escritorio'], [820, 1000, 'tableta'], [390, 900, 'móvil']]) {
  console.log(`\n${etiqueta} ${w}×${h}`);
  const ctx = await nav.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  const errores = [];
  pg.on('pageerror', e => errores.push(e.message));
  pg.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  await pg.route('**/admin/prueba.html', r => r.fulfill({ body: PAGINA, contentType: 'text/html; charset=utf-8' }));
  await pg.goto(base + '/admin/prueba.html');
  await pg.waitForFunction(() => window.__listo !== undefined, null, { timeout: 15000 });
  await pg.evaluate(() => window.__listo);
  await pg.waitForTimeout(600);

  /* ── 1. lo que se dibuja ── */
  const est = await pg.evaluate(() => {
    const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
    return {
      err: window.__err || null,
      paises: $$('#lvmundo .lv-pais').length,
      paisesOn: $$('#lvmundo .lv-pais.on').length,
      marcas: $$('#lvpuntos .lv-pt').length,
      grupos: $$('#lvpuntos .lv-pt.es-grupo').length,
      haces: $$('#lvhaces .lv-haz').length,
      noche: ($('#lvnoche').getAttribute('d') || '').length,
      feed: $$('#lvfeed .feed__i').length,
      feedEnlaces: $$('#lvfeed .feed__a[href^="#/people/"]').length,
      barras: $$('.lv__pb i').length,
      totales: $$('#lvtot .lv__tt').length,
      chispaLinea: $$('#lvtot .spk__l').length,
      chispaBarras: $$('#lvtot .spk__b').length,
      curvas: $$('.lv__cv path').length,
      saltos: $$('.lv__sf').length,
      eje: $$('.lv__pe span').length,
      leyendaVS: !!$('.lv__key'),
      ahora: $('#lvnow').textContent,
      etiquetas: $$('#lvetiq text').length,
      guiaOculta: $('#lvguia').hidden,
      escala: $('#lvescala span').textContent,
      docW: document.documentElement.scrollWidth, winW: innerWidth,
      mapaW: $('.lv__svgwrap').getBoundingClientRect().width,
      mainW: $('#main').getBoundingClientRect().width,
    };
  });
  ok('el módulo se dibuja sin error', !est.err, est.err || '');
  ok('sin errores de JavaScript', errores.length === 0, errores.slice(0, 2).join(' | '));
  ok('176 países en el mapa', est.paises === 176, est.paises + '');
  ok('países con visitas resaltados', est.paisesOn === 10, est.paisesOn + '');
  ok('5 ventas con su haz de luz', est.haces === 5, est.haces + '');
  ok('la zona de noche está calculada', est.noche > 400, est.noche + ' caracteres');
  ok('28 líneas en el feed', est.feed === 28, est.feed + '');
  ok('cada línea del feed enlaza a la persona', est.feedEnlaces === 28, est.feedEnlaces + '');
  ok('31 barras de pulso', est.barras === 31, est.barras + '');
  ok('4 totales del día en la barra', est.totales === 4, est.totales + '');
  ok('visitas y páginas en línea, pedidos y ventas en barras', est.chispaLinea === 2 && est.chispaBarras === 34,
    `${est.chispaLinea} líneas · ${est.chispaBarras} barras`);
  ok('4 curvas y 3 saltos de conversión', est.curvas === 4 && est.saltos === 3, `${est.curvas}/${est.saltos}`);
  ok('el pulso tiene eje', est.eje === 3, est.eje + '');
  ok('leyenda visita / venta', est.leyendaVS);
  ok('contador de «ahora mismo»', est.ahora === '24', est.ahora);
  ok('el mapa no se sale de la página', est.docW <= est.winW, `documento ${est.docW} · ventana ${est.winW}`);
  ok('la tarjeta del mapa cabe', est.mapaW <= est.mainW + 1, `${Math.round(est.mapaW)} ≤ ${Math.round(est.mainW)}`);

  /* ── 2. la proyección coloca a cada uno en su país ── */
  const sitio = await pg.evaluate(() => {
    const $$ = s => [...document.querySelectorAll(s)];
    const caja = c => {                       // caja del país en coordenadas de PANTALLA
      const p = $$('#lvmundo .lv-pais').find(z => z.dataset.c === c); if (!p) return null;
      const b = p.getBBox();                  // el <g> de defs está sin transformar: son coords de mapa
      const [x0, y0] = window.aPantalla(b.x, b.y), [x1, y1] = window.aPantalla(b.x + b.width, b.y + b.height);
      return { x0, y0, x1, y1 };
    };
    return { es: caja('ES'), jp: caja('JP'),
      marcas: $$('#lvpuntos .lv-pt').map(g => { const t = g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\)/); return [+t[1], +t[2]]; }) };
  });
  const dentro = (p, c) => !!(p && c && p[0] >= c.x0 - 2 && p[0] <= c.x1 + 2 && p[1] >= c.y0 - 2 && p[1] <= c.y1 + 2);
  const enES = sitio.marcas.filter(p => dentro(p, sitio.es)).length;
  const enJP = sitio.marcas.filter(p => dentro(p, sitio.jp)).length;
  ok('hay marcas dentro de la caja de España', enES >= 1, enES + ' marcas');
  ok('hay una marca dentro de la caja de Japón', enJP >= 1, enJP + ' marcas');

  /* ── 3. LO IMPORTANTE: los marcadores no crecen con el zoom ──
     Se acerca CON LA RUEDA sobre un visitante concreto (Tokio, que está solo) y se mide el mismo
     marcador antes y después. Comparar «el primer marcador» no valdría: al acercarte los grupos se
     reparten y el primero ya no es el mismo. */
  const caja = await pg.evaluate(() => { const r = document.querySelector('#lvsvg').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  const radioDe = id => pg.evaluate(i => {
    const g = document.querySelector(`#lvpuntos .lv-pt[data-id="${i}"] .lv-pt__c`);
    return g ? +g.getAttribute('r') : null;
  }, id);
  const pantallaDe = id => pg.evaluate(i => {
    const g = document.querySelector(`#lvpuntos .lv-pt[data-id="${i}"]`); if (!g) return null;
    const b = g.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2];
  }, id);

  const suelto = await pg.evaluate(() => {
    const g = document.querySelector('#lvpuntos .lv-pt[data-id]');
    return g ? g.dataset.id : null;
  });
  const radioA = suelto && await radioDe(suelto);
  const posA = suelto && await pantallaDe(suelto);
  ok('hay algún visitante dibujado suelto', radioA != null && posA != null, suelto || 'ninguno');
  if (posA) {
    await pg.mouse.move(posA[0], posA[1]);
    await pg.mouse.wheel(0, -900);
    await pg.waitForTimeout(200);
  }
  const camRueda = await pg.evaluate(() => window.camara());
  const radioB = suelto && await radioDe(suelto);
  ok('la rueda acerca de verdad', camRueda.z > 2, '×' + camRueda.z.toFixed(2));
  ok('los marcadores NO crecen con el zoom', radioA != null && radioA === radioB, `r ${radioA} → ${radioB}`);

  /* ── 4. el zoom por pasos acumula, y los grupos se abren al acercarse ── */
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  await pg.evaluate(() => { const b = document.querySelector('#lvzin'); b.click(); b.click(); b.click(); });
  const camPasos = await quieta(pg);
  ok('tres pasos de zoom acumulan (×1,8³ ≈ 5,8)', camPasos.z > 5, '×' + camPasos.z.toFixed(2));

  ok('a ×1 varios visitantes van agrupados', est.marcas < 24, `${est.marcas} marcas para 24 personas`);
  ok('hay algún grupo con su cuenta', est.grupos >= 1, est.grupos + ' grupos');
  // Pulsar un grupo tiene que abrirlo. Se mide el grupo más grande que hay a la vista: después de
  // pulsarlo debe quedar uno más pequeño, o ninguno. No se fija una ciudad, porque en una pantalla
  // pequeña el radio de 15 px cubre más mundo y se agrupan ciudades que en un monitor van sueltas.
  const mayorGrupo = () => pg.evaluate(() =>
    Math.max(0, ...[...document.querySelectorAll('#lvpuntos .lv-pt__k')].map(t => +t.textContent || 0)));
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  const grupoAntes = await mayorGrupo();
  const pulsado = await pg.evaluate(() => {
    const ts = [...document.querySelectorAll('#lvpuntos .lv-pt.es-grupo')];
    if (!ts.length) return false;
    const g = ts.sort((a, b) => (+b.querySelector('.lv-pt__k').textContent) - (+a.querySelector('.lv-pt__k').textContent))[0];
    g.querySelector('.lv-pt__c').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return true;
  });
  await quieta(pg);
  await pg.waitForTimeout(150);
  const grupoDespues = await mayorGrupo();
  ok('a ×1 hay visitantes amontonados', grupoAntes >= 2, 'el mayor junta ' + grupoAntes);
  ok('pulsar un grupo lo abre', pulsado && grupoDespues < grupoAntes, `${grupoAntes} → ${grupoDespues}`);

  /* ── 5. nombres de país y mapa guía aparecen sólo con zoom ── */
  const conZoom = await pg.evaluate(() => ({
    etiquetas: document.querySelectorAll('#lvetiq text').length,
    guiaOculta: document.querySelector('#lvguia').hidden,
    escala: document.querySelector('#lvescala span').textContent,
  }));
  ok('sin zoom no se escriben nombres de país', est.etiquetas === 0, est.etiquetas + '');
  ok('con zoom sí se escriben', conZoom.etiquetas > 0, conZoom.etiquetas + ' nombres');
  ok('sin zoom no hay mapa guía', est.guiaOculta === true);
  ok('con zoom aparece el mapa guía', conZoom.guiaOculta === false);
  ok('la barra de escala dice una distancia', /\d/.test(est.escala), `«${est.escala}» → «${conZoom.escala}»`);
  ok('la escala cambia al acercarse', est.escala !== conZoom.escala, `«${est.escala}» → «${conZoom.escala}»`);

  /* ── 6. teclado ── */
  await pg.evaluate(() => document.querySelector('#lvsvg').focus());
  const antesTec = await pg.evaluate(() => window.camara());
  await pg.keyboard.press('ArrowRight');
  await pg.waitForTimeout(90);
  const trasFlecha = await pg.evaluate(() => window.camara());
  ok('la flecha derecha mueve el mapa', trasFlecha.cx > antesTec.cx, `${antesTec.cx.toFixed(1)} → ${trasFlecha.cx.toFixed(1)}`);
  await pg.keyboard.press('0');
  const trasCero = await quieta(pg);
  ok('la tecla 0 vuelve al mundo entero', Math.abs(trasCero.z - 1) < 0.01, '×' + trasCero.z.toFixed(2));

  /* ── 7. doble clic ── */
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  await pg.mouse.dblclick(caja.x + caja.w * .5, caja.y + caja.h * .5);
  const trasDoble = await quieta(pg);
  ok('el doble clic acerca', trasDoble.z > 1.8, '×' + trasDoble.z.toFixed(2));

  /* ── 8. arrastre y topes ── */
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  const antesArr = await pg.evaluate(() => window.camara());
  await pg.mouse.move(caja.x + caja.w * .6, caja.y + caja.h * .5);
  await pg.mouse.down();
  await pg.mouse.move(caja.x + caja.w * .3, caja.y + caja.h * .5, { steps: 8 });
  await pg.mouse.up();
  await pg.waitForTimeout(420);
  const trasArr = await pg.evaluate(() => window.camara());
  ok('a ×1 el mapa no se puede arrastrar fuera', Math.abs(trasArr.cx - antesArr.cx) < 0.5,
    `${antesArr.cx.toFixed(1)} → ${trasArr.cx.toFixed(1)}`);

  await pg.evaluate(() => { document.querySelector('#lvreset').click(); });
  await quieta(pg);
  await pg.evaluate(() => { const b = document.querySelector('#lvzin'); b.click(); b.click(); });
  await quieta(pg);
  const antesArr2 = await pg.evaluate(() => window.camara());
  await pg.mouse.move(caja.x + caja.w * .6, caja.y + caja.h * .5);
  await pg.mouse.down();
  await pg.mouse.move(caja.x + caja.w * .3, caja.y + caja.h * .5, { steps: 8 });
  await pg.mouse.up();
  await pg.waitForTimeout(500);
  const trasArr2 = await pg.evaluate(() => window.camara());
  ok('con zoom el arrastre sí mueve el mapa', trasArr2.cx > antesArr2.cx + 1,
    `${antesArr2.cx.toFixed(1)} → ${trasArr2.cx.toFixed(1)}`);

  /* ── 9. encuadrar a los visitantes ── */
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  await pg.evaluate(() => document.querySelector('#lvfit').click());
  await quieta(pg);
  const fuera = await pg.evaluate(() => {
    const W = window.MUNDO.w, H = window.MUNDO.h;
    return [...document.querySelectorAll('#lvpuntos .lv-pt')].filter(g => {
      const t = g.getAttribute('transform').match(/translate\(([-\d.]+) ([-\d.]+)\)/);
      return +t[1] < 0 || +t[1] > W || +t[2] < 0 || +t[2] > H;
    }).length;
  });
  ok('«encuadrar» deja a todos los visitantes dentro de la vista', fuera === 0, fuera + ' fuera');

  /* ── 6. la cabecera y los mandos, en el teléfono ──────────────────────────────────
     Aquí vivía el fallo que se comía la pantalla: .lv__tot es flex con wrap y .lv__tot-hoy
     lleva flex:1 (base 0). Pedir el salto de línea con width:100% no sirve —en un contenedor
     flex la base manda sobre width—, así que las cifras del día se quedaban al lado del
     contador con CERO píxeles de ancho, sus cuatro fichas caían una debajo de otra dentro de
     esa columna vacía y sumaban 413 px de alto invisible que estiraban el contador. Se veía
     un recuadro oscuro de 414 px con un «1» perdido en medio y ninguna cifra. */
  await pg.evaluate(() => document.querySelector('#lvreset').click());
  await quieta(pg);
  {
    const L = await pg.evaluate(() => {
      const r = sel => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect();
        return { x: Math.round(b.left), d: Math.round(b.right), y: Math.round(b.top), b: Math.round(b.bottom), w: Math.round(b.width), h: Math.round(b.height) }; };
      const leg = document.querySelector('.lv__leyenda');
      return { tot: r('.lv__tot'), now: r('.lv__tot-now'), hoy: r('.lv__tot-hoy'), wrap: r('.lv__svgwrap'),
        nav: r('.lv__nav'), esc: r('.lv__escala'), leg: r('.lv__leyenda'), bar: r('.lv__bar'), mapa: r('.lv__map'),
        fichas: [...document.querySelectorAll('.lv__tt')].map(e => Math.round(e.getBoundingClientRect().width)),
        legFila: leg ? leg.scrollWidth <= leg.clientWidth + 1 : false,
        corto: getComputedStyle(document.querySelector('.lv__lg-s')).display,
        largo: getComputedStyle(document.querySelector('.lv__lg-l')).display };
    });
    const pisa = (a, c) => !!(a && c) && !(a.d <= c.x || c.d <= a.x || a.b <= c.y || c.b <= a.y);
    ok('las cifras del día tienen ancho de verdad', L.hoy.w > 100, L.hoy.w + 'px');
    ok('las cuatro fichas se ven', L.fichas.length === 4 && L.fichas.every(x => x > 60), L.fichas.join('/'));
    ok('el contador no se estira: manda su contenido', L.now.h <= 110, L.now.h + 'px de alto');
    ok('la cabecera no se come la pantalla', L.tot.h <= (w <= 760 ? 260 : 130), L.tot.h + 'px');
    ok('la tarjeta del mapa cabe en pantalla sin llenarla entera', L.mapa.h <= h * 0.78, L.mapa.h + ' de ' + h);
    ok('los botones de zoom caen dentro del mapa', L.nav.d <= L.wrap.d && L.nav.x >= L.wrap.x && L.nav.b <= L.wrap.b);
    ok('la escala no se pisa con la leyenda', !pisa(L.esc, L.leg));
    ok('los botones no se pisan con la leyenda', !pisa(L.nav, L.leg));
    ok('la escala no se pisa con los botones', !pisa(L.esc, L.nav));
    ok('la barra de arriba no se pisa con los botones', !pisa(L.bar, L.nav));
    if (w <= 760) {
      ok('el contador y las cifras van en líneas distintas', L.hoy.y >= L.now.b - 1, L.now.b + ' → ' + L.hoy.y);
      ok('la leyenda cabe en una fila', L.legFila);
      ok('y usa los nombres cortos', L.corto !== 'none' && L.largo === 'none', L.corto + ' / largo ' + L.largo);
    } else {
      ok('en escritorio contador y cifras comparten fila', L.hoy.y < L.now.b - 1);
      ok('y la leyenda usa los nombres largos', L.corto === 'none' && L.largo !== 'none', L.corto + ' / largo ' + L.largo);
    }
  }
  await pg.screenshot({ path: `/tmp/mapa_${etiqueta}.png`, fullPage: true });
  // Una segunda foto, ya con zoom, para poder mirar nombres, grupos, guía y escala.
  await pg.evaluate(() => { const b = document.querySelector('#lvzin'); b.click(); b.click(); b.click(); });
  await quieta(pg);
  await pg.waitForTimeout(200);
  await pg.screenshot({ path: `/tmp/mapa_${etiqueta}_zoom.png`, clip: { x: caja.x, y: Math.max(0, caja.y - 62), width: caja.w, height: Math.min(caja.h + 62, h) } });
  await ctx.close();
}
await nav.close(); srv.close();
console.log(`\n${total - fallos}/${total} comprobaciones correctas`);
process.exit(fallos ? 1 : 0);
