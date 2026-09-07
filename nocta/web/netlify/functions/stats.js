// Agrega los eventos guardados en Blobs y devuelve el JSON que consume /admin (protegido con ADMIN_TOKEN).
import { getStore } from '@netlify/blobs';

function dayKeys(days) { const out = []; for (let i = 0; i < days; i++) { const d = new Date(Date.now() - i * 864e5); out.push(d.toISOString().slice(0, 10)); } return out; }

export default async (req) => {
  const url = new URL(req.url);
  const token = req.headers.get('x-admin-token') || url.searchParams.get('token');
  // Si ADMIN_TOKEN está definido en Netlify, el panel exige ese token; si no está definido, el panel es de acceso libre.
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
  const days = Math.min(90, Number(url.searchParams.get('days') || 14));
  const store = getStore({ name: 'events', consistency: 'strong' });
  const orders = getStore({ name: 'orders', consistency: 'strong' });
  const ev = [];
  for (const day of dayKeys(days)) {
    const { blobs } = await store.list({ prefix: day + '/' });
    for (const b of blobs) { const arr = await store.get(b.key, { type: 'json' }); if (Array.isArray(arr)) ev.push(...arr); }
  }
  // ---- agregados
  const byDay = {}, sessions = {}, pages = {}, sources = {}, products = {}, countries = {}, devices = {}, exits = {}, scroll = {}, leaveSecs = [];
  const inc = (o, k, n = 1) => { o[k] = (o[k] || 0) + n; };
  for (const e of ev) {
    const day = new Date(e.t).toISOString().slice(0, 10);
    byDay[day] = byDay[day] || { views: 0, sessions: new Set(), atc: 0, checkout: 0, orders: 0, revenue: 0, leads: 0 };
    const s = sessions[e.vid] = sessions[e.vid] || { first: e.t, last: e.t, pages: 0, atc: 0, checkout: 0, purchase: 0, src: null, landing: null, dev: e.dev, country: e.country, sid: e.sid };
    s.last = Math.max(s.last, e.t); byDay[day].sessions.add(e.vid);
    if (!s.src) { const u = e.utm || {}; s.src = u.utm_source ? `${u.utm_source}/${u.utm_medium || ''}` : (u.fbclid ? 'facebook/paid' : u.ttclid ? 'tiktok/paid' : u.gclid ? 'google/paid' : e.ref ? new URL(e.ref).hostname.replace('www.', '') : 'directo'); s.landing = e.path; }
    switch (e.ev) {
      case 'page_view': s.pages++; byDay[day].views++; inc(pages, e.path.split('?')[0]); if (e.country) inc(countries, e.country); inc(devices, e.dev || 'desktop'); break;
      case 'view_item': inc(products, e.d.slug + '|views'); break;
      case 'add_to_cart': s.atc++; byDay[day].atc++; inc(products, e.d.slug + '|atc'); break;
      case 'begin_checkout': s.checkout++; byDay[day].checkout++; break;
      case 'purchase': s.purchase++; byDay[day].orders++; byDay[day].revenue += Number(e.d.value) || 0; (e.d.items || []).forEach(i => inc(products, i.slug + '|sold', i.qty || 1)); break;
      case 'lead': byDay[day].leads++; break;
      case 'leave': inc(exits, e.path.split('?')[0]); leaveSecs.push(e.d.secs || 0); if (e.d.scroll) inc(scroll, e.path.split('?')[0] + '|' + e.d.scroll); break;
    }
  }
  const sess = Object.values(sessions);
  const funnel = { sessions: sess.length, product: sess.filter(s => s.pages > 0 && ev.some(e => e.vid === s.vid && e.ev === 'view_item')).length, atc: sess.filter(s => s.atc).length, checkout: sess.filter(s => s.checkout).length, purchase: sess.filter(s => s.purchase).length };
  const abandoned = sess.filter(s => s.atc && !s.purchase).length;
  sess.forEach(s => inc(sources, s.src));
  const landing = {}; sess.forEach(s => inc(landing, (s.landing || '/').split('?')[0]));
  const bounce = sess.filter(s => s.pages <= 1).length;
  const prod = {}; Object.entries(products).forEach(([k, v]) => { const [slug, m] = k.split('|'); prod[slug] = prod[slug] || { views: 0, atc: 0, sold: 0 }; prod[slug][m] = v; });
  const daily = Object.entries(byDay).sort().map(([d, v]) => ({ day: d, views: v.views, sessions: v.sessions.size, atc: v.atc, checkout: v.checkout, orders: v.orders, revenue: +v.revenue.toFixed(2), leads: v.leads }));
  // pedidos guardados por checkout/webhook
  let recentOrders = [];
  try { const { blobs } = await orders.list(); for (const b of blobs.slice(-50)) { const o = await orders.get(b.key, { type: 'json' }); if (o) recentOrders.push(o); } } catch (e) { }
  recentOrders.sort((a, b) => (b.t || 0) - (a.t || 0));
  const totalRevenue = daily.reduce((a, d) => a + d.revenue, 0), totalOrders = daily.reduce((a, d) => a + d.orders, 0);
  return new Response(JSON.stringify({
    days, events: ev.length, sessions: sess.length, bounce_rate: sess.length ? +(bounce / sess.length * 100).toFixed(1) : 0, avg_secs: leaveSecs.length ? Math.round(leaveSecs.reduce((a, b) => a + b, 0) / leaveSecs.length) : 0,
    funnel, abandoned_carts: abandoned, cvr: sess.length ? +(funnel.purchase / sess.length * 100).toFixed(2) : 0, aov: totalOrders ? +(totalRevenue / totalOrders).toFixed(2) : 0, revenue: +totalRevenue.toFixed(2), orders: totalOrders,
    daily, sources: top(sources), landing: top(landing), pages: top(pages), exits: top(exits), countries: top(countries), devices: top(devices), products: prod, scroll: top(scroll, 40), recentOrders: recentOrders.slice(0, 30)
  }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
};
function top(o, n = 15) { return Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n); }
export const config = { path: '/api/stats' };
