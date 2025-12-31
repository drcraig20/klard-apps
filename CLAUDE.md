# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MANDATORY: Package-Specific Guidelines

**BEFORE any planning, implementation, refactoring, or modification work**, you MUST read the appropriate AGENTS.md file:

| Working on           | Read first                           |
|----------------------|--------------------------------------|
| klard-web (Next.js)  | `klard-web/AGENTS.md`                |
| klard-mobile (Expo)  | `klard-mobile/AGENTS.md`             |
| klard-auth (Express) | `klard-auth/CLAUDE.md`               |
| Both apps            | Read BOTH web + mobile files         |
| commons only         | Either file (for shared conventions) |

This is NON-NEGOTIABLE. These files contain coding standards, patterns, and mandatory Context7 MCP requirements for fetching library documentation.

## MANDATORY: Skill Evaluation

**BEFORE any implementation work**, you MUST evaluate ALL available skills:

1. For each skill, determine: `[skill-name] - YES/NO - [reason]`
2. If ANY skill matches → Use `Skill(skill-name)` tool for EACH relevant skill
3. Only proceed with implementation AFTER activating matching skills

This is NON-NEGOTIABLE. Skills contain proven techniques that prevent mistakes.

## MANDATORY: SOLID and DRY Principles

**ALL code must adhere to SOLID principles and DRY (Don't Repeat Yourself).**

Before any implementation, planning, or refactoring work:
1. Activate the `solid-design-principles` skill using `Skill(solid-design-principles)`
2. Follow the skill's checklist for every component/class
3. Extract repeated code into reusable components/hooks/utilities

This is NON-NEGOTIABLE. SOLID violations compound and create technical debt.

## MANDATORY: Parallel Sub-Agents

**USE parallel sub-agents via Task tool** when implementing tasks with independent subtasks:

- Launch multiple agents concurrently for independent work (use single message with multiple Task tool calls)
- Use `subagent_type` appropriate for the task (Explore, Plan, code-reviewer, etc.)
- Run code review agents after significant implementations
- Use background agents (`run_in_background: true`) for long-running tasks

**When to use parallel agents:**
- Multiple independent files need changes
- Research + implementation can happen concurrently
- Code review while continuing other work
- Exploring multiple codepaths simultaneously

## Required: Library Documentation

Always use Context7 MCP to read about any library before you start any planning or implementation:
1. Call `mcp__context7__resolve-library-id` with the library name
2. Call `mcp__context7__get-library-docs` with that ID

## Build Commands

```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm dev

# Development (individual apps)
pnpm dev:web          # Next.js at localhost:3000
pnpm dev:mobile       # Expo dev server
pnpm dev:auth         # Express auth server

# Production builds
pnpm build            # Build all packages
pnpm build:web        # Build web only
pnpm build:auth       # Build auth only

# Testing
pnpm test:auth        # Run auth tests
pnpm --filter klard-web test      # Run web tests
pnpm --filter klard-mobile test   # Run mobile tests
```

### Testing by Package

| Package | Framework | Config | Key Command |
|---------|-----------|--------|-------------|
| klard-web | Vitest | vitest.config.ts | `pnpm --filter klard-web test` |
| klard-mobile | Jest | jest.config.js | `pnpm --filter klard-mobile test` |
| klard-auth | Vitest | vitest.config.ts | `pnpm test:auth` |
| commons | Vitest | vitest.config.ts | `cd commons && pnpm test` |

**Note:** Web uses Vitest (faster, ESM-native), Mobile uses Jest (required by jest-expo).

```bash
# Code quality
pnpm lint             # ESLint across all packages

# Clean
pnpm clean            # Remove build artifacts
```

### Per-Package Commands

```bash
# Commons (must build first for other packages)
cd commons && pnpm build    # Build shared library
cd commons && pnpm dev      # Watch mode

# Mobile-specific
cd klard-mobile
pnpm android              # Android emulator
pnpm ios                  # iOS simulator
```

### Storybook Development

```bash
# Component development with Storybook
pnpm storybook:web           # Web components at localhost:6006
pnpm storybook:mobile        # Mobile components at localhost:6007
pnpm storybook:build:web     # Build web storybook
pnpm storybook:build:mobile  # Build mobile storybook
```

## Architecture Overview

This is a **pnpm monorepo** with Turborepo orchestration:

```
klard-apps/
├── klard-web/       # Next.js 16 (App Router) + Tailwind CSS 4
├── klard-mobile/    # React Native + Expo 54 + Expo Router 6
├── klard-auth/      # Express 5 auth backend + better-auth + PostgreSQL
└── commons/         # Shared types, Zod schemas, constants (@klard-apps/commons)
```

### Build Dependency Graph

```
                    ┌─────────────┐
                    │   commons   │  ← Builds FIRST (no deps)
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │ klard-web  │  │klard-mobile│  │ klard-auth │  ← Build in PARALLEL
    └────────────┘  └────────────┘  └────────────┘
```

### Turborepo Pipeline

Build orchestration via `turbo.json`:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

**Key behaviors:**
- `^build` means "build my dependencies before me"
- commons always builds first (other packages depend on it)
- Caching enabled for build artifacts
- Dev servers run persistently without caching

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ klard-web   │────▶│ klard-auth  │◀────│klard-mobile │
│ (Next.js)   │     │ (Express)   │     │ (Expo)      │
└─────────────┘     └──────┬──────┘     └─────────────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   commons   │  ← Shared types, Zod schemas
                    └─────────────┘
```

### Tech Stack

| Package | Framework | Key Dependencies |
|---------|-----------|------------------|
| klard-web | Next.js 16, React 19 | Tailwind 4, shadcn/ui, better-auth, React Compiler |
| klard-mobile | React Native 0.83, Expo 54 | Expo Router 6, SVA styling, better-auth/expo |
| klard-auth | Express 5, Node 20+ | better-auth, PostgreSQL, JWT/OIDC |
| commons | TypeScript library | Zod 4, tsup |

All packages use TypeScript 5.9.3 with **strict mode**.

### Version Matrix

Last updated: 2025-12-30

| Package | Library | Version | Docs Current |
|---------|---------|---------|--------------|
| klard-web | Next.js | 16.1.1 | Yes |
| klard-web | React | 19.2.3 | Yes |
| klard-web | Tailwind CSS | 4.1.18 | Yes |
| klard-mobile | React Native | 0.83.1 | Yes |
| klard-mobile | Expo | 54.0.30 | Yes |
| klard-mobile | Expo Router | 6.0.21 | Yes |
| klard-auth | Express | 5.2.1 | Yes |
| all | TypeScript | 5.9.3 | Yes |
| all | better-auth | 1.4.9 | Yes |
| all | Zod | 4.x | Yes |

> **Maintainers:** Update this table when upgrading dependencies.

---

## Authentication Architecture

**better-auth** is the unified auth solution across all packages, providing:

### Auth Methods (7 total)

| Method | Description | Configuration |
|--------|-------------|---------------|
| Email/Password | Traditional auth | 8-128 char passwords |
| Magic Link | Passwordless email link | 15-minute expiry |
| Email OTP | 6-digit verification code | 10-minute expiry, 3 attempts |
| OAuth | Social providers | Google, GitHub, Apple (conditional) |
| Account Linking | Auto-link OAuth to existing accounts | Trusted providers only |
| Bearer Token | Mobile API authentication | For expo client |
| JWT/JWKS | API integration | RS256, 30-day rotation |

### Session Management

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 5,  // 5 days
  updateAge: 60 * 60 * 24,      // 24-hour sliding window
  cookieCache: { maxAge: 60 * 5 } // 5-min cache
}
```

### Package Responsibilities

| Package | Auth Role | Key Files |
|---------|-----------|-----------|
| klard-auth | Auth server (better-auth instance) | `src/lib/auth.ts` |
| klard-web | React client (useSession, signIn/Out) | `src/lib/auth-client.ts` |
| klard-mobile | Expo client (bearer tokens, deep links) | `src/lib/auth-client.ts` |

---

## State Management Strategy

### By Package

| Package | Client State | Auth State | Server State |
|---------|--------------|------------|--------------|
| klard-web | Zustand stores | better-auth useSession | React Query (future) |
| klard-mobile | Zustand + AsyncStorage | better-auth/expo | React Query (future) |
| klard-auth | N/A (stateless server) | better-auth sessions | PostgreSQL |
| commons | N/A | N/A | Zod schemas only |

### Zustand Patterns

**Web stores** (`klard-web/src/stores/`):
- `auth-ui-store.ts` - Auth form state (email, loading, errors)
- `subscription-store.ts` - Subscription management

**Mobile stores** (`klard-mobile/src/stores/`):
- Same patterns with `persist` middleware + AsyncStorage

### When to Use What

| Need | Solution |
|------|----------|
| Auth state (session, user) | `useSession()` from better-auth |
| UI state (forms, modals) | Zustand store |
| Persisted client data | Zustand + AsyncStorage (mobile) |
| Shared types/validation | commons Zod schemas |
| Server data caching | React Query (when added) |

### Mobile: Expo SDK First

For klard-mobile, **always prefer Expo SDK packages over React Native core imports**:
- Use `expo-linking` instead of `react-native` Linking
- Use `expo-image` instead of `react-native` Image
- Use `expo-secure-store` instead of `react-native-async-storage`
- Use `expo-localization` instead of `react-native-localize`

Full guidance in `klard-mobile/AGENTS.md` under "MANDATORY: Expo SDK First".

### Path Aliases

All packages use `@/*` → `./src/*`:
```typescript
import { Component } from "@/components/Component"
```

### Commons Package Structure

Shared library consumed by all packages. **Must build first** before other packages.

```
commons/src/
├── types/          # TypeScript interfaces (subscription, user)
├── validation/     # Zod schemas for runtime validation
├── constants/      # Plans, billing cycles, app constants
└── index.ts        # Re-exports all public API
```

**Key Exports:**
```typescript
// Types
import { User, Subscription, Plan } from "@klard-apps/commons";

// Validation schemas
import { UserSchema, SubscriptionSchema, LoginSchema } from "@klard-apps/commons";

// Constants
import { PLANS, BILLING_CYCLES, APP_CONFIG } from "@klard-apps/commons";
```

**Build Requirement:**
```bash
# Must run before other packages can build
cd commons && pnpm build

# Or use Turborepo (handles automatically)
pnpm build  # commons builds first via pipeline
```

## Klard Design System

Light-first design with dark theme support. Key colors:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `#0D7C7A` | `#15B5B0` | CTAs, interactive |
| Secondary | `#15B5B0` | `#0D7C7A` | Accents |
| Background | `#FFFFFF` | `#0F172A` | Base |
| Foreground | `#0F172A` | `#F8FAFC` | Text |
| Success | `#059669` | `#10B981` | Savings |
| Warning | `#D97706` | `#F59E0B` | Alerts |
| Error | `#DC2626` | `#EF4444` | Blocked states |

Design features: glassmorphism effects, soft shadows, Inter/SF Pro typography.

Full specs in `docs/design/Klard Design System.md`.

## Git Commit Preferences

- **Never add co-author attribution** - Do not include `Co-Authored-By: Claude` or "🤖 Generated with [Claude Code](https://claude.com/claude-code)" or similar lines in commit messages

## External Services

- Core API: subscriptions CRUD (separate repository)
- Card Service: BurnerCard issuing (Airwallex/Lithic/Stripe)
- Analytics: PostHog
- Monitoring: Sentry, BetterStack

Note: Auth backend (`klard-auth`) is now part of this monorepo.

## Formatting Balance

- Use **paragraphs** for narrative, context, and flow
- Use **bullet lists** for discrete items, options, or short points
- Use **tables** ONLY for structured comparisons, data grids, or when column relationships matter
- Avoid table overuse — if content reads naturally as prose, keep it as prose
- Perfect balance: tables should be ~20-30% of structured content, not dominant
