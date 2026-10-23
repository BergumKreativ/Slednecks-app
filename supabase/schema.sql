-- Slednecks treningslogg: kjør hele denne fila i Supabase → SQL Editor → New query → Run.
-- Hver bruker ser og endrer bare sine egne data (Row Level Security).

create table if not exists public.profiles (
  user_id   uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  race_date date not null default '2027-01-09',
  dogs      jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
-- Eget mål per bruker
alter table public.profiles add column if not exists race_name text not null default '';
alter table public.profiles add column if not exists race_km   numeric not null default 30;
alter table public.profiles add column if not exists race_hm   integer not null default 500;
alter table public.profiles alter column dogs set default '[]'::jsonb;

create table if not exists public.okter (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade default auth.uid(),
  dato       date not null,
  type       text not null default 'Annet',
  km         numeric not null default 0,
  hm         integer not null default 0,
  min        integer not null default 0,
  hunder     jsonb not null default '[]'::jsonb,
  motivasjon jsonb not null default '{}'::jsonb,
  kommentar  text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists okter_user_dato on public.okter (user_id, dato);

alter table public.profiles enable row level security;
alter table public.okter    enable row level security;

drop policy if exists "egen profil" on public.profiles;
create policy "egen profil" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "egne økter" on public.okter;
create policy "egne økter" on public.okter
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
