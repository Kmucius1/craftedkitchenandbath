-- Crafted Kitchen & Bath — leads storage (Supabase / Postgres)
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  full_name      text not null,
  email          text not null,
  phone          text,
  service        text,
  city           text,
  description    text,
  contact_method text,
  source         text,
  status         text not null default 'New',
  notes          text
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status on public.leads (status);

-- RLS on with NO policies => the public anon key cannot read or write this table.
-- All app access is server-side via the service-role key, which bypasses RLS.
alter table public.leads enable row level security;
