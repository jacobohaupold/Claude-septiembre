# NOCTA — Plan de negocio integral

Documento de síntesis del proyecto. No sustituye a los documentos fuente, que son la referencia técnica y numérica definitiva: `../README.md`, `../producto/fichas_desarrollo_producto.md`, `../finanzas/plan_financiero.md`, `../operaciones/manual_operativo.md`, `../marketing/estrategia_marketing.md`, `../marketing/matriz_100_anuncios.md`, `../maquina/README.md` y `../web/public/assets/js/products.js`. Toda cifra marcada **(estimación)** no procede de ninguno de esos documentos y debe validarse con datos reales.

---

## 1. Resumen ejecutivo

NOCTA es una marca española de venta directa al consumidor (DTC) de parches de hidrocoloide y skincare coreano, construida como una réplica mejorada de Vue Skin/Vue Swiss (vueskin.com) adaptada al mercado español. El catálogo de lanzamiento son **13 referencias** (10 SKU individuales + 3 packs) definidas en `../web/public/assets/js/products.js` y desarrolladas técnicamente en `../producto/fichas_desarrollo_producto.md`: cinco formatos de parche de hidrocoloide (nariz, granos, superficie, barbilla, frente), cuatro líquidos (exfoliante salicílico, sérum niacinamida, peel-off de colágeno, tónico hialurónico), un pack de mascarillas de tela y tres bundles.

La tesis de negocio no es inventar categoría: es **copiar lo que ya funciona a Vue** (mismo tipo de producto, misma mecánica de oferta, los mismos ganchos publicitarios, validados sobre 6.534 anuncios reales de Meta/TikTok/Google) y ganarle en tres puntos donde Vue está débil en España, documentados en `../marketing/estrategia_marketing.md`: (1) cero comunicación nativa en español —Vue solo traduce anuncios de rebajas—, (2) quejas repetidas de adhesión y de plazos de envío de 2-3 semanas desde su almacén en Países Bajos, y (3) ausencia total de comunidad y de garantía diferenciada. NOCTA responde con copy 100 % en español de España, un troquel de parche rediseñado con garantía de adhesión propia, envío 24-48 h desde un almacén en España y una garantía de satisfacción de 60 días.

El negocio ya cuenta con activos de producción listos: troqueles y artwork (`../brand/packaging/`), packshots aprobados (`../brand/packshots/`), una tienda desplegable con checkout, quiz, advertorial y panel de analítica (`../web/`), un sistema de producción de vídeo publicitario repetible (`../maquina/`) y un plan de 100 anuncios ya guionizados (`../marketing/matriz_100_anuncios.md`). Lo que falta es ejecución: pedir muestras, cerrar proveedor, cumplir compliance cosmético en la UE, importar el primer lote y encender los anuncios.

**Cifras clave (escenario Base, `../finanzas/plan_financiero.md`):**
- Capital recomendado: **35.000-40.000 €** (25.000 € de aportación inicial no cubre el valle de caja de −9.904 € en el mes 4).
- Punto muerto: **~123 pedidos/mes** (~4.685 €/mes de ingresos con IVA).
- Mes 12: ~1.802 pedidos, 65.715 € de ingresos con IVA, EBITDA de 4.300 € (7,9 % sobre ingresos netos), ROAS 4,2x.
- El negocio entra en EBITDA acumulado positivo en el **mes 11**; los meses 1-5 son deficitarios mientras el CPA converge (18 €→11 €) y la base de recurrencia (suscripción + recompra) todavía es pequeña.

**Qué hace falta para arrancar, en orden** (detalle en `roadmap_90_dias.md` y `checklist_lanzamiento.md`):
1. Constituir la sociedad y pedir muestras a proveedores (`../producto/fichas_desarrollo_producto.md`).
2. Registrar la marca y cumplir compliance cosmético (PIF, CPSR, CPNP, AEMPS).
3. Fabricar e importar el primer lote piloto.
4. Desplegar la web (`../README.md`, sección "Cómo desplegar la web") y lanzar los 3 anuncios ya producidos con 20 €/día cada uno.
5. Medir 7 días en el panel `/admin`, escalar solo lo que convierte y producir la tanda 2 de la matriz de anuncios.

---

## 2. Mercado en España

### Tamaño del mercado **(estimación)**
No hay una cifra de mercado en los documentos fuente; las siguientes son estimaciones de contexto para dimensionar la oportunidad, no un dato validado:
- El mercado español de cuidado facial (skincare) se estima en varios cientos de millones de euros anuales, con el segmento de "parches/tratamientos localizados para imperfecciones y poros" como una micro-categoría dentro de él, en fuerte crecimiento por la tendencia K-beauty y el auge de TikTok Shop **(estimación)**.
- Vue, sin operación local en español, ha generado un volumen de inversión publicitaria relevante en Meta/TikTok/Google dirigido a UE+UK (según el censo de 6.534 anuncios que sustenta este proyecto) sin comunicación nativa en castellano: es la señal más fuerte de que existe demanda en España que hoy nadie está sirviendo bien en su idioma.
- El comportamiento de búsqueda en español ("parches puntos negros nariz", "filamentos sebáceos qué son", "parches hidrocoloide españa") ya está mapeado como ángulo de Google Search en `../marketing/estrategia_marketing.md`, sección 10.

### Competidores directos
| Competidor | Origen | Precio parche nariz | Posicionamiento | Debilidad explotable |
|---|---|---|---|---|
| **Vue Skin / Vue Swiss** | Suiza/UE (VAMI Sàrl), almacén en Países Bajos | 16,95 € (8 uds.) | Paid social masivo, oferta agresiva, escasez/urgencia | Sin español nativo, envío lento a España, quejas de adhesión en Trustpilot, sin comunidad |
| **Hero Cosmetics Mighty Patch** | EE. UU., fabricado por T&L (mismo fabricante base que usan los parches de NOCTA/Vue) | ~10-13 € (venta en Amazon/Sephora ES) | Marca consolidada, presencia en retail físico y Amazon | Producto genérico sin adaptación a mercado español, sin oferta de suscripción agresiva |
| **COSRX** | Corea | ~8-12 € (parches y "Acne Pimple Master Patch") | Marca K-beauty reconocida, buena distribución online (Amazon, tiendas de nicho) | Catálogo amplio pero sin especialización en el "gancho nariz/filamentos sebáceos"; sin funnel DTC propio en España |
| **Starface** | EE. UU. | ~12-15 € (parches decorativos, forma de estrella) | Estética/lifestyle, Gen Z, producto "fun" | Producto decorativo, no orientado a resultado ni a la narrativa de "prueba visual" que domina el ángulo de Vue/NOCTA |
| **Marcas de farmacia (ISDIN, La Roche-Posay, Bella Aurora, genéricos de parafarmacia)** | España/Europa | 6-15 € | Confianza de canal (farmacia), sin necesidad de publicidad agresiva | Producto poco diferenciado, sin storytelling de "antes/después", ticket medio bajo, sin modelo de suscripción |

### Precio de referencia en el mercado
El parche de nariz se mueve en una banda de **8-17 €** según canal (farmacia más barato, DTC de marca más caro). NOCTA se posiciona en la parte alta de la banda (16,95 € el parche de nariz suelto, ver catálogo en la sección 5) porque compite por experiencia de marca y oferta, no por precio unitario — el mismo terreno donde compite Vue.

---

## 3. Cliente objetivo — 3 buyer personas

Extraídas y desarrolladas de `../marketing/estrategia_marketing.md`, sección 3 (avatares).

### Persona 1 — "Bea", 18-28 años
- **Perfil**: estudiante o primer empleo, vive en redes (TikTok/Reels/Instagram Stories), se hace selfies a diario.
- **Insight/dolor literal**: *"qué asco me da la nariz con puntos negros"* — se mira de cerca en el móvil con luz dura y no soporta lo que ve; ya ha probado tiras de poros, limpiadores de carbón y vapor de ducha sin resultado duradero.
- **Deseo**: piel "de cristal" en fotos sin filtro, poder hacer un primer plano sin editar antes de publicar.
- **Objeciones**: "seguro que es como las tiras, que luego vuelve todo"; "¿de verdad funciona o es postureo de TikTok?".
- **Cómo se vence la objeción**: prueba visual (el parche sucio al retirarlo, "peel reveal"), reseñas verificadas con nombre y ciudad española, garantía de 60 días sin condiciones raras.
- **Canal principal**: TikTok Spark Ads, Reels, creadoras nano/micro con contenido UGC autoparódico ("3 razones para NO comprarlos").

### Persona 2 — "Marisol", 35-50 años
- **Perfil**: trabaja, tiene una rutina de cuidado ya establecida, se ve peor en videollamadas de trabajo y en fotos con flash de móvil que hace 10 años.
- **Insight/dolor literal**: *"llevo 20 años con estos puntos y cada vez se nota más en las fotos de la comida de empresa"*; ha gastado en limpiezas de cutis profesionales que vuelven a los 15 días.
- **Deseo**: verse "descansada y cuidada" sin maquillaje pesado, una rutina simple que no le robe tiempo por la mañana.
- **Objeciones**: "¿me va a irritar la piel a mi edad?"; "¿esto no es para adolescentes?"; desconfianza genérica hacia comprar por un anuncio en redes.
- **Cómo se vence la objeción**: mensaje "los filamentos sebáceos no desaparecen con la edad, se hacen más visibles"; anuncios con voz de dermatóloga/esteticista colegiada e identificada, prueba social declarando la edad ("+40").
- **Canal principal**: Facebook e Instagram feed/reels, email/SMS tras la primera compra (Marisol es la persona con más probabilidad de convertirse en suscriptora recurrente).

### Persona 3 — "Álex", 22-40 años, hombre
- **Perfil**: cuida su imagen por trabajo de cara al público, deporte o vida social, rutina de 0-1 productos, se avergüenza de preguntar en una tienda física.
- **Insight/dolor literal**: *"mi chica me lo dice cada dos por tres, que tengo la nariz llena de puntos"*; ha pensado en el láser pero le da miedo el precio y el proceso.
- **Deseo**: solución de 20 segundos sin rutina visible, sin que parezca que "hace algo" con su piel.
- **Objeciones**: "esto es cosa de mujeres"; "¿de verdad un parche hace algo o es placebo?"; comparación de precio con el láser (donde el parche gana con claridad).
- **Cómo se vence la objeción**: dato de que los hombres producen más sebo (validación biológica, no estética); testimonio de hombres reales, no actores; ángulo "novia se lo enseña" en formato reacción.
- **Canal principal**: Meta feed con voz masculina, YouTube Shorts, TikTok con creadores hombres reales.

---

## 4. Propuesta de valor y posicionamiento frente a Vue

**Frase de posicionamiento** (`../marketing/estrategia_marketing.md`): *"NOCTA es el parche coreano para filamentos sebáceos pensado, traducido y enviado desde España: se pega de verdad, llega en 24-48 h y si no funciona, te devolvemos el dinero."*

NOCTA no vende un producto distinto al de Vue —el hidrocoloide es el mismo material médico, del mismo tipo de fabricante coreano (Nurimedics/T&L, ver `../producto/fichas_desarrollo_producto.md`)— sino **mejor explicado, mejor entregado y con más garantías**, sobre las seis palancas documentadas frente a Vue:

| Palanca | Vue | NOCTA |
|---|---|---|
| Idioma | Español solo en anuncios de rebajas traducidos | 100 % nativo en español de España, en anuncios, PDP y atención al cliente |
| Envío | 3-7 días desde Países Bajos, quejas de 2-3 semanas en Trustpilot | 24-48 h desde almacén en España (48-72 h Baleares/Canarias) |
| Adhesión | Segunda queja más repetida en Trustpilot | Troquel rediseñado + Garantía de Adhesión (reembolso si no aguanta 6-8 h) |
| Colocación del producto | Mostrada de forma incorrecta en la mayoría del contenido generado | Foto patrón de colocación correcta obligatoria en todo el pipeline de creación (`../producto/fisica_del_parche.md`, `../brand/personas/`) |
| Precio | 16,95 € sin descuento base en UE | Precio transparente, sin tachados artificiales, con bundles de ahorro real |
| Comunidad | Sin comunidad, sin Reddit/X, TikTok orgánico abandonado | Comunidad activa, respuesta a comentarios <2 h, programa de afiliadas con código propio |

La propuesta de valor se sostiene además sobre activos que Vue no tiene en España: **funnels completos** (quiz de diagnóstico, advertorial, upsell post-compra, flujo de suscripción — construidos en `../web/`) y **analítica de primera parte propia** (panel `/admin` con embudo completo, atribución por `utm_content`), que permiten optimizar el CAC con datos reales desde el primer euro invertido, en vez de depender solo del ROAS reportado por las plataformas.

---

## 5. Catálogo y precios

Fuente de precios: `../web/public/assets/js/products.js` (precios finales con IVA, fuente única de verdad para la web). Fuente de coste desembarcado: `../producto/fichas_desarrollo_producto.md` (rangos de cotización de proveedor, sin muestra física confirmada todavía — marcados ahí como estimación de sourcing). El margen aquí calculado es el **margen bruto de producto** (precio neto de IVA menos coste desembarcado del SKU, con el punto medio del rango de coste), **antes** de pasarela de pago, packaging de envío, 3PL, envío al cliente y devoluciones — esos costes ya están incorporados de forma agregada en el margen de contribución de `../finanzas/plan_financiero.md` (11,58 €/pedido, ~51 % sobre ingresos netos a nivel compañía en el mes 12). Los dos números no son comparables directamente: el de esta tabla es solo coste de producto.

| # | SKU | Producto | Precio (IVA incl.) | Precio neto IVA | Coste desembarcado (rango, ficha) | Coste medio usado | Margen bruto SKU |
|---|---|---|---|---|---|---|---|
| 1 | NC-NOSE-8 | Parches de Nariz (8 uds.) | 16,95 € | 14,01 € | 3,0-5,4 € | 4,20 € | ~70 % |
| 2 | NC-SPOT-36 | Parches para Granos (36 uds.) | 15,95 € | 13,18 € | 1,6-1,9 € | 1,75 € | ~87 % |
| 3 | NC-SURF-10 | Parches de Superficie (10 uds.) | 15,95 € | 13,18 € | 2,4-4,5 € | 3,45 € | ~74 % |
| 4 | NC-CHIN-8 | Parches de Barbilla (8 uds.) | 16,95 € | 14,01 € | 3,2-5,6 € | 4,40 € | ~69 % |
| 5 | NC-FORE-5 | Parches de Frente (5 uds.) | 16,95 € | 14,01 € | 3,5-5,8 € | 4,65 € | ~67 % |
| 6 | NC-BHA-110 | Exfoliante Ácido Salicílico 2 % (110 ml) | 32,00 € | 26,45 € | 2,8-5,5 € | 4,15 € | ~84 % |
| 7 | NC-NIA-30 | Sérum Niacinamida 2 % (30 ml) | 29,00 € | 23,97 € | 3,1-6,0 € | 4,55 € | ~81 % |
| 8 | NC-PEEL-70 | Mascarilla Peel-Off Colágeno (70 ml) | 29,00 € | 23,97 € | 2,3-4,3 € | 3,30 € | ~86 % |
| 9 | NC-SHEET-4 | Pack 4 Mascarillas de Tela (4 uds.) | 15,00 € | 12,40 € | 2,4-4,7 € | 3,55 € | ~71 % |
| 10 | NC-TON-130 | Tónico Ácido Hialurónico (130 ml) | 25,00 € | 20,66 € | 2,2-6,0 € | 4,10 € | ~80 % |
| 11 | NC-DUO | Dúo Poros Limpios (Exfoliante + Nariz) | 44,00 € | 36,36 € | Suma componentes + 0,60 € estuche ≈ 8,95 € | 8,95 € | ~75 % |
| 12 | NC-TZONE | Kit Zona T (Frente + Nariz + Barbilla) | 44,00 € | 36,36 € | Suma componentes + 0,25 € faja ≈ 13,50 € | 13,50 € | ~63 % |
| 13 | NC-FULL | Kit Cara Completa (5 parches) | 69,00 € | 57,02 € | Suma componentes + 0,90 € caja ≈ 19,35 € | 19,35 € | ~66 % |

**Lectura de la tabla**: los parches sueltos y los líquidos tienen el margen bruto de producto más alto (67-87 %); los bundles bajan el margen porcentual (63-75 %) porque agrupan varios costes de producto pero elevan el AOV en euros absolutos — es la palanca principal para subir el AOV objetivo de 38 € (ver sección 6). Los costes son rangos de RFQ sin muestra física confirmada (ver `../finanzas/plan_financiero.md`, sección 6, hipótesis nº 3): antes de comprometer el pedido inicial hay que ajustar esta tabla con cotización en firme.

**Nota de coherencia con `../marketing/estrategia_marketing.md`**: ese documento usa 15,95 € como precio de venta objetivo del parche de nariz para diferenciarse "por debajo" de los 16,95 € de Vue; el catálogo real de la web (`products.js`, fuente de verdad) fija el parche de nariz en **16,95 €**, igual que Vue. Es una inconsistencia entre documentos que debe resolverse antes del lanzamiento (ver sección de hallazgos al final del roadmap): o se baja el precio de venta a 15,95 € en `products.js` para sostener el ángulo de precio de los anuncios, o se ajusta el copy de marketing para no prometer un precio más bajo que no existe en la tienda.

---

## 6. Modelo de negocio

- **Compra única**: precio de catálogo de la sección 5, sin compromiso.
- **Suscripción "Suscríbete y ahorra"**: −15 % sobre el precio de catálogo (mismo descuento que usa Vue), con recurrencia cada 30/45/60 días configurable por el cliente. Los precios `sub` de cada SKU en `products.js` ya reflejan este −15 % (p. ej. parches de nariz: 16,95 € → 14,41 € en suscripción).
- **Packs/bundles**: Dúo Poros Limpios (44 €), Kit Zona T (44 €) y Kit Cara Completa (69 €) — diseñados para subir el AOV por encima de la venta de un solo SKU, con ahorro real declarado (nunca tachado artificial).
- **Umbrales de carrito** (`../marketing/estrategia_marketing.md` y `products.js` → `NOCTA_GIFTS`): envío gratis desde 30 €, mascarilla de tela de regalo desde 50 €, parches de granos de regalo desde 80 €. Envío base 3,90 € (`NOCTA_SHIPPING`).
- **AOV objetivo**: 38 € con IVA en el escenario Base del plan financiero (~1,6 packs/pedido de media); la estrategia de marketing apunta a 42-48 € como objetivo de fase de validación/escala apoyándose en bundles y umbrales de regalo — ambas cifras son coherentes entre sí como rango realista (38 € conservador, 42-48 € con mezcla de bundles more agresiva).
- **Tasa de suscripción objetivo**: 15 % de los pedidos nuevos se suscriben, con baja (churn) del 15 %/mes — cifra marcada como "Estimación" en el propio plan financiero, a validar con datos reales desde el día 1 de ventas.
- **Recompra no-suscriptores**: 30 % a 90 días (también estimación sectorial a validar).
- **Fase 2 — Amazon**: una vez validado el producto en la web propia (que debe seguir siendo el canal principal por margen y control de datos), listar los SKU de mayor rotación en Amazon.es como canal incremental de descubrimiento, sin descuidar el foco DTC.

---

## 7. Canales

Desarrollo completo de estructura de campaña, presupuestos y calendario en `../marketing/estrategia_marketing.md` (secciones 6-12). Resumen de mix de canales:

- **Meta Ads**: canal principal (55 % del presupuesto en el mes 3 de ejemplo). Estructura de 3 campañas: ASC+ Broad España (60-65 % del presupuesto), Prospección por Avatar (Bea/Marisol/Álex, 20-25 %) y Retargeting de Catálogo (10-15 %).
- **TikTok Ads**: Spark Ads sobre contenido propio y de creadoras, Smart+ como entrada, TikTok Shop España como canal de venta directa a partir del mes 3 (comisión de plataforma 9 %, 4 % los primeros 60 días con ≥5 SKU publicados en 15 días).
- **Google**: Shopping de marca/héroes, Performance Max por grupos de activos (nariz/T-zone/rutina) y Search de marca + intención alta en español.
- **Creadores UGC**: 20 creadoras/mes (nano y micro), tarifas 50-800 €/vídeo, mezcla de gifting puro y pago mixto, con derechos de uso para repurpose en pago (whitelisting).
- **Email/SMS (Klaviyo)**: flows de bienvenida, carrito abandonado y post-compra; objetivo de gobierno del 25-30 % de ingresos vía email/SMS a partir del mes 3-6, para reducir la dependencia de paid social.
- **Afiliación con códigos** (Social Snowball o equivalente): comisión 10-20 % sobre ventas netas, códigos personalizados por creadora.
- **Amazon (fase 2)**: no forma parte del lanzamiento; se evalúa a partir de que el DTC esté validado (mes 4-6 en adelante), priorizando los SKU de mayor rotación.

---

## 8. Marketing: ejecución

El plan de creatividades está completamente guionizado en `../marketing/matriz_100_anuncios.md`: sistema de **10 ganchos × 5 formatos × 2 variantes = 100 anuncios**, todos en español de España, 9:16, con subtítulos quemados y cierre con packshot. Los 10 ganchos están extraídos y ordenados por frecuencia real de uso en el corpus de anuncios de Vue (censo de 6.534 anuncios), de "No son puntos negros" (reencuadre educativo) a "Garantía" (riesgo cero). Los 5 formatos van desde UGC selfie hasta réplica directa de un anuncio ganador de Vue (uso interno, no publicable tal cual — solo como maqueta/storyboard para producir un vídeo propio).

La producción de cada anuncio se hace con la máquina de contenido (`../maquina/README.md`): un sistema repetible que genera cada plano de producto usando un clip de gesto real como referencia de movimiento (nunca "inventa" cómo se coloca el parche), monta la voz en español con TTS verificado por Whisper, y produce un anuncio completo en ~45 minutos por 150-250 créditos de Higgsfield. Coste estimado de producir los 100 anuncios de la matriz: ~6.000 créditos (el saldo actual permite tandas de 10-12 anuncios/mes, o requiere subir de plan).

**Orden de producción recomendado** (`../marketing/matriz_100_anuncios.md`): Tanda 1 ya producida (3 anuncios + turntable); Tanda 2 sobre los ganchos "asco satisfactorio" y "reto de una noche" (8 anuncios, los que más "peel reveal" muestran); Tanda 3 sobre ganchos baratos sin cara para escalar con bajo coste (12 anuncios). Después de cada tanda, medir en el panel `/admin` filtrando por `utm_content` = número de anuncio, y duplicar solo los que superen CTR > 1,5 % y CPA < 12 €.

---

## 9. Operaciones

Desarrollo completo en `../operaciones/manual_operativo.md`. Resumen:

- **Proveedores**: Corea como proveedor principal por arancel preferencial 0 % (acuerdo UE-Corea) — Nurimedics, NewY Medical y Dermatech/SourcingLab para parches, OEMKorea/Mayk/knok/Cosmecca para líquidos. China como respaldo (Yanse, Trummed, Hysent) con arancel MFN del 6,5 %.
- **MOQ**: 1.000-3.000 unidades/SKU en el pedido piloto con proveedores coreanos (algunos converters chinos aceptan MOQ desde 3.000-5.000). El troquel propio de cada forma de parche cuesta 500-2.000 $ (una sola vez, ya diseñado en `../brand/packaging/`).
- **Tiempos**: muestras 5-10 días (China) a 3-4 semanas (Corea con troquel a medida); producción del pedido piloto varias semanas; transporte aéreo 3-6 días puerta a puerta (recomendado para el primer lote) frente a 25-45 días por marítimo (recomendado a partir de la segunda reposición, cuando el volumen lo justifique).
- **3PL en España**: fase 1 con fulfillment casero + Sendcloud/Packlink hasta ~500-600 pedidos/mes; a partir de ahí, cotizar Byrd, Logisfashion y Cubyn en paralelo (comparar coste por pedido, cobertura UE y SLA de picking).
- **Devoluciones**: derecho de desistimiento legal de 14 días para producto sin abrir; garantía comercial de satisfacción de 60 días (con condición de uso mínimo, formulario con fotos antes/después para evitar devolución física); SLA de 48-72 h con el 3PL para procesar devoluciones.

---

## 10. Legal y compliance — paso a paso en España

Fuente: `../operaciones/manual_operativo.md`, secciones a-e. Se resume aquí en orden de ejecución.

### 10.1 Forma jurídica: autónomo vs. SL

| | Autónomo | SL (recomendada) |
|---|---|---|
| Coste de constitución | 0 € | ~900-1.500 € (notaría, registro, gestoría primer mes, certificación de nombre) |
| Responsabilidad | Ilimitada (patrimonio personal) | Limitada al capital social |
| Ante fábricas/bancos | Imagen más débil | Facilita cuenta de empresa, línea de crédito, EORI a nombre de persona jurídica |
| Cuota mensual | ~230-380 €/mes de autónomos | Sin cuota de autónomo si no hay retribución directa; gestoría 80-150 €/mes |
| Fiscalidad | IRPF (hasta 47 %) | IS 25 % (15 % los dos primeros años con beneficios) |

**Recomendación**: SL desde el inicio, por la responsabilidad frente a reclamaciones de producto y por la imagen ante proveedores coreanos que piden "company registration". Pasos y plazos:
1. Certificación negativa de nombre en el Registro Mercantil Central (3 candidatos: NOCTA SL, NOCTA Skincare SL, NOCTA Beauty SL) — ~15 días, 20,63 €.
2. Depósito de capital social — recomendado 3.000-3.100 € (evita limitaciones de reparto de dividendos y da imagen de solvencia).
3. Escritura pública ante notario — vía CIRCE/PAE en 24-48 h con estatutos tipo abarata el coste (~60-100 € notaría + 40 € registro).
4. Inscripción en el Registro Mercantil (5-15 días hábiles).
5. NIF definitivo (provisional el mismo día de la escritura).
6. Alta censal **modelo 036** en la AEAT: IAE **665.1** (venta por correo/catálogo) combinado con el epígrafe de venta de cosméticos (consultar con gestoría) — coste 0 € para PYME los dos primeros ejercicios.
7. Alta en RETA si el administrador cobra retribución, o alta de trabajadores si se contrata equipo.
8. Registro de titular real (obligatorio desde 2023).

Presupuesto total: **900-1.500 €**, plazo 2-4 semanas.

### 10.2 EORI y ROI

- **EORI**: imprescindible para importar de Corea/China. Solicitud telemática con certificado digital de la SL, gratuita, resolución en 1-3 días hábiles. Formato `ESB########`. Solicitarlo en cuanto haya CIF definitivo, antes de cerrar el primer pedido a fábrica.
- **ROI/censo VIES**: se pide en el mismo modelo 036, sin coste. No es imprescindible para importar de fuera de la UE, pero conviene tenerlo activo desde el inicio por si se opera con intermediarios/3PL con sede en otro país de la UE.

### 10.3 IVA y OSS **(estimación)**
- IVA de importación: 21 % sobre el valor en aduana (CIF + arancel), liquidado en el DUA; deducible como IVA soportado en la declaración trimestral.
- IVA de venta nacional: 21 % en las facturas a clientes en España, declaración trimestral (modelo 303) y resumen anual (modelo 390), gestionado por la gestoría.
- **OSS (One-Stop Shop)**: si NOCTA vende a clientes particulares en otros países de la UE (Portugal, Francia, Italia, Alemania, como contempla la expansión de envío descrita en `../operaciones/manual_operativo.md`) por encima del umbral conjunto de 10.000 €/año de ventas intracomunitarias B2C, es obligatorio aplicar el IVA del país de destino del comprador y liquidarlo de forma centralizada a través del régimen OSS (declaración trimestral única en la sede electrónica de la AEAT, sin necesidad de darse de alta en cada país). Registrarse en OSS **antes** de superar ese umbral si se planea vender fuera de España desde el lanzamiento, dado que el propio manual operativo prevé envíos a PT/FR/IT/DE desde el primer 3PL.

### 10.4 Reglamento (CE) 1223/2009 — cosmética

- **Persona Responsable (PR) en la UE**: NOCTA SL puede asumir el rol de PR al tener domicilio en la UE (recomendado, sin coste directo salvo el tiempo/formación), o externalizarlo (200-900 €/producto/año). Debe estar designada antes de la primera venta.
- **PIF (Product Information File)**: expediente técnico por SKU (fórmula, CPSR, método de fabricación GMP, pruebas, sustanciación de claims), conservado 10 años. Coste: 300-800 €/SKU. Plazo: 2-4 semanas por SKU una vez recibida la documentación del fabricante.
- **CPSR (Cosmetic Product Safety Report)**: informe de seguridad firmado por evaluador cualificado (Anexo I). 180-450 € para fórmula simple (parches), 350-1.500 € para fórmula compleja (líquidos). 1-3 semanas por SKU.
- **CPNP (Cosmetic Products Notification Portal)**: notificación obligatoria antes de comercializar cada SKU, gratuita, se hace en cuanto el PIF/CPSR está listo.
- **Etiquetado obligatorio en castellano** (art. 19): nombre y dirección de la Persona Responsable, país de origen ("Fabricado en Corea del Sur"), contenido nominal (℮ o unidades), **PAO** (símbolo de bote abierto, "12M") o fecha de caducidad, precauciones de uso, número de **lote**, función del producto, lista de ingredientes INCI precedida de "Ingredients". Ejemplos completos de etiqueta para parche de nariz y exfoliante en `../operaciones/manual_operativo.md`, sección d.
- **Challenge test y test de estabilidad** (para los líquidos con conservantes): 150-1.000 €, en paralelo al CPSR.
- **Revisión legal de etiqueta**: 100-300 €, antes de imprimir el packaging definitivo.

### 10.5 AEMPS
- **Declaración responsable de importación** (RD 85/2018, app COSMET2): obligatoria porque NOCTA importa directamente de Corea/China y actúa como Persona Responsable/importadora. Tasa 5.06: **466,23 €** (+ 418,59 € si hay inspección). Requiere persona de contacto cualificada, procedimientos escritos de calidad/reclamaciones/retirada de producto, e instalaciones/almacén adecuados (puede subcontratarse a un 3PL). Presentarla antes de que llegue la primera importación.

### 10.6 Marca — EUIPO / OEPM
- **Búsqueda previa** en TMview (euipo.europa.eu) para verificar que "NOCTA" no colisiona en la **clase 3** (cosméticos); existen marcas "NOCTA" en otras categorías (calzado/deporte) que no deberían generar conflicto directo, pero conviene descartar riesgo de dilución si son notorias. Alternativas de respaldo ya preparadas: "noctae", "nocta skin", "luma nocte".
- **EUIPO** (marca de la Unión, protección en los 27 países con una sola solicitud): tasa **850 €** por 1 clase (+50 € la 2ª clase, +150 € la 3ª en adelante). Clases recomendadas: 3 (cosméticos) y opcionalmente 35 (venta online) y 44 (servicios de belleza). Plazo: 4-6 meses hasta registro firme si no hay oposición, aunque la fecha de prioridad queda protegida desde el día de la solicitud y se puede empezar a vender antes.
- **Alternativa más barata para validar antes de invertir fuerte**: marca española vía **OEPM**, ~150 € una clase, protección solo en España, ampliable después a EUIPO.
- **Gestión**: presentación directa online, o vía agente de la propiedad industrial (300-600 € de honorarios, recomendable para redactar bien la lista de productos y responder objeciones/oposiciones).
- Presupuesto total: **900-1.450 €**, plazo 4-6 meses hasta registro firme en EUIPO.

### 10.7 RGPD, LSSI y cookies
- **RGPD**: política de privacidad publicada, base legal de cada tratamiento (consentimiento para marketing, ejecución de contrato para el pedido), registro de actividades de tratamiento, cláusulas de encargado de tratamiento con Klaviyo/Stripe/3PL/Gorgias como proveedores que tratan datos por cuenta de NOCTA.
- **LSSI**: aviso legal con datos identificativos de NOCTA SL (CIF, domicilio, registro mercantil), condiciones de contratación electrónica claras antes de la confirmación del pedido.
- **Cookies**: gestor de consentimiento (Cookiebot u homólogo, ya contemplado en el stack de `../operaciones/manual_operativo.md`, sección h) con bloqueo real de scripts de terceros (Meta Pixel, TikTok Pixel, GA4) hasta que el usuario consienta.

### 10.8 Condiciones de venta, desistimiento y garantía
- **Condiciones de venta** publicadas en la web: precios con IVA incluido, formas de pago, plazos y coste de envío, política de devoluciones.
- **Derecho de desistimiento de 14 días** (obligatorio, normativa de consumidores UE): aplica a producto sin abrir/sin usar; gastos de envío de vuelta a cargo del cliente salvo que NOCTA decida ofrecerlo gratis como ventaja competitiva.
- **Garantía de 60 días como política comercial** (no legal, es un compromiso propio de marca, igual que el 82 % de los anuncios de Vue según el censo): condicionada a uso mínimo demostrado (p. ej. 3 usos en 30 días para parches) y a un formulario con fotos antes/después, para resolver sin necesidad de devolución física del producto usado.
- **Garantía de Adhesión** (diferenciador propio de NOCTA frente a Vue): si el parche no se queda pegado 6-8 h, reembolso o reposición inmediata sin condiciones.

### 10.9 Envases y Ecoembes/RAP **(estimación)**
No está desarrollado en los documentos fuente; es un trámite obligatorio que debe incorporarse al plan de compliance:
- España aplica la **Responsabilidad Ampliada del Productor (RAP)** de envases (RD 1055/2022, en desarrollo del Real Decreto de envases y residuos de envases): todo envasador que pone en el mercado español productos envasados (cajas, pouches, frascos, tubos) debe adherirse a un **Sistema Colectivo de Responsabilidad Ampliada del Productor (SCRAP)**, siendo **Ecoembes** el sistema de referencia para envases domésticos ligeros.
- Trámite: alta como "envasador/productor" en el registro de productores de producto (a través de Ecoembes o del SCRAP elegido), declaración periódica de las cantidades y tipos de material puestos en el mercado (cartón, pouch metalizado, vidrio, PE/PP), y pago de la cuota correspondiente (variable según peso y tipo de material, del orden de **300-1.500 €/año (estimación)** para el volumen de un lanzamiento DTC pequeño).
- Este trámite debe planificarse en paralelo al PIF/CPSR (semana 6-12 del cronograma) y antes de la primera venta, ya que la obligación nace con la puesta en el mercado del producto envasado, no con la facturación.

### 10.10 Seguro de Responsabilidad Civil de producto
Cubre reclamaciones por reacciones adversas o daños derivados del uso del producto: 300-1.200 €/año según facturación y número de SKU (cotizar con corredor especializado en ecommerce/cosmética — Hiscox, AXA, Mapfre Empresas). Contratar antes de la primera venta.

### 10.11 Consultoras recomendadas
Aseconsa, Emeba Consulting, Cosmereg, ASC Services y Deunapieza en España; Biorius, Cosmeservice, EU Compliance Partner, Certified Cosmetics y B-Lands a nivel internacional. Pedir presupuesto cerrado por paquete de las 10 fichas técnicas, no por producto suelto.

### 10.12 Coste total de compliance
- **Primer producto**: 1.500-4.500 €.
- **9 productos adicionales**: 500-1.500 €/producto (economía de escala).
- **Total 10 SKU técnicos, primer año**: **6.000-18.000 €**, sin contar Ecoembes/RAP ni seguro RC (ya presupuestados aparte en las secciones 10.9 y 10.10).

---

## 11. Finanzas — resumen

Modelo completo en `../finanzas/modelo_financiero_nocta.xlsx` (6 hojas) y `../finanzas/plan_financiero.md`. Cifras del escenario Base:

- **Capital necesario**: con 25.000 € de aportación inicial, la caja mínima del año cae a **−9.904 € en el mes 4**. Recomendación: dotar **35.000-40.000 €** (25.000 € de aportación + 10.000-15.000 € de colchón/línea de crédito), o retrasar el ritmo de escalado de Ads hasta consolidar el ROAS.
- **Punto muerto**: margen de contribución medio de 11,58 €/pedido (tras COGS, pasarela, envío, 3PL, packaging y devoluciones, antes de Ads); costes fijos de 1.427 €/mes → **~123 pedidos/mes** para cubrir costes fijos, ~4.685 €/mes de ingresos con IVA. El CPA máximo rentable en el primer pedido es 11,58 €.
- **PyG mes 12**: ~1.802 pedidos, 65.715 € de ingresos con IVA (54.310 € netos de IVA), margen bruto ~51 % sobre ingresos netos, inversión en Ads de 12.899 €, margen de contribución de 5.727 €, EBITDA de **4.300 €** (7,9 % sobre ingresos netos), ROAS 4,2x. EBITDA acumulado año 1: **5.507 €**, con punto de inflexión a EBITDA acumulado positivo en el mes 11.
- **Escenarios**: en el Pesimista, el EBITDA acumulado año 1 es −28.825 € y la caja mínima cae a −27.791 € — no recupera el capital en el primer año y confirma la necesidad del colchón adicional. En el Optimista, el EBITDA acumulado año 1 alcanza 170.899 €.
- **Las 5 hipótesis más arriesgadas** (detalle y método de validación en 60 días en `../finanzas/plan_financiero.md`, sección 6): curva de CPA (18 €→11 €), tasa de suscripción (15 %) y su churn (15 %/mes), coste desembarcado real por SKU (sin muestra física confirmada), tasa de devoluciones (3 %) y plazo de cobro de Stripe, y tasa de repetición de compra a 90 días (30 %).

---

## 12. KPIs y cuadro de mando

Métricas de gobierno semanal (`../marketing/estrategia_marketing.md`, sección 13) con objetivos por hito temporal. Las cifras de mes 1/3/6 combinan el cuadro de KPIs de marketing con la curva de CPA y el AOV del plan financiero; las de mes 12 proceden del PyG del escenario Base.

| Métrica | Mes 1 | Mes 3 | Mes 6 | Mes 12 |
|---|---|---|---|---|
| CPA (coste por pedido) | ≤ 55 € en aprendizaje / 18 € objetivo de modelo | ≤ 40 € | ≤ 32-35 € (suelo del modelo: 11 €) | Convergido en el suelo de la curva |
| ROAS (plataforma) | ≥ 1,6 | ≥ 2,0-2,5 | ≥ 2,5-3,2x | 4,2x |
| AOV | 38 € (modelo) / objetivo 42-48 € con bundles | ≥ 42 € | ≥ 45-48 € | según mezcla de venta real |
| CVR PDP (tasa de conversión) | ≥ 2 % (arranque) | ≥ 2,5-2,8 % | ≥ 2,8-3,2 % | — |
| Tasa de repetición a 90 días | — (sin datos, en marcha) | ≥ 12 % | ≥ 15-20 % | 30 % (supuesto del modelo) |
| Tasa de suscripción sobre pedidos nuevos | activa desde el día 1 | medir opt-in real | ajustar `Supuestos!suscripcion` con dato real | 15 % (supuesto del modelo) |
| Margen de contribución/pedido | negativo o muy bajo (CPA alto) | positivo, convergiendo a 11,58 € | ~11,58 € | 5.727 € de contribución total en el mes |
| % ingresos vía email/SMS | — | 15 % | 25-30 % | 35 %+ (objetivo top) |
| EBITDA mensual | negativo | negativo/próximo a cero | próximo a cero o positivo | 4.300 € (7,9 % s/ingresos netos) |

**Cadencia de revisión**: diaria (gasto, CPA, stock), semanal (creatividades por `utm_content`, flows de Klaviyo, cohortes de recompra), mensual (P&L de contribución, LTV, inventario) — según `../marketing/estrategia_marketing.md`, sección 13.

---

## 13. Riesgos y mitigaciones

Ampliado de `../operaciones/manual_operativo.md`, sección k, y `../finanzas/plan_financiero.md`, sección 6.

| # | Riesgo | Probabilidad/Impacto | Mitigación |
|---|---|---|---|
| 1 | Retraso en compliance (PIF/CPSR/AEMPS/CPNP) que bloquea la fecha de lanzamiento | Alta / Alto | Iniciar compliance en paralelo a la producción, no después de recibir mercancía; consultora con SLA de plazos por escrito |
| 2 | Calidad de muestra no reproducible en producción en serie | Media / Alto | Inspección pre-embarque (PSI) antes del 70 % restante; "golden sample" firmado por ambas partes |
| 3 | Proveedor incumple plazos de producción | Media / Medio | Penalización por retraso en el PO; proveedor de respaldo ya cualificado desde el pedido piloto |
| 4 | Coste desembarcado real por SKU distinto al estimado en las fichas (sin muestra física confirmada) | Media / Medio-Alto | Cotización en firme con MOQ/Incoterm/plazo antes de comprometer el pedido inicial; recalcular márgenes de la sección 5 con datos reales |
| 5 | CPA real no converge a 11 €/pedido en 6 meses (hipótesis más apalancada del modelo financiero) | Alta / Alto | Lanzar con presupuesto reducido semana 1-2, medir CPA real por semana; si en la semana 6 no baja de ~14 €, recalibrar la curva de Ads y el techo de escalado |
| 6 | Caja insuficiente en el valle del mes 4 (−9.904 € con solo 25.000 € de capital) | Alta / Alto | Dotar 35.000-40.000 € de capital o ralentizar el ritmo de escalado de Ads hasta consolidar ROAS |
| 7 | Reacciones cutáneas o reclamaciones de seguridad de clientes | Baja-Media / Alto | Seguro de RC activo desde el día 1; CPSR/RIPT robustos; trazabilidad por lote; protocolo de retirada si se detecta un patrón |
| 8 | Colisión de la marca "NOCTA" con otra ya registrada (oposición/demanda) | Media / Medio-Alto | Búsqueda exhaustiva en TMview antes de invertir en branding; 1-2 nombres alternativos preparados (noctae, nocta skin, luma nocte) |
| 9 | Dependencia excesiva de paid social y subida del CAC | Alta / Medio | Invertir desde el inicio en canales propios (email/SMS, afiliación/UGC) para no depender 100 % de Meta/TikTok; diversificar con Google/SEO y Amazon en fase 2 |
| 10 | Rotura de stock en el lanzamiento por subestimar la demanda inicial | Media / Medio | Pedido piloto dimensionado con margen, no ajustado al mínimo; proveedor de reposición rápida por aéreo identificado de antemano |

---

## 14. Organización — quién hace qué

Estructura ligera pensada para los primeros 6-12 meses, coherente con el presupuesto del plan financiero (costes fijos de 1.427 €/mes en el mes 12, sin plantilla asalariada todavía):

- **Fundador/a (dedicación completa)**: decisiones de producto y proveedor, compliance y trámites legales (con apoyo de gestoría/consultora), gestión financiera y de caja, dirección creativa de la matriz de anuncios, atención al cliente en las fases iniciales, relación con el 3PL.
- **Gestoría** (freelance/despacho, ~80-150 €/mes): contabilidad, modelo 036, IVA trimestral, nóminas si se contrata equipo.
- **Consultora de compliance cosmético** (proyecto puntual, 6.000-18.000 € el primer año): PIF, CPSR, CPNP, declaración AEMPS.
- **Agente de propiedad industrial** (opcional, 300-600 €): registro de marca en EUIPO.
- **Agente de aduanas** (recurrente, 60-150 €/DUA): despacho de cada importación.
- **Diseñador/a gráfico freelance** (puntual, 500-1.000 € por tanda de packaging/artwork): ajustes de artwork sobre los troqueles ya definidos en `../brand/packaging/`.
- **Creadoras/creadores UGC** (20/mes, 50-800 €/vídeo o gifting): contenido para la matriz de 100 anuncios y para TikTok/Instagram orgánico.
- **Freelance de atención al cliente** (a partir de que el volumen lo justifique, vía Gorgias): gestión de tickets, devoluciones y garantías.
- **La máquina de contenido** (`../maquina/`): no es una persona, es el sistema de producción de vídeo publicitario que sustituye a gran parte de lo que en Vue hace un equipo de creativos — operado directamente por el fundador o por quien lleve marketing.

---

## 15. Anexos — mapa de documentos del repositorio

| Documento | Contenido |
|---|---|
| `../README.md` | Visión general del proyecto, cómo desplegar la web, pipeline de imagen/vídeo, siguientes pasos |
| `../producto/fichas_desarrollo_producto.md` | Fichas técnicas de las 13 referencias: medidas, INCI, envase, proveedores, costes, pruebas de aceptación |
| `../producto/fisica_del_parche.md` | Reglas obligatorias de cómo se ve, coloca y usa el parche en cualquier contenido generado |
| `../finanzas/plan_financiero.md` y `../finanzas/modelo_financiero_nocta.xlsx` | Supuestos, unit economics por SKU, PyG 12 meses, caja, punto muerto, escenarios |
| `../operaciones/manual_operativo.md` | Constitución de empresa, marca, sourcing, packaging/etiquetado, compliance, importación, logística, 3PL, stack tecnológico, cronograma de 16 semanas, checklist, riesgos |
| `../marketing/estrategia_marketing.md` | Posicionamiento, avatares, objeciones, oferta, estructura de campañas, calendario promocional, UGC, afiliación |
| `../marketing/matriz_100_anuncios.md` | Los 100 anuncios (10 ganchos × 5 formatos × 2 variantes), coste de producción, orden de producción |
| `../maquina/README.md` | Sistema repetible de producción de vídeo publicitario |
| `../brand/packaging/` | `specs.json` (medidas y textos legales), troqueles y 3D listos para imprenta/proveedor |
| `../brand/packshots/`, `../brand/personas/`, `../brand/video/` | Activos visuales y audiovisuales aprobados |
| `../web/` | Tienda estática + Netlify Functions: catálogo, PDP, checkout, quiz, advertorial, panel `/admin` |
| `../web/public/assets/js/products.js` | Catálogo con precios, fuente única de verdad para la web |
| `roadmap_90_dias.md` | Plan semana a semana de ejecución desde hoy hasta el día 90 |
| `checklist_lanzamiento.md` | Checklist por área con dónde está cada pieza en el repo o qué contratar |
| `como_hacer_todo.md` | Guía operativa paso a paso para el fundador |
