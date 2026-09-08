// Sesión de administrador: contraseña (ADMIN_PASSWORD) → token firmado (HMAC con ADMIN_SECRET), 30 días.
const enc = new TextEncoder();
import { webcrypto } from 'node:crypto';
const crypto = globalThis.crypto || webcrypto;
async function hmac(msg) {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'nocta-dev'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}
export async function issueToken(days = 30) {
  const exp = String(Date.now() + days * 864e5);
  return exp + '.' + await hmac(exp);
}
export async function verifyToken(t) {
  if (!t) return false;
  const [p, s] = String(t).split('.');
  if (!p || !s || Number(p) < Date.now()) return false;
  return (await hmac(p)) === s;
}
export function adminPassword() { return process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN || ''; }
// true si la petición lleva un token válido (o la contraseña directamente). Sin contraseña configurada, acceso libre.
export async function isAdmin(req) {
  const pass = adminPassword();
  if (!pass) return true;
  const url = new URL(req.url);
  const t = req.headers.get('x-admin-token') || url.searchParams.get('token') || '';
  if (t && t === pass) return true;
  return verifyToken(t);
}
export const json = (o, s = 200, h = {}) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
export const unauthorized = () => json({ error: 'unauthorized' }, 401);
