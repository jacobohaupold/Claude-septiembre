# El mapa en vivo

`/admin/#/live` · módulo `web/public/admin/m-live.js`

Un mapamundi con quién está en la tienda **ahora mismo**, dónde está y qué está haciendo.
La referencia era el Live View de Shopify; de ahí sale la idea, no el diseño.

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

51 comprobaciones a tres anchos con el código real del módulo en un navegador de verdad. No
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
