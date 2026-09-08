/* NOCTA CRM · núcleo: sesión, API, router, componentes. Los módulos se registran con A.mod(nombre, {title, icon, group, render}). */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const A = window.A = { mods: {}, order: [], state: { days: 14 }, $, $$, esc, cache: {} };
  A.token = () => localStorage.getItem('n_admin') || '';
  A.logout = () => { localStorage.removeItem('n_admin'); location.reload(); };

  /* ---------- API ---------- */
  A.api = async (path, { method = 'GET', body, raw = false } = {}) => {
    const r = await fetch('/api/admin/' + path.replace(/^\//, ''), { method, headers: { 'x-admin-token': A.token(), ...(body !== undefined ? { 'content-type': 'application/json' } : {}) }, body: body !== undefined ? JSON.stringify(body) : undefined });
    if (r.status === 401) { A.logout(); throw new Error('Sesión caducada'); }
    if (raw) return r;
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.error || ('Error ' + r.status)); e.detail = j.detail; throw e; }
    return j;
  };
  A.r = (table, query = '') => A.api('r/' + table + (query ? '?' + query : ''));            // → {rows,total}
  A.rIns = (table, rows, onConflict) => A.api('r/' + table + (onConflict ? '?on_conflict=' + onConflict : ''), { method: 'POST', body: rows });
  A.rPatch = (table, filter, patch) => A.api('r/' + table + '?' + filter, { method: 'PATCH', body: patch });
  A.rDel = (table, filter) => A.api('r/' + table + '?' + filter, { method: 'DELETE' });
  A.act = (name, body = {}) => A.api('a/' + name, { method: 'POST', body });
  A.stats = async (days) => { const d = days || A.state.days; const k = 'stats' + d; if (A.cache[k] && Date.now() - A.cache[k].t < 30000) return A.cache[k].v; const v = await A.api('stats?days=' + d); A.cache[k] = { t: Date.now(), v }; return v; };
  A.products = () => (window.NOCTA_PRODUCTS || []);
  A.product = slug => A.products().find(p => p.slug === slug);
  A.exportUrl = table => '/api/admin/export/' + table + '?token=' + encodeURIComponent(A.token());

  /* ---------- formato ---------- */
  A.money = n => (Number(n) || 0).toFixed(2).replace('.', ',') + ' €';
  A.pct = n => (Number(n) || 0).toFixed(1).replace('.', ',') + ' %';
  A.date = (iso, time = true) => { if (!iso) return '—'; const d = new Date(iso); if (isNaN(d)) return '—'; return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) + (time ? ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''); };
  A.rel = iso => { if (!iso) return '—'; const s = (Date.now() - new Date(iso).getTime()) / 1000; if (s < 60) return 'ahora'; if (s < 3600) return 'hace ' + Math.floor(s / 60) + ' min'; if (s < 86400) return 'hace ' + Math.floor(s / 3600) + ' h'; if (s < 86400 * 30) return 'hace ' + Math.floor(s / 86400) + ' d'; return A.date(iso, false); };
  const ST = { pending: ['Pendiente', 'warn'], paid: ['Pagado', 'ok'], shipped: ['Enviado', 'info'], delivered: ['Entregado', 'ok'], demo: ['Demo', ''], abandoned: ['Abandonado', ''], failed: ['Fallido', 'bad'], error: ['Error', 'bad'], refunded: ['Reembolsado', 'bad'], partial_refund: ['Reembolso parcial', 'warn'], disputed: ['Disputa', 'bad'], canceled: ['Cancelada', 'bad'], cancelling: ['Se cancela al final', 'warn'], active: ['Activa', 'ok'], trialing: ['Prueba', 'info'], past_due: ['Impago', 'bad'], draft: ['Borrador', ''], scheduled: ['Programada', 'info'], sending: ['Enviando', 'warn'], sent: ['Enviada', 'ok'], received: ['Recibido', 'info'], delivered_msg: ['Entregado', 'ok'], read: ['Leído', 'ok'], skipped: ['Sin enviar', 'warn'], customer: ['Cliente', 'ok'], unsubscribed: ['Baja', 'bad'] };
  A.badge = (s, label) => { const [t, k] = ST[s] || [s || '—', '']; return `<span class="bdg${k ? ' bdg--' + k : ''}">${esc(label || t)}</span>`; };
  A.statusName = s => (ST[s] || [s])[0];

  /* ---------- componentes ---------- */
  A.toast = (m, kind = '') => { const t = document.createElement('div'); t.className = 'toast' + (kind ? ' toast--' + kind : ''); t.textContent = m; $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3200); };
  A.modal = ({ title, body, actions = [], wide = false, onClose }) => {
    const m = document.createElement('div'); m.className = 'mod'; m.innerHTML = `<div class="mod__box${wide ? ' wide' : ''}" role="dialog" aria-modal="true"><div class="mod__h"><h2>${esc(title)}</h2><button class="ic" data-x aria-label="Cerrar">✕</button></div><div class="mod__b"></div><div class="mod__a"></div></div>`;
    const b = $('.mod__b', m); if (typeof body === 'string') b.innerHTML = body; else b.appendChild(body);
    const close = () => { m.remove(); document.removeEventListener('keydown', esc1); onClose && onClose(); }; const esc1 = e => { if (e.key === 'Escape') close(); };
    const aa = $('.mod__a', m); actions.forEach(a => { const bt = document.createElement('button'); bt.className = 'btn' + (a.primary ? ' btn--p' : a.danger ? ' btn--d' : ' btn--g'); bt.textContent = a.label; bt.onclick = async () => { bt.disabled = true; try { const r = await a.onClick(m, close); if (r !== false && a.closeAfter !== false) close(); } catch (e) { A.toast(e.message, 'bad'); } bt.disabled = false; }; aa.appendChild(bt); });
    if (!actions.length) aa.remove();
    $('[data-x]', m).onclick = close; m.addEventListener('click', e => { if (e.target === m) close(); }); document.addEventListener('keydown', esc1);
    $('#modals').appendChild(m); const f = $('input,select,textarea,button:not([data-x])', b); f && setTimeout(() => f.focus(), 50);
    return { el: m, body: b, close };
  };
  A.confirm = (msg, { label = 'Confirmar', danger = false } = {}) => new Promise(res => { A.modal({ title: 'Confirmar', body: `<p>${esc(msg)}</p>`, actions: [{ label: 'Cancelar', onClick: () => res(false) }, { label, primary: !danger, danger, onClick: () => res(true) }], onClose: () => res(false) }); });
  A.prompt = (title, fields, values = {}) => new Promise(res => { const f = document.createElement('form'); f.innerHTML = A.form(fields, values); f.onsubmit = e => e.preventDefault(); A.modal({ title, body: f, actions: [{ label: 'Cancelar', onClick: () => res(null) }, { label: 'Guardar', primary: true, onClick: () => { if (!f.reportValidity()) return false; res(A.read(f)); } }], onClose: () => res(null) }); });
  A.kpi = (label, value, sub = '', cls = '') => `<div class="kpi${cls ? ' ' + cls : ''}"><small>${esc(label)}</small><b>${value}</b>${sub ? `<span class="sub">${sub}</span>` : ''}</div>`;
  A.card = (title, body, right = '') => `<section class="card">${title ? `<div class="card__h"><h2>${esc(title)}</h2><div class="row">${right}</div></div>` : ''}${body}</section>`;
  // tabla: cols [{k,label,render(row),cls,w}], rows, rowAttr(row) → string de atributos (p.ej. data-id) ; empty
  A.table = ({ cols, rows, empty = 'Nada por aquí todavía.', rowAttr, click = true }) => `<div class="tbl-wrap"><table class="tbl"><thead><tr>${cols.map(c => `<th class="${c.cls || ''}" ${c.w ? `style="width:${c.w}"` : ''}>${esc(c.label)}</th>`).join('')}</tr></thead><tbody>${rows.length ? rows.map(r => `<tr class="${click && rowAttr ? 'click' : ''}" ${rowAttr ? rowAttr(r) : ''}>${cols.map(c => `<td class="${c.cls || ''}">${c.render ? c.render(r) : esc(r[c.k])}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cols.length}"><div class="empty">${esc(empty)}</div></td></tr>`}</tbody></table></div>`;
  // formulario: fields [{k,label,type:'text|number|email|tel|textarea|select|toggle|date|datetime|json|hidden',options:[[v,l]],help,required,step,placeholder,row:true}]
  A.form = (fields, v = {}) => fields.map(f => {
    const val = f.k.split('.').reduce((o, k) => (o == null ? undefined : o[k]), v); const id = 'f_' + f.k.replace(/\W/g, '_');
    let inp;
    switch (f.type) {
      case 'textarea': inp = `<textarea id="${id}" name="${f.k}" ${f.required ? 'required' : ''} placeholder="${esc(f.placeholder || '')}">${esc(val)}</textarea>`; break;
      case 'select': inp = `<select id="${id}" name="${f.k}">${(f.options || []).map(o => { const [ov, ol] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(ov)}" ${String(ov) === String(val ?? f.default ?? '') ? 'selected' : ''}>${esc(ol)}</option>`; }).join('')}</select>`; break;
      case 'toggle': return `<div class="fld"><label class="tog"><input type="checkbox" name="${f.k}" ${val === undefined ? (f.default ? 'checked' : '') : (val ? 'checked' : '')}> ${esc(f.label)}</label>${f.help ? `<span class="help">${f.help}</span>` : ''}</div>`;
      case 'json': inp = `<textarea id="${id}" name="${f.k}" data-json class="mono">${esc(val == null ? '' : JSON.stringify(val, null, 2))}</textarea>`; break;
      case 'hidden': return `<input type="hidden" name="${f.k}" value="${esc(val)}">`;
      default: inp = `<input id="${id}" name="${f.k}" type="${f.type || 'text'}" value="${esc(val == null ? (f.default ?? '') : (f.type === 'datetime' && val ? String(val).slice(0, 16) : val))}" ${f.required ? 'required' : ''} ${f.step ? `step="${f.step}"` : ''} ${f.min != null ? `min="${f.min}"` : ''} placeholder="${esc(f.placeholder || '')}" ${f.type === 'datetime' ? 'type="datetime-local"' : ''}>`;
    }
    return `<div class="fld"><label for="${id}">${esc(f.label)}</label>${inp}${f.help ? `<span class="help">${f.help}</span>` : ''}</div>`;
  }).join('');
  A.read = form => { const o = {}; $$('input,select,textarea', form).forEach(i => { if (!i.name) return; let v = i.type === 'checkbox' ? i.checked : i.value; if (i.type === 'number') v = i.value === '' ? null : Number(i.value); if (i.dataset.json !== undefined) { try { v = i.value.trim() ? JSON.parse(i.value) : null; } catch (e) { throw new Error('JSON no válido en ' + i.name); } } if (i.type === 'datetime-local') v = v ? new Date(v).toISOString() : null; i.name.split('.').reduce((acc, k, idx, arr) => { if (idx === arr.length - 1) acc[k] = v; else acc[k] = acc[k] || {}; return acc[k]; }, o); }); return o; };
  A.tabs = (el, tabs, initial) => { const bar = document.createElement('div'); bar.className = 'tabs'; const body = document.createElement('div'); el.appendChild(bar); el.appendChild(body); const go = k => { $$('button', bar).forEach(b => b.classList.toggle('on', b.dataset.k === k)); body.innerHTML = '<div class="loading">Cargando…</div>'; Promise.resolve(tabs[k](body)).catch(e => { body.innerHTML = `<p class="err">${esc(e.message)}</p>`; }); }; Object.keys(tabs).forEach(k => { const b = document.createElement('button'); b.dataset.k = k; b.textContent = k; b.onclick = () => go(k); bar.appendChild(b); }); go(initial || Object.keys(tabs)[0]); return go; };
  A.search = (el, rows, keys, render) => { el.innerHTML = `<div class="row mb"><input class="search grow" placeholder="Buscar…" type="search"></div><div class="out"></div>`; const out = $('.out', el), inp = $('input', el); const draw = () => { const q = inp.value.toLowerCase().trim(); out.innerHTML = render(q ? rows.filter(r => keys.some(k => String(r[k] || '').toLowerCase().includes(q))) : rows); }; inp.oninput = draw; draw(); return draw; };
  A.copy = async t => { try { await navigator.clipboard.writeText(t); A.toast('Copiado'); } catch (e) { A.toast('No se pudo copiar', 'bad'); } };
  A.chart = (canvas, cfg) => { if (!window.Chart) return null; if (canvas._c) canvas._c.destroy(); Chart.defaults.font.family = getComputedStyle(document.body).fontFamily; Chart.defaults.color = '#6B6F7B'; canvas._c = new Chart(canvas, cfg); return canvas._c; };
  A.itemsText = items => (items || []).map(i => `${i.qty}× ${i.name}`).join(', ');

  /* ---------- módulos y router ---------- */
  A.mod = (name, def) => { A.mods[name] = def; A.order.push(name); };
  A.go = h => { location.hash = h.startsWith('#') ? h : '#/' + h; };
  A.route = () => { const raw = location.hash.replace(/^#\/?/, ''); const [path, qs] = raw.split('?'); const parts = path.split('/').filter(Boolean); return { name: parts[0] || 'dashboard', params: parts.slice(1).map(decodeURIComponent), query: Object.fromEntries(new URLSearchParams(qs || '')) }; };
  let current = null;
  A.render = async () => {
    const r = A.route(); const m = A.mods[r.name] || A.mods.dashboard; current = r.name;
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.m === r.name));
    $('#title').textContent = m.title; document.title = m.title + ' · NOCTA CRM';
    const main = $('#main'); main.innerHTML = '<div class="loading">Cargando…</div>'; main.scrollTop = 0; window.scrollTo(0, 0);
    try { await m.render(main, r.params, r.query); } catch (e) { main.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p>${e.detail ? `<pre class="mono">${esc(JSON.stringify(e.detail, null, 2))}</pre>` : ''}</div>`; console.error(e); }
    $('#side').classList.remove('open'); $('#sidebg').classList.remove('open');
  };
  A.nav = () => { let g = ''; $('#nav').innerHTML = A.order.map(n => { const m = A.mods[n]; if (m.hidden) return ''; const grp = m.group && m.group !== g ? `<div class="grp">${esc(m.group)}</div>` : ''; g = m.group || g; return grp + `<a href="#/${n}" data-m="${n}"><i>${m.icon || '•'}</i>${esc(m.title)}<span class="cnt" data-cnt="${n}" hidden></span></a>`; }).join(''); };
  A.count = (name, n) => { const c = $(`[data-cnt="${name}"]`); if (!c) return; c.textContent = n; c.hidden = !n; };

  A.start = async () => {
    $('#lgform').onsubmit = async e => { e.preventDefault(); const err = $('#lgerr'); err.hidden = true; try { const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password: $('#lgpass').value }) }); const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Error'); localStorage.setItem('n_admin', j.token); boot(); } catch (x) { err.textContent = x.message; err.hidden = false; } };
    $('#logout').onclick = A.logout; $('#menu').onclick = () => { $('#side').classList.toggle('open'); $('#sidebg').classList.toggle('open'); }; $('#sidebg').onclick = () => { $('#side').classList.remove('open'); $('#sidebg').classList.remove('open'); };
    $('#days').onchange = e => { A.state.days = Number(e.target.value); A.cache = {}; A.render(); }; $('#refresh').onclick = () => { A.cache = {}; A.render(); };
    addEventListener('hashchange', A.render);
    const boot = async () => { try { const me = await A.api('me'); A.me = me; $('#login').hidden = true; $('#app').hidden = false; A.nav(); A.render(); A.badges && A.badges(); } catch (e) { $('#app').hidden = true; $('#login').hidden = false; } };
    if (!A.token()) { try { const r = await fetch('/api/admin/me'); if (r.ok) { localStorage.setItem('n_admin', 'open'); } } catch (e) { } }
    boot();
  };
  // contadores de la barra lateral (pedidos por enviar, mensajes entrantes sin leer)
  A.badges = async () => { try { const s = await A.stats(); A.count('orders', s.pending_ship); } catch (e) { } };
})();
