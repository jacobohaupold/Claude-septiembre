// comprueba que las acciones dentro de tablas siguen funcionando tras envolver el valor de cada celda
const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--no-sandbox']});
  const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const p=await ctx.newPage(); await p.addInitScript(()=>localStorage.setItem('n_admin','open'));
  const go=async h=>{await p.goto('http://localhost:8791/admin/'+h,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1100);};
  // fila de pedido -> detalle
  await go('#/orders');
  await p.click('.tbl tbody tr'); await p.waitForTimeout(900);
  console.log('pedido: hash', await p.evaluate(()=>location.hash), '· título', (await p.textContent('#title')));
  // fila de cliente -> detalle
  await go('#/customers');
  await p.click('.tbl tbody tr'); await p.waitForTimeout(900);
  console.log('cliente: hash', await p.evaluate(()=>location.hash));
  // boton dentro de celda (carritos -> WhatsApp abre modal)
  await go('#/carts');
  await p.click('.tbl tbody tr button:has-text("WhatsApp")'); await p.waitForTimeout(700);
  console.log('modal WhatsApp desde celda:', await p.evaluate(()=>!!document.querySelector('.mod')));
  await p.keyboard.press('Escape');
  // input dentro de celda (precios: coste)
  await go('#/pricing');
  await p.fill('.tbl input[data-cost="parches-nariz"]','4.99'); await p.waitForTimeout(300);
  console.log('coste escrito:', await p.inputValue('.tbl input[data-cost="parches-nariz"]'));
  // toggle dentro de celda (ofertas: activo)
  await go('#/offers');
  const before=await p.evaluate(()=>{const i=document.querySelector('.tbl input[type=checkbox]');return i?i.checked:null;});
  await p.click('.tbl tbody tr .tog'); await p.waitForTimeout(600);
  const after=await p.evaluate(()=>{const i=document.querySelector('.tbl input[type=checkbox]');return i?i.checked:null;});
  console.log('interruptor de oferta:',before,'→',after);
  // enlace de copiar
  await go('#/offers');
  await p.click('.tbl tbody tr button:has-text("Copiar")').catch(()=>{}); await p.waitForTimeout(500);
  console.log('aviso tras copiar:', await p.evaluate(()=>!!document.querySelector('.toast')));
  await b.close();
})().catch(e=>{console.error('FALLO',e.message);process.exit(1)});
