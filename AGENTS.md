# Repository Guidelines

## Project Structure & Module Organization
This Next.js + Payload workspace keeps runtime code inside `src`: routes live in `src/app` (route groups like `(frontend)` and `(payload)`), while CMS schemas sit in `src/collections` and are registered through `src/payload.config.ts`. Generated types (`src/payload-types.ts`) should only change via `pnpm generate:types`. Tests reside in `tests/int` (Vitest) and `tests/e2e` (Playwright). Root-level configs (`eslint.config.mjs`, `vitest.config.mts`, `playwright.config.ts`, `docker-compose.yml`, `test.env`) govern tooling, and static assets belong in `public/`.

## Build, Test, and Development Commands
- `pnpm dev` runs Payload + Next with hot reload; use for daily work.
- `pnpm build` compiles the production bundle; run before releases.
- `pnpm start` serves the last build and mirrors production.
- `pnpm lint` applies `eslint-config-next`; add `--fix` for autofixable issues.
- `pnpm test` runs integration then e2e suites (`pnpm test:int` / `pnpm test:e2e` target each suite).
- `pnpm generate:types` and `pnpm generate:importmap` refresh Payload artifacts whenever schemas or plugins change.

## Coding Style & Naming Conventions
Author modern TypeScript/ES modules with 2-space indentation and ESLint-managed import order. Keep collection files PascalCase (`Users.ts`), route folders dash-case, and tests/components suffixed with `.spec.ts` / `.tsx`. Prettier 3 is available via `pnpm exec prettier --write src tests` when formatting drifts. Favor small, colocated modules and use barrel files for shared exports.

## Testing Guidelines
Vitest (`vitest.config.mts`, `vitest.setup.ts`) owns integration coverage; keep specs in `tests/int` using `<feature>.int.spec.ts` and load secrets from `test.env`. Playwright drives UI flows via `tests/e2e/*.e2e.spec.ts`; extend `playwright.config.ts` when adding projects or contexts. Focus assertions on Payload behavior (auth, uploads, Mongo) and capture traces/screenshots when diagnosing failures.

## Commit & Pull Request Guidelines
Follow the Conventional Commits pattern seen in history (`feat: initial commit`), keeping imperative summaries under 72 characters. Each PR should link its issue, describe schema/app changes, flag new env vars or seeds, and attach screenshots for visible UI updates. Run `pnpm lint && pnpm test && pnpm build` before review; if a check cannot pass locally, document why in the PR body.

## Security & Configuration Tips
Never commit `.env` or secrets; rely on `.env.example` for defaults and keep `test.env` scoped to automated runs. When database or storage settings change, update both `payload.config.ts` and `docker-compose.yml` so local, CI, and cloud stay aligned. List any new native dependencies under `pnpm.onlyBuiltDependencies` to preserve reproducible installs.
