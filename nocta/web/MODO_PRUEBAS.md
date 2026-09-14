# Modo pruebas · que la tienda se pueda probar entera antes de cobrar

## El problema

Sin pasarela de pago, el checkout guardaba el pedido con `status = 'demo'` y ahí se acababa todo.
Ni cliente, ni email de confirmación, ni recompensa, ni suscripción, ni evento de compra, ni cola
de envíos. Con la tienda completa montada y ocho pedidos hechos, el CRM enseñaba **0 clientes y
0 suscripciones**, y no había forma de comprobar si el circuito funcionaba hasta el día de abrir
la caja — que es el peor día posible para descubrir que algo no va.

El fallo era de modelado. `'demo'` no es un estado del pedido: es una **propiedad** del pedido. El
estado es `pendiente → pagado → enviado → entregado`, y eso vale igual para una prueba que para una
venta. Al meter la prueba dentro del campo de estado, el pedido de prueba quedaba fuera de todas las
máquinas que miran el estado.

## Cómo funciona ahora

La prueba vive en su propia columna, `demo boolean`, en `orders`, `customers`, `subscriptions` y
`discounts`. Un pedido de prueba recorre **exactamente el mismo camino** que uno real:

| | pedido real | pedido de prueba |
|---|---|---|
| se cobra | sí | **no** |
| estado | `paid → shipped → delivered` | igual |
| se crea el cliente | sí | sí |
| email de confirmación | sí | sí, con `[PRUEBA]` en el asunto y un aviso arriba |
| recompensa post-compra | sí | sí |
| suscripción (mensualidad) | sí, con id de Stripe | sí, con id propio `demo_<pedido>` |
| evento de compra | sí | sí, marcado |
| **cuenta como facturación** | sí | **nunca** |

La regla es de una línea: **toda consulta de dinero lleva `and not demo`**. Está en `admin_stats`
(ingresos, pedidos, ticket medio, clientes, MRR, cola de envíos y la serie por días) y en
`reward_stats` (ingresos y coste de la recompensa). Las pruebas se cuentan aparte, en un bloque
`pruebas`, y se enseñan: esconderlas es tan engañoso como sumarlas. Un cero pelado con siete pedidos
hechos parece una tienda rota, y no lo está.

El día que se conecte Stripe no hay que cambiar una línea de código. Simplemente dejan de nacer
pedidos con la marca.

## Dónde está cada cosa

- `db/migraciones/005_modo_pruebas.sql` — la columna, el histórico y las dos funciones de cuentas.
- `netlify/functions/lib/fulfil.js` — **el circuito post-pago**, que antes vivía dentro de
  `order.js` (la función del webhook de Stripe) y por eso no se ejecutaba sin Stripe. Ahora lo
  llaman los tres sitios que cierran un pedido: el webhook, el checkout sin pasarela y el botón
  «Marcar pagado» del CRM.
- `netlify/functions/checkout.js` — la rama sin pasarela llama a `markPaid(..., { demo: true })`.
- `public/admin/m-listo.js` — la pantalla **Puesta en marcha**.

## Un cliente deja de ser de prueba, nunca al revés

Si alguien prueba y después compra de verdad, su ficha de cliente pierde la marca. Si vuelve a
probar, **no** la recupera: una sola compra real basta para que sea un cliente real para siempre.
Lo contrario haría que una prueba borrase a un cliente de las cuentas.

## La pantalla «Puesta en marcha»

Contesta de una vez la única pregunta de la que cuelga todo lo demás: *¿puede esta tienda cobrar
hoy?* El endpoint `GET /api/admin/readiness` lo calcula cada vez sobre el estado real — no sobre lo
que uno recuerda haber configurado — y clasifica cada punto en tres niveles:

- **bloquea** — sin esto no entra un euro, por mucho tráfico que llegue. Sólo esto cuenta para el
  veredicto.
- **importa** — se puede vender, pero se pierde dinero o confianza por el camino.
- **mejora** — suma cuando lo anterior ya esté.

Cada punto dice **qué pasa si se queda sin arreglar**, no sólo que está apagado: «Webhook: no» no
significa nada; «Stripe cobra pero la tienda no se entera, y el pedido se queda a medias» sí.

Mezclar «no tienes WhatsApp» con «no puedes cobrar» en la misma lista roja es la forma más rápida de
que no se mire ninguna de las dos, y por eso los niveles están separados.

En el panel aparece sólo una línea con el aviso y un enlace, no otra tarjeta: en la pantalla a la
que se entra todos los días, lo que ya se sabe tiene que ocupar poco.

## Pruebas

`tools/crm-qa/prueba-pruebas.mjs` (28 comprobaciones) defiende las dos mitades del contrato contra
`lib/fulfil.js` de verdad: que un pedido de prueba **haga** todo lo que hace uno real, y que en
ninguna de esas cosas se cuele como facturación.
