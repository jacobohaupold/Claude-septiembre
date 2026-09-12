# NOCTA · Anuncios: todo lo que hace falta para producir los 25

**Versión 1.0 · 12 de septiembre de 2026.** Esta carpeta contiene el material para producir los 25 anuncios
seleccionados: las 375 tomas con sus prompts, las reglas comprobadas, los manuales de las herramientas y las
imágenes ya generadas del anuncio 1.

## Por dónde se empieza

| Si quieres… | Abre |
|---|---|
| Generar las imágenes de un anuncio | `PROMPTS_375_TOMAS.md`, busca el anuncio y copia los prompts |
| Saber por qué el parche sale deforme y cómo se arregla | `BIBLIA_VISUAL.md` |
| Que una imagen parezca foto y no render | `MANUAL_GPT_IMAGE_2_5.md` |
| Animar una imagen sin que se deforme | `MANUAL_VIDEO_SEEDANCE.md` |
| Montar el anuncio en Higgsfield y no quemar créditos | `MANUAL_HIGGSFIELD.md` |
| Referencias reales de cómo se ve y se mueve esto | `REFERENCIAS_VISUALES.md` |
| Saber qué copiamos de Vue Skin y qué no | `LENGUAJE_VISUAL_VUE.md` |
| Saber qué modelo usar para cada toma y por qué | `MODELOS_CUAL_ELEGIR.md` |
| Usar los fotogramas reales de Vue Skin como referencia | `FOTOGRAMAS_VUE.md` |
| Ver cómo tiene que quedar una toma | `img/a01/` |

## Las tres cosas que más fallan, y su arreglo en una línea

1. **El parche sale con otra forma.** Describirlo con palabras no basta. Hay que adjuntar las **fotos reales del
   producto** como referencia en toda imagen donde salga, y escribir al principio del prompt
   «The patch must be EXACTLY the product in the reference photographs». Está en `BIBLIA_VISUAL.md` §1.
2. **La nariz «después» sale igual de sucia que la de antes.** El avatar de referencia tiene la nariz con puntos y
   el modelo los conserva. Se arregla adjuntando un fotograma ya generado de esa misma nariz limpia como segunda
   referencia. El de Álex es `img/a01/a01_13.jpg`.
3. **El despegado no tiene sentido físico.** Si escribes «la mitad izquierda despegada y la derecha pegada», el
   modelo genera dos parches. Hay que describirlo como **una sola lámina continua** que se levanta por una única
   frontera. La frase exacta está en la biblia y en el prompt de la toma 11 del anuncio 1.

## Estado

| Pieza | Estado |
|---|---|
| Biblia visual con las reglas comprobadas | Hecha |
| Anuncio 1: 15 tomas generadas, revisadas y con su prompt exacto | Hecho |
| Prompts de imagen y de vídeo de los 25 anuncios | En `PROMPTS_375_TOMAS.md`; ver ahí qué anuncios faltan |
| Prompt maestro de vídeo por anuncio (copiar y pegar) | Hecho, dentro de cada anuncio |
| Manuales de Higgsfield, vídeo, GPT Image y referencias | Ver los ficheros de esta carpeta |
| Imágenes de los anuncios 2 a 25 | **No generadas**: se generan al lanzar cada anuncio |

## Comprobación automática antes de generar

Hay un comprobador que lee los ficheros de `prompts/` y falla si algo no cuadra:

```bash
python3 nocta/tools/anuncios-qa/comprobar.py
```

Comprueba cinco cosas:

1. **Cobertura del guion.** Las 15 tomas de cada anuncio tocan todos los bloques del guion real de ese anuncio,
   que está en `datos/ads25_guiones.json`. Si un bloque se queda sin ninguna toma, ese anuncio está contando otra
   cosa y hay que rehacer el desglose.
2. **Quince tomas.** Ni catorce ni dieciséis.
3. **Palabras prohibidas.** Ninguna toma lleva cinematic, flawless, bokeh, golden hour, 8k ni las demás de la
   biblia, que son las que convierten una foto de móvil en un render.
4. **Fidelidad del producto.** Toda toma donde salga el parche o la caja lleva su cláusula al principio y sus
   fotos de referencia. Es el fallo que más caro sale: sin las fotos, el parche sale deforme.
5. **Prohibición de texto.** Todos los prompts terminan prohibiendo texto y marcas de agua.
6. **Enlaces e imágenes.** Ningún documento apunta a un fichero o a una imagen que no existe.

Estado actual: **todo correcto** en los anuncios ya escritos y en los 85 enlaces internos de la documentación.

## Aviso de créditos

Las imágenes son baratas; lo caro es el vídeo. Conviene tenerlo claro antes de decidir presupuesto.

| Concepto | Coste medido |
|---|---|
| Una imagen con GPT Image 2.5 Flare, 1k, calidad media, 9:16 | 1 crédito |
| Las 15 tomas del anuncio 1, con las 12 repeticiones que hicieron falta | 27 créditos |
| Las 360 imágenes de los 24 anuncios restantes, con repeticiones | 430-480 créditos |
| Un clip de vídeo de 15 s a 720p con Seedance 2.5 | 97,5 créditos |
| Los 25 anuncios en vídeo con el método de boards | unos 6.150 créditos |

El saldo de la cuenta es de **275,93 créditos** (plan Plus, 1.200 al mes que **caducan** cada ciclo, no se
acumulan). Con eso:

- **Sí da** para generar las imágenes de unos 15 anuncios completos.
- **Sí da** para un anuncio piloto entero en vídeo de 30 segundos con el método de boards (214 créditos).
- **No da** para las imágenes de los 24 anuncios y además el vídeo.
- **No da**, ni de lejos, para los 25 anuncios en vídeo: faltan unos 5.900 créditos.

Lo que sí está entregado para los 25 anuncios son **los prompts**, que es la parte que no caduca.
El desglose completo está en `MANUAL_HIGGSFIELD.md` §9.
