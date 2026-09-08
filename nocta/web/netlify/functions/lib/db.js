// Acceso a Supabase (PostgREST) con la clave secreta del proyecto. Sin SDK: fetch nativo.
const URL = () => (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const KEY = () => process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
const H = () => ({ apikey: KEY(), Authorization: 'Bearer ' + KEY(), 'content-type': 'application/json' });

export const dbOk = () => !!(URL() && KEY());

async function req(method, path, body, prefer) {
  if (!dbOk()) throw Object.assign(new Error('Supabase no configurado (SUPABASE_URL / SUPABASE_KEY)'), { status: 503 });
  const headers = { ...H() };
  if (prefer) headers.Prefer = prefer;
  const r = await fetch(URL() + '/rest/v1/' + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const t = await r.text();
  let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) { j = t; }
  if (!r.ok) throw Object.assign(new Error('db ' + r.status + ' ' + String(j && j.message || t).slice(0, 240)), { status: r.status, body: j });
  return j;
}

export const db = {
  select: (table, q = '') => req('GET', table + (q ? '?' + q : '')),
  one: async (table, q) => { const r = await req('GET', table + '?' + q + '&limit=1'); return (r && r[0]) || null; },
  insert: (table, rows) => req('POST', table, rows, 'return=representation'),
  upsert: (table, rows, onConflict) => req('POST', table + (onConflict ? '?on_conflict=' + onConflict : ''), rows, 'resolution=merge-duplicates,return=representation'),
  update: (table, q, patch) => req('PATCH', table + '?' + q, patch, 'return=representation'),
  del: (table, q) => req('DELETE', table + '?' + q, undefined, 'return=representation'),
  rpc: (fn, args) => req('POST', 'rpc/' + fn, args || {}),
  count: async (table, q = '') => {
    const r = await fetch(URL() + '/rest/v1/' + table + '?' + (q ? q + '&' : '') + 'select=*', { headers: { ...H(), Prefer: 'count=exact', Range: '0-0' } });
    const cr = r.headers.get('content-range') || '';
    return Number(cr.split('/')[1] || 0);
  }
};

export const esc = v => encodeURIComponent(String(v));
export const now = () => new Date().toISOString();

export async function setting(key, def = null) {
  try { const r = await db.one('settings', 'key=eq.' + esc(key)); return r ? r.value : def; } catch (e) { return def; }
}
export async function setSetting(key, value) {
  return db.upsert('settings', [{ key, value, updated_at: now() }], 'key');
}
export async function content(key, def = null) {
  try { const r = await db.one('content', 'key=eq.' + esc(key)); return r ? r.value : def; } catch (e) { return def; }
}

// Registro de mensajes (email / whatsapp) para el CRM.
export async function logMessage(m) {
  try { await db.insert('messages', [{ channel: m.channel, direction: m.direction || 'out', to_addr: m.to, template: m.template || null, subject: m.subject || null, body: (m.body || '').slice(0, 4000), status: m.status || 'sent', provider_id: m.providerId || null, campaign_id: m.campaignId || null, meta: m.meta || {} }]); } catch (e) { }
}
