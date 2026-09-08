// Correo transaccional y newsletters con Resend (API REST). Plantillas de marca NOCTA.
import { logMessage } from './db.js';

const KEY = () => process.env.RESEND_API_KEY || '';
const FROM = () => process.env.RESEND_FROM || 'NOCTA <onboarding@resend.dev>';
export const SITE = () => (process.env.SITE_URL || process.env.URL || 'https://nocta-store.netlify.app').replace(/\/$/, '');
export const mailOk = () => !!KEY();

async function api(path, body, method = 'POST') {
  const r = await fetch('https://api.resend.com' + path, { method, headers: { Authorization: 'Bearer ' + KEY(), 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error('resend ' + r.status + ' ' + (j.message || j.name || '')), { status: r.status, body: j });
  return j;
}

export async function sendEmail({ to, subject, html, text, tags, replyTo, template, campaignId, meta }) {
  if (!KEY()) { await logMessage({ channel: 'email', to, subject, template, status: 'skipped', meta: { reason: 'RESEND_API_KEY ausente' } }); return { skipped: true }; }
  try {
    const j = await api('/emails', { from: FROM(), to: Array.isArray(to) ? to : [to], subject, html, text, reply_to: replyTo || 'hola@nocta.es', tags: tags || [] });
    await logMessage({ channel: 'email', to: Array.isArray(to) ? to.join(',') : to, subject, template, status: 'sent', providerId: j.id, campaignId, meta });
    return j;
  } catch (e) {
    await logMessage({ channel: 'email', to: Array.isArray(to) ? to.join(',') : to, subject, template, status: 'error', meta: { error: e.message } });
    throw e;
  }
}

// Envío en lote (hasta 100 por llamada). items: [{to, subject, html, text, tags}]
export async function sendBatch(items) {
  if (!KEY()) return { skipped: true, data: [] };
  const out = [];
  for (let i = 0; i < items.length; i += 100) {
    const chunk = items.slice(i, i + 100).map(it => ({ from: FROM(), to: [it.to], subject: it.subject, html: it.html, text: it.text, reply_to: 'hola@nocta.es', tags: it.tags || [] }));
    const j = await api('/emails/batch', chunk);
    out.push(...(j.data || []));
  }
  return { data: out };
}

export async function addContact({ email, firstName, lastName, unsubscribed = false }) {
  const aud = process.env.RESEND_AUDIENCE_ID;
  if (!KEY() || !aud) return null;
  try { return await api('/audiences/' + aud + '/contacts', { email, first_name: firstName || '', last_name: lastName || '', unsubscribed }); } catch (e) { return null; }
}
export async function removeContact(email) {
  const aud = process.env.RESEND_AUDIENCE_ID; if (!KEY() || !aud) return null;
  try { return await api('/audiences/' + aud + '/contacts/' + encodeURIComponent(email), null, 'DELETE'); } catch (e) { return null; }
}
export const resend = { api };

/* ---------- plantilla de marca ---------- */
const eur = n => (Number(n) || 0).toFixed(2).replace('.', ',') + ' €';
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function layout({ title, preheader = '', body, footer = '', unsubscribe = '' }) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#FAF8F3;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#14213D">
<span style="display:none;max-height:0;overflow:hidden;color:#FAF8F3">${esc(preheader)}</span>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAF8F3"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px">
<tr><td style="padding:8px 8px 18px;font-size:22px;font-weight:600;letter-spacing:-.02em;color:#14213D">&#9790; nocta</td></tr>
<tr><td style="background:#F3EFE6;border-radius:20px;padding:28px 26px">${body}</td></tr>
<tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:#6B6F7B">${footer || 'NOCTA Skin S.L. · Enviamos desde España · hola@nocta.es'}${unsubscribe ? `<br><a href="${unsubscribe}" style="color:#6B6F7B">Darse de baja</a>` : ''}</td></tr>
</table></td></tr></table></body></html>`;
}
export const h = {
  title: t => `<h1 style="margin:0 0 10px;font-size:26px;line-height:1.15;letter-spacing:-.02em;font-weight:500;color:#14213D">${esc(t)}</h1>`,
  p: t => `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#3B4257">${t}</p>`,
  lab: t => `<p style="margin:0 0 8px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6B6F7B">${esc(t)}</p>`,
  btn: (t, href) => `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:18px 0 6px"><tr><td style="background:#14213D;border-radius:999px"><a href="${href}" style="display:inline-block;padding:15px 26px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#F3EFE6;text-decoration:none;font-weight:500">${esc(t)}</a></td></tr></table>`,
  code: c => `<p style="margin:16px 0;text-align:center"><span style="display:inline-block;padding:14px 22px;border:1px dashed #14213D;border-radius:14px;font-size:22px;letter-spacing:.14em;font-weight:600;color:#14213D">${esc(c)}</span></p>`,
  hr: () => `<hr style="border:0;border-top:1px solid #D9D3C5;margin:18px 0">`,
  img: (src, alt) => `<img src="${src}" alt="${esc(alt || '')}" width="100%" style="display:block;width:100%;border-radius:16px;margin:6px 0 14px">`,
  product: (p, site) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:8px 0"><tr><td width="84" style="padding-right:12px"><img src="${site}${p.img}" width="84" height="84" alt="" style="display:block;width:84px;height:84px;object-fit:cover;border-radius:12px;background:#FAF8F3"></td><td style="font-size:15px;line-height:1.4;color:#14213D"><b>${esc(p.name)}</b><br><span style="color:#6B6F7B;font-size:13px">${esc(p.units || '')}</span><br><b>${eur(p.price)}</b>${p.compare ? ` <s style="color:#6B6F7B;font-weight:400">${eur(p.compare)}</s>` : ''}</td><td align="right"><a href="${site}/producto.html?p=${p.slug}" style="display:inline-block;padding:10px 14px;border:1px solid #14213D;border-radius:999px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#14213D;text-decoration:none">Ver</a></td></tr></table>`,
  items: (items) => `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${items.map(i => `<tr><td style="padding:8px 0;border-top:1px solid #D9D3C5;font-size:15px;color:#14213D">${esc(i.qty)}× ${esc(i.name)}</td><td align="right" style="padding:8px 0;border-top:1px solid #D9D3C5;font-size:15px;color:#14213D">${eur(i.unit * i.qty)}</td></tr>`).join('')}</table>`
};

export const tpl = {
  welcome({ name, code, pct }) {
    const site = SITE();
    return { subject: `${name ? name.split(' ')[0] + ', tu' : 'Tu'} −${pct} % está aquí`, text: `Tu código ${code} te descuenta un ${pct} % en todo NOCTA. Úsalo en ${site}`, html: layout({ title: 'Tu código NOCTA', preheader: `Código ${code}: −${pct} % en todo, hoy mismo.`, body: h.lab('Bienvenida') + h.title(`${name ? 'Hola, ' + esc(name.split(' ')[0]) + '.' : 'Hola.'} Aquí tienes tu −${pct} %.`) + h.p('Vale para todo lo que hay en NOCTA: parches, skincare, packs y planes. Se aplica en el checkout y no caduca esta semana.') + h.code(code) + h.btn('Empezar esta noche', site + '/?code=' + code) + h.hr() + h.p('Un consejo antes de tu primera noche: nariz limpia y <b>seca</b>, presiona 20 segundos con la palma y déjalo 6-8 horas. El 90 % de los «no me funciona» vienen de saltarse eso.') + h.btn('Ver la guía en 3D', site + '/como-usar.html') , unsubscribe: site + '/api/lead?unsub=1&email=' }) };
  },
  orderConfirm(o) {
    const site = SITE();
    return { subject: `Pedido ${o.id} confirmado · sale en 24-48 h`, text: `Gracias. Tu pedido ${o.id} (${eur(o.total)}) sale del almacén en 24-48 h.`, html: layout({ title: 'Pedido confirmado', preheader: `Tu pedido ${o.id} está en marcha.`, body: h.lab('Pedido ' + o.id) + h.title('Gracias. Tu pedido está en marcha.') + h.p('Sale de nuestro almacén en España en 24-48 h laborables. Te enviamos el seguimiento en cuanto salga.') + h.items(o.items || []) + `<p style="margin:12px 0 0;font-size:15px;text-align:right;color:#14213D">${o.shipping ? 'Envío ' + eur(o.shipping) + ' · ' : 'Envío gratis · '}<b>Total ${eur(o.total)}</b></p>` + h.hr() + h.lab('Mientras llega') + h.p('Lee la guía: piel seca, 20 segundos de presión y 6-8 horas. Así el parche sale lleno la primera mañana.') + h.btn('Cómo usar los parches', site + '/como-usar.html') }) };
  },
  shipped(o, tracking, carrier) {
    const site = SITE();
    return { subject: `Tu pedido ${o.id} ya está en camino`, text: `Tu pedido ${o.id} ha salido. Seguimiento: ${tracking || ''}`, html: layout({ title: 'En camino', preheader: 'Tu pedido ha salido del almacén.', body: h.lab('Pedido ' + o.id) + h.title('Ya está en camino.') + h.p(`Lo entrega ${esc(carrier || 'el transportista')} en 24-48 h.${tracking ? ' Número de seguimiento: <b>' + esc(tracking) + '</b>' : ''}`) + h.btn('Prepara la primera noche', site + '/como-usar.html') }) };
  },
  abandoned({ name, items, code, pct }) {
    const site = SITE();
    return { subject: name ? `${name.split(' ')[0]}, te lo hemos guardado` : 'Te lo hemos guardado', text: `Tu cesta sigue aquí. Código ${code}: −${pct} %.`, html: layout({ title: 'Tu cesta', preheader: 'Sigue guardada, y con un −' + pct + ' %.', body: h.lab('Tu cesta') + h.title('Se te quedó esto a medias.') + h.p('La hemos guardado tal cual. Si te ayuda a decidirte, este código te descuenta un ' + pct + ' %:') + h.code(code) + h.items(items || []) + h.btn('Terminar el pedido', site + '/checkout.html?code=' + code) + h.hr() + h.p('Garantía de 60 días: si no ves la diferencia, te devolvemos el dinero sin devolver nada.') }) };
  },
  guide(o) {
    const site = SITE();
    return { subject: 'Esta noche: 3 gestos para que el parche salga lleno', text: 'Piel seca, 20 segundos de presión, 6-8 horas.', html: layout({ title: 'La primera noche', preheader: 'Tres gestos y a dormir.', body: h.lab('Antes de tu primera noche') + h.title('Ponlo. Duerme. Despega.') + h.p('<b>1. Nariz limpia y seca.</b> Sin crema, sérum ni aceite en la zona.') + h.p('<b>2. Presiona 20 segundos con la palma.</b> El calor activa el adhesivo: es el paso que más se salta.') + h.p('<b>3. Duerme 6-8 horas.</b> Por la mañana, si tira, moja el borde con agua tibia.') + h.btn('Ver la noche en 3D', site + '/como-usar.html') + h.hr() + h.p('¿Dudas? Responde a este email y te contestamos nosotros.') }) };
  },
  winback({ name, code, pct }) {
    const site = SITE();
    return { subject: 'Tus poros ya se han vuelto a llenar', text: `Han pasado unas semanas. Código ${code}: −${pct} %.`, html: layout({ title: 'Volver', preheader: 'Se rellenan cada 24-48 h. Toca repetir.', body: h.lab('Ha pasado un tiempo') + h.title((name ? esc(name.split(' ')[0]) + ', l' : 'L') + 'os filamentos ya han vuelto.') + h.p('Es normal: el poro produce grasa cada día. Con dos noches por semana se mantienen a raya. Para volver a empezar, un −' + pct + ' %:') + h.code(code) + h.btn('Repetir pedido', site + '/catalogo.html?code=' + code) }) };
  }
};
