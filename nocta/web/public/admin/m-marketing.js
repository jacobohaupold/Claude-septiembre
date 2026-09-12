/* NOCTA CRM · Marketing: campañas (newsletter/whatsapp), bandeja de WhatsApp, automatizaciones y registro de mensajes. */
(function () {
  const A = window.A, esc = A.esc, $ = A.$, $$ = A.$$;

  /* ---------- estilos propios del módulo (admin.css no se toca) ---------- */
  function ensureStyles() {
    if (document.getElementById('mktgStyle')) return;
    const st = document.createElement('style'); st.id = 'mktgStyle';
    st.textContent = `
    .wa-shell{display:grid;grid-template-columns:280px minmax(0,1fr);gap:14px;align-items:start}
    .wa-list-pane{max-height:74vh;overflow-y:auto;overflow-x:hidden;min-width:0}
    .wa-list{display:grid;gap:6px;grid-template-columns:minmax(0,1fr)}
    .wa-conv{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;text-align:left;width:100%}
    .wa-conv.on{border-color:var(--navy);background:#F3EFE6}
    .wa-conv .av{width:36px;height:36px;border-radius:50%;background:var(--sage2);display:grid;place-items:center;font-weight:600;color:var(--navy);flex:none;font-size:14px}
    .wa-conv__b{flex:1;min-width:0}
    .wa-conv__b b{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .wa-conv__b span{display:block;font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .wa-conv__meta{text-align:right;flex:none}
    .wa-badge{display:inline-block;margin-top:3px;background:var(--red);color:#fff;font-size:11px;padding:1px 7px;border-radius:999px}
    .wa-chat-pane{display:flex;flex-direction:column;min-width:0}
    .wa-chat-h{display:flex;align-items:center;gap:10px;margin-bottom:8px;min-width:0}
    .wa-chat-h b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .wa-chat-h span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .wa-back{display:none;flex:none}
    .wa-reply{display:flex;gap:8px;margin-top:10px;align-items:flex-end}
    .wa-reply textarea{flex:1;min-width:0;min-height:44px;max-height:120px;padding:8px 11px;border:1px solid var(--line);border-radius:var(--r2);font:inherit;resize:vertical}
    @media (max-width:820px){
      .wa-shell{grid-template-columns:minmax(0,1fr)}
      .wa-shell.show-chat .wa-list-pane{display:none}
      .wa-shell:not(.show-chat) .wa-chat-pane{display:none}
      .wa-back{display:inline-flex}
    }
    .blk__prod-list{display:flex;flex-wrap:wrap;gap:6px 16px}
    .wa-conv__b b,.wa-conv__b span{min-width:0}
    .wa-conv__meta{min-width:0;white-space:nowrap}
    .blk__prod-list label{display:flex;align-items:center;gap:6px;font-size:13px}
    `;
    document.head.appendChild(st);
  }

  /* ============================================================ CAMPAÑAS ============================================================ */

  const SEGMENTS = [
    ['all', 'Todos'],
    ['noncustomers', 'Leads (no clientes)'],
    ['customers', 'Clientes'],
    ['subscribers', 'Suscriptores'],
    ['wa', 'Con WhatsApp'],
    ['tag', 'Etiqueta…'],
    ['skin', 'Tipo de piel…'],
    ['inactive', 'Inactivos más de N días'],
    ['emails', 'Lista de emails']
  ];

  const BLOCK_DEFS = {
    label: { label: 'Etiqueta', def: () => ({ type: 'label', text: '' }) },
    title: { label: 'Título', def: () => ({ type: 'title', text: '' }) },
    text: { label: 'Texto', def: () => ({ type: 'text', text: '' }) },
    image: { label: 'Imagen', def: () => ({ type: 'image', src: '', alt: '' }) },
    button: { label: 'Botón', def: () => ({ type: 'button', text: '', href: '' }) },
    code: { label: 'Código descuento', def: () => ({ type: 'code', code: '{code}' }) },
    product: { label: 'Producto', def: () => ({ type: 'product', slug: '' }) },
    products: { label: 'Varios productos', def: () => ({ type: 'products', slugs: [] }) },
    hero: { label: 'Portada / hero', def: () => ({ type: 'hero', src: '', label: '', title: '', text: '', button: '', href: '' }) },
    divider: { label: 'Separador', def: () => ({ type: 'divider' }) },
    html: { label: 'HTML', def: () => ({ type: 'html', html: '' }) }
  };

  const TEMPLATES = {
    launch: {
      subject: 'Nuevo en NOCTA 🌙', preheader: 'Ya está disponible.',
      blocks: [
        { type: 'label', text: 'Novedad' },
        { type: 'title', text: '{nombre}, esto acaba de llegar' },
        { type: 'text', text: 'Parches de hidrocoloide pensados para actuar mientras duermes: absorben durante 6-8 horas y dejan el poro visiblemente más limpio por la mañana.' },
        { type: 'button', text: 'Verlo ahora', href: '/catalogo.html' }
      ],
      wa: 'Hola {nombre} 🌙 Acaba de llegar algo nuevo a NOCTA: parches de hidrocoloide para usar mientras duermes. Míralo aquí: nocta.es/catalogo.html'
    },
    weekend: {
      subject: 'Tu -15 % de fin de semana ya está activo', preheader: 'Solo hasta el domingo.',
      blocks: [
        { type: 'label', text: 'Solo este fin de semana' },
        { type: 'title', text: '{nombre}, un -15 % para ti' },
        { type: 'text', text: 'De viernes a domingo, todo NOCTA con descuento. Ideal para dejar la piel lista antes del lunes.' },
        { type: 'code', code: '{code}' },
        { type: 'button', text: 'Comprar ahora', href: '/catalogo.html' }
      ],
      wa: 'Hola {nombre} 🌙 Este fin de semana tienes un -15 % en todo NOCTA. Usa el código {code} en nocta.es/catalogo.html'
    },
    tip: {
      subject: 'El truco que cambia todo (dura 20 segundos)', preheader: 'Así se usan bien los parches.',
      blocks: [
        { type: 'label', text: 'Consejo de la noche' },
        { type: 'title', text: 'Nariz seca, 20 segundos, 6-8 horas' },
        { type: 'text', text: 'El 90 % de los "no me funciona" vienen de saltarse un paso: nariz limpia y **seca**, presiona 20 segundos con la palma y déjalo toda la noche.' },
        { type: 'button', text: 'Ver la guía completa', href: '/como-usar.html' }
      ],
      wa: 'Hola {nombre} 🌙 Un truco rápido: nariz limpia y seca, presiona el parche 20 segundos con la palma y déjalo puesto 6-8 horas. Así sale lleno por la mañana.'
    },
    restock: {
      subject: 'Es buen momento para reponer', preheader: 'Antes de que se acaben.',
      blocks: [
        { type: 'label', text: 'Se acaban rápido' },
        { type: 'title', text: '{nombre}, ¿te quedan parches?' },
        { type: 'text', text: 'Los poros se rellenan cada pocas semanas. Con dos noches por semana notarás la diferencia. Repite ahora con un código especial:' },
        { type: 'code', code: '{code}' },
        { type: 'button', text: 'Repetir pedido', href: '/catalogo.html' }
      ],
      wa: 'Hola {nombre} 🌙 Los poros se rellenan cada pocas semanas: buen momento para reponer. Con el código {code} tienes descuento en nocta.es/catalogo.html'
    }
  };
  const TEMPLATE_ORDER = [['launch', 'Lanzamiento'], ['weekend', 'Descuento fin de semana'], ['tip', 'Consejo de uso'], ['restock', 'Reposición']];

  function segExtraHtml(seg) {
    seg = seg || {};
    if (seg.type === 'tag') return `<div class="fld"><label>Etiqueta</label><input id="fSegValue" type="text" value="${esc(seg.value || '')}" placeholder="p. ej. vip"></div>`;
    if (seg.type === 'skin') return `<div class="fld"><label>Tipo de piel</label><input id="fSegValue" type="text" value="${esc(seg.value || '')}" placeholder="p. ej. grasa"></div>`;
    if (seg.type === 'inactive') return `<div class="fld"><label>Inactivos hace más de (días)</label><input id="fSegValue" type="number" min="1" value="${esc(seg.value || 30)}"></div>`;
    if (seg.type === 'emails') return `<div class="fld"><label>Lista de emails</label><textarea id="fSegValue" placeholder="uno por línea, o separados por comas">${esc(Array.isArray(seg.value) ? seg.value.join('\n') : (seg.value || ''))}</textarea></div>`;
    return '';
  }

  function blockFieldsHtml(b, i) {
    const F = (k, label, type) => type === 'textarea'
      ? `<div class="fld"><label>${esc(label)}</label><textarea data-bf="${k}" data-bi="${i}">${esc(b[k] || '')}</textarea></div>`
      : `<div class="fld"><label>${esc(label)}</label><input data-bf="${k}" data-bi="${i}" type="text" value="${esc(b[k] || '')}"></div>`;
    switch (b.type) {
      case 'label': return F('text', 'Texto');
      case 'title': return F('text', 'Texto');
      case 'text': return F('text', 'Texto (admite **negrita**)', 'textarea');
      case 'image': return F('src', 'URL de la imagen') + F('alt', 'Texto alternativo');
      case 'button': return F('text', 'Texto del botón') + F('href', 'Enlace (/ruta o https://…)');
      case 'code': return F('code', 'Código (usa {code} para el de la segmentación)');
      case 'divider': return `<p class="muted xs">Línea separadora.</p>`;
      case 'html': return F('html', 'HTML', 'textarea');
      case 'product': {
        const opts = A.products().map(p => `<option value="${esc(p.slug)}" ${p.slug === b.slug ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
        return `<div class="fld"><label>Producto</label><select data-bf="slug" data-bi="${i}"><option value="">— elige —</option>${opts}</select></div>`;
      }
      case 'products': {
        const sel = b.slugs || [];
        const items = A.products().map(p => `<label><input type="checkbox" data-bf="slugs" data-bi="${i}" value="${esc(p.slug)}" ${sel.includes(p.slug) ? 'checked' : ''}> ${esc(p.name)}</label>`).join('');
        return `<div class="fld"><label>Productos</label><div class="blk__prod-list">${items || '<span class="muted xs">No hay productos en el catálogo.</span>'}</div></div>`;
      }
      case 'hero': return F('src', 'URL de la imagen') + F('label', 'Etiqueta') + F('title', 'Título') + F('text', 'Texto', 'textarea') + F('button', 'Texto del botón') + F('href', 'Enlace del botón');
      default: return '';
    }
  }
  function blockHtml(b, i, total) {
    const name = (BLOCK_DEFS[b.type] || {}).label || b.type;
    return `<div class="blk" data-block="${i}"><div class="blk__h"><b>${esc(name)}</b><div class="row">
      <button type="button" data-bup="${i}" ${i === 0 ? 'disabled' : ''} title="Subir" aria-label="Subir bloque">↑</button>
      <button type="button" data-bdown="${i}" ${i === total - 1 ? 'disabled' : ''} title="Bajar" aria-label="Bajar bloque">↓</button>
      <button type="button" data-brm="${i}" title="Borrar" aria-label="Borrar bloque">✕</button>
    </div></div>${blockFieldsHtml(b, i)}</div>`;
  }
  function blocksHtml(blocks) { return blocks.length ? blocks.map((b, i) => blockHtml(b, i, blocks.length)).join('') : `<p class="muted xs">Añade bloques abajo para construir el mensaje.</p>`; }
  function addBlockButtonsHtml(isEmail) {
    const keys = isEmail ? Object.keys(BLOCK_DEFS) : ['product', 'button', 'code'];
    return `<div class="row mt" style="flex-wrap:wrap">${keys.map(k => `<button type="button" class="btn btn--s btn--g" data-addblock="${k}">+ ${esc(BLOCK_DEFS[k].label)}</button>`).join('')}</div>`;
  }

  async function renderCampaignsList(el) {
    let rows = [];
    try { const r = await A.r('campaigns', 'select=*&order=created_at.desc'); rows = r.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    const body = A.table({
      cols: [
        { k: 'name', label: 'Nombre', render: r => `<b>${esc(r.name || '(sin nombre)')}</b>` },
        { k: 'channel', label: 'Canal', render: r => r.channel === 'whatsapp' ? '<span class="pill">💬 WhatsApp</span>' : '<span class="pill">✉ Email</span>', w: '120px' },
        { k: 'status', label: 'Estado', render: r => A.badge(r.status), w: '110px' },
        { k: 'recipients', label: 'Envíos (dest./env./fallos)', render: r => `<span class="num">${r.recipients ?? 0} / ${r.sent_count ?? 0} / ${r.failed_count ?? 0}</span>`, cls: 'right', w: '210px' },
        { k: 'created_at', label: 'Fecha', render: r => A.date(r.sent_at || r.scheduled_at || r.created_at), w: '110px' },
        { k: 'acc', label: '', render: r => `<div class="row nowrap" style="gap:6px;flex-wrap:nowrap"><button class="btn btn--s btn--g" data-dup="${r.id}">Duplicar</button><button class="btn btn--s btn--d" data-del="${r.id}">Borrar</button></div>`, cls: 'right nowrap', w: '170px' }
      ],
      rows, empty: 'Todavía no has creado ninguna campaña.',
      rowAttr: r => `data-id="${r.id}"`
    });
    el.innerHTML = `
      <div class="row row--sb mb"><div></div><div class="row"><button class="btn btn--p" id="newEmail">＋ Nueva campaña</button><button class="btn btn--g" id="newWa">＋ Nueva campaña WhatsApp</button></div></div>
      ${A.card('Campañas', body)}
    `;
    $('#newEmail', el).onclick = () => A.go('campaigns/new');
    $('#newWa', el).onclick = () => A.go('campaigns/new-wa');
    el.onclick = async e => {
      const dup = e.target.closest('[data-dup]'), del = e.target.closest('[data-del]'), tr = e.target.closest('tr[data-id]');
      if (dup) {
        e.stopPropagation();
        const src = rows.find(x => String(x.id) === dup.dataset.dup); if (!src) return;
        const row = { ...src };
        delete row.id; delete row.created_at; delete row.updated_at; delete row.sent_at; delete row.scheduled_at;
        row.name = (row.name || 'Campaña') + ' (copia)'; row.status = 'draft';
        row.recipients = 0; row.sent_count = 0; row.failed_count = 0; row.provider_ids = null; row.stats = null;
        try { const ins = await A.rIns('campaigns', [row]); A.toast('Campaña duplicada', 'ok'); A.go('campaigns/' + ins[0].id); }
        catch (err) { A.toast(err.message, 'bad'); }
        return;
      }
      if (del) {
        e.stopPropagation();
        const ok = await A.confirm('¿Borrar esta campaña? No se puede deshacer.', { label: 'Borrar', danger: true });
        if (!ok) return;
        try { await A.rDel('campaigns', 'id=eq.' + del.dataset.del); A.toast('Campaña borrada', 'ok'); renderCampaignsList(el); }
        catch (err) { A.toast(err.message, 'bad'); }
        return;
      }
      if (tr) A.go('campaigns/' + tr.dataset.id);
    };
  }

  async function renderCampaignsEditor(el, id) {
    const isNew = id === 'new' || id === 'new-wa';
    let row;
    if (isNew) {
      row = { id: null, name: '', channel: id === 'new-wa' ? 'whatsapp' : 'email', subject: '', preheader: '', blocks: [], text_body: '', segment: { type: 'all' }, status: 'draft' };
    } else {
      try {
        const r = await A.r('campaigns', 'select=*&id=eq.' + encodeURIComponent(id));
        row = (r.rows || [])[0];
        if (!row) { el.innerHTML = `<div class="card"><p class="err">Campaña no encontrada.</p></div>`; return; }
        row.blocks = row.blocks || []; row.segment = row.segment || { type: 'all' };
      } catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    }
    const state = { id: isNew ? null : row.id, channel: row.channel, blocks: (row.blocks || []).map(b => ({ ...b })), segment: { ...(row.segment || { type: 'all' }) } };
    let previewTimer = null;

    function buildRow() {
      const segType = $('#fSegType', el) ? $('#fSegType', el).value : state.segment.type;
      let segValue = null;
      const sv = $('#fSegValue', el);
      if (sv) segValue = segType === 'emails' ? sv.value.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean) : sv.value;
      const isEmail = state.channel === 'email';
      return {
        name: ($('#fName', el) ? $('#fName', el).value : row.name || '').trim(),
        channel: state.channel,
        subject: isEmail && $('#fSubject', el) ? $('#fSubject', el).value : null,
        preheader: isEmail && $('#fPreheader', el) ? $('#fPreheader', el).value : null,
        blocks: state.blocks,
        html: null,
        text_body: !isEmail && $('#fWaText', el) ? $('#fWaText', el).value : null,
        segment: { type: segType, value: segValue },
        updated_at: new Date().toISOString()
      };
    }

    function updateWaPreview() {
      const b = $('#waPreviewBubble', el); if (!b) return;
      const text = $('#fWaText', el) ? $('#fWaText', el).value : (row.text_body || '');
      b.textContent = text ? text.replace(/\{nombre\}/g, 'Ana').replace(/\{email\}/g, 'ana@ejemplo.com').replace(/\{code\}/g, 'HOLA10') : 'Escribe el mensaje a la izquierda…';
    }
    function schedulePreview() {
      clearTimeout(previewTimer);
      if (state.channel === 'whatsapp') { updateWaPreview(); return; }
      previewTimer = setTimeout(async () => {
        try {
          const m = await A.act('campaign.preview', { campaign: buildRow() });
          const ifr = $('.preview iframe', el); if (ifr) ifr.srcdoc = m.html;
        } catch (e) { /* silencioso: no interrumpir la edición */ }
      }, 400);
    }

    function redrawBlocks() { const w = $('#blocksWrap', el); if (w) w.innerHTML = blocksHtml(state.blocks); }

    function editorHtml() {
      const isEmail = state.channel === 'email';
      return `
      <div class="row row--sb mb"><button class="btn btn--g btn--s" id="backList">← Campañas</button><span class="pill">${isEmail ? '✉ Email' : '💬 WhatsApp'}</span></div>
      ${row.status && row.status !== 'draft' ? `<p class="muted xs mb">Estado actual: ${A.badge(row.status)} ${['sent', 'sending'].includes(row.status) ? '· ya se envió; duplícala desde la lista si quieres reenviarla.' : ''}</p>` : ''}
      <div class="split">
        <div>
          ${A.card('', `
            <div class="fld"><label>Nombre de la campaña</label><input id="fName" type="text" value="${esc(row.name || '')}" placeholder="Solo para identificarla en tu lista"></div>
            ${isEmail ? `<div class="fld"><label>Asunto</label><input id="fSubject" type="text" value="${esc(row.subject || '')}"></div>
            <div class="fld"><label>Preheader</label><input id="fPreheader" type="text" value="${esc(row.preheader || '')}"><span class="help">El texto que se ve junto al asunto en la bandeja de entrada.</span></div>` : ''}
            <div class="fld"><label>Destinatarios</label><select id="fSegType">${SEGMENTS.map(([v, l]) => `<option value="${v}" ${v === state.segment.type ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
            <div id="segExtraWrap">${segExtraHtml(state.segment)}</div>
            <div class="row"><button type="button" class="btn btn--s btn--g" id="btnCount">Contar destinatarios</button><span id="countOut" class="muted sm"></span></div>
          `)}
          ${!isEmail ? `<div class="card mt">
            <div class="fld"><label>Mensaje</label><textarea id="fWaText" rows="6">${esc(row.text_body || '')}</textarea><span class="help" id="waCount">${(row.text_body || '').length} caracteres</span></div>
            <p class="muted xs">Solo llega a quienes dieron su consentimiento de WhatsApp.</p>
            <p class="muted xs">WhatsApp Cloud API solo permite mensajes libres dentro de 24 h desde la última respuesta del cliente; fuera de esa ventana usa una plantilla aprobada (ver <a href="#/integrations">Integraciones</a>).</p>
          </div>` : ''}
          ${!state.id ? `<div class="card mt"><div class="card__h"><h2>Plantillas rápidas</h2></div><div class="row" style="flex-wrap:wrap">${TEMPLATE_ORDER.map(([k, l]) => `<button type="button" class="btn btn--s btn--g" data-tpl="${k}">${esc(l)}</button>`).join('')}</div></div>` : ''}
          <div class="card mt"><div class="card__h"><h2>${isEmail ? 'Bloques del correo' : 'Bloques opcionales'}</h2></div>
            <div class="blocks" id="blocksWrap">${blocksHtml(state.blocks)}</div>
            ${addBlockButtonsHtml(isEmail)}
          </div>
          <p class="muted xs mt">Variables disponibles: <span class="code">{nombre}</span> <span class="code">{email}</span> <span class="code">{code}</span></p>
          <div class="row mt" style="flex-wrap:wrap">
            <button class="btn btn--g" id="btnDraft">Guardar borrador</button>
            <button class="btn btn--g" id="btnTest">Enviar prueba</button>
            <button class="btn btn--g" id="btnSchedule">Programar</button>
            <button class="btn btn--p" id="btnSend">Enviar ahora</button>
          </div>
        </div>
        <div>
          ${isEmail ? `<div class="preview"><iframe title="Vista previa" srcdoc="<p style=&quot;font-family:sans-serif;color:#888;padding:20px&quot;>Cargando vista previa…</p>"></iframe></div>`
          : `<div class="card"><p class="muted xs mb">Así lo verá quien lo reciba:</p><div class="chat"><div class="msg out" id="waPreviewBubble">—</div></div></div>`}
        </div>
      </div>`;
    }

    function draw() { el.innerHTML = editorHtml(); if (state.channel === 'whatsapp') updateWaPreview(); }

    async function doCount() {
      const out = $('#countOut', el); out.textContent = 'Calculando…';
      try { const r = await A.act('campaign.count', { segment: buildRow().segment, channel: state.channel }); out.textContent = `≈ ${r.count} persona${r.count === 1 ? '' : 's'}`; }
      catch (e) { out.textContent = ''; A.toast(e.message, 'bad'); }
    }
    async function saveDraft(toast) {
      const r = buildRow();
      if (!r.name) { A.toast('Ponle un nombre a la campaña', 'bad'); return null; }
      try {
        if (state.id) { await A.rPatch('campaigns', 'id=eq.' + state.id, r); if (toast) A.toast('Guardado', 'ok'); return state.id; }
        r.status = 'draft';
        const ins = await A.rIns('campaigns', [r]);
        state.id = ins[0].id; row.id = state.id; row.status = 'draft';
        history.replaceState(null, '', '#/campaigns/' + state.id);
        if (toast) A.toast('Borrador guardado', 'ok');
        return state.id;
      } catch (e) { A.toast(e.message, 'bad'); return null; }
    }
    async function doTest() {
      const id = await saveDraft(false); if (!id) return;
      const isEmail = state.channel === 'email';
      const v = await A.prompt('Enviar prueba', [{ k: 'test_to', label: isEmail ? 'Enviar prueba a (email)' : 'Enviar prueba a (teléfono)', type: isEmail ? 'email' : 'tel', required: true }], {});
      if (!v) return;
      try { const r = await A.act('campaign.send', { id, test_to: v.test_to }); A.toast(r.sent ? 'Prueba enviada' : 'No se pudo enviar la prueba', r.sent ? 'ok' : 'bad'); }
      catch (e) { A.toast(e.message, 'bad'); }
    }
    async function doSchedule() {
      const id = await saveDraft(false); if (!id) return;
      const v = await A.prompt('Programar envío', [{ k: 'schedule_at', label: 'Fecha y hora', type: 'datetime', required: true }], {});
      if (!v) return;
      try { await A.act('campaign.send', { id, schedule_at: v.schedule_at }); A.toast('Campaña programada', 'ok'); A.go('campaigns'); }
      catch (e) { A.toast(e.message, 'bad'); }
    }
    async function doSend() {
      const id = await saveDraft(false); if (!id) return;
      let count = 0;
      try { const c = await A.act('campaign.count', { segment: buildRow().segment, channel: state.channel }); count = c.count; } catch (e) { }
      const ok = await A.confirm(`Se enviará ahora a ≈ ${count} persona${count === 1 ? '' : 's'}. Esta acción no se puede deshacer.`, { label: 'Enviar ahora' });
      if (!ok) return;
      try {
        const r = await A.act('campaign.send', { id });
        A.toast(`Enviada a ${r.sent} de ${r.recipients}${r.failed ? ` · ${r.failed} fallos` : ''}`, r.failed && !r.sent ? 'bad' : 'ok');
        A.go('campaigns');
      } catch (e) { A.toast(e.message, 'bad'); }
    }
    function applyTemplate(key) {
      const t = TEMPLATES[key]; if (!t) return;
      if (state.channel === 'email') { row.subject = t.subject; row.preheader = t.preheader; state.blocks = t.blocks.map(b => ({ ...b })); }
      else { row.text_body = t.wa; }
      draw(); schedulePreview();
    }

    el.oninput = e => {
      const t = e.target;
      if (t.matches('[data-bf]')) {
        const i = Number(t.dataset.bi), f = t.dataset.bf;
        if (t.type === 'checkbox') { const set = new Set(state.blocks[i].slugs || []); if (t.checked) set.add(t.value); else set.delete(t.value); state.blocks[i].slugs = [...set]; }
        else state.blocks[i][f] = t.value;
        schedulePreview(); return;
      }
      if (t.id === 'fWaText') { const c = $('#waCount', el); if (c) c.textContent = t.value.length + ' caracteres'; schedulePreview(); return; }
      if (t.id === 'fSubject' || t.id === 'fPreheader') { schedulePreview(); return; }
    };
    el.onchange = e => {
      const t = e.target;
      if (t.id === 'fSegType') { state.segment = { type: t.value, value: null }; $('#segExtraWrap', el).innerHTML = segExtraHtml(state.segment); $('#countOut', el).textContent = ''; }
    };
    el.onclick = e => {
      const add = e.target.closest('[data-addblock]'); if (add) { state.blocks.push(BLOCK_DEFS[add.dataset.addblock].def()); redrawBlocks(); schedulePreview(); return; }
      const up = e.target.closest('[data-bup]'); if (up) { const i = Number(up.dataset.bup); if (i > 0) { const b = state.blocks; [b[i - 1], b[i]] = [b[i], b[i - 1]]; redrawBlocks(); schedulePreview(); } return; }
      const down = e.target.closest('[data-bdown]'); if (down) { const i = Number(down.dataset.bdown); const b = state.blocks; if (i < b.length - 1) { [b[i + 1], b[i]] = [b[i], b[i + 1]]; redrawBlocks(); schedulePreview(); } return; }
      const rm = e.target.closest('[data-brm]'); if (rm) { state.blocks.splice(Number(rm.dataset.brm), 1); redrawBlocks(); schedulePreview(); return; }
      const tpl = e.target.closest('[data-tpl]'); if (tpl) { applyTemplate(tpl.dataset.tpl); return; }
      if (e.target.closest('#backList')) { A.go('campaigns'); return; }
      if (e.target.closest('#btnCount')) { doCount(); return; }
      if (e.target.closest('#btnDraft')) { saveDraft(true); return; }
      if (e.target.closest('#btnTest')) { doTest(); return; }
      if (e.target.closest('#btnSchedule')) { doSchedule(); return; }
      if (e.target.closest('#btnSend')) { doSend(); return; }
    };

    draw();
    schedulePreview();
  }

  async function renderCampaigns(el, params) {
    ensureStyles();
    const id = params[0];
    if (!id) return renderCampaignsList(el);
    return renderCampaignsEditor(el, id);
  }

  /* ============================================================ WHATSAPP (bandeja) ============================================================ */

  function buildConvs(rows) {
    const map = new Map();
    rows.forEach(m => { if (!m.to_addr) return; if (!map.has(m.to_addr)) map.set(m.to_addr, []); map.get(m.to_addr).push(m); });
    const convs = [...map.entries()].map(([to, msgs]) => {
      msgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      const last = msgs[msgs.length - 1];
      let name = null; for (let i = msgs.length - 1; i >= 0; i--) { if (msgs[i].meta && msgs[i].meta.name) { name = msgs[i].meta.name; break; } }
      let pending = 0; for (let i = msgs.length - 1; i >= 0; i--) { if (msgs[i].direction === 'in') pending++; else break; }
      return { to, msgs, last, name, pending };
    });
    convs.sort((a, b) => new Date(b.last.created_at) - new Date(a.last.created_at));
    return convs;
  }

  async function renderWhatsapp(el) {
    ensureStyles();
    let integr = null, rows = [];
    try {
      const [i, m] = await Promise.all([A.api('integrations').catch(() => null), A.r('messages', 'select=*&channel=eq.whatsapp&order=created_at.desc&limit=500')]);
      integr = i; rows = m.rows || [];
    } catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }

    let convs = buildConvs(rows);
    let activeTo = (convs[0] && window.innerWidth > 820) ? convs[0].to : null;   // en el móvil se entra por la lista, no por una conversación
    let skipNotice = null; // {to, link} · persiste tras recargar la conversación

    function headerHtml() {
      const wa = (integr && integr.whatsapp) || {};
      const ok = !!wa.configured;
      return `<div class="row row--sb mb" style="flex-wrap:wrap">
        <div class="row"><span class="dot ${ok ? 'dot--ok' : 'dot--bad'}"></span><b>${ok ? 'WhatsApp conectado' : 'WhatsApp no conectado'}</b>${wa.display_phone_number ? `<span class="muted xs">· ${esc(wa.display_phone_number)}</span>` : ''}${!ok ? `<a class="btn btn--s btn--g" href="#/integrations">Configurar</a>` : ''}</div>
        <button class="btn btn--s btn--p" id="btnNewMsg">＋ Nuevo mensaje</button>
      </div>`;
    }
    function listHtml() {
      if (!convs.length) return `<p class="muted xs" style="padding:12px">Todavía no hay conversaciones.</p>`;
      return `<div class="wa-list">${convs.map(c => `<button type="button" class="wa-conv ${c.to === activeTo ? 'on' : ''}" data-to="${esc(c.to)}">
        <div class="av">${esc((c.name || c.to || '?').trim().charAt(0).toUpperCase())}</div>
        <div class="wa-conv__b"><b>${esc(c.name || c.to)}</b><span>${esc((c.last.body || '').slice(0, 60) || '—')}</span></div>
        <div class="wa-conv__meta"><div class="muted xs">${A.rel(c.last.created_at)}</div>${c.pending ? `<span class="wa-badge">${c.pending}</span>` : ''}</div>
      </button>`).join('')}</div>`;
    }
    function chatHtml() {
      const c = convs.find(x => x.to === activeTo);
      if (!c) return `<div class="card"><p class="muted">Elige una conversación de la izquierda.</p></div>`;
      return `
        <div class="wa-chat-h"><button class="btn btn--s btn--g wa-back" id="btnBack">←</button><b>${esc(c.name || c.to)}</b><span class="muted xs">${esc(c.to)}</span></div>
        <div class="chat" id="chatBody">${c.msgs.map(m => `<div class="msg ${m.direction === 'out' ? 'out' : ''}">${esc(m.body || '')}<small>${A.date(m.created_at)}${m.status === 'skipped' ? ' · sin enviar' : ''}${m.status === 'failed' || m.status === 'error' ? ' · fallo' : ''}</small></div>`).join('')}</div>
        <div id="skipBanner">${skipNotice && skipNotice.to === c.to ? `<p class="err xs">WhatsApp Cloud API no está conectada todavía. <a href="${esc(skipNotice.link)}" target="_blank" rel="noopener">Abrir en WhatsApp</a> · <a href="#/integrations">Configurar</a></p>` : ''}</div>
        <div class="wa-reply"><textarea id="replyText" placeholder="Escribe una respuesta…"></textarea><button class="btn btn--p" id="btnReply">Enviar</button></div>
      `;
    }
    function draw() {
      el.innerHTML = `${headerHtml()}<div class="wa-shell ${activeTo ? 'show-chat' : ''}"><div class="wa-list-pane">${listHtml()}</div><div class="wa-chat-pane">${chatHtml()}</div></div>`;
      const cb = $('#chatBody', el); if (cb) cb.scrollTop = cb.scrollHeight;
      wire();
    }
    function wire() {
      const nb = $('#btnNewMsg', el); if (nb) nb.onclick = onNewMsg;
      $$('.wa-conv', el).forEach(b => b.onclick = () => { activeTo = b.dataset.to; skipNotice = null; draw(); });
      const back = $('#btnBack', el); if (back) back.onclick = () => { activeTo = null; draw(); };
      const rt = $('#btnReply', el); if (rt) rt.onclick = onReply;
      const ta = $('#replyText', el); if (ta) ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onReply(); } });
    }
    async function reload() {
      try { const r = await A.r('messages', 'select=*&channel=eq.whatsapp&order=created_at.desc&limit=500'); rows = r.rows || []; } catch (e) { return; }
      convs = buildConvs(rows);
      if (!convs.find(c => c.to === activeTo)) activeTo = convs[0] ? convs[0].to : null;
      draw();
    }
    async function onNewMsg() {
      const v = await A.prompt('Nuevo mensaje de WhatsApp', [{ k: 'to', label: 'Teléfono', type: 'tel', required: true, placeholder: '+34…' }, { k: 'text', label: 'Mensaje', type: 'textarea', required: true }], {});
      if (!v) return;
      try {
        const r = await A.act('whatsapp.send', { to: v.to, text: v.text });
        if (r.skipped && r.link) skipNotice = { to: v.to, link: r.link }; else { skipNotice = null; A.toast('Enviado', 'ok'); }
        activeTo = v.to; await reload();
      } catch (e) { A.toast(e.message, 'bad'); }
    }
    async function onReply() {
      const ta = $('#replyText', el); const text = (ta.value || '').trim(); if (!text || !activeTo) return;
      const btn = $('#btnReply', el); btn.disabled = true;
      try {
        const r = await A.act('whatsapp.send', { to: activeTo, text });
        if (r.skipped && r.link) skipNotice = { to: activeTo, link: r.link };
        else { skipNotice = null; A.toast('Enviado', 'ok'); }
        ta.value = ''; await reload();
      } catch (e) { A.toast(e.message, 'bad'); }
      if (btn) btn.disabled = false;
    }

    draw();
  }

  /* ============================================================ AUTOMATIZACIONES ============================================================ */

  const AUTOMATIONS_DEF = [
    { key: 'welcome_email', title: 'Email de bienvenida con el código', desc: 'Se envía automáticamente cuando alguien deja su email por primera vez (popup, checkout…) junto con su código de descuento.', fields: [] },
    { key: 'welcome_whatsapp', title: 'WhatsApp de bienvenida', desc: 'Mensaje de WhatsApp cuando alguien da su consentimiento de WhatsApp.', fields: [{ k: 'text', label: 'Mensaje', type: 'textarea', help: 'Variables: {nombre} {code}' }] },
    { key: 'order_whatsapp', title: 'WhatsApp de pedido confirmado', desc: 'Se envía por WhatsApp en cuanto se confirma un pedido.', fields: [{ k: 'text', label: 'Mensaje', type: 'textarea', help: 'Variables: {nombre} {order} {total}' }] },
    { key: 'abandoned_cart', title: 'Carrito abandonado', desc: 'Recuerda por email (y opcionalmente WhatsApp) los carritos que se quedan sin terminar.', fields: [
      { k: 'delay_h', label: 'Esperar (horas)', type: 'number', default: 3 },
      { k: 'code', label: 'Código de descuento', type: 'text', default: 'VUELVE10' },
      { k: 'pct', label: 'Descuento (%)', type: 'number', default: 10 },
      { k: 'whatsapp', label: 'También por WhatsApp', type: 'toggle' },
      { k: 'wa_text', label: 'Texto de WhatsApp', type: 'textarea', help: 'Variables: {code} {pct} {url}' }
    ] },
    { key: 'post_purchase_guide', title: 'Guía de uso tras la compra', desc: 'Envía la guía de uso unas horas después de cada compra.', fields: [{ k: 'delay_h', label: 'Esperar (horas)', type: 'number', default: 20 }] },
    { key: 'winback', title: 'Recuperar clientes', desc: 'Escribe a clientes que llevan tiempo sin comprar, con un código para volver.', fields: [
      { k: 'days', label: 'Inactivos hace más de (días)', type: 'number', default: 45 },
      { k: 'code', label: 'Código de descuento', type: 'text', default: 'VUELVE15' },
      { k: 'pct', label: 'Descuento (%)', type: 'number', default: 15 },
      { k: 'whatsapp', label: 'También por WhatsApp', type: 'toggle' },
      { k: 'wa_text', label: 'Texto de WhatsApp', type: 'textarea', help: 'Variables: {code} {pct} {url}' }
    ] },
    { key: 'renewal_reminder', title: 'Aviso antes de renovar el plan', desc: 'Avisa a las suscripciones antes de que se les cobre la siguiente caja.', fields: [{ k: 'days_before', label: 'Avisar con (días de antelación)', type: 'number', default: 3 }] },
    { key: 'wa_autoreply', title: 'Respuesta automática en WhatsApp', desc: 'Responde sola a los mensajes entrantes de WhatsApp.', fields: [{ k: 'text', label: 'Respuesta automática', type: 'textarea' }] }
  ];

  function cronCardHtml(cronRow) {
    const v = cronRow && cronRow.value;
    const body = v ? `<div class="grid grid--kpi">
        ${A.kpi('Última vez', v.t ? A.rel(v.t) : '—')}
        ${A.kpi('Carritos', v.abandoned ?? 0)}
        ${A.kpi('Guías', v.guide ?? 0)}
        ${A.kpi('Recuperación', v.winback ?? 0)}
        ${A.kpi('Renovaciones', v.renewal ?? 0)}
        ${A.kpi('Campañas', v.campaigns ?? 0)}
      </div>${(v.errors && v.errors.length) ? `<p class="err xs mt">${v.errors.length} error(es): ${esc(v.errors.slice(0, 3).join(' · '))}${v.errors.length > 3 ? '…' : ''}</p>` : ''}`
      : `<p class="muted">Todavía no se ha ejecutado.</p>`;
    return A.card('Última ejecución', body + `<p class="muted xs mt">Se ejecuta sola cada hora.</p>`, `<button class="btn btn--s btn--g" id="btnCronRun">Ejecutar ahora</button>`);
  }
  function autoCardHtml(def, row) {
    const cfg = row.config || {};
    const values = {}; def.fields.forEach(f => { let v = cfg[f.k]; if (v == null) v = f.default; values[f.k] = v; });
    const toggle = `<label class="tog"><input type="checkbox" data-enable ${row.enabled ? 'checked' : ''}></label>`;
    const body = `<p class="muted xs mb">${esc(def.desc)}</p>` + (def.fields.length ? `<form>${A.form(def.fields, values)}<button class="btn btn--s btn--g" type="submit">Guardar</button></form>` : '');
    return `<div data-auto="${def.key}">${A.card(def.title, body, toggle)}</div>`;
  }

  async function renderAutomations(el) {
    ensureStyles();
    let rows = [], cronRow = null;
    try { const r = await A.r('automations', 'select=*'); rows = r.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    try { const s = await A.r('settings', 'key=eq.cron_last'); cronRow = (s.rows || [])[0] || null; } catch (e) { }
    const byKey = Object.fromEntries(rows.map(r => [r.key, r]));

    function draw() {
      el.innerHTML = `${cronCardHtml(cronRow)}<div class="grid grid--2 mt">${AUTOMATIONS_DEF.map(def => autoCardHtml(def, byKey[def.key] || { enabled: false, config: {} })).join('')}</div>`;
      const runBtn = $('#btnCronRun', el);
      if (runBtn) runBtn.onclick = async () => {
        runBtn.disabled = true; const prev = runBtn.textContent; runBtn.textContent = 'Ejecutando…';
        try {
          const r = await A.act('cron.run');
          A.toast(`Hecho: ${r.abandoned ?? 0} carritos, ${r.guide ?? 0} guías, ${r.winback ?? 0} recuperación, ${r.renewal ?? 0} renovaciones, ${r.campaigns ?? 0} campañas${r.errors && r.errors.length ? ` · ${r.errors.length} errores` : ''}`, r.errors && r.errors.length ? 'bad' : 'ok');
        } catch (e) { A.toast(e.message, 'bad'); }
        try { const s = await A.r('settings', 'key=eq.cron_last'); cronRow = (s.rows || [])[0] || null; } catch (e) { }
        draw();
        runBtn && (runBtn.disabled = false);
      };
      AUTOMATIONS_DEF.forEach(def => {
        const card = $(`[data-auto="${def.key}"]`, el); if (!card) return;
        const tgl = $('input[data-enable]', card);
        tgl.onchange = async () => {
          const form = $('form', card);
          const cfg = form ? A.read(form) : ((byKey[def.key] && byKey[def.key].config) || {});
          try { await A.act('automation.save', { key: def.key, enabled: tgl.checked, config: cfg }); byKey[def.key] = { ...(byKey[def.key] || {}), key: def.key, enabled: tgl.checked, config: cfg }; A.toast(tgl.checked ? 'Automatización activada' : 'Automatización desactivada', 'ok'); }
          catch (e) { A.toast(e.message, 'bad'); tgl.checked = !tgl.checked; }
        };
        const form = $('form', card);
        if (form) form.onsubmit = async e => {
          e.preventDefault();
          try { const cfg = A.read(form); await A.act('automation.save', { key: def.key, enabled: tgl.checked, config: cfg }); byKey[def.key] = { ...(byKey[def.key] || {}), key: def.key, enabled: tgl.checked, config: cfg }; A.toast('Guardado', 'ok'); }
          catch (err) { A.toast(err.message, 'bad'); }
        };
      });
    }
    draw();
  }

  /* ============================================================ MENSAJES ENVIADOS ============================================================ */

  const MSG_STATUSES = ['sent', 'error', 'skipped', 'received', 'delivered', 'read', 'failed'];

  function openMessageModal(r) {
    const body = `
      <div class="row mb">${r.channel === 'whatsapp' ? '<span class="pill">💬 WhatsApp</span>' : '<span class="pill">✉ Email</span>'}${A.badge(r.status)}<span class="muted xs">${A.date(r.created_at)}</span></div>
      <p class="sm"><b>${r.direction === 'in' ? 'De' : 'Para'}:</b> ${esc(r.to_addr || '—')}</p>
      ${r.subject ? `<p class="sm"><b>Asunto:</b> ${esc(r.subject)}</p>` : ''}
      ${r.template ? `<p class="sm"><b>Plantilla:</b> ${esc(r.template)}</p>` : ''}
      ${r.status === 'skipped' && r.meta && r.meta.reason ? `<p class="err sm"><b>No se envió:</b> ${esc(r.meta.reason)}</p>` : ''}
      <div class="fld"><label>Cuerpo</label><pre class="mono">${esc(r.body || '(vacío)')}</pre></div>
      ${r.meta && Object.keys(r.meta).length ? `<div class="fld"><label>Datos adicionales</label><pre class="mono">${esc(JSON.stringify(r.meta, null, 2))}</pre></div>` : ''}
    `;
    A.modal({ title: 'Mensaje', body, wide: true });
  }

  async function renderMessages(el) {
    ensureStyles();
    let rows = [];
    try { const r = await A.r('messages', 'select=*&order=created_at.desc&limit=300'); rows = r.rows || []; }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    el.innerHTML = `
      <div class="row mb" style="flex-wrap:wrap">
        <select id="fCh"><option value="">Todos los canales</option><option value="email">Email</option><option value="whatsapp">WhatsApp</option></select>
        <select id="fSt"><option value="">Todos los estados</option>${MSG_STATUSES.map(s => `<option value="${s}">${esc(A.statusName(s) || s)}</option>`).join('')}</select>
        <span class="muted xs" id="cntOut"></span>
      </div>
      <div id="tblWrap"></div>
    `;
    function draw() {
      const ch = $('#fCh', el).value, st = $('#fSt', el).value;
      const filtered = rows.filter(r => (!ch || r.channel === ch) && (!st || r.status === st));
      $('#cntOut', el).textContent = filtered.length + ' mensaje' + (filtered.length === 1 ? '' : 's');
      $('#tblWrap', el).innerHTML = A.table({
        cols: [
          { k: 'created_at', label: 'Fecha', render: r => A.date(r.created_at), w: '110px' },
          { k: 'channel', label: 'Canal', render: r => r.channel === 'whatsapp' ? '💬 WhatsApp' : '✉ Email', w: '110px' },
          { k: 'direction', label: 'Dirección', render: r => r.direction === 'in' ? 'Entrante' : 'Saliente', w: '90px' },
          { k: 'to_addr', label: 'Destinatario', title: true, render: r => esc(r.to_addr || '—') },
          { k: 'template', label: 'Plantilla / asunto', render: r => esc(r.template || r.subject || '—') },
          { k: 'status', label: 'Estado', render: r => A.badge(r.status), w: '110px' }
        ], rows: filtered, empty: 'No hay mensajes todavía.', rowAttr: r => `data-id="${r.id}"`
      });
    }
    draw();
    $('#fCh', el).onchange = draw; $('#fSt', el).onchange = draw;
    el.onclick = e => {
      const tr = e.target.closest('tr[data-id]'); if (!tr) return;
      const row = rows.find(r => String(r.id) === tr.dataset.id); if (row) openMessageModal(row);
    };
  }

  /* ---------- registro de módulos ---------- */
  A.mod('campaigns', { title: 'Newsletter', icon: '✉', group: 'Marketing', render: (el, params) => renderCampaigns(el, params) });
  A.mod('whatsapp', { title: 'WhatsApp', icon: '💬', group: 'Marketing', render: el => renderWhatsapp(el) });
  A.mod('automations', { title: 'Automatizaciones', icon: '⚡', group: 'Marketing', render: el => renderAutomations(el) });
  A.mod('messages', { title: 'Mensajes enviados', icon: '☰', group: 'Marketing', render: el => renderMessages(el) });
})();
