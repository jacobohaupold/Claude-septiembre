# Antes y después: la piel, no la caja

Desde el 13-09-2026 cada ficha de producto enseña tres cosas que antes no estaban: **cómo está la
piel antes**, **cómo queda después** y **el producto puesto**. Treinta fotos, tres por zona,
generadas con GPT Image 2.5 a 4K y servidas en `assets/img/piel/`.

## La regla que hace que la comparación valga algo

**Las dos fotos son la misma toma.** Misma persona, mismo ángulo, mismo encuadre, misma luz y
mismo fondo. Sólo cambia la piel. Si cambia cualquier otra cosa, la comparación no demuestra nada
y además se nota el truco: una cara distinta, un plano más cerrado o una luz más favorecedora son
exactamente lo que hace que nadie se crea un antes/después.

Cómo se consigue: el «antes» se genera primero y **el «después» se genera usando el «antes» como
referencia** (`role: image_references`), pidiendo explícitamente que conserve identidad, encuadre y
luz y que sólo cambie lo que el producto hace. La foto de aplicación sale igual, de la misma
referencia, así que es la misma persona en las tres.

La mejora que se pide es **creíble, no milagrosa**: el poro más limpio, el grano aplanado con una
marca rosa todavía, la rojez calmada. Nada de piel de plástico. Un «después» perfecto delata que
es un montaje tanto como un encuadre distinto.

## El texto NO va quemado en la imagen

Las etiquetas ANTES y DESPUÉS, la flecha, la zona, el tiempo y el aviso los pinta el HTML
(`.n-ba`), no el píxel. Así se traducen, se leen a cualquier tamaño, se corrigen sin volver a
generar nada y no se ven borrosas en pantallas densas. Es la diferencia entre esto y un collage
de los que se ven por ahí con el texto dentro del JPG.

## El aviso no es opcional

Debajo de cada par va, siempre:

> Imágenes ilustrativas del efecto que busca el producto, no fotografías de clientes. Cada piel
> responde distinto y los resultados varían.

Esto no es prudencia decorativa. En la UE las declaraciones cosméticas tienen que poder
sustentarse (Reglamento (CE) 655/2013) y presentar una imagen generada como si fuera el resultado
real de un cliente entra en práctica comercial engañosa (Directiva 2005/29/CE). **Antes de usar
estas fotos en anuncios pagados hay que sustituirlas por fotos reales con consentimiento**, o
dejar el aviso igual de visible que la imagen. El aviso está en el mismo bloque y no se puede
ocultar con una opción del CRM, a propósito.

## Qué hay de cada zona

Diez zonas, cada una con `-antes.webp`, `-despues.webp` (1200×1200) y `-aplicar.webp` (1600×1200):

`nariz` · `granos` · `superficie` · `barbilla` · `frente` · `exfoliante` · `serum` · `peeloff` ·
`mascarillas` · `tonico`

Los packs y los planes comparten la zona de su producto estrella, con su propio titular: el Dúo
cuenta los dos pasos, el Kit Zona T cuenta la noche entera, el plan cuenta el mes que no te quedas
sin. El mapa slug → zona está en `public/assets/js/photos.js`.

`tools/foto/piel.py` pasa los PNG de 2880 px a WebP en los dos tamaños. **No recorta nada**:
recortar una de las dos fotos y la otra no es justo la trampa que esta sección evita.

## Dónde aparece cada foto

| Foto | Dónde |
|---|---|
| `aplicar` | segunda diapositiva de la galería, y bloque «Cómo se pone» |
| `despues` | tercera diapositiva de la galería, y mitad derecha del par |
| `antes` | sólo en el par, nunca suelta |

El «antes» no se enseña nunca fuera de la comparación: una foto de un grano, sola en un carrusel,
no vende nada.

El bloque «Cómo se pone» (`.n-ap`) usa los pasos que ya están escritos en el catálogo (`p.how`),
no un texto nuevo, y **no se pinta en los productos que ya tienen los tres pasos en vídeo**.

## Qué comprueba la prueba

`node nocta/tools/web-qa/ficha.js` — que el par exista en productos sueltos, packs y planes; que
las dos fotos **midan exactamente lo mismo en pantalla**; que el «después» esté a la derecha; que
el aviso diga que son ilustrativas y que no son de clientes; que el pie cuente zona y tiempo; que
las fotos lleven texto alternativo y `loading="lazy"`; que la galería enseñe el producto puesto y
el resultado; y que donde hay vídeo de los pasos no se repita la sección de fotos.
