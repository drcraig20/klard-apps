# Onboarding Screens Design

## Overview

This document defines the design for Klard's onboarding flow consisting of three screens that replace the existing carousel implementation.

## Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ONBOARDING FLOW                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │
│  │  Screen 5    │───▶│  Screen 6    │───▶│  Screen 7  │─┼──▶ Dashboard
│  │  (Carousel)  │    │  (Form)      │    │  (Tutorial)│ │
│  └──────────────┘    └──────────────┘    └────────────┘ │
│        │                   │                   │         │
│        │ Skip ─────────────┴───────────────────┘         │
│        └──────────────────────────────────────────────▶  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Navigation Rules

- "Skip" link available on all screens → goes directly to Dashboard
- Screen 5 "Get Started" → Screen 6
- Screen 6 "Add Subscription" → Success toast → Screen 7
- Screen 6 "Skip for now" → Screen 7
- Screen 7 "Create Your First BurnerCard" → Dashboard (feature wired later)
- Screen 7 "Explore Dashboard First" → Dashboard
- All paths to Dashboard set `hasOnboarded: true`

---

## Screen 5: Welcome Carousel

### Purpose
Introduce the product value proposition and guide users into first actions.

### Layout
- Full-screen with 3-slide carousel
- Skip link (top right)
- Pagination dots (3 dots)
- Primary CTA button at bottom

### Slides

| Slide | Headline | Body | Illustration | Accent |
|-------|----------|------|--------------|--------|
| 1. Track | "Track all your subscriptions" | "See every recurring payment in one place. Never forget a renewal date again." | Floating subscription cards (Netflix, Spotify, generic) | Primary teal |
| 2. Protect | "Protect with BurnerCards" | "Create virtual cards that auto-block unwanted charges. You control the rules." | Credit card with shield overlay | Primary teal |
| 3. Save | "Save money automatically" | "Get alerts on price increases and discover cheaper alternatives." | Upward arrow with savings counter | Success green |

### Interactions
- Swipe left/right to navigate slides
- Tap pagination dots to jump to slide
- "Next" button advances slide (slides 1-2)
- "Get Started" button on final slide → Screen 6
- "Skip" always visible top-right → Dashboard

### Illustrations (SVG Compositions)
- **Track**: 3 floating subscription cards in fan pattern with glassmorphism
- **Protect**: Credit card shape with shield icon overlay, teal glow
- **Save**: Upward trending arrow with dollar signs, green success glow

---

## Screen 6: Add First Subscription

### Purpose
Get users to add their first subscription for immediate value.

### Layout
- Centered form card with progress indicator
- Step indicator: "Step 1 of 2 — Add your first subscription"
- Skip link (top right)

### Initial State (Service Selection)
- Headline: "What's your first subscription?"
- Search input with autocomplete
- Popular services grid:
  - Mobile: 8 services (2 rows × 4)
  - Web: 12 services (3 rows × 4)
- "Skip for now" ghost button

### Popular Services

| # | Service | Category | Default Price | Cancellation URL |
|---|---------|----------|---------------|------------------|
| 1 | Netflix | Streaming | $15.99 | https://netflix.com/cancel |
| 2 | Spotify | Music | $10.99 | https://spotify.com/account |
| 3 | Amazon Prime | Shopping | $14.99 | https://amazon.com/prime/manage |
| 4 | Adobe Creative Cloud | Software | $54.99 | https://account.adobe.com/plans |
| 5 | YouTube Premium | Streaming | $13.99 | https://youtube.com/paid_memberships |
| 6 | Disney+ | Streaming | $13.99 | https://disneyplus.com/account |
| 7 | HBO Max | Streaming | $15.99 | https://max.com/account |
| 8 | iCloud/Apple One | Cloud Storage | $9.99 | https://apple.com/account |
| 9 | Microsoft 365 | Software | $9.99 | https://account.microsoft.com/services |
| 10 | Dropbox | Cloud Storage | $11.99 | https://dropbox.com/account |
| 11 | ChatGPT Plus | AI Tools | $20.00 | https://chat.openai.com/account |
| 12 | Gym/Fitness | Health & Fitness | $30.00 | (manual entry) |

### Form State (After Service Selection)
- Service header: Logo + Name + Category + [Change] button
- Price input: `$ XX.XX`
- Billing cycle toggle: Monthly / Annual
- Next renewal date: Date picker
- Category dropdown: Auto-suggested based on service
- Cancellation link: Auto-filled for popular services, editable
  - Helper text: "Auto-filled • Edit if incorrect" or "Optional"
- Primary CTA: "Add Subscription"
- Secondary: "Skip for now"

### Interactions
- Search input filters popular services + allows custom entry
- Clicking service chip selects it and expands form
- Form fields pre-filled with service defaults
- "Add Subscription" → saves to Zustand → success toast → Screen 7
- "Skip for now" → Screen 7 (no subscription added)

### Success Toast
"🎉 [Service] added! You'll be reminded before it renews."

---

## Screen 7: BurnerCard Tutorial

### Purpose
Introduce the BurnerCard feature (core differentiator).

### Layout
- Full-screen educational view
- Step indicator: "Step 2 of 2 — Protect your payments"
- Skip link (top right)

### Content
- Illustration: Animated BurnerCard blocking a charge
- Headline: "Meet BurnerCards" (H1)
- Body: "Create disposable virtual cards that protect you from unwanted charges. Set limits, expiry rules, and auto-block renewals."

### Feature Highlights (Glassmorphism Card)

| Icon | Title | Description |
|------|-------|-------------|
| 🛡️ Shield | Block surprise renewals | Stop charges before they happen |
| ⏱️ Clock | Set expiry rules | Cards auto-lock after trial periods |
| 💵 Dollar | Control spending limits | Cap how much a service can charge |

### Actions
- Primary: "Create Your First BurnerCard" → Dashboard
- Secondary: "Explore Dashboard First" → Dashboard

### Notes
- Tier-gating skipped for MVP (all users see same UI)
- BurnerCard creation will be wired when feature is ready

---

## Technical Implementation

### File Structure (Web - Next.js)
```
klard-web/src/
├── app/onboarding/
│   ├── page.tsx                    # Screen 5: Welcome carousel
│   ├── add-subscription/
│   │   └── page.tsx                # Screen 6: Add first subscription
│   └── burnercard-tutorial/
│       └── page.tsx                # Screen 7: BurnerCard tutorial
├── components/onboarding/
│   ├── welcome-carousel.tsx
│   ├── subscription-form.tsx
│   ├── burnercard-tutorial.tsx
│   ├── service-grid.tsx
│   └── illustrations/
│       ├── track-illustration.tsx
│       ├── protect-illustration.tsx
│       └── save-illustration.tsx
├── stores/
│   └── subscription-store.ts
└── data/
    └── popular-services.ts
```

### File Structure (Mobile - Expo)
```
klard-mobile/src/
├── app/
│   ├── onboarding.tsx              # Screen 5: Welcome carousel
│   ├── onboarding-subscription.tsx # Screen 6
│   └── onboarding-burnercard.tsx   # Screen 7
├── components/onboarding/
│   ├── OnboardingScreen.tsx
│   ├── SubscriptionForm.tsx
│   ├── BurnerCardTutorial.tsx
│   ├── ServiceGrid.tsx
│   └── illustrations/
│       ├── TrackIllustration.tsx
│       ├── ProtectIllustration.tsx
│       └── SaveIllustration.tsx
├── stores/
│   └── subscriptionStore.ts
└── data/
    └── popularServices.ts
```

### Shared (Commons)
```
commons/src/
├── types/
│   └── subscription.ts
├── validation/
│   └── subscription.ts
└── constants/
    └── categories.ts
```

---

## Data Models

### Subscription Interface
```typescript
interface Subscription {
  id: string;
  serviceName: string;
  serviceId?: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'annual';
  nextRenewalDate: string;
  category: SubscriptionCategory;
  cancellationUrl?: string;
  logoUrl?: string;
  createdAt: string;
  status: 'active' | 'cancelled' | 'paused';
}

type SubscriptionCategory =
  | 'streaming'
  | 'music'
  | 'software'
  | 'cloud_storage'
  | 'shopping'
  | 'ai_tools'
  | 'health_fitness'
  | 'other';
```

### PopularService Interface
```typescript
interface PopularService {
  id: string;
  name: string;
  logo: React.ComponentType;
  defaultPrice: number;
  defaultCycle: 'monthly' | 'annual';
  category: SubscriptionCategory;
  color: string;
  cancellationUrl?: string;
}
```

### Form Validation Schema
```typescript
const AddSubscriptionSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required'),
  price: z.number().positive('Price must be greater than 0'),
  billingCycle: z.enum(['monthly', 'annual']),
  nextRenewalDate: z.string().datetime(),
  category: z.enum([...categories]),
  cancellationUrl: z.string().url().optional().or(z.literal('')),
});
```

### Zustand Store
```typescript
interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt' | 'status'>) => void;
  removeSubscription: (id: string) => void;
}
```

---

## Key Decisions

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Data persistence | Zustand (local state) | API-ready structure, immediate dashboard feedback |
| Illustrations | Composed SVG scenes | Cross-platform, animatable, no external assets |
| Popular services | 12 services (8 mobile) | "Money sucker" focus, common subscriptions |
| Tier-gating | Skipped for MVP | Backend integration not ready |
| Cancellation URL | Auto-filled + editable | Prepared for AI/API integration |
| Navigation | Swipe carousel, button steps | Natural UX patterns per screen type |

---

## Design System Compliance

- Colors: Klard teal/navy palette
- Typography: Inter/SF Pro, modular scale
- Effects: Glassmorphism cards, teal glow on CTAs
- Spacing: 4/8 grid system
- Accessibility: WCAG AA contrast, focus states