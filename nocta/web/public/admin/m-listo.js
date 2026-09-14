/* CRM · Puesta en marcha.
   La pregunta de la que cuelga todo lo demás es «¿puede esta tienda cobrar hoy?», y hasta ahora
   no la contestaba ninguna pantalla: el panel enseñaba ingresos (cero), Integraciones enseñaba
   interruptores sueltos, y hacía falta saber de antemano cuáles de esos interruptores son los que
   impiden vender. Aquí está la respuesta entera, calculada cada vez sobre el estado real.

   Tres reglas de diseño:
     · el veredicto va primero y en grande, y es binario: o se puede cobrar o no;
     · cada punto dice qué pasa si se queda sin arreglar, no sólo que está apagado — «Webhook: no»
       no significa nada, «Stripe cobra pero la tienda no se entera» sí;
     · sólo lo que impide vender cuenta para el veredicto. Mezclar «no tienes WhatsApp» con «no
       puedes cobrar» en la misma lista roja es la forma más rápida de que no se mire ninguna. */
(() => {
  const A = window.A, esc = A.esc;

  const NIVELES = [
    ['bloquea', 'Sin esto no entra un euro', 'Por mucho que llegue gente, la tienda no puede cerrar una venta.'],
    ['importa', 'Se vende, pero se pierde por el camino', 'No frena la venta; sí cuesta dinero o confianza.'],
    ['mejora',  'Suma cuando lo de arriba esté', 'Nada de esto es urgente todavía.'],
  ];

  const punto = p => `
    <div class="paso${p.ok ? ' paso--ok' : ' paso--' + p.nivel}">
      <span class="paso__m" aria-hidden="true">${p.ok ? '✓' : '!'}</span>
      <div class="paso__c">
        <b>${esc(p.titulo)}</b>
        <p>${esc(p.detalle)}</p>
        ${p.ok ? '' : `<p class="paso__a">${esc(p.arreglo)}${p.donde ? ` <a href="${esc(p.donde)}">Ir →</a>` : ''}</p>`}
      </div>
    </div>`;

  function pruebasHtml(pr) {
    if (!pr || !Number(pr.pedidos)) return '';
    return A.card('Lo que ya has probado', `
      <p class="muted sm mb">Estos pedidos han recorrido el circuito entero —cliente, email de
      confirmación, recompensa y suscripción— pero llevan la marca de prueba, así que no cuentan
      como facturación en ninguna pantalla.</p>
      <div class="grid grid--kpi grid--kpi2">
        ${A.kpi('Pedidos', pr.pedidos)}
        ${A.kpi('Importe', A.money(pr.importe), 'nunca se cobró')}
        ${A.kpi('Clientes', pr.clientes || 0)}
        ${A.kpi('Planes', pr.suscripciones || 0)}
      </div>`);
  }

  async function render(el) {
    el.innerHTML = '<div class="loading">Cargando…</div>';
    let d;
    try { d = await A.api('readiness'); }
    catch (e) { el.innerHTML = `<div class="card"><p class="err">${esc(e.message)}</p></div>`; return; }
    const pasos = d.pasos || [];

    const listo = !!d.listo;
    const veredicto = `
      <section class="vered${listo ? ' vered--ok' : ''}">
        <span class="vered__l">${listo ? 'Lista para vender' : 'Todavía no puede cobrar'}</span>
        <h2>${listo
          ? 'Todo lo que hace falta para cerrar una venta está conectado.'
          : `Faltan ${d.bloqueantes} cosa${d.bloqueantes === 1 ? '' : 's'} para que la tienda pueda cobrar.`}</h2>
        <p>${listo
          ? 'El resto de la lista no impide vender: son cosas que mejoran lo que ya funciona.'
          : 'La web, el catálogo, el checkout, los emails y el CRM están montados y funcionando. Lo que falta es la parte del dinero, y hasta que esté, cada compra que se complete se guarda como prueba: recorre el circuito entero pero no cobra nada.'}</p>
      </section>`;

    el.innerHTML = veredicto + NIVELES.map(([k, t, sub]) => {
      const ps = pasos.filter(p => p.nivel === k);
      if (!ps.length) return '';
      const mal = ps.filter(p => !p.ok).length;
      return A.card(t, `<p class="muted sm mb">${esc(sub)}</p><div class="pasos">${ps.map(punto).join('')}</div>`,
        `<span class="bdg${mal ? (k === 'bloquea' ? ' bdg--bad' : ' bdg--warn') : ' bdg--ok'}">${mal ? `${mal} sin hacer` : 'hecho'}</span>`);
    }).join('') + pruebasHtml(d.pruebas);

    A.fit(el);
  }

  A.mod('listo', { title: 'Puesta en marcha', icon: '◆', group: 'Panel', render });
})();
