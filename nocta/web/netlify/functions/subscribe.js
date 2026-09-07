// Captura de emails (popup, quiz, footer). Guarda en Blobs y, si hay KLAVIYO_API_KEY + KLAVIYO_LIST_ID, los envía a Klaviyo.
import { getStore } from '@netlify/blobs';
export default async (req) => {
  if (req.method !== 'POST') return new Response('method', { status: 405 });
  const b = await req.json(); const email = String(b.email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response(JSON.stringify({ error: 'email' }), { status: 400 });
  const store = getStore({ name: 'leads', consistency: 'strong' });
  await store.setJSON(email, { email, src: b.src || 'web', skin: b.skin || null, t: Date.now(), utm: b.utm || {} });
  if (process.env.KLAVIYO_API_KEY && process.env.KLAVIYO_LIST_ID) {
    try {
      await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', { method: 'POST', headers: { Authorization: 'Klaviyo-API-Key ' + process.env.KLAVIYO_API_KEY, 'content-type': 'application/json', revision: '2024-10-15' }, body: JSON.stringify({ data: { type: 'profile-subscription-bulk-create-job', attributes: { profiles: { data: [{ type: 'profile', attributes: { email, properties: { source: b.src, skin_type: b.skin } } }] } }, relationships: { list: { data: { type: 'list', id: process.env.KLAVIYO_LIST_ID } } } } }) });
    } catch (e) { }
  }
  return new Response(JSON.stringify({ ok: true, code: 'HOLA10' }), { headers: { 'content-type': 'application/json' } });
};
export const config = { path: '/api/subscribe' };
