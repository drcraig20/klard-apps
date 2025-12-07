# Klard Apps

**Track. Detect. Protect.** Stop paying for what you don't use.

This monorepo contains the client applications for **Klard** — a privacy-first subscription intelligence and protection platform designed to help individuals, freelancers, and small teams take control of their recurring payments.

## About This Repository

`klard-apps` is a **pnpm monorepo** containing all Klard client applications:

- **klard-web** — Next.js 16 progressive web application
- **klard-mobile** — React Native (Expo) mobile app for iOS and Android
- **commons** — Shared TypeScript types, validation schemas, and constants

> **Note:** Backend services (Auth, Core API, Card Service, etc.) are maintained in separate repositories.

## The Problem

The subscription economy has exploded, but tracking and managing recurring payments remains painful:

- Average users have 12+ active subscriptions
- 42% of users forget about at least one subscription they're paying for
- Price increases often go unnoticed
- Cancellation processes are intentionally obscure
- Free trials auto-convert to paid subscriptions

## The Solution

Klard provides a unified dashboard for subscription tracking, price monitoring, and payment protection—without requiring bank credentials.

### Core Features

| Feature                      | Description                                                                                                         |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Subscription Dashboard**   | Centralized view of all subscriptions with renewal tracking, spend analytics, and auto-populated cancellation links |
| **Price Increase Alerts**    | Automated monitoring that detects price changes and suggests cheaper alternatives                                   |
| **Alternative Finder**       | Curated competitor comparisons with feature and pricing breakdowns                                                  |
| **BurnerCard System**        | Virtual disposable cards with smart rules to block unauthorized renewals                                            |
| **Savings Dashboard**        | Track blocked charges, total savings, and subscription analytics                                                    |

### BurnerCard Types

- **One-Time**: Single transaction, then auto-locks (perfect for free trials)
- **Recurring-Limited**: Allows N charges before locking (subscription control)
- **Category-Locked**: Only works at specific merchant types (design tools, streaming, etc.)

## Tech Stack

### Web (klard-web)
- Next.js 16 (App Router, PWA)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui components
- React Query / Zustand
- Recharts

### Mobile (klard-mobile)
- React Native
- Expo (SDK 52+)
- Expo Router
- TypeScript

### Shared (commons)
- TypeScript types and interfaces
- Zod validation schemas
- Constants and configuration

### Build Tools
- pnpm (package manager)
- Turborepo (monorepo orchestration)

### External Services
- **Auth**: klard-auth (separate repository)
- **Email**: Sendgrid
- **Cards**: Airwallex / Lithic / Stripe Issuing
- **Price Scraping**: ScrapingBee / Zyte
- **Analytics**: PostHog
- **Monitoring**: Sentry, BetterStack

## Repository Structure

```
klard-apps/
├── .github/
│   └── workflows/
│       ├── web.yml                    # Vercel preview/prod deploys
│       └── mobile.yml                 # EAS builds trigger
│
├── klard-web/                         # Next.js 16 App
│   ├── src/
│   │   ├── app/                       # App Router pages
│   │   │   ├── (auth)/                # Auth route group
│   │   │   ├── (dashboard)/           # Dashboard route group
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx               # Landing page
│   │   ├── components/
│   │   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   └── shared/
│   │   ├── api/                       # API routes
│   │   ├── lib/
│   │   └── hooks/
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── klard-mobile/                      # React Native (Expo) App
│   ├── src/
│   │   ├── app/                       # Expo Router
│   │   │   ├── (auth)/
│   │   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   ├── assets/
│   ├── app.json
│   ├── eas.json
│   └── package.json
│
├── commons/                           # Shared code across all apps
│   ├── src/
│   │   ├── types/
│   │   ├── validation/
│   │   ├── constants/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                              # Documentation
│   └── design/                        # Design system specs
│
├── package.json                       # Root package.json
├── pnpm-workspace.yaml                # Workspace config
├── pnpm-lock.yaml
├── turbo.json                         # Turborepo config
├── .gitignore
├── .env.example
└── README.md
```

### Workspace Packages

| Package        | Path             | Description                              |
|----------------|------------------|------------------------------------------|
| `klard-web`    | `./klard-web`    | Next.js 16 PWA                           |
| `klard-mobile` | `./klard-mobile` | React Native (Expo) mobile app           |
| `commons`      | `./commons`      | Shared types, validation, and constants  |

## Backend Architecture (External)

The client apps connect to backend services maintained separately:

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                             │
│              (Rate Limiting, Auth, WAF Protection)              │
└─────────────────────────────────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│  Auth Service │      │  Core Service │      │  Card Service │
│  (JWT/OIDC)   │      │ (Subs CRUD)   │      │ (BurnerCard)  │
└───────────────┘      └───────────────┘      └───────────────┘
                                │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ Price Tracker │      │  Notification │      │  Jobs Service │
│   Service     │      │    Service    │      │  (Scheduler)  │
└───────────────┘      └───────────────┘      └───────────────┘
```

## Design System

Klard uses a **light-first design** with soft shadows and subtle glassmorphism, with full dark theme support.

### Light Theme (Default)

| Token       | Value     | Usage                             |
|-------------|-----------|-----------------------------------|
| Background  | `#FFFFFF` | Pure white base                   |
| Foreground  | `#0F172A` | Dark navy text                    |
| Primary     | `#0D7C7A` | Deep teal CTAs and interactive    |
| Secondary   | `#15B5B0` | Vibrant teal accents              |
| Success     | `#059669` | Savings indicators                |
| Warning     | `#D97706` | Alerts and renewals               |
| Error       | `#DC2626` | Blocked/urgent states             |
| Muted       | `#F1F5F9` | Soft gray surfaces                |

### Dark Theme

| Token       | Value     | Usage                             |
|-------------|-----------|-----------------------------------|
| Background  | `#0F172A` | Dark navy base                    |
| Foreground  | `#F8FAFC` | Light text                        |
| Primary     | `#15B5B0` | Vibrant teal CTAs                 |
| Secondary   | `#0D7C7A` | Deep teal accents                 |
| Success     | `#10B981` | Savings indicators                |
| Warning     | `#F59E0B` | Alerts and renewals               |
| Error       | `#EF4444` | Blocked/urgent states             |
| Muted       | `#1E293B` | Dark surfaces                     |

### Design Features
- **Light-first approach** with full dark mode support via `prefers-color-scheme`
- **Glassmorphism effects** for cards, modals, and overlays
- **Soft shadows** with subtle depth hierarchy
- **WCAG AA compliant** contrast ratios
- **Inter / SF Pro** typography

See [`docs/design/Klard Design System.md`](docs/design/Klard%20Design%20System.md) for complete design specifications.

## Pricing Tiers

| Tier    | Features                                                  | Price     |
|---------|-----------------------------------------------------------|-----------|
| Free    | 3 subscriptions, manual cancel links, renewal alerts      | $0        |
| Pro     | Unlimited subscriptions, price alerts, alternatives       | $9.99/mo  |
| Saver+  | Cancellation automation, 4 BurnerCards/mo, custom rules   | $16.99/mo |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Expo CLI (for mobile development)
- iOS Simulator / Android Emulator (for mobile)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/klard-apps.git
cd klard-apps

# Install dependencies
pnpm install

# Start all development servers
pnpm dev

# Or start individual apps
pnpm dev:web      # Start Next.js dev server
pnpm dev:mobile   # Start Expo dev server
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Configure required variables
# - API_URL: Backend API endpoint
# - AUTH_URL: Authentication service endpoint
# - POSTHOG_KEY: Analytics key
```

### Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `pnpm dev`        | Start all apps in development mode   |
| `pnpm dev:web`    | Start web app only                   |
| `pnpm dev:mobile` | Start mobile app only                |
| `pnpm build`      | Build all apps for production        |
| `pnpm lint`       | Run ESLint across all packages       |
| `pnpm typecheck`  | Run TypeScript type checking         |
| `pnpm test`       | Run tests across all packages        |

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **Design System** — Complete design tokens, components, color palettes, and guidelines
  - [`Klard Design System.md`](docs/design/Klard%20Design%20System.md) — Main design document
  - [`Light Theme Colors & Effects.md`](docs/design/Klard%20Design%20System%20-%20Light%20Theme%20Colors%20%26%20Effects.md) — Light theme specs
  - [`Dark Theme Colors & Effects.md`](docs/design/Klard%20Design%20System%20-%20Dark%20Theme%20Colors%20%26%20Effects.md) — Dark theme specs

## Key Differentiators

- **Privacy-First**: No bank credentials required (unlike Rocket Money, Truebill)
- **Price Detection**: Automatic price increase monitoring
- **Smart Cards**: Category-locked and recurring-limited BurnerCards
- **No Bank Access**: Privacy compliance by design
- **Unified Platform**: Subscriptions + price tracking + payment protection

## Contributing

This project is in early development. Contributions welcome once the codebase is established.

## License

Proprietary - All rights reserved.

---

Built with privacy in mind. Your subscriptions, your control.