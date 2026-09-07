# NOCTA · COMPONENTS.md — contrato de implementación de páginas (v2, «Laboratorio Cálido»)

Raíz: `nocta/web/public/`. CSS: `/assets/css/styles.css`. JS: `/assets/js/products.js` (bloqueante) → `/assets/js/app.js` (`defer`). **No se tocan** estos tres ficheros ni `index.html`, `producto.html`, `admin/`. `DESIGN.md` (misma carpeta que este fichero) es la referencia larga; aquí está lo operativo.

## 1. Cabecera obligatoria de cada página (orden exacto)
```html
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>… · NOCTA</title>
<meta name="description" content="…">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/css/styles.css">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<meta name="theme-color" content="#FAF8F3">
<script src="/assets/js/products.js"></script><script src="/assets/js/app.js" defer></script>
</head>
<body>
<div id="site-header"></div>
<main class="n-wrap" id="main"> … </main>
<div id="site-footer"></div>
```
`layout()` (app.js) inyecta barra, cabecera sticky, menú móvil, carrito, pie, popup de email y banner de cookies. En `checkout.html` y `gracias.html` la cabecera se reduce sola (detecta la ruta) y el pie es corto.
Página tipo artículo: `<main class="n-wrap n-wrap--text" id="main"><article class="n-read">…</article></main>`.

## 2. Reglas duras
- Solo clases `n-*` de `styles.css`. Cero emojis, cero `style="color:#6b6b6b"`: usa `class="n-muted"`. Iconos: `nIco('check'|'x'|'chev'|'back'|'truck'|'shield'|'lock'|'plus'|'minus'|'bag'|'menu'|'moon', px)` desde JS, o el SVG en línea (`viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"`).
- Pesos Inter 400/500/600 solamente. Nada por debajo de 11 px. Números con `class="n-num"`. Comillas «…».
- Objetivos táctiles ≥ 44 px (botones, enlaces de navegación). Enlaces en línea dentro de párrafos están exentos.
- Cada vez que aparece un producto: `nBuyBlock(slug,{src:'…'})` (Comprar ahora → pago rápido/Apple Pay → Añadir al carrito → nota de envío). Excepción: dentro del carrito.
- Imágenes de producto SIEMPRE recortadas sobre el fondo: `<div class="n-cut"><img src="${nImg(p)}" width="…" height="…" alt="" loading="lazy"></div>` (nunca `p.image`). Fotos lifestyle: `.webp` con `width/height` reales (`lifestyle-noche` 1128×1400, `unboxing` 1128×1400, `como-se-pone` 1046×1400).
- Textos de producto, precios y claims salen de `products.js`; el copy legal y de ayuda se conserva tal cual (se reordena, no se reescribe).
- No renombrar ids ni cambiar endpoints, eventos `nTrack(...)`, claves de storage ni el formato de `src` en `/api/subscribe`.

## 3. Helpers globales (app.js)
`nBySlug(slug)`, `nEur(n)`, `nImg(p)`, `nWebp(src)`, `nCat(p)`, `nPerUse(p)`, `nKlarna(precio)`, `nStarsHtml(p)`, `nCard(p,{row:true})`, `nBuyBlock(slug,{qty,sub,src,compact,label,id})`, `nPay(slug,{src,cart:true})`, `nNote(p,qty,sub)`, `nTrust()`, `nIco(nombre,px)`, `nToast(msg)`, `nTrack(ev,data)`, `nCart` (`get/add/remove/qty/totals/open/close/render`), `nSheet` (`open/close`), `nReveal()` (llamar tras pintar contenido dinámico con `.n-reveal`), `nMedia()` (tras insertar `<video data-auto>`).

## 4. Componentes (marcado mínimo)
- Cabecera de sección: `<div class="n-sech"><span class="n-lab">01 · Tema</span><h2>Título</h2><p class="n-lead">…</p></div>`
- Etiqueta/versalita: `<span class="n-lab">`, variantes `n-lab--navy`, `n-lab--alert`, `n-lab--ok`.
- Botones: `n-btn` (+ `n-btn--wide`, `n-btn--sm`, `n-btn--lg`, `n-btn--ghost`, `n-btn--inv` sobre navy). Enlace discreto: `n-link`.
- Confianza: `nTrust()`. Datos: `<div class="n-data"><div class="n-data__i"><b class="n-num">9 de 10</b><span>…</span></div>…</div>`.
- Ficha técnica: `<dl class="n-spec"><div><dt class="n-lab">Plazo</dt><dd>24-48 h</dd></div></dl>`.
- Pasos: `<ol class="n-steps"><li><span class="n-lab n-lab--navy">Paso 01</span><p><b>Título</b>Texto</p></li></ol>` (+ `n-steps--4` para 4 columnas en escritorio).
- Lista con icono: `<ul class="n-list"><li>${nIco('check',16)}<span>…</span></li><li class="no">${nIco('x',16)}<span>…</span></li></ul>`.
- Acordeón (cerrado por defecto): `<div class="n-acc"><details><summary>Pregunta</summary><div class="n-acc__c"><div class="n-acc__in"><p>Respuesta</p></div></div></details></div>`.
- Cita: `<figure class="n-quote"><p class="n-stars" role="img" aria-label="5 sobre 5">★★★★★</p><blockquote>«…»</blockquote><figcaption class="n-quote__who">Nombre <span class="n-lab n-lab--navy">Compra verificada</span></figcaption></figure>` dentro de `<div class="n-quotes">`.
- Tabla comparativa: `<table class="n-cmp"><caption class="n-vh">…</caption><thead><tr><th scope="col">…` con celdas `class="y"` / `class="n"`.
- CTA de producto (bandas del advertorial, cierre de artículos):
  ```js
  const cta=(p,src)=>`<div class="n-cta"><div class="n-cut"><img src="${nImg(p)}" width="96" height="96" alt="" loading="lazy"></div><div class="n-cta__t"><span class="n-lab">${nCat(p)}</span><b>${p.name}</b><p class="n-price" style="margin-top:4px"><b class="n-num">${nEur(p.price)}</b>${p.compare?`<s>${nEur(p.compare)}</s>`:''}</p></div>${nBuyBlock(p.slug,{src})}</div>`;
  ```
- Mini producto (complementos): `<div class="n-mini"><div class="n-cut"><img …></div><div class="n-mini__t"><span class="n-lab">…</span><b>Nombre</b><small>short</small></div><div class="n-mini__a"><button class="n-btn n-btn--sm" data-buy="slug" data-src="…">Comprar ahora</button>${nPay(slug,{src})}<button class="n-link" data-add="slug" data-src="…">Añadir</button></div></div>`
- Banda navy: `<div class="n-band"><span class="n-lab">…</span><h2>…</h2><a class="n-btn n-btn--inv" href="…">…</a></div>`.
- Formulario: `<form class="n-form" id="…"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required>…<div class="n-row">…</div><label class="n-check"><input type="checkbox" required> Acepto …</label><button class="n-btn n-btn--wide">…</button></form>`. Confirmación en línea: `<div class="n-ok-box" role="status">${nIco('check',18)}<div><b>Recibido</b><br>Te escribimos en menos de 24 h.</div></div>`.
- Métodos de pago: `<div class="n-methods"><label class="is-on"><input type="radio" name="pay" value="card" checked> Tarjeta · Visa, Mastercard, Apple Pay y Google Pay</label>…</div>` (toggle `.is-on` por JS).
- Chips: `<div class="n-chips" id="chips"><button class="n-chip is-on" data-f="todos" aria-pressed="true">Todos</button>…</div>` + `<p class="n-lab" aria-live="polite" id="count">13 productos</p>`.
- Quiz: cabecera `<div class="n-flow"><button class="n-icon" aria-label="Atrás">${nIco('back',22)}</button><span class="n-lab">Test de piel</span><a class="n-icon" href="/" aria-label="Salir">${nIco('x',22)}</a></div>`, `<div class="n-progress"><i style="width:25%"></i></div>`, respuestas `<div class="n-ans"><button data-v="…">Texto ${nIco('chev',18)}</button></div>`.
- Resumen plegable (checkout): `<details class="n-sumfold"><summary>Tu pedido <b class="n-num" id="sumfoldtot">33,90 €</b></summary><div>…</div></details>`. Divisor: `<div class="n-pay-div">o rellena tus datos</div>`. Layout: `<div class="n-co"><form …></form><aside>…</aside></div>`.
- Barra inferior fija (solo móvil, aparece cuando el ancla sale por arriba): `<div class="n-bbar" id="sticky" role="region" aria-label="Comprar"><div class="n-wrap n-bbar__in"><div class="n-cut n-bbar__img"><img …></div><div class="n-bbar__i"><b>Nombre</b><span class="n-lab n-num">16,95 €</span></div><button class="n-btn n-btn--sm" data-buy="slug" data-src="sticky">Comprar ahora</button></div><div class="n-wrap n-bbar__pay" id="st-express"></div></div>` y el ancla lleva `data-bbar-anchor` (el primer `.n-cta` sirve por defecto).
- Aparición suave: añade `n-reveal` a bloques por debajo del pliegue; `n-stagger` en el contenedor de una rejilla.

## 5. Comprobación obligatoria antes de dar por terminada una página
Servir `public/` con `python3 -m http.server 8765 --bind 127.0.0.1` (si no está ya en marcha) y comprobar con Playwright (`NODE_PATH=$(npm root -g)`, `executablePath:'/opt/pw-browsers/chromium'`, `args:['--no-sandbox']`) a 390×844 y 1280×800: 0 `pageerror`, `document.scrollingElement.scrollWidth === innerWidth`, ningún emoji en `document.body.innerText`, y que existan los ids que el JS de la página usa. Los 501 de `/api/*` en el servidor local son normales.
