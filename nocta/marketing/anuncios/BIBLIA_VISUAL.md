# BIBLIA VISUAL NOCTA · lo que ya está comprobado generando imágenes de verdad

Esto no es teoría: las reglas de abajo se han probado con GPT Image 2.5 (variante flare) y han dado imágenes
indistinguibles de una foto de móvil. Los tres avatares y la caja ya están generados y sirven de referencia fija.

## 1. Producto real (no se inventa nada)
- **Parche de nariz NOCTA**: hidrocoloide traslúcido mate, forma de "mariposa" (un lóbulo central que cubre desde la
  mitad del puente hasta la punta y dos alas que envuelven las aletas). 60 mm de ancho total, 45 mm de alto,
  ala de 23 mm, puente de 28 mm. Grosor 0,55 mm, borde biselado. Cuando está limpio es casi transparente con un
  velo mate; cuando ha absorbido grasa se vuelve **blanco opaco por zonas**, con puntitos blancos y amarillentos
  marcados donde estaban los poros.
- **Caja**: cartón crema mate, logotipo "nocta" en minúsculas azul marino, luna creciente pequeña, texto
  "PARCHES DE NARIZ HIDROCOLOIDE · 8 parches · noche". Nada más. Sin brillos, sin dorados.
- **Sobre**: sobrecito individual crema mate, mismo logotipo pequeño.
- NUNCA: tira negra tipo Bioré, parche redondo de grano en la nariz, parche con dibujos o estrellas, envase de plástico.

### FICHA FÍSICA DEL PARCHE · esto es obligatorio en todas las tomas donde salga

**LO QUE DE VERDAD FUNCIONA (comprobado): fotos reales del producto como referencia.**
Describir la forma con palabras NO basta: el modelo se inventa una mancha amorfa. La única manera de que el parche
salga exacto es adjuntar **fotografías reales de nuestro producto** como `image_references` en TODA imagen donde
salga el parche, y escribir al principio del prompt:
«The patch must be EXACTLY the product in the reference photographs: same silhouette, same proportions, same
translucent matte material. Do not invent a different shape.»
Referencias reales que se adjuntan (ya subidas a Higgsfield):
- `parche_liner` · el parche real tumbado sobre su liner de papel, junto a la caja (foto de producto de la tienda).
- `parche_puesto` · recorte de la foto real del parche puesto en la nariz, de frente.
- `parche_puesto_2` · el mismo, segundo ángulo.
- `caja` · la caja crema real.
Con dos o tres de estas referencias el troquel sale correcto. Sin ellas, no.

**Geometría exacta (sirve de apoyo, nunca sustituye a las fotos).** Texto que va en el prompt, tal cual:
«a single piece of translucent matte hydrocolloid, 60 mm wide and 45 mm tall, shaped like a wide butterfly:
one central lobe that covers the bridge from the middle of the nose down over the tip, and two symmetrical wings
23 mm deep that spread sideways and downwards to wrap the nostril wings; between the wings the lower edge has a
shallow rounded notch about 6 mm deep where the columella is; every corner rounded with a 2 mm radius; the material
is 0.55 mm thick with a bevelled edge».
Adjuntar SIEMPRE como referencia la foto del parche puesto (`parche_puesto`). Sin esa referencia el modelo se
inventa una mancha amorfa. Prohibido: rectángulo, óvalo, círculo, tira recta, forma de mariposa de dibujo animado.

**Cómo se pone.** Se despega de un liner de plástico transparente brillante; el gel es ligeramente pegajoso y se
estira uno o dos milímetros al levantarlo. Se coloca centrado en el eje de la nariz, el borde de arriba a mitad del
puente. Se presiona del centro hacia fuera con dos yemas y después se doblan las alas contra las aletas. A los diez
segundos queda sellado: sin arrugas, sin esquinas levantadas, siguiendo la curva de la nariz, como una segunda piel
mate un punto más clara que la piel, con una línea fina de brillo en el borde biselado.

**Mientras actúa.** A lo largo de la noche se vuelve blanco opaco por dentro, a manchas, más denso justo encima de
los poros (los lados del puente y la punta), se hincha levemente y los bordes siguen traslúcidos.

**Cómo se quita.** Se coge por un ala con el pulgar y el índice y se tira despacio y en paralelo a la piel, nunca
hacia arriba. La parte ya despegada se enrolla sobre sí misma y cuelga blanda; la parte que sigue pegada permanece
plana sobre la nariz. **Hay una sola frontera entre las dos partes y NUNCA puede quedar parche sobre una zona que ya
se ha despegado.** La piel se levanta un instante en esa frontera y vuelve. En la cara interna de la parte despegada
se ven el gel blanco saturado y los tapones blanco-amarillentos que salen de los poros.

**Cómo queda.** El parche usado en la mano está blando, ligeramente abombado, conserva la memoria de la curva de la
nariz y se enrolla por los bordes. **Y la nariz debajo queda limpia**: los poros se ven vacíos, ya no hay puntitos
oscuros, la piel queda un minuto algo rosada y mate, con la marca tenue del borde del parche.

### LAS CINCO ESTADOS · cada imagen está en uno solo, nunca en dos
1. **Sin parche**: poros llenos, filamentos oscuros visibles, brillo.
2. **Parche recién puesto**: traslúcido, casi invisible salvo el borde, nariz igual de llena por debajo.
3. **Parche saturado**: blanco a manchas sobre la nariz, por la mañana.
4. **A medio quitar**: un ala despegada y enrollada, el resto pegado y plano, una sola frontera, y la piel que ya
   ha quedado al aire está LIMPIA.
5. **Fuera**: el parche en la mano con las manchas blancas y los tapones; la nariz limpia, sin puntos oscuros.
Escribir el número de estado al principio de cada prompt evita el error más caro: una imagen que mezcla el 4 y el 5
(parche en la mano y a la vez pegado en la nariz) no sirve y hay que repetirla.

### REGLA CRÍTICA comprobada generando (no saltársela)
El parche es traslúcido, así que si solo se dice "lleva el parche puesto" el modelo lo hace INVISIBLE y la imagen
parece que la persona se está apretando la nariz, que es justo el mensaje contrario. En TODA imagen con el parche
puesto hay que describirlo como algo que se ve:
«a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly
outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding
skin, edges perfectly sealed against the skin».
Y si el parche ya ha absorbido grasa: «the patch now opaque white in blotches with small pale-yellow dots where the
pores were, still translucent at the edges».


### LO APRENDIDO GENERANDO 22 IMÁGENES DE VERDAD · reglas que arreglaron fallos reales

Estas cinco reglas no son teoría: cada una arregla un fallo concreto que salió en las pruebas. Van SIEMPRE.

**1. Encuadre del parche: si se recorta, el troquel deja de leerse.**
Cuando el parche es el sujeto (tomas de producto, parche usado a contraluz, packshot), el modelo lo pega al borde
y lo corta, y entonces parece una mancha amorfa aunque el material esté perfecto. Frase obligatoria:
«COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides;
nothing is cropped by the frame edge; the whole butterfly outline must be readable at a glance.»

**2. La nariz «después» sale sucia si no se le da una referencia limpia.**
El avatar de referencia tiene la nariz con puntos, así que el modelo los conserva en TODAS las tomas, incluidas las
de después de quitar el parche. Describirlo con palabras no basta. Solución comprobada: adjuntar como SEGUNDA
referencia una imagen ya generada de esa misma nariz limpia y escribir:
«The SECOND reference is his nose AFTER the treatment: the skin of the nose you generate must look EXACTLY like that
second reference, open EMPTY pores, no dark dots.»
Y además, en positivo: «the pores are open, EMPTY and flat, there are NO dark dots and NO grey-brown plugs anywhere».

**3. «De noche» no significa nada; hay que describir las consecuencias de la luz.**
Poner «night bathroom, 23:30» da una imagen de día. Lo que funciona es describir lo que hace esa luz:
«IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, so there are short hard shadows straight
down under the brow, the nose and the lower lip, the tops of the cheekbones are bright and the eye sockets are dark,
and the window behind is pure black. No daylight, no soft window light, no blue sky.»
Nada de reflejos: ni la ventana con los azulejos reflejados, ni espejos, ni el grifo devolviendo la cara. Toda
superficie que refleja a una persona es la vía más rápida a un brazo de más o a una segunda persona en cuadro.

**4. Los poros salen en cuadrícula y eso delata el render.**
Por defecto el modelo reparte los poros como una rejilla regular y la macro parece 3D. Frase obligatoria en toda
macro de piel: «pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense
patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid,
never evenly spaced», y cerrar con «unretouched documentary realism, not a 3D render».

**5. El despegado: «una sola lámina continua», nunca «la mitad izquierda y la mitad derecha».**
Si se escribe «the left half is peeled and the right half is still stuck» el modelo genera DOS parches separados.
Lo que produce un despegado coherente es describirlo como una sola pieza:
«He is peeling the patch off in ONE CONTINUOUS SHEET: the right portion is still stuck flat and translucent on the
right side of the nose, and WITHOUT ANY BREAK it lifts along one single boundary down the ridge and hangs from his
thumb and index finger at the left, curled, limp, its underside turned to the camera.»
Y el reverso, siempre: «irregular opaque milky-white islands studded with dozens of small raised white and pale-yellow
domes, the plugs pulled out of the pores».


**6. La caja crema sobre fondo crema no se ve, y está medido.**
El packshot de la toma 15 del anuncio 1 se midió: la caja da 198 de luminancia y el fondo 206. Ocho puntos sobre
255 no es contraste; en el feed, a tamaño miniatura, la caja se convierte en una mancha pálida. Vale para una foto
de catálogo, no para un anuncio. Frase obligatoria en todo packshot sin persona sobre superficie clara:
«CONTRAST IS CRITICAL, THE BOX IS CREAM AND MUST NOT DISAPPEAR: put a plain dark charcoal-grey wall in soft shadow
directly behind the box, clearly darker than the board, and give the box a defined shadow on the stone under its
base and a bright edge where the window light catches the top corner. Cream board against a cream background reads
as a pale blur at thumbnail size.»
Cuando hay una persona o una mano sosteniendo la caja no hace falta: la piel ya hace de contraste.

**Alternativa más segura al despegado a medias.** El plano «parche ya fuera, sujeto delante de la nariz limpia» es
mucho más fácil de generar bien y además enseña las dos cosas a la vez (las manchas blancas y la nariz limpia).
Si el despegado a medias no sale a la primera, se cambia por ese plano y el anuncio no pierde nada.

## 2. Personajes (ya generados, se usan como referencia en cada imagen)
- **Bea**, 24, Madrid. Pelo castaño claro recogido con pinza negra mate, ojos marrones, cejas gruesas naturales,
  lunar bajo el pómulo izquierdo, pendientes de botón dorados, dos granitos en curación en la barbilla, cero
  maquillaje, brillo natural en zona T. Camiseta gris de canalé.
- **Marisol**, 43. Melena castaña oscura por el hombro con alguna cana en la sien, líneas de expresión, surcos
  nasogenianos, aros de plata pequeños, poros marcados en la nariz, alguna mancha solar en el pómulo.
  Camiseta azul marino lisa.
- **Álex**, 36. Pelo corto oscuro, barba de tres días, cicatriz pequeña en la ceja derecha, nariz claramente grasa
  con filamentos oscuros, algo de rojez en las mejillas. Camiseta gris oscuro.
- Los tres son españoles corrientes, guapos del montón, nunca modelos. Se graban ellos con el móvil.

## 3. Sitios y luz (solo estos, para que los 25 anuncios parezcan de la misma marca)
1. **Baño de día**: azulejo blanco tipo metro, grifo cromado, luz de ventana suave por la izquierda, 10:00.
2. **Baño de noche**: la misma luz cenital del plafón, más dura, sombras bajo los ojos, 23:30.
3. **Dormitorio de noche**: lámpara de mesilla cálida, sábana blanca arrugada, resto en penumbra.
4. **Ventana de mañana**: luz lateral limpia, alféizar, se usa para el parche a contraluz.
5. **Mesa de mármol crema**: para packshots, luz suave de ventana, sombra corta.
- Nada de estudio, nada de fondo negro, nada de humo ni destellos.

## 4. Fórmula del prompt de imagen (8 huecos, en este orden)
1. **Captura**: "Vertical 9:16 handheld iPhone photo" · o para macro: "Extreme macro photograph shot on an iPhone
   with a clip-on macro lens, handheld".
2. **Sujeto y encuadre**: quién, qué parte del cuerpo llena el cuadro, a qué distancia.
3. **Detalle físico concreto**: poros visibles, filamentos sebáceos gris-marrón dentro de cada poro, vello fino,
   capilares rojos finos, brillo de la zona T, alguna imperfección. Cuanto más concreto, más real.
4. **Acción**: una sola, en presente, sencilla.
5. **Luz y sitio**: uno de los cinco de arriba, con la hora y la dirección de la luz.
6. **Óptica**: "very shallow depth of field, focus exactly on X, slight handheld motion blur at the edges,
   natural digital sensor noise".
7. **Anti-retoque**: "no beauty retouching, no skin smoothing, no makeup, unretouched documentary realism".
8. **Prohibiciones**: "No text, no logos, no watermark." SIEMPRE. Los subtítulos los pone el usuario después.

### Palabras que funcionan
handheld, iPhone, clip-on macro lens, north-facing window light, white subway tile, shallow depth of field,
sensor noise, vellus hair, enlarged pores, sebaceous filament plug, uneven skin tone, unretouched, documentary.

### Palabras prohibidas (arruinan el realismo de móvil)
8k, hyperrealistic, cinematic, dramatic lighting, professional photography, beautiful woman, perfect skin,
flawless, glowing, studio, bokeh exagerado, HDR, award-winning.

## 5. Consistencia
- Cada imagen con persona lleva como **image_reference** el retrato del avatar correspondiente.
- Cada imagen con caja o sobre lleva además la foto de la caja NOCTA como referencia.
- Cada imagen con el parche puesto lleva la lámina técnica del parche como referencia.
- La ropa, el pelo y el sitio no cambian dentro de un mismo anuncio.

## 6. Las 15 tomas de cada anuncio (columna vertebral)
Cada anuncio tiene 15 imágenes numeradas. El esqueleto es siempre el mismo y se adapta al guion concreto:
1. Gancho A · el primer fotograma exacto del anuncio.
2. Gancho B · el mismo momento desde otro ángulo o distancia (para el test A/B).
3. Diagnóstico · macro del problema en la nariz.
4. Detalle del problema · poro, filamento, brillo o lo que el guion nombre.
5. El error · apretar, la tira, el exfoliante (según el guion).
6. Consecuencia del error · rojez, marca, pelusa de la tira.
7. Entrada del producto · la caja en la mano, sin enseñar todavía el parche.
8. El parche fuera del sobre · macro, se ve el grosor y el borde biselado.
9. Preparación · nariz limpia y seca, toalla.
10. Colocación · las manos poniendo el parche, presión de diez segundos.
11. Parche puesto · plano de la cara o del perfil, de noche.
12. La noche pasa · dormido, luz de mesilla, reloj.
13. Retirada · por la mañana, el parche despegándose despacio.
14. La prueba · el parche usado a contraluz con los puntos blancos.
15. Cierre · nariz después con la misma luz del plano 3, o packshot del pack de 2.
Si el guion no tiene "error" o no tiene "noche", esas tomas se sustituyen por otras del mismo guion: nunca se
deja una toma vacía y nunca se repite la misma imagen dos veces.

## 7. Fórmula del prompt de vídeo (imagen a vídeo)
`[La imagen cobra vida] + [una sola acción física] + [cámara] + [ritmo] + [lo que no puede cambiar] + [sin texto]`
- Una acción por plano. Dos acciones = deformación.
- Cámara: "static handheld with micro-drift", "very slow push in", "slow pull back". Nada de órbitas ni grúas.
- 3-5 segundos por plano.
- Siempre: "the person's face and the product must not change shape; no text, no subtitles, no watermark".
- Audio apagado: la voz se pone después.
