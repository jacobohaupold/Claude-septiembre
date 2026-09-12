# FOTORREALISMO CON GPT IMAGE 2.5

**Por qué una imagen parece foto y otra parece render.**

**Versión 1.0 · 12 de septiembre de 2026 · NOCTA · dirección de arte**

De dónde salen los datos de este manual, para que sepas qué peso tiene cada afirmación:

- **La biblia visual de NOCTA** (`ads/in/biblia.md`): reglas sacadas de generar 22 imágenes de verdad con GPT Image 2.5, variante flare. Es lo único que está probado en nuestro producto. Cuando algo viene de ahí, lo digo.
- **La investigación de fotorrealismo** (`wf/inv_gpt-image-fotorrealismo.json`): fuentes externas con enlace (fal.ai, Hedra, prompt-architects, documentación de OpenAI, dpreview) y los ficheros internos del propio Higgsfield (`ugc-board.md`, `ugc-character.md`, workflows `character-sheet` y `ugc-review-video`), leídos desde su MCP.
- **La API de Higgsfield consultada en esta sesión** (`models_explore`, 12/09/2026): los parámetros reales de `gpt_image_2_5`, `gpt_image_2` y `soul_2`. Cuando doy un parámetro, sale de ahí.
- Lo que no está verificado lo marco como **sin verificar**. No hay ni un precio ni un nombre de modelo inventado en este documento.

Este manual es para ti, que generas las imágenes. No genera nada: te dice qué escribir, qué adjuntar y qué mirar antes de dar una imagen por buena.

---

## Índice

1. [Las once señales que delatan una imagen de IA](#1-las-once-señales-que-delatan-una-imagen-de-ia)
2. [La fórmula de prompt, hueco por hueco](#2-la-fórmula-de-prompt-hueco-por-hueco)
3. [Las palabras que funcionan y las palabras prohibidas](#3-las-palabras-que-funcionan-y-las-palabras-prohibidas)
4. [Cómo se pide una cámara: móvil en mano contra estudio](#4-cómo-se-pide-una-cámara-móvil-en-mano-contra-estudio)
5. [Referencias: el apartado que más imágenes salva](#5-referencias-el-apartado-que-más-imágenes-salva)
6. [Ajustes: proporción, resolución, calidad y coste](#6-ajustes-proporción-resolución-calidad-y-coste)
7. [Lo aprendido generando 22 imágenes de verdad](#7-lo-aprendido-generando-22-imágenes-de-verdad)
8. [Protocolo de revisión](#8-protocolo-de-revisión)
9. [Anexo A: bloques listos para pegar](#anexo-a-bloques-listos-para-pegar)
10. [Anexo B: los veinte errores que cuestan una regeneración](#anexo-b-los-veinte-errores-que-cuestan-una-regeneración)

---

## 1. Las once señales que delatan una imagen de IA

Nadie mira una imagen y piensa "esto tiene el bloque de piel mal escrito". Lo que pasa es que el ojo detecta media docena de cosas a la vez y la imagen se lee como falsa en menos de un segundo. Estas son las señales, ordenadas por lo que más daño hacen en nuestros anuncios, con la causa que las provoca **dentro del prompt** y la frase que las arregla.

### 1.1 Piel de plástico

**Qué se ve.** La cara parece de cera. No hay poro, no hay vello, el tono es uniforme, la luz resbala sin agarrarse a nada.

**Qué lo provoca.** Las palabras de calidad. Está confirmado por fuente directa, no es superstición: `8k`, `hyperrealistic`, `ultra-realistic`, `cinematic`, `masterpiece`, `ultra-detailed` activan el modo estético del modelo, que es literalmente sobreafilado, sobresaturación, bloom y piel glaseada. Textual de la fuente: «On GPT Image 2 Medium, 8K, ultra-realistic, hyperrealistic, cinematic and masterpiece all push toward fake» y «Stacking hype keywords usually makes images look more fake, not less» (hedra.com, medium.com/@mericreativAI). A eso se suma el vocabulario de belleza: `glowing skin`, `flawless skin`, `radiant complexion`, `perfect skin`, que Higgsfield tiene en prohibición explícita en `ugc-character.md`.

**Qué lo arregla.** Sustituir valoración por mecanismo. «'Realistic skin texture' tells the AI more than '8K'». La piel se pide por lo que hace la luz sobre ella, no por lo bonita que es:

```
Real unretouched skin: visible pores across the nose, cheeks and forehead, fine vellus hair catching the light along the jaw and the upper lip, natural sebum shine concentrated on the nose bridge and the forehead while the cheeks stay matte — the shine a genuinely oily T-zone has at the end of the day. Uneven tone with faint pink around the nostrils, two or three small moles, faint fine lines at the outer corners of the eyes, faint honest under-eye shadows, one small healing spot. No makeup, no foundation. No digital smoothing, no beauty filter, no airbrushing, no plastic skin, no glossy retouched finish, no glow.
```

### 1.2 Poros en cuadrícula

**Qué se ve.** En el macro, los poros están repartidos como los agujeros de una rejilla: mismo tamaño, misma distancia, alineados en filas. El ojo lo lee como textura 3D procedimental, no como piel.

**Qué lo provoca.** No es una palabra concreta: es el comportamiento por defecto del modelo cuando le pides "visible pores" sin más. Comprobado generando en NOCTA.

**Qué lo arregla.** Describir la distribución, no el elemento. Esta frase va en **toda** macro de piel:

```
pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced
```

Y cerrar el prompt con `unretouched documentary realism, not a 3D render`.

### 1.3 Simetría de modelo

**Qué se ve.** Una cara perfectamente equilibrada, las dos mitades iguales, rasgos de catálogo. En Marisol (43) es lo que la convierte instantáneamente en "señora de banco de imágenes".

**Qué lo provoca.** Dos fuentes. La obvia: `beautiful woman`, `attractive`, `model`. Y una menos obvia: el *Beauty Floor* de Higgsfield (`ugc-character.md`) incluye por defecto «with high model facial features, symmetrical features, well-proportioned figure». Si copias ese bloque entero, te llevas `symmetrical features` dentro, que es exactamente la palanca que produce cara de IA.

**Qué lo arregla.** Borrar `symmetrical features` y `high model facial features`, dejar `well-proportioned`, y añadir asimetría explícita:

```
faint natural facial asymmetry, one eyebrow slightly higher than the other, faint asymmetry to the smile, natural uneven tone across the cheeks
```

Para Marisol, además: `mature adult bone structure, longer facial thirds, visible nasolabial folds, crow's feet, slightly crepey skin under the eyes` y la negativa `no babyface`. Para Bea (24), imperfección joven, no envejecimiento: `one small healing spot on the chin, faint under-eye shadows`.

### 1.4 Luz imposible

**Qué se ve.** Sombras que no salen de ninguna parte. Una cara iluminada por delante en un baño donde la única lámpara está en el techo. Un "de noche" que parece mediodía. O el clásico: todo bañado en naranja cálido.

**Qué lo provoca.** Tres cosas. Primera, no decir de dónde viene la luz: `natural light` no es una instrucción, es un deseo. Segunda, nombrar la hora sin nombrar el efecto: «night bathroom, 23:30» da una imagen de día, comprobado en NOCTA. Tercera, la hora dorada: Higgsfield la prohíbe con la razón explicada — «These tones make the persona look like a stock-photo ad, not a real creator».

**Qué lo arregla.** Una sola fuente motivada, con dirección, tamaño y dureza, y las consecuencias descritas:

```
IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are bright and the eye sockets are dark, and the window behind is pure black with the tiles reflected in it. No daylight, no soft window light, no blue sky.
```

### 1.5 Bokeh de estudio

**Qué se ve.** El fondo fundido en un puré cremoso detrás de un sujeto recortadísimo. Es el delator número uno, porque un móvil solo consigue eso simulándolo con Modo Retrato.

**Qué lo provoca.** `bokeh`, `shallow depth of field`, `minimal depth of field`, `soft subtle separation`, `cinematic`, `portrait mode`.

**Qué lo arregla.** Foco profundo por defecto, con la razón física dicha en el prompt:

```
deep focus — the background stays sharp, the way any phone photo looks
```

**Excepción importante y contraintuitiva: el macro.** La regla "no bokeh" es falsa para el macro de nariz. Un macro real de iPhone se hace con el ultra gran angular (13 mm f/2.2) a unos 3 cm, y ahí la profundidad de campo real son 2-3 milímetros: la punta está nítida y el ala de la nariz ya no. Si le pides foco profundo a un macro, sale una lámina médica. En los macros se escribe lo contrario y se **borra** de la cola negativa `no shallow depth of field, no bokeh`:

```
iPhone ultra-wide camera in macro mode, lens about 3 cm from the skin, only two or three millimetres of the nose in sharp focus, the near edge of the nostril and the far cheek falling out of focus fast — the razor-thin depth of field of a real phone macro, slight barrel distortion at the frame edges
```

### 1.6 Ojos demasiado limpios

**Qué se ve.** Iris que brillan solos, un reflejo blanco enorme y perfectamente redondo en cada ojo, color saturado. Es una señal que casi nadie corrige y que se nota muchísimo.

**Qué lo provoca.** El modo estético otra vez, más cualquier palabra tipo `sparkling eyes`, `bright eyes`.

**Qué lo arregla.** Una línea que viene del módulo antislop de Higgsfield (`character-sheet`, preset `photoreal-unretouched`):

```
naturally muted catchlights, no oversized specular glare in the iris, eye colour muted rather than glowing
```

### 1.7 Grano de película donde debería haber ruido digital

**Qué se ve.** Un grano bonito, orgánico, tipo carrete. Precioso y falso: un móvil no hace eso.

**Qué lo provoca.** El consejo clásico de "usa lenguaje de película": `Kodak Gold 200`, `35mm film`, `halation`, `fine grain`. Ese consejo sirve para que parezca una foto de carrete, no una foto de móvil. Son dos looks distintos y contradictorios.

**Qué lo arregla.** Léxico digital, textual de `ugc-board.md`:

```
digital smartphone sharpness, mild HDR flattening, slight highlight clipping at windows, faint digital noise in the shadows (digital noise, never film grain)
```

### 1.8 Composición de anuncio

**Qué se ve.** Sujeto centrado, a la altura de los ojos, frontal, con aire simétrico alrededor. Eso no lo hace nadie con el móvil en la mano.

**Qué lo provoca.** `centered composition at eye-level`, `straight-on`, `well composed`, y también no decir nada (el modelo centra por defecto).

**Qué lo arregla.**

```
framing slightly off-centre, slight natural tilt, casual handheld framing, not composed, not centred, captured mid-moment
```

En algunos planos: `the top of the head slightly cut by the frame`.

### 1.9 Cara de anuncio

**Qué se ve.** Sonrisa cálida mirando al objetivo. Higgsfield lo llama "aware-of-camera mimic" y lo prohíbe: `warm smile at the camera`, `looking at the camera with a smile`, `direct eye contact with the camera and a confident smile`.

**Qué lo arregla.** Elegir **una** expresión de esta lista cerrada y solo una:

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

Regla de cuerpo, que va con esto: la energía de "pillado a medias" vive en la **cara**. El **cuerpo** se queda quieto y normal: de pie relajado, peso en una cadera, una mano apoyada, cabeza recta. Las poses creativas son una apuesta anatómica: los brazos extendidos se deforman y las manos en escorzo crían dedos. Nunca una mano lanzada hacia el objetivo, nunca saltos, nunca contrapicado dominante, nunca enmarcarse la cara con las manos.

### 1.10 El producto que muta

**Qué se ve.** El parche es una mancha amorfa. La caja cambia de color entre el plano 7 y el 15. El logotipo se convierte en garabato. El parche mide como una tirita de rodilla.

**Qué lo provoca.** Describir el producto con palabras y confiar. No funciona. Se trata en el apartado 5, que es el más importante de este manual.

### 1.11 Texto fantasma y manos duplicadas

**Qué se ve.** Una marca de agua inventada en una esquina. Subtítulos que nadie pidió. Una etiqueta con letras sin sentido en el bote de champú. Un tercer brazo en el espejo.

**Qué lo provoca.** GPT Image no tiene campo de prompt negativo: las exclusiones van dentro del prompt. Si no las pones, el modelo rellena. Y el espejo es un generador industrial de manos de más: «mirrors spawn extra hands and duplicated bodies» (`ugc-board.md`).

**Qué lo arregla.** La cola negativa completa del Anexo A, en las 375 imágenes, sin saltarse ninguna. Y sacar el espejo de cuadro: o está fuera, o la cámara está **donde** estaría el espejo (el móvil apoyado en el estante), o entra solo un trozo desenfocado en el borde sin reflejo de persona.

---

## 2. La fórmula de prompt, hueco por hueco

El orden importa: los modelos de imagen pesan más los primeros tokens. Composición e identidad van delante; la cola de calidad va al final. Un párrafo, separado por comas, en este orden.

| Hueco | Qué va | Por qué va ahí |
|---|---|---|
| 0 | Referencias y estado del parche | Lo primero que lee el modelo es lo que más respeta |
| 1 | Captura | Fija el tipo de imagen antes de describir nada |
| 2 | Sujeto y encuadre | Identidad y banda de distancia |
| 3 | Detalle físico concreto | Lo que hace que parezca piel y no material |
| 4 | Acción | Una sola |
| 5 | Luz y sitio | Una fuente, con dirección y consecuencias |
| 6 | Óptica | Profundidad de campo y ruido |
| 7 | Anti-retoque | Desactiva el modo estético |
| 8 | Prohibiciones | Lo que no puede aparecer |

### Hueco 0 — Referencias y estado

Declara qué imagen es cuál y en cuál de los cinco estados del parche está esta toma. Escribir el número de estado al principio evita el error más caro de todos: una imagen que mezcla el estado 4 y el 5 (parche en la mano y a la vez pegado en la nariz) no sirve y hay que repetirla.

Los cinco estados, y cada imagen está en uno solo:

1. **Sin parche**: poros llenos, filamentos oscuros visibles, brillo.
2. **Parche recién puesto**: traslúcido, casi invisible salvo el borde, nariz igual de llena por debajo.
3. **Parche saturado**: blanco a manchas sobre la nariz, por la mañana.
4. **A medio quitar**: un ala despegada y enrollada, el resto pegado y plano, una sola frontera, y la piel ya al aire LIMPIA.
5. **Fuera**: el parche en la mano con las manchas blancas y los tapones; la nariz limpia, sin puntos oscuros.

### Hueco 1 — Captura

Dos opciones, nada más:

```
Vertical 9:16 handheld iPhone photo
```

```
Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld
```

Y dentro de este hueco, siempre, la frase que más cambia el registro de toda la fórmula. Cambia más que veinte adjetivos:

```
This is a casual photo from a real person's camera roll, the kind that gets posted to a TikTok slideshow — not an advertising image, not a product shoot, not a magazine photo.
```

### Hueco 2 — Sujeto y encuadre

Quién, qué parte del cuerpo llena el cuadro y a qué distancia. La distancia se **declara explícitamente** con una de estas etiquetas, y no se repite la misma en dos planos seguidos del mismo anuncio: `MACRO`, `TIGHT CLOSE-UP`, `MEDIUM CLOSE-UP`, `MEDIUM`, `WAIST-UP`, `FULL-BODY WIDE`. Esta rotación obligatoria es el motor anti-deformación de Higgsfield: quince planos a la misma distancia acaban pareciendo la misma imagen y el montaje se cae.

### Hueco 3 — Detalle físico concreto

Poros visibles, filamentos sebáceos gris-marrón dentro de cada poro, vello fino, capilares rojos finos, brillo de la zona T, alguna imperfección. Cuanto más concreto, más real. Aquí va el bloque de piel del Anexo A.

Subtonos fijos de NOCTA, para que la piel no salga de plástico rosa:

- Bea: `fair skin with neutral-pink undertones`
- Marisol: `light olive skin with warm undertones`
- Álex: `medium olive skin with warm undertones, visible five o'clock shadow`

### Hueco 4 — Acción

Una sola, en presente, sencilla. Dos acciones a la vez son una deformación garantizada.

Y la regla de manos, que decide si el plano puede ser selfie o no: en un selfie una mano sostiene el móvil, así que queda **una** libre. Si quieres enseñar la caja y el parche a la vez, o aplicar el parche con dos manos, ese plano **no puede ser selfie**. Se describe así:

```
steady front-facing phone propped on the bathroom shelf, both hands free
```

Es lo que hace la gente de verdad y además evita el tercer brazo.

### Hueco 5 — Luz y sitio

Uno de los cinco sitios de la biblia, con la hora y la dirección de la luz:

1. **Baño de día**: azulejo blanco tipo metro, grifo cromado, luz de ventana suave por la izquierda, 10:00.
2. **Baño de noche**: plafón cenital, luz más dura, sombras bajo los ojos, 23:30.
3. **Dormitorio de noche**: lámpara de mesilla cálida, sábana blanca arrugada, resto en penumbra.
4. **Ventana de mañana**: luz lateral limpia, alféizar. Es la del parche a contraluz.
5. **Mesa de mármol crema**: packshots, luz suave de ventana, sombra corta.

Nada de estudio, nada de fondo negro, nada de humo ni destellos.

**Cuál elegir según lo que quieras ver.** Esto no es estética, es física: la textura de poro solo se ve con luz pequeña y dura en ángulo rasante. Con luz difusa grande (ventana, día nublado) la piel se aplana y por mucho que pidas poros no salen. Por tanto:

- Macros, aplicación y retirada → **rig baño** (bombilla del espejo o linterna del móvil).
- Hablar a cámara, antes/después, parche a contraluz → **rig ventana** (favorece la cara, y ahí no necesitas poro forense).

### Hueco 6 — Óptica

```
focus exactly on the bridge of the nose, natural digital sensor noise, mild HDR flattening
```

Profundidad de campo: **profunda** en todo salvo el macro. En el macro, mínima y declarada. Ver 1.5.

**Sobre el desenfoque de movimiento.** La biblia lo incluía en este hueco (`slight handheld motion blur at the edges`). No lo pongas. Tu imagen no es el producto final: es el fotograma de entrada de un image-to-video, y un desenfoque horneado en la fuente lo intenta "resolver" el modelo de vídeo y produce morphing de dedos y de rasgos. La inclinación de encuadre y el descentrado sí (son geométricos, el i2v los respeta); el blur no. Única excepción tolerada, y revísala antes de animarla: `the hand pulling the patch is very slightly motion-blurred while the face stays sharp`.

### Hueco 7 — Anti-retoque

```
no beauty retouching, no skin smoothing, no makeup, unretouched documentary realism
```

### Hueco 8 — Prohibiciones

Siempre. Los subtítulos los pones tú después en el montaje, así que el modelo no tiene que poner ni una letra. Cola completa en el Anexo A.

### Ejemplo montado entero

Plano 10 de un anuncio de Bea, colocación del parche, baño de día:

```
@Image1 and @Image2 are the NOCTA patch references. The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape. @Image3 is the character reference — the same person, identical face, hair, body and skin tone. STATE 2: the patch has just been applied, still translucent, the nose underneath is still as full as before.

Vertical 9:16 handheld iPhone photo. This is a casual photo from a real person's camera roll, the kind that gets posted to a TikTok slideshow — not an advertising image, not a product shoot, not a magazine photo.

MEDIUM CLOSE-UP. A Spanish woman in her early twenties at a bathroom sink, seen from the front at chest height by a phone propped on the shelf, both hands free. Light brown hair pinned up with a matte black claw clip, brown eyes, thick natural brows, a mole under the left cheekbone, small gold stud earrings, two small healing spots on the chin, grey ribbed t-shirt.

Real unretouched skin: visible pores across the nose, cheeks and forehead, fine vellus hair catching the light along the jaw and the upper lip, natural sebum shine concentrated on the nose bridge and the forehead while the cheeks stay matte. Fair skin with neutral-pink undertones, uneven tone with faint pink around the nostrils, faint honest under-eye shadows. Naturally muted catchlights, no oversized specular glare in the iris. Faint natural facial asymmetry, one eyebrow slightly higher. No makeup, no foundation.

She is pressing the hydrocolloid patch onto the bridge of her nose with the index and middle finger of her right hand while her left hand steadies the free wing of the patch; no other hand is doing anything. A translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed against the skin. The patch is about 6 cm wide, roughly the width of three fingers — do not scale the patch up to make it readable; if it needs to read bigger, move the camera closer. Mid-action expression, in the middle of saying something, not posing, not smiling at the camera.

Soft cool daylight from a window on the left, overcast diffusion, no sun, no warm cast, falling across her face and the white subway tile. Spanish bathroom: white tile, beige grout, a folded dusty-rose towel, a shampoo bottle with its label turned away, a chrome tap. Colour palette dominated by whites and warm beiges with one dusty-rose accent.

Deep focus — the bathroom behind stays sharp, the way any phone photo looks. Digital smartphone sharpness, mild HDR flattening, slight highlight clipping on the window, faint digital noise in the shadows (digital noise, never film grain). Framing slightly off-centre with a slight natural tilt, not composed, not centred.

No beauty retouching, no skin smoothing, no makeup, unretouched documentary realism, not a 3D render.

Constraints: no text, no lettering, no captions, no subtitles, no watermark, no logo, no badges, no numbers, no frame borders, no collage, no split screen. No brand marks or legible text on any prop. No shallow depth of field, no bokeh, no lens flare, no cinematic colour grade, no HDR glow or bloom or halos, no oversharpening, no oversaturation. No studio lighting, no ring light, no softbox, no golden hour. No mirror and no reflection, no duplicated person, no extra hands, no third arm, no deformed fingers. Exactly one person in frame.
```

---

## 3. Las palabras que funcionan y las palabras prohibidas

Estas listas son literales. Cópialas.

### 3.1 Palabras que funcionan

**Cámara y captura**

```
handheld, iPhone, front-facing camera, main camera 24mm-equivalent f/1.8, clip-on macro lens, ultra-wide camera in macro mode, deep focus, digital smartphone sharpness, mild HDR flattening, slight highlight clipping, faint digital noise in the shadows, digital sensor noise, auto white balance, framing slightly off-centre, slight natural tilt, casual handheld framing, not composed, not centred, captured mid-moment, camera roll, unposed, slight barrel distortion at the frame edges
```

**Piel**

```
visible skin pores, natural fine facial hair, vellus hair visible at the temples, pore texture across the nose and forehead, subsurface scattering visible where light passes through thin skin, unretouched honest skin texture, subtle natural sheen across the forehead and nose bridge, soft small specular highlights, gentle catchlight in the eyes, warmer and slightly flushed skin tone at the nose, cheeks and ears, cooler and more neutral along the jaw and forehead, scatter of light natural freckles, faint asymmetry to the smile, subtle fine lines at the outer corners of the eyes, natural uneven tone across the cheeks, enlarged pores, uneven skin tone, one small healing spot, faint under-eye shadows, bare-skin no-makeup, oily T-zone
```

**Producto y textura**

```
translucent matte hydrocolloid, bevelled edge, thin specular highlight along the edge, sebaceous filament plug, flat grey-yellow sebaceous filaments, translucent, level with the skin, not raised, not dark, not inflamed, tiny threads inside the pores, opaque white in blotches, small pale-yellow dots where the pores were, small opaque white plugs inside the thickness of the gel, faint diffuse halo where the light scatters through the gel, slightly curved and creased from having been on a nose
```

**Luz y sitio**

```
north-facing window light, soft cool daylight from a window on the left, overcast diffusion, cool neutral daylight, clean midday light, bare warm LED bulb above the mirror, small hard source at a low raking angle, short-edged shadows revealing every pore, hard ceiling fixture directly overhead, direct on-camera LED flash, hard bright hotspot on the forehead and the nose, falling to near-black within two metres, white subway tile, beige grout, chrome tap, warm brass tap
```

**Registro**

```
documentary, unretouched documentary realism, not a 3D render, ordinary everyday people, real person's camera roll, authentic UGC creator phone selfie, mid-action, not posing
```

### 3.2 Palabras prohibidas

**Las de calidad (las peores, empujan al render de plástico)**

```
8k, 4k quality, hyperrealistic, ultra-realistic, photorealistic masterpiece, masterpiece, ultra-detailed, award-winning, high quality, best quality, professional photography, cinematic, cinematic realism, cinematic lighting, dramatic lighting, film still
```

**Las de belleza**

```
beautiful woman, attractive, model, high model facial features, symmetrical features, perfect skin, flawless, flawless complexion, poreless skin, glowing skin, radiant complexion, dewy, airbrushed, perfectly smooth, uniform flat skin tone, glossy all-over shine, studio polish, heavy retouching, plastic texture, babyface
```

**Las de óptica y estudio**

```
bokeh, shallow depth of field, minimal depth of field, soft subtle separation, portrait mode, blurred background, DSLR, full-frame, 85mm portrait lens, studio, studio lighting, ring light, softbox, beauty dish, strobe, seamless background, pure white background, lens flare, HDR, HDR glow, bloom, halos, oversharpening, teal and orange, colour grade
```

**Las de composición y pose**

```
editorial portrait, fashion portrait, mid-length portrait, centered composition at eye-level, straight-on, well composed, flattering and even illumination, aspirational lifestyle atmosphere, poised, elegant stance, graceful posture, posing, pose, warm smile at the camera, looking at the camera with a smile, direct eye contact with the camera and a confident smile
```

**Las de luz prohibida**

```
golden hour, magic hour, warm sunset, orange cast, amber cast, honey cast, late afternoon warm wash, sunlit warm tones
```

**Las de carrete (contradicen el look de móvil)**

```
Kodak Gold 200, Portra 400, 35mm film, film grain, fine grain, halation, analog
```

**Las que estropean el image-to-video**

```
motion blur, blurry, out of focus, overexposed, blown out, long exposure
```

**Las que producen asco o rozan moderación**

```
blackheads, acne, cystic, pus, squeezing, extraction, infected, gore, medical close-up, dermatology slide, inflamed, red and irritated
```

**Las del producto**

```
black pore strip, Bioré, round pimple patch, patch with stars, patch with printed dots, glitter, plastic packaging, before and after split screen, diptych
```

---

## 4. Cómo se pide una cámara: móvil en mano contra estudio

Un mismo sujeto, una misma luz y un mismo encuadre dan dos imágenes completamente distintas según cómo describas la cámara. No es un detalle: es la mitad del realismo.

### 4.1 Lo que produce "foto de móvil"

Tres cosas físicas, ninguna valorativa: **óptica ancha**, **foco profundo** y **procesado digital visible**.

| Quiero | Escribo |
|---|---|
| Óptica de móvil | `main camera 24mm-equivalent f/1.8, mild phone-camera wideness only — never fisheye, never ultra-wide warp` |
| Foco profundo | `deep focus — the background stays sharp, the way any phone photo looks` |
| Procesado del móvil | `mild HDR flattening, slight highlight clipping at the window, faint digital noise in the shadows (digital noise, never film grain), auto white balance` |
| Encuadre de persona real | `framing slightly off-centre, slight natural tilt, not composed, not centred, captured mid-moment` |
| Registro | `a photo from a real person's camera roll, not an advertising image` |

La razón por la que el foco profundo funciona: a 24 mm y f/1.8 con un sensor de móvil, a un metro de distancia está casi todo enfocado. El bokeh cremoso delata porque el móvil solo lo consigue simulándolo.

### 4.2 Lo que produce "estudio" sin que lo hayas pedido

Estas frases meten estudio aunque no digas la palabra. Si alguna se te cuela, la imagen se va al render:

```
professional photography, DSLR, 85mm, editorial portrait, fashion portrait, minimal depth of field, soft subtle separation, flattering and even illumination, centered composition at eye-level, seamless background, ring light, softbox, beauty dish, studio strobes, aspirational lifestyle atmosphere
```

Higgsfield lo dice sin rodeos en `ugc-character.md`: nada de cuerpos de cámara profesionales, nada de flashes de estudio, nada de fondo blanco infinito.

### 4.3 Los tres rigs de cámara de NOCTA

No hay más. Y **no se mezclan dos rigs en el mismo plano**: el balance de blancos del flash (verdoso-frío) y el de la bombilla del baño (cálido) se pelean y sale un render sucio.

**Rig A — día / ventana.** Para hablar a cámara, antes/después y el parche a contraluz.

```
Casual handheld iPhone photo taken by the person themselves, main camera 24mm-equivalent f/1.8, deep focus — the bathroom behind stays sharp, the way any phone photo looks. Mild HDR flattening, slight highlight clipping on the window, faint digital luminance noise in the shadows (digital sensor noise, never film grain), auto white balance splitting the difference between the cool window and the warm mirror bulb. Framing slightly off-centre with a slight natural tilt, not composed, not centred, captured mid-moment. This is a photo from a real person's camera roll, the kind that gets posted to a TikTok slideshow — not an advertising image, not a product shoot, not a magazine photo.
```

**Rig B — noche / flash.** Para aplicar el parche antes de dormir, la mesita, el baño de madrugada. Ventaja para NOCTA: el flash directo es la luz que **más** revela el brillo sebáceo de la nariz, y con el parche puesto hace que el hidrocoloide blanco destaque muchísimo.

```
Night-time iPhone photo taken with the direct on-camera LED flash. Hard bright hotspot on the forehead and the nose, the face flattened by the on-axis light, a hard-edged shadow of the head thrown on the tiled wall right behind, the rest of the room falling to near-black within two metres. Cool greenish flash white balance fighting the warm bulb. Visible digital noise in the dark corners, slight tilt to the handheld framing, unposed. A photo from a real person's camera roll, not an advertising image.
```

**Rig C — macro.** Para el diagnóstico, el detalle del poro y el parche fuera del sobre. Aquí y solo aquí se pide profundidad mínima.

```
Extreme macro photograph shot on an iPhone ultra-wide camera in macro mode, handheld, lens about 3 cm from the skin: only two or three millimetres are in sharp focus, everything nearer and further falling out of focus fast — the razor-thin depth of field of a real phone macro. Slight barrel distortion at the frame edges. Lit only by the phone's own torch from the upper left — small hard source at a low raking angle, short raking shadows inside each pore. Faint digital noise, mild highlight clipping on the oiliest ridge, auto white balance leaning warm, framing slightly off-centre and handheld.
```

### 4.4 Selfie contra móvil apoyado

Decidir esto **antes** de escribir el prompt, porque cambia cuántas manos tienes.

| Plano | Cómo se pide | Manos libres |
|---|---|---|
| Hablar a cámara | `Self-portrait selfie shot on an iPhone front-facing camera held by the subject at arm's length, her own arm extended toward the lens, her wrist faintly visible at the edge of frame` | 1 |
| Aplicar el parche, abrir la caja, dos objetos | `steady front-facing phone propped on the bathroom shelf, both hands free` | 2 |
| Dormir, retirada vista desde fuera | `phone held above the bed by someone standing beside it, angled down` | no aplica |

Si pides selfie y una acción a dos manos, el modelo resuelve el conflicto inventando un tercer brazo. Siempre.

---

## 5. Referencias: el apartado que más imágenes salva

**Este es el punto más importante del manual.** Está comprobado generando: describir el producto con palabras **no basta**. Puedes escribir los 60 mm de ancho, los 45 de alto, el ala de 23, el bisel de 0,55 y el radio de 2 mm de las esquinas, y el modelo te devolverá una mancha amorfa. La única manera de que el parche salga exacto es adjuntar fotografías reales del producto.

### 5.1 Qué adjuntar

Referencias reales de NOCTA, ya subidas a Higgsfield:

| Referencia | Qué es | Cuándo se adjunta |
|---|---|---|
| `parche_liner` | El parche real tumbado sobre su liner de papel, junto a la caja | Tomas de producto, parche fuera del sobre, packshot |
| `parche_puesto` | Recorte del parche real puesto en la nariz, de frente | **Toda** imagen con el parche puesto |
| `parche_puesto_2` | El mismo, segundo ángulo | Cuando el plano no es frontal |
| `caja` | La caja crema real | Toda imagen con caja o sobre |
| Retrato del avatar | Bea / Marisol / Álex ya generados | Toda imagen con persona |
| Nariz limpia ya generada | El resultado "después" de ese mismo avatar | Toda toma posterior a la retirada |

### 5.2 Cuántas y en qué orden

- **Dos o tres referencias del parche** bastan para que el troquel salga correcto. Sin ellas, no sale.
- **Máximo tres o cuatro referencias por generación.** A partir de ahí el modelo empieza a promediar y diluye todo.
- **El orden manda.** Primero lo que tiene que salir exacto (el producto), después la identidad de la persona, y al final la referencia de estado (la nariz limpia). Numéralas en el prompt como `@Image1`, `@Image2`, `@Image3` y di qué es cada una en la primera frase.
- `gpt_image_2_5` acepta varias imágenes en el campo `medias` con rol `image_references`, sin tope declarado en la API (Higgsfield `models_explore`, consultado el 12/09/2026).
- `soul_2` acepta **una sola** (`medias.max = 1`, misma consulta). Por eso Soul **no sirve** para ningún plano que lleve caja y avatar a la vez: no puede sostener las dos consistencias. Esos planos van en GPT Image 2.5.

### 5.3 Las frases exactas

**Para el parche.** Esta va al principio del prompt, antes de todo lo demás:

```
The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape.
```

**Para la caja, con bloqueo de ángulo.** Con una sola referencia:

```
@Image1 is the product reference. ANGLE LOCK: the product shows only the visible front-facing side from @Image1. The product keeps this same visible angle in every slot it appears in. Do not rotate, spin, flip, or reveal unseen sides.
```

Con dos referencias (que es lo recomendado: frontal puro y tres cuartos derecha):

```
@Image1 and @Image2 are the NOCTA box references and show the only two valid angles — front-facing and three-quarter right. The box may appear only from these provided angles. Switch angles only by hard cuts between shots, never by continuous rotation. Do not invent intermediate or unseen sides, back panels or side panels. The box design, its colours, its lettering and its logo stay exactly identical to the references — do not redraw, restyle or re-letter anything.
```

**Para la escala real.** El reflejo por defecto del modelo es agrandar el producto para que se lea la marca. Hay que prohibirlo:

```
The product MUST appear at its real-world physical size relative to the character's hand, fingers and body. Image models default to enlarging the product so the label is readable — this is forbidden. If the product is too small to read in frame, move the camera closer to the product. Do not scale the product up. The patch is about 6 cm wide, roughly the width of three fingers.
```

**Para la identidad de la persona:**

```
@Image3 is the character reference — the same person, identical face shape, hair, body and skin tone. PRESERVE the face's exact shape, width and proportions 1:1 — do NOT squeeze, narrow, slim or stretch the face.
```

**Para la nariz limpia del "después".** Esta es la que arregla el fallo más molesto de todos, y va en el apartado 7 porque salió generando.

**Si un plano lleva caja y no tienes foto de referencia.** Nunca pidas texto legible. La alternativa es que el modelo invente un wordmark mal escrito o, peor, el de una marca real:

```
small label turned slightly away, too small to read, no legible text on the product
```

### 5.4 El antes/después: dos generaciones encadenadas, nunca una imagen partida

Si pides `before and after split screen` o `diptych` en una sola generación, sale con marco, con números y con dos personas distintas: el modelo trata cada mitad como un sujeto nuevo. La técnica correcta es la edición con lista de preservación.

1. Genera el **antes** (nariz brillante, poros marcados, filamentos visibles) con el rig ventana.
2. Sobre **esa imagen**, pide una edición:

```
Keep the exact same person, the same face shape and proportions, the same hair, the same shirt, the same bathroom, the same window light from the left, the same camera distance, the same framing and the same head angle. Change ONLY the skin of the nose: the pores now read smaller and cleaner, the grey-yellow sebaceous filaments are gone, the nose bridge is matte instead of oily, a faint pink flush where the patch was. Everything else identical.
```

3. La transición la haces tú en el montaje.

Regla general de las ediciones: **repite la lista de preservación completa en cada iteración**. Si no, tendrás deriva de identidad entre los quince planos del mismo anuncio.

---

## 6. Ajustes: proporción, resolución, calidad y coste

### 6.1 Lo que expone la API

Consultado en esta sesión (Higgsfield `models_explore`, 12/09/2026):

**`gpt_image_2_5` · GPT Image 2.5 (OpenAI)**

| Parámetro | Opciones | Por defecto |
|---|---|---|
| `variant` | `flare`, `sunburst` | `flare` |
| `quality` | `low`, `medium`, `high`, `xhigh`, `max` | `low` |
| `resolution` | `1k`, `2k`, `4k` | `1k` |
| `background` | `auto`, `opaque`, `transparent` | sin valor (deja el del modelo) |
| `medias` | imágenes con rol `image_references`, sin tope declarado | — |
| `aspect_ratio` | `auto`, `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `16:9`, `9:16`, `21:9`, `27:16`, `16:27`, `9:8`, `8:9`, `4:5`, `5:4` | — |

**Los valores por defecto te sabotean.** `1k` y `low` son lo que sale si no tocas nada, y un macro de poro a `quality: low` es ruido indiferenciado. Fija los ajustes a mano en todas las generaciones.

### 6.2 Proporción: 9:16 nativo, nunca recortar

Todas las imágenes se generan en `9:16` nativo. Recortar un 2:3 a 9:16 te come un 12,5 % de altura o un 15,6 % de anchura, y eso descentra justo los dos planos donde el centrado importa: el macro y el packshot.

Si alguna vez generas por la API directa de OpenAI en lugar de por Higgsfield, ten en cuenta que **no existe preset 9:16**: el retrato recomendado es 1024×1536, que es 2:3. Los tamaños custom permitidos son múltiplos de 16, con proporción entre 1:3 y 3:1, sin pasar de 3840 px por lado y entre 655.360 y 8.294.400 píxeles totales. Los 9:16 exactos y legales dentro de eso son:

| Tamaño | Megapíxeles | Para qué |
|---|---|---|
| 1152×2048 | 2,36 | Si quieres ahorrar |
| 1440×2560 | 3,69 | **Recomendado**: margen de sobra para reencuadres finos sin perder resolución al llegar a 1080×1920 |
| 2160×3840 | 8,29 | Justo en el tope máximo. No hace falta |

### 6.3 Resolución y calidad: qué combinación usar

Aquí hay dos posiciones y conviene que las conozcas las dos.

**Lo que dice Higgsfield.** Sus propios workflows de UGC usan siempre `resolution: '2k', quality: 'high'`, y la guía de OpenAI recomienda subir de tramo «for small text, dense infographics, close-up portraits, and identity-sensitive edits» — que son exactamente nuestros tres casos delicados: packshot con wordmark, macro de nariz y planos de cara con identidad bloqueada.

**Lo que salió en nuestras pruebas.** Para **piel**, `1k medium` dio mejor resultado que `2k high`: a más resolución y más tramo de calidad, el modelo tiende a limpiar y pulir la textura, y la piel se va hacia el render. (Este hallazgo viene de las pruebas de NOCTA, no de una fuente documentada; contradice la recomendación de Higgsfield y conviene volver a comprobarlo con un par de planos antes de fijarlo para las 375 imágenes.)

**La regla práctica que resuelve las dos.** No hay una combinación única: hay tres, según lo que sea el sujeto.

| Tipo de plano | `resolution` | `quality` | Por qué |
|---|---|---|---|
| Cara, cuerpo, piel, hablar a cámara | `1k` | `medium` | Mejor textura de piel, menos pulido. Es la mejor relación realismo/coste |
| Macro de nariz, parche fuera del sobre, parche a contraluz | `2k` | `high` | Hace falta detalle para que el poro y el tapón se lean |
| Packshot de caja con wordmark legible | `2k` | `high` | El texto pequeño se rompe por debajo de este tramo |
| Cualquier cosa | `4k` | — | **Nunca.** Todos los image-to-video de Higgsfield topan en 1080p salvo el modo 4k de Kling v3.0. Pagas píxeles que se tiran |

**Coste en créditos.** La API de Higgsfield consultada en esta sesión **no devuelve el coste en créditos por combinación**: `models_explore` expone los parámetros y sus opciones, pero no la tarifa. El coste aparece en la interfaz al lanzar la generación. No pongo aquí ninguna cifra porque no la tengo verificada. Lo que sí es seguro, por la propia estructura de tramos del modelo, es el orden de coste: sube con la resolución y sube con el tramo de calidad, y `4k` + `max` es el extremo caro. **Sin verificar: la magnitud exacta de cada salto.** Antes de lanzar las 375, mira el coste de una generación en cada una de las tres combinaciones de la tabla y calcula el total real.

**Truco de preview barato.** Si estás probando composición, genera a `quality: low`. El modelo no cambia la composición entre tramos si mantienes el prompt y las mismas referencias, así que sirve como boceto. Después repite el plano bueno en su tramo.

### 6.4 Variante

`flare` es el valor por defecto y es la que se usó para las 22 imágenes de la biblia. `sunburst` existe en la API pero **no está probada en NOCTA: sin verificar**. No cambies de variante a mitad de los 25 anuncios: la textura de piel no coincidiría entre planos del mismo montaje.

### 6.5 Fondo

`background` déjalo sin tocar. `transparent` solo tendría sentido para un recorte de producto, y nosotros no hacemos ninguno: todos los packshots van sobre superficie real.

---

## 7. Lo aprendido generando 22 imágenes de verdad

Estas cinco reglas no son teoría. Cada una arregla un fallo concreto que salió en las pruebas. Van siempre, en todos los planos donde apliquen.

### Regla 1 — Encuadre del parche: si se recorta, el troquel deja de leerse

Cuando el parche es el sujeto (tomas de producto, parche usado a contraluz, packshot), el modelo lo pega al borde del cuadro y lo corta. Entonces parece una mancha amorfa aunque el material esté perfecto. Frase obligatoria:

```
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance.
```

### Regla 2 — La nariz "después" sale sucia si no se le da una referencia limpia

El avatar de referencia tiene la nariz con puntos, así que el modelo los conserva en **todas** las tomas, incluidas las de después de quitar el parche. Describirlo con palabras no basta. La solución comprobada es adjuntar como **segunda referencia** una imagen ya generada de esa misma nariz limpia y escribir:

```
The SECOND reference is his nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that second reference, open EMPTY pores, no dark dots.
```

Y además, en positivo:

```
the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere
```

### Regla 3 — "De noche" no significa nada; hay que describir las consecuencias de la luz

Poner «night bathroom, 23:30» da una imagen de día. Lo que funciona es describir lo que esa luz **hace**:

```
IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard shadows straight down under the brow, the nose and the lower lip, the tops of the cheekbones are bright and the eye sockets are dark, and the window behind is pure black with the tiles reflected in it. No daylight, no soft window light, no blue sky.
```

### Regla 4 — Los poros salen en cuadrícula y eso delata el render

Por defecto el modelo reparte los poros como una rejilla regular y el macro parece 3D. Frase obligatoria en toda macro de piel:

```
pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced
```

Y cerrar con:

```
unretouched documentary realism, not a 3D render
```

### Regla 5 — El despegado: "una sola lámina continua", nunca "la mitad izquierda y la mitad derecha"

Si escribes «the left half is peeled and the right half is still stuck», el modelo genera **dos parches separados**. Lo que produce un despegado coherente es describirlo como una sola pieza:

```
He is peeling the patch off in ONE CONTINUOUS SHEET: the right portion is still stuck flat and translucent on the right side of the nose, and WITHOUT ANY BREAK it lifts along one single boundary down the ridge and hangs from his thumb and index finger at the left, curled, limp, its underside turned to the camera.
```

Y el reverso, siempre:

```
irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores
```

**Alternativa más segura.** El plano «parche ya fuera, sujeto delante de la nariz limpia» es mucho más fácil de generar bien y además enseña las dos cosas a la vez: las manchas blancas y la nariz limpia. Si el despegado a medias no sale a la primera o a la segunda, cámbialo por ese plano. El anuncio no pierde nada.

### Regla extra que viene de la misma tanda: el parche traslúcido se vuelve invisible

Si solo escribes «lleva el parche puesto», el modelo lo hace invisible y la imagen parece que la persona se está apretando la nariz, que es justo el mensaje contrario. En **toda** imagen con el parche puesto hay que describirlo como algo que se ve:

```
a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed against the skin
```

Y si ya ha absorbido grasa:

```
the patch now opaque white in blotches with small pale-yellow dots where the pores were, still translucent at the edges
```

---

## 8. Protocolo de revisión

Antes de dar una imagen por buena y mandarla al image-to-video, repasa esta lista. Son treinta segundos por imagen y ahorran regenerar quince planos cuando el montaje ya está hecho.

### 8.1 Producto

- [ ] El parche tiene la forma de mariposa de la referencia, no un óvalo, un rectángulo ni una mancha.
- [ ] El parche entero está dentro del cuadro, con aire por los cuatro lados, si el parche es el sujeto.
- [ ] El parche se **ve**. Si está puesto y es invisible, la imagen no sirve.
- [ ] El tamaño es real: unos 6 cm, el ancho de tres dedos. No una tirita de rodilla.
- [ ] La caja es la caja: cartón crema mate, "nocta" en minúsculas azul marino, luna creciente. Sin dorados, sin brillos.
- [ ] El ángulo de la caja es uno de los dos permitidos. No hay paneles traseros ni laterales inventados.
- [ ] El wordmark, si se lee, está bien escrito. Si no se lee bien, está girado o demasiado pequeño para leerse (nunca a medias).

### 8.2 Estado

- [ ] La imagen está en **uno solo** de los cinco estados. Si hay parche en la mano y parche en la nariz a la vez, se repite.
- [ ] Si el estado es 4 o 5, la piel que ya está al aire está **limpia**: poros vacíos, sin puntos oscuros.
- [ ] Si el estado es 4, hay **una sola** frontera y **un solo** parche. No dos trozos separados.
- [ ] Si el parche está saturado, es blanco a manchas con puntitos amarillentos, y los bordes siguen traslúcidos.

### 8.3 Piel y cara

- [ ] Se ven poros de verdad, y están repartidos de forma irregular, no en rejilla.
- [ ] Hay vello fino visible en la mandíbula o el labio superior.
- [ ] La zona T brilla y las mejillas no. No hay brillo uniforme de toda la cara.
- [ ] La cara no es simétrica. Una ceja algo más alta, la sonrisa algo torcida.
- [ ] Los ojos no brillan solos: reflejo pequeño, iris no saturado.
- [ ] Marisol tiene edad de verdad: surcos nasogenianos, patas de gallo, piel algo crepé bajo los ojos. Nada de cara de niña.
- [ ] El avatar es el mismo que en los otros catorce planos: misma cara, mismo pelo, misma camiseta, mismo lunar o cicatriz.

### 8.4 Luz

- [ ] Hay **una** fuente y se sabe dónde está por las sombras.
- [ ] Si es de noche, es de noche: sombras cortas y duras hacia abajo, cuencas oscuras, ventana negra.
- [ ] No hay naranja de atardecer en ninguna parte.
- [ ] Si es un macro, la luz es pequeña y dura y rasante, y cada poro tiene su sombrita.
- [ ] No hay dos balances de blancos peleándose (flash frío + bombilla cálida en el mismo plano).

### 8.5 Cámara

- [ ] El fondo está nítido, salvo en los macros.
- [ ] No hay bokeh cremoso ni recorte de Modo Retrato.
- [ ] El ruido es digital, fino, en las sombras. No es grano de carrete.
- [ ] El encuadre está algo descentrado y algo torcido.
- [ ] No hay desenfoque de movimiento horneado (salvo la mano que tira del parche, y aun así piénsalo).
- [ ] La proporción es 9:16 nativa, sin bandas ni recorte.

### 8.6 Manos y cuerpo

- [ ] Cinco dedos por mano, en la dirección correcta.
- [ ] Si es selfie, hay una sola mano libre y se ve el brazo o la muñeca en el borde.
- [ ] No hay un tercer brazo, ni una mano que sale de donde no debe.
- [ ] No hay espejo con reflejo de persona. Ni persona duplicada.
- [ ] El cuerpo está en pose neutra. No hay miembros lanzados hacia el objetivo.

### 8.7 Texto y limpieza

- [ ] No hay ni una letra en la imagen, salvo la etiqueta de la caja NOCTA si el plano la lleva con referencia.
- [ ] Mira **las cuatro esquinas** y las superficies planas: ahí brota la marca de agua fantasma.
- [ ] Los botes del lavabo, las toallas, el pijama y la pantalla del móvil tienen la cara impresa girada o son ilegibles.
- [ ] No hay subtítulos, ni marcos, ni números, ni collage, ni pantalla partida.
- [ ] No aparece ninguna otra marca ni nada que se parezca a una marca real.

### 8.8 Antes de animar

- [ ] Los quince planos del anuncio tienen el mismo grano y la misma piel. Si uno canta, repítelo antes de montar.
- [ ] El plano no tiene nada medio desenfocado que el modelo de vídeo vaya a intentar "resolver".
- [ ] Hay una sola acción clara que animar.

---

## Anexo A: bloques listos para pegar

### Bloque piel (versión NOCTA, con el sebo activado)

```
Real unretouched skin: visible pores across the nose, cheeks and forehead, fine vellus hair catching the light along the jaw and the upper lip, natural sebum shine concentrated on the nose bridge and the forehead while the cheeks stay matte — the shine a genuinely oily T-zone has at the end of the day. Uneven tone with faint pink around the nostrils, two or three small moles, faint fine lines at the outer corners of the eyes, faint honest under-eye shadows, one small healing spot. Naturally muted catchlights in the eyes, no oversized specular glare in the iris. Faint natural facial asymmetry, one eyebrow slightly higher than the other. No makeup, no foundation. No digital smoothing, no beauty filter, no airbrushing, no plastic skin, no glossy retouched finish, no glow.
```

Este bloque viene del módulo antislop de Higgsfield, pero con dos cláusulas suyas **desactivadas a propósito**: hemos quitado «skin completely free of artificial glare, shine or highlight blooms, matte-to-natural complexion» (nos borraría el brillo sebáceo que es lo que vendemos) y «symmetrical features» (produce cara de IA).

### Cola negativa (va en las 375 imágenes)

En los macros, **borra** `no shallow depth of field, no bokeh` de esta cola. Todo lo demás se queda.

```
Constraints: no text, no lettering, no captions, no subtitles, no watermark, no logo, no badges, no numbers, no frame borders, no collage, no split screen, no headers. No brand marks or legible text on any prop — bottles, towels, packaging and phone screens have their printed sides turned away or are too small to read. No shallow depth of field, no bokeh, no lens flare, no cinematic colour grade, no teal-and-orange, no HDR glow or bloom or halos, no oversharpening, no oversaturation. No studio lighting, no ring light, no softbox, no golden hour, no warm sunset cast. No fisheye, no ultra-wide distortion. No mirror and no reflection, no duplicated person, no extra hands, no third arm, no deformed fingers. Exactly one person in frame.
```

### Macro de nariz con filamentos sebáceos (el "antes")

```
Extreme macro photograph of the tip and left side of a nose filling the frame, with a strip of normal cheek skin at the edge of the frame so it reads as a person's nose and not a medical slide. Taken with an iPhone ultra-wide camera in macro mode, lens about 3 cm from the skin: only two or three millimetres of the nose are in sharp focus, the near edge of the nostril and the far cheek fall out of focus fast — the razor-thin depth of field of a real phone macro. Slight barrel distortion at the frame edges. The pores are clearly visible and each holds a flat grey-yellow sebaceous filament, translucent, level with the skin, not raised, not dark, not inflamed — tiny threads inside the pores, the ordinary texture of an oily nose. Pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. Calm skin, no redness, not irritated. Light olive skin with warm undertones, fine vellus hair, a shallow film of sebum on the nose bridge catching one small hard specular highlight, matte where the cheek begins. Lit only by the phone's own torch from the upper left — small hard source at a low raking angle, short-edged shadows revealing every pore. Faint digital noise, mild highlight clipping on the oiliest ridge, auto white balance leaning warm, framing slightly off-centre and handheld. A photo from a real person's camera roll. Unretouched documentary realism, not a 3D render.
```

### Parche usado a contraluz

```
TIGHT CLOSE-UP of a used hydrocolloid nose patch held up between thumb and forefinger against a bright overcast window, strongly backlit. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance. The gel is semi-translucent and milky, and inside its thickness there are dozens of small opaque white plugs, each a tiny column of absorbed sebum, denser and whiter than the gel around them, each surrounded by a faint diffuse halo where the light scatters through the gel. The patch is slightly curved and creased from having been on a nose, not flat. The window behind is blown out to plain even white with no frame, no view, no curtain. The fingers are in focus — fine fingerprint ridges, a hangnail, short unpainted nails, faint vellus hair on the knuckles. No printed dots, no drawn pattern, no stickers, no glitter — the plugs are physically inside the gel, not printed on it. Handheld iPhone photo, main camera, deep focus, faint digital noise, slight tilt.
```

### Packshot de la caja

```
@Image1 and @Image2 are the NOCTA box references and show the only two valid angles — front-facing and three-quarter right. ANGLE LOCK: the box may appear only from one of these angles; do not rotate, spin, flip or invent back panels, side panels or unseen sides. The box design, its colours, its lettering and its logo stay exactly identical to the references — do not redraw, restyle or re-letter anything.

MEDIUM CLOSE-UP of the NOCTA box standing on a cream marble surface beside a folded dusty-rose towel, photographed from just above counter height with a phone held in one hand. The box is at its real physical size relative to the towel; the camera is close enough that the wordmark fills a good part of the frame, but the box itself is NOT enlarged. One patch lies next to the box, complete and uncropped, slightly curled, catching a small specular highlight along its bevelled edge. Soft window light from the left, short shadow of the box on the marble. Slight tilt, slightly off-centre framing, faint digital noise. A photo from a real person's camera roll, not a product shoot.

Constraints: no other brands, no legible text anywhere except the NOCTA box's own label, no watermark, no captions, no studio lighting, no seamless background, no reflections, no bokeh.
```

### La geometría del parche (apoyo, nunca sustituye a las fotos)

```
a single piece of translucent matte hydrocolloid, 60 mm wide and 45 mm tall, shaped like a wide butterfly: one central lobe that covers the bridge from the middle of the nose down over the tip, and two symmetrical wings 23 mm deep that spread sideways and downwards to wrap the nostril wings; between the wings the lower edge has a shallow rounded notch about 6 mm deep where the columella is; every corner rounded with a 2 mm radius; the material is 0.55 mm thick with a bevelled edge
```

---

## Anexo B: los veinte errores que cuestan una regeneración

1. Poner `8k`, `hyperrealistic`, `cinematic`, `masterpiece` o `professional photography`. Cada uno empuja activamente al render de plástico.
2. Copiar el preset `photoreal-unretouched` de Higgsfield entero: arrastra «cinematic realism, clean white background, 4K quality» y borra el brillo sebáceo que necesitamos vender.
3. Dejar `symmetrical features` y `high model facial features` en los prompts de Marisol y Álex.
4. Pedir foco profundo o `no bokeh` en el macro de nariz: sale lámina médica.
5. Escribir `blackheads`, `extraction`, `squeezing` o `acne`: puntos negros gordos, aspecto de patología, y roza filtros de moderación.
6. Usar luz difusa suave en los planos donde quieres ver poros. La textura necesita fuente pequeña y dura en ángulo rasante.
7. Usar Soul 2.0 para cualquier plano con la caja NOCTA: acepta una sola referencia y no puede sostener producto y avatar a la vez.
8. Generar la caja sin foto de referencia real: sale un wordmark mal escrito o el de otra marca.
9. Agrandar el producto para que se lea la marca. Se acerca la cámara, no se escala el producto.
10. Planos de espejo en el baño: multiplican manos y duplican personas.
11. Pedir selfie y una acción a dos manos en el mismo plano: tercer brazo garantizado.
12. Hornear desenfoque de movimiento o sobreexposición: al animarlo sale morphing de dedos y rasgos.
13. Generar en 1:1, 4:5 o 2:3 para recortar a 9:16 después.
14. Dejar los valores por defecto (`1k`, `low`): el macro de poro sale como ruido indiferenciado.
15. Generar a `4k`: el image-to-video lo baja a 1080p igualmente.
16. Pedir `before and after split screen` o `diptych` en una sola generación.
17. Usar hora dorada o luz cálida de atardecer, aunque el plano sea de la mañana.
18. Mezclar lenguaje de carrete (Kodak, halación, grano fino) con lenguaje de móvil.
19. Olvidar la cola de exclusión de texto en alguna imagen. El olvido más frecuente es la parte de los props: `no legible text on any prop`.
20. Empezar el anuncio con el avatar ya perfecto y sin brillo. Si el "antes" ya parece el "después", el anuncio no tiene nada que vender: los tres avatares van `bare-skin no-makeup, oily T-zone, visible pores`.

Y uno más, el vigésimo primero, que viene de una regla de casting de Higgsfield que merece la pena tener presente: **identifica lo que cambia tu producto y deshaz ese cambio en el aspecto por defecto del personaje**. Vendemos limpieza de poro, así que los tres avatares arrancan con la nariz visiblemente grasa. Si Bea sale ya impecable en el plano 1, no hay anuncio.
