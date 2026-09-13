# El mapa en vivo

`/admin/#/live` · módulo `web/public/admin/m-live.js`

Un mapamundi con quién está en la tienda **ahora mismo**, dónde está y qué está haciendo.
La referencia era el Live View de Shopify; de ahí sale la idea, no el diseño.

## Cómo se navega

El mapa se maneja como un mapa, no como una imagen:

| Gesto | Qué hace |
|---|---|
| Arrastrar | Mover, con inercia al soltar |
| Rueda o trackpad | Acercar y alejar hacia donde apunta el cursor |
| Pellizco (dos dedos) | Acercar y alejar hacia el centro del pellizco |
| Doble clic | Acercar ahí · con **alt**, alejar |
| **Mayúsculas** + arrastrar | Encuadrar la zona que dibujes |
| Flechas | Mover · con **mayúsculas**, a zancadas |
| `+` `−` `0` | Acercar, alejar, ver el mundo entero |
| Pulsar un grupo | Abrirlo |
| Pulsar una persona | Su recorrido completo |

Y encima del mapa: indicador de aumento, **encuadrar a los visitantes** (la caja que los contiene a
todos), **mapa guía** con el recuadro de lo que estás viendo, y **barra de escala en kilómetros**.

### Las tres decisiones que sostienen todo esto

**1. Los marcadores viven fuera del grupo de la cámara.** La geografía va dentro de un grupo con la
transformación, así que escala con el zoom. Los puntos, los nombres y los haces de venta se dibujan
en coordenadas de pantalla y se recolocan en cada movimiento, como en cualquier mapa serio. Sin eso,
a ×14 los puntos serían manchas del tamaño de un país.

**2. Todo lo de encima se mide en píxeles de pantalla, no en unidades del mapa.** El SVG tiene un
viewBox de 1000 unidades; en un móvil de 366 px eso se dibuja al 37 %, así que los nombres salían a
3 px y los puntos eran intocables. El módulo calcula `U` = unidades de viewBox por píxel y multiplica
por él radios, textos, grosores y el radio de agrupación. Efecto secundario correcto: en una pantalla
pequeña, 15 px cubren más mundo, así que se agrupan ciudades que en un monitor van sueltas.

**3. El zoom por pasos acumula.** Pulsar «+» tres veces seguidas da ×1,8³, no ×1,8. Cada paso partía
del zoom leído a mitad de la animación anterior, así que los clics rápidos se comían unos a otros;
ahora se recuerda a dónde íbamos.

Además: el movimiento se interpola sobre el **logaritmo** del zoom (que es como se percibe), los
topes impiden arrastrar el mundo fuera de la vista, los nombres de país se reparten sin pisarse y
esquivan las cajas reales de los botones (se leen del DOM, no se reservan márgenes a ojo), y con
`prefers-reduced-motion` se van la inercia y las animaciones.

## Lo que se ve

Una sola pieza oscura, como la referencia, no cuatro tarjetas sueltas encima de un mapa:

- **Barra de totales**: «ahora mismo» y los cuatro totales del día (visitas, páginas, pedidos,
  vendido), cada uno con su tendencia por horas y su comparación contra ayer **a la misma hora**
  (comparar un día entero contra medio día siempre da caída).
- Visitas y páginas van en **línea**; pedidos y ventas, en **barras**. Para sucesos sueltos una
  línea quebrada inventa una continuidad que no existe: une con una rampa dos horas sin nada.
- **Mapa** con la leyenda visita/venta, los controles de ventana y zoom, y la leyenda de etapas.
- **Qué están haciendo**: una curva por etapa, con la altura proporcional a la gente que hay en
  ella, y entre curva y curva **el porcentaje que pasa de una a la siguiente**. Ese dato es lo que
  la referencia no da: no sólo cuánta gente hay en cada paso, sino cuánta se queda por el camino.
- **Pulso** por minuto de la última media hora, con eje.
- **Está pasando**, **De dónde entran hoy** y **Páginas de hoy**.

## Lo que hace distinto

**Dibuja la noche de verdad.** NOCTA es una marca de noche y el producto se usa durmiendo, así
que el mapa sombrea el hemisferio que está a oscuras en este instante. No es un adorno: el
terminador se calcula con la posición subsolar real (declinación y ángulo horario del sol), se
redibuja cada minuto y lleva el borde difuminado porque el crepúsculo real es una banda ancha,
no una línea. Sirve para leer de un vistazo si el tráfico está entrando de día o de madrugada.

**Cada punto es una persona, y se puede pulsar.** Al hacer clic se abre su recorrido completo
en `#/people/<id>`: de dónde vino, qué páginas vio, qué metió en el carrito, qué pidió. Lo mismo
en cada línea de «Está pasando». El mapa no es una pantalla de adorno, es la puerta de entrada
al resto del CRM.

**Las ventas son haces de luz.** Una compra levanta una columna de luz desde su ciudad, con la
altura proporcional a la raíz del importe y la opacidad cayendo durante hora y media. Se ve el
pedido antes de leerlo.

**Está en español de verdad.** «🇪🇸 Bilbao ha metido "Parches de nariz" en el carrito», no
`add_to_cart`. Los nombres de país salen de `Intl.DisplayNames`, así que están bien escritos en
los 249 códigos ISO sin cargar ninguna tabla.

**Distingue el punto exacto del aproximado.** Si Netlify nos da la ciudad, el punto va en la
ciudad. Si sólo da el país, va al centro del país y el aviso lo dice. La dispersión que separa
los puntos que caen juntos es determinista (depende del identificador), así que una persona no
salta de sitio en cada refresco.

## Cómo está hecho

```
navegador                  Netlify                    Supabase
m-live.js  ──GET /api/admin/live──►  admin.js  ──rpc──►  live_map(p_min, p_feed)
   │                                                          │
   └── dibuja SVG  ◄────────── un único JSON ◄────────────────┘
```

- **Todo el cálculo lo hace Postgres.** `live_map` devuelve un solo JSON con los indicadores, los
  puntos, las ventas, el feed, el pulso por minuto y los rankings. El navegador no descarga
  eventos sueltos: es lo que separa esto de un panel que se cae cuando hay tráfico.
- **Sin librerías.** El mapa es un SVG. Los contornos salen de `admin/mundo.js`, que genera
  `tools/crm-qa/gen_mundo.py` a partir de Natural Earth 110m (dominio público, vía world-atlas).
  No hay CDN de mapas, ni token de Mapbox, ni nada que pueda caerse o empezar a cobrar.
- **Proyección Miller cilíndrica.** La longitud es lineal, así que el zoom es una transformación
  afín y proyectar un punto es la misma fórmula, repetida a propósito en el generador y en el
  módulo. Groenlandia no se come el mapa como pasaría con Mercator.
- **Dos consultas en paralelo**: `live_map` (cada 10 s) y `live_horas`, la serie por horas para
  las tendencias, que cambia una vez por hora y va en su propia función.
- **Se refresca cada 10 s** y se puede pausar. El ciclo se corta solo cuando el nodo sale del
  DOM, porque el router del CRM sustituye `#main` entero al cambiar de página.

### Regenerar la geometría

```bash
python3 nocta/tools/crm-qa/gen_mundo.py
```
Escribe `web/public/admin/mundo.js` (176 países, 126 KB) y los centroides que siembran
`geo_paises`. Dos cosas que hay que saber si se toca:

- **No se recorta la latitud.** Aplastar los vértices contra un tope dibuja franjas horizontales
  falsas por el norte de Canadá y Rusia. El recorte lo hace la ventana del SVG.
- **Rusia y Fiyi cruzan el meridiano 180.** Sin desenrollar la longitud, el salto de +179 a −179
  dibuja un segmento que atraviesa el mapa de lado a lado.

### La caché

`mundo.js` no cambia nunca y pesa 126 KB. `/admin/*` va con `no-store`, así que `netlify.toml`
lleva una regla propia para servirlo `immutable` un año. Sin ella el CRM se lo bajaría entero en
cada carga.

## Pruebas

```bash
NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/crm-qa/prueba-mapa.mjs
```

117 comprobaciones a tres anchos con el código real del módulo en un navegador de verdad. No
comprueba que «no pete»: cuenta puntos, haces, filas y barras, verifica que el mapa no desborda
la página y **comprueba que la proyección coloca a cada uno en su sitio**, exigiendo que el punto
de Madrid caiga dentro del polígono de España y el de Tokio dentro del de Japón.

Tres fallos reales los cazó esta prueba, no la vista:

1. `#lvzoom+` no es un selector CSS válido (`+` es un combinador): el botón de acercar reventaba
   el módulo entero.
2. El `<g id="lvpaises">` del SVG y el `<div id="lvpaises">` del ranking compartían identificador,
   así que pintar la lista de países **borraba los contornos del mapa**.
3. `transform-box: fill-box` estaba en el grupo y no en el círculo, así que `transform-origin:
   center` se resolvía contra el lienzo entero y los halos de pulso aparecían a medio mapa de su
   punto.

Y al rehacer la navegación cazó dos más:

4. Pulsar «+» tres veces seguidas daba ×1,8 en vez de ×1,8³, porque cada paso leía el zoom a mitad
   de la animación anterior.
5. El doble clic no llegaba nunca: el oyente estaba en el `<svg>`, pero `setPointerCapture` redirige
   todos los eventos al elemento que captura, que es el envoltorio.

Dos más los cazó la vista sobre una captura: la fila de controles estaba anclada a la tarjeta entera
(`top: 0`) en vez de al mapa, y con zoom un nombre de país acababa debajo del botón de alejar.

## En el teléfono

La cabecera del mapa («Ahora mismo» + las cuatro cifras del día) se comía la pantalla entera:
414 px de recuadro oscuro casi vacío, con un «1» perdido en medio y ninguna cifra a la vista.

La causa era una sola línea. `.lv__tot` es un contenedor flex con `flex-wrap`, y para que las
cifras del día bajen a su propia línea en el teléfono hay que pedir el salto **en las dos piezas**:

```css
.lv__tot-now{width:100%}      /* no lleva `flex`, así que su base es su width: salta bien */
.lv__tot-hoy{flex:1 1 100%}   /* lleva flex:1 → base 0. Con width:100% NO salta. */
```

En un contenedor flex la **base manda sobre `width`**. `.lv__tot-hoy` llevaba `flex:1` (base 0),
así que la suma de bases seguía cabiendo en la línea, no había salto, y se quedaba al lado del
contador con **cero píxeles de ancho**. Sus cuatro fichas, que a su vez tienen `flex-wrap`, caían
una debajo de otra dentro de esa columna vacía y sumaban 413 px de alto invisible que, con
`align-items:stretch`, estiraban también la caja del contador.

Con el salto bien pedido, la cabecera pasa de 414 px a 222 px y la tarjeta del mapa de 732 a 551
en una pantalla de 844.

Lo demás que cambia a partir de 760 px:

- **Contador en dos líneas**: la etiqueta arriba, y el número y el «persona · 5 min» en la misma
  línea (`grid-template-areas:"e e" "n s"`). Antes eran tres filas estiradas.
- **Cifras del día en 2×2**, con la chispa más estrecha (52 px).
- **Barra de arriba en una sola línea** (`flex-wrap:nowrap`): partida en dos dejaba media
  pantalla de mapa debajo de un degradado.
- **Leyenda en una banda abajo**, con los nombres cortos de `ETAPA[i].k` (Producto, Carrito,
  Comprado). Los cinco nombres largos no caben en una fila a 360 px y la última palabra salía
  cortada. En escritorio se siguen leyendo los largos: los dos se pintan y manda el CSS.
- **Escala a la izquierda y botones de zoom a la derecha**, los dos por encima de la banda. La
  escala estaba a `bottom:10px`, justo donde ahora va la leyenda, y se leía «10.000 km» encima
  de «Pagando».

`prueba-mapa.mjs` mide todo esto en los tres tamaños (154 comprobaciones): que las cifras del día
tengan ancho, que las cuatro fichas se vean, que el contador no se estire, que la tarjeta del mapa
no pase del 78 % de la pantalla, que los botones caigan dentro del mapa y que escala, leyenda,
botones y barra no se pisen entre ellos.

