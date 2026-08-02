-- Run this in Supabase SQL Editor, or apply it with the Supabase CLI.
create table if not exists public.styleloop_state (
  id boolean primary key default true check (id),
  state jsonb not null,
  updated_at timestamptz not null default now()
);

-- One atomic write prevents a half-finished social, cart, or order update.
create or replace function public.replace_styleloop_state(next_state jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.styleloop_state (id, state, updated_at)
  values (true, next_state, now())
  on conflict (id) do update set state = excluded.state, updated_at = now();
end;
$$;

revoke all on table public.styleloop_state from anon, authenticated;
revoke all on function public.replace_styleloop_state(jsonb) from public;
grant select, insert, update on table public.styleloop_state to service_role;
grant execute on function public.replace_styleloop_state(jsonb) to service_role;
