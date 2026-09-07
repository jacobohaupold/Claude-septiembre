#!/usr/bin/env bash
# Despliegue de la tienda NOCTA en Netlify en un solo paso.
# Requisitos: NETLIFY_AUTH_TOKEN en el entorno (Netlify → User settings → Applications → Personal access tokens).
# Uso: NETLIFY_AUTH_TOKEN=xxx ./deploy.sh [nombre-del-sitio]
set -euo pipefail
cd "$(dirname "$0")"
SITE="${1:-nocta-store}"
[ -n "${NETLIFY_AUTH_TOKEN:-}" ] || { echo "Falta NETLIFY_AUTH_TOKEN"; exit 1; }
npm install --silent
NTL="npx --yes netlify-cli"
if [ ! -f .netlify/state.json ]; then
  $NTL sites:create --name "$SITE" --disable-linking >/dev/null 2>&1 || true
  ID=$($NTL sites:list --json | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const s=JSON.parse(d).find(x=>x.name==='$SITE');console.log(s?s.id:'')})")
  [ -n "$ID" ] || { echo "No se pudo crear/encontrar el sitio $SITE"; exit 1; }
  $NTL link --id "$ID" >/dev/null
fi
$NTL env:set ADMIN_TOKEN "${ADMIN_TOKEN:-nocta-admin-$(date +%s)}" >/dev/null
[ -n "${STRIPE_SECRET_KEY:-}" ] && $NTL env:set STRIPE_SECRET_KEY "$STRIPE_SECRET_KEY" >/dev/null
[ -n "${STRIPE_WEBHOOK_SECRET:-}" ] && $NTL env:set STRIPE_WEBHOOK_SECRET "$STRIPE_WEBHOOK_SECRET" >/dev/null
$NTL deploy --prod --dir public --functions netlify/functions --message "NOCTA deploy $(date -u +%F_%T)"
echo "Panel: https://$SITE.netlify.app/admin/  (token ADMIN_TOKEN configurado en Netlify)"
