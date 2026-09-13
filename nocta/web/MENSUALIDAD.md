# Mensualidad y personalización por producto

Dos cosas que antes estaban repartidas a mano por la web y ahora tienen un solo sitio:
el **descuento por contratarlo cada mes** y **lo que le decimos a cada cliente de cada producto**.

## 1. Ya no se llama «suscripción»

Se llama **Mensualidad**. El nombre sale de `window.nSubName` (`public/assets/js/app.js`), no
escrito a mano en cada plantilla, porque estaba en cinco sitios y cambiarlo obligaba a buscarlo.

Dónde aparece: el selector de la ficha, la línea del carrito, el resumen del checkout y el
concepto que viaja a Stripe (`netlify/functions/checkout.js`).

## 2. El descuento vive en un único sitio

```
Supabase · content.pricing = { "sub_pct": 20, "multi": {"2":0,"3":0} }
      ↓ getCatalog()            netlify/functions/lib/catalog.js
      ↓ /api/catalog.js         window.NOCTA_CFG.pricing
      ↓ nSubPct(p)              public/assets/js/app.js
```

`nSubPct(p)` devuelve el porcentaje **real de ese producto**: si alguien le ha puesto a mano un
precio de mensualidad en el CRM, manda ese; si no, el `sub_pct` de la configuración; y si la web
se carga sin `/api/catalog.js` (local, o el CDN caído), 20. Así el cartelito del botón nunca
puede decir un número distinto del que se cobra.

Subirlo o bajarlo se hace en el CRM (**Precios → % de descuento en la mensualidad**), no tocando
ficheros. Los `sub:` de `products.js` son el valor de reserva y se regeneran con
`price × (1 − sub_pct/100)`; `stamp.py` los copia a `netlify/functions/lib/products-data.js`.

Los planes (`plan-mensual`, `plan-semanal`) **no** llevan descuento de mensualidad: ya son un
cobro recurrente, y su `sub` es igual a su `price` a propósito. Si se recalculan a ciegas con la
fórmula de arriba, el plan se cobra un 20 % por debajo de su precio.

## 3. El cartelito del botón

El botón de mensualidad lleva dentro `−<pct> % · Recomendado` (`.n-pd__segflag`). Es un hijo del
`<label>`, no un adorno flotante: si se saca fuera del botón, la píldora redondeada lo recorta.
El % sale de `nSubPct(p)`; el texto «Recomendado» es fijo.

## 4. Personalización: `pers` y `motivos`

Dos campos nuevos en `public/assets/js/products.js`, uno por producto:

```js
pers:    { tag: "Lo más recomendado", nota: "Por donde empieza casi todo el mundo. …" },
motivos: [["Es el orden que se falla cuando lo haces por tu cuenta", "Casi todo el mundo …"], …]
```

- **`pers.tag`** — para quién es, en una línea. Sale en la tarjeta de catálogo (`.n-pc__pers`),
  en la lista de «qué incluye» de los packs y en las pastillas del constructor de la mensualidad.
  Si empieza por «Lo más», se pinta en terracota y la pastilla de su zona lleva ★: es la
  convención para «esto es lo que recomendamos», y la comprueba `nPersRec()`.
- **`pers.nota`** — el aviso completo, en la ficha del producto (`.n-pd__pers`) y bajo las zonas
  elegidas de la mensualidad (`.n-plb__tips`). Habla en segunda persona y dice algo que se pueda
  comprobar («ocho parches son cuatro semanas a dos noches por semana»), no un adjetivo.
- **`motivos`** — solo los kits y los planes. Tres motivos con título y párrafo, que se pintan
  como sección propia (`.n-pd__mot`) por encima de las cifras. Sustituyen a las tres cifras
  genéricas que había antes («2 pasos · 2 semanas · +50 % de absorción»), que valían para
  cualquier pack y por eso no convencían a nadie.

En móvil `.n-pd__head` es `display:contents`, así que los hijos heredan el orden del panel: la
nota lleva `order:9` a propósito. Sin él se cuela por delante del título, porque el orden por
defecto (0) gana a los `order:1..8` del resto.

## 5. Galería de la ficha en escritorio

Las fotos van **en fila** también en escritorio (antes se apilaban y había que bajar con la rueda
para ver la segunda, perdiendo de vista el panel de compra). Se cambia con las flechas de los
lados (`#gprev` / `#gnext`), con las teclas ← → cuando el foco está dentro de la galería, y
arrastrando en táctil. La altura de cada foto se limita a la ventana, así que la foto completa
siempre cabe sin scroll.

Las flechas de los extremos se apagan con `aria-disabled`, **no** con `disabled`: un botón
deshabilitado pierde el foco, y al llegar a la última foto el teclado dejaría de funcionar.

## 6. Qué comprueba la prueba

`node nocta/tools/web-qa/ficha.js` (39 comprobaciones): que la galería quepa en la ventana, que
las fotos vayan en fila, que haya una flecha a cada lado y se apaguen en los extremos, que el
contador, los puntos y el carril vayan sincronizados, que el teclado cambie de foto, que el sello
de dermatólogos esté arriba y no choque con la chapa del producto, que el selector diga
«Mensualidad» y no «Suscripción», que el cartelito lleve el % y la palabra «Recomendado», que el
precio con mensualidad sea exactamente el precio menos ese %, y que cada kit tenga sus tres
motivos propios con texto largo de verdad.
