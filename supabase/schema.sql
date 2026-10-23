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
-- Bilder fra økta: liste med stier i lagringsbøtta «bilder»
alter table public.okter add column if not exists bilder jsonb not null default '[]'::jsonb;

-- Privat bildelagring. Hver bruker har sin egen mappe: <bruker-id>/…
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('bilder', 'bilder', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
drop policy if exists "egne bilder lese" on storage.objects;
create policy "egne bilder lese" on storage.objects for select to authenticated
  using (bucket_id = 'bilder' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "egne bilder laste opp" on storage.objects;
create policy "egne bilder laste opp" on storage.objects for insert to authenticated
  with check (bucket_id = 'bilder' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "egne bilder endre" on storage.objects;
create policy "egne bilder endre" on storage.objects for update to authenticated
  using (bucket_id = 'bilder' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "egne bilder slette" on storage.objects;
create policy "egne bilder slette" on storage.objects for delete to authenticated
  using (bucket_id = 'bilder' and (storage.foldername(name))[1] = auth.uid()::text);
-- Egne mål: [{ id, name, type, km, hm, kg, date }]
alter table public.profiles add column if not exists my_goals jsonb not null default '[]'::jsonb;
-- Forsidebilde på Oversikt (sti i bøtta «bilder»)
alter table public.profiles add column if not exists cover text not null default '';
-- Startlisens fra NHF: '' (ikke registrert), 'aars:<sesongstart-år>' eller 'engang'
alter table public.profiles add column if not exists lisens text not null default '';

-- Føremeldinger: deles med alle innloggede brukere. Bare den som skrev meldingen kan endre eller slette den.
create table if not exists public.foremeldinger (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade default auth.uid(),
  created_at timestamptz not null default now(),
  lat        double precision not null,
  lon        double precision not null,
  sted       text not null default '',
  loype      text not null default '',
  fore       text not null default '',
  kjort      boolean not null default false,
  tekst      text not null default '',
  navn       text not null default ''
);
create index if not exists foremeldinger_tid on public.foremeldinger (created_at desc);
alter table public.foremeldinger enable row level security;
drop policy if exists "alle innloggede ser føremeldinger" on public.foremeldinger;
create policy "alle innloggede ser føremeldinger" on public.foremeldinger for select to authenticated using (true);
drop policy if exists "egne føremeldinger" on public.foremeldinger;
create policy "egne føremeldinger" on public.foremeldinger for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- Navnet som vises på føremeldinger (valgfritt)
alter table public.profiles add column if not exists nickname text not null default '';

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

-- Flere løp i sesongen: [{ id, raceId, name, date, km, hm }]. Hovedløpet ligger i race_*-kolonnene.
alter table public.profiles add column if not exists races jsonb not null default '[]'::jsonb;

-- Invitasjonskoder: testere lager konto selv med e-post, passord og en kode. Kodene leses bare her i databasen.
-- Ny kode:     insert into public.invite_codes (code, note) values ('SAGA-XXXX', 'Hvem den er til');
-- Steng koden: update public.invite_codes set active = false where code = 'SAGA-XXXX';
create table if not exists public.invite_codes (
  code       text primary key,
  note       text not null default '',
  active     boolean not null default true,
  max_uses   integer,
  uses       integer not null default 0,
  created_at timestamptz not null default now()
);
alter table public.invite_codes enable row level security; -- ingen policyer: appen kan verken lese eller endre kodene

-- Sjekkes når en ny bruker opprettes. Kontoer uten gyldig kode avvises, også de som lages med «Add user» i Supabase.
-- Brukere som inviteres på e-post («Invite user»), slipper gjennom.
create or replace function public.check_invite_code() returns trigger
language plpgsql security definer set search_path = '' as $$
declare c text := upper(trim(coalesce(new.raw_user_meta_data->>'invite', '')));
begin
  if new.invited_at is not null then return new; end if;
  update public.invite_codes set uses = uses + 1
   where upper(code) = c and active and (max_uses is null or uses < max_uses);
  if not found then raise exception 'Ugyldig invitasjonskode' using errcode = 'P0001'; end if;
  return new;
end $$;
drop trigger if exists check_invite_code on auth.users;
create trigger check_invite_code before insert on auth.users for each row execute function public.check_invite_code();

-- Fokus for sesongen: ["slede","nordisk","barmark","tur","meg"]. Tom liste viser alt.
alter table public.profiles add column if not exists focus jsonb not null default '[]'::jsonb;
