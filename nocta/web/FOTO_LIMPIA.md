# La foto limpia: el producto flota, sin caja

Lo que se ve en la tienda desde el 13-09-2026: la tarjeta de producto no tiene caja ni fondo de
imagen. El producto está recortado y flota sobre el papel, con su sombra, y debajo van el nombre,
el precio, la descripción, Comprar y Pago rápido. Nada más.

## Cómo se hizo

**1. La foto.** GPT Image 2.5 a 4K (2880 px), con la foto anterior de cada producto como referencia
para que el envase salga idéntico: mismo cartón, misma tipografía, mismos textos. El encargo pide
el producto **flotando en el aire**, no apoyado, sobre blanco puro y sin atrezo. 13 productos, más
dos tomas con una mano sujetando la caja y el parche. 4,5 créditos por imagen.

**2. El recorte.** `tools/foto/recortar.py`. No vale un umbral global: el cartón de NOCTA es blanco
roto y el papel del parche es blanco, así que borrar «todo lo que sea casi blanco» agujerea el
producto. Se hace **relleno por conexión desde el borde**: sólo es fondo el blanco al que se puede
llegar caminando desde el marco sin cruzar el producto. Los blancos de dentro se quedan.

Además se descartan las islas que deja la sombra original: se distinguen del producto por el
contraste, porque el producto tiene tinta y aristas y una sombra difusa no. Regla: se cae toda isla
sin ningún píxel por debajo de 200.

**3. La sombra NO va en la foto.** La pone el CSS con `filter: drop-shadow()`, que sigue la silueta
real del recorte y funciona sobre cualquier fondo. Por eso el recorte se lleva la sombra original.

## Lo que hay que saber si se toca el CSS

La tarjeta **conserva su `overflow:hidden`**, a propósito, y la sombra cabe dentro gracias al margen
interior del producto. Se probó lo contrario —abrir el recorte con `overflow:visible` y también con
`overflow:clip` más `overflow-clip-margin`— para que la sombra no se cortara, y **las dos veces la
página creció 21 px a lo ancho** en portada y catálogo: el hueco de la imagen arrastra 33 px de
desbordamiento interno que, sin recorte, empujan el documento. Está medido, no supuesto.

O sea: si alguien vuelve a abrir ese overflow, reaparece el desborde horizontal. La solución es al
revés, dar más margen interior al producto para que la sombra quepa.

La etiqueta («bestseller», «nuevo») baja al bloque de texto: sin caja no hay esquina donde anclarla
y flotando en el vacío parece un error de maquetación. Lleva `justify-self:start` porque el bloque
es una rejilla y un `inline-block` suelto se estira a todo el ancho de la columna.

## Convivencia con lo anterior

No se ha borrado nada. Las fotos de siempre siguen en `assets/img/foto/` y las usa la ficha de
producto. Lo nuevo vive en `assets/img/limpio/` y entra por el campo `limpio` de `photos.js`:
si un producto lo tiene, su tarjeta pasa a flotar; si no, se queda exactamente como estaba. Los dos
planes (mensual y semanal) no tienen foto limpia porque no son un objeto físico.

## Regenerar

```bash
python3 nocta/tools/foto/recortar.py entrada.png salida.png [--lado 2048]
```
