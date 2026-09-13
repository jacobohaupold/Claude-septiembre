# Comprobador de desbordamiento horizontal de la tienda

```bash
NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/desborde.js
```

Abre las 16 páginas de `web/public` a diez anchos (320, 360, 390, 414, 480, 768, 1024, 1280, 1440 y 1920 px),
baja hasta el final y vuelve arriba para disparar las animaciones de scroll, y comprueba que el documento no
sea más ancho que la ventana. Si lo es, dice **qué elemento concreto** sobresale y cuántos píxeles, para no
tener que adivinar.

Devuelve código 1 si alguna página se puede arrastrar hacia los lados.

## Por qué existe

Una página que se puede arrastrar hacia la derecha se ve rota en el móvil: el contenido queda descuadrado y el
usuario cree que la tienda está mal hecha. Es de los fallos que más barato es prevenir y más caro es descubrir
en producción.

## Los tres fallos que encontró la primera vez

**1. `como-usar.html`, en los cinco anchos de móvil, hasta 186 px de más.** La tarjeta del hero tiene
`aspect-ratio:16/9` y `min-height:280px`. Cuando un elemento con proporción fija tiene además una altura
mínima, el navegador calcula su **anchura** a partir de esa altura: 280 × 16/9 = 498 px, dentro de una columna
de 304 px. Y no se arregla con `min-width:0`, porque no es la anchura mínima automática: es la anchura
calculada. Se arregla con `max-width:100%`, que está puesto en `.n-ed5` en `styles.css`.

**2. `producto.html`, 2 px a 320 px.** La galería horizontal imponía su anchura mínima a la columna del grid.
Se arregla con `.n-pd>*{min-width:0}` en `pdp.css`.

**3. `tablero.html`, en los diez anchos.** Es un lienzo de 3200 × 1860 px y desbordaba el documento entero.
Ahora va dentro de `.board-wrap`, que se desplaza él: el tablero se sigue recorriendo de lado, pero la página
no se mueve.

## Regla para el futuro

Cualquier elemento con `aspect-ratio` que además tenga `min-height` o `min-width` necesita `max-width:100%`.
Y cualquier lienzo o carrusel más ancho que la pantalla va dentro de un contenedor con `overflow:auto`, nunca
suelto en el documento.
