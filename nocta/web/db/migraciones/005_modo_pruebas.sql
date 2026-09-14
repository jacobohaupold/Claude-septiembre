-- 005 · Modo pruebas: separar «esto es una prueba» de «en qué punto está el pedido»
--
-- Hasta ahora, un pedido hecho sin Stripe se quedaba con status = 'demo' y ahí moría: no creaba
-- cliente, no mandaba el email de confirmación, no emitía la recompensa, no abría la suscripción
-- y no aparecía en la cola de envíos. Resultado: con la tienda entera construida, el CRM enseñaba
-- 0 clientes y 0 suscripciones, y no había forma de probar el circuito completo antes de conectar
-- la pasarela.
--
-- El fallo era de modelado: 'demo' no es un estado del pedido, es una propiedad del pedido. El
-- estado es pendiente → pagado → enviado → entregado, y eso vale igual para una prueba que para
-- una venta. Así que la prueba pasa a una columna aparte y el pedido de prueba recorre exactamente
-- el mismo camino que uno real. Lo único que no hace es contar como dinero.
--
-- La regla, a partir de aquí: toda consulta de dinero lleva «and not demo». El día que se conecte
-- Stripe no cambia una línea de código; simplemente dejan de nacer pedidos con demo = true.

alter table public.orders        add column if not exists demo boolean not null default false;
alter table public.customers     add column if not exists demo boolean not null default false;
alter table public.subscriptions add column if not exists demo boolean not null default false;
alter table public.discounts     add column if not exists demo boolean not null default false;

-- Historia: los pedidos que se quedaron en 'demo' sí llegaron hasta el final del checkout, así que
-- su estado real es 'paid'. Se les marca la prueba y se les devuelve el estado que les tocaba.
update public.orders set demo = true where status = 'demo';
update public.orders set status = 'paid' where status = 'demo';

create index if not exists orders_demo on public.orders (demo) where demo;

comment on column public.orders.demo is
  'true = pedido de prueba (checkout sin pasarela). Recorre el circuito entero pero no cuenta como ingreso.';

-- admin_stats: el dinero deja de mirar el estado para saber si es de verdad y mira la columna.
-- Y se añade un bloque «pruebas» aparte, porque esconder las pruebas es tan malo como contarlas:
-- el CRM tiene que poder decir «has vendido 0 € y has hecho 7 pedidos de prueba», que es la
-- verdad, en vez de enseñar un cero pelado que parece que la tienda está rota.
create or replace function public.admin_stats(p_days integer default 14)
returns json language sql security definer set search_path to 'public','pg_temp' as $function$
  with ev as (select * from public.events where t >= now() - (p_days || ' days')::interval),
  s as (select vid, count(*) filter (where ev='page_view') as pages, bool_or(ev='view_item') as viewed, bool_or(ev='add_to_cart') as atc, bool_or(ev='begin_checkout') as co, bool_or(ev='purchase') as buy,
        (array_agg(dev order by t))[1] as dev, (array_agg(country order by t))[1] as country, (array_agg(path order by t))[1] as landing, (array_agg(ref order by t))[1] as ref, (array_agg(utm order by t))[1] as utm from ev group by vid),
  daily as (select to_char(date_trunc('day', t),'YYYY-MM-DD') as day, count(*) filter (where ev='page_view') as views, count(distinct vid) as sessions, count(*) filter (where ev='add_to_cart') as atc, count(*) filter (where ev='begin_checkout') as checkout,
        count(*) filter (where ev='purchase' and coalesce(d->>'demo','') <> 'true') as orders,
        coalesce(sum((d->>'value')::numeric) filter (where ev='purchase' and coalesce(d->>'demo','') <> 'true'),0) as revenue,
        count(*) filter (where ev='lead') as leads from ev group by 1 order by 1),
  o as (select * from public.orders where created_at >= now() - (p_days || ' days')::interval and status in ('paid','shipped','delivered','partial_refund') and not demo)
  select json_build_object(
    'days', p_days, 'events', (select count(*) from ev), 'sessions', (select count(*) from s),
    'bounce_rate', (select coalesce(round(100.0*count(*) filter (where pages<=1)/nullif(count(*),0),1),0) from s),
    'funnel', (select json_build_object('sessions',count(*),'product',count(*) filter (where viewed),'atc',count(*) filter (where atc),'checkout',count(*) filter (where co),'purchase',count(*) filter (where buy)) from s),
    'abandoned_carts', (select count(*) from s where atc and not buy),
    'revenue', (select coalesce(sum(total),0) from o), 'orders', (select count(*) from o), 'aov', (select coalesce(round(avg(total),2),0) from o),
    'daily', (select coalesce(json_agg(daily),'[]'::json) from daily),
    'sources', (select coalesce(json_agg(json_build_array(src,n)),'[]'::json) from (select coalesce(nullif(utm->>'utm_source',''), case when utm ? 'fbclid' then 'facebook' when utm ? 'ttclid' then 'tiktok' when utm ? 'gclid' then 'google' when coalesce(ref,'')='' then 'directo' else regexp_replace(substring(ref from '://([^/]+)'),'^www\.','') end) as src, count(*) as n from s group by 1 order by 2 desc limit 15) x),
    'pages', (select coalesce(json_agg(json_build_array(p,n)),'[]'::json) from (select split_part(path,'?',1) as p, count(*) as n from ev where ev='page_view' group by 1 order by 2 desc limit 15) x),
    'landing', (select coalesce(json_agg(json_build_array(p,n)),'[]'::json) from (select split_part(coalesce(landing,'/'),'?',1) as p, count(*) as n from s group by 1 order by 2 desc limit 15) x),
    'exits', (select coalesce(json_agg(json_build_array(p,n)),'[]'::json) from (select split_part(path,'?',1) as p, count(*) as n from ev where ev='leave' group by 1 order by 2 desc limit 15) x),
    'countries', (select coalesce(json_agg(json_build_array(c,n)),'[]'::json) from (select coalesce(country,'?') as c, count(*) as n from s group by 1 order by 2 desc limit 10) x),
    'devices', (select coalesce(json_agg(json_build_array(c,n)),'[]'::json) from (select coalesce(dev,'desktop') as c, count(*) as n from s group by 1 order by 2 desc) x),
    'products', (select coalesce(json_object_agg(slug, json_build_object('views',views,'atc',atc,'sold',sold)),'{}'::json) from (select coalesce(d->>'slug', i->>'slug') as slug, count(*) filter (where ev='view_item') as views, count(*) filter (where ev='add_to_cart') as atc, coalesce(sum((i->>'qty')::int) filter (where ev='purchase'),0) as sold from ev left join lateral jsonb_array_elements(case when ev='purchase' then coalesce(d->'items','[]'::jsonb) else '[]'::jsonb end) i on true where ev in ('view_item','add_to_cart','purchase') group by 1) x where slug is not null),
    'leads', (select count(*) from public.leads where created_at >= now() - (p_days || ' days')::interval),
    'leads_total', (select count(*) from public.leads), 'customers', (select count(*) from public.customers where not demo),
    'subs_active', (select count(*) from public.subscriptions where status in ('active','trialing','cancelling') and not demo),
    'mrr', (select coalesce(sum(case when "interval"='week' then price*4.33 else price end),0) from public.subscriptions where status in ('active','trialing','cancelling') and not demo),
    'pending_ship', (select count(*) from public.orders where status='paid' and not demo),
    'carts_open', (select count(*) from public.carts where not recovered and email is not null and updated_at >= now() - interval '7 days'),
    'messages', (select json_build_object('email',count(*) filter (where channel='email' and status='sent'),'whatsapp',count(*) filter (where channel='whatsapp' and status='sent')) from public.messages where created_at >= now() - (p_days || ' days')::interval),
    'pruebas', (select json_build_object(
        'pedidos',   count(*),
        'importe',   coalesce(sum(total),0),
        'clientes',  (select count(*) from public.customers where demo),
        'suscripciones', (select count(*) from public.subscriptions where demo and status in ('active','trialing','cancelling')),
        'ultima',    max(created_at))
      from public.orders where demo and status in ('paid','shipped','delivered'))
  );
$function$;

revoke all on function public.admin_stats(int) from public, anon, authenticated;
grant execute on function public.admin_stats(int) to service_role;

-- reward_stats: mismo criterio. Una recompensa de prueba se cuenta como emitida, vista y canjeada
-- (el circuito la emitió de verdad), pero su dinero no entra en ingresos ni en coste: si entrase,
-- el panel diría que la mecánica se paga sola con euros que nunca se cobraron.
create or replace function public.reward_stats(dias int default 90)
returns json language sql security definer set search_path to 'public','pg_temp' as $$
  with v as (select * from public.discounts
             where kind = 'recompensa' and issued_at >= now() - (dias || ' days')::interval),
       r as (select * from v where not demo)
  select json_build_object(
    'emitidas',   (select count(*) from v),
    'vistas',     (select count(*) from v where seen_at is not null),
    'canjeadas',  (select count(*) from v where redeemed_at is not null),
    'caducadas',  (select count(*) from v where redeemed_at is null and ends_at < now()),
    'vivas',      (select count(*) from v where redeemed_at is null and (ends_at is null or ends_at >= now()) and active),
    'pruebas',    (select count(*) from v where demo),
    'ingresos',   coalesce((select sum(revenue) from r where redeemed_at is not null), 0),
    'coste',      coalesce((select sum(case when type = 'fixed' then least(value, revenue) else revenue * value / 100 end)
                            from r where redeemed_at is not null), 0),
    'dias_hasta', (select round(avg(extract(epoch from (redeemed_at - issued_at)) / 86400)::numeric, 1)
                   from v where redeemed_at is not null),
    'por_dia',    coalesce((select json_agg(x order by x.dia)
                   from (select date_trunc('day', issued_at)::date as dia,
                                count(*) as emitidas,
                                count(*) filter (where redeemed_at is not null) as canjeadas,
                                coalesce(sum(revenue) filter (where redeemed_at is not null and not demo), 0) as ingresos
                         from v group by 1) x), '[]'::json)
  );
$$;

revoke all on function public.reward_stats(int) from public, anon, authenticated;
grant execute on function public.reward_stats(int) to service_role;
