-- 004 · Recompensa post-compra (14-09-2026)
--
-- Cada pedido pagado genera un código PERSONAL de un solo uso para la siguiente compra. Vive en
-- `discounts` y no en una tabla aparte a propósito: la validación de códigos (vigencia, mínimo,
-- usos, activo) ya está escrita una vez en getDiscount() y duplicarla para las recompensas es la
-- forma segura de que las dos se separen con el tiempo.
alter table public.discounts
  add column if not exists kind           text not null default 'publico',
  add column if not exists email          text,
  add column if not exists order_id       text,
  add column if not exists issued_at      timestamptz,
  add column if not exists seen_at        timestamptz,
  add column if not exists redeemed_at    timestamptz,
  add column if not exists redeemed_order text,
  add column if not exists revenue        numeric not null default 0;

alter table public.discounts drop constraint if exists discounts_kind_chk;
alter table public.discounts add constraint discounts_kind_chk check (kind in ('publico', 'recompensa'));

-- Un pedido genera UNA recompensa y sólo una. El índice único es lo que hace idempotente al
-- emisor: si el webhook de Stripe llega dos veces, el segundo insert choca y no duplica.
create unique index if not exists discounts_order_unico
  on public.discounts(order_id) where order_id is not null;

create index if not exists discounts_recompensa_email
  on public.discounts(email, kind) where kind = 'recompensa';
create index if not exists discounts_recompensa_emitidas
  on public.discounts(issued_at desc) where kind = 'recompensa';

comment on column public.discounts.kind is 'publico = código de campaña, cualquiera lo usa. recompensa = personal, de un solo uso, atado al email que lo generó.';
comment on column public.discounts.revenue is 'Subtotal del pedido en el que se canjeó: es lo que permite medir si la recompensa se paga sola.';

-- Contabilidad en UNA consulta: el CRM no se descarga la tabla para sumarla en el navegador.
-- Nace sin permisos para nadie salvo el servidor, como el resto de RPC del proyecto: una función
-- SECURITY DEFINER se salta las políticas de fila, así que si se deja pública se convierte en la
-- puerta de atrás de toda la tabla.
create or replace function public.reward_stats(dias int default 90)
returns json
language sql
security definer
set search_path = public, pg_temp
as $$
  with v as (
    select * from public.discounts
    where kind = 'recompensa' and issued_at >= now() - make_interval(days => greatest(dias, 1))
  )
  select json_build_object(
    'emitidas',   (select count(*) from v),
    'vistas',     (select count(*) from v where seen_at is not null),
    'canjeadas',  (select count(*) from v where redeemed_at is not null),
    'caducadas',  (select count(*) from v where redeemed_at is null and ends_at < now()),
    'vivas',      (select count(*) from v where redeemed_at is null and (ends_at is null or ends_at >= now()) and active),
    'ingresos',   coalesce((select sum(revenue) from v where redeemed_at is not null), 0),
    'coste',      coalesce((select sum(case when type = 'fixed' then least(value, revenue) else revenue * value / 100 end)
                            from v where redeemed_at is not null), 0),
    'dias_hasta', (select round(avg(extract(epoch from (redeemed_at - issued_at)) / 86400)::numeric, 1)
                   from v where redeemed_at is not null),
    'por_dia',    coalesce((select json_agg(x order by x.dia)
                   from (select date_trunc('day', issued_at)::date as dia,
                                count(*) as emitidas,
                                count(*) filter (where redeemed_at is not null) as canjeadas,
                                coalesce(sum(revenue) filter (where redeemed_at is not null), 0) as ingresos
                         from v group by 1) x), '[]'::json)
  );
$$;

revoke all on function public.reward_stats(int) from public, anon, authenticated;
grant execute on function public.reward_stats(int) to service_role;
