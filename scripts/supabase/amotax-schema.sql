-- AMOTAX piloto — executar no SQL Editor do Supabase (projecto novo ou dedicado)

create table if not exists amotax_config (
  id text primary key default 'default',
  due_amount_mzn integer not null default 100,
  association_name text not null,
  updated_at timestamptz not null default now()
);

create table if not exists amotax_members (
  id text primary key,
  phone text not null,
  name text not null,
  zone_id text not null,
  province text,
  district text,
  municipality text,
  admin_post text,
  praca text,
  status text not null check (status in ('pending', 'active', 'rejected')),
  member_number text,
  sms_opt_in boolean not null default false,
  license_plate text,
  created_at timestamptz not null,
  is_admin boolean not null default false
);

create index if not exists amotax_members_phone_idx on amotax_members (phone);

create table if not exists amotax_dues (
  id text primary key,
  member_id text not null references amotax_members (id) on delete cascade,
  year integer not null,
  month integer not null,
  amount_mzn integer not null,
  status text not null check (status in ('pending', 'paid', 'waived', 'review')),
  paid_at timestamptz,
  receipt_uri text
);

create table if not exists amotax_announcements (
  id text primary key,
  title text not null,
  body text not null,
  published_at timestamptz not null,
  send_sms boolean not null default false
);

create table if not exists amotax_meetings (
  id text primary key,
  title text not null,
  starts_at timestamptz not null,
  location_text text not null,
  body text not null
);

create table if not exists amotax_rsvps (
  meeting_id text not null references amotax_meetings (id) on delete cascade,
  member_id text not null references amotax_members (id) on delete cascade,
  response text not null check (response in ('yes', 'no', 'maybe')),
  updated_at timestamptz not null,
  primary key (meeting_id, member_id)
);

-- Config inicial
insert into amotax_config (id, due_amount_mzn, association_name)
values (
  'default',
  100,
  'AMOTAX — Associação Moçambicana de Moto Tax'
)
on conflict (id) do nothing;

-- Avisos piloto
insert into amotax_announcements (id, title, body, published_at, send_sms)
values
  (
    'ann_welcome',
    'Bem-vindo ao aplicativo AMOTAX',
    'Esta é a fase piloto. Inscreva-se, pague a cota simbólica e fique atento aos convites de reunião da associação.',
    now() - interval '2 days',
    false
  ),
  (
    'ann_cota',
    'Cota mensal disponível',
    'A cota do mês já está activa. Envie o comprovativo na área Cotas assim que efectuar o pagamento.',
    now() - interval '1 day',
    true
  ),
  (
    'ann_reuniao',
    'Convocatória de reunião',
    'Fique atento à secção Reuniões para confirmar a sua presença nas assembleias da AMOTAX.',
    now(),
    false
  )
on conflict (id) do nothing;

-- RLS piloto: leitura/escrita com chave anon (restringir em produção real)
alter table amotax_config enable row level security;
alter table amotax_members enable row level security;
alter table amotax_dues enable row level security;
alter table amotax_announcements enable row level security;
alter table amotax_meetings enable row level security;
alter table amotax_rsvps enable row level security;

create policy "amotax_config_pilot" on amotax_config for all using (true) with check (true);
create policy "amotax_members_pilot" on amotax_members for all using (true) with check (true);
create policy "amotax_dues_pilot" on amotax_dues for all using (true) with check (true);
create policy "amotax_announcements_pilot" on amotax_announcements for all using (true) with check (true);
create policy "amotax_meetings_pilot" on amotax_meetings for all using (true) with check (true);
create policy "amotax_rsvps_pilot" on amotax_rsvps for all using (true) with check (true);
