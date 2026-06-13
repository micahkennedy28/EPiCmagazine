# E.P.i.C. Youth Ministry Magazine

A digital home for the E.P.i.C. (Everything Possible in Christ) Youth Ministry magazine — housing all editions, team info, events, impact opportunities, and contact/prayer requests.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/epic-magazine run dev` — run the frontend (port 24895)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Framer Motion, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle table definitions (magazines, team, stories, events, opportunities, contact)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/epic-magazine/src/` — React frontend (pages, components, styles)
- `artifacts/epic-magazine/src/index.css` — Theme tokens (E.P.i.C. brand colors, fonts)

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → typed React Query hooks + Zod schemas
- Single shared backend (`artifacts/api-server`) serves the frontend via `/api` path prefix
- Google Fonts (Anton, Bebas Neue, Poppins) loaded via `<link>` in `index.html` (not `@import` in CSS, to avoid PostCSS ordering warnings)
- Stats endpoint returns hardcoded impact numbers (youthReached, volunteerHours, communitiesServed) since those are curated metrics, not DB counts

## Product

Six pages: Home (hero + latest issue + stories + events + impact stats), About (mission + history + E.P.i.C. acronym breakdown), Meet the Team (interactive flip cards by department), Magazine Archive (all issues with read/download CTAs), E.P.i.C. Impact (tabbed opportunities: volunteer, jobs, scholarships, internships, resources), Contact (prayer requests + general contact form).

## Brand

- Midnight Black `#0A0A0A`, E.P.i.C. Gold `#D4AF37`, Pure White `#FFFFFF`
- Ember Orange `#F97316`, Sky Blue `#3B82F6`
- Fonts: Anton (headings), Bebas Neue (subheadings), Poppins (body)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Google Fonts must be loaded as `<link>` tags in `index.html`, not `@import url()` in CSS (PostCSS ordering restriction with Tailwind v4)
- After any OpenAPI spec change, run codegen before touching route handlers or frontend hooks
- `pnpm --filter @workspace/db run push` must be run after any schema changes in `lib/db/src/schema/`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
