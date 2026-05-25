-- ─── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── users ────────────────────────────────────────────────────────────────────
create table if not exists public.users (
  id                uuid primary key default uuid_generate_v4(),
  wallet_address    text unique not null,
  created_at        timestamptz not null default now(),
  last_active_at    timestamptz not null default now()
);

-- ─── goals ────────────────────────────────────────────────────────────────────
create table if not exists public.goals (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references public.users(id) on delete cascade,
  object_id                   text unique not null,
  name_encrypted              text,
  target_amount               numeric not null,
  current_balance             numeric not null default 0,
  asset_type                  smallint not null default 0,
  deadline                    timestamptz,
  auto_save_enabled           bool not null default false,
  auto_save_amount            numeric,
  auto_save_interval_epochs   integer,
  grow_mode_enabled           bool not null default false,
  grow_mode_allocation_bps    integer not null default 0,
  completed                   bool not null default false,
  walrus_metadata_blob_id     text,
  created_at                  timestamptz not null default now()
);

-- ─── transactions ─────────────────────────────────────────────────────────────
create table if not exists public.transactions (
  id          uuid primary key default uuid_generate_v4(),
  goal_id     uuid not null references public.goals(id) on delete cascade,
  type        text not null,
  amount      numeric not null,
  asset_type  smallint not null,
  tx_digest   text not null,
  epoch       bigint not null,
  created_at  timestamptz not null default now()
);

-- ─── recommendations ──────────────────────────────────────────────────────────
create table if not exists public.recommendations (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  type             text not null,
  title            text not null,
  body             text not null,
  expected_outcome text not null,
  risk_level       text not null,
  action_payload   jsonb not null default '{}',
  actioned         bool not null default false,
  approved         bool not null default false,
  created_at       timestamptz not null default now()
);

-- ─── recommendation_actions ───────────────────────────────────────────────────
create table if not exists public.recommendation_actions (
  id                  uuid primary key default uuid_generate_v4(),
  recommendation_id   uuid not null references public.recommendations(id) on delete cascade,
  user_id             uuid not null references public.users(id) on delete cascade,
  approved            bool not null,
  tx_digest           text,
  error               text,
  created_at          timestamptz not null default now()
);

-- ─── passport_snapshots ───────────────────────────────────────────────────────
create table if not exists public.passport_snapshots (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references public.users(id) on delete cascade,
  walrus_blob_id    text not null,
  onchain_version   bigint not null,
  created_at        timestamptz not null default now()
);

-- ─── session_keys ─────────────────────────────────────────────────────────────
create table if not exists public.session_keys (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references public.users(id) on delete cascade,
  public_key            text not null,
  encrypted_private_key text not null,
  expires_at            timestamptz not null,
  created_at            timestamptz not null default now()
);

-- ─── indexer_state ────────────────────────────────────────────────────────────
create table if not exists public.indexer_state (
  id                  integer primary key default 1,
  last_event_cursor   jsonb,
  updated_at          timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into public.indexer_state (id) values (1) on conflict do nothing;

-- ─── auto_save_logs ───────────────────────────────────────────────────────────
create table if not exists public.auto_save_logs (
  id          uuid primary key default uuid_generate_v4(),
  goal_id     uuid not null references public.goals(id) on delete cascade,
  amount      numeric not null,
  asset_type  smallint not null,
  tx_digest   text not null,
  epoch       bigint not null,
  created_at  timestamptz not null default now()
);

-- ─── grow_mode_positions ──────────────────────────────────────────────────────
create table if not exists public.grow_mode_positions (
  id                  uuid primary key default uuid_generate_v4(),
  goal_id             uuid not null references public.goals(id) on delete cascade,
  protocol            text not null,
  position_object_id  text not null,
  allocated_amount    numeric not null,
  current_value       numeric not null default 0,
  closed              bool not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─── price_cache ──────────────────────────────────────────────────────────────
create table if not exists public.price_cache (
  feed_id       text primary key,
  price         numeric not null,
  confidence    numeric not null,
  expo          integer not null,
  publish_time  bigint not null,
  cached_at     timestamptz not null default now()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists goals_user_id_idx on public.goals(user_id);
create index if not exists transactions_goal_id_idx on public.transactions(goal_id);
create index if not exists recommendations_user_id_idx on public.recommendations(user_id);
create index if not exists session_keys_user_id_idx on public.session_keys(user_id);
create index if not exists session_keys_expires_at_idx on public.session_keys(expires_at);
create index if not exists auto_save_logs_goal_id_idx on public.auto_save_logs(goal_id);
create index if not exists grow_mode_positions_goal_id_idx on public.grow_mode_positions(goal_id);
