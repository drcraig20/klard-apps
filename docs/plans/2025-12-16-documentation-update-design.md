# Documentation Update Design

**Date:** 2025-12-16
**Goal:** Update all CLAUDE.md and AGENTS.md files for accuracy and new developer onboarding

## Design Decisions

| Decision | Choice |
|----------|--------|
| Mobile styling | Custom SVA (actual code) |
| Navigation | Expo Router (actual code) |
| Code examples | Pattern references (point to files) |
| Root CLAUDE.md | More detail - instructional + architectural |

## 1. Root CLAUDE.md Structure (~350 lines)

```
CLAUDE.md (Root)
├── 1. MANDATORY: Package-Specific Guidelines (keep)
├── 2. MANDATORY: Skill Evaluation (keep)
├── 3. MANDATORY: SOLID/DRY Principles (keep)
├── 4. MANDATORY: Parallel Sub-Agents (keep)
├── 5. MANDATORY: Context7 Library Docs (keep)
│
├── 6. Architecture Overview (EXPAND)
│   ├── Monorepo structure diagram
│   ├── Build dependency graph (commons → others)
│   ├── Data flow between packages
│   └── Shared patterns across packages
│
├── 7. Authentication Architecture (NEW)
│   ├── better-auth as core (web, mobile, auth)
│   ├── Session flow diagram
│   ├── Auth methods available
│   └── Package responsibilities
│
├── 8. State Management Strategy (NEW)
│   ├── Zustand for client state
│   ├── better-auth for auth state
│   ├── Commons for shared types/validation
│   └── When to use which
│
├── 9. Build Commands (keep)
├── 10. Design System (enhance with component patterns)
├── 11. External Services (keep)
└── 12. Git Preferences (keep)
```

## 2. klard-web AGENTS.md Structure (~200 lines)

```
klard-web/AGENTS.md
├── 1. MANDATORY: Context7 MCP (keep)
│
├── 2. Tech Stack (UPDATE)
│   ├── Next.js 16 with App Router
│   ├── React 19 with React Compiler
│   ├── Tailwind CSS 4
│   ├── shadcn/ui + Klard custom components
│   └── better-auth client
│
├── 3. App Router Patterns (NEW)
│   ├── Route groups: (auth)/, (dashboard)/
│   ├── Layout composition pattern
│   ├── Server vs Client Components guidance
│   └── Ref: app/layout.tsx, app/(auth)/layout.tsx
│
├── 4. Authentication (NEW)
│   ├── better-auth client setup
│   ├── useSession hook usage
│   ├── Magic link flow
│   └── Ref: lib/auth-client.ts, hooks/useAuthRedirect.ts
│
├── 5. Component Patterns (NEW)
│   ├── File organization: component.tsx, .styles.ts, .constants.ts
│   ├── 98 UI components in components/ui/
│   ├── shadcn/ui base + Klard customizations
│   └── Ref: components/ui/button/, components/ui/klard-card/
│
├── 6. Form Handling (NEW)
│   ├── react-hook-form + Zod validation
│   ├── Field components: InputField, SelectField, CheckboxField
│   └── Ref: components/ui/input-field.tsx
│
├── 7. State Management (enhance)
│   ├── Zustand stores pattern
│   └── Ref: stores/auth-ui-store.ts
│
├── 8. Custom Hooks (NEW)
│   ├── Naming: use[Feature]
│   └── Ref: hooks/ directory (6 hooks)
│
├── 9. Testing (UPDATE)
│   ├── Vitest + React Testing Library
│   └── Ref: __tests__/ directory
│
└── 10. Code Style (keep)
```

## 3. klard-mobile AGENTS.md Structure (~220 lines)

**Critical fixes:**
- Remove: Tailwind/styled-components recommendations
- Remove: react-navigation as primary
- Add: Custom SVA system documentation
- Add: Expo Router patterns
- Add: Haptic feedback (core UX pattern)

```
klard-mobile/AGENTS.md
├── 1. MANDATORY: Context7 MCP (keep)
├── 2. MANDATORY: Expo SDK First (keep)
│
├── 3. Tech Stack (UPDATE - fix mismatches)
│   ├── React Native 0.81 + Expo 54
│   ├── Expo Router 6 (NOT react-navigation)
│   ├── Custom SVA styling (NOT Tailwind/styled-components)
│   ├── better-auth/expo client
│   └── i18n-js + expo-localization
│
├── 4. Expo Router Patterns (NEW)
│   ├── File-based routing in app/
│   ├── Route groups: (auth)/, (tabs)/
│   ├── Stack vs Tabs navigation
│   ├── Dynamic routes: [id].tsx
│   └── Ref: app/_layout.tsx, app/(tabs)/_layout.tsx
│
├── 5. SVA Styling System (NEW)
│   ├── Style Variance Authority pattern
│   ├── Pre-compiled light/dark themes
│   ├── Variant + size combinations
│   ├── Usage: sva(isDark, { variant, size })
│   └── Ref: styles/sva.ts, styles/colors.ts
│
├── 6. Theme System (NEW)
│   ├── useThemeColors hook
│   ├── 120+ color tokens per theme
│   ├── useColorScheme() for detection
│   └── Ref: hooks/useThemeColors.ts, styles/colors.ts
│
├── 7. Component Patterns (NEW)
│   ├── 35+ UI components in components/ui/
│   ├── File structure: Component/, .styles.ts, index.ts
│   ├── Haptic feedback integration
│   ├── Accessibility props pattern
│   └── Ref: components/ui/Button/
│
├── 8. Haptic Feedback (NEW)
│   ├── useHaptics hook (9 feedback types)
│   └── Ref: hooks/useHaptics.ts
│
├── 9. Authentication (NEW)
│   ├── better-auth/expo client
│   ├── Platform-specific URLs
│   └── Ref: lib/auth-client.ts
│
├── 10. State Management (enhance)
│   ├── Zustand with AsyncStorage persistence
│   └── Ref: stores/subscriptionStore.ts
│
├── 11. Custom Hooks (add refs)
│   └── Ref: hooks/ (5 hooks with SOLID comments)
│
├── 12. Testing (UPDATE)
│   ├── Jest + React Native Testing Library
│   └── Ref: __tests__/, jest.setup.ts
│
└── 13. Code Style (keep relevant parts)
```

## 4. klard-auth CLAUDE.md Structure (~150 lines)

**Key additions:**
- Document all 7 auth methods
- Add session and rate limiting configs
- Reference the comprehensive test suite
- Add environment variable guidance

```
klard-auth/CLAUDE.md
├── 1. Commands (keep)
│
├── 2. Architecture (enhance)
│   ├── Express 5 + better-auth + PostgreSQL
│   ├── Middleware stack order (critical!)
│   └── Ref: src/app.ts
│
├── 3. Authentication Features (NEW)
│   ├── Email/Password
│   ├── Magic Link (15-min expiry)
│   ├── Email OTP (6-digit, 10-min)
│   ├── Social OAuth (Google, GitHub, Apple)
│   ├── Account linking
│   ├── Bearer token auth
│   ├── JWT/JWKS (RS256)
│   └── Ref: lib/auth.ts
│
├── 4. Session Management (NEW)
│   ├── 5-day expiration
│   ├── 24-hour sliding window
│   └── Ref: lib/auth.ts
│
├── 5. Rate Limiting (NEW)
│   ├── Per-endpoint rules
│   └── Ref: lib/auth.ts
│
├── 6. Exception System (keep)
│
├── 7. Configuration (NEW)
│   ├── Environment variables
│   ├── OAuth toggling
│   └── Ref: config/index.ts
│
├── 8. Email Service (NEW)
│   ├── Dev stub (console logging)
│   └── Ref: services/email.ts
│
├── 9. Testing (NEW)
│   ├── Unit + Integration tests
│   ├── Mock store pattern
│   └── Ref: tests/
│
└── 10. Code Style (keep)
```

## 5. Root AGENTS.md Structure (~180 lines)

```
AGENTS.md (Root)
├── 1. Preflight Checklist (keep)
├── 2. Project Map (UPDATE - add klard-auth)
├── 3. Quick Start (enhance)
├── 4. Coding Standards (streamline, remove CLAUDE.md duplicates)
├── 5. Package-Specific Patterns (NEW - quick reference)
│   ├── klard-web: Next.js App Router, shadcn/ui
│   ├── klard-mobile: Expo Router, SVA styling
│   ├── klard-auth: Express, better-auth
│   └── commons: Zod schemas, types
├── 6. Testing (UPDATE)
├── 7. Git & PRs (keep)
├── 8. Performance (keep)
├── 9. Troubleshooting (keep)
└── 10. Done Checklist (keep)
```

## Implementation Order

1. Root CLAUDE.md - Add architectural sections
2. klard-mobile AGENTS.md - Fix critical mismatches (SVA, Expo Router)
3. klard-web AGENTS.md - Add missing patterns
4. klard-auth CLAUDE.md - Expand from 46 to ~150 lines
5. Root AGENTS.md - Update project map and add package patterns