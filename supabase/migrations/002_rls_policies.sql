-- ─── Enable RLS on all tables ─────────────────────────────────────────────────
alter table public.users enable row level security;
alter table public.goals enable row level security;
alter table public.transactions enable row level security;
alter table public.recommendations enable row level security;
alter table public.recommendation_actions enable row level security;
alter table public.passport_snapshots enable row level security;
alter table public.session_keys enable row level security;
alter table public.auto_save_logs enable row level security;
alter table public.grow_mode_positions enable row level security;
alter table public.price_cache enable row level security;

-- ─── Helper: extract wallet_address from app JWT claim ────────────────────────
-- The NestJS backend signs JWTs with { sub: walletAddress, userId }.
-- Supabase RLS uses auth.jwt() to access custom claims.
create or replace function public.current_wallet_address()
returns text language sql stable as $$
  select coalesce(
    auth.jwt() ->> 'sub',
    current_setting('request.jwt.claims', true)::json ->> 'sub'
  )
$$;

create or replace function public.current_user_id()
returns uuid language sql stable as $$
  select (coalesce(
    auth.jwt() ->> 'userId',
    current_setting('request.jwt.claims', true)::json ->> 'userId'
  ))::uuid
$$;

-- ─── users ────────────────────────────────────────────────────────────────────
create policy "users: read own row"
  on public.users for select
  using (wallet_address = public.current_wallet_address());

create policy "users: upsert own row"
  on public.users for insert
  with check (wallet_address = public.current_wallet_address());

create policy "users: update own row"
  on public.users for update
  using (wallet_address = public.current_wallet_address());

-- ─── goals ────────────────────────────────────────────────────────────────────
create policy "goals: read own"
  on public.goals for select
  using (user_id = public.current_user_id());

create policy "goals: insert own"
  on public.goals for insert
  with check (user_id = public.current_user_id());

create policy "goals: update own"
  on public.goals for update
  using (user_id = public.current_user_id());

-- ─── transactions ─────────────────────────────────────────────────────────────
create policy "transactions: read own via goal"
  on public.transactions for select
  using (
    exists (
      select 1 from public.goals
      where goals.id = transactions.goal_id
        and goals.user_id = public.current_user_id()
    )
  );

create policy "transactions: insert own via goal"
  on public.transactions for insert
  with check (
    exists (
      select 1 from public.goals
      where goals.id = goal_id
        and goals.user_id = public.current_user_id()
    )
  );

-- ─── recommendations ──────────────────────────────────────────────────────────
create policy "recommendations: read own"
  on public.recommendations for select
  using (user_id = public.current_user_id());

create policy "recommendations: insert own"
  on public.recommendations for insert
  with check (user_id = public.current_user_id());

create policy "recommendations: update own"
  on public.recommendations for update
  using (user_id = public.current_user_id());

-- ─── recommendation_actions ───────────────────────────────────────────────────
create policy "recommendation_actions: read own"
  on public.recommendation_actions for select
  using (user_id = public.current_user_id());

create policy "recommendation_actions: insert own"
  on public.recommendation_actions for insert
  with check (user_id = public.current_user_id());

-- ─── passport_snapshots ───────────────────────────────────────────────────────
create policy "passport_snapshots: read own"
  on public.passport_snapshots for select
  using (user_id = public.current_user_id());

create policy "passport_snapshots: insert own"
  on public.passport_snapshots for insert
  with check (user_id = public.current_user_id());

-- ─── session_keys ─────────────────────────────────────────────────────────────
create policy "session_keys: read own"
  on public.session_keys for select
  using (user_id = public.current_user_id());

create policy "session_keys: insert own"
  on public.session_keys for insert
  with check (user_id = public.current_user_id());

create policy "session_keys: delete own"
  on public.session_keys for delete
  using (user_id = public.current_user_id());

-- ─── auto_save_logs ───────────────────────────────────────────────────────────
create policy "auto_save_logs: read own via goal"
  on public.auto_save_logs for select
  using (
    exists (
      select 1 from public.goals
      where goals.id = auto_save_logs.goal_id
        and goals.user_id = public.current_user_id()
    )
  );

-- ─── grow_mode_positions ──────────────────────────────────────────────────────
create policy "grow_mode_positions: read own via goal"
  on public.grow_mode_positions for select
  using (
    exists (
      select 1 from public.goals
      where goals.id = grow_mode_positions.goal_id
        and goals.user_id = public.current_user_id()
    )
  );

-- ─── price_cache ──────────────────────────────────────────────────────────────
-- Price data is public — all authenticated users may read it.
create policy "price_cache: read all authenticated"
  on public.price_cache for select
  using (auth.role() = 'authenticated');

-- Service role (backend) may upsert prices.
create policy "price_cache: service role upsert"
  on public.price_cache for all
  using (auth.role() = 'service_role');

-- ─── indexer_state is service-role only (no user access needed) ───────────────
-- No user-facing RLS policies needed; backend uses service role key.
