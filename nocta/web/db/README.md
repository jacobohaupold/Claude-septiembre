# La base de datos

Todo el CRM vive en **Supabase** (proyecto `nocta`, región eu-west-3) y se lee siempre desde las
funciones de Netlify con la clave secreta de servidor. El navegador nunca habla con Supabase.

## Dónde está el esquema

En las **migraciones de Supabase**, que son el historial versionado del esquema. Se listan y se
aplican desde el panel de Supabase (Database → Migrations) o con `supabase db`. No se toca la base
a mano desde el editor SQL: cada cambio entra como migración, para que quede el porqué y se pueda
repetir en otro proyecto.

Migraciones aplicadas hasta hoy:

| Migración | Qué hace |
|---|---|
| `nocta_crm_schema` | Las 13 tablas del CRM |
| `nocta_rpc_stats` | `admin_stats(p_days)`, el resumen del panel |
| `nocta_seguridad_rpc_privada` | Cierra las funciones a la clave de servidor y les fija el `search_path` |
| `nocta_geo_paises_e_indices_mapa` | Tabla `geo_paises` y los índices que faltaban |
| `nocta_rpc_mapa_en_vivo` | `live_map(p_min, p_feed)`, el mapa en tiempo real |
| `nocta_live_map_arregla_join_ventas` | Corrige un LEFT JOIN que se comportaba como INNER |
| `nocta_live_map_id_persona` | Cada punto del mapa lleva el id de la persona |

En `migraciones/` queda copia de las que se generan desde este repositorio (por ejemplo
`003_geo_paises.sql`, que produce `tools/crm-qa/gen_mundo.py`).

## Seguridad: por qué no hay políticas de RLS

Las 14 tablas tienen **RLS activado y ninguna política**. Eso no es un descuido: significa
«nadie entra». La clave publicable (la que por diseño acabaría en un navegador) no puede leer ni
escribir una sola fila, y la clave de servidor, que vive sólo en las variables de entorno de
Netlify, se salta el RLS por ser `service_role`. Es el modelo correcto para una tienda donde
ningún cliente se autentica contra la base.

Comprobado el 13-09-2026: con la clave publicable, `GET /rest/v1/orders` devuelve `[]`.

### Lo que sí estaba abierto, y ya no

`admin_stats` e `increment_discount_use` eran `SECURITY DEFINER` y ejecutables por `anon`. Como
`SECURITY DEFINER` se salta el RLS, cualquiera con la clave publicable podía llamar a
`/rest/v1/rpc/admin_stats` y sacar facturación, pedidos, embudo, MRR y número de clientes; y podía
llamar a `increment_discount_use` en bucle hasta agotar el `max_uses` de todos los códigos.
Se comprobó que era explotable antes de arreglarlo. Ahora las tres funciones sólo las puede
ejecutar `service_role`, y todas llevan `search_path` fijo (sin eso, una función `SECURITY DEFINER`
puede resolver una tabla contra un esquema plantado por quien la llama).

Regla para el futuro: **toda función nueva nace con `revoke execute … from public, anon,
authenticated` y `set search_path = public, pg_temp`.**

## Comprobar la salud

```
Supabase → Advisors → Security
```
Debe quedar sólo el aviso informativo `rls_enabled_no_policy` en las 14 tablas, que es
justamente el modelo que queremos.
