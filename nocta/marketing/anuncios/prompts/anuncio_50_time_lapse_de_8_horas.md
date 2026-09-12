# Anuncio 50 · Time-lapse de 8 horas

[Volver al índice de los 25 anuncios](../PROMPTS_375_TOMAS.md)

**Avatar.** Álex, 36 (el guion dice «todos, sin identidad explícita», así que se usa a Álex pero SIEMPRE encuadrado de la ceja a la boca, en macro o de espaldas a la identidad: nunca un plano de ojos que lo convierta en «el testimonio de Álex». Es el avatar con la nariz claramente grasa y filamentos oscuros, que es lo único que este anuncio necesita demostrar). Pelo corto oscuro, barba de tres días, cicatriz pequeña en la ceja derecha, rojez en las mejillas, camiseta gris oscuro.

**Sitio y luz.** Tres de los cinco sitios de la biblia, encadenados como una sola noche real. (2) Baño de noche, plafón cenital duro, ventana negra, azulejo metro: tomas 1-4, que son el time-lapse del gancho. (3) Dormitorio de noche, lámpara de mesilla cálida y sábana blanca arrugada: toma 6, el «mientras duermes». (4) Ventana de mañana / baño con luz lateral limpia de las 08:00: tomas 5 y 7-12, la retirada y el parche a contraluz, que es el plano que pide el guion. (5) Mesa de mármol crema, luz suave de ventana 10:00: tomas 13-15, el bloque de CTA. No se usa el baño de día porque el arco del anuncio es noche → mañana, y meter la luz de las 10:00 en la cara rompería el relato; el mármol de las 10:00 solo aparece cuando ya no hay cara en cuadro.

**Continuidad (lo que se repite en las 15 tomas).** Una sola persona, una sola noche. Camiseta gris oscuro lisa en las 15 tomas donde se le ve el cuerpo (también en el dormitorio: duerme con la misma camiseta, es lo que hace que la mañana y la noche se lean como continuas). Pelo corto oscuro despeinado igual en todas, barba de tres días idéntica, cicatriz en la ceja derecha, rojez en las mejillas. A partir de la toma 5 (mañana) y hasta la 12 aparece la marca de la almohada en la mejilla izquierda y legañilla en el lagrimal: ese detalle es la prueba de que es la mañana siguiente y tiene que estar en 5, 8, 9 y 10. La luz cambia una sola vez y con motivo: plafón cenital duro (1-4, 6 con mesilla) → ventana lateral izquierda limpia de las 08:00 (5, 7-12) → ventana suave de las 10:00 sobre mármol (13-15). Nunca hay espejo, ni grifo devolviendo la cara, ni reflejo en la ventana en ninguna toma. El parche es el mismo parche físico a lo largo de las tomas 1-11: se pone transparente (1-2), se nubla (3), medio blanco (4, 6), saturado (5, 7-8), se despega (9) y acaba en la mano (10-11). El parche de la toma 14 es otro, nuevo, sobre su liner, y eso es coherente porque ya es el packshot. El reloj analógico sin números de la toma 4 es el mismo objeto de la balda en las tomas 1-4 (desenfocado, no hace falta que se reconozca).

**Orden de montaje.** Los 15 planos van en orden numérico, 1 → 15, sin saltos, pero con duraciones de montaje muy distintas a las del clip generado: los clips salen de 3 a 5 s y en la línea de tiempo se recortan. Reparto sobre los 20 s del guion. Bloque 1 (0-4 s, voz «Ocho horas en ocho segundos: mira cómo el parche se va llenando»): tomas 1 (o 2, según la variante A/B que se pruebe), 3, 4 y 5 cortadas a menos de un segundo cada una, cortes secos sin transición, para que se lean como un time-lapse; la toma 2 solo entra si NO se ha usado como primer fotograma, y entonces va en segundo lugar medio segundo. El texto grande del gancho («8 horas en 8 segundos») entra en el fotograma 1 y se mantiene los 3 primeros segundos. Bloque 2 (4-13 s, voz «Mientras duermes, se llena de la grasa que había dentro. Por la mañana lo ves»): aquí el ritmo se frena. Toma 6 completa (2 s) sobre «mientras duermes»; toma 7 (1,5 s) justo en «la grasa que había dentro»; toma 8 (0,8 s) como transición; toma 9 (2,5 s, el despegado) empieza exactamente en «Por la mañana»; toma 10 (1,2 s) y toma 11 (2 s) cierran el bloque, con el rótulo «Se llena de grasa» sobre la 7 y la 11. La toma 12 (nariz limpia, 1 s) se monta a caballo entre los dos bloques, en el silencio antes del CTA: es el respiro que remata la demostración. Bloque 3 (13-20 s, voz «Y si no te convence, te devolvemos el dinero. Pack de 2 cajas, 29,90 €, envío gratis desde España»): toma 13 (1,5 s) al empezar la frase, toma 14 (2,5 s) sobre el precio, grabación de pantalla real de la ficha Nariz con el pack de 2 (2 s) y toma 15 (1,5 s) como último fotograma con los subtítulos de la garantía de 60 días encima. La voz se graba entera de una sola pasada y se monta debajo; los clips van mudos. Si el anuncio se corta a 15 s para una variante, se caen las tomas 8, 12 y 13, que son las tres prescindibles sin romper el relato.


## El anuncio entero en un prompt para copiar y pegar

Esto es el anuncio completo en 2 bloque(s), con los cortes duros dentro del propio prompt. Es el formato que entiende el generador de vídeo: un clip con varios cortes sale más barato y mucho más consistente que generar los planos sueltos y pegarlos después. Se adjuntan como referencia la foto del personaje, la del parche real y la de la caja, y se usan las imágenes de las tomas como fotogramas de arranque de cada corte.

**Bloque 1 · tomas 1 a 8 · unos 30 s**

```text
Vertical 9:16 handheld iPhone UGC ad, shot on a phone in one take and cut 7 times.
IDENTITY LOCK: the same person, the same clothes, the same hair and the same room in every cut, exactly as in the attached reference photographs. Nobody else appears.
PRODUCT LOCK: the patch is the product in the attached reference photographs. Same silhouette, same proportions, same translucent matte material. It never changes shape, never turns opaque black, never becomes a straight strip or an oval, and the box never shows text that is not printed on the reference box.
HANDS: in every cut, each visible hand has one job and only one; a hand that is not acting stays out of frame. No mirrors, no reflections, no phone visible in frame.
PACE: each cut is one single action, held steady, no zoom inside a cut unless the cut asks for it.
No on-screen text, no subtitles, no captions, no logos, no watermark. No music and no dialogue: silent.

Cut 1: The man breathes in once and the nostril wings widen a couple of millimetres under the translucent patch
Hard cut to.
Cut 2: He turns his head about ten degrees back towards the lens so the patch edge catches the ceiling light
Hard cut to.
Cut 3: The milky blooms inside the film spread outwards very slightly, like ink soaking into paper, while the skin stays completely still
Hard cut to.
Cut 4: The clock hands behind him jump forward in small time-lapse steps while he stays perfectly still
Hard cut to.
Cut 5: He leans a few centimetres closer to the lens to inspect the loaded patch, and stops
Hard cut to.
Cut 6: His chest and shoulder rise and fall once in a slow sleeping breath, everything else still
Hard cut to.
Cut 7: The man exhales and the nostril wing under the loaded patch moves a millimetre, making the light slide across the milky white islands
Hard cut to.
Cut 8: His thumb and index finger tighten on the corner of the patch and the outer millimetre of the wing lifts free of the skin
End on the last frame and hold it. No fades, no dissolves, no transitions of any kind: every change of shot is a hard cut.
```

**Bloque 2 · tomas 9 a 15 · unos 30 s**

```text
Vertical 9:16 handheld iPhone UGC ad, shot on a phone in one take and cut 6 times.
IDENTITY LOCK: the same person, the same clothes, the same hair and the same room in every cut, exactly as in the attached reference photographs. Nobody else appears.
PRODUCT LOCK: the patch is the product in the attached reference photographs. Same silhouette, same proportions, same translucent matte material. It never changes shape, never turns opaque black, never becomes a straight strip or an oval, and the box never shows text that is not printed on the reference box.
HANDS: in every cut, each visible hand has one job and only one; a hand that is not acting stays out of frame. No mirrors, no reflections, no phone visible in frame.
PACE: each cut is one single action, held steady, no zoom inside a cut unless the cut asks for it.
No on-screen text, no subtitles, no captions, no logos, no watermark. No music and no dialogue: silent.

Cut 1: He draws his fingers a centimetre further to the left, parallel to the skin, so the single boundary travels a little further across the ridge and more clean skin appears
Hard cut to.
Cut 2: He rotates the used patch about twenty degrees between his fingers so the light rakes across the milky islands and the raised plugs
Hard cut to.
Cut 3: His two fingers tilt the used patch slowly towards the window so the backlight passes through the translucent rim and the opaque islands go darker
Hard cut to.
Cut 4: The nose turns a few degrees towards the window so the light travels across the empty pores
Hard cut to.
Cut 5: His hand pulls the sachet fully clear of the box and lifts it two centimetres
Hard cut to.
Cut 6: The light on the marble brightens very slightly, as if a cloud passes, and a thin highlight travels along the bevelled edge of the patch
Hard cut to.
Cut 7: He pushes the two boxes about four centimetres towards the lens in one small offering gesture and holds them there
End on the last frame and hold it. No fades, no dissolves, no transitions of any kind: every change of shot is a hard cut.
```

> A 13 de estas 15 tomas se les ha añadido automáticamente alguna de las reglas comprobadas (fidelidad del producto, encuadre completo del parche, nariz limpia, poros irregulares, física del despegado o consecuencias de la luz de noche). Van al principio del prompt y están marcadas en la línea «Reglas añadidas».


## Las 15 tomas, una a una

### Toma 1 · Gancho A · parche recién puesto, 23:32

*0-4 s · gancho, time-lapse nocturno del parche*

**Qué se ve.** Macro frontal de la nariz y los pómulos, de noche. El parche acaba de ponerse: se ve traslúcido, mate, con el troquel de mariposa y el borde biselado cogiendo una línea fina de brillo. La nariz debajo sigue llena. Es el primer fotograma del anuncio.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** consecuencias de la luz de noche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
IT MUST READ AS NIGHT: everything beyond the light source falls into real darkness, any window in shot is black, the shadows are short and hard with almost no fill, and there is heavy sensor noise in the shadows. No daylight, no soft window light, no blue sky. STATE 2, patch just applied. The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same translucent matte material. Vertical 9:16 handheld iPhone photo, tight on the nose and cheeks of a 36-year-old Spanish man, three-day stubble, small scar on the right eyebrow, dark grey t-shirt. A translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, lighter and less shiny than the skin, edges sealed. Fine vellus hair, thin red capillaries, uneven tone. IT IS NIGHT: one hard ceiling fixture straight overhead, short hard shadows down under the nose, black window behind, white subway tile. Shallow depth of field, focus on the patch edge, slight handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: the man breathes in once and the nostril wings widen a couple of millimetres under the translucent patch. Nothing else moves. Static handheld camera with micro-drift, very slight breathing sway, calm even pace, 3 seconds. His face and the patch must not change shape, the butterfly outline stays identical. No text, no subtitles, no watermark.
```

> **Nota de producción.** Es el fotograma que decide la retención: hay que generarlo tres o cuatro veces y quedarse con el que tenga el borde del parche más legible. Riesgo número uno de la biblia: el parche traslúcido sale invisible y parece que se aprieta la nariz. Si pasa, subir el peso de parche_puesto y repetir, no retocar.

### Toma 2 · Gancho B · mismo minuto, tres cuartos

*0-4 s · gancho, time-lapse nocturno del parche*

**Qué se ve.** Exactamente el mismo momento de la toma 1 desde arriba y en tres cuartos, algo más abierto (de debajo de los ojos a la barbilla). El parche se ve envolviendo el ala izquierda de la nariz. Es la variante A/B del gancho.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** referencia lamina_parche; consecuencias de la luz de noche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
IT MUST READ AS NIGHT: everything beyond the light source falls into real darkness, any window in shot is black, the shadows are short and hard with almost no fill, and there is heavy sensor noise in the shadows. No daylight, no soft window light, no blue sky. STATE 2, same night, same minute, other angle. The patch must be EXACTLY the product in the reference photographs. Vertical 9:16 handheld iPhone photo, three-quarter view of the same 36-year-old man from just below the eyeline to the chin, short dark hair, three-day stubble, dark grey t-shirt, phone held slightly above him. The translucent matte hydrocolloid film is clearly visible wrapping the left nostril wing, bevelled edge lifting a thin line of highlight, the material a shade lighter and flatter than the surrounding skin. Stubble shadow, one small blemish on the cheek, pores on the wing. IT IS NIGHT: hard ceiling fixture overhead, dark eye sockets, bright cheekbone, pure black window, white subway tile. Shallow depth of field, focus on the nostril wing, handheld blur, sensor noise. No skin smoothing, unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: he turns his head about ten degrees back towards the lens so the patch edge catches the ceiling light. One single movement, then stillness. Static handheld camera with micro-drift, slow and unhurried, 4 seconds. The face and the patch must not change shape or size, the butterfly outline stays identical, no new hands enter frame. No text, no subtitles, no watermark.
```

> **Nota de producción.** Esta es la alternativa del test A/B: en el montaje se usa 1 o 2, nunca las dos como primer plano. Guardar las dos versiones exportadas para lanzar las tres variantes de gancho del guion (prueba / pregunta / dato) sin volver a generar.

### Toma 3 · Dos horas dentro · primeras nubes

*0-4 s · gancho, time-lapse nocturno del parche*

**Qué se ve.** Macro cerrado del lado derecho del puente de la nariz. El parche sigue casi transparente pero han aparecido tres o cuatro nubes lechosas justo encima de los grupos de poros. Es el segundo fotograma del time-lapse.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** regla de poros irregulares; consecuencias de la luz de noche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. IT MUST READ AS NIGHT: everything beyond the light source falls into real darkness, any window in shot is black, the shadows are short and hard with almost no fill, and there is heavy sensor noise in the shadows. No daylight, no soft window light, no blue sky. STATE 2 turning into STATE 3, roughly two hours in. The patch must be EXACTLY the product in the reference photographs. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, filling the frame with the right side of the bridge of the nose of the same man, skin only. The hydrocolloid film is still mostly translucent but the first faint milky blooms are appearing inside it, three or four soft cloudy patches sitting exactly over the pore clusters, edges still clear and sealed. Pores scattered in a completely irregular, uneven distribution, every pore a different size and angle, never in rows. IT IS NIGHT: hard ceiling fixture overhead, short shadows straight down. Shallow depth of field, focus on the cloudy blooms, sensor noise, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: the milky blooms inside the film spread outwards very slightly, like ink soaking into paper, while the skin stays completely still. One single change, nothing else. Static handheld camera with micro-drift, slow steady pace, 4 seconds. The nose and the patch must not change shape or outline, no new blotches jumping in, no morphing of the skin. No text, no subtitles, no watermark.
```

> **Nota de producción.** Las tomas 1, 3, 4 y 5 tienen que estar encuadradas casi igual para que el corte entre ellas se lea como un time-lapse y no como cuatro planos distintos. Truco barato: generar la 3 partiendo de la 1 como referencia adicional. Cuando llegue el lote, esta progresión se graba de verdad con el time-lapse del móvil y una lámpara fija en 8 horas: saldrá mejor que cualquier generación.

### Toma 4 · Cuatro horas dentro · medio blanco y el reloj

*0-4 s · gancho, time-lapse nocturno del parche*

**Qué se ve.** Plano de la ceja a la boca, de noche. El parche ya está blanco a manchas sobre el puente y la punta, traslúcido solo en el borde. Detrás, desenfocado en la balda, un reloj redondo analógico con marcas lisas y sin números: es el reloj que pide el guion, sin una sola letra en cuadro.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** referencia lamina_parche; consecuencias de la luz de noche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
IT MUST READ AS NIGHT: everything beyond the light source falls into real darkness, any window in shot is black, the shadows are short and hard with almost no fill, and there is heavy sensor noise in the shadows. No daylight, no soft window light, no blue sky. STATE 3, roughly four hours in. The patch must be EXACTLY the product in the reference photographs. Vertical 9:16 handheld iPhone photo of the same 36-year-old man, short dark hair, three-day stubble, dark grey t-shirt, framed from the brow to the mouth. The hydrocolloid film is now half opaque white in irregular blotches over the bridge and the tip, still translucent at the rim, the bevelled edge sealed flat. Behind him, thrown out of focus on the tiled shelf, a small round analogue clock with plain baton markers and no numerals. Thin capillaries, oily shine on the forehead. IT IS NIGHT: one hard ceiling fixture straight overhead, dark eye sockets, pure black window, white subway tile. Shallow depth of field, focus on the white blotches, handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: the clock hands behind him jump forward in small time-lapse steps while he stays perfectly still. Only the hands move. Static handheld camera with micro-drift, staccato time-lapse rhythm, 4 seconds. The man's face and the patch must not change shape, the white blotches keep the same pattern, the clock never grows numerals or lettering. No text, no subtitles, no watermark.
```

> **Nota de producción.** El reloj es el único objeto que puede traer números y por eso se pide analógico y sin numeración: un reloj digital metería texto en la imagen y estaría prohibido. Si el modelo le pone números de todas formas, se desenfoca más en el prompt o se sustituye por la ventana pasando de negro a gris.

### Toma 5 · Ocho horas · el parche cargado, 08:00

*4-13 s · «mientras duermes se llena; por la mañana lo ves»*

**Qué se ve.** Último fotograma del time-lapse y primero de la mañana: la nariz de cerca con el parche blanco opaco a manchas y puntitos amarillentos donde estaban los poros. Ya no hay plafón: entra luz lateral limpia de ventana. Marca de almohada en la mejilla.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 3, morning, the patch fully loaded. The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions. Vertical 9:16 handheld iPhone photo, close on the nose of the same man, short dark hair, three-day stubble, dark grey t-shirt, crease marks from the pillow on his left cheek. The hydrocolloid is now opaque white in blotches with small pale-yellow dots where the pores were, still translucent at the edges, edges still sealed against the skin. Sleep in the corner of the eye, uneven tone, vellus hair. Clean lateral daylight from a window on the left, 08:00, no ceiling light, soft short shadow under the nose, white subway tile. Shallow depth of field, focus on the pale-yellow dots, slight handheld blur, sensor noise. No skin smoothing, unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: he leans a few centimetres closer to the lens to inspect the loaded patch, and stops. One single movement. Very slow push in of about five percent, calm morning pace, 4 seconds. His face and the patch must not change shape, the white blotches and pale-yellow dots stay exactly where they are, no hands enter the frame. No text, no subtitles, no watermark.
```

> **Nota de producción.** Es la bisagra del anuncio: cierra el time-lapse y abre el bloque de la mañana. El cambio de luz tiene que notarse en el mismo corte que el cambio de voz. Este plano y el 7 son los que de verdad convienen grabar con el móvil cuando llegue el lote: el parche cargado real tiene un blanco irregular que el modelo tiende a hacer demasiado limpio y regular.

### Toma 6 · Mientras duermes

*4-13 s · «mientras duermes se llena; por la mañana lo ves»*

**Qué se ve.** Cenital suave: él dormido boca arriba sobre la sábana blanca arrugada, lámpara de mesilla cálida a la derecha, el resto en penumbra. El parche se lee claramente en la nariz, medio blanco. Es la imagen literal de la voz.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** referencia lamina_parche; consecuencias de la luz de noche

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
IT MUST READ AS NIGHT: everything beyond the light source falls into real darkness, any window in shot is black, the shadows are short and hard with almost no fill, and there is heavy sensor noise in the shadows. No daylight, no soft window light, no blue sky. STATE 3, the middle of the night. The patch must be EXACTLY the product in the reference photographs: same butterfly silhouette, same translucent matte material. Vertical 9:16 handheld iPhone photo looking down at the same 36-year-old man asleep on his back on a white crumpled sheet, short dark hair, three-day stubble, dark grey t-shirt, head turned slightly right, mouth barely open. The hydrocolloid film reads clearly on his nose, half opaque white in blotches over the bridge, translucent rim catching a thin line of light. Stubble, a mole near the jaw, pores on the cheek. A warm bedside lamp low on the right, everything beyond the pillow falling into darkness, deep shadow in the eye sockets. Shallow depth of field, focus on the nose, handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 5 s):**

```text
The image comes alive: his chest and shoulder rise and fall once in a slow sleeping breath, everything else still. One single action. Static handheld camera with micro-drift, very slow and quiet pace, 5 seconds. His face and the patch must not change shape, the blotches stay identical, his eyes stay closed, no second person or extra hand appears. No text, no subtitles, no watermark.
```

> **Nota de producción.** Es el único plano que rompe el eje del baño y por eso funciona: da aire después del time-lapse. Cuidado con la mano: si el modelo mete una mano sobre la sábana suele salir deformada; el prompt ya dice que no entra ninguna. Cronológicamente va antes que la 5, pero en el montaje va después porque ilustra la voz «mientras duermes».

### Toma 7 · Macro de la prueba · los puntos amarillos

*4-13 s · «mientras duermes se llena; por la mañana lo ves»*

**Qué se ve.** Macro extremo de la punta y el ala izquierda con el parche todavía puesto y saturado: islas blancas lechosas y decenas de cúpulas blanco-amarillentas empujadas desde abajo. Es la prueba objetiva del mecanismo, todavía sobre la cara.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Reglas añadidas:** regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 3, morning, proof macro. The patch must be EXACTLY the product in the reference photographs. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, the frame filled by the tip and left wing of the nose of the same man, still on his face. The hydrocolloid is opaque milky white in irregular islands with dozens of small pale-yellow and white dots pushed up from underneath where the pores were, the rim still translucent, the bevelled edge sealed. The white islands sit in an irregular uneven distribution, every dot a different size and angle, never in rows or a grid. Clean lateral window light from the left, 08:00, short soft shadow. Shallow depth of field, focus on the yellow dots, sensor noise, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: the man exhales and the nostril wing under the loaded patch moves a millimetre, making the light slide across the milky white islands. One single action. Static handheld camera with micro-drift, slow pace, 3 seconds. The nose and the patch must not change shape, the islands and the pale-yellow dots keep exactly the same pattern, nothing new appears. No text, no subtitles, no watermark.
```

> **Nota de producción.** Plano a grabar de verdad con la lente macro de clip cuando llegue el lote. Es el que más delata el render: la distribución de los puntos sale en cuadrícula. Si se genera, comprobar poro a poro que no hay rejilla antes de darlo por bueno.

### Toma 8 · El pellizco · un segundo antes de tirar

*4-13 s · retirada por la mañana*

**Qué se ve.** Nariz y mano derecha. Pulgar e índice pinzan la esquina exterior del ala izquierda del parche cargado; la piel se hunde un poco por la presión y el resto de la lámina sigue plana y pegada. Arranca la retirada.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** referencia lamina_parche; física del despegado; regla de nariz limpia; referencia nariz_limpia

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
PHYSICS OF THE PEEL: he peels the patch off in ONE CONTINUOUS SHEET. One part is still stuck flat and translucent on the nose and, without any break, it lifts along ONE single boundary and hangs from his fingers, curled and limp, its underside turned to the camera. There is no patch material anywhere over skin that has already been uncovered. That underside shows irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores. The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 3, the instant before peeling. The patch must be EXACTLY the product in the reference photographs. Vertical 9:16 handheld iPhone photo, close on the nose and right hand of the same man, short dark hair, three-day stubble, dark grey t-shirt. His thumb and index finger pinch the outer corner of the left wing of the loaded patch, the skin dimpling a little under the pressure, the rest of the film still flat and sealed, opaque white in blotches over the bridge with pale-yellow dots. Short nails, a hangnail, coarse hair on the knuckles. Clean lateral daylight from a window on the left, 08:00, short shadow of the hand across the cheek, white subway tile. Shallow depth of field, focus on the pinched corner, handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 3 s):**

```text
The image comes alive: his thumb and index finger tighten on the corner of the patch and the outer millimetre of the wing lifts free of the skin. One single small action, nothing more. Static handheld camera with micro-drift, careful slow pace, 3 seconds. His face, his hand and the patch must not change shape, no second patch appears, the rest of the film stays stuck and flat. No text, no subtitles, no watermark.
```

> **Nota de producción.** Plano corto de transición, sirve para que el despegado de la toma 9 no aparezca de la nada. Vigilar los dedos: manos en primer término con seis dedos es el fallo más común. Si sale mal dos veces, se acorta a un frame de medio segundo o se cae del montaje sin que el anuncio lo note.

### Toma 9 · A medio quitar · una sola lámina

*4-13 s · retirada por la mañana*

**Qué se ve.** El parche sale en una sola lámina continua: la parte derecha sigue pegada, plana y blanquecina, y sin ninguna interrupción se levanta por una única frontera a lo largo del caballete y cuelga de los dedos a la izquierda, enrollada, con el reverso hacia la cámara lleno de cúpulas amarillentas. La piel que ya ha quedado al aire está limpia.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** física del despegado; regla de nariz limpia; referencia nariz_limpia

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
PHYSICS OF THE PEEL: he peels the patch off in ONE CONTINUOUS SHEET. One part is still stuck flat and translucent on the nose and, without any break, it lifts along ONE single boundary and hangs from his fingers, curled and limp, its underside turned to the camera. There is no patch material anywhere over skin that has already been uncovered. That underside shows irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow domes, the plugs pulled out of the pores. The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 4, halfway off. The patch must be EXACTLY the product in the reference photographs. Vertical 9:16 handheld iPhone photo, close on the nose and hand of the same man, short dark hair, three-day stubble, dark grey t-shirt. He is peeling the patch off in ONE CONTINUOUS SHEET: the right portion is still stuck flat and blotched white on the right side of the nose, and WITHOUT ANY BREAK it lifts along one single boundary down the ridge and hangs from his thumb and index finger at the left, curled, limp, underside showing irregular opaque milky-white islands studded with small raised pale-yellow domes. The uncovered skin is clean, pores open, EMPTY and flat, no dark dots. Clean lateral window light from the left, 08:00. Shallow depth of field, focus on the boundary, sensor noise. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 5 s):**

```text
The image comes alive: he draws his fingers a centimetre further to the left, parallel to the skin, so the single boundary travels a little further across the ridge and more clean skin appears. One single action. Static handheld camera with micro-drift, slow deliberate pace, 5 seconds. The face and the patch must not change shape, there is only ever ONE sheet and ONE boundary, no second patch. No text, no subtitles, no watermark.
```

> **Nota de producción.** El plano más difícil del anuncio con diferencia. Dos fallos típicos: dos parches separados en vez de uno, y parche sobre piel ya despegada. Si no sale a la tercera, la biblia ya da la salida: se cambia por la toma 10 (parche fuera delante de la nariz limpia) y el anuncio no pierde nada. Cuando llegue el lote, este es EL plano a grabar de verdad con el móvil.

### Toma 10 · El parche fuera, delante de la nariz limpia

*4-13 s · retirada por la mañana*

**Qué se ve.** Sujeta el parche usado entre pulgar e índice a un palmo de su propia nariz: el parche nítido, la cara desenfocada detrás. El parche entero dentro del cuadro, blando, abombado, con islas blancas y tapones. Detrás, la nariz limpia, poros vacíos.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** regla de nariz limpia; referencia nariz_limpia

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. STATE 5, fully off. The patch must be EXACTLY the product in the reference photographs: same butterfly silhouette. Vertical 9:16 handheld iPhone photo of the same man, short dark hair, three-day stubble, dark grey t-shirt, holding the used patch between thumb and index finger fifteen centimetres in front of his own nose, the patch sharp, his face soft behind. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides, nothing cropped, the whole butterfly outline readable at a glance. It is limp, slightly domed, curling at the rim, milky white islands with pale-yellow plugs. Behind it his nose is clean, pores open, EMPTY and flat, no dark dots. Clean lateral daylight from the left, 08:00, white subway tile. Shallow depth of field, handheld blur, sensor noise. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: he rotates the used patch about twenty degrees between his fingers so the light rakes across the milky islands and the raised plugs. One single action, his face stays where it is. Static handheld camera with micro-drift, slow pace, 4 seconds. His face and the patch must not change shape or outline, the patch is never cropped by the frame, no second patch appears. No text, no subtitles, no watermark.
```

> **Nota de producción.** Es el plano seguro del anuncio: enseña a la vez la suciedad recogida y la nariz limpia, y sale bien casi siempre. Adjuntar como segunda referencia una imagen ya generada de esa nariz limpia, o el modelo le conservará los puntos negros del avatar.

### Toma 11 · La prueba a contraluz

*4-13 s · parche a contraluz*

**Qué se ve.** Dos dedos sostienen el parche usado contra la ventana de la mañana. El contraluz convierte las zonas cargadas en islas opacas y el borde en un filo traslúcido; las decenas de cúpulas se leen como bultos a contraluz. El parche entero en cuadro, con aire alrededor.

**Referencias que hay que adjuntar:** `parche_puesto` — la foto real del parche colocado en la nariz; `parche_liner` — la foto real del parche sobre su liner, junto a la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
STATE 5, the proof, backlit. The patch must be EXACTLY the product in the reference photographs: same silhouette. Vertical 9:16 handheld iPhone photo, two fingers of the same man holding the used patch up against a bright morning window, a sliver of white subway tile at the bottom of the frame, his dark grey t-shirt sleeve out of focus at the edge. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame with empty space on all four sides, nothing cropped, the whole butterfly outline readable at a glance. Backlight turns the loaded areas into dense opaque islands and the rim into a glassy translucent edge, dozens of small domes reading as bumps against the light. Fingerprint ridges, a chipped nail. Shallow depth of field, focus on the domes, sensor noise. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 5 s):**

```text
The image comes alive: his two fingers tilt the used patch slowly towards the window so the backlight passes through the translucent rim and the opaque islands go darker. One single action. Static handheld camera with micro-drift, slow even pace, 5 seconds. The patch must not change shape or outline and is never cropped by the frame, the hand does not deform, no second patch appears. No text, no subtitles, no watermark.
```

> **Nota de producción.** Este es el plano que el guion nombra explícitamente («parche a contraluz») y el que copiamos del ganador rank 5. Es también el que MEJOR sale grabado de verdad: dos dedos, un parche usado y la ventana, treinta segundos de rodaje y cero riesgo de render. Generarlo solo para tener el anuncio montado antes de que llegue el lote.

### Toma 12 · La nariz después

*4-13 s · cierre del mecanismo, antes del CTA*

**Qué se ve.** Macro de la nariz con el mismo encuadre de la toma 1 pero sin parche: los poros abiertos y VACÍOS, ni un punto oscuro, la piel algo rosada y mate y la marca tenue de donde estaba el borde del parche. Es el antes/después sin decirlo.

**Referencias que hay que adjuntar:** `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio); `nariz_limpia` — un fotograma ya generado de esa misma nariz limpia (obligatorio en tomas de «después»)

**Reglas añadidas:** regla de nariz limpia; referencia nariz_limpia; regla de poros irregulares

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The reference photograph of the clean nose is what the skin must look like: the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere on the uncovered skin, only a faint pink adhesive mark. The pores are scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense clusters and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid, never evenly spaced. STATE 5, the result, same framing as the opening shot. The SECOND reference is his nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that second reference, open EMPTY pores, no dark dots. Extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld, filling the frame with the bridge and tip of the nose of the same man, no patch anywhere. The pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere, the skin pink and matte, a faint line where the patch rim sat, fine vellus hair, thin capillaries. Pores scattered in a completely irregular, uneven distribution, never in rows. Clean lateral window light from the left, 08:00. Shallow depth of field, sensor noise, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: the nose turns a few degrees towards the window so the light travels across the empty pores. One single movement. Very slow push in of about five percent, calm pace, 4 seconds. The nose must not change shape, the pores stay open and empty, no dark dots or plugs may appear, no patch and no hand enter the frame. No text, no subtitles, no watermark.
```

> **Nota de producción.** Requiere OBLIGATORIAMENTE la segunda referencia de nariz limpia: con solo el retrato del avatar, el modelo conserva los puntos negros y la toma queda inservible. Si no existe todavía esa referencia limpia, generar primero esta imagen sola, elegir la buena y guardarla como referencia fija para el resto de anuncios.

### Toma 13 · Sacar el sobre de la caja

*13-20 s · garantía y CTA*

**Qué se ve.** Cenital sobre la mesa de mármol crema: la caja NOCTA abierta y su mano sacando un sobrecito individual. Entra el producto justo cuando la voz pasa a la oferta.

**Referencias que hay que adjuntar:** `caja` — la foto real de la caja crema de NOCTA; `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio)

**Reglas añadidas:** cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. Product, morning. Vertical 9:16 handheld iPhone photo looking down at a cream matte cardboard NOCTA box lying open on a cream marble table, exactly as in the reference photograph of the box, and the same man's hand, dark grey t-shirt cuff at the wrist, drawing one cream matte individual sachet out of it. Short nails, a hangnail, coarse hair on the knuckles, one small scar on the index finger. The cardboard shows its matte uncoated grain and a soft dent at the corner. Soft window light from the left, 10:00, short shadow of the hand on the marble, no other lamp. Shallow depth of field, focus on the sachet between his fingers, slight handheld motion blur, natural sensor noise. Unretouched documentary realism, not a 3D render. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: his hand pulls the sachet fully clear of the box and lifts it two centimetres. One single action. Static handheld camera with micro-drift, unhurried pace, 4 seconds. The box and the sachet must not change shape or proportions, the cardboard stays matte and plain, no lettering or logo appears anywhere, no second hand enters the frame. No text, no subtitles, no watermark.
```

> **Nota de producción.** Contradicción práctica que hay que asumir: la caja real lleva el logotipo impreso, pero el prompt prohíbe texto porque si no el modelo inventa tipografía falsa. Se genera sin letras y, cuando llegue la caja de verdad, se regraban las tomas 13, 14 y 15 con el móvil sobre el mármol: son las tres más fáciles de rodar y las que más ganan siendo reales.

### Toma 14 · Packshot del pack de 2

*13-20 s · garantía y CTA*

**Qué se ve.** Las dos cajas crema del pack sobre el mármol, una de pie y otra tumbada, y delante un parche nuevo sobre su liner transparente brillante: casi transparente, con su velo mate, 0,55 mm de grosor y el borde biselado. El parche entero dentro del cuadro.

**Referencias que hay que adjuntar:** `caja` — la foto real de la caja crema de NOCTA; `parche_liner` — la foto real del parche sobre su liner, junto a la caja; `parche_puesto` — la foto real del parche colocado en la nariz

**Reglas añadidas:** referencia parche_puesto; contraste del packshot; cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. CONTRAST IS CRITICAL, THE BOX IS CREAM AND MUST NOT DISAPPEAR: put a plain dark charcoal-grey wall in soft shadow directly behind the box, clearly darker than the board, and give the box a defined shadow on the stone under its base and a bright edge where the window light catches the top corner. Cream board against a cream background reads as a pale blur at thumbnail size. Packshot, the pack of two. The patch must be EXACTLY the product in the reference photographs. Vertical 9:16 handheld iPhone photo, slightly above a cream marble table, two identical cream matte cardboard NOCTA boxes as in the reference photograph, one standing and one lying flat beside it, and in front of them a single fresh patch resting on its shiny transparent liner. COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides, nothing cropped, the whole butterfly outline readable at a glance. The patch is almost clear with a matte veil, 0.55 mm thick, bevelled edge catching one thin line of highlight. Soft window light from the left, 10:00, short shadows. Shallow depth of field, focus on the patch edge, sensor noise. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: the light on the marble brightens very slightly, as if a cloud passes, and a thin highlight travels along the bevelled edge of the patch. Nothing physically moves. Slow pull back of about eight percent, calm pace, 4 seconds. The boxes and the patch must not change shape or proportions, the whole patch stays inside the frame, no lettering appears. No text, no subtitles, no watermark.
```

> **Nota de producción.** Es el plano sobre el que van los subtítulos del precio y la garantía, así que hay que dejar aire arriba y abajo al encuadrar: si el packshot llena el cuadro, el texto del usuario tapará el producto. El parche nuevo aquí es traslúcido y contrasta con el usado de la toma 11: ese contraste es el argumento.

### Toma 15 · Cierre · las dos cajas hacia cámara

*13-20 s · garantía y CTA*

**Qué se ve.** Sus dos manos sostienen las dos cajas juntas hacia el objetivo, con los codos apoyados en el mármol. Gesto de ofrecer, final del anuncio, sobre el que van los subtítulos de la garantía de 60 días.

**Referencias que hay que adjuntar:** `caja` — la foto real de la caja crema de NOCTA; `avatar` — la foto del personaje (Bea / Marisol / Álex, según el anuncio)

**Reglas añadidas:** cláusula de fidelidad de la caja

**Prompt de imagen (GPT Image 2.5, 9:16):**

```text
The box must be EXACTLY the product in the reference photograph: same matte cream uncoated board, same proportions, same printing, and no added text beyond what is printed on it. Closing shot, morning. Vertical 9:16 handheld iPhone photo, the same man's two hands, dark grey t-shirt sleeves at the edge of frame, holding the two cream matte cardboard NOCTA boxes side by side towards the lens over the cream marble table, elbows resting on the marble. The boxes match the reference photograph exactly: plain matte uncoated cardboard, one corner slightly dented, no shine. His hands show short nails, dry knuckles, one hangnail, fine hair on the back of the fingers, a faint tan line at the wrist. Soft window light from the left, 10:00, short shadows falling right, a sliver of the marble and a wall out of focus behind. Shallow depth of field, focus on the near edge of the boxes, slight handheld blur, sensor noise. Unretouched documentary realism. No text, no logos, no watermark.
```

**Prompt de vídeo (imagen a vídeo, 4 s):**

```text
The image comes alive: he pushes the two boxes about four centimetres towards the lens in one small offering gesture and holds them there. One single action. Static handheld camera with micro-drift, calm closing pace, 4 seconds. The hands and the boxes must not change shape or proportions, the cardboard stays plain and matte, no lettering, logo or price appears anywhere. No text, no subtitles, no watermark.
```

> **Nota de producción.** El guion pide «web NOCTA con la garantía subrayada» y eso NO se genera: una web inventada saldría con tipografía falsa y además prohibimos texto en imagen. Se sustituye por este plano de las dos cajas y el usuario pega encima, en montaje, una grabación de pantalla real de la ficha Nariz con el pack de 2 preseleccionado, durante 2-3 s antes del final.

## Qué puede salir mal en este anuncio

- El parche traslúcido sale invisible en las tomas 1, 2 y 3 y la imagen parece que se está apretando la nariz, el mensaje contrario. Se evita con la frase obligatoria de la biblia (película mate traslúcida claramente visible, troquel de mariposa y borde biselado cogiendo un brillo fino) y adjuntando siempre parche_puesto.
- El time-lapse no se lee: si las tomas 1, 3, 4 y 5 no comparten encuadre, distancia y ángulo, parecen cuatro planos sueltos en vez de una progresión. Generar la 1 primero y usarla como referencia adicional de la 3, 4 y 5, y descartar cualquiera cuyo encuadre se haya desviado.
- El despegado de la toma 9 sale como dos parches separados, o con parche sobre piel ya despegada. Describirlo siempre como UNA SOLA lámina continua con UNA SOLA frontera; si falla tres veces, sustituirlo por la toma 10 tal como autoriza la biblia.
- La nariz de las tomas 10 y 12 conserva los puntos negros del retrato de referencia y destroza el después. Hay que adjuntar como SEGUNDA referencia una imagen ya validada de esa misma nariz limpia y escribir la frase de la regla 2.
- Los poros salen en cuadrícula regular en las macros 3, 7 y 12 y la imagen canta a render. Frase obligatoria de distribución irregular en las tres, y comprobar a ojo antes de dar por buena la generación.
- El reloj de la toma 4 aparece con números: sería texto en la imagen, que está prohibido. Pedirlo analógico, redondo, con marcas lisas y sin numeración, y muy desenfocado; si insiste, cambiar el reloj por la ventana pasando de negro a gris del amanecer.
- Las cajas de las tomas 13, 14 y 15 salen con tipografía inventada. El prompt termina siempre en «no logos» y el vídeo repite que no puede aparecer ninguna letra; el logotipo real se ve cuando se regrabe con la caja física.
- La luz salta sin lógica entre planos. Solo hay tres estados de luz permitidos y en este orden: plafón cenital duro (1-4), mesilla cálida (6), ventana lateral de las 08:00 (5, 7-12) y ventana suave de las 10:00 sobre mármol (13-15). Cualquier generación con luz de día en el bloque nocturno se repite.
- Reflejos: azulejo, ventana o grifo devolviendo la cara generan un brazo de más o una segunda persona. Ninguna toma lleva espejo y el prompt del baño nunca menciona superficies reflectantes.
- La cara cambia de una toma a otra y el anuncio deja de ser una sola persona. Adjuntar el retrato del avatar en las once tomas donde aparece cuerpo y repetir en cada prompt pelo corto oscuro, barba de tres días y camiseta gris oscuro; si una generación cambia la edad o la barba, se descarta aunque el parche esté perfecto.
- La marca de almohada y la legaña son la prueba de continuidad de la mañana: si aparecen en las tomas 1-4 (noche) la cronología se rompe. Solo van de la 5 a la 10.


[Volver al índice de los 25 anuncios](../PROMPTS_375_TOMAS.md)

