# REFERENCIAS REALES: cómo se ve y cómo se mueve esto de verdad

**Versión 1.1 · 12 de septiembre de 2026 · NOCTA · dirección de arte de los 25 anuncios**

De dónde sale cada dato. Todo lo que aquí se afirma viene de tres sitios, y solo de tres:

1. **La investigación de referencias visuales de NOCTA.** Se comprobó con `curl` el código HTTP de cada URL y además se descargaron y se miraron una a una seis imágenes: la foto "durante" de Vue Skin, la foto del parche usado de Vue, el antes/después de Vue, el blíster de Vue y las dos figuras clínicas del caso publicado en JAAD Case Reports (PMC12890860).
2. **La biblia visual de NOCTA**, que recoge lo aprendido generando 22 imágenes con GPT Image 2.5 (variante flare) y contiene la ficha física del parche y las cinco reglas comprobadas.
3. **La documentación pública de las marcas**: la guía paso a paso de Hero Cosmetics, la página "cómo usar" de Vue Skin y el artículo "Pore Strips 101" de Bioré.

Cuando una afirmación no venga de ahí, lo digo: pone **sin verificar**. No hay ni una cifra, ni una URL, ni un nombre de modelo en este documento que no salga de una de esas tres fuentes.

Este documento no genera nada. Es el manual que se lee antes de escribir un prompt y antes de aprobar una imagen. El problema que resuelve es concreto: el modelo no ha visto nunca cómo se mueve una mano al despegar un parche de hidrocoloide, ni cómo se ve un poro de verdad, así que se lo inventa, y se lo inventa mal y siempre igual. La solución no es pedirle "más realismo", es darle la referencia exacta y describirla con palabras que él entienda.

---

## Índice

1. [Cómo se usa este documento](#1-cómo-se-usa-este-documento)
2. [Dónde están las referencias buenas](#2-dónde-están-las-referencias-buenas)
   - 2.1 Poros y filamentos sebáceos reales
   - 2.2 Parches de hidrocoloide puestos y usados
   - 2.3 El gesto de despegar
   - 2.4 Textura de piel grasa
   - 2.5 Vídeo UGC de baño rodado con móvil
   - 2.6 Baño español
   - 2.7 Antes y después
   - 2.8 Packshot de caja
   - 2.9 Tres referencias que hay que mirar con cuidado
   - 2.10 Tabla de términos de búsqueda exactos
3. [Cómo se ve DE VERDAD cada cosa](#3-cómo-se-ve-de-verdad-cada-cosa)
   - 3.1 El filamento sebáceo
   - 3.2 El punto negro, que es otra cosa
   - 3.3 El hidrocoloide limpio
   - 3.4 El hidrocoloide saturado
   - 3.5 La piel después
   - 3.6 La marca del adhesivo
   - 3.7 La piel grasa real
   - 3.8 La tira de poros usada, que es el contraejemplo
4. [Los movimientos, uno a uno](#4-los-movimientos-uno-a-uno)
5. [Cómo se convierte una referencia en un prompt](#5-cómo-se-convierte-una-referencia-en-un-prompt)
6. [Qué NO copiar de lo que hay por ahí](#6-qué-no-copiar-de-lo-que-hay-por-ahí)
7. [Tabla: lo que la IA se inventa mal](#7-tabla-lo-que-la-ia-se-inventa-mal)
8. [Contradicciones con la biblia, ya resueltas](#8-contradicciones-con-la-biblia-ya-resueltas)
9. [Comprobación de 60 segundos antes de dar por buena una toma](#9-comprobación-de-60-segundos-antes-de-dar-por-buena-una-toma)

---

## 1. Cómo se usa este documento

Antes de escribir las 15 tomas de un anuncio, se abre por la sección 3 y se copia la descripción física de lo que va a salir en cuadro. Antes de animar, se abre por la sección 4 y se copian la geometría, la duración y el modo de movimiento. Si una toma sale mal, se busca el fallo en la tabla de la sección 7 y se pega la frase de corrección.

Tres cosas que están por encima de todo lo demás y que no se negocian:

- **Las fotos reales del producto van SIEMPRE adjuntas.** La biblia ya lo tiene comprobado: describir la forma del parche con palabras no basta, el modelo se inventa una mancha amorfa. En toda imagen donde salga el parche van como `image_references` dos o tres de estas: `parche_liner`, `parche_puesto`, `parche_puesto_2`, `caja`. Las referencias externas de este documento (Vue, Hero, las figuras clínicas) sirven para saber **qué describir**; las fotos de NOCTA sirven para que **el troquel salga bien**. No se mezclan: no se adjunta nunca una foto de Vue como referencia, porque el parche de Vue tiene el borde inferior festoneado y el de NOCTA tiene una muesca redondeada de 6 mm, y el modelo copiaría el borde equivocado.
- **Nada de texto.** Ni en imágenes ni en vídeos. Varias de las referencias que se citan aquí (las de Vue) llevan texto sobreimpreso y el modelo tiende a imitarlo. Los subtítulos se ponen en montaje.
- **Un estado por imagen.** Los cinco estados de la biblia (sin parche, recién puesto, saturado, a medio quitar, fuera) son excluyentes. Una imagen con el parche en la mano y a la vez pegado en la nariz se tira.

Y dos listas de la biblia que hay que tener a mano al escribir, porque son de aplicación literal.

**Palabras que funcionan** (biblia, sección 4): `handheld`, `iPhone`, `clip-on macro lens`, `north-facing window light`, `white subway tile`, `shallow depth of field`, `sensor noise`, `vellus hair`, `enlarged pores`, `sebaceous filament plug`, `uneven skin tone`, `unretouched`, `documentary`.

**Palabras prohibidas** (biblia, sección 4). Si aparece una sola de estas, el plano deja de parecer un móvil y parece publicidad; se borra y se regenera:

```
8k, hyperrealistic, cinematic, dramatic lighting, professional photography, beautiful woman, perfect skin, flawless, glowing, studio, HDR, award-winning
```

Y el bokeh exagerado, que en la biblia va en la misma lista.

---

## 2. Dónde están las referencias buenas

Todas las URL de esta sección se comprobaron con `curl` en la investigación y devolvieron 200. Los términos de búsqueda que aparecen **dentro** de esas URL están, por tanto, comprobados. Los términos adicionales de la última columna de la tabla 2.10 son propuestas mías: **sin verificar**.

### 2.1 Poros y filamentos sebáceos reales

La referencia madre es una foto clínica, no una foto de belleza. En las fotos de belleza el filamento no existe porque está retocado.

- **La foto que hay que tener abierta mientras se escribe el prompt del macro**: `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/106acf39d5ca/gr1.jpg` (figura clínica de JAAD Case Reports, artículo PMC12890860). Vertical 3:4, encuadre del párpado inferior al labio superior, la nariz ocupa el 60% del alto, tres cuartos ligeramente contrapicado con la cámara a la altura de la punta de la nariz, distancia aparente 20 cm con equivalente 50-70 mm, todo el plano nítido. Luz dura y frontal desde la posición de cámara. Es literalmente el plano 3 de Álex.
- **El artículo con los pies de figura**: `https://pmc.ncbi.nlm.nih.gov/articles/PMC12890860/`. Dice "prominent sebaceous filaments" y "uniform yellowish plugs". Confirma el color amarillento, no negro.
- **La dermatoscopia a ×20**: `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/502a21f0cf49/gr2.jpg`. Se mira una vez para saber qué **no** hacer y no se vuelve a abrir. Instrucción concreta: no escribir nunca `dermatoscope`, `dermoscopy` ni `×20` en un prompt, y llevar `dermatoscope view` siempre en el negativo.
- **Segundo caso clínico**, con la descripción "depósitos cilíndricos sólidos, blanco-hueso, rodeando folículos normales": `https://pmc.ncbi.nlm.nih.gov/articles/PMC7875663/` y su figura `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/c05d/7875663/73a8be1d40e5/dp1101a148g001.jpg`.
- **Banco clínico para distinguir filamento de comedón**: `https://dermnetnz.org/topics/comedones` y `https://dermnetnz.org/topics/comedonal-acne`.
- **Base técnica en una página**: `https://en.wikipedia.org/wiki/Sebaceous_filament`. Importa porque dice lo que no se puede prometer: el filamento sebáceo es fisiología normal y vuelve.
- **Bancos de encuadres**: `https://www.gettyimages.com/photos/nose-pores-close-up` y `https://www.gettyimages.com/videos/skin-macro`.

### 2.2 Parches de hidrocoloide puestos y usados

- **Parche puesto, la foto de referencia de composición**: `https://www.vueskin.com/cdn/shop/files/Model_Image_-_During.jpg`. Vertical 4:5, de media frente a clavícula, la cara ocupa el 75% del ancho, cámara a la altura de los ojos y frontal exacto, equivalente 85 mm a 70 cm. Los dos índices a la vez, ojos cerrados. Se copia la geometría, no el parche.
- **Parche usado, la foto más importante del proyecto**: `https://www.vueskin.com/cdn/shop/files/Dirty_Patch.jpg`. Dos manos, parche tensado, cara desenfocada detrás, fondo oscuro. Aquí es donde se ve que el sebo absorbido no son puntos.
- **Paso a paso oficial de Hero con fotos**: `https://www.herocosmetics.us/blogs/news/step-by-step-guide-with-photos-how-to-use-mighty-patch-nose-for-pore-cleansing`. Describe la mecánica del gesto (se despega el liner de un lado, se aplica ese lado desde el centro y se alisa hacia fuera, luego el otro) y dice el objetivo: que quede plano, sin arrugas, sin bultos y sin burbujas.
- **Tutorial de Vue con secuencia de cinco imágenes**: `https://www.vueskin.com/pages/how-to-use-vue-patches` y `https://www.vueskin.com/pages/nose-patches-tutorial`, imágenes `https://cdn.shopify.com/s/files/1/0611/5373/8942/files/nose1.png` hasta `nose5.png`. Indican "piel completamente seca, sin nada de skincare debajo, presionar con firmeza para sellar".
- **Página de producto de Hero con miniaturas del parche usado blanco**: `https://www.herocosmetics.us/products/mighty-patch-nose`.
- **Parche sobre rostro, banco de encuadres**: `https://www.gettyimages.com/photos/acne-patch-face`.
- **Competencia española directa**, útil para no parecer una traducción: `https://nichebeautylab.com/products/zitproof-nose` (Acnemy Zitproof Nose) y `https://www.vueskin.com/es/products/hydrocolloid-nose-patches`.

### 2.3 El gesto de despegar

Aquí hay dos gestos distintos y es importante no confundirlos, porque la diferencia entre los dos **es** el anuncio comparativo.

Despegar el parche de hidrocoloide:

- `https://www.youtube.com/shorts/ABU2WIaj14k` ("satisfying hydrocolloid patch removal"). Vertical, despegado real: el parche se estira, se dobla sobre sí mismo, la piel no se levanta. Recorrido completo 2-3 s.
- `https://www.youtube.com/watch?v=yFVu8FGoLDI` ("Pimple Patch Removal | Remove My Pimple Patches & See the Results"). Gesto de retirada y presentación a cámara a velocidad real.
- `https://www.youtube.com/watch?v=m2mcTAnVmUM` (anuncio oficial de Mighty Patch Nose). Sirve para el ritmo de plano.
- `https://www.tiktok.com/@herocosmetics.uk/video/7476150243126463766`. Aplicación a velocidad real.
- `https://www.tiktok.com/discover/hero-mighty-patch-before-and-after`. Ritmo de montaje del "peel reveal".

Despegar una tira de poros (el contraejemplo, el gesto del competidor):

- `https://www.youtube.com/watch?v=B5EawJajoqE` ("BIORE PORE STRIP REMOVAL UP CLOSE"), el macro viral original.
- `https://www.youtube.com/watch?v=ulSETPsaXAk` (bajo microscopio). Aquí se ve que los tapones salen perpendiculares a la tira, como un bosque de alfileres.
- `https://www.youtube.com/watch?v=CglTwSUZO0E` y `https://www.youtube.com/watch?v=9sb6ObLdruo`, más ángulos.
- `https://www.youtube.com/shorts/1Ec37mlYvlY`, en vertical 9:16.
- `https://www.tiktok.com/@dermangelo/video/7148137101337414958`, dermatólogo, contenido patrocinado por Bioré: cómo se usa "bien".
- Instrucciones oficiales: `https://us.biore.com/blog/acne-and-pimples/pore-strips-101`. Dice 10-15 minutos hasta que la tira está rígida y retirada despacio desde los bordes, nunca de un tirón.
- `https://www.tiktok.com/discover/biore-pore-strips-before-and-after` y `https://www.gettyimages.com/videos/pore-strip`, bancos.

### 2.4 Textura de piel grasa

- La misma figura clínica `gr1.jpg` del punto 2.1 es también la mejor referencia de piel grasa con brillo especular.
- `https://www.vueskin.com/cdn/shop/files/Model_Image_-_During.jpg`: piel real con pecas, poros y brillo en el pómulo, en luz de estudio suave.
- `https://www.youtube.com/watch?v=Wl0jS7uYKt8` ("My favorites tips for Macro Beauty Photography", Lindsay Adler).
- `https://www.youtube.com/watch?v=rdKaYMvLsjo` ("Skincare Texture Photography Tutorial", Tiffany Chen).
- `https://www.gettyimages.com/videos/skin-macro`, textura en movimiento.

Lo que sale de esas dos referencias de técnica no es "cuidar la luz", es una regla con número: **en cada anuncio, al menos uno de los 15 planos lleva una fuente pequeña y dura desde la posición de cámara, o una luz rasante a 45° por debajo.** Si los 15 van con luz de ventana suave, la piel se plastifica en los 15. La frase, para el plano de piel:

```
small hard light source from the camera position, like a phone flash in a bathroom, creating a continuous specular sheen along the nose bridge and tip, so every filament catches its own micro-highlight
```

Y para el macro de la tira usada, donde la luz es la contraria:

```
raking side light from 45 degrees below so every plug casts its own tiny shadow
```

### 2.5 Vídeo UGC de baño rodado con móvil

- `https://www.gettyimages.com/videos/selfie-video-phone-bathroom`. El patrón se ve a simple vista: brazo extendido, 35-50 cm, móvil por debajo de la línea de ojos, cabeza en el tercio superior del 9:16.
- `https://www.gettyimages.com/videos/bathroom-mirror-skincare-morning`. La variante espejo, con dos profundidades: el cristal y la habitación detrás.
- `https://www.youtube.com/watch?v=jfmILqclerU` ("morning skincare routine *glass skin edition*", Ally Yost). Duración real de cada gesto.
- `https://www.youtube.com/watch?v=N1gkqrsklbE` ("Minimalist morning routine | Silent vlog", Marin). B-roll de baño sin voz: manos, grifo, toalla.
- `https://www.tiktok.com/discover/skin-care-ugc-example` y `https://www.tiktok.com/discover/how-to-film-morning-routine-tutorial`.
- **El banco más útil y el único que se actualiza solo**: `https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?period=30&region=ES&industry=22000000000`. Es el Top Ads de TikTok filtrado por España y sector belleza, últimos 30 días. Se mira antes de cada tanda de generación y, como mínimo, una vez al mes.
- Calibración del temblor: `https://www.youtube.com/watch?v=pEnkzokIG64` ("Phone Gimbal vs Handheld") y `https://www.youtube.com/watch?v=nb_5i5gjYL4` (B&H, técnicas a pulso).

Si el guion pide que el avatar sostenga el móvil, lo natural no es el selfie a pulso, es el **plano de espejo**, donde se ve el móvil tapando parte de la barbilla. Eso es marca de autenticidad. Frase de partida, solo para planos de día (de noche la biblia prohíbe los espejos, ver 8.6):

```
Vertical 9:16 mirror shot in a small Spanish bathroom: a woman filming her own reflection with a phone held at chest height, the phone partially covering her chin. Frameless mirror over the basin, tiles halfway up the wall, terry towel on a hook, a small high frosted window camera-right. Two planes of depth: the mirror glass with a faint water mark, and the room behind. Camera at 45 cm, apparent 26 mm phone lens. Morning daylight only, overhead lights off. Real unretouched skin. No text, no logos, no watermark.
```

### 2.6 Baño español

- `https://www.gettyimages.es/fotos/cuarto-de-ba%C3%B1o-espa%C3%B1a`. Buscador de Getty en español filtrado a España. Es el banco más fiable que encontró la investigación para baños realmente españoles en vez de lofts americanos; no se comprobó que no haya otros mejores.
- `https://elmon.cat/viure/es/bienestar/adios-a-los-puntos-negros-dos-dermatologas-opinan-sobre-el-exito-de-los-parches-hidrocoloides-virales-5290/`. No es una referencia visual, es de lenguaje. Lo aprovechable son tres expresiones que la prensa española ya ha instalado y que el público reconoce sin explicación: **"adiós a los puntos negros"**, **"hidrocoloide de origen hospitalario"** y **"absorber en vez de arrancar"**. Van en el guion y en la voz, nunca en la imagen.

Rasgos físicos que hay que meter en el prompt de ambiente, y que son lo que hace que el baño sea español: azulejo hasta media altura, ventana pequeña y **alta** de vidrio mate con carpintería de aluminio blanco, toalla de rizo colgada, espejo sin marco sobre el lavabo, apliques apagados. La luz de esa ventana entra muy direccional y descendente: sombra bajo la nariz corta, de 2-3 cm de proyección, y el azulejo blanco rebota y levanta las sombras. Temperatura 5600 K.

### 2.7 Antes y después

Esta sección faltaba en la versión 1.0 y es la toma 15 de casi todos los anuncios.

- `https://www.vueskin.com/cdn/shop/files/Before_and_After_3.jpg`. Split vertical 50/50. **Copiable**: el encuadre, de la ceja al labio inferior, nariz centrada, un solo ojo completo en cuadro, tres cuartos suave, distancia 40 cm, equivalente 70-85 mm. **No copiable**: todo lo demás, ver sección 6.
- `https://www.vueskin.com/cdn/shop/files/Before_and_After_2.jpg`, segunda variante con el mismo problema.
- `https://www.vueskin.com/cdn/shop/files/GIF_-_Before_and_After_-_Nose_Patches_2.gif`. El GIF de transición. Lo útil es el ritmo del corte, que es lo que se replica en montaje.
- `https://www.vueskin.com/cdn/shop/files/Model_Image_-_After.jpg`, el "después" aislado. Sirve para clonar la piel objetivo.
- `https://www.vueskin.com/cdn/shop/files/Results.jpg` y `https://www.vueskin.com/cdn/shop/files/NosePatches.jpg`, más material de resultados.
- `https://www.gettyimages.com/photos/before-and-after-skin-nose`, banco.

El protocolo completo, con las dos líneas exactas de prompt, está en el punto 5.2.

### 2.8 Packshot de caja

- `https://nichebeautylab.com/cdn/shop/files/AC_43499_ZITPROOF-NOSE_PRODUCT_BOX_c74258d9-7611-4195-9f5b-fa5ca3593282.jpg`. Caja pequeña de parches nasales de una marca española: el formato más parecido al nuestro.
- `https://www.herocosmetics.us/cdn/shop/products/MPN_600x600_3446df4a-a24e-4b85-9652-339d2d9be61e.jpg`, packshot oficial de Mighty Patch Nose.
- `https://starface.world/cdn/shop/files/starface-big-yellow-hydro-star-compact_0dfc31f3-6f2c-4678-9fa8-402851cc31de.png`, envase pequeño con sombra propia bien marcada.
- `https://www.vueskin.com/cdn/shop/files/NosePatchLarge_a850e4ce-b22a-4f06-916c-b9ef3f933c32.jpg`, el blíster sobre blanco puro, en diagonal de esquina a esquina.
- `https://www.gettyimages.com/photos/cosmetic-box-beige-background`, banco.
- Técnica de una sola luz: `https://www.youtube.com/watch?v=Oz9SXijsTvY` y `https://www.youtube.com/watch?v=Y9WoLveqglA`. La receta de los dos es la misma: una fuente grande a 45° arriba-izquierda y un rebote blanco a la derecha.

### 2.9 Tres referencias que hay que mirar con cuidado

Tres de las URL de arriba enseñan un producto con una forma que la biblia prohíbe expresamente. Sirven para el **material**, nunca para la **silueta**, y no se adjuntan jamás como `image_reference`:

| Referencia | Para qué sirve | Por qué no se adjunta |
|---|---|---|
| Blíster de Vue (`NosePatchLarge_...jpg`) | Ver el aspecto del hidrocoloide desnudo sobre blanco | Los parches del blíster son **redondos**, no de mariposa |
| Starface (vídeo 4:5 y packshot) | Ver el brillo satinado del material y la sombra de contacto | Los parches son **estrellas**, y la biblia prohíbe parches con dibujos o estrellas |
| Cualquier foto de Vue con el parche puesto | Geometría del gesto y del encuadre | Borde inferior **festoneado**; el de NOCTA tiene una muesca redondeada de 6 mm |

### 2.10 Tabla de términos de búsqueda exactos

Los términos de la columna "comprobado" son los que ya devuelven resultados en las URL de arriba. Los de la columna "para ampliar" son propuestas mías, **sin verificar**.

| Qué busco | Dónde | Término comprobado | Para ampliar (sin verificar) |
|---|---|---|---|
| Filamentos sebáceos reales | PubMed Central, DermNet | `sebaceous filaments` | `sebaceous filaments nose clinical photo`, `filamentos sebáceos nariz dermatología` |
| Poros de nariz de cerca | Getty | `nose pores close up` | `poros nariz macro`, `enlarged pores nose macro` |
| Macro de piel en movimiento | Getty vídeos | `skin macro` | `skin texture macro video`, `macro piel textura` |
| Parche sobre rostro | Getty | `acne patch face` | `hydrocolloid patch nose`, `parche hidrocoloide nariz` |
| Parche usado, peel reveal | TikTok descubrir | `hero mighty patch before and after` | `hydrocolloid patch removal satisfying`, `parche usado antes después` |
| Despegado de hidrocoloide | YouTube Shorts | `satisfying hydrocolloid patch removal` | `pimple patch peel off close up` |
| Tira de poros arrancada | YouTube | `BIORE PORE STRIP REMOVAL UP CLOSE` | `pore strip under microscope`, `tira poros nariz antes después` |
| UGC de baño con móvil | Getty vídeos | `selfie video phone bathroom` | `front camera talking bathroom`, `grabándose con el móvil en el baño` |
| Espejo de baño por la mañana | Getty vídeos | `bathroom mirror skincare morning` | `mirror selfie skincare routine` |
| Baño español real | Getty España | `cuarto de baño españa` | `baño piso español azulejo`, `spanish apartment bathroom tiles` |
| Antes/después de nariz | Getty | `before and after skin nose` | `antes y después poros nariz` |
| Caja de cosmética sobre crema | Getty | `cosmetic box beige background` | `small carton box cream background product shot` |
| Anuncios que funcionan ahora en ES | TikTok Creative Center | Top Ads, región ES, sector 22000000000 | filtrar también por 7 días para ver lo que sube |

---

## 3. Cómo se ve DE VERDAD cada cosa

Cada ficha va con la frase en inglés lista para pegar en el prompt. Las frases están escritas para meterse en el **hueco 3 de la fórmula de ocho huecos de la biblia** ("detalle físico concreto"), salvo las de luz, que van en el hueco 5.

### 3.1 El filamento sebáceo

No es un punto negro. Es un **cilindro de sebo y queratina que rellena el folículo y sobresale un poco**, de 0,3 a 0,6 mm, de color **gris pardo con matiz amarillento**, a veces casi color crema. En la figura clínica a ×20 se ve que son cúpulas convexas, no agujeros. A la magnificación correcta (1:1 a 2:1, ancho de campo 30-40 mm) leen como un campo de puntitos gris-pardo.

Dónde están: **densísimos en las aletas de la nariz y en el surco alar, escasos en el puente**. Nunca repartidos por igual. La distribución en rejilla es el error que más delata el render (regla 4 de la biblia).

Qué los hace visibles: **la luz dura desde la posición de cámara**. Cada filamento genera su propio micro-destello y por eso se lee en relieve. Con luz difusa grande se borran y la piel se plastifica. Esto está comprobado comparando las figuras clínicas con las fotos de belleza.

El bloque completo, con geometría y luz dentro, porque sin ellas el resto no funciona:

```
Apparent 60 mm macro lens at 20 cm, field of view about 35 mm wide, everything in focus. Small hard light source from the camera position, like a phone flash in a bathroom, creating a continuous specular sheen along the nose bridge and tip. A dense field of sebaceous filaments: greyish-brown to pale yellow raised plugs, 0.3 to 0.6 mm, each one catching its own micro-highlight, concentrated on the nostril wings and in the alar crease, sparse on the bridge; pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. Light redness around the alar crease, fine vellus hair. Unretouched documentary realism, not a 3D render.
```

Negativo obligatorio:

```
black carbon dots, uniform pore pattern, grid of pores, dermatoscope view, airbrushed skin, plastic skin, beauty filter
```

### 3.2 El punto negro, que es otra cosa

El comedón abierto es negro porque la melanina de la superficie se oxida, no por suciedad (DermNet). Es más grande, más oscuro y aparece suelto, no en campo denso. **NOCTA trabaja sobre filamento, no sobre comedón inflamado.** Esto importa para dos cosas: para no pintar la nariz de puntos negros de dibujo, y para no prometer de más en el guion.

Como el modelo por defecto pinta puntos negros de dibujo, la corrección va siempre en positivo y en negativo a la vez:

```
greyish-brown to pale yellow raised plugs filling the pores, each one slightly convex and standing proud of the skin; NOT black dots, NOT open inflamed comedones, NOT painted-on spots
```

```
black carbon dots, cartoon blackheads, inflamed pimples, open comedones, pustules
```

### 3.3 El hidrocoloide limpio

El parche NOCTA recién puesto es **casi transparente con un velo mate**, un punto más claro que la piel, y se ven la piel y las pecas a través. Tiene **brillo propio, distinto al de la piel**: una línea fina de especular que recorre el borde biselado y dibuja la silueta de mariposa. Está sellado: sin arrugas, sin esquinas levantadas, siguiendo la curva de la nariz. Una o dos micro-burbujas cerca del borde es lo que le da verdad, porque eso pasa de verdad al aplicar (el paso a paso de Hero avisa expresamente de evitar burbujas, o sea que salen).

La regla crítica de la biblia va aquí y no se salta nunca: si solo se escribe "lleva el parche puesto", el modelo lo hace invisible y la imagen parece que la persona se está apretando la nariz.

```
a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed against the skin, one tiny air bubble near the edge, skin and freckles visible through the material
```

### 3.4 El hidrocoloide saturado

El dato que más cambia el proyecto. En la foto real del parche usado de Vue, el sebo absorbido **no son puntos blancos redondos**. Es una **nevada granular**, tipo azúcar glas o escarcha: continua y densa en el centro del parche, justo donde tocaba el puente y la punta, y disgregándose en grano fino hacia los bordes, con algún grumo más grueso. Donde está cargada, el material se vuelve **opaco**; los bordes siguen traslúcidos. El material de base es **gris perla translúcido con brillo satinado**.

Si se pide `white dots` o "puntitos blancos", GPT Image devuelve lunares blancos de dibujo animado y el plano que más vende del anuncio se cae.

Esto vale para el **estado 5**, el parche fuera y sostenido en la mano, visto por delante:

```
dense powdery white frost covering the centre of the patch — like fine icing sugar, granular and continuous where it sat on the nose bridge and tip, breaking into fine speckle towards the edges, fully opaque where it is loaded, a few coarser clumps, the edges still translucent pearl-grey with a satin sheen
```

Para el **estado 3**, el parche todavía pegado en la nariz por la mañana, manda la frase de la biblia y se copia literal:

```
the patch now opaque white in blotches with small pale-yellow dots where the pores were, still translucent at the edges
```

Y para el **estado 4**, el reverso del parche a medio quitar, también manda la biblia, porque ahí los tapones sí son bultos y sí se ven uno a uno:

```
the underside turned to the camera showing irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores
```

A contraluz la escarcha cambia de aspecto: se vuelve traslúcida y brilla como cristal esmerilado. Es bonito pero pierde contraste de blanco. Lo mejor es tener las dos tomas: una a contraluz (bonita) y otra sobre fondo oscuro (prueba).

```
backlit by a small frosted bathroom window, the sebum frost glowing translucent like frosted glass, rim light along the patch edges
```

### 3.5 La piel después

Los poros quedan **vacíos y planos**, sin tapón dentro. La piel queda **algo rosada y mate durante un minuto** (biblia). En pantalla, el cambio más visible no es que desaparezcan los puntos: es que **desaparece el brillo graso**.

Y aquí va el límite que no se cruza: **nunca se genera un "después" con cero filamentos en toda la cara**. Los filamentos sebáceos son fisiología normal y vuelven. En el propio antes/después de Vue siguen quedando puntos en el "después". Prometer cero es falso, trae devoluciones y reseñas malas.

La forma de escribirlo que respeta las dos cosas: contundente dentro del troquel, honesto fuera de él.

```
the pores are open, EMPTY and flat, no dark dots and no grey-brown plugs anywhere under where the patch was, the skin slightly pink and matte there, a few faint filaments still visible just outside the patch outline on the side of the nose and the alar crease, noticeably less oily shine on the nose tip
```

Y, como dice la regla 2 de la biblia, con palabras no basta: hay que adjuntar como segunda referencia una imagen ya generada de **esa misma nariz limpia**, porque si no el modelo conserva los puntos del retrato del avatar. La instrucción de la segunda referencia va literal como está en la biblia, sin suavizar, porque es lo que hace que el modelo obedezca:

```
The SECOND reference is her nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that second reference, open EMPTY pores, no dark dots.
```

### 3.6 La marca del adhesivo

Al quitar el parche queda un rastro y ese rastro es un detalle de veracidad barato que casi nadie pone. Lo que se ve, según la biblia: **la marca tenue del borde del parche**, es decir, una línea de contorno de mariposa un poco más pálida o un poco más rosada que el resto, que sigue exactamente el troquel; y la zona que estaba cubierta queda **mate**, mientras la piel de alrededor conserva su brillo. Es una diferencia de acabado, no de color. Dura lo mismo que el rosado: alrededor de un minuto.

Detalle añadido **sin verificar** (no está ni en las fotos inspeccionadas ni en la documentación de marca, es mi propuesta de dirección de arte): alguna fibra fina de la toalla o del pijama pegada al borde exterior del adhesivo. Se puede probar en una toma y, si añade suciedad visual, se quita.

```
a faint matte outline of the patch still printed on the skin, following the butterfly shape exactly, the covered area matte and very slightly pink while the surrounding skin keeps its natural shine
```

### 3.7 La piel grasa real

Lo que separa la piel real de la piel de plástico **no es el nivel de detalle, es el brillo desigual y la asimetría**. En las cuatro imágenes reales inspeccionadas el patrón es siempre el mismo: hay zonas de brillo (dorso y punta de la nariz, pómulos altos, arco de cupido, barbilla) y zonas mate (laterales de la mejilla, sienes), y el borde entre unas y otras es difuso pero visible. Además siempre hay pecas y micro-manchas asimétricas, algún granito o marca residual, vello velloso fino que se enciende a contraluz, poros más grandes en la zona T que en las mejillas, y rojez leve en el surco alar y alrededor de las fosas.

```
natural skin shine on the nose bridge, tip and cheekbones with matte temples; visible enlarged pores concentrated on the T-zone; freckles and small asymmetric marks; one or two small healing blemishes; fine vellus hair catching the light; slight redness in the alar crease; unretouched documentary realism, not a 3D render
```

```
no airbrushed skin, no uniform matte finish, no beauty filter, no symmetric pore pattern, no skin smoothing, no makeup
```

Lo que cambia de un avatar a otro (datos fijos de la biblia, más el matiz de piel de la investigación):

| Avatar | Edad | Brillo y textura | Filamentos | Marcas fijas que no cambian nunca | Ropa |
|---|---|---|---|---|---|
| Bea | 24 | Brillo marcado en zona T | Grises | Lunar bajo el pómulo izquierdo, dos granitos en curación en la barbilla, cero maquillaje, pinza negra mate, pendientes de botón dorados | Camiseta gris de canalé |
| Marisol | 43 | Textura más fina, brillo menos untuoso, líneas de expresión y surcos nasogenianos | Grises | Alguna cana en la sien, mancha solar en el pómulo, poros marcados en la nariz, aros de plata pequeños | Camiseta azul marino lisa |
| Álex | 36 | Piel olivácea, poros más grandes | Más amarillentos | Barba de tres días, cicatriz pequeña en la ceja derecha, rojez en las mejillas | Camiseta gris oscuro |

Para Álex, la figura clínica `gr1.jpg` es literalmente la foto de referencia (en ella la barba es de dos días; la de Álex es de tres, que es lo que fija la biblia).

### 3.8 La tira de poros usada, que es el contraejemplo

Hace falta describirla bien porque es la mitad del anuncio comparativo, y porque es justo lo que NOCTA no hace. Los "gusanos" son cilindros de queratina de 0,5 a 1,5 mm con cabeza oscura y cuerpo blanco-amarillento, que salen **perpendiculares** a la superficie de la tira, como un bosque de alfileres, no como manchas planas. Van más densos en la línea central. Con luz frontal se aplanan y no se ven: hace falta luz rasante desde abajo.

```
Vertical 9:16 extreme macro of a used white pore strip held between finger and thumb. A forest of tiny keratin plugs stands PERPENDICULAR to the strip surface: dark heads, pale yellow cylindrical bodies, 0.5 to 1.5 mm, densest along the centre line, a few fine vellus hairs pulled out with them. Raking side light from 45 degrees below so every plug casts its own tiny shadow. Apparent 100 mm macro, field of view 30 mm wide, shallow depth of field, bathroom background blurred. Real photography, no text, no logos, no watermark.
```

---

## 4. Los movimientos, uno a uno

Higgsfield por defecto acelera y dramatiza todo. Hay que escribir la duración y el modo dentro del prompt. Y si un plano sale acelerado, **no se arregla ralentizando en montaje**: el ralentizado delata la interpolación. Se regenera con la duración explícita.

### 4.0 Las dos tablas de consulta

Duraciones reales:

| Acción | Duración real | Origen del dato |
|---|---|---|
| Aplicar el parche | 2,5-3,5 s + 1 s de presión mantenida | Vue, "press firmly to seal" |
| Tiempo puesto | 6-8 h / toda la noche | Hero y Vue coinciden |
| Retirar el parche | 2-3 s, elástico, sin chasquido | Hero ("peel off slowly from one side") + vídeo real |
| Retirar tira de poros | 3-6 s, rígida, con 2-3 resistencias | Bioré Pore Strips 101 + macros verificados |
| Presentar el parche usado a cámara | 1,5-2 s | foto Vue + vídeos de creadoras |
| Packshot | 3 s con movimiento casi nulo | técnica de producto |
| Hablar a cámara antes del primer corte | 3-6 s | referencias UGC |

Geometría, que es lo que nadie escribe y lo que más cambia el resultado. Donde pone "sin dato" es que la investigación no lo midió: se elige y se anota, pero no se inventa aquí.

| Plano | Toma | Encuadre | Altura de cámara | Ángulo | Distancia | Lente equivalente | Duración |
|---|---|---|---|---|---|---|---|
| Macro de nariz | 3-4 | Del párpado inferior al labio superior; la nariz ocupa el 60% del alto | A la altura de la punta de la nariz | Tres cuartos, ligeramente contrapicado | 20 cm | 50-70 mm macro, campo 30-40 mm | 3 s casi fijo |
| Tira de poros usada | 5-6 | Macro de la tira entre dos dedos | Sin dato | Sin dato | Sin dato | 100 mm macro, campo 30 mm | 4-5 s |
| Poner el parche | 10 | De media frente a clavícula; la cara ocupa el 75% del ancho | A la altura de los ojos | Frontal exacto | 70 cm | 85 mm | 2,5-3,5 s + 1 s |
| Dormir con el parche | 12 | De la coronilla al hombro | A la altura de la almohada | Lateral | 60 cm | 50 mm | 3-5 s casi inmóvil |
| Despegar el parche | 13 | Sin dato | Sin dato | Sin dato | Sin dato | Sin dato | 2-3 s |
| Parche usado en la mano | 14 | El parche entero con aire por los cuatro lados, a la altura de la barbilla | Sin dato | Frontal | 30-35 cm (la cara detrás a 60-80 cm) | 85-100 mm a f/2.8 | 1,5-2 s |
| Antes/después | 15 | De la ceja al labio inferior, nariz centrada, un ojo completo en cuadro | Sin dato | Tres cuartos suave | 40 cm | 70-85 mm | Corte duro |
| Packshot | 15 alt. | La caja entera con aire abajo | Al tercio superior de la caja | Escorzo tres cuartos, 70/30 | Sin dato | 85-100 mm | 3 s |
| Hablar a cámara | 1-2 | Cabeza en el tercio superior y descentrada, corte por el pecho | A la altura del esternón | Contrapicado 10-15° | 35-50 cm | Cámara frontal de móvil | 3-6 s |
| Plano de espejo | 1-2 alt. | La cara y el móvil tapando la barbilla | A la altura del pecho | Frontal al espejo | 45 cm | 26 mm de móvil | 3-5 s |

### 4.1 Poner el parche

Las **dos manos**, los **dos dedos índice a la vez**, uno a cada lado del puente. Los índices bajan desde el centro del puente hacia las aletas, **en dos trayectorias simétricas hacia fuera y hacia abajo**. Los demás dedos quedan recogidos hacia abajo, sin puño cerrado. La yema **se aplana y palidece un poco** al presionar: ese blanqueo es el detalle que hace que la presión se lea. Ojos cerrados o mirando hacia abajo, **nunca a cámara mientras aplica**. Dos segundos y medio a tres y medio.

Con un solo dedo el gesto parece dubitativo y no parece de marca. Y la cámara: a la altura de los ojos, frontal, equivalente 85 mm a unos 70 cm. Con gran angular la nariz se agranda y el anuncio parece una caricatura.

```
Both index fingers press the patch down simultaneously from the centre of the nose bridge outwards over about three seconds, fingertips flattening and blanching slightly under the pressure, then hold firm pressure for one more second. The other fingers stay curled down. Eyes stay closed. Subtle handheld drift. No camera move, no zoom.
```

### 4.2 Presionar y sellar

Después del recorrido hacia fuera, **las yemas se quedan quietas un segundo entero** sobre las alas y luego doblan las alas contra las aletas. No hay rebote. El parche no se mueve. Si el modelo hace que los dedos reboten o resbalen, es que le has pedido una acción de más: una acción por plano.

```
The fingertips hold still for one full second, pressing the wings against the nostril wings, then lift straight away from the skin without sliding. The patch does not shift. No rebound, no second attempt.
```

### 4.3 Dormir con el parche

Este plano resuelve las 6-8 horas. La alternativa, un timelapse de la nariz, siempre canta. De lado sobre la almohada, cámara a la altura de la almohada, equivalente 50 mm a unos 60 cm. **Casi no hay movimiento**: la respiración mueve el hombro y la sábana muy poco, algún micro-gesto de la cara, y nada más. El parche coge un destello débil y queda un punto más claro que la piel.

La regla 3 de la biblia manda aquí: "de noche" no significa nada para el modelo, hay que describir las consecuencias de la luz. Una sola lámpara cálida encendida fuera de cuadro a 2800 K (la de la mesilla, o una farola por la persiana), sombras blandas y profundas, ventana negra. Y ningún espejo, ningún cristal y ningún grifo que devuelva la cara: en los planos de noche eso es la vía más rápida a un brazo de más o a una segunda persona en cuadro.

```
Almost still: only the slow rise and fall of breathing, one small twitch of the face, hair settling a millimetre on the pillow. The patch keeps a faint highlight. Nothing else moves. No camera move, no light change.
```

### 4.4 Despegar el parche

El movimiento clave de todo el proyecto y donde más se equivoca la IA.

**Qué mano hace qué**: el pulgar y el índice de una mano cogen **un ala** por su borde exterior. La otra mano no interviene, o como mucho apoya la mejilla. La tracción es **despacio y en paralelo a la piel**, nunca hacia arriba.

**Qué hace el material**: la parte ya despegada **se enrolla sobre sí misma y cuelga blanda**; la parte que sigue pegada permanece plana sobre la nariz. Hay **una sola frontera** entre las dos partes, que avanza por el eje de la nariz, y nunca puede quedar parche sobre una zona ya despegada. El parche se estira uno o dos milímetros porque es elástico.

**Qué NO hace la piel**: no se levanta, no se tensa, el contorno de la nariz no se deforma, no hay chasquido y no hay "pop". Si en tu plano la piel se levanta, estás vendiendo la tira de poros, o sea al competidor.

Dos a tres segundos de recorrido.

```
Slow, gentle peel over three seconds: thumb and index finger hold one wing of the patch and pull slowly PARALLEL to the skin, never upwards. The patch lifts as ONE CONTINUOUS SHEET along a single boundary running down the ridge of the nose; the peeled part stretches slightly, curls over on itself and hangs limp from the fingers; the part still attached stays flat and translucent on the nose. The skin does NOT lift or tent, the nose contour does not deform, there is no snap and no pop. Subtle handheld drift: slow low-frequency sway that lets the framing creep and recover, with tiny high-frequency jitter. No camera push-in, no speed ramp.
```

El contraste, para el anuncio comparativo. La tira es lo opuesto en todo:

```
Slow peel of a STIFF pore strip, four to five seconds. The strip resists: two or three micro-pauses where it grips and then releases. As it releases, the skin of the nostril wing visibly tents and stretches, a fold appears in the alar crease, and the skin is left flushed and red. Handheld phone camera with subtle drift. No snap, no fast rip, no speed ramp.
```

Nota de la biblia que ahorra dinero: si el despegado a medias no sale a la primera, se sustituye por el plano "parche ya fuera, sujeto delante de la nariz limpia", que es mucho más fácil de generar bien y además enseña las dos cosas a la vez. El anuncio no pierde nada.

### 4.5 Mirar el parche a contraluz

Las **dos manos** sujetan el parche por los dos extremos, ligeramente **tensado** (no colgando), a la altura de la barbilla, a unos 30-35 cm de cámara. Detrás, la cara desenfocada a 60-80 cm. Equivalente 85-100 mm a f/2.8.

El movimiento no es cero: el parche **vibra levemente con el micro-temblor de las manos**, 1 o 2 ciclos por segundo y amplitud de milímetros, y se comba un poco si se relaja la tensión. No se balancea. Si el brazo gira para llevar el parche hacia la ventana, el giro es lento y de pocos grados, y la escarcha cambia de traslúcida a opaca al pasar por el contraluz. Un segundo y medio a dos.

```
The patch is held stretched between two hands and trembles with the tiny natural shake of the hands, one to two hertz, millimetre amplitude, sagging slightly when the tension relaxes. The hands turn a few degrees towards the window so the sebum frost goes from opaque to glowing translucent. The face stays soft out of focus behind. No swinging, no camera move.
```

### 4.6 Tocarse la nariz después

Gesto pequeño y muy corto, uno o dos segundos. **La yema del índice o del corazón recorre el lateral del dorso de la nariz de arriba abajo**, una sola pasada, con presión mínima, y la mano sale de cuadro. A veces se repite en el otro lado. La cara no cambia de expresión hasta el final del gesto, y ahí sí: una media sonrisa o una subida de cejas muy pequeña. Si el modelo hace que la persona sonría durante todo el plano, el plano parece de catálogo.

Detalle que lo hace real y que es **sin verificar** (propuesta de dirección, no sale en ninguna referencia inspeccionada): al levantar el dedo, la yema queda un instante a la vista y está **limpia**, sin brillo graso. Es la prueba de que se ha ido el sebo, contada sin decir nada.

```
One fingertip slides once down the side of the nose bridge with almost no pressure, testing the skin, then the hand leaves the frame. The expression stays neutral until the very end of the gesture, when a small half-smile appears. Two seconds. No repeated rubbing, no camera move.
```

### 4.7 Hablar a cámara y la cámara en general

El UGC no se define por el grano ni por el ruido, se define por la **geometría**: cámara a 35-50 cm, a la altura del esternón mirando ligeramente hacia arriba (contrapicado de 10-15°), cabeza en el tercio superior del 9:16 y **descentrada**, corte por el pecho, algo de azulejo o techo arriba. Un brazo está ocupado sujetando el móvil, así que los gestos los hace **la otra mano**, entrando y saliendo de cuadro.

El temblor correcto tiene dos componentes: una **deriva lenta** con ciclo de 1 a 2 segundos, que descentra el encuadre y lo recupera, y un **micro-jitter** de alta frecuencia y amplitud diminuta. Los dos errores son igual de malos: cámara perfectamente fija (parece trípode) y bamboleo grande y rítmico (parece videojuego).

```
Natural talking head, front phone camera held at arm's length. Subtle handheld drift: the framing slowly creeps off-centre and is corrected, cycle of one to two seconds, plus tiny high-frequency jitter. The free hand enters and leaves the frame while gesturing. Natural blinking, small head movements, weight shifting. No camera push-in, no gimbal smoothness, no slow motion.
```

Y el packshot, que es el único plano donde conviene movimiento casi nulo:

```
Almost still. A very slow three-degree rotation of the box over three seconds, or a two percent push-in. The shadow moves with it. Nothing else in the frame moves. No parallax pop, no light flicker, no lens flare.
```

---

## 5. Cómo se convierte una referencia en un prompt

### 5.1 Los seis pasos

Se hace mirando la imagen, no de memoria. La diferencia entre escribir el prompt con la referencia delante y escribirlo de oído es enorme: en la investigación, tres decisiones importantes del proyecto cambiaron solo por descargar las imágenes y mirarlas.

**Paso 1. Elige una sola referencia por plano.** No se mezclan dos. Si mezclas, el prompt sale contradictorio y el modelo elige por su cuenta.

**Paso 2. Escribe la geometría antes que nada.** Cinco datos, los de la tabla de 4.0: qué entra y qué sale del cuadro, altura de la cámara, ángulo, distancia y lente aparente. Son los que más cambian el resultado y los que nadie escribe.

**Paso 3. Escribe la luz por sus consecuencias, no por su nombre.** No "luz de baño" sino dónde está la fuente, si es dura o blanda, dónde caen las sombras y dónde está el brillo especular. Es la regla 3 de la biblia.

**Paso 4. Describe el material y la textura con palabras físicas.** Opaco o traslúcido, satinado o mate, granular o liso, en relieve o plano, milímetros. Nada de adjetivos de venta: repasa la lista de palabras prohibidas del punto 1.

**Paso 5. Quita todo lo que en la referencia sea de otra marca.** Texto sobreimpreso, silueta de parche ajena, packaging ajeno. Y adjunta las fotos reales de NOCTA.

**Paso 6. Cierra con los negativos y con `No text, no logos, no watermark.`** Siempre, en los 15 planos.

### 5.2 El protocolo de antes/después

Esto no es un prompt, es un procedimiento, y es donde se gana o se pierde la credibilidad del anuncio.

1. Se genera **solo el "antes"**.
2. El "después" se **deriva** de él por img2img, con la misma semilla y el mismo encuadre, cambiando únicamente la línea de la piel.
3. Tienen que coincidir exactamente: distancia, altura de cámara, ángulo de la cabeza, dirección de la luz, temperatura de color, brillo especular en la punta, expresión y fondo. Si el "después" sale más cálido o más brillante, el espectador lo lee como maquillaje y se pierde la venta.
4. Lo único que cambia es la densidad de filamentos (de alta a media-baja, **nunca a cero**) y algo menos de brillo graso.
5. En montaje, el corte duro y el tempo del GIF de Vue.

Las dos líneas, que son idénticas salvo en el trozo de la piel:

```
ANTES: ...dense field of greyish-brown sebaceous filaments on the nostril wings and the side of the bridge, oily shine on the nose tip...
```

```
DESPUÉS: ...noticeably fewer and fainter sebaceous filaments on the nostril wings, still a few remaining, less oily shine on the nose tip...
```

Encuadre canónico de los dos: de la ceja al labio inferior, nariz centrada, un ojo completo en cuadro, tres cuartos suave, equivalente 80 mm a 40 cm.

### 5.3 Ejemplo completo, de la referencia al prompt

**La referencia**: `https://www.vueskin.com/cdn/shop/files/Dirty_Patch.jpg`, la foto oficial del parche usado de Vue.

**El prompt de partida, el que sale de leer la biblia sin mirar la foto** (así estaba escrita la toma 14, "el parche usado a contraluz con los puntos blancos"):

```
Vertical 9:16 photo of a used hydrocolloid nose patch held up to the light, with white dots where the pores were, bathroom background.
```

Problemas: pide `white dots`, no dice encuadre, no dice distancia, no dice lente, no dice qué hay detrás ni a qué profundidad, no dice de qué color es el material, no prohíbe el texto y no lleva referencias de producto. Con esto el modelo devuelve un parche opaco de forma inventada con lunares blancos de dibujo.

**Lo que se ve al abrir la foto y mirarla de verdad** (esta es la lista de observaciones, pasos 2 a 4):

- Vertical 4:5. El parche está a la altura de la barbilla, ocupa el tercio central.
- Lo sujetan **dos manos**, pulgar e índice de cada una, por los dos extremos, **ligeramente tensado**.
- Distancia a cámara 30-35 cm. La cara está detrás a 60-80 cm, **desenfocada**: solo se reconocen boca y nariz, los ojos quedan fuera de cuadro.
- Lente aparente 85-100 mm a f/2.8. Profundidad de campo cortísima.
- El material es **gris perla translúcido con brillo satinado**.
- El sebo es una **escarcha granular continua**, densa en el centro, disgregándose hacia los bordes, opaca donde está cargada, con algún grumo grueso.
- Fondo oscuro (pelo y camiseta negra) que hace que el blanco recorte.
- Luz suave frontal-lateral.

**El prompt final, adaptado a NOCTA** (silueta de mariposa con muesca, no borde festoneado; geometría literal de la biblia; y con las fotos reales adjuntas):

```
Vertical 9:16 handheld iPhone photograph. STATE 5: the patch is OFF the nose and in her hands; there is NO patch on her nose.

The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape. A single piece of translucent matte hydrocolloid, 60 mm wide and 45 mm tall, shaped like a wide butterfly: one central lobe that covers the bridge from the middle of the nose down over the tip, and two symmetrical wings 23 mm deep that spread sideways and downwards to wrap the nostril wings; between the wings the lower edge has a shallow rounded notch about 6 mm deep where the columella is; every corner rounded with a 2 mm radius; the material is 0.55 mm thick with a bevelled edge.

Two hands hold the used patch by its two ends, slightly stretched, at chin height, 30 cm from the camera. Dense powdery white frost covers the centre of the patch — like fine icing sugar, granular and continuous where it sat on the nose bridge and tip, breaking into fine speckle towards the edges, fully opaque where it is loaded, a few coarser clumps, the edges still translucent pearl-grey with a satin sheen.

COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance.

Behind, a 24-year-old Spanish woman's face is blurred well out of focus 70 cm away, only mouth and nose recognisable, eyes out of frame. Dark background: dark hair and a dark grey ribbed t-shirt, so the white frost reads.

Small Spanish apartment bathroom, white subway tile, soft morning window light from camera-left, overhead lights off. Apparent 90 mm lens at f/2.8, very shallow depth of field, focus exactly on the surface of the patch, slight handheld motion blur at the edges, natural digital sensor noise.

No beauty retouching, no skin smoothing, no makeup, unretouched documentary realism. No text, no logos, no watermark.
```

Referencias adjuntas: `parche_liner`, `parche_puesto`, y el retrato de Bea.

Y el prompt de vídeo del mismo plano:

```
The image comes alive. The patch trembles with the tiny natural shake of the hands, one to two hertz, millimetre amplitude, sagging slightly when the tension relaxes. Static handheld camera with micro-drift. Three seconds. The woman's face and the patch must not change shape; the frost pattern must not move or animate. No text, no subtitles, no watermark.
```

El prompt final no tiene ni un adjetivo de venta y tiene doce datos físicos que antes no estaban. Eso es todo el método.

---

## 6. Qué NO copiar de lo que hay por ahí

**Los vídeos de tiras de poros arrancando "gusanos".** Son los vídeos más vistos del sector y son exactamente lo que NOCTA no vende. El "bosque de tapones" bajo microscopio es espectacular, sí, pero es la prueba de que la tira **arranca**, y nuestro producto **absorbe**. Se puede usar en el anuncio comparativo, y solo ahí, y siempre con la consecuencia visible: piel tensada, pliegue en el surco alar, rojez al terminar. Si lo copias en el plano del parche, has rodado un anuncio del competidor.

**Los antes/después falsos.** El antes/después oficial de Vue (`Before_and_After_3.jpg`) es un manual de cómo no hacerlo: en el "antes" la cara está más frontal y en el "después" más girada, el "antes" tiene una dominante verdosa y fría y el "después" es cálido y rosado, y el "después" añade un brillo especular grande en la punta que el "antes" no tenía. Se lee como truco. Lo único copiable de esa imagen es el encuadre (de la ceja al labio inferior, nariz centrada, un ojo completo en cuadro, tres cuartos suave) y el ritmo del GIF de transición. El procedimiento correcto está en 5.2.

**Los primeros planos de plástico.** Casi todas las imágenes de "skincare" que devuelve un buscador son piel retocada: mate uniforme, poros borrados, cero asimetría. Copiar esa iluminación (fuente grande y difusa, luz envolvente) es lo que hace que los filamentos desaparezcan y la piel se plastifique. La regla operativa está en 2.4: al menos un plano de cada anuncio lleva fuente pequeña y dura desde la posición de cámara, o luz rasante a 45° por debajo.

**El baño de Pinterest americano.** Mármol, bañera exenta, plantas colgantes, luz de estudio. El público español lo detecta al segundo. El baño de NOCTA es pequeño, con azulejo blanco tipo metro, grifo cromado, ventanuco alto de vidrio mate con carpintería de aluminio, toalla de rizo colgada y espejo sin marco. Ojo: la prohibición del mármol es **solo en el baño**; sobre mesa, para packshot, la biblia lo admite (ver 8.5).

**El texto de las referencias.** Varias de las imágenes citadas llevan texto sobreimpreso de marca. Si se pasan como referencia, el modelo imita el texto. No se pasan; se leen y se describen.

**La dermatoscopia.** A ×20 los filamentos son cúpulas amarillas en retícula regular y la piel parece alienígena. No vende, asusta. Como mucho, medio segundo en un plano de "prueba científica".

**La silueta de los parches ajenos.** Redondos en el blíster de Vue, estrellas en Starface, festoneados en los parches puestos de Vue. Ver la tabla de 2.9.

---

## 7. Tabla: lo que la IA se inventa mal

Esta es la tabla de consulta rápida. Columna izquierda: lo que aparece en la imagen generada. Columna derecha: la frase exacta que lo arregla, lista para pegar.

| Lo que se inventa | Por qué está mal | La frase que lo arregla |
|---|---|---|
| Puntos blancos redondos en el parche usado, visto de frente | La foto real muestra escarcha granular continua, no lunares | `dense powdery white frost like fine icing sugar, granular and continuous in the centre, breaking into fine speckle towards the edges, opaque where loaded` |
| Puntos negros de carbón en la nariz | El filamento es gris-pardo amarillento, no negro | `greyish-brown to pale yellow raised plugs, not black dots` |
| Poros repartidos en rejilla | Delata el render al instante | `pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid` |
| Piel lisa sin textura en el macro | La luz que pediste es demasiado suave | `small hard light source from the camera position creating a continuous specular sheen along the nose bridge and tip, so every filament catches its own micro-highlight` |
| El parche puesto no se ve | Es traslúcido y el modelo lo hace invisible | `a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin` |
| El parche sale como mancha amorfa | Las palabras no bastan | Adjuntar `parche_puesto` + `Do not invent a different shape` + la geometría literal de la biblia (60x45 mm, alas de 23 mm, muesca de 6 mm, esquinas de 2 mm, 0,55 mm de grosor) |
| El parche sale recortado por el borde | El modelo lo pega al margen | `COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped` |
| Dos parches separados al despegar | Pediste "mitad izquierda / mitad derecha" | `peeling off in ONE CONTINUOUS SHEET ... WITHOUT ANY BREAK it lifts along one single boundary down the ridge` |
| El despegado va rápido y con chasquido | Higgsfield dramatiza por defecto | `slow gentle peel over three seconds, no snap, no pop, no speed ramp` |
| La piel se levanta al despegar el parche | Eso es la tira de poros, no el parche | `the skin does NOT lift or tent, the nose contour does not deform` |
| La tira de poros se despega suave | Es rígida y tensa la piel | `STIFF strip, four to five seconds, two or three micro-pauses, the skin tents and stretches, left flushed and red` |
| Los tapones de la tira salen como manchas planas | Salen perpendiculares, como alfileres | `a forest of tiny keratin plugs standing PERPENDICULAR to the strip surface, dark heads and pale yellow bodies, 0.5 to 1.5 mm, densest along the centre line` + `raking side light from 45 degrees below` |
| Nariz "después" todavía con puntos | El retrato del avatar los tiene | Segunda referencia con la nariz limpia + `open EMPTY pores, no dark dots and no grey-brown plugs anywhere under where the patch was` |
| Nariz "después" con cero poros en toda la cara | Es falso y es riesgo comercial | `a few faint filaments still visible just outside the patch outline on the side of the nose and the alar crease, noticeably less oily shine` |
| Anuncio "de noche" que parece de día | "Night" no significa nada para el modelo | `IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, short hard shadows straight down under the brow, nose and lower lip, the tops of the cheekbones are bright and the eye sockets are dark, and the window behind is pure black. No daylight, no soft window light, no blue sky` |
| Un brazo de más o una segunda persona de noche | Hay una superficie que refleja a la persona | Quitar espejo, cristal y grifo del encuadre y añadir `no mirrors, no reflections, no reflective surfaces` (regla 3 de la biblia) |
| Nariz agrandada, cara de caricatura | Gran angular o cámara demasiado cerca | `apparent 85mm lens at 70cm, camera at eye level, no wide-angle distortion` |
| Aplicación con un solo dedo | La referencia real usa los dos índices | `both index fingers press simultaneously from the centre of the bridge outwards, the other fingers curled down` |
| Cámara perfectamente fija en UGC | Parece trípode, no móvil | `subtle handheld drift: slow low-frequency sway that lets the framing creep and recover, plus tiny high-frequency jitter` |
| Bamboleo grande y rítmico | Parece videojuego | `no rhythmic bobbing, no camera push-in, no gimbal smoothness` |
| Encuadre centrado y simétrico | El UGC real es asimétrico | `head in the upper third of the frame, off-centre, cut at the chest, slightly imperfect framing, 10-degree low angle` |
| Baño de revista americana | El público español lo detecta | `small Spanish apartment bathroom, white subway tile, chromed tap, small high frosted window with a white aluminium frame, terry towel on a hook, frameless mirror` + negativo `no marble, no freestanding bathtub, no hanging plants, no studio lighting` |
| La caja levita en el packshot | Falta la sombra de contacto | `short shadow falling back-right about one third of the box height, soft-edged, with a darker contact shadow right under the bottom edge` |
| El packshot se mueve demasiado | Delata la animación | `almost still, a very slow three-degree rotation over three seconds` |
| Texto, logos o subtítulos inventados | El modelo imita las referencias con texto | `No text, no logos, no watermark.` en TODOS los prompts |
| Piel de estudio aunque pidas "detallada" | El detalle no da realismo, el brillo desigual sí | `natural shine on the nose bridge, tip and cheekbones with matte temples` + `no airbrushed skin, no uniform matte finish, no beauty filter` |
| El plano parece publicidad, no móvil | Se ha colado una palabra prohibida | Borrar `8k`, `hyperrealistic`, `cinematic`, `dramatic lighting`, `professional photography`, `perfect skin`, `flawless`, `glowing`, `studio`, `HDR`, `award-winning` |
| La luz cambia de lado entre planos | Rompe el montaje aunque nadie sepa por qué | Fijar la dirección de la ventana al escribir la toma 1 y repetirla literal en las 15 |

---

## 8. Contradicciones con la biblia, ya resueltas

La biblia está escrita a partir de lo que salió generando; la investigación está hecha a partir de fotos reales. En seis puntos no dicen lo mismo. **No hay nada que decidir aquí**: la regla de desempate es la de abajo y ya está aplicada en todo el documento. Lo único que queda para el dueño son los tres avisos del final.

**Regla de desempate.** Si la biblia trae una frase de prompt entrecomillada, esa frase está comprobada generando y **gana**: se copia literal. Si la biblia solo lo cuenta en prosa y una foto real inspeccionada dice otra cosa, gana la foto.

**1. Los "puntitos blancos y amarillentos" del parche usado.** Resuelto por estados, y las dos cosas son ciertas en planos distintos. La biblia tiene frase comprobada para el estado 3 (parche todavía en la nariz: `opaque white in blotches with small pale-yellow dots`) y para el estado 4 (reverso a medio quitar: `milky-white islands studded with... domes`); las dos ganan y se copian literales. Para el estado 5, el parche fuera y visto de frente en la mano, la biblia no tiene ninguna frase comprobada, así que manda la foto de Vue: es escarcha granular, no puntos. Todo esto está en 3.4.

**2. La piel al despegar.** La biblia dice en prosa "la piel se levanta un instante en esa frontera y vuelve", pero ninguna de sus frases comprobadas lo dice: la de la regla 5 describe el despegado entero sin mencionar la piel. El vídeo real confirma que con hidrocoloide la piel **no** se levanta. Gana la foto: esa frase no entra en ningún prompt de vídeo, porque es literalmente el argumento del competidor.

**3. El "después" con cero puntos.** La biblia tiene frase comprobada (`NO dark dots and NO grey-brown plugs anywhere`) y gana **dentro del troquel**, porque es la contundencia que hace que el modelo obedezca; se mantiene literal en la instrucción de la segunda referencia. Fuera del troquel se añade la cláusula de los filamentos tenues, que no contradice nada porque el parche no cubre esa zona. Redacción final en 3.5.

**4. Acabado del material.** La biblia dice hidrocoloide "traslúcido mate"; la foto de Vue muestra brillo satinado y una línea de especular en el borde. No es contradicción: el cuerpo del parche es mate y el **borde biselado** es el que brilla. Se escribe así en todos los prompts para que el troquel se lea.

**5. Mármol.** La biblia admite "mesa de mármol crema" para los packshots y gana: para packshot sobre mesa el mármol crema vale. La prohibición de la investigación se aplica **solo al baño**, que es donde canta a Pinterest americano. El fondo crema infinito sin línea de horizonte es la alternativa, no la sustituye.

**6. Reflejos en los planos de noche.** La versión 1.0 de este documento llevaba en la tabla de la sección 7 la frase `the window behind is pure black with the tiles reflected in it`. La regla 3 de la biblia prohíbe expresamente los reflejos de noche: "ni la ventana con los azulejos reflejados, ni espejos, ni el grifo devolviendo la cara", porque toda superficie que refleja a una persona es la vía más rápida a un brazo de más. Gana la biblia: la frase ya está corregida en 4.3 y en la sección 7.

### Lo único que tiene que decidir el dueño

- **El nombre de la toma 14 en el guion.** La biblia la llama "el parche usado a contraluz con los puntos blancos". Si se deja así escrito, quien monte los prompts pedirá `white dots` y el plano se caerá. Propuesta: "el parche usado, con la escarcha blanca, sobre fondo oscuro", más una variante a contraluz. Hay que cambiarlo en la biblia y en las 25 tandas.
- **La línea de la biblia sobre la piel que se levanta.** Está en "Cómo se quita" y es falsa. Hay que corregirla en la biblia para que no vuelva a colarse en un prompt.
- **Prometer o no prometer cero puntos.** El punto 3 de arriba es una decisión comercial, no visual: cero es más vendedor y es falso; "menos, más limpio, menos brillo" es honesto y coincide con lo que se ve en el propio antes/después de Vue. Este documento asume lo segundo. Si se decide lo primero, hay que asumir devoluciones y reseñas.

---

## 9. Comprobación de 60 segundos antes de dar por buena una toma

- ¿El parche coincide con las fotos reales de NOCTA, con su muesca y su borde biselado, o es una mancha?
- ¿La imagen está en **un solo** estado de los cinco?
- ¿Se ve el parche, o se ha vuelto invisible y parece que se está apretando la nariz?
- ¿Los poros están desordenados o en rejilla?
- ¿Hay brillo especular en algún sitio de la cara, y hay zonas mate?
- ¿Los filamentos están en las aletas, y no repartidos por todo el dorso?
- ¿La luz viene del mismo lado que en el resto de las tomas del anuncio?
- Si es de noche, ¿parece de noche por las sombras, o solo porque lo pusiste en el prompt?
- Si es de noche, ¿hay algún espejo, cristal o grifo que devuelva la cara? Si lo hay, se tira.
- ¿Cuántas manos y cuántos dedos hay en cuadro? Se cuentan.
- ¿Hay texto, logos o marcas de agua? Si hay, se tira.
- Si hay antes/después, ¿coinciden distancia, ángulo, temperatura y brillo, y lo único que cambia es la piel?
- ¿Queda aire abajo en el 9:16 para los subtítulos?
- ¿Se ha colado alguna palabra prohibida en el prompt?
- En vídeo: ¿una sola acción, la duración correcta y una deriva de mano que no sea ni cero ni un bamboleo?
