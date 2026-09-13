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

## Comprobar DESPUÉS de desplegar

```bash
NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/publicado.js
```

No basta con desplegar y suponer que llega igual. **Netlify post-procesa el HTML publicado**
(las URLs bonitas: `/producto` en vez de `/producto.html`) y al reescribirlo puede romper cosas
que en local funcionan perfectamente.

Pasó de verdad, y estuvo roto en producción sin que se notara: el botón principal de la portada
llevaba `onclick="nTrack('cta_hero',{pos:'hero'})"` y salía publicado con comillas simples y `\'`
dentro. En HTML la barra invertida no escapa nada, así que el atributo se cortaba en la primera
comilla, quedaba `onclick="nTrack(\"` más un atributo basura, y **el clic dejaba de contarse**.
En local, impecable; en la web en vivo, ese evento no llegaba nunca al CRM.

La lección: nada de manejadores dentro del HTML. Los botones que se cuentan llevan
`data-track="…"` y `app.js` escucha una sola vez con delegación, que es inmune a cualquier
reescritura. Esta prueba baja el HTML real, lo parsea y falla si vuelve a aparecer un manejador
partido, un atributo basura o si desaparece una marca de seguimiento; además compara el CSS y el
JS publicados con los del repositorio.

## Comprobar antes de desplegar

```bash
NODE_PATH=/opt/node22/lib/node_modules node nocta/tools/web-qa/desborde.js
```

Comprueba que ninguna de las 16 páginas se pueda arrastrar hacia los lados, a diez anchos entre 320 y 1920 px.
