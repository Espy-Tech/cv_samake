create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null default 'Réflexion personnelle',
  thumbnail_url text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.publications enable row level security;

drop policy if exists "Published publications are public" on public.publications;
create policy "Published publications are public"
  on public.publications for select
  using (published_at <= now());

drop policy if exists "Authenticated admins manage publications" on public.publications;
create policy "Authenticated admins manage publications"
  on public.publications for all
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into storage.buckets (id, name, public)
values ('publication-thumbnails', 'publication-thumbnails', true)
on conflict (id) do nothing;

drop policy if exists "Public can view publication thumbnails" on storage.objects;
create policy "Public can view publication thumbnails"
  on storage.objects for select
  using (bucket_id = 'publication-thumbnails');

drop policy if exists "Authenticated admins upload publication thumbnails" on storage.objects;
create policy "Authenticated admins upload publication thumbnails"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'publication-thumbnails' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated admins update publication thumbnails" on storage.objects;
create policy "Authenticated admins update publication thumbnails"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'publication-thumbnails' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'publication-thumbnails' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Authenticated admins delete publication thumbnails" on storage.objects;
create policy "Authenticated admins delete publication thumbnails"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'publication-thumbnails' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
