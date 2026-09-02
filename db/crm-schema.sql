-- Crafted Kitchen & Bath — CRM tracking (lead sources, completed projects,
-- review requests, referrals, marketing campaigns, publishing activity).
--
-- NOT YET APPLIED to the live Supabase project. Run this by hand (Supabase
-- SQL editor or an MCP call) against the same project db/schema.sql was run
-- against, reviewed on its own like db/designer-schema.sql.
--
-- Sequenced so every FK target exists before it's referenced:
--   campaigns -> leads (alter) -> projects -> review_requests -> referrals
--   -> activity_log

create extension if not exists "pgcrypto";

-- ── Marketing campaigns ──────────────────────────────────────────────────
create table if not exists public.campaigns (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  channel          text,                 -- 'google_ads' | 'facebook' | 'instagram' | 'email' | 'organic' | 'referral' | 'direct' | 'other'
  utm_campaign_key text unique,
  start_date       date,
  end_date         date,
  budget           numeric,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── Leads: qualification fields (from feat/crm-qualification-fields) ────
-- All nullable/additive — an older deploy that doesn't send them keeps working.
alter table public.leads
  add column if not exists project_type          text,
  add column if not exists budget_range           text,
  add column if not exists desired_timeline       text,
  add column if not exists owns_home              boolean,
  add column if not exists has_plans              boolean,
  add column if not exists preferred_contact_time text,
  add column if not exists intake_payload         jsonb;

-- ── Leads: source / campaign attribution ─────────────────────────────────
alter table public.leads
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term     text,
  add column if not exists utm_content  text,
  add column if not exists referral_code text,
  add column if not exists landing_page text,
  add column if not exists campaign_id  uuid references public.campaigns(id),
  -- 'organic_web' | 'phone_call' | 'referral' | 'paid' | 'chat_widget'
  add column if not exists channel      text;

create index if not exists idx_leads_campaign_id   on public.leads (campaign_id);
create index if not exists idx_leads_referral_code on public.leads (referral_code);

-- ── Projects: system-of-record row per job (portfolio + PM/portal fields) ─
create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid references public.leads(id),
  title            text not null,
  category         text,
  city             text,
  description      text,
  images           jsonb not null default '[]'::jsonb,
  completed_date   date,
  project_value    numeric,
  featured         boolean not null default false,
  -- Portal / project-management fields
  phase            text not null default 'discovery' check (phase in
                     ('discovery','design','selections','preconstruction','build','final_walkthrough','completed','on_hold')),
  status           text not null default 'active' check (status in ('active','on_hold','completed','cancelled')),
  pm_name          text,
  pm_email         text,
  pm_phone         text,
  address          text,
  contract_total   numeric,
  portal_enabled   boolean not null default false,
  enabled_modules  jsonb not null default
    '{"selections":true,"schedule":true,"budget":true,"approvals":true,"updates":true,"messages":true,"documents":true,"punch_list":true}'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists idx_projects_lead_id on public.projects (lead_id);
create index if not exists idx_projects_phase   on public.projects (phase);

-- ── Review requests ───────────────────────────────────────────────────────
create table if not exists public.review_requests (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid references public.leads(id),
  project_id     uuid references public.projects(id),
  customer_name  text not null,
  customer_email text,
  customer_phone text,
  status         text not null default 'pending' check (status in ('pending','sent','completed','declined')),
  sent_at        timestamptz,
  review_link    text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_review_requests_status on public.review_requests (status);

-- ── Referrals ──────────────────────────────────────────────────────────────
create table if not exists public.referrals (
  id               uuid primary key default gen_random_uuid(),
  referrer_lead_id uuid references public.leads(id),
  referrer_name    text not null,
  referrer_email   text,
  referral_code    text not null unique,
  referred_lead_id uuid references public.leads(id),
  status           text not null default 'sent' check (status in ('sent','pending','converted')),
  reward_notes     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── Publishing activity log ─────────────────────────────────────────────
create table if not exists public.activity_log (
  id           uuid primary key default gen_random_uuid(),
  type         text not null,   -- 'blog_post' | 'social_post' | 'press' | 'email_campaign' | 'other'
  title        text not null,
  url          text,
  channel      text,
  published_at timestamptz,
  notes        text,
  created_at   timestamptz not null default now()
);

-- RLS on, zero policies — same as db/schema.sql / db/designer-schema.sql.
-- All access is server-side via the service-role key (lib/db.ts's getSupabase()).
do $$
declare t text;
begin
  foreach t in array array['campaigns','projects','review_requests','referrals','activity_log']
  loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;
