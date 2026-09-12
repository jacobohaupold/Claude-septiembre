# REFERENCIAS REALES: cómo se ve y cómo se mueve esto de verdad

**Versión 1.0 · 12 de septiembre de 2026.** Los datos de este documento salen de tres sitios y de ningún otro.
Uno: una investigación con fuentes hecha en esta sesión, en la que se comprobó con `curl` el código HTTP de cada
URL (no hay ninguna inventada) y en la que se descargaron y se miraron con los ojos seis imágenes clave —las tres
fotos oficiales de Vue Skin del parche puesto, del parche usado y del antes/después, el blíster de Vue y las dos
figuras clínicas de un caso publicado en JAAD Case Reports (PMC12890860)—. Dos: la documentación oficial de las
marcas (Hero Cosmetics, Vue Skin, Bioré), que es la que da los tiempos reales de cada acción. Tres: la
`BIBLIA_VISUAL.md` de NOCTA, con las reglas ya comprobadas generando 22 imágenes de verdad. Cuando algo no venga de
ahí, lo verás escrito **sin verificar**.

Este documento no genera nada. Es el manual de referencias que se usa **antes** de escribir un prompt y **después**
de mirar el resultado, para decidir si una imagen o un vídeo se parecen a la realidad o se parecen a lo que la IA
cree que es la realidad. Que no es lo mismo.

---

## Índice

1. [El problema: la IA no ha visto nunca un parche despegándose](#1-el-problema-la-ia-no-ha-visto-nunca-un-parche-despegándose)
2. [Dónde están las referencias buenas](#2-dónde-están-las-referencias-buenas)
3. [Cómo se ve DE VERDAD cada cosa](#3-cómo-se-ve-de-verdad-cada-cosa)
4. [Los movimientos, uno a uno, como los contaría un director](#4-los-movimientos-uno-a-uno-como-los-contaría-un-director)
5. [Cómo se convierte una referencia en un prompt](#5-cómo-se-convierte-una-referencia-en-un-prompt)
6. [Qué NO copiar de las referencias que hay por ahí](#6-qué-no-copiar-de-las-referencias-que-hay-por-ahí)
7. [Tabla: lo que la IA se inventa mal, y la corrección](#7-tabla-lo-que-la-ia-se-inventa-mal-y-la-corrección)
8. [Contradicciones con la biblia que hay que decidir](#8-contradicciones-con-la-biblia-que-hay-que-decidir)
9. [Rutina de diez minutos antes de cada tanda](#9-rutina-de-diez-minutos-antes-de-cada-tanda)

---

## 1. El problema: la IA no ha visto nunca un parche despegándose

Los modelos de imagen y de vídeo sí han visto millones de caras. Lo que casi no han visto es esto: un hidrocoloide
translúcido sobre una nariz grasa española, a las siete y media de la mañana, despegándose despacio. De ese hueco
salen los cuatro fallos que se repiten en todas las tandas:

- La IA convierte el filamento sebáceo en un **punto negro de dibujo animado**, porque lo que ha visto etiquetado
  son fotos de "blackheads" retocadas.
- La IA convierte el parche usado en un parche con **lunares blancos**, porque "puntos blancos" en inglés es
  literalmente "white dots" y eso es lo que dibuja.
- La IA anima cualquier despegado como un **tirón dramático**, porque el material de entrenamiento de "peel" son
  vídeos de tiras de poros y de películas protectoras de móvil.
- La IA pone luz suave y bonita en el macro, y entonces **los poros desaparecen** y la piel se vuelve plástico.

Los cuatro se arreglan con lo mismo: referencias concretas y frases exactas. Este documento es eso.

Un apunte que ahorra discusiones: en este proyecto las referencias sirven para dos cosas distintas y no hay que
mezclarlas. Las **fotos reales del producto NOCTA** (`parche_liner`, `parche_puesto`, `parche_puesto_2`, `caja`) se
adjuntan como `image_references` en la generación, porque sin ellas el troquel del parche sale amorfo
(`BIBLIA_VISUAL.md` §1). Las referencias de este documento, en cambio, **no se adjuntan casi nunca**: se miran, se
describen con palabras y esas palabras van en el prompt. Si adjuntas una foto de Vue que lleva texto sobreimpreso,
el modelo te copia el texto.

---

## 2. Dónde están las referencias buenas

### 2.1 Reglas de uso de los buscadores

Tres cosas antes de empezar a buscar.

1. **Busca en inglés para lo clínico y lo técnico; busca en español solo para el decorado.** Los filamentos, los
   parches y las tiras están documentados en inglés. Lo único que hay que buscar en español es el baño, porque un
   baño español no aparece si preguntas en inglés: te sale un loft americano.
2. **Getty y las páginas `discover` de TikTok se usan como banco de encuadres, no como material.** No se descarga
   nada. Se mira cómo está puesta la cámara, a qué distancia, de dónde viene la luz, y se escribe.
3. **Si añades una URL nueva a este documento, compruébala antes.** Todas las que hay aquí devolvieron 200 OK en la
   investigación del 12/09/2026. Las que hemos añadido como sugerencia de búsqueda y no se comprobaron van marcadas
   **sin verificar**.

### 2.2 Poros y filamentos sebáceos reales

**La referencia madre.** La foto clínica de base de un caso de filamentos sebáceos prominentes en la nariz,
publicada en JAAD Case Reports:

- `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/106acf39d5ca/gr1.jpg` — foto clínica a distancia normal.
  Es, literalmente, la nariz de Álex. Vertical 3:4, del párpado inferior al labio superior, tres cuartos, cámara a
  la altura de la punta de la nariz, luz dura y frontal desde la posición de cámara.
- `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/502a21f0cf49/gr2.jpg` — la misma nariz en dermatoscopia
  ×20. **Referencia negativa**: sirve para saber a qué NO hay que llegar.
- `https://pmc.ncbi.nlm.nih.gov/articles/PMC12890860/` — el artículo, con los pies de figura que confirman el color
  ("uniform yellowish plugs": amarillentos, no negros).
- `https://pmc.ncbi.nlm.nih.gov/articles/PMC7875663/` — describe los filamentos como depósitos cilíndricos
  blanco-hueso alrededor de folículos normales. Refuerza que el filamento es un cilindro que sobresale.
- `https://dermnetnz.org/topics/comedones` y `https://dermnetnz.org/topics/comedonal-acne` — banco clínico DermNet.
  Aquí está la distinción que hay que tener clara para no prometer de más: el comedón abierto es negro por melanina
  oxidada, el filamento sebáceo es gris-amarillo. NOCTA trabaja sobre filamento.
- `https://en.wikipedia.org/wiki/Sebaceous_filament` — base técnica: el filamento no es un punto negro y no
  desaparece para siempre.

**Bancos de encuadres:**

- `https://www.gettyimages.com/photos/nose-pores-close-up`
- `https://www.gettyimages.com/videos/skin-macro`

**Términos exactos de búsqueda.** En inglés, que es donde está el material:

```
sebaceous filaments nose clinical photo
sebaceous filaments vs blackheads dermatology
nose pores close up macro
enlarged pores nose macro photography
oily t-zone skin texture macro
```

En español, para ver el lenguaje que usa el público y la prensa de aquí (útil para el guion, no para la imagen):

```
filamentos sebáceos nariz
puntos negros nariz de verdad
poros dilatados nariz primer plano
diferencia puntos negros y filamentos sebáceos
```

**Contexto español de mercado**, para que los anuncios no suenen a traducción:
`https://elmon.cat/viure/es/bienestar/adios-a-los-puntos-negros-dos-dermatologas-opinan-sobre-el-exito-de-los-parches-hidrocoloides-virales-5290/`
(artículo con dos dermatólogas españolas sobre los parches virales).

### 2.3 Parches de hidrocoloide puestos y usados

- `https://www.vueskin.com/cdn/shop/files/Model_Image_-_During.jpg` — **la referencia del parche puesto**. Los dos
  índices presionando a la vez, parche translúcido con las pecas visibles a través.
- `https://www.vueskin.com/cdn/shop/files/Dirty_Patch.jpg` — **la referencia del parche usado**. La más importante
  del proyecto y la que corrige el brief (ver §3.3).
- `https://www.vueskin.com/pages/how-to-use-vue-patches` y `https://www.vueskin.com/pages/nose-patches-tutorial` —
  tutorial oficial con secuencia de cinco imágenes (`https://cdn.shopify.com/s/files/1/0611/5373/8942/files/nose1.png`
  hasta `nose5.png`). Indican piel completamente seca, sin nada de crema debajo, y presionar con firmeza.
- `https://www.herocosmetics.us/blogs/news/step-by-step-guide-with-photos-how-to-use-mighty-patch-nose-for-pore-cleansing`
  — el paso a paso oficial de Hero. Es la mejor descripción escrita de la mecánica del gesto que hay, y de ahí
  salen los tiempos de §4.
- `https://www.herocosmetics.us/products/mighty-patch-nose` — miniaturas del parche usado.
- `https://www.cosrx.com/cdn/shop/files/acne-pimple-master-patch-cosrx-official-1.jpg` y
  `https://starface.world/cdn/shop/files/starface-big-yellow-hydro-star-compact_0dfc31f3-6f2c-4678-9fa8-402851cc31de.png`
  — el material hidrocoloide en otras marcas, para calibrar el aspecto del gel.
- `https://nichebeautylab.com/products/zitproof-nose` — Acnemy Zitproof Nose, competencia **española** directa.
  Packshot: `https://nichebeautylab.com/cdn/shop/files/AC_43499_ZITPROOF-NOSE_PRODUCT_BOX_c74258d9-7611-4195-9f5b-fa5ca3593282.jpg`
- `https://www.vueskin.com/es/products/hydrocolloid-nose-patches` — la ficha de Vue en español.
- `https://www.gettyimages.com/photos/acne-patch-face` — banco de encuadres de parche sobre rostro.

Búsqueda:

```
hydrocolloid nose patch before and after
used hydrocolloid patch absorbed sebum
pimple patch removal reveal
hydrocolloid patch turned white
```

```
parche hidrocoloide nariz antes y después
parche nariz puntos negros resultado
```

### 2.4 El gesto de despegar

Aquí lo que hace falta es vídeo, no foto, porque lo que se necesita es la velocidad.

- `https://www.youtube.com/shorts/ABU2WIaj14k` — "satisfying hydrocolloid patch removal" (hnh). Vertical, formato
  nuestro. Se ve lo esencial: el parche **se estira** y **se dobla sobre sí mismo**, blando, y la piel no se levanta.
- `https://www.youtube.com/watch?v=yFVu8FGoLDI` — "Pimple Patch Removal | Remove My Pimple Patches & See the
  Results" (Julia___Faith). Retirada y presentación a cámara a velocidad real, en formato de creadora.
- `https://www.tiktok.com/@herocosmetics.uk/video/7476150243126463766` — "Here's the best way to apply our NEW Nose
  patches". El gesto de aplicación de la propia marca.
- `https://www.youtube.com/watch?v=m2mcTAnVmUM` — "Meet Mighty Patch Nose" (Hero Cosmetics). El anuncio oficial:
  sirve para el ritmo de plano y la duración de cada gesto.
- `https://www.tiktok.com/discover/hero-mighty-patch-before-and-after` — recopilatorio de "peel reveal" vertical.

Para el **contraste** con la tira de poros, que es el plano que más vende el producto:

- `https://www.youtube.com/watch?v=B5EawJajoqE` — "BIORE PORE STRIP REMOVAL UP CLOSE" (Michelle Kanemitsu). El
  viral original.
- `https://www.youtube.com/watch?v=ulSETPsaXAk` — "BLACKHEAD PEEL-OFF NOSE STRIP UNDER A MICROSCOPE" (Brittanybear-
  makeup). Aquí está el detalle que importa: los tapones salen **perpendiculares** a la tira.
- `https://www.youtube.com/watch?v=CglTwSUZO0E` y `https://www.youtube.com/watch?v=9sb6ObLdruo` — más ángulos.
- `https://www.youtube.com/shorts/1Ec37mlYvlY` — vertical 9:16.
- `https://us.biore.com/blog/acne-and-pimples/pore-strips-101` — instrucciones oficiales de Bioré: 10-15 minutos
  hasta que la tira está rígida, y despegar **despacio desde los bordes**, nunca de un tirón.
- `https://www.gettyimages.com/videos/pore-strip`

Búsqueda:

```
hydrocolloid patch peel off slow motion
pore strip removal close up
pore strip removal under microscope
nose strip peel skin stretch
```

```
tira de poros nariz quitar
parche hidrocoloide quitar despacio
```

### 2.5 Textura de piel grasa

- `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/106acf39d5ca/gr1.jpg` — otra vez la figura clínica: la piel
  grasa con luz dura desde cámara. Es donde mejor se ve que el brillo es lo que hace aparecer la textura.
- `https://www.vueskin.com/cdn/shop/files/Model_Image_-_During.jpg` — piel real con pecas, poros y brillo natural en
  el pómulo, en luz suave. El contraste entre esta y la anterior es la lección entera.
- `https://www.youtube.com/watch?v=Wl0jS7uYKt8` — "My favorites tips for Macro Beauty Photography" (Lindsay Adler
  Photography). Explica cómo el ángulo de la luz respecto a la superficie decide si la textura aparece o se borra.
- `https://www.gettyimages.com/videos/skin-macro` — textura en movimiento.

Búsqueda:

```
oily skin texture macro unretouched
t-zone shine natural skin no makeup
vellus hair backlit skin macro
real skin pores no retouch photography
```

```
piel grasa zona t brillo real
textura de piel sin retoque
```

### 2.6 Vídeo UGC de baño rodado con móvil

Esto es lo que define el look, y no es el grano: es la **geometría**.

- `https://www.gettyimages.com/videos/selfie-video-phone-bathroom` — el patrón real: brazo extendido, 35-50 cm,
  móvil por debajo de la línea de ojos, cabeza en el tercio superior del 9:16 y aire muerto abajo.
- `https://www.gettyimages.com/videos/bathroom-mirror-skincare-morning` — la variante espejo, con dos profundidades.
- `https://www.youtube.com/watch?v=jfmILqclerU` — "morning skincare routine *glass skin edition*" (Ally Yost).
  Duración por gesto y cómo se acerca el producto a la lente.
- `https://www.youtube.com/watch?v=N1gkqrsklbE` — "Minimalist morning routine | Silent vlog" (Marin). B-roll de
  baño a primera hora: cómo cae la luz sobre el lavabo y cómo rebota en el azulejo.
- `https://www.tiktok.com/discover/skin-care-ugc-example` y
  `https://www.tiktok.com/discover/how-to-film-morning-routine-tutorial`
- `https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?period=30&region=ES&industry=22000000000`
  — **Top Ads de TikTok filtrado por España y belleza, últimos 30 días.** Es el banco más útil que existe para ver
  qué encuadre funciona AHORA en el mercado español, y se actualiza solo. Míralo antes de cada tanda.
- Calibración del temblor: `https://www.youtube.com/watch?v=pEnkzokIG64` ("Phone Gimbal vs Handheld", James Shin) y
  `https://www.youtube.com/watch?v=nb_5i5gjYL4` ("No More Shaky Footage!", B&H).

Y para el decorado español, que es lo único que hay que buscar en español:

- `https://www.gettyimages.es/fotos/cuarto-de-baño-españa` — el único banco que devuelve baños realmente españoles.

Búsqueda:

```
ugc skincare bathroom iphone front camera
talking head bathroom mirror phone
handheld phone footage drift no gimbal
```

```
cuarto de baño español piso pequeño
baño azulejo blanco ventana pequeña
```

---

## 3. Cómo se ve DE VERDAD cada cosa

Esta sección es la que hay que tener abierta al escribir prompts. Cada apartado acaba con la frase en inglés lista
para pegar.

### 3.1 El filamento sebáceo

**Lo que NO es.** No es un punto negro. No es suciedad. No es un agujero. No está repartido de forma uniforme por
toda la nariz.

**Lo que es.** Un cilindro de sebo y queratina que ocupa el folículo y **sobresale un poco**, no se hunde. Mide
entre 0,3 y 0,6 mm. Su color va del gris-pardo al amarillo pálido (confirmado por el pie de figura del artículo:
"uniform yellowish plugs", PMC12890860). Con luz dura, cada uno atrapa su propio micro-destello y por eso se lee
**en relieve**. Se concentran en las aletas de la nariz y en el surco alar; en el puente hay muchos menos. En la
piel de alrededor hay enrojecimiento leve, sobre todo en el surco alar y junto a las fosas nasales.

La magnificación correcta es 1:1 a 2:1, es decir, **un ancho de campo de 30 a 40 mm**: cabe la nariz entera y un
dedo de mejilla a cada lado. A magnificación de dermatoscopio (×20) los filamentos son cúpulas amarillas en
retícula y la piel parece de otro planeta: espanta en vez de vender. Eso se vio en la figura gr2.jpg.

```
a dense field of sebaceous filaments: greyish-brown to pale yellow raised plugs, 0.3 to 0.6 mm, each catching its own micro-highlight, concentrated on the nostril wings and in the alar crease, sparse on the bridge, with light redness around the alar crease
```

Y el negativo, siempre:

```
no black carbon dots, no evenly spaced pores, no dermatoscope view, no airbrushed skin
```

### 3.2 El hidrocoloide limpio

Translúcido, mate, con un velo lechoso muy leve. **Se ve la piel y las pecas a través de él.** Tiene su propio
brillo especular satinado, distinto al de la piel: un punto menos brillante que la nariz grasa, y un poco más claro.
El borde es biselado y atrapa una línea fina de luz que es, en la práctica, lo que dibuja la silueta de mariposa.
Suele quedar alguna micro-burbuja de aire cerca del borde, y ese defecto es justo lo que le da verdad.

Aquí está la regla crítica de la biblia, que sigue vigente: si solo escribes "lleva el parche puesto", el modelo lo
hace invisible y parece que la persona se está apretando la nariz, que es el mensaje contrario.

```
a translucent matte hydrocolloid film clearly visible across the bridge and wings of the nose, its butterfly outline and bevelled edge catching a thin specular highlight, slightly lighter and less shiny than the surrounding skin, skin and freckles visible through the material, edges perfectly sealed against the skin, one tiny trapped air bubble near the edge
```

### 3.3 El hidrocoloide saturado — la corrección más importante de todo el documento

En la foto oficial del parche usado de Vue (`Dirty_Patch.jpg`), el sebo absorbido **no son puntos blancos
redondos**. Es una **nevada granular**, tipo azúcar glas o escarcha: densa y continua en el centro del parche
—donde tocaba el puente y la punta—, disgregándose en grano fino hacia los bordes, con algunos grumos más gruesos.
Donde está cargado, el material es **opaco**; en los bordes sigue translúcido gris perla con brillo satinado.

Esto importa porque el brief original y la biblia hablan de "puntitos blancos". Si le pides `white dots` a GPT
Image 2.5, te devuelve lunares blancos de dibujo animado y se te cae el plano que más vende (la toma 14 de cada
anuncio). La frase correcta:

```
dense powdery white frost covering the centre of the patch, like fine icing sugar, granular and continuous where it sat on the nose bridge and tip, breaking into fine speckle towards the scalloped edges, opaque where loaded, still translucent pearl-grey at the rim, a few coarser clumps, satin sheen
```

Hay un matiz: la biblia de NOCTA describe además, en la **cara interna** de la parte despegada, "tapones
blanco-amarillentos que salen de los poros", como cúpulas pequeñas que sobresalen. Las dos cosas conviven si se
entienden bien: la **escarcha** es el gel saturado visto de frente o a contraluz; los **tapones en relieve** solo se
ven en el reverso, con luz rasante y a muy poca distancia. Son dos planos distintos, no uno. Ver §8, aviso 1.

### 3.4 La piel después

Lo que se ve realmente en el "después" de Vue: **quedan filamentos**. Menos, más tenues, con menos brillo graso,
pero quedan. Los filamentos sebáceos son fisiología normal y vuelven; prometer cero es falso y trae devoluciones y
reseñas malas.

Físicamente, la nariz recién liberada está: un punto rosada durante un minuto por la oclusión, **mate** (el sebo
superficial se lo ha llevado el gel, así que el brillo que tenía la punta desaparece un rato), con los poros
visibles pero vacíos y planos, y con algún capilar fino más marcado por el calor.

```
the pores on the nose are open, EMPTY and flat, noticeably fewer and fainter sebaceous filaments on the nostril wings, still a few remaining, the skin slightly pink and matte from the occlusion, less oily shine on the nose tip than before
```

El truco operativo ya comprobado: describirlo no basta, porque el avatar de referencia tiene la nariz sucia y el
modelo la conserva. Hay que adjuntar como **segunda referencia** un fotograma ya generado de esa misma nariz limpia
—para Álex, `img/a01/a01_13.jpg`— y escribir «The SECOND reference is his nose AFTER the treatment: the skin of the
nose you generate must look EXACTLY like that second reference» (`BIBLIA_VISUAL.md`, regla 2).

### 3.5 La marca del adhesivo

Es el detalle que nadie pide y que hace que una imagen parezca fotografía. Al quitar el parche queda, durante uno o
dos minutos, un **contorno tenue**: una línea rosada de un milímetro que dibuja el perímetro de la mariposa, con la
piel de dentro un poco más pálida y mate que la de fuera y con algún pelillo velloso aplastado en la dirección en
la que se tiró. No es una marca roja fuerte ni una irritación: si sale marcada, estás vendiendo agresión, que es
justo lo que vende la tira de poros. Sin verificar: la duración exacta de esa marca no está documentada en ninguna
fuente de la investigación; "uno o dos minutos" es estimación de dirección de arte.

```
a faint pink outline where the patch edge was, one millimetre wide, tracing the butterfly perimeter, the skin inside it slightly paler and more matte than the skin around, a few fine vellus hairs flattened in the direction of the pull, no irritation, no red welt
```

---

## 4. Los movimientos, uno a uno, como los contaría un director

Tiempos documentados por las propias marcas y comprobados contra los vídeos verificados. En Higgsfield hay que
escribir la duración y la calidad del movimiento **dentro del prompt**, porque el modelo por defecto acelera y
dramatiza todo. Si un plano sale acelerado, no lo arregles ralentizando en montaje: la interpolación se nota.
Regenera con la duración explícita.

| Acción | Duración real | Quién la hace | Lo que delata si sale mal |
|---|---|---|---|
| Poner el parche | 2,5-3,5 s | Dos índices a la vez | Un solo dedo, gesto dubitativo |
| Presionar y sellar | 1 s sostenido | Las dos yemas | Rebote de los dedos |
| Dormir | corte, no timelapse | — | Timelapse de la nariz |
| Despegar el parche | 2-3 s | Pulgar e índice de una mano | Tirón rápido, chasquido, piel levantada |
| Mirar el parche a contraluz | 1,5-2 s | Las dos manos | Parche colgando inerte |
| Tocarse la nariz después | 1-1,5 s | Yema del índice o del corazón | Caricia lenta de anuncio de crema |
| Despegar una tira de poros | 3-6 s | Una mano, desde el borde | Que sea igual de suave que el parche |
| Packshot | 3 s, casi quieto | — | Cualquier movimiento de cámara |

### 4.1 Poner el parche

La mecánica oficial de Hero: se despega el liner de un lado, se aplica ese lado empezando por **el centro de la
nariz** y se alisa hacia fuera; luego se retira el resto del liner y se alisa el segundo lado, también desde el
centro. Objetivo declarado: que quede plano, sin arrugas, sin bultos y sin burbujas.

En imagen, el momento que hay que congelar es el de la foto de Vue: **los dos índices a la vez**, uno a cada lado
del puente, bajando del centro hacia las aletas. Los demás dedos recogidos hacia abajo, sin cerrar el puño. Ojos
cerrados o mirando hacia abajo, nunca a cámara mientras se aplica. La yema, al presionar, se aplana y palidece un
poco: ese blanqueo es la prueba visual de que hay presión de verdad.

Cámara a la altura de los ojos, frontal, equivalente 85 mm a unos 70 cm. Si generas gran angular, la nariz se
agranda y el anuncio parece una caricatura.

```
Both index fingers press the patch down simultaneously from the centre of the nose bridge outwards over about three seconds, fingertips flattening and blanching slightly under the pressure, the other fingers curled down, then hold firm pressure for one more second. Eyes stay closed. Subtle handheld drift. No camera move, no zoom.
```

### 4.2 Presionar

Es un plano propio, de un segundo, y merece la pena tenerlo: las dos yemas paradas sobre el parche, sin movimiento,
solo la respiración y el micro-temblor de las manos. Es lo que la biblia llama "los diez segundos" y lo que hace que
el espectador entienda que esto se sella, no se posa. Al soltar, la yema deja un instante una marca pálida que
vuelve a su color.

```
The two fingertips stay pressed still on the patch for one second, no movement except breathing and a tiny hand tremor, then lift; the skin under each fingertip stays pale for a moment and then refills with colour.
```

### 4.3 Dormir

Seis a ocho horas de uso, según Hero y Vue. En pantalla **no se resuelve con un timelapse de la nariz**: siempre
canta. Se resuelve con un plano de dormir y un corte a la mañana.

El plano: de lado sobre almohada blanca, cámara a la altura de la almohada, equivalente 50 mm a unos 60 cm, encuadre
desde la coronilla hasta el hombro. El parche atrapa un destello débil y **es la cosa más clara del cuadro**, que es
justo lo que lo hace funcionar. Una sola práctica cálida fuera de campo a 2800 K, sombras profundas y blandas.

De movimiento, casi nada: el pecho subiendo y bajando, un mechón que se mueve un milímetro con el aire, un
parpadeo de los párpados cerrados. Nada de dar vueltas en la cama, que deforma la cara.

```
Almost still: slow breathing lifts the shoulder and the sheet, one strand of hair moves a millimetre, the closed eyelids flicker once. The head does NOT turn, the sleeper does not roll over. The patch stays exactly in place. Static camera, no drift, no push-in.
```

### 4.4 Despegar

Este es el plano que define la marca, así que va con detalle.

La instrucción oficial de Hero es despegar **despacio, desde un lado**. En el vídeo real, el recorrido completo dura
dos o tres segundos. Lo que pasa físicamente: el pulgar y el índice de **una sola mano** cogen el parche por un ala;
tiran despacio y **en paralelo a la piel**, nunca hacia arriba; el gel, que es blando y elástico, se estira uno o
dos milímetros antes de ceder; la parte ya despegada se enrolla sobre sí misma y cuelga blanda; la parte que sigue
pegada permanece plana sobre la nariz. **Hay una sola frontera entre las dos partes, que avanza**. La otra mano
puede estar sujetando la piel de la mejilla, o fuera de cuadro.

Y lo más importante para el mensaje: **la piel no se levanta**. El contorno de la nariz no se deforma. No hay
chasquido, no hay "pop". Si en tu vídeo la piel se levanta, estás vendiendo la tira de poros, o sea, al competidor.

El error de generación ya conocido: si escribes "la mitad izquierda despegada y la derecha pegada", el modelo genera
dos parches separados. Hay que describirlo como una sola lámina continua (`BIBLIA_VISUAL.md`, regla 5).

```
Slow, gentle peel over three seconds: thumb and index finger of one hand hold the patch by one wing and pull slowly PARALLEL to the skin, never upward. The patch is ONE CONTINUOUS SHEET: the part still attached stays flat and translucent on the nose, and WITHOUT ANY BREAK it lifts along one single advancing boundary; the freed part stretches a millimetre, curls over on itself and hangs limp from the fingers, its underside turned to the camera. The skin does NOT lift or tent, the nose contour does not deform, there is no snap and no pop. Subtle handheld drift. No camera push-in, no speed ramp.
```

Y el contrario, para el plano comparativo. La diferencia que hay que hacer visible es **mecánica**, no estética: la
tira está rígida, como cartón mojado que ha secado, y al despegarla tensa y levanta la piel.

```
Slow peel of a STIFF pore strip, four to five seconds. The strip resists: two or three micro-pauses where it grips and then releases. As it releases, the skin of the nostril wing visibly tents and stretches, a fold appears in the alar crease, and the skin is left flushed and red. Handheld phone camera with subtle drift. No snap, no fast rip, no speed ramp.
```

### 4.5 Mirar el parche a contraluz

Dos manos sujetan el parche por los extremos, **ligeramente tensado**, no colgando, a la altura de la barbilla y a
unos 30-35 cm de cámara. Detrás, la cara desenfocada a 60-80 cm: boca y nariz reconocibles, ojos fuera de cuadro.
Equivalente 85-100 mm a f/2.8.

Dos versiones, y conviene tener las dos:

- **Sobre fondo oscuro** (pelo, camiseta oscura, azulejo en sombra): el blanco de la escarcha recorta y se lee como
  prueba. Es la versión que convence.
- **A contraluz de ventana**: la escarcha se vuelve traslúcida y brilla como cristal esmerilado, con luz de borde en
  el filo del parche. Es la versión bonita, pero pierde contraste.

Movimiento: el parche **no cuelga inerte**. Vibra levemente con el micro-temblor de las manos, entre 1 y 2 Hz y con
amplitud de milímetros, y se comba un poco si se relaja la tensión. Y una regla de encuadre que ya costó
repeticiones: el parche entero tiene que estar dentro del cuadro, con aire por los cuatro lados. Si se corta, el
troquel deja de leerse y parece una mancha.

```
COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge. Two hands hold the used patch by its two ends, slightly stretched, at chin height. The patch trembles minutely with the hands, one to two times a second, millimetre amplitude, and sags a little as the tension relaxes. The face behind stays soft and out of focus. No hand rotation, no presenting gesture, no camera move.
```

### 4.6 Tocarse la nariz después

El gesto real es corto y comprobatorio, no sensual: la yema del índice —o del corazón— pasa una vez por el lateral
de la nariz, de arriba abajo siguiendo la curva, en algo más de un segundo, y **se para**. A veces se repite en el
otro lado. La cabeza se gira un poco para ofrecer el perfil a la luz. La expresión es de comprobar algo, no de
disfrutar.

Lo que arruina este plano es la caricia lenta de anuncio de crema hidratante: tres segundos de dedo acariciando y
la cabeza echada hacia atrás. Eso dice "publicidad" y el espectador desconecta.

```
The index fingertip runs once down the side of the nose, following the curve from the bridge to the nostril wing, in just over a second, and stops. The head turns slightly to offer the profile to the light. A short checking gesture, not a slow caress. Natural blink. Subtle handheld drift. No slow motion, no head tilt back, no smile to camera.
```

### 4.7 El temblor del móvil, que es lo que hace que parezca real

El móvil a pulso tiene dos movimientos a la vez: una **deriva lenta** que descentra el encuadre y lo recupera, con
un ciclo de uno a dos segundos, más un **micro-jitter** de alta frecuencia y amplitud diminuta. Los dos errores
opuestos son igual de malos: cámara perfectamente fija (parece trípode y no UGC) o bamboleo grande y rítmico (parece
videojuego).

```
Subtle handheld drift: slow low-frequency sway that lets the framing creep off-centre and be corrected, cycle of one to two seconds, plus tiny high-frequency jitter. No rhythmic bobbing, no camera push-in, no gimbal smoothness.
```

---

## 5. Cómo se convierte una referencia en un prompt

El proceso son cinco preguntas. Se hacen mirando la imagen de referencia, en este orden, y cada respuesta es un
trozo del prompt. Encaja con la fórmula de ocho huecos de la biblia: esto es cómo se **rellenan** esos huecos
mirando una foto.

1. **¿Dónde está la cámara?** Altura respecto a la cara, distancia en centímetros, ángulo (frontal, tres cuartos,
   contrapicado) y equivalente de focal. Nunca "primer plano": siempre "a 40 cm, a la altura de la punta de la
   nariz, equivalente 70 mm".
2. **¿Qué llena el cuadro y qué se corta?** De qué parte del cuerpo a qué parte. "De la ceja al labio inferior, la
   nariz ocupa el 60% del alto."
3. **¿De dónde viene la luz y qué tamaño tiene la fuente?** Esta es la que más gente se salta y la que más decide.
   Fuente pequeña y dura = textura. Fuente grande y suave = piel lisa. Y la dirección: izquierda, derecha, alta,
   desde cámara.
4. **¿Qué hay en la piel y en el material, con medidas?** Tamaño en milímetros, color, dónde se concentra y dónde
   no. Aquí es donde se gana el realismo.
5. **¿Qué hay que prohibir?** Lo que el modelo va a poner por defecto y no queremos: texto, filtro de belleza,
   poros en cuadrícula, mármol, luz de estudio.

### Ejemplo completo: de la foto clínica al prompt

**La referencia.** `https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7985/12890860/106acf39d5ca/gr1.jpg`, la foto clínica de
base del caso PMC12890860.

**Lo que se ve, respondiendo a las cinco preguntas.** Cámara a la altura de la punta de la nariz, tres cuartos,
ligeramente contrapicada, a unos 20 cm, con un equivalente de 50-70 mm. El cuadro va del párpado inferior al labio
superior y la nariz ocupa el 60% del alto. La luz es dura, pequeña y viene **desde la posición de cámara** (flash de
móvil): produce un brillo especular continuo en el dorso y la punta, y por eso cada filamento tiene su propio
micro-destello. Todo el plano está nítido, no hay desenfoque de fondo. Los filamentos son cúpulas crema-amarillentas
de 0,3-0,6 mm, densísimas en el ala y el surco alar, escasas en el puente. Piel olivácea cálida, enrojecimiento
leve en el ala, barba de dos días.

**El prompt malo** (el que sale si no se hace este ejercicio):

```
Extreme close-up of a nose with blackheads and large pores, detailed skin, realistic, soft natural light, 8k
```

Qué devuelve: una nariz de dermatoscopio o una nariz lisa de anuncio, con puntos negros repartidos en cuadrícula y
piel de plástico. Los tres fallos vienen de las tres palabras marcadas: `blackheads` (color equivocado), `soft
natural light` (borra la textura) y `8k` (activa el acabado de render).

**El prompt bueno:**

```
Vertical 9:16 extreme macro photograph shot on an iPhone with a clip-on macro lens, handheld. A 36-year-old Spanish man's nose, olive skin, two-day stubble. The frame runs from the lower eyelids to the upper lip; the nose fills about 60% of the frame height. Three-quarter angle, camera at the height of the nose tip, slightly low, about 20 cm away, apparent 60mm macro, field of view about 35mm wide, everything in focus. A small HARD light source from the camera position, like a phone flash in a bathroom, creating a continuous specular sheen along the nose bridge and tip. A dense field of sebaceous filaments: greyish-brown to pale yellow raised plugs, 0.3 to 0.6 mm, each catching its own micro-highlight, concentrated on the nostril wings and in the alar crease, sparse on the bridge. Pores scattered in a completely IRREGULAR, uneven distribution: clustered in two or three dense patches and sparse elsewhere, every pore a different size and a different angle, never aligned in rows or a grid. Light redness in the alar crease, fine vellus hair, natural shine on the T-zone. Unretouched documentary realism, not a 3D render. No beauty retouching, no skin smoothing, no makeup. No text, no logos, no watermark.
```

**Qué ha cambiado, punto por punto:**

| Del prompt malo | Al prompt bueno | Por qué |
|---|---|---|
| "extreme close-up" | distancia, altura, ángulo y focal | Sin geometría, el modelo elige dermatoscopia |
| "blackheads" | "greyish-brown to pale yellow raised plugs, 0.3-0.6 mm" | El color y el relieve correctos (PMC12890860) |
| (nada sobre dónde) | "concentrated on the nostril wings, sparse on the bridge" | La distribución desigual es lo que lee como real |
| "soft natural light" | "small HARD light source from the camera position" | Sin brillo especular no hay filamentos |
| "detailed skin" | "specular sheen" + asimetrías concretas | El realismo lo da el brillo desigual, no el detalle |
| "realistic, 8k" | "unretouched documentary realism, not a 3D render" | "8k" es palabra prohibida: activa el render |
| (nada) | "pores never aligned in rows or a grid" | Por defecto los reparte en cuadrícula |
| (nada) | "No text, no logos, no watermark" | Los subtítulos se ponen en montaje |

**Y su prompt de vídeo**, con la misma referencia:

```
The macro image comes alive. Only one thing moves: the skin of the nose shifts a millimetre as the man breathes in through his nose, and the specular sheen on the bridge slides very slightly with it. Static handheld camera with micro-drift, three seconds. The pores, the filaments and the nose shape must not change. No camera push-in, no zoom, no text, no subtitles, no watermark.
```

---

## 6. Qué NO copiar de las referencias que hay por ahí

Hay mucho material sobre este tema en internet y casi todo es tóxico para NOCTA. Tres familias.

### 6.1 Los vídeos de tiras de poros arrancando "gusanos"

Son los vídeos con más visitas del sector y por eso tientan. No los copies como **nuestro** plano, por tres motivos.

Primero, el mecanismo es el contrario al nuestro y el mensaje se cruza: la tira **arranca**, el parche **absorbe**.
Eso lo tiene ya masticado la prensa española (dos dermatólogas en el artículo de `elmon.cat` hablan justo de esa
diferencia). Si tu plano estrella enseña algo saliendo a la fuerza de la piel, estás vendiendo el producto de otro.

Segundo, el plano de la tira arrancada es un plano de asco y la satisfacción que produce es la de reventar algo. El
nuestro es un plano de prueba limpia: escarcha blanca sobre gel translúcido. Mezclarlos deja al espectador sin saber
qué ha comprado.

Tercero, la magnificación de esos vídeos es de microscopio. Los tapones se ven como un bosque de alfileres
perpendiculares a la tira. Eso, aplicado a nuestro parche, da una imagen desagradable que no corresponde con lo que
la gente ve de verdad en su baño.

**Dónde sí se usan:** solo en el plano comparativo, y solo enseñando la **mecánica** (la piel que se tensa, el
pliegue en el surco alar, la rojez final), no el zoom al "gusano". Ahí la referencia buena es el microscopio de
Brittanybearmakeup, pero para entender la física, no para copiar el encuadre.

### 6.2 Los antes/después falsos

El antes/después oficial de Vue (`Before_and_After_3.jpg`) es un **contraejemplo** y viene muy bien tenerlo
identificado. Lo bueno de él es el encuadre: de la ceja al labio inferior, nariz centrada, un ojo completo en cuadro,
tres cuartos suave, unos 40 cm, equivalente 70-85 mm. Eso sí se copia.

Lo malo es todo lo demás, y son tres trampas de manual:

1. El "antes" está más frontal y el "después" más girado. **Cambia el ángulo.**
2. El "antes" tiene dominante verdosa-fría y el "después" es cálido y rosado. **Cambia la temperatura de color.**
3. El "después" añade un brillo especular grande en la punta que el "antes" no tiene. **Cambia la luz.**

Resultado: parece trucado, y el espectador lo nota aunque no sepa decir por qué. Nuestro protocolo es el contrario:
una sola generación base y el "después" derivado de ella por img2img con la misma semilla y el mismo encuadre,
cambiando **solo** la línea de la piel. Tienen que coincidir exactamente distancia, altura de cámara, ángulo de la
cabeza, dirección de la luz, temperatura, brillo en la punta, expresión y fondo.

La cuarta trampa, y la más cara, es prometer cero. En el propio "después" de Vue **siguen quedando puntos**, y eso es
lo honesto. El mensaje de NOCTA es "menos, más limpio, menos brillo", nunca "desaparecen".

Lo que sí merece la pena copiar de Vue es el **ritmo del corte** de su GIF de transición
(`https://www.vueskin.com/cdn/shop/files/GIF_-_Before_and_After_-_Nose_Patches_2.gif`): corte duro, mismo tempo.

### 6.3 Los primeros planos de plástico

Es la imagen por defecto de todo el sector cosmético: piel mate y uniforme, sin poros, sin vello, sin pecas,
simétrica, con luz de anillo y un destello redondo en el ojo. Copiar eso mata el anuncio dos veces: pierde el
realismo de UGC y además hace desaparecer exactamente lo que tenemos que enseñar.

Dentro de esta familia entran también el **baño de Pinterest americano** (mármol, bañera exenta, plantas colgantes,
luz de estudio) y el **packshot flotante** sin sombra de contacto, que parece un render 3D.

La piel real, comparando las cuatro imágenes reales que se inspeccionaron, tiene siempre lo mismo: zonas de brillo
(dorso y punta de la nariz, pómulos altos, arco de cupido, barbilla) y zonas mate (laterales de la mejilla, sienes),
con bordes difusos pero visibles entre ellas; pecas y micro-manchas asimétricas; algún granito o marca residual;
vello velloso fino que se ve a contraluz; poros más grandes en la zona T que en las mejillas; y algo de rojez en el
surco alar.

```
natural skin shine on the nose bridge, tip and cheekbones with matte temples; visible enlarged pores concentrated on the T-zone; freckles and small asymmetric marks; one or two small healing blemishes; fine vellus hair catching the light; slight redness in the alar crease
```

```
no airbrushed skin, no uniform matte finish, no beauty filter, no symmetric pore pattern, no ring light catchlight, no marble bathroom, no hanging plants, no freestanding bathtub, no studio lighting
```

---

## 7. Tabla: lo que la IA se inventa mal, y la corrección

Cada fila es un fallo real, documentado en la investigación o en las 22 imágenes que ya se generaron. La columna de
la derecha es la frase que hay que pegar para arreglarlo.

| Lo que la IA se inventa | Cómo es de verdad | La frase que lo arregla |
|---|---|---|
| Puntos negros redondos y oscuros en la nariz | Cúpulas gris-pardo a amarillo pálido de 0,3-0,6 mm que sobresalen | `greyish-brown to pale yellow raised plugs, 0.3 to 0.6 mm, each catching its own micro-highlight` + negativo `no black carbon dots` |
| Poros repartidos en cuadrícula regular | Agrupados en dos o tres zonas densas, casi ausentes en el puente | `pores scattered in a completely IRREGULAR, uneven distribution, clustered in two or three dense patches and sparse elsewhere, never aligned in rows or a grid` |
| Macro a magnificación de dermatoscopio | 1:1 a 2:1, ancho de campo de 30-40 mm | `apparent 60mm macro at 20cm, field of view about 35mm wide` + negativo `no dermatoscope view` |
| Luz suave en el macro, y la textura desaparece | Fuente pequeña y dura desde la posición de cámara | `a small HARD light source from the camera position, like a phone flash, creating a continuous specular sheen along the nose bridge` |
| Parche usado con lunares blancos | Escarcha granular continua, densa en el centro, difusa en los bordes | `dense powdery white frost, like fine icing sugar, granular and continuous in the centre, breaking into fine speckle towards the edges, opaque where loaded` |
| Parche puesto invisible (parece que se aprieta la nariz) | Translúcido pero visible por el borde biselado y el brillo propio | `a translucent matte hydrocolloid film clearly visible across the bridge and wings, its butterfly outline and bevelled edge catching a thin specular highlight` |
| Parche blanco opaco tipo plástico al ponerlo | Translúcido: se ven la piel y las pecas a través | `skin and freckles visible through the material, satin sheen, one tiny trapped air bubble near the edge` |
| Parche recortado por el borde del cuadro | Entero, con aire por los cuatro lados | `COMPOSITION IS CRITICAL: the ENTIRE patch is inside the frame, complete, with empty space on all four sides; nothing is cropped by the frame edge` |
| Dos parches separados en el despegado a medias | Una sola lámina con una sola frontera que avanza | `ONE CONTINUOUS SHEET ... WITHOUT ANY BREAK it lifts along one single advancing boundary` |
| Despegado rápido y dramático, con chasquido | 2-3 s, elástico, se dobla sobre sí mismo, sin ruido | `slow gentle peel over three seconds, the patch stretches and folds on itself, no snap and no pop` |
| La piel se levanta al despegar el parche | No se levanta: el contorno de la nariz no se mueve | `the skin does NOT lift or tent, the nose contour does not deform` |
| La tira de poros animada tan suave como el parche | Rígida, 3-6 s, con resistencias y tensado de piel | `STIFF pore strip, two or three micro-pauses where it grips and then releases, the skin of the nostril wing visibly tents and stretches` |
| Nariz "después" igual de sucia que antes | Poros vacíos y planos, quedan algunos filamentos tenues | Adjuntar la nariz limpia como segunda referencia + `the pores are open, EMPTY and flat, noticeably fewer and fainter filaments, still a few remaining` |
| Nariz "después" perfecta, sin ningún poro | Los filamentos no desaparecen: es fisiología | `still a few remaining` (nunca `completely clear`, nunca `poreless`) |
| Gran angular en el plano de aplicación, nariz enorme | Equivalente 85 mm a 70 cm, cámara a la altura de los ojos | `apparent 85mm lens at 70cm, camera at eye level, no wide-angle distortion` |
| Un solo dedo aplicando el parche | Los dos índices a la vez, del centro hacia fuera | `both index fingers press simultaneously from the centre of the bridge outwards, the other fingers curled down` |
| Cámara perfectamente fija en plano UGC | Deriva lenta de 1-2 s más micro-jitter | `subtle handheld drift, slow low-frequency sway that creeps and recovers, plus tiny high-frequency jitter` |
| Bamboleo grande y rítmico | Amplitud diminuta, sin ritmo | `no rhythmic bobbing, no gimbal smoothness` |
| Encuadre centrado y simétrico a la altura de los ojos | 35-50 cm, a la altura del pecho, contrapicado suave, descentrado | `camera 40cm away at chest height looking slightly up, 10-degree low angle, head in the upper third of the frame, off-centre` |
| Baño de mármol con plantas y bañera exenta | Baño español pequeño, azulejo a media altura, ventanuco alto de vidrio mate | `small Spanish apartment bathroom, tiles halfway up the wall, small high frosted window with a white aluminium frame, terry towel on a hook, frameless mirror over the basin, overhead lights off` |
| "Noche" generada como si fuera de día | Hay que describir las consecuencias de la luz | `IT IS NIGHT: the only light is a hard ceiling fixture directly overhead, short hard shadows straight down under the brow and the nose, the window behind is pure black` |
| Packshot flotando sin sombra | Sombra corta de un tercio de la altura, más oscura en el contacto | `short shadow falling back-right about one third of the box height, soft-edged, with a darker contact shadow right under the bottom edge` |
| Packshot animado con movimiento de cámara | Casi quieto: 3-5° de rotación o 2-3% de push-in en 3 s | `almost still, a very slow three-degree rotation over three seconds, nothing else moves` |
| Texto, subtítulos o logos en la imagen | Nunca: los subtítulos se ponen en montaje | `No text, no logos, no watermark` |
| Piel "detallada" que sigue pareciendo plástico | Lo real es el brillo desigual y la asimetría | `natural shine on the nose bridge and cheekbones with matte temples, freckles and small asymmetric marks` + `unretouched documentary realism, not a 3D render` |

---

## 8. Contradicciones con la biblia que hay que decidir

La biblia se escribió con lo aprendido generando; la investigación se hizo mirando fotos reales. En cuatro puntos no
dicen lo mismo. No los resuelvo yo: los dejo señalados con la recomendación.

**1. "Puntitos blancos" frente a "escarcha granular".** La biblia dice que el parche saturado queda "blanco opaco
por zonas, con puntitos blancos y amarillentos marcados donde estaban los poros". La foto real de Vue muestra una
nevada granular continua. Recomendación: usar **escarcha** para el parche visto de frente y a contraluz (toma 14) y
reservar los **tapones en relieve** para el reverso en macro y luz rasante (toma 13, cara interna). Si se prefiere
mantener "puntitos" en las dos, hay que asumir que ese plano saldrá más ilustrativo y menos fotográfico.

**2. "La piel se levanta un instante" al despegar el parche.** La biblia lo dice; la investigación dice que la piel
**no** se levanta y que ese es justo el rasgo que distingue al parche de la tira de poros. Recomendación: quitar esa
frase del prompt. Es el único detalle que puede hacer que nuestro anuncio parezca el de Bioré.

**3. "La nariz queda limpia, ya no hay puntitos oscuros".** La biblia lo pide en positivo y funciona bien para
generar; el problema es de mensaje, no de imagen. Los filamentos vuelven. Recomendación: mantener la frase en el
prompt (porque arregla un fallo real de generación) pero **no** sostener "cero puntos" en el copy ni en las
afirmaciones del anuncio, y dejar en el plano de cierre algún filamento tenue en las aletas.

**4. Luz suave de ventana en todos los planos.** El sitio 1 de la biblia es "baño de día, luz de ventana suave por
la izquierda". Con esa luz, el macro de poros no funciona: la textura se borra. Recomendación: mantener la ventana
como luz general del anuncio y **excepcionar los macros**, que van con fuente pequeña y dura desde la posición de
cámara (flash de móvil). Es coherente: en la vida real la gente se hace esa foto con el flash.

**5. Regla de continuidad que no está escrita en ningún sitio y debería.** Todos los planos de un mismo anuncio
tienen que compartir la dirección de la ventana. Si en el plano de aplicación la luz viene de la izquierda y en el
macro de la derecha, el montaje se rompe aunque el espectador no sepa por qué. Fija la ventana en la toma 1 y
respétala en las 15.

---

## 9. Rutina de diez minutos antes de cada tanda

1. Abre el **Top Ads de TikTok España, belleza, últimos 30 días**
   (`https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?period=30&region=ES&industry=22000000000`)
   y mira cinco anuncios. No copies el guion: mira la distancia de cámara y la altura. Se mueve cada pocas semanas.
2. Abre las tres fotos de Vue (`Model_Image_-_During.jpg`, `Dirty_Patch.jpg`, `Before_and_After_3.jpg`) y la figura
   clínica `gr1.jpg`. Treinta segundos cada una. Con eso se te recalibra el ojo para lo que sigue.
3. Decide **la dirección de la ventana** del anuncio y escríbela arriba del guion.
4. Decide **el estado del parche** de cada toma (1 a 5, según la biblia) y escríbelo al principio de cada prompt.
   Mezclar el estado 4 y el 5 en una imagen es el error más caro: hay que repetirla entera.
5. Comprueba que todas las tomas con parche llevan adjuntas las fotos reales del producto, y que la toma de "nariz
   después" lleva además la nariz limpia como segunda referencia.
6. Comprueba que ningún prompt lleva `8k`, `hyperrealistic`, `cinematic`, `professional photography`, `perfect
   skin`, `flawless`, `glowing`, `studio` ni `award-winning`, y que todos acaban en `No text, no logos, no
   watermark`.

Y la regla final, que vale para todo el documento: **si un plano no se parece a la referencia, el fallo casi nunca
está en el modelo, está en que faltaba un dato concreto en el prompt.** Casi siempre es uno de estos tres: la
distancia de cámara, el tamaño de la fuente de luz o la medida en milímetros de lo que hay en la piel.
