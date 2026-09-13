# Anuncio 82 · Si no ves nada en el parche, te lo devolvemos

[Volver al índice de los 25 anuncios](../PROMPTS_375_TOMAS.md)

**Avatar.** Álex, 36 (pelo corto oscuro, barba de tres días, cicatriz pequeña en la ceja derecha, nariz grasa con filamentos, algo de rojez en las mejillas), usado como DOBLE FÍSICO pero SIN IDENTIDAD EXPLÍCITA: el guion dice "Todos", así que en las 15 tomas el encuadre se corta siempre a la altura de las cejas o por debajo, o es macro de nariz, manos y producto. Nunca se ven los ojos ni la cara entera. Aun así se adjunta su retrato como referencia en todas las tomas con piel, para que la nariz, la barba y el tono sean los mismos en las 15.

**Sitio y luz.** Sitio 4 de la biblia, "ventana de mañana": luz lateral limpia desde la izquierda, alféizar blanco, 08:10. Es el sitio obligado porque el anuncio entero transcurre por la mañana (retirada, parche a contraluz, parche en la mano) y el plano estrella del guion es el parche a contraluz, que solo funciona con la luz de la ventana detrás del parche. Las dos tomas de packshot (13 y 14) usan el sitio 5, la mesa de mármol crema, colocada bajo ESA misma ventana y con la misma hora y dirección de luz, para que no se lea como otro día ni otra casa. La toalla de la toma 10 se rueda contra el azulejo blanco tipo metro del baño desenfocado al fondo, con la misma luz lateral: es el único guiño al baño y va fuera de foco para que no rompa la continuidad.

**Continuidad (lo que se repite en las 15 tomas).** UN SOLO DÍA, UNA SOLA MAÑANA, 08:10. Ropa: camiseta gris oscuro lisa, cuello redondo, sin estampado; nunca se ve el pantalón. Pelo: corto oscuro, sin peinar, barba de tres días exactamente igual en las 15 tomas. Piel: rojez leve en mejillas, capilares finos junto a la aleta de la nariz, cicatriz pequeña en la ceja derecha (asoma en 4 y 10). Manos: uñas cortas, un padrastro en el pulgar, vello fino en los nudillos, arañazo viejo cerca de la muñeca (13). Luz: SIEMPRE lateral desde la izquierda, ventana de mañana, sombras cortas y blandas, nada de plafón ni luz de noche. Objetos que se repiten: alféizar blanco, toalla de algodón blanca doblada, sobre crema abierto, DOS cajas crema idénticas, un parche nuevo sobre su liner brillante y UN ÚNICO parche usado (el mismo trozo de material en 1, 4, 5, 6, 7, 9 y 14: mismas manchas blancas, mismos puntos amarillos, mismo borde enrollado). Progresión de estados sin mezclas: tomas 1-4 estado 4 (a medio quitar), 5-9 estado 5 (fuera, nariz limpia), 10 sin parche y nariz seca, 11 producto nuevo, 12 y 15 estado 2 (recién puesto). Nunca hay parche en la mano y parche en la nariz en la misma imagen.

**Orden de montaje.** Montaje final en el orden 1 → 15, que es el orden del guion. Bloque 1 (0-5 s, voz «Si por la mañana no ves nada en el parche, te devolvemos el dinero»): tomas 1, 3 y 4 encadenadas; la 1 abre en el fotograma cero y aguanta 2,5 s sobre el gancho, la 3 entra 1 s como golpe de macro y la 4 cierra en 1,5 s cuando el parche se suelta. La toma 2 NO va en este montaje: es la variante B del gancho, se monta un corte alternativo idéntico cambiando solo el primer plano y el texto del gancho (las tres variantes del guion: reto, pregunta, prueba). Bloque 2 (5-11 s, voz «Esto es lo que sale una noche normal...»): 5 (2 s, el parche entra a contraluz justo en «esto es lo que sale»), 6 (1,5 s sobre «una noche normal»), 7 (1,5 s, el foco cambia del parche a la nariz limpia justo al empezar «si en tu parche no sale nada») y 8 (1 s, remate mudo antes de la garantía). Bloque 3 (11-16 s, voz «Solo una condición: nariz limpia y seca antes de pegarlo»): 9 (1,5 s, el parche en la palma como bisagra), 10 (1,5 s exactamente sobre «limpia y seca»), 11 (1 s) y 12 (1 s, las yemas presionando al final de «antes de pegarlo»). Bloque 4 (16-22 s, voz «Y si no te convence, te devolvemos el dinero. Pack de 2 cajas, 29,90 €, envío gratis desde España»): 13 (2 s sobre «te devolvemos el dinero»), 15 (1,5 s de respiro sobre «si no te convence») y 14 como último fotograma, 2,5 s congelados sobre el precio y la garantía de 60 días. Los clips se generan de 3 a 4 s y se recortan en montaje: se aprovecha el tramo central de cada uno y se descartan los primeros y últimos cuadros, que es donde el vídeo generado deforma. La voz se graba después y se monta encima; los subtítulos del guion («Si no ves nada, te lo devolvemos», «Esto es lo normal», «Nariz limpia y seca», «Si no se pega, te lo cambiamos · 60 días») se sobreimprimen en edición, nunca en la imagen, y la línea de la garantía de 60 días se mantiene fija en el último tercio de pantalla durante todo el bloque 4.


## El anuncio entero en un prompt para copiar y pegar

Esto es el anuncio completo en 2 bloque(s), con los cortes duros dentro del propio prompt. Es el formato que entiende el generador de vídeo: un clip con varios cortes sale más barato y mucho más consistente que generar los planos sueltos y pegarlos después. Se adjuntan como referencia la foto del personaje, la del parche real y la de la caja, y se usan las imágenes de las tomas como fotogramas de arranque de cada corte.

**Bloque 1 · tomas 1 a 8 · unos 28 s**

```text
Vertical 9:16 handheld iPhone UGC ad, shot on a phone in one take and cut 7 times.
IDENTITY LOCK: the same person, the same clothes, the same hair and the same room in every cut, exactly as in the attached reference photographs. Nobody else appears.
PRODUCT LOCK: the patch is the product in the attached reference photographs. Same silhouette, same proportions, same translucent matte material. It never changes shape, never turns opaque black, never becomes a straight strip or an oval, and the box never shows text that is not printed on the reference box.
HANDS: in every cut, each visible hand has one job and only one; a hand that is not acting stays out of frame. No mirrors, no reflections, no phone visible in frame.
PACE: each cut is one single action, held steady, no zoom inside a cut unless the cut asks for it.
No on-screen text, no subtitles, no captions, no logos, no watermark. No music and no dialogue: silent.

Cut 1: Over four seconds he continues to draw the patch off in one continuous sheet, the single boundary travelling a few millimetres further down the ridge while the hanging part stays curled and limp
Hard cut to.
Cut 2: He tilts his head a few degrees toward the window while the hanging sheet swings slightly from his fingers
Hard cut to.
Cut 3: The peeling frontier creeps two millimetres across the frame, the skin tenting for an instant and settling back, the bared pores staying clean
Hard cut to.
Cut 4: His hand lowers slowly and parallel to the skin, the last lobe releasing the tip of the nose so the patch hangs free
Hard cut to.
Cut 5: His fingers rotate the used patch a few degrees against the window light so the backlight sweeps across the white blotches and the small yellow dots
Hard cut to.
Cut 6: The patch flexes very slightly between the fingers and a single raised plug catches the light as the macro breathes
Hard cut to.
Cut 7: He lowers the used patch two centimetres so his clean nose behind it drifts into focus while the patch softens
Hard cut to.
Cut 8: A very slight handheld breath moves across the macro and the light shifts a touch on the clean nostril crease
End on the last frame and hold it. No fades, no dissolves, no transitions of any kind: every change of shot is a hard cut.
```

**Bloque 2 · tomas 9 a 15 · unos 24 s**

```text
Vertical 9:16 handheld iPhone UGC ad, shot on a phone in one take and cut 6 times.
IDENTITY LOCK: the same person, the same clothes, the same hair and the same room in every cut, exactly as in the attached reference photographs. Nobody else appears.
PRODUCT LOCK: the patch is the product in the attached reference photographs. Same silhouette, same proportions, same translucent matte material. It never changes shape, never turns opaque black, never becomes a straight strip or an oval, and the box never shows text that is not printed on the reference box.
HANDS: in every cut, each visible hand has one job and only one; a hand that is not acting stays out of frame. No mirrors, no reflections, no phone visible in frame.
PACE: each cut is one single action, held steady, no zoom inside a cut unless the cut asks for it.
No on-screen text, no subtitles, no captions, no logos, no watermark. No music and no dialogue: silent.

Cut 1: His palm tilts a few degrees and the soft used patch settles, its rolled edge shifting once
Hard cut to.
Cut 2: He presses the folded towel once against the bridge of his nose and lifts it a centimetre, leaving the skin matte and dry
Hard cut to.
Cut 3: His fingers lift the clean patch fully off the glossy liner, the gel stretching a millimetre as it releases
Hard cut to.
Cut 4: The two fingertips slide once from the centre of the nose outwards along the wing, sealing the edge of the patch
Hard cut to.
Cut 5: His hand turns the two boxes a few degrees toward the window so the light slides across the matte cardboard
Hard cut to.
Cut 6: A hand enters from the right and sets the used patch down beside the boxes, then withdraws
Hard cut to.
Cut 7: His hand finishes lowering from his nose and comes to rest, the patch sitting sealed and translucent
End on the last frame and hold it. No fades, no dissolves, no transitions of any kind: every change of shot is a hard cut.
```

**Avisos de este anuncio (planos seguidos que el generador puede fundir en vez de cortar):**

- Las tomas 11 y 12 están en la misma banda de distancia (macro) y van seguidas: el generador tiende a fundirlas en vez de cortar. Cambia el encuadre de una de las dos o separa los planos en el montaje.
- Las tomas 14 y 15 están en la misma banda de distancia (plano medio) y van seguidas: el generador tiende a fundirlas en vez de cortar. Cambia el encuadre de una de las dos o separa los planos en el montaje.

> A 13 de estas 15 tomas se les ha añadido automáticamente alguna de las reglas comprobadas (fidelidad del producto, encuadre completo del parche, nariz limpia, poros irregulares, física del despegado o consecuencias de la luz de noche). Van al principio del prompt y están marcadas en la línea «Reglas añadidas».


## Las 15 tomas, una a una

### Toma 1 · Gancho A · la retirada en macro

*0-5 s · gancho, macro del parche retirándose despacio por la mañana*

**Qué se ve.** Macro frontal: la nariz llena el cuadro, los ojos fuera. El parche se despega en UNA SOLA lámina continua, con una única frontera bajando por el caballete; la parte despegada cuelga del pulgar y el índice, enrollada y blanda, con el reverso hacia cámara lleno de islas blancas. La piel que ya queda al aire está limpia.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** regla de encuadre completo del parche; física del despegado; regla de nariz limpia; referencia nariz_limpia; regla de poros irregulares; 1 regla(s) omitida(s) por longitud

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
PHYSICS OF THE PEEL: he peels the patch off in ONE CONTINUOUS SHEET. One part is still stuck flat and translucent on the nose and, without any break, it lifts along ONE single boundary and hangs from his fingers, curled and limp, its underside turned to the camera. There is no patch material anywhere over skin that has already been uncovered. That underside shows irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance: one wide central lobe, two symmetrical side wings and a shallow rounded notch in the middle of the lower edge, every corner rounded. Never a straight strip, never an oval, never a shapeless blob, never black. The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 4, mid-removal. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld. A man's nose fills the frame, eyes outside the frame, three-day stubble. He peels the patch in ONE CONTINUOUS SHEET: the right portion still stuck flat and translucent, and without any break it lifts along a single boundary down the ridge and hangs from his thumb and index finger at the left, curled, limp, underside to camera, milky-white islands studded with small pale-yellow domes. The bared skin is clean, pores open and empty. Morning window light, 08:10, from the left. Very shallow depth of field, focus on the peeling boundary, slight handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: over four seconds he continues to draw the patch off in one continuous sheet, the single boundary travelling a few millimetres further down the ridge while the hanging part stays curled and limp. Camera static handheld with micro-drift. Slow, steady, no jump. The face, the hand and the patch must not change shape; the patch never splits into two pieces; no text, no subtitles, no watermark.
```

> **Nota de producción.** Es el primer fotograma del anuncio y decide la retención: merece 6-8 intentos. Es también el plano más difícil de generar (el modelo tiende a partir el parche en dos). Cuando llegue el lote, GRÁBALO DE VERDAD con el móvil en modo macro: un despegado real de 4 s es imbatible y este plano justifica él solo la lente macro de 8 €.

### Toma 2 · Gancho B · la misma retirada en 3/4

*0-5 s · gancho, variante A/B del mismo momento*

**Qué se ve.** El mismo instante desde su derecha, en tres cuartos y algo más abierto: se ve el perfil de la nariz desde las cejas hacia abajo, la camiseta gris oscuro en el borde inferior y la lámina colgando de los dedos. Sirve para el test A/B del gancho.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** referencia lamina_parche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 4, mid-removal, seen from his right in three-quarter profile. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. Vertical 9:16 handheld iPhone photo, close, the frame cut at the eyebrows so the eyes stay out; short dark hair, three-day stubble, dark grey t-shirt collar at the bottom edge. One continuous sheet of hydrocolloid still lies flat and translucent on the near side of the nose and lifts along one single boundary, hanging limp from his fingers, its white-blotched underside half turned away. Pale skin, some redness on the cheek, fine vellus hair catching the light. Morning window light, 08:10, side light from the left, white painted sill behind. Very shallow depth of field, focus on the nose, slight handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: he tilts his head a few degrees toward the window while the hanging sheet swings slightly from his fingers. One action only. Camera very slow push in. Calm pace, three seconds. His face, the nose and the patch must not change shape; the patch stays one single piece; nothing new enters the frame; no text, no subtitles, no watermark.
```

> **Nota de producción.** No va en el mismo montaje que la 1: es la versión B del gancho para probar las tres variantes de texto del guion. Ojo al espejo: no debe aparecer ninguna superficie reflectante detrás o saldrá un segundo brazo.

### Toma 3 · La frontera, macro extremo

*0-5 s · gancho, remate del macro de la retirada*

**Qué se ve.** Dos centímetros de nariz llenando el cuadro. Una sola frontera cruza la imagen: debajo el hidrocoloide sigue pegado, plano y traslúcido con su línea de brillo en el borde biselado; encima la piel ya está limpia, con los poros abiertos y vacíos. La piel se levanta un milímetro justo en la frontera.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** referencia lamina_parche; regla de nariz limpia; referencia nariz_limpia; regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 4, mid-removal, the boundary itself. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, filling the frame with two centimetres of the left side of the nose. One single frontier crosses the image: below it the hydrocolloid is still stuck, flat, translucent, bevelled edge catching a thin highlight; above it the skin is clean, pores open, EMPTY and flat, no dark dots. The skin tents a millimetre at the frontier. Pores in a completely irregular distribution, every pore a different size and angle, never in rows. Morning window light, 08:10, from the left. Focus exactly on the frontier, very shallow depth of field, sensor noise. Unretouched documentary realism, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: the peeling frontier creeps two millimetres across the frame, the skin tenting for an instant and settling back, the bared pores staying clean. Nothing else moves. Camera static handheld with micro-drift, macro. Slow, three seconds. The skin texture, the pores and the patch must not change shape; no dark dots appear; no text, no subtitles, no watermark.
```

> **Nota de producción.** Aquí es donde el modelo mete poros en cuadrícula: si la macro parece 3D, repite insistiendo en la distribución irregular. Adjunta como segunda referencia una imagen ya generada de esta nariz LIMPIA o volverá a poner puntos negros en la zona recién despegada.

### Toma 4 · El último centímetro

*0-5 s · gancho, cierre del bloque*

**Qué se ve.** Plano vertical desde algo abajo, cortado a la altura de las cejas: la mano tira despacio y en paralelo a la piel, solo el lóbulo central toca aún la punta de la nariz y el resto cuelga pesado y blanco. La nariz de arriba ya está desnuda y limpia.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 4, the last centimetre. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. Vertical 9:16 handheld iPhone photo taken from slightly below, the frame cut at the eyebrows, short dark hair, three-day stubble, dark grey t-shirt. His hand pulls the sheet slowly downward and parallel to the skin; only the central lobe still touches the tip of the nose while the rest hangs from his fingers, curled and heavy, blotched opaque white. The nose above is already bare and clean. Fine vellus hair, thin capillaries beside the nostril, a small scar in the right eyebrow. Morning window light, 08:10, from the left, white sill behind. Very shallow depth of field, focus on the hanging patch, handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: his hand lowers slowly and parallel to the skin, the last lobe releasing the tip of the nose so the patch hangs free. One action. Camera slow pull back, a hand's width. Four seconds, unhurried. His face and the patch must not change shape; the patch stays one piece; no text, no subtitles, no watermark.
```

> **Nota de producción.** Puente natural entre el bloque 1 y el 2: el parche sale de la nariz y entra en la mano. Si el vídeo deforma la mano, quédate con la imagen fija y añade solo micro-deriva de cámara.

### Toma 5 · El parche a contraluz

*5-11 s · "Esto es lo normal", parche a contraluz con puntos blancos*

**Qué se ve.** Los dedos sujetan el parche usado por un ala contra la ventana; la luz lo atraviesa y se ven las manchas blancas opacas y decenas de puntitos amarillos donde estaban los poros, con los bordes todavía traslúcidos. El troquel de mariposa entero dentro del cuadro, con aire por los cuatro lados.

**Referencias que hay que adjuntar:** `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 5, the patch is fully off. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped, the whole butterfly outline readable at a glance. Vertical 9:16 handheld iPhone photo: a man's thumb and index finger hold the used patch by one wing against the morning window, 08:10, so the light passes through it from behind. The film is opaque white in blotches with dozens of small pale-yellow dots where the pores were, still translucent at the edges, slightly domed, curling. Short nails, a hangnail, fine hair on the knuckles. Focus exactly on the patch, background window frame out of focus, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: his fingers rotate the used patch a few degrees against the window light so the backlight sweeps across the white blotches and the small yellow dots. One action. Camera static handheld with micro-drift. Four seconds, slow. The patch must not change shape or outline and nothing is cropped by the frame; no text, no subtitles, no watermark.
```

> **Nota de producción.** Este es EL plano del anuncio: la garantía se apoya en él. GRÁBALO DE VERDAD con el móvil cuando llegue el lote, con un parche usado real contra la ventana; la grasa real a contraluz no se genera bien y el cliente distingue la diferencia. Mientras tanto, genera la versión y vigila que no lo recorte el borde del cuadro.

### Toma 6 · El reverso, los tapones

*5-11 s · la prueba visual en macro*

**Qué se ve.** Macro del reverso del parche entre los dedos: islas blanco lechoso irregulares sembradas de decenas de cúpulas blancas y amarillentas, los tapones que han salido de los poros, cada uno de un tamaño, agrupados a manchas. El gel blando, los bordes traslúcidos y enrollados.

**Referencias que hay que adjuntar:** `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz

**Reglas añadidas:** referencia parche_puesto; regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 5, the underside of the used patch. The patch must be EXACTLY the product in the reference photos: same silhouette and material. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides, nothing cropped. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, held between finger and thumb. The inner face shows irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores, each a different size, in dense patches and sparse elsewhere, never in a grid. The gel is soft, the edges still translucent and curled. Morning window light, 08:10, from the left. Very shallow depth of field, focus on the domes, sensor noise. Unretouched documentary realism, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: the patch flexes very slightly between the fingers and a single raised plug catches the light as the macro breathes. One action only. Camera very slow push in, macro, tiny handheld drift. Three seconds. The patch outline, the domes and the fingers must not change shape; nothing is cropped; no text, no subtitles, no watermark.
```

> **Nota de producción.** Segundo candidato claro a grabación real: la textura de los tapones es lo que el modelo convierte en render. Si lo generas, rechaza cualquier versión con las cúpulas alineadas o todas del mismo tamaño.

### Toma 7 · Prueba y resultado en el mismo cuadro

*5-11 s · "si en tu parche no sale nada, te devolvemos el dinero"*

**Qué se ve.** Sostiene el parche manchado por un ala delante de su cara, a un palmo: el parche en foco, y detrás, desenfocada, su propia nariz limpia y algo rosada, sin puntos oscuros. Se ven las dos cosas a la vez, que es exactamente lo que promete la garantía.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** regla de nariz limpia; referencia nariz_limpia

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 5, proof and result in one frame. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides. Vertical 9:16 handheld iPhone photo: a man holds the used blotched white patch by a wing in front of his face at arm's length; the frame is cut at the eyebrows, short dark hair, three-day stubble, dark grey t-shirt. Behind the patch his own nose sits soft and out of focus, clean, faintly pink, no dark dots. Morning window light, 08:10, from the left, plain wall behind. Very shallow depth of field, focus exactly on the patch, the face clearly blurred, slight handheld blur, sensor noise. Unretouched documentary realism, no makeup. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: he lowers the used patch two centimetres so his clean nose behind it drifts into focus while the patch softens. One action, one focus shift. Camera static handheld with micro-drift. Four seconds. His face and the patch must not change shape, no dark dots appear on the nose; no text, no subtitles, no watermark.
```

> **Nota de producción.** Alternativa segura de la biblia: si el despegado a medias (tomas 1 y 3) no sale, este plano cuenta lo mismo y sale bien a la primera. Adjunta como segunda referencia la nariz ya limpia o el fondo desenfocado seguirá teniendo puntos negros.

### Toma 8 · La nariz después

*5-11 s · cierre del bloque de la prueba*

**Qué se ve.** Macro del lateral de la nariz y la aleta: los poros abiertos, VACÍOS y planos, ni un punto oscuro, la piel algo rosada y mate y la marca tenue de donde estaba el borde del parche. Distribución de poros irregular, en dos grupos densos.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** cláusula de fidelidad del parche; referencia lamina_parche; referencia parche_puesto; regla de nariz limpia; referencia nariz_limpia; regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Do not invent a different shape. The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 5, the nose after. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, the left side of the nose and the nostril wing filling the frame, eyes outside the frame. The pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere; the skin is faintly pink and matte, still holding a faint imprint line where the patch edge sat. Pores scattered in a completely irregular distribution, clustered in two dense patches and sparse elsewhere, every pore a different size and angle, never in rows. Fine vellus hair, thin capillaries, three-day stubble at the bottom edge. Morning window light, 08:10, raking from the left. Focus exactly on the nostril crease, very shallow depth of field, sensor noise. Unretouched documentary realism, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: a very slight handheld breath moves across the macro and the light shifts a touch on the clean nostril crease. Nothing else happens. Camera static handheld with micro-drift. Three seconds, still. The skin, the pores and the faint imprint line must not change shape; no dark dots or plugs appear; no text, no subtitles, no watermark.
```

> **Nota de producción.** El avatar de referencia tiene la nariz con puntos y el modelo los conserva: adjunta OBLIGATORIAMENTE como segunda referencia una imagen ya generada de esta nariz limpia y escribe que la piel debe parecerse exactamente a esa segunda referencia. Esta imagen es además la que se reutiliza como referencia limpia en las tomas 1, 3, 4 y 7.

### Toma 9 · El parche en la palma

*11-16 s · "Parche en la mano"*

**Qué se ve.** Cenital sobre la palma abierta apoyada en el alféizar blanco: el parche usado descansa blando y algo abombado, conservando la curva de la nariz, con los bordes enrollados y las manchas blancas. Se ven las líneas de la mano y un pequeño callo.

**Referencias que hay que adjuntar:** `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz

**Reglas añadidas:** referencia parche_puesto

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 5, the used patch resting in the palm. The patch must be EXACTLY the product in the reference photos: same silhouette, same proportions, same translucent matte material. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides, nothing cropped by the edge. Vertical 9:16 handheld iPhone photo looking straight down at an open right palm held over a white window sill. The patch lies there soft and slightly domed, keeping the curve of the nose, edges rolled up, blotched opaque white with pale-yellow dots. Palm lines, a small callus under the fingers, fine hair on the wrist, a faint tan edge. Morning window light, 08:10, from the left, short soft shadow. Very shallow depth of field, focus on the patch, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: his palm tilts a few degrees and the soft used patch settles, its rolled edge shifting once. One action. Camera very slow push in toward the palm. Three seconds. The patch outline must not change shape, the whole patch stays inside the frame, the hand must not change shape; no text, no subtitles, no watermark.
```

> **Nota de producción.** Plano fácil y muy agradecido; también de los primeros que conviene rodar de verdad porque solo necesita una mano, la ventana y el parche usado de esa noche.

### Toma 10 · Nariz limpia y seca

*11-16 s · "Solo una condición: nariz limpia y seca antes de pegarlo"*

**Qué se ve.** Plano cortado a las cejas: aprieta una toalla de algodón blanca doblada contra el caballete y la punta de la nariz con las dos manos, secándola. Donde asoma la piel está mate, sin brillo en la zona T. Azulejo blanco tipo metro desenfocado detrás.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** regla de nariz limpia; referencia nariz_limpia

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 5 preparation: no patch on the skin. Vertical 9:16 handheld iPhone photo, close, the frame cut at the eyebrows so the eyes stay out; short dark hair, three-day stubble, dark grey t-shirt. He presses a folded white cotton towel against the bridge and tip of his nose with both hands, drying it; the towel rumpled, one loose thread visible. Where the skin shows it is clean and matte, no sheen left on the T-zone, pores open and empty, thin red capillaries beside the nostril, a small scar in the right eyebrow. Morning window light, 08:10, clean side light from the left, white subway tile out of focus behind. Very shallow depth of field, focus exactly on the towel edge against the nose, slight handheld blur, sensor noise. Unretouched documentary realism, no makeup. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: he presses the folded towel once against the bridge of his nose and lifts it a centimetre, leaving the skin matte and dry. One action. Camera static handheld with micro-drift. Three seconds. His face and the towel must not change shape; no patch appears on the nose; no text, no subtitles, no watermark.
```

> **Nota de producción.** La condición del guion es la letra pequeña que evita devoluciones por mal uso, así que la toalla tiene que leerse en menos de un segundo. Cuidado: si el prompt no lo prohíbe, el modelo le pone el parche puesto debajo de la toalla.

### Toma 11 · El parche nuevo sale del liner

*11-16 s · el producto limpio antes de pegarlo*

**Qué se ve.** Macro: dos dedos levantan el parche nuevo unos milímetros de su liner transparente brillante, el gel se estira un poco al despegarse. Casi transparente con velo mate, 0,55 mm de grosor, una línea fina de brillo en el borde biselado. El sobre crema abierto, desenfocado detrás.

**Referencias que hay que adjuntar:** `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `caja` — la foto real de la caja crema de NOCTA; `parche_puesto` — la foto real del parche colocado en la nariz

**Reglas añadidas:** referencia parche_puesto; cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. STATE 1 product shot: a brand-new unused patch. The patch must be EXACTLY the product in the reference photos: same silhouette, same proportions, same translucent matte material. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides, nothing cropped. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld: a thumb and index finger lift the clean patch a few millimetres off its glossy transparent liner, the gel stretching slightly as it comes away. It is almost transparent with a matte veil, 0.55 mm thick, the bevelled edge catching one thin line of highlight. An opened cream sachet lies out of focus behind. Morning window light, 08:10, from the left. Focus on the lifted edge, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: his fingers lift the clean patch fully off the glossy liner, the gel stretching a millimetre as it releases. One action. Camera very slow push in, macro. Four seconds. The patch silhouette and its bevelled edge must not change shape, the whole patch stays inside the frame; no text, no subtitles, no watermark.
```

> **Nota de producción.** El sobre desenfocado del fondo lleva el logotipo real: como en la imagen no puede haber letras, mantenlo bien desenfocado o pide directamente que el sobre salga liso y ponlo con producto real cuando llegue el lote.

### Toma 12 · Diez segundos de presión

*11-16 s · cómo se pega bien*

**Qué se ve.** Macro de la nariz con el parche recién puesto: dos yemas presionan del centro hacia fuera sobre la lámina traslúcida, que se ve claramente cruzando el puente y las alas, un punto más clara y menos brillante que la piel, con la línea de brillo del borde biselado y sin esquinas levantadas. Debajo, los poros siguen llenos.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 2, patch just applied. The patch must be EXACTLY the product in the reference photos: same silhouette, same proportions, same translucent matte material. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, the nose filling the frame, eyes outside the frame, three-day stubble. Two fingertips press down from the centre outwards on a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, edges perfectly sealed, no lifted corners. Under it the pores are still full. The fingertip pad flattens white. Morning window light, 08:10, from the left. Very shallow depth of field, focus on the patch edge, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: the two fingertips slide once from the centre of the nose outwards along the wing, sealing the edge of the patch. One action. Camera static handheld with micro-drift, macro. Three seconds. The nose and the patch must not change shape, the patch stays translucent and sealed with no lifted corners; no text, no subtitles, no watermark.
```

> **Nota de producción.** Riesgo clásico: como el parche es traslúcido, si no se describe como algo visible la imagen parece que se está apretando la nariz, justo el mensaje contrario. Si tras varios intentos sigue invisible, sube el contraste del borde pidiendo más línea de brillo en el bisel, nunca un parche opaco.

### Toma 13 · El pack de 2 en la mano

*16-22 s · CTA, pack de 2 cajas, 29,90 €*

**Qué se ve.** Una mano sostiene las dos cajas crema idénticas, ligeramente abiertas en abanico, delante del alféizar blanco. Cartón mate, sin brillos. Encuadre cortado a las clavículas, camiseta gris oscuro, sin cara.

**Referencias que hay que adjuntar:** `caja` — la foto real de la caja crema de NOCTA

**Reglas añadidas:** cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. Offer shot, no patch on any face. Vertical 9:16 handheld iPhone photo: a man's hand holds two identical cream matte cardboard boxes fanned slightly apart in front of a white window sill, boxes exactly as in the reference photograph of the product, plain matte cardboard with no added decoration. His forearm is bare, fine dark hair, a small old scratch near the wrist, short clean nails. The frame is cut at the collarbones, dark grey t-shirt, no face in shot. Morning window light, 08:10, clean side light from the left, plain wall out of focus behind, short soft shadow on the sill. Very shallow depth of field, focus exactly on the front box corner, slight handheld blur, natural sensor noise. Unretouched documentary realism, matte surfaces, no added shine. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: his hand turns the two boxes a few degrees toward the window so the light slides across the matte cardboard. One action. Camera very slow push in. Three seconds, calm. The boxes must not change shape or proportion and the cardboard stays matte; nothing is added to the boxes; no text, no subtitles, no watermark.
```

> **Nota de producción.** Sustituye al plano de la web del guion, porque una pantalla con la garantía subrayada obligaría a dibujar letras y la regla es que en la imagen no hay texto. La captura real de la web se monta después como inserto de pantalla, o se graba con el móvil sobre el portátil.

### Toma 14 · Packshot con la prueba al lado

*16-22 s · garantía 60 días + CTA*

**Qué se ve.** Cenital ligeramente inclinada sobre la mesa de mármol crema: las dos cajas apiladas con un pequeño desfase, un sobre crema, un parche nuevo traslúcido sobre su liner brillante y, al lado, el parche usado con las manchas blancas. La oferta y la prueba en la misma imagen.

**Referencias que hay que adjuntar:** `caja` — la foto real de la caja crema de NOCTA; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz

**Reglas añadidas:** referencia parche_puesto; regla de encuadre completo del parche; contraste del packshot; cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance: one wide central lobe, two symmetrical side wings and a shallow rounded notch in the middle of the lower edge, every corner rounded. Never a straight strip, never an oval, never a shapeless blob, never black. The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. CONTRAST IS CRITICAL, THE BOX IS CREAM AND MUST NOT DISAPPEAR: put a plain dark charcoal-grey wall in soft shadow directly behind the box, clearly darker than the board, and give the box a defined shadow on the stone under its base and a bright edge where the window light catches the top corner. Cream board against a cream background reads as a pale blur at thumbnail size. Packshot, proof beside the offer. The patch must be EXACTLY the product in the reference photos: same silhouette, same proportions, same translucent matte material. COMPOSITION IS CRITICAL: both patches are entirely inside the frame with empty space around them, nothing cropped. Vertical 9:16 handheld iPhone photo looking down at a cream marble table at a slight angle: two cream matte boxes stacked a little offset, one cream sachet, a clean translucent patch resting on its glossy liner, and beside it the used patch, blotched opaque white with pale-yellow dots, curled at the edges. Faint dust and one fingerprint on the marble. Morning window light, 08:10, soft from the left, short shadows. Very shallow depth of field, focus exactly on the used patch, natural sensor noise. Unretouched documentary realism, matte cardboard, no added shine. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: a hand enters from the right and sets the used patch down beside the boxes, then withdraws. One action. Camera slow pull back over the marble. Four seconds. The boxes and both patches must not change shape, the used patch keeps its white blotches, nothing is cropped; no text, no subtitles, no watermark.
```

> **Nota de producción.** Es el fotograma final con el precio sobreimpreso después, así que deja aire arriba para los subtítulos. Packshot ideal para grabar de verdad: mármol, ventana, cajas reales y treinta segundos.

### Toma 15 · Cierre · parche puesto, empieza esta noche

*16-22 s · remate del CTA*

**Qué se ve.** Plano vertical algo más abierto, cortado a las cejas: la lámina traslúcida se ve claramente cruzando el puente y las alas de la nariz, con su contorno de mariposa y el brillo del borde, sellada; la mano acaba de bajar. Una caja crema en el alféizar, desenfocada.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `caja` — la foto real de la caja crema de NOCTA; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** referencia lamina_parche; cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. STATE 2, closing shot. The patch must be EXACTLY the product in the reference photos: same silhouette and translucent matte material. Vertical 9:16 handheld iPhone photo, waist-up but the frame cut at the eyebrows so the eyes stay out; short dark hair, three-day stubble, dark grey t-shirt, one hand lowering from the nose. A translucent matte hydrocolloid film is clearly visible across the bridge and wings of his nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the skin, edges perfectly sealed. Redness on the cheeks, fine vellus hair, a cream box standing on the sill beside him, out of focus. Morning window light, 08:10, from the left. Very shallow depth of field, focus on the nose, slight handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: his hand finishes lowering from his nose and comes to rest, the patch sitting sealed and translucent. One action. Camera slow pull back. Four seconds, settled ending. His face and the patch must not change shape, the patch stays one piece with sealed edges; no text, no subtitles, no watermark.
```

> **Nota de producción.** Cierra el círculo con la toma 1 (el mismo parche, la misma nariz) y da pie a la variante larga. Si hay que elegir entre la 14 y la 15 como último fotograma, el packshot convierte mejor y este vale como penúltimo.

## Qué puede salir mal en este anuncio

- El despegado a medias (tomas 1, 3 y 4) es el fallo número uno: si se describe como "la mitad izquierda despegada y la derecha pegada", el modelo genera DOS parches. Hay que decir siempre ONE CONTINUOUS SHEET, una sola frontera, y rechazar cualquier imagen con parche sobre una zona ya despegada. Si tras seis intentos no sale, se sustituye por la toma 7 (parche fuera delante de la nariz limpia) sin perder nada del guion.
- Mezclar los estados 4 y 5 en una misma imagen (parche en la mano y a la vez pegado en la nariz). Por eso cada prompt empieza declarando el estado; cualquier imagen que mezcle dos se descarta directamente.
- La nariz "después" sale sucia: el retrato de referencia de Álex tiene puntos negros y el modelo los conserva en las tomas 3, 4, 7 y 8. Solución obligatoria: generar primero la toma 8 y adjuntarla como SEGUNDA referencia en las demás, diciendo que la piel debe parecerse exactamente a esa segunda referencia, con los poros abiertos y VACÍOS.
- El parche traslúcido se vuelve invisible en las tomas 12 y 15 y parece que el hombre se está apretando la nariz, el mensaje contrario. Hay que describirlo como algo que se ve: contorno de mariposa, brillo fino en el borde biselado, un punto más claro y menos brillante que la piel.
- El troquel recortado por el borde del cuadro en las tomas 5, 6, 9, 11 y 14: el parche deja de leerse y parece una mancha. Va siempre la frase de composición con aire por los cuatro lados, y se descarta cualquier generación donde el parche toque el borde.
- Los poros en cuadrícula en las macros 3, 6, 8 y 12: delatan el render. Exigir distribución completamente irregular, tamaños y ángulos distintos, y cerrar con "not a 3D render".
- La identidad: el guion es "Todos, sin identidad explícita". Si algún encuadre sube por encima de las cejas y aparecen los ojos, el anuncio deja de ser universal. Todos los prompts cortan el cuadro a la altura de las cejas.
- Reflejos: cualquier espejo, grifo o cristal que devuelva a una persona es la vía rápida a un brazo de más o a una segunda figura en cuadro. Fondo de pared lisa, alféizar y azulejo desenfocado, y nada más.
- La toma 4 del guion pide la web con la garantía subrayada, pero ninguna imagen puede llevar letras. Se ha sustituido por las tomas 13 y 14; la pantalla real de la web se graba aparte y se monta como inserto, si no, se cae en un packshot con texto inventado ilegible.
- La continuidad del parche usado: en las tomas 1, 4, 5, 6, 7, 9 y 14 tiene que ser el MISMO trozo, con las mismas manchas. Genera primero la 5, y úsala como referencia en las demás para que las manchas no cambien de sitio de un plano a otro.
- La deriva de luz entre generaciones: si un plano sale con luz cenital o azulada deja de parecer la misma mañana. Se repite indicando siempre 08:10, luz lateral desde la izquierda, y se descarta cualquier imagen con sombras hacia abajo.
- Los vídeos con dos acciones deforman la cara o el producto. Un solo verbo por prompt, cámara estática con micro-deriva o push in muy lento, y siempre la coletilla de que cara y producto no cambian de forma y no aparece texto.


[Volver al índice de los 25 anuncios](../PROMPTS_375_TOMAS.md)

