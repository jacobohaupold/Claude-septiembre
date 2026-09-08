// Función programada (cada hora): automatizaciones de email/WhatsApp y campañas programadas.
import { runAutomations } from './lib/automations.js';
export default async () => { const r = await runAutomations(); console.log('cron', JSON.stringify(r)); return new Response(JSON.stringify(r), { headers: { 'content-type': 'application/json' } }); };
export const config = { schedule: '0 * * * *' };
