# FOTORREALISMO CON GPT IMAGE 2.5: por qué una imagen parece foto y otra parece render

**Versión 1.1 · 12 de septiembre de 2026 · manual interno NOCTA.**
Este documento reúne tres fuentes y ninguna más. Primera: la investigación de fotorrealismo hecha para NOCTA
(`inv_gpt-image-fotorrealismo.json`), que a su vez cita la guía de prompting de GPT Image de fal.ai, la documentación
de generación de imágenes de OpenAI, los módulos internos de Higgsfield expuestos por su MCP (`ugc-board.md`,
`ugc-character.md`, el workflow `character-sheet` y el pase obligatorio de *de-slop* del workflow `ugc-review-video`),
prompt-architects, hedra y fichas técnicas de las cámaras del iPhone. Segunda: la biblia visual de NOCTA
(`biblia.md`), que recoge lo que ya se ha comprobado generando 22 imágenes reales con GPT Image 2.5 (variante flare).
Tercera: el catálogo de modelos del MCP de Higgsfield, consultado el 12 de septiembre de 2026 con
`models_explore(get, gpt_image_2_5)` y `models_explore(get, soul_2)`. Todo lo que no venga de ahí va marcado como
"sin verificar". Donde no hay dato publicado, lo digo en vez de rellenarlo.

**Aviso de modelo, y es importante.** La investigación está escrita sobre GPT Image 2 (`gpt_image_2`), que en el
catálogo de Higgsfield es un modelo distinto del que usa la biblia. El que tú vas a llamar es este:

| Campo | Valor verificado hoy en el MCP |
|---|---|
| `model_id` | `gpt_image_2_5` (nombre: "GPT Image 2.5", proveedor OpenAI) |
| `variant` | `flare` \| `sunburst` — por defecto `flare`, que es la variante con la que se generaron las 22 imágenes de la biblia |
| `quality` | `low` \| `medium` \| `high` \| `xhigh` \| `max` — por defecto `low` |
| `resolution` | `1k` \| `2k` \| `4k` — por defecto `1k` |
| `background` | `auto` \| `opaque` \| `transparent` — omítelo y se queda el del modelo |
| `medias` | imágenes con rol `image_references`, sin tope declarado |
| `aspect_ratio` | incluye `9:16` (y `auto`, `4:5`, `21:9`, `27:16`…) |

Lo que esto cambia en la práctica: el modelo viejo (`gpt_image_2`) sólo tiene tres tramos de calidad
(`low/medium/high`); el 2.5 tiene cinco. Cualquier frase de la investigación que hable de "quality high como techo"
está hablando del modelo viejo. Y `variant: sunburst` existe, pero **no está probado en NOCTA**: no lo uses en los
375 planos sin comparar antes, porque cambiaría el look de la serie entera a mitad de producción.

Para qué sirve: tienes 25 anuncios, 15 tomas cada uno, 375 imágenes. Este manual es lo que miras antes de escribir un
prompt y lo que miras antes de dar una imagen por buena. Los bloques en inglés están para copiar y pegar tal cual.

---

## Índice

1. [Por qué las imágenes de IA parecen de IA](#1-por-qué-las-imágenes-de-ia-parecen-de-ia)
2. [La fórmula de prompt en ocho huecos](#2-la-fórmula-de-prompt-en-ocho-huecos)
3. [Palabras que funcionan y palabras prohibidas](#3-palabras-que-funcionan-y-palabras-prohibidas)
4. [Cómo se pide una cámara: móvil en mano frente a cámara de estudio](#4-cómo-se-pide-una-cámara-móvil-en-mano-frente-a-cámara-de-estudio)
5. [Referencias: el apartado más importante del documento](#5-referencias-el-apartado-más-importante-del-documento)
6. [Ajustes: proporción, resolución, calidad y coste](#6-ajustes-proporción-resolución-calidad-y-coste)
7. [Lo aprendido generando 22 imágenes de verdad](#7-lo-aprendido-generando-22-imágenes-de-verdad)
8. [Protocolo de revisión](#8-protocolo-de-revisión)
9. [Anexo: bloques listos para pegar](#9-anexo-bloques-listos-para-pegar)

---

## 1. Por qué las imágenes de IA parecen de IA

Una imagen no se delata por un fallo grande. Se delata por seis o siete detalles pequeños que van todos en la misma
dirección: demasiado limpio, demasiado ordenado, demasiado bonito. Por eso corregir una sola señal casi nunca salva
la imagen: hay que corregirlas todas a la vez, en el mismo prompt.

Aquí están las señales, qué las provoca en el prompt y la frase exacta que las arregla. Las nueve frases de la
columna derecha van juntas en todos los planos de persona; no son un menú del que elegir.

| Señal | Qué la provoca | Frase que la arregla |
|---|---|---|
| Piel de plástico | `8k`, `hyperrealistic`, `flawless skin`, `glowing` | `visible skin pores and fine vellus hair, unretouched, honest skin texture` |
| Poros en cuadrícula | pedir "poros" sin pedir distribución | `pores scattered in a completely IRREGULAR, uneven distribution` |
| Cara simétrica | `symmetrical features`, `beautiful woman` | `faint natural facial asymmetry, one eyebrow slightly higher` |
| Luz imposible | dos fuentes, o `dramatic lighting` | `one single motivated light source`, con dirección y consecuencias |
| Bokeh de estudio | `bokeh`, `shallow depth of field` fuera del macro | `deep focus — the background stays sharp, the way any phone photo looks` |
| Ojos demasiado limpios | el modelo por defecto | `naturally muted catchlights, no oversized specular glare in the iris` |
| Producto agrandado | el modelo por defecto | `the patch is about 6 cm wide, roughly the width of three fingers` |
| Encuadre perfecto | `centered composition`, `eye-level` | `framing slightly off-centre, slight natural tilt, not composed` |
| Brillo HDR de anuncio | `cinematic`, `HDR`, `award-winning` | `mild HDR flattening, slight highlight clipping, faint digital noise` |

### 1.1 Piel de plástico

Es la señal número uno y tiene una causa concreta y comprobada: el vocabulario de "modo estético". Palabras como
`8k`, `ultra-realistic`, `hyperrealistic`, `cinematic` y `masterpiece` no empujan el modelo hacia el realismo, lo
empujan hacia el render. La fuente lo dice literal: «On GPT Image 2 Medium, 8K, ultra-realistic, hyperrealistic,
cinematic and masterpiece all push toward fake» y «Stacking hype keywords usually makes images look more fake, not
less» (fal.ai, guía de prompting de GPT Image 2). La sustitución que funciona no es valorativa, es física: «'Realistic
skin texture' tells the AI more than '8K'».

Lo que hay que escribir en su lugar es un mecanismo óptico, no un adjetivo de calidad:

```
Real unretouched skin: visible pores across the nose, cheeks and forehead, fine vellus hair
catching the light along the jaw and the upper lip, subsurface scattering visible where light
passes through thin skin, uneven tone with faint pink around the nostrils, two or three small
moles, faint fine lines at the outer corners of the eyes. No digital smoothing, no beauty filter,
no airbrushing, no plastic skin, no glossy retouched finish, no glow.
```

Segunda causa de la piel de plástico, menos conocida y más decisiva: **la luz**. La textura de poro sólo se ve con
fuente pequeña y dura en ángulo rasante. Con luz difusa grande (ventana enorme, día nublado, softbox) la piel se
aplana y por muchos poros que pidas no aparecen (prompt-architects).

Traducido a instrucción: si el plano tiene que enseñar poro (macro, diagnóstico, detalle del problema, nariz
después), la fuente es la bombilla del espejo o la linterna del móvil, y se escribe así:

```
lit by one small hard source at a low raking angle — the bare bulb above the mirror from the upper
left, or the phone's own torch — throwing short-edged shadows that reveal every pore
```

Si el plano no tiene que enseñar poro (hablar a cámara, plano de cuerpo, dormitorio), sí puedes usar ventana, pero
mantén entero el bloque de piel del apartado 9.B: la luz difusa favorece la cara y no hace falta poro forense.

### 1.2 Poros en cuadrícula

Comprobado generando: por defecto el modelo reparte los poros como una rejilla regular, todos del mismo tamaño y a la
misma distancia. Eso convierte cualquier macro en un render 3D. La frase que lo arregla está en la biblia y va
obligatoriamente en toda macro de piel:

```
pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense
patches and sparse elsewhere, every pore a different size and a different angle, never aligned in
rows or a grid, never evenly spaced
```

Y se cierra con `unretouched documentary realism, not a 3D render`.

### 1.3 Simetría

Una cara humana real no es simétrica. Un ojo está un poco más alto, una ceja sube más, la sonrisa tira hacia un lado.
El problema es que el "Beauty Floor" de Higgsfield obliga en su plantilla a `with high model facial features,
symmetrical features, well-proportioned figure` (`ugc-character.md`), y `symmetrical features` es exactamente la
palanca que produce la cara de IA. Si copias esa plantilla entera, la copias con el defecto dentro.

Qué hacer: borra `symmetrical features`, deja `well-proportioned` y añade

```
faint natural facial asymmetry, one eyebrow slightly higher than the other, faint asymmetry to the
smile, natural uneven tone across the cheeks
```

Por avatar, la asimetría y la piel se concretan. Esta tabla manda sobre cualquier descripción improvisada: los rasgos
salen de la biblia, los subtonos de la investigación.

| Avatar | Subtono (va siempre) | Marcas concretas que hay que pedir | Negativa propia |
|---|---|---|---|
| **Bea, 24** | `fair skin with neutral-pink undertones` | `two small healing spots on the chin, a mole under the left cheekbone, faint under-eye shadows, thick natural eyebrows` — imperfección joven, no envejecimiento | `no makeup, no foundation` |
| **Marisol, 43** | `light olive skin with warm undertones` | `mature adult bone structure, longer facial thirds, visible nasolabial folds, crow's feet, slightly crepey skin under the eyes, a few grey hairs at the temple, one sun spot on the cheekbone, enlarged pores on the nose` | `no babyface` |
| **Álex, 36** | `medium olive skin with warm undertones` | `visible five o'clock shadow, a small scar through the right eyebrow, some redness across the cheeks, a clearly oily nose with dark filaments` | `no clean-shaven, no groomed beard` |

Ojo con Bea: la biblia dice **dos** granitos en curación en la barbilla, no uno. Si pides uno, la cara se lee más
limpia de lo que debería en el plano "antes".

### 1.4 Luz imposible

Hay cuatro formas de que la luz delate la imagen.

La primera es **la hora dorada**. Higgsfield la prohíbe explícitamente —«golden hour, warm sunset, orange/amber/honey
cast, late afternoon warm wash, sunlit warm tones, magic hour — even outdoors»— y da la razón: «These tones make the
persona look like a stock-photo ad, not a real creator» (`ugc-character.md`). Aunque el plano sea "por la mañana",
nada de luz dorada: `cool early-morning overcast light through a half-closed blind`.

La segunda es **más de una fuente**. Una foto real de baño tiene una luz que manda. Si describes ventana y bombilla a
la vez como dos focos, las sombras apuntan a dos sitios y sale un render sucio. La regla es una fuente motivada por
plano, y se escribe con el patrón fijo *qué es · de dónde viene · qué le hace a la cara*:

```
One single motivated light source: [soft cool daylight from the window on the left / a bare warm
LED bulb above the mirror / the phone's own torch], coming from the [upper left], so the shadow
under the nose and the chin falls [down and to the right] and the [right] side of the face is a
stop darker. No second light, no fill, no rim light.
```

Rellenas los corchetes y ya está. Lo que no vale es escribir sólo `window light`.

La tercera es **decir la hora sin decir las consecuencias**. Escribir `night bathroom, 23:30` da una imagen de día.
Esto está comprobado generando y tiene arreglo literal (ver apartado 7, regla 3).

Y una cuarta que no es de luz pero viaja con ella: **nada de superficies que devuelvan una persona**. La biblia es
tajante y gana: ni espejos, ni ventana con los azulejos reflejados, ni el grifo devolviendo la cara. Toda superficie
reflectante es la vía más rápida a un brazo de más o a una segunda persona en cuadro.

### 1.5 Bokeh de estudio

El fondo cremoso desenfocado es el delator número uno del retrato de IA, porque un móvil sólo lo consigue simulándolo
con Modo Retrato. Con un sensor de móvil, a un metro de distancia está casi todo enfocado. Por eso el bloque de
cámara de Higgsfield dice `DEEP focus — background stays sharp` y prohíbe `no shallow depth of field, no bokeh`
(`ugc-board.md`, Step 11).

Las cifras reales de las ópticas del iPhone 15/16, que son las que hay que escribir en el prompt:

| Óptica | Dato real | Para qué plano |
|---|---|---|
| Principal | 24 mm equivalente, f/1.78 (en el iPhone 16 base: 26 mm f/1.6) | todo menos el macro |
| Ultra gran angular | 13 mm f/2.2 — es la que hace el modo macro | los 25 macros |
| Frontal | look de 23 mm equivalente según `ugc-board.md` | selfies |

En el prompt vale escribir `main camera, 24mm-equivalent f/1.8` (redondeo de f/1.78, el modelo no distingue), pero no
inventes otras distancias focales.

**Excepción única y muy importante: el macro de nariz.** Un macro real de iPhone se hace con el ultra gran angular
a dos o tres centímetros de la piel, y ahí la profundidad de campo real es de dos o tres milímetros: la punta de la
nariz está nítida y el ala ya está borrosa. Si pides foco profundo en un macro, sale una lámina médica.
En los 25 macros de nariz hay que **quitar de la cola negativa** `no shallow depth of field` y `no bokeh`, y escribir:

```
iPhone ultra-wide camera in macro mode, lens about 3 cm from the skin, only two or three
millimetres of the nose in sharp focus, the near edge of the nostril and the far cheek falling out
of focus fast — the razor-thin depth of field of a real phone macro, slight barrel distortion at
the frame edges
```

Si dejas la prohibición de bokeh dentro del prompt del macro, las dos instrucciones se pelean y gana la que esté peor
escrita. (Confianza media según la investigación; el razonamiento óptico sí está sostenido por las fichas del
iPhone 15/16.)

**Elige una sola receta de macro por prompt.** La biblia escribe el macro como `clip-on macro lens` y la
investigación proponía `iPhone ultra-wide camera in macro mode`. Las dos son válidas en teoría, pero describen dos
cacharros distintos: si las metes juntas en el mismo prompt, el modelo mezcla ópticas.

**Para NOCTA manda `clip-on macro lens`, y no es cuestión de gusto: es lo que se generó.** Las cuatro macros
verificadas del anuncio 1 (las tomas 1, 3, 4 y 13, que están en `img/a01/`) salieron con esa fórmula, y salieron
bien: poros desiguales con su tapón, vello fino, capilares y la profundidad de campo corta que da una lente macro
de verdad. `iPhone ultra-wide camera in macro mode` no se ha probado en esta cuenta, así que queda como recambio y
marcado **sin verificar**, no como recomendación. La regla de la biblia es esa: gana lo que está comprobado
generando, no lo que suena mejor en una guía.

### 1.6 Ojos demasiado limpios

El modelo pinta iris saturados, con un reflejo enorme y perfectamente redondo, y sin ningún vaso capilar. Es una
señal silenciosa: nadie sabe decir qué falla, pero la cara parece de muñeco. La cláusula del módulo antislop de
Higgsfield (`character-sheet`, preset `photoreal-unretouched`) lo corrige en una línea:

```
naturally muted catchlights, no oversized specular glare in the iris, eye color muted rather than
glowing, faint red capillaries in the white of the eye, lower lashline slightly wet
```

### 1.7 Producto agrandado y logotipo inventado

El reflejo por defecto del modelo es agrandar el producto hasta que la etiqueta se lea. Higgsfield lo llama
directamente prohibido: «Image models default to enlarging the product so the label is readable — this is forbidden.
If the product is too small to read in frame, move the camera closer to the product. Do not scale the product up»
(`ugc-board.md`, Step 7). Y hay una regla tipográfica asociada: las letras pequeñas salen como galimatías, las letras
grandes salen limpias. Si quieres que se lea "nocta" en la caja, acerca la cámara.

Para NOCTA, el parche mide 60 mm de ancho (biblia). Eso se dice en el prompt: `the patch is about 6 cm wide, roughly
the width of three fingers`. Si no lo dices, el modelo te dibuja una tirita de rodilla.

### 1.8 Encuadre perfecto

Una foto de carrete está torcida, descentrada y capturada a medias. Un render está centrado a la altura de los ojos.
Higgsfield prohíbe literalmente `centered composition at eye-level` y `straight-on` (`ugc-character.md`). Lo que va en
todos los prompts:

```
framing slightly off-centre with a slight natural tilt, casual handheld framing, not composed, not
centred, captured mid-moment
```

Se puede añadir, y ayuda, el recorte accidental del encuadre:

```
the top of the head slightly cut by the frame
```

Ojo con una trampa: la literatura de "foto amateur" recomienda también pedir desenfoque de movimiento y
sobreexposición. **No lo hagas.** Tu imagen no es el producto final, es el fotograma de entrada de un image-to-video.
Un borrón horneado en la imagen fuente lo intenta "resolver" el modelo de vídeo y produce morphing de dedos y rasgos.
La inclinación y el descentrado sí (son geométricos, el vídeo los respeta); el `motion blur` no. Borra de todos los
prompts `motion blur`, `blurry`, `out of focus`, `overexposed` y `blown out`.

**Una excepción, una sola**, y está documentada: el plano 13, la retirada del parche. Ahí la investigación permite un
borrón mínimo y localizado en la extremidad que ya se está moviendo:

```
the hand pulling the patch is very slightly motion-blurred while the face stays completely sharp
```

Aun así, ese plano se revisa en la pasada 3 antes de animarlo. Si el borrón ha tocado la cara o el parche, se repite
sin él. (La biblia pide `slight handheld motion blur at the edges` en su fórmula de prompt; en NOCTA eso se reduce a
esta única excepción, precisamente porque las 375 imágenes van a vídeo.)

### 1.9 Señales de segundo orden que cuestan la imagen entera

- **Espejos.** «Mirrors spawn extra hands and duplicated bodies» (`ugc-board.md`). Los 25 anuncios pasan por un baño y
  la tentación es el plano del espejo. No lo hagas: o el espejo está fuera de cuadro, o la cámara está donde estaría
  el espejo (el móvil apoyado en el estante, que además es lo que hace la gente real). En positivo se escribe
  `The mirror is out of frame.` y en la cola negativa `no mirror and no reflection, no reflective surface returning
  a face, no duplicated person`.
- **Manos.** En un selfie una mano sostiene el móvil, así que sólo queda **una** libre. Si pides selfie y a la vez una
  acción a dos manos, el modelo inventa un tercer brazo. Cualquier acción a dos manos se resuelve con
  `phone propped on the bathroom shelf at chest height so both hands are free` y deja de ser selfie. Y siempre se
  dice qué hace la mano que no trabaja: `her other hand rests on the edge of the sink; no other hand is doing
  anything`.
- **Texto fantasma.** Sin cola negativa brotan marcas de agua, subtítulos y logos en toallas, botes y pantallas. El
  olvido más frecuente no es la marca de agua, son las etiquetas de los props: va siempre la cláusula de props del
  apartado 5.3, además de la cola negativa completa del apartado 9.A.
- **Grano de carrete.** `Kodak Gold 200`, halación y grano fino producen una foto de carrete, que es un look distinto
  y contradictorio con el móvil. Para móvil: ruido **digital** de luminancia. Higgsfield lo dice literal: «digital
  noise, never film grain».

---

## 2. La fórmula de prompt en ocho huecos

Hay dos estructuras válidas y no se contradicen: la de cinco bloques de la guía oficial de GPT Image (escena, sujeto,
detalles importantes, caso de uso, restricciones) y la de ocho huecos de la biblia de NOCTA, que es la misma pero
desarrollada para este producto. Usa la de ocho huecos: es más específica y ya está probada aquí.

El orden importa por una razón técnica: «Image models weight earlier tokens more — composition and identity go first,
quality tail last» (`character-sheet`, reglas de oro). Todo lo que vaya al final pesa menos.

| # | Hueco | Qué va dentro | Ejemplo literal |
|---|---|---|---|
| 0 | Referencias | declaración `@Image1/@Image2`, Angle Lock, escala real | `@Image1 is the product reference. ANGLE LOCK: ...` |
| 1 | Captura | tipo de foto y cámara | `Vertical 9:16 handheld iPhone photo` |
| 2 | Sujeto y encuadre | quién, qué parte del cuerpo llena el cuadro, a qué distancia, banda declarada | `TIGHT CLOSE-UP of the tip and left side of a nose filling the frame` |
| 3 | Detalle físico | poros, filamentos, vello, capilares, brillo de zona T, una imperfección concreta | `each pore holds a flat grey-yellow sebaceous filament, level with the skin` |
| 4 | Acción | una sola, en presente, sencilla | `she is pressing the patch onto the bridge of her nose` |
| 5 | Luz y sitio | uno de los cinco sitios, con hora, dirección y consecuencias | `a bare warm LED bulb above the mirror, raking from the upper left` |
| 6 | Óptica | profundidad de campo, foco exacto, ruido de sensor | `deep focus, the bathroom behind stays sharp, faint digital sensor noise` |
| 7 | Anti-retoque | bloque de piel real | `no beauty retouching, no skin smoothing, no makeup, unretouched documentary realism` |
| 8 | Prohibiciones | cola negativa completa | `No text, no logos, no watermark.` |

**Dónde este manual se apartaba de la biblia, y cómo se ha resuelto midiendo.** La biblia manda porque está
comprobada generando. Aparecieron tres desacuerdos con lo que decía la investigación; los tres están resueltos, y
conviene dejar escrito cómo, para que nadie los vuelva a abrir a mitad de producción.

| Hueco | El desacuerdo | Resolución | Por qué |
|---|---|---|---|
| 1 · Captura | `clip-on macro lens` (biblia) contra `iPhone ultra-wide camera in macro mode` (investigación) | **Gana la biblia.** Se escribe `clip-on macro lens` | Las cuatro macros verificadas del anuncio 1 (tomas 1, 3, 4 y 13, en `img/a01/`) salieron con esa fórmula y salieron bien. La otra no se ha probado nunca en esta cuenta: queda como recambio y **sin verificar**. Nunca las dos en el mismo prompt, que el modelo mezcla ópticas |
| 6 · Óptica | `very shallow depth of field` en todos los planos contra foco profundo fuera del macro | **No aplica a esta serie.** Se queda como está | Se midieron las 300 tomas escritas: 60 son macro, 6 están por debajo de 60 cm y ninguna, **ninguna**, está a 60 cm o más. A esas distancias un móvil sí da poca profundidad de campo, así que la instrucción es ópticamente correcta en todos nuestros planos. La objeción sería válida en un plano a un metro, y no hay ninguno. Si algún día se escribe uno, ese plano lleva `deep focus` |
| 6 · Óptica | `slight handheld motion blur at the edges` contra quitarlo | **Se queda, con la advertencia apuntada** | En las 15 imágenes verificadas la frase no produce borrón real: empuja el aspecto de foto de móvil sin ensuciar el fotograma. El riesgo que señala la revisión es del paso a vídeo, donde un fotograma de entrada borroso puede convertirse en morphing, y **está sin verificar** porque todavía no se ha animado ninguna. Si al animar aparece deriva en los bordes, se quita esa frase de ese plano y se vuelve a generar la imagen: cuesta 1 crédito |

La regla que decide las tres es la misma y es la de la biblia: **gana lo que está comprobado generando, no lo que
suena mejor en una guía**. Cuando no hay nada comprobado, se mide; y cuando no se puede medir, se marca sin
verificar y se deja escrito qué haría cambiar de opinión.

Dos cosas que no están numeradas pero van siempre:

- **El número de estado del parche** al principio del prompt. La biblia define cinco estados (sin parche / recién
  puesto / saturado / a medio quitar / fuera) y el error más caro es mezclar dos. Escribir "ESTADO 4" arriba del todo
  evita que salga el parche en la mano y pegado en la nariz a la vez.
- **La frase de registro**, que cambia el resultado más que veinte adjetivos:

```
This is a casual photo from a real person's camera roll, the kind that gets posted to a TikTok
slideshow — not an advertising image, not a product shoot, not a magazine photo.
```

### Ejemplo completo con los ocho huecos

Plano 10 de un anuncio de Bea, colocación del parche, baño de noche.

```
STATE 2: the patch has just been applied. @Image1 is the NOCTA product reference and @Image2 is the
character reference. The patch must be EXACTLY the product in the reference photographs: same
silhouette, same proportions, same translucent matte material. Do not invent a different shape.
ANGLE LOCK: the product shows only the visible front-facing side from @Image1 and keeps that same
visible angle; do not rotate, flip or reveal unseen sides; its colours and lettering stay identical
to the reference.

Vertical 9:16 handheld iPhone photo, phone propped on the bathroom shelf at chest height so both
hands are free. MEDIUM CLOSE-UP of a Spanish woman in her early twenties at the sink, her face and
shoulders filling most of the frame.

Real unretouched skin: visible pores across the nose and forehead, fine vellus hair along the jaw,
natural sebum shine concentrated on the nose bridge while the cheeks stay matte, two small healing
spots on the chin, a mole under the left cheekbone, faint under-eye shadows, faint natural facial
asymmetry with one eyebrow slightly higher. Naturally muted catchlights, no oversized specular
glare in the iris. Bare skin, no makeup, no foundation.

She is pressing the hydrocolloid patch onto the bridge of her nose with the index and middle finger
of her right hand while her left hand steadies the free edge; no other hand is doing anything. The
patch is about 6 cm wide, roughly the width of three fingers, a translucent matte film clearly
visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a
thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly
sealed against the skin. Do not scale the patch up to make it readable; if it needs to read bigger,
move the camera closer.

Mid-action expression, in the middle of saying something, not posing, not smiling at the camera.
Body calm and neutral, weight on one hip, head level.

IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard
shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are
bright and the eye sockets are dark, and the window behind is pure black. No daylight, no soft
window light, no blue sky, no reflections in the window or in the tap. Spanish bathroom: white
subway tile, beige grout, a chrome tap, a folded dusty-rose towel, a shampoo bottle with its label
turned away. The mirror is out of frame.

Deep focus — the tiled wall behind stays sharp, the way any phone photo looks. Mild HDR flattening,
faint digital luminance noise in the shadows, digital sensor noise, never film grain. Framing
slightly off-centre with a slight natural tilt, not composed, not centred, captured mid-moment.
This is a casual photo from a real person's camera roll, the kind that gets posted to a TikTok
slideshow — not an advertising image, not a product shoot, not a magazine photo.

Constraints: no text, no lettering, no captions, no subtitles, no watermark, no logo, no badges, no
numbers, no frame borders, no collage, no split screen. No brand marks or legible text on any prop.
No shallow depth of field, no bokeh, no lens flare, no cinematic colour grade, no HDR glow or bloom
or halos, no oversharpening, no oversaturation. No studio lighting, no ring light, no softbox, no
golden hour. No fisheye, no ultra-wide distortion. No mirror and no reflection, no duplicated
person, no extra hands, no third arm, no deformed fingers. Exactly one person in frame.
```

Ese prompt tiene unas 320 palabras. Ésa es la longitud de referencia para un plano de persona: si te sale de menos de
200, es que te has dejado un hueco de los ocho. Para un macro basta con 200-250, porque no hay ni acción ni sitio.

---

## 3. Palabras que funcionan y palabras prohibidas

Las dos listas son literales y van en inglés. La fuente (prompt-architects) avisa de algo útil: este vocabulario no es
específico de un modelo — «no exclusive prompting language differs between GPT Image, Midjourney, or FLUX.2 — these
prompts work across all three as plain descriptive language». La fuente nombra GPT Image, Midjourney y FLUX.2; que
sirva igual en Soul es probable, pero **sin verificar**.

### 3.1 Palabras que funcionan

Piel y textura:

```
visible skin pores
natural fine facial hair
vellus hair visible at the temples
pore texture across the nose and forehead
subsurface scattering visible where light passes through thin skin
unretouched, honest skin texture
subtle natural sheen across the forehead and nose bridge
soft small specular highlights
gentle catchlight in the eyes
warmer and slightly flushed skin tone at the nose, cheeks and ears, cooler and more neutral along
  the jaw and forehead
scatter of light natural freckles
faint asymmetry to the smile
subtle fine lines at the outer corners of the eyes
natural uneven tone across the cheeks
enlarged pores
sebaceous filament plug
uneven skin tone
```

Cámara y captura:

```
handheld
iPhone
main camera, 24mm-equivalent
iPhone ultra-wide camera in macro mode
clip-on macro lens
deep focus — the background stays sharp
mild HDR flattening
slight highlight clipping at the window
faint digital luminance noise in the shadows
digital sensor noise, never film grain
auto white balance
framing slightly off-centre
slight natural tilt
captured mid-moment
not composed, not centred
slight barrel distortion at the frame edges
```

Luz y sitio:

```
one motivated light source
bare warm LED bulb above the mirror, small hard source
raking from the upper left
short-edged shadows revealing every pore
soft cool daylight from a window on the left
overcast diffusion, no sun, no warm cast
cool neutral daylight
north-facing window light
white subway tile, beige grout
hard-edged shadow on the tile behind
```

Producto y escala:

```
about 6 cm wide, roughly the width of three fingers
at its real physical size relative to the hand
move the camera closer instead of scaling the product up
ANGLE LOCK
translucent matte hydrocolloid
bevelled edge catching a thin specular highlight
opaque white in blotches with small pale-yellow dots where the pores were
```

Expresión y cuerpo (elige **una** expresión por prompt; lista cerrada de `ugc-character.md`):

```
mid-thought, slight half-smile, eyes glancing slightly off-lens
caught mid-laugh, soft natural laugh, head slightly tilted
casually glancing toward the lens with a relaxed, neutral expression
looking up from her phone with a relaxed, unguarded face
mid-action expression — in the middle of saying something, not posing
natural unguarded face, soft neutral expression, not smiling at the camera
wide-eyed mid-gasp, lips parted, brows lifted — caught at the start of a reaction
mid-react squint — one eye scrunching, half-grin pulling sideways
eyebrows lifted mid-thought, lips pressed in a "wait, no" line, head tilted slightly
```

Y la regla de cuerpo, que es contraintuitiva y salva muchas manos: la energía de "pillado a medias" vive en **la
cara**; el cuerpo se queda quieto y normal. `relaxed standing, weight slightly on one hip, one hand resting
naturally, head level`.

### 3.2 Palabras prohibidas

Calidad y estética (cada una empuja activamente al render):

```
8k
4k
hyperrealistic
ultra-realistic
photorealistic masterpiece
masterpiece
ultra-detailed
cinematic
cinematic realism
dramatic lighting
professional photography
award-winning
editorial portrait
fashion portrait
mid-length portrait
aspirational lifestyle atmosphere
```

Piel y cara:

```
flawless skin
perfect skin
poreless skin
glowing skin
radiant complexion
airbrushed
perfectly smooth
uniform flat skin tone
glossy all-over shine
studio polish
heavy retouching
beautiful woman
symmetrical features
high model facial features
```

Óptica y luz (salvo en el macro, donde las dos primeras se permiten):

```
bokeh
shallow depth of field
minimal depth of field
soft subtle separation
portrait mode
lens flare
HDR
golden hour
warm sunset
magic hour
ring light
softbox
beauty dish
studio lighting
DSLR
flattering and even illumination
```

Composición y pose:

```
centered composition at eye-level
straight-on
posing
poised
elegant stance
graceful posture
```

Producto, texto y props:

```
split screen
diptych
before and after side by side
collage
frame border
watermark
caption
subtitle
badge
```

Léxico de piel que produce patología o roza moderación:

```
blackheads
acne
cystic
pus
squeezing
extraction
infected
medical close-up
dermatology slide
```

Sobre esta última lista: los filamentos sebáceos son planos, translúcidos y de tono gris-amarillo; los puntos negros
son tapones oscuros (Cleveland Clinic, Paula's Choice). Si escribes `blackheads`, el modelo dibuja puntos negros
gordos y la imagen da asco. Lo que hay que escribir es `flat grey-yellow sebaceous filaments sitting level with the
skin, not raised, not dark, not inflamed`, más `calm skin, no redness, not irritated`, más un trozo de mejilla normal
dentro del cuadro para que se lea como una nariz de persona y no como una preparación de laboratorio.

**Dos trampas de lista negra.** La primera: el preset `photoreal-unretouched` de Higgsfield es excelente pero trae una
cola `4K quality, cinematic realism, clean white background` pensada para fichas de personaje sobre fondo blanco.
Quítala. La segunda: ese mismo preset lleva `skin completely free of artificial glare, shine or highlight blooms,
matte-to-natural complexion`, que te borra justo el brillo sebáceo que NOCTA necesita vender. Sustitúyela por:

```
natural sebum shine concentrated on the nose bridge and forehead, matte on the cheeks, the kind of
shine a real oily T-zone has at the end of the day
```

---

## 4. Cómo se pide una cámara: móvil en mano frente a cámara de estudio

No existe un interruptor. Lo que hay son dos familias de frases, y el modelo interpola entre ellas. Si mezclas, sale
un híbrido que parece publicidad barata.

| Decisión | Móvil en mano (lo que quieres) | Cámara de estudio (lo que evitas) |
|---|---|---|
| Óptica | `main camera, 24mm-equivalent f/1.8` | `85mm portrait lens`, `DSLR` |
| Foco | `deep focus — the background stays sharp` | `shallow depth of field`, `bokeh` |
| Luz | `one motivated light source (window / lamp)` | `softbox`, `ring light`, `three-point lighting` |
| Fondo | `white subway tile, beige grout, a chrome tap` | `seamless background`, `clean white backdrop` |
| Ruido | `faint digital luminance noise in the shadows` | `clean, noise-free` |
| Rango | `mild HDR flattening, slight highlight clipping` | `perfect exposure`, `balanced highlights` |
| Encuadre | `slightly off-centre, slight natural tilt` | `centered composition at eye-level` |
| Registro | `a photo from a real person's camera roll` | `editorial portrait`, `product shoot` |

El grifo es cromado, no de latón: lo fija la biblia y cambia el color de todos los reflejos del baño.

Tres bloques fijos, uno por situación. No los mezcles nunca dentro del mismo plano: el balance de blancos del flash
(verdoso-frío) y el de la bombilla del baño (cálido) se pelean y sale un render sucio.

Una aclaración sobre el bloque A, porque parece contradecir la regla de "una sola fuente": la frase
`auto white balance splitting the difference between the cool window and the warm mirror bulb` describe **el balance
de blancos**, no dos focos. La ventana sigue siendo la única fuente que proyecta sombra; la bombilla está encendida
de fondo y sólo ensucia el color, que es exactamente lo que hace un baño real. Si el plano no tiene bombilla a la
vista, quita esa frase y deja `auto white balance leaning cool`.

**Bloque A — día / ventana.** Para hablar a cámara, antes/después y el parche a contraluz.

```
Casual handheld iPhone photo taken by the person themselves, main camera 24mm-equivalent f/1.8,
deep focus — the bathroom behind stays sharp, the way any phone photo looks. Mild HDR flattening,
slight highlight clipping on the window, faint digital luminance noise in the shadows (digital
sensor noise, never film grain), auto white balance splitting the difference between the cool
window and the warm mirror bulb. Framing slightly off-centre with a slight natural tilt, not
composed, not centred, captured mid-moment. This is a photo from a real person's camera roll, the
kind that gets posted to a TikTok slideshow — not an advertising image, not a product shoot, not a
magazine photo.
```

**Bloque B — noche / flash.** Para aplicar el parche antes de dormir, la mesilla, el baño de madrugada. Ventaja para
NOCTA: el flash directo es la luz que más revela el brillo sebáceo de la nariz, y con el parche puesto hace que el
hidrocoloide blanco destaque muchísimo.

```
Night-time iPhone photo taken with the direct on-camera LED flash. Hard bright hotspot on the
forehead and the nose, the face flattened by the on-axis light, a hard-edged shadow of the head
thrown on the tiled wall right behind, the rest of the room falling to near-black within two
metres. Cool greenish flash white balance fighting the warm bulb. Visible digital noise in the dark
corners, slight tilt to the handheld framing, unposed. A photo from a real person's camera roll,
not an advertising image.
```

**Bloque C — macro.** Uno por anuncio, 25 en total. Es el único plano donde se permite poca profundidad de campo.

```
Extreme macro photograph shot on an iPhone ultra-wide camera in macro mode, handheld, lens about
3 cm from the skin: only two or three millimetres are in sharp focus and everything nearer and
further falls out of focus fast — the razor-thin depth of field of a real phone macro. Slight
barrel distortion at the frame edges. Lit only by the phone's own torch from the upper left, small
hard source at a low raking angle, short-edged shadows revealing every pore. Faint digital noise,
mild highlight clipping on the oiliest ridge, auto white balance leaning warm, framing slightly
off-centre and handheld.
```

Una nota sobre selfies. Si el plano es selfie, hay que decir la geometría del selfie o no se lee como tal:

```
Self-portrait selfie shot on an iPhone front-facing camera held by the subject at arm's length —
her own arm extended toward the lens, her wrist faintly visible at the edge of frame.
```

Y recuerda: en selfie queda **una** mano libre. Si el plano necesita dos manos, se escribe
`phone propped on the bathroom shelf, both hands free` y deja de ser selfie.

---

## 5. Referencias: el apartado más importante del documento

Está comprobado generando: **describir el producto con palabras no basta**. Sin fotos reales adjuntas, el modelo se
inventa una mancha amorfa en la nariz. La geometría escrita sirve de apoyo, pero nunca sustituye a la foto. Sin
referencias, las 375 imágenes venden un parche genérico que no es el nuestro.

La geometría, que va en el prompt como apoyo de la foto (medidas de la biblia):

| Medida | Valor | Cómo se escribe en el prompt |
|---|---|---|
| Ancho total | 60 mm | `60 mm wide` / `about 6 cm wide, roughly the width of three fingers` |
| Alto total | 45 mm | `45 mm tall` |
| Profundidad del ala | 23 mm | `two symmetrical wings 23 mm deep` |
| Ancho del puente | 28 mm | `one central lobe covering the bridge` |
| Muesca inferior | 6 mm | `a shallow rounded notch about 6 mm deep where the columella is` |
| Grosor | 0,55 mm | `0.55 mm thick with a bevelled edge` |
| Radio de esquina | 2 mm | `every corner rounded with a 2 mm radius` |

### 5.1 Qué referencias hay y en qué orden van

Ya subidas a Higgsfield:

| Referencia | Qué es | Cuándo va |
|---|---|---|
| `parche_liner` | el parche real sobre su liner de papel, junto a la caja | macro del parche, packshot, plano 8 |
| `parche_puesto` | el parche real puesto en la nariz, de frente | toda imagen con el parche puesto |
| `parche_puesto_2` | el mismo, segundo ángulo | cuando el plano es de perfil o tres cuartos |
| `caja` | la caja crema real | toda imagen con caja o sobre |
| retrato del avatar | Bea, Marisol o Álex ya generados | toda imagen con persona |
| nariz limpia ya generada | la nariz del mismo avatar después del tratamiento | tomas de "después" |

Y esto es lo que pone y lo que es la caja, porque el apartado 8 te pide leer el logotipo letra a letra y hace falta
saber contra qué comparar (biblia):

| Elemento | Cómo es |
|---|---|
| Material | cartón crema mate, sin brillos, sin dorados |
| Logotipo | `nocta`, en minúsculas, azul marino |
| Marca gráfica | una luna creciente pequeña |
| Texto | `PARCHES DE NARIZ HIDROCOLOIDE · 8 parches · noche`, y nada más |
| Sobre individual | crema mate, el mismo logotipo pequeño |

Lo que la caja NUNCA es: tira negra tipo Bioré, parche redondo de grano, parche con dibujos o estrellas, envase de
plástico. Si aparece cualquiera de esas cosas, la imagen se repite.

**El orden importa.** La primera referencia es la que más pesa. Regla para NOCTA:

1. `@Image1` = el producto (parche o caja), cuando el producto es lo que no puede fallar.
2. `@Image2` = el avatar.
3. `@Image3` = la referencia de estado (nariz limpia, segundo ángulo del parche).

Si el plano es de cara y el producto es secundario (por ejemplo, hablar a cámara con el parche puesto), invierte el
uno y el dos: `@Image1` = avatar, `@Image2` = parche.

**Cuántas: entre dos y cuatro.** Con dos o tres el troquel del parche sale correcto. Más de cuatro y el modelo empieza
a promediar: mezcla el ángulo de una con la iluminación de otra y sale algo que no es ninguna. Si necesitas cuatro,
que sean cuatro cosas distintas (producto, avatar, estado, sitio), nunca cuatro variaciones de lo mismo.

### 5.2 Las frases exactas

**La frase madre**, la que va al principio de toda imagen donde salga el parche:

```
The patch must be EXACTLY the product in the reference photographs: same silhouette, same
proportions, same translucent matte material. Do not invent a different shape.
```

**Angle Lock con una sola referencia de producto** (`ugc-board.md`, Step 7, literal):

```
@Image1 is the product reference. ANGLE LOCK: the product shows only the visible front-facing side
from @Image1. The product keeps this same visible angle in every slot it appears in. Do not rotate,
spin, flip, or reveal unseen sides.
```

**Angle Lock con varias referencias de producto:**

```
@Image1 and additional product references show valid angles. The product may appear only from these
provided angles. Switch angles only by hard cuts between slots, never by continuous rotation. Do
not invent intermediate or unseen sides.
```

**Preservación del diseño de la caja** (adaptado para NOCTA: la versión de Higgsfield dice "keep the product blank /
unbranded", que aquí no sirve porque sí quieres tu marca):

```
Keep the NOCTA box design, its lettering and its colours exactly as in the reference — do not
redraw, restyle or re-letter the label.
```

**Escala real** (`ugc-board.md`, Step 7, literal):

```
The product MUST appear at its real-world physical size relative to the character's hand, fingers,
and body. Image models default to enlarging the product so the label is readable — this is
forbidden. If the product is too small to read in frame, move the camera closer to the product. Do
not scale the product up.
```

**Identidad del avatar:**

```
@Image2 is the character reference — the same person, identical face shape, proportions, hair,
body and skin tone. PRESERVE the face's exact shape, width and proportions 1:1 — do NOT squeeze,
narrow, slim or stretch the face.
```

**Referencia de nariz limpia** (la regla 2 del apartado 7, la más rentable de todas):

```
The SECOND reference is his nose AFTER the treatment: the skin of the nose you generate must look
EXACTLY like that second reference, open EMPTY pores, no dark dots.
```

### 5.3 Cuando no hay referencia de la caja

Si por lo que sea un plano lleva la caja sin foto adjunta, **nunca pidas texto legible**. El modelo inventa un
wordmark mal escrito o, peor, el de una marca real existente. La única salida segura:

```
small label turned slightly away, too small to read, no legible text on the product
```

Y en cualquier plano, la regla lateral que casi nadie escribe y que es la que más se olvida:

```
No legible text or numbers on any prop beyond the referenced product's own label — receipts,
screens, price tags render as random characters; printed sides face away or are too small to be
legible. Phone screens are off or showing a plain blurred interface with no legible text.
```

### 5.4 Ediciones encadenadas: repite siempre la lista de preservación

Para el antes/después **no pidas un split screen**. Una imagen partida generada de una vez produce dos caras
distintas, con marco y con números. Se hace en dos pasos: generas el "antes" y después editas esa imagen exacta.

La regla de fal.ai es tajante: «For edits, name what changes, name what stays. Restate preservation details on every
follow-up». Si no repites la lista entera en cada iteración, tienes deriva de identidad entre los 15 planos del mismo
anuncio.

```
Keep the exact same person, the same face shape and proportions, the same hair, the same shirt, the
same bathroom, the same window light from the left, the same camera distance, the same framing and
the same head angle. Change ONLY the skin of the nose: the pores now read smaller and cleaner, the
grey-yellow sebaceous filaments are gone, the nose bridge is matte instead of oily, a faint pink
flush where the patch was. Everything else identical.
```

### 5.5 Límite por modelo: dónde puede vivir la caja NOCTA

Datos sacados hoy del catálogo del MCP, no de memoria:

| Modelo | Referencias que acepta | Calidad | Proporciones |
|---|---|---|---|
| `gpt_image_2_5` | `medias` con rol `image_references`, **sin tope declarado** | `low/medium/high/xhigh/max` (defecto `low`) + `resolution 1k/2k/4k` (defecto `1k`) | incluye `9:16` |
| `gpt_image_2` (el viejo) | `medias` rol `image`, sin tope | `low/medium/high` (defecto `low`) + `1k/2k/4k` | incluye `9:16` |
| `soul_2` | `medias` **max = 1** | `1.5k` o `2k` (defecto `2k`) | incluye `9:16` |

Que `soul_2` admita una sola imagen es lo que decide el reparto: Soul no puede sostener la caja NOCTA y el avatar a la
vez. Reparto práctico:

- Todo plano con **caja NOCTA o parche identificable** → `gpt_image_2_5`, con referencias múltiples y Angle Lock.
- Planos de **persona sin producto en mano** (hablar a cámara, dormir, el dedo señalando la nariz) → Soul con una
  referencia facial, o `gpt_image_2_5` igualmente si prefieres no cambiar de herramienta.
- Si necesitas caja **y** avatar con identidad bloqueada, no uses Soul.

Dos avisos sobre los mecanismos alternativos, por si alguien los propone: los **Elements** de Higgsfield
(`show_reference_elements`, varios `<<<element_id>>>` dentro del mismo prompt) funcionan con GPT Image, Nano Banana,
Seedream y Cinema Studio, pero **no** con Soul V2. Y el **Soul ID** (identidad entrenada) exige de 5 a 20 fotos y de
3 a 10 minutos de entrenamiento, y sólo admite un `soul_id` por generación: inservible si alguna vez necesitas dos
avatares en el mismo plano.

---

## 6. Ajustes: proporción, resolución, calidad y coste

### 6.1 Proporción: 9:16 nativo, siempre

Las 375 imágenes se generan en 9:16 nativo. Nunca generes 1:1, 4:5 ni 2:3 para recortar después. Con el 2:3 la cuenta
es ésta: 2:3 es más ancho que 9:16, así que el recorte sólo puede quitar anchura, y quita el **15,6%** — de una imagen
de 1024x1536 te quedas con 864 px de ancho. No hay forma de llegar a 9:16 quitando altura. Y ese 15,6% descentra justo
lo que no puede descentrarse: el macro y el packshot.

(La investigación habla de "12,5% de altura o 15,6% de anchura". La cifra de anchura es correcta; la de altura no sale
de ninguna operación posible entre 2:3 y 9:16, así que aquí se ignora.)

En Higgsfield, `gpt_image_2_5` acepta `9:16` directamente. En la API directa de OpenAI **no existe preset 9:16**: el
retrato es 1024x1536, que es 2:3. Sí se permiten tamaños personalizados siempre que sean múltiplos de 16, con una
proporción entre 1:3 y 3:1, sin pasar de 3840 px por lado y con un total entre 655.360 y 8.294.400 píxeles. Los
tamaños 9:16 exactos y legales que salen de ahí:

| Tamaño | Megapíxeles | Cuándo |
|---|---|---|
| 1152 x 2048 | 2,36 MP | ahorro, suficiente para 1080x1920 |
| 1440 x 2560 | 3,69 MP | recomendado: margen para reencuadres finos en montaje |
| 2160 x 3840 | 8,29 MP | justo en el tope; desperdicio |

Por qué 4k es desperdicio: todos los modelos image-to-video de Higgsfield topan en 1080p (Seedance 2.5, FLUX 3 Video,
Grok Video 1.5, Minimax Hailuo 1080), salvo el modo 4k de Kling v3.0. El destino real de la imagen es 1080x1920.

### 6.2 Resolución y calidad

Los valores por defecto de `gpt_image_2_5` son `resolution: 1k` y `quality: low` (verificado hoy con
`models_explore(get, gpt_image_2_5)`). **Ese default te sabotea**: un macro de poro a `quality: low` sale como ruido
indiferenciado, sin filamentos legibles. Hay que subirlo a mano en cada llamada.

Lo que sí está documentado:

- La documentación de OpenAI recomienda subir de tramo «for small text, dense infographics, close-up portraits, and
  identity-sensitive edits» — es decir, exactamente los tres casos de NOCTA: packshot con wordmark, macro de nariz y
  planos de cara con identidad bloqueada.
- El propio workflow de UGC de Higgsfield usa siempre `2k` + `high` para sus boards.

Lo que **no** está documentado y por eso no se decide aquí: si los tramos altos sobreafilan la piel. Es una sospecha
razonable —el sobreafilado (micro-contraste uniforme en toda la cara, poros con halo) es una de las señales de
render— pero no hay ni una fuente ni una prueba en NOCTA que lo respalde. **Sin verificar.** Mientras no se mida, se
usa lo documentado.

Punto de partida, hasta que se haga la prueba de abajo:

| Tipo de plano | `resolution` | `quality` | Por qué |
|---|---|---|---|
| Cara, medio plano, cuerpo (piel visible) | 2k | high | "close-up portraits e identity-sensitive edits" según OpenAI; es lo que usa Higgsfield en sus boards |
| Macro de nariz y de parche | 2k | high | hace falta resolver filamentos y el borde biselado |
| Packshot de caja con wordmark | 2k | high | letras pequeñas necesitan píxeles o salen galimatías |
| Pruebas de composición | 1k | low | preview barato, se repite el final |

**La prueba que hay que hacer antes de lanzar los 375 planos** (media hora, y cierra la duda del sobreafilado):

1. Coge un prompt de cara ya bueno y otro de macro ya bueno, con sus mismas referencias.
2. Genera cada uno en seis combinaciones: `1k/medium`, `1k/high`, `2k/medium`, `2k/high`, `2k/xhigh`, `2k/max`.
3. Míralos al 100% en la zona de la mejilla y en el borde del parche, buscando halo alrededor de los poros.
4. Apunta el ganador en esta tabla y sustituye la de arriba.

| Plano | Combinación ganadora | Quién lo probó | Fecha |
|---|---|---|---|
| Cara / medio plano | por medir | | |
| Macro | por medir | | |
| Packshot | por medir | | |

Ojo con los tramos `xhigh` y `max`: existen sólo en el 2.5, no aparecen en ninguna de las dos fuentes escritas y por
tanto nadie ha comprobado qué le hacen a la piel. Entran en la prueba, no en producción directa.

Si haces pruebas de composición a `low`, repite el plano bueno a la calidad que toque: manteniendo prompt y
referencias, la composición no cambia entre tramos, así que el preview barato sirve.

### 6.3 Coste en créditos

**No hay dato publicado y no me lo voy a inventar.** El catálogo del MCP consultado hoy
(`models_explore(action: get, model_id: gpt_image_2_5)`) devuelve `variant`, `quality`, `resolution`, `background`,
proporciones y referencias admitidas, pero **ningún coste en créditos por combinación**. Tampoco aparece en la
investigación ni en la biblia.

El único dato de coste que sí está documentado es de la API directa de OpenAI, no de Higgsfield: activar
`input_fidelity: 'high'` (lo que preserva el logotipo y la tipografía de la caja) cuesta **+4.160 tokens en formato
cuadrado y +6.240 en no cuadrado**. Como NOCTA va todo en 9:16, si alguna vez se produce por API se pagan siempre los
6.240 por imagen con referencia de caja.

Cómo mides los créditos de Higgsfield en cinco minutos, una sola vez, y lo apuntas aquí:

1. Llama a `balance` y apunta los créditos.
2. Genera una imagen con `model_id: gpt_image_2_5`, `variant: flare`, `1k / low`. Vuelve a llamar a `balance`. La
   diferencia es el coste.
3. Repite con `1k / medium`, `2k / high`, `2k / max` y `4k / high`.
4. Rellena la tabla y este apartado deja de tener un hueco.

| Combinación | Créditos por imagen | Uso previsto en NOCTA | Nº de imágenes estimado |
|---|---|---|---|
| 1k / low | por medir | pruebas de composición | variable |
| 1k / medium | por medir | sólo si gana la prueba del 6.2 | 0 de momento |
| 2k / high | por medir | todo lo demás | ~375 |
| 2k / max | por medir | sólo si gana la prueba del 6.2 | 0 de momento |
| 4k / high | por medir | ninguno | 0 |

Con esos números sabrás el coste total de los 25 anuncios antes de empezar.

---

## 7. Lo aprendido generando 22 imágenes de verdad

Esto no es teoría. Son cinco reglas de la biblia visual de NOCTA y cada una arregla un fallo concreto que salió en las
pruebas. Van siempre, en todos los prompts donde apliquen.

### Regla 1 · Encuadre del parche: si se recorta, el troquel deja de leerse

El fallo: cuando el parche es el sujeto (tomas de producto, parche usado a contraluz, packshot), el modelo lo pega al
borde del cuadro y lo corta. Entonces parece una mancha amorfa aunque el material esté perfecto.

Frase obligatoria:

```
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all
four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a
glance.
```

### Regla 2 · La nariz "después" sale sucia si no se le da una referencia limpia

El fallo: el retrato de referencia del avatar tiene la nariz con puntos, así que el modelo los conserva en **todas**
las tomas, incluidas las de después de quitar el parche. Describirlo con palabras no basta. Si el "después" tiene los
mismos puntos que el "antes", el anuncio no demuestra nada.

Solución comprobada: adjuntar como **segunda referencia** una imagen ya generada de esa misma nariz limpia, y escribir:

```
The SECOND reference is his nose AFTER the treatment: the skin of the nose you generate must look
EXACTLY like that second reference, open EMPTY pores, no dark dots.
```

Y además, en positivo, dentro del prompt:

```
the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere
```

### Regla 3 · "De noche" no significa nada; hay que describir las consecuencias de la luz

El fallo: poner `night bathroom, 23:30` da una imagen de día. El modelo trata la hora como un adorno. Lo que funciona
es describir qué hace esa luz sobre la cara y sobre la habitación:

```
IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard
shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are
bright and the eye sockets are dark, and the window behind is pure black. No daylight, no soft
window light, no blue sky, no reflections in the window or in the tap.
```

Lo mismo vale para cualquier condición: la hora no se declara, se describe por sus efectos.

Y va pegado el veto de reflejos de la biblia, que forma parte de la misma regla: nada de ventana con los azulejos
reflejados, nada de espejo, nada de grifo devolviendo la cara. Cualquier superficie que refleje a una persona es la
vía más rápida a un brazo de más.

### Regla 4 · Los poros salen en cuadrícula y eso delata el render

El fallo: por defecto el modelo reparte los poros como una rejilla regular y la macro parece 3D. Frase obligatoria en
toda macro de piel:

```
pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense
patches and sparse elsewhere, every pore a different size and a different angle, never aligned in
rows or a grid, never evenly spaced
```

Y se cierra el prompt con:

```
unretouched documentary realism, not a 3D render
```

### Regla 5 · El despegado: "una sola lámina continua", nunca "la mitad izquierda y la mitad derecha"

El fallo: si escribes `the left half is peeled and the right half is still stuck`, el modelo genera **dos parches
separados**. Lee "mitad" y "mitad" como dos objetos. Lo que produce un despegado coherente es describirlo como una
sola pieza con una sola frontera:

```
He is peeling the patch off in ONE CONTINUOUS SHEET: the right portion is still stuck flat and
translucent on the right side of the nose, and WITHOUT ANY BREAK it lifts along one single boundary
down the ridge and hangs from his thumb and index finger at the left, curled, limp, its underside
turned to the camera.
```

Y el reverso, siempre:

```
irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow
domes, the plugs pulled out of the pores
```

**Alternativa más segura.** El plano "parche ya fuera, sujeto delante de la nariz limpia" (estado 5) es mucho más
fácil de generar bien y enseña las dos cosas a la vez: las manchas blancas y la nariz limpia. Si el despegado a medias
no sale a la primera, cámbialo por este plano. El anuncio no pierde nada. La frase:

```
STATE 5: the patch is completely off. He is holding the used patch up between thumb and index
finger, a few centimetres in front of his own nose and slightly to one side so it does not cover
it, its underside turned toward the camera: irregular opaque milky-white islands studded with
dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores. Behind it,
in the same focal plane, his nose is now CLEAN: the pores are open, EMPTY and flat, there are NO
dark dots and NO grey-brown plugs anywhere, the skin faintly pink and matte with the faint mark of
the patch edge. The patch is ENTIRELY inside the frame, nothing cropped by the frame edge.
```

### Regla extra que va con las cinco: el parche traslúcido se vuelve invisible

Está en la biblia como regla crítica y merece repetirse aquí porque afecta a decenas de planos. El parche es
traslúcido, así que si sólo dices "lleva el parche puesto", el modelo lo hace invisible y la imagen parece que la
persona se está apretando la nariz: el mensaje contrario. En **toda** imagen con el parche puesto:

```
a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its
butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less
shiny than the surrounding skin, edges perfectly sealed against the skin
```

Y si ya ha absorbido grasa:

```
the patch now opaque white in blotches with small pale-yellow dots where the pores were, still
translucent at the edges
```

---

## 8. Protocolo de revisión

Tres pasadas. La primera dura diez segundos y se hace con la miniatura. La segunda dura un minuto y se hace al 100%.
La tercera sólo se hace justo antes de animar.

### Pasada 1 · Los diez segundos (mira la miniatura, no la imagen grande)

- [ ] ¿Parece una foto de carrete o parece un anuncio? Si dudas, es un anuncio: repite.
- [ ] ¿Está el encuadre torcido y descentrado, o está centrado y compuesto?
- [ ] ¿Hay una sola persona? ¿Un espejo con alguien dentro?
- [ ] ¿Cuántas manos hay? Cuéntalas.
- [ ] ¿Se ve el parche? (Si es traslúcido y no se ve, la imagen no sirve.)
- [ ] ¿El parche está entero dentro del cuadro cuando es el sujeto?

### Pasada 2 · El minuto (100% de zoom, por zonas)

**Piel y cara**

- [ ] ¿Hay poros de verdad o hay una superficie lisa con "textura" pintada?
- [ ] ¿Los poros están en cuadrícula? Si hay filas, repite con la frase de la regla 4.
- [ ] ¿La cara es simétrica? Busca las cejas: si están a la misma altura exacta, falla.
- [ ] ¿Hay vello fino en la mandíbula y el labio superior, o la piel acaba en un borde limpio?
- [ ] ¿El brillo está donde tiene que estar (puente de la nariz y frente) y las mejillas mates?
- [ ] ¿Los ojos tienen un reflejo enorme y redondo? ¿El iris brilla como si tuviera luz propia?
- [ ] ¿La edad cuadra? Marisol con 43 tiene surcos nasogenianos y patas de gallo; si parece de 30, falla.

**Producto**

- [ ] ¿El troquel del parche es el de la foto de referencia, o es un óvalo/rectángulo inventado?
- [ ] ¿El tamaño es real respecto a los dedos? Un parche de 6 cm son tres dedos, no media cara.
- [ ] ¿La caja está en uno de los dos ángulos permitidos, o se ha inventado un lateral?
- [ ] ¿El logotipo está bien escrito? Léelo letra a letra.
- [ ] ¿El estado del parche es uno solo? (Nunca en la mano y en la nariz a la vez.)

**Luz**

- [ ] ¿Hay una sola fuente? Busca las sombras: si apuntan a dos sitios, falla.
- [ ] ¿La sombra en la pared es coherente con la posición de la cabeza?
- [ ] Si el plano es de noche: ¿está la ventana negra y **sin** los azulejos reflejados? ¿Cuencas de los ojos oscuras?
- [ ] ¿Devuelve alguna superficie una cara o un cuerpo (ventana, grifo, pantalla, azulejo brillante)? Si sí, repite.
- [ ] ¿Hay tono dorado o ámbar en algún sitio? Si lo hay, repite.

**Texto y props**

- [ ] Mira las **cuatro esquinas**: es donde brota la marca de agua fantasma.
- [ ] Mira las superficies planas: azulejo, espejo, toalla, bote de champú, pantalla del móvil.
- [ ] ¿Hay números en algún sitio? ¿Un reloj? ¿Un envase con letras?
- [ ] ¿Aparece alguna marca que no sea NOCTA?

**Manos y anatomía**

- [ ] Cuenta los dedos de cada mano visible.
- [ ] ¿Hay algún dedo que sale de donde no debe, o una uña con forma rara?
- [ ] ¿La mano ociosa está haciendo algo coherente, o flota?

### Pasada 3 · Antes de animar

- [ ] ¿Hay desenfoque de movimiento horneado? Si lo hay, se convertirá en morphing. Repite sin él.
- [ ] ¿Hay alguna zona sobreexpuesta a blanco puro sobre la cara o las manos? Igual: morphing.
- [ ] ¿Coincide la luz con la del plano anterior y el siguiente del mismo anuncio?
- [ ] ¿Coinciden la ropa, el pelo y el sitio con el resto de las 15 tomas?

### Tabla rápida de fallo → arreglo

| Lo que ves | Qué escribes |
|---|---|
| Piel de cera | `visible skin pores and fine vellus hair, unretouched, honest skin texture, no digital smoothing` |
| Poros en filas | `pores scattered in a completely IRREGULAR, uneven distribution ... never aligned in rows or a grid` |
| Cara de modelo | borra `symmetrical features`; añade `faint natural facial asymmetry, one eyebrow slightly higher` |
| Fondo desenfocado | `deep focus — the background stays sharp, the way any phone photo looks` |
| Macro que parece 3D | quita `no bokeh`; añade `only two or three millimetres in sharp focus` |
| Parche invisible | el bloque completo de "translucent matte hydrocolloid film clearly visible..." |
| Parche cortado por el borde | `COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame...` |
| Dos parches en el despegado | `peeling the patch off in ONE CONTINUOUS SHEET ... WITHOUT ANY BREAK` |
| Imagen de noche que parece de día | `IT IS NIGHT: the only light is a hard ceiling fixture directly overhead...` |
| Nariz sucia en el "después" | segunda referencia + `the skin of the nose must look EXACTLY like that second reference` |
| Parche gigante | `about 6 cm wide, roughly the width of three fingers ... do not scale the product up` |
| Logotipo inventado | adjunta `caja` como referencia, o `label turned slightly away, too small to read` |
| Marca de agua fantasma | cola negativa completa, con la cláusula de props |
| Tercer brazo | `phone propped on the shelf, both hands free` (deja de ser selfie) |
| Persona duplicada | `no mirror, no reflection, no duplicated person` |
| Cara reflejada en la ventana o el grifo | `no reflections in the window or in the tap`, y `The mirror is out of frame.` |
| Piel con halo alrededor de los poros | baja un tramo de `quality` y apúntalo en la tabla del apartado 6.2 |

### Regla de decisión: repetir o editar

- Si falla la **composición, la luz o el encuadre** → repite el prompt corregido desde cero.
- Si falla **un detalle concreto** (los poros del después, el brillo de la nariz, el color de la camiseta) → edita
  sobre la imagen buena con la lista de preservación completa repetida.
- Si falla **dos veces lo mismo** → cambia el plano por la alternativa segura. El despegado a medias tiene una; el
  resto de planos difíciles casi siempre admiten un encuadre más cerrado que elimina el problema.

---

## 9. Anexo: bloques listos para pegar

### A · Cola negativa completa

Va al final de las 375 imágenes. **En los macros, borra `no shallow depth of field, no bokeh`.**

```
Constraints: no text, no lettering, no captions, no subtitles, no watermark, no logo, no badges, no
numbers, no frame borders, no collage, no split screen, no headers. No brand marks or legible text
on any prop — bottles, towels, packaging and phone screens have their printed sides turned away or
are too small to read. No shallow depth of field, no bokeh, no lens flare, no cinematic colour
grade, no teal-and-orange, no HDR glow or bloom or halos, no oversharpening, no oversaturation. No
studio lighting, no ring light, no softbox, no golden hour, no warm sunset cast. No fisheye, no
ultra-wide distortion. No mirror and no reflection, no duplicated person, no extra hands, no third
arm, no deformed fingers. Exactly one person in frame.
```

### B · Bloque de piel real, versión NOCTA con sebo activado

```
Real unretouched skin: visible pores across the nose, cheeks and forehead, fine vellus hair
catching the light along the jaw and the upper lip, natural sebum shine concentrated on the nose
bridge and the forehead while the cheeks stay matte — the shine a genuinely oily T-zone has at the
end of the day. Uneven tone with faint pink around the nostrils, two or three small moles, faint
fine lines at the outer corners of the eyes, faint honest under-eye shadows, one small healing
spot. Naturally muted catchlights in the eyes, no oversized specular glare in the iris. Faint
natural facial asymmetry, one eyebrow slightly higher than the other. No makeup, no foundation. No
digital smoothing, no beauty filter, no airbrushing, no plastic skin, no glossy retouched finish,
no glow.
```

Este bloque es genérico. En cada plano se le añade el subtono y las marcas del avatar que toque (tabla del apartado
1.3), y se sustituye `one small healing spot` por lo que diga esa tabla: en Bea son **dos** granitos en la barbilla.

### C · Macro de nariz con filamentos sebáceos (el "antes")

```
Extreme macro photograph of the tip and left side of a nose filling the frame, with a strip of
normal cheek skin at the edge of the frame so it reads as a person's nose and not a medical slide.
Taken with an iPhone ultra-wide camera in macro mode, lens about 3 cm from the skin: only two or
three millimetres of the nose are in sharp focus, the near edge of the nostril and the far cheek
fall out of focus fast — the razor-thin depth of field of a real phone macro. Slight barrel
distortion at the frame edges. The pores are clearly visible and each holds a flat grey-yellow
sebaceous filament, translucent, level with the skin, not raised, not dark, not inflamed — tiny
threads inside the pores, the ordinary texture of an oily nose. Pores scattered in a completely
IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every
pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced.
Calm skin, no redness, not irritated. Fine vellus hair, a shallow film of sebum on the nose bridge
catching one small hard specular highlight, matte where the cheek begins. Lit only by the phone's
own torch from the upper left — small hard source at a low raking angle, short-edged shadows
revealing every pore. Faint digital noise, mild highlight clipping on the oiliest ridge, auto white
balance leaning warm, framing slightly off-centre and handheld. Unretouched documentary realism,
not a 3D render. A photo from a real person's camera roll.
```

### D · Parche usado a contraluz

```
TIGHT CLOSE-UP of a used hydrocolloid nose patch held up between thumb and forefinger against a
bright overcast window, strongly backlit. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the
frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the
whole butterfly outline must be readable at a glance. The gel is semi-translucent and milky, and
inside its thickness there are dozens of small opaque white plugs, each a tiny column of absorbed
sebum, denser and whiter than the gel around them, each surrounded by a faint diffuse halo where
the light scatters through the gel. The patch is slightly curved and creased from having been on a
nose, not flat. The window behind is blown out to plain even white with no frame, no view, no
curtain. The fingers are in focus — fine fingerprint ridges, a hangnail, short unpainted nails,
faint vellus hair on the knuckles. No printed dots, no drawn pattern, no stickers, no glitter — the
plugs are physically inside the gel, not printed on it. Handheld iPhone photo, main camera, deep
focus, faint digital noise, slight tilt.
```

### E · Packshot de la caja NOCTA

```
@Image1 and @Image2 are the NOCTA box references and show the only two valid angles — front-facing
and three-quarter right. ANGLE LOCK: the box may appear only from one of these angles; do not
rotate, spin, flip or invent back panels, side panels or unseen sides. Keep the NOCTA box design,
its lettering and its colours exactly as in the reference — do not redraw, restyle or re-letter the
label.

MEDIUM CLOSE-UP of the NOCTA box standing on a bathroom sink shelf beside a folded dusty-rose
towel, photographed from just above counter height with a phone held in one hand. The box is at its
real physical size relative to the tap and the towel; the camera is close enough that the wordmark
fills a good part of the frame, but the box itself is NOT enlarged. One patch lies next to the box,
slightly curled, catching a small specular highlight, entirely inside the frame. Single hard warm
bulb above the mirror from the upper left, hard-edged shadow of the box on the tile behind. Slight
tilt, slightly off-centre framing, faint digital noise, mild highlight clipping on the tap. A photo
from a real person's camera roll, not a product shoot. Constraints: no other brands, no legible
text anywhere except the NOCTA box's own label, no watermark, no captions, no studio lighting, no
seamless background, no bokeh.
```

### F · Pase de micro-realismo (segunda pasada con otro modelo)

El workflow de UGC de Higgsfield prohíbe mandar una imagen cruda a vídeo: «Never send a raw gpt_image_2 board to video
unless both allowed Seedream attempts fail». Es decir, el propio Higgsfield considera que la salida cruda de GPT Image
no pasa el listón de realismo UGC.

Así que el pipeline son dos pasos por cada uno de los 375 planos:

| Paso | Modelo | Qué resuelve | Referencias |
|---|---|---|---|
| 1 | `gpt_image_2_5`, `variant: flare` | composición, producto, caja, escala real, cero texto | las 2-4 del apartado 5 |
| 2 | `soul_2` imagen a imagen, o Seedream | micro-realismo: piel, grano, material | **una sola**: la salida del paso 1 |

Que el paso 2 sea `soul_2` funciona justamente porque ahí sólo hace falta una referencia (la imagen del paso 1), que
es su límite. El prompt del paso 2 es el pase de *de-slop*, adaptado a NOCTA (se ha cambiado "keep the product blank /
unbranded" por la preservación de la marca):

```
KEEP EXACTLY the framing, composition, camera distance, pose, subject and product of this image —
no reframe, no zoom, no crop, no re-layout, no change to the scene, to the person's face / hair /
body, or to the product design. CHANGE ONLY micro-realism: true-to-life pore-level skin with
natural texture and fine vellus hair, real material detail, natural light with gentle highlight
roll-off and faint true sensor noise, a flat authentic iPhone photo, deep focus. PRESERVE the
face's exact shape / width / proportions 1:1 — do NOT squeeze / narrow / slim / stretch the face.
Keep the NOCTA box design, its lettering and its colours exactly as in the reference — do not
redraw, restyle or re-letter the label. AVOID AI-slop: waxy plastic skin, airbrushed poreless skin,
beauty-filter smoothing, over-saturation, HDR glow / bloom / halos, oversharpening, teal-orange
grade, shallow depth of field, bokeh, cinematic / DSLR look. No added text, no watermark.
```

En los macros, quita de ahí `deep focus`, `shallow depth of field` y `bokeh`. Ventaja colateral de este pase:
homogeneiza el grano y la piel entre las 15 tomas de un mismo anuncio, que es donde más se nota el salto al montar.

### G · Variación entre los 25 anuncios

Si varías "a ojo" cambiando sinónimos, el modelo converge igual y los 25 anuncios parecen el mismo. La solución de
Higgsfield es determinista: pools cerrados y rotación aritmética, «this defeats LLM-bias toward "familiar" pool
options». Monta una hoja con 25 filas, numeradas del 0 al 24, y rellena cada columna con la fórmula
`opción = pool[i % número_de_opciones]`, donde `i` es el número de fila. Nada de intuición.

| Columna | Opciones (pool cerrado) | Nº | Fórmula para la fila `i` |
|---|---|---|---|
| Avatar | Bea · Marisol · Álex | 3 | `pool[i % 3]` |
| Hora | día ventana · noche flash · mañana temprano | 3 | `pool[i % 3]` |
| Estancia | baño día · baño noche · dormitorio · ventana · mármol | 5 | `pool[i % 5]` |
| Vestuario | pijama · camiseta ancha · albornoz · ropa de calle | 4 | `pool[i % 4]` |
| Expresión | las nueve aprobadas del apartado 3.1 | 9 | `pool[i % 9]` |
| Gancho | los 25 del guion | 25 | uno por fila |

Con 3, 3, 5, 4 y 9 opciones no hay dos anuncios con la misma combinación en las 25 filas, y la hoja se rellena sola.
Dos coherencias que hay que respetar por encima de la rotación: la estancia y la hora tienen que cuadrar (nada de
"mañana temprano" en el baño de noche) y el vestuario tiene que cuadrar con la hora (nada de ropa de calle a las
23:30). Cuando choquen, mueve la fila entera al siguiente valor de la columna, no inventes una opción nueva.

Dentro de cada anuncio, declara explícitamente la banda de distancia de cada una de las 15 tomas
(`MACRO`, `TIGHT CLOSE-UP`, `MEDIUM CLOSE-UP`, `WAIST-UP`, `WIDE`) y **no repitas banda en tomas consecutivas**. Eso
es lo que evita que el montaje parezca una sola imagen animada quince veces.

Y la ley de casting, que para un producto de limpieza de poro es obligatoria: «identify what the product changes, then
UNDO that change in the character's default look». Los tres avatares empiezan `bare-skin no-makeup, no foundation,
oily T-zone, visible pores`. Si Bea ya sale perfecta en el plano 1, el anuncio no tiene nada que vender.

---

## Resumen en una página

1. Quita las palabras de calidad. `8k`, `cinematic`, `flawless` y `glowing` son las que fabrican el plástico.
2. Sustitúyelas por mecanismos: poros, vello fino, sebo en la zona T, asimetría, ruido digital, recorte de altas luces.
3. Una sola fuente de luz, dicha por sus consecuencias, nunca por la hora.
4. Foco profundo en todo menos en el macro. En el macro, dos o tres milímetros nítidos y borra `no bokeh`.
5. Encuadre torcido y descentrado sí; desenfoque de movimiento no, salvo la mano del plano 13.
6. Nada de reflejos: ni espejo, ni ventana con azulejos reflejados, ni grifo devolviendo la cara.
7. **Adjunta las fotos reales del producto. Siempre. Describirlo con palabras no basta.** De dos a cuatro referencias,
   el producto primero cuando el producto es lo que no puede fallar.
8. Angle Lock y escala real en todo plano con caja o parche.
9. El modelo es `gpt_image_2_5` con `variant: flare`, 9:16 nativo, `2k` + `high`, y los defaults (`1k` + `low`) hay
   que subirlos a mano en cada llamada. Nunca 4k.
10. Las cinco reglas comprobadas van siempre: parche entero en cuadro, referencia de nariz limpia, consecuencias de la
    luz de noche, poros irregulares, despegado en una sola lámina.
11. Dos pasos por plano: GPT Image 2.5 para la composición, Soul 2.0 o Seedream para el micro-realismo.
12. Revisa las cuatro esquinas antes de dar cualquier imagen por buena.
