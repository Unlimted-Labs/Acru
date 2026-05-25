# Acru

**Personal savings and onchain investing, built on Sui.**

Acru lets you create savings goals, automate deposits in USDC or SUI, and optionally grow your balance through guided onchain yield opportunities — all with cryptographic privacy and a permanent onchain financial history. It is designed to feel like a premium banking app, not a DeFi dashboard: clean, calm, and built for people who want to trust you with their money.

---

## Architecture

```
acru/
├── apps/
│   ├── web/          # Next.js 16 frontend (App Router, Tailwind, Framer Motion)
│   └── api/          # NestJS backend (REST API, WebSocket, background jobs)
├── packages/
│   └── shared/       # TypeScript types, Zod schemas, utilities
├── contracts/        # Sui Move smart contracts
└── supabase/
    └── migrations/   # PostgreSQL schema + RLS policies
```

### Sui Ecosystem Integrations

| Integration | How it's used |
|---|---|
| **Seal** | Encrypts goal metadata and passport summaries — only the user's wallet can decrypt |
| **Walrus** | Stores encrypted goal metadata and AI passport snapshots permanently, off-chain |
| **MemWal** | Gives the AI recommendation agent persistent encrypted memory across sessions |
| **zkLogin** | Google OAuth → Sui address derivation, no seed phrase required |
| **DeepBook v3** | Atomic cross-currency deposits (SUI → USDC) in a single PTB |
| **Aftermath Finance** | aSUI liquid staking in Grow Mode via chained PTB |
| **Navi Protocol** | USDC yield supply in Grow Mode |
| **Pyth Network** | Real-time SUI/USD price and volatility for AI recommendation context |
| **Sui PTB composition** | `allocate_to_grow` + protocol stake/supply in one atomic transaction |

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | >= 20 |
| pnpm | >= 9 |
| Sui CLI | >= 1.39 (for contract builds) |

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Unlimted-Labs/Acru.git
cd Acru
pnpm install
```

### 2. Set up environment variables

Copy the example and fill in your values:

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
```

Open `apps/api/.env` and fill in:

```bash
# Required to start
SUI_RPC_URL=https://fullnode.testnet.sui.io:443
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
JWT_SECRET=<any-random-string-32-chars+>
SESSION_KEY_ENCRYPTION_SECRET=<any-random-string-32-chars+>
ANTHROPIC_API_KEY=<your-anthropic-key>
WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
PYTH_HERMES_BASE_URL=https://hermes.pyth.network
PYTH_SUI_USD_FEED_ID=0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744
PYTH_USDC_USD_FEED_ID=0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a
```

Open `apps/web/.env.local` and fill in:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_ACRU_PACKAGE_ID=0x0000...  # fill after contract publish
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
```

### 3. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then apply the migrations:

```bash
# Install Supabase CLI if needed
npm install -g supabase

supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

Or paste the SQL from `supabase/migrations/` directly into the Supabase SQL editor.

---

## Running the App

### Option A — Run everything at once (recommended)

```bash
pnpm dev
```

This starts all packages in parallel via Turborepo. Frontend at `http://localhost:3000`, backend at `http://localhost:3001`.

### Option B — Run each layer individually

**Shared package** (build once before starting other services):

```bash
pnpm --filter @acru/shared build
```

**Backend (NestJS API + AI layer):**

```bash
pnpm --filter api start:dev
```

The API starts at `http://localhost:3001`. Swagger docs are available at `http://localhost:3001/docs`.

The backend includes:
- **REST API** — goals, auth, grow mode, prices, passport endpoints
- **AI layer** — a background job runs every 4 hours per active user, fetches Pyth price data, queries MemWal for user history, and calls the Claude API to generate savings recommendations
- **Event indexer** — polls Sui RPC for on-chain events every 30 seconds and syncs state to Supabase
- **Auto-save scheduler** — daily cron job that executes due auto-save transactions via session keys

**Frontend (Next.js):**

```bash
pnpm --filter web dev
```

The frontend starts at `http://localhost:3000`.

---

## Smart Contracts

The Move contracts live in `contracts/`. They are **not deployed yet** — the stubs compile and the structure is in place.

To build and verify the contracts compile:

```bash
# Requires Sui CLI installed
cd contracts
sui move build
```

To run the Move test suite:

```bash
cd contracts
sui move test
```

---

## Project Structure — Key Files

```
apps/api/src/
  modules/
    auth/           # zkLogin verification, app JWT issuance
    goals/          # Goal CRUD, deposit/withdraw PTB construction
    auto-save/      # Daily cron — executes auto-save transactions
    grow-mode/      # Aftermath / Navi / DeepBook yield allocation
    ai/             # Claude API recommendations + MemWal memory
    passport/       # Savings Passport — Walrus snapshots, AI narratives
    prices/         # Pyth Network price feed with 30s cache
    event-indexer/  # Sui event polling → Supabase sync
  shared/
    sui/            # SuiJsonRpcClient wrapper
    supabase/       # SupabaseClient wrapper
    walrus/         # Walrus blob store/retrieve
    memwal/         # MemWal AI memory layer

apps/web/
  app/
    (auth)/onboarding/   # zkLogin + wallet connect
    (app)/dashboard/     # Portfolio overview + AI recommendations
    (app)/goals/         # Goal list, create wizard, detail page
    (app)/grow/          # Grow mode protocol selection
    (app)/recommendations/ # Full AI recommendations view
    (app)/passport/      # Savings Passport + AI narrative
  hooks/               # useGoals, usePrices, usePassport, useSealDecrypt, etc.
  components/
    features/           # Goal cards, recommendation cards, passport view
    ui/                 # Button, Card, Badge, ProgressRing, Spinner

packages/shared/src/
  types/               # SavingsGoal, AIRecommendation, PassportSummary, etc.
  schemas/             # Zod validation schemas
  utils/               # Currency formatting, error codes
```

---

## Contributing

1. Fork the repo and create a branch from `main`
2. Install deps with `pnpm install`
3. Run `pnpm --filter @acru/shared build` before starting other services
4. Make your changes — keep each PR focused on one thing
5. Ensure `pnpm --filter api build` and `pnpm --filter web type-check` pass before opening a PR
6. Open a pull request with a clear description of what changed and why

### Code style

- TypeScript strict mode everywhere
- NestJS services contain business logic; controllers are thin routing only
- React hooks for all server state (`@tanstack/react-query`); Zustand for UI-only state
- No comments unless the *why* is non-obvious

---

## Roadmap

- [ ] Smart contract logic implementation
- [ ] zkLogin authentication flow
- [ ] Goal create / deposit / withdraw transactions
- [ ] DeepBook swap integration for cross-currency deposits
- [ ] Aftermath and Navi grow mode execution
- [ ] AI recommendation generation (Claude API + MemWal context)
- [ ] Savings Passport AI narrative (Walrus + Seal)
- [ ] End-to-end Playwright test suite
- [ ] Testnet deployment

---

## License

MIT
