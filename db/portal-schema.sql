-- Crafted Kitchen & Bath — homeowner client portal.
--
-- NOT YET APPLIED. Depends on db/crm-schema.sql having been applied first
-- (public.projects must exist). Run by hand, reviewed separately, same as
-- every other schema file in this repo.
--
-- This is the first table set in the repo reachable by a non-service-role
-- identity (a signed-in homeowner via Supabase Auth), so it's the only file
-- with real RLS SELECT policies. Enforcement is still primarily server-side
-- (lib/portal-auth.ts's assertProjectAccess, using the service-role client,
-- matching every other DB access in this codebase) — these policies are
-- defense-in-depth, not the primary gate. There are no INSERT/UPDATE/DELETE
-- policies for the authenticated role anywhere: all writes go through
-- app/api/portal/** using the service-role client after assertProjectAccess.

create extension if not exists "pgcrypto";

-- One row per Supabase Auth user with portal access. id == auth.users.id.
create table if not exists public.portal_users (
  id         uuid primary key,
  email      text not null,
  full_name  text,
  phone      text,
  created_at timestamptz not null default now()
);

-- Object-level authorization boundary: who may see which project.
create table if not exists public.project_members (
  id             uuid primary key default gen_random_uuid(),
  project_id     uuid not null references public.projects(id) on delete cascade,
  portal_user_id uuid not null references public.portal_users(id) on delete cascade,
  role           text not null default 'owner' check (role in ('owner','co_owner')),
  invited_at     timestamptz not null default now(),
  accepted_at    timestamptz,
  unique (project_id, portal_user_id)
);

-- Weekly exec-summary updates.
create table if not exists public.project_updates (
  id                         uuid primary key default gen_random_uuid(),
  project_id                 uuid not null references public.projects(id) on delete cascade,
  title                      text,
  completed_summary          text,
  planned_next_summary       text,
  decisions_required_summary text,
  published_at               timestamptz not null default now(),
  created_at                 timestamptz not null default now()
);

create table if not exists public.project_photos (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  update_id  uuid references public.project_updates(id),
  room       text,
  category   text not null default 'progress' check (category in ('before','progress','final')),
  url        text not null,
  caption    text,
  taken_at   date,
  created_at timestamptz not null default now()
);

-- Staff-only notes feed. Deliberately its own table (not an is_internal flag
-- on messages) so "internal notes never client-visible" holds by
-- construction — the portal never queries this table at all.
create table if not exists public.project_notes (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  author_name text,
  body        text not null,
  created_at  timestamptz not null default now()
);

-- ── Selections ─────────────────────────────────────────────────────────
create table if not exists public.selections (
  id                 uuid primary key default gen_random_uuid(),
  project_id         uuid not null references public.projects(id) on delete cascade,
  room               text not null,
  category           text not null,   -- 'countertop' | 'cabinet' | 'tile' | 'fixture' | 'appliance' | 'hardware' | 'other'
  title              text not null,
  description        text,
  allowance_amount   numeric,
  decision_deadline  date,
  status             text not null default 'pending' check (status in ('pending','approved','declined','change_requested')),
  approved_option_id uuid,   -- FK added below, once selection_options exists
  decided_at         timestamptz,
  decided_by         uuid references public.portal_users(id),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table if not exists public.selection_options (
  id           uuid primary key default gen_random_uuid(),
  selection_id uuid not null references public.selections(id) on delete cascade,
  label        text not null,
  price        numeric,
  is_upgrade   boolean not null default false,
  spec         jsonb,                 -- material/finish/dims/sku/vendor link
  images       jsonb not null default '[]'::jsonb,
  order_status text not null default 'not_ordered' check (order_status in ('not_ordered','ordered','shipped','delivered')),
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.selections
  drop constraint if exists selections_approved_option_fk;
alter table public.selections
  add constraint selections_approved_option_fk
  foreign key (approved_option_id) references public.selection_options(id);

create table if not exists public.selection_comments (
  id                    uuid primary key default gen_random_uuid(),
  selection_id          uuid not null references public.selections(id) on delete cascade,
  author_type           text not null check (author_type in ('staff','client')),
  author_portal_user_id uuid references public.portal_users(id),
  author_staff_name     text,
  body                  text not null,
  created_at            timestamptz not null default now()
);

-- Append-only approval history — survives re-decisions on selections.status.
create table if not exists public.selection_decisions (
  id              uuid primary key default gen_random_uuid(),
  selection_id    uuid not null references public.selections(id) on delete cascade,
  option_id       uuid references public.selection_options(id),
  action          text not null check (action in ('approved','declined','change_requested')),
  decided_by      uuid references public.portal_users(id),
  decided_by_name text,   -- denormalized snapshot
  notes           text,
  created_at      timestamptz not null default now()
);

-- ── Change orders (approvals) ─────────────────────────────────────────────
create table if not exists public.change_orders (
  id                   uuid primary key default gen_random_uuid(),
  project_id           uuid not null references public.projects(id) on delete cascade,
  selection_id         uuid references public.selections(id),   -- set when auto-drafted from an overage
  title                text not null,
  original_scope       text,
  requested_change     text not null,
  price_impact         numeric not null default 0,
  schedule_impact_days integer,
  photos               jsonb not null default '[]'::jsonb,
  deadline             date,
  status               text not null default 'draft' check (status in ('draft','sent','approved','declined','void')),
  sent_at              timestamptz,
  -- Typed-name e-sign stand-in until a real e-sign vendor is wired up (Phase 4).
  signed_name          text,
  signed_at            timestamptz,
  signature_ip         text,
  esign_envelope_id    text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ── Schedule ───────────────────────────────────────────────────────────
create table if not exists public.schedule_milestones (
  id                uuid primary key default gen_random_uuid(),
  project_id        uuid not null references public.projects(id) on delete cascade,
  phase             text,
  type              text not null check (type in ('milestone','appointment','delivery','inspection','access_required','delay_notice')),
  title             text not null,
  description       text,
  start_at          timestamptz not null,
  end_at            timestamptz,
  location          text,
  delay_reason      text,
  delay_impact_days integer,
  status            text not null default 'scheduled' check (status in ('scheduled','completed','cancelled','delayed')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── Messages ───────────────────────────────────────────────────────────
create table if not exists public.message_threads (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category   text not null default 'general' check (category in ('general','design','schedule','financial','warranty')),
  title      text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id                    uuid primary key default gen_random_uuid(),
  thread_id             uuid not null references public.message_threads(id) on delete cascade,
  author_type           text not null check (author_type in ('staff','client')),
  author_portal_user_id uuid references public.portal_users(id),
  author_staff_name     text,
  body                  text not null,
  attachments           jsonb not null default '[]'::jsonb,
  tagged_staff          text[],
  created_at            timestamptz not null default now()
);

-- ── Documents ──────────────────────────────────────────────────────────
create table if not exists public.project_documents (
  id                     uuid primary key default gen_random_uuid(),
  project_id             uuid not null references public.projects(id) on delete cascade,
  category               text not null default 'general' check (category in ('contract','permit','warranty','design','invoice','receipt','other')),
  title                  text not null,
  url                    text not null,
  uploaded_by_staff_name text,
  created_at             timestamptz not null default now()
);

-- ── Punch list & warranty ─────────────────────────────────────────────
create table if not exists public.punch_list_items (
  id                     uuid primary key default gen_random_uuid(),
  project_id             uuid not null references public.projects(id) on delete cascade,
  submitted_by           uuid references public.portal_users(id),
  room                   text,
  item_type              text,   -- 'defect' | 'incomplete' | 'damage' | 'other'
  description            text not null,
  photo_url              text,
  status                 text not null default 'submitted' check (status in
                           ('submitted','acknowledged','scheduled','in_progress','completed','client_confirmed','declined')),
  assigned_to_staff_name text,
  scheduled_date         date,
  resolution_notes       text,
  client_confirmed_at    timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- ── Invoices (client-safe view only — no labor cost / margin / vendor
-- pricing columns exist here or anywhere portal-facing) ───────────────
create table if not exists public.invoices (
  id                       uuid primary key default gen_random_uuid(),
  project_id               uuid not null references public.projects(id) on delete cascade,
  description              text not null,
  amount                   numeric not null,
  due_date                 date,
  status                   text not null default 'open' check (status in ('open','paid','overdue','void')),
  stripe_invoice_id        text,   -- populated once Stripe is wired up (Phase 3)
  stripe_payment_intent_id text,
  paid_at                  timestamptz,
  receipt_url              text,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ── RLS ────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array[
    'portal_users','project_members','project_updates','project_photos',
    'selections','selection_options','selection_comments','selection_decisions',
    'change_orders','schedule_milestones','message_threads','messages',
    'project_documents','punch_list_items','invoices','project_notes'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;

-- project_notes gets no policy beyond enable-with-zero-policies (staff-only
-- by construction, same as every table in db/crm-schema.sql) — it's never
-- queried with anything but the service-role key.

drop policy if exists "user reads own portal_users row" on public.portal_users;
create policy "user reads own portal_users row" on public.portal_users
  for select using (id = auth.uid());

drop policy if exists "members read own memberships" on public.project_members;
create policy "members read own memberships" on public.project_members
  for select using (portal_user_id = auth.uid());

drop policy if exists "members read own project updates" on public.project_updates;
create policy "members read own project updates" on public.project_updates
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = project_updates.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own project photos" on public.project_photos;
create policy "members read own project photos" on public.project_photos
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = project_photos.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own project selections" on public.selections;
create policy "members read own project selections" on public.selections
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = selections.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own selection options" on public.selection_options;
create policy "members read own selection options" on public.selection_options
  for select using (exists (
    select 1 from public.selections s
    join public.project_members pm on pm.project_id = s.project_id
    where s.id = selection_options.selection_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own selection comments" on public.selection_comments;
create policy "members read own selection comments" on public.selection_comments
  for select using (exists (
    select 1 from public.selections s
    join public.project_members pm on pm.project_id = s.project_id
    where s.id = selection_comments.selection_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own selection decisions" on public.selection_decisions;
create policy "members read own selection decisions" on public.selection_decisions
  for select using (exists (
    select 1 from public.selections s
    join public.project_members pm on pm.project_id = s.project_id
    where s.id = selection_decisions.selection_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own change orders" on public.change_orders;
create policy "members read own change orders" on public.change_orders
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = change_orders.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own schedule" on public.schedule_milestones;
create policy "members read own schedule" on public.schedule_milestones
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = schedule_milestones.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own message threads" on public.message_threads;
create policy "members read own message threads" on public.message_threads
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = message_threads.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own messages" on public.messages;
create policy "members read own messages" on public.messages
  for select using (exists (
    select 1 from public.message_threads mt
    join public.project_members pm on pm.project_id = mt.project_id
    where mt.id = messages.thread_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own documents" on public.project_documents;
create policy "members read own documents" on public.project_documents
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = project_documents.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own punch list" on public.punch_list_items;
create policy "members read own punch list" on public.punch_list_items
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = punch_list_items.project_id and pm.portal_user_id = auth.uid()
  ));

drop policy if exists "members read own invoices" on public.invoices;
create policy "members read own invoices" on public.invoices
  for select using (exists (
    select 1 from public.project_members pm
    where pm.project_id = invoices.project_id and pm.portal_user_id = auth.uid()
  ));
