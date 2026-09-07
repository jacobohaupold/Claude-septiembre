# NOCTA — ecommerce de parches de hidrocoloide (clon mejorado de Vue Skin para España)

Todo lo que hay en esta carpeta se ha construido a partir de la investigación de `../vue-skin-research/` (6.534 anuncios de Meta, TikTok, Google, transcripciones y censo de frases). NOCTA copia el catálogo, la mecánica de oferta y los ganchos que a Vue le funcionan, y los mejora en tres puntos: colocación del producto explicada y mostrada correctamente, funnels completos (quiz, advertorial, upsell post-compra, suscripción) y analítica propia de primera parte.

## Índice de carpetas

| Carpeta | Qué contiene | Estado |
|---|---|---|
| `brand/packaging/` | `specs.json` (única fuente de medidas y textos legales), `box.html` (troquel y 3D de cada estuche, 1 mm = 4 px), `label.html` (etiquetas de líquidos), `patch.html` → `parche_nariz_lamina.png` (troquel del parche 60 × 45 mm y colocación correcta), renders `troquel_*.png` / `3d_*.png` | ✅ listo para enviar a imprenta/proveedor |
| `brand/packshots/` | 13 packshots fotorrealistas generados desde los renders 3D (`gama-v2.png` es la gama completa) | ✅ aprobados en `brand/qa/` |
| `brand/personas/` | creadoras/creador sintéticos (Soul) y la foto patrón de "parche bien puesto" | ✅ |
| `brand/video/` | **`final_maquina_T01_es.mp4`** (31 s, anuncio completo producido por la máquina), `final_ugc_nariz_v2_es.mp4` (UGC 17 s), `final_replica_vue14_es.mp4` y `final_replica_vue15_es.mp4` (réplicas de anuncios de Vue, uso interno), `turntable_nariz_6s.mp4`, `maquina/` (clips por plano) y `edit/` (montaje) | ✅ |
| `maquina/` | **La máquina de contenido**: `README.md` (flujo), `ganadores/top30.md` (los 30 anuncios de Vue que funcionan, elegidos por matemáticas, con desglose plano a plano), `gestos/` (60 clips de gesto reales como referencia de movimiento), `prompts/bloques.md`, `plantillas/` (8 anuncios listos + brief de demostración), `producir.py` | ✅ |
| `producto/fisica_del_parche.md` | Cómo se ve, se pone, se lleva, se despega, se estira y se enseña el parche: reglas obligatorias para toda generación | ✅ |
| `producto/catalogo_completo.md` | Los 13 SKU con precio, coste, margen, proveedor, claims permitidos, imagen y vídeo | ✅ |
| `negocio/` | **Plan de negocio integral** (`plan_de_negocio.md`: mercado, cliente, catálogo, canales, operaciones, legal paso a paso en España, finanzas, KPIs, riesgos), `roadmap_90_dias.md` (semana a semana), `checklist_lanzamiento.md` (62 casillas por área) y `como_hacer_todo.md` (guía práctica para el fundador) | ✅ |
| `web/public/assets/video/` | 10 vídeos de producto (bucle 4 s) que se muestran en cada ficha; páginas nuevas `catalogo.html`, `envios-devoluciones.html`, `contacto.html` | ✅ |
| `brand/audio/` | locuciones TTS en español (voz Marisol, Seed Audio) verificadas con Whisper | ✅ |
| `brand/qa/control_calidad_imagenes.md` | veredicto imagen por imagen y vídeo por vídeo, qué se rechazó y por qué | ✅ |
| `producto/fichas_desarrollo_producto.md` | fichas técnicas de los 10 productos: medidas, INCI, envase, proveedores (los mismos que usa Vue y alternativas), costes, pruebas de aceptación, compliance | ✅ |
| `web/` | tienda estática + Netlify Functions: catálogo, PDP, checkout (Stripe), gracias con upsell, quiz, advertorial, garantía, `admin/` (panel de analítica) | ✅ desplegable |
| `marketing/` | `estrategia_marketing.md`, `guiones_anuncios.md`, `matriz_100_anuncios.md` (plan de 100 creatividades con coste), `anuncios/` (desgloses plano a plano de anuncios de Vue replicados) | ✅ |
| `operaciones/manual_operativo.md` | pedido a proveedores, importación, 3PL, CPNP, atención al cliente, devoluciones | ✅ |
| `finanzas/` | `modelo_financiero_nocta.xlsx` (supuestos, unit economics por SKU, PyG 12 meses, caja, punto muerto, escenarios) y `plan_financiero.md` | ver carpeta |

## Web v2 «Laboratorio Cálido» (7 sep 2026)

Rediseño completo mobile-first de la tienda (misma URL, mismos endpoints y eventos): https://nocta-store.netlify.app

- **Producto sobre el fondo**: todas las imágenes de producto son recortes `-cut.webp` sin fondo ni caja, con sombra de contacto; fotos lifestyle solo en advertorial, guía y «sobre». Auditoría de los 12 recortes al 100 % en `brand/qa/control_calidad_imagenes.md`.
- **Compra impulsiva**: bajo cada producto (11 superficies) aparece «Comprar ahora» → Apple Pay / Google Pay / «Pago rápido» → «Añadir al carrito» → nota de envío. La compra exprés nunca borra el carrito.
- **Menús y barras**: cabecera que se condensa en píldora al hacer scroll, barra superior rotatoria, menú tipográfico numerado a pantalla completa con compra rápida del bestseller, carrito como hoja inferior arrastrable, barra de compra inferior con miniatura, toast arriba.
- **Rendimiento** (Lighthouse móvil, local): portada 99/100/96/100, ficha 99/100/96/100, checkout 99/100, advertorial 99/100; CLS 0; Inter autoalojada (1 woff2 variable); sin librerías.
- **Contrato de implementación**: `web/DESIGN.md` (sistema completo) y `web/COMPONENTS.md` (marcado y helpers para nuevas páginas).
- **Tablero de marca** estilo Figma (3200 × 1860) con las pantallas reales: `brand/tablero/tablero_marca_nocta.png` (+ versión presentación `_figma.png`); versión viva en https://nocta-store.netlify.app/tablero.html (noindex).
- Panel `/admin/` sin contraseña por decisión del propietario; `deploy.sh` ya no la reintroduce (solo si se pasa `ADMIN_TOKEN`).

### v3 (7 sep 2026, tarde): portada y ficha «cinemáticas»
- Hero con vídeo real en bucle (colocar → presionar → despegar → parche lleno → piel lisa), 900 KB, con póster; titular corto animado palabra a palabra; compra en dos botones (Comprar ahora + Pago rápido) en el primer pliegue.
- «Cómo funciona» en tres vídeos verticales que se reproducen al entrar en pantalla; sección «Lo que sale» con el fotograma del parche lleno y cifras animadas; comparativa parche/tira en dos tarjetas; marquee de garantías; scrollers con snap para parches, skincare y packs; vídeos de la comunidad con sonido al tocar (los dos anuncios terminados); valoración global; banda de garantía 60 días.
- La ficha de los parches de nariz incorpora los tres vídeos y el resultado por la mañana. Recortes compuestos nuevos para Dúo Poros y Kit Zona T.
- Activos: `web/public/assets/video/hero.mp4`, `paso-1..3.mp4`, `ugc-1.mp4`, `ugc-2.mp4`; `img/hero-poster.webp`, `paso-*.webp`, `ugc-*.webp`, `resultado-manana.webp`, `duo-poros-cut.webp`, `kit-t-zone-cut.webp`.

### v4 «clean» (7 sep 2026, tarde): fotografía GPT Image 2 en 4K y diseño rhode / Skims / Vue
- **Fotografía de producto nueva**: 13 packshots (10 productos + 3 packs) y 12 detail shots generados con GPT Image 2 a 4K (calidad medium, 2,5 cr cada uno) usando como referencia nuestro packaging real, más «mano con caja» para hero y flat-lay de la gama. Originales 4K en `brand/fotos/4k/` (JPEG q92), versiones web en `web/public/assets/img/foto/` (1200 y 1800 px WebP). Mapa slug → fotos en `web/public/assets/js/photos.js`.
- **Diseño**: hero a sangre con vídeo y una sola acción (Comprar + pago rápido), rejilla de producto tipo rhode (foto en tile crema, detalle al pasar el ratón, nombre, precio, Comprar + pago rápido), editorial a sangre, tres pasos en vídeo, resultado con cifras, packs, vídeos con sonido, opiniones con filetes, garantía tipográfica, FAQ. Sin marquee, sin bandas, sin numeración de secciones.
- Ficha: galería con foto principal, detalle, vídeo, mano con caja y lifestyle; catálogo con la misma rejilla.
- Créditos Higgsfield de la sesión de fotos: 76 (1 test en «high» a 11 cr + 26 imágenes en «medium» a 2,5 cr). Saldo 260,43.

### v5 «bento» (7 sep 2026, noche): sistema de tarjetas tipo rhode y UI pulida
- **Sistema visual**: toda la página se compone de tarjetas crema (`#F3EFE6`, radio 20/24 px) separadas por 8/12 px sobre el fondo, como rhode. Botones píldora con contorno y texto en mayúsculas (relleno azul solo en la acción principal), cabecera flotante blanca sobre el hero que se vuelve sólida al hacer scroll, barra de ventajas en píldora, barra de compra inferior flotante y aviso de cookies como tarjeta (ya no se solapan).
- **Tarjeta de producto**: palabra de categoría grande en gris cálido («nariz», «exfoliante», «dúo») sobre la foto, foto detalle al pasar el ratón, valoración, nombre, precio y botón «Comprar nariz · 16,95 €». Carriles con snap, puntos y flechas en escritorio para parches y skincare; packs en rejilla de tres.
- **Portada**: hero 4:5 en móvil y 16:8 en escritorio (vídeo con póster, titular abajo), carril de parches, editorial «no son puntos negros», tres pasos en vídeo, resultado con tres cifras en tarjetas, dúo, skincare, packs, comunidad, opiniones en tarjetas, garantía y envío en tarjetas de texto, FAQ en tarjeta.
- **Ficha y catálogo**: galería en tarjeta con contador, tallas como píldoras, bloque de compra (Comprar ahora + Pago rápido + Añadir), opciones única/suscripción, cifras y tabla de datos en tarjeta; catálogo con la misma tarjeta y chips píldora.
- **Rendimiento**: esqueletos estáticos con la altura exacta de cada tarjeta y placeholder de cabecera antes de que cargue el JS (CLS 0 en portada, catálogo, ficha, checkout, guía). Lighthouse móvil: portada 95/100/96/100, catálogo 96/100/96/100, ficha 94/100/96/100.
- Sin créditos Higgsfield: solo CSS/HTML/JS. Saldo 260,43.

## Cómo desplegar la web (Netlify, 10 minutos)

1. `cd nocta/web && npm install` (solo `@netlify/blobs`).
2. En Netlify: "Add new site → Import" apuntando a este repo, base directory `nocta/web`, publish `public`, functions `netlify/functions` (ya está en `netlify.toml`).
3. Variables de entorno:
   - `ADMIN_TOKEN` — contraseña del panel `/admin/` (obligatoria).
   - `STRIPE_SECRET_KEY` — sin ella el checkout funciona en modo demo y crea el pedido igualmente.
   - `STRIPE_WEBHOOK_SECRET` — para marcar pedidos pagados (`/api/order` ruta webhook).
   - `KLAVIYO_API_KEY` y `KLAVIYO_LIST_ID` — opcionales; si faltan, los leads quedan en Netlify Blobs.
   - `SITE_URL` — p. ej. `https://nocta.es`.
4. Píxeles: pon los IDs de Meta/TikTok/GA4 en `public/assets/js/app.js` (constantes al principio). El tracking propio (`/api/track`) funciona sin ellos.
5. Dominio: `nocta.es` (comprobar disponibilidad) o `nocta.skin`.

Panel `/admin/`: sesiones, rebote, embudo (visita → producto → carrito → checkout → compra), carritos abandonados, fuentes/UTM, landing, páginas de salida, países, dispositivos, scroll, ventas por producto y pedidos recientes. Filtra por `utm_content` = número de anuncio de la matriz para saber qué creatividad convierte.

## Pipeline de imagen y vídeo (diseño primero, generación después, QA siempre)

1. **Medidas y textos** en `brand/packaging/specs.json`.
2. **Troquel y 3D** con `box.html?mode=dieline|3d&id=nariz` y `label.html` (renderizados con Chromium headless a PNG).
3. **Fotorrealismo**: el render 3D se pasa como `image_references` a Nano Banana Pro con un prompt que obliga a respetar layout y textos. Cada imagen se revisa; las que inventan texto o cambian proporciones se rechazan (`brand/qa/`).
4. **Colocación del parche**: `patch.html` → lámina técnica → foto patrón `personas/creadora_02_parche_puesto_v1.png`. Esa foto es referencia obligatoria de cualquier vídeo/foto con el parche puesto (antes de esto los generadores ponían un "puntito" en la punta de la nariz).
5. **Vídeo**: siempre Seedance 2.5 (`omni_reference`, 9:16, 720p) con packshot + foto patrón como referencias. La voz que genera Seedance no se usa: se silencia.
6. **Audio y montaje**: locución con Seed Audio (voz Marisol, `voice_id 75e72cd5-…`), verificación automática con faster-whisper, y montaje con `brand/video/edit/montar_anuncio.py plan.json salida.mp4` (subtítulos quemados, mezcla, cierre con packshot). Coste del montaje: 0 créditos.
7. **Réplicas de anuncios de la competencia**: análisis plano a plano (`video_analysis`), persona sintética distinta en dos ejes (pelo y piel) a la original, `ad_multiplier video_edit` con prompt de sustitución + bloque de preservación; después se remonta con audio propio. Son maquetas internas / storyboards: el vídeo base es de Vue y no se puede publicar tal cual.


## Web en línea
**Tienda publicada: https://nocta-store.netlify.app** (sitio `nocta-store`, equipo aurovas en Netlify; panel de analítica en `/admin/` **sin contraseña** por decisión del propietario; para protegerlo de nuevo basta con definir `ADMIN_TOKEN` en Netlify → Environment variables y volver a desplegar). Para actualizarla tras cambios: `NETLIFY_AUTH_TOKEN=xxx nocta/web/deploy.sh nocta-store`, o conecta el repositorio en Netlify para despliegue automático.

## Poner la web en línea (Netlify) en 2 minutos
**Opción A, sin instalar nada:** entra en app.netlify.com → *Add new site* → *Import an existing project* → GitHub → repositorio `jacobohaupold/Claude-septiembre` → rama `claude/vue-skin-marketing-research-9dgtmr` → **Base directory `nocta/web`** (el resto lo lee de `netlify.toml`: publish `public`, functions `netlify/functions`) → *Deploy*. Después, en *Site configuration → Environment variables*, añade `ADMIN_TOKEN` (contraseña del panel `/admin/`) y, cuando tengas Stripe, `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET`. Sin Stripe el checkout funciona en modo demo.

**Opción B, con token:** crea un *Personal access token* en Netlify (User settings → Applications) y ejecuta `NETLIFY_AUTH_TOKEN=xxx nocta/web/deploy.sh nocta-store`. Crea el sitio, configura variables y publica; la URL será `https://nocta-store.netlify.app`.

La tienda ha pasado una prueba de humo con navegador (17 páginas, catálogo de 13 productos, carrito, ficha con vídeo, checkout, filtros) antes de este commit.

## Créditos Higgsfield
Saldo al cierre: **348 créditos**. Detalle por generación en `brand/qa/control_calidad_imagenes.md`. Un anuncio completo de 30 s con la máquina cuesta ≈ 225 créditos (≈ 130 reutilizando planos).

## Siguientes pasos (orden)
1. Pedir muestras a Nurimedics / Dermatech / OEMKorea con las fichas de `producto/` y el troquel de `brand/packaging/`.
2. Registrar marca NOCTA (EUIPO, clase 3 y 5), dominio, Stripe, CPNP con la persona responsable.
3. Desplegar la web, activar el panel, lanzar los 3 anuncios terminados con 20 €/día cada uno y medir 7 días.
4. Producir la tanda 2 de la matriz (8 anuncios) solo con los ganchos que hayan ganado.
