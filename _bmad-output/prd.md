---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
currentStep: 11
stepStatus: 'complete'
lastStep: 11
completedAt: '2025-12-24'
pendingContent: ''
inputDocuments:
  # Phase 0 Discovery (Strategic Foundation)
  - '_bmad-output/analysis/product-brief-klard-apps-2025-12-19.md'
  - '_bmad-output/analysis/research/market-subscription-management-competitive-analysis-2025-12-19.md'
  - '_bmad-output/analysis/brainstorming-session-2025-12-19.md'
  # Existing Platform Documents (Reference Only)
  - 'docs/01.Klard Product Requirement Document.md'
  - 'docs/02.Klard – High Level System Architecture & Data Flow.md'
  - 'docs/05.Klard GTM Strategy (Validation → Growth → Scale).md'
  # Design System (Flexible - Not Constraining)
  - 'docs/design/Klard Design System.md'
  # Screen Specs (34 screens - Flexible, Redesignable)
  - 'docs/screens/individual/*.md (34 screen specs)'
documentCounts:
  briefs: 1
  research: 1
  brainstorming: 1
  projectDocs: 38
designFlexibility: |
  IMPORTANT: Screen specs and design system are REFERENCE ONLY.
  They should NOT constrain PRD creativity or feature imagination.
  Screens are highly redesignable. PRD drives design, not vice versa.
workflowType: 'prd'
project_name: 'klard-apps'
user_name: 'Drcraig'
date: '2025-12-22'
---

# Product Requirements Document - klard-apps

**Author:** Drcraig
**Date:** 2025-12-22

---

## Executive Summary

**Klard** is a subscription intelligence and protection platform that gives users complete control over their recurring payments — without ever asking for bank credentials.

In a world where 41% of consumers experience subscription fatigue and the average person unknowingly leaks hundreds of dollars annually to forgotten renewals and silent price increases, Klard bridges the gap that no competitor has filled: **automated payment protection, powered by subscription intelligence.**

### The Core Insight

Users shouldn't have to choose between knowing their subscriptions OR protecting their payments. Klard eliminates this false choice by delivering:

1. **Payment Protection** (The Promise) — BurnerCards that automatically block unwanted renewals, protect trial sign-ups, and enforce user-defined spending rules
2. **Subscription Intelligence** (The Engine) — Full visibility into recurring payments through manual tracking and optional AI-powered email scanning
3. **Empowered Control** (The Experience) — Self-service tools that put users in the driver's seat, not a concierge model that acts on their behalf

**Tagline:** *Subscribe fearlessly.*

### What Makes This Special

The subscription management market is split between two inadequate solutions:

| Current Options | The Problem |
|-----------------|-------------|
| **RocketMoney, Truebill** | Require full bank access — privacy violation for many users |
| **Privacy.com** | Virtual cards exist in isolation — no subscription awareness |

**Klard is the first platform to integrate both worlds:**
- Track subscriptions like RocketMoney (without bank credentials)
- Protect payments like Privacy.com (with subscription-aware intelligence)
- Deliver control that neither offers (user-managed rules, instant card actions)

**The "aha moment":** When a user's BurnerCard blocks an unwanted $14.99 renewal and they receive:

> *"🛡️ Blocked: Your BurnerCard did its job."*

That's when curiosity becomes confidence. That's when users become advocates.

### Sustainable Competitive Advantages

| Advantage | How It Works |
|-----------|--------------|
| **Brand Trust** | Every "Klard blocked $X" screenshot builds a social proof flywheel |
| **Switching Costs** | Users accumulate card history, rules, and subscription data |
| **Data Moat** | Anonymized global subscription pricing grows more accurate with scale |
| **First-Mover Integration** | Early card issuer partnerships position Klard ahead of competitors who would need to build these integrations from scratch |

*These advantages compound over time: every blocked charge builds brand trust, every subscription tracked deepens switching costs, and pricing data becomes more accurate with scale.*

## Project Classification

| Attribute | Value |
|-----------|-------|
| **Technical Type** | Web App (PWA) + Mobile App (React Native/Expo) |
| **Domain** | Fintech (virtual card issuing, payment processing) |
| **Complexity** | High (card issuer integration, remote authorization, ledger system) |
| **Project Context** | Brownfield — extending existing auth system and component library |

### Technical Classification Notes

As a **high-complexity fintech** project, this PRD addresses:
- Card issuer integration (Airwallex primary, Lithic backup)
- Remote authorization webhooks (2.5s timeout for approve/decline)
- Internal ledger system (provider-agnostic funding architecture)
- PCI considerations (iframe-based card display for MVP, no PCI scope)
- Multi-currency support (CAD, USD, EUR, GBP)

### Design Flexibility Note

Existing screen specifications (34 screens) and design system serve as reference only. This PRD drives feature requirements; design adapts to PRD decisions, not vice versa.

---

## Success Criteria

### User Success

**Primary "Aha Moment":** A Saver+ user's BurnerCard blocks an unwanted charge within 30 days.
- Target: ≥40% of Saver+ users experience this moment
- This is the screenshot moment that creates advocates

**Secondary Success Moments:**

| Moment | Description | Target |
|--------|-------------|--------|
| **Discovery Shock** | User finds ≥1 forgotten subscription via dashboard | ≥30% in Week 1 |
| **Price Alert Save** | User acts on price increase notification | ≥20% act (downgrade/cancel) |
| **One-Click Cancel** | User uses provided cancellation link | ≥50% usage rate |
| **Savings Realization** | User sees cumulative savings in weekly digest | ≥60% open rate |

**Pro User Success (Visibility-Driven):**

| Metric | Target |
|--------|--------|
| Email connected | ≥60% |
| Subscriptions auto-discovered | ≥5 per user |
| Price alerts received (30 days) | ≥25% |
| Cancellation links used | ≥40% |
| Analytics engagement (≥2x/month) | ≥50% |
| Pro → Saver+ upgrade | ≥12% |

**User Emotional Journey:**
- **Before:** Anxious, guilty, unaware of leakage
- **After:** In control, protected, "financial peace of mind"

### Business Success

**Planning Target:** Scenario B (Moderate) — build for B, celebrate C, survive A.

**3-Month Targets:**

| Metric | A (Conservative) | B (Moderate) | C (Optimistic) |
|--------|------------------|--------------|----------------|
| Trial signups | 500 | **800** | 1,200 |
| Conversion rate | 12% | **15%** | 18% |
| Paying users | 60 | **120** | 216 |
| MRR | $950 | **$1,900** | $3,400 |

**12-Month Targets:**

| Metric | A (Conservative) | B (Moderate) | C (Optimistic) |
|--------|------------------|--------------|----------------|
| Trial signups (cum.) | 8,000 | **15,000** | 25,000 |
| Active paying (EoP) | 800 | **1,500** | 2,800 |
| MRR | $12,600 | **$23,700** | $44,200 |
| ARR | $151,200 | **$284,400** | $530,400 |

**North Star Metrics:**

| Metric | Definition | Target |
|--------|------------|--------|
| **Blocked Value** | Total $ blocked by BurnerCards | Track growth MoM |
| **Active Protectors Rate** | % users with ≥1 active BurnerCard | ≥50% |
| **Time to First BurnerCard** | Days from signup to first card created | ≤3 days |

**Retention Targets:**

| Metric | Target |
|--------|--------|
| Day 7 retention | ≥60% |
| Day 30 retention | ≥45% |
| Month 2-3 retention (paying) | ≥80% |
| Monthly churn (paying) | ≤5% |

### Technical Success

As a high-complexity fintech platform, technical success requires:

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Remote auth latency** | <500ms internal | Leave 2s buffer for issuer/network (2.5s total) |
| **API uptime** | 99.95% | ≤22 min/month downtime for payment protection |
| **Webhook processing** | 99.9% success | Issuer webhooks must never be dropped |
| **Card creation** | <3s end-to-end | Users expect instant card provisioning |
| **Dashboard load** | <1s (≤50 subs) | Responsive user experience |
| **Data durability** | Zero transaction loss | Ledger integrity is non-negotiable |

### Measurable Outcomes

**MVP Validation Metrics:**

| Metric | Target | What It Validates |
|--------|--------|-------------------|
| First subscription added | ≥80% Day 1 | Onboarding effectiveness |
| First BurnerCard created | ≥70% Saver+ Week 1 | Core feature adoption |
| First block event | ≥65% Saver+ in 30 days | "Aha moment" achieved |
| Trial → Paid conversion | ≥15% | Business model validated |
| 30-day retention | ≥45% | Stickiness confirmed |
| NPS (Day 30) | ≥50 | User satisfaction |

---

## Product Scope

### MVP - Minimum Viable Product

**Core Features (P0):**

| Feature | Description |
|---------|-------------|
| User Authentication | Email/password, Magic Link, OAuth, Passkey ✅ Built |
| Subscription CRUD | Add, edit, delete with category, price, renewal date |
| Email Scanning | AI-powered receipt parsing (optional, read-only) |
| BurnerCard System | All 3 types: One-time, Recurring, Category-locked |
| Card Rules Engine | Spending limits, auto-lock, linked subscription |
| Remote Authorization | Real-time approve/decline via webhook |
| User Wallet (Ledger) | Internal balance tracking, deposits via Stripe |
| Dashboard | Subscription list, spend, renewals, savings, balance |
| Renewal Alerts | Configurable reminders (72h, 7d, etc.) |

**MVP Success Gate:** ≥15% trial conversion + ≥65% first block in 30 days

### Growth Features (Post-MVP)

**Phase 2 (Month 4-6):**

| Feature | Description |
|---------|-------------|
| Price-increase detection | Web scraping infrastructure |
| Alternative finder | Affiliate integration |
| Shareable savings reports | Social proof generation |
| Advanced analytics | Spend patterns, trends |

**Phase 3 (Month 7-9):**

| Feature | Description |
|---------|-------------|
| Vacation mode | Pause all renewals temporarily |
| Rage quit | One-click lock all cards |
| API access | Developer integrations |
| Multi-currency improvements | Regional pricing |

### Vision (Future)

**Phase 4+ (Month 10+):**

| Feature | Description |
|---------|-------------|
| Team/Family features | Shared subscription management |
| Category budgets | Spending limits per category |
| Agency dashboards | Multi-user, multi-client views |
| Physical cards | Premium tier offering |
| Full PCI-DSS compliance | Advanced card features |

---

## Project Scoping & Strategic Framework

### MVP Philosophy: Revenue + Platform Hybrid

Klard's MVP combines two strategic priorities:

| Philosophy | Focus | Klard Implementation |
|------------|-------|---------------------|
| **Revenue MVP** | Fastest path to 15% conversion | Prioritize: Wallet funding → BurnerCard creation → Block notification → Upgrade flow |
| **Platform MVP** | Foundation for Phase 2-4 | Prioritize: Redis caching, API abstraction, multi-tenant architecture, WebSocket infrastructure |

**Why This Hybrid:**
- Revenue validates business model before scaling
- Platform investment now prevents costly rewrites later
- Block celebration moment drives both conversion AND virality

### Resource Requirements

**MVP Team (Recommended):**

| Role | Count | Key Responsibilities |
|------|-------|---------------------|
| Full-Stack Engineer | 2 | Core platform, card integration, auth |
| Mobile Engineer | 1 | React Native/Expo, push notifications |
| DevOps/SRE | 0.5 | Infrastructure, CI/CD, monitoring |
| Product/Design | 1 | UX, feature prioritization |
| **Total** | **4.5 FTE** | + AI agents for acceleration |

**Timeline Estimate:**
- MVP: 2.5-3 months (auth ✅ already built)
- Phase 2: +3 months
- Phase 3: +3 months

### MVP Scope Boundaries

**Core User Journeys Supported (MVP):**

| Journey | Persona | Critical Path |
|---------|---------|---------------|
| Trial Protection | Felix, Sam | Create card → Use for trial → Block unwanted charge |
| Subscription Discovery | Harper, Fiona | Add subs → Connect email → Find forgotten subs |
| Savings Realization | All | Cancel subs → See savings counter → Share screenshot |

**MVP Feature Scope (Aligned with Project-Type Requirements):**

| Category | In MVP | Deferred |
|----------|--------|----------|
| **Platforms** | Web (PWA) + Mobile (Expo) — both complete | — |
| **Platform Philosophy** | Neither "lite" — user chooses preference | — |
| **Auth** | Email/pass, OAuth, Passkey, Mobile biometrics | Magic Link (security) |
| **Cards** | All 3 types + basic rules | ML-based suggestions |
| **Real-time** | WebSocket (TLS 1.3, JWT auth) | — |
| **Caching** | Redis (3 critical: session, card rules, rate limit) | 4 optimization caches (Phase 2) |
| **Accessibility** | WCAG 2.2 AA, Dark mode, Motion reduction | Voice commands, High contrast |
| **Cancellation** | 50 manual pages | 200+ AI-generated (Phase 2) |
| **Calendar** | Internal view | External sync (Phase 2) |
| **Payments** | Stripe + Apple Pay/Google Pay | — |

### Risk Mitigation Strategy

**Technical Risks:**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Airwallex API latency exceeds 2.5s | Medium | Critical | Pre-compiled Redis rules (1000-1200ms internal), SSE fallback |
| WebSocket blocked by corporate firewalls | Medium | High | SSE fallback implemented from MVP |
| Card issuer relationship failure | Low | Critical | API abstraction layer, Lithic backup conversations initiated |
| Ledger desync with Airwallex | Low | Critical | Daily reconciliation, idempotency keys, anomaly alerts |

**Market Risks:**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Users won't pay $20/mo | Medium | Critical | Free tier (Pro) proves value before paywall, first block within 30 days |
| Low trial-to-paid conversion | Medium | High | Success gate: ≥15% or pivot pricing/features |

**Resource Risks:**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Team reduced to 50% | Medium | High | See "Scope Cutback Plan" below |
| Key engineer leaves | Low | High | Documentation culture, pair programming, no single points of failure |
| Funding delayed | Medium | Medium | MVP scoped for 3-month runway minimum |

### Scope Cutback Plan (50% Resources)

If resources drop to 50%, prioritize:

**Keep (Critical Path):**
- ✅ Web platform only (defer mobile to Phase 2)
- ✅ BurnerCard creation + blocking
- ✅ Wallet funding (Stripe)
- ✅ Basic subscription CRUD
- ✅ Block notifications (email, not push)
- ✅ Top 20 cancellation pages

**Cut (Restore in Phase 2):**
- ❌ Mobile app
- ❌ Email scanning (AI parsing)
- ❌ Advanced card rules (category-lock)
- ❌ All Redis caching (use database queries)
- ❌ WebSocket real-time (use polling)

**Minimum Viable Klard:** Web-only, manual subscriptions, basic cards, email notifications.

### Success Gate Dependencies

**Phase 2 Entry Requirements:**

| Gate | Metric | Target | Measurement |
|------|--------|--------|-------------|
| Conversion | Trial → Paid | ≥15% | Stripe data |
| Activation | First block in 30 days | ≥65% | Event tracking |
| Retention | Month 2-3 (paying) | ≥80% | Cohort analysis |
| NPS | Day 30 | ≥50 | Survey |

**If gates not met:**
- <10% conversion → Revisit pricing model
- <30% first block → Revisit onboarding (faster card creation)
- <70% retention → Revisit value prop (add features or cut price)

---

## User Journeys

### Journey 1: Harper Santos — The Peace of Mind Payoff

**Profile:** VP Product, 32, London, 45+ subscriptions, $400+/mo spend

Harper runs product at a 200-person scale-up. Between back-to-back meetings, two kids (ages 4 and 7), and a side project newsletter she keeps meaning to monetize, she's accumulated subscriptions like digital sediment. Her husband adds streaming services without telling her. Last month she found a Masterclass subscription she'd had for two years and never used.

**The Discovery:** One evening, scrolling LinkedIn while her kids watch Bluey, Harper sees a post: *"Klard just blocked my third unwanted charge this month. I've saved $127."* The screenshot shows a blocked $49.99 renewal. She's intrigued — this isn't another app asking for her bank login.

**The Setup:** During a 15-minute coffee break between meetings, Harper downloads Klard. The onboarding asks: "Which of these do you subscribe to?" — checkboxes, not forms. She taps Netflix, Spotify, Adobe, Notion, Linear, Figma, NYT, The Athletic, Headspace, Peloton... 12 subscriptions in under a minute. Klard estimates: **$287/month**. She connects her work email (read-only, optional). Within seconds, Klard surfaces 5 more: Calendly, Loom, Miro, Grammarly, and... **Masterclass?** She'd forgotten about that. Again.

**The Aha Moment:** Harper creates a BurnerCard for a new AI writing tool trial. "One-time card, $25 limit, expires in 30 days." She copies the card number and completes the trial signup. Ten days later, she gets a notification: *"🛡️ Blocked: $29.99 from AIWritePro. Your BurnerCard did its job."* She screenshots it immediately. Posts to her company Slack: *"This just paid for itself."*

**The New Reality:** Six months later, Harper has 8 active BurnerCards managing trials and annual renewals. Her Klard dashboard shows: **$412 blocked, 3 forgotten subscriptions cancelled, spending down to $241/month.** She checks Klard once a week during her Sunday coffee — a 5-minute habit that replaced hours of anxiety.

---

### Journey 2: Felix Chen — The Trial Warrior

**Profile:** Freelance UX Designer, 26, Toronto, 25-35 SaaS tools, $180-280/mo

Felix runs his own design practice from a WeWork hot desk. His Discord is full of designers sharing "game-changing" tools. Every week there's a new AI assistant, design plugin, or productivity app. He signs up for trials intending to cancel, but by day 7 he's already testing the next shiny thing. His credit card statement is a graveyard of $9.99 and $19.99 charges for tools he used once.

**The Problem:** Felix checks his bank statement and sees four charges he doesn't recognize. $14.99 from Notion, $12.99 from Canva, $9.99 from "TranscribeAI," $29 from Framer. That's $66 in one month on tools he forgot about.

**The Setup:** He manually adds his known subscriptions — Figma, Slack, Zoom, Linear. Then connects his email. Klard finds 14 more. **$234/month total.** But the real magic is what comes next. Felix creates his first BurnerCard: "One-time, $15 limit" for a new motion design tool trial.

**The Aha Moment:** Seven days later: *"🛡️ Blocked: $24.99 from MotionMaster. Your BurnerCard did its job."* Felix screenshots it. Posts to his Discord: *"Game. Changer. I can try literally anything now."*

**The New Reality:** Felix now has a ritual: every time someone shares a tool, he creates a BurnerCard first. "Try first, decide later." His subscription shame is gone. He's tried 12 new tools in the past month and only kept 2 — but he hasn't been charged for a single unwanted renewal.

---

### Journey 3: Fiona Park — The Great Simplification

**Profile:** Senior Marketing Manager, 28, NYC, 30+ subscriptions, $200-350/mo

Fiona's subscriptions have accumulated like sediment over 8 years of adult life. Streaming services from college. A meal kit from when she tried to cook more. A meditation app from a New Year's resolution. She feels overwhelmed by "subscription creep." She tried RocketMoney but closed it immediately when it asked for bank access.

**The Setup:** Klard's onboarding asks her preferred approach: *"Do you want to start by adding subscriptions, or by protecting a trial?"* She chooses visibility. She spends 10 minutes checking boxes and adding forgotten services. Connects her personal email. Klard surfaces 31 subscriptions totaling **$298/month**. The health indicators light up: 4 services marked "Unused" (no logins in 90+ days). 2 marked "Price Increased."

**The Aha Moment:** Fiona clicks the "Unused" filter. There they are: Masterclass ($15/month), Calm ($12.99/month), Blue Apron ($47.95/month — PAUSED BUT STILL CHARGING?!), ClassPass ($49/month). **$125/month** she didn't know she was spending. Each subscription shows a cancellation link. Fiona clicks through all four, cancels in 15 minutes total. The savings counter updates: *"Projected savings: $1,500/year."* She texts her sister: *"I feel 10 pounds lighter."*

**The Upgrade Moment:** A week after cancelling her forgotten subscriptions, Fiona sees a trial she wants to try — a new project management tool her team is considering. She goes to create a BurnerCard and sees: *"BurnerCards are available on Saver+ ($19.99/mo)."* She hesitates, then remembers: she just saved $125/month. The upgrade pays for itself 6x over. She upgrades. Her first BurnerCard: "One-time, $20 limit, ProjectTool trial."

---

### Journey 4: Sam Tremblay — Never Burned Again

**Profile:** Grad Student, 21, Montreal, 8-12 subscriptions, $50-80/mo

Sam is on a tight graduate student budget where every dollar counts. He constantly signs up for free trials — video editing software for class projects, streaming services to watch specific shows. He's been burned multiple times by forgotten cancellations. Last semester: $79 charge for annual software he used for one assignment. That was groceries for two weeks.

**Card Creation (No Funding Required for Blocking):** Sam creates a BurnerCard: "One-time, $0 limit, linked to DaVinci trial." He doesn't need to fund his wallet first — cards can block charges without any balance. The card exists purely to satisfy the trial signup form — it will decline ANY charge. He finishes the assignment in 10 days. Submits the project. Gets an A.

*Note: If Sam later wants to actually PAY for a subscription through Klard, he can add funds. But for pure trial protection (blocking), no funding is required.*

**The Aha Moment:** Day 15: *"🛡️ Blocked: $295.00 from Blackmagic Design. Your BurnerCard did its job."* Sam stares at the notification. $295. That was his entire discretionary budget for the month. He screenshots it. Posts to the class Discord: *"GAME CHANGER FOR STUDENTS. Created a burner card for DaVinci trial. Just blocked $295."*

**The New Reality:** Sam becomes the "Klard guy" in his program. He creates BurnerCards for every tool he needs for assignments. He's tried 15 different software packages this semester and paid for exactly 2 of them.

---

### Journey 5: Pete Hoffman — The Privacy Advocate's Validation

**Profile:** Security Engineer, 27, Berlin, 15-20 subscriptions, $120-200/mo

Pete works in application security. He's researched every subscription tracker on the market. He's rejected all of them due to bank access requirements. He uses Privacy.com for virtual cards but is frustrated that it has zero subscription awareness.

**The Validation:** Pete signs up. Creates one BurnerCard. Tests a small transaction. Watches the webhook flow. Everything works as documented. He reviews how Klard works. Airwallex handles card issuing — PCI-certified, regulated. Klard stores only masked PANs and reference tokens. Even if Klard were breached, his card numbers stay safe.

**The Aha Moment:** A week later, he gets a renewal reminder: *"Adobe Creative Cloud renews in 3 days ($54.99). Keep it, pause it, or burn the card?"* The granularity is exactly what he wanted. Not a concierge service that acts on his behalf. A tool that gives him information and control.

**The New Reality:** Pete becomes an advocate in developer communities. When colleagues ask about subscription trackers, he has a one-line answer: *"Klard. No bank access. Tokenized cards. It's the architecture I'd have built."*

---

### Journey 6: Amy Richardson — The Agency Controller (Phase 2 Preview)

**Profile:** Agency Founder, 34, Austin, 20-30 business tools, $300-500/mo

Amy runs an 8-person design agency. Her team signs up for tools constantly — sometimes with approval, sometimes without. She has no central visibility into what they're paying for.

**The MVP Reality:** For now, Amy uses Klard personally and tracks agency tools manually. She creates BurnerCards for her own trial sign-ups and recommends Klard to freelancers in her network. She's on the waitlist for team features.

**The Phase 2 Vision:** Amy imagines: Category-locked BurnerCards for "Design Tools" with monthly limits. Team members can sign up for trials freely, but the card declines if it exceeds the design budget or wrong category. When team features launch, she'll be first in line.

---

### Edge Case: Cancellation Friction (Fiona)

Fiona clicks the cancellation link for Blue Apron. Instead of a simple "Cancel" button, she lands on a retention page with 5 screens of "Are you sure?" offers. She's frustrated but persists. On the final screen, it asks her to call a phone number.

She returns to Klard and taps "Report Issue" on the Blue Apron subscription. A form appears: *"What went wrong?"* She selects "Cancellation was difficult" and adds a note: "Required phone call."

Klard marks the subscription as "Cancellation Pending" with a reminder set for 48 hours. Two days later, she gets a prompt: *"Did you successfully cancel Blue Apron?"* She confirms. The subscription is marked cancelled.

---

### Edge Case: Unexpected Decline (Pete)

Pete creates a Recurring BurnerCard for his Spotify subscription. The card has a $15/month limit. The first charge goes through. The second month: declined.

Pete gets a notification: *"⚠️ Charge declined: $10.99 from Spotify. Reason: Card issuer declined."*

He opens the card details. Everything looks correct — limit not reached, card not locked, funds available. He taps "Troubleshoot" and sees: *"Sometimes card issuers decline transactions for security reasons unrelated to your Klard settings. Try these steps..."*

The troubleshooting suggests: (1) Check if Spotify has the latest card details, (2) Try a small test transaction, (3) Contact support if issue persists. Pete tries a $1 test transaction — it works. He updates Spotify with the "refreshed" card details. The next month's charge succeeds.

---

### Additional System Users (Noted)

| User Type | Role | Key Actions | Phase |
|-----------|------|-------------|-------|
| **System Admin** | Manages platform, feature flags, price DB | Configure settings, monitor health, curate data | MVP (internal) |
| **Support Agent** | Helps users with issues | View user subscriptions (limited), trigger card resets, escalate | MVP |
| **Card Issuer Webhook** | Automated system | Receive AUTH/CAPTURE/DECLINE events, process in <2.5s | MVP |
| **Airwallex Partner Admin** | Monitors card program | Review fraud signals, manage program health | MVP (external) |

---

### Trial Conversion Timeline (30-Day Window)

*Critical for reducing trial churn — every day of friction steals from the "aha moment" window.*

| Day Range | Goal | UX Must-Haves | Churn Risk If Missed |
|-----------|------|---------------|----------------------|
| **Day 0-1** | 'Wow' moment | Instant dashboard value, subscription count shock | User abandons |
| **Day 1-3** | First BurnerCard created | Guided flow, pre-KYC card building | Loses momentum |
| **Day 3-7** | Card deployed on a real trial | Prompt: 'Found a trial to protect?' | No protection value |
| **Day 7-10** | Anticipation building | 'Your card is armed — 4 days until renewal' | Forgets about Klard |
| **Day 10-14** | Block OR value reinforcement | Block celebration OR 'Protected $X so far' | Churns at trial end |

### Conversion Signals (Churn Prediction)

*Track leading indicators to identify at-risk users and intervene proactively.*

| Signal | Good Indicator | Churn Risk |
|--------|----------------|------------|
| Day 1 subscriptions added | ≥5 | 0-2 |
| Email connected | Yes | No |
| BurnerCard created | By Day 3 | After Day 7 or never |
| Card deployed (used in checkout) | By Day 7 | Never |
| Return visits | 3+ in first week | 1 and done |

*Users who hit 3+ good indicators by Day 7 convert at 2-3x the rate of those who don't.*

---

### Journey Requirements Summary

| Capability | Revealed By |
|------------|-------------|
| Quick Onboarding | Harper, Felix, Fiona |
| Suggestion Checkboxes | Harper |
| Email Scanning (Optional) | Harper, Felix, Fiona |
| Manual-First Option | Sam, Pete |
| Wallet Funding (Stripe) | Sam |
| One-Time BurnerCards | Felix, Sam |
| Recurring BurnerCards | Pete, Harper |
| Category-Locked Cards | Amy (Phase 2) |
| Health Indicators | Fiona |
| Cancellation Links | Fiona |
| Cancellation Issue Reporting | Fiona (edge case) |
| Cancellation Pending Status | Fiona (edge case) |
| Price Increase Alerts | Fiona, Pete |
| Renewal Reminders | Pete, Harper |
| Blocked Charge Notifications | All |
| Decline Troubleshooting | Pete (edge case) |
| Test Transaction Capability | Pete (edge case) |
| Support Escalation with Context | Pete (edge case) |
| Savings Counter | Fiona, Sam |
| Screenshot-Ready Sharing | Felix, Sam |
| Pro → Saver+ Upgrade Path | Fiona |
| Team Features | Amy (Phase 2) |

---

## Domain-Specific Requirements

### Fintech Compliance & Regulatory Overview

Klard operates in the high-complexity fintech domain, issuing virtual cards (BurnerCards) and managing user wallets across four jurisdictions: Canada, United States, United Kingdom, and European Union. The strategic partnership with Airwallex as BIN sponsor and card issuer significantly reduces Klard's direct regulatory burden.

**Key Regulatory Insight:** Klard is NOT a Money Services Business (MSB) or Payment Service Provider (PSP) because:
- Klard does not perform currency exchange (Airwallex handles FX)
- Klard does not transfer money between users
- **Airwallex processes all payments** — Klard provides the rules engine and user interface
- Klard acts as a technology platform under Airwallex's card program license

This determination should be confirmed with a Canadian fintech lawyer ($1,500-3,000 CAD opinion letter) before launch.

### Corporate Structure & Jurisdiction

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Incorporation** | Federal Canadian Corporation | Founder location, SR&ED tax credits, straightforward banking |
| **Future Structure** | Subsidiaries as needed | Delaware LLC (US scale), Ireland/Netherlands (EU enterprise) |
| **Geographic Launch** | All 4 markets simultaneously | <50K users/region keeps below most regulatory thresholds |

### Compliance Responsibility Matrix

| Responsibility | Owner | Notes |
|----------------|-------|-------|
| **Identity Verification (KYC)** | Airwallex | Klard collects data, passes to Airwallex API |
| **AML Monitoring** | Airwallex | Real-time risk engine, sanctions screening |
| **Payment Processing** | Airwallex | All transactions flow through Airwallex infrastructure |
| **Suspicious Transaction Reports** | Airwallex | Regulatory filing obligation |
| **Card Issuing Compliance** | Airwallex | PCI-DSS, card network rules |
| **User Data Protection** | Klard | GDPR, CCPA, privacy policy |
| **Application Security** | Klard | TLS, encryption, access controls |
| **Fraud Prevention (App Layer)** | Klard | Velocity checks, device fingerprinting |

### Onboarding & KYC Strategy

**KYC Timing (Reducing Friction):**
- Account creation: Email + password only (no KYC)
- First subscription added: No KYC required
- First BurnerCard creation: **KYC required** (Airwallex mandate)
- Goal: Let users experience value (subscription tracking) before KYC wall

**Deposit Hold Tiers:**

| Amount | Hold Period | Rationale |
|--------|-------------|-----------|
| <$50 | Instant | Low risk, high adoption |
| $50-200 | 24 hours | Moderate risk |
| >$200 | 48 hours | High risk, new payment method |

*Hold periods waived for verified payment methods (>3 successful deposits, no chargebacks)*

### PCI Scope Analysis

Klard maintains **minimal PCI scope (SAQ A)** through careful architecture:

| Data Element | Klard Storage | Rationale |
|--------------|---------------|-----------|
| Full PAN (card number) | ❌ Never stored | Displayed via Airwallex secure iframe only |
| CVV | ❌ Never stored | Displayed via iframe only |
| Masked PAN | ✅ Stored | `**** **** **** 1234` for display |
| Expiry Date | ✅ Stored | For user reference |
| Card Token | ✅ Stored | Airwallex reference ID for API calls |

**Technical Enforcement (P0):**
- PAN redaction middleware in logging pipeline
- Error sanitization layer before Sentry/external logging
- CSP headers preventing card data exfiltration
- No PANs in localStorage, sessionStorage, or analytics events

### Security Requirements

**Authentication Model:**
- Email/password + OAuth only (Magic Link disabled for security)
- **2FA/Passkey required** for all sensitive operations:
  - Card creation
  - Rule changes (spending limits, lock/unlock)
  - Funding operations >$200
  - Email/password changes
  - Account deletion

**Token Security:**
- Airwallex API tokens IP-restricted to production servers only
- Per-user token rate limits (10 API calls/minute max)
- Token audit logging (all API calls logged with user context)

**Ledger Integrity:**
- Double-entry accounting (every credit has corresponding debit)
- Reconciliation against Airwallex balances (daily minimum, hourly if API allows)
- Anomaly detection for balance changes >$100 without matching funding event

**MVP (P0):**
- TLS 1.3 for all connections
- AES-256 encryption at rest (AWS RDS default)
- Environment variable secrets management
- Rate limiting (Redis-based)
- OWASP Top 10 input validation
- Row-level security for user data isolation (PostgreSQL RLS at database level)
- Device fingerprinting with GDPR-compliant privacy disclosure

**Post-Launch (P1):**
- Professional penetration test ($5,000-15,000)
- WAF implementation (Cloudflare Pro)
- Role separation: Admin (view user data) / Ops (view logs) / Super Admin (emergency, audited)

**Scale (P2):**
- SOC 2 Type I certification ($15,000-40,000)
- ISO 27001 (for EU enterprise customers)
- Read replica for dashboard queries
- ML-based fraud detection

### Trusted Device Program

To reduce 2FA fatigue while maintaining security:
- Users can designate up to 3 "trusted devices"
- Trusted devices: 2FA required only for high-risk actions (funding >$200, removing limits)
- Non-trusted devices: 2FA for all sensitive operations
- Device trust revoked if: password change, 90 days inactive, user request

### Account Security Hardening

**Account Takeover Prevention:**
- Login notifications to secondary channel
- New device triggers re-verification flow
- Password/email change invalidates all other active sessions
- All high-value actions require 2FA/Passkey

**Deposit Fraud Mitigation:**
- Hold periods per tier (see above)
- New accounts limited to $100 total deposits in first 7 days
- Stripe Radar fraud scoring integrated into deposit flow
- Chargeback history tracking (users with history require enhanced verification)

### Remote Authorization Performance

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Internal latency** | 1000-1200ms | Rule evaluation + response |
| **Network buffer** | 1300-1500ms | Airwallex processing + network |
| **Total timeout** | 2500ms | Card network standard |

### Transaction Monitoring Rules

| Pattern | Trigger | Action |
|---------|---------|--------|
| **Subscription mismatch** | Card linked to Sub A, charge from Merchant B | Auto-decline + alert |
| Merchant concentration | >3 txns same merchant/24hr (unlocked cards) | Review flag |
| High velocity spend | >$500 in 1 hour | Temporary freeze + notify |
| Suspicious MCC | Wire transfer, quasi-cash | Block by default |
| New card + high spend | >$200 within 1hr of creation | 2FA verification |

### Data Retention Policy

| Record Type | Active Storage | Archive | Total Retention |
|-------------|----------------|---------|-----------------|
| Transaction logs | 1 year | 6 years | **7 years** |
| User account data | Active + 2 years | 5 years | **7 years** |
| Card creation/deletion | 1 year | 6 years | **7 years** |
| Access logs | 90 days | 9 months | **1 year** |
| Marketing consent | Until withdrawal | +3 years | **3 years post-withdrawal** |

**Immutable Log Storage (MVP Approach):**
- AWS CloudWatch Logs with retention policy (append-only by design)
- S3 export with Object Lock (WORM compliance) for 7-year archive

### Audit Trail Requirements

All auditable events logged in structured JSON format:

| Event Category | Logged Data | Retention |
|----------------|-------------|-----------|
| Card lifecycle | Creation, rule changes, lock/unlock, deletion | 7 years |
| Funding events | Amount, source, timestamp | 7 years |
| Authorization decisions | Approve/decline, reason, transaction ID | 7 years |
| User authentication | Login/logout, IP, device, success/fail | 1 year |
| Admin actions | All admin panel activity with before/after state | 7 years |

### Regulatory Thresholds to Monitor

| Threshold | Trigger | Action Required |
|-----------|---------|-----------------|
| **CFPB Larger Participant** | >$10M annual receipts | Enhanced compliance requirements |
| **GDPR Representative** | >50K EU users | Appoint EU representative |
| **State-specific (CA)** | >100K CA users or >$25M revenue | Full CCPA compliance |

### Card Network Compliance

Klard operates under Airwallex's Visa/Mastercard program. Key constraints:
- **Cardholder disputes**: Must support chargeback process per network rules
- **Prohibited MCCs**: Certain merchant categories blocked by default
- **Virtual card disclosure**: Users must be informed cards are virtual
- **Card art**: Subject to Airwallex program approval

### Marketing & Disclaimer Requirements

**Required Disclosures:**
- "BurnerCards may not block all charges in rare circumstances (issuer overrides, technical issues)"
- "Klard is not a bank. Funds held by [payment partner]"
- "Virtual cards subject to merchant acceptance"

**Prohibited Claims:**
- "100% protection guaranteed"
- "Never pay for unwanted subscriptions again" (absolute language)

### Dispute Resolution Process

| Step | Owner | Action |
|------|-------|--------|
| 1. User reports issue | Klard Support | Create ticket, gather initial info |
| 2. Evidence collection | Klard Support | Transaction logs, IP, device, card rules at time |
| 3. Submit to issuer | Klard → Airwallex | Via API/dashboard with evidence package |
| 4. Card network dispute | Airwallex | Manages Visa/Mastercard process |
| 5. Resolution | Airwallex → Klard | 45-90 days typical |
| 6. User notification | Klard Support | Communicate outcome |
| 7. Appeals (if needed) | Klard Support | Secondary review process available |

### Incident Response Requirements

| Severity | Definition | Response Time | Notification |
|----------|------------|---------------|--------------|
| **P1 - Critical** | Data breach, funds theft | <1 hour | Immediate internal + GDPR 72hr |
| **P2 - High** | Service outage, suspected breach | <4 hours | Same day internal |
| **P3 - Medium** | Degraded service, single user impact | <24 hours | Next business day |
| **P4 - Low** | Minor issues, no user impact | <72 hours | Weekly summary |

**Breach Response Playbook:**
1. Contain: Isolate affected systems/accounts
2. Assess: Determine scope and data exposed
3. Notify: GDPR 72-hour deadline (target 48 hours)
4. Remediate: Fix vulnerability, restore service
5. Review: Post-incident analysis within 7 days

### System Resilience Requirements

**Airwallex Integration:**
- Health check every 60 seconds
- Graceful degradation: Queue card creation if API unavailable
- Webhook retry: 3 attempts with exponential backoff
- Polling fallback: Check transaction status every 5 minutes if webhooks delayed

**Database Resilience:**
- Connection pooling to prevent exhaustion
- Point-in-time recovery enabled (7-day window)
- Automated failover for primary failure

**Ledger Integrity:**
- Transaction locking to prevent double-spend
- Idempotency keys on all financial operations
- Daily minimum reconciliation (hourly if API allows)
- Discrepancy >$100 triggers immediate alert

### Failure Recovery Playbooks

| Scenario | Detection | Response | Recovery |
|----------|-----------|----------|----------|
| Airwallex outage | Health check failure 3x/5min | Banner, queue requests | Process queue on restore |
| Ledger desync | Reconciliation discrepancy | Freeze accounts, alert ops | Manual audit + adjustment |
| Mass fraud event | >10 fraud flags/hour same pattern | Freeze matching accounts | Pattern analysis, user review |
| Database failure | Connection errors spike | Failover to replica | Promote replica, restore primary |

### Data Protection Compliance

**GDPR (EU Users):**

| Requirement | Implementation | Priority |
|-------------|---------------|----------|
| Right to Access | Export all user data as JSON | P0 - MVP |
| Right to Deletion | Anonymize + delete (respecting retention) | P0 - MVP |
| Right to Rectification | User profile editing | P0 - MVP |
| Right to Portability | Machine-readable export | P1 - Post-MVP |
| Right to Object | Marketing opt-out | P0 - MVP |

**Privacy Policy Must Disclose:**
- Device fingerprinting for fraud prevention purposes
- Data retention periods by category
- Third-party processors (Airwallex, Stripe)

**Data Residency Approach:** Single global database (AWS ca-central-1) with standard contractual clauses and AWS DPA for MVP. Architecture designed for regional sharding if required.

### Future-Proofing Requirements

**Data Architecture Preparedness:**
- Design database schema for regional sharding from Day 1
- Granular consent management infrastructure (not monolithic "accept all")
- Breach response target: 48 hours (ahead of potential regulation)

**Issuer Diversification Strategy:**
- API abstraction layer: Card issuing logic decoupled from Airwallex-specific calls
- Backup issuer relationship: Initiate conversations with Lithic or Stripe Issuing at MVP
- Contract terms: Negotiate 12-month notice period in Airwallex agreement

**Scope Boundaries:**
- Klard is **fiat-only** for MVP and foreseeable future
- Crypto funding to be revisited annually based on regulatory clarity
- Wallet architecture designed to support multiple funding sources (future flexibility)

### Estate & Deceased User Handling

| Scenario | Klard Policy |
|----------|--------------|
| **Wallet balance** | Refunded to original funding source upon verified estate claim |
| **Account access** | Requires death certificate + legal authority documentation |
| **Subscription data** | Exportable by verified estate representative |
| **Timeline** | Process within 30 days of verified claim |
| **Legal holds** | Account frozen if notified of probate/litigation |

### Business Continuity Requirements

**Wind-Down Procedure (if Klard ceases operations):**
1. 90-day advance notice to all users
2. All wallet balances refunded to original funding source
3. All active cards deactivated with user notification
4. User data export available for 180 days
5. Transaction records retained per regulatory requirements (7 years)

*This procedure must be referenced in Terms of Service*

### Competitive Compliance Positioning

**Klard's Compliance Advantages vs Market:**

| Competitor | Their Weakness | Klard's Strength |
|------------|----------------|------------------|
| **RocketMoney/Truebill** | Requires full bank access | Zero bank credentials required |
| **Privacy.com** | US-only, no subscription awareness | Global-ready, subscription-aware cards |
| **Mint/YNAB** | Read-only (no payment protection) | Active protection via BurnerCards |

**Compliance Gaps to Close:**

| Gap | Target | Timeline |
|-----|--------|----------|
| Regulatory relationships | Proactive regulator contact (FINTRAC, FCA) | Month 6 |
| Security track record | Penetration test + public disclosure | Month 6 |
| Fraud ML | Basic ML model for anomaly detection | Month 9-12 |
| SOC 2 certification | Type I certification | Month 12 |

### Implementation Cost Summary

| Item | Timing | Cost |
|------|--------|------|
| Incorporation | Pre-MVP | $500 CAD |
| Legal opinion (platform status) | Pre-MVP | $2,000-3,000 |
| Privacy policy drafting | Pre-launch | $500-1,500 |
| Penetration test | Month 6 | $5,000-15,000 |
| SOC 2 Type I | Month 9-12 | $15,000-40,000 |
| **Total Year 1** | | **$23,000-60,000** |

---

## Innovation & Novel Patterns

### The Core Innovation: Payment Control, Not Payment Facilitation

The subscription and payment industry operates on a fundamental assumption that Klard challenges:

| Traditional Assumption | Klard's Paradigm |
|------------------------|------------------|
| Credit cards *facilitate* payments (cashback incentivizes usage) | BurnerCards *control* payments (rules determine if charges occur) |
| Payment protection = disputing charges after the fact | Payment protection = preventing unwanted charges proactively |
| Subscription visibility requires bank access | Subscription visibility through email scanning + manual tracking |
| Virtual cards are dumb (no context about what they protect) | Virtual cards are smart (linked to specific subscriptions/merchants) |

**The Insight:** Credit cards are designed to say "yes" to charges. Klard's BurnerCards are designed to say "yes" OR "no" based on user-defined rules. This is a category-creating innovation.

### Subscription-Aware Virtual Cards (First in Market)

No competitor has combined subscription tracking with virtual card issuing:

| Capability | How It Works | Why It's Novel |
|------------|--------------|----------------|
| **Merchant-Linked Cards** | BurnerCard linked to "Netflix" only accepts charges from Netflix | Cards know their purpose |
| **Subscription Mismatch Detection** | Card linked to Sub A auto-declines Merchant B | Implicit fraud detection |
| **Context-Aware Notifications** | "Your Netflix card blocked a charge from RandomMerchant" | Users understand why |

### Configurable Payment Rules

| Rule Type | Description | Use Case |
|-----------|-------------|----------|
| **One-Time** | Card auto-locks after first successful charge | Trial signups |
| **N-Recurring** | Card allows exactly N charges, then locks | "3 months only" subscriptions |
| **Amount-Locked** | Card only accepts charges matching expected amount ±tolerance | Price increase protection |
| **Merchant-Locked** | Card only works at specific merchant(s) | Subscription protection |
| **Category-Locked** | Card only works for specific MCC categories | Budget enforcement |
| **Time-Bounded** | Card expires on specific date regardless of usage | Trial deadlines |

**Composable Rules:** Users can combine rules (e.g., "One-time + $25 limit + expires in 30 days").

### The Privacy-First Visibility Model

Competitors force a binary choice. Klard creates a third option:

| Approach | Trade-off |
|----------|-----------|
| RocketMoney/Truebill | Full visibility, but requires bank credentials |
| Privacy.com | Full privacy, but zero subscription awareness |
| **Klard** | Selective visibility via email scanning + manual tracking, no bank access ever |

### Competitive Landscape

| Competitor | What They Do | What They Don't Do |
|------------|--------------|-------------------|
| **RocketMoney/Truebill** | Track subscriptions via bank access | Protect payments, respect privacy |
| **Privacy.com** | Issue virtual cards | Track subscriptions, link cards to purpose |
| **Revolut/Wise** | Issue virtual cards with limits | Subscription awareness, purpose-linking |
| **Credit Cards** | Facilitate payments with cashback | Control payments, proactive protection |

**No direct competitor** currently offers subscription-aware virtual cards.

### High-Impact Innovation Opportunities

| Opportunity | Description | Impact | Phase |
|-------------|-------------|--------|-------|
| **Browser Extension** | Auto-create BurnerCards at checkout. User lands on trial page → one-click card creation → auto-fill. | High | Phase 2 |
| **Block Celebration + Gamification** | Confetti animation on block. Achievement badges: "Trial Warrior 🔥", "$100 Saved 💰". Creates emotional investment and sharing. | Medium | Phase 1 |
| **Social Sharing Templates** | Pre-formatted "Klard blocked $X" images ready to post. Every block is a potential viral moment. | High | Phase 1 |
| **Freelancer Expense Cards** | Create a card for each client. Charges auto-tagged. Export for invoicing. Bridges personal → professional. | Medium | Phase 2 |
| **Insurance-Style Metrics** | Market as "charges blocked" not "subscriptions tracked." Positions Klard as protection, not just tracking. | High | Phase 1 |

### Investor-Ready Positioning

**Key Questions Answered:**

| Question | Answer |
|----------|--------|
| **"What if Airwallex raises rates?"** | API abstraction enables 3-6 month migration to Lithic/Stripe. Moat is subscription data, not card rails. |
| **"How do you acquire customers?"** | Viral loop via "Klard blocked $X" screenshots. Product designed for shareable moments. Target CAC: <$30, LTV: $240+. |
| **"Why fund a wallet before trying?"** | Users experience value (subscription tracking) before funding. First card can be $0 limit — proves the concept risk-free. |
| **"$20/mo for subscription management?"** | One blocked $20 charge pays for the month. Average user has 3-4 forgotten subs totaling $50-100/mo. ROI shown in real-time. |
| **"Target users avoid money stuff"** | Quick wins in <60 seconds. Shock discovery via email scanning. Product reduces anxiety, doesn't create work. |
| **"Protection is a grudge purchase"** | Reframe as CONTROL, not fear. "Subscribe fearlessly" is empowering. Block notifications are wins to celebrate. |

**Path to $10M ARR:**

| Milestone | Calculation | Timeline |
|-----------|-------------|----------|
| $284K ARR | 1,500 paying users × $16/mo avg | Month 12 |
| $1M ARR | 5,000 paying users × $17/mo avg | Month 18 |
| $3M ARR | 15,000 paying users × $17/mo avg | Month 24 |
| $10M ARR | 42,000 paying users × $20/mo avg | Month 36 |

**Addressable Market:** 50M+ subscription-fatigued consumers across CA/US/UK/EU

### Validation Approach

| Hypothesis | Metric | Target |
|------------|--------|--------|
| Users want payment control | % creating BurnerCards | ≥70% of Saver+ |
| Subscription-linked cards valued | % linking cards to subscriptions | ≥50% of cards |
| Block notifications create advocates | Screenshot sharing rate | Track qualitatively |
| Advanced rules are used | % using N-recurring, category-lock | ≥30% of cards |

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Merchant name matching unreliable** | Primary: Name normalization DB. Fallback: MCC matching (stable). Override: Manual approve. |
| **User confusion about card types** | Contextual defaults ("Signing up for trial? Use Trial Card"), progressive disclosure, clear naming. |
| **Legitimate charges blocked** | Quick-fix notification, learning mode first month, whitelist expansion. |

### Innovation Roadmap

**Phase 1: MVP — Master the Core**

| Deliverable | Success Gate |
|-------------|--------------|
| Core card types (One-Time, Recurring, Category-Locked) | ≥70% card creation rate |
| Subscription-linking | ≥50% of cards linked |
| Block notifications + social sharing | ≥65% first block in 30 days |
| Gamification (badges, celebration) | Engagement tracking |

**Phase 2: Growth — Expand Intelligence + Markets**

| Deliverable | Target Segment |
|-------------|----------------|
| Smart rule suggestions (ML-powered) | All users |
| Predictive blocking ("Trial expires tomorrow") | Power users |
| Family features (parent-created cards for kids) | Family market |
| Freelancer expense cards (per-client tracking) | B2B/solopreneurs |
| Browser extension (auto-fill at checkout) | All users |

**Phase 3: Scale — Platform Foundation**

| Deliverable | Strategic Value |
|-------------|-----------------|
| API access (beta) | Third-party integrations |
| Subscription marketplace ("Cancel X, get 20% off Y") | Revenue + retention |
| Small business features (team cards, budgets) | Higher ARPU segment |
| Price database (anonymized global pricing) | Data moat |

**Phase 4: Ecosystem — Network Effects**

| Deliverable | Competitive Moat |
|-------------|------------------|
| Card-as-a-Service (white-label) | Distribution moat |
| Third-party integrations (cancel concierge, etc.) | Ecosystem lock-in |
| Enterprise IT features (SaaS trial management) | High-value segment |

**Advancement Criteria:** Don't move to next phase until:
- ≥15% trial → paid conversion
- ≥65% first block in 30 days
- ≥80% Month 2-3 retention (paying users)

### Innovation Defensibility

| Moat | How It Compounds |
|------|------------------|
| **Merchant Database** | Every transaction improves billing name → brand mapping |
| **Rule Templates** | Popular combinations become shareable presets |
| **User Lock-In** | Card history, rules, subscription data create switching costs |
| **Brand Association** | "Klard blocked $X" screenshots build category ownership |

---

## Project-Type Specific Requirements

### Hybrid Architecture Overview

Klard operates as a hybrid platform across three project types:

| Type | Implementation | Primary Use Cases |
|------|----------------|-------------------|
| **Web App (PWA)** | Next.js 16 App Router | Dashboard, subscription management, marketing |
| **Mobile App** | React Native + Expo 54 | On-the-go card management, notifications |
| **SaaS B2B** | Multi-tenant architecture | User isolation, subscription tiers, future team features |

### Platform Roles & Responsibilities

Both platforms provide a **complete experience** — users may prefer one exclusively:

| Platform | Optimized For | Key Strengths |
|----------|---------------|---------------|
| **Web (Desktop)** | Extended sessions | Large screen analytics, bulk actions, complex workflows |
| **Mobile** | On-the-go control | Push notifications, biometrics, instant actions, portability |

**Design Principle:** Neither platform is "lite." A mobile-only user must have full functionality. A web-only user must have full functionality. Platform choice is user preference, not feature gating.

**Feature Parity Policy:**

| Feature | Web | Mobile | Notes |
|---------|-----|--------|-------|
| Subscription CRUD | ✅ Full | ✅ Full | Core feature on both |
| BurnerCard creation | ✅ Full | ✅ Full | Core feature on both |
| Card rules editing | ✅ Full | ✅ Full | All rule types available |
| Analytics dashboard | ✅ Full | ✅ Full | Mobile-optimized charts |
| Email scanning setup | ✅ Full | ✅ Full | OAuth via in-app browser |
| Block notifications | ✅ WebSocket | ✅ Push | Platform-appropriate delivery |
| Cancellation guides | ✅ Full (200+ pages) | ✅ Full | In-app WebView or deep link |
| Biometric auth | ✅ Passkey | ✅ Face ID/Touch ID | Platform-native biometrics |
| Shareable block images | ✅ Full | ✅ Full | Pre-formatted viral screenshots |

**Clipboard Integration (Mobile):**
- One-tap copy card number to clipboard for external checkout flows
- Deep link support: `klard://card/copy/{card_id}` for automation
- Share sheet integration for card details (masked)

### Web Application Architecture

**Rendering Strategy:**

| Page Type | Rendering | SEO | Rationale |
|-----------|-----------|-----|-----------|
| Landing page | SSR | ✅ Required | Acquisition, search ranking |
| Pricing page | SSR | ✅ Required | Conversion, comparison shopping |
| Cancellation pages (200+) | SSR | ✅ Required | Search traffic for "cancel [service]" — see Content Strategy below |
| Blog/content | SSR | ✅ Required | Organic traffic |
| Auth flows | Server Components | ❌ N/A | Security, no indexing needed |
| Dashboard | CSR (SPA) | ❌ N/A | Authenticated, dynamic data |
| Settings/account | CSR (SPA) | ❌ N/A | Authenticated |

**Browser Support Matrix:**

| Browser | Minimum Version | Notes |
|---------|-----------------|-------|
| Chrome | Last 2 versions | Primary target |
| Firefox | Last 2 versions | Full support |
| Safari | 15.4+ | Modern CSS features required |
| Edge | Last 2 versions | Chromium-based |
| IE11 | ❌ Not supported | No legacy browser support |
| Mobile Safari | 15.4+ | iOS PWA support |
| Mobile Chrome | Last 2 versions | Android primary |

**Cancellation Pages Content Strategy:**

| Phase | Scope | Content Source |
|-------|-------|----------------|
| **MVP** | Top 50 services | Manual writing + editorial review |
| **Phase 2** | 200+ services | AI-generated from template + human review |

**Content Structure:** Each cancellation page contains:
1. Step-by-step cancellation instructions (service-specific)
2. Direct cancellation link (when available)
3. "Track this subscription with Klard" CTA
4. Related services suggestions

**Implementation:** 200+ links stored in repository data file (JSON/YAML), rendered via dynamic routes.

**Real-Time Features:**

| Event Type | Delivery Method | Latency Target |
|------------|-----------------|----------------|
| Blocked charges | WebSocket (primary) | <1 second |
| Wallet balance changes | WebSocket (primary) | <1 second |
| Card authorization events | WebSocket (primary) | <1 second |
| New subscriptions (email scan) | Polling/refetch | <30 seconds |
| Price increase alerts | Polling/refetch | <60 seconds |
| Renewal reminders | Polling/refetch | <60 seconds |

**WebSocket Security Requirements:**

| Requirement | Implementation |
|-------------|----------------|
| **Transport** | TLS 1.3 (WSS only, no WS) |
| **Authentication** | JWT token in connection handshake |
| **Session binding** | WebSocket tied to session ID |
| **Reconnection** | Exponential backoff (1s, 2s, 4s, max 30s) |
| **Fallback** | SSE if WebSocket blocked by corporate firewall |
| **Heartbeat** | Ping every 30s, disconnect after 3 missed pongs |
| **Rate limiting** | Max 100 messages/minute per connection |

### Accessibility Requirements (WCAG 2.2 AA)

**Compliance Target:** WCAG 2.2 Level AA (current standard)

**Regulatory Context (2025-2026):**

| Regulation | Status | Requirement |
|------------|--------|-------------|
| **European Accessibility Act (EAA)** | In force June 28, 2025 | WCAG 2.1 AA mandatory for EU markets |
| **ADA Title III (US)** | Active enforcement | WCAG 2.1 AA as legal benchmark |
| **DOJ Final Rule (2024)** | Codified | WCAG 2.1 AA for Title II entities |

**Industry Reality (2025):**
- Only 31% of Europe's largest fintechs fully meet basic WCAG requirements
- 71% of users with disabilities abandon inaccessible websites
- 97% of ADA lawsuits target website accessibility issues
- 15% of global population has disabilities — accessibility expands market reach

**Core Accessibility Features:**

| Feature | Requirement | Priority |
|---------|-------------|----------|
| **Color contrast** | Teal (#15B5B0) on dark (#0F172A) verified 4.5:1 minimum | P0 |
| **Keyboard navigation** | All card management actions keyboard-accessible | P0 |
| **Focus states** | Visible focus indicators throughout | P0 |
| **Screen reader support** | ARIA labels for savings, balances, card status | P0 |
| **Error messaging** | Plain language, no jargon, clear recovery path | P0 |
| **Touch targets** | Minimum 44x44px for mobile (WCAG 2.2) | P0 |
| **Text scaling** | Support 200% zoom without loss of functionality | P1 |
| **Onboarding accessibility** | Screen reader-friendly first-run experience | P1 |
| **Motion reduction** | Respect prefers-reduced-motion | P0 |
| **Dark mode** | Full dark theme support | P0 |
| **Click targets (web)** | Minimum 32x32px for mouse interactions | P0 |
| **Voice commands** | Basic voice navigation for key actions | Phase 2 |
| **High contrast mode** | Optional high contrast theme | Phase 2 |

### UX Design Standards (2025-2026)

Following current fintech UX trends:

| Trend | Klard Implementation | Rationale |
|-------|---------------------|-----------|
| **Minimalist design** | Clean dashboard, no clutter | 70% of users drop apps with complex navigation |
| **AI personalization** | Smart rule suggestions, spending insights | 25-30% higher retention with AI personalization |
| **Biometric auth** | Face ID/Touch ID for card actions | Security + convenience standard |
| **Microinteractions** | Confetti on block, haptic feedback | Reinforce high-stakes action feedback |
| **Gamification** | Achievement badges, savings milestones | Align rewards with financial goals |
| **Data visualization** | Spend charts, category breakdowns | Turn complex data into clarity |
| **Cross-platform consistency** | Shared design system web/mobile | 89% would switch for better UX |

### Mobile Application Requirements

**Platform Support:**

| Platform | Target | Minimum Version |
|----------|--------|-----------------|
| iOS | React Native via Expo | iOS 15+ |
| Android | React Native via Expo | Android 10+ (API 29) |

**Offline Mode Behavior:**

| Feature | Offline Behavior | Sync Strategy |
|---------|------------------|---------------|
| View subscriptions | ✅ Cached locally | Background sync on reconnect |
| View cards | ❌ Online required | Security-first: cards require real-time verification |
| View wallet balance | ✅ Cached with stale indicator | Immediate refresh on reconnect |
| View internal calendar | ✅ Cached locally | Refresh on reconnect |
| Create card | ❌ Online required | Clear "No connection" message |
| Lock/unlock card | ❌ Online required | Clear "No connection" message |
| Add subscription | ⏳ Queued for sync | Process queue on reconnect |

**Offline Card Message:** "🔒 Card details require a secure connection to ensure your protection is current."

**Push Notification Strategy:**

| Event | Priority | Timing | Sound/Haptic |
|-------|----------|--------|--------------|
| **Blocked charge** | Critical | Immediate | Yes (haptic) |
| **Renewal reminder (72h)** | High | 72 hours before | Default |
| **Low balance warning** | High | When balance <$10 | Default |
| **Trial ending tomorrow** | High | 24 hours before | Default |
| **Price increase detected** | Medium | On detection | Silent |
| **Weekly digest** | Low | Sunday 9am local | Silent |

**Device Feature Integration:**

| Feature | Implementation | Phase |
|---------|----------------|-------|
| **Biometrics** | App unlock + card actions | MVP |
| **Haptic feedback** | Blocked charge celebration | MVP |
| **Secure enclave** | Store sensitive tokens | MVP |
| **Camera** | Receipt scanning | Phase 2 |
| **Widgets** | Balance + next renewal | Phase 2 |

### Calendar Features

**MVP: Internal Calendar View**

| Feature | Description |
|---------|-------------|
| Renewal calendar | Visual calendar showing upcoming renewals |
| Trial expiry markers | Countdown badges for trial endings |
| Payment history | Past charge dates on calendar |
| Reminder scheduling | Set custom reminder dates |

**Phase 2: External Calendar Integration**

| Integration | Feature |
|-------------|---------|
| **Google Calendar** | Sync renewal dates as calendar events |
| **Apple Calendar** | iOS native calendar integration |
| **Outlook** | Microsoft calendar sync |
| **Export (ICS)** | Download calendar file for any app |

### SaaS Architecture Requirements

**Multi-Tenant Model:**

| Aspect | MVP Implementation | Future (Phase 3+) |
|--------|-------------------|-------------------|
| **Isolation level** | User-level (`user_id`) | Organization-level (`org_id`) |
| **Data isolation** | PostgreSQL RLS policies | RLS + team access controls |
| **Query scoping** | Automatic via auth context | Team member permissions |

**Integration Architecture:**

| Integration | Purpose | Phase |
|-------------|---------|-------|
| **Airwallex** | Card issuing (primary) | MVP |
| **Stripe** | Wallet funding, billing (including Apple Pay, Google Pay) | MVP |
| **SendGrid/Postmark** | Transactional email | MVP |
| **Twilio** | SMS (2FA, alerts) | MVP |
| **LLM Service** | Email receipt parsing | MVP |
| **Sentry** | Error monitoring | MVP |
| **PostHog** | Product analytics | MVP |
| **Google Calendar** | Renewal sync | Phase 2 |
| **Apple Calendar** | iOS calendar sync | Phase 2 |
| **QuickBooks/Xero** | Agency expense export | Phase 3 |

**Explicitly Excluded (Privacy-First):**

| Integration | Reason |
|-------------|--------|
| Plaid/Yodlee | No bank access — core differentiator |

### Performance Targets

**Web Application:**

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** | <2.5s | Core Web Vitals |
| **FID** | <100ms | Core Web Vitals |
| **CLS** | <0.1 | Core Web Vitals |
| **Dashboard load (≤50 subs)** | <1s | Custom metric |
| **Card creation** | <3s | Custom metric |

**Mobile Application:**

| Metric | Target |
|--------|--------|
| **Cold start** | <2s |
| **Hot start** | <500ms |
| **Card action response** | <1s |
| **Dashboard load (≤50 subs)** | <1.5s |

### Caching Strategy

**Redis Caching Architecture:**

**MVP Critical (P0):**

| Cache Type | Data | TTL | Invalidation |
|------------|------|-----|--------------|
| **Session cache** | Active user sessions | 5 minutes | On logout, password change |
| **Card rules** | Pre-compiled authorization rules | Until rule change | On rule edit |
| **Rate limits** | API call counts per user | 1 minute sliding window | Auto-expire |

**Phase 2 Optimization:**

| Cache Type | Data | TTL | Invalidation |
|------------|------|-----|--------------|
| **Subscription list** | User's subscription data | 60 seconds | On add/edit/delete |
| **Wallet balance** | Current balance | 30 seconds | On any transaction |
| **Feature flags** | Platform-wide settings | 5 minutes | On admin change |
| **Merchant mappings** | Billing name → brand | 24 hours | On data update |

**Cache Benefits:**
- Card authorization: Pre-compiled rules enable 1000-1200ms latency target
- Rate limiting: Redis-based counters prevent abuse
- Session management: Fast session validation without database hits
- Phase 2 caches improve dashboard load time and reduce database pressure

### Biometric Authentication Equivalence

| Platform | Primary Method | Fallback | High-Security Fallback |
|----------|----------------|----------|------------------------|
| **Mobile (iOS)** | Face ID | Touch ID | TOTP 2FA |
| **Mobile (Android)** | Fingerprint | Face unlock | TOTP 2FA |
| **Web (Desktop)** | Passkey (WebAuthn) | — | TOTP 2FA |
| **Web (Mobile Browser)** | Passkey (device biometric) | — | TOTP 2FA |

**Notes:**
- Passkeys on web use device biometrics (Touch ID, Face ID, Windows Hello)
- All platforms support TOTP 2FA as universal fallback
- Mobile app confirmation available as additional factor for high-risk operations

---

## Functional Requirements

This section defines THE CAPABILITY CONTRACT for the entire product. Every feature must trace back to one of these requirements. UX designers will ONLY design interactions for these capabilities. Architects will ONLY build systems to support these capabilities.

**Total: 117 Functional Requirements** across 17 capability areas.

### User Authentication & Security

- **FR1:** Users can create accounts using email/password
- **FR2:** Users can authenticate via OAuth providers (Google, GitHub, Apple)
- **FR3:** Users can authenticate via Passkey (WebAuthn)
- **FR4:** Users can enable biometric authentication (Face ID, Touch ID) on mobile
- **FR5:** Users can configure 2FA/Passkey requirements for sensitive operations
- **FR6:** Users can designate trusted devices (up to 3) with reduced 2FA prompts
- **FR7:** Users can view and revoke active sessions across devices
- **FR8:** System can detect new device logins and trigger re-verification

### Subscription Management

- **FR9:** Users can manually add subscriptions with name, price, renewal date, and category
- **FR10:** Users can edit subscription details after creation
- **FR11:** Users can delete subscriptions from their dashboard
- **FR12:** Users can view all subscriptions in a consolidated dashboard
- **FR13:** Users can filter subscriptions by category, status, or health indicators
- **FR14:** System can display subscription health indicators (unused, price increased, cancellation pending)
- **FR15:** Users can mark subscriptions as "Unused" or "Cancellation Pending"
- **FR16:** Users can connect email accounts for optional AI-powered subscription discovery (one of multiple import methods; see FR112-FR113)
- **FR17:** System can parse email receipts to auto-discover subscriptions
- **FR18:** Users can approve or reject auto-discovered subscriptions
- **FR112:** Users can import subscriptions via CSV upload (template provided)
- **FR113:** Users can import subscriptions via invoice/receipt photo upload with AI extraction (no image data stored after extraction)

### Onboarding & First-Time Experience

- **FR19:** Users can select from popular subscription suggestions during onboarding
- **FR20:** Users can view guided prompts when dashboard has no subscriptions
- **FR108:** Users can create and configure BurnerCard *configurations* (demo cards) before completing KYC. Demo cards are Klard-side configurations only — no real Airwallex card exists until KYC is complete. Demo cards display: card name, type, limits, rules, linked subscription, and fully masked PAN (`**** **** **** ****`). Status shows "Awaiting Activation" with CTA to trigger KYC flow. Upon KYC completion, Klard creates real Airwallex card with user's pre-configured rules.
- **FR109:** System uses progressive disclosure onboarding — instant value (dashboard) before commitment (KYC/funding)
- **FR110:** System frames KYC as 'activation' moment, not barrier ("Let's activate your protection")

### BurnerCard Management

- **FR21:** Users can create One-Time BurnerCards (auto-lock after first charge)
- **FR22:** Users can create Recurring BurnerCards (allow multiple charges)
- **FR23:** Users can create Category-Locked BurnerCards (restrict to specific MCC categories)
- **FR24:** Users can create general BurnerCards not linked to any subscription (free use). All card rules (merchant lock, spending limit, category, expiration) are OPTIONAL — users can create "open cards" with no restrictions.
- **FR114:** Users can create Open BurnerCards with NO restrictions (no merchant lock, no limit, no category, no expiration). Rules are optional enhancements that can be added later.
- **FR25:** Users can set spending limits on BurnerCards
- **FR26:** Users can set expiration dates on BurnerCards
- **FR27:** Users can link BurnerCards to specific subscriptions
- **FR28:** Users can configure BurnerCards for N-recurring charges (e.g., "3 months only")
- **FR29:** Users can configure amount tolerance for amount-locked cards
- **FR30:** Users can compose multiple rules on a single card (one-time + limit + expiration)
- **FR31:** Users can manually lock/unlock BurnerCards
- **FR32:** Users can view BurnerCard transaction history
- **FR33:** Users can view complete card details including linked subscription and active rules
- **FR34:** Users can delete BurnerCards
- **FR35:** Users can copy card numbers to clipboard (mobile one-tap, web standard copy)
- **FR36:** System displays full card numbers via secure iframe (PCI-compliant display)
- **FR37:** Users can initiate a test transaction via sandbox merchant to verify card functionality (no balance impact)

### Payment Authorization & Protection

- **FR38:** System can receive real-time authorization requests via webhook
- **FR39:** System can evaluate card rules against incoming transactions within 1200ms internal latency
- **FR40:** System can approve or decline transactions based on user-defined rules
- **FR41:** System can detect merchant mismatch (card linked to Sub A, charge from Merchant B)
- **FR42:** System can auto-decline mismatched merchant transactions
- **FR43:** Users receive real-time notifications for blocked charges
- **FR44:** Users receive notifications for approved charges
- **FR45:** System can queue authorization decisions during temporary service degradation

### Merchant Rules

- **FR46:** Users can configure auto-accept rules for specific merchants (whitelist)

### Wallet & Funding

- **FR47:** Users can view wallet balance in dashboard
- **FR48:** Users can view wallet balance in their preferred currency
- **FR49:** Users can add funds via Stripe (credit/debit card)
- **FR50:** Users can add funds via Apple Pay (where supported)
- **FR51:** Users can add funds via Google Pay (where supported)
- **FR52:** System applies deposit hold periods based on amount tier and user verification status
- **FR53:** Users can view funding transaction history
- **FR54:** System can refund wallet balances to original funding source (account closure, estate claims)

### Notifications & Reminders

- **FR55:** Users can configure renewal reminders (72h, 7 days, custom)
- **FR56:** Users receive push notifications for blocked charges (mobile)
- **FR57:** Users receive WebSocket real-time notifications for blocked charges (web)
- **FR58:** Users receive block reason in blocked charge notifications
- **FR59:** Users receive low balance warnings when wallet drops below threshold
- **FR60:** Users receive trial expiration reminders (24 hours before)
- **FR61:** Users receive price increase notifications when detected
- **FR62:** Users can act on price increase alerts (view details, access cancel link, dismiss)
- **FR63:** Users receive weekly digest emails with savings summary
- **FR111:** Weekly digests include ROI visibility: 'Klard blocked $X this month vs $Y subscription cost'

### Intelligent Alerts & Prompts

- **FR64:** System prompts users when adding a subscription to either use an existing general BurnerCard OR create a dedicated BurnerCard for that subscription
- **FR65:** System alerts users when a charge date differs significantly from tracked renewal date
- **FR66:** System can detect potential duplicate subscriptions and alert user

### Analytics & Insights

- **FR67:** Users can view total spending by category
- **FR68:** Users can view spending trends over time
- **FR69:** Users can view cumulative savings counter
- **FR70:** Users can view total blocked value (sum of all blocked charges)
- **FR71:** Users can view upcoming renewals in internal calendar view

### Cancellation Support

- **FR72:** Users can access cancellation links/guides for tracked subscriptions
- **FR73:** Users can view step-by-step cancellation instructions for supported services
- **FR74:** Users can report cancellation issues (e.g., "required phone call")
- **FR75:** Users can mark subscriptions as cancelled (completed) with date
- **FR76:** Users can view cancelled subscription history and total savings
- **FR77:** System provides 50 manually-curated cancellation pages (MVP)

### Sharing & Social

- **FR78:** Users can generate shareable block celebration images ("Klard blocked $X")
- **FR79:** Users can share savings achievements via native share sheet (mobile)
- **FR80:** Users can view and earn achievement badges (Trial Warrior, $100 Saved, etc.)
- **FR115:** Users can anonymize merchant names in shareable block celebration images (option: "Blocked $X from [Hidden]") for privacy

### Account Management

- **FR81:** Users can view and edit profile information
- **FR82:** Users can change email address (with 2FA verification)
- **FR83:** Users can change password (with 2FA verification)
- **FR84:** Users can delete account (with 2FA verification, funds returned)
- **FR85:** Users can export all personal data as JSON (GDPR right to access)
- **FR86:** Users can view subscription tier (Pro, Saver+) and manage billing
- **FR87:** Users can upgrade from Pro (free) to Saver+ (paid)
- **FR88:** Users can cancel Saver+ subscription (downgrade to Pro)

### Search & Navigation

- **FR89:** Users can search subscriptions, cards, and transactions
- **FR90:** Users can sort subscriptions by amount, date, renewal, or name
- **FR91:** Users can add notes or tags to subscriptions

### Platform & Accessibility

- **FR92:** Users can access all features via web application
- **FR93:** Users can access all features via mobile application (iOS/Android)
- **FR94:** System provides keyboard navigation for all card management actions
- **FR95:** System provides dark mode theme option
- **FR96:** System respects prefers-reduced-motion preference
- **FR97:** Users can view cached subscription data while offline (mobile). Card data is NOT cached offline for security — cards require real-time connection to ensure protection status is current.

### System Status & Resilience

- **FR98:** Users can view a status banner when core services are temporarily unavailable

### Help & Support Access

- **FR99:** Users can access help documentation and FAQ
- **FR100:** Users can contact support directly from the application

### Administrative & Support

- **FR101:** Support agents can view user subscriptions (limited access) to assist with issues
- **FR102:** Support agents can trigger card resets for troubleshooting
- **FR103:** System provides troubleshooting guidance for unexpected declines

### KYC & Compliance

- **FR104:** System allows demo card configuration WITHOUT KYC. KYC is triggered when user attempts to REVEAL real card details (inline, Wise-style). Demo cards show "Awaiting Activation" with ~2-3 minute inline KYC flow.
- **FR105:** System passes KYC data to Airwallex for identity verification
- **FR106:** System enforces new account deposit limits ($100 total in first 7 days)
- **FR107:** System performs daily ledger reconciliation against Airwallex balances
- **FR116:** System uses deferred/triggered KYC (Wise-style): KYC only required when user attempts to USE card details, not when configuring demo cards
- **FR117:** Cards can block charges WITHOUT wallet funding. Funding is only required when user wants to PAY for subscriptions through a BurnerCard. Blocking works independently of wallet balance.

---

### Phase 2 Capabilities (Noted for Future)

The following capabilities were identified during FR elicitation but explicitly deferred:

| Capability | Rationale |
|------------|-----------|
| Notification preferences (channels, frequency, quiet hours) | Post-MVP UX enhancement |
| Auto-top-up for wallet | Convenience feature |
| Login history with device/location | Security enhancement |
| Data deletion confirmation receipt | Compliance enhancement |
| Vacation mode: pause/freeze all/selected cards | Power user feature |
| General status page (status.klard.com) | Infrastructure feature |
| Alternative subscription suggestions on price alerts | Requires partnerships |
| Shareable monthly/annual savings reports | Growth feature |
| Browser extension / auto-fill | Distribution feature |
| Duplicate subscription merge capability | UX enhancement (detection only in MVP) |
| Multi-currency wallet holdings | Fintech complexity |

---

## Non-Functional Requirements

This section defines HOW WELL the system must perform. NFRs specify quality attributes like performance, security, scalability, reliability, and observability. All requirements are tiered by priority:

- **P0 (MVP-Blocking):** Must have for launch — security, core performance, legal compliance
- **P1 (Launch-Day):** Should have — full UX, accessibility, resilience
- **P2 (Post-Launch):** Nice to have — operational maturity, scale readiness

**Total: 90 Non-Functional Requirements** across 11 categories.

---

### P0 — MVP-Blocking Requirements (29)

*Cannot launch without these. Security, core performance, legal compliance.*

#### Performance (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR1** | Card authorization internal processing | ≤1200ms | 95th percentile, production logs |
| **NFR2** | Dashboard load time (≤50 subscriptions) | ≤1s | Core Web Vitals, RUM |
| **NFR3** | Card creation end-to-end | ≤3s | User-facing timer |

#### Security (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR10** | All connections use TLS 1.3 | 100% | SSL Labs A+ rating |
| **NFR11** | Data encryption at rest | AES-256 | AWS RDS encryption |
| **NFR12** | PAN (card numbers) never stored | 0 PANs in any log or database | Security audit |
| **NFR13** | 2FA/Passkey for sensitive operations | 100% enforcement | Auth flow audit |
| **NFR14** | Session invalidation on password/email change | Immediate | Security testing |
| **NFR15** | Rate limiting per user | 10 API calls/minute max | Redis counter verification |
| **NFR16** | Input validation (OWASP Top 10) | 100% coverage | Penetration test |
| **NFR17** | Row-level security (user data isolation) | PostgreSQL RLS enforced | Database audit |
| **NFR62** | Unauthenticated endpoint rate limits | Login: 5/min, Registration: 10/min, Password reset: 3/min | Rate limit testing |
| **NFR63** | Session invalidation on email change | Immediate (in addition to password change) | Security testing |
| **NFR66** | CSP headers on all pages | Strict policy, Airwallex iframe allowlisted | Security headers audit |
| **NFR67** | Webhook signature verification | All Airwallex webhooks verified | Integration testing |
| **NFR86** | No user enumeration in auth errors | Consistent error messages for invalid user/wrong password | Security testing |
| **NFR87** | CSP allowlist for Airwallex iframe | Specific domains allowlisted | CSP policy review |

#### Reliability (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR20** | API uptime | 99.95% (≤22 min/month downtime) | Monitoring (BetterStack) |
| **NFR21** | Webhook processing success rate | 99.9% of webhooks received | Webhook logs |
| **NFR22** | Data durability | Zero transaction loss | Ledger audit |

#### Scalability (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR31** | Redis caching for card rules | Pre-compiled rules for auth latency | Cache hit rate |

#### Observability (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR42** | Product analytics tracking | All user events via PostHog | Event coverage audit |
| **NFR43** | Error monitoring | All exceptions captured via Sentry | Error coverage audit |
| **NFR44** | Audit logging for regulatory compliance | 7-year retention, immutable | Log storage verification |

#### Compliance (P0)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR54** | GDPR Right to Access | JSON export available | Feature testing |
| **NFR55** | GDPR Right to Deletion | Anonymize + delete within 30 days | Process audit |
| **NFR56** | GDPR breach notification | ≤72 hours (target 48 hours) | Incident response plan |
| **NFR61** | PCI-DSS scope | SAQ A (minimal scope via iframe) | PCI assessment |
| **NFR90** | Email scanning privacy | No email content stored; read-once extraction only; OAuth scope transparency required before connection | Privacy audit |

---

### P1 — Launch-Day Requirements (40)

*Strongly expected for professional product. Ship with these if at all possible.*

#### Performance (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR4** | LCP (Largest Contentful Paint) | ≤2.5s | Core Web Vitals |
| **NFR5** | FID (First Input Delay) | ≤100ms | Core Web Vitals |
| **NFR6** | CLS (Cumulative Layout Shift) | ≤0.1 | Core Web Vitals |
| **NFR7** | Mobile cold start | ≤2s | App launch timing |
| **NFR8** | Mobile hot start | ≤500ms | App resume timing |
| **NFR9** | WebSocket message delivery | ≤1s | Block notification latency |
| **NFR73** | Database query time for card rules | ≤200ms at 95th percentile | Database monitoring |
| **NFR74** | Time to Interactive (TTI) | ≤3s for dashboard | Performance testing |
| **NFR75** | Initial JavaScript bundle | ≤200KB gzipped | Build metrics |
| **NFR85** | Cold cache latency | ≤3s for first request after deploy | Performance testing |

#### Security (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR18** | Device fingerprinting for fraud prevention | Enabled with GDPR disclosure | Privacy policy review |
| **NFR19** | Secrets management | Environment variables, no hardcoded secrets | Code scan |
| **NFR64** | CORS policy | Restrict API access to known domains | Security headers audit |

#### Reliability (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR23** | Database point-in-time recovery | 7-day window | AWS RDS configuration |
| **NFR24** | Airwallex health check frequency | Every 60 seconds | Monitoring |
| **NFR25** | Graceful degradation during Airwallex outage | Queue requests, show status banner | Integration testing |
| **NFR26** | Webhook retry on failure | 3 attempts with exponential backoff | Webhook logs |
| **NFR27** | WebSocket reconnection | Exponential backoff (1s, 2s, 4s, max 30s) | Client testing |

#### Scalability (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR28** | Concurrent users supported (MVP) | 1,000 simultaneous | Load testing |
| **NFR29** | Subscriptions per user (dashboard perf) | ≤100 without degradation | Performance testing |
| **NFR30** | Database connection pooling | Prevent exhaustion under load | Connection monitoring |

#### Accessibility (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR33** | WCAG compliance level | 2.2 AA | Accessibility audit |
| **NFR34** | Color contrast (teal on dark) | ≥4.5:1 ratio | Contrast checker |
| **NFR35** | Keyboard navigation | All card management actions accessible | Manual testing |
| **NFR36** | Focus indicators | Visible on all interactive elements | Visual audit |
| **NFR37** | Screen reader support | ARIA labels for savings, balances, card status | Screen reader testing |
| **NFR38** | Touch targets (mobile) | Minimum 44x44px | Design review |
| **NFR39** | Click targets (web) | Minimum 32x32px | Design review |
| **NFR40** | Motion reduction | Respect prefers-reduced-motion | CSS audit |

#### Observability (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR45** | Structured JSON logging | All auditable events | Log format review |
| **NFR46** | Ledger reconciliation frequency | Daily minimum, hourly if API allows | Reconciliation logs |
| **NFR47** | Anomaly detection | Balance changes >$100 without funding event | Alert configuration |

#### Integration (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR49** | Airwallex API abstraction | Decoupled from Airwallex-specific calls | Code review |
| **NFR51** | Stripe integration reliability | Payment processing success rate ≥99.9% | Stripe dashboard |

#### Compliance (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR57** | Data retention (transactions) | 7 years | Storage policy |
| **NFR58** | Data retention (access logs) | 1 year | Storage policy |
| **NFR81** | Localization support | i18n infrastructure (EN) in MVP, FR translation Phase 2 | Feature testing |

#### Infrastructure (P1)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR68** | WAF with OWASP Core Rule Set | Enabled via Cloudflare | WAF configuration |
| **NFR70** | Multi-AZ deployment | Database and application | AWS configuration |
| **NFR71** | Zero-downtime deployments | With ≤5 minute rollback capability | Deployment testing |

---

### P2 — Post-Launch Requirements (21)

*Important but can ship shortly after launch. Not blocking.*

#### Performance (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR76** | Quarterly load testing | At 2x current peak capacity (k6/Locust, documented runbook) | Load test reports |

#### Security (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR65** | Secret rotation policy | API keys rotated annually, immediately on compromise | Security audit |

#### Scalability (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR32** | 10x growth capacity | Support 10x user growth with <10% performance degradation | Load testing |

#### Accessibility (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR41** | Text scaling support | 200% zoom without loss of functionality | Browser testing |

#### Observability (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR48** | Admin action logging | Before/after state for all changes | Admin audit trail |
| **NFR88** | Alert fatigue target | <5 false positive anomaly alerts per week | Alert metrics |

#### Integration (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR50** | Card issuer migration capability | 3-6 month migration to alternative | Architecture review |
| **NFR52** | Email provider failover | SendGrid primary, backup available | Integration testing |
| **NFR53** | LLM service timeout | ≤30s for email parsing | Service monitoring |

#### Compliance (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR59** | Marketing consent withdrawal | +3 years retention post-withdrawal | Consent management |
| **NFR60** | Device fingerprinting disclosure | GDPR-compliant privacy policy | Legal review |

#### Infrastructure (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR69** | DDoS mitigation | Via CDN/WAF (Cloudflare) | WAF configuration |
| **NFR72** | Alert delivery | To on-call within 1 minute of anomaly detection | Alert testing |

#### Operations (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR77** | Dependency vulnerability scanning | In CI/CD pipeline | CI/CD logs |
| **NFR78** | Annual penetration testing | Third-party engagement | Pentest report |
| **NFR79** | Quarterly backup restoration testing | Verified restore capability | Backup test logs |
| **NFR80** | Incident response SLA | P1 acknowledgment ≤15 minutes, resolution ≤4 hours | Incident post-mortems |

#### Documentation (P2)

| NFR | Requirement | Target | Measurement |
|-----|-------------|--------|-------------|
| **NFR82** | API versioning | 6-month deprecation notice for breaking changes (Phase 2) | API documentation |
| **NFR83** | OpenAPI specification coverage | 100% of public endpoints | Spec validation |
| **NFR84** | App store compliance | Privacy labels, required disclosures, content rating | Store review |
| **NFR89** | OpenAPI validation in CI | Routes match spec | CI/CD pipeline |

---

### NFR Summary by Category

| Category | P0 | P1 | P2 | Total |
|----------|----|----|----| ------|
| Performance | 3 | 7 | 1 | 11 |
| Security | 11 | 3 | 1 | 15 |
| Reliability | 3 | 5 | 0 | 8 |
| Scalability | 1 | 3 | 1 | 5 |
| Accessibility | 0 | 8 | 1 | 9 |
| Observability | 3 | 3 | 2 | 8 |
| Integration | 0 | 2 | 3 | 5 |
| Compliance | 5 | 3 | 2 | 10 |
| Infrastructure | 0 | 3 | 2 | 5 |
| Operations | 0 | 0 | 4 | 4 |
| Documentation | 0 | 0 | 4 | 4 |
| **Total** | **29** | **40** | **21** | **90** |
