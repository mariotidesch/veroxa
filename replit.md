# Progetto: EnergiApp + Vexora

Monorepo con due siti indipendenti: **EnergiApp** (enciclopedia interattiva delle energie per la scuola, in italiano, su `/`) e **Vexora** (sito vetrina per un'attività che crea e modifica siti web per negozi, ristoranti e attività locali, in italiano, su `/vexora/`).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/energia-enciclopedia/` — EnergiApp (React+Vite, su `/`): pagine in `src/pages/` (Panorama, Calcolatrice, Informazioni), dati energie in `src/data/energie.ts`
- `artifacts/vexora/` — sito Vexora (React+Vite, su `/vexora/`), frontend-only, 3 pagine: Home, Recensioni, Contatti
- `artifacts/api-server/` — Express condiviso (attualmente solo healthcheck)
- `attached_assets/energy_crops/` — immagini panorama EnergiApp

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- **EnergiApp** (`/`): enciclopedia interattiva delle 9 forme di energia con panorama cliccabile, calcolatrice di consumi (dispositivi + periodo + ripetizioni, convertitore fonti) e pagina informazioni (Istituto San Leone Magno, classe 3A, autore Mario Tedeschi). Tutto in italiano.
- **Vexora** (`/vexora/`): sito vetrina in italiano — home con schermata di benvenuto e sezioni "Cosa fa / Come è nata / Come funziona", pagina Recensioni (slot vuoti per recensioni future) raggiungibile da menu in alto a sinistra, pagina Contatti con CTA. 3 versioni del logo distribuite nel sito. Mai menzionare "AI". Palette chiara (bianco, azzurro, verde chiaro, celeste).

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
