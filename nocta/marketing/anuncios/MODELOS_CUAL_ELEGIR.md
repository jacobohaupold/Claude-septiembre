# QUÉ MODELO USAR PARA CADA COSA: el catálogo real de Higgsfield y cuál elegimos

**Versión 1.0 · 12 de septiembre de 2026.** Este documento no viene de la web de marketing de nadie: sale de
consultar el catálogo de Higgsfield por su API el 12 de septiembre de 2026 (`models_explore`), que devuelve para
cada modelo sus parámetros reales, sus resoluciones, sus proporciones y qué tipo de referencia acepta. Lo que no
aparece ahí va marcado como **sin verificar**. Los precios medidos están en `MANUAL_HIGGSFIELD.md` §9.

El catálogo tiene 33 modelos de imagen y más de 40 de vídeo. La mayoría no nos sirve. Este documento dice cuáles
sí, para qué, y cuál es la decisión por defecto para que no haya que volver a pensarlo en cada toma.

## Índice

1. [La decisión en cinco líneas](#1-la-decisión-en-cinco-líneas)
2. [Imagen: los que pueden hacer lo nuestro](#2-imagen-los-que-pueden-hacer-lo-nuestro)
3. [Por qué GPT Image 2.5 y no los otros](#3-por-qué-gpt-image-25-y-no-los-otros)
4. [El detalle que rompe la llamada: el rol de las referencias](#4-el-detalle-que-rompe-la-llamada-el-rol-de-las-referencias)
5. [Vídeo: los que pueden hacer lo nuestro](#5-vídeo-los-que-pueden-hacer-lo-nuestro)
6. [Por qué Seedance y cuál de los cuatro](#6-por-qué-seedance-y-cuál-de-los-cuatro)
7. [Herramientas de apoyo que sí usamos](#7-herramientas-de-apoyo-que-sí-usamos)
8. [Lo que hay en el catálogo y no vamos a tocar](#8-lo-que-hay-en-el-catálogo-y-no-vamos-a-tocar)
9. [Tabla final: toma a toma, qué modelo](#9-tabla-final-toma-a-toma-qué-modelo)

---

## 1. La decisión en cinco líneas

| Para | Modelo | Ajustes |
|---|---|---|
| Las 375 imágenes de los anuncios | `gpt_image_2_5`, variante `flare` | 1k, calidad `medium`, 9:16 |
| Quitar la piel de plástico de una imagen que ya casi vale | `seedream_v5_pro` | 2k, `is_inpaint` según el caso |
| Animar una imagen fija, plano a plano | `seedance1_5` (Seedance 1.5 Pro) | 4 s, 720p, `generate_audio: false` |
| Un bloque de varios cortes con personaje y producto fijos | `seedance_2_5`, modo `omni_reference` | 720p, `generate_audio: false` |
| Subir de calidad solo los clips que ganen en datos | `bytedance_video_upscale` | preset `ugc` |

No hace falta nada más. Todo lo demás del catálogo o es peor para esto, o es más caro por lo mismo, o resuelve un
problema que no tenemos.

## 2. Imagen: los que pueden hacer lo nuestro

Lo nuestro tiene tres exigencias que descartan a casi todos: **9:16 nativo**, **aceptar varias fotos de referencia
a la vez** (el avatar, el parche real y la caja real) y **piel con poros que no parezca plástico**.

| Modelo | Proveedor | Resolución | Referencias | 9:16 | Sirve para NOCTA |
|---|---|---|---|---|---|
| `gpt_image_2_5` | OpenAI | 1k / 2k / 4k, calidad hasta `max` | `image_references`, varias | Sí | **Sí: es el que usamos** |
| `gpt_image_2` | OpenAI | 1k / 2k / 4k | `image` | Sí | Modelo anterior. Mismo trabajo, más caro por imagen |
| `seedream_v5_pro` | Bytedance | 1k / 1.5k / 2k | `image_references` | Sí | Sí, pero como **segundo pase**, no para generar |
| `seedream_v5_lite` | Bytedance | basic / high | `image_references` | Sí | Versión barata del anterior. Para pruebas |
| `nano_banana_pro` | Google | 1k / 2k / 4k | `image_references` | Sí | Alternativa real. Muy bueno en texto y diagramas |
| `nano_banana_2` | Google | 1k / 2k / 4k, con máscara | `image_references`, `mask` | Sí | Útil si hace falta **retocar una zona concreta** con máscara |
| `soul_2` | Higgsfield | 1.5k / 2k | 1 sola imagen | Sí | Solo para **crear el avatar**, no para las tomas |
| `flux_2` | Black Forest | 1k / 2k, variantes pro/flex/max | `image_references` | Sí | Buena adherencia al prompt, pero sin ventaja aquí |
| `kling_omni_image` | Kling | 1k / 2k | `image_references` | Sí | Fotorrealista y versátil. Suplente |
| `recraft_v4_1` | Recraft | 1k / 2k | no acepta | Sí | Para logos y vectores, no para piel |
| `openai_hazel` | OpenAI | low/medium/high | `image_references` | **No** (solo 1:1, 3:2, 2:3) | Descartado: no hace vertical |

## 3. Por qué GPT Image 2.5 y no los otros

Cuatro razones, en orden de peso.

**1. Es el único que acepta varias fotos de producto y las respeta.** Está comprobado generando: sin adjuntar las
fotos reales del parche, cualquier modelo se inventa una mancha amorfa. Con ellas, `gpt_image_2_5` reproduce el
troquel. Ese fue el problema que más costó resolver y este modelo es el que lo resolvió.

**2. La piel.** A 1k con calidad media da poros desiguales, capilares y brillo de grasa sin el barniz de plástico.
Subir a 2k y calidad alta lo empeora: alisa la piel. Es contraintuitivo y por eso está escrito.

**3. Proporciones.** Acepta 15 proporciones, con 9:16 nativo. Nada de generar en cuadrado y recortar, que es lo que
obliga a hacer `openai_hazel`.

**4. Precio.** 1 crédito por imagen a 1k y calidad media, medido en el historial de la cuenta. `gpt_image_2`, que
hace lo mismo, cuesta 2,5.

**Cuándo usar otro.** Si una imagen sale bien pero con la piel acartonada, no se regenera: se le pasa
`seedream_v5_pro`, que es el modelo de «razonamiento visual y edición por instrucción», con la orden de conservar
la composición y rehacer solo la textura. Y si lo que falla es una zona concreta (una mano, una esquina de la
caja), `nano_banana_2` acepta máscara y solo toca esa zona.

## 4. El detalle que rompe la llamada: el rol de las referencias

Cada modelo llama de forma distinta a la foto que le adjuntas, y equivocarse devuelve un error o, peor, genera
ignorando la referencia:

| Modelo | Rol que hay que poner |
|---|---|
| `gpt_image_2_5`, `nano_banana_*`, `seedream_*`, `flux_2`, `kling_omni_image` | `image_references` |
| `gpt_image_2`, `soul_2`, `cinematic_studio_2_5` | `image` |
| `nano_banana_2` con máscara | `image_references` + `mask` |
| Vídeo con fotograma inicial y final | `start_image` y `end_image` |
| Vídeo con referencias de identidad | `image_references`, `video_references`, `audio_references` |

El flujo de producción que viene dentro de Higgsfield todavía escribe `image` porque es anterior a estos modelos.
Si se copia tal cual con `gpt_image_2_5`, la llamada falla.

## 5. Vídeo: los que pueden hacer lo nuestro

Aquí la exigencia es otra: que **no cambie la cara entre planos**, que **no deforme el parche** y que se pueda
pedir **silencio** (los subtítulos y la voz los pones tú en el montaje).

| Modelo | Duración | Resolución | Fotograma inicial/final | Referencias | Audio apagable |
|---|---|---|---|---|---|
| `seedance1_5` | 4 / 8 / 12 s | 480p / 720p / 1080p | Sí, los dos | No | Sí |
| `seedance_2_0` | 4-15 s | hasta 4k en modo `std` | Sí, los dos | imagen, vídeo, audio | Sí |
| `seedance_2_0_mini` | 4-15 s | 480p / 720p | Sí, los dos | imagen, vídeo, audio | Sí |
| `seedance_2_5` | 4-30 s | 480p / 720p / 1080p | Sí, los dos | imagen, vídeo, audio | Sí |
| `kling3_0` | 3-15 s | std / pro / 4k | Sí, los dos | No | Sí |
| `minimax_hailuo` | 6 o 10 s | 512 / 768 / 1080 | Sí, los dos | No | **Sin dato en el catálogo** |
| `veo3_1` | 4 / 6 / 8 s | basic / high / ultra | Solo inicial | No | **No aparece la opción** |
| `wan3_0` | 2-30 s | 480p / 720p / 1080p | Sí, los dos | imagen, vídeo, audio | Sí |

## 6. Por qué Seedance y cuál de los cuatro

**Por qué Seedance y no Veo ni Kling.** Veo 3.1 solo acepta fotograma inicial, y nuestros planos delicados (poner
el parche, despegarlo) necesitan decirle también **dónde tiene que acabar la mano**. Kling 3.0 sí acepta los dos
fotogramas pero no acepta referencias de identidad, así que la cara deriva entre planos. Seedance acepta las dos
cosas.

**Cuál de los cuatro, plano por plano:**

- **`seedance1_5` para casi todo.** Los macros de nariz, el parche a contraluz y el packshot son planos de 3-4
  segundos con una sola acción. Este modelo es el más barato de los que aceptan fotograma inicial y final, y es
  además el menos «creativo», que aquí es una virtud: no reinterpreta, anima.
- **`seedance_2_5` en modo `omni_reference` para los bloques de varios cortes.** Es el único que acepta a la vez el
  board, el personaje y el producto como referencias, y llega hasta 30 segundos. Es lo que permite hacer un anuncio
  entero en uno o dos clips en vez de quince.
- **`seedance_2_0` solo si hace falta 4K**, que de momento no hace falta: el destino es Reels y TikTok.
- **`seedance_2_0_mini` para borradores**, cuando lo que se quiere es ver si el ritmo funciona antes de gastar.

**En todos, `generate_audio: false`.** Por defecto viene en `true`, y cuando el modelo genera voz tiende además a
quemar subtítulos en pantalla. Se apaga siempre.

## 7. Herramientas de apoyo que sí usamos

| Herramienta | Para qué |
|---|---|
| `seedream_v5_pro` | El pase contra la piel de plástico sobre una imagen ya buena |
| `nano_banana_2` con máscara | Arreglar una zona concreta sin rehacer la imagen |
| `image_background_remover` | Sacar la caja o el parche sobre fondo transparente para la web |
| `bytedance_video_upscale` preset `ugc` | Subir de calidad solo los clips que ya han funcionado en datos |
| `topaz_image` | Ampliar un packshot para impresión |
| `flux_2_pro_outpaint` | Ensanchar un encuadre que se quedó corto, sin regenerar |

## 8. Lo que hay en el catálogo y no vamos a tocar

- **`ms_image` (DTC Ads) y `marketing_studio_video`.** Generan el anuncio entero de un botón, con su avatar y su
  formato. Suena bien y es justo lo que no queremos: deciden el encuadre, el ritmo y el texto por ti, y el
  resultado se parece a todos los demás anuncios hechos con la misma herramienta. Además queman texto en pantalla.
- **`soul_cinematic`, `cinematic_studio_*`.** Estética de cine: luz dramática, contraste alto, grano de película.
  Es exactamente lo contrario de lo que buscamos, que es que parezca grabado con un móvil en un baño.
- **`autosprite`, `soul_cast`, `soul_location`.** Para videojuegos y producción de ficción.
- **`clipify`.** Corta un vídeo de YouTube en clips con subtítulos. No aplica.
- **`z_image`, `grok_image*`.** Estilizados y de alto contraste. No dan piel realista.
- **`hf_mult_motion_control` y `hf_mult_replace_object` (Genjutsu).** Transfieren movimiento de un vídeo a una
  imagen, o cambian un objeto dentro de un vídeo. Son potentes y caros (26 créditos un clip de 3,5 s). Tienen un
  uso futuro claro: cuando llegue el lote real y se grabe un vídeo de verdad poniéndose el parche, Genjutsu puede
  reutilizar ese movimiento con otros avatares. Hoy no, porque no hay vídeo real todavía.

## 9. Tabla final: toma a toma, qué modelo

| Tipo de toma | Imagen | Vídeo | Ajustes de vídeo |
|---|---|---|---|
| Macro de poros y filamentos | `gpt_image_2_5` 1k medium | `seedance1_5` | 4 s, 720p, sin audio, solo fotograma inicial |
| Persona de medio cuerpo o cara | `gpt_image_2_5` 1k medium + avatar | `seedance1_5` | 4 s, 720p, sin audio |
| Poner el parche (dos manos) | `gpt_image_2_5` + avatar + parche real | `seedance1_5` | 4 s, **fotograma inicial y final** |
| Despegar el parche | `gpt_image_2_5` + avatar + parche real + nariz limpia | `seedance1_5` | 4 s, **fotograma inicial y final** |
| Parche usado a contraluz | `gpt_image_2_5` + parche real | `seedance1_5` | 3 s, 720p, sin audio |
| Packshot de la caja | `gpt_image_2_5` + caja real | `seedance1_5` | 3 s, 720p, sin audio |
| Bloque de 8 cortes seguidos | board con `gpt_image_2_5` 2k 21:9 + `seedream_v5_pro` | `seedance_2_5` `omni_reference` | 15 s, 720p, sin audio |
| Borrador para validar ritmo | el que ya haya | `seedance_2_0_mini` | 480p, sin audio |
