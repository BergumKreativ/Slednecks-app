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
-- Valgt løp fra kalenderen, underlag, plantype og egne endringer i planen
alter table public.profiles add column if not exists race_id     text  not null default '';
alter table public.profiles add column if not exists race_type   text  not null default 'Slede';
alter table public.profiles add column if not exists plan_type   text  not null default '';
alter table public.profiles add column if not exists plan_custom jsonb not null default '{}'::jsonb;
-- Hundeprofiler: { "<navn>": { born, sex, breed, chip, chipDate, harness, notes, weights:[{d,kg,bcs}], vaccines:[{type,d,until,note}] } }
alter table public.profiles add column if not exists dog_info jsonb not null default '{}'::jsonb;

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
-- Egne økter: kategori 'meg' (uten hunder) eller 'hund'. rpe = anstrengelse 1–10, kropp = 3 sterk / 2 ok / 1 sliten
alter table public.okter add column if not exists kategori text not null default 'hund';
alter table public.okter add column if not exists rpe   integer;
alter table public.okter add column if not exists kropp integer;
-- Vekt på last: kløv eller kjetting for hund, sekk for deg
alter table public.okter add column if not exists last_kg numeric;
-- Vær under økta (temperatur °C og relativ luftfuktighet %)
alter table public.okter add column if not exists temp numeric;
alter table public.okter add column if not exists rh   numeric;
-- Rute fra GPX: [[lat, lon, høyde], …] forenklet til maks ~500 punkter. kilde = 'gpx' (senere 'strava', 'gps')
alter table public.okter add column if not exists rute  jsonb;
alter table public.okter add column if not exists kilde text not null default '';
-- Egne mål: [{ id, name, type, km, hm, kg, date }]
alter table public.profiles add column if not exists my_goals jsonb not null default '[]'::jsonb;

-- Tilbakemeldinger fra testbrukere. Leses i Supabase → Table Editor. Blir liggende uten bruker-ID hvis kontoen slettes.
create table if not exists public.tilbakemeldinger (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  type       text not null default 'annet',
  tekst      text not null,
  side       text not null default '',
  versjon    text not null default '',
  enhet      text not null default ''
);
alter table public.tilbakemeldinger enable row level security;
drop policy if exists "send tilbakemelding" on public.tilbakemeldinger;
create policy "send tilbakemelding" on public.tilbakemeldinger for insert with check (auth.uid() = user_id);
drop policy if exists "egne tilbakemeldinger" on public.tilbakemeldinger;
create policy "egne tilbakemeldinger" on public.tilbakemeldinger for select using (auth.uid() = user_id);

-- Lar en innlogget bruker slette sin egen konto. Profil og økter slettes via «on delete cascade».
create or replace function public.delete_my_account() returns void
language sql security definer set search_path = '' as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

alter table public.profiles enable row level security;
alter table public.okter    enable row level security;

drop policy if exists "egen profil" on public.profiles;
create policy "egen profil" on public.profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "egne økter" on public.okter;
create policy "egne økter" on public.okter
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
