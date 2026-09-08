// Stripe por API REST (sin SDK). La clave sale de STRIPE_SECRET_KEY o, si no, de la tabla settings (clave "stripe") que rellena el CRM.
import { setting } from './db.js';
import { webcrypto } from 'node:crypto';
const crypto = globalThis.crypto || webcrypto;

export async function stripeConfig() {
  const s = (await setting('stripe', null)) || {};
  return {
    secret: process.env.STRIPE_SECRET_KEY || s.secret_key || '',
    publishable: process.env.STRIPE_PUBLISHABLE_KEY || s.publishable_key || '',
    account: s.account_id || '',            // cuenta conectada (Stripe Connect) si se usó «Iniciar sesión con Stripe»
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || s.webhook_secret || '',
    mode: /^sk_live_/.test(process.env.STRIPE_SECRET_KEY || s.secret_key || '') ? 'live' : 'test'
  };
}

function flatten(obj, prefix, out) {
  out = out || [];
  Object.entries(obj || {}).forEach(([k, v]) => {
    const key = prefix ? prefix + '[' + k + ']' : k;
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach((x, i) => { if (typeof x === 'object') flatten(x, key + '[' + i + ']', out); else out.push([key + '[' + i + ']', String(x)]); });
    else if (typeof v === 'object') flatten(v, key, out);
    else out.push([key, String(v)]);
  });
  return out;
}

export async function stripe(path, params, { key, method = 'POST', account } = {}) {
  const k = key || (await stripeConfig()).secret;
  if (!k) throw Object.assign(new Error('Stripe no configurado'), { status: 503 });
  const headers = { authorization: 'Bearer ' + k };
  if (account) headers['Stripe-Account'] = account;
  let url = 'https://api.stripe.com/v1/' + path, body;
  if (method === 'GET') { const q = new URLSearchParams(flatten(params || {})).toString(); if (q) url += (url.includes('?') ? '&' : '?') + q; }
  else { headers['content-type'] = 'application/x-www-form-urlencoded'; body = new URLSearchParams(flatten(params || {})); }
  const r = await fetch(url, { method, headers, body });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error((j.error && j.error.message) || 'stripe ' + r.status), { status: r.status, stripe: j.error });
  return j;
}

// Verificación de firma de webhook (Stripe-Signature: t=…,v1=…)
export async function verifyStripeSignature(raw, header, secret) {
  if (!secret) return true; // sin secreto configurado no se verifica (modo demo)
  if (!header) return false;
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(t + '.' + raw));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  if (Math.abs(Date.now() / 1000 - Number(t)) > 600) return false;
  return hex === v1;
}
