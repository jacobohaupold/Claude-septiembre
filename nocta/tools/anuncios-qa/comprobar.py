#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprobaciones automáticas de los prompts de los anuncios de NOCTA.

Se ejecuta desde la raíz del repositorio:

    python3 nocta/tools/anuncios-qa/comprobar.py

Lee los ficheros de verdad, los que vas a copiar y pegar: `nocta/marketing/anuncios/prompts/
anuncio_*.md`. Comprueba cinco cosas y devuelve código 1 si alguna falla.

1. COBERTURA DEL GUION. Las 15 tomas de cada anuncio tienen que tocar TODOS los bloques del
   guion real de ese anuncio, que está en `datos/ads25_guiones.json`. Si un bloque se queda
   sin ninguna toma, ese anuncio está contando otra cosa.
2. QUINCE TOMAS. Ni catorce ni dieciséis.
3. PALABRAS PROHIBIDAS. Ninguna toma puede llevar las palabras que arruinan el realismo de
   foto de móvil: cinematic, flawless, bokeh, golden hour, 8k y las demás de la biblia.
4. FIDELIDAD DEL PRODUCTO. Toda toma donde salga el parche o la caja tiene que llevar su
   cláusula al principio del prompt y sus fotos de referencia. Sin eso el parche sale
   deforme; está comprobado generando y es el fallo que más caro sale.
5. PROHIBICIÓN DE TEXTO. Todo prompt de imagen termina prohibiendo texto y marcas de agua,
   porque los subtítulos se ponen en el montaje.
"""
import json, os, re, sys, collections

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.abspath(os.path.join(AQUI, '..', '..', 'marketing', 'anuncios'))
PROMPTS = os.path.join(BASE, 'prompts')
GUIONES = os.path.join(BASE, 'datos', 'ads25_guiones.json')

PROHIBIDAS = ['8k', 'hyperrealistic', 'hyper-realistic', 'photorealistic', 'cinematic',
              'dramatic lighting', 'professional photograph', 'perfect skin', 'flawless',
              'glowing skin', 'studio lighting', 'award-winning', 'masterpiece',
              'ultra detailed', 'bokeh', 'golden hour', 'stunning', 'high quality']

RX_PARCHE = re.compile(r'\b(hydrocolloid|(?:nose|butterfly|used|clean|translucent|the|a|one) patch)\b', re.I)
RX_CAJA = re.compile(r'\b(cardboard box|cream box|boxes|carton|sachet|packaging)\b', re.I)
RX_TIRA_SOLA = re.compile(r'\bpore strip\b', re.I)
# 'no patch ...' en cualquier parte significa que el parche no está en cuadro:
# es un plano de antes o de después y no lleva cláusula ni foto de producto
RX_PARCHE_NEG = re.compile(r'\bno patch\b', re.I)
RX_TOMA = re.compile(r'^### Toma (\d+) · (.+)$')


def rangos(txt):
    out = []
    for m in re.finditer(r'(\d+(?:[.,]\d+)?)\s*[-–—]\s*(\d+(?:[.,]\d+)?)\s*s', txt or ''):
        out.append((float(m.group(1).replace(',', '.')), float(m.group(2).replace(',', '.'))))
    return out


def leer_fichero(ruta):
    """Devuelve (n_anuncio, [tomas]) leyendo el markdown que se publica."""
    txt = open(ruta, encoding='utf-8').read()
    m = re.search(r'^# Anuncio (\d+) ·', txt, re.M)
    if not m:
        return None, []
    n = int(m.group(1))
    # el cuerpo de tomas empieza tras el encabezado de la sección
    corte = txt.find('## Las 15 tomas, una a una')
    cuerpo = txt[corte:] if corte >= 0 else txt
    tomas = []
    actual = None
    for linea in cuerpo.split('\n'):
        mt = RX_TOMA.match(linea)
        if mt:
            if actual:
                tomas.append(actual)
            actual = {'num': int(mt.group(1)), 'titulo': mt.group(2), 'bruto': []}
            continue
        if actual is not None:
            actual['bruto'].append(linea)
    if actual:
        tomas.append(actual)

    for t in tomas:
        bruto = '\n'.join(t['bruto'])
        mb = re.search(r'^\*(.+?)\*$', bruto, re.M)
        t['bloque_guion'] = mb.group(1) if mb else ''
        mr = re.search(r'^\*\*Referencias que hay que adjuntar:\*\* (.+)$', bruto, re.M)
        t['referencias'] = mr.group(1) if mr else ''
        bloques = re.findall(r'```text\n(.*?)\n```', bruto, re.S)
        t['prompt_imagen'] = bloques[0] if bloques else ''
        t['prompt_video'] = bloques[1] if len(bloques) > 1 else ''
    return n, tomas


def main():
    if not os.path.isdir(PROMPTS):
        print('No encuentro %s' % PROMPTS)
        return 1
    guiones = json.load(open(GUIONES, encoding='utf-8'))
    fallos = collections.defaultdict(list)
    n_tomas = 0
    ficheros = sorted(f for f in os.listdir(PROMPTS) if f.startswith('anuncio_') and f.endswith('.md'))
    anuncios = []

    for f in ficheros:
        n, tomas = leer_fichero(os.path.join(PROMPTS, f))
        if n is None:
            fallos['formato'].append('%s: no tiene cabecera "# Anuncio N ·"' % f)
            continue
        anuncios.append(n)
        guion = (guiones.get(str(n)) or {}).get('guion') or []

        if len(tomas) != 15:
            fallos['numero'].append('anuncio %d: tiene %d tomas, tienen que ser 15' % (n, len(tomas)))

        bloques = [rangos(b.get('t'))[0] for b in guion if rangos(b.get('t'))]
        cubierto = set()
        for t in tomas:
            for (s, e) in rangos(t['bloque_guion']):
                for i, (bs, be) in enumerate(bloques):
                    if s < be and e > bs:
                        cubierto.add(i)
        for i in range(len(bloques)):
            if i not in cubierto:
                fallos['cobertura'].append('anuncio %d: el bloque %s del guion no tiene ninguna toma'
                                           % (n, guion[i].get('t')))

        for t in tomas:
            n_tomas += 1
            p = t['prompt_imagen']
            low = p.lower()
            refs = t['referencias'].lower()
            if not p:
                fallos['formato'].append('anuncio %d toma %d: sin prompt de imagen' % (n, t['num']))
                continue
            for b in PROHIBIDAS:
                if re.search(r'\b' + re.escape(b), low):
                    fallos['palabras'].append('anuncio %d toma %d: "%s"' % (n, t['num'], b))
            hay_parche = (bool(RX_PARCHE.search(p))
                          and not RX_PARCHE_NEG.search(p)
                          and not (RX_TIRA_SOLA.search(p) and not re.search(r'hydrocolloid', p, re.I)))
            if hay_parche:
                if 'exactly the product' not in low:
                    fallos['fidelidad'].append('anuncio %d toma %d: sale el parche sin cláusula de fidelidad'
                                               % (n, t['num']))
                if 'parche' not in refs:
                    fallos['fidelidad'].append('anuncio %d toma %d: sale el parche sin foto de referencia'
                                               % (n, t['num']))
            if RX_CAJA.search(p) and 'caja' not in refs:
                fallos['fidelidad'].append('anuncio %d toma %d: sale la caja sin foto de referencia'
                                           % (n, t['num']))
            if 'no text' not in low and 'no added text' not in low:
                fallos['texto'].append('anuncio %d toma %d: no prohíbe el texto' % (n, t['num']))

    esperados = sorted(int(k) for k in guiones)
    faltan = [x for x in esperados if x not in anuncios]

    print('anuncios comprobados: %d de %d · tomas: %d' % (len(anuncios), len(esperados), n_tomas))
    if faltan:
        print('anuncios todavía sin escribir: %s' % ', '.join(str(x) for x in faltan))
    titulos = [('formato', 'Ficheros o tomas mal formados'),
               ('numero', 'Anuncios que no tienen 15 tomas'),
               ('cobertura', 'Bloques del guion sin ninguna toma'),
               ('palabras', 'Palabras prohibidas'),
               ('fidelidad', 'Tomas con producto sin cláusula o sin referencia'),
               ('texto', 'Prompts que no prohíben el texto')]
    total = 0
    for clave, titulo in titulos:
        lista = fallos.get(clave) or []
        total += len(lista)
        print('  %-52s %d' % (titulo + ':', len(lista)))
        for x in lista[:12]:
            print('      - %s' % x)
        if len(lista) > 12:
            print('      … y %d más' % (len(lista) - 12))
    if total:
        print('\nFALLA: %d problemas. Hay que arreglarlos antes de generar.' % total)
        return 1
    print('\nTODO CORRECTO en los anuncios escritos.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
