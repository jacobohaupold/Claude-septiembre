// Eventos del front (sendBeacon) → tabla events de Supabase (y Blobs si no hay DB).
import { db, dbOk } from './lib/db.js';
const UA_BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless/i;

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('ok', { status: 200 });
  let events; try { events = await req.json(); } catch (e) { return new Response('bad', { status: 400 }); }
  if (!Array.isArray(events)) events = [events];
  if (UA_BOT.test(req.headers.get('user-agent') || '')) return new Response('skip', { status: 202 });
  const geo = context.geo || {};
  const rows = events.slice(0, 50).map(e => ({
    t: new Date(Number(e.t) || Date.now()).toISOString(), ev: String(e.ev || '').slice(0, 40), sid: String(e.sid || '').slice(0, 40), vid: String(e.vid || '').slice(0, 40),
    path: String(e.path || '').slice(0, 300), ref: String(e.ref || '').slice(0, 300), utm: e.utm || {}, dev: e.dev || 'desktop', country: geo.country && geo.country.code || null,
    d: { ...(e.d || {}), lang: e.lang, sw: e.sw, title: String(e.title || '').slice(0, 120), city: geo.city || null }
  })).filter(r => r.ev);
  if (rows.length) {
    if (dbOk()) { try { await db.insert('events', rows); } catch (e) { console.error('events', e.message); } }
    else { try { const { getStore } = await import('@netlify/blobs'); const store = getStore({ name: 'events', consistency: 'strong' }); await store.setJSON(`${rows[0].t.slice(0, 10)}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`, rows.map(r => ({ ...r, t: new Date(r.t).getTime() }))); } catch (e) { } }
  }
  return new Response('ok', { status: 202, headers: { 'access-control-allow-origin': '*' } });
};
export const config = { path: '/api/track' };
