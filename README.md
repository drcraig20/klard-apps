# Klard

**Track. Detect. Protect.** Stop paying for what you don't use.

Klard is a privacy-first subscription intelligence and protection platform designed to help individuals, freelancers, and small teams take control of their recurring payments.

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

### Frontend
- Next.js 16 (PWA)
- Tailwind CSS
- React Query / Zustand
- Recharts

### Mobile
- React Native 
- Expo


### External Services
- **Auth**: klard-auth
- **Email**: Sendgrid
- **Cards**: Airwallex / Lithic / Stripe Issuing
- **Price Scraping**: ScrapingBee / Zyte
- **Analytics**: PostHog
- **Monitoring**: Sentry, BetterStack

## Repository Structure

This is the central specification repository for the Klard-apps platform. Each application is maintained in its own dedicated repository.

```
klard-apps/
├── .github/
│   └── workflows/
│       ├── web.yml                    # Vercel preview/prod deploys
│       └── mobile.yml                 # EAS builds trigger
│
├── klard-web/                         # Next.js 15 App
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── subscriptions/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── [...proxy]/            # Optional: proxy to Spring Boot
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx                   # Landing page
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── social-buttons.tsx
│   │   ├── dashboard/
│   │   │   ├── subscription-card.tsx
│   │   │   ├── subscription-list.tsx
│   │   │   └── sidebar.tsx
│   │   └── shared/
│   │       ├── header.tsx
│   │       └── footer.tsx
│   ├── lib/
│   │   ├── auth-client.ts             # Better Auth client
│   │   ├── api-client.ts              # Spring Boot API client
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── use-subscriptions.ts
│   │   └── use-auth.ts
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── klard-mobile/                      # React Native (Expo) App
│   ├── app/                           # Expo Router
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   └── _layout.tsx
│   │   ├── (tabs)/
│   │   │   ├── dashboard.tsx
│   │   │   ├── subscriptions/
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   ├── settings.tsx
│   │   │   └── _layout.tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SocialButtons.tsx
│   │   ├── dashboard/
│   │   │   ├── SubscriptionCard.tsx
│   │   │   └── SubscriptionList.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Card.tsx
│   ├── lib/
│   │   ├── auth-client.ts             # Better Auth + Expo client
│   │   ├── api-client.ts              # Spring Boot API client
│   │   └── storage.ts                 # SecureStore wrapper
│   ├── hooks/
│   │   ├── useSubscriptions.ts
│   │   └── useAuth.ts
│   ├── assets/
│   │   ├── icon.png
│   │   ├── splash.png
│   │   └── adaptive-icon.png
│   ├── app.json
│   ├── eas.json
│   ├── tsconfig.json
│   └── package.json
│
├── commons/                           # Shared code across all apps
│   ├── src/
│   │   ├── types/
│   │   │   ├── subscription.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   ├── validation/
│   │   │   ├── subscription.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── plans.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                       # Root package.json
├── pnpm-workspace.yaml                # Workspace config
├── pnpm-lock.yaml
├── turbo.json                         # Turborepo config
├── .gitignore
├── .env.example
└── README.md
```

### Related Repositories

| Repository                   | Description                       | Stack                                     |
|------------------------------|-----------------------------------|-------------------------------------------|
| `klard-web`                  | Web application (PWA)             | Next.js, Tailwind CSS, React Query        |
| `klard-mobile`               | Mobile Application (iOS/android)  | React Native, Expo, Better Auth           |
| `commons`                    | Shared code across all apps       | Spring Boot, Spring Data JPA              |
| `klard-card-service`         | BurnerCard provisioning & rules   | Spring Boot, Airwallex/Stripe integration |
| `klard-price-service`        | Price tracking & scraping         | Spring Boot, ScrapingBee                  |
| `klard-notification-service` | Email, SMS, push notifications    | Spring Boot, Sendgrid, Twilio             |
| `klard-jobs-service`         | Scheduled tasks & background jobs | Spring Boot, Quartz                       |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Gateway                              │
│              (Rate Limiting, Auth, WAF Protection)               │
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

Klard uses a modern dark-first design with glassmorphism effects:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0F172A` | Dark navy base |
| Primary | `#15B5B0` | Vibrant teal CTAs |
| Success | `#10B981` | Savings indicators |
| Warning | `#F59E0B` | Alerts and renewals |
| Error | `#EF4444` | Blocked/urgent states |

See `docs/07.Klard Design System.md` for complete design specifications.

## Pricing Tiers

| Tier | Features | Price |
|------|----------|-------|
| Free | 3 subscriptions, manual cancel links, renewal alerts | $0 |
| Pro | Unlimited subscriptions, price alerts, alternatives | $9.99/mo |
| Saver+ | Cancellation automation, 4 BurnerCards/mo, custom rules | $16.99/mo |

## Documentation

Comprehensive documentation is available in the `/docs` directory:

1. **Product Requirements** - Feature specs, personas, competitive analysis
2. **System Architecture** - High-level and lean MVP architecture options
3. **Lean Stack Recommendations** - Modern managed services for MVP
4. **GTM Strategy** - Go-to-market and growth playbook
5. **Design System** - Complete design tokens, components, and guidelines

## Key Differentiators

- **Privacy-First**: No bank credentials required (unlike Rocket Money, Truebill)
- **Price Detection**: Automatic price increase monitoring
- **Smart Cards**: Category-locked and recurring-limited BurnerCards
- **No Bank Access**: Privacy compliance by design
- **Unified Platform**: Subscriptions + price tracking + payment protection

## Getting Started

> Implementation coming soon. Currently in documentation/design phase.

### Prerequisites

- Node.js 20+
- Java 25+
- PostgreSQL 16+
- pnpm

### Development

```bash
# Clone the repository
git clone https://github.com/yourusername/klard-apps.git
cd klard-apps

# Install dependencies (when implemented)
pnpm install

# Start development servers
pnpm dev
```

## MVP Roadmap

### Weekend 1: Auth + Core Subscriptions
- User registration/login (Clerk)
- Subscription CRUD
- Renewal reminder emails
- Basic dashboard UI

### Weekend 2: BurnerCard + Price Tracking
- ONE_TIME card provisioning
- Card state machine
- Price scraping for top 10 services
- Savings dashboard

## Success Metrics (3-Month MVP)

- 2,000+ active users
- ≥8 average subscriptions per user
- ≥$100 average monthly savings per user
- ≥7% free-to-paid conversion
- >40 NPS

## Contributing

This project is in early development. Contributions welcome once the codebase is established.

## License

Proprietary - All rights reserved.

---

Built with privacy in mind. Your subscriptions, your control.