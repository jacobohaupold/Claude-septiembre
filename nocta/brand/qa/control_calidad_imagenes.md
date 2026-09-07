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
| `video/adm_vue_replica_14s.mp4` | Ad Multiplier video_edit 14 s 720p (91 cr) + audio original remuxado con ffmpeg | ✅ Maqueta interna | Anuncio real de Vue (ID 1206204697405725) con la persona sustituida por la creadora 2 en los 6 planos y la caja azul de Vue sustituida por la caja NOCTA. **No publicable tal cual**: el vídeo base es propiedad de Vue; sirve como storyboard y prueba de concepto para rodar la versión propia |

## Créditos Higgsfield consumidos en esta sesión (06-07/09, según `transactions`)

| Concepto | Nº | Créditos |
|---|---|---|
| Nano Banana Pro (packshots, gama, lifestyle, patrón de parche, board) | 33 generaciones (−2 reembolsadas) | 62,0 |
| GPT Image 2 (board UGC 21:9) | 1 | 6,5 |
| Seedream 5 Pro (de-slop del board) | 1 | 3,0 |
| Soul V2 (3 personas sintéticas) | 3 | 0,36 |
| Seedance 2.5 (turntable 6 s, UGC v1 15 s, UGC v2 15 s) | 3 | 234,0 |
| Ad Multiplier (réplica 14 s = 89,3; réplica 24 s = 157,73; dos intentos bloqueados por moderación y reembolsados) | 2 cobrados | 247,0 |
| Seed Audio (locuciones ES, incl. pruebas) | 19 líneas | 8,5 |
| **Total sesión** | | **≈ 561** |
| Saldo restante estimado | | ≈ 611 |

Regla de ahorro aplicada: vídeo sólo con Seedance 2.5 / Ad Multiplier cuando la referencia de imagen ya estaba aprobada; audio y montaje siempre en local (0 créditos).
