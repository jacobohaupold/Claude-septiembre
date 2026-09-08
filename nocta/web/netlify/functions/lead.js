// POST /api/lead   {email, name, phone, wa, src, skin, utm, vid}  → lead en Supabase + Resend (bienvenida + audiencia) + WhatsApp.
// POST /api/subscribe (alias histórico). GET /api/lead?unsub=1&email=… → baja.
// POST /api/cart {vid,email,name,items,total} → carrito para recuperación.  GET /api/discount?code=&subtotal= → validación de código.
import { db, dbOk, content, now, esc } from './lib/db.js';
import { sendEmail, addContact, removeContact, tpl } from './lib/mail.js';
import { waSend, normPhone, fill } from './lib/wa.js';
import { getDiscount, serverProducts } from './lib/catalog.js';
import { json } from './lib/auth.js';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
async function automation(key) { try { const r = await db.one('automations', 'key=eq.' + key); return r && r.enabled !== false ? (r.config || {}) : null; } catch (e) { return key === 'welcome_email' ? {} : null; } }

export default async (req, context) => {
  const url = new URL(req.url); const path = url.pathname;
  if (path.endsWith('/discount')) {
    const d = await getDiscount(url.searchParams.get('code'), Number(url.searchParams.get('subtotal') || 0));
    return json(d || { error: 'invalid' }, d && !d.error ? 200 : 404);
  }
  if (req.method === 'GET' && url.searchParams.get('unsub')) {
    const email = String(url.searchParams.get('email') || '').toLowerCase();
    if (EMAIL.test(email) && dbOk()) { try { await db.update('leads', 'email=eq.' + esc(email), { email_optin: false, status: 'unsubscribed' }); } catch (e) { } await removeContact(email); }
    return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Baja · NOCTA</title><body style="font-family:Inter,system-ui,sans-serif;background:#FAF8F3;color:#14213D;display:grid;place-items:center;min-height:100vh;margin:0"><div style="text-align:center;padding:32px"><p style="font-size:22px;font-weight:600">☾ nocta</p><h1 style="font-weight:500;font-size:24px">Ya no te escribiremos.</h1><p style="color:#6B6F7B">Te hemos dado de baja de la newsletter. Tus pedidos y su seguimiento seguirán llegando.</p><a href="/" style="color:#14213D">Volver a la tienda</a></div>`, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  }
  if (req.method !== 'POST') return json({ error: 'method' }, 405);
  let b; try { b = await req.json(); } catch (e) { return json({ error: 'bad' }, 400); }

  if (path.endsWith('/cart')) {
    if (!dbOk() || !b.vid) return json({ ok: false });
    const items = Array.isArray(b.items) ? b.items.slice(0, 20).map(i => ({ slug: String(i.slug || '').slice(0, 60), qty: Number(i.qty) || 1, sub: !!i.sub, opt: String(i.opt || '').slice(0, 40) })) : [];
    const email = String(b.email || '').toLowerCase(); const row = { vid: String(b.vid).slice(0, 60), items, total: Number(b.total) || 0, updated_at: now(), recovered: !!b.recovered };
    if (EMAIL.test(email)) row.email = email; if (b.name) row.name = String(b.name).slice(0, 80);
    try { await db.upsert('carts', [row], 'vid'); } catch (e) { }
    return json({ ok: true });
  }

  const email = String(b.email || '').trim().toLowerCase();
  if (!EMAIL.test(email)) return json({ error: 'email' }, 400);
  const name = String(b.name || '').trim().slice(0, 80); const phone = normPhone(b.phone); const wa = !!(b.wa && phone);
  const src = String(b.src || 'web').slice(0, 30);
  const pop = (await content('popup', null)) || {}; const code = String(b.code || pop.code || 'HOLA10').toUpperCase(); const pct = Number(pop.pct || 10);
  const geo = context && context.geo || {};
  let lead = null, isNew = true;
  if (dbOk()) {
    try {
      const prev = await db.one('leads', 'email=eq.' + esc(email));
      isNew = !prev;
      const row = { email, source: prev ? prev.source : src, skin: b.skin || (prev && prev.skin) || null, code, utm: b.utm || (prev && prev.utm) || {}, last_seen: now(), email_optin: true, status: 'active' };
      if (name) row.name = name; if (phone) row.phone = phone; if (wa) row.wa_optin = true;
      if (geo.country) row.tags = [...new Set([...(prev && prev.tags || []), 'geo:' + (geo.country.code || '').toLowerCase(), 'src:' + src])];
      const r = await db.upsert('leads', [row], 'email'); lead = r && r[0];
    } catch (e) { }
  }
  const tasks = [];
  const cfgMail = await automation('welcome_email');
  if (isNew && cfgMail) { const m = tpl.welcome({ name, code, pct }); tasks.push(sendEmail({ to: email, ...m, template: 'welcome', tags: [{ name: 'flow', value: 'welcome' }], meta: { src } }).then(async r => { if (lead && r && r.id) await db.update('leads', 'id=eq.' + lead.id, { resend_contact: r.id }).catch(() => { }); }).catch(() => { })); }
  tasks.push(addContact({ email, firstName: name.split(' ')[0], lastName: name.split(' ').slice(1).join(' ') }).catch(() => { }));
  const cfgWa = wa && await automation('welcome_whatsapp');
  if (isNew && cfgWa) tasks.push(waSend({ to: phone, kind: 'welcome', text: fill(cfgWa.text || 'Hola {nombre} 🌙 Soy NOCTA. Tu código *{code}* te descuenta un {pct} % en todo: {url}\nResponde a este mensaje si tienes cualquier duda sobre tu piel.', { nombre: name ? name.split(' ')[0] : '', code, pct, url: (process.env.SITE_URL || 'https://nocta-store.netlify.app') + '/?code=' + code }), meta: { src } }).catch(() => { }));
  await Promise.all(tasks);
  return json({ ok: true, code, pct, isNew });
};
export const config = { path: ['/api/lead', '/api/subscribe', '/api/cart', '/api/discount'] };
