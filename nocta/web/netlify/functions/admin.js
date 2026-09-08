// API del CRM: /api/admin/*  (sesión con contraseña ADMIN_PASSWORD → token firmado 30 días)
//  POST login {password}                       GET  me · stats?days=N · integrations
//  GET  r/:tabla?<consulta PostgREST>          POST r/:tabla (insert/upsert) · PATCH r/:tabla?filtro · DELETE r/:tabla?filtro
//  POST a/:accion {…}   (order.ship, order.status, order.refund, order.email, sub.cancel, product.save, content.save, discount.save,
//                       campaign.send, campaign.preview, whatsapp.send, stripe.connect, stripe.status, stripe.disconnect, stripe.oauth,
//                       resend.status, resend.domain, resend.verify, automation.save, cron.run, lead.import, purge, export)
//  GET  stripe/callback?code=…  (OAuth de Stripe Connect, opcional)
import { db, dbOk, esc, now, setting, setSetting, logMessage } from './lib/db.js';
import { isAdmin, issueToken, adminPassword, json, unauthorized } from './lib/auth.js';
import { stripe, stripeConfig } from './lib/stripe.js';
import { sendEmail, sendBatch, resend, tpl, mailOk, SITE } from './lib/mail.js';
import { waSend, waStatus, waTemplates, waLink } from './lib/wa.js';
import { getCatalog, invalidateCatalog } from './lib/catalog.js';
import { renderCampaign, sendCampaign, segmentRecipients, waText } from './lib/campaigns.js';
import { runAutomations } from './lib/automations.js';
import { markPaid } from './order.js';

const TABLES = ['leads', 'customers', 'orders', 'subscriptions', 'products', 'discounts', 'content', 'campaigns', 'messages', 'automations', 'events', 'carts', 'settings'];
const SECRET_KEYS = /secret|token|password|key/i;
const mask = (obj) => { if (!obj || typeof obj !== 'object') return obj; const o = {}; Object.entries(obj).forEach(([k, v]) => { o[k] = (SECRET_KEYS.test(k) && typeof v === 'string' && v.length > 8 && !/^(pk_|ca_)/.test(v)) ? '••••' + v.slice(-4) : v; }); return o; };
async function purge() { try { const t = process.env.NETLIFY_PURGE_API_TOKEN; if (!t) return; await fetch('https://api.netlify.com/api/v1/purge', { method: 'POST', headers: { authorization: 'Bearer ' + t, 'content-type': 'application/json' }, body: JSON.stringify({ site_id: process.env.SITE_ID, cache_tags: ['catalog'] }) }); } catch (e) { } invalidateCatalog(); }
const csv = rows => { if (!rows.length) return ''; const cols = [...new Set(rows.flatMap(r => Object.keys(r)))]; const cell = v => { const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }; return cols.join(';') + '\n' + rows.map(r => cols.map(c => cell(r[c])).join(';')).join('\n'); };

export default async (req) => {
  const url = new URL(req.url); const seg = url.pathname.replace(/^\/api\/admin\/?/, '').split('/').filter(Boolean);
  const [kind, name] = seg;
  if (req.method === 'OPTIONS') return new Response('', { status: 204 });
  if (kind === 'login' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})); const pass = adminPassword();
    if (pass && b.password !== pass) { await new Promise(r => setTimeout(r, 600)); return json({ error: 'Contraseña incorrecta' }, 401); }
    return json({ token: await issueToken(30), days: 30 });
  }
  if (kind === 'stripe' && name === 'callback') return stripeCallback(url);
  if (!(await isAdmin(req))) return unauthorized();
  const body = req.method === 'GET' ? {} : await req.json().catch(() => ({}));
  try {
    if (kind === 'me') return json({ ok: true, db: dbOk(), mail: mailOk(), site: SITE() });
    if (kind === 'stats') { const days = Math.min(365, Number(url.searchParams.get('days') || 14)); const s = await db.rpc('admin_stats', { p_days: days }); return json(s); }
    if (kind === 'integrations') return json(await integrations());
    if (kind === 'r') {
      if (!TABLES.includes(name)) return json({ error: 'tabla' }, 400);
      const q = url.search.replace(/^\?/, '');
      if (req.method === 'GET') {
        const r = await fetch((process.env.SUPABASE_URL || '').replace(/\/$/, '') + '/rest/v1/' + name + (q ? '?' + q : ''), { headers: { apikey: process.env.SUPABASE_KEY, Authorization: 'Bearer ' + process.env.SUPABASE_KEY, Prefer: 'count=exact' } });
        let rows = await r.json(); if (!r.ok) return json(rows, r.status);
        if (name === 'settings') rows = rows.map(x => ({ ...x, value: mask(x.value) }));
        return json({ rows, total: Number((r.headers.get('content-range') || '').split('/')[1] || rows.length) });
      }
      if (req.method === 'POST') { const rows = Array.isArray(body) ? body : [body]; const oc = url.searchParams.get('on_conflict'); return json(oc ? await db.upsert(name, rows, oc) : await db.insert(name, rows)); }
      if (req.method === 'PATCH') { if (!q) return json({ error: 'filtro' }, 400); return json(await db.update(name, q, body)); }
      if (req.method === 'DELETE') { if (!q) return json({ error: 'filtro' }, 400); return json(await db.del(name, q)); }
    }
    if (kind === 'export') { const t = name; if (!TABLES.includes(t)) return json({ error: 'tabla' }, 400); const rows = await db.select(t, 'select=*&order=created_at.desc&limit=10000'.replace('&order=created_at.desc', ['products', 'content', 'settings', 'automations', 'carts'].includes(t) ? '' : '&order=created_at.desc')); return new Response('﻿' + csv(rows || []), { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="nocta-${t}-${now().slice(0, 10)}.csv"` } }); }
    if (kind === 'a') return json(await action(name, body, url));
    return json({ error: 'ruta' }, 404);
  } catch (e) { return json({ error: e.message, detail: e.body || null }, e.status && e.status >= 400 && e.status < 600 ? e.status : 500); }
};

async function integrations() {
  const st = await stripeConfig(); const s = (await setting('stripe', null)) || {}; const wa = await waStatus(); const rs = (await setting('resend', null)) || {};
  let stripeInfo = null; if (st.secret) { try { const a = await stripe('account', null, { method: 'GET', key: st.secret, account: st.account }); stripeInfo = { id: a.id, name: a.business_profile && a.business_profile.name || a.settings && a.settings.dashboard && a.settings.dashboard.display_name || a.email, email: a.email, country: a.country, currency: a.default_currency, charges_enabled: a.charges_enabled, payouts_enabled: a.payouts_enabled, mode: st.mode }; } catch (e) { stripeInfo = { error: e.message, mode: st.mode }; } }
  let domains = []; if (mailOk()) { try { domains = ((await resend.api('/domains', null, 'GET')).data || []).map(d => ({ id: d.id, name: d.name, status: d.status, region: d.region })); } catch (e) { } }
  let audience = null; if (mailOk() && process.env.RESEND_AUDIENCE_ID) { try { const a = await resend.api('/audiences/' + process.env.RESEND_AUDIENCE_ID, null, 'GET'); audience = { id: a.id, name: a.name }; } catch (e) { } }
  return {
    supabase: { configured: dbOk(), url: process.env.SUPABASE_URL || null },
    stripe: { configured: !!st.secret, source: process.env.STRIPE_SECRET_KEY ? 'env' : (s.secret_key ? 'crm' : null), publishable: st.publishable || null, webhook: !!st.webhookSecret, webhook_url: SITE() + '/api/stripe-webhook', account: stripeInfo, oauth: !!process.env.STRIPE_CLIENT_ID, methods: s.methods || null, connected_at: s.connected_at || null },
    resend: { configured: mailOk(), from: process.env.RESEND_FROM || null, domains, audience, domain_pending: rs.domain || null },
    whatsapp: { ...wa, webhook_url: SITE() + '/api/whatsapp-webhook', verify_token: ((await setting('whatsapp', null)) || {}).verify_token || 'nocta' },
    cron: await setting('cron_last', null)
  };
}

async function action(name, b, url) {
  const site = SITE();
  switch (name) {
    case 'order.status': { const o = await db.update('orders', 'id=eq.' + esc(b.id), { status: b.status, updated_at: now(), ...(b.notes != null ? { notes: b.notes } : {}) }); if (b.status === 'paid') await markPaid(o[0], { force: true }); return { ok: true, order: o[0] }; }
    case 'order.ship': {
      const o = await db.one('orders', 'id=eq.' + esc(b.id)); if (!o) throw Object.assign(new Error('pedido'), { status: 404 });
      const emails = { ...(o.emails || {}) }; let wa = null;
      if (o.email && b.notify !== false) { try { await sendEmail({ to: o.email, ...tpl.shipped(o, b.tracking, b.carrier), template: 'shipped', meta: { order: o.id } }); emails.shipped = now(); } catch (e) { } }
      if (o.phone && b.notify !== false) { wa = await waSend({ to: o.phone, kind: 'shipped', text: `Hola${o.name ? ' ' + String(o.name).split(' ')[0] : ''} 🌙 Tu pedido NOCTA ${o.id} ya está en camino${b.carrier ? ' con ' + b.carrier : ''}.${b.tracking ? ' Seguimiento: ' + b.tracking : ''} Llega en 24-48 h.`, meta: { order: o.id } }); if (wa && !wa.error) emails.wa_shipped = now(); }
      const r = await db.update('orders', 'id=eq.' + esc(o.id), { status: 'shipped', tracking: b.tracking || null, carrier: b.carrier || null, emails, updated_at: now() });
      return { ok: true, order: r[0], wa };
    }
    case 'order.refund': {
      const o = await db.one('orders', 'id=eq.' + esc(b.id)); if (!o) throw Object.assign(new Error('pedido'), { status: 404 });
      const cfg = await stripeConfig(); if (!cfg.secret || !o.stripe_payment_intent) { await db.update('orders', 'id=eq.' + esc(o.id), { status: 'refunded', notes: ((o.notes || '') + '\nReembolso manual ' + now().slice(0, 10)).trim(), updated_at: now() }); return { ok: true, manual: true }; }
      const r = await stripe('refunds', { payment_intent: o.stripe_payment_intent, ...(b.amount ? { amount: Math.round(Number(b.amount) * 100) } : {}), reason: 'requested_by_customer' }, { key: cfg.secret, account: cfg.account });
      await db.update('orders', 'id=eq.' + esc(o.id), { status: b.amount && Number(b.amount) < Number(o.total) ? 'partial_refund' : 'refunded', notes: ((o.notes || '') + '\nReembolso ' + (r.amount / 100).toFixed(2) + ' € (' + r.id + ')').trim(), updated_at: now() });
      return { ok: true, refund: r.id, amount: r.amount / 100 };
    }
    case 'order.email': {
      const o = await db.one('orders', 'id=eq.' + esc(b.id)); if (!o || !o.email) throw Object.assign(new Error('pedido sin email'), { status: 400 });
      const m = b.template === 'shipped' ? tpl.shipped(o, o.tracking, o.carrier) : b.template === 'guide' ? tpl.guide(o) : tpl.orderConfirm(o);
      const r = await sendEmail({ to: o.email, ...m, template: b.template || 'order_confirm', meta: { order: o.id, manual: true } }); return { ok: true, id: r.id };
    }
    case 'sub.cancel': {
      const s = await db.one('subscriptions', 'id=eq.' + esc(b.id)); if (!s) throw Object.assign(new Error('suscripción'), { status: 404 });
      const cfg = await stripeConfig();
      if (cfg.secret && s.stripe_subscription) { if (b.now) await stripe('subscriptions/' + s.stripe_subscription, null, { method: 'DELETE', key: cfg.secret, account: cfg.account }); else await stripe('subscriptions/' + s.stripe_subscription, { cancel_at_period_end: 'true' }, { key: cfg.secret, account: cfg.account }); }
      await db.update('subscriptions', 'id=eq.' + esc(s.id), { status: b.now ? 'canceled' : 'cancelling', updated_at: now() }); return { ok: true };
    }
    case 'sub.resume': { const s = await db.one('subscriptions', 'id=eq.' + esc(b.id)); const cfg = await stripeConfig(); if (cfg.secret && s && s.stripe_subscription) await stripe('subscriptions/' + s.stripe_subscription, { cancel_at_period_end: 'false' }, { key: cfg.secret, account: cfg.account }); await db.update('subscriptions', 'id=eq.' + esc(b.id), { status: 'active', updated_at: now() }); return { ok: true }; }
    case 'product.save': { const r = await db.upsert('products', [{ slug: b.slug, overrides: b.overrides || {}, active: b.active !== false, stock: b.stock == null || b.stock === '' ? null : Number(b.stock), updated_at: now() }], 'slug'); await purge(); return { ok: true, product: r[0] }; }
    case 'product.reset': { await db.del('products', 'slug=eq.' + esc(b.slug)); await purge(); return { ok: true }; }
    case 'content.save': { const r = await db.upsert('content', [{ key: b.key, value: b.value, updated_at: now() }], 'key'); await purge(); return { ok: true, content: r[0] }; }
    case 'discount.save': { const row = { code: String(b.code || '').toUpperCase().trim(), type: b.type === 'fixed' ? 'fixed' : 'pct', value: Number(b.value) || 0, min_total: Number(b.min_total) || 0, max_uses: b.max_uses ? Number(b.max_uses) : null, starts_at: b.starts_at || null, ends_at: b.ends_at || null, active: b.active !== false, note: b.note || null }; if (!row.code) throw Object.assign(new Error('código'), { status: 400 }); const r = await db.upsert('discounts', [row], 'code'); return { ok: true, discount: r[0] }; }
    case 'campaign.preview': { const c = b.campaign || b; if ((c.channel || 'email') === 'whatsapp') return { text: waText(c, { name: 'Ana', email: 'ana@ejemplo.com', code: 'HOLA10' }) }; const m = await renderCampaign(c, { name: 'Ana', email: 'ana@ejemplo.com', code: 'HOLA10' }); return m; }
    case 'campaign.count': return { count: (await segmentRecipients(b.segment, b.channel || 'email')).length };
    case 'campaign.send': { const c = await db.one('campaigns', 'id=eq.' + esc(b.id)); if (!c) throw Object.assign(new Error('campaña'), { status: 404 }); if (b.test_to) return await sendCampaign(c, { testTo: b.test_to }); if (b.schedule_at) { await db.update('campaigns', 'id=eq.' + esc(c.id), { status: 'scheduled', scheduled_at: b.schedule_at, updated_at: now() }); return { ok: true, scheduled: b.schedule_at }; } return await sendCampaign(c); }
    case 'whatsapp.send': { const r = await waSend({ to: b.to, text: b.text, kind: 'manual' }); return { ...r, link: waLink(b.to, b.text) }; }
    case 'whatsapp.templates': return { templates: await waTemplates() };
    case 'whatsapp.save': { const cur = (await setting('whatsapp', null)) || {}; const v = { ...cur }; ['token', 'phone_id', 'waba_id', 'verify_token', 'number'].forEach(k => { if (b[k] != null && !/^••••/.test(b[k])) v[k] = String(b[k]).trim(); }); if (!v.verify_token) v.verify_token = 'nocta-' + Math.random().toString(36).slice(2, 8); await setSetting('whatsapp', v); await setSetting('content_wa', null).catch(() => { }); await db.upsert('content', [{ key: 'whatsapp_public', value: { number: v.number || null }, updated_at: now() }], 'key'); await purge(); return { ok: true, status: await waStatus(), verify_token: v.verify_token }; }
    case 'stripe.connect': {
      // «Iniciar sesión con Stripe»: clave secreta (sk_/rk_) → verificamos la cuenta, creamos el webhook y guardamos todo.
      const key = String(b.secret_key || '').trim(); if (!/^(sk|rk)_(live|test)_/.test(key)) throw Object.assign(new Error('Pega una clave secreta de Stripe (empieza por sk_live_ o sk_test_)'), { status: 400 });
      const a = await stripe('account', null, { method: 'GET', key });
      const cur = (await setting('stripe', null)) || {}; const v = { ...cur, secret_key: key, publishable_key: String(b.publishable_key || cur.publishable_key || '').trim(), account_id: '', connected_at: now(), account_name: a.business_profile && a.business_profile.name || a.email || a.id, mode: /_live_/.test(key) ? 'live' : 'test' };
      try { const wh = await stripe('webhook_endpoints', { url: site + '/api/stripe-webhook', description: 'NOCTA CRM', enabled_events: ['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed', 'checkout.session.expired', 'invoice.paid', 'invoice.payment_failed', 'customer.subscription.updated', 'customer.subscription.deleted', 'charge.refunded', 'charge.dispute.created'] }, { key }); v.webhook_secret = wh.secret; v.webhook_id = wh.id; } catch (e) { v.webhook_error = e.message; }
      if (Array.isArray(b.methods)) v.methods = b.methods;
      await setSetting('stripe', v); invalidateCatalog();
      return { ok: true, account: { id: a.id, name: v.account_name, email: a.email, country: a.country, charges_enabled: a.charges_enabled, payouts_enabled: a.payouts_enabled, mode: v.mode }, webhook: !!v.webhook_secret, webhook_error: v.webhook_error || null };
    }
    case 'stripe.methods': { const cur = (await setting('stripe', null)) || {}; cur.methods = Array.isArray(b.methods) && b.methods.length ? b.methods : null; await setSetting('stripe', cur); return { ok: true, methods: cur.methods }; }
    case 'stripe.status': {
      const cfg = await stripeConfig(); if (!cfg.secret) return { configured: false };
      const [a, bal, charges] = await Promise.all([stripe('account', null, { method: 'GET', key: cfg.secret, account: cfg.account }).catch(e => ({ error: e.message })), stripe('balance', null, { method: 'GET', key: cfg.secret, account: cfg.account }).catch(() => null), stripe('charges', { limit: 10 }, { method: 'GET', key: cfg.secret, account: cfg.account }).catch(() => null)]);
      const pm = await stripe('payment_method_configurations', null, { method: 'GET', key: cfg.secret, account: cfg.account }).catch(() => null);
      const active = pm && pm.data && pm.data[0] ? Object.entries(pm.data[0]).filter(([k, v]) => v && typeof v === 'object' && v.available && v.display_preference && v.display_preference.value === 'on').map(([k]) => k) : null;
      return { configured: true, mode: cfg.mode, account: a, balance: bal && { available: (bal.available || []).map(x => ({ amount: x.amount / 100, currency: x.currency })), pending: (bal.pending || []).map(x => ({ amount: x.amount / 100, currency: x.currency })) }, charges: charges && (charges.data || []).map(c => ({ id: c.id, amount: c.amount / 100, status: c.status, created: c.created * 1000, email: c.billing_details && c.billing_details.email, method: c.payment_method_details && c.payment_method_details.type, wallet: c.payment_method_details && c.payment_method_details.card && c.payment_method_details.card.wallet && c.payment_method_details.card.wallet.type })), methods_dashboard: active, webhook: !!cfg.webhookSecret };
    }
    case 'stripe.disconnect': { const cur = (await setting('stripe', null)) || {}; const cfg = await stripeConfig(); if (cur.webhook_id && cfg.secret) { try { await stripe('webhook_endpoints/' + cur.webhook_id, null, { method: 'DELETE', key: cfg.secret }); } catch (e) { } } await setSetting('stripe', {}); invalidateCatalog(); return { ok: true }; }
    case 'stripe.oauth': { const cid = process.env.STRIPE_CLIENT_ID; if (!cid) return { available: false, reason: 'Stripe solo permite el botón OAuth a plataformas Connect (necesita STRIPE_CLIENT_ID de una cuenta plataforma). Para una tienda propia, pega la clave secreta: es lo que Stripe recomienda.' }; const state = Math.random().toString(36).slice(2); await setSetting('stripe_oauth_state', { state, t: now() }); return { available: true, url: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=' + cid + '&scope=read_write&state=' + state + '&redirect_uri=' + encodeURIComponent(site + '/api/admin/stripe/callback') }; }
    case 'resend.status': return (await integrations()).resend;
    case 'resend.domain': { const d = await resend.api('/domains', { name: b.name, region: 'eu-west-1' }); await setSetting('resend', { domain: { id: d.id, name: d.name, status: d.status, records: d.records } }); return { ok: true, domain: d }; }
    case 'resend.verify': { const d = await resend.api('/domains/' + b.id + '/verify', {}); const g = await resend.api('/domains/' + b.id, null, 'GET'); await setSetting('resend', { domain: { id: g.id, name: g.name, status: g.status, records: g.records } }); return { ok: true, status: g.status, records: g.records }; }
    case 'resend.test': { const r = await sendEmail({ to: b.to, ...tpl.welcome({ name: 'Prueba', code: 'HOLA10', pct: 10 }), template: 'test' }); return { ok: true, id: r.id }; }
    case 'automation.save': { const r = await db.upsert('automations', [{ key: b.key, enabled: !!b.enabled, config: b.config || {}, updated_at: now() }], 'key'); return { ok: true, automation: r[0] }; }
    case 'cron.run': return await runAutomations();
    case 'lead.import': { const rows = (b.rows || []).map(r => ({ email: String(r.email || '').toLowerCase().trim(), name: r.name || null, phone: r.phone || null, source: r.source || 'import', tags: r.tags || ['import'], email_optin: r.email_optin !== false, wa_optin: !!r.wa_optin })).filter(r => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email)); if (!rows.length) return { ok: true, imported: 0 }; const r = await db.upsert('leads', rows, 'email'); return { ok: true, imported: r.length }; }
    case 'lead.email': { const r = await sendEmail({ to: b.to, subject: b.subject, html: (await import('./lib/mail.js')).layout({ title: b.subject, body: (await import('./lib/mail.js')).h.p(String(b.text || '').replace(/\n/g, '<br>')) }), text: b.text, template: 'manual' }); return { ok: true, id: r.id }; }
    case 'purge': await purge(); return { ok: true };
    case 'settings.save': { const cur = (await setting(b.key, null)) || {}; const v = { ...(typeof cur === 'object' ? cur : {}), ...(b.value || {}) }; Object.keys(v).forEach(k => { if (typeof v[k] === 'string' && /^••••/.test(v[k]) && cur[k]) v[k] = cur[k]; }); await setSetting(b.key, v); await purge(); return { ok: true }; }
    default: throw Object.assign(new Error('acción desconocida: ' + name), { status: 404 });
  }
}

async function stripeCallback(url) {
  const code = url.searchParams.get('code'); const st = (await setting('stripe_oauth_state', null)) || {};
  if (!code || url.searchParams.get('state') !== st.state) return new Response('estado inválido', { status: 400 });
  const r = await fetch('https://connect.stripe.com/oauth/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_secret: process.env.STRIPE_SECRET_KEY || '', code, grant_type: 'authorization_code' }) });
  const j = await r.json();
  if (!r.ok) return new Response('Stripe: ' + (j.error_description || j.error), { status: 400 });
  const cur = (await setting('stripe', null)) || {}; await setSetting('stripe', { ...cur, account_id: j.stripe_user_id, publishable_key: j.stripe_publishable_key, connected_at: now(), via: 'oauth' });
  return new Response('', { status: 302, headers: { location: SITE() + '/admin/#/integraciones?stripe=ok' } });
}
export const config = { path: '/api/admin/*' };
