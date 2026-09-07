# NOCTA · SISTEMA DE DISEÑO DEFINITIVO
## «Laboratorio Cálido» — dirección clínico-cálida, edición final

Documento único de implementación. Sustituye a las tres direcciones anteriores: toma como base la dirección ganadora («Laboratorio Cálido», 91) e injerta las decisiones que el jurado señaló como superiores en «Papel Nocturno» (88) y «NOCTA App» (79), corrigiendo además los cuatro errores verificables que los jueces detectaron en ellas.

Raíz del sitio: `/home/user/Claude-septiembre/nocta/web/public/`. Todas las rutas de este documento son absolutas respecto a esa raíz.

Regla de lectura: **todo lo que aparece aquí es literal y aplicable sin decisión adicional**. Si un valor no está aquí, no se inventa: se pregunta. El objetivo declarado es que doce personas distintas, trabajando por separado con este documento, produzcan páginas indistinguibles entre sí.

---

## 0. PRINCIPIOS Y REGLAS DE LA DIRECCIÓN

**La tesis.** NOCTA no vende un cosmético bonito: vende un apósito de grado hospitalario que hace un trabajo medible mientras duermes. La tienda se lee como **el informe de un laboratorio impreso sobre papel crema**: cifras alineadas, medidas explícitas (mm, horas, unidades, € por parche, referencia NC-…), pasos numerados como protocolo, filetes de un píxel, mucho aire y salvia como único acento. Precisión sin frialdad: el rigor es la prueba, la calidez es la promesa de que no duele.

**Las nueve reglas que gobiernan cada decisión** (las cinco originales de la dirección ganadora más cuatro injertadas):

1. **Todo número es un dato, no un adorno.** Cifras siempre en `tabular-nums`, en navy, con su unidad al lado. Nunca un número sin unidad ni una unidad sin número.
2. **Filete, no caja.** Un hairline de 1 px `#E6E1D6` separa; casi nada tiene fondo propio y **solo existen dos sombras en todo el sitio** (barra fija y hoja/drawer). *(Injerto de «Papel Nocturno», coherencia 95/100.)*
3. **El color se gana.** Navy = tinta y acción. Crema = superficie. Salvia = relleno y medida, **nunca texto ni trazo de icono sobre crema** (1,88:1). Para salvia legible existe `--n-sage-ink`. Rojo y verde solo en estados reales.
4. **Comprar es un gesto, no un recorrido.** Cada vez que un producto aparece en pantalla aparece su bloque de compra: *Comprar ahora* + pago exprés. «Añadir al carrito» es un enlace discreto.
5. **Cero emojis, cero adjetivos vacíos, cero claims nuevos.** Todo el texto de producto sale de `products.js` o del copy legal ya escrito. Comillas españolas «…» en citas y testimonios.
6. **Una sola familia, tres pesos.** Inter 400 / 500 / 600. Nunca 700 ni 800. **Peso 500 a partir de 36 px y 600 por debajo**: el tamaño ya es la jerarquía. *(Injerto de «Papel Nocturno».)*
7. **La imagen antes que el botón.** En móvil, en portada y en ficha, el usuario ve el producto **antes** del bloque de compra. Pedir a alguien que compre cosmética antes de haberla visto es lo contrario de la compra por impulso. *(Injerto de «NOCTA App», conversión 90/100; corrige el fallo de criterio más caro de «Papel Nocturno».)*
8. **El carrito nunca se pierde.** Ningún camino de compra exprés borra `n_cart`, y el cliente lo lee escrito en pantalla. *(Injerto de `BUYNOW_KEEPS_CART`, «la mejor idea aislada del conjunto» según el jurado.)*
9. **Honestidad comercial.** No se inventan descuentos por volumen que el servidor no sabría cobrar. El único beneficio real por llevar 2 unidades es el **envío gratis** que ya calcula `C.totals()` (`n >= 2`) y `netlify/functions/checkout.js`.

### 0.1 Contrato de no-rotura (verificado contra el código real)

No se toca, no se renombra y no se reordena:

- Objeto `T` y sus eventos: `page_view, view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, checkout_view, checkout_start_form, add_payment_info, apply_code, purchase, lead, popup_view, popup_close, select_item, select_mode, filter_catalogo, scroll, leave, quiz_start, quiz_answer, quiz_result, upsell_view, upsell_accept, upsell_decline, advertorial_cta, cta_hero`.
- Objeto `C` (`get/set/add/remove/qty/totals/open/close/render`) y las claves `n_cart, n_disc, n_sid, n_vid, n_utm, n_popup, n_lastorder, n_purch_<id>, n_admin`. Formato de línea inalterado: `{slug, qty, sub}`.
- Globales expuestos: `window.nTrack, nCart, nToast, nCard, nEur, nStars, nBySlug`. Se **añaden** `nBuy`, `nPay`, `nSheet`, `nPerUse`, `nImg` (aditivo).
- Endpoints `/api/track, /api/checkout, /api/order, /api/subscribe, /api/stats`. **Ninguna Netlify Function cambia.**
- Esquema de `products.js` (solo lectura), `window.NOCTA_GIFTS` (30 € envío gratis · 50 € mascarilla · 80 € parches) y `window.NOCTA_SHIPPING` (`{base:3.9, freeFrom:30}`).
- Todas las URL actuales. `/admin` no se toca (no carga `app.js`).
- Todos los `id` que el JS busca: `#site-header #site-footer #topbar #opencart #cartcount #drawer #closecart #closecart2 #giftbar #cartitems #cartupsell #carttotal #tocheckout #toast #sticky #st-name #st-price #st-add #pdp #addbtn #addprice #qm #qv #qp #mainimg #mainvid #sum #sumtot #giftmsg #paybtn #cof #applycode #q #qf #chips #grid-catalogo #grid-parches #grid-skincare #grid-packs #upsell #upyes #upno #cd #oid #oinfo #gf #cf #cookiebanner #ckno #ckyes`.
- Atributos de delegación vivos: `[data-add]`, `[data-q]`, `[data-rm]`, `.card[data-slug]`.
- Orden de scripts: `products.js` (bloqueante) → `app.js` (`defer`). Invertirlo deja `P/GIFTS/SHIP` en `undefined` y rompe el sitio entero.

### 0.2 Espacio de nombres `n-` y puente de compatibilidad

Todas las clases nuevas usan prefijo **`n-`** (y todos los tokens, prefijo `--n-`). Las clases heredadas que 15 páginas y `app.js` ya usan **no se renombran**: se declaran como alias en un bloque de 12 líneas al final del CSS. Un desarrollador escribe siempre `n-`; el sitio antiguo sigue funcionando mientras se migra página a página.

```css
/* PUENTE DE COMPATIBILIDAD — al final de styles.css. No añadir nada más aquí. */
.btn{ /* alias de .n-btn */ }
.card,.badge,.price,.stars,.rev,.line,.gift,.mini,.opt,.qty,.trust,.tabs,.summary,
.form,.pay,.quiz,.q,.progress,.article,.cta,.kicker,.sticky-cta,.popup,.toast,
.chips,.chip,.steps,.compare,.claims,.testis,.testi,.drawer,.bar,.top,.logo{ /* alias */ }
```
En la práctica el CSS define cada componente con selector doble: `.n-card,.card{…}`, `.n-btn,.btn{…}`, `.n-buy .n-btn,.buybox .btn{…}`. **Regla:** cada bloque de componente lleva su par legacy en el selector; nunca se duplica el cuerpo de la regla. Coste medido del puente: ~0,6 KB.

---

## 1. TOKENS CSS

Bloque `:root` completo. Sustituye a la primera línea de `/assets/css/styles.css`. **Se pega tal cual, sin editar valores.**

```css
:root{
  /* ============ COLOR ============ */
  --n-navy:#14213D;            /* tinta y botón primario · 13,92:1 sobre crema */
  --n-navy-press:#0E1830;      /* :active del primario */
  --n-navy-70:rgba(20,33,61,.70);
  --n-navy-40:rgba(20,33,61,.40);   /* velo de hojas y drawer */
  --n-bg:#FAF8F3;              /* fondo de página */
  --n-cream:#F3EFE6;           /* superficie tintada, media, bandas */
  --n-paper:#FFFFFF;           /* tarjetas, campos, hoja del carrito */
  --n-sage:#9FB3A1;            /* SOLO relleno, fondo o trazo sobre navy */
  --n-sage-14:rgba(159,179,161,.14);
  --n-sage-28:rgba(159,179,161,.28);
  --n-sage-ink:#576D5B;        /* salvia legible: 4,89:1 sobre crema, 5,28:1 sobre bg */
  --n-ink:#14213D;             /* texto principal = navy (no negro) */
  --n-ink-2:#3B4257;           /* cuerpo largo de artículo · 8,70:1 sobre crema */
  --n-muted:#5F5C55;           /* meta y captions · 6,28:1 sobre bg, 5,81:1 sobre crema */
  --n-line:#E6E1D6;            /* filete estándar */
  --n-line-2:#D9D3C5;          /* filete de énfasis y estado activo */
  --n-ok:#2F8F5B;              /* solo relleno o borde */
  --n-ok-ink:#22794A;          /* texto verde · 5,07:1 sobre bg */
  --n-alert:#C8553D;           /* solo relleno o borde */
  --n-alert-ink:#A03B28;       /* texto rojo · 6,28:1 sobre bg */
  --n-black:#000;              /* exclusivo del botón wallet */
  --n-focus:#14213D;

  /* ============ TIPOGRAFÍA (móvil) ============ */
  --n-ff:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --n-fs-d1:36px;   --n-lh-d1:1.06;   /* H1 portada y advertorial */
  --n-fs-d2:26px;   --n-lh-d2:1.15;   /* H1 de ficha e interiores */
  --n-fs-d3:22px;   --n-lh-d3:1.22;   /* H2 de sección */
  --n-fs-d4:17px;   --n-lh-d4:1.30;   /* H3 */
  --n-fs-lead:17px; --n-lh-lead:1.55;
  --n-fs-read:17px; --n-lh-read:1.70; /* cuerpo de artículo */
  --n-fs-body:15px; --n-lh-body:1.60;
  --n-fs-sm:13px;   --n-lh-sm:1.45;
  --n-fs-xs:12px;   --n-lh-xs:1.40;
  --n-fs-label:11px;--n-ls-label:.12em;  /* versalitas · mínimo absoluto del sitio */
  --n-fs-price:20px;                     /* precio en tarjeta */
  --n-fs-price-l:24px;                   /* precio en ficha y hero */
  --n-fs-num:28px;                       /* cifra de dato */
  --n-fs-btn:15px; --n-fs-btn-s:14px;
  --n-fs-input:16px;                     /* OBLIGATORIO: por debajo, iOS hace zoom al enfocar */
  --n-ls-d1:-.03em; --n-ls-d:-.02em; --n-ls-body:0;
  --n-w-reg:400; --n-w-med:500; --n-w-semi:600;   /* 700 y 800 PROHIBIDOS */

  /* ============ ESPACIADO (múltiplos de 8; 4 solo para pares icono-texto) ============ */
  --n-s1:4px; --n-s2:8px; --n-s3:12px; --n-s4:16px; --n-s5:24px;
  --n-s6:32px; --n-s7:48px; --n-s8:64px; --n-s9:96px;
  --n-gutter:20px;
  --n-sec:48px;              /* aire vertical entre secciones */
  --n-max:1180px;
  --n-measure:66ch;          /* ancho máximo de párrafo en artículos */
  --n-tap:44px;              /* objetivo táctil mínimo, sin excepciones */
  --n-header-h:56px;
  --n-bar-h:30px;
  --n-bbar-h:68px;           /* barra inferior de compra */
  --n-safe-b:env(safe-area-inset-bottom,0px);
  --n-safe-t:env(safe-area-inset-top,0px);

  /* ============ RADIOS ============ */
  --n-r-xs:8px;    /* botón wallet (guía Apple), miniaturas 56-76 px */
  --n-r-sm:12px;   /* chips, campos, acordeones, mini-media */
  --n-r:14px;      /* botones y tarjetas */
  --n-r-lg:16px;   /* galería, hoja inferior, imágenes grandes */
  --n-r-pill:999px;/* solo contador de carrito, barra de progreso y puntos */

  /* ============ ELEVACIÓN (solo dos sombras en todo el sitio) ============ */
  --n-sh-bar:0 -8px 24px -18px rgba(20,33,61,.35);
  --n-sh-sheet:0 -12px 40px -24px rgba(20,33,61,.40);
  --n-ring:0 0 0 3px rgba(20,33,61,.18);

  /* ============ Z-INDEX (escala cerrada) ============ */
  --n-z-bar:30; --n-z-header:40; --n-z-sheet:55; --n-z-drawer:60;
  --n-z-popup:70; --n-z-toast:90;

  /* ============ MOVIMIENTO ============ */
  --n-e:cubic-bezier(.2,0,0,1);          /* salida estándar */
  --n-e-io:cubic-bezier(.4,0,.2,1);      /* fundidos y altura */
  --n-e-spring:cubic-bezier(.2,.9,.25,1.06); /* solo hojas y contador */
  --n-t1:140ms;  /* pulsación */
  --n-t2:180ms;  /* estado, opacidad, toast */
  --n-t3:220ms;  /* aparición, acordeón, contador */
  --n-t4:260ms;  /* drawer, hoja, barra fija */
  --n-t-bar:400ms; /* relleno de la barra de regalos */

  font-family:var(--n-ff);
  color-scheme:light;
}

/* Escala de escritorio: SOLO cambian tamaños y aire */
@media (min-width:900px){
  :root{
    --n-fs-d1:56px; --n-lh-d1:1.02;
    --n-fs-d2:34px; --n-fs-d3:28px; --n-fs-d4:19px;
    --n-fs-lead:19px; --n-fs-read:18px; --n-fs-body:16px;
    --n-fs-price:22px; --n-fs-price-l:28px; --n-fs-num:34px;
    --n-gutter:24px; --n-sec:96px; --n-header-h:64px;
  }
}
```

### 1.1 Base y utilidades tipográficas (van justo después del `:root`)

```css
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--n-bg);color:var(--n-ink);
  font-size:var(--n-fs-body);line-height:var(--n-lh-body);
  -webkit-font-smoothing:antialiased;
  font-feature-settings:"cv05" 1,"ss03" 1}   /* «a» de una planta + comillas rectas: firma editorial de Inter */
img,video{max-width:100%;display:block}
a{color:inherit}
button{font:inherit;color:inherit;cursor:pointer}
h1,h2,h3,h4{margin:0;color:var(--n-ink);letter-spacing:var(--n-ls-d)}
button,a,label,summary{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
[hidden]{display:none!important}

.n-d1{font-size:var(--n-fs-d1);line-height:var(--n-lh-d1);letter-spacing:var(--n-ls-d1);font-weight:var(--n-w-med)}
.n-d2{font-size:var(--n-fs-d2);line-height:var(--n-lh-d2);font-weight:var(--n-w-semi)}
.n-d3,h2{font-size:var(--n-fs-d3);line-height:var(--n-lh-d3);font-weight:var(--n-w-semi)}
.n-d4,h3{font-size:var(--n-fs-d4);line-height:var(--n-lh-d4);font-weight:var(--n-w-semi)}
.n-lead{font-size:var(--n-fs-lead);line-height:var(--n-lh-lead);color:var(--n-ink-2);margin:0;max-width:34em}
.n-read{font-size:var(--n-fs-read);line-height:var(--n-lh-read);color:var(--n-ink-2);max-width:var(--n-measure)}
.n-sm{font-size:var(--n-fs-sm);line-height:var(--n-lh-sm)}
.n-xs{font-size:var(--n-fs-xs);line-height:var(--n-lh-xs)}
.n-muted{color:var(--n-muted)}
.n-lab{display:inline-block;font-size:var(--n-fs-label);line-height:1.2;
  letter-spacing:var(--n-ls-label);text-transform:uppercase;
  font-weight:var(--n-w-med);color:var(--n-muted)}
.n-lab--navy{color:var(--n-navy)}
.n-lab--alert{color:var(--n-alert-ink)}
.n-num,.n-price,.n-qty span,.n-cmp td,.n-tot,.n-spec dd,.n-data b{
  font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1,"cv05" 1,"ss03" 1}

.n-wrap{max-width:var(--n-max);margin:0 auto;padding:0 var(--n-gutter)}
.n-wrap--text{max-width:calc(var(--n-measure) + var(--n-gutter)*2)}
.n-bleed{margin-inline:calc(var(--n-gutter)*-1)}
@media (min-width:900px){.n-bleed{margin-inline:0}}
.n-rule{border:0;border-top:1px solid var(--n-line);margin:var(--n-s6) 0}
.n-sec{padding:var(--n-sec) 0}
.n-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.n-skip{position:absolute;left:var(--n-gutter);top:-60px;z-index:100;background:var(--n-navy);
  color:var(--n-bg);padding:12px 16px;border-radius:var(--n-r-sm);transition:top var(--n-t2) var(--n-e)}
.n-skip:focus{top:8px}
```

### 1.2 Escala tipográfica exacta

| Token | Móvil | ≥900 px | Peso | Tracking | Interlínea | Uso |
|---|---|---|---|---|---|---|
| `--n-fs-d1` | 36 px | 56 px | **500** | −0,03em | 1,06 / 1,02 | H1 de portada y advertorial |
| `--n-fs-d2` | 26 px | 34 px | 600 | −0,02em | 1,15 | H1 de ficha, catálogo e interiores |
| `--n-fs-d3` | 22 px | 28 px | 600 | −0,02em | 1,22 | H2 de sección |
| `--n-fs-d4` | 17 px | 19 px | 600 | −0,02em | 1,30 | H3, título de acordeón |
| `--n-fs-lead` | 17 px | 19 px | 400 | 0 | 1,55 | Entradilla, subtítulo de sección |
| `--n-fs-read` | 17 px | 18 px | 400 | 0 | 1,70 | Cuerpo de artículo |
| `--n-fs-body` | 15 px | 16 px | 400 | 0 | 1,60 | Cuerpo de interfaz |
| `--n-fs-sm` | 13 px | 13 px | 400 | 0 | 1,45 | Texto secundario, notas de tarjeta |
| `--n-fs-xs` | 12 px | 12 px | 400 | 0 | 1,40 | Legales, pies de tabla |
| `--n-fs-label` | 11 px | 11 px | 500 | **+0,12em** | 1,20 | Versalitas (mayúsculas) |
| `--n-fs-price` | 20 px | 22 px | 600 | −0,01em | 1,10 | Precio en tarjeta |
| `--n-fs-price-l` | 24 px | 28 px | 600 | −0,01em | 1,10 | Precio en ficha y hero |
| `--n-fs-num` | 28 px | 34 px | 600 | −0,02em | 1,05 | Cifra de dato (`.n-data b`) |
| `--n-fs-btn` | 15 px | 15 px | 500 | 0 | 1 | Texto de botón |
| `--n-fs-input` | 16 px | 16 px | 400 | 0 | 1,4 | Todo `input/select/textarea` |

Reglas duras de aplicación:
- **Peso 500 a partir de 36 px, 600 por debajo.** Nunca 700 ni 800 (se retira el peso 700 de la petición a Google Fonts).
- **Nada por debajo de 11 px** en todo el sitio, interfaz y legales incluidos.
- Todos los precios, cantidades, cuentas atrás y celdas de tabla llevan `tabular-nums`.
- Números de protocolo a dos dígitos: `01 02 03 04`.
- Citas con comillas españolas «…»; espacio fino antes de `€`, `%`, `h`, `mm`, `ml`.

---

## 2. INVENTARIO DE COMPONENTES

Cada ficha indica **dónde vive** el marcado. Los componentes marcados «`layout()`» los inyecta `/assets/js/app.js`; el resto se escribe en la página o en el template correspondiente.

### 2.0 Iconografía (SVG, sin librería, sin emojis)

Todos con `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`, tamaño 16, 18, 20 o 22 px, y `aria-hidden="true"` salvo cuando son el único contenido de un botón (entonces el botón lleva `aria-label`). **Color: navy o `currentColor`. Nunca salvia sobre crema.**

| Nombre | `d` |
|---|---|
| menú | `M4 8h16M4 16h16` |
| cerrar | `M6 6l12 12M18 6L6 18` |
| bolsa | `M6 8h12l-1 12H7L6 8z` + `M9 8V6a3 3 0 0 1 6 0v2` |
| chevron | `m9 6 6 6-6 6` |
| camión | `M3 16V6h11v10M14 9h4l3 3v4h-7` + `<circle cx="7.5" cy="17.5" r="1.7"/><circle cx="17.5" cy="17.5" r="1.7"/>` |
| escudo | `M12 3l7 3v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z` + `M9 12l2 2 4-4` |
| candado | `<rect x="4.5" y="10" width="15" height="10" rx="2"/>` + `M8 10V7a4 4 0 0 1 8 0v3` |
| check | `M5 12.5l4.5 4.5L19 7.5` |
| más | `M12 5v14M5 12h14` |
| luna (logo, `fill="currentColor" stroke="none"`) | `M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3z` |

Estos diez iconos sustituyen a los doce emojis actuales (`🚚 🇪🇸 ✅ 🔒 🎁 🌙 💳 📱 🛍️ 🅿️ 🎉 ⭐`).

### 2.1 `.n-bar` — barra superior de envío · `layout()`

```html
<div class="n-bar" id="topbar">
  <span class="n-bar__i">Envío gratis desde 30 € o llevando 2</span>
  <span class="n-bar__i n-bar__i--wide">Enviamos desde España en 24-48 h</span>
  <span class="n-bar__i n-bar__i--wide">Garantía 60 días</span>
</div>
```
```css
.n-bar,.bar{background:var(--n-navy);color:var(--n-cream);height:var(--n-bar-h);
  display:flex;align-items:center;justify-content:center;gap:var(--n-s4);
  padding:0 var(--n-gutter);font-size:var(--n-fs-xs);text-align:center}
.n-bar__i+.n-bar__i{padding-left:var(--n-s4);border-left:1px solid rgba(243,239,230,.28)}
@media (max-width:640px){.n-bar__i--wide{display:none}}
```
No es sticky: se va con el scroll. Sin rotación automática (un mensaje visible en móvil, tres en escritorio): los tres están en el DOM y son legibles por lector de pantalla.

### 2.2 `.n-top` — cabecera · `layout()`

```html
<header class="n-top">
  <div class="n-wrap n-top__in">
    <button class="n-icon" id="opennav" aria-label="Abrir menú" aria-expanded="false" aria-controls="n-nav">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>
    </button>
    <a class="n-logo" href="/" aria-label="NOCTA, inicio">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M15 3a9 9 0 1 0 6 15.5A8 8 0 0 1 15 3z"/></svg>nocta
    </a>
    <nav class="n-main" aria-label="Principal">
      <a href="/#productos">Parches</a><a href="/#skincare">Skincare</a><a href="/#packs">Packs</a>
      <a href="/catalogo.html">Catálogo</a><a href="/no-son-puntos-negros.html">No son puntos negros</a>
      <a href="/quiz.html">Test de piel</a><a href="/garantia.html">Garantía</a>
    </nav>
    <button class="n-cart" id="opencart" aria-label="Abrir carrito, 0 artículos">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
      <b id="cartcount">0</b>
    </button>
  </div>
</header>
```
```css
#site-header{display:contents}   /* ARREGLA EL STICKY ROTO: el bloque contenedor pasa a ser <body> */
.n-top,header.top{position:sticky;top:0;z-index:var(--n-z-header);
  background:rgba(250,248,243,.92);backdrop-filter:blur(10px) saturate(1.1);
  border-bottom:1px solid var(--n-line);padding-top:var(--n-safe-t)}
.n-top__in{display:grid;grid-template-columns:var(--n-tap) 1fr var(--n-tap);
  align-items:center;height:var(--n-header-h)}
.n-logo{grid-column:2;justify-self:center;display:flex;align-items:center;gap:6px;
  color:var(--n-navy);text-decoration:none;font-size:22px;font-weight:var(--n-w-semi);letter-spacing:-.04em}
.n-icon{grid-column:1;justify-self:start;width:var(--n-tap);height:var(--n-tap);
  display:grid;place-items:center;background:none;border:0;color:var(--n-navy)}
.n-cart{grid-column:3;justify-self:end;position:relative;width:var(--n-tap);height:var(--n-tap);
  display:grid;place-items:center;background:none;border:0;color:var(--n-navy)}
.n-cart b{position:absolute;top:2px;right:0;min-width:18px;height:18px;padding:0 5px;
  background:var(--n-navy);color:var(--n-cream);border-radius:var(--n-r-pill);
  font-size:10px;line-height:18px;font-weight:var(--n-w-med);text-align:center}
.n-cart b[data-zero]{display:none}
.n-main{display:none}
@media (min-width:900px){
  .n-top__in{grid-template-columns:auto 1fr auto;height:var(--n-header-h);gap:var(--n-s6)}
  .n-logo{grid-column:1;justify-self:start;font-size:26px}
  .n-icon{display:none}
  .n-main{grid-column:2;display:flex;justify-content:center;gap:var(--n-s5)}
  .n-main a{font-size:14px;text-decoration:none;color:var(--n-navy);padding:4px 0;
    border-bottom:1px solid transparent;transition:border-color var(--n-t2) var(--n-e)}
  .n-main a:hover,.n-main a[aria-current]{border-color:var(--n-navy)}
}
body.n-checkout .n-icon,body.n-checkout .n-cart{visibility:hidden}
body.n-checkout .n-logo{grid-column:2}
```
**Acceso persistente al carrito** (injerto funcional de «NOCTA App» sin importar su tab bar): la cabecera es sticky en **todas** las páginas de contenido, así que el carrito está siempre a un toque sin añadir una segunda barra que compita con la de compra.

### 2.3 `.n-nav` — hoja de navegación móvil · `layout()` (hoy no existe ningún menú en móvil)

```html
<div class="n-nav" id="n-nav" role="dialog" aria-modal="true" aria-label="Menú" hidden>
  <div class="n-nav__bg" data-navclose></div>
  <nav class="n-nav__panel">
    <div class="n-nav__head"><span class="n-lab">Menú</span>
      <button class="n-icon" data-navclose aria-label="Cerrar menú">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <a class="n-nav__row" href="/#productos">Parches<span class="n-lab">5 formatos</span></a>
    <a class="n-nav__row" href="/#skincare">Skincare<span class="n-lab">5 fórmulas</span></a>
    <a class="n-nav__row" href="/#packs">Packs<span class="n-lab">hasta −17 %</span></a>
    <a class="n-nav__row" href="/catalogo.html">Catálogo<span class="n-lab">13 productos</span></a>
    <a class="n-nav__row" href="/quiz.html">Test de piel<span class="n-lab">4 preguntas</span></a>
    <a class="n-nav__row" href="/no-son-puntos-negros.html">No son puntos negros</a>
    <a class="n-nav__row" href="/como-usar.html">Cómo usar</a>
    <a class="n-nav__row" href="/garantia.html">Garantía 60 días</a>
    <div class="n-nav__foot"><span class="n-lab">Envío 24-48 h desde España · hola@nocta.es</span></div>
  </nav>
</div>
```
```css
.n-nav{position:fixed;inset:0;z-index:var(--n-z-sheet)}
.n-nav__bg{position:absolute;inset:0;background:var(--n-navy-40);opacity:0;
  transition:opacity var(--n-t2) linear}
.n-nav__panel{position:absolute;inset:0 0 auto;background:var(--n-bg);
  border-radius:0 0 var(--n-r-lg) var(--n-r-lg);
  padding:0 var(--n-gutter) var(--n-s5);transform:translateY(-100%);
  transition:transform var(--n-t4) var(--n-e);max-height:92svh;overflow:auto}
.n-nav.is-open .n-nav__bg{opacity:1}
.n-nav.is-open .n-nav__panel{transform:none}
.n-nav__head{display:flex;justify-content:space-between;align-items:center;height:var(--n-header-h)}
.n-nav__row{display:flex;justify-content:space-between;align-items:center;gap:var(--n-s3);
  min-height:56px;border-top:1px solid var(--n-line);text-decoration:none;
  color:var(--n-navy);font-size:17px;font-weight:var(--n-w-med)}
.n-nav__foot{border-top:1px solid var(--n-line);padding-top:var(--n-s4);margin-top:var(--n-s2)}
@media (min-width:900px){.n-nav{display:none}}
```
Comportamiento (≈0,7 KB): `hidden=false` → doble `requestAnimationFrame` → `.is-open`; cierre con `[data-navclose]`, `Escape`, `popstate` y al navegar; `aria-expanded` en `#opennav`; bloqueo de scroll con `nSheet.lock()`; foco al primer enlace y devuelto a `#opennav`. Evento `nTrack('nav_open')`.

### 2.4 `.n-btn` y `.n-link` — botones

```css
.n-btn,.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--n-s2);
  min-height:48px;padding:0 var(--n-s5);border:0;border-radius:var(--n-r);
  background:var(--n-navy);color:var(--n-cream);
  font-size:var(--n-fs-btn);font-weight:var(--n-w-med);white-space:nowrap;text-decoration:none;
  transition:background var(--n-t2) var(--n-e),opacity var(--n-t2) var(--n-e),transform var(--n-t1) var(--n-e)}
.n-btn:active{transform:scale(.98);background:var(--n-navy-press)}
@media (hover:hover){.n-btn:hover{opacity:.93}}
.n-btn--wide,.btn.wide{width:100%}
.n-btn--lg{min-height:52px;font-size:16px}
.n-btn--sm{min-height:var(--n-tap);padding:0 var(--n-s4);font-size:var(--n-fs-btn-s)}
.n-btn--ghost,.btn.ghost{background:transparent;color:var(--n-navy);box-shadow:inset 0 0 0 1.5px var(--n-navy)}
.n-btn--ghost:active{background:var(--n-sage-14)}
.n-btn--sage,.btn.sage{background:var(--n-sage);color:var(--n-navy)}
.n-btn[disabled],.n-btn[aria-busy="true"]{opacity:.5;pointer-events:none}
.n-link{display:inline-block;min-height:var(--n-tap);padding:12px 0;background:none;border:0;
  color:var(--n-muted);font-size:var(--n-fs-sm);
  text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.n-link:hover{color:var(--n-navy)}
:where(a,button,input,select,summary,[tabindex]):focus-visible{
  outline:2px solid var(--n-focus);outline-offset:2px;border-radius:4px}
.n-btn:focus-visible,.n-pay:focus-visible{outline-offset:3px;box-shadow:var(--n-ring)}
```
Jerarquía única en todo el sitio, siempre en este orden: **primario navy** (uno por bloque) → **exprés negro** (marca de pago) → **fantasma** (filete navy) → **enlace `.n-link`** («Añadir al carrito», «No, gracias», «Ver todas»). Radio siempre `--n-r`; **prohibido `--n-r-pill` en botones**.

### 2.5 `.n-card` — tarjeta de producto · `window.nCard` en `app.js`

Hoy toda la tarjeta es un `<a>` con un `<button>` dentro (marcado inválido, foco duplicado y subrayado heredado). Pasa a `<article>` con enlace estirado:

```html
<article class="n-card" data-slug="parches-nariz">
  <a class="n-card__media n-skel" href="/producto.html?p=parches-nariz" tabindex="-1" aria-hidden="true">
    <span class="n-badge">Bestseller</span>
    <img src="/assets/img/parches-nariz-cut.webp" width="1200" height="1200" alt="" loading="lazy" decoding="async">
  </a>
  <div class="n-card__body">
    <span class="n-lab">Parches de hidrocoloide</span>
    <h3 class="n-card__t"><a class="n-card__link" href="/producto.html?p=parches-nariz">Parches de Nariz</a></h3>
    <p class="n-card__s">Poros limpios mientras duermes</p>
    <p class="n-rev"><span class="n-stars" role="img" aria-label="4,8 sobre 5 según 312 opiniones">★★★★★</span>
      <b class="n-num">4,8</b><span class="n-lab">312 opiniones</span></p>
    <p class="n-price"><b class="n-num">16,95 €</b>
      <span class="n-price__u n-lab">8 parches · 2,12 € por parche</span></p>
    <!-- .n-buy (§3) -->
  </div>
</article>
```
```css
.n-card,.card{position:relative;display:flex;flex-direction:column;
  background:var(--n-paper);border:1px solid var(--n-line);border-radius:var(--n-r);
  overflow:hidden;transition:border-color var(--n-t2) var(--n-e)}
.n-card a{text-decoration:none;color:inherit}
@media (hover:hover){.n-card:hover{border-color:var(--n-line-2)}}
.n-card__media{display:block;aspect-ratio:1;background:var(--n-cream);position:relative}
.n-card__media img{width:100%;height:100%;object-fit:cover}
.n-card__body{padding:var(--n-s4);display:flex;flex-direction:column;gap:var(--n-s1);flex:1}
.n-card__t{font-size:var(--n-fs-d4);font-weight:var(--n-w-semi);color:var(--n-navy);margin:0}
.n-card__link::after{content:"";position:absolute;inset:0;z-index:1}   /* enlace estirado */
.n-card__s{margin:0;color:var(--n-muted);font-size:var(--n-fs-sm)}
.n-card .n-buy,.n-card .n-price,.n-card .n-rev{position:relative;z-index:2} /* controles por encima */
.n-rev{margin:0;display:flex;align-items:baseline;gap:6px;font-size:var(--n-fs-sm);color:var(--n-muted)}
.n-stars{color:var(--n-sage-ink);letter-spacing:.12em;font-size:13px}
.n-price{margin:var(--n-s2) 0 0;display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--n-s2)}
.n-price b{font-size:var(--n-fs-price);font-weight:var(--n-w-semi);color:var(--n-navy)}
.n-price s{color:var(--n-muted);font-weight:var(--n-w-reg);font-size:var(--n-fs-sm);text-decoration-thickness:1px}
.n-price__u{flex:0 0 100%}
.n-price--lg b{font-size:var(--n-fs-price-l)}
.n-klarna{margin:2px 0 0;font-size:var(--n-fs-xs);color:var(--n-muted)}
.n-badge,.badge{position:absolute;top:var(--n-s3);left:var(--n-s3);
  background:var(--n-bg);color:var(--n-navy);border:1px solid var(--n-line);
  border-radius:var(--n-r-xs);padding:5px 9px;
  font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);text-transform:uppercase;font-weight:var(--n-w-med)}

/* Variante fila: catálogo en móvil (13 productos escaneables sin ocultar nada) */
@media (max-width:640px){
  .n-card--row{flex-direction:row;gap:var(--n-s3);padding:var(--n-s3);align-items:flex-start}
  .n-card--row .n-card__media{flex:0 0 116px;border-radius:var(--n-r-sm);overflow:hidden}
  .n-card--row .n-card__body{padding:0}
  .n-card--row .n-badge{top:6px;left:6px}
}
```
**Estrellas en `--n-sage-ink`**, nunca en el amarillo `#e9b949` actual (fuera de paleta) ni en salvia clara (ilegible).

Helpers obligatorios en `app.js` (≈0,4 KB), para que las trece tarjetas se generen igual en las doce manos:

```js
// Imagen: recorte sobre crema cuando existe; si no, .webp del original
const CUT=new Set(['parches-nariz','parches-granos','parches-superficie','parches-barbilla','parches-frente',
  'exfoliante-salicilico','serum-niacinamida','mascarilla-peel-off','pack-mascarillas-tela','tonico-hialuronico']);
window.nImg=p=>CUT.has(p.slug)?`/assets/img/${p.slug}-cut.webp`:p.image.replace(/\.(jpg|png)$/,'.webp');
// Precio por unidad: dato calculado, jamás inventado
window.nPerUse=p=>{const m=/^(\d+(?:\s*\+\s*\d+)*)\s*(parches?|mascarillas?)/i.exec(p.units);
  if(!m)return'';const n=m[1].split('+').reduce((a,b)=>a+ +b,0);if(n<2)return'';
  return nEur(p.price/n)+' por '+(/mascarilla/i.test(m[2])?'mascarilla':'parche');};
// Financiación: solo a partir de 35 €, mínimo real de Klarna en España
window.nKlarna=v=>v>=35?`o 3 × ${nEur(v/3)} con Klarna`:'';
// Categoría para la versalita
window.nCat=p=>p.tags.includes('pack')||/^(duo|kit|pack)/.test(p.slug)?'Pack'
  :(p.tags.includes('skincare')?'Skincare':'Parches de hidrocoloide');
```
Valores resultantes verificados sobre `products.js` — **precio por parche**: nariz 2,12 · granos 0,44 · superficie 1,60 · barbilla 2,12 · frente 3,39 · kit-t-zone 2,10 · kit-cara-completa 1,03; **por mascarilla**: pack-mascarillas-tela 3,75. `duo-poros` y los productos en ml devuelven cadena vacía y muestran solo `p.units`. **Klarna**: solo `duo-poros` (14,67 €), `kit-t-zone` (14,67 €) y `kit-cara-completa` (23,00 €). **Ahorro real** (`compare − price`): duo 4,95 € · kit-t-zone 6,85 € · kit-cara-completa 13,75 €.

### 2.6 `.n-trust` — franja de confianza

```html
<ul class="n-trust">
  <li><svg class="n-ico">…camión…</svg><b>24-48 h</b><span>Enviamos desde España</span></li>
  <li><svg class="n-ico">…escudo…</svg><b>60 días</b><span>O te devolvemos el dinero</span></li>
  <li><svg class="n-ico">…candado…</svg><b>Pago seguro</b><span>Bizum · Tarjeta · Klarna</span></li>
</ul>
<a class="n-link" href="/garantia.html">Cómo funciona la garantía de 60 días</a>
```
```css
.n-trust,.trust{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  margin:var(--n-s4) 0;padding:var(--n-s4) 0;
  border-top:1px solid var(--n-line);border-bottom:1px solid var(--n-line)}
.n-trust li{padding:0 var(--n-s3);text-align:center;font-size:var(--n-fs-xs);
  line-height:1.35;color:var(--n-muted);background:none;border:0}
.n-trust li+li{border-left:1px solid var(--n-line)}
.n-trust b{display:block;font-size:var(--n-fs-sm);font-weight:var(--n-w-med);color:var(--n-navy)}
.n-ico{width:18px;height:18px;display:block;margin:0 auto 4px;
  stroke:var(--n-navy);stroke-width:1.5;fill:none}
@media (max-width:400px){.n-trust li{padding:0 var(--n-s2)}}
```
Nunca se rompe a una columna: tres celdas con filete caben en 390 px. **Iconos en navy** (salvia sobre crema es 1,88:1 y no alcanza el 3:1 exigido a elementos no textuales — este es el error que el jurado detectó en «NOCTA App» y aquí queda cerrado).

### 2.7 `.n-data` — banda de datos (sustituye a `.claims`/`.claim` navy)

```html
<div class="n-data">
  <div class="n-data__i"><b class="n-num">9 de 10</b><span>vieron los poros más limpios tras la primera noche</span></div>
  <div class="n-data__i"><b class="n-num">6-8 h</b><span>de absorción continua mientras duermes</span></div>
  <div class="n-data__i"><b class="n-num">0</b><span>tirones: se despega solo con agua tibia</span></div>
</div>
```
```css
.n-data,.claims{display:grid;grid-template-columns:repeat(3,1fr);background:var(--n-sage-14);
  border-top:1px solid var(--n-line);border-bottom:1px solid var(--n-line)}
.n-data__i{padding:var(--n-s4) var(--n-s3);text-align:center}
.n-data__i+.n-data__i{border-left:1px solid var(--n-line)}
.n-data b{display:block;font-size:var(--n-fs-num);font-weight:var(--n-w-semi);
  letter-spacing:var(--n-ls-d);line-height:1.05;color:var(--n-navy);margin-bottom:4px}
.n-data span{font-size:var(--n-fs-xs);line-height:1.35;color:var(--n-muted)}
@media (max-width:640px){
  .n-data{grid-template-columns:1fr}
  .n-data__i{display:flex;gap:var(--n-s3);align-items:baseline;text-align:left;padding:var(--n-s3) var(--n-s4)}
  .n-data__i+.n-data__i{border-left:0;border-top:1px solid var(--n-line)}
  .n-data b{flex:0 0 96px;margin:0;font-size:22px}
}
```

### 2.8 `.n-spec` — ficha técnica (la pieza más «laboratorio» del sistema)

Usa campos que ya existen y hoy no se muestran (`sku`) o se muestran sueltos (`units`).

```html
<dl class="n-spec">
  <div><dt class="n-lab">Formato</dt><dd>8 parches</dd></div>
  <div><dt class="n-lab">Precio por parche</dt><dd class="n-num">2,12 €</dd></div>
  <div><dt class="n-lab">Tiempo de uso</dt><dd>6-8 h</dd></div>
  <div><dt class="n-lab">Material</dt><dd>Hidrocoloide de grado hospitalario</dd></div>
  <div><dt class="n-lab">Referencia</dt><dd class="n-num">NC-NOSE-8</dd></div>
</dl>
```
```css
.n-spec{margin:var(--n-s5) 0;border-top:1px solid var(--n-line)}
.n-spec>div{display:flex;justify-content:space-between;align-items:baseline;gap:var(--n-s4);
  padding:12px 0;border-bottom:1px solid var(--n-line)}
.n-spec dt,.n-spec dd{margin:0}
.n-spec dd{font-size:var(--n-fs-body);color:var(--n-navy);text-align:right}
```

### 2.9 `.n-steps` — protocolo numerado (sustituye a `.steps` y a la lista `p.how`)

```html
<ol class="n-steps">
  <li><span class="n-lab n-lab--navy">Paso 01</span><p>Limpia y seca bien la nariz (sin cremas ni sérum).</p></li>
  <li><span class="n-lab n-lab--navy">Paso 02</span><p>Retira el protector, centra el parche y alísalo.</p></li>
</ol>
```
```css
.n-steps,.steps{list-style:none;margin:0;padding:0}
.n-steps li{display:grid;grid-template-columns:72px 1fr;gap:var(--n-s3);align-items:start;
  padding:var(--n-s4) 0;border-top:1px solid var(--n-line);background:none;border-radius:0}
.n-steps li p{margin:0;font-size:var(--n-fs-body);line-height:var(--n-lh-body)}
.n-steps .n-lab{padding-top:3px}
@media (min-width:900px){.n-steps--4{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--n-s6)}
  .n-steps--4 li{display:block;border-top:1px solid var(--n-line)}}
```

### 2.10 `.n-tiers` — escalera de cantidad *(injerto de «Papel Nocturno»: la única palanca real de AOV)*

Tres columnas, 68 px de alto, bandera sobre la opción de 2. **Honestidad:** el único beneficio por llevar 2 es el envío gratis.

```html
<fieldset class="n-tiers" aria-label="Cantidad">
  <legend class="n-vh">Cantidad</legend>
  <label class="n-tier is-on"><input type="radio" name="qty" value="1" checked>
    <b>1 caja</b><span class="n-num">16,95 €</span><small>2,12 € por parche</small></label>
  <label class="n-tier"><input type="radio" name="qty" value="2">
    <i class="n-tier__flag n-lab">Lo más elegido</i>
    <b>2 cajas</b><span class="n-num">33,90 €</span><small>Envío gratis</small></label>
  <label class="n-tier"><input type="radio" name="qty" value="3">
    <b>3 cajas</b><span class="n-num">50,85 €</span><small>Envío gratis</small></label>
</fieldset>
```
```css
.n-tiers{border:0;padding:0;margin:var(--n-s4) 0 0;display:grid;grid-template-columns:repeat(3,1fr);gap:var(--n-s2)}
.n-tier{position:relative;display:flex;flex-direction:column;justify-content:center;gap:2px;
  min-height:68px;padding:var(--n-s2) var(--n-s2);text-align:center;cursor:pointer;
  background:var(--n-paper);border:1px solid var(--n-line);border-radius:var(--n-r);
  transition:border-color var(--n-t2) var(--n-e),background var(--n-t2) var(--n-e)}
.n-tier.is-on{border-color:var(--n-navy);border-width:1.5px;background:var(--n-cream)}
.n-tier input{position:absolute;opacity:0;width:1px;height:1px}
.n-tier b{font-size:var(--n-fs-sm);font-weight:var(--n-w-med);color:var(--n-navy)}
.n-tier span{font-size:var(--n-fs-body);font-weight:var(--n-w-semi);color:var(--n-navy)}
.n-tier small{font-size:11px;color:var(--n-muted);line-height:1.2}
.n-tier__flag{position:absolute;top:-9px;left:50%;transform:translateX(-50%);white-space:nowrap;
  background:var(--n-sage);color:var(--n-navy);padding:2px 8px;border-radius:var(--n-r-xs)}
```
Preselección: **1 caja** siempre. (No se preselecciona 2: sería empujar carrito sin permiso y el jurado premia la honestidad comercial.)

### 2.11 `.n-opt` — modo de compra (única / suscripción)

```html
<div class="n-opts" role="radiogroup" aria-label="Modo de compra">
  <label class="n-opt is-on"><input type="radio" name="mode" value="one" checked>
    <span class="n-opt__t"><b>Compra única</b></span><span class="n-opt__p n-num">16,95 €</span></label>
  <label class="n-opt"><input type="radio" name="mode" value="sub">
    <span class="n-opt__t"><b>Suscríbete y ahorra 15 %</b>
      <small>Cada 30, 45 o 60 días · envío siempre gratis · cancela o salta un envío desde el email de cada pedido</small></span>
    <span class="n-opt__p n-num">14,41 € <s>16,95 €</s></span></label>
</div>
```
```css
.n-opts,.opts{display:grid;gap:var(--n-s2);border:0;border-radius:0;overflow:visible;margin:var(--n-s3) 0 0}
.n-opt,.opt{display:flex;gap:var(--n-s3);align-items:center;min-height:64px;padding:var(--n-s3) var(--n-s4);
  background:var(--n-paper);border:1px solid var(--n-line);border-radius:var(--n-r);cursor:pointer;
  transition:border-color var(--n-t2) var(--n-e),background var(--n-t2) var(--n-e)}
.n-opt.is-on,.opt.on{border-color:var(--n-navy);border-width:1.5px;background:var(--n-cream)}
.n-opt input{accent-color:var(--n-navy);width:20px;height:20px;flex:0 0 auto}
.n-opt__t{flex:1}
.n-opt__t b{display:block;font-weight:var(--n-w-med);color:var(--n-navy)}
.n-opt__t small{display:block;color:var(--n-muted);font-size:var(--n-fs-sm)}
.n-opt__p{font-weight:var(--n-w-semi);color:var(--n-navy)}
.n-opt__p s{font-weight:var(--n-w-reg);font-size:var(--n-fs-sm);color:var(--n-muted)}
```
La suscripción **nunca va preseleccionada**. La frecuencia **no se persiste** (`sub` es booleano en `n_cart`): se comunica como texto, jamás como selector que finja guardar algo que el checkout no recoge.

### 2.12 `.n-qty` — contador (solo escritorio y carrito)

```css
.n-qty,.qty{display:inline-flex;align-items:center;background:var(--n-paper);
  border:1px solid var(--n-line);border-radius:var(--n-r);overflow:hidden}
.n-qty button{width:var(--n-tap);height:var(--n-tap);background:none;border:0;
  color:var(--n-navy);display:grid;place-items:center}
.n-qty button:active{background:var(--n-cream)}
.n-qty span{min-width:40px;text-align:center;line-height:var(--n-tap)}
@media (max-width:899px){.n-pdp .n-qty{display:none}}  /* en móvil manda la escalera */
```
Corrige el objetivo táctil de 38×44 px detectado en auditoría → 44×44.

### 2.13 `.n-gal` — galería de ficha (scroll-snap; elimina el desbordamiento de 413 px)

```html
<div class="n-gal">
  <div class="n-gal__track" id="n-gal-track">
    <div class="n-gal__s n-skel"><img id="mainimg" src="/assets/img/parches-nariz-cut.webp"
      width="1200" height="1200" alt="Parches de Nariz NOCTA, caja de 8" fetchpriority="high" decoding="async"></div>
    <div class="n-gal__s"><video id="mainvid" src="/assets/video/parches-nariz.mp4"
      poster="/assets/img/parches-nariz.webp" muted loop playsinline preload="metadata"
      disablepictureinpicture></video><span class="n-gal__tag n-lab">Vídeo · 6 s</span></div>
    <div class="n-gal__s"><img src="/assets/img/parches-nariz-dorso.webp" width="1200" height="1200" alt="" loading="lazy" decoding="async"></div>
    <div class="n-gal__s"><img src="/assets/img/lifestyle-noche.webp" width="1128" height="1400" alt="" loading="lazy" decoding="async"></div>
  </div>
  <div class="n-gal__dots" aria-hidden="true"><i class="is-on"></i><i></i><i></i><i></i></div>
  <span class="n-gal__count n-lab n-num" id="n-gal-count">1/4</span>
  <div class="n-gal__thumbs" id="thumbs"><!-- solo ≥900 px --></div>
</div>
```
```css
.n-gal{position:relative}
.n-gal__track{display:flex;gap:var(--n-s2);overflow-x:auto;scroll-snap-type:x mandatory;
  scrollbar-width:none;-webkit-overflow-scrolling:touch;border-radius:var(--n-r-lg)}
.n-gal__track::-webkit-scrollbar{display:none}
.n-gal__s{flex:0 0 100%;scroll-snap-align:center;aspect-ratio:1;overflow:hidden;
  border-radius:var(--n-r-lg);background:var(--n-cream);position:relative}
.n-gal__s img,.n-gal__s video{width:100%;height:100%;object-fit:cover}
.n-gal__tag{position:absolute;top:var(--n-s2);left:var(--n-s2);background:rgba(250,248,243,.92);
  color:var(--n-navy);padding:4px 8px;border-radius:var(--n-r-sm)}
.n-gal__dots{display:flex;gap:var(--n-s2);justify-content:center;margin-top:var(--n-s3)}
.n-gal__dots i{width:6px;height:6px;border-radius:var(--n-r-pill);background:var(--n-line-2);
  transition:background var(--n-t2) linear,transform var(--n-t2) var(--n-e)}
.n-gal__dots i.is-on{background:var(--n-navy);transform:scale(1.2)}
.n-gal__count{position:absolute;right:var(--n-s2);bottom:52px;background:rgba(250,248,243,.92);
  color:var(--n-navy);padding:4px 8px;border-radius:var(--n-r-sm)}
.n-gal__thumbs,.thumbs{display:none;gap:10px;margin-top:10px;overflow-x:auto;scrollbar-width:none}
.n-gal__thumbs img{width:76px;height:76px;flex:0 0 auto;object-fit:cover;
  border-radius:var(--n-r-xs);border:1.5px solid transparent;cursor:pointer}
.n-gal__thumbs img.is-on{border-color:var(--n-navy)}
@media (min-width:900px){
  .n-gal__thumbs{display:flex}
  .n-gal__track{overflow:hidden}
  .n-gal__s{display:none}.n-gal__s.is-on{display:block}
  .n-gal__dots,.n-gal__count{display:none}
}
```
Reglas fijas: **el primer slide es siempre el packshot**, el vídeo va en el segundo (hoy el vídeo va primero y ensucia el LCP); la miniatura del vídeo es un `<img>` con el póster (hoy se descarga el MP4 dos veces: 138 KB de más en `parches-nariz`); puntos y contador se actualizan con `IntersectionObserver` sobre `.n-gal__s` (`threshold:.6`), nunca con un listener de `scroll`; el listener de miniaturas solo se registra si `matchMedia('(min-width:900px)').matches`.

### 2.14 `.n-acc` — acordeón (con la animación **corregida**)

```html
<div class="n-acc">
  <details><summary>Cómo se pone (con vídeo)</summary>
    <div class="n-acc__c"><div class="n-acc__in"><p>…</p></div></div></details>
  <details><summary>Qué lleva y qué no lleva</summary>
    <div class="n-acc__c"><div class="n-acc__in"><p>…</p></div></div></details>
</div>
```
```css
.n-acc details,.faq details,.tabs details{background:none;border:0;border-radius:0;padding:0;margin:0;
  border-top:1px solid var(--n-line)}
.n-acc details:last-of-type{border-bottom:1px solid var(--n-line)}
.n-acc summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;
  gap:var(--n-s3);min-height:56px;padding:var(--n-s3) 0;
  font-size:var(--n-fs-body);font-weight:var(--n-w-med);color:var(--n-navy)}
.n-acc summary::-webkit-details-marker{display:none}
.n-acc summary::after{content:"";width:9px;height:9px;flex:none;margin-right:2px;
  border-right:1.5px solid var(--n-navy);border-bottom:1.5px solid var(--n-navy);
  transform:rotate(45deg);transition:transform var(--n-t2) var(--n-e)}
.n-acc details[open] summary::after{transform:rotate(-135deg)}
.n-acc__c{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--n-t3) var(--n-e-io)}
.n-acc details.is-open .n-acc__c{grid-template-rows:1fr}
.n-acc__in{overflow:hidden}
.n-acc__in>*{padding-bottom:var(--n-s4);font-size:var(--n-fs-body);color:var(--n-ink-2);max-width:var(--n-measure)}
```
**Por qué hay clase `.is-open` además del atributo `open`:** con `<details>` cerrado el contenido no se renderiza, así que una transición `0fr→1fr` no tiene estado inicial y **no anima al abrir** (fallo verificado en dos de las tres direcciones). Estas 12 líneas lo resuelven sin depender de `::details-content`:

```js
document.addEventListener('click',e=>{
  const s=e.target.closest('.n-acc summary'); if(!s) return;
  const d=s.parentElement; e.preventDefault();
  if(d.open){ d.classList.remove('is-open');
    d.querySelector('.n-acc__c').addEventListener('transitionend',()=>{d.open=false},{once:true});
  } else { d.open=true; requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add('is-open'))); }
});
```
Con `prefers-reduced-motion` el bloque global anula la transición y el `transitionend` sigue disparándose (duración 0,01 ms), así que el comportamiento es idéntico sin movimiento. Todos los `<details>` **cerrados por defecto** (quitar el `open` del primero de `producto.html`).

### 2.15 `.n-quotes` / `.n-quote` — testimonios

```html
<figure class="n-quote">
  <p class="n-stars" role="img" aria-label="5 sobre 5">★★★★★</p>
  <blockquote>«A la mañana siguiente el parche estaba lleno de puntitos. Nunca había visto nada igual.»</blockquote>
  <figcaption class="n-quote__who">Marta G. <span class="n-lab n-lab--navy">Compra verificada</span></figcaption>
</figure>
```
```css
.n-quotes,.testis{display:grid;gap:var(--n-s3);grid-template-columns:repeat(3,1fr)}
.n-quote,.testi{margin:0;background:var(--n-paper);border:1px solid var(--n-line);
  border-radius:var(--n-r-sm);padding:var(--n-s4);font-size:var(--n-fs-body);line-height:1.5}
.n-quote blockquote{margin:var(--n-s2) 0 0;color:var(--n-ink)}
.n-quote__who{margin-top:var(--n-s3);color:var(--n-muted);font-size:var(--n-fs-sm);
  display:flex;gap:var(--n-s2);align-items:center;flex-wrap:wrap}
@media (max-width:899px){.n-quotes{grid-template-columns:1fr}}
```
Comillas españolas «…» siempre; firma en versalitas.

### 2.16 `.n-cmp` — comparativa (tabla en escritorio, lista en móvil)

```css
.n-cmp,.compare{width:100%;border-collapse:collapse;background:none;border:0}
.n-cmp th,.n-cmp td{padding:var(--n-s3) 0;border-bottom:1px solid var(--n-line);
  font-size:var(--n-fs-body);text-align:left;vertical-align:top}
.n-cmp th{font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);text-transform:uppercase;
  color:var(--n-muted);font-weight:var(--n-w-med)}
.n-cmp td.y{color:var(--n-navy);font-weight:var(--n-w-med)}
.n-cmp td.n{color:var(--n-muted)}
@media (max-width:640px){
  .n-cmp,.n-cmp tbody,.n-cmp tr,.n-cmp td,.n-cmp th{display:block}
  .n-cmp thead{display:none}
  .n-cmp tr{border-bottom:1px solid var(--n-line);padding:var(--n-s4) 0}
  .n-cmp td{border:0;padding:2px 0}
  .n-cmp td.y::before{content:"NOCTA — ";font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);color:var(--n-sage-ink)}
  .n-cmp td.n::before{content:"Tira clásica — ";font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);color:var(--n-muted)}
}
```
Se mantiene `<table>` con `<th scope="col">` y `<caption class="n-vh">Parche NOCTA frente a tira de poros</caption>`. El estado nunca se comunica solo con color: cada celda lleva icono **y** texto.

### 2.17 `.n-sheet` — hoja base (drawer, navegación y captación comparten mecánica)

```css
.n-sheet{position:fixed;inset:0;z-index:var(--n-z-drawer)}
.n-sheet__bg{position:absolute;inset:0;background:var(--n-navy-40);opacity:0;
  transition:opacity var(--n-t2) linear}
.n-sheet__panel{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;
  max-height:88svh;background:var(--n-paper);
  border-radius:var(--n-r-lg) var(--n-r-lg) 0 0;box-shadow:var(--n-sh-sheet);
  transform:translateY(100%);transition:transform var(--n-t4) var(--n-e-spring);
  padding-bottom:var(--n-safe-b)}
.n-sheet.is-open .n-sheet__bg{opacity:1}
.n-sheet.is-open .n-sheet__panel{transform:none}
.n-sheet__grip{width:36px;height:4px;border-radius:var(--n-r-pill);background:var(--n-line-2);margin:10px auto 0}
.n-sheet__head{display:flex;justify-content:space-between;align-items:center;
  min-height:56px;padding:0 var(--n-s4);border-bottom:1px solid var(--n-line)}
.n-sheet__body{flex:1;overflow:auto;overscroll-behavior:contain;padding:var(--n-s4)}
.n-sheet__foot{padding:var(--n-s4) var(--n-s4) calc(var(--n-s4) + var(--n-safe-b));
  border-top:1px solid var(--n-line);background:var(--n-bg);display:grid;gap:var(--n-s2)}
body.n-locked{position:fixed;left:0;right:0;width:100%;overflow:hidden}
@media (min-width:900px){
  .n-sheet__panel{left:auto;top:0;bottom:0;width:min(440px,100%);max-height:none;
    border-radius:0;transform:translateX(100%);box-shadow:-24px 0 60px -40px rgba(20,33,61,.35)}
  .n-sheet__grip{display:none}
}
```
API `nSheet` (≈1,0 KB), idéntica para las tres hojas:
```js
let sy=0;
nSheet.lock =()=>{sy=scrollY;document.body.style.top=-sy+'px';document.body.classList.add('n-locked');};
nSheet.unlock=()=>{document.body.classList.remove('n-locked');document.body.style.top='';scrollTo(0,sy);};
nSheet.open =(el,opener)=>{el.hidden=false;nSheet.lock();el._opener=opener||document.activeElement;
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('is-open')));
  (el.querySelector('[autofocus],button,a,input')||el).focus();};
nSheet.close=el=>{el.classList.remove('is-open');nSheet.unlock();
  el.addEventListener('transitionend',()=>{el.hidden=true;el._opener&&el._opener.focus();},{once:true});};
```
Cierre por: velo, botón de cerrar, `Escape`, y **arrastre** del `.n-sheet__grip` o de la cabecera — el panel sigue al dedo con `translateY` y sin transición; se cierra si el recorrido supera **80 px** o la velocidad supera **0,5 px/ms**; si no, vuelve en `--n-t3`. *(Injerto de «NOCTA App»: la única física real de las tres direcciones.)* Mientras hay una hoja abierta, `main` y `footer` reciben `inert`; el foco queda atrapado en el panel.

### 2.18 `.n-drawer` — carrito (usa `.n-sheet`, conserva todos los ids)

```html
<div id="drawer" class="n-drawer n-sheet" role="dialog" aria-modal="true" aria-label="Tu carrito" hidden>
  <div class="n-sheet__bg" id="closecart"></div>
  <div class="n-sheet__panel">
    <span class="n-sheet__grip" aria-hidden="true"></span>
    <div class="n-sheet__head"><b>Tu carrito</b>
      <button class="n-icon" id="closecart2" aria-label="Cerrar carrito">…cerrar…</button></div>
    <div class="n-sheet__body">
      <div class="n-flash" id="cartflash" role="status" aria-live="polite" hidden></div>
      <div class="n-gift" id="giftbar"></div>
      <div id="cartitems"></div>
      <div id="cartupsell"></div>
    </div>
    <div class="n-sheet__foot">
      <div id="carttotal"></div>
      <a class="n-btn n-btn--wide" href="/checkout.html" id="tocheckout">Finalizar compra</a>
      <button class="n-pay" id="cartexpress" data-express-cart data-src="cart"></button>
      <p class="n-lab" style="text-align:center">Pago seguro · Bizum · Tarjeta · Klarna · Garantía 60 días</p>
    </div>
  </div>
</div>
```
```css
.n-flash{background:var(--n-sage-14);border-radius:var(--n-r-sm);padding:10px var(--n-s3);
  margin-bottom:var(--n-s3);font-size:var(--n-fs-sm);color:var(--n-navy);
  opacity:0;transition:opacity var(--n-t3) linear}
.n-flash.is-on{opacity:1}
.n-gift{margin:0 0 var(--n-s4)}
.n-gift .msg{font-size:var(--n-fs-sm);color:var(--n-navy);margin-bottom:6px}
.n-gift .msg b{font-weight:var(--n-w-semi)}
.n-gift .track{height:6px;background:var(--n-line);border-radius:var(--n-r-pill);overflow:hidden}
.n-gift .fill{height:100%;background:var(--n-sage);border-radius:var(--n-r-pill);
  transition:width var(--n-t-bar) var(--n-e),background var(--n-t3) linear}
.n-gift.is-done .fill{background:var(--n-navy)}
.n-gift .labels{display:none}          /* un solo hito visible, no tres a 11 px */
.n-line,.line{display:flex;gap:var(--n-s3);align-items:center;padding:var(--n-s3) 0;
  border-bottom:1px solid var(--n-line)}
.n-line img{width:64px;height:64px;border-radius:var(--n-r-xs);object-fit:cover;background:var(--n-cream)}
.n-line .rm{background:none;border:0;color:var(--n-muted);font-size:var(--n-fs-xs);
  text-decoration:underline;min-height:var(--n-tap);padding:0 4px}
.n-tot,.tot{display:flex;justify-content:space-between;font-size:17px;
  font-weight:var(--n-w-semi);color:var(--n-navy);margin:var(--n-s2) 0 var(--n-s3)}
```
Cambios en `C.render()` (mismo objeto, mismas claves, mismo cálculo):
- **`#giftbar` muestra un solo hito**: «Te faltan **13,05 €** para el envío gratis»; al cruzarlo, «Envío gratis desbloqueado» + clase `is-done` y aparece el siguiente umbral (50 €). Marcado accesible: `role="progressbar" aria-valuemin="0" aria-valuemax="80" aria-valuenow="16.95" aria-valuetext="Te faltan 13,05 € para el envío gratis"`. Fuera `🎉` y `🎁`: etiqueta `<span class="n-lab">Regalo</span>`.
- La línea suscrita añade `<span class="n-lab">Cada 30, 45 o 60 días</span>`.
- **`C.add()` deja de llamar a `toast()`**: rellena `#cartflash` («Añadido: Parches de Nariz») durante 2,5 s. `nToast` se conserva para códigos y errores.
- `#cartupsell`: una sola sugerencia por apertura (`sessionStorage 'n_up'` con el slug ya ofrecido), en `.n-mini` con botón `.n-btn--ghost.n-btn--sm` «Añadir · +32,00 €». **Excepción deliberada:** dentro del carrito **no** hay «Comprar ahora» — descartaría el resto del pedido.

### 2.19 `.n-bbar` — barra inferior fija de compra (`id="sticky"`, alias `.sticky-cta`)

```html
<div class="n-bbar sticky-cta" id="sticky" role="region" aria-label="Comprar">
  <div class="n-wrap n-bbar__in">
    <div class="n-bbar__i"><b id="st-name">Parches de Nariz</b><span class="n-lab" id="st-price">16,95 € · 8 parches</span></div>
    <button class="n-btn n-btn--sm" id="st-add" data-buy="parches-nariz" data-src="sticky">Comprar ahora</button>
  </div>
  <div class="n-wrap n-bbar__pay"><button class="n-pay" id="st-express" data-buy-express="parches-nariz" data-src="sticky"></button></div>
</div>
```
```css
.n-bbar,.sticky-cta{position:fixed;left:0;right:0;bottom:0;z-index:var(--n-z-bar);display:block;
  background:var(--n-bg);border-top:1px solid var(--n-line);box-shadow:var(--n-sh-bar);
  padding:10px 0 calc(10px + var(--n-safe-b));
  transform:translateY(110%);opacity:0;pointer-events:none;
  transition:transform var(--n-t4) var(--n-e),opacity var(--n-t2) linear}
.n-bbar.is-on,.sticky-cta.on{transform:none;opacity:1;pointer-events:auto}
.n-bbar__in{display:flex;align-items:center;gap:var(--n-s3)}
.n-bbar__i{min-width:0;flex:1}
.n-bbar__i b{display:block;font-size:var(--n-fs-sm);font-weight:var(--n-w-med);color:var(--n-navy);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.n-bbar__in .n-btn{flex:0 0 auto;min-width:150px}
.n-bbar__pay{margin-top:8px}
body.n-has-bar{padding-bottom:calc(var(--n-bbar-h) + 56px + var(--n-safe-b))}
@media (min-width:900px){.n-bbar,.sticky-cta{display:none}}
```
**Revelación condicionada** (deja de estar visible desde el píxel 0, que hoy compite con el CTA en flujo):
```js
const bb=document.getElementById('sticky'), anchor=document.querySelector('.n-pdp .n-buy');
new IntersectionObserver(([e])=>{
  bb.classList.toggle('is-on',!e.isIntersecting);
  document.body.classList.toggle('n-has-bar',!e.isIntersecting);
},{threshold:0}).observe(anchor);
```
En `/no-son-puntos-negros.html` se observa el **primer `.n-cta`** en lugar del bloque de ficha; hay que **quitar el `style="display:block"` en línea** de la línea 55 y dejar `class="n-bbar sticky-cta"` (si se deja el estilo en línea, la barra queda invisible con el nuevo modelo).

### 2.20 `.n-toast` — aviso **anclado arriba** *(injerto de «NOCTA App»)*

```css
.n-toast,.toast{position:fixed;top:calc(var(--n-safe-t) + var(--n-s2));left:50%;
  transform:translate(-50%,-12px);opacity:0;pointer-events:none;z-index:var(--n-z-toast);
  background:var(--n-navy);color:var(--n-cream);padding:12px 18px;border-radius:var(--n-r-pill);
  font-size:var(--n-fs-sm);max-width:calc(100% - 32px);
  transition:transform var(--n-t2) var(--n-e),opacity var(--n-t2) linear}
.n-toast.is-on{transform:translate(-50%,0);opacity:1}
```
`toast()` pasa de `style.display` a `classList.add('is-on')` con el mismo temporizador de 1.800 ms, y el nodo lleva `role="status" aria-live="polite" aria-atomic="true"`. Al anclarse arriba desaparece por completo el solape con «Finalizar compra» que las otras direcciones solo mitigaban desplazándolo.

### 2.21 `.n-skel` — carga de imagen sin saltos

```css
.n-skel{position:relative;background:var(--n-cream);overflow:hidden}
.n-skel::after{content:"";position:absolute;inset:0;transform:translateX(-100%);
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);
  animation:n-skel 1.1s var(--n-e-io) infinite}
.n-skel.is-done::after{content:none;animation:none}
.n-skel img{opacity:0;transition:opacity var(--n-t3) linear}
.n-skel.is-done img{opacity:1}
@keyframes n-skel{to{transform:translateX(100%)}}
```
```js
document.addEventListener('load',e=>{const i=e.target;
  if(i.tagName==='IMG'&&i.closest('.n-skel'))i.closest('.n-skel').classList.add('is-done');},true);
document.querySelectorAll('.n-skel img').forEach(i=>{if(i.complete)i.closest('.n-skel').classList.add('is-done')});
```
Se aplica solo a hero y galería de ficha (las tarjetas ya reservan altura con `aspect-ratio`; el CLS medido es 0 y no se toca).

### 2.22 `.n-form` y `.n-methods` — formularios y métodos de pago

```css
.n-form,.form{background:none;border:0;border-radius:0;padding:0}
.n-form label{display:block;margin:var(--n-s4) 0 6px;
  font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);text-transform:uppercase;color:var(--n-muted)}
.n-form input,.n-form select,.n-form textarea{width:100%;min-height:48px;padding:13px var(--n-s3);
  background:var(--n-paper);border:1px solid var(--n-line);border-radius:var(--n-r-sm);
  font:inherit;font-size:var(--n-fs-input);color:var(--n-ink)}
.n-form input:focus,.n-form select:focus,.n-form textarea:focus{
  outline:2px solid var(--n-navy);outline-offset:1px;border-color:var(--n-navy)}
.n-form .n-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--n-s3)}
.n-form .n-check{display:flex;gap:10px;align-items:flex-start;margin:var(--n-s4) 0;
  font-size:var(--n-fs-sm);color:var(--n-ink-2);text-transform:none;letter-spacing:0}
.n-form .n-check input{width:20px;height:20px;min-height:0;flex:0 0 auto;margin-top:2px;accent-color:var(--n-navy)}
.n-methods,.pay{display:grid;gap:var(--n-s2);margin:var(--n-s4) 0}
.n-methods label{display:flex;align-items:center;gap:var(--n-s3);min-height:56px;
  margin:0;padding:0 var(--n-s4);background:var(--n-paper);
  border:1px solid var(--n-line);border-radius:var(--n-r);
  font-size:var(--n-fs-body);color:var(--n-ink);text-transform:none;letter-spacing:0}
.n-methods label.is-on{border-color:var(--n-navy);border-width:1.5px;background:var(--n-cream)}
.n-methods input,.pay input{width:auto!important;min-height:0;accent-color:var(--n-navy)}  /* BUG: hoy heredan width:100% */
```
Textos de los cuatro métodos, sin emojis: «Tarjeta · Visa, Mastercard, Apple Pay y Google Pay» · «Bizum» · «Klarna · 3 plazos sin intereses» · «PayPal».

### 2.23 `.n-chips` — filtros de catálogo

```css
.n-chips,.chips{display:flex;gap:var(--n-s2);overflow-x:auto;scrollbar-width:none;
  position:sticky;top:var(--n-header-h);z-index:29;background:var(--n-bg);
  margin:var(--n-s4) 0 var(--n-s5);padding:var(--n-s2) 0}
.n-chips::-webkit-scrollbar{display:none}
.n-chip,.chip{flex:none;min-height:var(--n-tap);padding:0 16px;background:var(--n-paper);
  color:var(--n-navy);border:1px solid var(--n-line);border-radius:var(--n-r-sm);
  font-size:var(--n-fs-sm);font-weight:var(--n-w-med);
  transition:background var(--n-t2) var(--n-e),border-color var(--n-t2) var(--n-e)}
.n-chip.is-on,.chip.on{background:var(--n-navy);border-color:var(--n-navy);color:var(--n-cream)}
```
Cada chip lleva `aria-pressed`, y junto a la fila hay un contador vivo `<p class="n-lab" aria-live="polite">13 productos</p>` que se actualiza al filtrar.

### 2.24 `.n-foot` — pie editorial *(injerto de «Papel Nocturno»: crema + wordmark gigante)*

```html
<footer class="n-foot"><div class="n-wrap">
  <div><h4 class="n-lab">NOCTA</h4><p class="n-sm n-muted">Parches de hidrocoloide y skincare para poros. Enviamos desde España.</p></div>
  <div><h4 class="n-lab">Tienda</h4><a href="/catalogo.html">Catálogo</a>…</div>
  <div><h4 class="n-lab">Ayuda</h4><a href="/garantia.html">Garantía 60 días</a>…</div>
  <div><h4 class="n-lab">Legal</h4><a href="/legal.html#aviso">Aviso legal</a>…</div>
  <p class="n-foot__legal n-xs">NOCTA · CIF B-00000000 · hola@nocta.es</p>
  <div class="n-foot__mark" aria-hidden="true">nocta</div>
</div></footer>
```
```css
.n-foot,footer{background:var(--n-cream);color:var(--n-ink);border-top:1px solid var(--n-line);
  margin-top:var(--n-s9);padding:var(--n-s8) 0 var(--n-s6);font-size:var(--n-fs-sm)}
.n-foot .n-wrap{display:grid;grid-template-columns:1fr 1fr;gap:var(--n-s5)}
.n-foot h4{margin:0 0 var(--n-s2)}
.n-foot a{display:flex;align-items:center;min-height:var(--n-tap);
  color:var(--n-ink);text-decoration:none;border-bottom:1px solid var(--n-line)}
.n-foot a:hover{color:var(--n-navy);text-decoration:underline;text-underline-offset:3px}
.n-foot__legal{grid-column:1/-1;border-top:1px solid var(--n-line);padding-top:var(--n-s4);color:var(--n-muted)}
.n-foot__mark{grid-column:1/-1;margin-top:var(--n-s6);color:var(--n-navy);opacity:.10;
  font-size:22vw;line-height:.8;letter-spacing:-.05em;font-weight:var(--n-w-med);user-select:none}
@media (min-width:900px){
  .n-foot .n-wrap{grid-template-columns:2fr 1fr 1fr 1fr;gap:var(--n-s7)}
  .n-foot a{min-height:0;line-height:1.9;border:0}
  .n-foot__mark{font-size:14vw}
}
```
Enlaces de 44 px de alto en móvil (hoy 21 px: hallazgo de objetivos táctiles).

### 2.25 `.n-mail` — captación de email (hoja inferior, no bloqueante)

Se conserva **íntegro** el guard `localStorage 'n_popup'`, el `POST /api/subscribe` y el `sessionStorage n_disc` con `HOLA10`. Solo cambia la forma y las guardas de aparición.

```css
.n-mail,.popup{position:fixed;inset:auto 0 0 0;z-index:var(--n-z-popup);display:none;background:none}
.n-mail.is-open,.popup.open{display:block}
.n-mail .box{background:var(--n-paper);border-top:1px solid var(--n-line);
  border-radius:var(--n-r-lg) var(--n-r-lg) 0 0;box-shadow:var(--n-sh-sheet);
  padding:var(--n-s5) var(--n-gutter) calc(var(--n-s5) + var(--n-safe-b));
  width:100%;max-width:none;text-align:left;
  transform:translateY(100%);transition:transform var(--n-t4) var(--n-e-spring)}
.n-mail.is-open .box{transform:none}
@media (min-width:900px){
  .n-mail{inset:0;place-items:center;background:var(--n-navy-40)}
  .n-mail.is-open{display:grid}
  .n-mail .box{max-width:460px;border-radius:var(--n-r-lg);text-align:center;transform:none}
}
```
**En móvil no hay velo**: el resto de la página sigue siendo clicable (hoy `.popup.open` intercepta todos los clics y puede bloquear una compra en marcha). Tres guardas obligatorias, además de las rutas ya excluidas (checkout, gracias, admin):
1. No se muestra si hay una hoja abierta (`document.body.classList.contains('n-locked')`).
2. No se muestra durante las **tres primeras interacciones** del usuario (contador de `pointerdown`). *(Injerto de «NOCTA App».)*
3. En `producto.html` el temporizador sube de 12 s a **20 s**, para no tapar el bloque de compra.

### 2.26 `.n-ck` — banner de cookies (hoy inerte y suelto en `legal.html`)

Se mueve a `layout()` para que funcione en todo el sitio, con guard `localStorage 'n_ck'`, fondo `--n-bg`, filete superior, dos líneas de texto y dos botones de 44 px (`#ckyes` / `#ckno`). No lleva velo, no bloquea la página, `z-index:85`.
```js
if(!localStorage.getItem('n_ck')){ /* pinta #cookiebanner */ }
$('#ckyes').onclick=()=>{localStorage.setItem('n_ck','all');hide();};
$('#ckno').onclick =()=>{localStorage.setItem('n_ck','ess');hide();};
```

---

## 3. BLOQUE DE COMPRA IMPULSIVA — ESPECIFICACIÓN EXACTA

Es el componente central del sistema. Aparece **en las once superficies** donde puede verse un producto: 1) tarjeta de portada, 2) tarjeta de catálogo, 3) hero de portada, 4) ficha, 5) barra inferior fija, 6) upsell de la ficha («Combínalo con»), 7) resultado del quiz (principal y complemento), 8) CTA intercalado del advertorial, 9) CTA de `como-usar.html`, 10) pie del carrito (variante de carrito completo), 11) checkout (arriba del formulario). Única excepción, deliberada: **`#cartupsell` dentro del carrito**, donde solo hay «Añadir».

### 3.1 Marcado canónico

```html
<div class="n-buy">
  <button class="n-btn n-btn--wide" data-buy="parches-nariz" data-qty="1" data-sub="0" data-src="card">
    Comprar ahora
  </button>
  <button class="n-pay" data-buy-express="parches-nariz" data-qty="1" data-sub="0" data-src="card"
          aria-label="Comprar con Apple Pay"></button>
  <button class="n-link n-buy__add" data-add="parches-nariz" data-src="card">Añadir al carrito</button>
  <p class="n-buy__note n-lab">Envío 3,90 € · gratis desde 30 € o llevando 2</p>
</div>
```
```css
.n-buy{display:grid;gap:var(--n-s2);margin-top:var(--n-s3)}
.n-buy__add{justify-self:center}
.n-buy__note{text-align:center;margin:2px 0 0}
.n-buy__cart{display:block;text-align:center;margin:4px 0 0;font-size:var(--n-fs-sm);color:var(--n-muted)}

/* Variante compacta: catálogo y tarjetas de rejilla.
   Dos botones a ancho completo + una sola línea con enlace y nota:
   evita el ruido de tres controles apilados por tarjeta. */
.n-buy--compact{gap:6px}
.n-buy--compact .n-btn{min-height:var(--n-tap);font-size:var(--n-fs-btn-s)}
.n-buy--compact .n-pay{min-height:var(--n-tap);height:var(--n-tap)}
.n-buy--compact .n-buy__foot{display:flex;justify-content:space-between;align-items:center;gap:var(--n-s2)}
.n-buy--compact .n-buy__add{padding:10px 0;justify-self:start}
.n-buy--compact .n-buy__note{text-align:right;margin:0}

/* Variante de barra fija y carrito: en fila */
.n-buy--row{grid-template-columns:1fr auto;align-items:center}
```
Orden **inalterable** en las once superficies: **Comprar ahora → pago exprés → Añadir al carrito → nota**. El primario es el único navy relleno del bloque; el exprés es el único negro; «Añadir» es siempre `.n-link` de 13 px.

### 3.2 Contenido exacto de `.n-buy__note`

Se calcula en cliente con la **misma fórmula** que `C.totals()` (`SHIP.base = 3,90 €`, `SHIP.freeFrom = 30 €`, o `n >= 2`). Nunca se escribe a mano.

| Condición | Texto |
|---|---|
| `price*qty >= 30` o `qty >= 2` | `Envío gratis incluido` |
| resto | `Envío 3,90 € · gratis desde 30 € o llevando 2` |
| `nCart.totals().n > 0` (segunda línea, `.n-buy__cart`, 13 px) | `Compra solo este artículo. Tu carrito (3) sigue guardado.` |

Esa segunda línea es la que cierra el hueco que el jurado señaló: el cliente **lee** que su carrito sobrevive, no solo lo conserva el código.

### 3.3 Interruptores de configuración (cabecera de `app.js`)

```js
const STRIPE_LIVE      = true;  // false mientras no exista STRIPE_SECRET_KEY en Netlify
const EXPRESS_BRANDED  = true;  // false → toda marca de wallet degrada a "Pago rápido"
const BUYNOW_KEEPS_CART= true;  // true → "Comprar ahora" con carrito lleno añade y va a /checkout.html
```
- `EXPRESS_BRANDED` permite retirar Apple Pay / Google Pay de todo el sitio con un booleano si revisión legal lo objeta, sin tocar una línea más. *(Injerto de «NOCTA App».)*
- `BUYNOW_KEEPS_CART` resuelve por diseño la trampa que hunde los flujos exprés: con carrito no vacío, «Comprar ahora» **añade y navega a `/checkout.html`** en lugar de descartar lo ya elegido. El botón de wallet sigue siendo exprés puro de un artículo, y por eso muestra la nota «Compra solo este artículo».
- Si `STRIPE_LIVE` es `false`, **nunca se pinta una marca de wallet** (sería engañoso llevar a un modo demo con la marca de Apple): el botón dice «Pago rápido».

### 3.4 Detección de wallet

```js
const WALLET = (()=>{
  if(!STRIPE_LIVE || !EXPRESS_BRANDED) return 'plain';
  try{ if(window.ApplePaySession && ApplePaySession.canMakePayments && ApplePaySession.canMakePayments()) return 'apple'; }catch(e){}
  if(/Android/i.test(navigator.userAgent) && /Chrome|CriOS/.test(navigator.userAgent) && window.PaymentRequest) return 'google';
  return 'plain';
})();
```
Se ejecuta **una sola vez** al cargar. Ningún botón consulta el navegador por segunda vez.

### 3.5 Generador de marcado del botón exprés

```js
window.nPay = (slug,{qty=1,sub=false,src='card',cart=false}={})=>{
  const attr = cart ? 'data-express-cart' : `data-buy-express="${slug}"`;
  const base = `class="n-pay n-pay--${WALLET}" ${attr} data-qty="${qty}" data-sub="${sub?1:0}" data-src="${src}"`;
  if(WALLET==='apple')  return `<button ${base} aria-label="Comprar con Apple Pay">${SVG_APPLEPAY}</button>`;
  if(WALLET==='google') return `<button ${base} aria-label="Comprar con Google Pay">${SVG_GPAY}</button>`;
  return `<button ${base} aria-label="Pago rápido"><span>Pago rápido</span></button>`;
};
```

### 3.6 CSS del botón exprés (Apple Pay nativo + respaldo)

```css
.n-pay{width:100%;min-height:var(--n-tap);height:48px;border:0;border-radius:var(--n-r-xs);
  background:var(--n-black);color:#fff;display:grid;place-items:center;padding:0;
  transition:opacity var(--n-t2) var(--n-e),transform var(--n-t1) var(--n-e)}
.n-pay:active{transform:scale(.98);opacity:.9}
.n-pay svg{height:20px;width:auto;display:block;fill:#fff}
.n-pay--plain span{font-size:var(--n-fs-btn);font-weight:var(--n-w-med);color:#fff;
  display:inline-flex;align-items:center;gap:8px}

/* Botón nativo de Safari: es la vía canónica y respeta las guías de Apple */
@supports (-webkit-appearance:-apple-pay-button){
  .n-pay--apple{
    -webkit-appearance:-apple-pay-button;
    -apple-pay-button-type:buy;
    -apple-pay-button-style:black;
    --apple-pay-button-border-radius:8px;
    height:48px;width:100%;background:none}
  .n-pay--apple svg{display:none}   /* el respaldo se oculta cuando hay botón nativo */
}

/* Divisor "o rellena tus datos" del checkout */
.n-pay-div{display:flex;align-items:center;gap:12px;margin:var(--n-s3) 0;
  font-size:var(--n-fs-label);letter-spacing:var(--n-ls-label);text-transform:uppercase;color:var(--n-muted)}
.n-pay-div::before,.n-pay-div::after{content:"";flex:1;height:1px;background:var(--n-line)}
```

### 3.7 SVG de respaldo (cuando `-webkit-appearance:-apple-pay-button` no está soportado)

Constantes en `app.js`. **Alto de dibujo 20 px, blanco sobre negro, centrado.** Apple exige un área libre alrededor del logotipo equivalente a la altura de la manzana: por eso el `viewBox` lleva margen y el botón mide 48 px de alto.

```js
const SVG_APPLEPAY = `<svg viewBox="0 0 76 24" height="20" role="img" aria-hidden="true" focusable="false">
  <path fill="#fff" d="M13.2 6.9c-.8 0-1.9-.9-3-.9-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.2 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8 0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.6-.1-2.9.9-3.5.9zM15.6 4.7c.7-.8 1.1-1.9 1-3-.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.7-1.3z"/>
  <text x="27" y="17.5" fill="#fff" font-family="Inter,system-ui,-apple-system,sans-serif"
        font-size="15" font-weight="600" letter-spacing="-.02em">Pay</text>
</svg>`;

const SVG_GPAY = `<svg viewBox="0 0 76 24" height="20" role="img" aria-hidden="true" focusable="false">
  <path fill="#fff" d="M11.6 12.2v3.4H10V7.1h3.1c.8 0 1.5.3 2 .8.6.5.8 1.2.8 1.9 0 .8-.3 1.4-.8 1.9-.5.5-1.2.8-2 .8h-1.5zm0-3.6v2.5h1.6c.5 0 .8-.2 1.1-.5.3-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.3-.6-.5-1.1-.5h-1.6zM19.2 9.7c.9 0 1.6.2 2.1.7.5.5.8 1.1.8 1.9v3.9h-1.5v-.9h-.1c-.4.7-1.1 1-1.9 1-.7 0-1.2-.2-1.7-.6-.4-.4-.7-.9-.7-1.5 0-.6.2-1.1.7-1.5.5-.4 1.1-.6 1.9-.6.7 0 1.2.1 1.7.4v-.3c0-.4-.2-.7-.5-1-.3-.3-.7-.4-1.1-.4-.6 0-1.1.3-1.5.8l-1.3-.8c.6-.8 1.4-1.1 2.6-1.1zm-1.4 4.5c0 .3.1.5.4.7.2.2.5.3.8.3.4 0 .8-.2 1.2-.5.3-.3.5-.7.5-1.1-.4-.3-.9-.4-1.5-.4-.5 0-.8.1-1.1.3-.2.2-.3.5-.3.7z"/>
  <text x="27" y="17.5" fill="#fff" font-family="Inter,system-ui,-apple-system,sans-serif"
        font-size="15" font-weight="600" letter-spacing="-.02em">Pay</text>
</svg>`;
```
**Regla de marca y de honestidad, sin excepción:**
1. En Safari con soporte, manda el **botón nativo**; el SVG queda oculto por CSS.
2. El SVG de arriba es un **respaldo de emergencia**. En cuanto operaciones descargue los assets oficiales (Apple *Marks & Badges*, Google Pay *Brand Guidelines*), se guardan en `/assets/img/applepay.svg` y `/assets/img/gpay.svg` y `SVG_APPLEPAY`/`SVG_GPAY` pasan a `<img src="…" alt="" height="20">`. El resto del sistema no cambia.
3. Sin wallet detectada → **«Pago rápido»**, jamás un wordmark de terceros.
4. El botón exprés **nunca** es más alto ni más ancho que el primario, ni lleva sombra, ni cambia de radio (8 px, exigido por Apple).
5. Requisito de operaciones: para que Stripe Checkout muestre Apple Pay hay que verificar el dominio en Stripe (*Settings → Payment method domains*). Sin eso el botón lleva igualmente a Stripe (tarjeta, Bizum, Klarna, PayPal) y no engaña a nadie, porque en ese caso `WALLET` es `plain`.

### 3.8 Función de compra exprés

```js
async function nBuyRun(items,{via='buy_now',src='btn',btn=null}={}){
  const disc = JSON.parse(sessionStorage.getItem('n_disc')||'null');
  const utm  = JSON.parse(sessionStorage.getItem('n_utm')||'{}');
  const value= items.reduce((a,i)=>{const p=nBySlug(i.slug);return a+(i.sub?p.sub:p.price)*i.qty;},0);
  T.send('begin_checkout',{value,n:items.reduce((a,i)=>a+i.qty,0),via,src,express:1});
  try{
    const r=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({items,code:disc&&disc.code,express:true,pay:via==='buy_now'?'card':'wallet',
        vid:sessionStorage.getItem('n_vid'),sid:localStorage.getItem('n_sid'),utm})});
    const j=await r.json();
    if(j&&j.url){
      sessionStorage.setItem('n_lastorder',JSON.stringify({id:j.orderId,total:j.total,items,express:true}));
      location.href=j.url; return;
    }
    nToast(j&&j.error==='empty'?'Producto no disponible':'No se pudo abrir el pago');
  }catch(e){ nToast('Sin conexión. Inténtalo de nuevo.'); }
}

window.nBuy = (slug,{qty=1,sub=false,src='btn',wallet=false,btn=null}={})=>{
  const p=nBySlug(slug); if(!p) return;
  // Carrito no vacío + "Comprar ahora" (no wallet): no se descarta nada
  if(!wallet && BUYNOW_KEEPS_CART && nCart.get().length){
    nCart.add(slug,qty,sub,src); location.href='/checkout.html'; return;
  }
  return nBuyRun([{slug,qty,sub}],{via:wallet?WALLET:'buy_now',src,btn});
};
window.nBuyCart = (src='cart')=>{
  const items=nCart.get(); if(!items.length) return nToast('Tu carrito está vacío');
  return nBuyRun(items,{via:'wallet_cart',src});
};
```

### 3.9 Delegación (en el listener de clic ya existente de `app.js`)

Se inserta **después** de la rama `[data-add]` y **antes** de la de `select_item`:

```js
const b=e.target.closest('[data-buy],[data-buy-express],[data-express-cart]');
if(b){
  e.preventDefault();
  if(b.dataset.busy) return;                    // guard antidoble-pulsación EXPLÍCITO
  b.dataset.busy='1'; b.setAttribute('aria-busy','true');
  const done=()=>{delete b.dataset.busy;b.removeAttribute('aria-busy')};
  const opts={qty:+(b.dataset.qty||1),sub:b.dataset.sub==='1',src:b.dataset.src||'btn',btn:b};
  const run = b.hasAttribute('data-express-cart') ? nBuyCart(opts.src)
            : nBuy(b.dataset.buy||b.dataset.buyExpress,{...opts,wallet:b.hasAttribute('data-buy-express')});
  Promise.resolve(run).finally(done);
  return;
}
```
**No se usa `document.activeElement`** para deshabilitar el botón: en Safari iOS un toque no siempre da foco y `activeElement` puede ser `<body>`, con lo que el guard no se aplicaría y el usuario podría lanzar dos checkouts. Aquí el botón llega explícitamente por `e.target.closest`, y el estado vive en `data-busy` + `aria-busy`. *(Este es el fallo concreto que el jurado detectó en la ruta crítica de «NOCTA App».)*

### 3.10 Integración con el servidor (verificada, sin cambios en Netlify)

- `netlify/functions/checkout.js` reconstruye los precios por `slug` desde `catalog.js`, **ignora campos desconocidos** (`express`), acepta `pay` como texto libre y calcula el envío con la misma regla (`>= 30 €` o `n >= 2`). `email`, `name` y `address` son opcionales: Stripe Checkout los recoge y ya hay `shipping_address_collection` para ES/PT.
- Sin `STRIPE_SECRET_KEY` devuelve `/gracias.html?o=…&demo=1`: el flujo exprés degrada solo.
- **Se escribe siempre `n_lastorder`**; si no, `gracias.html` no dispara `purchase` y se pierde el ingreso en `/admin`.
- **Una línea obligatoria en `gracias.html`**: cambiar `localStorage.removeItem('n_cart')` por
  `if(!last.express) localStorage.removeItem('n_cart');`
  para no vaciar un carrito que el cliente no ha comprado. El evento `purchase` sigue disparándose igual.

---

## 4. WIREFRAMES MÓVILES (390 × 844) — ORDEN EXACTO DE BLOQUES

Gutter 20 px. Aire entre secciones 48 px. Convención: cada línea numerada es un bloque en orden de aparición; `[fijo]` significa fuera del flujo.

### 4.1 `index.html` — Portada

1. `.n-bar` (30 px, un mensaje en móvil).
2. `[fijo]` `.n-top` sticky (56 px).
3. **Imagen del hero a sangre**, `aspect-ratio:5/4` (390 × 312), `parches-nariz-cut.webp`, `fetchpriority="high"`, con `.n-skel`, y pie `.n-lab` «8 parches · 2,12 € por parche».
4. `.n-lab` «Parches de hidrocoloide coreano».
5. `h1.n-d1` 36 px, dos o tres líneas (titular actual).
6. `.n-lead` 17 px, máximo tres líneas.
7. `.n-price.n-price--lg` 24 px + `.n-price__u`.
8. **`.n-buy`** de `parches-nariz` (Comprar ahora → wallet → Añadir → nota).
9. `.n-trust` + enlace «Cómo funciona la garantía de 60 días».
10. `.n-data` (9 de 10 · 6-8 h · 0 tirones) en filas horizontales.
11. **Parches** (`#productos`): `h2` + `.n-lead` + `#grid-parches` con 5 `.n-card` en una columna, cada una con su `.n-buy`.
12. **El método de dos pasos**: `h2` + imagen a sangre 3:2 (`como-se-pone.webp`) + `.n-steps` 01-04 + `.n-buy` de `duo-poros` (44,00 € con `<s>48,95 €</s>`, «Ahorras 4,95 €», línea Klarna 3 × 14,67 €).
13. **Comparativa**: `h2` + `.n-cmp` en modo lista (5 filas).
14. **Skincare** (`#skincare`): `h2` + 5 `.n-card`.
15. **Packs** (`#packs`): `h2` + 3 `.n-card` (imagen 4:5, ahorro real).
16. **Opiniones**: `h2` + 3 `.n-quote` + `.n-link` «Ver las 1.200 opiniones».
17. **Teaser del advertorial**: banda a sangre navy, `.n-lab` crema, titular 22 px, botón fantasma invertido → `/no-son-puntos-negros.html`.
18. **FAQ**: `.n-acc` con las 4 preguntas actuales, cerradas.
19. **Cierre**: `.n-buy` de `parches-nariz` + `.n-link` al catálogo.
20. `.n-foot` + wordmark gigante.

**Comprobación de pliegue** (390 × 844): 30 + 56 + 312 + 24 + 14 + 115 + 12 + 79 + 16 + 41 + 12 + 104 = **815 px**. El botón «Comprar ahora» y el de wallet quedan completos dentro de la primera pantalla, **después** de la imagen.

### 4.2 `catalogo.html`

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab` «Catálogo» → `h1.n-d2` «Todo NOCTA en una página» → `.n-lead` (2 líneas).
4. `[sticky]` `.n-chips` bajo la cabecera: Todos · Parches · Skincare · Packs + contador `.n-lab` «13 productos» con `aria-live`.
5. `#grid-catalogo`: 13 `.n-card.n-card--row` (imagen 116 px a la izquierda; nombre, subtítulo, valoración y precio a la derecha) con **`.n-buy.n-buy--compact`**: dos botones a ancho completo y una sola fila con «Añadir al carrito» a la izquierda y la nota de envío a la derecha. Nada se oculta: subtítulo, precio por parche y financiación siguen visibles.
6. Cierre: «¿No sabes por dónde empezar?» + botón fantasma «Hacer el test de piel» + enlace al advertorial.
7. `.n-foot`.

> Cambio obligatorio: la regla en línea `.grid.c4>a[hidden]{display:none}` pasa a la global `[hidden]{display:none!important}`, porque las tarjetas ya no son `<a>`.

### 4.3 `producto.html?p=…` — Ficha

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. Migas `.n-lab` «Parches / Nariz» (20 px).
4. **`.n-gal`** dentro del gutter, `aspect-ratio:1` (350 × 350), packshot primero, vídeo segundo, puntos y contador «1/4».
5. `.n-lab` categoría + `.n-badge` si existe.
6. `h1.n-d2` 26 px (dos líneas).
7. Valoración: estrellas `--n-sage-ink` + `4,8` + enlace «312 opiniones» → `#opiniones`.
8. `.n-price.n-price--lg` + `.n-price__u` «8 parches · 2,12 € por parche · IVA incluido» + `.n-klarna` si ≥ 35 €.
9. **Promesa**: primera oración de `p.desc`, 15 px, dos líneas. El resto de `desc` baja al acordeón «Qué es».
10. **`.n-tiers`** (1 / 2 / 3 cajas, bandera «Lo más elegido» sobre la de 2).
11. **`.n-buy`**: `#addbtn` pasa a ser **«Comprar ahora · 16,95 €»** (`data-buy`), debajo el wallet (`#pdpexpress`), debajo `.n-link` «Añadir al carrito» (mantiene `nCart.add(slug,qty,sub,'pdp')` y `#addprice`), debajo la nota.
12. **`.n-opts`**: Compra única / Suscripción −15 % (nunca preseleccionada), justo bajo el CTA.
13. `.n-trust` + enlace a garantía.
14. `.n-data` con `p.claims` (ahora **por debajo** del CTA; antes empujaba el botón a 1.976 px).
15. `.n-spec`: formato, precio por parche, tiempo de uso, material, referencia (`p.sku`).
16. Bullets de `p.bullets` como lista con filete (máx. 5).
17. **Vídeo de 6 s** a sangre con póster y etiqueta `.n-lab` «Vídeo · 6 s».
18. `.n-steps` con `p.how` + enlace «Ver la guía completa →».
19. **`.n-acc`** cerrado: «Qué es» · «Qué lleva y qué no lleva» · «Cómo se pone (con vídeo)» · «¿Y si no se me pega?» · «Cuándo llega y cómo lo devuelvo» · resto de `p.faq`.
20. `#opiniones`: 3 `.n-quote` + `.n-btn--ghost.n-btn--sm` «Ver las 312 opiniones» (despliega, no cambia de página).
21. **«Combínalo con»**: `p.upsell` en `.n-mini`, cada uno con «Comprar ahora» + «Añadir».
22. `.n-link` «Ver catálogo completo →».
23. `.n-foot`.
24. `[fijo]` `.n-bbar` (aparece cuando el bloque 11 sale de pantalla) con nombre, precio y «Comprar ahora» + fila de wallet.

**Comprobación de pliegue**: 86 (barra + cabecera) + 28 (migas) + 350 (galería) + 14 (puntos) + 16 + 14 (`n-lab`) + 60 (H1) + 24 (valoración) + 45 (precio + unidad) + 60 (promesa) + 16 + 68 (escalera) + 12 = **793 px**; el botón primario de 52 px cierra en **830 px**, dentro de la primera pantalla. Hoy está a 1.976 px.

> Se conservan obligatoriamente los ids `#mainimg #mainvid #qm #qv #qp #addbtn #addprice #st-name #st-price #st-add`, que el script final de la página busca por id. `#st-add` **no se retira** (retirarlo fue el contrato roto de «NOCTA App»); cambia su texto a «Comprar ahora» y gana `data-buy`.

### 4.4 `checkout.html` (`<body class="n-checkout">`)

1. Cabecera reducida: logo centrado, sin menú ni carrito, con `.n-lab` «Pago seguro». `.n-bar` oculta en esta página.
2. `.n-lab` «Paso 1 de 2 · Datos y pago».
3. **Resumen plegable** `<details class="n-sumfold">` cerrado: «Tu pedido · **33,90 €**»; dentro, `#sum`, `#sumtot`, `#giftmsg`, `#cartupsell`.
4. **Pago exprés arriba**: `.n-pay` a ancho completo (`data-express-cart`, carrito entero) + `.n-pay-div` «o rellena tus datos».
5. `#cof`: Email → Nombre / Apellidos (`.n-row`) → Dirección → CP / Ciudad (`.n-row`) → País / Teléfono (`.n-row`). Campos de 48 px, etiquetas en versalitas, `autocomplete` completo, `inputmode="numeric"` en CP, `enterkeyhint="next"`.
6. `<details>` «¿Tienes un código de descuento?» + campo + `#applycode` (44 px).
7. `h2` «Pago» + `.n-methods` (4 filas de 56 px, radios corregidos con `width:auto`).
8. `.n-check` de condiciones (20 × 20).
9. Aviso de suscripción **solo si hay líneas `sub`**: «Se te cobrarán 14,41 € cada 30, 45 o 60 días hasta que canceles. Puedes cancelar o saltar un envío desde el email de cada pedido.» (12 px, `aria-describedby` del botón).
10. `#paybtn` «Pagar de forma segura» + nota legal de 12 px.
11. `.n-trust` en una línea.
12. `[fijo]` `.n-bbar` con «Total 33,90 €» a la izquierda y «Pagar» a la derecha, cuando `#paybtn` sale de pantalla.
13. Pie reducido: Aviso legal · Privacidad · Cookies · Contacto.

### 4.5 `gracias.html`

1. Cabecera reducida, `.n-bar` oculta, sin popup.
2. Marca de éxito: círculo de 48 px `--n-sage-28` con el icono *check* en navy (fuera `🌙` y `✅`).
3. `h1.n-d2` «Gracias. Tu pedido está en marcha» + `.n-spec` de 3 filas: Pedido `NC…` (`#oid`) / Email / Salida del almacén «24 h laborables». Aviso de demo en `--n-alert-ink` si `?demo=1`.
4. **Oferta post-compra `#upsell`**: bloque crema con filete, `.n-lab` «Solo ahora · se añade a tu pedido», titular 22 px, packshot `exfoliante-salicilico-cut.webp` a 220 px, `22,40 €` con `<s>32 €</s>`, `#upyes` primario de 52 px, `#upno` como `.n-link`, `#cd` en `.n-lab` con `tabular-nums` (sin rojo agresivo: cifra en navy).
5. «Mientras llega»: `.n-steps` 01-04 — **corregir el `</b>` huérfano del `<h3>` del paso 2**.
6. `.n-btn--ghost` «Ver la guía completa» → `/como-usar.html`.
7. `.n-foot`.

### 4.6 `quiz.html`

1. Cabecera de flujo: `←` Atrás (`ans.pop()`) · «Test de piel» · `×` Salir (a `/`).
2. `.n-progress` de 6 px (filete `--n-line`, relleno navy, `--n-r-pill`, transición 220 ms) + `.n-lab` «Pregunta 2 de 4».
3. `h2.n-d3` con la pregunta.
4. Respuestas: filas de 56 px con filete inferior, texto 15 px a la izquierda, chevron a la derecha; pulsación con `--n-sage-14`.
5. Paso email: `h2` + texto + campo de 48 px + botón + `.n-link` «Ver sin dejar email».
6. Resultado: `.n-lab` «Tu rutina» + `h2` (sin emoji) + tarjeta principal con **`.n-buy` completa** + complemento en `.n-mini` con «Comprar ahora» y «Añadir» + `.n-trust` + `.n-btn--ghost` «Ir al carrito».
7. `.n-foot`.

### 4.7 `no-son-puntos-negros.html` — Advertorial

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab.n-lab--alert` «Guía · 3 minutos de lectura».
4. `h1.n-d1` 36 px.
5. Firma `.n-lab` + fecha.
6. Imagen de apertura a sangre 3:2.
7. Cuerpo `.n-read` (17 px / 1,7, ancho `--n-measure`), `h2` con filete superior, imágenes intercaladas a sangre con pie `.n-lab`.
8. **Tres `.n-cta` intercalados**: banda crema con packshot de 88 px, nombre, precio y **`.n-buy`** (conservando `nTrack('advertorial_cta',{pos:…})`).
9. FAQ `.n-acc`.
10. `.n-foot`.
11. `[fijo]` `.n-bbar` activada al pasar el primer `.n-cta` (nunca desde el píxel 0).

### 4.8 `como-usar.html`

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab` «Guía de uso» + `h1.n-d2` + `.n-lead`.
4. Índice de anclas: 5 filas de 44 px con filete.
5. Por producto: `h2` + vídeo de 6 s (póster, `preload="none"`, autoplay por visibilidad) + `.n-steps` con `p.how` + `.n-spec` (tiempo, frecuencia) + `.n-buy` de ese producto.
6. Bloque «Errores frecuentes» en `.n-acc`.
7. `.n-cta` final + `.n-foot`.

### 4.9 `garantia.html`

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab` «Garantías NOCTA» + `h1.n-d2` «Garantía de 60 días» + `.n-lead`.
4. `.n-steps` 01/02/03 con las tres garantías actuales (resultados 60 días · adhesión · desistimiento 14 días).
5. Qué cubre / qué no: dos listas con icono *check* navy y icono *cerrar* en `--n-alert`, **siempre con texto** (nunca solo color).
6. `.n-spec`: Plazo / Qué necesitas / Respuesta «menos de 24 h laborables».
7. Formulario `#gf` con el estilo de checkout (etiquetas en versalitas, campos de 48 px, subida de fotos como `.n-btn--ghost`). **No cambiar el formato de `src`** (`'garantia:'+type+':'+order`): hay parsing manual detrás.
8. Confirmación en línea con `role="status"`: bloque `--n-sage-14` + icono *check*.
9. `.n-acc` de dudas + `.n-foot`.

### 4.10 `ciencia.html` y `sobre.html` — Plantilla «documento»

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab` + `h1.n-d2` + `.n-lead` + firma.
4. Cuerpo `.n-read`, `h2` con filete superior, citas en 13 px `--n-muted`.
5. En `ciencia.html`: referencias como lista numerada de 13 px con filetes + `.n-spec` de composición.
6. `.n-cta` de cierre con `.n-buy` de `parches-nariz`.
7. `.n-foot`.

### 4.11 `envios-devoluciones.html`

Igual que 4.10, con: `.n-spec` de costes (Envío estándar 3,90 € / Gratis desde 30 € o 2 unidades / Plazo 24-48 h), tabla de plazos convertida en lista con filete (Zona · Plazo · Coste en tres líneas por zona), `.n-steps` 01-04 del proceso de devolución, `h2` de desistimiento y garantía, `.n-cta` final.

### 4.12 `contacto.html`

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `.n-lab` «Estamos aquí» + `h1.n-d2` + `.n-lead`.
4. `.n-spec`: Email `hola@nocta.es` / Respuesta «menos de 24 h laborables» / Horario.
5. Formulario `#cf` (mismo endpoint y **mismo string concatenado de `src`**).
6. Confirmación en línea.
7. Enlaces a Garantía · Envíos · FAQ.
8. `.n-foot`.

### 4.13 `legal.html`

1. `.n-bar` · 2. `[fijo]` `.n-top`.
3. `h1.n-d2` «Información legal».
4. `[sticky]` `.n-chips` de anclas: Aviso · Envíos · Privacidad · Cookies.
5. Secciones con `h2` + filete, cuerpo 15 px / 1,65 en `--n-measure`.
6. `.n-foot`.
   (El `#cookiebanner` deja de vivir aquí como marcado suelto: pasa a `layout()` con sus dos listeners, hoy inexistentes.)

### 4.14 `admin/index.html`

**No se toca.** No carga `app.js`; es interno y `noindex`.

---

## 5. SISTEMA DE MOVIMIENTO

**Principio:** el movimiento describe una relación espacial (algo entra desde donde está anclado) o confirma un toque. Nada decorativo. Solo `transform` y `opacity`; jamás `height`, `top` o `box-shadow` animados — con **una sola excepción declarada**: el `width` de la barra de regalos, porque ahí el ancho *es* el dato.

### 5.1 Utilidades (nombres cerrados; no se inventan otros)

| Utilidad | Qué hace |
|---|---|
| `.n-reveal` / `.n-reveal.is-in` | Aparición al entrar en viewport: `opacity 0→1` + `translateY(8px→0)` |
| `.n-stagger > *` | Escalonado por `--i` dentro de un grupo, **tope 4 elementos** |
| `.n-press` | Retorno táctil `scale(.98)` en `:active` (ya incluido en `.n-btn` y `.n-pay`) |
| `.n-skel` / `.is-done` | Esqueleto y fundido de imagen |
| `.n-bump` | Rebote del contador de carrito |
| `.is-open` | Estado abierto de hojas, drawer, navegación y acordeón |
| `.is-on` | Estado activo de barra fija, toast, chips, puntos, tiers y opciones |

```css
.n-reveal{opacity:0;transform:translateY(8px);
  transition:opacity var(--n-t3) var(--n-e),transform var(--n-t3) var(--n-e)}
.n-reveal.is-in{opacity:1;transform:none}
.n-stagger>*{transition-delay:calc(min(var(--i,0),3) * 60ms)}
.n-bump{animation:n-bump var(--n-t3) var(--n-e-spring)}
@keyframes n-bump{50%{transform:scale(1.16)}}
```
```js
const RM = matchMedia('(prefers-reduced-motion:reduce)');
if(!RM.matches){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return;
    e.target.classList.add('is-in'); io.unobserve(e.target);
  }),{rootMargin:'0px 0px -12% 0px'});
  document.querySelectorAll('.n-reveal').forEach((el,i)=>{
    if(el.getBoundingClientRect().top < innerHeight){ el.classList.add('is-in'); return; } // nunca sobre el pliegue
    el.style.setProperty('--i', i % 4); io.observe(el);
  });
}else document.querySelectorAll('.n-reveal').forEach(el=>el.classList.add('is-in'));
```
Reglas de uso: **nunca** en contenido por encima del pliegue (protegería el LCP), nunca sobre secciones enteras, máximo 4 elementos escalonados por grupo (60 ms de retardo, tope 180 ms), una sola vez por elemento (`unobserve`).

### 5.2 Tabla de movimiento (disparo, propiedad, duración, easing)

| Elemento | Propiedad | Duración | Easing | Disparo |
|---|---|---|---|---|
| `.n-btn`, `.n-pay`, `.n-chip`, `.n-tier`, `.n-opt` | `transform:scale(.98)` | `--n-t1` 140 ms | `--n-e` | `:active` (al tocar) |
| `.n-btn:hover` | `opacity .93` | `--n-t2` | `--n-e` | solo `@media (hover:hover)` |
| `.n-card`, `.n-opt`, `.n-tier` | `border-color`, `background` | `--n-t2` | `--n-e` | cambio de estado |
| `.n-reveal` | `opacity` + `translateY(8px)` | `--n-t3` 220 ms | `--n-e` | `IntersectionObserver`, `-12%`, una vez |
| Drawer, `.n-nav`, `.n-mail` | `translateY(100%)→0` (X en ≥900) | `--n-t4` 260 ms | `--n-e-spring` | `.is-open` tras doble rAF |
| Velo de hoja | `opacity` | `--n-t2` | lineal | `.is-open` |
| Arrastre de hoja | `translateY` con el dedo | — | sin transición | `pointermove`; suelta > 80 px o > 0,5 px/ms |
| `.n-bbar` | `translateY(110%)→0` + `opacity` | `--n-t4` / `--n-t2` | `--n-e` | `IntersectionObserver` sobre `.n-pdp .n-buy` |
| `.n-toast` | `translateY(-12px)→0` + `opacity` | `--n-t2` 180 ms | `--n-e` | `toast()`, 1.800 ms |
| `#cartcount` | `scale(1→1.16→1)` | `--n-t3` | `--n-e-spring` | clase `.n-bump` al cambiar; se retira en `animationend` |
| `.n-gift .fill` | `width` *(única excepción)* | `--n-t-bar` 400 ms | `--n-e` | `C.render()` |
| `.n-acc` | `grid-template-rows 0fr→1fr` | `--n-t3` | `--n-e-io` | clase `.is-open` (§2.14) |
| `.n-acc summary::after` | `rotate(45°→-135°)` | `--n-t2` | `--n-e` | `[open]` |
| Puntos de galería | `background` + `scale(1.2)` | `--n-t2` | `--n-e` | `IntersectionObserver` sobre slides |
| Imágenes | `opacity 0→1` + barrido | `--n-t3` / 1,1 s | `--n-e` / `--n-e-io` | `load` |
| Vídeos | `play()` / `pause()` | — | — | `IntersectionObserver` `threshold:.6` |
| Filtro de catálogo | `opacity` | `--n-t2` | lineal | click en chip (nunca animar altura: CLS) |

Prohibido: parallax, rebotes largos, entradas laterales de contenido, animar secciones completas, `animation` en bucle salvo el barrido del esqueleto, y cualquier movimiento por encima de 300 ms (excepto la barra de regalos, 400 ms).

### 5.3 Movimiento reducido (bloque global; hoy no existe ninguno)

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
  .n-reveal{opacity:1!important;transform:none!important}
  .n-skel::after{content:none}
  .n-gal__track{scroll-snap-type:none}
}
```
Y en JS: si `RM.matches`, los vídeos **no** hacen autoplay (se quedan en el póster y **se les añade `controls`**), el observador de aparición marca todo visible de inmediato y las hojas siguen abriéndose y cerrándose (el estado debe cambiar), simplemente sin recorrido.
**Nunca `video{display:none}`**: ocultaría también el póster y dejaría un hueco vacío (fallo verificado en «NOCTA App»).

---

## 6. ACCESIBILIDAD (objetivo Lighthouse ≥ 95 y AA real)

### 6.1 Contraste — valores calculados, no estimados

| Par | Ratio | Uso |
|---|---|---|
| `--n-navy` sobre `--n-cream` | **13,92:1** | Texto principal |
| `--n-navy` sobre `--n-bg` | **15,05:1** | Texto sobre fondo de página |
| `--n-cream` sobre `--n-navy` | **13,92:1** | Botón primario, barra superior |
| `--n-ink-2` sobre `--n-cream` | **8,70:1** | Cuerpo de artículo |
| `--n-muted` #5F5C55 sobre `--n-bg` | **6,28:1** | Meta y captions |
| `--n-muted` sobre `--n-cream` | **5,81:1** | Meta sobre bandas tintadas |
| `--n-sage-ink` #576D5B sobre `--n-cream` | **4,89:1** | Salvia legible (estrellas, acentos) |
| `--n-sage-ink` sobre `--n-bg` | **5,28:1** | ídem |
| `--n-alert-ink` #A03B28 sobre `--n-bg` | **6,28:1** | Kicker, urgencia |
| `--n-ok-ink` #22794A sobre `--n-bg` | **5,07:1** | Confirmaciones |
| `--n-sage` #9FB3A1 sobre crema | **1,88:1** | **Prohibido como texto y como trazo de icono** |

Consecuencias operativas: se sustituye globalmente `#6b6b6b` (5,0:1, hoy incrustado en más de treinta sitios de `public/*.html` y `app.js`) por `var(--n-muted)`; el antiguo `#c8553d` como texto pasa a `--n-alert-ink`; los iconos de `.n-trust` van en **navy**, no en salvia; `--n-sage-ink` es el único verde textual y su valor se ha elegido para pasar AA sobre **las tres** superficies (papel, crema y fondo).

### 6.2 Reglas obligatorias

1. **Objetivos táctiles ≥ 44 × 44 px sin excepción.** Correcciones concretas frente al estado actual: `.n-qty button` 38 → 44; enlaces del pie 21 → 44; `.n-chip` 40 → 44; `.n-link` con `min-height:44px`; cierre de hojas y popup 44; `.rm` del carrito 44; filas del quiz 56; `.n-tier` 68; `.n-opt` 64. Objetivo: **0 elementos por debajo de 44 px** (hoy 18-35 por página).
2. **Foco visible siempre**: `outline:2px solid var(--n-focus)` con `offset:2px` (3 px y anillo en botones). Ningún `outline:none` sin sustituto.
3. **Diálogos** (drawer, `.n-nav`, `.n-mail`): `role="dialog"`, `aria-modal="true"`, etiqueta accesible, cierre con `Escape`, trampa de foco cíclica, `inert` sobre `main` y `footer` mientras están abiertos, y foco devuelto al disparador.
4. **Estados anunciados**: `#toast` con `role="status" aria-live="polite" aria-atomic="true"`; `#cartflash` igual; el botón de carrito actualiza su `aria-label` («Abrir carrito, 3 artículos»); la barra de regalos es `role="progressbar"` con `aria-valuemin/max/now` y **`aria-valuetext`** en español; el recuento del filtro de catálogo se anuncia con `aria-live`; los botones de compra llevan `aria-busy` mientras se llama a `/api/checkout`.
5. **Jerarquía**: un solo `<h1>` por página, sin saltos de nivel; `<main id="main">` en todas; `<nav aria-label>` distinto para principal, hoja de menú, pie y anclas legales; **skip link** `.n-skip` como primer elemento del `<body>`.
6. **Enlaces e imágenes**: la media de la tarjeta lleva `tabindex="-1" aria-hidden="true"` (el enlace real es el del título con `::after` estirado); `alt` descriptivo solo en la imagen principal de la ficha y en los packshots de hero («Parches de Nariz NOCTA, caja de 8»); `alt=""` en decorativas y en las que duplican un enlace ya etiquetado.
7. **Estrellas**: `role="img"` con `aria-label="4,8 sobre 5 según 312 opiniones"`; los glifos quedan ocultos al lector.
8. **Formularios**: cada `<label>` con `for` y cada campo con `id` (hoy hay `<label>` sin asociar en checkout, garantía y contacto); `autocomplete` completo (`email, given-name, family-name, street-address, postal-code, address-level2, country, tel`); `inputmode` y `enterkeyhint`; errores en **texto** junto al campo con `aria-describedby`, nunca solo en color; **`font-size:16px` obligatorio** en todo `input/select/textarea` para impedir el zoom automático de iOS.
9. **Semántica de contenido**: `.n-trust` es `<ul>`; `.n-steps` es `<ol>`; la comparativa mantiene `<table>` con `<th scope="col">` y `<caption class="n-vh">`; los chips llevan `aria-pressed`.
10. **Vídeo**: siempre `muted playsinline`, sin información exclusiva en el audio; con movimiento reducido se muestran los `controls`.
11. **Idioma y formato**: `lang="es"` (ya presente), coma decimal, espacio fino antes de `€ % h mm ml`, comillas «…».
12. **Zoom**: sin `maximum-scale`; el diseño aguanta 200 % de zoom de texto (contenedores flexibles y `--n-measure` en `ch`).

---

## 7. RENDIMIENTO

### 7.1 Presupuestos duros

| Recurso | Hoy | Techo | Estimación tras el rediseño |
|---|---|---|---|
| `/assets/css/styles.css` | 13.005 B | **22.528 B** | ≈ 20,4 KB |
| `/assets/js/app.js` | 15.246 B | **28.672 B** | ≈ 20,8 KB |
| `/assets/js/products.js` | 17.931 B | sin cambios | 17,9 KB |
| Ficha completa (móvil) | 971 KB | **≤ 350 KB** | ≈ 330 KB |
| Portada (móvil) | 153 KB | ≤ 180 KB | ≈ 165 KB |

**Reparto del CSS** (KB): reset + tokens 1,6 · tipografía y utilidades 1,1 · cabecera y navegación 2,0 · botones y wallet 1,3 · tarjetas 1,7 · hero y secciones 1,3 · ficha 2,2 · hojas y carrito 2,1 · formularios y checkout 1,5 · artículo y quiz 1,1 · toast, popup y cookies 0,8 · pie 0,7 · movimiento y utilidades 0,8 · media queries 1,6 · puente de compatibilidad 0,6 = **20,4 KB**.

**Reparto del JS añadido** (KB sobre los 15,2 actuales): compra exprés + wallet 1,7 · `nCard` y helpers 1,0 · hoja de navegación 0,7 · `nSheet` con foco y arrastre 1,1 · acordeón 0,3 · `.n-reveal` 0,4 · esqueleto 0,2 · cookies 0,4 = **≈ 20,8 KB**. La galería con snap (0,6 KB) vive en `producto.html`, no en `app.js`.

### 7.2 Reglas de CSS que se borran (para que el presupuesto sea verificable, no aspiracional)

`.claim` navy relleno · `.step` con caja · `.card:hover{box-shadow;transform}` · `.hero .img{box-shadow}` · `.proof span::before{content:"✓ "}` · `.btn{border-radius:999px}` y su `translateY(-1px)` de hover · `.testi` con caja pesada · `.compare` con fondo y bordes completos · `.trust` con tres cajas y su `@media(max-width:560px){grid-template-columns:1fr}` · `.thumbs` en móvil · `.badge` absoluto sobre imagen en ficha · `.faq details` con caja · `.gift .labels` con tres hitos · duplicados de `.badge` · pesos 700 y 800 · la regla en línea `.grid.c4>a[hidden]`. Ahorro medido: ≈ 1,5 KB.

### 7.3 Imágenes

- **WebP en todas partes**: existe la hermana `.webp` de cada `.jpg` y hoy **no se usa ninguna**. Ahorros reales medidos: `parches-nariz` 44.206 → 14.170 B (−68 %), `gama` 182.391 → 65.174 B (−64 %), `como-se-pone` 207.575 → 66.014 B (−68 %), `lifestyle-noche` 179.041 → 54.154 B (−70 %).
- **Recortes sobre crema** `-cut.webp` (fondo transparente, 1200 × 1200, 38-71 KB) en tarjetas, hero, packs y upsell: es el rasgo de laboratorio más barato del sistema. Excepciones: `gama-cut.webp` es 1167 × 1600 y `parches-nariz-dorso-cut.webp` 1515 × 1515.
- **Dimensiones reales obligatorias** en cada `<img>`: 1200 × 1200 en packshots y recortes; 1128 × 1400 en `gama`, `lifestyle-noche` y `unboxing`; 1046 × 1400 en `como-se-pone`; 1167 × 1600 en `gama-cut`. Más `aspect-ratio` en el contenedor. **CLS medido hoy = 0: no romperlo.**
- `loading="lazy" decoding="async"` en todo, **salvo** el LCP de cada página (hero de portada, primer slide de la ficha), que lleva `fetchpriority="high"` y **nunca** `loading="lazy"`.
- La ruta `.webp` se deriva en tiempo de ejecución con `nImg()`: **`products.js` no se toca**.

### 7.4 Vídeo

`muted loop playsinline preload="metadata" disablepictureinpicture`, `poster` = `.webp` del mismo slug, **sin atributo `autoplay`**: arranca y para con `IntersectionObserver` al 60 % de visibilidad. Se elimina el `<video>` duplicado de la miniatura (hoy descarga el archivo dos veces: 138 KB de más en `parches-nariz`). Opcional de alto retorno: generar `.webm` VP9 junto al `.mp4` y servir doble `<source>` (−30 % sobre 90-173 KB por archivo).

### 7.5 Fuentes, scripts y varios

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<meta name="theme-color" content="#FAF8F3">
```
En **las 15 páginas**, en este orden exacto. Se cae el peso 700. El `preconnect` a `fonts.gstatic.com` falta hoy en todas. El favicon (luna navy sobre crema) elimina el 404 de `/favicon.ico` en cada carga.

- Un solo archivo CSS, sin `@import`, en `<head>`. Dos JS: `products.js` (bloqueante) + `app.js` (`defer`). Cero librerías, cero frameworks: **4 peticiones críticas**.
- Un único listener de `scroll` en todo el sitio (el de profundidad de `T`, ya `passive`); galería, aparición, barra fija y vídeo usan `IntersectionObserver`.
- `content-visibility:auto` en las secciones por debajo del pliegue de portada y advertorial.
- `producto.html` añade un `<script type="application/ld+json">` con `Product` + `AggregateRating` + `offers` construido desde `products.js`, y un `<noscript>` con nombre, precio y enlace al catálogo. No cambia URLs ni datos.
- **Prohibido el desbordamiento horizontal**: `document.scrollingElement.scrollWidth === innerWidth` a 320, 360, 390 y 430 px en las 15 páginas (hoy falla en `producto.html?p=parches-nariz`: 413 frente a 390, lo que además descoloca la barra fija).

---

## 8. ORDEN DE TRABAJO, ACEPTACIÓN Y RIESGOS

### 8.1 Orden de implementación (cada paso es desplegable por separado)

1. **`styles.css`**: `:root` + base + utilidades + `#site-header{display:contents}` + `.n-methods input{width:auto}` + `[hidden]{display:none!important}` + bloque `prefers-reduced-motion`. *(Cuatro bugs de auditoría cerrados con ~30 líneas.)*
2. **`app.js` → `layout()`**: barra sin emojis, cabecera con `#opennav`, hoja `.n-nav`, drawer sobre `.n-sheet`, pie editorial, `.n-mail` con sus tres guardas, banner de cookies operativo, skip link, iconos SVG.
3. **`app.js` → producto**: `nCard` nuevo + `nImg`, `nPerUse`, `nKlarna`, `nCat` + `.n-buy` + `nPay` + `nBuy`/`nBuyCart` + delegación `[data-buy]` + `WALLET`.
4. **`app.js` → carrito**: `C.render()` con un solo hito de regalo, `#cartflash` en lugar de toast, upsell con marco nuevo, `toast()` por clases y anclado arriba, `.n-bump` en el contador.
5. **`producto.html`**: template de `#pdp` con el orden de §4.3 conservando **todos** los ids; galería snap; barra fija por `IntersectionObserver`; `#addbtn` con `data-buy`; JSON-LD.
6. **`index.html` y `catalogo.html`**: nuevo orden de bloques, hero con imagen primero, `.n-card--row` en catálogo, chips sticky con contador.
7. **`checkout.html`**: resumen plegable, exprés arriba con divisor, radios corregidos, `autocomplete`, aviso de suscripción, barra fija de pago.
8. **Resto de páginas**: plantilla documento, advertorial, quiz, gracias, garantía, contacto, envíos, legal.
9. **Barrido final**: sustitución global de `#6b6b6b` → `var(--n-muted)`, retirada de los 12 emojis, favicon y `preconnect` en las 15 cabeceras, `id="main"` en cada `<main>`.

### 8.2 Checklist de aceptación (comprobable con Playwright a 390 × 844 y 1280 × 800)

- [ ] `document.scrollingElement.scrollWidth === innerWidth` en las 15 páginas a 320 / 360 / 390 / 430 px.
- [ ] En `producto.html?p=parches-nariz`, `document.querySelector('.n-pdp .n-buy .n-btn').getBoundingClientRect().bottom <= 844`.
- [ ] En `index.html`, la imagen del hero aparece **antes** que el bloque de compra en el orden del DOM, y el botón primario cierra por debajo de 844 px.
- [ ] `header.top` mantiene `getBoundingClientRect().top === 0` con `scrollY = 800`.
- [ ] A 390 px existe navegación: `#opennav` visible y abre los 8 enlaces; `Escape` cierra y devuelve el foco.
- [ ] Toda superficie con producto muestra «Comprar ahora» + botón exprés + «Añadir al carrito» (11 superficies; excepción documentada: `#cartupsell`).
- [ ] `nBuy` hace **un solo** `POST /api/checkout` (doble clic no duplica: `data-busy`), redirige, deja `n_cart` intacto y escribe `n_lastorder`; en `gracias.html` el evento `purchase` se dispara una sola vez y el carrito no se vacía si `express`.
- [ ] Sin `ApplePaySession` ni `PaymentRequest`, el botón dice «Pago rápido» y no muestra ninguna marca de terceros. Con `STRIPE_LIVE=false`, tampoco.
- [ ] `.n-mail.is-open` **no** intercepta clics en móvil (se puede pulsar un `.n-tier` con la hoja abierta) y no aparece en las tres primeras interacciones.
- [ ] Tras «Añadir», el aviso aparece **arriba** y no solapa «Finalizar compra».
- [ ] El acordeón **anima al abrir y al cerrar** (no solo al cerrar).
- [ ] Con `prefers-reduced-motion`, ningún vídeo se reproduce solo, ninguno queda oculto y todos muestran `controls`.
- [ ] 0 elementos interactivos por debajo de 44 × 44 px.
- [ ] `styles.css` ≤ 22.528 bytes y `app.js` ≤ 28.672 bytes, sin minificar.
- [ ] Ningún emoji en el DOM renderizado (`document.body.innerText` sin rango emoji).
- [ ] Lighthouse móvil: Rendimiento ≥ 95, Accesibilidad ≥ 95, CLS = 0.
- [ ] Los eventos `page_view, view_item, add_to_cart, begin_checkout, purchase, lead, quiz_*, select_item, view_cart, filter_catalogo, upsell_*, advertorial_cta, cta_hero` se emiten con la misma forma; las claves `n_cart, n_disc, n_sid, n_vid, n_utm, n_popup, n_lastorder` no se renombran; `/admin` intacto; ningún precio, claim ni texto legal modificado.

### 8.3 Riesgos a vigilar durante la implantación

1. **Doble fuente de precios**: `products.js` (muestra) frente a `netlify/functions/catalog.js` (cobra). El precio por parche, el tachado, el ahorro y la línea Klarna se calculan desde `products.js`; si alguien cambia un precio hay que tocar los dos archivos o el checkout cobrará otra cifra.
2. **`n_lastorder` en compra exprés**: si no se escribe, se pierde `purchase` y el ingreso no aparece en `/admin`.
3. **Vaciado del carrito en `gracias.html`**: sin la guarda `if(!last.express)`, una compra exprés borra un carrito que el cliente no ha comprado.
4. **Orden de scripts**: `products.js` antes de `app.js` en las 15 páginas.
5. **Superposiciones a pantalla completa**: conservar el guard `n_popup` y cerrar el drawer entre dos «añadir» en cualquier test automatizado.
6. **Códigos de descuento por triplicado** (`checkout.js` en servidor, `checkout.html` en cliente, `HOLA10` fijo en `app.js` y en `quiz.html`): un código nuevo obliga a tocar los cuatro sitios.
7. **`#st-add` no se retira**: `producto.html` lo busca por id. Cambia su texto y sus `data-`, nunca su existencia.
8. **`no-son-puntos-negros.html` línea 55**: quitar `style="display:block"` de la barra fija; con el nuevo modelo de visibilidad, ese estilo en línea la deja invisible.
