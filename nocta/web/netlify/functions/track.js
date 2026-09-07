// Recibe eventos del front (sendBeacon) y los guarda en Netlify Blobs, particionados por día.
// Sin cuentas externas: funciona en cuanto el sitio está desplegado en Netlify.
import { getStore } from '@netlify/blobs';

const UA_BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview/i;

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('ok', { status: 200 });
  let events;
  try { events = await req.json(); } catch (e) { return new Response('bad', { status: 400 }); }
  if (!Array.isArray(events)) events = [events];
  if (UA_BOT.test(req.headers.get('user-agent') || '')) return new Response('skip', { status: 202 });
  const geo = context.geo || {};
  const day = new Date().toISOString().slice(0, 10);
  const store = getStore({ name: 'events', consistency: 'strong' });
  const key = `${day}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`;
  const enriched = events.slice(0, 50).map(e => ({
    ev: String(e.ev || '').slice(0, 40), t: Number(e.t) || Date.now(), sid: String(e.sid || '').slice(0, 40), vid: String(e.vid || '').slice(0, 40),
    path: String(e.path || '').slice(0, 300), ref: String(e.ref || '').slice(0, 300), utm: e.utm || {}, dev: e.dev, lang: e.lang, sw: e.sw, title: String(e.title || '').slice(0, 120),
    d: e.d || {}, country: geo.country && geo.country.code, city: geo.city, ua: (req.headers.get('user-agent') || '').slice(0, 160)
  }));
  await store.setJSON(key, enriched);
  return new Response('ok', { status: 202, headers: { 'access-control-allow-origin': '*' } });
};

export const config = { path: '/api/track' };
