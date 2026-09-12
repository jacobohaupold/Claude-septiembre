# NOCTA — Las 375 tomas: prompts de imagen y de vídeo, anuncio por anuncio

**Versión 1.1 · 12 de septiembre de 2026.** Por cada uno de los 25 anuncios seleccionados están escritas las 15 tomas que lo componen: qué se ve en cada una, el prompt en inglés listo para copiar y pegar en **GPT Image 2.5**, qué fotos hay que adjuntarle como referencia, el prompt para animar esa imagen en **Seedance** y cuántos segundos dura el plano. Ninguna imagen lleva texto ni subtítulos: los subtítulos se ponen en el montaje.

> **Por qué está partido en un fichero por anuncio.** Junto ocupa más de un megabyte y GitHub deja de mostrarlo. Cada anuncio es un fichero de la carpeta `prompts/` y se abre desde la tabla de abajo. El anuncio 1 lleva además sus 15 imágenes ya generadas, cada una con el prompt exacto con el que salió.

## Cómo se usa

1. Abre el anuncio que vayas a producir en la tabla.
2. Copia el bloque `prompt de imagen` de la toma tal cual y adjunta las fotos que diga la línea «Referencias». Sin esas fotos el parche sale deforme: está comprobado.
3. Genera, y compara con las imágenes del anuncio 1, que son el patrón de calidad.
4. Para el vídeo tienes dos caminos: el `prompt de vídeo` de cada toma, plano a plano, o el bloque «El anuncio entero en un prompt», que mete los cortes duros dentro de un solo clip y sale más barato y más consistente.

Las reglas que hacen que el parche salga con su forma exacta están en `BIBLIA_VISUAL.md`. Qué modelo usar para cada toma, en `MODELOS_CUAL_ELEGIR.md`. El método y el reparto de créditos, en `MANUAL_HIGGSFIELD.md` y `MANUAL_VIDEO_SEEDANCE.md`.

## Los 25 anuncios

| # | Anuncio | Avatar | Sitio principal | Tomas | Ficha |
|---|---|---|---|---|---|
| 1 | Si tu nariz se ve así | Álex | Sitio principal: BAÑO DE DÍA (sitio 1 de la bi | 15 | [abrir](prompts/anuncio_01_si_tu_nariz_se_ve_asi.md) |
| 2 | Estos puntitos no son puntos negros | Bea | Cuatro de los cinco sitios de la biblia, porqu | 15 | [abrir](prompts/anuncio_02_estos_puntitos_no_son_puntos_negros.md) |
| 3 | Se rellenan cada 3 días | Marisol | Sitio 1 y sitio 2 de la biblia: EL MISMO baño  | 15 | [abrir](prompts/anuncio_03_se_rellenan_cada_3_dias.md) |
| 4 | La mayoría de las mujeres cree… | Marisol | Sitio 1 de la biblia (baño de día: azulejo bla | 15 | [abrir](prompts/anuncio_04_la_mayoria_de_las_mujeres_cree.md) |
| 7 | Lo que ves con la lupa | Bea | Eje principal: BAÑO DE DÍA (azulejo blanco tip | 15 | [abrir](prompts/anuncio_07_lo_que_ves_con_la_lupa.md) |
| 13 | Las tiras de poros son una estafa | Álex | Baño de día (azulejo blanco tipo metro, grifo  | 15 | [abrir](prompts/anuncio_13_las_tiras_de_poros_son_una_estafa.md) |
| 15 | Cada vez que aprietas | Marisol | Sitio 1 (baño de día: azulejo blanco tipo metr | 15 | [abrir](prompts/anuncio_15_cada_vez_que_aprietas.md) |
| 17 | Tira vs hidrocoloide, mismo poro, 8 horas | Álex | Sitios 2, 3, 1 y 5 de la biblia, en ese orden  | 15 | [abrir](prompts/anuncio_17_tira_vs_hidrocoloide_mismo_poro_8_horas.md) |
| 20 | Lo que hace la tira de verdad | Álex | Dos sitios de la biblia, uno por mitad del gui | 15 | [abrir](prompts/anuncio_20_lo_que_hace_la_tira_de_verdad.md) |
| 21 | 3 razones por las que te vuelven cada 3 días | Álex | Sitios 1 y 2 de la biblia, que son EL MISMO ba | 15 | [abrir](prompts/anuncio_21_3_razones_por_las_que_te_vuelven_cada_3_di.md) |
| 22 | 3 señales de que tus poros necesitan ayuda | Marisol | Sitio 1 de la biblia (baño de día: azulejo bla | 15 | [abrir](prompts/anuncio_22_3_senales_de_que_tus_poros_necesitan_ayuda.md) |
| 31 | Deja de apretarte la nariz | Álex | Dos de los cinco sitios de la biblia, en una s | 15 | [abrir](prompts/anuncio_31_deja_de_apretarte_la_nariz.md) |
| 32 | Deja de tratarlos como puntos negros | Marisol | Sitio principal: BAÑO DE NOCHE (sitio 2 de la  | 15 | [abrir](prompts/anuncio_32_deja_de_tratarlos_como_puntos_negros.md) |
| 37 | ¿Sabías que…? | Álex | Tres de los cinco sitios de la biblia, en la s | 15 | [abrir](prompts/anuncio_37_sabias_que.md) |
| 38 | ¿Te pasa que al pasar el dedo…? | Bea | Tres de los cinco sitios de la biblia, en este | 15 | [abrir](prompts/anuncio_38_te_pasa_que_al_pasar_el_dedo.md) |
| 40 | ¿Funcionan de verdad los parches de nariz? | Álex | Cuatro de los cinco sitios de la biblia, con e | 15 | [abrir](prompts/anuncio_40_funcionan_de_verdad_los_parches_de_nariz.md) |
| 44 | Qué asco (y qué gusto) | Álex | Sitio 4 de la biblia, "ventana de mañana": luz | 15 | [abrir](prompts/anuncio_44_que_asco_y_que_gusto.md) |

> **Pendientes de escribir en esta versión:** anuncios 45, 50, 55, 56, 63, 64, 71, 82. El resto están completos.

## Las imágenes del anuncio 1

Son el patrón de calidad. Están en `img/a01/` y aparecen con su prompt exacto en [la ficha del anuncio 1](prompts/anuncio_01_si_tu_nariz_se_ve_asi.md).

![Toma 1](img/a01/a01_01.jpg)
*Toma 1 — Gancho A · la nariz a 15 cm con el dedo señalando*

![Toma 2](img/a01/a01_02.jpg)
*Toma 2 — Gancho B · el mismo momento desde más lejos, mirando a cámara*

![Toma 3](img/a01/a01_03.jpg)
*Toma 3 — Diagnóstico · la nariz entera de frente, sin dedo*

![Toma 4](img/a01/a01_04.jpg)
*Toma 4 — Detalle del problema · tres centímetros cuadrados de aleta*

![Toma 5](img/a01/a01_05.jpg)
*Toma 5 — La grasa que se rellena · el puente a contraluz rasante*

![Toma 6](img/a01/a01_06.jpg)
*Toma 6 — El error 1 · la tira de farmacia recién arrancada*

![Toma 7](img/a01/a01_07.jpg)
*Toma 7 — El error 2 · apretar, y la rojez inmediata*

![Toma 8](img/a01/a01_08.jpg)
*Toma 8 — Entrada del producto · la caja en la mano y el sobre saliendo*

![Toma 9](img/a01/a01_09.jpg)
*Toma 9 — El parche fuera del sobre · mariposa traslúcida a 10 cm*

![Toma 10](img/a01/a01_10.jpg)
*Toma 10 — Colocación · las dos yemas presionando diez segundos, de noche*

![Toma 11](img/a01/a01_11.jpg)
*Toma 11 — Retirada · el ala del parche levantándose por la mañana*

![Toma 12](img/a01/a01_12.jpg)
*Toma 12 — La prueba · el parche usado a contraluz*

![Toma 13](img/a01/a01_13.jpg)
*Toma 13 — Nariz después · el mismo encuadre de la toma 3*

![Toma 14](img/a01/a01_14.jpg)
*Toma 14 — Garantía · el móvil y el pack de 2 en el mármol*

![Toma 15](img/a01/a01_15.jpg)
*Toma 15 — Cierre · packshot del pack de 2 con un parche al lado*

