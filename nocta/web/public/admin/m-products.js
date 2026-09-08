/* NOCTA CRM · módulo Tienda: productos, ofertas/códigos, textos y contenido de la web */
(function () {
  const { $, $$, esc } = A;
  const STORE = 'https://nocta-store.netlify.app';

  /* ---------- catálogo base (products.js), sin overrides, para comparar y para "restablecer" ---------- */
  let basePromise = null;
  function baseCatalog() {
    if (!basePromise) basePromise = fetch('/assets/js/products.js').then(r => r.text()).then(src => {
      try { return new Function('window', src + ';return window.NOCTA_PRODUCTS')({}) || []; } catch (e) { return []; }
    }).catch(() => []);
    return basePromise;
  }
  function baseProduct(list, slug) { return (list || []).find(p => p.slug === slug) || null; }
  // el catálogo público (A.products()) quita del array los productos ocultos (active:false),
  // así que para listar/editar TODOS los productos combinamos products.js + la tabla `products` nosotros mismos.
  function mergeCatalog(base, rows) {
    const ov = Object.fromEntries((rows || []).map(r => [r.slug, r]));
    const products = (base || []).map(b => {
      const o = ov[b.slug];
      if (!o) return { ...b, active: true, stock: null, _override: null };
      return { ...b, ...(o.overrides || {}), active: o.active !== false, stock: o.stock == null ? null : Number(o.stock), _override: o };
    });
    (rows || []).filter(r => !(base || []).some(b => b.slug === r.slug) && r.overrides && r.overrides.name && r.overrides.price != null).forEach(r => {
      products.push({ slug: r.slug, gallery: [], tags: [], bullets: [], claims: [], how: [], faq: [], ...r.overrides, active: r.active !== false, stock: r.stock == null ? null : Number(r.stock), _override: r });
    });
    return products;
  }
  const webp = src => (src || '').replace(/\.(jpg|png)$/i, '.webp');
  const CATS = [
    ['', 'Todos'], ['parches', 'Parches'], ['skincare', 'Skincare'], ['bundle', 'Packs'], ['plan', 'Planes']
  ];
  const catOf = p => (p.plan ? 'plan' : (p.tags || []).includes('bundle') ? 'bundle' : (p.tags || []).includes('skincare') ? 'skincare' : 'parches');

  /* ============================================================ PRODUCTOS ============================================================ */
  A.mod('products', {
    title: 'Productos', icon: '◫', group: 'Tienda',
    render: async (el, params) => {
      if (params[0]) return renderEditor(el, decodeURIComponent(params[0]));
      renderList(el);
    }
  });

  async function renderList(el) {
    el.innerHTML = `<div class="row row--sb mb"><div class="row">${CATS.map(([k, l], i) => `<button class="btn btn--s ${i === 0 ? 'btn--p' : 'btn--g'}" data-cat="${k}">${esc(l)}</button>`).join('')}</div><button class="btn btn--p" id="new">+ Nuevo producto</button></div><div id="search"></div>`;
    $$('button[data-cat]', el).forEach(b => b.onclick = () => { $$('button[data-cat]', el).forEach(x => x.className = 'btn btn--s btn--g'); b.className = 'btn btn--s btn--p'; draw(b.dataset.cat); } );
    $('#new', el).onclick = () => newProductModal();
    let all = [];
    let draw = () => {};
    try {
      const [base, ov] = await Promise.all([baseCatalog(), A.r('products', 'select=*')]);
      all = mergeCatalog(base, ov.rows || []);
    } catch (e) { A.toast(e.message, 'bad'); }
    const box = $('#search', el);
    draw = cat => {
      const rows = cat ? all.filter(p => catOf(p) === cat) : all;
      A.search(box, rows, ['slug', 'name', 'short'], q => `<div class="grid grid--3">${q.map(cardHtml).join('') || '<p class="muted">Sin productos.</p>'}</div>`);
    };
    function cardHtml(p) {
      const hidden = p.active === false;
      const modified = p._override && p._override.overrides && Object.keys(p._override.overrides).length;
      return `<div class="card click" data-slug="${esc(p.slug)}" style="cursor:pointer;padding:0;overflow:hidden">
        <div style="aspect-ratio:1/1;background:#F3EFE6;position:relative">
          <img src="${esc(webp(p.image))}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.opacity=0">
          <div style="position:absolute;top:8px;left:8px;display:flex;gap:6px;flex-wrap:wrap">
            ${p.badge ? `<span class="bdg bdg--info">${esc(p.badge)}</span>` : ''}
            ${hidden ? `<span class="bdg bdg--bad">Oculto</span>` : ''}
            ${modified ? `<span class="bdg bdg--warn">Modificado</span>` : ''}
          </div>
        </div>
        <div style="padding:12px">
          <b style="display:block;font-size:13.5px">${esc(p.name)}</b>
          <div class="row" style="gap:8px;margin-top:4px">
            <span class="b num">${A.money(p.price)}</span>
            ${p.compare ? `<span class="muted num xs" style="text-decoration:line-through">${A.money(p.compare)}</span>` : ''}
          </div>
          <div class="xs muted mt" style="margin-top:6px">${p.sub ? 'Susc. ' + A.money(p.sub) + (p.plan ? ' ' + esc(p.plan.every) : '/mes') + ' · ' : ''}Stock: ${p.stock == null ? '—' : p.stock}</div>
        </div>
      </div>`;
    }
    box.addEventListener('click', e => { const c = e.target.closest('[data-slug]'); if (c) A.go('products/' + encodeURIComponent(c.dataset.slug)); });
    draw('');
  }

  function newProductModal() {
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'slug', label: 'Slug (identificador único, ej. mi-producto)', required: true },
      { k: 'name', label: 'Nombre', required: true },
      { k: 'short', label: 'Frase corta' },
      { k: 'price', label: 'Precio (€)', type: 'number', step: '0.01', required: true },
      { k: 'units', label: 'Contenido (ej. 8 parches)' },
      { k: 'image', label: 'Imagen', help: 'Ruta ya subida a /assets/img/, ej. /assets/img/mi-foto.jpg. Sube la foto por FTP/Netlify antes de guardar.' }
    ]);
    f.onsubmit = e => e.preventDefault();
    A.modal({
      title: 'Nuevo producto', body: f,
      actions: [{ label: 'Cancelar' }, { label: 'Crear', primary: true, onClick: async () => {
        if (!f.reportValidity()) return false;
        const v = A.read(f);
        v.slug = String(v.slug || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
        if (!v.slug) throw new Error('Falta el slug');
        const overrides = { name: v.name, short: v.short || '', price: Number(v.price) || 0, units: v.units || '', image: v.image || '', gallery: v.image ? [v.image] : [], tags: [], bullets: [], claims: [], how: [], faq: [] };
        await A.act('product.save', { slug: v.slug, overrides, active: true, stock: null });
        A.toast('Producto creado');
        A.go('products/' + encodeURIComponent(v.slug));
      } }]
    });
  }

  /* ---------- editor de producto ---------- */
  function toLines(a) { return (a || []).join('\n'); }
  function fromLines(s) { return String(s || '').split('\n').map(x => x.trim()).filter(Boolean); }
  function toPairs(a) { return (a || []).map(x => (x[0] || '') + ' | ' + (x[1] || '')).join('\n'); }
  function fromPairs(s) { return String(s || '').split('\n').map(x => x.trim()).filter(Boolean).map(l => { const i = l.indexOf('|'); return i === -1 ? [l.trim(), ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }); }
  function eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  async function renderEditor(el, slug) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let base, cur, dbRow;
    try {
      const [list, prodRow] = await Promise.all([baseCatalog(), A.r('products', 'select=*&slug=eq.' + encodeURIComponent(slug))]);
      base = baseProduct(list, slug) || {};
      dbRow = (prodRow.rows || [])[0] || null;
      cur = { ...base, ...(dbRow && dbRow.overrides || {}) };
      cur.active = dbRow ? dbRow.active !== false : true;
      cur.stock = dbRow && dbRow.stock != null ? Number(dbRow.stock) : null;
      if (!base.slug && !dbRow) { el.innerHTML = `<div class="card"><p class="err">Producto no encontrado.</p><button class="btn btn--g mt" id="back0">← Productos</button></div>`; $('#back0', el).onclick = () => A.go('products'); return; }
      draw(el, slug, base, cur, dbRow);
    } catch (e) {
      el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`;
    }
  }

  function origNote(base, key, curVal) {
    if (!(key in base)) return '';
    const b = base[key];
    if (eq(b, curVal)) return '';
    let txt;
    if (Array.isArray(b)) txt = b.length ? (typeof b[0] === 'string' ? b.join(' · ') : b.map(x => Array.isArray(x) ? x.join(': ') : x).join(' · ')) : '(vacío)';
    else if (typeof b === 'object' && b) txt = JSON.stringify(b);
    else txt = String(b == null ? '(vacío)' : b);
    if (txt.length > 140) txt = txt.slice(0, 140) + '…';
    return `<div class="xs muted">original: ${esc(txt)}</div>`;
  }

  function draw(el, slug, base, cur, dbRow) {
    const isNewProduct = !(base && base.slug);
    el.innerHTML = `
      <div class="row row--sb mb">
        <button class="btn btn--g" id="back">← Productos</button>
        <div class="row">
          <a class="btn btn--g" href="/producto.html?p=${encodeURIComponent(slug)}" target="_blank" rel="noopener">Ver en la tienda ↗</a>
          ${!isNewProduct ? `<button class="btn btn--d" id="reset">Restablecer todo</button>` : ''}
        </div>
      </div>
      <div class="split">
        <div>
          <form id="pf">
            ${A.card('Datos del producto', `
              <div class="fld--row">
                <div>${A.form([{ k: 'name', label: 'Nombre', required: true }], cur)}${origNote(base, 'name', cur.name)}</div>
                <div>${A.form([{ k: 'short', label: 'Frase corta' }], cur)}${origNote(base, 'short', cur.short)}</div>
              </div>
              <div class="fld--row">
                <div>${A.form([{ k: 'price', label: 'Precio (€)', type: 'number', step: '0.01', required: true }], cur)}${origNote(base, 'price', cur.price)}</div>
                <div>${A.form([{ k: 'compare', label: 'Precio tachado (€, opcional)', type: 'number', step: '0.01' }], cur)}${origNote(base, 'compare', cur.compare)}</div>
              </div>
              <div class="fld--row">
                <div>${A.form([{ k: 'sub', label: 'Precio suscripción (€, opcional)', type: 'number', step: '0.01' }], cur)}${origNote(base, 'sub', cur.sub)}</div>
                <div>${A.form([{ k: 'units', label: 'Contenido (ej. 8 parches)' }], cur)}${origNote(base, 'units', cur.units)}</div>
              </div>
              <div class="fld--row">
                <div>${A.form([{ k: 'badge', label: 'Distintivo (ej. NUEVO, BESTSELLER)' }], cur)}${origNote(base, 'badge', cur.badge)}</div>
                <div>${A.form([{ k: 'gift', label: 'Regalo incluido (texto, opcional)' }], cur)}${origNote(base, 'gift', cur.gift)}</div>
              </div>
              ${A.form([{ k: 'desc', label: 'Descripción', type: 'textarea' }], cur)}${origNote(base, 'desc', cur.desc)}
              ${A.form([{ k: 'bullets', label: 'Ventajas (una por línea)', type: 'textarea', placeholder: 'Una ventaja por línea' }], { bullets: toLines(cur.bullets) })}${origNote(base, 'bullets', cur.bullets)}
              ${A.form([{ k: 'claims', label: 'Datos destacados (3 pares "cifra | texto", una por línea)', type: 'textarea', placeholder: '9 de 10 | vieron los poros más limpios' }], { claims: toPairs(cur.claims) })}${origNote(base, 'claims', cur.claims)}
              ${A.form([{ k: 'how', label: 'Modo de uso (un paso por línea)', type: 'textarea' }], { how: toLines(cur.how) })}${origNote(base, 'how', cur.how)}
              ${A.form([{ k: 'ingredients', label: 'Ingredientes', type: 'textarea' }], cur)}${origNote(base, 'ingredients', cur.ingredients)}
              ${A.form([{ k: 'faq', label: 'Preguntas frecuentes (pares "pregunta | respuesta", una por línea)', type: 'textarea' }], { faq: toPairs(cur.faq) })}${origNote(base, 'faq', cur.faq)}
              <div class="fld--row">
                <div>${A.form([{ k: 'image', label: 'Imagen principal' }], cur)}${origNote(base, 'image', cur.image)}</div>
                <div>${A.form([{ k: 'video', label: 'Vídeo (opcional)' }], cur)}${origNote(base, 'video', cur.video)}</div>
              </div>
              ${A.form([{ k: 'gallery', label: 'Galería (una URL por línea)', type: 'textarea' }], { gallery: toLines(cur.gallery) })}${origNote(base, 'gallery', cur.gallery)}
              ${A.form([{ k: 'tags', label: 'Etiquetas (separadas por coma)' }], { tags: (cur.tags || []).join(', ') })}${origNote(base, 'tags', cur.tags)}
            `)}
            ${cur.plan ? A.card('Plan de suscripción', `
              <div class="fld--row">
                ${A.form([{ k: 'plan.label', label: 'Etiqueta (ej. "al mes")' }], { plan: cur.plan })}
                ${A.form([{ k: 'plan.every', label: 'Frecuencia (ej. "cada mes")' }], { plan: cur.plan })}
              </div>
              ${A.form([{ k: 'plan.per', label: 'Por (ej. "mes")' }], { plan: cur.plan })}
            `) : ''}
            ${A.card('Disponibilidad', `
              ${A.form([{ k: 'active', label: 'Visible en la tienda', type: 'toggle', default: true }], { active: cur.active !== false })}
              ${A.form([{ k: 'stock', label: 'Stock (vacío = sin control de stock)', type: 'number' }], { stock: dbRow ? dbRow.stock : null })}
            `)}
            <div class="row mt"><button class="btn btn--p btn--w" id="save" type="submit">Guardar cambios</button></div>
          </form>
        </div>
        <div>
          ${A.card('Vista previa', `<div id="prev"></div>`)}
        </div>
      </div>`;

    $('#back', el).onclick = () => A.go('products');
    const pf = $('#pf', el);
    const updatePreview = () => {
      let v; try { v = A.read(pf); } catch (e) { return; }
      const img = v.image || cur.image;
      $('#prev', el).innerHTML = `
        <div style="max-width:260px;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff">
          <div style="aspect-ratio:1/1;background:#F3EFE6"><img src="${esc(webp(img))}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.opacity=0"></div>
          <div style="padding:12px">
            <b style="display:block;font-size:13.5px">${esc(v.name || cur.name || '')}</b>
            <div class="xs muted">${esc(v.short || cur.short || '')}</div>
            <div class="row" style="margin-top:6px;gap:8px">
              <span class="b num">${A.money(v.price)}</span>
              ${v.compare ? `<span class="muted num xs" style="text-decoration:line-through">${A.money(v.compare)}</span>` : ''}
            </div>
          </div>
        </div>`;
    };
    pf.addEventListener('input', updatePreview); updatePreview();

    if (!isNewProduct) $('#reset', el).onclick = async () => {
      if (!await A.confirm('¿Restablecer este producto a los valores originales de la web? Se perderán todos los cambios guardados.', { label: 'Restablecer', danger: true })) return;
      try { await A.act('product.reset', { slug }); A.toast('Restablecido'); renderEditor(el, slug); } catch (e) { A.toast(e.message, 'bad'); }
    };

    pf.onsubmit = async e => {
      e.preventDefault();
      try {
        const v = A.read(pf);
        const merged = {
          name: v.name, short: v.short, price: Number(v.price) || 0, compare: v.compare === '' || v.compare == null ? null : Number(v.compare),
          sub: v.sub === '' || v.sub == null ? null : Number(v.sub), units: v.units, badge: v.badge || null, gift: v.gift || null,
          desc: v.desc, bullets: fromLines(v.bullets), claims: fromPairs(v.claims), how: fromLines(v.how), ingredients: v.ingredients,
          faq: fromPairs(v.faq), image: v.image, video: v.video || undefined, gallery: fromLines(v.gallery), tags: String(v.tags || '').split(',').map(s => s.trim()).filter(Boolean)
        };
        if (cur.plan) merged.plan = { ...cur.plan, ...(v.plan || {}) };
        const isEmpty = x => x == null || x === '' || (Array.isArray(x) && x.length === 0);
        const overrides = {};
        Object.keys(merged).forEach(k => { if (merged[k] === undefined) return; if (isEmpty(base[k]) && isEmpty(merged[k])) return; if (!eq(base[k], merged[k])) overrides[k] = merged[k]; });
        await A.act('product.save', { slug, overrides, active: !!v.active, stock: v.stock });
        A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok');
        renderEditor(el, slug);
      } catch (e) { A.toast(e.message, 'bad'); }
    };
  }

  /* ============================================================ OFERTAS Y CÓDIGOS ============================================================ */
  A.mod('offers', {
    title: 'Ofertas y códigos', icon: '%', group: 'Tienda',
    render: async (el) => {
      el.innerHTML = `
        <div class="row row--sb mb"><h2 style="font-size:15px">Códigos de descuento</h2><button class="btn btn--p" id="new-code">+ Nuevo código</button></div>
        <div id="codes-wrap"></div>
        <div class="grid grid--2 mt">
          <div id="gifts-card"></div>
          <div id="ship-card"></div>
        </div>`;
      $('#new-code', el).onclick = () => discountModal();
      await loadCodes(el);
      await loadContentCards(el);
    }
  });

  function discRow(d) {
    const val = d.type === 'fixed' ? A.money(d.value) : A.pct(d.value);
    const now = Date.now();
    const notStarted = d.starts_at && new Date(d.starts_at).getTime() > now;
    const ended = d.ends_at && new Date(d.ends_at).getTime() < now;
    return { ...d, _val: val, _notStarted: notStarted, _ended: ended };
  }

  async function loadCodes(el) {
    const wrap = $('#codes-wrap', el);
    wrap.innerHTML = '<div class="loading">Cargando…</div>';
    let rows = [];
    try { rows = (await A.r('discounts', 'select=*&order=created_at.desc')).rows || []; } catch (e) { wrap.innerHTML = `<p class="err">${esc(e.message)}</p>`; return; }
    wrap.innerHTML = A.card('', A.table({
      cols: [
        { k: 'code', label: 'Código', render: r => `<b class="mono">${esc(r.code)}</b>` },
        { k: 'v', label: 'Descuento', render: r => `−${discRow(r)._val}` },
        { k: 'min_total', label: 'Mínimo', render: r => r.min_total ? A.money(r.min_total) : '—' },
        { k: 'uses', label: 'Usos', render: r => `${r.uses || 0}${r.max_uses ? ' / ' + r.max_uses : ''}` },
        { k: 'vig', label: 'Vigencia', render: r => { const d = discRow(r); if (d._notStarted) return `<span class="bdg bdg--warn">Desde ${A.date(r.starts_at, false)}</span>`; if (d._ended) return `<span class="bdg bdg--bad">Caducó ${A.date(r.ends_at, false)}</span>`; return r.ends_at ? 'Hasta ' + A.date(r.ends_at, false) : '—'; } },
        { k: 'active', label: 'Activo', render: r => `<label class="tog"><input type="checkbox" data-active="${esc(r.code)}" ${r.active !== false ? 'checked' : ''}></label>` },
        { k: 'link', label: 'Enlace', render: r => `<button class="btn btn--s btn--g" data-copy="${esc(r.code)}">Copiar</button>` },
        { k: 'ac', label: '', cls: 'right', render: r => `<button class="btn btn--s btn--g" data-edit="${esc(r.code)}">Editar</button> <button class="btn btn--s btn--d" data-del="${esc(r.code)}">Borrar</button>` }
      ],
      rows, empty: 'Sin códigos todavía.'
    }));
    $$('[data-active]', wrap).forEach(cb => cb.onclick = async e => {
      e.stopPropagation(); const code = cb.dataset.active; const row = rows.find(r => r.code === code);
      try { await A.act('discount.save', { ...row, active: cb.checked }); A.toast('Actualizado'); row.active = cb.checked; } catch (er) { cb.checked = !cb.checked; A.toast(er.message, 'bad'); }
    });
    $$('[data-copy]', wrap).forEach(b => b.onclick = () => A.copy(STORE + '/?code=' + encodeURIComponent(b.dataset.copy)));
    $$('[data-edit]', wrap).forEach(b => b.onclick = () => discountModal(rows.find(r => r.code === b.dataset.edit)));
    $$('[data-del]', wrap).forEach(b => b.onclick = async () => {
      if (!await A.confirm('¿Borrar el código ' + b.dataset.del + '?', { label: 'Borrar', danger: true })) return;
      try { await A.rDel('discounts', 'code=eq.' + encodeURIComponent(b.dataset.del)); A.toast('Borrado'); loadCodes(el); } catch (e) { A.toast(e.message, 'bad'); }
    });
  }

  function discountModal(row) {
    const values = row || { type: 'pct', active: true };
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'code', label: 'Código', required: true, placeholder: 'HOLA10' },
      { k: 'type', label: 'Tipo', type: 'select', options: [['pct', 'Porcentaje %'], ['fixed', 'Importe fijo €']] },
      { k: 'value', label: 'Valor', type: 'number', step: '0.01', required: true },
      { k: 'min_total', label: 'Pedido mínimo (€)', type: 'number', step: '0.01' },
      { k: 'max_uses', label: 'Usos máximos (vacío = sin límite)', type: 'number' },
      { k: 'starts_at', label: 'Empieza', type: 'datetime' },
      { k: 'ends_at', label: 'Termina', type: 'datetime' },
      { k: 'active', label: 'Activo', type: 'toggle', default: true },
      { k: 'note', label: 'Nota interna', type: 'textarea' }
    ], values);
    f.onsubmit = e => e.preventDefault();
    A.modal({
      title: row ? 'Editar código' : 'Nuevo código', body: f, wide: false,
      actions: [{ label: 'Cancelar' }, { label: 'Guardar', primary: true, onClick: async () => {
        if (!f.reportValidity()) return false;
        const v = A.read(f);
        await A.act('discount.save', v);
        A.toast('Código guardado');
        A.render();
      } }]
    });
  }

  async function loadContentCards(el) {
    let rows = [];
    try { rows = (await A.r('content', 'select=*')).rows || []; } catch (e) { }
    const byKey = k => (rows.find(r => r.key === k) || {}).value || {};
    const gifts = Array.isArray(byKey('gifts')) ? byKey('gifts') : (window.NOCTA_GIFTS || []);
    const shipping = { base: 3.9, freeFrom: 30, ...(byKey('shipping') || {}) };

    const giftsCard = $('#gifts-card', el);
    giftsCard.innerHTML = A.card('Regalos por importe', `<div id="gifts-list"></div><button class="btn btn--g mt" id="gift-add" type="button">+ Añadir tramo</button><button class="btn btn--p btn--w mt" id="gifts-save" type="button">Guardar regalos</button>`);
    let giftRows = gifts.map(g => ({ ...g }));
    const drawGifts = () => {
      $('#gifts-list', giftsCard).innerHTML = giftRows.map((g, i) => `
        <div class="fld--row" data-gi="${i}" style="align-items:end">
          <div class="fld"><label>Importe mínimo (€)</label><input type="number" step="0.01" data-gf="threshold" value="${esc(g.threshold ?? '')}"></div>
          <div class="fld" style="position:relative"><label>Regalo</label><input type="text" data-gf="label" value="${esc(g.label ?? '')}"><button type="button" class="btn btn--s btn--d" data-gdel="${i}" style="position:absolute;right:0;top:-2px">✕</button></div>
        </div>`).join('') || '<p class="muted xs">Sin tramos.</p>';
      $$('[data-gdel]', giftsCard).forEach(b => b.onclick = () => { giftRows.splice(Number(b.dataset.gdel), 1); drawGifts(); });
    };
    drawGifts();
    $('#gift-add', giftsCard).onclick = () => { giftRows.push({ threshold: 0, label: '', slug: null }); drawGifts(); };
    $('#gifts-save', giftsCard).onclick = async () => {
      $$('[data-gi]', giftsCard).forEach((row, i) => { giftRows[i].threshold = Number($('[data-gf="threshold"]', row).value) || 0; giftRows[i].label = $('[data-gf="label"]', row).value; });
      try { await A.act('content.save', { key: 'gifts', value: giftRows.sort((a, b) => a.threshold - b.threshold) }); A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok'); } catch (e) { A.toast(e.message, 'bad'); }
    };

    const shipCard = $('#ship-card', el);
    const sf = document.createElement('form');
    sf.innerHTML = A.form([
      { k: 'base', label: 'Gastos de envío (€)', type: 'number', step: '0.01' },
      { k: 'freeFrom', label: 'Envío gratis desde (€)', type: 'number', step: '0.01' }
    ], shipping);
    shipCard.innerHTML = A.card('Envío', '');
    $('.card', shipCard).appendChild(sf);
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar envío';
    sf.appendChild(sb);
    sb.onclick = async () => {
      try { const v = A.read(sf); await A.act('content.save', { key: 'shipping', value: { base: Number(v.base) || 0, freeFrom: Number(v.freeFrom) || 0 } }); A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok'); } catch (e) { A.toast(e.message, 'bad'); }
    };
  }

  /* ============================================================ TEXTOS Y WEB ============================================================ */
  A.mod('content', {
    title: 'Textos y web', icon: '✎', group: 'Tienda',
    render: async (el) => {
      let all = [];
      try { all = (await A.r('content', 'select=*')).rows || []; } catch (e) { A.toast(e.message, 'bad'); }
      const byKey = k => { const r = all.find(x => x.key === k); return r ? r.value : null; };
      el.innerHTML = '';
      A.tabs(el, {
        'Barra superior': body => tabBar(body, byKey('bar')),
        'Popup de bienvenida': body => tabPopup(body, byKey('popup')),
        'Aviso': body => tabAnnounce(body, byKey('announce')),
        'WhatsApp público': body => tabWa(body, byKey('whatsapp_public')),
        'Avanzado': body => tabAdvanced(body, all)
      });
    }
  });

  async function saveContent(key, value, btn) {
    try { if (btn) btn.disabled = true; await A.act('content.save', { key, value }); A.toast('Guardado. La web lo muestra en menos de 1 minuto', 'ok'); }
    catch (e) { A.toast(e.message, 'bad'); }
    finally { if (btn) btn.disabled = false; }
  }

  function tabBar(body, val) {
    let items = (val && Array.isArray(val.items) ? val.items : ['Envío gratis desde 30 € o llevando 2', 'Enviamos desde España en 24-48 h', 'Garantía 60 días o te devolvemos el dinero']).slice();
    const draw = () => {
      body.innerHTML = A.card('Barra superior', `<p class="muted xs mb">Los textos que rotan arriba de toda la web.</p><div id="bar-items"></div><button class="btn btn--g mt" id="bar-add" type="button">+ Añadir texto</button><button class="btn btn--p btn--w mt" id="bar-save" type="button">Guardar</button>`);
      $('#bar-items', body).innerHTML = items.map((t, i) => `<div class="fld" style="position:relative"><input type="text" data-bi="${i}" value="${esc(t)}" style="padding-right:36px"><button type="button" class="btn btn--s btn--d" data-bdel="${i}" style="position:absolute;right:2px;top:2px">✕</button></div>`).join('') || '<p class="muted xs">Sin textos.</p>';
      $$('[data-bdel]', body).forEach(b => b.onclick = () => { items.splice(Number(b.dataset.bdel), 1); draw(); });
      $('#bar-add', body).onclick = () => { items.push(''); draw(); };
      $('#bar-save', body).onclick = async e => {
        $$('[data-bi]', body).forEach((inp, i) => items[i] = inp.value);
        await saveContent('bar', { items: items.filter(t => t.trim()) }, e.target);
      };
    };
    draw();
  }

  function tabPopup(body, val) {
    const v = { enabled: true, delay_s: 6, title: 'Tu primera caja con −10 %', text: 'Déjanos tu nombre, email y móvil y te enviamos el código al momento.', code: 'HOLA10', pct: 10, wa_text: 'Quiero recibir novedades y ofertas por email y WhatsApp', require_phone: true, ...(val || {}) };
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'enabled', label: 'Popup activo', type: 'toggle' },
      { k: 'delay_s', label: 'Segundos antes de aparecer', type: 'number' },
      { k: 'title', label: 'Título' },
      { k: 'text', label: 'Texto', type: 'textarea' },
      { k: 'code', label: 'Código de descuento que envía' },
      { k: 'pct', label: 'Porcentaje de descuento', type: 'number' },
      { k: 'wa_text', label: 'Texto de consentimiento WhatsApp' },
      { k: 'require_phone', label: 'Pedir teléfono obligatorio', type: 'toggle' }
    ], v);
    body.innerHTML = A.card('Popup de bienvenida', '');
    $('.card', body).appendChild(f);
    const prev = document.createElement('div'); prev.className = 'mt';
    const updatePrev = () => {
      let cv; try { cv = A.read(f); } catch (e) { cv = v; }
      prev.innerHTML = `<div class="muted xs mb">Vista previa</div><div style="max-width:340px;border:1px solid var(--line);border-radius:16px;padding:20px;background:#fff;box-shadow:var(--sh)">
        <b style="display:block;font-size:16px;margin-bottom:6px">${esc(cv.title || '')}</b>
        <div class="sm muted" style="margin-bottom:10px">${esc(cv.text || '')}</div>
        <div class="fld" style="margin-bottom:6px"><input placeholder="Nombre" disabled></div>
        <div class="fld" style="margin-bottom:6px"><input placeholder="Email" disabled></div>
        ${cv.require_phone ? `<div class="fld" style="margin-bottom:6px"><input placeholder="Teléfono" disabled></div>` : ''}
        <button class="btn btn--p btn--w" disabled>Quiero mi ${esc(String(cv.pct || 10))} % de descuento</button>
      </div>`;
    };
    f.addEventListener('input', updatePrev); updatePrev();
    body.appendChild(prev);
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar';
    body.appendChild(sb);
    sb.onclick = () => saveContent('popup', A.read(f), sb);
  }

  function tabAnnounce(body, val) {
    const v = { text: '', href: '', enabled: false, ...(val || {}) };
    const f = document.createElement('form');
    f.innerHTML = A.form([
      { k: 'enabled', label: 'Aviso activo', type: 'toggle' },
      { k: 'text', label: 'Texto del aviso' },
      { k: 'href', label: 'Enlace (opcional)' }
    ], v);
    body.innerHTML = A.card('Aviso', '');
    $('.card', body).appendChild(f);
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar';
    f.appendChild(sb);
    sb.onclick = () => saveContent('announce', A.read(f), sb);
  }

  function tabWa(body, val) {
    const v = { number: '', ...(val || {}) };
    const f = document.createElement('form');
    f.innerHTML = A.form([{ k: 'number', label: 'Número de WhatsApp público', help: 'Número que verá el cliente en la web (con prefijo, ej. +34600000000).' }], v);
    body.innerHTML = A.card('WhatsApp público', '');
    $('.card', body).appendChild(f);
    const sb = document.createElement('button'); sb.className = 'btn btn--p btn--w mt'; sb.type = 'button'; sb.textContent = 'Guardar';
    f.appendChild(sb);
    sb.onclick = () => saveContent('whatsapp_public', A.read(f), sb);
  }

  function tabAdvanced(body, all) {
    const KNOWN = ['bar', 'popup', 'shipping', 'gifts', 'whatsapp_public', 'announce', 'home'];
    const keys = [...new Set([...KNOWN, ...all.map(r => r.key)])];
    body.innerHTML = `<div class="row row--sb mb"><p class="muted xs">Edición directa en JSON de cualquier clave de contenido. Úsalo si sabes lo que haces.</p><button class="btn btn--g" id="purge">Refrescar caché de la web</button></div><div id="adv-list" class="list"></div>`;
    $('#purge', body).onclick = async e => { try { e.target.disabled = true; await A.act('purge'); A.toast('Caché refrescada'); } catch (er) { A.toast(er.message, 'bad'); } finally { e.target.disabled = false; } };
    const list = $('#adv-list', body);
    list.innerHTML = keys.map(k => {
      const row = all.find(r => r.key === k);
      return `<div class="item" style="align-items:flex-start;flex-direction:column;gap:8px" data-k="${esc(k)}">
        <b class="mono">${esc(k)}</b>
        <textarea class="mono" data-json rows="6" style="width:100%;min-height:100px">${esc(row ? JSON.stringify(row.value, null, 2) : '')}</textarea>
        <button type="button" class="btn btn--s btn--p" data-save="${esc(k)}">Guardar ${esc(k)}</button>
      </div>`;
    }).join('');
    $$('[data-save]', list).forEach(b => b.onclick = async () => {
      const wrap = list.querySelector(`[data-k="${CSS.escape(b.dataset.save)}"]`);
      const ta = $('textarea', wrap);
      let value;
      try { value = ta.value.trim() ? JSON.parse(ta.value) : null; } catch (e) { A.toast('JSON no válido', 'bad'); return; }
      await saveContent(b.dataset.save, value, b);
    });
  }
})();
