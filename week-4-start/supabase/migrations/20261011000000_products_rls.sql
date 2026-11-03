-- Voer dit bestand uit in de Supabase SQL Editor van het bestaande project.
-- Alleen toegangsregels worden aangepast; tabellen, kolommen en data blijven intact.
-- De serverclient met secret key blijft RLS omzeilen voor productbeheer.
begin;

alter table public.products enable row level security;

-- Publieke bezoekers mogen alleen lezen, ook als er al schrijfpolicies bestaan.
revoke all privileges on table public.products from public, anon, authenticated;
grant select on table public.products to anon, authenticated;

drop policy if exists products_visible_read on public.products;
create policy products_visible_read
  on public.products
  for select
  to anon, authenticated
  using (is_hidden = false);

-- Restrictive voorkomt dat een bestaande ruime SELECT-policy verborgen rijen
-- alsnog vrijgeeft: permissive policies worden anders met OR gecombineerd.
drop policy if exists products_visible_read_guard on public.products;
create policy products_visible_read_guard
  on public.products
  as restrictive
  for select
  to anon, authenticated
  using (is_hidden = false);

commit;

-- Controleer na toepassing via de Data API met de publishable key:
-- 1. SELECT zonder is_hidden-filter retourneert uitsluitend zichtbare producten.
-- 2. SELECT op het id van een verborgen product retourneert geen rijen.
-- 3. INSERT, UPDATE en DELETE worden geweigerd voor publieke bezoekers.
