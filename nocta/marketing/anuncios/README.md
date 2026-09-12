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

## Aviso de créditos

Las imágenes del anuncio 1 costaron 27 créditos de Higgsfield (1k, calidad media, 9:16, 1 crédito por imagen,
contando las repeticiones que hubo que hacer hasta que el parche salió bien). Generar los 24 anuncios restantes a
15 imágenes cada uno son **360 imágenes como mínimo**, y con las repeticiones normales sube a 430-480 créditos.
El saldo de la cuenta ahora mismo es de **275,93 créditos** (plan Plus), así que no dan para los 24. Dan para
unos 15 anuncios completos. Lo que sí está entregado para los 25 son los prompts.
