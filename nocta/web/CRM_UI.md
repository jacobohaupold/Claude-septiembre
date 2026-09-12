# NOCTA · CRM (`/admin`) — reglas de interfaz y cómo se comprueban

El CRM no usa el sistema de diseño de la tienda (`styles.css`): tiene el suyo, `admin/admin.css`, con los mismos
colores de marca. Este documento fija las reglas que cumple hoy pantalla por pantalla y cómo volver a comprobarlas
después de cualquier cambio.

## 1. La regla que manda: nunca se desplaza de lado

En ningún ancho (de 360 px a 1920 px) la página, una tarjeta, una tabla, un diálogo o el menú pueden obligar a
desplazarse en horizontal. Se comprueba de forma automática midiendo, en cada pantalla y en cada pestaña, que
`document.scrollWidth` no supera el ancho de la ventana y que ningún elemento con `overflow-x:auto` tiene contenido
más ancho que su caja.

**Tablas.** Todas las tablas se generan con `A.table(...)` y se miden solas al pintarse (`A.fit`, en `core.js`):

- Si la tabla cabe en su contenedor, se queda tabla.
- Si no cabe, el contenedor recibe la clase `cards` y **cada fila pasa a ser una tarjeta** con pares
  «etiqueta → valor». La primera columna con etiqueta (o la marcada con `title: true`) hace de título de la tarjeta;
  las celdas sin valor (`—`) se ocultan; las que llevan imagen o control se conservan.
- Si el hueco vuelve a crecer (girar el móvil, ampliar la ventana), vuelve a ser tabla. Lo vigila un `ResizeObserver`
  por contenedor, y un `MutationObserver` global se encarga de las tablas que aparecen en renders parciales.
- Las tarjetas se reparten en 2 o 3 columnas según el ancho **del contenedor** (`@container`), no de la ventana: una
  tabla dentro de una tarjeta estrecha del panel no se parte en dos columnas ilegibles.
- `A.table` acepta `minw` (ancho mínimo en px). Por defecto, a partir de 4 columnas se aplica `110 px × columnas`,
  para que una tabla apretada pase a tarjetas en vez de quedarse con una palabra por línea en cada celda.

**Pestañas.** `.tabs` son chips que se envuelven en varias líneas. Nunca hay una fila de pestañas que se desplace
(«Textos y web» tiene nueve).

**Menú lateral.** Fijo en ≥ 900 px, cajón con velo por debajo. Si no cabe de alto (móvil apaisado, portátil de 800 px),
el menú se desplaza en vertical y **se difumina el borde inferior** (`.side__nav.fade`) para que no quede un elemento
cortado a medias; el pie («Ver tienda», «Salir») siempre está visible.

## 2. Otras reglas fijas

| Regla | Dónde |
|---|---|
| Contenido con ancho máximo de 1520 px y margen propio; nunca pegado al borde | `.main` |
| Respeto de zonas seguras del móvil (notch, barra inferior) | `.side`, `.top`, `.main` con `env(safe-area-inset-*)` |
| Objetivos táctiles: botones ≥ 36 px, chips ≥ 32 px, enlaces de tabla con 5 px de relleno vertical | `.btn`, `.tabs button`, `.tbl td a` |
| Interruptores de 40×22 px también dentro de un campo (`.fld`) | `.tog input` |
| Campos sueltos sin clase con el mismo aspecto que los de `.fld` | `.main input`, `.main textarea`, `select` |
| Rejillas de 3 y 4 columnas bajan a 2 por debajo de 1320 px y a 1 por debajo de 560 px | `.grid--3`, `.grid--4` |
| Embudo del panel: etiqueta y cifra en la misma línea, barra debajo, en móvil | `.funnel .st` |
| Si no carga la librería de gráficos, la tarjeta explica dónde están los datos en vez de quedarse en blanco | `A.chart` |
| Foco visible con teclado en todo el CRM | `:focus-visible` |
| Productos: filas compactas con miniatura de 52 px (no una foto gigante por fila) | `.prow` en `m-products.js` |

## 3. Cómo volver a comprobarlo

El arnés está en `tools/crm-qa/`. Levanta el CRM con datos de prueba realistas (28 pedidos, 15 clientes,
7 suscripciones, 18 leads, 24 mensajes, 4 campañas, nombres largos y notas largas a propósito) y lo recorre con
Chromium.

```bash
cd nocta/tools/crm-qa
node server.js &                 # sirve web/public + API falsa en :8791
node audit.js shots              # 20 pantallas × 35 vistas (pestañas) × 7 anchos: mide desbordes
node modals.js mod390 390 844    # abre todos los diálogos y los mide (móvil)
node modals.js mod1280 1280 900  # lo mismo en ordenador
node inter.js                    # buscar, filtrar, cambiar periodo, girar el móvil, navegar por el menú
node extra.js                    # acceso, menú abierto y pantallas de poca altura
node shot.js carpeta 390 844 "dash:#/dashboard" "orders:#/orders"   # capturas concretas
```

`audit.js` imprime `checks N con desborde 0` cuando todo está bien y, si algo falla, dice la ruta, el ancho y el
elemento culpable. Los anchos que se prueban son 360, 390, 430, 768, 1280, 1440 y 1920 px.

**Última comprobación (12-9-2026):** 252 mediciones (20 pantallas, 35 vistas con sus pestañas, 7 anchos) y 17
diálogos, en móvil y en ordenador: **0 desbordes**, 0 errores de JavaScript.
