# La recompensa post-compra

Cada pedido pagado emite **un código personal, de un solo uso, para la siguiente compra**. Se ve
en la página de gracias, viaja en el email de confirmación, se aplica solo cuando el cliente
vuelve, y el CRM cuenta exactamente qué ha pasado con cada uno.

Es el mecanismo con más retorno de una tienda directa al consumidor: la segunda compra. Traer un
cliente nuevo cuesta dinero; traer al que ya compró cuesta un código.

## Cómo funciona, de punta a punta

```
Stripe confirma el pago
   ↓  markPaid()                         netlify/functions/order.js
   ├─ redeemIfReward(pedido)             ¿venía con una? → canjeada, y se apunta lo que trajo
   ├─ issueReward(pedido)                emite la del siguiente pedido
   ├─ email de confirmación              con el código dentro
   ↓
Página de gracias  ───────────────────►  bloque navy con el código, botón de copiar y caducidad
   ├─ lo guarda en el navegador (n_reward)
   └─ avisa al servidor de que se ha visto (seen_at)
   ↓
El cliente vuelve
   ↓  checkout.html
   └─ al escribir su email, se aplica sola
```

## Las cuatro decisiones que la hacen funcionar

**1. Vive dentro de `discounts`, no en su propia tabla.** La validación de un código —vigencia,
mínimo, usos, activo— ya está escrita una vez en `getDiscount()`. Una tabla aparte obliga a
repetirla, y dos copias de una regla de dinero terminan divergiendo siempre. La recompensa es una
fila de `discounts` con `kind='recompensa'`, `email` del dueño y `max_uses=1`.

**2. Es de quien la ganó.** `getDiscount()` exige el email del dueño cuando el código es una
recompensa. Sin esa comprobación bastaría con que un código se filtrase por un grupo de WhatsApp
para que lo usara el primero que llegase: son de un solo uso, así que el dueño se encontraría con
que «ya se ha usado». Los códigos de campaña siguen sin pedir email, porque si no se rompen los
enlaces de la newsletter.

**3. Un pedido emite una y sólo una.** El índice único sobre `order_id` es lo que hace idempotente
al emisor: si el webhook de Stripe llega dos veces —y llega—, el segundo insert choca y se
devuelve la que ya existía. No se confía en «mirar antes si existe», porque entre mirar e insertar
cabe el otro webhook.

**4. «Lo que trajo» es el SUBTOTAL del segundo pedido, no el total cobrado.** El total ya lleva
restado el descuento; contarlo como ingreso haría que la recompensa pareciese más barata de lo que
es. Con el subtotal, el neto de la pantalla es el neto de verdad.

## Qué mide el CRM (Marketing → Recompensas)

El número grande **no** es «canjeadas», es el **neto**: ingresos de las segundas compras menos lo
que se ha regalado. Un porcentaje de canje alto con neto negativo es una forma cara de perder
margen, y con «canjeadas» en grande no se ve.

Debajo, el embudo en tres pasos, que dice **dónde se rompe**:

| Caída | Qué significa | Qué se toca |
|---|---|---|
| Emitidas → **vistas** | el bloque de la página de gracias no se está viendo | el sitio o el diseño del bloque |
| Vistas → **canjeadas** | se ve pero no convence, o caduca antes de volver | el porcentaje o la ventana |

Y la regla práctica: **si caducan muchas, alarga la ventana antes de subir el porcentaje.** Sale
más barato regalar tiempo que margen.

Todo se cambia desde la propia pantalla (activarla, %, días, mínimo, prefijo y el título de la
página de gracias). Los cambios valen para las que se emitan a partir de entonces: **las ya
emitidas mantienen su porcentaje y su caducidad**, porque cambiarle el trato a alguien que ya
tiene el código en la mano es la forma más rápida de perderlo.

El panel lleva además dos cosas de la recompensa, porque al panel se entra todos los días y a
Recompensas no: lo que han traído las segundas compras, y un aviso cuando hay recompensas que
caducan esta semana sin usar. Eso último es margen ya ganado que se está escapando.

## El código

`VUELVE-7K2MQ`. El sufijo sale de un alfabeto **sin vocales ni caracteres que se confundan al
dictarlos**: nada de O contra 0, ni I contra 1, ni S contra 5. Un código de recompensa se dicta
por teléfono más de lo que se copia, y una O mal entendida cuesta un canje.

## Qué comprueba la prueba

`node nocta/tools/crm-qa/prueba-recompensa.mjs` — 56 comprobaciones, por las dos puntas.

Abajo, la lógica de servidor **de verdad** contra una base de datos fingida: se puede porque `db`
es un objeto exportado, así que el test importa el mismo objeto y le cambia los métodos. El código
bajo prueba es el que se despliega, no una copia. Comprueba que un pedido no emita dos
recompensas ni siquiera con dos webhooks a la vez, que sólo la use su dueño, que un código
público siga funcionando sin email, que al canjear se apunte el subtotal y se desactive, y que el
mínimo y la caducidad manden.

Arriba, las tres pantallas en un navegador: que la recompensa se vea y se copie en la página de
gracias, que vaya **por encima del upsell** (el upsell añade a *este* pedido, la recompensa trae
el *siguiente*: si compiten, gana la de más valor), que el pago la aplique solo al escribir el
email, que con otro email lo explique en vez de fallar en silencio, y que el CRM enseñe el neto y
no las canjeadas.

Cada bloque de navegador abre **su propio contexto**: el almacenamiento viaja entre pestañas del
mismo contexto y un test acababa heredando el estado del anterior, que es la forma más tonta de
que una prueba diga que sí cuando la respuesta es que no. Pasó en el primer intento.
