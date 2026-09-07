# NOCTA — Cómo hacer cada cosa (guía para el fundador)

Guía operativa en el orden en que hay que ejecutar las cosas. Cada sección remite al documento o archivo del repositorio donde está la pieza real; aquí solo se explica el "cómo" paso a paso.

---

## 1. Pedir muestras y negociar con el proveedor

**Antes de escribir**: reunir de `../producto/fichas_desarrollo_producto.md` la ficha del SKU (medidas, grosor, INCI, formato, unidades por envase) y de `../brand/packaging/` el troquel correspondiente (`troquel_*.png`) para adjuntarlo como referencia visual.

**Pasos**:
1. Elegir 3-4 proveedores por categoría según la lista de la ficha (parches: Nurimedics, NewY Medical, Dermatech, SourcingLab + respaldo chino Yanse/Trummed/Hysent; líquidos: OEMKorea, Mayk, knok, Cosmecca).
2. Enviar el correo de RFQ (plantillas abajo) adjuntando la ficha técnica y el troquel en PNG.
3. Pedir explícitamente: tabla de precio por tramos (1.000/3.000/5.000/10.000+ uds.), MOQ, plazo de producción, certificaciones (ISO 22716, ISO 13485 si aplica), RIPT/MSDS/COA, y la cláusula de origen preferencial Corea-UE si el proveedor es coreano.
4. A las respuestas, pedir 2-3 unidades de muestra de cada troquel (o 30-50 ml si es líquido) y confirmar quién paga el courier.
5. Evaluar con la rúbrica de `../operaciones/manual_operativo.md` (sección c): adhesión 8h, transparencia, residuo, blanqueo, grosor, olor, irritación — descartar cualquier muestra por debajo de 3/5 en adhesión o transparencia.
6. Con el proveedor elegido, pedir Proforma Invoice formal y negociar: Incoterm **FOB** para el pedido piloto, pago **30/70** (30 % al confirmar PO, 70 % contra copia del B/L o tras inspección), y exclusividad del troquel propio por escrito.

### Plantilla de email — español

```
Asunto: RFQ NOCTA — [Nombre del SKU] — solicitud de muestra y cotización

Estimados,

Somos NOCTA Skincare SL, marca española de cosmética que lanza una línea de
parches de hidrocoloide y skincare coreano. Adjuntamos la ficha técnica y el
troquel del producto que queremos fabricar: [nombre SKU], [medidas], grosor
[X mm], [unidades] por envase, [tipo de packaging].

Nos gustaría recibir:
1. Cotización por tramos de cantidad (1.000 / 3.000 / 5.000 / 10.000+ uds.)
2. MOQ mínimo y plazo de producción
3. Certificaciones disponibles (ISO 22716 / ISO 13485)
4. Informe RIPT (test de irritación) a nombre de NOCTA, MSDS y COA del lote
5. Declaración de origen para arancel preferencial UE-Corea en factura
   (Statement on Origin), si aplica
6. Posibilidad de enviar 2-3 unidades de muestra de este troquel (o muestra
   líquida de 30-50 ml) y coste/tiempo estimado de envío a España

Quedamos atentos a su respuesta. Gracias de antemano.

[Nombre] — NOCTA Skincare SL
[email] · [teléfono/WhatsApp]
```

### Plantilla de email — inglés (para proveedores coreanos/chinos)

```
Subject: RFQ NOCTA — [SKU name] — sample & quotation request

Hello,

We are NOCTA Skincare SL, a Spanish cosmetics brand launching a line of
hydrocolloid patches and Korean skincare. Attached is the technical sheet
and dieline of the product we want to manufacture: [SKU name], [dimensions],
thickness [X mm], [units] per pack, [packaging type].

Could you please share:
1. Price breaks by quantity (1,000 / 3,000 / 5,000 / 10,000+ units)
2. Minimum MOQ and production lead time
3. Available certifications (ISO 22716 / ISO 13485)
4. RIPT (repeat insult patch test) report under NOCTA's name, MSDS and
   batch COA
5. Please issue the Statement on Origin for EU-Korea FTA preferential
   tariff (0%) on the commercial invoice, if applicable
6. Availability to send 2-3 sample units of this dieline (or a 30-50 ml
   liquid sample) and estimated cost/time to ship to Spain

Looking forward to your reply.

[Name] — NOCTA Skincare SL
[email] · [phone/WhatsApp]
```

---

## 2. Preparar el troquel y el artwork para imprenta

**Qué archivos enviar** (todos en `../brand/packaging/`):
- `specs.json` — fuente única de medidas y textos legales de cada SKU; enviarlo siempre junto al resto para que la imprenta no invente texto.
- `troquel_*.png` — el dieline con cotas de cada caja (uno por SKU: `troquel_nariz.png`, `troquel_granos.png`, etc.).
- `3d_*_frontal.png` / `3d_*_dorso.png` — render 3D para que la imprenta/proveedor vea el acabado esperado (color, barniz, textos) antes de aprobar prueba de color.
- `etiquetas_todas.png` — hoja de referencia de las etiquetas de los líquidos.

**Pasos**:
1. Confirmar con la consultora de compliance que los textos de `specs.json` (INCI, advertencias, PAO, lote) son los definitivos antes de mandar a imprenta — un cambio después de imprimir obliga a reimprimir todo el lote.
2. Enviar `troquel_*.png` + `3d_*.png` + `specs.json` al proveedor de packaging (Packhelp, Selfpackaging o el converter coreano si incluye el estuche).
3. Pedir prueba de color física sobre el cartón real (no solo PDF en pantalla) antes de aprobar la tirada completa.
4. Para el troquel del parche en sí (no la caja): enviarlo al fabricante del hidrocoloide junto con la RFQ (paso 1) — es el mismo archivo que define la forma de "nariz mariposa", barbilla, frente, etc.
5. Convertir tipografía Inter a trazados antes de enviar cualquier archivo vectorial a imprenta (evita que la imprenta sustituya la fuente).

---

## 3. Notificar en CPNP

**Requisito previo**: PIF y CPSR del SKU cerrados y firmados por el evaluador de seguridad de la consultora — sin esto no se puede notificar.

**Pasos**:
1. Acceder al portal CPNP (Cosmetic Products Notification Portal) de la Comisión Europea con la cuenta de la Persona Responsable (NOCTA SL).
2. Crear una notificación por cada SKU con: nombre del producto, categoría (parche cosmético / exfoliante / sérum, etc.), Persona Responsable y su dirección, país de fabricación, presencia de nanomateriales (no aplica a NOCTA), fórmula marco (aportada por la consultora a partir del CPSR).
3. Adjuntar la etiqueta final (la de `specs.json`, revisada legalmente).
4. Confirmar el envío — la notificación es inmediata y gratuita, pero **no se puede hacer antes de tener el PIF/CPSR**, así que hay que planificarla en la semana en que ese expediente esté cerrado (normalmente la consultora la presenta directamente como parte del servicio contratado).
5. Repetir para cada uno de los SKU antes de su primera venta — no se puede vender ni un solo SKU sin su notificación CPNP propia.

---

## 4. Desplegar la web en Netlify y configurar Stripe/Klaviyo

Pasos exactos en `../README.md` (sección "Cómo desplegar la web"):

1. `cd nocta/web && npm install` (única dependencia: `@netlify/blobs`).
2. En Netlify: "Add new site → Import" apuntando a este repositorio, base directory `nocta/web`, publish `public`, functions `netlify/functions` (ya configurado en `netlify.toml`).
3. Configurar las variables de entorno en Netlify:
   - `ADMIN_TOKEN` — contraseña del panel `/admin/` (**obligatoria**, elegir una contraseña fuerte).
   - `STRIPE_SECRET_KEY` — clave secreta de Stripe (modo live cuando se lance de verdad; sin ella el checkout funciona en modo demo y crea el pedido igualmente, útil para probar antes de tener cuenta Stripe activa).
   - `STRIPE_WEBHOOK_SECRET` — necesaria para que el webhook marque los pedidos como pagados (configurar el endpoint del webhook en el dashboard de Stripe apuntando a la función `/api/order`).
   - `KLAVIYO_API_KEY` y `KLAVIYO_LIST_ID` — opcionales; si faltan, los leads quedan guardados en Netlify Blobs en vez de sincronizarse con Klaviyo.
   - `SITE_URL` — p. ej. `https://nocta.es`.
4. Poner los IDs de píxel de Meta/TikTok/GA4 en las constantes al principio de `public/assets/js/app.js`. El tracking propio (`/api/track`, que alimenta el panel `/admin`) funciona igualmente sin ellos.
5. Configurar el dominio `nocta.es` (comprobar disponibilidad primero) o `nocta.skin` como alternativa, apuntando los DNS al sitio de Netlify.
6. Hacer un pedido de prueba completo (producto → carrito → checkout → Stripe test mode → confirmación) antes de abrir al público.

**Panel `/admin/`**: accesible con `ADMIN_TOKEN`. Muestra sesiones, rebote, embudo completo (visita → producto → carrito → checkout → compra), carritos abandonados, fuentes/UTM, landing y páginas de salida, países, dispositivos, scroll, ventas por producto y pedidos recientes. **Se filtra por `utm_content` = número de anuncio de la matriz** para saber qué creatividad concreta está convirtiendo — ver paso 6 de esta guía.

---

## 5. Montar un anuncio con la máquina

Flujo completo en `../maquina/README.md`. Resumen operativo (~45 min, 150-250 créditos):

1. Elegir una plantilla en `../maquina/plantillas/` (o copiar una y cambiar el gancho/creadora) — cada plantilla ya trae la estructura de planos, el guion en español y el gesto de referencia por plano.
2. Para cada plano de producto (aplicar/llevar/despegar/revelar): generar vídeo con Seedance 2.5 en modo `omni_reference`, usando como `video_references` el clip de gesto correspondiente en `../maquina/gestos/` y como `image_references` la imagen de la creadora (`../brand/personas/*_soul.png`) + la foto patrón de colocación correcta (`../brand/personas/creadora_02_parche_puesto_v1.png`) + el packshot si sale la caja. Prompt: instrucción de copiar el movimiento exacto del clip de referencia + bloque CREADORA + bloque PRODUCTO + bloque de gesto (de `../maquina/prompts/bloques.md`). 4-6 s, 9:16, 720p, sin audio del modelo.
3. Para los planos de cara hablando al inicio/cierre: generar sin clip de referencia, o reutilizar planos ya aprobados.
4. Hacer QA por hoja de fotogramas: rechazar cualquier plano donde el parche no cumpla `../producto/fisica_del_parche.md` (parche reducido a un "puntito", forma de tira en vez de mariposa, opaco al colocarlo, no se estira, o la persona cambia de un plano a otro).
5. Generar la locución con Seed Audio (voz Marisol para VO femenina, Julian para VO masculina solo en frases cortas), verificar automáticamente con faster-whisper.
6. Montar con `../brand/video/edit/montar_anuncio.py plan.json salida.mp4` — concatena planos, coloca la voz, quema subtítulos y añade el cierre con packshot (coste: 0 créditos).
7. Registrar el resultado en `../brand/qa/control_calidad_imagenes.md` y anotar el número de anuncio correspondiente en `../marketing/matriz_100_anuncios.md`.
8. **Regla de oro**: nunca generar 10 anuncios de golpe sin medir — producir 1, publicarlo con UTM, medir en `/admin`, y solo entonces decidir si se produce el resto de la tanda.

---

## 6. Lanzar campañas en Meta y TikTok

Estructura completa en `../marketing/estrategia_marketing.md`, secciones 6 y 9.

### Meta — estructura de campañas
1. **Campaña 1, "NOCTA · Ventas ASC+ Broad ES"** (60-65 % del presupuesto): un único ad set amplio, España, 18-65 años, sin segmentación por interés, con 20-30 anuncios activos simultáneos, optimizado a Compra, atribución 7 días clic / 1 día vista, CAPI + píxel activos (EMQ ≥ 8).
2. **Campaña 2, "NOCTA · Prospección por Avatar"** (20-25 %): 3 ad sets ABO, uno por avatar (Bea/Marisol/Álex), 3-5 anuncios propios por ad set, 30-50 €/día, ventana de test de 3-5 días. Los ganadores se duplican dentro de la Campaña 1 (nunca se mueve el original de sitio).
3. **Campaña 3, "NOCTA · Retargeting Catálogo"** (10-15 %): Advantage+ Catalog con overlay de reseñas, dirigido a visitantes de 30 días + carritos abandonados + compradores de 180 días (excluyendo compradores de los últimos 30 días).
4. Reglas operativas: formatos 9:16 prioritario + 4:5 + 1:1, mínimo 10-15 creatividades nuevas al mes, escalar presupuesto ≤ 20 % cada 3-4 días (nunca doblar de golpe), matar anuncios sin tracción en la primera semana, refrescar ganadores cada 2-3 semanas.

### TikTok
1. Empezar con **Smart+** (objetivo compra, "Lowest Cost"), 10-20 creatividades activas, presupuesto diario ≥ 20x el CPA objetivo para salir rápido de aprendizaje.
2. Activar **Spark Ads** sobre el contenido propio y el de las creadoras con código de autorización.
3. A partir del mes 3, si TikTok Shop España está activo, sincronizar el catálogo de 8-10 SKU desde la web y activar GMV Max con el 80 % del presupuesto de TikTok.

### UTM y lectura del panel `/admin`
- Convención obligatoria: **`utm_content` = número del anuncio en `../marketing/matriz_100_anuncios.md`** (1 al 100). Así cada creatividad es identificable de forma única en el panel, incluso si se repite el mismo gancho en distintos formatos.
- En `/admin`, filtrar el embudo (visita → producto → carrito → checkout → compra) por ese `utm_content` para ver, anuncio a anuncio: CTR real hasta la web, tasa de conversión de PDP a carrito, tasa de abandono de checkout y ventas por producto.
- Regla de decisión: duplicar dentro de la Campaña 1 (Meta) o subir presupuesto (TikTok) solo los anuncios con **CTR > 1,5 % y CPA < 12 €** medidos en `/admin`, no solo en el gestor de anuncios de la plataforma (el gestor de la plataforma sobreestima el CPA real cuando hay descuentos por cupón o AOV variable).

---

## 7. Gestionar pedidos y devoluciones con el 3PL

**Fase 1 — fulfillment casero (0-500 pedidos/mes)**:
1. Configurar Sendcloud (plan Free/Lite) o Packlink PRO, integrarlo con la web para imprimir etiquetas automáticamente al confirmarse el pago.
2. Empaquetar en la caja de envío (mailer) definida en `../producto/fichas_desarrollo_producto.md` con el papel de seda y la tarjeta de agradecimiento.
3. Enviar con Correos/Correos Express/GLS a través de las tarifas negociadas de Sendcloud/Packlink (24-48 h a Portugal, 48-72 h a Francia/Italia/Alemania).

**Devoluciones**:
1. Producto sin abrir dentro de 14 días: procesar como desistimiento legal — reembolso íntegro, gastos de envío de vuelta a cargo del cliente salvo que se decida asumirlos como ventaja competitiva.
2. Reclamación de garantía de 60 días o de Garantía de Adhesión: pedir formulario con fotos antes/después (evita devolución física del producto usado); si se aprueba, reembolso o reposición sin esperar a recibir el envase de vuelta.
3. Registrar cada devolución/incidencia en el helpdesk (Gorgias) con el número de lote del producto — permite detectar si un lote concreto está dando problemas de calidad.

**Fase 2 — paso a 3PL (a partir de ~500-600 pedidos/mes)**:
1. Solicitar cotización en paralelo a Byrd, Logisfashion y Cubyn usando el guion de llamada de `../operaciones/manual_operativo.md` (sección l).
2. Comparar: coste por pedido, cobertura para PT/FR/IT/DE desde un único almacén, SLA de picking (mismo día o 24 h) y gestión de devoluciones incluida.
3. Exigir en el contrato un SLA de procesamiento de devoluciones de 48-72 h desde la llegada al almacén.

---

## 8. Qué medir cada semana

Cadencia de `../marketing/estrategia_marketing.md`, sección 13, aplicada con los datos del panel `/admin` y de Stripe/Klaviyo:

- **Gasto y CPA por canal y por anuncio** (`utm_content`) — comparar contra el objetivo de la semana en curso (ver tabla de KPIs de `../negocio/plan_de_negocio.md`, sección 12).
- **CTR saliente y hook rate** de cada creatividad activa — matar la que no supere 0,8 % de CTR en la primera semana.
- **CVR de la PDP** (visita a producto → compra) por `/admin` — si cae por debajo de 2 %, revisar precio, oferta o velocidad de carga antes de subir presupuesto.
- **AOV real** frente al objetivo de 38-48 € — si está por debajo, reforzar los umbrales de regalo (30/50/80 €) y el upsell post-compra.
- **Stock disponible por SKU** — evitar rotura de stock, especialmente del héroe (parches de nariz).
- **Carritos abandonados y su recuperación por Klaviyo** — porcentaje de recuperación objetivo, ajustar el flow si es bajo.
- **Tasa de opt-in a suscripción** sobre pedidos nuevos, comparada contra el supuesto del 15 % del plan financiero — ajustar `Supuestos!suscripcion` en `../finanzas/modelo_financiero_nocta.xlsx` con el dato real.
- **Devoluciones y reclamaciones de garantía**, por SKU y por lote — detectar patrones de calidad temprano.
- **Caja disponible frente al valle proyectado** (−9.904 € en el mes 4 del escenario Base) — revisar semanalmente que el ritmo de gasto en Ads y reposición de stock no compromete la tesorería.
