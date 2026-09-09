# NOCTA — Modelo bootstrap: proyección exacta desde el embudo de anuncios, umbrales mínimos y comprobación matemática

**Versión 1.0 · 9 de septiembre de 2026.** Este modelo sustituye a la proyección aproximada del plan. Está construido de abajo arriba: cada euro de anuncios se convierte en impresiones (CPM), clics (CTR), visitas a la ficha (85 % de los clics cargan la página), pedidos (CVR), y cada pedido en una mezcla de ofertas con su precio, su coste de producto, su envío, su Stripe, sus devoluciones y su IVA. De ahí salen ingresos, contribución, resultado, IVA a ingresar, reposición de stock y caja, mes a mes, en tres escenarios. Todas las fórmulas están en la sección 7 y el mismo modelo está en `finanzas/modelo_bootstrap_nocta.xlsx` con fórmulas vivas para que lo audites cambiando cualquier celda azul. Sección 8: las comprobaciones que se han hecho y el resultado.

> Lo que este modelo **no** es: una promesa. Es la consecuencia aritmética de unos supuestos declarados (CPM, CTR, CVR, mix de ofertas). Si los supuestos cambian, cambia el resultado. Lo importante no es la cifra del mes 12; es la sección 4 (umbrales): qué CVR necesitas para que cada euro de anuncios no pierda dinero, y a partir de qué ventas mensuales el negocio cubre todo lo que gasta.

## Índice

1. Supuestos, uno a uno, con su origen
2. Economía exacta de cada pedido y del pedido medio
3. Embudo de anuncios: de euros a pedidos
4. Umbrales mínimos: CVR mínima, ventas mínimas y ROAS mínimo
5. Proyección a 12 meses en tres escenarios (ingresos, costes, resultado, IVA, stock, caja)
6. Sensibilidad: qué pasa si el CPC o la CVR se mueven
7. Fórmulas del modelo
8. Comprobación matemática (qué se ha verificado y cómo)

## 1. Supuestos, uno a uno, con su origen

| Supuesto | Valor | Origen | Cómo afecta |
|---|---|---|---|
| IVA | 21 % | Ley 37/1992 | Se cobra al cliente y se ingresa a Hacienda cada trimestre; no es ingreso |
| Stripe (tarjeta UE, Apple Pay) | 1,5 % + 0,25 € por cobro | Tarifa estándar Stripe España | Coste variable por pedido |
| Envío al cliente (etiqueta) | 3,90 € con IVA = 3,22 € netos por pedido | Packlink PRO, sobre < 1 kg Península (Estudio §7) | Coste por pedido; el cliente paga 3,90 € si el pedido es < 30 € |
| Sobre acolchado + tarjeta | 0,35 € con IVA = 0,29 € netos | Estudio §7 | Coste por pedido |
| Devoluciones y reembolsos | 2 % del neto | Estimación (el sector: 2–3 %) | Coste por pedido |
| Coste de producto, caja de Nariz | 2,90 € netos (piloto, variante A; 3,4 € con el IVA de importación, que se recupera) | Estudio §9 | El más sensible tras el CPA; baja a 2,07 € en la reposición con caja impresa |
| Coste de producto, caja de Granos | 1,60 € netos (1,20 € en la reposición) | Estudio §9 |  |
| Mix de ofertas (qué compra la gente) | 2 cajas 45 % · Dúo 20 % · 1 caja 20 % · 3 cajas 10 % · Mes completo 5 % | Supuesto de diseño: la ficha preselecciona el pack de 2 | Determina el ticket medio y la contribución media |
| Clics que cargan la ficha | 85 % | Estándar (rebote técnico, cierres antes de cargar) | Reduce las visitas útiles |
| CPM Meta España | Pesimista 9 € · Base 8 € · Optimista 7,5 € | Vue trabaja con 6–9 €; cuenta nueva paga más | Coste por 1.000 impresiones |
| CTR saliente | 0,8 % · 1,0 % · 1,5 % | Vue: 1,2 % de media con creatividades maduras | Con el CPM, fija el coste por clic |
| CVR de la ficha (compras / visitas) | Rampa: Pesimista 1,2 → 2,0 % · Base 1,8 → 3,3 % · Optimista 2,2 → 4,5 % (mes 0 → mes 5) | Vue convierte al 4–7 % en su ficha con anuncios que ya han vendido antes del clic; una ficha nueva empieza por debajo | La variable que más pesa |
| Recompra a 60 días (sin suscripción) | 8 % · 12 % · 18 % de los pedidos pagados de hace 2 meses | Conservador frente al 30 %/90 d del modelo grande | Pedidos que no cuestan anuncios |
| Popup: leads y conversión | 4–6 % de visitas dejan email; 2–4 % de ellos compran | Estándar DTC en el primer mes | Pedidos que no cuestan anuncios |
| Costes fijos | 1 €/mes (dominio). Netlify, Supabase, Resend, WhatsApp y Packlink en capa gratuita | Stack actual | Prácticamente cero: el negocio solo paga lo que vende |
| Presupuesto de anuncios | 225 € el mes 0; después 50 % de la contribución del mes anterior + 500 € de aportación mientras el resultado del mes no llegue a 500 €; nunca se baja el presupuesto que funciona; techo 1.200 €/mes (meses 1–5) y 1.500 € (6–12); nunca más de lo que hay en caja | Regla del plan (Parte 1, §1 y §8) | Determina la escala |
| Regla de parada | Si en el mes 3 el CPA sigue por encima de la contribución por pedido, se dejan de comprar anuncios y de aportar dinero desde el mes 4 (se vende el stock que queda por email/orgánico, que el modelo no cuenta) | Regla del plan (Parte 1, §1) | Limita la pérdida máxima del test |
| Stock inicial | 125 cajas de nariz + 40 de granos (600 €, ya pagados con los 1.000 €) | Estudio §9, variante A | Se repone cuando quedan < 60 cajas, mínimo 1.000 parches, a ≈ 2,1 €/caja con caja impresa |
| Caja inicial | 400 € (1.000 € − 600 € del piloto) | Parte 1 §4 | Los anuncios del mes 0 (225 €) salen de aquí |
| IVA | Se ingresa trimestralmente (meses 3, 6, 9, 12): IVA repercutido de las ventas menos IVA soportado de reposiciones y etiquetas | Régimen general | Salida de caja real que muchos planes olvidan |

## 2. Economía exacta de cada pedido y del pedido medio

Precio con IVA; el cliente paga 3,90 € de envío si el pedido es menor de 30 €. Neto = cobrado / 1,21. Contribución = neto − producto (neto) − Stripe − etiqueta 3,22 − sobre 0,29 − devoluciones 2 % del neto. Todo neto de IVA: el IVA cobrado se ingresa a Hacienda y el IVA pagado en compras se recupera.

| Oferta | Mix | Cobrado (IVA incl.) | Neto | IVA | Producto | Stripe | Envío + sobre | Devol. | **Contribución** | % s/neto |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 caja Nariz + envío 3,90 € | 20,0 % | 20,85 | 17,23 | 3,62 | 2,90 | 0,56 | 3,51 | 0,34 | **9,91 €** | 57,5 % |
| Dúo Noche (Nariz + Granos) | 20,0 % | 30,80 | 25,45 | 5,35 | 4,50 | 0,71 | 3,51 | 0,51 | **16,22 €** | 63,7 % |
| 2 cajas Nariz | 45,0 % | 33,80 | 27,93 | 5,87 | 5,80 | 0,76 | 3,51 | 0,56 | **17,31 €** | 62,0 % |
| 3 cajas Nariz | 10,0 % | 39,90 | 32,98 | 6,92 | 8,70 | 0,85 | 3,51 | 0,66 | **19,25 €** | 58,4 % |
| Mes completo (2 Nariz + 1 Granos) | 5,0 % | 42,90 | 35,45 | 7,45 | 7,40 | 0,89 | 3,51 | 0,71 | **22,94 €** | 64,7 % |
| **Pedido medio (ponderado por el mix)** | 100 % | **31,68** | 26,18 | 5,50 | 5,33 | 0,73 | 3,51 | 0,52 | **16,09 €** | 61,5 % |

Lectura: el pedido medio cobra **31,68 €** (de los que 5,50 € son IVA que se devuelve a Hacienda), deja **16,09 €** antes de anuncios y consume 1,70 cajas de nariz y 0,25 de granos. **Cada pedido pagado con anuncios es rentable si su CPA es menor de 16,09 €**; con la regla de margen de seguridad del 30 %, el CPA objetivo es 11,26 €.

## 3. Embudo de anuncios: de euros a pedidos

Con 100 € de anuncios, en cada escenario:

| Escenario | CPM | CTR | CPC | Impresiones | Clics | Visitas (85 %) | CVR mes 0 | Pedidos mes 0 | CPA mes 0 | CVR mes 5+ | Pedidos mes 5+ | CPA mes 5+ |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Pesimista | 9,00 € | 0,8 % | 1,12 € | 11.111 | 89 | 76 | 1,2 % | 0,91 | 110,29 € | 2,0 % | 1,51 | 66,18 € |
| Base | 8,00 € | 1,0 % | 0,80 € | 12.500 | 125 | 106 | 1,8 % | 1,91 | 52,29 € | 3,3 % | 3,51 | 28,52 € |
| Optimista | 7,50 € | 1,5 % | 0,50 € | 13.333 | 200 | 170 | 2,2 % | 3,74 | 26,74 € | 4,5 % | 7,65 | 13,07 € |

Identidad que hay que tener en la cabeza: **CPA = CPC ÷ (0,85 × CVR)**. Con CPC 0,80 € y CVR 3,3 % el CPA es 28,52 €; con CVR 1,8 %, 52,29 €. La contribución media es 16,09 €: por eso en el escenario base ni el mes 0 ni el mes 3 cubren la contribución, y solo el optimista lo consigue.

## 4. Umbrales mínimos: CVR mínima, ventas mínimas y ROAS mínimo

### 4.1 CVR mínima por CPC (para que un pedido pagado no pierda dinero)

CVR mínima = CPC ÷ (0,85 × contribución). Con la contribución del pedido medio (16,09 €):

| CTR \ CPM | 6 € | 7,5 € | 8 € | 9 € | 12 € |
|---|---:|---:|---:|---:|---:|
| 0,6 % | 7,31 % (CPC 1,00) | 9,14 % (CPC 1,25) | 9,75 % (CPC 1,33) | 10,97 % (CPC 1,50) | 14,63 % (CPC 2,00) |
| 0,8 % | 5,49 % (CPC 0,75) | 6,86 % (CPC 0,94) | 7,31 % (CPC 1,00) | 8,23 % (CPC 1,12) | 10,97 % (CPC 1,50) |
| 1,0 % | 4,39 % (CPC 0,60) | 5,49 % (CPC 0,75) | 5,85 % (CPC 0,80) | 6,58 % (CPC 0,90) | 8,78 % (CPC 1,20) |
| 1,5 % | 2,93 % (CPC 0,40) | 3,66 % (CPC 0,50) | 3,90 % (CPC 0,53) | 4,39 % (CPC 0,60) | 5,85 % (CPC 0,80) |
| 2,0 % | 2,19 % (CPC 0,30) | 2,74 % (CPC 0,38) | 2,93 % (CPC 0,40) | 3,29 % (CPC 0,45) | 4,39 % (CPC 0,60) |

Y por oferta, con CPC 0,80 € (base): lo que tiene que convertir la ficha según a qué lleve el anuncio:

| Oferta | Contribución | CPA máximo | CVR mínima (CPC 0,80) | CVR objetivo (30 % de margen) |
|---|---:|---:|---:|---:|
| 1 caja Nariz + envío 3,90 € | 9,91 € | 9,91 € | 9,50 % | 13,57 % |
| Dúo Noche (Nariz + Granos) | 16,22 € | 16,22 € | 5,80 % | 8,29 % |
| 2 cajas Nariz | 17,31 € | 17,31 € | 5,44 % | 7,77 % |
| 3 cajas Nariz | 19,25 € | 19,25 € | 4,89 % | 6,98 % |
| Mes completo (2 Nariz + 1 Granos) | 22,94 € | 22,94 € | 4,10 % | 5,86 % |
| **Pedido medio** | 16,09 € | 16,09 € | **5,85 %** | **8,36 %** |

### 4.3 El umbral en una sola cifra: compras por 1.000 impresiones

Como CPA = CPM ÷ (compras por 1.000 impresiones), un anuncio es rentable cuando **compras por 1.000 impresiones ≥ CPM ÷ contribución**. Con CPM 8 € y contribución 16,09 €: **≥ 0,50 compras por cada 1.000 impresiones** (0,7 con CPM 12 € en Navidad; 0,37 con CPM 6 €). Compras por 1.000 impresiones = 1.000 × CTR × 0,85 × CVR. Estas son las combinaciones que lo cumplen con CPM 8 €:

| CTR \ CVR | 2 % | 3 % | 4 % | 5 % | 6 % | 7 % |
|---|---:|---:|---:|---:|---:|---:|
| 0,6 % | 0,10 → CPA 78,43 € ✘ | 0,15 → CPA 52,29 € ✘ | 0,20 → CPA 39,22 € ✘ | 0,26 → CPA 31,37 € ✘ | 0,31 → CPA 26,14 € ✘ | 0,36 → CPA 22,41 € ✘ |
| 0,8 % | 0,14 → CPA 58,82 € ✘ | 0,20 → CPA 39,22 € ✘ | 0,27 → CPA 29,41 € ✘ | 0,34 → CPA 23,53 € ✘ | 0,41 → CPA 19,61 € ✘ | 0,48 → CPA 16,81 € ✘ |
| 1,0 % | 0,17 → CPA 47,06 € ✘ | 0,26 → CPA 31,37 € ✘ | 0,34 → CPA 23,53 € ✘ | 0,43 → CPA 18,82 € ✘ | 0,51 → CPA 15,69 € ✔ | 0,60 → CPA 13,45 € ✔ |
| 1,2 % | 0,20 → CPA 39,22 € ✘ | 0,31 → CPA 26,14 € ✘ | 0,41 → CPA 19,61 € ✘ | 0,51 → CPA 15,69 € ✔ | 0,61 → CPA 13,07 € ✔ | 0,71 → CPA 11,20 € ✔ |
| 1,5 % | 0,26 → CPA 31,37 € ✘ | 0,38 → CPA 20,92 € ✘ | 0,51 → CPA 15,69 € ✔ | 0,64 → CPA 12,55 € ✔ | 0,77 → CPA 10,46 € ✔ | 0,89 → CPA 8,96 € ✔ |
| 2,0 % | 0,34 → CPA 23,53 € ✘ | 0,51 → CPA 15,69 € ✔ | 0,68 → CPA 11,76 € ✔ | 0,85 → CPA 9,41 € ✔ | 1,02 → CPA 7,84 € ✔ | 1,19 → CPA 6,72 € ✔ |
| 3,0 % | 0,51 → CPA 15,69 € ✔ | 0,77 → CPA 10,46 € ✔ | 1,02 → CPA 7,84 € ✔ | 1,28 → CPA 6,27 € ✔ | 1,53 → CPA 5,23 € ✔ | 1,79 → CPA 4,48 € ✔ |

Lectura: con CTR 1 % (cuenta nueva) hace falta una ficha que convierta al **6 %**; con CTR 1,5 % basta el 4 %; con CTR 2 % el 3 %. Vue está en CTR 1,2–2 % y CVR 4–7 %. **Ese es el listón: el negocio solo es rentable con anuncios al nivel de Vue.** Por eso el 90 % del esfuerzo va a creatividades (CTR) y a la ficha (CVR), y por eso el test de 90 días sirve para una sola pregunta: ¿llegamos a 0,5 compras por 1.000 impresiones?

### 4.2 Ventas mínimas por mes según lo que gastes en anuncios

Para que un mes no pierda dinero: contribución ≥ anuncios + fijos. Como cada pedido deja 16,09 € y cobra 31,68 €, la contribución es el 50,8 % de lo cobrado. Ventas mínimas = (anuncios + fijos) ÷ 0,51. Aquí no cuentan los pedidos de recompra ni de email (que existen y ayudan): es el umbral duro solo con pedidos pagados.

| Anuncios/mes | Ventas mínimas (cobrado) | Pedidos mínimos | ROAS mínimo (cobrado/anuncios) | CPA máximo | Con CPC 0,80 €: CVR mínima |
|---:|---:|---:|---:|---:|---:|
| 225 € | 445,00 € | 14,05 | 1,98x | 16,02 € | 5,88 % |
| 500 € | 986,48 € | 31,14 | 1,97x | 16,05 € | 5,86 % |
| 800 € | 1.577,19 € | 49,79 | 1,97x | 16,07 € | 5,86 % |
| 1000 € | 1.971,00 € | 62,23 | 1,97x | 16,07 € | 5,86 % |
| 1200 € | 2.364,80 € | 74,66 | 1,97x | 16,07 € | 5,86 % |
| 1500 € | 2.955,51 € | 93,31 | 1,97x | 16,08 € | 5,85 % |

Lectura: el ROAS mínimo es siempre ≈ 1,97x sobre lo cobrado (con IVA) porque los fijos son casi cero. Cualquier anuncio con ROAS de plataforma por debajo de 1,97x pierde dinero aunque «venda».

## 5. Proyección a 12 meses en tres escenarios

Cada fila es un mes. Pedidos = pagados (anuncios) + recompra + email. Resultado = contribución − anuncios − fijos (antes de tu tiempo y de la legalización). Caja = lo que hay en el banco al final del mes, después de ads, reposiciones, IVA trimestral y aportaciones.

### 5.1 Escenario Pesimista (CPM 9,00 €, CTR 0,8 %, CPC 1,12 €, CVR 1,2 % → 2,0 %)

**Embudo y resultado**

| Mes | Anuncios | Impr. | Clics | CVR | Ped. pagados | Recompra + email | Pedidos | CPA | ROAS | Cobrado | Neto | Contribución | Resultado |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 225 | 25.000 | 200 | 1,2 % | 2,04 | 0,14 | 2,18 | 110,29 | 0,29x | 69 | 57 | 35 | **-191** |
| 1 | 518 | 57.500 | 460 | 1,4 % | 5,47 | 0,31 | 5,79 | 94,54 | 0,34x | 183 | 151 | 93 | **-425** |
| 2 | 547 | 60.727 | 486 | 1,6 % | 6,61 | 0,49 | 7,10 | 82,72 | 0,38x | 225 | 186 | 114 | **-433** |
| 3 | 557 | 61.901 | 495 | 1,8 % | 7,58 | 0,77 | 8,35 | 73,53 | 0,43x | 265 | 219 | 134 | **-424** |
| 4 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,53 | 0,53 | — | 0,00x | 17 | 14 | 9 | **8** |
| 5 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,61 | 0,61 | — | 0,00x | 19 | 16 | 10 | **9** |
| 6 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 7 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 8 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 9 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 10 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 11 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 12 | 0 | 0 | 0 | 2,0 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| **Total** | **1.846** | | | | 21,70 | | **24,55** | 85,08 | 0,37x | **778** | 643 | 395 | **-1.464** |

**Costes, IVA, stock y caja**

| Mes | Producto | Envío + sobre | Stripe + devol. | IVA repercutido | IVA soportado | IVA trimestre (pagado) | Reposición (neto) | Aportación | Caja fin de mes | Stock nariz (cajas) | Stock granos (cajas) |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 12 | 8 | 3 | 12 | 2 | 0 | 0 | 1.000 | **231** | 121 | 39 |
| 1 | 31 | 20 | 7 | 32 | 4 | 0 | 0 | 500 | **364** | 111 | 38 |
| 2 | 38 | 25 | 9 | 39 | 5 | 0 | 0 | 500 | **502** | 99 | 36 |
| 3 | 45 | 29 | 10 | 46 | 6 | 72 | 0 | 500 | **591** | 85 | 34 |
| 4 | 3 | 2 | 1 | 3 | 0 | 0 | 0 | 0 | **604** | 84 | 34 |
| 5 | 3 | 2 | 1 | 3 | 0 | 0 | 0 | 0 | **619** | 83 | 34 |
| 6 | 0 | 0 | 0 | 0 | 0 | 45 | 0 | 0 | **573** | 83 | 34 |
| 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **572** | 83 | 34 |
| 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **571** | 83 | 34 |
| 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **570** | 83 | 34 |
| 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **569** | 83 | 34 |
| 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **568** | 83 | 34 |
| 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **567** | 83 | 34 |
| **Total** | 131 | 86 | 31 | 135 | 18 | 117 | 0 | **2.500** | | | |

Lectura del escenario Pesimista: 25 pedidos y 778 € cobrados en 13 meses con 1.846 € de anuncios; resultado acumulado -1.464 € con 2.500 € aportados en total. En el último mes con anuncios (mes 3): 8,35 pedidos, 265 € cobrados, CPA 73,53 € frente a 16,09 € de contribución, y -424 € de resultado. Caja final 567 €.

### 5.2 Escenario Base (CPM 8,00 €, CTR 1,0 %, CPC 0,80 €, CVR 1,8 % → 3,3 %)

**Embudo y resultado**

| Mes | Anuncios | Impr. | Clics | CVR | Ped. pagados | Recompra + email | Pedidos | CPA | ROAS | Cobrado | Neto | Contribución | Resultado |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 225 | 28.125 | 281 | 1,8 % | 4,30 | 0,36 | 4,66 | 52,29 | 0,61x | 148 | 122 | 75 | **-151** |
| 1 | 537 | 67.187 | 672 | 2,2 % | 12,56 | 0,86 | 13,42 | 42,78 | 0,74x | 425 | 351 | 216 | **-323** |
| 2 | 608 | 75.993 | 760 | 2,6 % | 16,79 | 1,49 | 18,28 | 36,20 | 0,88x | 579 | 479 | 294 | **-315** |
| 3 | 647 | 80.879 | 809 | 3,0 % | 20,62 | 2,54 | 23,16 | 31,37 | 1,01x | 734 | 606 | 394 | **-254** |
| 4 | 0 | 0 | 0 | 3,2 % | 0,00 | 2,02 | 2,02 | — | 0,00x | 64 | 53 | 34 | **33** |
| 5 | 0 | 0 | 0 | 3,3 % | 0,00 | 2,47 | 2,47 | — | 0,00x | 78 | 65 | 42 | **41** |
| 6 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 7 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 8 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 9 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 10 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 11 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| 12 | 0 | 0 | 0 | 3,3 % | 0,00 | 0,00 | 0,00 | — | 0,00x | 0 | 0 | 0 | **-1** |
| **Total** | **2.017** | | | | 54,29 | | **64,02** | 37,16 | 0,85x | **2.028** | 1.676 | 1.056 | **-975** |

**Costes, IVA, stock y caja**

| Mes | Producto | Envío + sobre | Stripe + devol. | IVA repercutido | IVA soportado | IVA trimestre (pagado) | Reposición (neto) | Aportación | Caja fin de mes | Stock nariz (cajas) | Stock granos (cajas) |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 25 | 16 | 6 | 26 | 3 | 0 | 0 | 1.000 | **296** | 117 | 39 |
| 1 | 72 | 47 | 17 | 74 | 10 | 0 | 0 | 500 | **609** | 94 | 35 |
| 2 | 97 | 64 | 23 | 100 | 13 | 0 | 0 | 500 | **978** | 63 | 31 |
| 3 | 102 | 81 | 29 | 127 | 71 | 173 | 259 | 500 | **951** | 149 | 25 |
| 4 | 9 | 7 | 3 | 11 | 1 | 0 | 0 | 0 | **1.002** | 145 | 25 |
| 5 | 11 | 9 | 3 | 14 | 2 | 0 | 0 | 0 | **1.066** | 141 | 24 |
| 6 | 0 | 0 | 0 | 0 | 0 | 77 | 0 | 0 | **988** | 141 | 24 |
| 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **987** | 141 | 24 |
| 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **986** | 141 | 24 |
| 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **985** | 141 | 24 |
| 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **984** | 141 | 24 |
| 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **983** | 141 | 24 |
| 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **982** | 141 | 24 |
| **Total** | 315 | 225 | 80 | 352 | 102 | 250 | 259 | **2.500** | | | |

Lectura del escenario Base: 64 pedidos y 2.028 € cobrados en 13 meses con 2.017 € de anuncios; resultado acumulado -975 € con 2.500 € aportados en total. En el último mes con anuncios (mes 3): 23,16 pedidos, 734 € cobrados, CPA 31,37 € frente a 16,09 € de contribución, y -254 € de resultado. Caja final 982 €.

### 5.3 Escenario Optimista (CPM 7,50 €, CTR 1,5 %, CPC 0,50 €, CVR 2,2 % → 4,5 %)

**Embudo y resultado**

| Mes | Anuncios | Impr. | Clics | CVR | Ped. pagados | Recompra + email | Pedidos | CPA | ROAS | Cobrado | Neto | Contribución | Resultado |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 225 | 30.000 | 450 | 2,2 % | 8,41 | 0,92 | 9,33 | 26,74 | 1,18x | 296 | 244 | 150 | **-76** |
| 1 | 575 | 76.676 | 1.150 | 2,8 % | 27,37 | 2,35 | 29,72 | 21,01 | 1,51x | 941 | 778 | 507 | **-69** |
| 2 | 754 | 100.485 | 1.507 | 3,4 % | 43,56 | 4,59 | 48,15 | 17,30 | 1,83x | 1.525 | 1.260 | 825 | **70** |
| 3 | 912 | 121.640 | 1.825 | 4,0 % | 62,04 | 8,65 | 70,69 | 14,71 | 2,15x | 2.239 | 1.850 | 1.211 | **297** |
| 4 | 1.105 | 147.370 | 2.211 | 4,4 % | 82,67 | 12,35 | 95,03 | 13,37 | 2,37x | 3.010 | 2.488 | 1.663 | **557** |
| 5 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 15,68 | 100,23 | 13,07 | 2,42x | 3.175 | 2.624 | 1.755 | **648** |
| 6 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,39 | 103,94 | 13,07 | 2,42x | 3.292 | 2.721 | 1.820 | **713** |
| 7 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.833 | **727** |
| 8 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.833 | **727** |
| 9 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.834 | **727** |
| 10 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.835 | **729** |
| 11 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.835 | **729** |
| 12 | 1.105 | 147.370 | 2.211 | 4,5 % | 84,55 | 19,73 | 104,28 | 13,07 | 2,42x | 3.303 | 2.730 | 1.835 | **729** |
| **Total** | **12.413** | | | | 900,49 | | **1.082,78** | 13,79 | 2,30x | **34.297** | 28.345 | 18.935 | **6.508** |

**Costes, IVA, stock y caja**

| Mes | Producto | Envío + sobre | Stripe + devol. | IVA repercutido | IVA soportado | IVA trimestre (pagado) | Reposición (neto) | Aportación | Caja fin de mes | Stock nariz (cajas) | Stock granos (cajas) |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 50 | 33 | 12 | 51 | 7 | 0 | 0 | 1.000 | **418** | 109 | 38 |
| 1 | 129 | 104 | 37 | 163 | 131 | 0 | 518 | 500 | **494** | 309 | 30 |
| 2 | 207 | 169 | 60 | 265 | 46 | 0 | 48 | 500 | **1.442** | 227 | 58 |
| 3 | 303 | 248 | 88 | 389 | 52 | 296 | 0 | 500 | **2.582** | 107 | 41 |
| 4 | 372 | 334 | 119 | 522 | 303 | 0 | 1.107 | 500 | **3.124** | 445 | 77 |
| 5 | 392 | 352 | 125 | 551 | 74 | 0 | 0 | 0 | **4.641** | 275 | 52 |
| 6 | 407 | 365 | 130 | 571 | 77 | 1.033 | 0 | 0 | **5.223** | 98 | 26 |
| 7 | 400 | 366 | 130 | 573 | 311 | 0 | 1.113 | 0 | **5.499** | 421 | 65 |
| 8 | 400 | 366 | 130 | 573 | 77 | 0 | 0 | 0 | **7.122** | 243 | 39 |
| 9 | 400 | 366 | 130 | 573 | 93 | 1.254 | 78 | 0 | **7.397** | 66 | 78 |
| 10 | 399 | 366 | 130 | 573 | 294 | 0 | 1.035 | 0 | **7.768** | 389 | 52 |
| 11 | 399 | 366 | 130 | 573 | 77 | 0 | 0 | 0 | **9.392** | 212 | 26 |
| 12 | 398 | 366 | 130 | 573 | 311 | 1.255 | 1.113 | 0 | **8.413** | 534 | 65 |
| **Total** | 4.255 | 3.803 | 1.352 | 5.952 | 1.851 | 3.839 | 5.013 | **3.000** | | | |

Lectura del escenario Optimista: 1.083 pedidos y 34.297 € cobrados en 13 meses con 12.413 € de anuncios; resultado acumulado 6.508 € con 3.000 € aportados en total. En el último mes con anuncios (mes 12): 104,28 pedidos, 3.303 € cobrados, CPA 13,07 € frente a 16,09 € de contribución, y 729 € de resultado. Caja final 8.413 €.

### 5.4 Resumen comparado

| Indicador | Pesimista | Base | Optimista |
|---|---:|---:|---:|
| Anuncios comprados en total | 1.846 | 2.017 | 12.413 |
| Meses con anuncios | 4 (parada en el mes 3) | 4 (parada en el mes 3) | 13 |
| Pedidos en total (13 meses) | 25 | 64 | 1.083 |
| Cobrado en total (IVA incl.) | 778 | 2.028 | 34.297 |
| Resultado acumulado (antes de tu tiempo) | -1.464 | -975 | 6.508 |
| Aportaciones totales (incluidos los 1.000 € iniciales) | 2.500 | 2.500 | 3.000 |
| Último mes con anuncios: pedidos | 8,35 | 23,16 | 104,28 |
| Último mes con anuncios: cobrado | 265 | 734 | 3.303 |
| Último mes con anuncios: CPA | 73,53 | 31,37 | 13,07 |
| Último mes con anuncios: resultado | -424 | -254 | 729 |
| Caja al final del mes 12 | 567 | 982 | 8.413 |

Primer mes con resultado positivo: Pesimista: ninguno en 13 meses · Base: ninguno en 13 meses · Optimista: mes 2.

**Lo que dice el modelo con franqueza:** en el pesimista (CPC 1,13 € y una ficha que no pasa del 2 %) y en el base (CPC 0,80 €, CVR 3,3 %) el CPA del mes 3 sigue por encima de la contribución (73,53 € y 31,37 € frente a 16,09 €), así que la regla de parada actúa: desde el mes 4 no se compran más anuncios ni se aporta más dinero. El test habrá costado 2.500 € de aportaciones en el base con una pérdida acumulada de 975 € (queda stock y ≈ 982 € en caja). En el optimista, que exige CTR 1,5 % y CVR 4,5 % (lo que consigue Vue con creatividades probadas), el negocio es rentable desde el mes 2 y lo que limita es el techo de anuncios, no la rentabilidad. **Traducción: el negocio no es «rentable desde 0» por diseño; es rentable desde 0 solo si los anuncios rinden al nivel de Vue. El plan sirve para averiguarlo gastando como máximo 2.500 €.**

## 6. Sensibilidad: qué pasa si el CPC o la CVR se mueven

Resultado mensual (contribución − anuncios − fijos) con **1.000 € de anuncios**, solo pedidos pagados, contribución media 16,09 € por pedido. Verde mental: > 0.

| CVR \ CPC | 0,40 € | 0,53 € | 0,80 € | 1,00 € | 1,13 € | 1,50 € |
|---|---:|---:|---:|---:|---:|---:|
| 1,5 % | -488 € (31,88 ped.) | -614 € (24,06 ped.) | -745 € (15,94 ped.) | -796 € (12,75 ped.) | -819 € (11,28 ped.) | -864 € (8,50 ped.) |
| 2,0 % | -317 € (42,50 ped.) | -485 € (32,08 ped.) | -659 € (21,25 ped.) | -728 € (17,00 ped.) | -759 € (15,04 ped.) | -819 € (11,33 ped.) |
| 2,5 % | -146 € (53,12 ped.) | -356 € (40,09 ped.) | -574 € (26,56 ped.) | -659 € (21,25 ped.) | -698 € (18,81 ped.) | -773 € (14,17 ped.) |
| 3,0 % | 25 € (63,75 ped.) | -227 € (48,11 ped.) | -488 € (31,88 ped.) | -591 € (25,50 ped.) | -638 € (22,57 ped.) | -728 € (17,00 ped.) |
| 3,5 % | 195 € (74,38 ped.) | -98 € (56,13 ped.) | -403 € (37,19 ped.) | -522 € (29,75 ped.) | -577 € (26,33 ped.) | -682 € (19,83 ped.) |
| 4,0 % | 366 € (85,00 ped.) | 31 € (64,15 ped.) | -317 € (42,50 ped.) | -454 € (34,00 ped.) | -517 € (30,09 ped.) | -636 € (22,67 ped.) |
| 5,0 % | 708 € (106,25 ped.) | 289 € (80,19 ped.) | -146 € (53,12 ped.) | -317 € (42,50 ped.) | -396 € (37,61 ped.) | -545 € (28,33 ped.) |

Cómo usar la tabla: mide en Meta tu CPC real y en el panel `/admin` tu CVR real de la ficha (pedidos ÷ visitas). Busca la casilla. Si es negativa, no escales: arregla el anuncio (CPC) o la ficha (CVR). Cada décima de CVR vale más que cualquier negociación con el proveedor.

## 7. Fórmulas del modelo

```
Impresiones_m   = Anuncios_m / CPM × 1000
Clics_m         = Impresiones_m × CTR
Visitas_m       = Clics_m × 0,85
PedidosPagados_m= Visitas_m × CVR_m
CPA_m           = Anuncios_m / PedidosPagados_m  = CPC / (0,85 × CVR_m)
Recompra_m      = Recompra% × PedidosPagados_(m−2)
PedidosEmail_m  = Visitas_m × Leads% × ConvLeads%
Pedidos_m       = PedidosPagados_m + Recompra_m + PedidosEmail_m
Cobrado_m       = Pedidos_m × TicketMedio      (TicketMedio = Σ mix_i × (precio_i + envío_i si precio_i < 30))
Neto_m          = Cobrado_m / 1,21 ;  IVA_m = Cobrado_m − Neto_m
Contribución_m  = Neto_m − Producto_m (coste medio del stock) − Stripe_m − Pedidos_m × (3,22 + 0,29) − 2 % × Neto_m
Resultado_m     = Contribución_m − Anuncios_m − Fijos
ROAS_m          = PedidosPagados_m × TicketMedio / Anuncios_m
Anuncios_(m+1)  = min(Techo, max(Anuncios_m, 0,5 × Contribución_m + Aportación_m), Caja_m + Aportación_m)
Aportación_m    = 500 si Resultado_(m−1) < 500, si no 0   (m ≥ 1)
IVA_trimestre   = Σ IVA repercutido (3 meses) − Σ IVA soportado (reposición, etiquetas)   pagado en los meses 3, 6, 9, 12
Caja_m          = Caja_(m−1) + Aportación_m + (Cobrado_m − Stripe_m) − Anuncios_m − Fijos − Reposición_m − IVA_trimestre − Devoluciones_m
Stock_m         = Stock_(m−1) + Reposición_uds − Pedidos_m × cajas por pedido ;  reponer si Stock < 60 cajas (mín. 1.000 parches)
Umbral:  CVR_mín = CPC / (0,85 × Contribución por pedido) ;  Ventas_mín = (Anuncios + Fijos) / (Contribución / Cobrado) ;  ROAS_mín = Cobrado / Contribución
```

## 8. Comprobación matemática (qué se ha verificado y cómo)

Se han hecho dos comprobaciones independientes y siete identidades contables sobre los tres escenarios.

**A. Recalculo independiente en LibreOffice.** El mismo modelo está en `finanzas/modelo_bootstrap_nocta.xlsx` escrito con fórmulas (no con valores): 13 filas de meses y 44 columnas encadenadas a la hoja de supuestos por nombres de celda, incluida la regla de parada del mes 3. Se ha recalculado con LibreOffice Calc en modo servidor para cada escenario (selector `scen` = 1, 2, 3) y se ha comparado celda a celda con el resultado de este documento (anuncios, pedidos, cobrado, resultado, caja, stock, IVA trimestral y aportaciones, 13 meses): diferencia máxima Pesimista: 4.5e-13 € · Base: 6.8e-13 € · Optimista: 7.3e-12 €. Celdas con error: 0, 0, 0.

**B. Identidades contables (diferencia máxima encontrada, en euros):**

| Identidad | Pesimista | Base | Optimista |
|---|---:|---:|---:|
| Cobrado = pedidos × ticket medio | 0e+00 | 0e+00 | 0e+00 |
| CPA = CPC ÷ (0,85 × CVR) | 1e-14 | 7e-15 | 2e-15 |
| Caja final = caja inicial + aportaciones + cobros netos − anuncios − fijos − reposiciones (con IVA) − etiquetas (con IVA) − IVA trimestral − devoluciones | 5e-13 | 0e+00 | 4e-12 |
| Stock mínimo en cualquier mes (cajas; nunca negativo) | 33.9 cajas | 24.0 cajas | 25.7 cajas |
| Producto consumido = stock inicial + reposiciones − stock final (valor) | 6e-14 | 1e-13 | 1e-12 |
| IVA ingresado en 4 trimestres = IVA repercutido − IVA soportado de los meses 0–11 | 3e-14 | 0e+00 | 5e-13 |
| Resultado = contribución − anuncios − fijos | 0e+00 | 0e+00 | 0e+00 |

**C. Coherencia con el resto del documento.** El ticket medio, la contribución por pedido y las CVR mínimas de la Parte 1 (secciones 1, 5 y 6) salen de las mismas constantes que este modelo (costes netos de IVA: etiqueta 3,22 €, sobre 0,29 €, caja de nariz 2,90 €, granos 1,60 €; Stripe 1,5 % + 0,25 €; devoluciones 2 %; 85 % de los clics cargan la ficha). El coste del pedido piloto (600 €) y la caja inicial (400 €) salen del estudio de proveedores (Parte 3, sección 9, variante A). El resumen de escenarios de la Parte 1, sección 8.4, se genera desde este mismo modelo.

**D. Lo que no se puede comprobar con matemáticas:** que la CVR llegue al 3,3 % (base) o al 4,5 % (optimista), que el CTR sea 1 % o 1,5 %, y que el 45 % de los pedidos sean de 2 cajas. Son las tres hipótesis que el test de 90 días tiene que confirmar o refutar. Medirlas es trivial: Meta da CPM, CTR y CPC; el panel `/admin` da visitas, pedidos y mix.


