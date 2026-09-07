# Control de calidad de las imágenes generadas (diseño 3D → fotorrealismo)

Proceso: (1) diseño del envase con medidas reales en `packaging/specs.json` → (2) troquel y render 3D fieles (`packaging/troquel_*.png`, `packaging/3d_*.png`) → (3) el render 3D se pasa como imagen de referencia al generador fotorrealista con un prompt que obliga a respetar layout, tipografía y textos → (4) revisión visual imagen por imagen → (5) regeneración sólo de lo que falla.

| Imagen | Referencia usada | Veredicto | Observaciones |
|---|---|---|---|
| `packshots/nariz-hero.png` | `3d_nariz_frontal.png` | ✅ Aprobada | Wordmark, luna, "PARCHES DE NARIZ / HIDROCOLOIDE / 8 parches · noche / Made in Korea", lateral con "8 parches · noche · NC-NOSE-8" y parche sobre liner: todo correcto |
| `packshots/nariz-dorso.png` | `3d_nariz_dorso.png` | ✅ Aprobada para web | Bloques de texto respetados; el cuerpo de texto pequeño es ilegible de cerca (limitación del generador; la impresión usa nuestro artwork) |
| `packshots/granos.png`, `superficie.png`, `barbilla.png`, `frente.png` | renders 3D respectivos | ✅ Aprobadas | Textos del frontal correctos; formas de parche coherentes con las medidas de la ficha |
| `packshots/exfoliante.png` | `etiquetas_todas.png` | ✅ Aprobada para web | Etiqueta navy 100 × 78 mm, frasco esmerilado 110 ml y tapa flip crema correctos. Texto pequeño (INCI) ilegible y símbolo PAO mal renderizado: no usar como referencia de impresión |
| `packshots/serum.png`, `tonico.png`, `peel-off.png`, `mascarillas-tela.png` | `etiquetas_todas.png` | ✅ Aprobadas para web | Mismo aviso sobre el texto pequeño |
| `packshots/gama.png` (v1) | nariz + etiquetas | ❌ Rechazada | Fundía "PARCHES DE BARBILLA / DE FRENTE" en una caja, faltaba la caja de frente, duplicaba el stack de sachets, "6 parütas" |
| `packshots/gama-v2.png` | nariz-hero + exfoliante + sérum + tónico (fotos ya aprobadas) | ✅ Aprobada (sustituye a la v1 en la web) | Prompt con lista cerrada de 13 ítems y prohibición de duplicados |

Regla: cualquier imagen con texto inventado en el envase se descarta; el artwork de impresión final siempre sale de `packaging/box.html` / `label.html` (vectorial, medidas exactas), nunca de una imagen generada.

## Colocación del parche sobre la persona (revisión exigida el 06/09)

Problema detectado: en `lifestyle-noche.png` (v1) y en el board UGC el generador ponía el parche como un "puntito" sobre la punta de la nariz o como una tira estrecha: no respetaba la forma ni la colocación real del producto.

Solución (diseño primero): lámina técnica `packaging/patch.html` → `packaging/parche_nariz_lamina.png` con el troquel del parche a escala (60 × 45 mm, puente 28 mm, alas 23 mm, muesca de columela), diagrama de colocación frontal, perfil y errores prohibidos. Esa lámina se pasa como referencia y con ella se genera una foto patrón "parche bien puesto" que a su vez es la referencia obligatoria de cualquier vídeo o foto donde el parche aparezca aplicado.

| Imagen | Referencia usada | Veredicto | Observaciones |
|---|---|---|---|
| `personas/creadora_02_parche_puesto_v1.png` | `parche_nariz_lamina.png` + `creadora_02_soul.png` | ✅ Aprobada como patrón | Puente, punta y alas envolviendo las aletas, muesca en la columela, sin arrugas. Es la referencia de colocación para todos los vídeos |
| `packaging/lifestyle-noche.png` (v1, web) | ninguna de colocación | ❌ Rechazada | Parche como puntito sobre la punta; se sustituye por la v2 generada con el patrón |
| `video/board_ugc_nariz_raw.png` (panel 3) | `3d_nariz_frontal.png` | ⚠️ Parcial | Caja y liner correctos; colocación del parche insuficiente. El board sólo se usa para la parte de caja/liner |

## Vídeos

| Vídeo | Modelo / coste | Veredicto | Observaciones |
|---|---|---|---|
| `video/turntable_nariz_6s.mp4` | Seedance 2.5 omni_reference 6 s 720p (≈40 cr) | ✅ | Caja fiel al render 3D girando sobre fondo crema |
| `video/ugc_nariz_15s_v1.mp4` | Seedance 2.5 omni_reference 15 s 720p audio (97,5 cr) | ⚠️ Sólo 0-6 s aprovechables | Caja perfecta (wordmark, luna, "PARCHES DE NARIZ HIDROCOLOIDE"), voz en español correcta, persona 2 correcta; el parche aplicado (9-13 s) queda estrecho sobre la punta → rechazado ese tramo |
| `video/ugc_nariz_15s_v2.mp4` | Seedance 2.5 con patrón de colocación como referencia (97,5 cr) | ✅ Imagen aprobada · ❌ audio del modelo rechazado | Parche bien colocado (puente, punta, alas; presión con dos índices), caja correcta, peel con puntos. La voz que genera Seedance no se entiende ("filimentos se vacales") → se silencia y se sustituye por locución TTS |
| `video/final_ugc_nariz_v2_es.mp4` | v2 + locución Seed Audio (Marisol) + subtítulos + cierre (montaje local, 0 cr) | ✅ **Entregable final** (17 s) | Transcripción automática del resultado = guion exacto; subtítulos legibles; cierre con packshot, garantía y web |
| `video/final_replica_vue14_es.mp4` | réplica 14 s + locución ES + subtítulos + cierre | ✅ **Entregable final (uso interno)** (15,7 s) | Audio original de Vue silenciado (llevaba voz en inglés); guion adaptado del original |
| `video/final_replica_vue15_es.mp4` | réplica del anuncio "maquillaje" de Vue (ID 873621904612893) con Ad Multiplier (99,5 cr) + locución ES + subtítulos + cierre | ⚠️ Maqueta interna (storyboard) | Creadora 2 sustituida en 11 de 12 planos (en 8-9 s queda la rubia original), el parche de 4-5 s sale blanco opaco en vez de translúcido y los rótulos en inglés del original permanecen quemados. Sirve para rodar la versión propia siguiendo `marketing/anuncios/replica_vue_873621904612893.md`; no publicable |
| réplica del anuncio ganador de 24 s (ID 919735961024580) | Ad Multiplier, 3 intentos | ❌ Bloqueada por moderación de Higgsfield (nsfw) en los 3 intentos, créditos reembolsados | Se documenta el desglose plano a plano en `marketing/anuncios/replica_vue_919735961024580.md` para rodarlo con el creador 3 |
| réplica del anuncio de 10 s (ID 2785309601624353) | — | ❌ El servicio de Higgsfield no confirmó la subida del vídeo (3 subidas, incluida una re-codificación) | Desglose en `marketing/anuncios/replica_vue_2785309601624353.md`; locuciones ES ya generadas en `audio/adm10_vo_*.wav` |
| `video/adm_vue_replica_14s.mp4` | Ad Multiplier video_edit 14 s 720p (91 cr) + audio original remuxado con ffmpeg | ✅ Maqueta interna | Anuncio real de Vue (ID 1206204697405725) con la persona sustituida por la creadora 2 en los 6 planos y la caja azul de Vue sustituida por la caja NOCTA. **No publicable tal cual**: el vídeo base es propiedad de Vue; sirve como storyboard y prueba de concepto para rodar la versión propia |

## Créditos Higgsfield consumidos en esta sesión (06-07/09, según `transactions`)

| Concepto | Nº | Créditos |
|---|---|---|
| Nano Banana Pro (packshots, gama, lifestyle, patrón de parche, board) | 33 generaciones (−2 reembolsadas) | 62,0 |
| GPT Image 2 (board UGC 21:9) | 1 | 6,5 |
| Seedream 5 Pro (de-slop del board) | 1 | 3,0 |
| Soul V2 (3 personas sintéticas) | 3 | 0,36 |
| Seedance 2.5 (turntable 6 s, UGC v1 15 s, UGC v2 15 s) | 3 | 234,0 |
| Ad Multiplier (réplica 14 s = 89,3; réplica 15 s = 99,45; tres intentos de la de 24 s bloqueados por moderación y reembolsados) | 2 cobrados | 188,75 |
| Seed Audio (locuciones ES, incl. pruebas y 12 líneas masculinas para la variante B) | 45 líneas | 16,5 |
| **Total sesión** | | **≈ 511** |
| Saldo restante (balance real al cierre) | | 661,7 |

Regla de ahorro aplicada: vídeo sólo con Seedance 2.5 / Ad Multiplier cuando la referencia de imagen ya estaba aprobada; audio y montaje siempre en local (0 créditos).

## Máquina de contenido: clips con referencia de movimiento (Seedance 2.5 omni_reference + `video_references` = clip real de gesto)

| Clip | Referencias | Coste | Veredicto | Observaciones |
|---|---|---|---|---|
| `video/maquina/clip_G10_despegar_v1.mp4` (5 s) | movimiento: `maquina/gestos/G10_…822761193551016__13-16.5.mp4` · imagen: patrón parche puesto (creadora 2) | 32,5 | ✅ Aprobado con nota | Copia el gesto real (pinza la punta, tira hacia cámara, muestra la cara interna, gesto de "asco-satisfacción" al final). El parche cubre puente-punta-alas y se alarga al despegar. Nota para v2: la zona blanca de la punta parece una gota de crema en vez de un escarchado fino; añadir "thin frosted film, not a blob of cream" |
| `video/maquina/clip_S1_gancho.mp4` (4 s) | imagen: creadora 2 | 26 | ✅ | Pellizca la punta, cara de preocupación, gira para enseñar los poros; sin parche (correcto) |
| `video/maquina/clip_S3_presion_V.mp4` (5 s) | imagen: patrón parche puesto (sin vídeo: la referencia G04 de 602011846179690 fue bloqueada por moderación) | 32,5 | ✅ | Los dos índices recorren los laterales presionando las alas; el parche cubre puente-punta-alas, translúcido, se ven los poros |
| `video/maquina/clip_S4_despegar_v2.mp4` (5 s) | movimiento: G10 (822761193551016) · imagen: patrón | 32,5 | ✅ **Mejor clip de la sesión** | Escarchado fino y creíble en punta y pliegues; pinza la punta y tira hacia cámara formando una tira larga translúcida como en el original; gesto de "asco-satisfacción" |
| `video/maquina/clip_S6_lisa_caja.mp4` (5 s) | imagen: creadora 2 + packshot caja | 32,5 | ✅ | Se frota la nariz lisa con la yema, sonríe y levanta la caja NOCTA (wordmark, luna, texto) nítida |
| `video/maquina/clip_S5_revelar.mp4` (5 s) | movimiento: G12 (772789505845233) · imagen: creadora 2 | 32,5 | ✅ con nota | Parche usado estirado entre las dos manos al doble de ancho, translúcido con tapones blancos, luego acercado a cámara. Nota v2: lo sostiene a la altura de los ojos; pedir "at chin level" |
| `video/maquina/clip_S2_liner_colocar.mp4` (5 s) | movimiento: G02 (1584088272180999) · imagen: creadora 2 + patrón | 32,5 | ✅ | Levanta el parche del liner blanco (se ven los dos parches en la tarjeta), lo muestra en alto (mariposa translúcida lechosa), lo centra en el puente y lo baja a la punta, presiona con las dos manos |
| **`video/final_maquina_T01_es.mp4`** (31,5 s) | 6 clips de arriba + 6 locuciones Marisol + subtítulos + cierre (`maquina/producir.py`) | 0 (montaje) | ✅ **Entregable final** | Estructura de los ganadores: gancho → mecanismo → sacar/colocar → presión V → despegar con estiramiento → revelar → nariz lisa + caja → cierre. Transcripción automática = guion. Misma creadora en los 6 planos; parche conforme a `producto/fisica_del_parche.md` en todos |

### Créditos de la máquina (07/09, 02:55-03:20)
| Concepto | Créditos |
|---|---|
| 7 clips Seedance 2.5 omni_reference 5 s 720p (6 con referencia de vídeo a 32,5; 1 gancho de 4 s a 26) | 221,0 |
| 1 clip bloqueado por moderación (referencia G04 de 602011846179690), reembolsado | 0 |
| 13 locuciones Seed Audio | ≈ 4 |
| **Saldo real al cierre** | **438,4** |
| Coste medio de un anuncio completo de 30 s con la máquina | ≈ 225 créditos (≈ 7 clips) · con clips reutilizados (caja, gancho, nariz lisa) ≈ 130 |

## Vídeos de catálogo (07/09, 03:32) — Seedance 2.5 omni_reference 4 s 480p desde el packshot aprobado, 10 cr cada uno
| Producto | Veredicto | Observaciones |
|---|---|---|
| parches-granos, parches-superficie, parches-barbilla, parches-frente | ✅ | Caja idéntica al packshot (wordmark, luna, textos), giro lento sobre plataforma, liner/lámina delante |
| exfoliante-salicilico, serum-niacinamida, mascarilla-peel-off, pack-mascarillas-tela, tonico-hialuronico | ✅ | Envase y etiqueta fieles; gotero levantándose en el sérum; gotas en exfoliante y tónico |
| parches-nariz | ✅ | Reutiliza `turntable_nariz_6s.mp4` comprimido |
Total: 90 créditos. Publicados comprimidos (≈120 KB cada uno) en `web/public/assets/video/` y enlazados en `products.js` (`video`). **Saldo real al cierre: 348,4 créditos.**

## Recortes de producto sin fondo (07/09) — para la web rediseñada
| Imagen | Método | Coste | Veredicto |
|---|---|---|---|
| `web/public/assets/img/<slug>-cut.webp` + `.png` (12 productos + gama + dorso) y originales en `brand/recortes/` | Higgsfield `remove_background` sobre el packshot aprobado (1 cr/imagen); recorte local con rembg (isnet) como alternativa gratuita para los envases sueltos | 12 | ✅ Bordes limpios sin halo; conserva liner, pinzas, gotero, trazo de gel y discos; lienzo cuadrado con margen 6 % y fondo transparente para que el producto flote sobre el crema de la web |
