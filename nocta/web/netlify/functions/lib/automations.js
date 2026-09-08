// Automatizaciones (cron cada hora + botón «ejecutar ahora» del CRM): carrito abandonado, guía post-compra, winback,
// recordatorio de renovación y campañas programadas.
import { db, dbOk, esc, now } from './db.js';
import { sendEmail, tpl } from './mail.js';
import { waSend } from './wa.js';
import { sendCampaign } from './campaigns.js';
import { getCatalog } from './catalog.js';

async function auto(key) { try { const r = await db.one('automations', 'key=eq.' + key); return r && r.enabled ? (r.config || {}) : null; } catch (e) { return null; } }
const ago = h => new Date(Date.now() - h * 36e5).toISOString();
const SITE = () => (process.env.SITE_URL || process.env.URL || 'https://nocta-store.netlify.app').replace(/\/$/, '');

export async function runAutomations() {
  if (!dbOk()) return { error: 'db' };
  const out = { abandoned: 0, guide: 0, winback: 0, renewal: 0, campaigns: 0, errors: [] };
  const cat = await getCatalog(); const P = Object.fromEntries(cat.products.map(p => [p.slug, p]));
  // 1) carrito abandonado
  const ab = await auto('abandoned_cart');
  if (ab) {
    const delay = ab.delay_h != null ? Number(ab.delay_h) : (ab.delay_min ? Number(ab.delay_min) / 60 : 3), code = ab.code || 'VUELVE10', pct = Number(ab.pct || 10);
    try {
      const carts = await db.select('carts', 'select=*&email=not.is.null&recovered=eq.false&reminded_at=is.null&updated_at=lt.' + ago(delay) + '&updated_at=gt.' + ago(96) + '&limit=200');
      for (const c of carts || []) {
        const paid = await db.one('orders', 'email=eq.' + esc(c.email) + '&status=in.(paid,shipped,delivered)&created_at=gt.' + c.updated_at);
        if (paid || !(c.items || []).length) { await db.update('carts', 'vid=eq.' + esc(c.vid), { recovered: !!paid, reminded_at: now() }); continue; }
        const items = c.items.map(i => { const p = P[i.slug]; return p ? { name: p.name + (i.opt ? ' · ' + i.opt : ''), qty: i.qty || 1, unit: i.sub ? p.sub : p.price } : null; }).filter(Boolean);
        try { await sendEmail({ to: c.email, ...tpl.abandoned({ name: c.name, items, code, pct }), template: 'abandoned_cart', tags: [{ name: 'flow', value: 'abandoned' }], meta: { vid: c.vid } }); out.abandoned++; } catch (e) { out.errors.push('abandoned ' + c.email + ': ' + e.message); }
        if (ab.whatsapp !== false) { const l = await db.one('leads', 'email=eq.' + esc(c.email) + '&wa_optin=eq.true&phone=not.is.null'); if (l) await waSend({ to: l.phone, kind: 'abandoned_cart', text: (ab.wa_text || `Hola${l.name ? ' ' + String(l.name).split(' ')[0] : ''} 🌙 Te hemos guardado la cesta en NOCTA. Con el código *{code}* tienes un {pct} %: {url}`).replace('{code}', code).replace('{pct}', pct).replace('{url}', SITE() + '/checkout.html?code=' + code), meta: { vid: c.vid } }); }
        await db.update('carts', 'vid=eq.' + esc(c.vid), { reminded_at: now() });
      }
    } catch (e) { out.errors.push('abandoned: ' + e.message); }
  }
  // 2) guía post-compra
  const g = await auto('post_purchase_guide');
  if (g) {
    try {
      const orders = await db.select('orders', 'select=id,email,emails,created_at&email=not.is.null&status=in.(paid,shipped,delivered)&created_at=lt.' + ago(g.delay_h != null ? Number(g.delay_h) : (g.delay_min ? Number(g.delay_min) / 60 : 20)) + '&created_at=gt.' + ago(24 * 14) + '&order=created_at.asc&limit=200');
      for (const o of orders || []) { if (o.emails && o.emails.guide) continue; try { await sendEmail({ to: o.email, ...tpl.guide(o), template: 'guide', tags: [{ name: 'flow', value: 'guide' }], meta: { order: o.id } }); out.guide++; } catch (e) { out.errors.push('guide ' + o.id); } await db.update('orders', 'id=eq.' + esc(o.id), { emails: { ...(o.emails || {}), guide: now() } }); }
    } catch (e) { out.errors.push('guide: ' + e.message); }
  }
  // 3) winback
  const w = await auto('winback');
  if (w) {
    try {
      const cs = await db.select('customers', 'select=email,name,tags,last_order_at&last_order_at=lt.' + ago(24 * Number(w.days || 45)) + '&limit=300');
      for (const c of cs || []) { if ((c.tags || []).includes('winback_sent')) continue; const sub = await db.one('subscriptions', 'email=eq.' + esc(c.email) + '&status=in.(active,trialing,cancelling)'); if (sub) continue;
        try { await sendEmail({ to: c.email, ...tpl.winback({ name: c.name, code: w.code || 'VUELVE15', pct: Number(w.pct || 15) }), template: 'winback', tags: [{ name: 'flow', value: 'winback' }] }); out.winback++; } catch (e) { out.errors.push('winback ' + c.email); }
        if (w.whatsapp) { const l = await db.one('leads', 'email=eq.' + esc(c.email) + '&wa_optin=eq.true&phone=not.is.null'); if (l) await waSend({ to: l.phone, kind: 'winback', text: (w.wa_text || `Hola${c.name ? ' ' + String(c.name).split(' ')[0] : ''} 🌙 Los filamentos vuelven cada pocas semanas. Para repetir, *{code}* te descuenta un {pct} %: {url}`).replace('{code}', w.code || 'VUELVE15').replace('{pct}', w.pct || 15).replace('{url}', SITE() + '/catalogo.html?code=' + (w.code || 'VUELVE15')) }); }
        await db.update('customers', 'email=eq.' + esc(c.email), { tags: [...(c.tags || []), 'winback_sent'] }); }
    } catch (e) { out.errors.push('winback: ' + e.message); }
  }
  // 4) recordatorio de renovación (3 días antes)
  const r = await auto('renewal_reminder');
  if (r) {
    try {
      const subs = await db.select('subscriptions', 'select=*&status=in.(active,trialing)&current_period_end=lt.' + new Date(Date.now() + Number(r.days_before || 3) * 864e5).toISOString() + '&current_period_end=gt.' + now() + '&limit=200');
      for (const s of subs || []) { const key = 'reminded:' + (s.current_period_end || '').slice(0, 10); if ((s.zones || '').includes(key)) continue; if (s.email) { try { await sendEmail({ to: s.email, subject: 'Tu plan NOCTA se renueva en unos días', html: (await import('./mail.js')).layout({ title: 'Renovación', body: (await import('./mail.js')).h.title('Tu próxima caja ya se prepara.') + (await import('./mail.js')).h.p(`Tu ${s.plan_slug === 'plan-semanal' ? 'Plan Semanal' : 'Plan Noche'} se renueva el ${new Date(s.current_period_end).toLocaleDateString('es-ES')}. Si quieres cambiar zonas, pausar o cancelar, responde a este email y lo hacemos al momento.`) }), text: 'Tu plan se renueva el ' + new Date(s.current_period_end).toLocaleDateString('es-ES'), template: 'renewal_reminder' }); out.renewal++; } catch (e) { } }
        await db.update('subscriptions', 'id=eq.' + esc(s.id), { zones: ((s.zones || '') + ' ' + key).trim() }); }
    } catch (e) { out.errors.push('renewal: ' + e.message); }
  }
  // 5) campañas programadas
  try { const cs = await db.select('campaigns', 'select=*&status=eq.scheduled&scheduled_at=lte.' + now() + '&limit=5'); for (const c of cs || []) { try { await sendCampaign(c); out.campaigns++; } catch (e) { out.errors.push('campaign ' + c.id + ': ' + e.message); await db.update('campaigns', 'id=eq.' + c.id, { status: 'error' }); } } } catch (e) { }
  try { await db.upsert('settings', [{ key: 'cron_last', value: { t: now(), ...out }, updated_at: now() }], 'key'); } catch (e) { }
  return out;
}
