# La máquina de contenido NOCTA

Sistema repetible para producir anuncios que copian la fórmula de los 30 mejores de Vue (`ganadores/top30.md`) respetando el producto al 100 % (`../producto/fisica_del_parche.md`). Cada anuncio se monta con **bloques**: un gancho + un mecanismo + una secuencia de producto (aplicar → llevar → despegar → revelar) + prueba + cierre. Los bloques de producto no se "inventan": cada uno se genera con Seedance 2.5 usando **un clip real de gesto como referencia de movimiento** (`gestos/`) más las imágenes de la creadora y del patrón de parche puesto.

## Carpetas
- `ganadores/` — `top30.json/.md` (selección matemática y desglose plano a plano), `notas_gestos_raw.txt` (tiempos de cada gesto en cada vídeo).
- `gestos/` — 60 clips de 1-7 s recortados de esos vídeos, nombrados `Gxx_gesto__idvídeo__inicio-fin.mp4`. Son la **referencia de movimiento** (`video_references`) para Seedance. Uso interno, nunca se publican.
- `prompts/` — bloques de texto fijos: PRODUCTO, CREADORA, y un bloque por gesto (G01-G24).
- `plantillas/` — un JSON por anuncio-plantilla (estructura, planos, gesto de referencia por plano, guion ES, subtítulos, cierre).
- `../brand/video/edit/montar_anuncio.py` — montaje local (locución, subtítulos, cierre): 0 créditos.

## Flujo para producir un anuncio (≈ 45 min, 150-250 créditos)
1. Elegir plantilla en `plantillas/` (o copiar una y cambiar gancho/creadora).
2. Para cada plano de producto: `generate_video` Seedance 2.5, `mode: omni_reference`, `video_references` = clip de `gestos/` indicado, `image_references` = creadora (`brand/personas/*_soul.png`) + patrón (`brand/personas/creadora_02_parche_puesto_v1.png`) + packshot si sale la caja; prompt = "Copy the exact hand movement, timing and camera framing of the reference video" + bloque CREADORA + bloque PRODUCTO + bloque GESTO. 4-6 s, 9:16, 720p, `generate_audio: false`. Coste ≈ 6,5 cr/s. Añadir siempre `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`.
3. Para los planos de cara hablando (gancho, cierre): Seedance sin vídeo de referencia, o reutilizar planos aprobados.
4. QA por hoja de fotogramas (2 fps): rechazar si el parche no cumple la ficha física (puntito, tira, opaco al ponerlo, no se estira, rompe la piel) o si la persona cambia entre planos.
5. Locución: `generate_audio_batch` Seed Audio, voz Marisol (`75e72cd5-011b-4130-a474-e8b1ab341f04`); verificar con faster-whisper; 0,3 cr/línea. Voz masculina: Julian (`95429266-…`) sólo con frases cortas (falla en "arreglé sin querer").
6. Montaje: `plan.json` → `montar_anuncio.py` (concatena planos, coloca la voz, quema subtítulos, añade cierre con packshot).
7. Registrar en `../brand/qa/control_calidad_imagenes.md` y en la matriz de 100 anuncios (`../marketing/matriz_100_anuncios.md`).

## Alternativa cuando ya existe un anuncio completo de la competencia
Ad Multiplier (`video_edit`) con persona + caja sustituidas (ver `../marketing/anuncios/`), sólo como maqueta interna. Genjutsu `hf_mult_motion_control` (26 cr por clip de 3,5 s) transfiere el movimiento de un clip de `gestos/` a una imagen de la creadora; útil para gestos de manos muy concretos.

## Reglas de oro
- El parche siempre según `fisica_del_parche.md`; el bloque PRODUCTO va en todos los prompts.
- La creadora se describe siempre con la misma frase (bloque CREADORA) y la misma imagen de referencia.
- Un clip de gesto por plano; nunca pedir dos gestos en un clip de 5 s.
- Antes de generar 10 anuncios, generar 1 y medir en `/admin` con `utm_content`.
