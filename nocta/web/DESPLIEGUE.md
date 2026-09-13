# Cómo se despliega la tienda

```bash
NETLIFY_AUTH_TOKEN=xxx ./nocta/web/deploy.sh
```

O directamente, que es lo que se usó la última vez:

```bash
NETLIFY_AUTH_TOKEN=xxx npx netlify-cli deploy --prod \
  --dir public --functions netlify/functions \
  --site 789d46c8-d39a-4410-978e-6051872040e1
```

El identificador del sitio (`789d46c8-d39a-4410-978e-6051872040e1`) no es secreto y puede estar aquí: sin token
no sirve de nada.

## Dónde va el token, y por qué no está en este repositorio

El token **no se guarda en ningún fichero del repositorio**. Este repositorio está en GitHub, así que un token
escrito en un fichero queda publicado en el primer `push` y, aunque se borre después, se queda en el historial
de git para siempre. Un token de Netlify con permisos de despliegue permite a quien lo tenga publicar lo que
quiera en la tienda.

Tampoco sirve de nada guardarlo en el disco de una sesión de Claude Code: el contenedor es efímero y se borra
al terminar, así que en la siguiente sesión no estaría.

**El sitio correcto es la variable de entorno del entorno de Claude Code.** Se configura una vez, persiste entre
sesiones y así el token no vuelve a pasar por el chat:

1. Abre la configuración del entorno en claude.ai/code (el entorno desde el que se lanza la sesión).
2. Añade una variable de entorno llamada `NETLIFY_AUTH_TOKEN` con el valor del token.
3. A partir de ahí, `./nocta/web/deploy.sh` funciona sin pasar nada.

La documentación de los entornos está en https://code.claude.com/docs/en/claude-code-on-the-web

## Si el token se ha pegado en un chat

Hay que rotarlo: Netlify → User settings → Applications → Personal access tokens → revocar el antiguo y crear
uno nuevo. Después se pone el nuevo en la variable de entorno del punto anterior.

## Comprobar antes de desplegar

```bash
NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/desborde.js
```

Comprueba que ninguna de las 16 páginas se pueda arrastrar hacia los lados, a diez anchos entre 320 y 1920 px.
