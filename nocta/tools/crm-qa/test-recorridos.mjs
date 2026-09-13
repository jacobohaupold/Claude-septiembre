/* Prueba de la reconstrucción de recorridos SIN base de datos: se interceptan las
   llamadas de red que hace lib/db.js y se le devuelven eventos inventados, así que
   lo que se prueba es el código de verdad, no una copia.
   Uso: node nocta/tools/crm-qa/test-recorridos.mjs  */
process.env.SUPABASE_URL = 'https://ejemplo.invalid';
process.env.SUPABASE_KEY = 'clave-de-mentira';

const T0 = Date.parse('2026-09-10T10:00:00Z');
const t = min => new Date(T0 + min * 60000).toISOString();

// Tres personas con recorridos distintos a propósito:
//  ana  → viene de Meta, mira producto, añade al carrito y se queda ahí (no paga)
//  brais→ viene de Google orgánico y compra, en dos visitas distintas
//  cris → entra directo, ve una página y se va (rebote)
const EVENTOS = [
  { t: t(0),  ev: 'page_view', sid: 'ana', vid: 'v1', path: '/', ref: '', utm: { utm_source: 'facebook', utm_campaign: 'nariz-frio', utm_content: 'ad7', fbclid: 'x' }, dev: 'mobile', country: 'ES', d: { title: 'Portada', city: 'Madrid', lang: 'es' } },
  { t: t(1),  ev: 'view_item', sid: 'ana', vid: 'v1', path: '/producto.html', utm: {}, dev: 'mobile', d: { slug: 'parches-nariz' } },
  { t: t(2),  ev: 'add_to_cart', sid: 'ana', vid: 'v1', path: '/producto.html', utm: {}, dev: 'mobile', d: { slug: 'parches-nariz', qty: 1, value: 16.95 } },
  { t: t(3),  ev: 'leave', sid: 'ana', vid: 'v1', path: '/producto.html', utm: {}, dev: 'mobile', d: { secs: 95, scroll: 70 } },

  { t: t(10), ev: 'page_view', sid: 'brais', vid: 'v2', path: '/', ref: 'https://www.google.com/', utm: {}, dev: 'desktop', country: 'ES', d: { title: 'Portada' } },
  { t: t(11), ev: 'view_item', sid: 'brais', vid: 'v2', path: '/producto.html', utm: {}, dev: 'desktop', d: { slug: 'parches-nariz' } },
  { t: t(12), ev: 'leave', sid: 'brais', vid: 'v2', path: '/producto.html', utm: {}, dev: 'desktop', d: { secs: 40 } },
  // segunda visita, al día siguiente: compra
  { t: t(1500), ev: 'page_view', sid: 'brais', vid: 'v3', path: '/producto.html', utm: {}, dev: 'desktop', d: { title: 'Parches' } },
  { t: t(1501), ev: 'add_to_cart', sid: 'brais', vid: 'v3', path: '/producto.html', utm: {}, dev: 'desktop', d: { slug: 'parches-nariz', qty: 2, value: 33.9 } },
  { t: t(1502), ev: 'begin_checkout', sid: 'brais', vid: 'v3', path: '/checkout.html', utm: {}, dev: 'desktop', d: { value: 33.9 } },
  { t: t(1503), ev: 'add_payment_info', sid: 'brais', vid: 'v3', path: '/checkout.html', utm: {}, dev: 'desktop', d: {} },
  { t: t(1504), ev: 'purchase', sid: 'brais', vid: 'v3', path: '/gracias.html', utm: {}, dev: 'desktop', d: { value: 33.9, order: 'NC-1' } },

  { t: t(20), ev: 'page_view', sid: 'cris', vid: 'v4', path: '/catalogo.html', ref: '', utm: {}, dev: 'mobile', country: 'FR', d: { title: 'Catálogo' } },
  { t: t(21), ev: 'leave', sid: 'cris', vid: 'v4', path: '/catalogo.html', utm: {}, dev: 'mobile', d: { secs: 8 } },
];
const CARRITOS = [{ vid: 'ana', email: 'ana@ejemplo.es', name: 'Ana', items: [{ slug: 'parches-nariz', qty: 1 }], total: 16.95, recovered: false, updated_at: t(3) }];
const PEDIDOS = [{ id: 'NC-1', email: 'brais@ejemplo.es', name: 'Brais', total: 33.9, status: 'paid', created_at: t(1504), vid: 'v3', sid: 'brais', items: [{ slug: 'parches-nariz', qty: 2 }] }];

const real = globalThis.fetch;
globalThis.fetch = async (u, opt) => {
  const url = String(u);
  const cuerpo = tabla => {
    if (tabla === 'events') {
      const m = /or=\(sid\.eq\.([^,]+),vid\.eq\.([^)]+)\)/.exec(decodeURIComponent(url));
      if (m) { const k = decodeURIComponent(m[1]); return EVENTOS.filter(e => e.sid === k || e.vid === k); }
      return EVENTOS;
    }
    if (tabla === 'carts') { const m = /vid=in\.\(([^)]*)\)/.exec(decodeURIComponent(url)); const ids = m ? m[1].split(',').map(s => s.replace(/"/g, '')) : []; return CARRITOS.filter(c => ids.includes(c.vid)); }
    if (tabla === 'orders') { return PEDIDOS; }
    return [];
  };
  const tabla = (url.split('/rest/v1/')[1] || '').split('?')[0];
  return new Response(JSON.stringify(cuerpo(tabla)), { status: 200, headers: { 'content-type': 'application/json', 'content-range': '0-0/1' } });
};

const { people, person } = await import('../../web/netlify/functions/lib/journeys.js');
let fallos = 0;
const comprobar = (que, real2, esperado) => {
  const ok = JSON.stringify(real2) === JSON.stringify(esperado);
  if (!ok) { fallos++; console.log(`  FALLA  ${que}\n         esperado ${JSON.stringify(esperado)}\n         real     ${JSON.stringify(real2)}`); }
  else console.log(`  ok     ${que} = ${JSON.stringify(real2)}`);
};

console.log('MAPA DE PERSONAS');
const d = await people({ days: 30 });
comprobar('personas encontradas', d.total, 3);
comprobar('entraron en la web', d.embudo[0].personas, 3);
comprobar('miraron producto', d.embudo[1].personas, 2);
comprobar('añadieron al carrito', d.embudo[2].personas, 2);
comprobar('empezaron el pago', d.embudo[3].personas, 1);
comprobar('compraron', d.embudo[5].personas, 1);
const ana = d.personas.find(p => p.id === 'ana');
comprobar('a Ana la trae Meta Ads', ana.origen.tipo, 'Meta Ads');
comprobar('la campaña de Ana', ana.origen.campana, 'nariz-frio');
comprobar('Ana se queda en el carrito', ana.etapa, 'carrito');
comprobar('sabemos el email de Ana por el carrito', ana.email, 'ana@ejemplo.es');
comprobar('Ana se quedó en la ficha de producto', ana.se_quedo_en, '/producto.html');
const brais = d.personas.find(p => p.id === 'brais');
comprobar('a Brais lo trae Google orgánico', brais.origen.tipo, 'Google orgánico');
comprobar('Brais llegó a comprar', brais.etapa, 'compra');
comprobar('Brais hizo 2 visitas', brais.visitas, 2);
comprobar('Brais gastó', brais.gastado, 33.9);
comprobar('el email de Brais sale del pedido', brais.email, 'brais@ejemplo.es');
const cris = d.personas.find(p => p.id === 'cris');
comprobar('Cris entra directo', cris.origen.tipo, 'Directo');
comprobar('Cris se queda en la primera página', cris.etapa, 'visita');
comprobar('la página donde más se cae la gente', d.salidas[0][0], '/producto.html');

console.log('\nFICHA DE UNA PERSONA');
const f = await person({ id: 'brais', days: 30 });
comprobar('visitas reconstruidas', f.visitas_n, 2);
comprobar('la primera visita no compró', f.visitas[0].compro, false);
comprobar('la segunda visita sí compró', f.visitas[1].compro, true);
comprobar('el pedido queda enlazado', f.pedidos.map(o => o.id), ['NC-1']);
comprobar('etapa final', f.etapa, 'compra');
const fa = await person({ id: 'ana', days: 30 });
comprobar('Ana tiene carrito abierto', !!fa.carrito, true);
comprobar('el carrito de Ana vale', fa.carrito.total, 16.95);

globalThis.fetch = real;
console.log(fallos ? `\nFALLA: ${fallos} comprobaciones` : '\nTODO CORRECTO.');
process.exit(fallos ? 1 : 0);
