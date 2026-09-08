// Webhook de WhatsApp Cloud API: verificación (GET), mensajes entrantes y estados (POST) → tabla messages. Respuesta automática opcional.
import { db, dbOk, esc, now, setting, logMessage } from './lib/db.js';
import { waSend } from './lib/wa.js';
export default async (req) => {
  const url = new URL(req.url); const cfg = (await setting('whatsapp', null)) || {};
  if (req.method === 'GET') {
    if (url.searchParams.get('hub.mode') === 'subscribe' && url.searchParams.get('hub.verify_token') === (cfg.verify_token || process.env.WA_VERIFY_TOKEN || 'nocta')) return new Response(url.searchParams.get('hub.challenge') || '', { status: 200 });
    return new Response('forbidden', { status: 403 });
  }
  let body; try { body = await req.json(); } catch (e) { return new Response('bad', { status: 400 }); }
  if (!dbOk()) return new Response('ok');
  for (const entry of body.entry || []) for (const ch of entry.changes || []) {
    const v = ch.value || {}; const names = Object.fromEntries((v.contacts || []).map(c => [c.wa_id, c.profile && c.profile.name]));
    for (const m of v.messages || []) {
      const from = '+' + m.from; const text = m.text && m.text.body || (m.button && m.button.text) || (m.interactive && (m.interactive.button_reply || m.interactive.list_reply || {}).title) || ('[' + m.type + ']');
      await logMessage({ channel: 'whatsapp', direction: 'in', to: from, template: m.type, body: text, status: 'received', providerId: m.id, meta: { name: names[m.from] || null, ts: m.timestamp } });
      try { await db.update('leads', 'phone=eq.' + esc(from), { last_seen: now(), wa_optin: true }); } catch (e) { }
      try {
        const a = await db.one('automations', 'key=eq.wa_autoreply');
        if (a && a.enabled) { const recent = await db.one('messages', 'channel=eq.whatsapp&direction=eq.out&template=eq.autoreply&to_addr=eq.' + esc(from) + '&created_at=gt.' + new Date(Date.now() - 864e5).toISOString()); if (!recent) await waSend({ to: from, kind: 'autoreply', text: (a.config && a.config.text) || 'Hola 🌙 Gracias por escribir a NOCTA. Te respondemos en menos de 24 h (lunes a viernes). Si es sobre un pedido, dinos el número y lo miramos.' }); }
      } catch (e) { }
    }
    for (const s of v.statuses || []) { try { await db.update('messages', 'provider_id=eq.' + esc(s.id), { status: s.status, meta: { status_ts: s.timestamp } }); } catch (e) { } }
  }
  return new Response('ok');
};
export const config = { path: '/api/whatsapp-webhook' };
