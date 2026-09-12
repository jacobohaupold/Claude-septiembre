# CÓMO FUNCIONA LA IA DE VÍDEO: manual para que el guion y las escenas salgan exactas

**Versión 1.1 · 12 de septiembre de 2026.** (La 1.1 corrige los recuentos de palabras de los ejemplos, quita la órbita del packshot porque la biblia visual la prohíbe, y convierte el reparto de modelos en una tabla toma por toma.) Este manual recoge lo que hay que saber para animar las 375 tomas de NOCTA (25 anuncios × 15 tomas) sin quemar créditos. Los datos vienen de tres sitios y siempre se dice de cuál: (a) la investigación de modelos de vídeo guardada en `inv_modelos-video.json`, que cita las guías oficiales de ByteDance/Seedance, Kling, Google Veo 3.1, Runway Gen-4, MiniMax Hailuo y el blog de Higgsfield; (b) el catálogo real de modelos de Higgsfield, consultado por su API en esta sesión, que es de donde salen duraciones, resoluciones y parámetros; (c) `marketing/anuncios/BIBLIA_VISUAL.md`, que es lo que ya se ha comprobado generando 22 imágenes de verdad. Todo lo que no venga de ahí va marcado como **sin verificar**. No hay precios ni créditos en este documento porque no hay datos fiables de eso en la investigación.

Este manual no es para copiar a ciegas. Es para que entiendas por qué un prompt de vídeo se escribe al revés que un prompt de imagen, y por qué casi todos los descartes ya están decididos en la imagen fija, antes de darle a generar.

---

## Índice

1. [La regla de oro: el prompt describe el CAMBIO, no la escena](#1-la-regla-de-oro-el-prompt-describe-el-cambio-no-la-escena)
2. [Anatomía del prompt, modelo por modelo](#2-anatomía-del-prompt-modelo-por-modelo)
3. [Longitud: 60-100 palabras y qué pasa al pasarse](#3-longitud-60-100-palabras-y-qué-pasa-al-pasarse)
4. [Qué modelo usar para cada tipo de plano de NOCTA](#4-qué-modelo-usar-para-cada-tipo-de-plano-de-nocta)
5. [Movimiento de cámara: uno por plano, y con qué palabras](#5-movimiento-de-cámara-uno-por-plano-y-con-qué-palabras)
6. [Fotograma inicial y final (Frame Lock)](#6-fotograma-inicial-y-final-frame-lock)
7. [Prohibiciones cuando no hay prompt negativo](#7-prohibiciones-cuando-no-hay-prompt-negativo)
8. [Audio y subtítulos: por qué lo apagamos todo](#8-audio-y-subtítulos-por-qué-lo-apagamos-todo)
9. [Plantilla en blanco y tres ejemplos reales](#9-plantilla-en-blanco-y-tres-ejemplos-reales)
10. [Fallos típicos, su síntoma visible y la frase que los evita](#10-fallos-típicos-su-síntoma-visible-y-la-frase-que-los-evita)
11. [Flujo de producción y checklist antes de generar](#11-flujo-de-producción-y-checklist-antes-de-generar)
12. [Lo que no está verificado](#12-lo-que-no-está-verificado)

---

## 1. La regla de oro: el prompt describe el CAMBIO, no la escena

En imagen a vídeo el modelo **ya tiene la imagen delante**. No necesita que le cuentes lo que hay. Necesita que le digas qué se mueve, cuánto y hacia dónde. Es la única regla en la que coinciden literalmente las cuatro guías oficiales que hemos leído:

- Seedance (documentación de ByteDance): *"Do not describe what is already there. The model can see the image"*.
- Runway, guía oficial de imagen a vídeo: *"Effective image to video prompts focus almost exclusively on motion, rather than describing elements present in the image"*.
- Kling: *"Image-to-video only needs motion instructions (never redescribe what's in the image)"*.
- Hailuo: describir lo estático *"wastes tokens and confuses the motion generator"*.

El mecanismo es este: el modelo reparte una cantidad limitada de atención entre lo que le escribes. Si le dedicas 90 palabras a describir la forma del parche, esas 90 palabras compiten con la instrucción de movimiento **y además le dan permiso para volver a dibujar el parche**. Por eso pasa lo que pasa: pegas la ficha física del parche en el prompt de vídeo y Seedance te devuelve un parche con otra silueta. No es que ignore la imagen; es que le has pedido dos veces la misma cosa y la segunda versión gana.

**La única excepción es el anclaje de identidad.** Una referencia mínima al sujeto sí conviene, porque sin ella el modelo cambia a la persona por una genérica. Basta con esto:

```
The woman from the image, maintain her exact face, skin and hair.
```

### Qué va en cada prompt

La ficha del parche de `BIBLIA_VISUAL.md` (60 mm de ancho, 45 mm de alto, alas de 23 mm, notch de 6 mm, grosor de 0,55 mm, borde biselado) va **entera en el prompt de imagen y ni una palabra en el de vídeo**. Con un matiz que la biblia dejó escrito después de generar: la ficha sola no basta. En toda imagen donde salga el parche hay que adjuntar además las fotos reales del producto (`parche_liner`, `parche_puesto`, `parche_puesto_2`, `caja`) como `image_references` y abrir el prompt con esta frase, tal cual:

```
The patch must be EXACTLY the product in the reference photographs: same silhouette,
same proportions, same translucent matte material. Do not invent a different shape.
```

En el prompt de vídeo no se repite esa ficha ni esa frase. Las fotos del producto sí pueden ir como `image_references` en los planos de producto que marca el punto 4, pero entonces hay que escribir siempre la frase de exclusión del ejemplo 3: una referencia arrastra consigo su fondo y su luz. Reparto:

| Va en el prompt de IMAGEN (GPT Image 2.5) | Va en el prompt de VÍDEO (Seedance) |
|---|---|
| Geometría exacta del parche, milímetros, troquel | Nada del parche salvo "keeps its shape and translucency" |
| Estado 1-5 del parche (limpio, saturado, a medio quitar…) | Nada: el estado ya está en la imagen |
| Descripción física del avatar (lunar, canas, cicatriz) | "the woman/man from the image, maintain exact face" |
| Poros irregulares, filamentos, vello, ruido de sensor | Nada: la textura ya está horneada |
| Luz del sitio 1-5 con hora y dirección | Solo si la luz CAMBIA durante el clip. Si no, "light unchanged" |
| Óptica, profundidad de campo, encuadre | Nada. Encuadre y ratio están bloqueados por la imagen |
| "No text, no logos, no watermark" | "No subtitles." |
| — | **La acción: posición inicial → posición final** |
| — | **Un movimiento de cámara** |
| — | **Lo que no puede cambiar** |

Regla práctica para NOCTA: si una frase del prompt de vídeo describiría igual de bien el fotograma congelado, **sobra**.

---

## 2. Anatomía del prompt, modelo por modelo

Cada modelo publica su propio orden. El contenido es casi el mismo; lo que cambia es la secuencia, y la secuencia importa porque los modelos dan más peso a lo que va primero.

**Seedance 2.5 — fórmula oficial de ByteDance, seis partes en este orden.** Sujeto → Acción/evento → Escena y entorno → Estilo visual → Movimiento de cámara o corte → Audio. Solo las dos primeras son obligatorias.

**Seedance 2.0.** Añade luz y restricciones: *precise subject + action details + scene/environment + lighting & color tone + camera movement + visual style + image quality + constraints*.

**Seedance 1.x.** Versión corta: *"Prompt = subject + movement + scene + camera, style"*. Versión larga de seis bloques: `[Sujeto][Movimiento][Cámara][Entorno][Luz][Estilo]`.

**Kling.** Sujeto + Movimiento del sujeto + Escena + (Lenguaje de cámara + Luz + Atmósfera). Es el único que pide explícitamente declarar **lo que NO se mueve**.

**Veo 3.1 (Google Cloud), cinco partes.** `[Cinematografía] + [Sujeto] + [Acción] + [Contexto] + [Estilo y ambiente]`. Ojo: Veo pone **la cámara primera**, al revés que Seedance.

**Runway Gen-4.** Sujeto → acción → movimiento de cámara y estilo, con lenguaje *"simple and direct"*.

**Hailuo.** Un solo plano legible: sujeto claro, acción visible, entorno controlado, un movimiento de cámara intencionado.

### Tabla comparativa

| Modelo | Orden publicado | Cámara | Negativo | Obligatorio |
|---|---|---|---|---|
| Seedance 2.5 | Sujeto → Acción → Escena → Estilo → Cámara → Audio | 5.ª posición | No (solo "No subtitles / No BGM / No audio") | Sujeto + Acción |
| Seedance 2.0 | Sujeto → Acción → Escena → Luz y color → Cámara → Estilo → Calidad → Restricciones | 5.ª posición | No | Sujeto + Acción |
| Seedance 1.x | Sujeto → Movimiento → Cámara → Entorno → Luz → Estilo | 3.ª posición | No | Sujeto + Movimiento |
| Kling 2.x | Sujeto → Movimiento → Escena → (Cámara + Luz + Atmósfera) | Al final | Sí, `negative_prompt` 2.500 car. (eliminado en 3.0+) | Sujeto + Movimiento |
| Veo 3.1 | **Cinematografía** → Sujeto → Acción → Contexto → Estilo | **Primera** | Sí, `negativePrompt` (solo en Vertex AI) | Sujeto + Acción |
| Runway Gen-4 | Sujeto → Acción → Cámara/estilo | Al final | Solo en las ramas veo3.1 / veo3.1_fast | Acción |
| Hailuo | Sujeto → Acción → Entorno → Cámara | Al final, entre corchetes | No | Sujeto + Acción |

**Dato que ahorra discusiones:** la duración y el aspect ratio **no se escriben en el prompt en ninguno de los siete modelos**. Son parámetros de API. Escribir "4 seconds, 9:16 vertical" dentro del prompt no hace nada y ocupa presupuesto de atención.

**Qué hacemos en NOCTA.** Un solo diccionario de contenido y dos plantillas de orden: la **orden-Seedance** (sujeto → acción → escena → estilo → cámara → audio) para todo lo que pase por Higgsfield, y la **orden-Veo** (cámara → sujeto → acción → contexto → estilo) guardada por si algún día saltamos a Veo 3. Se cambia el ensamblado, nunca el contenido.

---

## 3. Longitud: 60-100 palabras y qué pasa al pasarse

La cifra está publicada. Seedance 2.0/2.5 fija el objetivo en **60-100 palabras** y lo explica así: *"If it's too short, you'll miss key details; if it's too long, you might end up with conflicting instructions"*. La guía de 2.5 lo remata: *"two or three sentences is the sweet spot. Clearer beats longer"*, y avisa de que amontonar terminología de cine degrada el resultado porque el prompt *"fights itself"*. La guía de desarrollador de 2.0 lo llama *soft attention budget per clip*.

Kling admite 2.500 caracteres de prompt por API, pero su propia guía dice que *"a tight 60-to-100-word prompt usually outperforms a maxed-out one"*. Seedance 1.x pide quedarse por debajo de 250 palabras.

| Palabras | Qué pasa | Fuente |
|---|---|---|
| < 40 | Faltan detalles clave; el modelo rellena a su gusto y sale deriva | Guía Seedance 2.0/2.5 |
| **60-100** | **Óptimo declarado por ByteDance y por Kling** | Guías oficiales |
| > 100 | La atención se diluye: *"output can ignore half the prompt"* | Guía de desarrollador Seedance 2.0 |
| > 250 (Seedance 1.x) | Fuera del rango recomendado del modelo | Guía Seedance 1.0 |
| > 1.000 palabras / 500 caracteres chinos | Límite duro: *"longer text causes elements to disappear"* | Documentación ByteDance |

**Tope duro para NOCTA: 90 palabras por plano.** Se cuenta antes de generar y no a ojo: guarda el prompt en un fichero y pasa `wc -w prompt.txt`, o haz que el generador cuente `len(prompt.split())` y se niegue a lanzar por encima de 90. Con 375 prompts, cada tirada repetida por un prompt obedecido a medias es dinero tirado. Y hay un atajo para recortar: cuando un prompt de vídeo se pasa de 90 palabras, lo que sobra es casi siempre descripción del parche o de la cara. Eso va a la imagen fija, no al vídeo.

---

## 4. Qué modelo usar para cada tipo de plano de NOCTA

Primero, lo que **de verdad** hay en el catálogo de Higgsfield (consultado por su API en esta sesión). **No existe "Seedance 1.0"** en la plataforma; si alguien lo menciona, está mirando documentación de otro sitio.

| Modelo (catálogo Higgsfield) | Duración | Resolución | Imágenes que acepta | Notas |
|---|---|---|---|---|
| Seedance 1.5 Pro | 4 / 8 / 12 s | 480p / 720p / 1080p | **Solo `start_image` + `end_image`** | No acepta `image_references` |
| Seedance 2.0 | 4-15 s | 480p / 720p / 1080p / 4K | start, end, `image_references`, `video_references`, `audio_references` | 1080p y 4K exigen `mode='std'`; `mode='fast'` solo 480p/720p. Tiene `bitrate_mode` y `genre` |
| Seedance 2.0 Mini | 4-15 s | hasta 720p | igual que 2.0 | Para pases de prueba |
| Seedance 2.5 | 4-30 s | 480p / 720p / 1080p | modos `t2v`, `omni_reference`, `video_edit`, `video_extension` | Hasta 50 referencias (30 img + 10 vídeo + 10 audio); admite multi-vista |
| Kling 3.0 Turbo | 3-15 s | 720p / 1080p | solo `start_image` | **Ya no tiene `negative_prompt`** |
| Ad Multiplier | — | — | — | Es Seedance 2.5 por debajo |

La guía de Seedance lo dice sin rodeos y conviene tenerlo pegado en la pared: *"A higher version number is not a strict upgrade here, so pick per job: length and binding from 2.5, pixels from 2.0"*. Traducido: **2.5 no es "mejor" que 2.0**. 2.5 tiene más duración y más referencias; 2.0 tiene más píxeles.

### Reparto plano a plano

Las 15 tomas son siempre las mismas (columna vertebral de la biblia), así que el reparto se decide una vez y se copia en los 25 anuncios. Esta tabla se lee de izquierda a derecha y se rellena en el JSON del plano sin pensar más:

| Toma | Qué es | Modelo | Duración | Resolución | Frame Lock |
|---|---|---|---|---|---|
| 1 | Gancho A | Seedance 2.0 `std` + `image_references` del avatar | 4 s | 1080p | No |
| 2 | Gancho B (mismo momento, otro ángulo) | Seedance 2.0 `std` + `image_references` del avatar | 4 s | 1080p | No |
| 3 | Diagnóstico, macro de nariz | Seedance 1.5 Pro | 4 s | 1080p | No |
| 4 | Detalle del problema (poro, filamento) | Seedance 1.5 Pro | 4 s | 1080p | No |
| 5 | El error (apretar, la tira, el exfoliante) | Seedance 2.0 `std` + `image_references` del avatar | 4 s | 1080p | Sí, si el error es arrancar una tira |
| 6 | Consecuencia del error (rojez, marca) | Seedance 1.5 Pro | 4 s | 1080p | No |
| 7 | Entrada del producto, caja en la mano | Seedance 2.0 `std` + `image_references` de la caja | 4 s | 1080p | Sí |
| 8 | Parche fuera del sobre, macro | Seedance 2.0 `std` + `image_references` del parche | 4 s | 1080p | Sí |
| 9 | Preparación, nariz limpia y seca | Seedance 1.5 Pro | 4 s | 1080p | No |
| 10 | Colocación del parche | Seedance 1.5 Pro | 4 s | 1080p | Sí |
| 11 | Parche puesto, cara o perfil de noche | Seedance 2.0 `std` + `image_references` del avatar | 4 s | 1080p | No |
| 12 | La noche pasa, dormido | Seedance 2.0 `std` + `image_references` del avatar | 4 s | 1080p | No |
| 13 | Retirada por la mañana | Seedance 1.5 Pro | 4 s | 1080p | Sí |
| 14 | La prueba, parche usado a contraluz | Seedance 1.5 Pro | 4 s | 1080p | Sí |
| 15a | Cierre: nariz después, misma luz que la toma 3 | Seedance 1.5 Pro | 4 s | 1080p | No |
| 15b | Cierre alternativo: packshot del pack | Seedance 2.0 `std` + `image_references` de la caja | 4 s | 1080p (4K solo si habrá zoom en montaje) | No |

Y los tres casos que no son una toma fija:

| Caso | Modelo | Duración | Resolución |
|---|---|---|---|
| Pase de prueba de cualquier toma | Seedance 2.0 Mini | 4 s | 720p |
| Plano hablado a cámara, si el guion lo pide | Seedance 2.0 `std` | 8 s | 1080p |
| Plan B si una toma se resiste | Kling 3.0 Turbo | 4-5 s | 1080p, sin `negative_prompt` |

**Por qué está repartido así:**

- **Seedance 1.5 Pro para piel, macro y manos.** Solo admite `start_image` y `end_image`: no tiene campo de referencias por el que colarse a reinterpretar, y en macro queremos movimiento casi nulo y resolución alta. Que "invente menos" es una deducción nuestra a partir de esa limitación, no un dato publicado: **sin verificar**.
- **Seedance 2.0 en `mode='std'` para todo lo que lleve identidad o producto.** Es el que combina `image_references` con 1080p y 4K (`mode='fast'` solo llega a 720p). Seedance 2.5 también admite referencias, pero su tope es 1080p y tiene más superficie para reinterpretar, así que no lo usamos en ninguna toma.
- **El plano hablado va en 2.0, no en 2.5.** La única ventaja de 2.5 aquí sería su audio nativo, y en NOCTA el audio va apagado en los 375 clips y la voz se graba y se monta aparte (punto 8). Mientras eso siga así, 2.5 no aporta nada y sí quita píxeles.
- **Aviso sobre las tomas 7 y 8**, que llevan referencia y Frame Lock a la vez: **sin verificar** que la API de Seedance 2.0 acepte `image_references` y `end_image` en la misma llamada. Si la rechaza, manda el Frame Lock: quita la referencia y tira con `start_image` + `end_image`, porque el troquel y el lettering ya están horneados en la still.

**Lo que NO se hace:** usar Seedance 2.5 para los macros. Tiene peor tope de resolución que 2.0 y más superficie para reinterpretar. Y tampoco se usan los "presets" de Higgsfield tipo EARTH ZOOM, ORBIT 360, STICKER PEEL o ACTION FIGURE: son plantillas virales de personaje, no controles de cámara, y no sirven para un anuncio de producto.

### El "look lock" de Higgsfield Cinema Studio

En Cinema Studio la cámara y la óptica **son parámetros, no texto**. Esto es importante y es la tesis del propio Higgsfield: *"A lighting preset is a physics parameter the model builds from. A text description is interpreted fresh each time and can vary. The preset is a hard constraint"*. Y también: *"the variance you see between generations comes directly from everything the words left unspecified about a physical camera move"*.

Traducción para NOCTA: el antes/después con la misma luz **solo es replicable si el preset de luz está bloqueado**, no descrito en texto. Fijamos esto una vez para los 25 anuncios y no se toca:

| Parámetro | Valor NOCTA | Por qué |
|---|---|---|
| Camera MoveSet Style | `Classic Static` | Congela el encuadre mientras la escena se mueve |
| Lens Character | `Extreme Macro` solo en macros de poro y parche usado; el resto normal | Evita macro falsa en planos medios |
| Aperture | `f/4` | A f/1.4 la punta de la nariz queda nítida y las alas no |
| Focal Length | `35 mm` en planos con persona | La lista de Cinema Studio es 8 / 14 / 35 / 50 / 75 mm y la cámara principal de un móvil ronda los 26-28 mm equivalentes, así que 35 mm es la que más se acerca al look de la biblia. **Sin verificar**: no se ha comparado 35 contra 50 generando |
| Lighting preset | `Window` en los planos de ventana | Restricción física, no texto reinterpretable |
| Máximo de plano | ~12 s en Cinema Studio 3.5 | Muy por encima de nuestros 4 s |

---

## 5. Movimiento de cámara: uno por plano, y con qué palabras

**Seedance documenta ocho movimientos y solo ocho:** push-in/dolly in, pull-out/dolly out, pan/lateral, tracking/follow, orbit/arc, aerial/drone, handheld, fixed/locked-off. La regla dura está escrita: *"Use only one primary camera instruction"*. Apilar dos produce jitter — ese temblor de cuadro que hace que el plano parezca mal estabilizado.

Veo 3 publica además vocabulario de posición (aerial view, eye-level, low-angle shot, top-down shot, over-the-shoulder), composición (wide shot, close-up, extreme close-up, two-shot) y óptica (shallow depth of field, wide-angle lens, soft focus, macro lens, deep focus). Hailuo tiene lista cerrada entre corchetes: `[Truck left]`, `[Push in]`, `[Pull out]`, `[Pedestal up]`, `[Tilt down]`, `[Zoom in]`, `[Tracking shot]`, `[Static shot]`, etc.

### Diccionario cerrado de NOCTA

Uno de estos, y solo uno, por plano:

| Plano | Frase exacta, en inglés |
|---|---|
| Macro de nariz | `Locked-off extreme close-up, macro lens, the camera does not move and the framing does not change.` |
| Dedo señalando | `Slow push in.` |
| Aplicar el parche | `Static shot, the camera does not move.` |
| Dormir | `Very slow push in.` |
| Retirada del parche | `Locked-off close-up, the camera does not move.` |
| Parche a contraluz | `Locked-off close-up, the camera does not move, the framing does not change.` |
| Antes / después | `Identical static framing, the camera does not move, the light does not change.` |
| Packshot de la caja | `Very slow push in, the camera moves straight forward and does not rotate, decelerating smoothly into a static hold.` |
| Hablar a cámara | `Handheld phone framing with slight natural drift, no zoom.` |

**Por qué en esta tabla no hay ni una órbita.** La investigación propone `slow 180-degree orbit` para el packshot, pero la biblia visual, que es lo que está comprobado generando, dice literalmente: «Cámara: "static handheld with micro-drift", "very slow push in", "slow pull back". Nada de órbitas ni grúas». Manda la biblia. De paso nos quita el riesgo de que el lettering se deforme al girar la caja. Si algún día se quiere la órbita, es una prueba suelta de un plano con el resultado delante, no un cambio de manual.

### Palabras que estropean el plano

| Prohibido escribir | Por qué |
|---|---|
| `cinematic` | Es ruido. Kling recomienda sustituirlo por `slow dolly-in` |
| `epic`, `beautiful`, `amazing`, `lots of movement` | Listadas como palabras que degradan |
| `24fps`, `f/1.8`, `ISO 400`, `8k` | La guía de Seedance manda *"exclude technical specs (fps, aperture, ISO)"*. En Higgsfield sí existen, pero como parámetros |
| `probe lens`, `macro probe lens` | No está en ninguna lista oficial. `macro lens` y `100mm macro` sí |
| `dynamic camera` | No es ninguno de los ocho movimientos |
| `handheld` + `smooth` / `stabilized` juntos | Incoherencia declarada en Runway |

### Ritmo, adverbios y el "settle"

Seedance recomienda adverbios de grado para fijar la amplitud (`fast`, `large amplitude` de un lado; `slight`, `subtle` del otro) y **prohíbe instrucciones en conflicto**: no pidas lento y rápido a la vez. Higgsfield añade dos cosas que reducen la varianza entre tiradas:

- **Notación de rampa por puntos discretos**, que el motor sí lee: `100% > 40% > 25%`.
- **El "settle"**: terminar el movimiento en una parada. `decelerating smoothly into a static hold`. Kling dice lo mismo con otras palabras: `then settles back into place`.

En UGC de móvil queremos poco movimiento y mucha textura. Regla: todos los macros y planos de producto llevan `slow, steady` y final estático. Solo el plano de hablar a cámara lleva `handheld with slight natural drift`.

**Confusión dolly/zoom.** Si de verdad quieres un zoom óptico y no un desplazamiento, hay que nombrar el movimiento y descartar el rival:

```
purely optical zoom, NOT a dolly out
```

---

## 6. Fotograma inicial y final (Frame Lock)

Hay planos que no salen bien de ninguna manera describiendo el gesto. Son los de manos: **despegar el parche, colocar el parche, dedos sobre la nariz**. La razón la explica la propia guía de Higgsfield: las manos y las caras *"are the first details to degrade"* cuando el prompt compite con fondo, luz y vestuario. Y el remedio, literal:

> *"Describe the hand's exact position before and after, not the gesture itself"* — eso elimina *"the open-ended motion path the model would otherwise have to invent"*.

Cuando escribes `she peels the patch`, el modelo tiene que inventarse la trayectoria completa de los dedos. Ahí es donde aparecen seis dedos, nudillos fundidos y muñecas dobladas al revés. Cuando escribes dónde está la mano al empezar y dónde al acabar, el modelo solo tiene que interpolar. Y si además le das las dos imágenes: *"The engine interpolates between the two anchors and stops drifting."*

### Cómo se escribe

Dos estados, no un verbo. Siempre en la **primera** frase del prompt, porque lo que va primero pesa más:

```
Start: thumb and index finger pinch the notch under the tip of the nose.
End: the same hand fifteen centimetres in front of the face, the patch hanging
from the fingers with its inner side toward the camera, the nose bare and matte.
```

### Los cinco planos de NOCTA que llevan Frame Lock obligatorio

| Toma | `start_image` | `end_image` | Frase clave del vídeo |
|---|---|---|---|
| 10 · Colocación | Parche entre los dedos a 10 cm de la nariz | Parche plano sobre la nariz, alas dobladas | `Move slowly and steadily between the two positions, anatomically correct hands, realistic finger articulation.` |
| 13 · Retirada | Dedos pellizcando el ala | Parche colgando de los dedos, nariz limpia | `The peel is slow, steady and deliberate; the gel stretches slightly and never tears.` |
| 8 · Parche fuera del sobre | Parche en el liner | Parche levantado, liner vacío | `The gel stretches one or two millimetres as it lifts.` |
| 14 · Parche a contraluz | Mano con el parche, palma a 0° | La misma mano girada 10° | `The hand rotates about ten degrees toward the bright window behind it.` |
| 7 · Caja en la mano | Caja cerrada | Sobre asomando | `The cream sachet slides two centimetres out of the box and stops.` |

La imagen del END se genera con GPT Image 2.5 **con las mismas referencias y el mismo prompt de luz que la del START**, cambiando solo el estado. Es lo que dice la biblia para el antes/después y vale igual aquí: dos stills hermanas.

**Truco barato.** Aunque un plano no necesite un END distinto, poner un `end_image` hace que el movimiento entre anclas sea más deliberado y menos errático. La receta concreta: coge la misma still, recórtala un 3 % por los cuatro lados (eso es un push-in mínimo), reescálala al mismo tamaño en 9:16 y pásala como `end_image`. Con ImageMagick es una línea:

```
magick start.png -gravity center -crop 97%x97%+0+0 +repage -resize 1080x1920! end.png
```

**Sin verificar**: la investigación dice que «la misma imagen ligeramente reposicionada» funciona, pero no publica cuánto. El 3 % es nuestra cifra de partida y hay que confirmarla en el primer plano que se tire.

**Dos reglas de la biblia que se aplican en la still, no en el vídeo.** Primera: el despegado se describe como **una sola lámina continua**, nunca "la mitad izquierda y la mitad derecha", porque eso genera dos parches separados. Segunda: si la mano no es el sujeto del plano (por ejemplo, en un macro de nariz), **sácala de cuadro en la still**. Es más barato que arreglarla.

**Alternativa segura.** Si la toma 13 no sale a la primera, se cambia por el plano "parche ya fuera, sujeto delante de la nariz limpia": es mucho más fácil de generar y enseña las dos cosas a la vez (manchas blancas y nariz limpia). El anuncio no pierde nada.

---

## 7. Prohibiciones cuando no hay prompt negativo

Mucha gente escribe `no extra fingers` en Seedance y se queda tranquila. No hace nada. **Seedance no tiene campo `negative_prompt` en ninguna versión.**

| Modelo | Campo negativo | Detalle |
|---|---|---|
| Kling 1.6 / 2.1 Master / 2.5 Turbo Pro / 2.6 Pro | Sí | `negative_prompt`, hasta 2.500 caracteres |
| **Kling 3.0+ (el que hay en Higgsfield)** | **No** | Eliminado |
| Veo 3.1 en Vertex AI | Sí | `negativePrompt`. No existe en la superficie de Gemini API |
| Runway | Parcial | `negativePrompt` (1.000 car.) solo en las ramas veo3.1 / veo3.1_fast |
| Wan 2.x | Sí | 500 caracteres, truncado en silencio |
| **ByteDance Seedance (todas)** | **No** | Solo se documentan `No subtitles`, `No BGM`, `No audio` |
| MiniMax Hailuo, Luma, Sora, Grok | No | — |

En Seedance 1.0 Lite se dice explícitamente que los negativos no funcionan y que `--no blur` no hace nada.

### Cómo se convierte una prohibición en algo que sí funciona

Google lo formula mejor que nadie: *"Not recommended: using instructive language or words such as no or don't... Recommended: describe what you don't want to see"*. Cinco sustitutos, por orden de eficacia:

1. **Afirmar el estado deseado.** `the skin stays matte` en vez de `no redness`.
2. **Congelar lo que no debe moverse.** `the background stays still`, `the framing does not change`.
3. **Sacarlo del encuadre en la still.** Lo que no está en la imagen no se puede deformar.
4. **Bajar el movimiento.** Es la causa real de la mitad de los artefactos.
5. **Lista de sustantivos** en vez de frases negativas, cuando toque nombrar algo.

### Tabla de conversión para NOCTA

| Lo que quieres prohibir | Lo que escribes |
|---|---|
| Que cambien el encuadre | `the framing does not change` |
| Que se mueva el fondo | `the background stays still` |
| Que el parche cambie de forma | `the patch keeps its shape and translucency` |
| Que la piel salga de plástico | `the skin stays matte and unretouched with visible pores` |
| Que la cara cambie | `maintain the exact face, skin and hair of the image` |
| Que la nariz se ponga roja | `the skin underneath stays smooth and does not redden` |
| Que el parche se rompa al tirar | `the gel stretches slightly and never tears` |
| Que desaparezcan los puntos blancos del parche usado | `the white deposits on the patch stay exactly as in the image` |
| Que cambie la luz | `the light does not change` |
| Que salga texto | `No subtitles, no text, no watermark.` (solo la primera está documentada; las otras dos las manda la biblia) |
| Que el lettering de la caja se deforme | `The lettering on the box does not change.` + no rotar la caja |

### El bloque fijo de restricciones positivas

Va al final de **todos** los prompts de vídeo de NOCTA. Son 31 palabras y valen para los 375 planos:

```
The framing does not change, the background stays still, the patch keeps its shape
and translucency, the skin stays matte and unretouched with visible pores.
No subtitles, no text, no watermark.
```

De las tres negaciones finales, `No subtitles` es la única que ByteDance documenta como obedecida. `no text` y `no watermark` las exige la biblia visual para toda la cadena («no text, no subtitles, no watermark»), cuestan cuatro palabras y no estorban, así que se quedan aunque Seedance no garantice nada con ellas.

Y el bloque negativo **solo** si alguna vez usamos un modelo con campo real (Kling 2.x fuera de Higgsfield, Veo en Vertex):

```
no facial warping, no changing facial features, no extra fingers, no fused digits,
no melted hands, no flicker, no camera drift, no sudden zooms, no motion blur,
no plastic skin, no beauty filter, no text, no watermark
```

---

## 8. Audio y subtítulos: por qué lo apagamos todo

Seedance 2.x enruta el sonido y el texto por corchetes, y son **canales separados**:

| Corchete | Canal |
|---|---|
| `( )` | Música y ambiente |
| `< >` | Efectos de sonido |
| `{ }` | Diálogo hablado |
| `【 】` | **Subtítulos en pantalla** |

Repetir el mismo texto en `{ }` y en `【 】` hace que se oiga **y** se vea. En NOCTA no usamos ningún corchete, nunca.

**Dato crítico del catálogo de Higgsfield: `generate_audio` viene en `true` por defecto en Seedance 1.5, 2.0, 2.0 Mini y 2.5.** Hay que ponerlo a `false` a mano en los 375 clips. Tres razones:

1. **Los subtítulos los pone el usuario en el montaje.** Está en la fórmula de prompt de imagen de la biblia (`No text, no logos, no watermark`) y en las notas de montaje de los anuncios. Un subtítulo quemado por el modelo rompe eso y obliga a repetir el plano.
2. **"Unwanted subtitles" es un fallo documentado** de Seedance, y la puerta por la que entra es justamente el audio y el diálogo.
3. **La voz se graba entera de una vez y se monta primero**, y los planos se ajustan a ella. Un audio generado por el modelo no encaja con ese fraseo.

Además hay un riesgo de texto que no viene del audio: **la tipografía de la caja**. La caja de NOCTA lleva "nocta" en minúsculas, la luna creciente y la línea "PARCHES DE NARIZ HIDROCOLOIDE · 8 parches · noche", y la guía avisa de que *"complex typography distorts"*. Como la caja ya no gira nunca (punto 5), el riesgo baja mucho. Quedan dos maneras de blindarlo:

- **Por defecto: la caja quieta y la cámara entrando de frente.** Sin rotación no hay cara nueva que inventar ni lettering que reinterpretar.
- **Si aun así se deforma: caja ligeramente desenfocada** en el clip y el lettering nítido se resuelve en el montaje, superponiendo la foto real del packshot. La frase exacta, 30 palabras:

```
Keep the box slightly out of focus; the lettering stays soft and unreadable, and the
focus does not shift. The camera does not move. No subtitles, no text, no watermark.
```

Y siempre, en el prompt de packshot con la caja enfocada:

```
The lettering on the box does not change. No subtitles, no text, no watermark.
```

---

## 9. Plantilla en blanco y tres ejemplos reales

### La plantilla

```
[ANCLA DE SUJETO] [ACCIÓN: posición inicial → posición final, un solo cambio]
[RITMO] [CÁMARA: una sola instrucción] [LUZ: solo si cambia] [RESTRICCIONES POSITIVAS] No subtitles.
```

| Hueco | Qué se pone | Ejemplo | Cuándo se omite |
|---|---|---|---|
| **Ancla de sujeto** | 4-8 palabras: qué elemento de la imagen es el protagonista | `The woman from the image, maintain her exact face, skin and hair.` | En macros sin cara: `The nose from the image.` |
| **Acción** | UN cambio. Dónde está al empezar, dónde acaba. Números si hay distancias | `her index fingertip moves slowly down two centimetres along the nostril crease and stops` | Nunca se omite: es obligatoria |
| **Ritmo** | Adverbios de grado. `slow`, `steady`, `subtle`, `deliberate`. Nunca lento y rápido juntos | `slow, steady` | Si la acción ya lleva `slowly` |
| **Cámara** | Una sola frase del diccionario del punto 5 | `Locked-off close-up, the camera does not move.` | Nunca |
| **Luz** | Solo si cambia durante el clip. Si no, se congela | `soft window light from the left, unchanged` | Si no aporta y el prompt va justo de palabras |
| **Restricciones positivas** | El bloque fijo del punto 7, recortado a lo que aplique | `the background stays still, the patch keeps its shape` | Nunca del todo |
| **No subtitles.** | Literal, al final | `No subtitles.` | Nunca |

Además, fuera del prompt: `duration = 4`, `resolution = 1080p`, `generate_audio = false`, `mode = 'std'` si es Seedance 2.0 a 1080p.

### Ejemplo 1 — MACRO. Anuncio 1, toma 4: tres centímetros cuadrados de aleta

Modelo: Seedance 1.5 Pro · 4 s · 1080p · solo `start_image` · `generate_audio=false`.

```
The nose from the image. Only micro-movement: a faint breathing rise and fall of the
skin and a slow shift of the highlight on the tip. The pores and sebaceous filaments
stay exactly as in the image. Locked-off extreme close-up, macro lens, the camera does
not move and the framing does not change. Soft window light from the left, unchanged.
No subtitles.
```

58 palabras. Fíjate en lo que **no** hay: ni una palabra sobre poros irregulares, ni sobre ruido de sensor, ni sobre la luz del sitio 1. Todo eso ya está horneado en la still. Lo único que se pide es respirar y un reflejo que se desplaza.

### Ejemplo 2 — PERSONA. Anuncio 1, toma 10: colocación, baño de noche

Modelo: Seedance 1.5 Pro · 4 s · 1080p · **Frame Lock** (`start_image` + `end_image`) · `generate_audio=false`.

```
Start: both hands hold the translucent patch by its wings, ten centimetres in front
of the nose. End: the patch lies flat on the nose, narrow end on the bridge, wings
folded over the nostrils. Move slowly and steadily between the two positions,
anatomically correct hands, realistic finger articulation. Static shot, the camera
does not move. The hard overhead light does not change. The background stays still.
No subtitles.
```

70 palabras. Las manos van en la **primera** frase. No se dice "she applies the patch": se dicen las dos posiciones. Y no se describe la mariposa del parche, solo dónde acaba cada parte.

### Ejemplo 3 — PRODUCTO. Anuncio 1, toma 15: packshot del pack de 2

Modelo: Seedance 2.0 `mode='std'` · 4 s · 1080p (o 4K si habrá zoom en montaje) · `image_references` = foto real de la caja · `generate_audio=false`.

```
Use only the cream NOCTA box from @Image 1; do not use its background or its lighting.
The two boxes stand still on the cream marble table. One continuous slow 180-degree
orbit at constant radius and constant speed, decelerating smoothly into a static hold.
The lettering on the box does not change. Soft window light, unchanged. The background
stays still. No subtitles.
```

64 palabras. La segunda frase es obligatoria en Seedance 2.x y casi nadie la escribe: *"A reference carries everything visible — backgrounds, lighting, other people"*. Si no dices qué **no** tomar de la referencia, te trae también su fondo y su luz.

---

## 10. Fallos típicos, su síntoma visible y la frase que los evita

| Fallo | Síntoma visible en el clip | Causa real | La frase que lo evita |
|---|---|---|---|
| **Morphing entre planos** | La cara de Bea es otra en la toma 11 que en la 2; los pendientes cambian de forma a mitad de clip | Deriva de identidad. Es el fallo nº 1 documentado en imagen a vídeo | `maintain the exact face, skin and hair of the image` + `image_references` del avatar en Seedance 2.0 |
| **Deriva flotante** | El azulejo del fondo se desliza despacio, la pared "respira", el encuadre se va aunque no pediste cámara | El modelo no tiene orden de congelar nada, así que se inventa un movimiento suave | `the framing does not change, the background stays still` |
| **Manos de más** | Seis dedos, nudillos fundidos, muñeca doblada al revés, un pulgar que aparece en el segundo 3 | Has pedido un gesto y el modelo ha inventado la trayectoria | Frame Lock + `Start: ... End: ...` + `anatomically correct hands, realistic finger articulation` |
| **El producto rota y enseña caras que no existen** | La caja gira y el lado que aparece tiene otro logotipo, o el texto se convierte en garabatos | Órbita larga sobre tipografía compleja: *"complex typography distorts"* | Órbita corta: `One continuous slow 180-degree orbit at constant radius` + `The lettering on the box does not change.` Y solo 2-3 s útiles en montaje |
| **Piel de plástico** | La nariz se repule a mitad de clip: los poros desaparecen y queda una superficie de cera | El modelo "limpia" la piel cuando hay mucho movimiento o reescalado. Y `8k`, `cinematic`, `perfect`, `glowing` son órdenes de borrar textura | Movimiento casi nulo + 1080p desde el principio + `the skin stays matte and unretouched with visible pores`. Si la still ya es de plástico, **no hay prompt que la arregle**: se repite la imagen |
| **El parche cambia de silueta** | Empieza siendo la mariposa y acaba siendo un óvalo o una mancha | Has descrito el parche en el prompt de vídeo y el modelo lo ha vuelto a dibujar | Quitar toda la ficha del parche. Dejar solo `the patch keeps its shape and translucency` |
| **Texto quemado** | Aparece un subtítulo en inglés que no pediste, o una marca de agua | `generate_audio` estaba en `true` (es el valor por defecto) | `generate_audio=false` + `No subtitles.` + cero corchetes `{ }` y `【 】` |
| **Jitter de cuadro** | Temblor nervioso, como si el trípode vibrara | Dos movimientos de cámara apilados: *"use only one primary camera instruction"* | Una sola instrucción de cámara. Nunca `slow push in while orbiting` |
| **El clip se rompe al final** | Los primeros 2 s están bien y el último segundo se deforma | La coherencia se degrada más allá de 5-10 s y el tramo que falla es siempre el final | Generar 4 s y montar 1,5-3 s, entrando con el movimiento ya empezado |
| **Estados 4 y 5 mezclados** | El parche está en la mano **y** pegado en la nariz a la vez | La still ya venía mal | Se arregla en la imagen, no en el vídeo: un solo estado por toma (regla de la biblia) |
| **No se ve el parche** | Parece que la persona se aprieta la nariz | El parche es traslúcido y el modelo lo hace invisible | Regla crítica de la biblia: describirlo como algo que se ve, **en el prompt de imagen** |

---

## 11. Flujo de producción y checklist antes de generar

El orden no es negociable, y la razón está publicada: *"Every reliable shot in Cinema Studio starts as a still image and gets promoted to a clip, and skipping the still treats your prompt as text-to-video, which is where credits die"*.

1. **Still primero, siempre.** Generada ya en **9:16**. El aspect ratio queda bloqueado por la imagen de entrada y Seedance 2.5 no puede reencuadrar: *"Cannot reframe 16:9 to 9:16 through editing. Must generate in target aspect ratio initially"*.
2. **Still del END** para los cinco planos críticos del punto 6.
3. **Prompt de vídeo de ≤ 90 palabras**, un solo verbo de cámara, contado antes de lanzar.
4. **Pase de prueba a 720p** (Seedance 2.0 Mini o 1.5 Pro). Solo se repite a 1080p la toma confirmada.
5. **Test de 3 s de manos** antes de lanzar una serie entera: las manos delatan el fallo temporal antes que la cara.
6. **Generar 4 s, montar 1,5-3 s.** TikTok tolera cortes cada 1,5-3 s, Reels 2,5-4 s. 15 planos × 2 s de media = 30 s, dentro del rango pedido.
7. **Guardar el prompt validado junto a su still**, con el nombre del archivo de referencia, el nombre de salida, el modelo y la fecha. Se itera sobre una base probada, no desde cero.

### Checklist de diez líneas

```
[ ] La still está en 9:16 y la piel NO parece de plástico
[ ] El prompt de vídeo tiene menos de 90 palabras
[ ] No hay ni una palabra describiendo el parche, la cara o la luz que no cambie
[ ] Hay UN solo cambio principal y un estado final claro
[ ] Hay UNA sola instrucción de cámara, sacada del diccionario
[ ] No aparecen: cinematic, epic, beautiful, perfect, 8k, 24fps, f/1.8, probe lens
[ ] Está el bloque de restricciones positivas
[ ] Termina en "No subtitles."
[ ] generate_audio = false
[ ] Si hay manos: start_image + end_image, y las manos van en la primera frase
```

---

## 12. Lo que no está verificado

- **Precios y créditos:** no hay ningún dato de coste en la investigación. Cualquier cifra que circule sobre cuánto cuesta un clip es **sin verificar**.
- **Que Seedance 1.5 Pro "invente menos" que 2.0** es una deducción razonable (no tiene campo de referencias, luego tiene menos libertad), no una cifra publicada: **sin verificar** como afirmación cuantitativa.
- **El reparto de resolución 4K en el packshot** depende de si de verdad se va a hacer zoom en montaje. Si no, 1080p sobra.
- **Los hallazgos sobre textura de piel y sobre contraluz del parche** están marcados con confianza media en la investigación: las fuentes son buenas pero no son documentación oficial de modelo.
- **Kling 2.x con `negative_prompt`** no está disponible dentro de Higgsfield: allí solo hay Kling 3.0 Turbo, que ya no tiene ese campo. Escribir negativos de estabilidad solo es posible fuera de la plataforma.
- **La nota de cumplimiento de ByteDance** ("Seedance 2.x no admite subir referencias con caras humanas reales") no nos afecta porque los tres avatares son sintéticos. Pero no se puede cambiar eso sobre la marcha subiendo una foto real.
