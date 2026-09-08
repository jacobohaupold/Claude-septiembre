// Newsletter / campañas: bloques → HTML de marca, segmentación, envío por email (Resend, lotes) o WhatsApp.
import { db, esc, now } from './db.js';
import { layout, h, sendBatch, SITE } from './mail.js';
import { waSend } from './wa.js';
import { getCatalog } from './catalog.js';

const escH = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = s => escH(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/\n/g, '<br>');
const vars = (s, r) => String(s || '').replace(/\{nombre\}/g, r && r.name ? String(r.name).split(' ')[0] : '').replace(/\{email\}/g, r && r.email || '').replace(/\{code\}/g, r && r.code || '').replace(/\s+,/g, ',').replace(/Hola\s*[,.]/, 'Hola.');

export async function renderBlocks(blocks, r = {}) {
  const site = SITE(); const cat = await getCatalog(); const P = Object.fromEntries(cat.products.map(p => [p.slug, p]));
  const abs = u => /^https?:/.test(u || '') ? u : site + (u || '');
  return (blocks || []).map(b => {
    switch (b.type) {
      case 'label': return h.lab(vars(b.text, r));
      case 'title': return h.title(vars(b.text, r));
      case 'text': return h.p(md(vars(b.text, r)));
      case 'image': return h.img(abs(b.src), b.alt);
      case 'button': return h.btn(vars(b.text, r) || 'Ver', abs(b.href || '/'));
      case 'code': return h.code(vars(b.code || r.code || '', r));
      case 'divider': return h.hr();
      case 'product': { const p = P[b.slug]; if (!p) return ''; return h.product({ slug: p.slug, name: p.name, units: p.units, price: p.price, compare: p.compare, img: (p.image || '').replace(/\.(jpg|png)$/, '.webp') }, site); }
      case 'products': return (b.slugs || []).map(s => P[s]).filter(Boolean).map(p => h.product({ slug: p.slug, name: p.name, units: p.units, price: p.price, compare: p.compare, img: (p.image || '').replace(/\.(jpg|png)$/, '.webp') }, site)).join('');
      case 'hero': return (b.src ? h.img(abs(b.src), b.alt) : '') + (b.label ? h.lab(vars(b.label, r)) : '') + (b.title ? h.title(vars(b.title, r)) : '') + (b.text ? h.p(md(vars(b.text, r))) : '') + (b.button ? h.btn(vars(b.button, r), abs(b.href || '/')) : '');
      case 'html': return b.html || '';
      default: return '';
    }
  }).join('');
}
export async function renderCampaign(c, r = {}) {
  const site = SITE();
  const body = c.html ? vars(c.html, r) : await renderBlocks(c.blocks, r);
  const html = layout({ title: vars(c.subject, r), preheader: vars(c.preheader, r), body, unsubscribe: site + '/api/lead?unsub=1&email=' + encodeURIComponent(r.email || '') });
  const text = c.text_body ? vars(c.text_body, r) : (c.blocks || []).filter(b => ['title', 'text', 'button', 'code'].includes(b.type)).map(b => vars(b.text || b.code || '', r) + (b.href ? ' ' + (/^https?:/.test(b.href) ? b.href : site + b.href) : '')).join('\n\n');
  return { subject: vars(c.subject, r), html, text };
}
export function waText(c, r = {}) {
  const site = SITE();
  if (c.text_body) return vars(c.text_body, r);
  return (c.blocks || []).map(b => { switch (b.type) { case 'title': return '*' + vars(b.text, r) + '*'; case 'text': return vars(b.text, r); case 'button': return vars(b.text, r) + ': ' + (/^https?:/.test(b.href || '') ? b.href : site + (b.href || '/')); case 'code': return 'Código: *' + vars(b.code || r.code || '', r) + '*'; case 'product': return site + '/producto.html?p=' + b.slug; default: return ''; } }).filter(Boolean).join('\n\n');
}

// segment: {type:'all'|'leads'|'customers'|'subscribers'|'noncustomers'|'tag'|'skin'|'inactive'|'wa'|'emails', value}
export async function segmentRecipients(seg = { type: 'all' }, channel = 'email') {
  const out = new Map(); const add = r => { const k = channel === 'whatsapp' ? r.phone : r.email; if (!k) return; if (channel === 'email' && r.email_optin === false) return; if (channel === 'whatsapp' && r.wa_optin === false) return; if (!out.has(k)) out.set(k, { email: r.email, phone: r.phone, name: r.name, code: r.code || '' }); };
  const t = seg.type || 'all'; const v = seg.value;
  const leads = async q => (await db.select('leads', 'select=email,name,phone,wa_optin,email_optin,code,tags,skin,status,last_seen&status=neq.unsubscribed&limit=5000' + (q ? '&' + q : ''))) || [];
  const customers = async q => (await db.select('customers', 'select=email,name,phone,tags,last_order_at&limit=5000' + (q ? '&' + q : ''))) || [];
  if (t === 'emails') (Array.isArray(v) ? v : String(v || '').split(/[\s,;]+/)).filter(Boolean).forEach(e => add({ email: e.toLowerCase(), phone: e }));
  if (['all', 'leads', 'noncustomers', 'wa'].includes(t)) (await leads(t === 'noncustomers' ? 'status=neq.customer' : t === 'wa' ? 'wa_optin=eq.true&phone=not.is.null' : '')).forEach(add);
  if (['all', 'customers'].includes(t)) (await customers()).forEach(add);
  if (t === 'subscribers') { const s = (await db.select('subscriptions', 'select=email,name&status=in.(active,trialing,cancelling)&limit=5000')) || []; const cs = await customers(); const m = Object.fromEntries(cs.map(c => [c.email, c])); s.forEach(x => add({ ...x, phone: m[x.email] && m[x.email].phone })); }
  if (t === 'tag') { (await leads('tags=cs.' + encodeURIComponent('{' + v + '}'))).forEach(add); (await customers('tags=cs.' + encodeURIComponent('{' + v + '}'))).forEach(add); }
  if (t === 'skin') (await leads('skin=eq.' + esc(v))).forEach(add);
  if (t === 'inactive') { const d = new Date(Date.now() - Number(v || 30) * 864e5).toISOString(); (await customers('last_order_at=lt.' + d)).forEach(add); }
  // enriquecer teléfono/optin desde leads cuando el canal es WhatsApp
  if (channel === 'whatsapp') { const all = await leads('wa_optin=eq.true&phone=not.is.null'); const byEmail = Object.fromEntries(all.map(l => [l.email, l])); for (const [k, r] of [...out]) { if (!r.phone && byEmail[r.email]) r.phone = byEmail[r.email].phone; if (!r.phone) out.delete(k); } }
  return [...out.values()];
}

export async function sendCampaign(c, { testTo } = {}) {
  const channel = c.channel || 'email';
  const recipients = testTo ? [{ email: testTo, phone: testTo, name: 'Prueba', code: 'HOLA10' }] : await segmentRecipients(c.segment, channel);
  if (!testTo) await db.update('campaigns', 'id=eq.' + c.id, { status: 'sending', recipients: recipients.length, updated_at: now() });
  let sent = 0, failed = 0; const ids = [];
  if (channel === 'email') {
    const items = []; for (const r of recipients) { const m = await renderCampaign(c, r); items.push({ to: r.email, subject: m.subject, html: m.html, text: m.text, tags: [{ name: 'campaign', value: String(c.id) }] }); }
    for (let i = 0; i < items.length; i += 100) { try { const j = await sendBatch(items.slice(i, i + 100)); sent += (j.data || []).length || (j.skipped ? 0 : 0); ids.push(...(j.data || []).map(x => x.id)); if (j.skipped) failed += items.slice(i, i + 100).length; } catch (e) { failed += items.slice(i, i + 100).length; } }
    try { await db.insert('messages', items.slice(0, 500).map(it => ({ channel: 'email', direction: 'out', to_addr: it.to, template: 'campaign', subject: it.subject, body: '', status: failed && !sent ? 'error' : 'sent', campaign_id: testTo ? null : c.id, meta: { test: !!testTo } }))); } catch (e) { }
  } else {
    for (const r of recipients) { const res = await waSend({ to: r.phone, text: waText(c, r), campaignId: testTo ? null : c.id, kind: 'campaign' }); if (res && res.id) { sent++; ids.push(res.id); } else failed++; }
  }
  if (!testTo) await db.update('campaigns', 'id=eq.' + c.id, { status: 'sent', sent_count: sent, failed_count: failed, provider_ids: ids.slice(0, 2000), sent_at: now(), updated_at: now() });
  return { recipients: recipients.length, sent, failed };
}
