// WhatsApp Cloud API (Meta). Configuración en settings.whatsapp = { token, phone_id, waba_id, verify_token, number }.
// Sin token: no envía, pero registra el mensaje como 'skipped' y el CRM ofrece enlace wa.me para enviarlo a mano.
import { setting, logMessage } from './db.js';

// Rellena {nombre} {code} {pct} {order} {total} {url} en textos configurables desde el CRM; limpia dobles espacios si el nombre falta.
export function fill(t, v = {}) { let o = String(t || ''); Object.entries(v).forEach(([k, x]) => { o = o.split('{' + k + '}').join(x == null ? '' : String(x)); }); return o.replace(/Hola\s+([🌙,.!])/u, 'Hola $1').replace(/[ \t]{2,}/g, ' ').replace(/ ,/g, ','); }
export async function waConfig() { return (await setting('whatsapp', null)) || {}; }
export function normPhone(p) { let d = String(p || '').replace(/[^\d+]/g, ''); if (!d) return ''; if (d.startsWith('00')) d = '+' + d.slice(2); if (!d.startsWith('+')) { d = d.replace(/^0+/, ''); d = (d.length === 9 ? '+34' : '+') + d; } return d; }
export const waLink = (phone, text) => 'https://wa.me/' + normPhone(phone).replace('+', '') + (text ? '?text=' + encodeURIComponent(text) : '');

async function graph(cfg, path, body, method = 'POST') {
  const r = await fetch('https://graph.facebook.com/v21.0/' + path, { method, headers: { Authorization: 'Bearer ' + cfg.token, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((j.error && j.error.message) || 'whatsapp ' + r.status), { status: r.status, body: j });
  return j;
}

// Texto libre (solo válido dentro de la ventana de 24 h tras un mensaje del cliente) o plantilla aprobada.
export async function waSend({ to, text, template, lang = 'es', components, campaignId, meta, kind }) {
  const cfg = await waConfig(); const phone = normPhone(to);
  if (!phone) return { error: 'phone' };
  if (!cfg.token || !cfg.phone_id) { await logMessage({ channel: 'whatsapp', to: phone, template: template || kind || 'text', body: text, status: 'skipped', campaignId, meta: { ...(meta || {}), reason: 'WhatsApp no configurado', link: waLink(phone, text) } }); return { skipped: true, link: waLink(phone, text) }; }
  const payload = template
    ? { messaging_product: 'whatsapp', to: phone.replace('+', ''), type: 'template', template: { name: template, language: { code: lang }, components: components || [] } }
    : { messaging_product: 'whatsapp', to: phone.replace('+', ''), type: 'text', text: { body: text, preview_url: true } };
  try {
    const j = await graph(cfg, cfg.phone_id + '/messages', payload);
    const id = j.messages && j.messages[0] && j.messages[0].id;
    await logMessage({ channel: 'whatsapp', to: phone, template: template || kind || 'text', body: text || ('[plantilla ' + template + ']'), status: 'sent', providerId: id, campaignId, meta });
    return { id };
  } catch (e) {
    await logMessage({ channel: 'whatsapp', to: phone, template: template || kind || 'text', body: text, status: 'error', campaignId, meta: { ...(meta || {}), error: e.message } });
    return { error: e.message };
  }
}
export async function waStatus() {
  const cfg = await waConfig();
  if (!cfg.token || !cfg.phone_id) return { configured: false, number: cfg.number || null };
  try { const j = await graph(cfg, cfg.phone_id + '?fields=display_phone_number,verified_name,quality_rating', null, 'GET'); return { configured: true, ...j }; }
  catch (e) { return { configured: true, error: e.message }; }
}
export async function waTemplates() {
  const cfg = await waConfig(); if (!cfg.token || !cfg.waba_id) return [];
  try { const j = await graph(cfg, cfg.waba_id + '/message_templates?fields=name,status,language,category&limit=100', null, 'GET'); return j.data || []; } catch (e) { return []; }
}
