# NOCTA — Estudio de los anuncios de Vue Skin: los 60 que más han funcionado, qué dicen, por qué venden y qué se copia

**Versión 1.0 · 9 de septiembre de 2026.** Este estudio no se queda en los ganchos: lee, uno a uno, los 60 guiones de anuncio de Vue Skin que más han funcionado (según lo único que se puede medir desde fuera y que explica la sección 1), traduce cada uno, lo descompone segundo a segundo, explica por qué convence, qué objeciones resuelve, qué prueba enseña y qué señales indican que vendió; los contrasta con 20 guiones que Vue apagó en menos de una semana; y saca de todo ello el playbook con el que se han escrito los 100 guiones de NOCTA (documento aparte, `catalogo_100_anuncios.md`). Base: 59 análisis completos generados a partir de las transcripciones de los vídeos (`../vue-skin-research/data/meta_ads_transcripts.json`) y de la Biblioteca de anuncios de Meta (`meta_ads_catalog.json`).

## Índice

1. Cómo se sabe qué anuncio ha funcionado (y qué no se puede saber)
2. Ranking de los 60 guiones ganadores con sus métricas
3. Los 25 mejores, uno a uno: transcripción, estructura, por qué funciona, qué se copia
4. Los 35 siguientes, en compacto
5. Los 20 guiones que Vue apagó en una semana y por qué
6. El playbook NOCTA: lo que se aplica a los 100 guiones
7. Banco de lenguaje completo (inglés → español de España)

## 1. Cómo se sabe qué anuncio ha funcionado (y qué no se puede saber)

La Biblioteca de anuncios de Meta no muestra gasto ni ventas por anuncio. Muestra tres cosas que, en una cuenta que gasta ≈ 1,8 M € y apaga el 34 % de sus anuncios en la primera semana, son la mejor aproximación posible a «convirtió»: **cuántos días estuvo activo** cada anuncio (un anunciante profesional no mantiene 200 días algo que no vende), **cuántas variantes** de texto y miniatura agrupó (solo se multiplica lo que funciona) y **cuántas veces se regrabó el mismo guion con otra persona** (solo se regraba lo que ha demostrado vender). Para cada guion se han sumado esas tres señales de todos los anuncios que lo usaron:

```
puntuación = días activos acumulados de todos los anuncios con ese guion
           + 40 × ln(1 + variantes agrupadas)
           + 15 × nº de vídeos distintos grabados con el mismo guion
```

Lo que NO se puede saber: el CPA, el ROAS o el gasto exacto de cada anuncio. Lo que sí: que los 60 guiones de la sección 2 acumulan entre 370 y 1.900 días de emisión cada uno, que el nº 1 se usó en 29 anuncios distintos con 16 grabaciones y 57 variantes, y que ningún guion de la lista de perdedores (sección 5) superó los 7 días en ninguno de sus anuncios. La transcripción es automática (Whisper): se han corregido las erratas evidentes (*poor strips* = pore strips, *view* = Vue).

## 2. Ranking de los 60 guiones ganadores con sus métricas

| # | Primeras palabras (inglés) | Anuncios | Vídeos | Días acum. | Días máx. | Variantes | Landing | Familias |
|---:|---|---:|---:|---:|---:|---:|---|---|
| 1 | These dark spots on your nose aren't blackheads. They're called sebaceous filame… | 29 | 16 | 1900 | 220 | 57 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 2 | Most women think these are blackheads. They're not. They're called sebaceous fil… | 27 | 9 | 1627 | 207 | 47 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 3 | if you think these are blackheads, stop doing this. Think scrubbing, squeezing, … | 31 | 8 | 1197 | 121 | 56 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 4 | Stop squeezing these dark dots. They're not blackheads. You have sebaceous filam… | 25 | 13 | 1027 | 121 | 38 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 5 | Do nose patches actually work for those dark dots? You've tried squeezing your n… | 21 | 6 | 1019 | 124 | 42 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 6 | You have these black dots on your nose and you might think you can squeeze them … | 14 | 10 | 957 | 171 | 23 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 7 | My skin's a catfish, but I'm about to fix it. I used to edit every single selfie… | 12 | 3 | 1056 | 289 | 14 | hydrocolloid-nose-patc | Anti láser / t, Corea vs Europ, Garantía |
| 8 | Poor strips are a scam. Here's what actually works. If you have tried every scru… | 12 | 3 | 1006 | 290 | 13 | hydrocolloid-nose-patc | Anti tiras / a, Garantía, Oferta / descu |
| 9 | Still dealing with clogged pores? These three red flags explain why. One, you're… | 12 | 3 | 983 | 290 | 21 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Garantía |
| 10 | I was ready to do laser for my nose pores until I discovered this one game-chang… | 10 | 3 | 969 | 291 | 11 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Oferta / descu |
| 11 | why Korean skincare is 10 years ahead of European techniques. European skincare … | 11 | 1 | 990 | 290 | 12 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Garantía |
| 12 | Most women think they need to squeeze their pores when they're clogged. That's w… | 9 | 3 | 916 | 289 | 10 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Oferta / descu |
| 13 | If you see these dots on your nose, it's not dirt, it's not blackheads, it's oil… | 22 | 8 | 782 | 117 | 43 | hydrocolloid-nose-patc | Anti tiras / a, Filamentos seb, Garantía |
| 14 | Stop treating these like blackheads. You might think you can squeeze them out. P… | 9 | 5 | 837 | 202 | 10 | hydrocolloid-nose-patc | Anti tiras / a, Filamentos seb, Oferta / descu |
| 15 | Here are three reasons why I love hand patches and one reason why I don't. Numbe… | 12 | 1 | 857 | 290 | 16 | hydrocolloid-nose-patc | Filamentos seb, Listicle / 3 r, Oferta / descu |
| 16 | Most guys over 35 think these are blackheads, they're not. They're called sebace… | 7 | 3 | 818 | 214 | 17 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 17 | If your pores look like this or like this, you're not taking care of them proper… | 8 | 1 | 846 | 287 | 15 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Listicle / 3 r |
| 18 | Most guys think these are blackheads. They're not. They're called sebaceous fila… | 10 | 6 | 752 | 212 | 16 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 19 | The secret to smooth pores after 40 is not using a laser. If you want to go from… | 10 | 7 | 749 | 173 | 11 | hydrocolloid-nose-patc | Anti láser / t, Oferta / descu, Prueba social  |
| 20 | If you notice blackheads, do not squeeze them. Instead, use one of these. They a… | 10 | 1 | 800 | 254 | 19 | hydrocolloid-nose-patc | Anti tiras / a |
| 21 | Here's the truth about those black dots on your nose that nobody talks about. Gu… | 12 | 5 | 700 | 223 | 12 | hydrocolloid-nose-patc | Anti tiras / a, Garantía, Hombres |
| 22 | And these dark spots on your nose aren't blackheads. They're called sebaceous fi… | 9 | 1 | 712 | 190 | 30 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 23 | This is the consequence of not taking care of my pores the right way. I'll show … | 6 | 1 | 756 | 290 | 7 | hydrocolloid-nose-patc | Filamentos seb, Lanzamiento pr, Prueba visual  |
| 24 | Guys, stop treating these like blackheads. They're called sebaceous filaments, b… | 11 | 9 | 586 | 119 | 24 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 25 | I'm about to show the only two products you need to transform your nose from thi… | 8 | 1 | 732 | 294 | 8 | clear-pore-duo | Anti tiras / a, Duo / dos paso, Garantía |
| 26 | Embarrassed of makeup looking like this. We got you girl apply nose patches over… | 8 | 1 | 720 | 290 | 10 | hydrocolloid-nose-patc | Oferta / descu |
| 27 | Women over 40, you have these black dots on your nose and you might think you ca… | 7 | 2 | 703 | 198 | 7 | hydrocolloid-nose-patc | Anti tiras / a, Filamentos seb, Oferta / descu |
| 28 | So let me show you how I took my skin from this to this. Now you can see all the… | 13 | 3 | 644 | 200 | 22 | hydrocolloid-nose-patc | Hombres, Prueba visual , Suscripción /  |
| 29 | Three warning signs, your pores need immediate help. One, your nose is constantl… | 11 | 2 | 656 | 161 | 20 | hydrocolloid-nose-patc | Corea vs Europ, Garantía, Listicle / 3 r |
| 30 | I had to teach my boyfriend these aren't blackheads. I watched him squeeze and s… | 8 | 2 | 661 | 184 | 17 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 31 | I thought laser for my pores was a good idea, but then I found out it could dama… | 13 | 3 | 636 | 186 | 17 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Oferta / descu |
| 32 | Want smoother skin by morning? Start here. This duo that I use literally minimiz… | 8 | 2 | 660 | 291 | 8 | clear-pore-duo | Anti láser / t, Duo / dos paso, Garantía |
| 33 | Most girls in their 20s think they can squeeze these black dots out. Please don'… | 9 | 3 | 602 | 163 | 22 | hydrocolloid-nose-patc | Anti tiras / a, Filamentos seb, Garantía |
| 34 | Three reasons your pores keep breaking you out. Reason one, most products just s… | 7 | 1 | 636 | 289 | 13 | hydrocolloid-nose-patc | Corea vs Europ, Listicle / 3 r, Prueba social  |
| 35 | If your nose looks like this, stop doing this. Think scrubbing, squeezing, or us… | 17 | 6 | 509 | 91 | 41 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 36 | Your pores refill every 24 hours. That's why your nose never stays matte. Inside… | 6 | 2 | 602 | 129 | 14 | hydrocolloid-nose-patc | Filamentos seb, Prueba social  |
| 37 | I finally learned why the dark dots on my nose always come back. Look how much c… | 12 | 2 | 567 | 173 | 26 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 38 | Harsh treatments don't age well on the skin. If you want to go from visible blac… | 8 | 6 | 528 | 156 | 12 | hydrocolloid-nose-patc | Anti láser / t, Oferta / descu, Prueba social  |
| 39 | I promise you're not alone. For years I thought these dark dots were blackheads.… | 12 | 3 | 543 | 135 | 21 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Corea vs Europ |
| 40 | Did you know 80% of your skin oil comes from just your T-zone? I thought it was … | 9 | 2 | 572 | 149 | 14 | clear-t-zone-kit | Corea vs Europ, Duo / dos paso, Prueba social  |
| 41 | You want to go from blackheads to smooth nose, from oily shine to a matte glow. … | 14 | 5 | 507 | 112 | 23 | hydrocolloid-nose-patc | Anti tiras / a, Oferta / descu |
| 42 | Why is everyone switching to these nose patches? Every time I post my skin, peop… | 5 | 2 | 571 | 224 | 10 | hydrocolloid-nose-patc | Anti tiras / a, Oferta / descu |
| 43 | I accidentally fixed my biggest insecurity. Those dots, not blackheads. They're … | 24 | 2 | 514 | 103 | 33 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 44 | the Korean innovation changing European skincare. For truly K-Beauty clear skin,… | 6 | 1 | 582 | 289 | 7 | hydrocolloid-nose-patc | Corea vs Europ, Garantía |
| 45 | Most guys in their 20s think these are blackheads. They're not. They're called s… | 5 | 3 | 538 | 207 | 9 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 46 | Every time you rip off a pore strip, you're damaging your skin. Here's what that… | 16 | 4 | 462 | 115 | 40 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Corea vs Europ |
| 47 | If your dark nose dots keep coming back, they're not blackheads. You have sebace… | 16 | 5 | 466 | 121 | 22 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 48 | If you're over 40 and still fighting these dark dots on your nose, please watch … | 16 | 4 | 466 | 75 | 28 | hydrocolloid-nose-patc | Anti láser / t, Anti tiras / a, Corea vs Europ |
| 49 | You have these black dots on your nose and you probably think you can squeeze th… | 9 | 3 | 503 | 163 | 13 | hydrocolloid-nose-patc | Anti tiras / a, Filamentos seb, Garantía |
| 50 | If you've been squeezing these, congrats you've been doing it wrong. Okay, so bu… | 14 | 1 | 500 | 108 | 25 | hydrocolloid-nose-patc | Anti tiras / a, Hombres, Prueba visual  |
| 51 | If your nose looks like this, you don't have blackheads. You have sebaceous fila… | 20 | 7 | 391 | 60 | 30 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 52 | 8. Clear Signs Your Nose Needs Better Care You notice, stubborn blackheads, oily… | 4 | 2 | 507 | 195 | 9 | hydrocolloid-nose-patc | Anti láser / t, Oferta / descu |
| 53 | Watch what happens when she stops treating these like blackheads and uses the ri… | 10 | 1 | 500 | 114 | 13 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 54 | This got rid of my stubborn, sebaceous filaments. I spent years feeling self-con… | 8 | 2 | 477 | 182 | 14 | hydrocolloid-nose-patc | Corea vs Europ, Filamentos seb, Garantía |
| 55 | Wish someone told me this in my 20s, these aren't blackheads. They're sebaceous … | 22 | 4 | 416 | 75 | 31 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 56 | If your nose looks like this, you don't have blackheads You just have oil plugs … | 11 | 5 | 418 | 88 | 17 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 57 | If your dark nose dots always come back, stop doing this. If you're attacking yo… | 9 | 2 | 441 | 119 | 21 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 58 | This is the secret product that helped me transform my nose. Boost with snows pa… | 3 | 1 | 517 | 223 | 3 | hydrocolloid-nose-patc | Anti tiras / a, Oferta / descu |
| 59 | If you have dark dots on your nose, stop doing this. Think scrubbing, squeezing,… | 9 | 6 | 377 | 117 | 12 | hydrocolloid-nose-patc | Anti tiras / a, Corea vs Europ, Filamentos seb |
| 60 | I can't believe I didn't notice this last night, but of this morning, and look a… | 6 | 5 | 400 | 111 | 9 | hydrocolloid-nose-patc | Anti tiras / a, Hombres |

## 3. Los 25 mejores, uno a uno

### 1. Finally Clear Skin for Guys — «Esos puntitos oscuros de la nariz no son puntos negros.»

**Métricas:** 29 anuncios · 16 grabaciones · 1900 días acumulados · máx. 220 días · 57 variantes · landing hydrocolloid-nose-patches · 2025-09-25 → 2026-07-17 · 42 s

**Señales de conversión:** Puntuación nº 1 del ranking: 1.900 días acumulados (el siguiente, 1.627), 16 vídeos distintos (nadie más pasa de 13), 57 variantes. Primer anuncio en septiembre de 2025 y todavía se lanzaban nuevos en julio de 2026: 10 meses de uso continuado. Sus 6 «hermanos» (R2, R16, R18, R22, R24, R45) suman otros 4.700 días: la familia entera acumula ≈ 6.600 días de emisión, más que cualquier otra idea de la cuenta.

**Transcripción (inglés):** These dark spots on your nose aren't blackheads. They're called sebaceous filaments, basically oil plugs that form naturally in your pores, and the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These view nose patches are made in Korea, and they're specifically designed for sebaceous filaments, not blackheads, which is why they actually work. They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. I saw a huge improvement, and after three weeks, those dark spots were completely gone. Check it out. Tons of guys finally understand why nothing worked before, and now they're getting clear skin for the first time. They also offer a money back guarantee if you're not happy with the results.

**Traducción (español de España):** Esos puntitos oscuros de la nariz no son puntos negros. Se llaman filamentos sebáceos: son tapones de grasa que se forman de manera natural en los poros. Y la razón de que nada de lo que has probado funcione es que los has estado tratando como puntos negros, cuando necesitan un cuidado completamente distinto. Por eso vuelven una y otra vez. Estos parches de nariz de Vue están hechos en Corea y diseñados específicamente para filamentos sebáceos, no para puntos negros: por eso funcionan de verdad. Absorben con suavidad la grasa acumulada durante la noche, en vez de arrancarte la piel como esas tiras que duelen. Yo noté una mejora enorme y, a las tres semanas, esos puntitos oscuros habían desaparecido del todo. Míralo. Un montón de chicos por fin entienden por qué nada les funcionaba, y ahora tienen la piel limpia por primera vez. Además ofrecen garantía de devolución si no quedas contento con el resultado.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho | These dark spots on your nose aren't blackheads. | Primer plano de una nariz con puntitos (inferido); el creador señala su nariz. | Contradice una creencia que el 100 % del público tiene: para el scroll sin prometer nada. |
| 3–9 | reencuadre | They're called sebaceous filaments, basically oil plugs that form naturally in your pores | Macro de la nariz o rótulo con el nombre; a veces esquema de un poro (inferido). | Da nombre nuevo al problema: quien pone nombre, tiene la solución. |
| 9–16 | problema/por qué falla lo anterior | the reason why nothing you've tried works is because you've been treating them like blackheads… That's why they keep coming back. | Botes, tiras, gesto de apretar (inferido). | Absuelve al espectador (no es culpa tuya) y explica la recurrencia, la objeción nº 1. |
| 16–24 | mecanismo + diferenciación | made in Korea… specifically designed for sebaceous filaments, not blackheads… gently absorb the oil buildup overnight instead of ripping your skin like those painful strips | Caja y parche en mano; aplicación en la nariz por la noche (inferido). | Explica por qué ESTE producto sí: hecho para el problema real, absorbe (no arranca). |
| 24–32 | prueba | I saw a huge improvement, and after three weeks, those dark spots were completely gone. Check it out. | Antes/después de la nariz; parche retirado por la mañana (inferido). | Resultado personal con plazo concreto (3 semanas) y prueba visual. |
| 32–38 | prueba social | Tons of guys finally understand why nothing worked before, and now they're getting clear skin for the first time. | Capturas de reseñas o caras (inferido). | Normaliza y da identidad («chicos como tú»). |
| 38–42 | garantía + cta | They also offer a money back guarantee if you're not happy with the results. | Web con la garantía subrayada (inferido). | Elimina el riesgo; el CTA va en el texto del anuncio. |

**Gancho (Contradicción de creencia (reencuadre) con imagen del problema):** «These dark spots on your nose aren't blackheads.» → «Esos puntitos oscuros de la nariz no son puntos negros.». Es una afirmación que el espectador puede comprobar en su propio espejo en un segundo, contradice lo que cree y no vende nada todavía. Y va acompañada de la nariz en primer plano: el problema se reconoce sin palabras.

**Reencuadre:** Cambia «tengo suciedad que sacar» por «tengo grasa que se rellena sola y que hay que absorber cada noche». Esto convierte un producto de uso puntual en un hábito recurrente, y convierte todos los fracasos anteriores en una prueba de que la teoría es cierta.

**Mecanismo:** Tres ideas en 8 segundos: hecho en Corea (autoridad de categoría), diseñado específicamente para filamentos (encaje problema-solución), absorbe durante la noche en vez de arrancar (contraste con tiras). No explica el hidrocoloide; no hace falta.

**Prueba:** Resultado personal con plazo («a las tres semanas, desaparecidos del todo»), seg. 24–32 · «Check it out» = corte al antes/después y al parche usado (inferido), seg. 30 · Prueba social de grupo («tons of guys»), seg. 32–38 · Garantía como prueba de confianza, seg. 38–42

**Objeciones resueltas:** «Ya lo he probado todo y vuelve» → no era el problema correcto, por eso volvía · «Las tiras me hacen daño» → absorbe en vez de arrancar · «¿Cuánto tarda?» → tres semanas · «¿Y si no funciona?» → devolución del dinero

**Disparadores emocionales:** Alivio (no es culpa tuya), Curiosidad (nombre nuevo), Pertenencia («chicos como tú por fin lo entienden»), Esperanza con fecha (3 semanas)

**Técnicas:** Reencuadre del problema · Absolución del cliente («nothing you've tried works because…») · Encaje específico («designed for X, not Y») · Contraste con la alternativa (tiras que arrancan) · Plazo concreto (3 semanas) · Prueba social de identidad · Reversión del riesgo

| Frase (EN) | Adaptación (ES) |
|---|---|
| These dark spots on your nose aren't blackheads. | Esos puntitos oscuros de la nariz no son puntos negros. |
| basically oil plugs that form naturally in your pores | son tapones de grasa que tu piel fabrica sola |
| the reason why nothing you've tried works is because you've been treating them like blackheads | nada te ha funcionado porque los tratabas como puntos negros |
| That's why they keep coming back. | Por eso vuelven siempre. |
| specifically designed for sebaceous filaments, not blackheads, which is why they actually work | hechos para filamentos, no para puntos negros: por eso sí funcionan |
| gently absorb the oil buildup overnight instead of ripping your skin | absorben la grasa mientras duermes en vez de arrancarte la piel |
| after three weeks, those dark spots were completely gone | a las tres semanas ya no se veían |
| Tons of guys finally understand why nothing worked before | un montón de chicos por fin entienden por qué nada les funcionaba |

**Oferta y cierre:** Sin descuento en el vídeo: cierra con garantía de devolución; el enlace y el precio van en el texto del anuncio («Get yours»). El titular alterna «Finally Clear Skin for Guys», «Wake Up To Clearer Skin», «One Patch. Real Results.»

**Por qué funciona:** Es el guion más explotado de toda la cuenta y, con casi total seguridad, el que más dinero ha generado: 29 anuncios, 16 grabaciones distintas y 57 variantes en 10 meses, con un anuncio de 220 días. Funciona por una combinación que ningún otro reúne igual: (1) el gancho no vende, corrige: «no son puntos negros» es verificable al instante y despierta la curiosidad de quien lleva años equivocado; (2) absuelve al espectador de sus fracasos («nada te ha funcionado porque los tratabas como…»), lo que convierte la frustración acumulada en el mejor argumento a favor del producto; (3) resuelve la objeción principal de la categoría, la recurrencia («por eso vuelven»), antes de presentar el producto; (4) presenta el producto como encaje exacto («diseñado para filamentos, no para puntos negros»), que es una afirmación de diseño, no de eficacia, y por eso suena creíble; (5) da un plazo (3 semanas) y una prueba visual; (6) cierra con identidad y garantía. Además es MODULAR: la misma estructura se regrabó cambiando solo la primera frase para hombres (R16, R18, R24, R45: «most guys», «most guys over 35», «guys, stop…»), mujeres (R2, R22: «most women think…») y neutro (R1). Eso permitió a Vue probar 7 públicos con un solo guion y multiplicarlo en 57 variantes de texto: es la definición de un guion que convierte.

**Qué se copia para NOCTA:** La estructura entera de 7 bloques y sus tiempos: es la plantilla maestra · El gancho verificable en el espejo + nariz en primer plano en el segundo 0 · La absolución («no era culpa tuya, era el diagnóstico») · La frase de encaje («hechos para filamentos, no para puntos negros») · El plazo concreto y honesto (3 semanas de uso, no «una noche») · La modularidad: grabar la misma estructura con Bea, Marisol y Álex cambiando solo la primera frase

**Lo que no se puede decir en España y su alternativa:** «those dark spots were completely gone» (desaparecieron del todo) → «se veían mucho menos» / «casi no se notaban» · «made in Korea» → solo si el lote es coreano; en el piloto chino: «hidrocoloide de grado sanitario» (si el proveedor lo certifica) o simplemente «parche de hidrocoloide» · «getting clear skin for the first time» (piel limpia por primera vez) → «la nariz limpia por la mañana»

**Adaptación a España:** Tono de tú, frases más cortas que en inglés, «puntitos» en vez de «puntos» para la identificación. La versión neutra es para Reels/TikTok; la versión «la mayoría de las mujeres…» para Marisol; «la mayoría de los tíos…» para Álex. En España «filamentos sebáceos» suena técnico: decirlo una vez y luego «grasa que se rellena».

### 2. Clear Pores Overnight — «La mayoría de las mujeres cree que esto son puntos negros. No lo son.»

**Métricas:** 27 anuncios · 9 grabaciones · 1627 días acumulados · máx. 207 días · 47 variantes · landing hydrocolloid-nose-patches · 2025-10-07 → 2026-05-15 · 44 s

**Señales de conversión:** Nº 2 del ranking: 27 anuncios, 9 vídeos, 47 variantes, 1.627 días, de octubre de 2025 a mayo de 2026.

**Transcripción (inglés):** Most women think these are blackheads. They're not. They're called sebaceous filaments, basically oil plugs that form naturally in your pores. And the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These view nose patches are made in Korea and they're specifically designed for sebaceous filaments, not blackheads, which is why they actually work. They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. I saw a huge improvement and after three weeks, those dark spots were completely gone. Check it out. Tons of women finally understand why nothing worked before and now they're getting clear skin for the first time. They also offer a money-back guarantee if you're not happy with the results.

**Traducción (español de España):** La mayoría de las mujeres cree que esto son puntos negros. No lo son. Se llaman filamentos sebáceos… (el resto es idéntico al nº 1, con «un montón de mujeres por fin entienden…» en la prueba social).

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho de identidad | Most women think these are blackheads. They're not. | Mujer señalando su nariz en primer plano (inferido). | Añade identidad («mujeres») al reencuadre: el espectador se siente aludido. |
| 3–44 | resto | (idéntico al nº 1) | (idéntico) | Misma máquina de convencer. |

**Gancho (Identidad + contradicción):** «Most women think these are blackheads. They're not.» → «La mayoría de las mujeres cree que esto son puntos negros. No lo son.». «Most women think» crea un grupo y un error compartido: si eres mujer, te para; «They're not» abre el bucle.

**Reencuadre:** El del nº 1.

**Mecanismo:** El del nº 1.

**Prueba:** Las del nº 1, con prueba social femenina («tons of women»)

**Objeciones resueltas:** Las del nº 1

**Disparadores emocionales:** Identidad de grupo, Alivio, Curiosidad

**Técnicas:** Segmentación explícita en el gancho · Todo lo del nº 1

| Frase (EN) | Adaptación (ES) |
|---|---|
| Most women think these are blackheads. They're not. | La mayoría de las mujeres cree que esto son puntos negros. No lo son. |
| Tons of women finally understand why nothing worked before | un montón de mujeres por fin entienden por qué nada les funcionaba |

**Oferta y cierre:** Titulares «Clear Pores Overnight», «Stop Treating Blackheads Wrong», «Not Blackheads, Here's Why»; texto con «60-day guarantee».

**Por qué funciona:** Es la prueba de que el guion del nº 1 vende por su estructura y no por la persona: con 9 grabaciones distintas y 47 variantes, acumula 1.627 días. La única diferencia es la identidad del gancho, y esa diferencia es la que permite que el mismo anuncio funcione en dos públicos distintos sin canibalizarse. Para NOCTA es la demostración de que hay que grabar un mismo guion con Bea, con Marisol y con Álex.

**Qué se copia para NOCTA:** Grabar la plantilla maestra con identidad en la primera frase («la mayoría de las mujeres», «los tíos de más de 35», «las chicas de 20»)

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

**Adaptación a España:** «La mayoría de las mujeres cree…» funciona; evitar «chicas» para Marisol.

### 3. Clearer Without the Stress — «Si crees que esto son puntos negros, deja de hacer esto.»

**Métricas:** 31 anuncios · 8 grabaciones · 1197 días acumulados · máx. 121 días · 56 variantes · landing hydrocolloid-nose-patches · 2026-02-04 → 2026-05-16 · 64 s

**Señales de conversión:** 31 anuncios, 8 vídeos, 56 variantes, 1.197 días en 3,5 meses (feb–may 2026): la mayor densidad de anuncios por mes del ranking. R35 (17 anuncios, 41 variantes) y R59 (9 anuncios) son el mismo guion.

**Transcripción (inglés):** if you think these are blackheads, stop doing this. Think scrubbing, squeezing, or using pore strips will get rid of those dark nose dots. It's actually one of the fastest ways to make your pores look bigger and your skin more sensitive. I used to try everything, scrub, strips, even those deep cleanse masks. Every time the dots would fade for a day, then pop right back up. It was like my nose had a mind of its own. The more I thought them, the more frustrated I got. Sometimes my skin would get red, tight, or even a little sore. And honestly, I started to feel like nothing would ever work. Those dots aren't blackheads, they're sebaceous filaments. They're just tiny oil channels, your skin refills every day. Trying to rip them out or over clean only makes them more visible and can even lead to breakouts. That's why I switched to Korean hydro-coloured nose patches. They're designed to gently absorb excess oil from inside your pores overnight. No ripping, no irritation, no drama. The excess oil is what makes your pores look darker, but keeping them healthy will make them less visible. My pores look less visible, the dots are lighter and my skin feels balanced. No more hiding in photos or losing confidence over my skin. Just smoother, clearer skin by morning. You can try these view nose patches risk-free for 60 days. If you want a clearer nose without the harsh routines, this is the way to do it.

**Traducción (español de España):** Si crees que esto son puntos negros, deja de hacer esto. Crees que frotar, apretar o usar tiras va a quitar esos puntitos oscuros de la nariz. Pues es una de las formas más rápidas de que tus poros parezcan más grandes y tu piel más sensible. Yo lo probé todo: exfoliantes, tiras, hasta esas mascarillas de limpieza profunda. Cada vez los puntitos se iban un día y volvían al siguiente. Era como si mi nariz tuviera vida propia. Cuanto más los atacaba, más me frustraba. A veces la piel se me quedaba roja, tirante o hasta dolorida. Y, sinceramente, empecé a pensar que nada funcionaría nunca. Esos puntitos no son puntos negros: son filamentos sebáceos, pequeños canales de grasa que tu piel rellena cada día. Intentar arrancarlos o limpiar de más solo los hace más visibles y hasta puede provocar granos. Por eso me pasé a los parches de nariz coreanos de hidrocoloide. Están diseñados para absorber con suavidad el exceso de grasa desde dentro del poro mientras duermes. Sin arrancar, sin irritación, sin dramas. El exceso de grasa es lo que hace que los poros se vean más oscuros; mantenerlos sanos los hace menos visibles. Mis poros se ven menos, los puntitos están más claros y mi piel está equilibrada. Se acabó esconderme en las fotos o perder la confianza por mi piel. Piel más lisa y limpia por la mañana. Puedes probar estos parches de Vue sin riesgo durante 60 días. Si quieres una nariz más limpia sin rutinas agresivas, esta es la forma.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho «para de» | if you think these are blackheads, stop doing this. | Nariz + gesto de apretar o tira (inferido). | Orden directa que interrumpe un hábito. |
| 3–10 | por qué falla | scrubbing, squeezing, or using pore strips… one of the fastest ways to make your pores look bigger | Tira arrancada, rojez (inferido). | Convierte el hábito en amenaza (poros más grandes). |
| 10–26 | historia de frustración | I used to try everything… Every time the dots would fade for a day, then pop right back… red, tight, sore… nothing would ever work | B-roll de productos, cara de frustración (inferido). | Espejo emocional: describe exactamente el ciclo del espectador. |
| 26–34 | reencuadre | Those dots aren't blackheads, they're sebaceous filaments… your skin refills every day | Macro nariz (inferido). | Explica el ciclo. |
| 34–44 | mecanismo | Korean hydrocolloid nose patches… absorb excess oil from inside your pores overnight. No ripping, no irritation, no drama. | Aplicación del parche (inferido). | Solución + contraste. |
| 44–56 | resultado emocional | My pores look less visible… No more hiding in photos or losing confidence | Cara sin filtro, sonrisa (inferido). | Vende el beneficio de identidad (fotos, confianza), no solo el poro. |
| 56–64 | garantía + cta | try these Vue nose patches risk-free for 60 days | Web (inferido). | Reversión de riesgo. |

**Gancho («Para de» (interrupción de hábito) condicionado a la creencia):** «If you think these are blackheads, stop doing this.» → «Si crees que esto son puntos negros, deja de hacer esto.». Combina condición («si crees…»), orden («deja de…») y misterio («esto» = lo que se ve en pantalla). Es el arranque con más anuncios de la familia «stop» (31 anuncios).

**Reencuadre:** Además del diagnóstico, reencuadra el esfuerzo: «cuanto más lo atacas, peor». La solución es dejar de luchar.

**Mecanismo:** Absorber desde dentro durante la noche; «no ripping, no irritation, no drama» como mantra de tres golpes.

**Prueba:** Historia personal larga (16 s) con síntomas concretos (rojo, tirante, dolorido) · Resultado: poros menos visibles, puntos más claros, piel equilibrada (no promete «desaparecen») · Beneficio de identidad: sin esconderse en fotos

**Objeciones resueltas:** «Ya lo probé todo» → la historia lo dice literalmente · «Me irrita» → sin arrancar ni irritación · «¿Y si no?» → 60 días sin riesgo

**Disparadores emocionales:** Frustración reconocida, Miedo (poros más grandes), Confianza recuperada (fotos)

**Técnicas:** Orden + condición · Amenaza de empeorar · Espejo emocional (storytelling corto de síntomas) · Regla de tres («no ripping, no irritation, no drama») · Beneficio de identidad · Riesgo cero

| Frase (EN) | Adaptación (ES) |
|---|---|
| If you think these are blackheads, stop doing this. | Si crees que esto son puntos negros, deja de hacer esto. |
| one of the fastest ways to make your pores look bigger and your skin more sensitive | es la forma más rápida de que los poros se te vean más grandes |
| It was like my nose had a mind of its own. | Era como si mi nariz fuera por libre. |
| No ripping, no irritation, no drama. | Sin arrancar, sin irritar, sin dramas. |
| No more hiding in photos | Se acabó esconderse en las fotos |
| clearer nose without the harsh routines | la nariz limpia sin rutinas agresivas |

**Oferta y cierre:** 60 días sin riesgo; titulares «Clearer Without the Stress», «Break the Cycle».

**Por qué funciona:** Es el guion con MÁS anuncios de toda la cuenta (31) en solo 3 meses y medio, aunque su vida máxima sea menor (121 días): Vue lo multiplicó en 56 variantes porque el arranque «stop doing this» sobre la imagen de una nariz tiene el mejor hook rate de la familia «para de». Su fuerza es que dedica 16 segundos a describir la frustración del espectador con síntomas físicos concretos antes de dar ninguna explicación: el espectador se ve retratado y se queda. Y no promete que desaparezcan: promete «menos visibles, más claros, piel equilibrada», que es lo que cumple el producto y lo que evita devoluciones. Cierra con el beneficio real (fotos, confianza), no con el poro. Se regrabó dos veces (R35 y R59) con el mismo texto, señal de que el guion vendía independientemente de la creadora.

**Qué se copia para NOCTA:** Arranque «Si crees que… deja de hacer esto» sobre la nariz · Los 15 segundos de espejo emocional con síntomas concretos · El mantra de tres «sin arrancar, sin irritar, sin dramas» · Promesa honesta: «menos visibles», no «desaparecen» · Cierre de identidad: fotos sin filtro

**Lo que no se puede decir en España y su alternativa:** «Korean hydrocolloid» → condicional al lote · «can even lead to breakouts» (puede provocar granos) → aceptable como advertencia general si no se atribuye a marcas concretas

**Adaptación a España:** Marisol y Bea. En español, «esconderme en las fotos» y «rutinas agresivas» funcionan tal cual; «drama» se usa en España, mantener.

### 4. Clear Nose Overnight ✨ — «Deja de apretarte esos puntitos. No son puntos negros.»

**Métricas:** 25 anuncios · 13 grabaciones · 1027 días acumulados · máx. 121 días · 38 variantes · landing hydrocolloid-nose-patches · 2026-01-29 → 2026-05-15 · 52 s

**Señales de conversión:** 25 anuncios, 13 vídeos, 38 variantes, 1.027 días (ene–may 2026); familia con R47 (16 anuncios) y R51 (20 anuncios, 30 variantes): ≈ 61 anuncios en total.

**Transcripción (inglés):** Stop squeezing these dark dots. They're not blackheads. You have sebaceous filaments. And having sebaceous filaments means those dots will keep coming back no matter how much you squeeze, scrub, or use pore strips. That's probably why nothing you've tried has worked. You clear them for a few hours, but by the next morning, they're back. And the more you try to rip them out, the more irritated and oily your nose gets. It's a cycle, fight, clear, repeat. That's because sebaceous filaments are oil channels that refill naturally. You can't cure them, but you can control them. Here's what actually works. View nose patches. Made in Korea, they absorb the excess oil from inside your pores while you sleep. No ripping, no redness, no daily battle. And the most important, no long skincare routine. After a few applications, my nose stayed clear for days, not hours, just look at these results. No more waking up to big visible dark dots. Only problem, they keep selling out. But they're back in stock right now with a 60 day money back guarantee, just click below.

**Traducción (español de España):** Deja de apretar esos puntitos oscuros. No son puntos negros. Tienes filamentos sebáceos. Y tener filamentos sebáceos significa que esos puntitos van a volver por mucho que aprietes, frotes o uses tiras. Por eso, probablemente, nada de lo que has probado ha funcionado. Los quitas durante unas horas y a la mañana siguiente están otra vez. Y cuanto más intentas arrancarlos, más irritada y más grasa se te pone la nariz. Es un ciclo: luchar, limpiar, repetir. Porque los filamentos sebáceos son canales de grasa que se rellenan solos. No se pueden curar, pero se pueden controlar. Esto es lo que funciona de verdad: los parches de nariz de Vue. Hechos en Corea, absorben el exceso de grasa desde dentro de los poros mientras duermes. Sin arrancar, sin rojeces, sin batalla diaria. Y lo más importante: sin rutina larga. Después de unas cuantas aplicaciones, mi nariz se mantuvo limpia durante días, no horas. Mira estos resultados. Se acabó despertarse con puntitos grandes y visibles. El único problema es que se agotan todo el tiempo. Pero ahora mismo están en stock, con 60 días de garantía de devolución. Pincha abajo.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho «para de» + diagnóstico | Stop squeezing these dark dots. They're not blackheads. | Dedos apretando la nariz (inferido). | Interrumpe el hábito más universal. |
| 3–15 | el ciclo | those dots will keep coming back… You clear them for a few hours, but by the next morning, they're back… It's a cycle, fight, clear, repeat. | Secuencia mañana/noche (inferido). | Nombra el ciclo: la objeción de recurrencia convertida en argumento. |
| 15–21 | reencuadre honesto | You can't cure them, but you can control them. | Rótulo (inferido). | Honestidad que baja las expectativas y sube la credibilidad. |
| 21–32 | mecanismo | Made in Korea, they absorb the excess oil from inside your pores while you sleep. No ripping, no redness, no daily battle. And… no long skincare routine. | Aplicación, cama (inferido). | Solución + cuatro negaciones (lo que NO tienes que hacer). |
| 32–42 | prueba | my nose stayed clear for days, not hours, just look at these results | Antes/después, parche usado (inferido). | Contraste temporal (días vs horas) + visual. |
| 42–52 | escasez + garantía + cta | Only problem, they keep selling out. But they're back in stock right now with a 60 day money back guarantee, just click below. | Web (inferido). | Urgencia + riesgo cero + CTA explícito. |

**Gancho (Orden + diagnóstico):** «Stop squeezing these dark dots. They're not blackheads.» → «Deja de apretarte esos puntitos. No son puntos negros.». Dos frases de 4 palabras; la primera es una orden sobre algo que el espectador hace, la segunda contradice lo que cree.

**Reencuadre:** «No se curan, se controlan»: es la frase más honesta de toda la cuenta y la que más credibilidad da al resto. Reencuadra la compra como mantenimiento, lo que justifica repetir.

**Mecanismo:** Absorber desde dentro durante la noche, con cuatro negaciones seguidas (sin arrancar, sin rojez, sin batalla diaria, sin rutina larga).

**Prueba:** «Días, no horas» como medida del resultado · «Mira estos resultados» (visual) · Escasez creíble («se agotan todo el tiempo… ahora en stock»)

**Objeciones resueltas:** «Vuelven» → es un ciclo, se controla · «No tengo tiempo/rutina» → sin rutina larga · «Duele/irrita» → sin arrancar ni rojez · «¿Funciona?» → días, no horas; garantía

**Disparadores emocionales:** Cansancio del ciclo, Alivio por la honestidad, Urgencia

**Técnicas:** Nombrar el ciclo (fight, clear, repeat) · Honestidad estratégica (no cura, controla) · Negaciones en serie · Contraste temporal · Escasez + garantía · CTA explícito

| Frase (EN) | Adaptación (ES) |
|---|---|
| Stop squeezing these dark dots. | Deja de apretarte esos puntitos. |
| It's a cycle, fight, clear, repeat. | Es un ciclo: apretar, limpiar, repetir. |
| You can't cure them, but you can control them. | No se curan. Se controlan. |
| No ripping, no redness, no daily battle. | Sin arrancar, sin rojeces, sin pelearte cada día. |
| my nose stayed clear for days, not hours | la nariz me duró limpia días, no horas |
| Only problem, they keep selling out. | El único problema: se agotan. |

**Oferta y cierre:** Escasez + 60 días + «click below»; en Semana Santa se usó con «15 % Off Sitewide».

**Por qué funciona:** Es el guion que mejor combina el arranque «para de» con la honestidad («no se curan, se controlan»). Esa frase hace dos cosas: desactiva la sospecha de exageración que acompaña a cualquier anuncio de skincare y establece el uso continuado como normal. Después mide el resultado con un contraste temporal fácil de creer («días, no horas») y cierra con una escasez que en Vue era cierta (roturas de stock documentadas en su web). 25 anuncios y 13 grabaciones en tres meses y medio: es el guion que Vue regrabó con más personas en 2026 después del nº 1, y sus copias R47 y R51 suman otros 36 anuncios.

**Qué se copia para NOCTA:** «No se curan, se controlan» como frase de honestidad (y de recurrencia de compra: pack de 2, plan) · Nombrar el ciclo · «Días, no horas» como métrica · Escasez real: lote piloto de 125 cajas

**Lo que no se puede decir en España y su alternativa:** «Made in Korea» → condicional · «cure» ya se niega: bien

**Adaptación a España:** Vale para los tres avatares. «Batalla diaria» → «pelearte cada día». Escasez: decir la cifra real del lote.

### 5. No More Nose Bumps — «¿Funcionan de verdad los parches de nariz para esos puntitos?»

**Métricas:** 21 anuncios · 6 grabaciones · 1019 días acumulados · máx. 124 días · 42 variantes · landing hydrocolloid-nose-patches · 2025-12-23 → 2026-05-15 · 64 s

**Señales de conversión:** 21 anuncios, 6 vídeos, 42 variantes, 1.019 días (dic 2025–may 2026).

**Transcripción (inglés):** Do nose patches actually work for those dark dots? You've tried squeezing your nose dots before to push them out, but that just scars your skin and makes them look darker and more visible. So instead, you wear a patch overnight. Why is that any better? Well, in most cases, those dots aren't blackheads. They're sebaceous filaments, basically your pores natural oil pathways filled with oil. Your nose is producing excess oil and the patch is dry, which creates a moisture gradient where oil wants to move from a wet area to a dry area. So the patch absorbs that excess oil out of your pores. Here's the thing though, if it were a normal patch, that oil would have nowhere to go and just sit on your skin making things worse. But these patches are hydrocalloy or gel forming. So the oil hits the gel and the specially designed gel reacts with the oil. Absorbing it and turning the patch white or cloudy which shows you it's working. This helps you by removing the excess oil that makes filaments look dark and noticeable and forming a protective barrier that stops you from picking at your nose and keeps bacteria out. The result, lighter looking dots and smoother pores made in Korea with a 60 day money back guarantee. Try these view nose patches today for less visible dark dots on your nose.

**Traducción (español de España):** ¿Funcionan de verdad los parches de nariz para esos puntitos oscuros? Has intentado apretarte la nariz para sacarlos, pero eso solo te deja marca y los hace más oscuros y visibles. Así que, en vez de eso, llevas un parche toda la noche. ¿Por qué iba a ser mejor? Bueno, en la mayoría de los casos esos puntitos no son puntos negros: son filamentos sebáceos, los canales naturales de grasa de tus poros, llenos de grasa. Tu nariz produce grasa de más y el parche está seco, y eso crea un gradiente de humedad: la grasa quiere pasar de la zona húmeda a la seca. Así que el parche absorbe el exceso de grasa de tus poros. Pero ojo: si fuera un parche normal, esa grasa no tendría adónde ir y se quedaría en tu piel empeorándolo. Estos parches son de hidrocoloide, un gel: la grasa toca el gel, el gel reacciona con ella, la absorbe y el parche se vuelve blanco o turbio, lo que te enseña que está funcionando. Eso te ayuda quitando el exceso de grasa que hace que los filamentos se vean oscuros, y formando una barrera que evita que te toques la nariz y que entren bacterias. El resultado: puntitos más claros y poros más lisos. Hechos en Corea, con 60 días de garantía. Prueba hoy los parches de Vue para que se te noten menos los puntitos de la nariz.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho pregunta | Do nose patches actually work for those dark dots? | Parche en la nariz (inferido). | Pregunta escéptica que el espectador se hace; promete respuesta. |
| 3–12 | objeción y contra-pregunta | squeezing… scars your skin… So instead, you wear a patch overnight. Why is that any better? | Gesto de apretar; parche (inferido). | Anticipa el escepticismo. |
| 12–30 | mecanismo físico | moisture gradient… oil wants to move from a wet area to a dry area | Esquema o texto en pantalla (inferido). | Explicación causal que da autoridad sin médicos. |
| 30–46 | diferenciación + prueba visual explicada | if it were a normal patch… But these patches are hydrocolloid… turning the patch white or cloudy which shows you it's working | Parche blanquecino (inferido). | Convierte el blanqueo en prueba objetiva. |
| 46–58 | beneficios secundarios | protective barrier that stops you from picking… keeps bacteria out | Parche puesto de noche (inferido). | Añade valor. |
| 58–64 | resultado + garantía + cta | lighter looking dots and smoother pores… 60 day money back guarantee | Web (inferido). | Cierre. |

**Gancho (Pregunta escéptica):** «Do nose patches actually work for those dark dots?» → «¿Funcionan de verdad los parches de nariz para esos puntitos?». Es la pregunta exacta que se hace quien ya ha visto otros anuncios de parches: capta a la audiencia «caliente» que necesita una razón, no otra promesa.

**Reencuadre:** De «el parche saca suciedad» a «el parche crea un gradiente que mueve la grasa»: convierte magia en física.

**Mecanismo:** El más completo de la cuenta: gradiente de humedad + gel que reacciona + blanqueo como evidencia + barrera anti-toqueteo. Es el único que explica POR QUÉ el parche se pone blanco.

**Prueba:** El blanqueo del parche presentado como indicador objetivo («shows you it's working») · Resultado honesto: puntitos «más claros», poros «más lisos»

**Objeciones resueltas:** «¿Por qué un parche iba a ser mejor que apretar?» → apretar deja marca · «¿No es un parche cualquiera?» → hidrocoloide vs parche normal · «¿Cómo sé que hace algo?» → se vuelve blanco

**Disparadores emocionales:** Curiosidad intelectual, Confianza por comprensión

**Técnicas:** Pregunta retórica escéptica · Explicación causal (mecanismo) · Prueba objetiva (cambio de color) · Comparación con alternativa inferior · Promesa moderada

| Frase (EN) | Adaptación (ES) |
|---|---|
| Do nose patches actually work for those dark dots? | ¿Funcionan de verdad los parches de nariz? |
| Why is that any better? | ¿Y por qué eso iba a ser mejor? |
| oil wants to move from a wet area to a dry area | la grasa quiere pasar de donde hay humedad a donde no la hay |
| turning the patch white or cloudy which shows you it's working | el parche se pone blanco: así ves que está funcionando |
| lighter looking dots and smoother pores | puntitos más claros y poros más lisos |

**Oferta y cierre:** 60 días; titulares «No More Nose Bumps», «Wake Up To Clearer Skin».

**Por qué funciona:** Con 21 anuncios y 42 variantes, es el guion «racional» más exitoso: no cuenta una historia, explica un mecanismo. Funciona porque convierte el momento de prueba (el parche blanco por la mañana) en algo comprensible y por tanto creíble, y porque está escrito para el espectador que ya vio otros anuncios y quiere saber por qué. Su duración (64 s) va contra la media, pero la retención la sostiene la estructura de pregunta-respuesta encadenada («¿por qué iba a ser mejor?», «pero ojo…»). Es el guion perfecto para Álex y para retargeting.

**Qué se copia para NOCTA:** La explicación del blanqueo como prueba objetiva (nadie más lo hace y NOCTA puede grabarlo) · La cadena de preguntas · Promesa moderada («más claros», «más lisos»)

**Lo que no se puede decir en España y su alternativa:** «keeps bacteria out» → «protege la zona» (no hacer afirmaciones antibacterianas) · «Made in Korea» → condicional

**Adaptación a España:** Álex principalmente; también retargeting. «Gradiente de humedad» se puede decir en español; mejor «la grasa se va hacia donde está seco».

### 6. No More Nose Bumps — «Tienes estos puntitos en la nariz y crees que puedes sacarlos apretando. Por favor, no.»

**Métricas:** 14 anuncios · 10 grabaciones · 957 días acumulados · máx. 171 días · 23 variantes · landing hydrocolloid-nose-patches · 2025-10-10 → 2026-05-15 · 39 s

**Señales de conversión:** 14 anuncios, 10 vídeos, 23 variantes, 957 días (oct 2025–may 2026); la familia (R14, R27, R33, R49) suma ≈ 39 anuncios más.

**Transcripción (inglés):** You have these black dots on your nose and you might think you can squeeze them out. Please don't because they're not exactly what you think. Inside your pores, there are these tiny tubes producing oil, dead skin cells, and bacteria. Subacious filament. Now you might think you can apply a sticky pore strip and just pull them out, but that only clears the very top. That's where hydrocholoid nose patches come in. They work like a magnet to pull out while you're asleep and keep your pores clear. They gently absorb what stuck inside the pore without ripping your skin or damaging your barrier. Get these patches from view a brand that creates products backed by scientific research. You can also benefit from the exclusive discount when you click the link below.

**Traducción (español de España):** Tienes esos puntos negros en la nariz y a lo mejor crees que puedes sacarlos apretando. Por favor, no, porque no son exactamente lo que piensas. Dentro de tus poros hay unos tubitos que producen grasa, células muertas y bacterias: el filamento sebáceo. Ahora pensarás que puedes ponerte una tira pegajosa y arrancarlos, pero eso solo limpia la capa de arriba. Ahí es donde entran los parches de nariz de hidrocoloide. Funcionan como un imán, sacándolo todo mientras duermes y manteniendo los poros limpios. Absorben con suavidad lo que está atascado dentro del poro sin arrancarte la piel ni dañar la barrera. Consigue estos parches de Vue, una marca que crea productos respaldados por investigación científica. Además tienes un descuento exclusivo si pinchas abajo.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho «por favor, no» | You have these black dots on your nose and you might think you can squeeze them out. Please don't | Nariz y dedos (inferido). | Tono de amigo que avisa; «por favor» baja la defensa. |
| 4–14 | anatomía | Inside your pores, there are these tiny tubes producing oil, dead skin cells, and bacteria | Esquema de poro (inferido). | Imagen mental concreta («tubitos»). |
| 14–21 | por qué falla la tira | a sticky pore strip… only clears the very top | Tira (inferido). | Contraste. |
| 21–31 | mecanismo (imán) | They work like a magnet to pull out while you're asleep | Parche puesto; parche retirado (inferido). | Metáfora memorable. |
| 31–39 | autoridad + oferta + cta | a brand that creates products backed by scientific research… exclusive discount when you click the link below | Web (inferido). | Cierre. |

**Gancho (Advertencia de amigo):** «You have these black dots on your nose and you might think you can squeeze them out. Please don't.» → «Tienes estos puntitos en la nariz y crees que puedes sacarlos apretando. Por favor, no.». Habla en segunda persona de algo que el espectador hace y le frena con un «por favor»: cercanía, no sermón.

**Reencuadre:** «Tubitos» que producen grasa: la anatomía como reencuadre.

**Mecanismo:** Imán que saca lo de dentro mientras duermes; la tira solo limpia arriba.

**Prueba:** Metáfora del imán (implica evidencia visual) · «Backed by scientific research» (autoridad genérica)

**Objeciones resueltas:** «Apretar funciona» → no, es un tubo que se rellena · «Las tiras lo sacan» → solo la capa de arriba · «¿Me dañará?» → sin arrancar ni dañar la barrera

**Disparadores emocionales:** Cercanía, Curiosidad anatómica

**Técnicas:** Advertencia empática · Imagen mental concreta (tubitos) · Metáfora (imán) · Contraste tira vs parche · Autoridad de marca · Descuento exclusivo

| Frase (EN) | Adaptación (ES) |
|---|---|
| Please don't because they're not exactly what you think. | Por favor, no. No son lo que crees. |
| tiny tubes producing oil, dead skin cells, and bacteria | tubitos que fabrican grasa, células muertas y bacterias |
| that only clears the very top | eso solo limpia la capa de arriba |
| They work like a magnet | Funcionan como un imán |

**Oferta y cierre:** Descuento exclusivo por enlace; titulares «No More Nose Bumps», «Finally Clear Skin for Guys».

**Por qué funciona:** Es el guion más regrabado después del nº 1 (10 vídeos) y el que más versiones por edad y sexo generó (R14 «stop treating…», R27 «women over 40», R33 «girls in their 20s», R49). Su fuerza es la imagen mental: «tubitos» + «imán» son dos metáforas que cualquiera entiende y recuerda, y hacen innecesaria la palabra hidrocoloide. En 39 segundos hay advertencia, anatomía, contraste y solución: es el guion más denso por segundo del ranking, ideal para quien no aguanta 60 s.

**Qué se copia para NOCTA:** «Por favor, no» como gancho de amigo · Metáforas «tubitos» e «imán» · Versiones por edad/sexo del mismo guion

**Lo que no se puede decir en España y su alternativa:** «backed by scientific research» → solo si hay estudio; alternativa: «hidrocoloide, el mismo material de los apósitos» · «bacteria» → mantener como descripción general, sin claim antibacteriano

**Adaptación a España:** Bea (versión 20s) y Marisol (40+). «Tubitos» funciona muy bien en español.

### 7. From Oily Nose to Clear Skin — «Mi piel es un filtro andante, pero lo voy a arreglar.»

**Métricas:** 12 anuncios · 3 grabaciones · 1056 días acumulados · máx. 289 días · 14 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-06-08 · 55 s

**Señales de conversión:** 12 anuncios, 3 vídeos, 14 variantes, 1.056 días, con el 2.º anuncio más longevo (289 días, jun 2025–jun 2026).

**Transcripción (inglés):** My skin's a catfish, but I'm about to fix it. I used to edit every single selfie to hide my pores that made my nose look like a strawberry. Nothing worked, not the harsh products, not the expensive treatments, not even professional facials. I was spending hundreds on products just to damage my skin. Then I discovered View Swiss Nose Patches on TikTok. These patches use advanced hydrocollar technology from Korea. They gently extract impurities while you sleep. The first morning, I couldn't believe what I saw on the patch. All those white spots, that's what was clogging my pores. I've been using them consistently for three months now. My skin is clearer than ever. No editing or filters needed anymore. The best part, they're gentle enough for sensitive skin and don't damage the skin barrier. Just cleanse, apply the patch before bed, and wake up to visibly clearer pores. You can even see results after the first use. And they have a 60 day satisfaction guarantee. View Swiss will send you a full refund if you're not completely satisfied. Shop now and join thousands of others who've discovered the secret to naturally clear pores.

**Traducción (español de España):** Mi piel es un catfish (un engaño), pero lo voy a arreglar. Editaba cada selfie para tapar los poros que hacían que mi nariz pareciera una fresa. Nada funcionaba: ni los productos agresivos, ni los tratamientos caros, ni las limpiezas profesionales. Me gastaba cientos en productos solo para dañarme la piel. Entonces descubrí los parches de nariz de Vue en TikTok. Usan tecnología de hidrocoloide avanzada de Corea y extraen las impurezas con suavidad mientras duermes. La primera mañana no me podía creer lo que vi en el parche: todos esos puntos blancos eran lo que me taponaba los poros. Llevo tres meses usándolos con constancia. Mi piel está más limpia que nunca. Ya no necesito editar ni filtros. Lo mejor: son suaves con la piel sensible y no dañan la barrera. Solo limpia, ponte el parche antes de dormir y despierta con los poros visiblemente más limpios. Se ven resultados desde el primer uso. Y tienen 60 días de garantía de satisfacción: te devuelven todo el dinero si no quedas satisfecho. Compra ahora y únete a miles de personas que han descubierto el secreto de unos poros limpios de forma natural.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho confesión | My skin's a catfish, but I'm about to fix it. | Selfie editada vs cara real (inferido). | Confesión con vocabulario de la cultura de redes. |
| 3–12 | dolor | I used to edit every single selfie… nose look like a strawberry… spending hundreds on products just to damage my skin | App de retoque; botes (inferido). | Dolor de identidad (fotos) + dinero perdido. |
| 12–19 | descubrimiento | discovered Vue Swiss Nose Patches on TikTok… hydrocolloid technology from Korea | Caja (inferido). | Origen creíble (TikTok). |
| 19–27 | prueba visual | The first morning, I couldn't believe what I saw on the patch. All those white spots | Parche usado en macro (inferido). | Peel reveal. |
| 27–37 | resultado de identidad | three months… No editing or filters needed anymore | Selfie sin filtro (inferido). | Beneficio real. |
| 37–48 | uso + resultado rápido | Just cleanse, apply the patch before bed… results after the first use | Rutina (inferido). | Facilidad. |
| 48–55 | garantía + cta | 60 day satisfaction guarantee… full refund… join thousands | Web (inferido). | Cierre. |

**Gancho (Confesión de identidad):** «My skin's a catfish, but I'm about to fix it.» → «Mi piel es un filtro andante, pero lo voy a arreglar.». Es la única historia en primera persona que dura (289 días) porque empieza con la prueba (selfie editada vs real), no con la biografía; y usa el vocabulario de la audiencia (catfish).

**Reencuadre:** El problema no es la nariz, es vivir con filtro.

**Mecanismo:** Hidrocoloide de Corea que extrae mientras duermes (mínimo).

**Prueba:** Peel reveal en la primera mañana («puntos blancos») · 3 meses de uso · Selfie sin filtro

**Objeciones resueltas:** «Es caro» → gastaba cientos en cosas peores · «Piel sensible» → suave, no daña la barrera · «¿Tarda?» → resultados desde el primer uso (ojo, claim)

**Disparadores emocionales:** Vergüenza de las fotos, Liberación (sin filtros), Pertenencia (miles)

**Técnicas:** Confesión · Metáfora cultural (catfish, fresa) · Peel reveal · Beneficio de identidad · Reversión de riesgo · Prueba social

| Frase (EN) | Adaptación (ES) |
|---|---|
| My skin's a catfish | Mi piel es un filtro andante |
| nose look like a strawberry | la nariz como una fresa |
| spending hundreds on products just to damage my skin | gastándome cientos de euros en dañarme la piel |
| All those white spots, that's what was clogging my pores | todos esos puntos blancos eran lo que me taponaba los poros |
| No editing or filters needed anymore | Ya no necesito filtros |

**Oferta y cierre:** 30 % en Black Friday; 60 días; «join thousands».

**Por qué funciona:** Vue tiene cientos de anuncios de «historia personal» y casi todos mueren en una semana; este duró 289 días y se regrabó 3 veces. La diferencia: la primera frase es una prueba (selfie editada) y una metáfora que la audiencia usa (catfish), y el dolor es social (fotos), no dermatológico. Además coloca el peel reveal en el segundo 20 y vende el resultado como identidad («sin filtros»). Es el modelo para cualquier historia en primera persona de NOCTA: empieza por la prueba, no por «yo antes…».

**Qué se copia para NOCTA:** Empezar una historia con la prueba (selfie editada vs real) · «Filtro andante» / «nariz de fresa» · Peel reveal en el segundo 20 · Beneficio: fotos sin filtro

**Lo que no se puede decir en España y su alternativa:** «results after the first use» (resultados desde el primer uso) → «desde la primera noche ves lo que sale en el parche» · «naturally clear pores» → «poros más limpios»

**Adaptación a España:** Bea. «Catfish» no se entiende en España: «filtro andante» o «mi cara con filtro y sin filtro».

### 8. From Oily Nose to Clear Skin — «Las tiras de poros son una estafa. Esto es lo que funciona.»

**Métricas:** 12 anuncios · 3 grabaciones · 1006 días acumulados · máx. 290 días · 13 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-13 · 47 s

**Señales de conversión:** 12 anuncios, 3 vídeos, 13 variantes, 1.006 días; 290 días de vida máxima (jun 2025–may 2026).

**Transcripción (inglés):** Poor strips are a scam. Here's what actually works. If you have tried every scrub, cleanser, and poor strip out there in your blackheads, still won't budge. I promise it's not you. Here's what's actually happening. Oil, dirt, dead skin, they get trapped in your pores. Oxidize, then turn dark. That's a blackhead. And ripping off a poor strip isn't solving the problem. It's just taking the top layer with it. What actually works? Hydrocolloid nose patches. They actually pull out the gunk from the sores without irritation or pain. Lap one on before bed, wake up, and see the difference. I would use them consistently because your pores will stay clear. If you are over the trial and error, try new swiss nose patches. They have a 60-day money-back guarantee, no gimmicks, just something that actually works.

**Traducción (español de España):** Las tiras de poros son una estafa. Esto es lo que funciona de verdad. Si has probado todos los exfoliantes, limpiadores y tiras del mercado y los puntos negros siguen ahí, te prometo que no eres tú. Esto es lo que pasa en realidad: grasa, suciedad y piel muerta se quedan atrapadas en los poros, se oxidan y se oscurecen. Eso es un punto negro. Y arrancar una tira no resuelve el problema: solo se lleva la capa de arriba. ¿Qué funciona de verdad? Los parches de nariz de hidrocoloide. Sacan de verdad la porquería de los poros, sin irritación ni dolor. Te pones uno antes de dormir, te despiertas y ves la diferencia. Yo los uso con constancia porque así los poros se mantienen limpios. Si estás harta de probar cosas, prueba los parches de nariz de Vue. Tienen 60 días de garantía de devolución, sin trucos, solo algo que funciona.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho ataque | Pore strips are a scam. Here's what actually works. | Tira de poros en la mano (inferido). | Ataque frontal a lo que el espectador usa + promesa de alternativa. |
| 3–11 | absolución | If you have tried every scrub… I promise it's not you. | Productos (inferido). | Alivio. |
| 11–22 | explicación | Oil, dirt, dead skin… oxidize, then turn dark… ripping off a pore strip… just taking the top layer | Tira arrancada (inferido). | Mecanismo del problema y del fallo de la tira. |
| 22–33 | solución + prueba | Hydrocolloid nose patches… pull out the gunk… without irritation or pain. Slap one on before bed, wake up, and see the difference. | Parche puesto/quitado (inferido). | Solución simple + prueba visual. |
| 33–47 | constancia + garantía | use them consistently… 60-day money-back guarantee, no gimmicks | Web (inferido). | Cierre honesto. |

**Gancho (Ataque a la alternativa):** «Pore strips are a scam. Here's what actually works.» → «Las tiras de poros son una estafa. Esto es lo que funciona.». «Estafa» es una palabra fuerte sobre un producto que el espectador tiene en el baño; la segunda frase promete la solución.

**Reencuadre:** La tira no falla por ti: falla porque solo quita la capa de arriba.

**Mecanismo:** Saca lo de dentro sin irritación; «ponte uno, despierta, mira».

**Prueba:** «Despierta y ve la diferencia» (visual) · «Yo los uso con constancia» (uso real) · «Sin trucos» (garantía)

**Objeciones resueltas:** «Ya uso tiras» → son una estafa · «No soy constante» → con constancia se mantienen limpios · «Otro anuncio con truco» → sin trucos

**Disparadores emocionales:** Indignación (estafa), Alivio (no eres tú)

**Técnicas:** Enemigo común (tiras) · Absolución · Explicación simple · Simplicidad de uso · Honestidad («no gimmicks»)

| Frase (EN) | Adaptación (ES) |
|---|---|
| Pore strips are a scam. | Las tiras de poros son una estafa. |
| I promise it's not you. | Te lo prometo: no eres tú. |
| It's just taking the top layer with it. | Solo se lleva la capa de arriba. |
| Slap one on before bed, wake up, and see the difference. | Te pones uno, duermes y por la mañana lo ves. |
| no gimmicks, just something that actually works | sin trucos, solo algo que funciona |

**Oferta y cierre:** 30 % (Black Friday) + 60 días.

**Por qué funciona:** El anuncio más longevo de la familia anti-tiras (290 días). Ataca al producto que el 65 % de los vídeos de Vue atacan, pero lo hace en 3 palabras y con la alternativa en la misma frase. Funciona porque el enemigo es concreto y está en casa del espectador, porque absuelve («no eres tú») y porque explica en 10 segundos por qué la tira falla. Es corto (47 s), sin historia, y cierra con una honestidad («sin trucos») que compensa la agresividad del gancho.

**Qué se copia para NOCTA:** Gancho de enemigo común con alternativa en la misma frase · «No eres tú» · Contraste físico tira vs parche (grabable con una tira de farmacia)

**Lo que no se puede decir en España y su alternativa:** «scam» → «no sirven» / «te están engañando» sin nombrar marcas · Descripción de puntos negros con «bacteria» no aparece: bien

**Adaptación a España:** Todos los avatares. «Estafa» es fuerte pero legal si no se nombra marca; alternativa suave: «las tiras no funcionan, y te explico por qué».

### 9. From Oily Nose to Clear Skin — «¿Sigues con los poros tapados? Estas tres señales explican por qué.»

**Métricas:** 12 anuncios · 3 grabaciones · 983 días acumulados · máx. 290 días · 21 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-06-03 · 35 s

**Señales de conversión:** 12 anuncios, 3 vídeos, 21 variantes, 983 días; 290 días máximo.

**Transcripción (inglés):** Still dealing with clogged pores? These three red flags explain why. One, you're seeing blackheads or clogged pores that just won't budge. Two, pores appear larger or more visible over time. Three, your nose looks shiny or feels greasy even after cleansing. Don't worry, there's a better way to deal with stubborn pores and impurities. View Swiss nose patches are designed to gently draw out impurities and reduce the appearance of pores over time. Unlike traditional pore strips, they're not irritating. Don't leave sticky residue and work with your skin. Not against it. If you're ready to ditch the ineffective treatments and take your pore care to the next level, try View Swiss Nose Patches now and get 30% off. Your skin will thank you.

**Traducción (español de España):** ¿Sigues con los poros obstruidos? Estas tres señales de alarma explican por qué. Una: ves puntos negros o poros tapados que no se van. Dos: los poros parecen más grandes o más visibles con el tiempo. Tres: la nariz se te ve brillante o grasa incluso después de lavarte. Tranquila, hay una forma mejor de tratar los poros rebeldes y las impurezas. Los parches de nariz de Vue están diseñados para extraer las impurezas con suavidad y reducir la apariencia de los poros con el tiempo. A diferencia de las tiras tradicionales, no irritan, no dejan residuo pegajoso y trabajan con tu piel, no contra ella. Si estás lista para dejar los tratamientos que no funcionan y llevar tu cuidado de poros al siguiente nivel, prueba ahora los parches de Vue con un 30 % de descuento. Tu piel te lo agradecerá.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho pregunta + listicle | Still dealing with clogged pores? These three red flags explain why. | Rótulo «3 red flags» (inferido). | Pregunta + promesa de lista. |
| 3–15 | las 3 señales | One… Two… Three, your nose looks shiny or feels greasy even after cleansing | Nariz brillante, poros (inferido). | Auto-diagnóstico: el espectador se identifica con al menos una. |
| 15–25 | solución | designed to gently draw out impurities and reduce the appearance of pores over time | Parche (inferido). | Promesa moderada («appearance», «over time»). |
| 25–31 | contraste | Unlike traditional pore strips, they're not irritating. Don't leave sticky residue | Tira vs parche (inferido). | Diferenciación. |
| 31–35 | oferta + cta | 30% off. Your skin will thank you. | Web (inferido). | Cierre. |

**Gancho (Pregunta + listicle):** «Still dealing with clogged pores? These three red flags explain why.» → «¿Sigues con los poros tapados? Estas tres señales explican por qué.». Pregunta que califica + promesa de tres razones: estructura de retención.

**Reencuadre:** Tus síntomas son señales de un mismo problema.

**Mecanismo:** Mínimo: extrae impurezas, reduce la apariencia con el tiempo.

**Prueba:** Ninguna visual explícita; la fuerza es el auto-diagnóstico

**Objeciones resueltas:** «¿Es para mí?» → si tienes 1 de 3 señales, sí · «Las tiras irritan» → no irrita, sin residuo

**Disparadores emocionales:** Reconocimiento (brillo a media mañana), Esperanza

**Técnicas:** Auto-diagnóstico en lista · Promesa moderada · Contraste · Descuento

| Frase (EN) | Adaptación (ES) |
|---|---|
| These three red flags explain why. | Estas tres señales explican por qué. |
| your nose looks shiny or feels greasy even after cleansing | la nariz te brilla aunque te la acabes de lavar |
| work with your skin, not against it | trabajan con tu piel, no contra ella |
| Your skin will thank you. | Tu piel te lo va a agradecer. |

**Oferta y cierre:** 30 % (Black Friday) + garantía en el texto.

**Por qué funciona:** 290 días con 21 variantes: el listicle más longevo. Funciona porque el auto-diagnóstico de tres señales hace que casi cualquier persona con piel mixta se sienta aludida (el brillo tras lavarse es universal), y porque promete poco («reducir la apariencia con el tiempo»), lo que evita decepciones. Es el mismo guion del vídeo orgánico más visto de Vue en TikTok, lo que sugiere que se probó orgánicamente antes de pagarlo.

**Qué se copia para NOCTA:** Tres señales como auto-diagnóstico (brillo, poros más grandes, puntos que vuelven) · Promesa moderada · Probar orgánico antes de pagar

**Lo que no se puede decir en España y su alternativa:** «reduce the appearance of pores over time» es correcto en UE (apariencia)

**Adaptación a España:** Marisol. «Tranquila, hay una forma mejor» en femenino para ella; neutro para Reels.

### 10. From Oily Nose to Clear Skin — «Iba a hacerme un láser para los poros hasta que descubrí esto.»

**Métricas:** 10 anuncios · 3 grabaciones · 969 días acumulados · máx. 291 días · 11 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-15 · 61 s

**Señales de conversión:** 10 anuncios, 3 vídeos, 11 variantes, 969 días; 291 días de vida máxima (el más longevo).

**Transcripción (inglés):** I was ready to do laser for my nose pores until I discovered this one game-changing solution. Ever noticed how your pores seem to get more visible no matter what you try? According to research, harsh treatments and aggressive scrubbing can actually damage your skin's barrier, leading to inflammation and making pores appear even larger. But let's be honest, nobody wants to deal with visible pores. They can make you feel so self-conscious, especially in photos. Here's the good news, you can actually minimize the appearance of pores without damaging your skin. You just need to gently dry out impurities overnight. My dermatologist recommended these innovative nose patches that work by using advanced hydrocolloid technology to absorb excess oil and debris while you sleep. The difference is incredible. Look at my before and after photos since switching to these patches. The patches are specially designed to be gentle yet effective, pulling out impurities without harsh stripping or irritation. You can actually see what comes out on the patch the next morning. This was a total game-changer for me. Check out View Swiss Nose Patches today and see why thousands of customers are calling these patches their holy grail pore solution. Your skin deserves this level of care.

**Traducción (español de España):** Estaba a punto de hacerme un láser para los poros de la nariz hasta que descubrí esta solución que lo cambia todo. ¿Te has fijado en que los poros se ven más por mucho que hagas? Según los estudios, los tratamientos agresivos y frotar fuerte pueden dañar la barrera de la piel, provocar inflamación y hacer que los poros parezcan aún más grandes. Pero seamos sinceros: nadie quiere poros visibles. Te hacen sentir cohibida, sobre todo en las fotos. La buena noticia es que puedes minimizar la apariencia de los poros sin dañar la piel: solo necesitas secar las impurezas con suavidad durante la noche. Mi dermatóloga me recomendó estos parches de nariz innovadores que usan tecnología de hidrocoloide avanzada para absorber el exceso de grasa y residuos mientras duermes. La diferencia es increíble. Mira mis fotos de antes y después desde que uso estos parches. Están diseñados para ser suaves pero eficaces, sacando impurezas sin arrancar ni irritar. Puedes ver lo que sale en el parche a la mañana siguiente. Para mí fue un antes y un después. Echa un vistazo a los parches de Vue y descubre por qué miles de clientas los llaman su solución definitiva para los poros. Tu piel se merece este nivel de cuidado.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho anti-láser | I was ready to do laser for my nose pores until I discovered this | Clínica / presupuesto (inferido). | Ancla de precio alto (láser) y promesa. |
| 4–18 | problema + ciencia | harsh treatments and aggressive scrubbing can actually damage your skin's barrier | Rótulo «según estudios» (inferido). | Autoridad. |
| 18–26 | dolor social | They can make you feel so self-conscious, especially in photos. | Foto (inferido). | Emoción. |
| 26–40 | solución con autoridad | My dermatologist recommended these… hydrocolloid technology… while you sleep | Parche (inferido). | Autoridad médica (no permitida en España sin prueba). |
| 40–52 | prueba | Look at my before and after photos… You can actually see what comes out on the patch | Antes/después + parche usado (inferido). | Doble prueba. |
| 52–61 | prueba social + cta | thousands of customers… holy grail… Your skin deserves this level of care | Web (inferido). | Cierre aspiracional. |

**Gancho (Anti-tratamiento caro):** «I was ready to do laser for my nose pores until I discovered this one game-changing solution.» → «Iba a hacerme un láser para los poros hasta que descubrí esto.». El láser es la opción cara y temida: anclarlo hace que un parche parezca barato y sensato.

**Reencuadre:** Lo agresivo empeora los poros; lo suave funciona.

**Mecanismo:** Hidrocoloide que absorbe grasa y residuos de noche.

**Prueba:** Antes/después · Parche usado visible · Miles de clientas

**Objeciones resueltas:** «¿Un parche va a poder con lo que ni el láser?» → el láser daña la barrera · «¿Es serio?» → dermatóloga (claim a cambiar)

**Disparadores emocionales:** Miedo al daño, Vergüenza en fotos, Aspiración («tu piel se lo merece»)

**Técnicas:** Anclaje de precio (láser) · Autoridad (estudios, dermatóloga) · Doble prueba · Cierre aspiracional

| Frase (EN) | Adaptación (ES) |
|---|---|
| I was ready to do laser… until I discovered this | Iba a hacerme un láser hasta que descubrí esto |
| harsh treatments… making pores appear even larger | los tratamientos agresivos hacen que los poros se vean más grandes |
| You can actually see what comes out on the patch the next morning. | Por la mañana ves en el parche lo que ha salido. |
| Your skin deserves this level of care. | Tu piel se merece este cuidado. |

**Oferta y cierre:** 30 % + garantía; 291 días.

**Por qué funciona:** El ancla del láser (300–600 € en España) hace que 16,95 € parezca una ganga y da un motivo racional para el parche (no dañar la barrera). Con 291 días es el anuncio más longevo de la cuenta. Ojo: apoya la credibilidad en «mi dermatóloga me lo recomendó», que en España no se puede usar sin sustento; el guion sobrevive sin esa frase si se sustituye por el ancla económica y la prueba visual.

**Qué se copia para NOCTA:** Anclaje con precio real de láser/limpieza en cabina en España · Doble prueba (antes/después + parche usado) · Cierre aspiracional

**Lo que no se puede decir en España y su alternativa:** «My dermatologist recommended» → quitar; «según estudios» solo si se cita; alternativa: «el hidrocoloide es el material de los apósitos: absorbe sin agredir»

**Adaptación a España:** Marisol (35–50), la que se plantea tratamientos en cabina.

### 11. From Oily Nose to Clear Skin — «Por qué la cosmética coreana va diez años por delante»

**Métricas:** 11 anuncios · 1 grabaciones · 990 días acumulados · máx. 290 días · 12 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-15 · 33 s

**Señales de conversión:** 11 anuncios, 1 vídeo, 12 variantes, 990 días.

**Transcripción (inglés):** why Korean skincare is 10 years ahead of European techniques. European skincare focuses on surface cleansing, but Korean beauty experts know the real problem lies deeper. While European products wash away surface oils, these Korean pore patches go further. These hydrocolloid patches actually extract what's hiding inside your pores. Compare the results yourself. Traditional cleansing versus overnight extraction. One leaves impurities behind, the other removes them completely. That's why K-Beauty enthusiasts swear by these patches for truly clear skin. Compare the patches from View Swiss because they offer a money-back guarantee if you're not happy with the results.

**Traducción (español de España):** Por qué la cosmética coreana va diez años por delante de las técnicas europeas. La europea se centra en limpiar la superficie, pero los expertos coreanos saben que el problema real está más abajo. Mientras los productos europeos lavan la grasa de la superficie, estos parches coreanos van más allá: extraen lo que se esconde dentro de los poros. Compara los resultados: limpieza tradicional frente a extracción nocturna. Una deja impurezas; la otra las saca. Por eso las fans de la K-beauty juran por estos parches. Prueba los de Vue: tienen garantía de devolución si no quedas contenta.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho tesis | why Korean skincare is 10 years ahead of European techniques | Rótulo (inferido). | Afirmación provocadora con autoridad de categoría. |
| 3–15 | contraste superficie/profundo | European skincare focuses on surface cleansing… Korean… the real problem lies deeper | Pantalla partida (inferido). | Reencuadre geográfico. |
| 15–26 | comparación visual | Compare the results yourself. Traditional cleansing versus overnight extraction. | Comparativa (inferido). | Prueba. |
| 26–33 | prueba social + garantía | K-Beauty enthusiasts swear by these… money-back guarantee | Web (inferido). | Cierre. |

**Gancho (Tesis provocadora (Corea vs Europa)):** «why Korean skincare is 10 years ahead of European techniques» → «Por qué la cosmética coreana va diez años por delante». Una afirmación con número que el público de K-beauty ya cree y el resto quiere refutar.

**Reencuadre:** Superficie vs profundidad.

**Mecanismo:** Extracción nocturna vs limpieza.

**Prueba:** Comparación visual

**Objeciones resueltas:** «Ya limpio mi cara» → limpias la superficie

**Disparadores emocionales:** Aspiración K-beauty, Curiosidad

**Técnicas:** Autoridad de categoría · Contraste binario · Prueba social de tribu

| Frase (EN) | Adaptación (ES) |
|---|---|
| 10 years ahead | diez años por delante |
| the real problem lies deeper | el problema está más abajo |
| One leaves impurities behind, the other removes them | Una lo deja dentro; la otra lo saca |

**Oferta y cierre:** Garantía; 30 % en el texto.

**Por qué funciona:** 33 segundos, un solo vídeo, 290 días: el guion más eficiente de la cuenta (nunca se regrabó y aun así duró casi un año). Funciona porque vende una categoría (K-beauty) y no un producto, y porque el contraste superficie/profundo es una idea que se entiende en 3 segundos. Para NOCTA solo sirve con producto coreano de verdad.

**Qué se copia para NOCTA:** Contraste superficie vs profundidad (sin necesidad de Corea) · Formato tesis + comparación

**Lo que no se puede decir en España y su alternativa:** Todo el ángulo Corea → condicional al lote coreano

**Adaptación a España:** Bea (K-beauty). Solo con lote coreano.

### 12. From Oily Nose to Clear Skin — «La mayoría de las mujeres cree que hay que apretarse los poros.»

**Métricas:** 9 anuncios · 3 grabaciones · 916 días acumulados · máx. 289 días · 10 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-17 · 34 s

**Señales de conversión:** 9 anuncios, 3 vídeos, 10 variantes, 916 días; 289 días.

**Transcripción (inglés):** Most women think they need to squeeze their pores when they're clogged. That's why we created a gentle patch that removes impurities without damaging your skin. Made in South Korea, the leading country in skincare innovation, we use an exclusive hydrocolloid formulation that clears nose pores without damaging the skin barrier. Other pore strips and skincare products are harsh, painful, and damage your moisture barrier. Our patches work while you sleep, gently drying out impurities. And they're perfectly sized for your nose. Use them overnight or during the day to significantly appear the poor appearance. The patches are available at viewswiz.com until it runs out of stock.

**Traducción (español de España):** La mayoría de las mujeres cree que tiene que apretarse los poros cuando están tapados. Por eso creamos un parche suave que elimina las impurezas sin dañar la piel. Hecho en Corea del Sur, el país líder en innovación en cuidado de la piel, usamos una formulación exclusiva de hidrocoloide que limpia los poros de la nariz sin dañar la barrera. Las tiras y otros productos son agresivos, duelen y dañan la barrera de hidratación. Nuestros parches trabajan mientras duermes, secando las impurezas con suavidad. Y tienen el tamaño perfecto para la nariz. Úsalos de noche o de día para mejorar de forma significativa la apariencia de los poros. Disponibles en vueswiss.com hasta agotar existencias.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho identidad + hábito | Most women think they need to squeeze their pores | Mujer apretándose (inferido). | Identidad + error. |
| 4–9 | voz de marca | That's why we created a gentle patch | Caja (inferido). | La marca como respuesta al hábito. |
| 9–20 | origen + exclusividad | Made in South Korea… exclusive hydrocolloid formulation | Producto (inferido). | Autoridad. |
| 20–28 | contraste | Other pore strips… harsh, painful, and damage your moisture barrier | Tira (inferido). | Diferenciación. |
| 28–34 | uso + escasez | overnight or during the day… until it runs out of stock | Web (inferido). | Cierre. |

**Gancho (Identidad + hábito erróneo):** «Most women think they need to squeeze their pores when they're clogged.» → «La mayoría de las mujeres cree que hay que apretarse los poros.». Igual que R2 pero sobre el hábito, no sobre el diagnóstico.

**Reencuadre:** Apretar → parche suave creado para eso.

**Mecanismo:** Formulación exclusiva de hidrocoloide; trabaja de noche.

**Prueba:** Ninguna visual: se apoya en origen y exclusividad

**Objeciones resueltas:** «Las tiras duelen» → suave

**Disparadores emocionales:** Confianza en la marca

**Técnicas:** Voz de marca («creamos») · Origen · Exclusividad · Escasez

| Frase (EN) | Adaptación (ES) |
|---|---|
| That's why we created a gentle patch | Por eso creamos un parche suave |
| perfectly sized for your nose | con el tamaño justo para la nariz |
| until it runs out of stock | hasta agotar existencias |

**Oferta y cierre:** Escasez; 30 % en el texto.

**Por qué funciona:** Único ganador en voz de marca («we created»). 289 días con un solo vídeo: demuestra que un anuncio de marca corto (34 s) funciona si arranca con el hábito del espectador y cierra con escasez. Sirve para retargeting y para el anuncio «de presentación» de NOCTA.

**Qué se copia para NOCTA:** Voz de marca para el anuncio de presentación («por eso hicimos NOCTA») · «Tamaño justo para la nariz» (60 × 45 mm) · Escasez real

**Lo que no se puede decir en España y su alternativa:** «exclusive formulation» → solo si es cierto · Corea → condicional

**Adaptación a España:** Marisol.

### 13. No More Nose Bumps — «no es suciedad, no son puntos negros, es grasa»

**Métricas:** 22 anuncios · 8 grabaciones · 782 días acumulados · máx. 117 días · 43 variantes · landing hydrocolloid-nose-patches · 2026-01-06 → 2026-08-13 · 40 s

**Señales de conversión:** 22 anuncios, 8 vídeos, 43 variantes, 782 días (ene–ago 2026); la versión larga R56 acumuló 418 días más.

**Transcripción (inglés):** If you see these dots on your nose, it's not dirt, it's not blackheads, it's oil buildup, called sebaceous filaments. That's probably why nothing you've tried has worked. Not the scrubs, not the strips, not the fancy cleansers. They're not solving the problem, they're just making your skin angrier. It's a cycle clear for a few hours, then the dots are back. That's because sebaceous filaments are oil channels that refill naturally. Here's what actually works. Hydrocolloid nose patches. They work like a magnet, absorb the excess oil from inside your pores while you sleep, no ripping, no redness, no daily battle. Check my before and after. Now I no longer wake up to the same old dots. They're on sale right now with a 60 day money back guarantee. So click below and finally get your nose under control.

**Traducción (español de España):** Si ves estos puntitos en la nariz: no es suciedad, no son puntos negros, es grasa acumulada, se llaman filamentos sebáceos. Probablemente por eso nada de lo que has probado ha funcionado. Ni los exfoliantes, ni las tiras, ni los limpiadores caros. No resuelven el problema: solo cabrean a tu piel. Es un ciclo: limpia unas horas y los puntitos vuelven. Porque los filamentos sebáceos son canales de grasa que se rellenan solos. Esto es lo que funciona de verdad: parches de nariz de hidrocoloide. Funcionan como un imán: absorben el exceso de grasa desde dentro del poro mientras duermes. Sin arrancar, sin rojeces, sin batalla diaria. Mira mi antes y después. Ya no me despierto con los mismos puntitos de siempre. Están de oferta ahora mismo con 60 días de garantía. Pincha abajo y controla tu nariz de una vez.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho triple negación | If you see these dots on your nose, it's not dirt, it's not blackheads, it's oil buildup | Macro nariz (inferido). | Tres negaciones rápidas: ritmo y reencuadre en 3 s. |
| 3–12 | absolución | That's probably why nothing you've tried has worked… they're just making your skin angrier | Botes (inferido). | No eres tú + los productos «cabrean» la piel. |
| 12–18 | ciclo | It's a cycle clear for a few hours, then the dots are back | Mañana/noche (inferido). | Recurrencia. |
| 18–29 | mecanismo imán | They work like a magnet, absorb the excess oil from inside your pores while you sleep, no ripping, no redness, no daily battle | Aplicación (inferido). | Solución + mantra. |
| 29–34 | prueba | Check my before and after. Now I no longer wake up to the same old dots. | Antes/después (inferido). | Visual. |
| 34–40 | oferta + cta | on sale right now with a 60 day money back guarantee. So click below and finally get your nose under control. | Web (inferido). | Cierre con verbo de control. |

**Gancho (Triple negación):** «it's not dirt, it's not blackheads, it's oil buildup» → «no es suciedad, no son puntos negros, es grasa». El ritmo de tres golpes y la corrección doble (no suciedad, no puntos negros) en 3 segundos: máxima información por segundo.

**Reencuadre:** Grasa que se rellena, no suciedad.

**Mecanismo:** Imán desde dentro, de noche; tres negaciones.

**Prueba:** Antes/después · «Ya no me despierto con los mismos puntitos»

**Objeciones resueltas:** «Es suciedad, me lavo más» → no es suciedad · «Vuelven» → ciclo · «Irrita» → sin rojeces

**Disparadores emocionales:** Alivio, Control («get your nose under control»)

**Técnicas:** Triple negación · Absolución · Metáfora imán · Mantra de tres · CTA con verbo de control

| Frase (EN) | Adaptación (ES) |
|---|---|
| it's not dirt, it's not blackheads, it's oil buildup | no es suciedad, no son puntos negros: es grasa |
| they're just making your skin angrier | solo cabrean a tu piel |
| finally get your nose under control | controla tu nariz de una vez |

**Oferta y cierre:** Oferta + 60 días + click below.

**Por qué funciona:** 22 anuncios y 43 variantes en 8 meses: la versión más compacta (40 s) de la plantilla maestra, con el gancho más rápido del ranking (tres negaciones). Se estiró a 115 s en R56 (11 anuncios, 88 días) y funcionó peor por segundo: la evidencia de que 40 s es el punto óptimo de esta estructura.

**Qué se copia para NOCTA:** Gancho de triple negación · «Cabrean a tu piel» · CTA «controla tu nariz» · Mantener 40 s

**Lo que no se puede decir en España y su alternativa:** Ninguno grave; «on sale» solo si hay oferta activa en el CRM

**Adaptación a España:** Todos. Muy bueno para Reels.

### 14. Stop Treating Blackheads Wrong — «Deja de tratarlos como puntos negros. Crees que puedes sacarlos apretando. Por favor, no»

**Métricas:** 9 anuncios · 5 grabaciones · 837 días acumulados · máx. 202 días · 10 variantes · landing hydrocolloid-nose-patches · 2025-10-10 → 2026-05-15 · 57 s

**Señales de conversión:** 9 anuncios, 5 vídeos, 10 variantes, 837 días; 202 días.

**Transcripción (inglés):** Stop treating these like blackheads. You might think you can squeeze them out. Please don't, because they're not exactly what you think. Inside your pores, there are these tiny two producing oil, dead skin cells, and bacteria. Subacious filament, totally normal. But when too much oil and dead skin pile up in that tube, it blocks the pore and oxidizes, so you get a blackhead. Now, you might think you can apply a sticky pore strip and just pull them out, but that only clears the very top and those blackheads keep coming back. Instead, if you want them gone, you have to clear your pores from the inside. That's where hydrocholoid nose patches come in. They work like a magnet to pull out build up while you sleep and keep your pores clear. Look at these before and after. The results are incredible. They gently absorb what stuck inside the pore without ripping your skin or damaging your barrier. Get these patches from view, a brand that creates products backed by scientific research. You can also benefit from their exclusive discount when you click the link below.

**Traducción (español de España):** 

**Gancho (Orden + advertencia (familia R6)):** «Stop treating these like blackheads. You might think you can squeeze them out. Please don't» → «Deja de tratarlos como puntos negros. Crees que puedes sacarlos apretando. Por favor, no». 

**Reencuadre:** 

**Mecanismo:** 

**Oferta y cierre:** 

**Por qué funciona:** Versión de 57 s del guion «tubitos + imán» (R6) que añade la explicación de cómo se forma un punto negro de verdad («cuando se acumula grasa y piel muerta, el tubo se bloquea y se oxida»): es la más didáctica de la familia y aguantó 202 días con 5 grabaciones. Cierra con «backed by scientific research», que en España se sustituye por el argumento del material (hidrocoloide = apósitos).

**Qué se copia para NOCTA:** Explicar la diferencia punto negro / filamento en 8 s · Antes/después + «los resultados son increíbles» (con visual real)

**Lo que no se puede decir en España y su alternativa:** «backed by scientific research» → material de apósitos

**Adaptación a España:** Todos.

### 15. From Oily Nose to Clear Skin — «Tres razones por las que me encantan y una por la que no»

**Métricas:** 12 anuncios · 1 grabaciones · 857 días acumulados · máx. 290 días · 16 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-15 · 40 s

**Señales de conversión:** 12 anuncios, 1 vídeo, 16 variantes, 857 días; 290 días.

**Transcripción (inglés):** Here are three reasons why I love hand patches and one reason why I don't. Number one, they work fast. And when I say fast, I mean you'll see your pores tighten and you're no smooth after just one use. Number two, the patches target sebaceous filaments where excess oil builds up. This is where reducing sebum is key for clearer, healthier skin in the long term. Number three, the patches don't contain alcohol-based or comdogenic ingredients, which is a big plus considering what other skincare brands put in their products. Their hydrocolloid formula is cruelty-free and gentle on the skin. And the one thing I don't love, my sister keeps stealing my patches to get rid of her clogged pores. The patches are currently 30% off for a limited time, so get them while they're still in stock.

**Traducción (español de España):** Tres razones por las que me encantan estos parches y una por la que no. Uno: funcionan rápido. Y cuando digo rápido es que ves los poros más cerrados y la nariz lisa con un solo uso. Dos: los parches van a por los filamentos sebáceos, donde se acumula el exceso de grasa; reducir el sebo es la clave de una piel más limpia a largo plazo. Tres: no llevan alcohol ni ingredientes comedogénicos, que ya es más de lo que ponen otras marcas en sus productos; su hidrocoloide es cruelty free y suave con la piel. Y lo que no me gusta: que mi hermana me los roba para quitarse ella los poros tapados. Ahora están con un 30 % de descuento por tiempo limitado, así que cógelos mientras queden.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho listicle con giro | Here are three reasons why I love these patches and one reason why I don't. | Caja en mano (inferido). | La «pega» anunciada crea curiosidad y credibilidad. |
| 3–12 | razón 1: rapidez | they work fast… after just one use | Nariz lisa (inferido). | Beneficio inmediato. |
| 12–24 | razón 2: mecanismo | target sebaceous filaments where excess oil builds up | Macro (inferido). | Racional. |
| 24–33 | razón 3: ingredientes | don't contain alcohol-based or comedogenic ingredients… cruelty-free | Etiqueta (inferido). | Seguridad. |
| 33–37 | la pega (humor) | my sister keeps stealing my patches | Hermana (inferido). | Prueba social disfrazada de queja. |
| 37–40 | oferta | 30% off for a limited time… while they're still in stock | Web (inferido). | Urgencia. |

**Gancho (Listicle con giro):** «three reasons why I love these patches and one reason why I don't» → «Tres razones por las que me encantan y una por la que no». La promesa de una pega desarma el escepticismo y obliga a quedarse hasta el final.

**Reencuadre:** Menos sebo = piel más limpia a largo plazo.

**Mecanismo:** Va a por el sebo de los filamentos.

**Prueba:** Un solo uso · Ingredientes · La hermana (prueba social)

**Objeciones resueltas:** «¿Tarda?» → un uso · «¿Lleva cosas malas?» → sin alcohol ni comedogénicos · «¿Es un anuncio?» → hay una pega

**Disparadores emocionales:** Humor, Confianza

**Técnicas:** Listicle · Pega falsa (humor) · Urgencia

| Frase (EN) | Adaptación (ES) |
|---|---|
| three reasons why I love… and one reason why I don't | tres razones por las que me encantan y una por la que no |
| my sister keeps stealing my patches | mi hermana me los roba |

**Oferta y cierre:** 30 % por tiempo limitado.

**Por qué funciona:** 290 días con un solo vídeo. La «pega» final es la técnica más elegante del ranking: convierte la prueba social en broma y hace que el anuncio parezca una opinión. La razón 1 (resultado en un uso) es un claim fuerte que en España hay que suavizar.

**Qué se copia para NOCTA:** Listicle con pega final (humor) · Argumento de ingredientes (sin activos, sin alcohol)

**Lo que no se puede decir en España y su alternativa:** «pores tighten after just one use» → «por la mañana ves en el parche lo que ha salido» · «cruelty-free» solo si se puede acreditar

**Adaptación a España:** Bea. La hermana/compañera de piso que roba parches es muy español.

### 16. Finally Clear Skin for Guys — «La mayoría de los tíos de más de 35 cree que esto son puntos negros. No lo son.»

**Métricas:** 7 anuncios · 3 grabaciones · 818 días acumulados · máx. 214 días · 17 variantes · landing hydrocolloid-nose-patches · 2025-10-03 → 2026-05-19 · 42 s

**Señales de conversión:** 7 anuncios, 3 vídeos, 17 variantes, 818 días; 214 días máximo.

**Transcripción (inglés):** Most guys over 35 think these are blackheads, they're not. They're called sebaceous filaments. Basically oil plugs that form naturally in your pores. And the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These view nose patches are made in Korea and they're specifically designed for sebaceous filaments, not blackheads, which is why they actually work. They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. I saw a huge improvement, and after three weeks, those dark spots were completely gone, check it out. Tons of guys finally understand why nothing worked before and now they're getting clear skin for the first time. They also offer a money back guarantee if you're not happy with the results.

**Traducción (español de España):** La mayoría de los tíos de más de 35 cree que esto son puntos negros. No lo son. Se llaman filamentos sebáceos… (resto idéntico al nº 1).

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho identidad (hombre +35) | Most guys over 35 think these are blackheads, they're not. | Hombre 35–45 señalando la nariz (inferido). | Segmento con edad. |
| 3–42 | resto | (idéntico al nº 1) | (idéntico) | Plantilla maestra. |

**Gancho (Identidad + edad + contradicción):** «Most guys over 35 think these are blackheads, they're not.» → «La mayoría de los tíos de más de 35 cree que esto son puntos negros. No lo son.». Nombrar edad y sexo en la primera frase filtra a la audiencia y la hace sentir aludida.

**Reencuadre:** El del nº 1.

**Mecanismo:** El del nº 1.

**Prueba:** Las del nº 1

**Objeciones resueltas:** Las del nº 1

**Disparadores emocionales:** Identidad masculina madura

**Técnicas:** Segmentación por edad y sexo en el gancho

| Frase (EN) | Adaptación (ES) |
|---|---|
| Most guys over 35 think these are blackheads | La mayoría de los tíos de más de 35 cree que esto son puntos negros |

**Oferta y cierre:** Garantía; «Finally Clear Skin for Guys».

**Por qué funciona:** Demuestra que el guion nº 1 vende también a hombres de 35+ (214 días, 17 variantes) sin cambiar nada más que la primera frase. Para NOCTA: Álex (y su versión 35+) se atiende con la misma plantilla.

**Qué se copia para NOCTA:** Versión Álex 35+ de la plantilla maestra

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

**Adaptación a España:** «Tíos» para Álex; «hombres» para 40+.

### 17. From Oily Nose to Clear Skin — «Si tus poros se ven así… o así»

**Métricas:** 8 anuncios · 1 grabaciones · 846 días acumulados · máx. 287 días · 15 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-16 · 53 s

**Señales de conversión:** 8 anuncios, 1 vídeo, 15 variantes, 846 días; 287 días.

**Transcripción (inglés):** If your pores look like this or like this, you're not taking care of them properly. Here are three ways to maintain clear pores without damaging your skin. 1. Large pores in blackheads happen when excess oil and dead skin cells get trapped. Using an overnight patch helps draw out these impurities while you sleep, keeping your pores clear and healthy. 2. Use a patch with hydrocolloid in it. I recommend using pore patches from View Swiss. They work like a magnet to gently pull out oil and impurities without scrubbing or squeezing. 3. Consistent use helps maintain clear pores long-term. These patches protect your skin's natural barrier while removing impurities, so your skin stays healthy and balanced. Plus, they're made in Korea, which is the leading country in skincare innovation. My skin feels like silk after I use it, and my pores are literally invisible. It's so satisfying to see the results on the patch in the morning. So if you're looking for better-looking pores overnight for less than the price of a mascara, you have got to try it. You will be so glad you did.

**Traducción (español de España):** Si tus poros se ven así o así, no los estás cuidando bien. Tres formas de mantener los poros limpios sin dañar la piel. Uno: los poros grandes y los puntos negros aparecen cuando el exceso de grasa y las células muertas se quedan atrapadas; un parche nocturno ayuda a sacar esas impurezas mientras duermes. Dos: usa un parche con hidrocoloide; yo recomiendo los de Vue: funcionan como un imán para sacar grasa e impurezas sin frotar ni apretar. Tres: la constancia mantiene los poros limpios a largo plazo. Estos parches protegen la barrera natural de la piel mientras sacan impurezas. Además están hechos en Corea, el país líder en innovación en cuidado de la piel. Mi piel queda como la seda y mis poros son literalmente invisibles. Es muy satisfactorio ver el resultado en el parche por la mañana. Así que, si quieres unos poros mejores de la noche a la mañana por menos de lo que cuesta un rímel, tienes que probarlos. Te alegrarás de haberlo hecho.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho visual doble | If your pores look like this or like this, you're not taking care of them properly. | Dos macros de nariz (inferido). | Dos imágenes = dos tipos de espectador. |
| 4–30 | 3 formas | 1… overnight patch… 2… hydrocolloid… magnet… 3… consistent use | Rutina (inferido). | Consejo útil con el producto dentro. |
| 30–40 | origen + resultado | made in Korea… skin feels like silk… pores literally invisible | Nariz (inferido). | Beneficio sensorial. |
| 40–46 | prueba | It's so satisfying to see the results on the patch in the morning. | Parche usado (inferido). | Peel reveal. |
| 46–53 | ancla precio + cta | less than the price of a mascara… You will be so glad you did. | Web (inferido). | Ancla barata. |

**Gancho (Reconocimiento visual doble):** «If your pores look like this or like this» → «Si tus poros se ven así… o así». Enseñar dos narices distintas duplica la probabilidad de que el espectador se reconozca.

**Reencuadre:** Cuidar ≠ atacar: consejos.

**Mecanismo:** Imán + barrera intacta.

**Prueba:** Satisfacción del parche por la mañana · Piel como la seda

**Objeciones resueltas:** «Es caro» → menos que un rímel · «¿Cómo se usa?» → 3 pasos

**Disparadores emocionales:** Satisfacción, Aspiración («invisibles»)

**Técnicas:** Doble reconocimiento · Consejo educativo · Ancla de precio cotidiano · Sensorialidad

| Frase (EN) | Adaptación (ES) |
|---|---|
| If your pores look like this or like this | Si tus poros se ven así… o así |
| My skin feels like silk | La piel me queda como la seda |
| for less than the price of a mascara | por menos de lo que cuesta un rímel |

**Oferta y cierre:** Ancla de precio; garantía en el texto.

**Por qué funciona:** 287 días con un vídeo. Dos ideas que nadie más usa: el gancho con dos imágenes («así o así») y el ancla de precio cotidiano (un rímel). El formato «3 formas» convierte el anuncio en consejo. Claim a vigilar: «poros literalmente invisibles».

**Qué se copia para NOCTA:** Gancho «así… o así» con dos narices · «Por menos de lo que cuesta un rímel / un café» (pack de 2 = 1,87 €/noche) · Peel reveal como satisfacción

**Lo que no se puede decir en España y su alternativa:** «pores literally invisible» → «se notan mucho menos»

**Adaptación a España:** Bea y Marisol.

### 18. Finally Clear Skin for Guys — «La mayoría de los tíos cree que esto son puntos negros. No lo son.»

**Métricas:** 10 anuncios · 6 grabaciones · 752 días acumulados · máx. 212 días · 16 variantes · landing hydrocolloid-nose-patches · 2025-09-26 → 2026-05-15 · 41 s

**Señales de conversión:** 10 anuncios, 6 vídeos, 16 variantes, 752 días; 212 días.

**Transcripción (inglés):** Most guys think these are blackheads. They're not. They're called sebaceous filaments, basically oil plugs that form naturally in your pores. And the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These view nose patches are made in Korea and they're specifically designed for sebaceous filaments, not blackheads, which is why they actually work. They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. I saw a huge improvement and after three weeks, those dark spots were completely gone. Check it out. Tons of guys finally understand why nothing worked before and now they're getting clear skin for the first time. They also offer a money back guarantee if you're not happy with the results.

**Traducción (español de España):** 

**Gancho (Identidad hombre (familia R1)):** «Most guys think these are blackheads. They're not.» → «La mayoría de los tíos cree que esto son puntos negros. No lo son.». 

**Reencuadre:** 

**Mecanismo:** 

**Oferta y cierre:** 

**Por qué funciona:** Versión masculina sin edad del nº 1: 6 grabaciones, 212 días. Confirma que el hombre joven responde al mismo guion que el maduro si la primera frase le nombra.

**Qué se copia para NOCTA:** Versión Álex de la plantilla maestra

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

**Adaptación a España:** Álex.

### 19. Clearer Pores While You Sleep 😴 — «El secreto de unos poros lisos después de los 40 no es el láser.»

**Métricas:** 10 anuncios · 7 grabaciones · 749 días acumulados · máx. 173 días · 11 variantes · landing hydrocolloid-nose-patches · 2025-11-07 → 2026-05-15 · 37 s

**Señales de conversión:** 10 anuncios, 7 vídeos, 11 variantes, 749 días; con R38 y R41 ≈ 32 anuncios.

**Transcripción (inglés):** The secret to smooth pores after 40 is not using a laser. If you want to go from visible black dots to a glass smooth nose, from oily shine to matte glow, instead of burning your skin with a laser, these hydro-coloid patches use a scientific approach to target what's clogging your pores overnight without harming your skin barrier. Dermatologists warn that lasers can thin the skin and weaken the barrier over time. In just three weeks, these patches turn stubborn blackheads and greasy shine into smooth, clean looking skin. Check it out, thousands of women over 40 plus swear this is the first thing that actually made their pores look clean. Click below to get up to 45% off and finally smooth out your pores.

**Traducción (español de España):** El secreto de unos poros lisos después de los 40 no es el láser. Si quieres pasar de puntitos visibles a una nariz lisa como el cristal, de brillo graso a un acabado mate, en vez de quemarte la piel con láser, estos parches de hidrocoloide usan un enfoque científico para ir a por lo que tapona los poros durante la noche, sin dañar la barrera. Los dermatólogos advierten de que el láser puede afinar la piel y debilitar la barrera con el tiempo. En solo tres semanas estos parches convierten los puntos negros rebeldes y el brillo en una piel lisa y limpia. Míralo: miles de mujeres de más de 40 dicen que es lo primero que de verdad les ha limpiado los poros. Pincha abajo para hasta un 45 % de descuento.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho secreto + edad + anti-láser | The secret to smooth pores after 40 is not using a laser. | Mujer 40+ (inferido). | Edad + negación de la opción cara. |
| 4–14 | transformación | from visible black dots to a glass smooth nose, from oily shine to matte glow | Antes/después (inferido). | Dos contrastes paralelos. |
| 14–24 | autoridad contra el láser | Dermatologists warn that lasers can thin the skin | Rótulo (inferido). | Miedo racional. |
| 24–31 | plazo + prueba | In just three weeks… Check it out | Antes/después (inferido). | Visual. |
| 31–37 | prueba social + oferta | thousands of women over 40… up to 45% off | Web (inferido). | Cierre. |

**Gancho (Secreto + edad + anti-caro):** «The secret to smooth pores after 40 is not using a laser.» → «El secreto de unos poros lisos después de los 40 no es el láser.». «Secreto» + «después de los 40» + «no es el láser»: tres ganchos en una frase para Marisol.

**Reencuadre:** Lo agresivo envejece la piel.

**Mecanismo:** Enfoque científico nocturno sin dañar la barrera.

**Prueba:** Transformación doble · 3 semanas · Miles de mujeres 40+

**Objeciones resueltas:** «A mi edad solo funciona lo agresivo» → al revés

**Disparadores emocionales:** Miedo a envejecer la piel, Pertenencia 40+

**Técnicas:** Paralelismo (de X a Y, de A a B) · Autoridad negativa (contra el láser) · Plazo · Prueba social segmentada · Descuento alto

| Frase (EN) | Adaptación (ES) |
|---|---|
| from visible black dots to a glass smooth nose, from oily shine to matte glow | de puntitos visibles a nariz lisa; de brillo a mate |
| Harsh treatments don't age well on the skin | Lo agresivo envejece mal (R38) |

**Oferta y cierre:** Hasta 45 %.

**Por qué funciona:** Familia con R38 («Harsh treatments don't age well») y R41: el mismo cuerpo con tres ganchos distintos, 30 anuncios en total. Es EL guion de Marisol: edad explícita, miedo a dañar la piel madura, paralelismo de transformación y prueba social de su grupo.

**Qué se copia para NOCTA:** Gancho por edad para Marisol · Paralelismo «de X a Y» · Contra láser/cabina con precio real

**Lo que no se puede decir en España y su alternativa:** «Dermatologists warn» → «los tratamientos agresivos pueden dañar la barrera» sin citar médicos · «glass smooth» → «mucho más lisa»

**Adaptación a España:** Marisol.

### 20. From Oily Nose to Clear Skin — «Si te ves puntos negros, no los aprietes. Ponte esto.»

**Métricas:** 10 anuncios · 1 grabaciones · 800 días acumulados · máx. 254 días · 19 variantes · landing hydrocolloid-nose-patches · 2025-07-22 → 2026-05-13 · 22 s

**Señales de conversión:** 10 anuncios, 1 vídeo, 19 variantes, 800 días; 254 días.

**Transcripción (inglés):** If you notice blackheads, do not squeeze them. Instead, use one of these. They are hydrocolloid nose patches from Beloved View, Swiss. They absorb impurities using hydrocolloid that gently trap excess oil and sebum to effectively clear your pores. My skin looks just so much cleaner and smoother when I use these. Go get this nose patches only if you're ready to have smooth and clean skin.

**Traducción (español de España):** Si notas puntos negros, no los aprietes. Usa esto. Son parches de nariz de hidrocoloide de Vue. Absorben las impurezas con hidrocoloide que atrapa con suavidad el exceso de grasa y sebo para limpiar los poros. Mi piel se ve mucho más limpia y lisa cuando los uso. Cómpralos solo si estás lista para tener la piel lisa y limpia.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho orden + sustitución | If you notice blackheads, do not squeeze them. Instead, use one of these. | Parche en mano (inferido). | Orden + objeto. |
| 3–14 | mecanismo mínimo | hydrocolloid that gently trap excess oil and sebum | Aplicación (inferido). | Una frase. |
| 14–22 | resultado + cta con reto | cleaner and smoother… only if you're ready | Nariz (inferido). | CTA que reta. |

**Gancho (Orden + sustitución):** «If you notice blackheads, do not squeeze them. Instead, use one of these.» → «Si te ves puntos negros, no los aprietes. Ponte esto.». Da la solución en el segundo 2: para gente que ya conoce el problema.

**Reencuadre:** Apretar → parche.

**Mecanismo:** Atrapa grasa y sebo.

**Prueba:** Ninguna visual explícita

**Objeciones resueltas:** Ninguna: es un recordatorio

**Disparadores emocionales:** Reto («solo si estás lista»)

**Técnicas:** Brevedad · CTA de reto (takeaway)

| Frase (EN) | Adaptación (ES) |
|---|---|
| Instead, use one of these. | Ponte esto. |
| only if you're ready to have smooth and clean skin | solo si estás lista para tener la piel limpia |

**Oferta y cierre:** 30 % en el texto; 254 días.

**Por qué funciona:** 22 segundos, 254 días, 19 variantes: la prueba de que un anuncio ultracorto funciona como recordatorio/retargeting cuando el mercado ya conoce el reencuadre. Para NOCTA es el formato para Reels de 15 s y para el retargeting por email.

**Qué se copia para NOCTA:** Formato de 15–20 s: orden + objeto + una frase de mecanismo + reto

**Lo que no se puede decir en España y su alternativa:** «effectively clear your pores» → «ayudan a limpiar los poros»

**Adaptación a España:** Bea; TikTok/Reels.

### 21. From Oily Nose to Clear Skin — «La verdad sobre esos puntos negros de la nariz que nadie te cuenta. Chicos, atentos.»

**Métricas:** 12 anuncios · 5 grabaciones · 700 días acumulados · máx. 223 días · 12 variantes · landing hydrocolloid-nose-patches · 2025-07-14 → 2026-05-15 · 38 s

**Señales de conversión:** 12 anuncios, 5 vídeos, 12 variantes, 700 días; 223 días.

**Transcripción (inglés):** Here's the truth about those black dots on your nose that nobody talks about. Guys, listen up. Those black dots and pores, they're not just dirt. They're oxidized oil trapped deep in your pores. Regular cleansers and face wash, they don't cut it. They can't reach deep enough to pull that stuff out. That's why hydrocolloid nose patches are getting so much attention at the moment. They work like a magnet, pulling out all the deep impurities while you sleep. No scrubbing, no squeezing, no mess. Just clear fresh pores by morning, simple as that. One pack is all it took for me to see the difference. Still skeptical? Try them yourself and see. I'm using the patches from View Swiss because they offer a money-back guarantee if you're not happy with the results.

**Traducción (español de España):** Esta es la verdad sobre esos puntos negros de la nariz que nadie te cuenta. Chicos, escuchad. Esos puntitos y poros no son solo suciedad: son grasa oxidada atrapada al fondo de los poros. Los limpiadores normales no llegan; no pueden bajar tanto. Por eso los parches de hidrocoloide están llamando tanto la atención ahora mismo: funcionan como un imán, sacando las impurezas profundas mientras duermes. Sin frotar, sin apretar, sin líos. Solo poros limpios por la mañana, así de simple. A mí me bastó un paquete para ver la diferencia. ¿Sigues con dudas? Pruébalos tú mismo. Yo uso los de Vue porque ofrecen garantía de devolución si no quedas contento.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho secreto | Here's the truth about those black dots on your nose that nobody talks about. Guys, listen up. | Hombre a cámara (inferido). | Secreto + llamada al grupo. |
| 4–14 | reencuadre grasa oxidada | not just dirt. They're oxidized oil trapped deep in your pores | Macro (inferido). | Explicación. |
| 14–26 | mecanismo imán | like a magnet, pulling out all the deep impurities while you sleep. No scrubbing, no squeezing, no mess. | Parche (inferido). | Solución + tres negaciones. |
| 26–32 | prueba | One pack is all it took for me to see the difference. | Nariz (inferido). | Resultado en un paquete. |
| 32–38 | reto + garantía | Still skeptical? Try them yourself… money-back guarantee | Web (inferido). | Cierre. |

**Gancho (Secreto + llamada al grupo):** «Here's the truth about those black dots on your nose that nobody talks about. Guys, listen up.» → «La verdad sobre esos puntos negros de la nariz que nadie te cuenta. Chicos, atentos.». Promesa de información oculta + interpelación directa al grupo masculino.

**Reencuadre:** Grasa oxidada profunda, no suciedad.

**Mecanismo:** Imán profundo de noche.

**Prueba:** Un paquete bastó

**Objeciones resueltas:** «Me lavo la cara» → no llega al fondo · «Sigo con dudas» → pruébalo, garantía

**Disparadores emocionales:** Curiosidad (secreto), Reto

**Técnicas:** Secreto · Interpelación · Metáfora · Reto al escéptico

| Frase (EN) | Adaptación (ES) |
|---|---|
| that nobody talks about | que nadie te cuenta |
| Regular cleansers… can't reach deep enough | Los limpiadores no llegan tan abajo |
| Still skeptical? Try them yourself. | ¿Sigues con dudas? Pruébalo. |

**Oferta y cierre:** Garantía; 30 % en el texto.

**Por qué funciona:** 223 días: la versión masculina del reencuadre con la palabra «secreto». El mismo guion murió en 0 días con otra persona (ver perdedores): la ejecución importa tanto como el texto.

**Qué se copia para NOCTA:** Gancho «la verdad que nadie te cuenta» para Álex · Reto al escéptico antes de la garantía

**Lo que no se puede decir en España y su alternativa:** Ninguno grave

**Adaptación a España:** Álex.

### 22. Stop Treating Blackheads Wrong — «Y esos puntitos oscuros de la nariz no son puntos negros.»

**Métricas:** 9 anuncios · 1 grabaciones · 712 días acumulados · máx. 190 días · 30 variantes · landing hydrocolloid-nose-patches · 2025-10-02 → 2026-08-13 · 40 s

**Señales de conversión:** 9 anuncios, 1 vídeo, 30 variantes, 712 días; 190 días.

**Transcripción (inglés):** And these dark spots on your nose aren't blackheads. They're called sebaceous filaments, basically oil plugs that form naturally in your pores. And the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These view nose patches are made in Korea and they're specifically designed for sebaceous filaments not blackheads, which is why they actually work. They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. I saw a huge improvement and after three weeks those dark spots were completely gone. Check it out. Tons of women finally understand why nothing worked before. And now they're getting clear skin for the first time. They also offer a money-back guarantee if you're not happy with the results.

**Traducción (español de España):** 

**Gancho (Identidad mujer (familia R1)):** «And these dark spots on your nose aren't blackheads.» → «Y esos puntitos oscuros de la nariz no son puntos negros.». 

**Reencuadre:** 

**Mecanismo:** 

**Oferta y cierre:** 

**Por qué funciona:** Mismo guion que el nº 1 con «tons of women»: 30 variantes con un solo vídeo, 190 días. Vue lo mantuvo activo hasta agosto de 2026.

**Qué se copia para NOCTA:** Multiplicar variantes de texto sobre un vídeo que funciona (30 textos, 1 vídeo)

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

**Adaptación a España:** Marisol.

### 23. Clogged Pores? 30% OFF Sale — «Esto es lo que pasa por no cuidar bien los poros.»

**Métricas:** 6 anuncios · 1 grabaciones · 756 días acumulados · máx. 290 días · 7 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-13 · 27 s

**Señales de conversión:** 6 anuncios, 1 vídeo, 7 variantes, 756 días; 290 días.

**Transcripción (inglés):** This is the consequence of not taking care of my pores the right way. I'll show you what worked for me. Nose patches. They gently dissolve impurities and absorb all the gunk from my pores. My pores were enlarged and clogged because I was treating them like they were blackheads. But they were actually sabacus filaments which can be really hard to remove. I use these patches every week. When I peel it off, my nose is left so smooth and my pores just feel a lot smaller too. Here you can see the white spots that formed on the patch. Go try them. You'll thank me later.

**Traducción (español de España):** Esta es la consecuencia de no cuidar bien mis poros. Te enseño lo que me funcionó: parches de nariz. Disuelven las impurezas con suavidad y absorben toda la porquería de los poros. Tenía los poros dilatados y tapados porque los trataba como puntos negros, pero en realidad eran filamentos sebáceos, que cuestan mucho de quitar. Uso estos parches cada semana. Cuando me lo quito, la nariz queda lisísima y los poros parecen mucho más pequeños. Aquí puedes ver los puntos blancos que se han formado en el parche. Pruébalos. Me lo agradecerás.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–3 | gancho consecuencia | This is the consequence of not taking care of my pores the right way. | Macro nariz (inferido). | Muestra el daño primero. |
| 3–8 | promesa | I'll show you what worked for me. Nose patches. | Caja (inferido). | Solución nombrada pronto. |
| 8–18 | reencuadre personal | I was treating them like they were blackheads. But they were actually sebaceous filaments | Macro (inferido). | Diagnóstico. |
| 18–24 | uso + resultado | every week… so smooth… pores just feel a lot smaller | Nariz (inferido). | Frecuencia real (semanal). |
| 24–27 | prueba + cta | Here you can see the white spots that formed on the patch. Go try them. | Parche usado (inferido). | Peel reveal. |

**Gancho (Consecuencia (mostrar el daño)):** «This is the consequence of not taking care of my pores the right way.» → «Esto es lo que pasa por no cuidar bien los poros.». Muestra la nariz «mal» en el segundo 0 con una frase de culpa asumida.

**Reencuadre:** Filamentos, no puntos negros.

**Mecanismo:** Absorbe la porquería.

**Prueba:** Puntos blancos en el parche (explícito) · Uso semanal

**Objeciones resueltas:** «¿Cada cuánto?» → cada semana

**Disparadores emocionales:** Vergüenza asumida, Satisfacción

**Técnicas:** Mostrar el daño · Frecuencia honesta · Peel reveal

| Frase (EN) | Adaptación (ES) |
|---|---|
| This is the consequence of not taking care of my pores | Esto es lo que pasa por no cuidar los poros |
| Here you can see the white spots that formed on the patch | Mira los puntos blancos que se han formado en el parche |

**Oferta y cierre:** 30 %; 290 días.

**Por qué funciona:** 27 segundos y 290 días: enseña el daño en el segundo 0 y el parche blanco en el 24. Es el guion con menos palabras por prueba visual del ranking; y dice «cada semana», que es la frecuencia real de uso (2–3 noches por semana): honesto y coherente con la caja de 8.

**Qué se copia para NOCTA:** Empezar por el daño · Decir la frecuencia real (2–3 noches/semana) · Puntos blancos en el parche como cierre

**Lo que no se puede decir en España y su alternativa:** «dissolve impurities» → «absorben»

**Adaptación a España:** Bea.

### 24. No More Nose Bumps — «Chicos, dejad de tratar esto como puntos negros.»

**Métricas:** 11 anuncios · 9 grabaciones · 586 días acumulados · máx. 119 días · 24 variantes · landing hydrocolloid-nose-patches · 2025-10-28 → 2026-05-13 · 39 s

**Señales de conversión:** 11 anuncios, 9 vídeos, 24 variantes, 586 días; 119 días.

**Transcripción (inglés):** Guys, stop treating these like blackheads. They're called sebaceous filaments, basically oil plugs that form naturally in your pores. And the reason why nothing you've tried works is because you've been treating them like blackheads, but they need completely different care. That's why they keep coming back. These nose patches are made in Korea, and they're specifically designed for sebaceous filaments, not blackheads, which is why they actually work. They gently absorb the oil build-up overnight instead of ripping your skin like those painful strips. I saw a huge improvement, and after three weeks, those dark spots were completely gone. Check it out. Tons of guys finally understand why nothing worked before, and now they're getting clear skin for the first time. They also offer a money back guarantee if you're not happy with the results.

**Traducción (español de España):** 

**Gancho (Orden a hombres (familia R1)):** «Guys, stop treating these like blackheads.» → «Chicos, dejad de tratar esto como puntos negros.». 

**Reencuadre:** 

**Mecanismo:** 

**Oferta y cierre:** 

**Por qué funciona:** El nº 1 con arranque «para de» dirigido a hombres: 9 grabaciones distintas en 6 meses. Es el guion que Vue eligió para regrabar con más creadores masculinos.

**Qué se copia para NOCTA:** Grabar la plantilla con 3 hombres distintos

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

**Adaptación a España:** Álex.

### 25. From Oily Nose to Clear Skin — «Los dos únicos productos que necesitas para pasar de esto a esto»

**Métricas:** 8 anuncios · 1 grabaciones · 732 días acumulados · máx. 294 días · 8 variantes · landing clear-pore-duo · 2025-05-21 → 2026-05-11 · 56 s

**Señales de conversión:** 8 anuncios, 1 vídeo, 8 variantes, 732 días; 294 días.

**Transcripción (inglés):** I'm about to show the only two products you need to transform your nose from this to this. Boost with salicylic toner is designed to clear clogged pores and smooth skin. With salicylic acid and glycolic acid it exfoliates, refines texture and really keeps pores clear. And when it's paired with their best-selling hydrocolloid nose patches, this duo absorbs excess oils and draws out impurities overnight. Unlike harsh scrubs or extractions, these patches work without damaging your skin barrier, making them perfect even for really, really sensitive skin. Boost with is now offering an exclusive pore care bundle so you can get both products together for the best results. Are you struggling with blackheads or uneven texture? Now's the perfect time to try it out yourself. Plus, they're offering 60-day money-back guarantee if you're not happy with the results. Try it out!

**Traducción (español de España):** Te voy a enseñar los dos únicos productos que necesitas para transformar tu nariz de esto a esto. El tónico con salicílico está diseñado para destapar poros y alisar la piel; con ácido salicílico y glicólico exfolia, refina la textura y mantiene los poros limpios. Y combinado con sus parches de nariz de hidrocoloide, el dúo absorbe el exceso de grasa y saca las impurezas durante la noche. A diferencia de los exfoliantes agresivos o las extracciones, estos parches no dañan la barrera de la piel, así que van bien incluso para piel muy, muy sensible. Ahora ofrecen un pack de cuidado de poros para llevarte los dos juntos. ¿Tienes puntos negros o textura irregular? Es el momento de probarlo. Además, 60 días de garantía si no quedas contenta.

| Seg. | Bloque | Dice | Pasa en pantalla (inferido) | Función |
|---|---|---|---|---|
| 0–4 | gancho «los dos únicos» | the only two products you need to transform your nose from this to this | Antes/después (inferido). | Simplicidad + transformación. |
| 4–18 | paso 1 | Boost with salicylic toner… exfoliates, refines texture | Tónico (inferido). | Mecanismo 1. |
| 18–30 | paso 2 | paired with their best-selling hydrocolloid nose patches… absorbs excess oils… overnight | Parche (inferido). | Mecanismo 2. |
| 30–40 | seguridad | without damaging your skin barrier… really, really sensitive skin | Piel (inferido). | Objeción sensibilidad. |
| 40–56 | pack + garantía | exclusive pore care bundle… 60-day money-back guarantee | Web (inferido). | Cierre de pack. |

**Gancho (Simplicidad («los dos únicos») + transformación):** «the only two products you need to transform your nose from this to this» → «Los dos únicos productos que necesitas para pasar de esto a esto». Reduce el skincare a dos cosas y enseña el antes/después en el segundo 2.

**Reencuadre:** No necesitas 10 pasos: dos.

**Mecanismo:** Exfoliar + absorber.

**Prueba:** Antes/después · Best-seller

**Objeciones resueltas:** «Piel sensible» → sin dañar la barrera · «Muchos pasos» → solo dos

**Disparadores emocionales:** Alivio de simplicidad

**Técnicas:** Reducción («los dos únicos») · Sistema de dos pasos · Pack

| Frase (EN) | Adaptación (ES) |
|---|---|
| the only two products you need | los dos únicos productos que necesitas |
| from this to this | de esto a esto |

**Oferta y cierre:** Pack exclusivo + 60 días; 294 días.

**Por qué funciona:** El anuncio de Dúo más longevo (294 días). Vende el pack con un argumento de simplicidad («solo dos») y un mecanismo en dos pasos que se entiende. Para NOCTA es el molde del anuncio del Dúo Noche (nariz + granos): «los dos únicos parches que necesitas».

**Qué se copia para NOCTA:** «Los dos únicos» para el Dúo Noche · Argumento de piel sensible

**Lo que no se puede decir en España y su alternativa:** Ninguno grave

**Adaptación a España:** Marisol y Bea.

## 4. Los 35 siguientes, en compacto

### 26. From Oily Nose to Clear Skin — «¿Te da vergüenza que el maquillaje se te vea así?»

**Métricas:** 8 anuncios · 1 grabaciones · 720 días acumulados · máx. 290 días · 10 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-13 · 15 s

**Señales de conversión:** 8 anuncios, 1 vídeo, 10 variantes, 720 días; 290 días.

**Por qué funciona:** 15 segundos, 290 días, 10 variantes: el anuncio más corto del ranking. Vive de una sola imagen (base cuarteada) y un solo beneficio.

**Qué se copia para NOCTA:** Ángulo maquillaje para Marisol en 15 s

**Lo que no se puede decir en España y su alternativa:** «pulls out all impurities» → «absorbe la grasa»

### 27. Stop Treating Blackheads Wrong — «Mujeres de más de 40: tenéis estos puntos en la nariz»

**Métricas:** 7 anuncios · 2 grabaciones · 703 días acumulados · máx. 198 días · 7 variantes · landing hydrocolloid-nose-patches · 2025-10-14 → 2026-05-16 · 57 s

**Señales de conversión:** 7 anuncios, 2 vídeos, 7 variantes, 703 días; 198 días.

**Por qué funciona:** «Tubitos + imán» con edad explícita (40+): 198 días. La versión para Marisol de la familia R6.

**Qué se copia para NOCTA:** Versión Marisol 40+ de «tubitos»

**Lo que no se puede decir en España y su alternativa:** Las de R6

### 28. One Patch, Visible Results — «Te enseño cómo pasé de esto a esto»

**Métricas:** 13 anuncios · 3 grabaciones · 644 días acumulados · máx. 200 días · 22 variantes · landing hydrocolloid-nose-patches · 2025-09-24 → 2026-05-15 · 26 s

**Señales de conversión:** 13 anuncios, 3 vídeos, 22 variantes, 644 días; 200 días.

**Por qué funciona:** 13 anuncios y 22 variantes en 26 segundos sin explicar nada: es el anuncio de puro «asco satisfactorio» para hombres, con un beneficio social explícito. Demuestra que para Álex la demostración vale más que la explicación.

**Qué se copia para NOCTA:** Peel reveal en directo en el segundo 3 para Álex · Beneficio social («lo va a notar»)

**Lo que no se puede decir en España y su alternativa:** Ninguno

### 29. From Oily Nose to Clear Skin — «Tres señales de que tus poros necesitan ayuda ya.»

**Métricas:** 11 anuncios · 2 grabaciones · 656 días acumulados · máx. 161 días · 20 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-14 · 27 s

**Señales de conversión:** 11 anuncios, 2 vídeos, 20 variantes, 656 días; 161 días.

**Por qué funciona:** 27 segundos, 11 anuncios, 20 variantes. Versión rápida y «de amiga» del listicle R9; probada orgánicamente en TikTok antes. Claim «invisibles» a suavizar.

**Qué se copia para NOCTA:** Tono «amiga» para Bea · Probar el texto orgánico primero

**Lo que no se puede decir en España y su alternativa:** «invisible» → «mucho menos visibles» · «backed by Korean skincare science» → condicional

### 30. No More Nose Bumps — «Tuve que explicarle a mi novio que esto no son puntos negros.»

**Métricas:** 8 anuncios · 2 grabaciones · 661 días acumulados · máx. 184 días · 17 variantes · landing hydrocolloid-nose-patches · 2025-10-22 → 2026-05-15 · 57 s

**Señales de conversión:** 8 anuncios, 2 vídeos, 17 variantes, 661 días; 184 días.

**Por qué funciona:** 184 días, 17 variantes: el guion de pareja convierte porque la mujer compra para el hombre (regalo/cuidado) y el hombre se reconoce sin que le vendan directamente. El humor («no pasa a menudo») da credibilidad.

**Qué se copia para NOCTA:** Guion de pareja para vender a Álex a través de Bea/Marisol · Humor doméstico

**Lo que no se puede decir en España y su alternativa:** Corea → condicional

### 31. Clearer Pores While You Sleep 😴 — «Pensaba que el láser para los poros era buena idea, hasta que supe que podía dañarme la piel para siempre.»

**Métricas:** 13 anuncios · 3 grabaciones · 636 días acumulados · máx. 186 días · 17 variantes · landing hydrocolloid-nose-patches · 2025-10-24 → 2026-05-15 · 36 s

**Señales de conversión:** 13 anuncios, 3 vídeos, 17 variantes, 636 días; 186 días.

**Por qué funciona:** El cuerpo de R19 con gancho de arrepentimiento anticipado; 13 anuncios, 17 variantes, 186 días. Para Marisol, el miedo al daño permanente es más fuerte que el precio.

**Qué se copia para NOCTA:** Gancho de «casi cometo un error caro»

**Lo que no se puede decir en España y su alternativa:** «Dermatologists warn» → sin médicos; «damage permanently» → «puede dañar la barrera»

### 32. From Oily Nose to Clear Skin — «¿Quieres la piel más lisa mañana por la mañana? Empieza aquí.»

**Métricas:** 8 anuncios · 2 grabaciones · 660 días acumulados · máx. 291 días · 8 variantes · landing clear-pore-duo · 2025-06-07 → 2026-05-09 · 26 s

**Señales de conversión:** 8 anuncios, 2 vídeos, 8 variantes, 660 días; 291 días.

**Por qué funciona:** Anuncio de Dúo de 26 s y 291 días: pregunta + «dos pasos» + parche por la mañana enseñado («this is what the patch looks like in the morning»). Molde corto para el Dúo Noche.

**Qué se copia para NOCTA:** Dúo en 26 s con el parche usado en cámara

**Lo que no se puede decir en España y su alternativa:** «minimized my pores in one week» → «en una semana se notaban menos»

### 33. Clear Pores Overnight — «La mayoría de las chicas de 20 cree que puede sacarlos apretando. Por favor, no»

**Métricas:** 9 anuncios · 3 grabaciones · 602 días acumulados · máx. 163 días · 22 variantes · landing hydrocolloid-nose-patches · 2025-11-18 → 2026-05-15 · 61 s

**Señales de conversión:** 9 anuncios, 3 vídeos, 22 variantes, 602 días; 163 días.

**Por qué funciona:** Añade a la familia R6 los detalles de Bea: herramientas de extracción de TikTok, hacer zoom en la nariz en cada selfie, «el maquillaje se aplica mejor». 22 variantes, 163 días. Es el guion con más detalles de la vida real de Bea.

**Qué se copia para NOCTA:** Detalles reales de Bea: zoom en selfies, herramientas de TikTok, maquillaje más liso

**Lo que no se puede decir en España y su alternativa:** Las de R6

### 34. From Oily Nose to Clear Skin — «Tres razones por las que tus poros te siguen dando problemas.»

**Métricas:** 7 anuncios · 1 grabaciones · 636 días acumulados · máx. 289 días · 13 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-14 · 35 s

**Señales de conversión:** 7 anuncios, 1 vídeo, 13 variantes, 636 días; 289 días.

**Por qué funciona:** Listicle racional (producto en superficie, ingredientes agresivos, no ir a la raíz) con 289 días y un solo vídeo. Cierra con «tres meses usándolos»: constancia como prueba.

**Qué se copia para NOCTA:** Listicle de tres causas · «Tres meses usándolos» como prueba de constancia

**Lo que no se puede decir en España y su alternativa:** «No harsh chemicals» → «sin activos agresivos»

### 36. Wake Up To Clearer Skin — «Tus poros se rellenan cada 24 horas. Por eso la nariz nunca se te queda mate.»

**Métricas:** 6 anuncios · 2 grabaciones · 602 días acumulados · máx. 129 días · 14 variantes · landing hydrocolloid-nose-patches · 2025-12-22 → 2026-05-16 · 38 s

**Señales de conversión:** 6 anuncios, 2 vídeos, 14 variantes, 602 días; 129 días.

**Por qué funciona:** Gancho de dato («cada 24 horas») que explica el brillo: el mejor guion sobre BRILLO, no sobre puntos. Termina con «200.000+ clientes». 129 días, 14 variantes.

**Qué se copia para NOCTA:** Ángulo brillo: «por eso nunca se te queda mate» · Dato en el gancho

**Lo que no se puede decir en España y su alternativa:** «200,000+ customers» → solo con cifra real de NOCTA

### 37. No More Nose Bumps — «Por fin sé por qué me vuelven los puntitos. Mira lo limpia que tengo ahora la nariz»

**Métricas:** 12 anuncios · 2 grabaciones · 567 días acumulados · máx. 173 días · 26 variantes · landing hydrocolloid-nose-patches · 2025-11-14 → 2026-07-17 · 33 s

**Señales de conversión:** 12 anuncios, 2 vídeos, 26 variantes, 567 días; 173 días.

**Por qué funciona:** Historia mínima (33 s) que enseña el resultado en el segundo 3 («look how much cleaner»). 26 variantes, 173 días. Modelo de historia corta que empieza por la prueba.

**Qué se copia para NOCTA:** Resultado en el segundo 3 antes de contar nada

**Lo que no se puede decir en España y su alternativa:** Ninguno grave

### 38. Clearer Pores While You Sleep 😴 — «Lo agresivo envejece mal en la piel.»

**Métricas:** 8 anuncios · 6 grabaciones · 528 días acumulados · máx. 156 días · 12 variantes · landing hydrocolloid-nose-patches · 2025-11-07 → 2026-05-16 · 36 s

**Señales de conversión:** 8 anuncios, 6 vídeos, 12 variantes, 528 días; 156 días.

**Por qué funciona:** Gancho de una frase con doble sentido (age well) sobre el cuerpo de R19: 156 días, 6 grabaciones.

**Qué se copia para NOCTA:** «Lo agresivo envejece mal» para Marisol

**Lo que no se puede decir en España y su alternativa:** Sin médicos

### 39. Clear Pores Overnight — «Te prometo que no estás sola. Durante años pensé que eran puntos negros.»

**Métricas:** 12 anuncios · 3 grabaciones · 543 días acumulados · máx. 135 días · 21 variantes · landing hydrocolloid-nose-patches · 2025-12-18 → 2026-05-15 · 54 s

**Señales de conversión:** 12 anuncios, 3 vídeos, 21 variantes, 543 días; 135 días.

**Por qué funciona:** Historia empática (54 s) que reencuadra la culpa («pensé que mi piel estaba sucia»); cierra con «no tienes que conformarte». 21 variantes, 135 días. Funciona con Bea/Marisol que se sienten juzgadas.

**Qué se copia para NOCTA:** «No estás sola» + quitar la culpa («no es que tu piel esté sucia») · «Dejé de luchar contra mi piel»

**Lo que no se puede decir en España y su alternativa:** Corea → condicional

### 40. Clear Skin Starts at the T-Zone — «¿Sabías que el 80 % de la grasa de tu cara sale solo de la zona T?»

**Métricas:** 9 anuncios · 2 grabaciones · 572 días acumulados · máx. 149 días · 14 variantes · landing clear-t-zone-kit · 2025-09-19 → 2026-05-10 · 40 s

**Señales de conversión:** 9 anuncios, 2 vídeos, 14 variantes, 572 días; 149 días.

**Por qué funciona:** Anuncio de kit T-zone con dato de apertura y prueba por la mañana; 149 días. Para NOCTA es el molde del anuncio de Zona T / Plan por zonas cuando existan barbilla y frente.

**Qué se copia para NOCTA:** Dato de apertura para vender varias zonas

**Lo que no se puede decir en España y su alternativa:** «80 %» → citar fuente o quitar la cifra

### 41. Clear Skin, Zero Effort — «Quieres pasar de puntos negros a nariz lisa, de brillo graso a acabado mate.»

**Métricas:** 14 anuncios · 5 grabaciones · 507 días acumulados · máx. 112 días · 23 variantes · landing hydrocolloid-nose-patches · 2025-12-22 → 2026-05-15 · 40 s

**Señales de conversión:** 14 anuncios, 5 vídeos, 23 variantes, 507 días; 112 días.

**Por qué funciona:** Cuerpo de R19 sin gancho de edad: 14 anuncios, 23 variantes. Cierra con «hasta 45 %».

**Qué se copia para NOCTA:** Paralelismo de transformación como gancho

**Lo que no se puede decir en España y su alternativa:** Sin médicos

### 42. From Oily Nose to Clear Skin — «¿Por qué todo el mundo se está pasando a estos parches? Cada vez que subo mi piel me preguntan qué uso.»

**Métricas:** 5 anuncios · 2 grabaciones · 571 días acumulados · máx. 224 días · 10 variantes · landing hydrocolloid-nose-patches · 2025-06-18 → 2026-05-15 · 29 s

**Señales de conversión:** 5 anuncios, 2 vídeos, 10 variantes, 571 días; 224 días.

**Por qué funciona:** Prueba social como gancho (la gente pregunta) + «spill the tea». 224 días con 5 anuncios. Para cuando NOCTA tenga comentarios reales.

**Qué se copia para NOCTA:** Gancho «me preguntan qué uso» cuando haya comentarios reales

**Lo que no se puede decir en España y su alternativa:** «ultimate hack» → «el truco»

### 43. Stop Scrubbing — «Arreglé sin querer mi mayor complejo. Esos puntos, no son puntos negros.»

**Métricas:** 24 anuncios · 2 grabaciones · 514 días acumulados · máx. 103 días · 33 variantes · landing hydrocolloid-nose-patches · 2026-02-20 → 2026-08-26 · 24 s

**Señales de conversión:** 24 anuncios, 2 vídeos, 33 variantes, 514 días; 103 días.

**Por qué funciona:** 24 segundos, 24 anuncios, 33 variantes en 6 meses: la versión ultracomprimida del reencuadre. Ojo: el mismo arranque aparece 19 veces entre los muertos: funciona solo si en el segundo 1 ya se ve la nariz y el resto va a toda velocidad.

**Qué se copia para NOCTA:** Versión de 24 s: confesión + reencuadre + solución + garantía, sin historia

**Lo que no se puede decir en España y su alternativa:** Ninguno grave

### 44. From Oily Nose to Clear Skin — «La innovación coreana que está cambiando la cosmética europea: el secreto está en lo que pasa mientras duermes.»

**Métricas:** 6 anuncios · 1 grabaciones · 582 días acumulados · máx. 289 días · 7 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-13 · 32 s

**Señales de conversión:** 6 anuncios, 1 vídeo, 7 variantes, 582 días; 289 días.

**Por qué funciona:** Cuerpo K-beauty + «mientras duermes»; 289 días con un vídeo. Solo con lote coreano.

**Qué se copia para NOCTA:** «El secreto está en lo que pasa mientras duermes»

**Lo que no se puede decir en España y su alternativa:** Corea → condicional

### 45. Finally Clear Skin for Guys — «La mayoría de los tíos de 20 y pocos cree que esto son puntos negros.»

**Métricas:** 5 anuncios · 3 grabaciones · 538 días acumulados · máx. 207 días · 9 variantes · landing hydrocolloid-nose-patches · 2025-10-03 → 2026-05-15 · 41 s

**Señales de conversión:** 5 anuncios, 3 vídeos, 9 variantes, 538 días; 207 días.

**Por qué funciona:** Nº 1 para hombres jóvenes: 207 días. Cierra la matriz de identidades del nº 1 (mujer / hombre / 20s / 35+).

**Qué se copia para NOCTA:** Versión Álex 20s

**Lo que no se puede decir en España y su alternativa:** Las del nº 1

### 46. Clearer Without the Stress — «Cada vez que te arrancas una tira, te dañas la piel. Así es ese daño.»

**Métricas:** 16 anuncios · 4 grabaciones · 462 días acumulados · máx. 115 días · 40 variantes · landing hydrocolloid-nose-patches · 2026-02-10 → 2026-05-15 · 52 s

**Señales de conversión:** 16 anuncios, 4 vídeos, 40 variantes, 462 días; 115 días.

**Por qué funciona:** El anuncio más «médico» de la cuenta: capilares rotos, microdesgarros, inflamación crónica, «por eso tus poros se ven más grandes que hace cinco años». 16 anuncios, 40 variantes en 3 meses. Muy eficaz, pero lleno de claims que en España hay que reescribir (dermatólogos recomiendan, grado médico).

**Qué se copia para NOCTA:** Ángulo daño acumulado de las tiras (con lenguaje prudente) · «Tus poros se ven más grandes que hace cinco años»

**Lo que no se puede decir en España y su alternativa:** «dermatologists recommend» → quitar · «medical grade hydrocolloid» → «hidrocoloide, el material de los apósitos» solo si el proveedor certifica ISO 13485 · «broken capillaries, micro tears» → «rojeces e irritación»

### 47. Clear Nose Overnight ✨ — «Si los puntitos de la nariz te vuelven siempre, no son puntos negros.»

**Métricas:** 16 anuncios · 5 grabaciones · 466 días acumulados · máx. 121 días · 22 variantes · landing hydrocolloid-nose-patches · 2026-03-06 → 2026-05-15 · 52 s

**Señales de conversión:** 16 anuncios, 5 vídeos, 22 variantes, 466 días; 121 días.

**Por qué funciona:** R4 con gancho de recurrencia; 16 anuncios, 22 variantes.

**Qué se copia para NOCTA:** Gancho de recurrencia «si te vuelven siempre»

**Lo que no se puede decir en España y su alternativa:** Las de R4

### 48. Clear Nose Overnight ✨ — «Si tienes más de 40 y sigues peleándote con los puntitos de la nariz, mira esto.»

**Métricas:** 16 anuncios · 4 grabaciones · 466 días acumulados · máx. 75 días · 28 variantes · landing hydrocolloid-nose-patches · 2026-01-21 → 2026-07-17 · 82 s

**Señales de conversión:** 16 anuncios, 4 vídeos, 28 variantes, 466 días; 75 días.

**Por qué funciona:** 82 segundos (largo) pero 16 anuncios y 28 variantes: enseña la diferencia punto negro / filamento (color, zona, extracción) y por qué la piel madura no aguanta apretar. Es la «clase» para Marisol.

**Qué se copia para NOCTA:** Tabla verbal punto negro vs filamento (negro/aislado vs gris/en toda la nariz) · «Más visibles con la edad»

**Lo que no se puede decir en España y su alternativa:** Corea → condicional

### 49. No More Nose Bumps — «Tienes estos puntos en la nariz y seguramente crees que puedes sacarlos apretando. Por favor, no»

**Métricas:** 9 anuncios · 3 grabaciones · 503 días acumulados · máx. 163 días · 13 variantes · landing hydrocolloid-nose-patches · 2025-11-18 → 2026-05-15 · 52 s

**Señales de conversión:** 9 anuncios, 3 vídeos, 13 variantes, 503 días; 163 días.

**Por qué funciona:** Regrabación 2025-26 de R6 con «60 día garantía» explícita: 163 días.

**Qué se copia para NOCTA:** Las de R6

**Lo que no se puede decir en España y su alternativa:** Las de R6

### 50. No More Nose Bumps — «Si te los has estado apretando, enhorabuena: lo hacías mal… Mira, mira todo eso. Madre mía.»

**Métricas:** 14 anuncios · 1 grabaciones · 500 días acumulados · máx. 108 días · 25 variantes · landing hydrocolloid-nose-patches · 2026-01-22 → 2026-08-15 · 44 s

**Señales de conversión:** 14 anuncios, 1 vídeo, 25 variantes, 500 días; 108 días.

**Por qué funciona:** Anuncio de reacción genuina: un amigo le recomienda, se lo pone, se lo quita en cámara y reacciona («oh my gosh, dude, that was all in my nose»). 14 anuncios, 25 variantes, un solo vídeo. Para Álex, la reacción espontánea vale más que el guion.

**Qué se copia para NOCTA:** Reacción en directo sin guion para Álex · «Un colega me lo recomendó»

**Lo que no se puede decir en España y su alternativa:** Ninguno

### 51. One Patch. Real Results. — «Si tu nariz se ve así, no tienes puntos negros. Tienes filamentos.»

**Métricas:** 20 anuncios · 7 grabaciones · 391 días acumulados · máx. 60 días · 30 variantes · landing hydrocolloid-nose-patches · 2026-02-10 → 2026-05-15 · 57 s

**Señales de conversión:** 20 anuncios, 7 vídeos, 30 variantes, 391 días; 60 días.

**Por qué funciona:** R4 con arranque «si tu nariz se ve así»: 20 anuncios, 30 variantes en 3 meses (vida corta por anuncio, 60 días, pero muchísima rotación).

**Qué se copia para NOCTA:** Arranque visual «si tu nariz se ve así» + nariz en macro

**Lo que no se puede decir en España y su alternativa:** Las de R4

### 52. From Oily Nose to Clear Skin — «Ocho señales de que tu nariz necesita más cuidado…»

**Métricas:** 4 anuncios · 2 grabaciones · 507 días acumulados · máx. 195 días · 9 variantes · landing hydrocolloid-nose-patches · 2025-06-18 → 2025-10-31 · 39 s

**Señales de conversión:** 4 anuncios, 2 vídeos, 9 variantes, 507 días; 195 días.

**Por qué funciona:** Listicle largo en ráfaga con claims cuantitativos («3× smaller pores, 24-hour oil control, 2× smoother») que en España no se pueden usar. 195 días en 2025.

**Qué se copia para NOCTA:** Formato ráfaga de síntomas (sin cifras)

**Lo que no se puede decir en España y su alternativa:** «3× smaller pores», «24-hour oil control», «2× smoother» → eliminar

### 53. Clear Nose Overnight ✨ — «Mira lo que pasa cuando deja de tratarlos como puntos negros y usa los parches tres semanas. Semana 1… 2… 3…»

**Métricas:** 10 anuncios · 1 grabaciones · 500 días acumulados · máx. 114 días · 13 variantes · landing hydrocolloid-nose-patches · 2026-01-30 → 2026-07-17 · 42 s

**Señales de conversión:** 10 anuncios, 1 vídeo, 13 variantes, 500 días; 114 días.

**Por qué funciona:** Estructura de diario (semana 1, 2, 3) en tercera persona; 114 días, 13 variantes. Molde para el anuncio de «7 noches» y «14 días» de NOCTA.

**Qué se copia para NOCTA:** Cronología semana a semana con expectativas realistas (semana 1: se afloja; 2: más claros; 3: deja de volver)

**Lo que no se puede decir en España y su alternativa:** «the buildup stopped coming back» → «volvía mucho menos»

### 54. From Oily Nose to Clear Skin — «Esto me quitó los filamentos rebeldes… Pensaba que estaba condenada a la nariz de fresa.»

**Métricas:** 8 anuncios · 2 grabaciones · 477 días acumulados · máx. 182 días · 14 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2026-05-14 · 42 s

**Señales de conversión:** 8 anuncios, 2 vídeos, 14 variantes, 477 días; 182 días.

**Por qué funciona:** 182 días: metáfora «nariz de fresa» + «el residuo blanco te enseña lo que había». Explica la diferencia de grasas entre punto negro y filamento.

**Qué se copia para NOCTA:** «Nariz de fresa» · «El blanco del parche te enseña lo que había dentro»

**Lo que no se puede decir en España y su alternativa:** «got rid of» → «se notan mucho menos»

### 55. One Patch. Real Results. — «Ojalá me lo hubieran dicho a los 20… eres un hombre hecho y derecho con la misma nariz que en el instituto.»

**Métricas:** 22 anuncios · 4 grabaciones · 416 días acumulados · máx. 75 días · 31 variantes · landing hydrocolloid-nose-patches · 2026-02-01 → 2026-08-13 · 55 s

**Señales de conversión:** 22 anuncios, 4 vídeos, 31 variantes, 416 días; 75 días.

**Por qué funciona:** 22 anuncios, 31 variantes: el guion de Álex 35+ con detalles reales (videollamadas, reuniones, «mi mujer lo notó», «mis compañeros dicen que voy más arreglado»). Prueba social de entorno laboral.

**Qué se copia para NOCTA:** Detalles de vida real de Álex 35+: videollamadas, reuniones, pareja · «Sin rutina de mañana»

**Lo que no se puede decir en España y su alternativa:** Corea → condicional; «100 % risk-free» → «sin riesgo»

### 56. Your Pores Deserve Better — «Si tu nariz se ve así, no tienes puntos negros. Tienes tapones de grasa…»

**Métricas:** 11 anuncios · 5 grabaciones · 418 días acumulados · máx. 88 días · 17 variantes · landing hydrocolloid-nose-patches · 2026-05-22 → 2026-08-13 · 115 s

**Señales de conversión:** 11 anuncios, 5 vídeos, 17 variantes, 418 días; 88 días.

**Por qué funciona:** 115 s: la versión larga de R13. 11 anuncios y 88 días: funciona, pero peor por segundo que la de 40 s. Evidencia contra alargar.

**Qué se copia para NOCTA:** Nada nuevo; confirma 40 s

**Lo que no se puede decir en España y su alternativa:** Las de R13

### 57. Break the Cycle — «Si los puntitos te vuelven siempre, deja de hacer esto… Es un bucle sin fin.»

**Métricas:** 9 anuncios · 2 grabaciones · 441 días acumulados · máx. 119 días · 21 variantes · landing hydrocolloid-nose-patches · 2026-02-16 → 2026-05-15 · 55 s

**Señales de conversión:** 9 anuncios, 2 vídeos, 21 variantes, 441 días; 119 días.

**Por qué funciona:** Cuerpo de R3 con gancho de recurrencia y cierre «dale un respiro a tu piel»; 119 días, 21 variantes.

**Qué se copia para NOCTA:** «Bucle sin fin» · «Dale un respiro a tu piel»

**Lo que no se puede decir en España y su alternativa:** Corea → condicional

### 58. Clogged Pores? Try this 👆 — «El producto secreto que me transformó la nariz… se ha agotado cuatro veces.»

**Métricas:** 3 anuncios · 1 grabaciones · 517 días acumulados · máx. 223 días · 3 variantes · landing hydrocolloid-nose-patches · 2025-06-16 → 2025-09-24 · 21 s

**Señales de conversión:** 3 anuncios, 1 vídeo, 3 variantes, 517 días; 223 días.

**Por qué funciona:** 21 segundos y 223 días con solo 3 anuncios: escasez concreta («cuatro veces agotado») + «se ve funcionando».

**Qué se copia para NOCTA:** Escasez concreta y verificable (lote piloto)

**Lo que no se puede decir en España y su alternativa:** Ninguno

### 59. Break the Cycle — «Si tienes puntitos en la nariz, deja de hacer esto.»

**Métricas:** 9 anuncios · 6 grabaciones · 377 días acumulados · máx. 117 días · 12 variantes · landing hydrocolloid-nose-patches · 2026-02-11 → 2026-05-15 · 50 s

**Señales de conversión:** 9 anuncios, 6 vídeos, 12 variantes, 377 días; 117 días.

**Por qué funciona:** Tercera grabación de R3 con 6 vídeos: 117 días.

**Qué se copia para NOCTA:** Las de R3

**Lo que no se puede decir en España y su alternativa:** Las de R3

### 60. Clear Skin, No Effort — «No me lo puedo creer… Cariño, ¿llevas mis parches de nariz?»

**Métricas:** 6 anuncios · 5 grabaciones · 400 días acumulados · máx. 111 días · 9 variantes · landing hydrocolloid-nose-patches · 2026-04-28 → 2026-06-30 · 84 s

**Señales de conversión:** 6 anuncios, 5 vídeos, 9 variantes, 400 días; 111 días.

**Por qué funciona:** Vídeo de pareja improvisado (84 s): él usa los parches de ella a escondidas, retirada en cámara, «esto salió de tu nariz», «tú compras el siguiente lote». 111 días con 5 grabaciones. Autenticidad > guion.

**Qué se copia para NOCTA:** Vídeo de pareja improvisado con retirada en cámara · «Tú compras el siguiente»

**Lo que no se puede decir en España y su alternativa:** Ninguno

## 5. Los 20 guiones que Vue apagó en una semana y por qué

| Anuncios | Días máx. | Landing | Primeras palabras |
|---:|---:|---|---|
| 10 | 5 | hydrocolloid-nose-patc | I always thought my skin could handle anything. Turns out I was wrong badly. A face wash, everyone was using i… |
| 10 | 5 | hydrocolloid-nose-patc | my face was burning before I even finished reading the ingredient list. A face wash. Everyone was using it, so… |
| 9 | 5 | hydrocolloid-nose-patc | It was just a known face wash. I didn't think twice about it. A face wash, everyone was using it, so I did too… |
| 8 | 0 | hydrocolloid-nose-patc | Do you ever wonder why those dark dots on your nose just keep coming back? Here are three reasons why. First, … |
| 6 | 4 | hydrocolloid-nose-patc | These dark spots on your nose aren't blackheads. They're called sebaceous filaments. The reason why nothing yo… |
| 6 | 5 | hydrocolloid-nose-patc | Nothing about my routine changed, I did, same products, years of the same five minutes every night on autopilo… |
| 6 | 5 | hydrocolloid-nose-patc | I kept blaming the weather and my diet, I was so wrong. Same products, years of the same 5 minutes every night… |
| 6 | 4 | hydrocolloid-nose-patc | The phone stat that's making people finally get an answer to why is it always my nose? For months, I couldn't … |
| 6 | 4 | hydrocolloid-nose-patc | There's a reason it's always my nose in the morning. Turns out, it's my pillow. Every morning, same thing. My … |
| 6 | 7 | hydrocolloid-nose-patc | If your nose looks like this, stop doing this. Stop scrubbing it, stop squeezing it, stop letting your wife or… |
| 5 | 5 | patches | 58.25. That's how much your skin's moisture loss can change with hard water exposure. I moved apartments last … |
| 5 | 5 | hydrocolloid-nose-patc | The 96% bacteria stat that's making people rethink how often they touch their own face happened by accident. F… |
| 5 | 4 | patches | I finally know why it's always my nose, blame the phone. For months, I couldn't figure out why my nose specifi… |
| 5 | 5 | patches | The pillow fact that's making people finally get an answer to, why is it always my nose? Every morning, same t… |
| 5 | 5 | patches | There's a clinical reason hard water clogs pours, it's not your routine, it's your tap. I moved apartments las… |
| 5 | 4 | patches | The overnight habit that's making meticulous skin care people question their pillow happened by accident every… |
| 4 | 7 | hydrocolloid-nose-patc | If you see these dark dots on your nose, it's not dirt, it's not blackheads, it's oil buildup called sebaceous… |
| 4 | 7 | hydrocolloid-nose-patc | Stop, stop, stop, stop, stop. If your pores look like this, then stop what you're doing. Stop scrubbing it, st… |
| 4 | 4 | hydrocolloid-nose-patc | If your nose looks like this, you don't have blackheads. You just have oil plugs in your pores, and have an oi… |
| 4 | 5 | hydrocolloid-nose-patc | Wait, why did no one tell me I could actually clear the dark dots on my nose? I've had these dark dots on my n… |

#### Qué tienen en común los 20 guiones que Vue apagó en menos de una semana

Se han leído los 20 guiones «muertos» con más anuncios (todos con 3 o más anuncios y ninguno con más de 7 días de vida). Son de tres tipos, y los tres enseñan algo distinto:

**Tipo 1 — La ola de «relatos sensibles» de agosto de 2026 (12 de los 20).** Entre el 27 y el 31 de agosto de 2026 Vue lanzó una tanda de guiones de 45–58 segundos con un estilo nuevo: narración íntima en primera persona, sin nariz en pantalla al principio, sin producto hasta el final (o sin producto), y con «datos» ajenos al parche: «el 96 % de bacterias del móvil», «la almohada», «el agua dura de mi nuevo piso», «mi piel había cambiado sin avisarme… una especie de duelo». Todos murieron en 4–5 días con 5–10 anuncios cada uno. Lo que falla es sistemático: (a) el gancho no muestra el problema ni contradice nada («Siempre pensé que mi piel lo aguantaba todo»); (b) tardan 20–30 segundos en llegar a la nariz; (c) el mecanismo del parche no aparece: hablan de móviles, almohadas y filtros de agua; (d) no hay prueba visual; (e) la landing era la colección «patches», no la ficha; (f) el tono es de podcast, no de anuncio. Es la demostración de que la audiencia de Vue no compra «bienestar»: compra un diagnóstico y una prueba.

**Tipo 2 — Ganadores que murieron con otra ejecución (5 de los 20).** «If your nose looks like this, stop doing this. Stop scrubbing it… stop letting your wife or girlfriend squeeze it» (0–7 días) es un pariente directo de R3 (1.197 días); «Stop, stop, stop, stop, stop» es R4 con un arranque histriónico y una cifra inventada («357.000 mujeres»); «If you see these dark dots… it's not dirt» es R13 palabra por palabra (0–7 días frente a 782); la versión de 114 segundos de R56 murió mientras la de 40 s (R13) vivía. Lo que cambió no fue el texto: fue la persona, el ritmo, la duración o una exageración. Conclusión: **el guion no vende solo; vende la ejecución**, y una cifra inventada o un arranque sobreactuado mata un guion probado.

**Tipo 3 — Buenas intenciones que no venden (3 de los 20).** «Do you ever wonder why those dark dots keep coming back? Here are three reasons» (47 s, murió en 0 días): correcto pero blando, sin prueba, con cierre «es lo más suave que he añadido» (habla de suavidad, no de resultado). «Wait, why did no one tell me…» (60 s): un anuncio «honesto» que dedica 20 segundos a decir lo que el producto NO hace («no es magia, no funciona para todo el mundo, si lo dejas vuelven») antes de explicar lo que hace: la honestidad vende cuando es una frase (R4: «no se curan, se controlan»), no cuando es un párrafo. «If your nose looks like this, you don't have blackheads» en 114 s: la duración mata.

#### Los 15 errores que matan un anuncio (con ejemplo literal)

1. **Empezar sin la nariz en pantalla ni una contradicción.** «I always thought my skin could handle anything» (muerto en 5 días) frente a «These dark spots on your nose aren't blackheads» (1.900 días).
2. **Tardar más de 10 segundos en nombrar el problema real.** Los relatos de agosto llegan a la nariz en el segundo 25–35.
3. **Hablar de otra cosa** (móvil, almohada, agua dura, cambio de piso). El espectador vino por la nariz.
4. **Sin mecanismo.** Ninguno de los 12 relatos explica qué hace el parche. Todos los ganadores lo hacen en ≤ 10 s.
5. **Sin prueba visual.** Ningún muerto enseña el parche usado; 52 de 60 ganadores sí o lo describen.
6. **Más de 60 segundos** sin una estructura de preguntas que sostenga la retención (R56 vs R13; el de 114 s).
7. **Arranque sobreactuado** («Stop, stop, stop, stop, stop»): el «para de» funciona una vez, no cinco.
8. **Cifras inventadas** («357.000 women already stopped fighting their nose»): el público de skincare las huele; en España además son ilegales sin fuente.
9. **Honestidad en párrafo.** Decir tres veces lo que el producto no hace antes de decir lo que hace (el «anti-hype» de 60 s).
10. **Tono de podcast**: frases largas, metáforas literarias («una especie de duelo»), voz baja, sin cortes.
11. **Landing a colección** («patches») en vez de a la ficha: 6 de los 20 muertos.
12. **Promesa vaga** («lo más suave que he añadido a mi rutina»): el ganador promete algo medible («días, no horas», «tres semanas»).
13. **Regrabar un ganador con una persona que no encaja** (R21 duró 223 días con un creador y 0 con otro): probar la persona con 15 € antes de escalar.
14. **Alargar un ganador** (R13 40 s → 115 s: de 782 días a 418 con más anuncios).
15. **Lanzar 8–10 anuncios del mismo guion nuevo de golpe** sin haber probado uno: la ola de agosto quemó 90 anuncios en una semana.

#### Checklist de descarte antes de producir (20 puntos)

1. ¿En el segundo 0–1 se ve la nariz, el parche o el gesto de apretar? 2. ¿La primera frase contradice, ordena, pregunta o promete una lista? 3. ¿Se nombra el problema real («no son puntos negros» / «se rellenan») antes del segundo 10? 4. ¿Se explica el mecanismo (absorbe de noche, no arranca) en ≤ 10 s? 5. ¿Hay prueba visual del parche usado antes del 60 % del vídeo? 6. ¿Hay un contraste con lo que el espectador hace hoy (tiras, apretar, frotar)? 7. ¿Se resuelve la recurrencia («por eso vuelven»)? 8. ¿La promesa es medible y honesta («menos visibles», «días, no horas», «tres semanas»)? 9. ¿Dura 20–45 s (o ≤ 64 s con cadena de preguntas)? 10. ¿Cada frase tiene ≤ 12 palabras? 11. ¿Se habla de tú y a un avatar concreto? 12. ¿Hay una frase de identidad («la mayoría de las mujeres…», «tíos de más de 35…»)? 13. ¿Se cierra con garantía + CTA en ≤ 6 s? 14. ¿La landing es la ficha con el pack preseleccionado? 15. ¿Ninguna cifra sin fuente? 16. ¿Ningún claim prohibido (cura, elimina para siempre, dermatólogos, medical-grade, Corea sin lote coreano)? 17. ¿No hay más de dos segundos seguidos sin cambio de plano o rótulo? 18. ¿Los subtítulos están quemados y grandes? 19. ¿El sonido no es imprescindible para entenderlo? 20. ¿Es distinto en gancho y formato de los otros 4 que se lanzan esa semana?

#### Cinco trampas que parecen buenas ideas

1. **«Vamos a contar una historia bonita»**: las historias funcionan solo si empiezan por la prueba (R7) o por el daño (R23).
2. **«Vamos a educar con datos»** (móvil, almohada, agua): educar sí, pero sobre la nariz y en 8 segundos.
3. **«Vamos a ser muy honestos»** durante 20 segundos: una frase honesta (R4) vale; un párrafo mata.
4. **«Vamos a hacerlo más largo para explicar mejor»**: 40 s gana a 115 s con el mismo texto.
5. **«Este guion ya funcionó, lo grabo con quien sea»**: la persona es la mitad del anuncio; probar con 15 €.


## 6. El playbook NOCTA: lo que se aplica a los 100 guiones

#### 1. Cómo se ha medido qué funciona
Días activos acumulados por guion (todos los anuncios que lo usan), variantes de texto/miniatura agrupadas y número de grabaciones distintas del mismo guion. Un anunciante que gasta ≈ 1,8 M € y apaga el 34 % de sus anuncios en 7 días solo mantiene, multiplica y regraba lo que vende. Se han leído los 60 guiones con más puntuación y los 20 con más anuncios muertos en ≤ 7 días.

#### 2. Los 25 mejores en una línea
| # | Gancho | Arquetipo | Métricas | Por qué |
|---|---|---|---|---|
| 1 | «Esos puntitos no son puntos negros» | Plantilla maestra (reencuadre) | 29 anuncios · 16 grabaciones · 57 variantes · 1.900 días | Contradice, absuelve, explica la recurrencia, encaje exacto, plazo, garantía; modular por identidad |
| 2 | «La mayoría de las mujeres cree…» | Plantilla maestra, identidad mujer | 27 · 9 · 47 · 1.627 | Misma máquina, otro público |
| 3 | «Si crees que son puntos negros, deja de hacer esto» | «Para de» + espejo emocional | 31 · 8 · 56 · 1.197 | 15 s de síntomas concretos; promesa honesta |
| 4 | «Deja de apretar esos puntitos» | «Para de» + honestidad | 25 · 13 · 38 · 1.027 | «No se curan, se controlan»; «días, no horas»; escasez real |
| 5 | «¿Funcionan de verdad los parches?» | Pregunta + mecanismo | 21 · 6 · 42 · 1.019 | Explica el blanqueo como prueba objetiva |
| 6 | «Por favor, no» | Advertencia de amigo + tubitos + imán | 14 · 10 · 23 · 957 | Dos metáforas en 39 s; familia con 5 versiones |
| 7 | «Mi piel es un catfish» | Historia que empieza por la prueba | 12 · 3 · 14 · 1.056 | Beneficio de identidad (sin filtros) |
| 8 | «Las tiras son una estafa» | Enemigo común | 12 · 3 · 13 · 1.006 | Absolución + contraste físico |
| 9 | «Tres señales de alarma» | Listicle | 12 · 3 · 21 · 983 | Auto-diagnóstico, promesa moderada |
| 10 | «Iba a hacerme un láser» | Anti-caro | 10 · 3 · 11 · 969 | Ancla de precio; doble prueba |
| 11 | «Corea va 10 años por delante» | Tesis K-beauty | 11 · 1 · 12 · 990 | Contraste superficie/profundo |
| 12 | «Por eso creamos un parche suave» | Voz de marca | 9 · 3 · 10 · 916 | Presentación + escasez |
| 13 | «No es suciedad, no son puntos negros, es grasa» | Triple negación (40 s) | 22 · 8 · 43 · 782 | La versión más densa; 40 s óptimo |
| 15 | «Tres razones… y una por la que no» | Listicle con giro | 12 · 1 · 16 · 857 | Pega falsa = credibilidad |
| 16 | «Tíos de más de 35» | Plantilla maestra, hombre 35+ | 7 · 3 · 17 · 818 | Segmento en la primera frase |
| 17 | «Si tus poros se ven así… o así» | Doble reconocimiento + consejo | 8 · 1 · 15 · 846 | Ancla «un rímel» |
| 19 | «El secreto después de los 40 no es el láser» | Edad + anti-caro | 10 · 7 · 11 · 749 | El guion de Marisol |
| 20 | «No los aprietes. Usa esto.» | Ultracorto (22 s) | 10 · 1 · 19 · 800 | Recordatorio/retargeting |
| 21 | «La verdad que nadie te cuenta» | Secreto masculino | 12 · 5 · 12 · 700 | Reto al escéptico |
| 23 | «Esto es lo que pasa por no cuidar los poros» | Daño primero (27 s) | 6 · 1 · 7 · 756 | Puntos blancos en el parche; frecuencia real |
| 25 | «Los dos únicos productos» | Dúo | 8 · 1 · 8 · 732 | Simplicidad |
| 26 | «¿Te da vergüenza el maquillaje así?» | 15 s, una imagen | 8 · 1 · 10 · 720 | Un problema, un beneficio |
| 28 | «Te enseño cómo pasé de esto a esto» | Peel reveal en directo (hombre) | 13 · 3 · 22 · 644 | Demostración > explicación |
| 29 | «Tres señales… amiga» | Listicle rápido | 11 · 2 · 20 · 656 | Tono de amiga |
| 30 | «Tuve que explicárselo a mi novio» | Pareja | 8 · 2 · 17 · 661 | Ella compra, él usa |

#### 3. La plantilla maestra segundo a segundo (lo que hacen 40 de los 60)
| Segundos | Bloque | Qué se ve | Qué se dice | Evidencia |
|---|---|---|---|---|
| 0–3 | Gancho | Nariz en macro, dedos apretando o parche en mano | Contradicción («no son puntos negros»), orden («deja de…»), pregunta o lista; identidad opcional («la mayoría de las mujeres…») | R1–R4, R13, R51 |
| 3–10 | Reencuadre | Macro, rótulo con el nombre | «Se llaman filamentos: grasa que se rellena sola» | 46 de 60 |
| 10–16 | Absolución + recurrencia | Tiras, botes, gesto de apretar | «Nada te funcionó porque los tratabas como puntos negros. Por eso vuelven.» | R1, R4, R13, R47 |
| 16–24 | Mecanismo + contraste | Parche aplicado por la noche | «Absorbe la grasa mientras duermes en vez de arrancar como las tiras» (+ imán / tubitos / gradiente) | 55 de 60 |
| 24–32 | Prueba | Parche retirado por la mañana, blanquecino; antes/después | «Mira. A las tres semanas casi no se veían» / «días, no horas» | 52 de 60 |
| 32–38 | Identidad / prueba social | Caras, reseñas | «Un montón de mujeres/tíos por fin entienden por qué…» | R1 familia |
| 38–44 | Garantía + CTA | Web, pack | «Y si no te convence, te devuelven el dinero. Pincha abajo.» | 54 de 60 citan garantía |
Duración óptima: **35–45 s** (27 % de longevos en 30–45 s; R13 40 s > R56 115 s). Ultracortos de 15–26 s funcionan como recordatorio (R20, R26, R28) y largos de 55–64 s solo con cadena de preguntas (R5) o espejo emocional (R3).

#### 4. Los 8 arquetipos y cuándo usar cada uno
1. **Reencuadre modular** (R1 familia): tráfico frío, cualquier avatar; cambiar solo la primera frase por identidad.
2. **«Para de» + espejo** (R3, R4, R51): frío; cuando el público ya ha probado tiras/apretar.
3. **Pregunta + mecanismo** (R5, R36): templado/retargeting; Álex.
4. **Amigo que avisa + metáforas** (R6 familia): frío; Bea 20s y Marisol 40+ con la misma estructura.
5. **Historia que empieza por la prueba** (R7, R23, R37): Bea; nunca empezar por «yo antes…».
6. **Listicle** (R9, R15, R17, R29, R34): frío; el «3» siempre; una pega al final para credibilidad.
7. **Anti-caro / anti-agresivo** (R10, R19, R31, R38, R46): Marisol; ancla con precio real de láser o cabina.
8. **Demostración pura / reacción** (R28, R50, R60): Álex y TikTok; retirada en cámara, sin explicar.

#### 5. Jerarquía de argumentos y objeciones (el orden que convence)
1. Diagnóstico nuevo (no son puntos negros) → 2. No es culpa tuya / por eso vuelven → 3. Lo que haces lo empeora (tiras, apretar) → 4. Esto absorbe en vez de arrancar → 5. Lo ves en el parche por la mañana → 6. Resultado medible y honesto (3 semanas, días no horas, menos visibles) → 7. Gente como tú → 8. Sin riesgo (garantía) → 9. Escasez real → 10. CTA.
Objeciones en orden de frecuencia en los 60: vuelven (41) · irrita/duele (38) · ya lo probé todo (33) · ¿funciona? (30) · piel sensible (12) · precio (8) · tiempo/rutina (9) · ¿para mi edad? (11).

#### 6. Las 40 frases imprescindibles (ver banco completo en la sección 7 del estudio)
Esos puntitos no son puntos negros · Se llaman filamentos: grasa que tu piel fabrica sola · Nada te funcionó porque los tratabas como puntos negros · Por eso vuelven siempre · Deja de apretarte · Por favor, no · Es un ciclo: apretar, limpiar, repetir · No se curan, se controlan · No es suciedad · Solo cabrean a tu piel · Tubitos · Como un imán · Absorben la grasa mientras duermes · En vez de arrancarte la piel · Sin arrancar, sin rojeces, sin pelearte cada día · Sin rutina larga · El parche se pone blanco: así ves que funciona · Mira · A las tres semanas casi no se veían · Días, no horas · Todos esos puntos blancos eran lo que había dentro · Qué asco, y qué gusto · Un montón de mujeres por fin entienden · Te lo prometo: no eres tú · No estás sola · Las tiras solo limpian la capa de arriba · Los limpiadores no llegan tan abajo · Lo agresivo envejece mal · Iba a hacerme un láser · Por menos de lo que cuesta un rímel · Los dos únicos parches que necesitas · De esto a esto · Ojalá me lo hubieran dicho a los 20 · Nariz de fresa · Filtro andante · El único problema: se agotan · Pruébalos 60 días sin riesgo · Si no te convence, te devuelven el dinero · Controla tu nariz de una vez · Ya me lo agradecerás.

#### 7. Reglas por avatar
- **Bea (18–28)**: tono amiga/tía, selfies y filtros, «puntitos», humor (hermana que roba parches), TikTok 20–30 s, peel reveal pronto, maquillaje más liso; ganadores: R7, R15, R23, R29, R33, R37, R43.
- **Marisol (35–50)**: edad explícita en el gancho, miedo a dañar la piel madura, láser/cabina como ancla, maquillaje que se cuartea, honestidad, 35–45 s; ganadores: R2, R9, R19, R26, R27, R31, R38, R39, R48, R53.
- **Álex (22–40)**: «tíos», demostración antes que explicación, mecanismo racional si hay tiempo, beneficio social (lo va a notar), sin rutina, reacción en directo; ganadores: R1 (versión guys), R16, R18, R21, R24, R28, R45, R50, R55.

#### 8. Lo que mata un anuncio y checklist
Ver `playbook_perdedores` (15 errores, 20 puntos de checklist, 5 trampas). Resumen: sin nariz en el segundo 0, sin diagnóstico antes del 10, sin mecanismo, sin prueba, más de 60 s, cifras inventadas, honestidad en párrafo, tono de podcast, landing a colección, regrabar con quien sea, alargar lo que funcionaba.

#### 9. Claims
Ver tabla en el banco de lenguaje: nada de «desaparecen», «cura», «dermatólogos», «medical-grade», «Corea» sin lote coreano, cifras sin fuente, «resultados al primer uso» (→ «desde la primera noche ves lo que sale»).

#### 10. Cómo se aplica a un guion NOCTA (el rank 1 reescrito, 40 s)
| s | Se ve | Texto en pantalla | Voz |
|---|---|---|---|
| 0–3 | Macro de la nariz de Bea, dedo señalando | NO SON PUNTOS NEGROS | Esos puntitos de la nariz no son puntos negros. |
| 3–9 | Macro más cerca; rótulo | FILAMENTOS = grasa que se rellena | Se llaman filamentos: grasa que tu piel fabrica sola y que se rellena cada día. |
| 9–15 | Tira de farmacia, dedos apretando, botes | Por eso vuelven | Nada te ha funcionado porque los tratabas como puntos negros. Por eso vuelven siempre. |
| 15–23 | Parche NOCTA en mano; aplicación en la nariz por la noche | Absorbe. No arranca. | Este parche está hecho para eso: absorbe la grasa mientras duermes, en vez de arrancarte la piel como las tiras. |
| 23–31 | Mañana: retirada lenta, parche a contraluz con puntos blancos; nariz | Mira lo que sale | Por la mañana lo ves en el parche. Y a las tres semanas casi no se notan. |
| 31–36 | Caja + pack de 2 | 2 cajas · 29,90 € · envío gratis | Un montón de gente por fin entiende por qué nada le funcionaba. |
| 36–40 | Web NOCTA con la garantía | Si no se pega, te lo cambiamos | Y si no te convence, te devolvemos el dinero. Pack de 2 cajas, envío gratis. |


## 7. Banco de lenguaje completo (inglés → español de España)

#### Banco de lenguaje ganador (inglés → español de España, adaptado, no traducido)

**Ganchos (0–3 s)**
| Original (rank) | NOCTA |
|---|---|
| These dark spots on your nose aren't blackheads. (R1) | Esos puntitos de la nariz no son puntos negros. |
| Most women think these are blackheads. They're not. (R2) | La mayoría de las mujeres cree que esto son puntos negros. No lo son. |
| Most guys over 35 think these are blackheads. (R16) | La mayoría de los tíos de más de 35 cree que esto son puntos negros. |
| If you think these are blackheads, stop doing this. (R3) | Si crees que esto son puntos negros, deja de hacer esto. |
| Stop squeezing these dark dots. (R4) | Deja de apretarte esos puntitos. |
| Do nose patches actually work for those dark dots? (R5) | ¿Funcionan de verdad los parches de nariz? |
| You have these black dots… you might think you can squeeze them out. Please don't. (R6) | Tienes estos puntitos y crees que puedes sacarlos apretando. Por favor, no. |
| My skin's a catfish, but I'm about to fix it. (R7) | Mi piel era un filtro andante. Y lo he arreglado. |
| Pore strips are a scam. Here's what actually works. (R8) | Las tiras de poros no sirven. Esto es lo que funciona. |
| Still dealing with clogged pores? These three red flags explain why. (R9) | ¿Sigues con los poros tapados? Estas tres señales explican por qué. |
| I was ready to do laser… until I discovered this. (R10) | Iba a hacerme un láser hasta que descubrí esto. |
| If you see these dots… it's not dirt, it's not blackheads, it's oil buildup. (R13) | Si ves estos puntitos: no es suciedad, no son puntos negros, es grasa. |
| Three reasons why I love these… and one reason why I don't. (R15) | Tres razones por las que me encantan y una por la que no. |
| If your pores look like this or like this… (R17) | Si tus poros se ven así… o así… |
| The secret to smooth pores after 40 is not using a laser. (R19) | El secreto de una nariz lisa después de los 40 no es el láser. |
| Here's the truth… that nobody talks about. Guys, listen up. (R21) | La verdad que nadie te cuenta sobre los puntos de la nariz. Chicos, atentos. |
| This is the consequence of not taking care of my pores. (R23) | Esto es lo que pasa por no cuidar los poros. |
| The only two products you need… from this to this. (R25) | Los dos únicos productos que necesitas: de esto a esto. |
| Embarrassed of makeup looking like this? (R26) | ¿Te da vergüenza que la base se te vea así? |
| Let me show you how I took my skin from this to this. (R28) | Te enseño cómo pasé de esto a esto. |
| I had to teach my boyfriend these aren't blackheads. (R30) | Tuve que explicarle a mi novio que eso no son puntos negros. |
| Your pores refill every 24 hours. That's why your nose never stays matte. (R36) | Tus poros se rellenan cada 24 horas. Por eso la nariz nunca se te queda mate. |
| I promise you're not alone. (R39) | Te prometo que no estás sola. |
| Every time you rip off a pore strip, you're damaging your skin. (R46) | Cada vez que te arrancas una tira, te dañas la piel. |
| If your dark nose dots keep coming back, they're not blackheads. (R47) | Si te vuelven siempre, no son puntos negros. |
| If your nose looks like this, you don't have blackheads. (R51) | Si tu nariz se ve así, no tienes puntos negros. |
| Wish someone told me this in my 20s. (R55) | Ojalá me lo hubieran dicho a los 20. |
| If you've been squeezing these, congrats, you've been doing it wrong. (R50) | Si te los aprietas: enhorabuena, lo estabas haciendo mal. |

**Reencuadre (3–10 s)**
| Original | NOCTA |
|---|---|
| They're called sebaceous filaments, basically oil plugs that form naturally in your pores. | Se llaman filamentos sebáceos: tapones de grasa que tu piel fabrica sola. |
| the reason why nothing you've tried works is because you've been treating them like blackheads | Nada te ha funcionado porque los tratabas como puntos negros. |
| That's why they keep coming back. | Por eso vuelven siempre. |
| tiny tubes producing oil, dead skin cells, and bacteria | tubitos que fabrican grasa, células muertas y bacterias |
| oil channels your skin refills every day | canales de grasa que tu piel rellena cada día |
| It's a cycle: fight, clear, repeat. | Es un ciclo: apretar, limpiar, repetir. |
| You can't cure them, but you can control them. | No se curan. Se controlan. |
| It's not dirt. | No es suciedad. |
| they're not solving the problem, they're just making your skin angrier | no arreglan nada: solo cabrean a tu piel |
| It was like my nose had a mind of its own. | Era como si mi nariz fuera por libre. |
| nose look like a strawberry | nariz de fresa |
| oxidized oil trapped deep in your pores | grasa oxidada al fondo del poro |
| that only clears the very top | eso solo limpia la capa de arriba |
| Regular cleansers can't reach deep enough. | Los limpiadores no llegan tan abajo. |

**Mecanismo (10–20 s)**
| Original | NOCTA |
|---|---|
| specifically designed for sebaceous filaments, not blackheads, which is why they actually work | hechos para filamentos, no para puntos negros: por eso sí funcionan |
| They gently absorb the oil buildup overnight instead of ripping your skin like those painful strips. | Absorben la grasa mientras duermes, en vez de arrancarte la piel como las tiras. |
| They work like a magnet. | Funcionan como un imán. |
| absorb the excess oil from inside your pores while you sleep | sacan la grasa desde dentro del poro mientras duermes |
| No ripping, no redness, no daily battle. | Sin arrancar, sin rojeces, sin pelearte cada día. |
| No ripping, no irritation, no drama. | Sin arrancar, sin irritar, sin dramas. |
| oil wants to move from a wet area to a dry area | la grasa se va hacia donde está seco |
| turning the patch white or cloudy, which shows you it's working | el parche se pone blanco: así ves que está funcionando |
| Press one on before bed. | Te pones uno antes de dormir. |
| No long skincare routine. | Sin rutina larga. |
| perfectly sized for your nose | con el tamaño justo para la nariz |

**Prueba (20–35 s)**
| Original | NOCTA |
|---|---|
| after three weeks, those dark spots were completely gone. Check it out. | a las tres semanas casi no se veían. Mira. |
| my nose stayed clear for days, not hours | la nariz me duró limpia días, no horas |
| Look at all of this gunk. It's disgusting. | Mira todo lo que ha salido. Qué asco. |
| All those white spots, that's what was clogging my pores. | Todos esos puntos blancos eran lo que me taponaba los poros. |
| You can actually see what comes out on the patch the next morning. | Por la mañana ves en el parche lo que ha salido. |
| It's so satisfying to see the results on the patch in the morning. | Da gusto ver el parche por la mañana. |
| Look at these before and after. | Mira el antes y el después. |
| One pack is all it took for me to see the difference. | Con una caja ya noté la diferencia. |
| Week 1… Week 2… Week 3… | Semana 1… semana 2… semana 3… |
| Even he admits I was right. | Hasta él admite que yo tenía razón. |

**Objeciones y honestidad**
| Original | NOCTA |
|---|---|
| I promise it's not you. | Te lo prometo: no eres tú. |
| gentle enough for sensitive skin | vale para piel sensible |
| no gimmicks, just something that actually works | sin trucos: algo que funciona |
| for less than the price of a mascara | por menos de lo que cuesta un rímel |
| I use these patches every week. | Los uso cada semana. |
| Still skeptical? Try them yourself. | ¿Sigues con dudas? Pruébalo. |

**Cierres**
| Original | NOCTA |
|---|---|
| They also offer a money back guarantee if you're not happy with the results. | Y si no te convence, te devuelven el dinero. |
| try these risk-free for 60 days | pruébalos 60 días sin riesgo |
| Only problem, they keep selling out. | El único problema: se agotan. |
| finally get your nose under control | controla tu nariz de una vez |
| You'll thank me later. | Ya me lo agradecerás. |
| your girl's gonna notice | lo va a notar |
| Your skin will thank you. | Tu piel te lo va a agradecer. |
| Go get them only if you're ready. | Cómpralos solo si vas en serio. |

#### Palabras y construcciones que se repiten en los 60 (y por qué)
- **«dark dots» / «dark spots»** (48 de 60) en vez de «blackheads»: nombran lo que se ve, no el diagnóstico. En español: **«puntitos»**.
- **«actually» / «actually work»** (39): promete que esta vez es de verdad. En español: **«de verdad»**, «sí funcionan».
- **«overnight» / «while you sleep»** (55): el momento de uso como beneficio (cero esfuerzo). En español: **«mientras duermes»**.
- **«gently» / «no ripping»** (51): contraste con las tiras. **«Sin arrancar»**.
- **«refill»** (27): explica la recurrencia. **«Se rellenan»**.
- **«guys» / «women» / «over 40» / «in your 20s»** (33): identidad en la primera frase.
- **«three weeks» / «three days» / «three reasons»** (31): el tres como número de credibilidad.
- **«check it out» / «look at»** (40): órdenes de mirar justo antes de la prueba visual.

#### Metáforas que usan y su equivalente
| Inglés | Español que funciona |
|---|---|
| catfish | filtro andante / mi cara con filtro y sin filtro |
| strawberry nose | nariz de fresa |
| oil plugs | tapones de grasa |
| tiny tubes | tubitos |
| oil channels | canales de grasa |
| magnet | imán |
| gunk | porquería / lo que sale |
| making your skin angrier | cabrear a tu piel |
| mind of its own | ir por libre |
| glass smooth | lisa como el cristal |
| matte glow | acabado mate |

#### Claims que Vue dice y lo que NOCTA puede decir
| Vue dice | Problema en UE/España | NOCTA dice |
|---|---|---|
| completely gone / got rid of | Promesa de eliminación | «casi no se ven», «se notan mucho menos» |
| cure (negado: «you can't cure them») | Bien: negar «cura» es legal y creíble | «No se curan. Se controlan.» |
| my dermatologist recommended / dermatologists warn | Aval sanitario sin prueba | «los tratamientos agresivos pueden dañar la barrera» (sin médicos) |
| backed by scientific research | Aval sin estudio | «hidrocoloide, el material de los apósitos» |
| medical grade hydrocolloid | Claim sanitario | solo si el proveedor certifica ISO 13485: «grado sanitario (ISO 13485)»; si no, «hidrocoloide» |
| made in Korea | Origen | solo con lote coreano; en el piloto: nada de origen |
| 93 % saw clearer pores / 200,000+ customers / 357,000 women | Cifras sin fuente | cifras reales de NOCTA cuando existan («los primeros 50 pedidos») |
| results after the first use / pores tighten after one use | Eficacia inmediata | «desde la primera noche ves lo que sale en el parche» |
| pores literally invisible / 3× smaller | Cuantificación | «se notan mucho menos» |
| keeps bacteria out | Claim antibacteriano | «protege la zona mientras duermes» |
| treat acne | Claim médico | nunca (para granos: «parche para granos» sin «trata») |

#### Guía de tono: así no / así sí (20 ejemplos)
| Así no (traducción literal o tono de doblaje) | Así sí (español de España oral) |
|---|---|
| Estos puntos oscuros en tu nariz no son puntos negros | Esos puntitos de la nariz no son puntos negros |
| La razón por la que nada ha funcionado es porque… | Nada te ha funcionado porque… |
| Ellos necesitan un cuidado completamente diferente | Necesitan otra cosa |
| Absorben gentilmente la acumulación de aceite | Absorben la grasa |
| Sin rasgar tu piel | Sin arrancarte la piel |
| Chequéalo | Míralo |
| Toneladas de chicas | Un montón de chicas |
| Ofrecen una garantía de devolución de dinero | Si no te convence, te devuelven el dinero |
| Ordena ahora | Cómpralo ahora |
| Ve por los tuyos | Pídelos |
| Tu chica lo va a notar | Se va a notar |
| Es un cambio de juego | Es otra cosa |
| Ayudó a transformar mi nariz | Me cambió la nariz |
| Mira a estos antes y después | Mira el antes y el después |
| Skin barrier | La barrera de la piel |
| Gunk | Lo que sale / la porquería |
| Bestie | Tía / amiga |
| Holy grail | El definitivo |
| Risk-free | Sin riesgo |
| Sold out four times | Se ha agotado cuatro veces |


