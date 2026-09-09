# -*- coding: utf-8 -*-
"""Biblioteca de bloques ganadores (derivados del estudio de Vue) para montar los 100 guiones NOCTA segundo a segundo."""
# Cada bloque: (segundos, plano, texto_pantalla, voz, nota)
# Variantes por avatar: 'bea' (mujer 18–28), 'marisol' (mujer 35–50), 'alex' (hombre), 'todos'
REENC={  # reencuadre 3–10 s (R1, R6, R13, R36, R48)
 'todos':[(6,"Macro de la nariz, muy cerca; rótulo","FILAMENTOS = grasa que se rellena","Se llaman filamentos sebáceos: grasa que tu piel fabrica sola y que se rellena cada día.","Reencuadre de R1: nombrar el problema (46 de los 60 ganadores lo hacen aquí)."),
          (6,"Esquema simple de un poro (dibujo en pantalla) llenándose","Tubitos que fabrican grasa","Dentro de cada poro hay un tubito que fabrica grasa. Cuando se llena, se ve oscuro. Eso es un filamento.","Metáfora «tubitos» de R6 (10 grabaciones): imagen mental concreta."),
          (6,"Macro nariz; rótulo","No es suciedad. Es grasa.","No es suciedad. No son puntos negros. Es grasa oxidada al fondo del poro, y se vuelve a llenar cada 24 horas.","Triple negación de R13 + dato de R36.")],
}
CULPA=[(6,"Tira de farmacia arrancada, dedos apretando, botes de exfoliante","Por eso vuelven","Nada te ha funcionado porque los tratabas como puntos negros. Por eso vuelven siempre.","Absolución + recurrencia (R1, R4, R13): la objeción nº 1 resuelta antes del producto."),
       (6,"Secuencia noche/mañana acelerada: limpio → puntitos otra vez","Apretar · limpiar · repetir","Los quitas y a la mañana siguiente están otra vez. Es un ciclo: apretar, limpiar, repetir.","Nombrar el ciclo (R4, 25 anuncios y 13 grabaciones)."),
       (5,"Tira arrancada en macro; rojez","Solo la capa de arriba","La tira solo se lleva la capa de arriba. Y cada vez que la arrancas, te dañas la piel.","Contraste con la tira (R6, R8, R46).")]
MECAN=[(8,"Parche NOCTA en la mano; se pega en la nariz limpia y seca antes de dormir","Absorbe. No arranca.","Este parche está hecho para eso: absorbe la grasa desde dentro del poro mientras duermes, en vez de arrancarte la piel como las tiras.","Mecanismo + contraste de R1 (55 de 60 ganadores lo explican en ≤ 10 s)."),
       (8,"Parche puesto; time-lapse de la noche; rótulo","Como un imán","Funciona como un imán: mientras duermes va sacando la grasa de dentro del poro. Sin arrancar, sin rojeces, sin pelearte cada día.","Imán (R6) + mantra de tres negaciones (R4)."),
       (8,"Macro del parche empezando a ponerse blanco","Se pone blanco = está funcionando","El hidrocoloide es un gel: la grasa lo toca, lo absorbe y el parche se pone blanco. Así ves que está funcionando.","Explicación del blanqueo como prueba objetiva (R5).")]
PRUEBA=[(8,"Mañana: retirada lenta del parche; parche a contraluz con puntos blancos; nariz lisa","Mira lo que sale","Por la mañana lo ves en el parche. Todo eso estaba dentro. Y a las tres semanas casi no se notan.","Peel reveal + plazo honesto (R1, R7, R23): el plano más repetido de los 60."),
        (8,"Antes/después con misma luz y fecha; parche usado","Días, no horas","Mira el antes y el después. La nariz me dura limpia días, no horas.","«Días, no horas» de R4."),
        (8,"Fila de 7 parches usados de una semana, cada vez menos blancos","Semana 1 · 2 · 3","Semana uno: sale un montón. Semana dos: menos. Semana tres: los puntitos casi no se ven.","Cronología de R53 con expectativas realistas.")]
SOCIAL=[(5,"Caja NOCTA y pack de 2; capturas de mensajes reales (solo cuando existan)","2 cajas · 29,90 € · envío gratis","Un montón de gente por fin entiende por qué nada le funcionaba.","Prueba social de identidad (R1); sin cifras inventadas."),
        (5,"Pack de 2 cajas sobre fondo crema","2 cajas · 29,90 €","Dos cajas son un mes entero, tres noches por semana. Y el envío va gratis.","Razón de uso para el pack de 2 (R23: frecuencia real).")]
CIERRE={'garantia':(5,"Web NOCTA con la garantía subrayada; pack de 2","Si no se pega, te lo cambiamos · 60 días","Y si no te convence, te devolvemos el dinero. Pack de 2 cajas, 29,90 €, envío gratis desde España.","Garantía + CTA (54 de 60 ganadores citan la garantía)."),
        'escasez':(5,"Caja con el número de lote; contador de cajas","Lote 1 · quedan pocas","Este es el primer lote: 125 cajas. Cuando se acaben, tardan tres semanas en volver. Pack de 2 con envío gratis y garantía.","Escasez real (R4, R58: «se agotan»)."),
        'reto':(4,"Cara a cámara, sonrisa","¿Sigues con dudas? Pruébalo","¿Sigues con dudas? Pruébalo 60 días. Si no te convence, te devolvemos el dinero.","Reto al escéptico (R21)."),
        'duo':(5,"Dúo Noche: caja de nariz + caja de granos","Dúo Noche · 26,90 € · envío gratis","Nariz por la noche, granos de día. Dúo Noche, 26,90 €, envío gratis y garantía.","Cierre de pack (R25: «los dos únicos»).")}
def claims_check(voz):
    """Revisión contextual de claims: devuelve [dict(afirmacion,estado,alternativa)] con estado permitida / cambiar / condicional / revisar."""
    import re
    out=[]; low=voz.lower()
    def add(a,e,alt=""): out.append(dict(afirmacion=a,estado=e,alternativa=alt))
    for m in re.finditer(r"(no se |no |ni |se gestiona, no se )?cura[a-z]*",low):
        if m.group(1): add("no se cura / se gestiona","permitida")
        elif "curar heridas" in m.group(0) or low[max(0,m.start()-10):m.start()].strip().endswith("para"): add("curar (referido al material, no al producto)","revisar","decir «para heridas» sin el verbo curar")
        else: add("cura","cambiar","«se controla / se gestiona»")
    if "elimina para siempre" in low or "eliminar para siempre" in low: add("elimina para siempre","cambiar","«se notan mucho menos»")
    for m in re.finditer(r"(no |ni )?desaparec[a-z]*",low):
        add("no desaparecen (honesto)" if m.group(1) else "desaparecen","permitida" if m.group(1) else "cambiar","" if m.group(1) else "«casi no se notan»")
    if "trata el acné" in low or "tratamiento del acné" in low: add("trata el acné","cambiar","«para granos»")
    for m in re.finditer(r"dermat[oó]log[a-z]*",low):
        ctx=low[max(0,m.start()-25):m.end()+25]
        if re.search(r"lo llama|no necesitas|sin |no te lo|recetar",ctx): add("dermatólogo (mención sin aval)","permitida")
        else: add("dermatólogo","cambiar","(quitar el aval médico)")
    if "farmac" in low: add("farmacia (anécdota, sin aval)","revisar","no decir «recomendado por farmacéuticos» ni usar logos")
    if "invisible" in low and "parche de grano" not in low and "invisible con base" not in low: add("invisibles","cambiar","«se notan mucho menos»")
    if "corea" in low: add("Corea / coreano","condicional","solo si el lote es coreano de verdad (vía B); con lote chino no emitir")
    if re.search(r"\d+ ?%",low): add("porcentaje","revisar","solo cifras reales de NOCTA (CRM) o con fuente")
    if "científic" in low: add("científicamente","cambiar","(sin estudio propio: decir «hidrocoloide, el material de los apósitos»)")
    if "medical" in low or "médico" in low: add("médico","cambiar","«hidrocoloide»")
    for k in ["tres semanas","mientras duermes","sin arrancar","se pone blanco","garantía","te devolvemos el dinero","casi no se notan","días, no horas","se notan mucho menos","hidrocoloide"]:
        if k in low: add(k,"permitida")
    return out
