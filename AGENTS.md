# Repository Guidelines

Comprehensive contributor handbook for the Klard apps monorepo. Use pnpm 10.x + Turborepo (root-managed) on Node 20+. Avoid npm/yarn. Make changes small, testable, and consistent with design, accessibility, and architectural standards.

---

## Mandatory Preflight
1) Read `CLAUDE.md` fully before any planning or coding. It defines: skill evaluation, Context7 MCP documentation retrieval, SOLID/DRY enforcement, and parallel sub-agent expectations.
2) Read package guides:
   - Web: `klard-web/AGENTS.md`
   - Mobile: `klard-mobile/AGENTS.md`
   - Shared: `commons/` follows the same conventions; use web/mobile guides for context.
3) Documentation (required before work): use Context7 MCP to fetch current docs for each library you will touch (`mcp__context7__resolve-library-id` → `mcp__context7__get-library-docs`; e.g., Next.js, React, Tailwind, shadcn/ui, Expo, Zustand, Zod).
4) Skills: list available skills, mark YES/NO, activate any that apply (TDD, debugging, solid-design-principles, writing-plans, etc.). Follow their checklists explicitly.
5) Permissions: if a command is blocked, rerun with elevated permission—do not stop on “Operation not permitted.”

---

## Project Map
- Packages: `klard-web/` (Next.js 16 App Router, shadcn/ui), `klard-mobile/` (Expo/React Native, Expo Router 6), `commons/` (shared types/Zod constants). Build order: `commons` → `klard-web` + `klard-mobile`.
- `klard-web/src/`: routes in `app/`, UI in `components/`, utilities in `lib/`, hooks in `hooks/`, assets in `public/`.
- `klard-mobile/src/`: Expo Router in `app/`, shared UI in `components/`, hooks/lib with features; assets in `assets/`.
- `commons/src/`: types, validation, constants; outputs in `dist/` (generated—never edit).
- Path alias `@/` → `src/` in each package. Directories lowercase-kebab; component files may be PascalCase when exporting a component.

---

## Environment & Setup
- Node 20+, pnpm 10.x. Install from root only: `pnpm install`. Do not hand-edit `pnpm-lock.yaml`.
- Env files: copy `.env.example` → `.env.local` (web) and `.env` (mobile). Never commit `.env*`, keys, keystores, or certificates.
- Editor: enable TypeScript strictness, ESLint, and format-on-save where configured. Restart TS server after path/alias changes.
- Turbo cache: use `pnpm clean` if artifacts get stale; prefer targeted rebuilds over nuking `node_modules`.

---

## Build, Test, and Development Commands
- Development: `pnpm dev` (all apps), or scoped `pnpm dev:web`, `pnpm dev:mobile`.
- Lint: `pnpm lint`; scoped `pnpm --filter klard-web lint`, `pnpm --filter klard-mobile lint`.
- Tests: `pnpm --filter klard-web test:run` (Vitest + jsdom), `pnpm --filter klard-mobile test` (jest-expo), `pnpm --filter commons test` (Vitest).
- Type/build: `pnpm build` (turbo all), `pnpm build:web`, `pnpm --filter klard-mobile typecheck`, `pnpm --filter commons build` (tsup).
- Cleaning: `pnpm clean` to reset Turbo cache/artifacts.
- Notes: run commands from repo root unless a package script explicitly requires cwd; prefer `--filter` for scoped tasks.

---

## Coding Standards
- TypeScript: strict; avoid `any`; prefer interfaces + literal unions (no enums). Functional components only; named exports over default. Keep files cohesive; avoid god modules.
- Imports: prefer absolute `@/` paths; group imports logically (vendor → workspace → local).
- State: derive state where possible; minimize `useEffect` and redundant `useState`. Use Zustand for shared app state per package norms.
- Data validation: define/consume Zod schemas in `commons`; infer types from schemas to prevent drift.
- Errors: guard early; return user-friendly messages; log actionable context without secrets. Keep control flow shallow (early returns).
- Internationalization: route all user-facing strings through i18n (web: i18next/react-i18next; mobile: expo-localization). Avoid hard-coded text and ensure RTL compatibility where relevant.
- Performance: lazy-load non-critical routes/sections; memoize expensive work; avoid blocking the main thread. Use dynamic imports on web and efficient lists (FlatList/SectionList) on mobile.

---

## UI & Accessibility
- Web:
  - Use shadcn/ui primitives; extend variants instead of ad-hoc styling. Use `cn` helper for class merging.
  - Follow design tokens in `docs/design/` (teal/navy palette, glassmorphism, soft shadows). Light-first with dark theme support.
  - Semantic HTML, accessible ARIA labels/roles, visible focus states, keyboard navigation, and correct headings hierarchy.
- Mobile:
  - Prefer Expo SDK components over raw React Native when equivalents exist; honor safe areas.
  - Support dynamic type and responsive layouts; avoid fixed heights except when necessary.
  - Provide `accessibilityLabel`/traits; ensure touch targets meet platform guidelines; consider screen reader flows.

---

## Testing Guidance
- Placement: co-locate tests (`src/__tests__` or `*.test.tsx`). Cover new logic, edge cases, and regressions.
- Web: Vitest + Testing Library; avoid over-mocking React Query/Zustand; use `src/__tests__/setup.ts` for shared config.
- Mobile: React Native Testing Library with jest-expo; coverage collected from `src/**/*.{ts,tsx}`.
- Commons: Vitest for schemas/constants; keep `pnpm --filter commons build` green.
- Style: prefer behavioral tests over brittle snapshots; if snapshots are needed, keep them small. Avoid network calls; mock external services.

---

## Permissions & References
- If any command is blocked, rerun with elevated permission; do not fail on “Operation not permitted.”
- Always consult `CLAUDE.md` and package AGENTS before planning or implementing changes.
- Use Context7 MCP to pull current docs for any library touched; do this before writing code or plans.
- Apply SOLID and DRY: single-responsibility components, dependency inversion for side effects, and shared utilities instead of duplication.

---

## Security & Configuration
- Secrets: never commit `.env*`, service keys, keystores, or certificates. Use env vars loaded via `.env.local` (web) or `.env` (mobile).
- Generated artifacts: do not edit `dist/`, `.expo/`, `.next/`, or lockfiles manually. Use pnpm for dependency changes.
- Validation: enforce Zod at data boundaries; sanitize and escape user-provided content before rendering.
- Logging: avoid PII; prefer structured and actionable logs.
- Dependencies: add via pnpm; prefer `workspace:*` for shared packages.

---

## Git, Commits, and Pull Requests
- Commits: Conventional Commits with package scopes (`feat(web): ...`, `fix(mobile): ...`, `chore(commons): ...`, `docs: ...`). No tool co-author lines.
- Branch hygiene: keep diffs focused; avoid mixing refactors with features unless required for safety.
- Pre-push: run relevant lint/tests/build; record results in the PR description.
- PR content: summary, linked issue/task, screenshots/recordings for UI changes, environment/setup notes, risks, and follow-ups. Exclude build artifacts and env files.
- Reviews: call out behavioral changes, migrations, and manual steps. Provide test evidence and reproduction steps for fixes.

---

## Performance, Monitoring, and Observability
- Web: use Next.js optimizations (image component, dynamic imports, caching where appropriate). Avoid heavy work on the main thread; prefer server-side or background where feasible.
- Mobile: prefer async APIs; use FlatList/SectionList for lists; profile with Expo/React DevTools when lag appears.
- Error reporting: wire Sentry/BetterStack per package norms; include context without leaking secrets.

---

## Internationalization & Localization
- Web: all user-facing strings through i18next/react-i18next; language detection per existing setup; validate date/number/currency formatting.
- Mobile: use expo-localization; avoid hard-coded text; support RTL where applicable; verify text scaling and accessibility sizes.

---

## Architecture & Data Flow
- Keep data boundaries clear: API clients in `lib/` (web) or feature modules (mobile). Share types via `@klard-apps/commons`.
- UI stays pure; side effects live in hooks/services. Inject dependencies for configurable clients.
- When adding APIs: define Zod schemas in `commons` for request/response, export inferred types, validate at edges.

---

## Troubleshooting Quick Wins
- Turbo cache oddities: `pnpm clean`, then rerun scoped build/test.
- TS path issues: confirm `@/` alias in package `tsconfig.json`; restart TS server.
- Styling drifts (web): check `docs/design` tokens; update shared components before local overrides.
- Metro issues (mobile): `expo start -c` to clear caches; ensure `jest-expo` matches Expo SDK.

---

## Release & Deployment Notes
- Web: follow CI/CD workflows (see `.github/workflows`); ensure `pnpm build:web` passes locally before tagging.
- Mobile: follow Expo EAS flows (see `klard-mobile` configs); never commit signing artifacts; document required env vars.
- Commons: workspace versioning; keep changes backward compatible where possible; document breaking changes clearly.

---

## Final “Done” Checklist
- Required skills evaluated/activated; Context7 docs fetched for touched libraries.
- Env templates copied; no secrets or artifacts added to git.
- Lint, tests, and relevant builds executed; results captured for PR.
- Documentation updated when behavior, APIs, or configs change.
- Permissions handled (rerun with elevated permission when blocked).
- PR prepared with summary, evidence (screenshots/recordings), commands run, risks, and follow-ups.
