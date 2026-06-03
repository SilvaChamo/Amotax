-- Executar no Hetzner se amotax_members já existia sem registration_kind
alter table amotax_members
  add column if not exists registration_kind text not null default 'mototaxi'
    check (registration_kind in ('mototaxi', 'tchopela'));
