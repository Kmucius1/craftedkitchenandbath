-- Crafted Kitchen & Bath — leads storage (Vercel Postgres / Neon)
create extension if not exists "pgcrypto";

create table if not exists leads (
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

create index if not exists idx_leads_created_at on leads (created_at desc);
create index if not exists idx_leads_status on leads (status);
