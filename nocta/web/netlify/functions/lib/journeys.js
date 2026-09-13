// Recorridos: reconstruye qué hace cada persona en la web a partir de la tabla `events`
// y lo cruza con pedidos, carritos, leads, clientes y suscripciones.
//
// AVISO SOBRE LOS NOMBRES, que están invertidos desde el primer día y conviene saberlo:
//   · `sid` se guarda en localStorage   → identifica a la PERSONA (sobrevive a cerrar el navegador)
//   · `vid` se guarda en sessionStorage → identifica una VISITA (una sesión suelta)
// Es al revés de lo que sugieren las siglas. No se renombran porque hay datos históricos
// guardados así y renombrarlos partiría el historial; aquí dentro se traducen a
// persona/visita y de puertas afuera solo se habla de persona y de visita.
import { db, esc } from './db.js';

const TOPE_EVENTOS = 20000;   // techo por consulta; si se supera, se avisa en la respuesta

/* ---------- el embudo ---------- */
// Cada etapa es un peldaño. La etapa de una persona es el peldaño más alto que ha pisado.
export const ETAPAS = [
  { k: 'visita',   n: 'Entró en la web',      evs: ['page_view'] },
  { k: 'producto', n: 'Miró un producto',     evs: ['view_item', 'view_gallery', 'select_qty', 'select_mode', 'packchip'] },
  { k: 'carrito',  n: 'Añadió al carrito',    evs: ['add_to_cart', 'view_cart'] },
  { k: 'checkout', n: 'Empezó el pago',       evs: ['begin_checkout', 'checkout_view', 'checkout_start_form'] },
  { k: 'datos',    n: 'Metió los datos',      evs: ['add_payment_info', 'apply_code'] },
  { k: 'compra',   n: 'Compró',               evs: ['purchase'] },
];
const NIVEL = {};
ETAPAS.forEach((e, i) => e.evs.forEach(ev => { NIVEL[ev] = Math.max(NIVEL[ev] || 0, i); }));

/* ---------- de dónde viene ---------- */
const REDES = [
  [/instagram|l\.instagram/i, 'Instagram'], [/facebook|l\.facebook|fb\.com/i, 'Facebook'],
  [/tiktok/i, 'TikTok'], [/youtube|youtu\.be/i, 'YouTube'], [/pinterest/i, 'Pinterest'],
  [/twitter|t\.co|x\.com/i, 'X'], [/whatsapp|wa\.me/i, 'WhatsApp'], [/reddit/i, 'Reddit'],
  [/linkedin/i, 'LinkedIn'], [/telegram/i, 'Telegram'],
];
const BUSCADORES = [[/google/i, 'Google'], [/bing/i, 'Bing'], [/duckduckgo/i, 'DuckDuckGo'], [/yahoo/i, 'Yahoo'], [/ecosia/i, 'Ecosia'], [/brave/i, 'Brave']];

// Devuelve {tipo, fuente, campana, contenido, detalle}. `tipo` es lo que se pinta como etiqueta.
export function origen(utm, ref) {
  const u = utm || {};
  const src = (u.utm_source || '').toLowerCase();
  const med = (u.utm_medium || '').toLowerCase();
  const base = { fuente: u.utm_source || null, campana: u.utm_campaign || null, contenido: u.utm_content || null, termino: u.utm_term || null, ref: ref || null };
  if (u.fbclid || /facebook|meta|instagram|ig/.test(src)) return { ...base, tipo: 'Meta Ads', detalle: u.utm_campaign || 'Meta' };
  if (u.ttclid || /tiktok/.test(src)) return { ...base, tipo: 'TikTok Ads', detalle: u.utm_campaign || 'TikTok' };
  if (u.gclid || /google/.test(src) && /cpc|ads|paid/.test(med)) return { ...base, tipo: 'Google Ads', detalle: u.utm_campaign || 'Google' };
  if (/email|newsletter|resend/.test(src) || /email/.test(med)) return { ...base, tipo: 'Email', detalle: u.utm_campaign || 'Email' };
  if (/whatsapp|wa/.test(src)) return { ...base, tipo: 'WhatsApp', detalle: u.utm_campaign || 'WhatsApp' };
  if (u.utm_source) return { ...base, tipo: 'Campaña', detalle: `${u.utm_source}${u.utm_medium ? ' · ' + u.utm_medium : ''}` };
  if (!ref) return { ...base, tipo: 'Directo', detalle: 'Escribió la dirección o la tenía guardada' };
  try {
    const h = new URL(ref).hostname.replace(/^www\./, '');
    if (/nocta-store\.netlify\.app|nocta\./i.test(h)) return { ...base, tipo: 'Interno', detalle: h };
    for (const [rx, n] of REDES) if (rx.test(h)) return { ...base, tipo: n, detalle: 'Enlace social, sin campaña' };
    for (const [rx, n] of BUSCADORES) if (rx.test(h)) return { ...base, tipo: n + ' orgánico', detalle: 'Búsqueda sin pagar' };
    return { ...base, tipo: 'Enlace', detalle: h };
  } catch (e) { return { ...base, tipo: 'Enlace', detalle: String(ref).slice(0, 60) }; }
}

/* ---------- lectura de eventos ---------- */
async function traerEventos(desde, filtro) {
  const q = ['select=*', 't=gte.' + esc(desde), 'order=t.asc', 'limit=' + TOPE_EVENTOS];
  if (filtro) q.push(filtro);
  return (await db.select('events', q.join('&'))) || [];
}
const dias = n => new Date(Date.now() - Math.max(1, n) * 86400000).toISOString();

/* ---------- agregación por persona ---------- */
function agrupar(eventos) {
  const gente = new Map();
  for (const e of eventos) {
    const id = e.sid || e.vid; if (!id) continue;
    let p = gente.get(id);
    if (!p) {
      p = { id, primera: e.t, ultima: e.t, visitas: new Set(), eventos: 0, paginas: 0, segundos: 0,
            dev: e.dev || null, pais: e.country || null, ciudad: (e.d && e.d.city) || null, idioma: (e.d && e.d.lang) || null,
            nivel: 0, ultimo_ev: null, ultima_pagina: null, ultimo_titulo: null,
            origen: origen(e.utm, e.ref), productos: new Set(), anadidos: new Set(),
            compras: 0, gastado: 0, pedidos: [], rutas: [] };
      gente.set(id, p);
    }
    p.ultima = e.t; p.eventos++;
    if (e.vid) p.visitas.add(e.vid);
    if (e.ev === 'page_view') { p.paginas++; if (e.path) p.rutas.push({ t: e.t, path: e.path, titulo: (e.d && e.d.title) || null }); }
    if (e.ev === 'leave' && e.d && e.d.secs) p.segundos += Number(e.d.secs) || 0;
    if (e.dev) p.dev = e.dev;
    if (e.country) p.pais = e.country;
    if (e.d && e.d.city) p.ciudad = e.d.city;
    if (e.ev === 'view_item' && e.d && e.d.slug) p.productos.add(e.d.slug);
    if (e.ev === 'add_to_cart' && e.d && e.d.slug) p.anadidos.add(e.d.slug);
    if (e.ev === 'purchase') { p.compras++; p.gastado += Number((e.d && e.d.value) || 0); if (e.d && e.d.order) p.pedidos.push(e.d.order); }
    const n = NIVEL[e.ev]; if (n != null && n > p.nivel) p.nivel = n;
    // el último evento con página: es «dónde se quedó»
    p.ultimo_ev = e.ev;
    if (e.path) { p.ultima_pagina = e.path; p.ultimo_titulo = (e.d && e.d.title) || p.ultimo_titulo; }
    // el origen se fija con la PRIMERA campaña que se vio, no con la última
    if (p.origen.tipo === 'Directo' || p.origen.tipo === 'Interno') {
      const o = origen(e.utm, e.ref);
      if (o.tipo !== 'Directo' && o.tipo !== 'Interno') p.origen = o;
    }
  }
  return gente;
}

/* ---------- identidad: quién es cada persona ---------- */
// Se cruza por vid (que es la persona) contra carritos y pedidos, y de ahí al email.
async function identidades(ids) {
  const mapa = new Map();
  if (!ids.length) return mapa;
  const lote = ids.slice(0, 300).map(x => '"' + String(x).replace(/"/g, '') + '"').join(',');
  const poner = (id, datos) => { const p = mapa.get(id) || {}; mapa.set(id, { ...p, ...Object.fromEntries(Object.entries(datos).filter(([, v]) => v != null && v !== '')) }); };
  try {
    const carts = await db.select('carts', `select=*&vid=in.(${lote})&limit=500`);
    (carts || []).forEach(c => poner(c.vid, { email: c.email, nombre: c.name, carrito: { total: c.total, items: c.items, recuperado: c.recovered, actualizado: c.updated_at }, via: 'carrito' }));
  } catch (e) { }
  try {
    const ped = await db.select('orders', `select=id,email,name,total,status,created_at,vid,sid,items,address,tracking,carrier&or=(vid.in.(${lote}),sid.in.(${lote}))&limit=500`);
    (ped || []).forEach(o => {
      [o.vid, o.sid].filter(Boolean).forEach(k => {
        const p = mapa.get(k) || {};
        poner(k, { email: o.email || p.email, nombre: o.name || p.nombre, via: 'pedido' });
        const lista = (mapa.get(k).pedidos || []).slice(); lista.push(o); mapa.get(k).pedidos = lista;
      });
    });
  } catch (e) { }
  return mapa;
}

async function porEmail(tabla, emails, campos) {
  if (!emails.length) return new Map();
  const lote = emails.slice(0, 300).map(x => '"' + String(x).replace(/"/g, '') + '"').join(',');
  try {
    const rows = await db.select(tabla, `select=${campos}&email=in.(${lote})&limit=500`);
    const m = new Map(); (rows || []).forEach(r => { const k = String(r.email || '').toLowerCase(); if (!m.has(k)) m.set(k, []); m.get(k).push(r); });
    return m;
  } catch (e) { return new Map(); }
}

/* ---------- API: la lista de personas ---------- */
export async function people({ days = 14, q = '', etapa = '', origenFiltro = '', limite = 300 } = {}) {
  const eventos = await traerEventos(dias(days));
  const gente = agrupar(eventos);
  const ids = [...gente.keys()];
  const ident = await identidades(ids);

  let filas = ids.map(id => {
    const p = gente.get(id); const i = ident.get(id) || {};
    const pedidos = (i.pedidos || []);
    const pagados = pedidos.filter(o => ['paid', 'shipped', 'delivered'].includes(o.status));
    return {
      id, email: i.email || null, nombre: i.nombre || null, identificado_por: i.via || null,
      primera: p.primera, ultima: p.ultima,
      visitas: p.visitas.size || 1, paginas: p.paginas, eventos: p.eventos, segundos: p.segundos,
      dev: p.dev, pais: p.pais, ciudad: p.ciudad, idioma: p.idioma,
      origen: p.origen, etapa: ETAPAS[p.nivel].k, etapa_nombre: ETAPAS[p.nivel].n, nivel: p.nivel,
      se_quedo_en: p.ultima_pagina, se_quedo_titulo: p.ultimo_titulo, ultimo_ev: p.ultimo_ev,
      productos: [...p.productos], anadidos: [...p.anadidos],
      pedidos: pedidos.map(o => ({ id: o.id, total: o.total, status: o.status, created_at: o.created_at })),
      compras: pagados.length, gastado: pagados.reduce((a, o) => a + (Number(o.total) || 0), 0),
      carrito: i.carrito || null,
    };
  });

  if (etapa) filas = filas.filter(f => f.etapa === etapa);
  if (origenFiltro) filas = filas.filter(f => f.origen.tipo === origenFiltro);
  if (q) { const s = q.toLowerCase(); filas = filas.filter(f => [f.id, f.email, f.nombre, f.se_quedo_en, f.origen.tipo, f.ciudad, f.pais].some(v => String(v || '').toLowerCase().includes(s))); }
  filas.sort((a, b) => (a.ultima < b.ultima ? 1 : -1));

  // el embudo y los cortes, calculados sobre TODAS las personas del periodo, no sobre el filtro
  const todas = ids.map(id => gente.get(id));
  const embudo = ETAPAS.map((e, i) => ({ ...e, n: e.n, personas: todas.filter(p => p.nivel >= i).length }));
  const salidas = {}; todas.forEach(p => { if (p.nivel < 5 && p.ultima_pagina) { const k = p.ultima_pagina.split('?')[0]; salidas[k] = (salidas[k] || 0) + 1; } });
  const fuentes = {}; todas.forEach(p => { fuentes[p.origen.tipo] = (fuentes[p.origen.tipo] || 0) + 1; });
  const disp = {}; todas.forEach(p => { disp[p.dev || 'desconocido'] = (disp[p.dev || 'desconocido'] || 0) + 1; });
  const paises = {}; todas.forEach(p => { if (p.pais) paises[p.pais] = (paises[p.pais] || 0) + 1; });

  return {
    total: filas.length, personas: filas.slice(0, limite), embudo,
    salidas: Object.entries(salidas).sort((a, b) => b[1] - a[1]).slice(0, 12),
    fuentes: Object.entries(fuentes).sort((a, b) => b[1] - a[1]),
    dispositivos: Object.entries(disp).sort((a, b) => b[1] - a[1]),
    paises: Object.entries(paises).sort((a, b) => b[1] - a[1]).slice(0, 12),
    eventos_leidos: eventos.length, tope: eventos.length >= TOPE_EVENTOS, dias: days,
  };
}

/* ---------- API: la ficha de una persona ---------- */
export async function person({ id, days = 180 } = {}) {
  if (!id) throw Object.assign(new Error('falta la persona'), { status: 400 });
  const clave = String(id).replace(/"/g, '');
  const eventos = await traerEventos(dias(days), `or=(sid.eq.${esc(clave)},vid.eq.${esc(clave)})`);
  if (!eventos.length) return { id, vacio: true };

  const gente = agrupar(eventos); const p = gente.get(id) || gente.values().next().value;
  const ident = (await identidades([id])).get(id) || {};

  // Se parte en visitas. Una visita es un `vid`; si no lo hay, se corta por 30 minutos de silencio.
  const visitas = []; let actual = null; let ultimoT = 0;
  for (const e of eventos) {
    const t = new Date(e.t).getTime();
    const cortar = !actual || (e.vid && actual.vid && e.vid !== actual.vid) || (t - ultimoT > 30 * 60000);
    if (cortar) { actual = { vid: e.vid || null, inicio: e.t, fin: e.t, eventos: [], paginas: [], origen: origen(e.utm, e.ref), dev: e.dev, pais: e.country }; visitas.push(actual); }
    actual.fin = e.t; ultimoT = t;
    actual.eventos.push({ t: e.t, ev: e.ev, path: e.path, titulo: (e.d && e.d.title) || null, d: e.d || {} });
    if (e.ev === 'page_view') actual.paginas.push({ t: e.t, path: e.path, titulo: (e.d && e.d.title) || null });
  }
  // segundos y scroll de cada página, a partir del evento `leave` que la cierra
  visitas.forEach(v => {
    v.segundos = v.eventos.filter(x => x.ev === 'leave').reduce((a, x) => a + (Number(x.d.secs) || 0), 0);
    v.scroll_max = Math.max(0, ...v.eventos.filter(x => x.ev === 'scroll').map(x => Number(x.d.pct) || 0));
    v.nivel = Math.max(0, ...v.eventos.map(x => NIVEL[x.ev] || 0));
    v.etapa = ETAPAS[v.nivel].k; v.etapa_nombre = ETAPAS[v.nivel].n;
    v.compro = v.eventos.some(x => x.ev === 'purchase');
  });

  const email = ident.email || null;
  let lead = null, cliente = null, subs = [], mensajes = [];
  if (email) {
    const e1 = await porEmail('leads', [email], '*'); lead = (e1.get(email.toLowerCase()) || [])[0] || null;
    const e2 = await porEmail('customers', [email], '*'); cliente = (e2.get(email.toLowerCase()) || [])[0] || null;
    const e3 = await porEmail('subscriptions', [email], '*'); subs = e3.get(email.toLowerCase()) || [];
    // La columna es to_addr, no email. Con `email` PostgREST devuelve 400 y antes el fallo se perdia.
    try { mensajes = await db.select('messages', `select=*&to_addr=eq.${esc(email)}&order=created_at.desc&limit=30`) || []; }
    catch (e) { console.error('journeys/mensajes', e.message); }
  }

  const pedidos = (ident.pedidos || []).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return {
    id, email, nombre: ident.nombre || (cliente && cliente.name) || (lead && lead.name) || null,
    identificado_por: ident.via || (email ? 'email' : null),
    primera: p.primera, ultima: p.ultima, visitas_n: visitas.length,
    paginas: p.paginas, eventos_n: p.eventos, segundos: p.segundos,
    dev: p.dev, pais: p.pais, ciudad: p.ciudad, idioma: p.idioma,
    origen: p.origen, etapa: ETAPAS[p.nivel].k, etapa_nombre: ETAPAS[p.nivel].n, nivel: p.nivel,
    se_quedo_en: p.ultima_pagina, se_quedo_titulo: p.ultimo_titulo,
    productos: [...p.productos], anadidos: [...p.anadidos],
    visitas, pedidos, carrito: ident.carrito || null, lead, cliente, subs, mensajes,
    eventos_leidos: eventos.length, tope: eventos.length >= TOPE_EVENTOS, dias_mirados: days,
  };
}
