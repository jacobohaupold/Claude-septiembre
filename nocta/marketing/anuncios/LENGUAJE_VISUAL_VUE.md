# EL LENGUAJE VISUAL DE VUE SKIN Y QUÉ COPIAMOS

**Versión 1.1 · 12 de septiembre de 2026.** Todo lo que hay aquí sale de dos sitios y de ningún otro. Uno: la
investigación visual de Vue Skin / Vue Swiss hecha en esta sesión mirando unos 700 fotogramas reales de su
biblioteca de anuncios (60 hojas de contacto de Meta Ads, 11 hojas de TikTok, 16 creatividades estáticas 9:16 a
resolución completa y 20 anuncios de Google), cruzada con el informe de longevidad de sus anuncios en Meta. Dos:
la biblia visual de NOCTA (`BIBLIA_VISUAL.md`), que son las reglas ya comprobadas generando 22 imágenes de verdad
con GPT Image 2.5. Los guiones y las tomas a los que se aplica todo esto son los 25 anuncios seleccionados y sus
375 tomas.

Cuando un dato viene de la investigación de Vue lo digo entre paréntesis. Cuando viene de nuestras propias pruebas
de generación, también. Cuando es opinión mía de dirección de arte o una deducción, pongo **sin verificar**.

Este documento no genera nada. Es el manual que hay que tener abierto al lado cuando se escriben o se corrigen
prompts.

**Qué cambió en la 1.1.** Se repasó cifra por cifra contra `inv_vue-lenguaje-visual.json`, `BIBLIA_VISUAL.md`,
`ads25.json` y `desgloses.json`. Se corrigieron cinco cosas que estaban mal: la garantía no la nombran tres
anuncios sino los veinticinco; los anuncios de Google no son veinte de texto puro sino diecinueve más uno con
miniatura; la lista de los «Todos» que se quedan con un avatar estaba incompleta; las uñas cortas no son opinión
mía, ya están escritas en las fichas de continuidad; y la tabla del punto 8.1 tiene diez filas, no nueve. Se
añadieron además las tres reglas de la biblia que faltaban (número de estado del parche, parche visible, referencia
de nariz limpia), el anuncio 20 a la lista de fotogramas 1 que conviene afinar, el aviso de que el desglose ya
escrito del anuncio 3 lleva dos espejos prohibidos, y las frases en inglés de los consejos que estaban solo en
prosa. Lo que sigue sin verificar va marcado como tal en su sitio: el ritmo de la segunda mitad del anuncio.

---

## Índice

1. [El resumen en diez líneas](#1-el-resumen-en-diez-lineas)
2. [Qué hace Vue Skin, plano a plano](#2-que-hace-vue-skin-plano-a-plano)
3. [Qué copiamos tal cual](#3-que-copiamos-tal-cual)
4. [Qué copiamos cambiado](#4-que-copiamos-cambiado)
5. [Qué NO copiamos](#5-que-no-copiamos)
6. [Dónde nos separamos a propósito](#6-donde-nos-separamos-a-proposito)
7. [Guía de estilo de una página](#7-guia-de-estilo-de-una-pagina)
8. [Cómo se aplica a los 25 anuncios](#8-como-se-aplica-a-los-25-anuncios)
9. [Bloques de texto para pegar](#9-bloques-de-texto-para-pegar)
10. [Decisiones que no puedo tomar yo](#10-decisiones-que-no-puedo-tomar-yo)

---

## 1. El resumen en diez líneas

Vue Skin no tiene estética. Tiene una **gramática de gestos** muy repetida, rodada con luz mala y sin grado de
color (investigación de esta sesión sobre ~700 fotogramas). Todo su sistema se apoya en cuatro imágenes que salen
una y otra vez:

1. Dos dedos índice apretando a los lados de la nariz y estirando la piel.
2. Macro de nariz brillante de grasa con los filamentos visibles.
3. El parche puesto, mate, con el borde perfectamente visible sobre la piel.
4. El parche usado pinzado entre dos dedos y levantado a contraluz.

Los anuncios suyos que aguantaron 290 días llevan las cuatro. Los que murieron en 0 días suelen tener dos o tres
y además abren con un bodegón o con una cara sonriendo.

La regla que sale de ahí se puede comprobar antes de mandar nada a generar: **cada uno de los 25 anuncios lleva las
cuatro imágenes, y el fotograma 1 es la 1, la 2 o la 3.** Un desglose al que le falte una de las cuatro no se
genera: se corrige primero. La comprobación es de un minuto por anuncio, con el desglose delante.

---

## 2. Qué hace Vue Skin, plano a plano

### 2.1 Reparto real de encuadres

Recuento propio sobre unos 700 fotogramas de 21 anuncios de Meta más las 11 hojas de TikTok (investigación de esta
sesión, confianza media en los porcentajes exactos, alta en el orden de magnitud).

| Encuadre | Peso | Cómo es exactamente |
|---|---|---|
| Cara a cámara, plano medio-corto | 35-40 % | Selfie a distancia de brazo, teléfono fuera de cuadro |
| Cara + manos sobre la nariz | ~20 % | El gesto firma, ver 2.2 |
| Macro de nariz | ~15 % | La nariz ocupa del 40 al 70 % del cuadro |
| Parche puesto en la nariz | ~8 % | Cara entera o tres cuartos, el borde del parche se lee |
| Producto en mano a la altura del pecho | ~10 % | Caja o sobre sostenido, nunca sobre mesa |
| Parche usado pinzado y levantado | ~5 % | El plano prueba |
| B-roll de esquema de poro | ~5 % | Dibujo plano, feo a propósito |
| Captura de web, reseñas o garantía | ~3 % | Grabación de pantalla, al final |
| Baño real con lavabo | ~3 % | Azulejo, grifo, espejo al borde del cuadro |
| Cama o dormir | ~2 % | Casi no existe, ver 2.4 |
| Tira de poros negra | ~2 % | El enemigo |
| Packshot puro de producto | ~2 % | Casi solo en estáticos, nunca a mitad de vídeo |

Dos cosas que se leen de esta tabla y que nos afectan directamente. Una: **el 55-60 % de sus planos son una cara y
unas manos**, no producto. Dos: **casi todos los planos son de una sola persona**; no hay planos de dos salvo
tres o cuatro b-rolls de pareja.

Dentro del macro de nariz hay dos subtipos, y los dos se repiten: (a) tres cuartos o perfil con la nariz en el
centro, el ojo cortado por arriba y los labios por abajo, que es el más frecuente; (b) frontal desde abajo con las
fosas nasales visibles.

### 2.2 El gesto firma

Es la imagen más repetida de toda su cuenta: los dos dedos índice apoyados a ambos lados del puente o de las alas
de la nariz, presionando y estirando la piel ligeramente hacia fuera, con la cara de frente y la mirada al
objetivo o baja. Aparece en casi todas las hojas de contacto, muchas veces dos o tres veces en el mismo anuncio.
La referencia más clara es `616847234347568.jpg`: en la fila 2 hay seis personas distintas haciendo exactamente el
mismo gesto.

Variantes que también repiten: un solo índice señalando la punta o el ala; el pulgar y el índice apretando la
nariz (el plano del «no hagas esto»); las dos manos enmarcando las mejillas al final; alisar el parche con dos
dedos de cada mano, del centro hacia fuera, simétrico.

Detalle que importa para generar: **los generadores, por defecto, ponen la mano en la mejilla o en el mentón**. Eso
es otro código, el de la crema hidratante. Hay que describir el gesto con dedos contados.

### 2.3 Luz

Tienen dos luces y nada más (investigación de esta sesión; hojas `1521688038516658`, `602011846179690`,
`1523076026195199`, `1626762201753051`).

| | Luz A · la dominante | Luz B · la del problema |
|---|---|---|
| Peso en los planos de cara | ≈60 % | ≈20 % |
| Fuente | Ventana frontal, suave y difusa, detrás de la cámara | Plafón de baño cenital |
| Temperatura | 5000-6000 K | 3500-4000 K |
| Sombras | Ninguna dirección reconocible | Sombra corta bajo la nariz |
| Brillo especular | Leve en el puente | Fuerte en el puente y en la frente |
| Fondo | 1 a 1,5 pasos por debajo de la cara | Igual o más oscuro |
| Piel | Rosada o rojiza, **nunca dorada** | Rosada con brillo de grasa marcado |
| Para qué la usan | Hablar a cámara, gesto firma, cierre | Todo plano de nariz grasa |

En los planos de nariz grasa **el brillo es la prueba**: sin brillo especular no se lee la grasa, y el plano no
sirve aunque los poros estén bien. Si una macro sale mate, se repite con la luz B.

Aceptan luz fea sin complejos: reflejo de aro en los ojos, frentes quemadas, dominantes verdosas de bombillas LED,
amarillas de dormitorio. No hay coherencia de color entre anuncios ni dentro del mismo anuncio de montaje. Los
macros llevan luz dura casi axial (flash de móvil o ventana muy cerca): es lo que hace que los filamentos se lean
como puntitos oscuros rodeados de brillo. Y un detalle fino: sus planos «después» son sistemáticamente medio paso
más claros y más difusos que los «antes».

### 2.4 La noche no la cuentan con luz: la cuenta el rótulo

Es su carencia más llamativa y es nuestra oportunidad más clara. El plano de dormir aparece en menos del 2 % de los
fotogramas, y cuando aparece es una de estas tres cosas:

- Un dormitorio oscurísimo, casi silueta, verdoso-azulado y subexpuesto, con un rótulo «HOUR 1» / «HOUR 6» encima
  (`1844535343587173`, fila 2).
- Alguien tumbado de lado sobre una almohada blanca **con luz de ventana normal**, es decir, luz de día fingiendo
  ser noche (`tt_7507254068608257302`, fila 2 col 1).
- No se rueda: dicen «apply before bed» sobre un plano de cara a cámara con luz de día.

Y el plano de mañana está rodado con exactamente la misma luz plana de ventana que el resto del anuncio. **El
contraste noche/mañana lo lleva el texto, no la fotografía.** En sus antes/después estáticos van más lejos:
el panel «after» tiene incluso un fondo de otro color y está más cálido y más claro (`img_763c1415d44f`,
`img_3820f21d9c48`). Eso es exactamente lo que hace que un antes/después no se crea.

### 2.5 Ritmo y montaje

La duración total de sus anuncios **no la mide la investigación** (las hojas de contacto son un muestreo de 18
fotogramas, no el vídeo entero), así que no la doy. Lo que sí está medido es todo esto, cruzado contra el informe
de longevidad de Meta:

| | Los que aguantaron 290 días | Los que murieron en 0-5 días | Referencias |
|---|---|---|---|
| Fotograma 1 | Macro de nariz, nariz tocada o parche | Bodegón en una mesa, plano general de habitación o cara hablando sin problema visible | Vivos: `1521688038516658`. Muerto: `1387750329450996` |
| Encuadres distintos por anuncio | 15-18 en las 18 celdas, casi sin repetir | El mismo encuadre 6-8 veces seguidas | `772789505845233` es un hombre en un coche, plano fijo de principio a fin |
| Ritmo de corte | 1 a 1,5 s | Planos largos o fijos | — |
| Reparto | Montaje de 6-12 personas distintas, mezclando edades, tonos de piel y sexos | Testimonio de una sola persona | `1521688038516658`, `431654490028386`, `616847234347568`, `1584088272180999` |
| Dónde cae el parche usado | Al 40-55 % del anuncio | Al final o no está | — |
| Piezas obligatorias presentes | Las cinco (ver 8.5) | Fallan dos o tres | — |
| Tasa de acierto del activo | 64,5 % si va agrupado en 6-20 anuncios casi idénticos | 20,9 % si va suelto | Informe de longevidad de Meta |

El número de encuadres distintos es el predictor, no la duración. Y el 64,5 % frente al 20,9 % es la cifra con más
respaldo de todo el material: es la que justifica el banco de planos compartido del punto 8.3.

### 2.6 Las personas

| Segmento | Peso | Cómo van | Referencias |
|---|---|---|---|
| Mujeres de 20-30 | 80-85 % | Sin maquillaje o «clean girl» mínimo: cejas peinadas, a veces extensiones de pestañas, labio nude con brillo | `1521688038516658`, `616847234347568` |
| Mujeres de 40-50 | El 15-20 % restante se reparte entre este segmento y el siguiente; la investigación no lo desglosa más | Rodadas exactamente igual, con líneas nasogenianas y patas de gallo **sin retocar** | `1974541206772491`, `1933305283958057` |
| Hombres de 25-45 | Ídem | Incluyen calvos con barba larga; el material más crudo de la biblioteca. Uno de estos anuncios aguantó 225 días | `772789505845233`, `832919773160815`, `8414165492021049` |

Pelo suelto y despeinado o recogido con **diadema de rizo de toalla** (rosa, azul o blanca), atrezo que sale
constantemente. Ropa: tirantes de canalé, camisetas blancas, grises o negras lisas, punto crudo, albornoz o pijama
de raso. Colores planos, sin estampados, sin logos, sin joyería más allá de aros pequeños y algún anillo.

La piel es real: poros visibles, rojeces en las alas de la nariz y en las mejillas, granitos, tono irregular,
pecas, barba de tres días. Cero retoque de belleza.

El único elemento arreglado son las uñas: de gel, largas, almendradas, en blanco, nude, rojo o burdeos. Y están
permanentemente en cuadro porque las manos están siempre en la cara. Esto es lo suyo; lo nuestro es lo contrario y
está explicado en el punto 4.3.

### 2.7 Cómo enseñan el producto

**El parche sin usar.** No es un rectángulo. Es una silueta con arco ancho y redondeado arriba, estrechamiento en
el medio y dos lóbulos redondeados abajo separados por una muesca en V. Sin usar es translúcido, esmerilado,
blanco lechoso; se ve la piel a través de él; acabado **mate**, no brillante; viene sobre una película de plástico
transparente que se retira en dos mitades (lo explican señalando con el dedo en `tt_7363649001700248864`).

**El parche puesto.** Se lee como una película blanca-grisácea mate, un poco más clara que la piel, con el borde
perfectamente visible. Parece esparadrapo de papel. Con poca luz vira a gris azulado.

**El parche usado, que es su plano prueba.** Lo sostienen pinzado entre pulgar e índice, a veces con las dos manos,
levantado contra una pared neutra o contra la ventana. Lo absorbido se lee como un **moteado blanco opaco muy
denso concentrado en la franja central** del parche, mientras los bordes siguen translúcidos. A contraluz parece
una nube de granitos blancos apretados. A veces hay unos pocos puntitos oscuros dispersos. **Nunca lo enseñan
amarillo y nunca con masa negra.** El plano de retirada es siempre lento, despegando desde un borde, con la cara
relajada. Nunca un tirón.

**El packshot.** Caja de cartón mate en azul grisáceo apagado con el logotipo en blanco pequeño, sin fotografía de
producto ni reclamos. Se rueda de tres maneras y ninguna es de estudio: sostenida por dos manos a la altura del
pecho contra una pared gris lisa; apoyada en una repisa beige con un cuenco al lado y sombra dura de sol; o tirada
sobre una manta blanca. Siempre luz de día y sombras reales.

### 2.8 El enemigo visual

El anti-producto se rueda siempre de una de estas tres formas: la tira negra **puesta** sobre la nariz, brillante y
granulada, en tres cuartos; la tira arrancada y girada hacia cámara con los tapones pegados; o un CGI grotesco de
piel rosa saturada con una masa negra saliendo de un poro rojo e inflamado. Ese CGI sale en decenas de anuncios y
es feo a propósito: fondo salmón plano, sebo amarillo mostaza, borde rojo de inflamación, aire de libro de texto de
los noventa.

La regla de color que se deduce es clarísima y hay que respetarla: **el negro es del enemigo**. Su parche usado
siempre es moteado blanco. El nuestro también, siempre.

### 2.9 Texto en pantalla y dónde dejan aire

Todos sus fotogramas llevan rótulo quemado y los encuadres están compuestos para ello: caja blanca con texto negro,
o texto blanco con contorno, a la altura de las cejas o en la banda del tercio superior, y a veces una segunda
línea en el tercio inferior. En los macros de nariz el rótulo baja a la banda inferior para no tapar los
filamentos.

Las campañas de rebajas añaden además una franja negra fija arriba y abajo que come un 12 % del alto
(`1130376919143082`, `841286144965676`), y esos anuncios rinden peor en su propia biblioteca (confianza media: la
correlación está, la causa no está demostrada).

### 2.10 Calidad de imagen

Sus fotogramas **no son nítidos**. Tienen desenfoque de movimiento de la mano, foco que caza mal en los macros,
compresión visible y brillo especular de sensor de móvil, no de cámara. Los planos de producto en mano tienen
profundidad de campo cortísima con el borde del parche fuera de foco. Esto no es un defecto, es el código de
credibilidad: **lo nítido parece anuncio**.

### 2.11 Lo que no hacen nunca

Ni estudio, ni ciclorama, ni softbox, ni rim light, ni fondo negro de belleza. Ni cámara lenta de producto con
salpicaduras, ni producto flotando, ni líquidos brillantes. Ningún «después» que sea otra persona más guapa: es
siempre la misma nariz y casi el mismo encuadre. Ni maquillaje completo, ni contouring, ni pestañas postizas en los
planos de hablar a cámara. Ni color de marca en el decorado: su azul está solo en la caja, jamás en paredes, ropa
o atrezo. Ni whip pans, ni speed ramps, ni zoom transitions: son cortes secos con cámara fija y el sujeto en
movimiento. Ni grado dorado, ni teal-and-orange, ni grano de película. Ni sonrisa en el gancho: el primer fotograma
es siempre un problema, una mueca o un dedo señalando. Ni niños, ni grupos, ni exteriores de estilo de vida.

Y un dato operativo: en sus 20 anuncios de Google no hay nada que copiar. Diecinueve son anuncios de búsqueda de
**texto** puro; el vigésimo (`CR07996720727053041665`) lleva una miniatura de producto y nada más. No abras esa
carpeta buscando referencias.

---

## 3. Qué copiamos tal cual

Estas ocho cosas se copian sin tocar nada. Ninguna es gusto mío: las 1, 2 y 5 están cruzadas contra el informe de
longevidad de Meta, y las demás salen del recuento de encuadres y de luz sobre los ~700 fotogramas.

**1. El fotograma 1 es la nariz o el parche.** Siempre. En los 25 anuncios. Si el guion empieza con una cara
hablando, se antepone medio segundo de macro de nariz y la cara entra después.

**2. El gesto firma en el primer o segundo plano de cada anuncio.** Dos dedos índice a los lados de la nariz
estirando la piel. Hay que escribirlo contando dedos o el generador pone la mano en la mejilla.

```
Both index fingers pressed against either side of the bridge of her nose, stretching the skin
slightly outward, the other three fingers of each hand folded down, five fingers per hand, both
hands symmetrical.
```

**3. La luz de ventana plana y fría como luz base.** Frontal, difusa, 5500 K, fondo un paso por debajo, sin
dirección de sombra reconocible.

```
soft flat daylight from a north-facing window in front of the subject, cool-neutral white balance
around 5500K, background one stop darker than the face, no visible shadow direction
```

**4. La luz de baño cenital cálida para todo plano de nariz grasa.** El brillo especular es la prueba del problema.

```
warm bathroom ceiling light from directly above, 3800K, short hard shadow under the nostril,
strong specular highlight on the tip and the bridge of the nose
```

**5. El parche usado se enseña a contraluz, pinzado, con moteado blanco en la franja central y los bordes
translúcidos.** Y nunca negro, nunca amarillo entero. El prompt entero, con nuestra geometría, está en el punto 9
(«Parche usado a contraluz»). Se pega ese, no se escribe uno nuevo.

**6. La retirada es lenta y desde un borde, con la cara relajada.** Nunca un tirón. Nunca una mueca de dolor: el
dolor es de la tira. Y el despegado se describe como **una sola lámina continua**, porque si se escribe «la mitad
izquierda despegada y la derecha pegada» el modelo saca dos parches separados (biblia, regla 5 de las comprobadas
generando):

```
ESTADO 4 DE 5 (a medio quitar). She is peeling the patch off in ONE CONTINUOUS SHEET: the right
portion is still stuck flat and translucent on the right side of the nose, and WITHOUT ANY BREAK it
lifts along one single boundary down the ridge and hangs from her thumb and index finger at the
left, curled, limp, its underside turned to the camera. The underside shows irregular opaque
milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs
pulled out of the pores. She is pulling slowly and parallel to the skin, never upward, her face
relaxed, eyes half closed, no grimace, no pain. The skin already uncovered is CLEAN: open EMPTY
pores, no dark dots. [COLA OBLIGATORIA]
```

**7. La calidad blanda de móvil.** Desenfoque de movimiento, foco imperfecto, compresión, ruido de sensor. Ya está
en nuestra fórmula de prompt (biblia §4, huecos 1 y 6) y coincide punto por punto con lo suyo.

**8. Hablar a cámara sin móvil visible**, selfie a distancia de brazo, de la coronilla ligeramente cortada a media
caja torácica, ojos al tercio superior, mirada al objetivo, boca abierta a media palabra.

```
Arm's length front-camera selfie with the phone NOT visible, framed from the slightly cropped top
of her head to mid-chest, eyes at the upper third, looking straight into the lens, mouth open
mid-word, one hand rising toward her nose at the edge of the frame.
```

Esto además nos conviene por otro motivo: nuestra propia regla comprobada prohíbe espejos y superficies
reflectantes porque son la vía más rápida a un brazo de más en el cuadro (biblia, regla 3 de las comprobadas
generando).

---

## 4. Qué copiamos cambiado

**1. La forma del parche: el concepto sí, el troquel no.**
Copiamos la idea de describir la silueta en cada prompt en vez de decir «nose patch». Lo que **no** se copia es su
descripción. Su parche es un escudo con arco y dos lóbulos; el nuestro es una mariposa de 60 × 45 mm con un lóbulo
central y dos alas de 23 mm (biblia §1, medidas del producto real). **Nunca pegar la descripción del parche de Vue
en un prompt de NOCTA.** Y, sobre todo, la parte que ya está comprobada generando: describir la forma con palabras
no basta, hay que adjuntar las fotos reales del producto como referencia y abrir el prompt con «The patch must be
EXACTLY the product in the reference photographs».

**2. El packshot: la manera sí, el color no.**
Copiamos que el packshot va en manos o en una repisa de baño real con luz de día y sombra real, nunca sobre fondo
infinito. No copiamos el azul grisáceo: nuestra caja es de cartón crema mate con el logotipo en azul marino. Y de
ahí sale un problema que hay que arreglar: **caja crema sobre mármol crema no se ve**. El sitio 5 de la biblia (mesa
de mármol crema) no sirve para la caja cerrada; sí sirve para los sobres y el parche.

```
Two bare hands holding a matte cream cardboard box at chest height against a plain cool grey
bathroom wall, small navy lowercase wordmark centred on the box, no product photo on the packaging,
no other saturated colour in the frame. Soft window light from the left casting one real soft
shadow on the wall behind. Handheld iPhone photo.
```

**3. El gesto firma con las manos de aquí.**
Copiamos el gesto. Cambiamos las uñas. Las suyas son de gel largas almendradas y siempre en cuadro, porque las
manos están siempre en la cara; eso lee a creadora de contenido y nuestro código es «una tía normal de Madrid».

Esto ya está decidido en las fichas de continuidad de `desgloses.json`, así que no hay que debatirlo: Bea y Marisol
llevan **uñas cortas sin pintar**, y Álex **uñas cortas con un padrastro en el pulgar derecho**. Va tal cual en
cada prompt donde salga una mano:

```
short natural nails, unpainted, no gel extensions, no almond shape
```

Ojo con lo otro que dice la investigación de Vue: su recomendación era ponerle a Bea y a Marisol uñas de gel largas
en nude o burdeos. Gana la ficha de continuidad, porque los avatares ya están generados con uñas cortas y cambiarlas
rompería la continuidad entre las 15 tomas.

**4. El atrezo de rutina.**
Su diadema de rizo de toalla es un atajo buenísimo para decir «esto es la rutina de noche» sin una palabra. No la
metemos en la cabeza de Bea porque rompería la continuidad con el retrato de referencia ya generado (pelo recogido
con pinza negra mate, biblia §2). Lo que sí hacemos es sacar el mismo mensaje al fondo, con el atrezo que ya está
fijado en la ficha de continuidad:

```
Background props, always the same and always out of focus: a white towel hanging on the wall to
the right of the basin, a glass with a toothbrush on the basin edge, a chrome tap. Nothing else on
the counter, no bottles, no jars, no brand-coloured objects.
```

El mismo mensaje, sin tocar el avatar.

**5. El esquema de poro, feo a propósito.**
Copiamos que sea plano, saturado y casi de libro de texto. No copiamos la masa negra: en el nuestro el tapón es
gris-marrón o amarillo pálido, porque el negro es de la tira.

```
Flat cross-section illustration of a skin pore, salmon-pink flat background, the pore drawn as a
pink teardrop-shaped cavity filled with a cluster of mustard-yellow and grey-brown sebum plugs,
a thin red inflamed rim, 2D vector look, saturated, slightly crude, like an old textbook diagram.
Centred, plenty of empty space at the top and bottom. No text, no logos, no watermark.
```

**6. La captura de web con la garantía.**
Copiamos que exista y que vaya al final. Cambiamos cómo se hace: **no se genera con IA**. Un pantallazo generado
lleva texto inventado y nuestra regla es «no text, no logos, no watermark» en todas las imágenes.

Se graba así, una sola vez, y sirve para los 25 anuncios: móvil en vertical, grabación de pantalla de la web real
de NOCTA, 3-4 segundos, el pulgar haciendo scroll despacio hasta la línea de la garantía, medio segundo quieto
sobre ella, sin zoom y sin cortes. Se guarda como `captura_garantia.mp4` en el banco de planos.

---

## 5. Qué NO copiamos

**1. Su manera de contar la noche.** Es lo peor que tienen. Cuentan la noche con un rótulo encima de un plano de
día. Nosotros no ponemos texto en las imágenes, así que copiarles nos dejaría sin plano de noche reconocible.
Nuestra noche se rueda con luz de verdad, y además ya sabemos cómo, porque decir «night bathroom, 23:30» da una
imagen de día (comprobado generando; biblia, regla 3):

```
IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard
shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are
bright and the eye sockets are dark, and the window behind is pure black. No daylight, no soft
window light, no blue sky.
```

Y para el dormitorio:

```
IT IS NIGHT: the only light is a warm bedside lamp low on the left, 2700K, everything else falls
into darkness, the background is almost black, deep shadows, visible low light noise. No daylight,
no soft window light, no blue sky.
```

**2. Su antes/después.** Cambian el tinte del fondo y la temperatura de color entre los dos paneles
(`img_763c1415d44f`, `img_3820f21d9c48`). Eso hace que parezca truco. El nuestro va con el **mismo encuadre, la
misma distancia, el mismo fondo y la misma luz**, y lo único que cambia es la piel.

```
IDENTICAL framing, identical camera distance, identical background and identical soft window light
from the front-left in both images. Only the skin of the nose changes.
```

**3. Las franjas de promoción fijas arriba y abajo.** Comen el 12 % del alto, tapan justo donde van nuestros
subtítulos y en su biblioteca coinciden con peor longevidad. La oferta va dicha en la voz y en el subtítulo, no en
una franja quemada.

**4. Su incoherencia de color.** Ellos no tienen coherencia ninguna: verdes de LED, amarillos de dormitorio, cada
plano de su padre y de su madre. A nosotros eso no nos sirve porque nuestros 25 anuncios tienen que parecer de la
misma marca. Por eso la biblia fija cinco sitios y solo cinco. Mantenemos su tipo de luz, pero con nuestro control
de sitios.

**5. La masa negra sobre el producto.** Ni un fotograma de NOCTA puede llevar gunk negro sobre nuestro parche. Si
nuestro parche sale negro, visualmente nos convertimos en la tira de poros, que es el enemigo del guion.

**6. El bodegón de apertura.** Su patrón exacto de muerte en 0 días. Producto sobre una mesa en el segundo 0, no.

**7. Google Ads como referencia visual.** Diecinueve de sus veinte son texto puro y el que queda es una miniatura
de producto. No hay encuadre, ni luz, ni gesto que copiar.

---

## 6. Dónde nos separamos a propósito

Tres decisiones de diferenciación, cada una con la cosa concreta que hay que hacer.

**Noche de verdad contra noche de rótulo.** Ellos cuentan la noche con un rótulo sobre un plano de día. Nosotros
rodamos la noche con la luz descrita en el punto 5.1 y la mañana con la del punto 7, y las dos con la misma
distancia de cámara y la misma posición de cabeza. Qué hacer: en cada anuncio que tenga noche y mañana, los dos
prompts se escriben copiando el mismo bloque de sujeto y encuadre y cambiando **solo** el bloque de luz.

**Antes/después con la misma luz.** Su antes/después es más vistoso y menos creíble. Qué hacer: los dos paneles
llevan el bloque `IDENTICAL framing...` del punto 5.2, mismo fondo y misma luz, y lo único que cambia es la piel de
la nariz.

**La continuidad física del parche.** Vue enseña el parche usado y ya está. Nosotros tenemos escritos los cinco
estados (1 sin parche, 2 recién puesto, 3 saturado, 4 a medio quitar, 5 fuera) y la regla de que **cada imagen está
en un estado y solo en uno** (biblia §1). Qué hacer: **todo prompt donde salga el parche empieza escribiendo el
número de estado**, así:

```
ESTADO 3 DE 5 (parche saturado). ...
```

Es la línea más barata del documento y evita el error más caro de las pruebas: una imagen con el parche a la vez en
la mano y pegado en la nariz, que no sirve y hay que repetirla.

**Lo que NO usamos para diferenciarnos.** El móvil visible. En unos 700 fotogramas suyos no hay ni un solo
espejo-selfie con el teléfono en la mano. Podríamos hacerlo para separarnos en el feed español, pero choca con
nuestra propia regla comprobada contra espejos y reflejos, que son la causa número uno de brazos de más y
segundas personas en el cuadro. Así que no: **el móvil solo aparece como despertador o como pantalla de la web**,
nunca en un plano de belleza. Y en la cola negativa va siempre `no mirrors, no reflective surfaces showing a
person`.

---

## 7. Guía de estilo de una página

Esto es lo que se imprime y se deja al lado del teclado.

**Paleta.** Piel real rosada, blanco de azulejo, gris de pared, crema del cartón, azul marino solo en el logotipo.
Nada más. El fondo siempre uno o uno y medio pasos por debajo de la cara. Ningún color de marca en paredes, ropa ni
atrezo: el color de NOCTA vive en la caja y en el subtítulo, no en el decorado.

**Luz.** Cuatro luces, ninguna más:

| Nombre | Cuándo | Descripción en el prompt |
|---|---|---|
| Ventana de día | Base de casi todo, macros de diagnóstico, cierre | `soft north-facing window light from the left, 10:00, background one stop darker` |
| Plafón de baño de noche | Colocación del parche, «antes de dormir» | `hard ceiling fixture directly overhead, short hard shadows straight down, window behind pure black` |
| Mesilla de dormitorio | Dormir | `warm bedside lamp 2700K low from one side, everything else falling into darkness` |
| Ventana de mañana | Retirada, parche a contraluz, nariz después | `clean side window light, 07:40, cool and flat` |

Las horas de la tabla son nuestra convención, no un dato de Vue: las 10:00 y las 23:30 vienen de los sitios 1 y 2
de la biblia, y las 07:40 las fijo yo aquí para que la ventana de mañana salga siempre igual en los 25 anuncios.
Se escriben en el prompt porque el modelo responde mejor a la hora que a «morning light».

**Encuadre.** Vertical 9:16 siempre. Cámara a la altura de los ojos o un pelo por encima. Distancia de 40 a 80 cm
en los planos de cara (medido en su material) y de 15 cm en los macros (es la distancia que ya piden los guiones,
`ads25.json`, anuncio 1). Una sola persona por plano. La acción vive en la franja central vertical, del 25 % al
75 % del alto. El 0-20 % de arriba y el 80-100 % de abajo se dejan tranquilos, con fondo simple, porque ahí van los
subtítulos.

**Movimiento de cámara.** Cámara fija con micro-temblor de mano. Como mucho un empuje muy lento. Nada de órbitas,
grúas, whip pans ni rampas de velocidad. Lo que se mueve es el sujeto, no la cámara.

**Ritmo.** Un corte cada 1 a 1,5 segundos en el primer tercio (esto sí está medido en su material); después, entre
1,5 y 2,5 segundos (**sin verificar**: la investigación solo mide el 1-1,5, el alargue de la segunda mitad es
criterio mío para que la prueba y el cierre respiren). Nunca el mismo encuadre dos veces seguidas.

**Voz en off.** Aquí aviso: la investigación de Vue es solo visual, **no hay datos de audio suyos**. El tono de
abajo sale de los guiones ya escritos de nuestros 25 anuncios. Segunda persona del singular. Frases de menos de
quince palabras. Presente de indicativo. Ni una exclamación. Nada de «¡increíble!», «el secreto», «lo que nadie te
cuenta». Se nombra el problema, se absuelve al que escucha («no te ha funcionado porque los tratabas como puntos
negros»), se explica el mecanismo en una frase y se dice el plazo de verdad. Grabada con el micro del móvil, con
aire de habitación, no de cabina.

**Subtítulos.** Los pone el dueño en montaje, nunca la IA. Una línea, máximo dos. Frases de cuatro a seis palabras.
Blanco con contorno negro fino, o caja blanca con texto negro si el fondo es claro. El rótulo del gancho va arriba,
en la banda del tercio superior, a la altura de las cejas. Los subtítulos de la voz van abajo, dentro de la banda
del 80-100 % del alto que dejamos libre. En los macros de nariz, todo abajo, para no tapar los filamentos.

**Las tres reglas de la biblia que se olvidan siempre.** Están comprobadas generando y no son negociables. Van en
esta página porque este documento se centra en el lenguaje de Vue y es fácil dejarlas fuera.

| Cuándo | Qué se escribe, sin cambiar una palabra |
|---|---|
| En todo prompt con el parche, al principio del todo | `ESTADO N DE 5 (...)`, más `The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape.` |
| En todo plano con el parche **puesto**, porque si no el modelo lo hace invisible | `a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed against the skin` |
| En todo plano de nariz **después**, porque el avatar de referencia tiene la nariz sucia y el modelo la conserva | Segunda referencia con la nariz ya limpia, más `The SECOND reference is the nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that second reference, open EMPTY pores, no dark dots.` y, en positivo, `the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere` |

Y las referencias que se adjuntan en cada imagen (biblia §5): el retrato del avatar en toda imagen con persona, la
foto de la caja en toda imagen con caja o sobre, y las fotos reales del parche (`parche_liner`, `parche_puesto`,
`parche_puesto_2`) en toda imagen con parche. Sin esas fotos el troquel sale mal, por muy bien escrita que esté la
geometría.

**Prohibido.** Estudio, ciclorama, softbox, rim light, fondo negro. Hora dorada, grado cinematográfico, teal and
orange, HDR, grano de película. Maquillaje completo, contouring, pestañas postizas, piel sin poros. Espejos,
grifos que devuelven la cara, cualquier superficie que refleje a una persona. Producto flotando, salpicaduras,
cámara lenta de producto. Bodegones de apertura. Texto, logotipos y marcas de agua dentro de la imagen. Niños y
grupos. Sonrisas en el fotograma 1. Masa negra sobre nuestro parche. Y las palabras `8k`, `hyperrealistic`,
`cinematic`, `professional photography`, `beautiful woman`, `perfect skin`, `flawless`, `glowing`, `studio`,
`award-winning` dentro de un prompt.

---

## 8. Cómo se aplica a los 25 anuncios

### 8.1 El fotograma 1: nueve anuncios hay que corregirlos y tres hay que afinarlos

Es la corrección más barata y la de mayor efecto. He revisado el primer plano de los 25 guiones en `ads25.json`.
**Nueve empiezan con algo que no es una nariz ni un parche**, que es el patrón exacto de los anuncios de Vue que
murieron en 0 días. La tabla tiene diez filas porque incluyo además el anuncio 4, que arranca bien y solo hay que
cerrarle el encuadre; los otros dos afinados (el 13 y el 20) van debajo de la tabla. La columna de la derecha es el
arreglo, y no toca la voz en off ni el guion: solo el encuadre del primer plano.

| # | Anuncio | Empieza en | ¿Arreglo o afinado? | Primer fotograma nuevo |
|---|---|---|---|---|
| 3 | Se rellenan cada 3 días | Marisol a cámara, cara de fastidio | Arreglo | Macro de su nariz con brillo, y el gesto de fastidio entra en el plano 2 |
| 4 | La mayoría de las mujeres cree… | Marisol a cámara con la mano en la nariz | Afinado | Ya hay nariz: solo cerrar el encuadre para que la mano y la nariz llenen el cuadro, no la cara entera |
| 21 | 3 razones por las que te vuelven cada 3 días | Rótulo y tres dedos levantados | Arreglo | Los tres dedos **delante** de un macro de nariz grasa, fuera de foco al fondo |
| 22 | 3 señales de que tus poros necesitan ayuda | Marisol mirándose en el espejo a media mañana | Arreglo | Sin espejo (regla 3 de la biblia): macro de su nariz a media mañana, ella entra después |
| 32 | Deja de tratarlos como puntos negros | Marisol a cámara | Arreglo | Macro de nariz primero, medio segundo, y corte a ella |
| 40 | ¿Funcionan de verdad los parches de nariz? | Persona escéptica a cámara con la caja | Arreglo | Que sostenga el **parche**, no la caja, a la altura de la nariz |
| 55 | Si tienes más de 35 y esto sigue saliendo | Marisol a cámara, primer plano | Arreglo | Macro de nariz con líneas de expresión alrededor, sin retocar |
| 63 | La mayoría de los tíos de más de 35 | Álex a cámara, primer plano | Arreglo | Macro de la nariz de Álex con filamentos, que es la mejor que tenemos |
| 64 | Después del gimnasio | Álex se mira la nariz en el espejo del vestuario | Arreglo | Sin espejo: macro de su nariz sudada y brillante, la mano entra a apretar |
| 71 | Iba a hacerme un láser | Marisol con un presupuesto de clínica en la mano | Arreglo | El presupuesto **delante de su nariz**, desenfocado él, enfocada ella |

Y dos que no están mal pero conviene afinar, porque abren en el producto del enemigo y no en una nariz: el **13**
(«Las tiras de poros son una estafa»), que arranca con una tira despegándose en la mano, y el **20** («Lo que hace
la tira de verdad»), que arranca con una macro de una tira usada con pelusa y pelos. Los dos funcionan, pero ganan
si la tira sale **pegada a una nariz** en el fotograma 1: así hay nariz desde el primer cuadro y además es la del
enemigo. Los trece que quedan (1, 2, 7, 15, 17, 31, 37, 38, 44, 45, 50, 56 y 82) ya abren en nariz, en parche o en
macro del problema, y no hay que tocarlos.

**Un espejo más que se ha colado y que hay que quitar.** El anuncio 64 no es el único: el desglose ya escrito del
anuncio 3 mete el espejo en dos tomas, la 2 («el mismo instante desde tres cuartos, con el espejo entrando por el
borde») y la 6 («Marisol de tres cuartos ante el espejo»). Chocan con la regla 3 de la biblia, que prohíbe espejos
y superficies reflectantes porque son la vía más rápida a un brazo de más en el cuadro. Se reescriben las dos: la 2
con el fondo de azulejo liso en vez del espejo, y la 6 en macro de la aleta de la nariz sin fondo reconocible.

### 8.2 Los seis montajes

Este es el cambio que más afecta al plan. Nuestros 25 anuncios están escritos como 25 historias con un avatar cada
uno. Los ganadores absolutos de Vue no son testimonios de una persona: son montajes de 6 a 12 personas distintas
haciendo el mismo gesto, y los activos agrupados en variantes casi idénticas ganan el 64,5 % frente al 20,9 %.

No hace falta rehacer los 25. Once de ellos están marcados como «Todos (sin identidad explícita)» en `ads25.json`,
o sea que la voz no dice ni edad ni sexo: son el **1, 13, 20, 21, 31, 37, 40, 44, 45, 50 y 82**. De esos once, seis
se convierten en montajes y cinco se quedan como están:

| # | Anuncio | Duración | Decisión | Motivo |
|---|---|---|---|---|
| 13 | Las tiras de poros son una estafa | 40 s | Montaje de tres caras | La voz no nombra a nadie |
| 20 | Lo que hace la tira de verdad | 25 s | Montaje de tres caras | La voz no nombra a nadie |
| 21 | 3 razones por las que te vuelven cada 3 días | 35 s | Montaje de tres caras | Una cara distinta por razón |
| 31 | Deja de apretarte la nariz | 30 s | Montaje de tres caras | La voz no nombra a nadie |
| 37 | ¿Sabías que…? | 34 s | Montaje de tres caras | La voz no nombra a nadie |
| 82 | Si no ves nada en el parche, te lo devolvemos | 22 s | Montaje de tres caras | Tres parches usados distintos refuerzan la garantía |
| 44 | Qué asco (y qué gusto) | 17 s | Un avatar, **o montaje si sobra presupuesto** | Tres manos distintas levantando tres parches usados seguidas es el plano más vendedor que podemos hacer |
| 1 | Si tu nariz se ve así | 38 s | Un avatar | Depende de la continuidad de una sola nariz de principio a fin |
| 45 | Reto: una noche | 20 s | Un avatar | El reto de una noche no funciona si la nariz cambia de dueño a mitad |
| 50 | Time-lapse de 8 horas | 20 s | Un avatar | Igual: el time-lapse necesita la misma nariz en las ocho horas |
| 40 | ¿Funcionan de verdad los parches de nariz? | 45 s | Un avatar | El arco necesita una sola persona escéptica que cambie de opinión |

Los seis montajes no tocan una sola palabra del guion: Bea, Marisol y Álex se alternan haciendo el mismo gesto,
igual que en `1521688038516658`.

### 8.3 El banco de planos compartido

De aquí sale el ahorro y también el efecto «6-20 variantes» del 64,5 %. En vez de generar 375 imágenes distintas,
hay **siete planos que se repiten en casi todos los anuncios** y que se generan una vez por avatar, en tres
versiones, y se reutilizan cruzados. La última columna es lo que hay que acordarse de adjuntar o escribir, que es
donde se pierden las repeticiones:

| Plano del banco | Versiones | Se usa en | Lo que no se puede olvidar |
|---|---|---|---|
| Gesto firma, dos índices a los lados de la nariz | Bea, Marisol, Álex | Los 25, en la toma 1 o 2 | Contar dedos: `the other three fingers of each hand folded down, five fingers per hand` |
| Macro de nariz con filamentos | Bea, Marisol, Álex | Los 25, tomas 3 y 4 | El bloque de poros irregulares y la luz B |
| Parche puesto, de noche | Bea, Marisol, Álex | Los 25, toma 11 | `ESTADO 2 DE 5` + la frase de parche visible, o sale invisible |
| Parche usado a contraluz | Bea, Marisol, Álex | Los 25, toma 14 | `ESTADO 5 DE 5` + fotos reales del parche + el bloque de encuadre completo |
| Tira negra frente a parche translúcido | Una sola, manos neutras | F2 entero (13, 15, 17, 20) y 31, 32 | Misma luz y mismo plano focal en los dos objetos |
| Esquema de poro | Una sola | F1, F3, F5 | Tapón gris-marrón o amarillo pálido, nunca negro |
| Nariz limpia después, misma luz que el macro | Bea, Marisol, Álex | Los 25, toma 15 | Segunda referencia con la nariz ya limpia, o el modelo conserva los puntos |

Son 17 imágenes que cubren buena parte de las 375. El resto son las tomas específicas de cada guion. Y de paso se
consigue lo que queremos: veinticinco anuncios que comparten planos idénticos se leen como una campaña y no como
veinticinco cosas sueltas.

### 8.4 Dónde cae la prueba: hay que moverla

En los ganadores de Vue el parche usado aparece **entre el 40 % y el 55 %** del anuncio. En nuestro esqueleto de 15
tomas, la prueba es la toma 14 de 15, y en el guion del anuncio 1 cae en el bloque de 24-32 segundos sobre 38, o
sea al 63-84 %. Llegamos tarde.

El arreglo no obliga a reescribir el guion: **se mete un destello de un segundo del parche usado dentro del bloque
del mecanismo**, en torno al 45 % del anuncio, y luego se vuelve a enseñar entero en su sitio. En el anuncio 1 eso
es un solo fotograma extra sobre la frase «absorbe la grasa desde dentro del poro mientras duermes»: mientras se
dice «absorbe», se ve un flash del parche blanco moteado.

Esto sí hay que decidirlo, porque toca guiones ya aprobados. Está en la lista de decisiones del punto 10.

### 8.5 Las cinco piezas obligatorias contra nuestro esqueleto de 15 tomas

Todos sus anuncios de 290 días llevan estas cinco: macro de nariz con filamentos, esquema de poro, parche sobre una
cara, parche usado en mano, y captura de web con la garantía. Los muertos fallan en dos o tres.

Nuestro esqueleto de 15 tomas (biblia §6) cubre tres de las cinco sin tocar nada: el macro (tomas 3 y 4), el parche
puesto (toma 11) y el parche usado (toma 14). **Faltan dos**, y así se meten sin perder ninguna toma:

- **El esquema de poro** entra en la toma 4 («detalle del problema») cuando el guion explica el mecanismo, que es
  en F1, F3 y F5. Sustituye al detalle fotográfico, no se añade.
- **La captura de la web con la garantía** entra en la toma 15 («cierre»). Y aquí hay que corregir lo que yo mismo
  había escrito en la versión 1.0: no son tres anuncios los que nombran la garantía, **son los veinticinco**.
  Comprobado en `ads25.json`: la garantía o la devolución aparece en la voz o en el rótulo de los 25 guiones, sin
  excepción. O sea que la captura no es un plano de tres anuncios, es un plano de los 25, y por eso se graba **una
  sola vez** y se reutiliza (ver el punto 4.6). Eso cambia el cálculo a mejor: una grabación de pantalla de cuatro
  segundos cierra los veinticinco anuncios.

### 8.6 Reglas por familia

| Familia | Anuncios | Lo que manda el lenguaje de Vue aquí |
|---|---|---|
| F1 · Reencuadre educativo | 1, 2, 3, 4, 7 | Macro de nariz en el fotograma 1 y esquema de poro obligatorio. Luz de baño cálida para el macro: el brillo es el argumento |
| F2 · Anti-tiras y anti-apretar | 13, 15, 17, 20 | La tira siempre negra, brillante y granulada; el parche siempre translúcido mate, en el mismo cuadro y con la misma luz. El contraste es todo el anuncio |
| F3 · Listicles | 21, 22 | Un encuadre distinto por razón, corte cada segundo, nunca tres veces el mismo plano con rótulo diferente |
| F4 · «Para de…» | 31, 32 | El plano del error va con pulgar e índice apretando la nariz, y la consecuencia (rojez, marca) va inmediatamente después |
| F5 · Preguntas | 37, 38, 40 | La pregunta se hace sobre una nariz, no sobre una cara. El 37 y el 38 ya abren así (macro de nariz y POV del dedo); el 40 hay que corregirlo, ver 8.1 |
| F6 · Prueba visual | 44, 45, 50 | Son los tres que más se parecen a sus ganadores: los tres abren ya en el parche. Aquí el parche usado sale más de una vez y no solo al 40-55 %. El 50 es donde nuestra noche de verdad los deja atrás |
| F7 · Piel adulta +35 | 55, 56 | Ni una línea de expresión suavizada. Su segmento de 40-50 es el que más credibilidad les da y no retocan nada |
| F8 · Hombres | 63, 64 | El material más crudo: brillo real en frente y nariz, barba de tres días, cero arreglo. Su anuncio masculino equivalente aguantó 225 días |
| F9 · Contra tratamientos caros | 71 | El presupuesto de la clínica es atrezo, pero entra delante de la nariz, no sustituyéndola |
| F11 · Oferta y garantía | 82 | Montaje de tres caras enseñando su parche usado, y captura real de la web al final. Sin franjas de promoción |

### 8.7 De 15 imágenes a un anuncio de 17 a 46 segundos

Un cálculo que conviene tener claro antes de animar, porque los números no cuadran solos:

| | Cifra | De dónde sale |
|---|---|---|
| Planos por anuncio | 15 | Esqueleto de la biblia §6 |
| Segundos que se generan por plano | 3 a 5 | Fórmula de vídeo, biblia §7 |
| Si se montaran enteros | 15 × 4 s = 60 s | Aritmética |
| Duración real de nuestros anuncios | 17 a 46 s | `ads25.json` |
| Ritmo de corte de Vue | 1 a 1,5 s | Investigación |
| **Lo que se monta de cada clip** | **1,5 a 2,5 s** | Decisión de aquí |

La manera de cuadrarlo: **generar 3-5 segundos de clip y montar 1,5-2,5**. Los segundos que sobran son colchón para
elegir el trozo donde el movimiento es limpio y la cara no se deforma. En el primer tercio del anuncio se monta
corto (1 a 1,5 s) y a partir de la mitad se alarga un poco (2 a 2,5 s) para que la prueba y el cierre respiren.

Y los cuatro anuncios cortos no caben en quince planos:

| # | Anuncio | Duración | Planos que caben |
|---|---|---|---|
| 44 | Qué asco (y qué gusto) | 17 s | 8 a 9 |
| 45 | Reto: una noche | 20 s | 9 a 10 |
| 50 | Time-lapse de 8 horas | 20 s | 9 a 10 |
| 82 | Si no ves nada en el parche, te lo devolvemos | 22 s | 10 a 11 |

Se eligen del banco compartido y se dejan fuera las tomas 7 (entrada del producto) y 9 (preparación), que son las
más prescindibles de las quince.

---

## 9. Bloques de texto para pegar

Estos bloques se pegan tal cual. Van en inglés porque el modelo trabaja mejor en inglés (biblia §4). Y ninguno
funciona solo: cada imagen con persona lleva adjunto el retrato del avatar, cada imagen con parche lleva las fotos
reales del producto y cada imagen con caja lleva la foto de la caja (biblia §5).

**Cola obligatoria de todos los prompts de imagen.** Va detrás de los ocho huecos de la fórmula de la biblia. Une
nuestras prohibiciones ya comprobadas y las que se deducen de lo que Vue no hace nunca.

```
Shot on a smartphone, vertical 9:16, handheld, real skin with visible pores and texture, fine
vellus hair, thin red capillaries, redness on the nose wings, uneven skin tone, slight handheld
motion blur, soft imperfect focus, natural digital sensor noise, mild compression. No beauty
retouching, no skin smoothing, no makeup, unretouched documentary realism, not a 3D render.
NEGATIVE: no text, no letters, no captions, no logos, no watermark, no studio, no seamless
backdrop, no softbox, no rim light, no black beauty background, no glamour makeup, no contouring,
no false lashes, no golden hour, no cinematic grade, no teal and orange, no HDR, no film grain,
no poreless skin, no plastic 3D face, no mirrors, no reflective surfaces showing a person, no
brand-coloured walls or props, no rectangular black pore strip on our product, no floating
product, no water splash, no second person, no extra hands.
```

**Composición para que quepan los subtítulos.** Va en todo plano de cara y en todo macro.

```
Compose with the action in the central vertical band of the frame, between 25% and 75% of the
height. Keep the top 20% and the bottom 20% visually quiet and simple: no important detail there.
```

**Gesto firma.** Sirve para los tres avatares: se rellena el hueco `[IDENTIDAD]` con la tabla de abajo.

```
ESTADO 1 DE 5 (sin parche). Vertical 9:16 handheld iPhone photo. [IDENTIDAD]. Arm's length
front-camera selfie with the phone NOT visible, framed from the slightly cropped top of her head
to mid-chest. Both index fingers pressed against either side of the bridge of her nose, stretching
the skin slightly outward, the other three fingers of each hand folded down, five fingers per
hand, both hands symmetrical, short natural nails, unpainted. Eyes at the upper third, looking
straight into the lens, mouth open mid-word. Day bathroom, white subway tile behind, soft
north-facing window light from the left, 10:00, background one stop darker than her face, no
visible shadow direction. Very shallow depth of field, focus exactly on the bridge of her nose.
[COLA OBLIGATORIA] [COMPOSICIÓN]
```

El hueco `[IDENTIDAD]` se rellena con una de estas tres, copiadas de la biblia §2 y de las fichas de continuidad.
No se improvisan ni se abrevian: si falta un rasgo, la cara cambia entre tomas.

| Avatar | Bloque `[IDENTIDAD]` en inglés |
|---|---|
| Bea, 24 | `Bea, 24, light brown hair pinned up with a matte black claw clip, brown eyes, thick natural eyebrows, a small mole under her left cheekbone, two healing spots on her chin in the same stage of healing, small gold stud earrings, no makeup, natural shine on her T-zone, grey ribbed t-shirt` |
| Marisol, 43 | `Marisol, 43, dark brown shoulder-length hair worn loose with grey strands at the left temple, small silver hoop earrings, visible expression lines and nasolabial folds NOT smoothed, a sun spot on her right cheekbone, enlarged pores on the nose wings, no makeup, plain navy t-shirt` |
| Álex, 36 | `Álex, 36, short dark hair with a cowlick over the right temple, three-day stubble, a small scar crossing his right eyebrow, red capillaries on the cheeks, a healing spot near the left jaw, clearly oily nose, dark hair on the knuckles, plain dark grey t-shirt` |

**Macro de nariz con filamentos, luz del problema.**

```
Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, vertical 9:16.
The right ala and the tip of the nose fill the frame from 15 cm, one eye cut off at the top edge,
the upper lip at the bottom edge. Enlarged pores with grey-brown sebaceous filament plugs inside
each one, pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or
three dense patches and sparse elsewhere, every pore a different size and a different angle, never
aligned in rows or a grid, never evenly spaced. Fine vellus hair, thin red capillaries in the
nostril crease, oily specular sheen on the bridge. Warm bathroom ceiling light from directly
above, 3800K, short hard shadow under the nostril, strong specular highlight on the tip and the
bridge. Nose placed in the upper-centre of the frame, lower fifth empty. Very shallow depth of
field, focus exactly on the pores of the ala. [COLA OBLIGATORIA]
```

**Parche usado a contraluz, el plano prueba.** El parche va descrito con nuestra geometría, no con la de Vue, y
siempre con las fotos reales del producto como referencia.

```
ESTADO 5 DE 5 (parche fuera). The patch must be EXACTLY the product in the reference photographs:
same silhouette, same proportions, same translucent matte material. Do not invent a different
shape.
Vertical 9:16 handheld iPhone photo. A used NOCTA hydrocolloid nose patch pinched between thumb
and index finger and held up toward a bright morning window, backlit. The gel has turned opaque
milky white in irregular blotches concentrated along the central lobe, studded with dozens of
small raised white and pale-yellow domes where the pores were; the edges are still translucent.
The patch is soft and slightly domed, curling at the wings, keeping the memory of the curve of the
nose. Matte surface, no gloss, never yellow overall, never black.
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all
four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at
a glance.
Blurred bathroom background, clean side window light, 07:40, cool and flat. Very shallow depth of
field, focus exactly on the white blotches. [COLA OBLIGATORIA]
```

**Tira negra frente a parche NOCTA, mismo cuadro y misma luz.**

```
ESTADO 5 DE 5 (parche fuera). Vertical 9:16 handheld iPhone photo. Two bare hands with short
unpainted nails holding, side by side against a plain cool grey wall, a used black pore strip
covered in glossy black plugs, lint and grainy gunk on the left, and a used NOCTA translucent
matte hydrocolloid nose patch with irregular opaque white blotches on the right. The patch must be
EXACTLY the product in the reference photographs. Same soft window light on both, same distance
from the camera, same focal plane. The contrast between glossy dirty black and matte translucent
white is the subject of the photograph. Both objects entirely inside the frame with empty space
around them. [COLA OBLIGATORIA]
```

**Pareja noche/mañana con el mismo encuadre.** Se generan como dos imágenes con las mismas referencias adjuntas y
el mismo texto de sujeto y encuadre, cambiando **solo** el bloque de luz. Si el motor expone la semilla, se repite
la misma en las dos; si no la expone, se consigue lo mismo repitiendo referencias y texto palabra por palabra.

```
NIGHT VERSION: IT IS NIGHT: the only light is a warm bedside lamp low on the left, 2700K,
everything else falls into darkness, the background is almost black, deep shadows, visible low
light noise. No daylight, no soft window light, no blue sky.

MORNING VERSION: clean cool side window light, 5500K, flat and soft, frontal. SAME camera
distance, SAME head position, SAME framing and SAME background as the night version. Only the
light changes.
```

**Vídeo, imagen a vídeo.** Una acción por plano; dos acciones deforman (biblia §7).

```
The image comes alive: [una sola acción física en presente]. Static handheld camera with
micro-drift, no dolly, no orbit, no zoom. Slow calm pace, no cuts. The person's face, the nose and
the patch must keep exactly the same shape and position. No text, no subtitles, no watermark.
Silent.
```

---

## 10. Decisiones que no puedo tomar yo

Cinco cosas chocan con el plan que ya está escrito. No las cambio por mi cuenta. Las uñas y la diadema de toalla
ya no están en esta lista: las uñas cortas sin pintar están escritas en las fichas de continuidad de
`desgloses.json` y la diadema choca con el peinado de Bea de la biblia §2, así que las dos están resueltas y
explicadas en el punto 4.

1. **Mover la prueba visual al 45 % del anuncio.** Toca guiones ya aprobados, aunque sea con un destello de un
   segundo. Es el punto 8.4 y es, con diferencia, el cambio con más respaldo de datos.
2. **Convertir seis anuncios en montajes de tres caras.** El 13, el 20, el 21, el 31, el 37 y el 82, más el 44 como
   séptimo si sobra presupuesto. No cambia la voz en off, pero sí el plan de producción de imágenes de esos seis.
3. **Corregir el primer fotograma de nueve anuncios.** Tabla del punto 8.1. Es barato y no toca el guion, pero son
   nueve desgloses que hay que retocar, más el afinado del anuncio 4.
4. **El packshot de la caja no puede ir sobre el mármol crema.** Caja crema sobre fondo crema no se ve. Hay que
   elegir otro fondo para la caja cerrada (pared gris del baño o azulejo blanco con sombra) o asumir que el
   packshot pierde fuerza.
5. **Quitar los espejos del desglose del anuncio 3.** Las tomas 2 y 6 están escritas con espejo y la regla 3 de la
   biblia lo prohíbe. O se reescriben las dos tomas, o se asume el riesgo de brazos de más y segundas personas en
   el cuadro. Yo reescribiría, pero son tomas ya aprobadas.

Y tres advertencias de material, no de criterio:

- El desglose completo de las 15 tomas solo está escrito para los anuncios 1, 2, 3 y 4 en `desgloses.json`. Los
  otros 21 tendrán que incorporar estas reglas cuando se escriban, o habrá que repasarlos después.
- La captura de la web con la garantía sirve para los 25 anuncios, no para tres. Eso significa grabarla bien una
  vez, porque va a salir en todos.
- Las plantillas de prompt que salen de la investigación describen **el parche de Vue**, no el nuestro. Si alguien
  las pega tal cual, el generador saca un escudo con dos lóbulos en vez de nuestra mariposa de 60 × 45 mm. Las
  versiones buenas, con nuestra geometría, son las del punto 9 de este documento.
