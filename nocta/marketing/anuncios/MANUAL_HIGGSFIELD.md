# MANUAL DE HIGGSFIELD: cómo se editan los anuncios de verdad, paso a paso

**Versión 1.0 · 12 de septiembre de 2026 · NOCTA (parches de nariz de hidrocoloide).**
Este manual está escrito para la persona que se sienta delante de Higgsfield y genera los 25 anuncios. No genera nada por sí mismo: es el procedimiento que hay que seguir. Los datos vienen de tres sitios y cada afirmación dice de cuál: (1) las instrucciones del flujo oficial `ugc-review-video` v1.1 que el propio Higgsfield sirve por MCP (`get_workflow_instructions` y `get_workflow_bundle_file`, con sus ficheros `references/ugc-board.md`, `ugc-clip.md` y `ugc-character.md`), consultadas en la investigación de esta semana; (2) el catálogo de modelos y precios medidos en nuestra propia cuenta (`models_explore`, `transactions`, `balance`, e historial en `brand/qa/control_calidad_imagenes.md`); (3) la biblia visual de NOCTA (`ads/in/biblia.md`), que son reglas comprobadas generando 22 imágenes reales. El saldo se ha consultado hoy con la API (`balance`, 12/09/2026): **275,93 créditos, plan Plus**. Todo lo que no venga de ahí lleva la marca "sin verificar".

---

## Índice

1. [Resumen: las siete decisiones que cambian hoy](#1-resumen-las-siete-decisiones-que-cambian-hoy)
2. [Qué es cada herramienta de Higgsfield y para qué se usa de verdad](#2-qué-es-cada-herramienta-de-higgsfield-y-para-qué-se-usa-de-verdad)
3. [El flujo canónico completo, paso a paso](#3-el-flujo-canónico-completo-paso-a-paso)
4. [Boards de 8 viñetas contra 15 imágenes sueltas: cuál elegimos y por qué](#4-boards-de-8-viñetas-contra-15-imágenes-sueltas-cuál-elegimos-y-por-qué)
5. [El pase de de-slop](#5-el-pase-de-de-slop)
6. [Consistencia de personaje y de producto](#6-consistencia-de-personaje-y-de-producto)
7. [Los tells: qué delata un anuncio de IA y la frase exacta que lo arregla](#7-los-tells-qué-delata-un-anuncio-de-ia-y-la-frase-exacta-que-lo-arregla)
8. [Qué se hace dentro de Higgsfield y qué se hace fuera](#8-qué-se-hace-dentro-de-higgsfield-y-qué-se-hace-fuera)
9. [Créditos: precios reales, coste de los 25 anuncios y qué hacer con 275,93](#9-créditos-precios-reales-coste-de-los-25-anuncios-y-qué-hacer-con-27593)
10. [Mecánica operativa: lotes, reintentos, moderación](#10-mecánica-operativa-lotes-reintentos-moderación)
11. [Anexo A · Plantillas de prompt para copiar](#anexo-a--plantillas-de-prompt-para-copiar)
12. [Anexo B · Lista de verificación antes de lanzar un clip](#anexo-b--lista-de-verificación-antes-de-lanzar-un-clip)
13. [Anexo C · Contradicciones entre la biblia y el flujo oficial, y cómo se resuelven](#anexo-c--contradicciones-entre-la-biblia-y-el-flujo-oficial-y-cómo-se-resuelven)

---

## 1. Resumen: las siete decisiones que cambian hoy

1. **Se acabaron las 15 imágenes sueltas por anuncio.** Un anuncio de 30 segundos son **2 imágenes de "board" y 2 clips**, no 15 y 15. El board es una hoja horizontal 21:9 con ocho viñetas verticales 9:16 en una sola fila, y un único clip de Seedance la convierte en 15 segundos con ocho cortes duros dentro (flujo `ugc-review-video` v1.1).
2. **Un anuncio de 30 s pasa de ~525 créditos a ~214.** Los 25 anuncios pasan de más de 13.000 créditos a unos 5.350 (precios medidos en nuestra cuenta).
3. **El pase de de-slop con `seedream_v5_pro` es obligatorio** entre el board y el vídeo. Cuesta 3 créditos y es la receta literal contra la piel de plástico.
4. **La consistencia no se describe, se apila.** Mismo `character_media_id` en todo, board anterior como referencia del siguiente, y Angle Lock del producto. Describir a Bea con palabras no sirve.
5. **Los clips se generan mudos** (`generate_audio: false`). La voz en español de Seedance ya se comprobó que no se entiende ("filimentos se vacales", en nuestra propia QA). La locución va en el montaje local.
6. **Montaje, subtítulos y música, fuera de Higgsfield.** Con ffmpeg y Whisper cuestan cero créditos y ya lo tenemos hecho en `maquina/producir.py`.
7. **Con 275,93 créditos no caben 25 anuncios.** Dan para **un** anuncio piloto de 30 s con colchón de reintentos. Hay que decidir recarga o plan superior antes de generar el anuncio número 2.

---

## 2. Qué es cada herramienta de Higgsfield y para qué se usa de verdad

Esta tabla es la traducción operativa del catálogo del MCP (`models_explore`, `presets_show`, `get_workflow_instructions`) y de la ayuda oficial. La tercera columna es la que importa: casi todos los errores caros vienen de usar la herramienta correcta en el sitio equivocado.

| Herramienta / modelo | Para qué se usa de verdad | Cuándo NO usarla |
|---|---|---|
| **Soul 2.0** (`soul_2`) | La **foto base de cada avatar**: una persona limpia, 3:4, calidad 2k, sin nada en las manos. Ese `job_id` es el `character_media_id` que se reutiliza en todo el proyecto. 0,12 cr/imagen. | Para los planos del anuncio. No es un generador de escenas con producto: si le metes el bote o la caja, la hornea en la imagen y rompe la composición posterior (`ugc-character.md`, sección "No Products in the Character Image"). |
| **Soul ID** | Identidad **entrenada** con 20-80 fotos de la misma persona; entrena en minutos y luego se elige en la pestaña Character y como Element dentro de Seedance. Sirve para mantener una cara a lo largo de campañas enteras. | Como palanca principal de consistencia dentro de un anuncio. El flujo oficial de UGC **no la usa**: usa una sola imagen de referencia reutilizada. Y la propia ayuda admite que da "claramente la misma persona", no consistencia píxel a píxel. |
| **GPT Image 2** (`gpt_image_2`) | Generar el **board 21:9 de ocho viñetas**. Calidad `medium` por defecto (2,5 cr); el board 21:9 a 2k salió a 6,5 cr en nuestra cuenta. | En calidad `high` por sistema: son 11 cr y nuestro propio A/B dijo que "la diferencia no es apreciable a tamaño web". Reservar `high` solo para el packshot donde el texto del envase tiene que leerse. |
| **Seedream v5 Pro** (`seedream_v5_pro`) | El **pase de de-slop** sobre el board ya generado: mata la piel de plástico sin tocar el encuadre. 3 cr por pase. | Para crear imágenes nuevas dentro de este flujo, o para reencuadrar. Su trabajo aquí es micro-realismo, no composición. |
| **Seedream v5 Lite** (`seedream_v5_lite`) | Único uso: **reintento del de-slop** cuando el Pro lo bloquea la moderación. Una vez. Si vuelve a fallar, se usa el board crudo y se anota. | Como alternativa barata por defecto: la versión que trae la receta validada es la Pro. |
| **Seedance 2.5** (`seedance_2_5`, `mode: omni_reference`) | El **clip**: convierte un board en 15 s verticales con ocho cortes duros internos, apilando referencias (board + personaje + producto). 6,5 cr/segundo a 720p. | A 1080p en fase de test (casi duplica el coste por segundo). Y con `generate_audio: true` en español, por lo dicho en el punto 5 del resumen. |
| **Cinema Studio** (`cinematic_studio_3_0`, `cinematic_studio_video_v2`) | Cine de verdad: hasta 4K, 15 s, control de género, speedramp, `multi_shots`. Para un hero shot de marca. | Para UGC. El look de cine es justo lo que convierte un vídeo de creadora en un anuncio, y entonces deja de funcionar como UGC. |
| **Marketing Studio** (`marketing_studio_video`) | Ruta rápida "de un clic": plantillas por categoría con `hook_id` (el qué) y `setting_id` (el dónde), solo en los presets UGC, Tutorial, Unboxing, Product Review y UGC Virtual Try On. También acepta `ad_reference_id` para recrear la estructura de un anuncio de referencia. | Cuando el producto tiene una geometría difícil, que es nuestro caso: da menos control sobre el troquel del parche. Y ojo: `hook_id`/`setting_id` y `ad_reference_id` son **mutuamente excluyentes**, y el avatar y el producto **no** se heredan del `ad_reference` (hay que pasarlos en `avatar_ids` y `product_ids`). |
| **Ad Multiplier** (`ad_multiplier`) | Coge un vídeo de 4-30 s y genera versiones independientes sustituyendo personas, producto, ropa, fondo o un texto concreto, conservando movimiento, encuadre, cortes y ritmo. ≈6,4 cr por segundo del vídeo fuente. | **Como entregable sobre anuncios de la competencia.** El vídeo base no es nuestro, y la moderación de Higgsfield ya nos bloqueó tres intentos por nsfw. Solo como storyboard interno. |
| **Genjutsu — motion control** (`hf_mult_motion_control`) | Transfiere el movimiento de un vídeo de referencia a personajes de imágenes de referencia. 26 cr por clip de 3,5 s (medido). | Para planos normales. Solo para los 3-4 gestos de manos imposibles de acertar por prompt: el despegado con estiramiento y la presión en V, usando nuestros clips de `maquina/gestos/` como referencia. |
| **Genjutsu — replace object** (`hf_mult_replace_object`) | Sustituye objetos dentro de un vídeo fuente propio. Acepta vídeos de 3-30 s y hasta 30-40 imágenes de referencia, salida hasta 1080p. | Como atajo para cambiar la caja en clips ya rendidos: sale más caro que regenerar el clip si el board es bueno. |
| **Draw-to-Video** | Dibujas flechas, notas y números sobre la imagen de partida ("rotate", "open hand") y los convierte en movimiento y orden de acciones. | Cuando el prompt escrito ya funciona. Es una muleta para el plano de colocación del parche (flecha puente → punta), no un método general. |
| **Popcorn** | Storyboard multiplano de hasta 8 fotogramas manteniendo personaje, luz y atmósfera. Es el mismo principio que el board 21:9. | Si ya estás usando el board 21:9 con `gpt_image_2`, que es lo que el flujo oficial pide y lo que está calibrado para Seedance. |
| **Speak / Lipsync Studio y `sync_so`** (Sync Lipsync 3) | Lip-sync sobre un vídeo mudo más un WAV. `sync_so` tiene modos `bounce`, `loop`, `cut_off`, `silence`, `remap` para cuando las duraciones no cuadran. | Por defecto en los 25 anuncios. Solo si un anuncio concreto necesita lip-sync real de verdad; en el resto, plano hablado corto y locución encima. |
| **Seed Audio** (`generate_audio`), `create_voice`, `dubbing` | Locución en español. Voz Marisol `75e72cd5-011b-4130-a474-e8b1ab341f04`, ≈0,3 cr por línea. `create_voice` clona una voz; `dubbing` traduce. | Dentro del flujo del clip. El propio workflow dice "never call generate_audio" porque Seedance produce voz nativa; en nuestro caso hacemos lo contrario a propósito, porque la voz nativa en español falló. |
| **Upscale** (`bytedance_video_upscale`, preset "ugc") | Subir de 720p solo los clips ganadores, ya validados por datos. | En fase de test. Y nunca como costumbre: no entra en "unlim" aunque lo tengas. |
| **`remove_background`** | Recortes de packshot para la web y las creatividades estáticas. 1 cr. | Dentro del pipeline de vídeo. |
| **Presets** (`presets_show`) | Plantillas virales completas tipo EARTH ZOOM, ORBIT 360, STICKER PEEL. | Siempre, en nuestro caso. **No son movimientos de cámara**: son efectos enteros, inútiles para un anuncio de parche de nariz. |

Existen más herramientas en el MCP (reframe, outpaint, virality predictor, shorts studio, publicación directa en TikTok). No las hemos probado y su comportamiento es **sin verificar**: no entran en el flujo de los 25 anuncios.

---

## 3. El flujo canónico completo, paso a paso

Este es el flujo que trae escrito el propio Higgsfield en el bundle `ugc-review-video` v1.1, adaptado a NOCTA. Se ejecuta en este orden y no se salta ningún paso.

### Paso 0 · Antes de tocar nada

Se escribe el guion completo en español, con el reparto de planos, **antes** de generar una sola imagen. Se decide duración. La tabla de duración a boards del flujo oficial es:

| Duración del anuncio | Boards / clips |
|---|---|
| 4-15 s | 1 |
| 16-19 s | 2 |
| 20-30 s | 2 (uno de 15 s y el resto) |
| 31-45 s | 3 (15 + 15 + resto) |

Para NOCTA: los anuncios de 30 s son **2 boards**; los de 15 s, **1 board**.

### Paso 1 · Congelar los avatares (una sola vez en todo el proyecto)

Una llamada `generate_image_batch` con `model: 'soul_2'`, `aspect_ratio: '3:4'`, `quality: '2k'`, `count: 1` por avatar. El `job_id` resultante se guarda como `character_media_id` y **no se regenera nunca más**. Ya tenemos `brand/personas/creadora_01_soul.png`, `creadora_02_soul.png` y `creador_03_soul.png`: son exactamente esto, están bien planteadas y se congelan hoy.

Reglas duras de esta imagen (`ugc-character.md`):

- Persona limpia. Sin parche, sin caja, **sin nada en las manos**. Localización sí, objetos en mano no.
- Las cuatro anclas literales que el fichero dice que "prevent plastic/AI look" van siempre:

```
with high model facial features, symmetrical features, well-proportioned figure, natural skin texture
```

- Nada de espejo, aunque la escena sea un baño.
- Prohibidas en este prompt: `centered composition at eye-level`, `straight-on`, `editorial portrait`, `glowing skin`, `flawless skin`, `radiant complexion`, `warm smile at the camera`, y cualquier verbo de pose (`poses`, `striking a pose`).

Cuesta 0,12 cr por imagen. Genera diez candidatas por avatar (1,2 cr), elige una y ciérrala para siempre.

### Paso 2 · Repartir el guion en slots

Cada board tiene **exactamente ocho** viñetas. Ni diez, ni doce, ni dos filas, ni rejilla. El reparto no es libre: cada par de viñetas vecinas tiene que diferir a la vez en **POV**, en **banda de distancia** y en **acción**. Esto es el motor anti-morphing y se explica en el punto 7.

Bandas de distancia: **TIGHT** (primerísimo plano y macro), **MID** (medio y medio corto), **WIDE** (tres cuartos, cintura, cuerpo entero, producto extendido). Cada banda tiene que aparecer al menos dos veces en los ocho slots, y dos vecinos nunca comparten banda.

Así se reparten nuestras 15 tomas de la biblia en 16 slots:

**Board A — gancho, problema, entrada del producto**

| Slot | POV | Banda | Contenido | Toma de la biblia |
|---|---|---|---|---|
| 1 | SELFIE | MEDIUM | Ya se está pellizcando la punta de la nariz | 1 (gancho A) |
| 2 | STATIC | MACRO | Poros y filamentos, luz rasante | 3 y 4 |
| 3 | STATIC | WIDE | El error: aprieta frente al lavabo | 5 |
| 4 | SELFIE | TIGHT | Consecuencia: rojez en la aleta | 6 |
| 5 | STATIC | MEDIUM | Coge la caja NOCTA de la balda | 7 |
| 6 | STATIC | MACRO | El parche fuera del sobre, borde biselado | 8 |
| 7 | STATIC | WIDE | Preparación: se seca la nariz con la toalla | 9 |
| 8 | SELFIE | TIGHT | El parche entre los dedos, a 15 cm del objetivo | 8b |

**Board B — aplicación, noche, prueba, cierre**

| Slot | POV | Banda | Contenido | Toma de la biblia |
|---|---|---|---|---|
| 1 | STATIC | MACRO | Centra el extremo estrecho en el puente | 10 |
| 2 | STATIC | MEDIUM | Presión en V con los dos índices | 10b |
| 3 | SELFIE | TIGHT | Parche puesto, cara a cámara, de noche | 11 |
| 4 | STATIC | WIDE | Dormida, luz de mesilla | 12 |
| 5 | STATIC | MACRO | Parche saturado por la mañana (baño) | 12b |
| 6 | STATIC | WIDE | De pie en el lavabo, pinza el ala | 13a |
| 7 | STATIC | TIGHT | Despega en una lámina continua | 13b |
| 8 | SELFIE | MEDIUM | El parche usado a contraluz junto a la nariz limpia | 14 + 15 |

El packshot de la caja (toma 15 alternativa) no va dentro del board: se genera **una sola vez** como clip corto reutilizable en los 25 anuncios. Es el primer ahorro grande.

Fíjate en que el board B es casi todo STATIC. No es un descuido: colocar el parche y hacer la presión en V requieren dos manos libres, y en POV selfie una mano está ocupada por el móvil. Esas acciones son STATIC obligatoriamente.

### Paso 3 · Generar el board

Modelo `gpt_image_2`, `aspect_ratio: '21:9'`, `resolution: '2k'`, calidad `medium` salvo en packshots con texto. El prompt lleva, en este orden: (a) las declaraciones `@Image1`, `@Image2`, `@Image3` que atan las referencias, (b) el Angle Lock del producto, (c) la descripción de la hoja, (d) las reglas comunes de luz, manos y duplicados, (e) los ocho slots numerados, (f) la cola de negativos. La cabecera completa está en el Anexo A, plantilla 3.

**El orden del array `medias` debe coincidir exactamente con el orden en que declaras `@Image1`, `@Image2`, `@Image3`.** Ese orden es lo único que ata la referencia a la frase (`ugc-board.md`, Step 2).

Los boards de un mismo anuncio se generan **en serie**, nunca en paralelo: el board B necesita el A ya limpio como referencia.

### Paso 4 · Pase de de-slop (obligatorio)

`seedream_v5_pro`, el board crudo como `image_references`, 21:9, 2k, con el prompt fijo de la plantilla 2. 3 créditos. Detalle en el punto 5.

### Paso 5 · QA del board (gratis, y aquí es donde se salva el dinero)

Un board cuesta 6,5 créditos. El clip que sale de ese board cuesta 97,5. **La proporción es 1 a 15.** Por tanto: nunca se lanza un clip sobre un board que no ha pasado la revisión. Se abre el board limpio a tamaño completo y se comprueba, viñeta por viñeta, la lista del Anexo B. Si un slot falla, se regenera el board entero (6,5 + 3 = 9,5 cr) antes de tocar el vídeo.

### Paso 6 · Escribir el prompt del clip

Modelo `seedance_2_5`, `mode: omni_reference`, `aspect_ratio: '9:16'`, `resolution: '720p'`, `duration: 15`, `generate_audio: false`. Referencias: board limpio + avatar + packshot del producto cuando salga la caja.

La estructura del prompt es fija: **Style & Mood**, **Narrative Summary**, **Dynamic Description** con los ocho cortes cronometrados, **Audio**, y la **cola de calidad y negativos**. Entre corte y corte se escribe literalmente:

```
Hard cut to.
```

Siete veces exactas: entre el 1 y el 2, el 2 y el 3, … el 7 y el 8. **Ninguna después del octavo.** Sin esos marcadores, Seedance funde los planos en un movimiento continuo en vez de cortar (`ugc-clip.md`).

Cada corte lleva su ventana de tiempo (1,9 s por corte en un clip de 15 s), su POV, su banda de distancia **escrita en mayúsculas**, la acción única, el rol de cada mano y dos o tres micro-beats.

### Paso 7 · Lanzar los clips

Los clips sí se lanzan en lote, con `generate_video_batch`, una vez escritos **todos** los prompts del anuncio. Máximo doce peticiones por llamada, `params.count = 1`, índices estables.

### Paso 8 · QA de fotograma congelado

Antes de montar, se extraen fotogramas del clip (nuestra hoja de contactos a 2 fps ya lo hace y es mejor que lo que pide el workflow) y se revisan: todos los primeros planos de producto, fotogramas equiespaciados y dos o tres a mitad de palabra. Lista en el Anexo B.

### Paso 9 · Montaje fuera de Higgsfield

Concatenación con cortes duros y sin recodificar, locución en español, subtítulos quemados con tiempos de transcripción palabra a palabra, cierre de marca:

```
ffmpeg -f concat -safe 0 -i clips.txt -c copy output/final.mp4
```

Cero créditos. Ya lo hace `brand/video/edit/montar_anuncio.py` y `maquina/producir.py`.

---

## 4. Boards de 8 viñetas contra 15 imágenes sueltas: cuál elegimos y por qué

El plan que teníamos era: 15 imágenes por anuncio con GPT Image, 15 conversiones imagen a vídeo de 3-5 s, y montaje. El flujo oficial hace otra cosa. Esta es la comparación con los precios medidos en nuestra cuenta, para un anuncio de 30 segundos.

| Concepto | Método de boards | Método de 15 imágenes sueltas |
|---|---|---|
| Imágenes | 2 boards × 6,5 = **13 cr** | 15 × 2,5 = **37,5 cr** |
| De-slop | 2 × 3 = **6 cr** | 15 × 3 = **45 cr** (si se hiciera; en la práctica se saltaba) |
| Vídeo | 2 clips de 15 s a 720p = 2 × 97,5 = **195 cr** | 15 clips de 5 s = 15 × 32,5 = **487,5 cr** |
| **Total por anuncio de 30 s** | **214 cr** | **525 cr sin de-slop / 570 cr con de-slop** |
| **Los 25 anuncios** | **≈5.350 cr** | **≈13.125 cr sin de-slop / ≈14.250 con él** |
| Generaciones que hay que lanzar y revisar | 4 por anuncio, 100 en total | 30 por anuncio, 750 en total |

(La investigación estimaba el método antiguo en ~487 cr/anuncio y ~12.200 en total contando solo vídeo; la diferencia con esta tabla es que aquí se suman también las imágenes.)

**Coste:** el método de boards ahorra unos **7.000-8.800 créditos** en el proyecto. No hay discusión.

**Consistencia:** aquí la diferencia es todavía mayor, y es cualitativa. En el método de 15 imágenes sueltas, cada imagen es una tirada independiente: la cara de Bea deriva un poco en cada una, la luz del baño cambia de temperatura, el parche cambia de troquel, y encima cada conversión a vídeo vuelve a interpretar la escena. Quince oportunidades de que algo se mueva. En el método de boards, los ocho planos de un tramo se generan **en la misma imagen, a la vez**, con la misma iluminación y la misma cara literalmente al lado; y el clip entero sale de una sola pasada de Seedance. El board B, además, lleva el board A como referencia, así que el "antes" y el "después" comparten cara y luz. La consistencia deja de ser un problema de suerte y pasa a ser un problema de composición.

**Riesgos del método de boards, dicho sin adornos:** un fallo en una viñeta obliga a regenerar la hoja entera (9,5 cr, barato); y los ocho planos tienen que estar bien repartidos en POV y distancia o el clip se convierte en un morphing continuo. Ese riesgo se controla con el motor anti-morphing, que es una regla mecánica, no una intuición.

**Recomendación para NOCTA: método de boards, sin excepciones.** Motivos, por orden: cuesta 2,5 veces menos, resuelve de raíz la deriva de cara que ya nos salió en pruebas, reduce el trabajo de revisión de 750 generaciones a 100, y produce cortes duros de verdad, que es exactamente el ritmo que tiene el anuncio de referencia. El método de 15 imágenes sueltas queda para un solo caso: **planos de producto aislados y reutilizables** (el packshot de la caja, el parche a contraluz sobre la ventana), donde no hay persona, no hay continuidad que mantener y el clip se reaprovecha en los 25 anuncios.

---

## 5. El pase de de-slop

**Qué es.** Una segunda pasada sobre el board ya generado, con `seedream_v5_pro`, que **no toca la composición** y **solo cambia el micro-realismo de la piel y los materiales**. El board sale de `gpt_image_2`, que alisa la piel por defecto: caras de cera, poros borrados, brillo de filtro. El de-slop devuelve poro, vello fino, ruido de sensor y luz plana de móvil.

**Por qué es obligatorio.** Lo marca como MANDATORY el propio flujo oficial: ningún board llega al vídeo sin pasar por aquí. Y para NOCTA es más crítico que para nadie, porque nuestro plano estrella es un macro de poros de la nariz. Si ese macro sale con piel alisada, el anuncio entero se lee como render.

**Con qué modelo.** `seedream_v5_pro`, `image_references` = el board crudo, `aspect_ratio: '21:9'`, `resolution: '2k'`. Coste medido: 3 créditos.

**Prompt exacto. Se copia literal, no se reescribe:**

```
KEEP EXACTLY the framing, composition, slot layout, camera distances, poses, subjects and product of this horizontal storyboard sheet and every one of its side-by-side vertical slots — no reframe, no zoom, no crop, no re-layout, no change to the scene, to any person's face / hair / body, or to the product design. CHANGE ONLY micro-realism, applied identically in every slot: true-to-life pore-level skin with natural texture and fine vellus hair, real material detail, even natural daytime light with gentle highlight roll-off and faint true sensor noise, a flat authentic iPhone photo, deep focus. PRESERVE each face's exact shape / width / proportions 1:1 — do NOT squeeze / narrow / slim / stretch any face. AVOID AI-slop: waxy plastic skin, airbrushed poreless skin, beauty-filter smoothing, over-saturation, HDR glow / bloom / halos, oversharpening, teal-orange grade, shallow depth of field, bokeh, cinematic / DSLR look. Keep the NOCTA carton's own printed label exactly as in the reference, no added text, no watermark, no baked slot labels.
```

Tres detalles que no son decorativos:

- La cláusula `PRESERVE each face's exact shape / width / proportions 1:1` está porque **Seedream tiende a adelgazar caras**. Sin esa frase, Bea sale más estrecha después del de-slop que antes, y entonces el board B ya no case con el A.
- `deep focus` y la prohibición de `shallow depth of field, bokeh` están a propósito. Nuestra biblia pide poca profundidad de campo; eso se resuelve en el Anexo C.
- La última frase es la versión NOCTA. El prompt original del flujo dice `Keep the product blank / unbranded`, que borraría nuestro logotipo. **No se copia esa versión.**

**Si la moderación lo bloquea:** un reintento con `seedream_v5_lite`. Si también falla, se usa el board crudo, se anota en el parte del anuncio y se revisa con más lupa el QA de piel.

---

## 6. Consistencia de personaje y de producto

La consistencia no se pide, se construye. Son cuatro mecanismos que funcionan a la vez.

### 6.1 Lo que funciona

**1. El mismo `character_media_id` en todas las generaciones.** La imagen del avatar va como `role: 'image'` en cada board y en cada clip del proyecto, y en el prompt va esta frase literal:

```
@Image2 is the character reference. The same person appears in every slot with identical face, hair, body, and identity. Do not alter facial features, hairstyle, body proportions, or skin tone between slots.
```

**2. Encadenar boards.** Para el board 2 y siguientes, el board anterior **ya limpiado** se añade como **última** referencia, con esta frase:

```
@Image3 is the previous board — preserve its identity, room, light direction, wardrobe and product state exactly.
```

Esto es lo que hace que la nariz "antes" y la nariz "después" pertenezcan a la misma persona en la misma luz.

**3. Angle Lock del producto.** La caja NOCTA y el parche solo enseñan la cara que se ve en la foto de referencia. Frase literal:

```
ANGLE LOCK: the product shows only the visible front-facing side from @Image1 and keeps this same visible angle in every slot it appears in. Do not rotate, spin, flip, or reveal unseen sides.
```

Movimiento de cámara no es rotación de producto. Sin esta frase, el modelo se inventa contraetiquetas, laterales e interiores de la caja que no existen.

**4. Escala en centímetros, relativa a la mano.** Nunca comparando con otros objetos.

```
The NOCTA carton is approximately 9 cm tall, palm-sized, and fits in one hand without enlargement. The patch is a 60 x 45 mm translucent hydrocolloid piece. If the label is small in frame, the camera moves closer rather than scaling the product up.
```

**5. Fotos reales del producto como referencia, siempre.** Esto sale de nuestra biblia y está comprobado generando: describir el troquel del parche con palabras **no basta**, el modelo pinta una mancha amorfa. En toda imagen donde salga el parche van dos o tres de estas referencias ya subidas: `parche_liner`, `parche_puesto`, `parche_puesto_2`, `caja`. Y al principio del prompt:

```
The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape.
```

**6. Referencia de nariz limpia para el "después".** También de la biblia, también comprobado: el avatar tiene la nariz con puntos y el modelo los conserva incluso después de quitar el parche. Se adjunta como **segunda** referencia una imagen ya generada de esa misma nariz limpia:

```
The SECOND reference is her nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that second reference, open EMPTY pores, no dark dots. The pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere.
```

**7. Soul ID, como segunda capa y más adelante.** Con tres avatares y 25 anuncios sí compensa: se generan unas 30 imágenes de cada avatar con `soul_2` a partir de la imagen aprobada (ángulos y expresiones variadas, mismo pelo, misma piel), se entrena un Soul ID por avatar en higgsfield.ai → Soul → Train new character, y se usa para cualquier plano nuevo que caiga fuera de un board. Requisitos de las fotos según la ayuda oficial: 20-80 imágenes, bien iluminadas, varios ángulos y expresiones, sin gafas de sol, sin sombras duras, sin caras cortadas, recientes, al menos una de cuerpo entero, un solo sujeto por foto. Limitaciones que la propia ayuda admite: "claramente la misma persona", no consistencia píxel a píxel; un solo personaje por Soul ID; la identidad entrenada no se puede exportar. **Prioridad: primero boards; Soul ID solo si vemos deriva de cara entre anuncios distintos de la misma persona.**

### 6.2 Lo que no funciona

- **Describir al personaje con texto.** "Bea, 24, pelo castaño claro, lunar bajo el pómulo izquierdo" en el prompt, sin pasar la imagen, da una Bea distinta cada vez. Es la causa número uno de deriva de cara.
- **Regenerar el avatar a mitad de proyecto.** El `character_media_id` se congela el primer día y no se toca. Si alguien regenera "una versión mejor" de Bea en el anuncio 12, los anuncios 1 a 11 y los 13 a 25 dejan de ser la misma persona.
- **Poner el producto en la imagen base del avatar.** El modelo lo hornea y a partir de ahí todas las composiciones fallan.
- **Fiar la consistencia solo a Soul ID.** No es lo que hace el flujo oficial de anuncios UGC, y resuelve otro problema: "necesito 500 fotos nuevas de esta persona", no "necesito 16 planos coherentes dentro de un anuncio".
- **Cambiar ropa, pelo o localización dentro del mismo anuncio.** Regla de la biblia y del flujo: `Outfit identical across all slots`.

---

## 7. Los tells: qué delata un anuncio de IA y la frase exacta que lo arregla

Uno por uno. Cada punto tiene la regla y el texto que se pega.

### 7.1 La ley de las dos manos

Es el fallo número uno. Regla literal del flujo: el personaje tiene exactamente dos manos, y **se cuentan las manos y los roles de mano antes de cerrar cada slot**; la suma de roles simultáneos escritos en un plano nunca pasa de dos.

Cómo se aplica: **cada plano nombra qué hace CADA mano**, incluida la que no actúa, que se "aparca" explícitamente ("sujetando el móvil fuera de cuadro", "apoyada plana en el borde del lavabo", "colgando al costado").

```
The character has exactly two hands. Every slot names what EACH hand is doing; the idle hand is parked explicitly. Never more than two simultaneous hand-roles.
```

Corolario en selfie: una mano está ocupada por el móvil, así que **solo queda una mano libre**. Nunca dos objetos en un plano selfie.

```
In selfie POV slots one hand is occupied by the phone (off-frame or its forearm visible at the edge), so only one hand is available for action; slots requiring two free hands are static camera POV with the phone not in frame.
```

Traducción a nuestros planos: colocar el parche y la presión en V son **siempre STATIC**, nunca selfie. Hablar a cámara sujetando el móvil es SELFIE, y entonces la otra mano sostiene **una** cosa: o el parche usado, o la caja, nunca las dos. Y un producto flotando sin sujetar al lado de manos ocupadas genera el mismo brazo fantasma: o lo sujeta una mano, o está apoyado en una superficie, dicho explícitamente.

### 7.2 Espejos y reflejos: prohibición total

Los reflejos duplican miembros y personas. En un anuncio rodado en un baño es la trampa más fácil de pisar.

```
No mirror, no reflection, no reflective surface showing the character. No bathroom mirror, no window reflection, no phone-screen reflection. No mirror selfie shots even when the framing is selfie POV.
```

El baño se encuadra hacia el lavabo, hacia la ventana, o con la cámara ocupando la posición donde estaría el espejo. Si algún plano lo exige de verdad, solo un fragmento parcial de hombros para arriba que coincida exactamente con el sujeto, y se añade `no extra limbs, no duplicated person` a los negativos.

### 7.3 El móvil nunca se ve

En POV selfie **la cámara es el móvil**. El objeto móvil no aparece jamás: ni en la mano, ni la pantalla, ni por encima del hombro, ni en tercera persona. Solo el antebrazo asomando por el borde del cuadro.

```
No phone visible in any frame. Selfie POV = the camera IS the phone. Only her forearm enters the frame edge.
```

Palabras prohibidas dentro de la descripción de un corte selfie, porque filtran el móvil como objeto al render: `mirror selfie`, `looking at her phone`, `phone in her hand`, `holding phone up to face`, `over-the-shoulder`, `phone screen visible`, `reflection`, `mirror`.

### 7.4 Un solo producto héroe

El parche se clona con una facilidad especial: uno en la nariz y otro en la mano, en el mismo plano. En cada slot, literal:

```
Exactly one NOCTA carton and exactly one patch in frame wherever they appear — never duplicated, never a look-alike clone.
```

Y encaja con la regla de los cinco estados de la biblia: cada imagen está en un estado y solo uno. Mezclar el estado 4 (a medio quitar) con el 5 (parche en la mano, nariz limpia) es la imagen que hay que repetir y que cuesta dinero. Se escribe el número de estado al principio de cada descripción de slot.

### 7.5 Una sola acción por corte

```
Each Cut depicts ONE physical product interaction at most.
```

Una presión, un despegado, un gesto. Si la acción necesita más pasos, se parte entre cortes. Frases que Seedance interpreta literalmente como **bucle de movimiento** y están prohibidas: `presses repeatedly`, `presses again`, `taps twice`, `back and forth`, `opens and closes`, `applies multiple coats`, `swipes again`, `sprays again`.

Tres reglas que vienen con esto:

- **Causa antes que efecto.** Presionar, luego el resultado. Nunca al revés.
- **Un cambio de estado por corte.** Máximo uno.
- **Lo retirado deja de existir.** El liner del parche, una vez despegado, no se vuelve a nombrar nunca. Nada de "deja el liner en el lavabo".
- **El board es solo referencia de composición.** Aunque el board muestre la caja cerrada, el prompt del clip tiene que describir la apertura como movimiento propio, porque Seedance no la inventa.

Aplicado al parche: un corte es `she lifts the patch off its liner by one wing`; otro es `she centres the narrow end on the bridge of her nose`; otro es `both index fingers run down the sides pressing the wings against the nostril wings`. Y la retirada, un solo corte, descrita como una sola pieza continua (regla 5 de nuestra biblia, comprobada):

```
She is peeling the patch off in ONE CONTINUOUS SHEET: the right portion is still stuck flat and translucent on the right side of the nose, and WITHOUT ANY BREAK it lifts along one single boundary down the ridge and hangs from her thumb and index finger at the left, curled, limp, its underside turned to the camera.
```

Escribir "la mitad izquierda despegada y la derecha pegada" genera **dos parches separados**. Está comprobado.

### 7.6 El morphing entre planos

Seedance solo convierte la frontera entre dos slots en un corte nítido cuando los dos slots están visualmente **muy lejos**. Dos vecinos parecidos se funden en un morphing continuo, y ahí es donde la nariz se deforma.

Reglas mecánicas:

- El POV cambia siempre que se pueda (SELFIE ↔ STATIC).
- La banda de distancia **siempre** cambia entre vecinos: TIGHT, MID, WIDE, rotando, y cada banda al menos dos veces en los ocho.
- La acción física es distinta en cada slot; nunca la misma configuración de mano y producto dos veces seguidas.
- El cuarto eje es el más potente: **cambiar de fondo o de micro-localización es el forzador de corte más fuerte que existe**. Por eso el salto dormitorio → baño de mañana entre los slots 4 y 5 del board B es tan limpio.

Y cada descripción de slot nombra la distancia **en mayúsculas**: `TIGHT CLOSE-UP`, `MACRO`, `MEDIUM`, `WAIST-UP`, `WIDE`.

Regla de oro para NOCTA: **nunca dos planos de nariz consecutivos a la misma distancia.** Tenemos tres planos que son todos primer plano de nariz; si van seguidos, morphean.

### 7.7 La cámara flotante

En un plano STATIC están **prohibidas** estas palabras, porque filtran movimiento al render: `handheld`, `shake`, `drift`, `wobble`, `sway`, `slight movement`, `micro-shake`, `intimate handheld`, `natural movement`, `subtle movement`.

Lenguaje obligatorio en su lugar:

```
Camera is absolutely frozen and locked off — zero movement of any kind. No shake. No drift. No breathing wobble. No organic sway. No micro-movement. The frame is completely fixed and immovable. Only the subject and the product move within the locked frame.
```

La única excepción permitida en un plano LOCKED es **un** push-in lento y deliberado, y entonces la cola de ese corte dice:

```
locked framing with one deliberate slow push-in, otherwise static
```

Máximo un movimiento de cámara por corte, y nunca en todos los cortes: "un movimiento en cada beat se lee como mecánico".

Para el arranque "grabado con un móvil de verdad", el corte 1 en selfie:

```
candid HANDHELD iPhone ZOOM-IN toward the face — the frame pushes in fast and a little unsteady, a tiny overshoot-and-correct, like a real hand pinch-zooming, never a smooth professional dolly
```

Cola de calidad según la cadencia del clip:

```
handheld micro-shake during selfie cuts, locked-off frozen frame during static-camera cuts
```

Nunca `handheld` y `macro` en el mismo plano. Es la combinación que produce esa deriva flotante que grita IA.

### 7.8 Piel de plástico y poros en cuadrícula

La piel de plástico se resuelve con el pase de de-slop (punto 5). El otro fallo es nuestro y lo descubrimos generando: **el modelo reparte los poros como una rejilla regular** y la macro parece 3D. En toda macro de piel va esta frase:

```
pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced
```

y se cierra con `unretouched documentary realism, not a 3D render`.

### 7.9 El look de cine

Lo que convierte un UGC en anuncio. Prohibido por defecto: profundidad de campo corta, bokeh, destellos de lente, grado de color cinematográfico, luz de estudio, retoque brillante.

Y la prohibición más tajante del flujo, que mucha gente se salta: **nada de luz cálida**.

```
HARD BAN: golden hour, warm sunset, orange/amber/honey cast, late afternoon warm wash, magic hour — even outdoors.
```

Lo que sí se escribe:

```
soft cool neutral daylight from the left window, one motivated source, consistent white balance, deep focus, background stays sharp, 23mm iPhone front-camera look with slight edge distortion, faint digital sensor noise in the shadows, pore-level skin with vellus hair and asymmetric moles, no smoothing, no glow, no beauty filter, imperfect framing
```

Ruido **digital**, nunca grano de película. Y la biblia añade una regla propia para los planos de noche: "de noche" no significa nada, hay que describir las consecuencias de la luz.

```
IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are bright and the eye sockets are dark, and the window behind is pure black with the tiles reflected in it. No daylight, no soft window light, no blue sky.
```

(Ojo: esa última frase menciona reflejo en la ventana. Ver Anexo C, punto 3.)

### 7.10 Texto horneado y galimatías

El texto **nunca** se genera. Ni rótulos, ni subtítulos, ni números, ni insignias. La única excepción es la etiqueta real de nuestra propia caja.

```
No on-screen text, no subtitles, no captions, no badges, no numbers, no watermarks. No legible text or numbers on any prop except the NOCTA carton's own printed label.
```

Y los props del baño con texto (botes, tubos, tickets, pantallas) renderizan caracteres aleatorios o marcas reales. Se describen así:

```
other bathroom bottles are turned slightly away and too small to read
```

Si una prenda lleva letras, tienen que ser **grandes** y ficticias: un logotipo pequeño en el pecho renderiza como galimatías; las letras grandes salen limpias.

### 7.11 La escala del producto

Si la etiqueta no se lee, **se acerca la cámara, nunca se agranda el producto**. La escala se da en centímetros y relativa a la mano, nunca comparándola con otro objeto (punto 6.1, mecanismo 4).

### 7.12 El parche invisible

Regla crítica de nuestra biblia, comprobada: el parche es traslúcido, así que si solo se dice "lleva el parche puesto", el modelo lo hace invisible y la imagen parece que la persona se está apretando la nariz. En toda imagen con el parche puesto:

```
a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed against the skin
```

Y si ya ha absorbido grasa:

```
the patch now opaque white in blotches with small pale-yellow dots where the pores were, still translucent at the edges
```

Cuando el parche es el sujeto del plano, se añade siempre:

```
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance.
```

### 7.13 La lista negra de palabras del guion

Prohibidas sin excepción, en inglés: `I'm obsessed`, `literally obsessed`, `obsessed` como elogio, `you have to try this`, `you NEED this`, `it's amazing`, `it's incredible`, `so good`, `mind-blowing`, `unreal`, `trust me on this`, `game changer`, `total game changer`, `10/10`, `100%`, `1000%`, `literally` como muletilla, `holy grail`, `changed my life`, `hits different`, `and honestly?`, la jerga corporativa (`elevate`, `seamless`, `effortless`, `revolutionary`) y la construcción `This is X, not Y`.

**Prohibición posicional de la primera palabra** (valen a media frase, no como arranque): `OK/Okay`, `Alright`, `So`, `Yeah so`, `Um`, `Well`, `Like`, `Wait`, `Wait what`, `Hold on`, `OMG`, `Hey guys`, `Guys`, `So basically`, `Story time`, `Stop scrolling`, `Let me tell you about`.

**Equivalentes en español que hay que matar en nuestros guiones:** "estoy obsesionada", "tenéis que probarlo", "es una pasada", "es brutal", "un antes y un después", "os lo juro", "10 sobre 10", "literalmente". Y los arranques: "Vale, pues…", "Bueno…", "A ver…", "Chicos…", "Parad de scrollear", "Os cuento".

En su lugar, lenguaje de demostradora: mecánica visible y sensación inmediata. "El parche se estira como un chicle al despegarlo." "Por la mañana la cara interna sale blanca por zonas."

**Ley de la verdad:** sin una lista aprobada de claims, está prohibido añadir números, tiempos, comparaciones, resultados, recuentos, valoraciones o medidas. Esto además nos protege con la normativa cosmética española: no se prometen resultados, se describe lo que se ve.

**Regla de continuidad para el board 2 en adelante:** el audio **no** empieza con saludo ni reintroduce el producto. **Arranca a media frase**, para que el anuncio se lea como una sola toma con cortes y no como dos grabaciones pegadas.

### 7.14 El anuncio que empieza muerto

Dos leyes del flujo que son las que separan un anuncio que funciona de uno que parece IA.

**La ley de los 0,1 segundos.** El corte 1 abre **ya a medio movimiento**: una mano que ya se mueve, una cabeza a mitad de giro, un producto a mitad de levantarse. Nunca una pose asentada, nunca alguien esperando a empezar a hablar. La primera cláusula de la descripción del corte 1 tiene que ser movimiento. Y la primera palabra cae entre 0,0 y 0,4 s del primer fotograma, sin respiración previa.

**El micro-beat sin guardia.** Al menos uno por clip: una mirada que se va y vuelve, un tropiezo a media idea, una autocorrección rápida, una risa que se asienta. Las interpretaciones perfectas de principio a fin se leen como IA. Añadir además un momento tonto por clip (una mueca, una ceja levantada), natural y nunca teatral, y al menos un **beat de boca cerrada** (labios juntos, sin voz), porque el lip-sync es la zona más débil. Máximo uno o dos picos emocionales por clip, motivados por el producto, y cada pico acompañado de un **evento corporal**, no solo facial.

Para NOCTA: el gancho abre con Bea ya pellizcándose la punta de la nariz. El pico único va en la revelación del parche usado a contraluz, con mandíbula que cae y se relaja en sonrisa más retroceso de hombros, no un grito. El beat de boca cerrada va en el plano de dormir, que ya es mudo por naturaleza.

### 7.15 La voz

Seedance 2.5 genera voz nativa con `mode: omni_reference` y `generate_audio: true`, y el flujo oficial dice que no se llame nunca a `generate_audio` por separado. **En nuestro caso hacemos lo contrario, y con motivo:** en nuestra propia QA está documentado que la voz que Seedance genera en español no se entiende ("filimentos se vacales") y hubo que sustituirla por locución TTS.

Decisión para los 25 anuncios: clips con `generate_audio: false`, y locución en español con Seed Audio (voz Marisol `75e72cd5-011b-4130-a474-e8b1ab341f04`, ≈0,3 cr por línea) montada en local. Ya está validada: la transcripción automática del `final_ugc_nariz_v2_es.mp4` devuelve el guion exacto. Si algún anuncio necesita lip-sync real, el camino es pasar el clip mudo más el WAV por `sync_so`, no fiar la voz a Seedance.

---

## 8. Qué se hace dentro de Higgsfield y qué se hace fuera

La frontera es sencilla: **Higgsfield genera clips; todo lo demás se hace en el editor.** Lo dice el flujo oficial (que monta con `ffmpeg -c copy`) y lo dicen los que producen en serie.

| Tarea | Dónde | Por qué |
|---|---|---|
| Imagen base del avatar | Dentro (`soul_2`) | Es generación. 0,12 cr. |
| Board de 8 viñetas | Dentro (`gpt_image_2`) | Es generación. |
| De-slop | Dentro (`seedream_v5_pro`) | Es generación. |
| Clip de 15 s | Dentro (`seedance_2_5`) | Es generación. Es el 90 % del gasto. |
| Corte y concatenación | **Fuera** (ffmpeg) | Cortes duros con copia de streams, sin recodificar. 0 créditos. |
| Locución en español | Fuera en el montaje (audio generado con Seed Audio, ≈0,3 cr/línea) | La voz nativa en español no se entiende. |
| Subtítulos | **Fuera** (Whisper + quemado) | Los tiempos tienen que salir de una transcripción **palabra a palabra** del audio final, nunca de beats planificados. Y el texto jamás se hornea en la generación. |
| Música | **Fuera** | Por defecto, sin música. Si se pone, una sola línea, por debajo de la voz y **sin letra**: la letra pelea con el lip-sync. |
| Grado de color | **Fuera** | Y muy poco: cualquier grado visible rompe el look UGC. |
| Cierre de marca | **Fuera** | Es una tarjeta estática. |
| Upscale | Dentro, y solo de ganadores | No entra en "unlim". |

Detalle que cuesta dinero si se ignora: **lo que no es una de las tres herramientas `generate_*` no consume "unlim"**. Ensamblado, upscales, transcripción y subtítulos se facturan aparte aunque tengas el plan con generaciones ilimitadas. Todo eso lo hacemos en local a coste cero con `brand/video/edit/montar_anuncio.py` y `maquina/producir.py`. Con el saldo que tenemos, cada operación que se pueda hacer en local y se haga en la nube es dinero tirado.

---

## 9. Créditos: precios reales, coste de los 25 anuncios y qué hacer con 275,93

### 9.1 Precios medidos en nuestra cuenta

No son precios de nota de prensa: salen del historial de `transactions` y de `brand/qa/control_calidad_imagenes.md`.

| Operación | Coste |
|---|---|
| Soul V2, 1 imagen | 0,12 cr |
| Nano Banana Pro, 1 imagen | ≈1,9 cr |
| GPT Image 2, calidad `medium` | 2,5 cr |
| GPT Image 2, calidad `high` | 11 cr |
| GPT Image 2, board 21:9 a 2k | 6,5 cr |
| Seedream 5 Pro, 1 pase | 3 cr |
| `remove_background` | 1 cr |
| Seedance 2.5 a 720p | 6,5 cr por segundo |
| Seedance 2.5 a 480p | ≈2,5 cr por segundo (medido a 4 s = 10 cr; la extrapolación a 15 s es **sin verificar**) |
| Ad Multiplier | ≈6,4 cr por segundo del vídeo fuente |
| Genjutsu motion control, clip de 3,5 s | 26 cr |
| Seed Audio, 1 línea de locución | ≈0,3 cr |
| Montaje, subtítulos, cierre (local) | 0 cr |

Seedance a 720p en clips completos: 4 s = 26 cr; 5 s = 32,5; 6 s = 40; **15 s = 97,5**.

Plan: Plus son 1.200 créditos al mes (≈47-59 $ según las fuentes de la investigación); Ultra son 3.000. **Los créditos de suscripción caducan al final de cada ciclo de facturación: no se acumulan.** Los packs de recarga tienen una ventana de 90 días. Las dos quejas recurrentes de la comunidad son exactamente esas: la caducidad y los reembolsos de generaciones fallidas.

### 9.2 Los 25 anuncios, con cada método

| Escenario | Por anuncio | 25 anuncios |
|---|---|---|
| Boards, anuncio de 30 s (2 boards + 2 de-slop + 2 clips de 15 s a 720p) | 214 cr | **5.350 cr** |
| Boards, anuncio de 15 s (1 board + 1 de-slop + 1 clip de 15 s) | 107 cr | **2.675 cr** |
| Boards con clips compartidos reutilizados (packshot, gancho, nariz limpia) | ≈130 cr | **≈3.250 cr** |
| Método antiguo, 15 imágenes + 15 clips de 5 s | ≈525 cr | **≈13.125 cr** |
| Borrador entero a 480p para validar ritmo (30 s) | ≈94 cr | ≈2.350 cr |

Hay que sumar un **10-15 % de generaciones perdidas** por moderación y fallos. Con el método de boards y anuncios de 30 s: **presupuesto realista ≈6.150 créditos** para los 25.

### 9.3 Qué se puede hacer hoy con 275,93 créditos

Saldo consultado con la API hoy: **275,93 créditos, plan Plus**.

**Lo que SÍ cabe (elige una):**

- **Opción A, la recomendada.** Un anuncio piloto completo de 30 s con el método de boards: 214 cr. Quedan **61,93** de colchón, que dan para seis regeneraciones de board con su de-slop (9,5 cr cada una). Es exactamente lo que hace falta para aprender el flujo sin quemar nada.
- **Opción B.** Dos anuncios de 15 s (107 + 107 = 214 cr), mismo colchón. Sirve si lo que se quiere es un test A/B de gancho rápido.
- **Opción C, la más barata para aprender.** Rodar el piloto entero a 480p (≈94 cr) solo para validar composición, ritmo de cortes y manos; después relanzar a 720p solo el tramo que valga (97,5 cr reutilizando el board ya limpio). Total ≈192 cr, quedan ≈84. La extrapolación del precio de 480p a 15 s es **sin verificar**: haz un clip de prueba de 4 s (10 cr) y confirma la tarifa antes de lanzar el de 15 s.

**Lo que NO cabe:**

- Un solo anuncio con el método antiguo de 15 clips sueltos (≈525 cr). Ni uno.
- Los 25 anuncios, en ningún escenario. Faltan entre 2.400 y 5.900 créditos.
- Nada a 1080p. Un clip de 15 s a 1080p se come casi todo el saldo. Ver nota abajo.

**Nota sobre 1080p:** la investigación dice que 1080p "casi duplica el coste por segundo" respecto a 720p, pero no tenemos el precio medido en nuestra cuenta. Trátalo como **sin verificar** y no lo uses hasta comprobarlo con un clip corto.

**Aviso de cifras que no cuadran.** El encargo de este manual dice 287,93 créditos, la investigación de la semana decía 151,43 y la API devuelve hoy 275,93. He usado la API. La diferencia no cambia ninguna conclusión: con cualquiera de las tres cifras da para un anuncio y no da para dos.

### 9.4 Qué hacer con el saldo, en orden

1. **Hoy:** congelar los tres avatares si no están congelados (1,2 cr por diez candidatas de cada uno, 3,6 cr en total). Es gratis a efectos prácticos.
2. **Esta semana:** producir el anuncio piloto nº 1 (Bea, 30 s, Opción A). 214 cr.
3. **Antes de generar el anuncio nº 2:** medirlo en `/admin` con `utm_content`. Es nuestra propia regla de oro y con este saldo es además una obligación aritmética.
4. **Decisión de presupuesto, antes de la tanda:** los 25 anuncios necesitan ≈6.150 créditos. Con Plus (1.200/mes que **caducan**) son cinco ciclos; con Ultra (3.000/mes) son poco más de dos. Como los créditos caducan, la producción hay que **concentrarla dentro del ciclo**: no sirve ahorrar mes a mes. Si se va a por packs de recarga, recuerda la ventana de 90 días.
5. **Regla permanente:** todo se genera a 720p, y solo los clips que ganen en datos se suben con `bytedance_video_upscale` preset "ugc".

---

## 10. Mecánica operativa: lotes, reintentos, moderación

### 10.1 Lotes

- Se usan `generate_image_batch` y `generate_video_batch` con entradas `{index, params}` y `params.count = 1`.
- **Máximo doce peticiones por llamada.**
- Los índices se mantienen estables entre reintentos. Si el índice 5 falla y se relanza, sigue siendo el índice 5, y el nuevo `job_id` sustituye al viejo en esa posición.
- **Los boards de un anuncio van en serie** (el board B necesita el A). **Los clips van en lote**, una vez escritos todos los prompts.

### 10.2 Espera

- `jobs_wait` en grupos de doce con `timeout_seconds: 15`.
- Si devuelve `all_terminal: false`, se espera los `poll_after_seconds` que indique y se sondean **solo** los jobs activos o los fallidos recuperables. Los índices ya completados se congelan y no se vuelven a preguntar.
- **Nunca** se pasa a `jobs_wait` una entrada `submission_failed` que no tiene `job_id`.

### 10.3 Reintentos

- Se reintentan **solo los índices fallidos o rechazados**, jamás la etapa entera. Relanzar los ocho boards porque falló uno es la forma más rápida de quemar el saldo.
- De-slop bloqueado: un reintento con `seedream_v5_lite`; si vuelve a fallar, board crudo y se anota.
- Fallo de puesta en escena en un clip (mano de más, parche duplicado): se corrige el prompt y se relanza **solo ese clip**.
- Artefacto de labios: se cortan esas palabras en el montaje, no se relanza.
- Texto horneado: un relanzamiento; si vuelve a salir, se tapa en post.

### 10.4 Moderación

Higgsfield ya nos bloqueó por `nsfw` tres intentos de Ad Multiplier y un clip con referencia de gesto, con los créditos reembolsados. Es ruido esperable. Dos consecuencias prácticas: **presupuestar un 10-15 % de generaciones perdidas**, y no usar vídeos de la competencia como base de nada que vaya a publicarse.

### 10.5 QA de fotograma congelado, antes de montar

Se revisan fotogramas equiespaciados, **todos** los primeros planos de producto y dos o tres fotogramas a mitad de palabra. Nuestra hoja de contactos a 2 fps ya lo hace. Se comprueba:

- Exactamente un producto héroe, sin clones.
- Máximo dos manos por persona, contando espejos y bordes de cuadro.
- Los rasgos que no estaban siguen sin estar (no ha aparecido un pendiente nuevo, un anillo, un tatuaje).
- Las etiquetas no son galimatías ni una marca real ajena.
- La escala del producto es coherente con la mano.
- No hay doble borde de labios, ni deriva de cara, ni texto horneado.
- **Añadido NOCTA:** un solo parche en cuadro, y el estado del parche (1 a 5) coincide con el que pedía el guion.

### 10.6 Cómo no quemar créditos: las siete reglas

1. Escribe **todos** los prompts de board y de clip del anuncio antes de lanzar nada.
2. Nunca lances un clip (97,5 cr) sobre un board que no ha pasado el QA (9,5 cr regenerarlo). La proporción es 1 a 15.
3. Todo a 720p. Upscale solo de ganadores.
4. `gpt_image_2` en `medium` salvo el packshot con texto de envase.
5. `generate_audio: false` siempre.
6. Montaje, subtítulos y cierre, en local.
7. Reintenta índices, no etapas.

---

## Anexo A · Plantillas de prompt para copiar

### A.1 Imagen base del avatar (`soul_2`, 3:4, 2k, sin producto en las manos)

```
A Spanish woman in her mid-20s with high model facial features, symmetrical features, well-proportioned figure and natural skin texture — visible pores, fine vellus hair, a few asymmetric freckles across the nose and cheeks, no makeup. Straight light-brown hair in a low sleek ponytail with a centre parting, small gold stud earrings, short natural nude nails, cream ribbed long-sleeve top. Mid-action expression — in the middle of saying something, not posing, eyes glancing slightly off-lens. Body in a calm neutral pose, relaxed, weight slightly on one hip. Standing in a small Spanish flat bathroom: white square tiles, a narrow sink with a chrome tap, a folded terracotta towel, a window out of frame on the left. Color palette dominated by cool whites and warm off-white tile with one soft terracotta accent. Soft cool neutral daylight from the left window, no warm cast, no golden hour, one motivated source, consistent white balance. Subject in clear focus with the background naturally falling out as in any phone photo. Self-portrait selfie shot on iPhone front-facing camera held by the subject at arm's length — head and shoulders fill the frame, casual handheld framing, slight natural tilt, slightly off-center, slightly imperfect, not posed. Phone-sensor grain and realistic skin texture preserved, no retouch, no smooth-skin filter. No fisheye lens, no ultra-wide distortion. Authentic UGC creator phone selfie, NOT editorial portrait, NOT fashion magazine.
```

Para Bea, Marisol y Álex se cambian los rasgos de la biblia (pinza negra mate y lunar bajo el pómulo izquierdo; melena castaña oscura con canas en la sien y aros de plata; pelo corto oscuro, barba de tres días y cicatriz en la ceja derecha). No se menciona espejo aunque la escena sea un baño, y no se pone nada en las manos.

### A.2 De-slop (`seedream_v5_pro`, 21:9, 2k)

El prompt completo está en el punto 5 de este manual. Se copia literal, con la última frase en versión NOCTA.

### A.3 Cabecera del board 21:9 (`gpt_image_2`, 21:9, 2k)

`medias` en este orden: packshot del producto, avatar, [board anterior].

```
@Image1 is the product reference: the NOCTA cream matte folding carton with a lowercase navy 'nocta' wordmark and a small navy crescent moon. ANGLE LOCK: the product shows only the visible front-facing side from @Image1 and keeps this same visible angle in every slot it appears in. Do not rotate, spin, flip, or reveal unseen sides. The carton is approximately 9 cm tall and fits in one hand without enlargement; if the label is small in frame, the camera moves closer rather than scaling the product up. @Image2 is the character reference. The same person appears in every slot with identical face, hair, body, and identity. Do not alter facial features, hairstyle, body proportions, or skin tone between slots. @Image3 is the previous board — preserve its identity, room, light direction, wardrobe and product state exactly.

A single ultra-wide horizontal storyboard sheet composed of exactly EIGHT equal-size 9:16 vertical slots arranged in ONE HORIZONTAL ROW, separated by thin white gutters on a clean white background, total sheet aspect 21:9. Do NOT make two rows and do NOT make a grid — exactly eight panels in one row, never ten, never twelve. All eight slots are active photorealistic UGC iPhone-style stills that tell one continuous 15-second clip as eight sequential beats. Each adjacent pair of slots is a DIFFERENT camera setup — a different POV (selfie vs static), a different distance band (tight/macro vs medium vs wide), and a different action — so every beat boundary reads as a crisp hard cut, never a morph. Setting and lighting in all eight slots: the same small Spanish flat bathroom, soft cool neutral daylight from the left window, no warm cast. Outfit identical across all slots. Exactly one NOCTA carton and exactly one patch in frame wherever they appear — never duplicated, never a look-alike clone. The character has exactly two hands; in selfie POV slots one hand is occupied by the phone (off-frame or its forearm visible at the edge) so only one hand is available for action; slots requiring two free hands are static camera POV with the phone not in frame; every slot names what EACH hand is doing, the idle hand parked explicitly. No mirror or reflection anywhere in the bathroom.
```

### A.4 Bloque de producto NOCTA (se inyecta en todos los prompts donde salga el parche)

```
The NOCTA nose patch is a single translucent, milky, satin-matte hydrocolloid piece, approximately 60 x 45 mm, shaped like a butterfly: a narrow section on the middle of the nose bridge, a wide centre covering the whole tip, two rounded wings wrapping around the nostril wings, and a small notch under the tip. It lies flat following the curve of the nose, no wrinkles, no lifted edges, the skin and pores visible through it. When peeled it stretches like an elastic gel into a long thin strand, never tears, never reddens the skin. Used, its inner side shows a thin frosted film of opaque white cloudy areas and tiny pale plugs — a thin frosted film, NOT a blob of cream. Never a small dot on the tip, never a straight strip, never opaque white when freshly applied.
```

### A.5 Los ocho slots del board A (ejemplo completo, Bea, baño de día)

```
Slot 1 — exact 9:16 vertical photorealistic UGC iPhone still, SELFIE POV, MEDIUM CLOSE-UP: she is already mid-motion, pinching the tip of her own nose with the thumb and index finger of her right hand while her left hand holds the phone off-frame, brows drawn together in genuine annoyance, head turning slightly toward the window light. No product in frame.
Slot 2 — exact 9:16 vertical still, STATIC POV, MACRO: extreme close-up of the side of her nose filling the frame, visible sebaceous filaments in the pores, fine vellus hair, real skin texture, soft cool window light raking across from the left; no hands in frame. Pores scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid.
Slot 3 — exact 9:16 vertical still, STATIC POV, MEDIUM-WIDE: she stands at the sink squeezing the side of her nose with both index fingers, shoulders hunched toward the mirrorless wall, a small wince. No product in frame.
Slot 4 — exact 9:16 vertical still, SELFIE POV, TIGHT CLOSE-UP: the nostril wing is now red and irritated where she squeezed, she tilts her head to show it, her left hand holds the phone off-frame, her right hand hangs out of frame.
Slot 5 — exact 9:16 vertical still, STATIC POV, MEDIUM: her right hand lifts the cream NOCTA carton from the shelf at chest height, her left hand rests flat on the sink edge, a small curious eyebrow raise. Exactly one carton in frame, front-facing angle per @Image1.
Slot 6 — exact 9:16 vertical still, STATIC POV, MACRO: her left hand steadies a white paper liner card flat on the sink, her right hand lifts one translucent butterfly-shaped patch off it by a wing with thumb and index finger; it releases with a small elastic tug and hangs flat, the bevelled edge catching a thin specular highlight. The carton is out of frame.
Slot 7 — exact 9:16 vertical still, STATIC POV, WAIST-UP WIDE: she presses a folded terracotta towel against her nose with her right hand to dry it, her left hand rests on the sink edge, eyes down.
Slot 8 — exact 9:16 vertical still, SELFIE POV, TIGHT: she holds the patch up between the thumb and index finger of her right hand about fifteen centimetres from the lens, inner side toward camera, her left hand holding the phone off-frame, head tilted with narrowed appraising eyes. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides.
```

### A.6 Prompt del clip (`seedance_2_5`, omni_reference, 9:16, 720p, 15 s, sin audio)

```
Style & Mood: UGC iPhone aesthetic, soft cool neutral daylight from a left window in a small Spanish bathroom, MIXED: starts SELFIE handheld, hard-cuts to STATIC locked-off, hard-cuts back to SELFIE handheld — POV alternates per cut across the eight beats, social media vertical format.

Narrative Summary: a young Spanish creator goes from noticing the clogged pores on her nose to having the NOCTA hydrocolloid patch correctly placed, in eight hard-cut beats, performed by a natural, engaged creator — genuine reactions, lively but human, never staged screaming energy.

Dynamic Description:
Cut 1 (0-1.9s) — MEDIUM CLOSE-UP, SELFIE: her right thumb and index are already pinching the tip of her nose as the frame opens, a candid handheld iPhone zoom-in toward her face with a tiny overshoot-and-correct; her left hand holds the phone off-frame; brows knit, a short exhale through the nose, her head turns three degrees into the window light. Hard cut to.
Cut 2 (1.9-3.8s) — MACRO, STATIC: locked framing with one deliberate slow push-in, otherwise static. Extreme close-up of the side of her nose; the sebaceous filaments catch the raking light as the skin shifts minutely with her breathing. Hard cut to.
[Cuts 3 a 8 con el mismo patrón: ventana de tiempo, banda de distancia en mayúsculas, POV, una sola acción, el rol de cada mano, dos o tres micro-beats. "Hard cut to." al final de todos menos del octavo.]

Audio: silent, iPhone room tone only, no speech, no music.

Facial features clear and undistorted, consistent clothing throughout. Shot on iPhone, natural lighting, social media aesthetic, handheld micro-shake during selfie cuts, locked-off frozen frame during static-camera cuts.
```

### A.7 Cola de negativos obligatoria (se pega al final de TODOS los prompts de NOCTA)

```
No on-screen text, no subtitles, no captions, no badges, no numbers, no watermarks. No legible text or numbers on any prop except the NOCTA carton's own printed label — other bathroom bottles are turned away and too small to read. No real brand logos. No mirror, no reflection, no reflective surface showing the character. No phone object visible in any frame. No third arm, no extra hands, no duplicated limbs, no deformed hands. Exactly one NOCTA carton and exactly one patch in frame wherever they appear. The patch is never a small dot on the tip, never a straight strip, never opaque white when freshly applied, and never tears or reddens the skin when peeled. No bokeh, no shallow depth of field, no lens flare, no cinematic color grade, no film grain, no studio lighting, no beauty filter, no waxy poreless skin, no golden hour, no warm amber cast, no fisheye, no ultra-wide distortion, no slow motion.
```

---

## Anexo B · Lista de verificación antes de lanzar un clip

Sobre el board ya limpio, viñeta por viñeta. Si algo falla, se regenera el board (9,5 cr) y **no** se lanza el clip (97,5 cr).

1. ¿Hay exactamente ocho viñetas en **una** fila?
2. ¿Cada persona tiene exactamente dos manos, contando bordes de cuadro?
3. ¿Cada viñeta nombra el rol de las dos manos, incluida la parada?
4. ¿Las viñetas selfie tienen una sola mano libre?
5. ¿Las acciones a dos manos (colocar, presión en V, despegar) son STATIC?
6. ¿Hay algún espejo, cristal o superficie reflectante con la persona dentro?
7. ¿Se ve algún móvil como objeto?
8. ¿Hay exactamente un parche y exactamente una caja donde aparecen?
9. ¿El estado del parche (1 a 5) es el que pide el guion, y solo uno?
10. ¿El troquel del parche es el nuestro, con las dos alas y la muesca, o una mancha amorfa?
11. ¿La caja enseña solo la cara frontal de la referencia?
12. ¿La escala de la caja respecto a la mano es creíble?
13. ¿Dos viñetas vecinas comparten POV, banda de distancia o acción?
14. ¿Cada banda (TIGHT, MID, WIDE) aparece al menos dos veces?
15. ¿La luz es la misma en las ocho, fría y neutra, sin tono ámbar?
16. ¿La ropa y el pelo son idénticos en las ocho?
17. ¿Hay piel de cera, poros borrados o brillo de filtro después del de-slop?
18. ¿Los poros de la macro están en cuadrícula?
19. ¿Aparece texto, rótulo o número que no sea la etiqueta de la caja?
20. ¿Algún bote del baño tiene texto legible o una marca real?
21. ¿La cara es la misma que en el board anterior?
22. En el prompt del clip: ¿hay exactamente siete `Hard cut to.`?
23. ¿Hay alguna palabra de movimiento (`handheld`, `drift`, `sway`) dentro de un corte STATIC?
24. ¿El corte 1 abre a medio movimiento?
25. ¿Hay un micro-beat sin guardia y un beat de boca cerrada?

---

## Anexo C · Contradicciones entre la biblia y el flujo oficial, y cómo se resuelven

Nuestra biblia y el flujo oficial de Higgsfield chocan en cuatro sitios. No son detalles: si se ignoran, uno anula al otro dentro del mismo prompt.

**1. Profundidad de campo.** La biblia pone `very shallow depth of field` y `shallow depth of field` entre las palabras que funcionan. El flujo oficial la prohíbe y exige `deep focus, background stays sharp`, y el prompt de de-slop la lista como AI-slop. **Resolución:** foco profundo por defecto en todos los planos de persona; profundidad corta **solo** en los macros de piel y de producto, donde es físicamente cierta con una lente macro de clip. En esos macros se escribe `shallow depth of field from the clip-on macro lens, focus exactly on the pores` y **no** se escribe `bokeh` ni `cinematic`. En el resto, `deep focus`.

**2. Luz cálida.** La biblia describe el dormitorio de noche con "lámpara de mesilla cálida". El flujo tiene prohibición tajante de cualquier tono ámbar. **Resolución:** el plano de dormir se describe con una práctica de luz tenue y **neutra**, no ámbar: `a single dim bedside practical, neutral white, most of the room in darkness`. Se prohíbe expresamente `golden hour, warm amber cast` en ese slot también.

**3. Reflejos en la ventana de noche.** La regla 3 de la biblia dice "la ventana de atrás es negra con los azulejos reflejados en ella". El flujo prohíbe cualquier superficie reflectante. **Resolución:** se corta esa cláusula. La ventana de noche se describe como `the window behind is pure black` y nada más. Los azulejos reflejados no aportan y abren la puerta a un miembro duplicado.

**4. Nombre del modelo de imagen.** Nuestras fichas de tomas dicen "GPT Image 2.5"; el identificador que usa el flujo y el catálogo del MCP es `gpt_image_2`. **Sin verificar** si son exactamente la misma versión. Hay que comprobarlo con `models_explore` antes de la primera tanda y unificar el nombre en la documentación, porque si son modelos distintos los precios de la tabla del punto 9.1 cambian.

**5. Quince tomas contra dieciséis slots.** La biblia define una columna vertebral de 15 tomas por anuncio. Dos boards dan 16 slots. **Resolución:** el mapeo del punto 3, paso 2. Sobran uno o dos huecos, que se usan para respirar (un beat de reacción, un plano de detalle del baño) y nunca se dejan vacíos ni se repiten.
