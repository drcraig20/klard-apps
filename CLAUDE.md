# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MANDATORY: Package-Specific Guidelines

**BEFORE any planning, implementation, refactoring, or modification work**, you MUST read the appropriate AGENTS.md file:

| Working on           | Read first                           |
|----------------------|--------------------------------------|
| klard-web (Next.js)  | `klard-web/AGENTS.md`                |
| klard-mobile (Expo)  | `klard-mobile/AGENTS.md`             |
| Both apps            | Read BOTH files                      |
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

# Production builds
pnpm build            # Build all packages
pnpm build:web        # Build web only

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

## Architecture

This is a **pnpm monorepo** with Turborepo orchestration:

```
klard-apps/
├── klard-web/       # Next.js 16 (App Router) + Tailwind CSS 4
├── klard-mobile/    # React Native + Expo 54 + Expo Router 6
└── commons/         # Shared types, Zod schemas, constants (@klard-apps/commons)
```

### Build Dependencies

`commons` → builds first (no deps)
`klard-web` + `klard-mobile` → build in parallel (depend on commons via `workspace:*`)

### Tech Stack

| Package | Framework | Key Dependencies |
|---------|-----------|------------------|
| klard-web | Next.js 16, React 19 | Tailwind 4, better-auth, React Compiler |
| klard-mobile | React Native 0.81, Expo 54 | Expo Router 6, better-auth/expo, expo-secure-store |
| commons | TypeScript library | Zod 4, tsup |

All packages use TypeScript 5.9.3 with **strict mode**.

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

```
commons/src/
├── types/          # TypeScript interfaces (subscription, user)
├── validation/     # Zod schemas
├── constants/      # Plans, app constants
└── index.ts        # Re-exports all
```

Import shared code:
```typescript
import { UserSchema, SubscriptionType, PLANS } from "@klard-apps/commons"
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

Backend services are in separate repositories:
- **Auth: klard-auth (IMPLEMENTED)** - Uses better-auth library, handles JWT/OIDC authentication
- Core API: subscriptions CRUD
- Card Service: BurnerCard issuing (Airwallex/Lithic/Stripe)
- Analytics: PostHog
- Monitoring: Sentry, BetterStack