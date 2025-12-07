# Klard Design System

## 1. Introduction

The Klard Design Document defines the complete visual, interaction, and experiential identity of the Klard platform. It serves as the single source of truth for designers, developers, and product teams, ensuring consistent execution across all surfaces — web, PWA, email templates, marketing materials, and future mobile applications.

This expanded version builds on the original document, enriching each section with deeper reasoning, clearer guidance, use cases, structural rules, and product-context alignment. Nothing from the original document is removed; every part is elaborated for clarity and implementation readiness.

Klard’s design foundation is rooted in trust, clarity, privacy, and simplicity. The platform helps users track subscriptions, detect price increases, and shield themselves from unwanted renewals. The design language communicates this mission through strong visual hierarchy, comforting color palettes, refined motion, and interface patterns that reduce cognitive load.

---

## 2. Product Context Summary

Klard is more than a subscription tracker — it is an intelligent financial guardian that brings visibility, automation, and control into users’ digital spending.

To reinforce this identity visually, the design system focuses on four thematic pillars:

### **2.1. Visibility**

Klard surfaces what is often hidden: renewal dates, price changes, and subscription histories. UI choices must reflect transparency — clear typography, structured layouts, smart use of color roles, and consistent iconography.

### **2.2. Protection**

The BurnerCard system gives users defensive power. Visual components must feel secure, stable, and authoritative. Cards, limits, warnings, and rules require strong visual differentiation.

### **2.3. Automation**

Klard reduces manual financial management. Interfaces must feel intuitive and self-operating. Subtle animations signal automation without overwhelming the user.

### **2.4. Savings**

Users interact with the platform to save money. Savings visuals should feel rewarding without being gimmicky — a calm, confident green, subtle glows, and celebratory micro‑copy.

This expanded design document reflects these pillars throughout every rule and enhancement.

---

## 3. Brand Narrative & Tone

Klard’s brand persona blends **professional financial credibility** with **approachable simplicity**. We never overwhelm users with technical jargon, nor do we infantilize them with cartoonish visuals.

### **3.1. Brand Core Values**

- **Privacy-first:** Never accessing banking data is a core selling point.
- **Clarity:** Users get straight answers — no confusing graphs or hidden settings.
- **Control:** Every element should make the user feel in charge.
- **Confidence:** UI should help users feel safe and empowered.

### **3.2. Brand Voice**

The voice is **calm, confident, intelligent, and alert**. Messaging choices mirror security products rather than budgeting apps.

**Examples:**

- “You’re all caught up — no renewals due this week.”
- “A price change was detected. Here’s what changed and what to do next.”
- “Your BurnerCard blocked an unwanted charge.”

### **3.3. UI Writing Guide**

- **Keep copy concise** — 1–2 short sentences maximum.
- **Use action verbs:** Track, Compare, Block, Cancel.
- **Avoid financial anxiety wording:** Never shame users.
- **Highlight value:** “You saved $19.99” is central to the Klard experience.
- **Use consistent terminology:** Subscription, Renewal, Card Rule, Price Change.

---

## 4. Visual Identity Overview

The Klard visual identity is built around a refined teal–navy palette, representing financial trust, stability, and intelligence.

The system supports **two themes**:

- **Light Theme** — bright, trustworthy, modern.
- **Dark Theme** — premium, glassy, glowy, ideal for dashboards.

Both themes share the same structural rules but differ in mood and contrast.

---

## 5. Color System (Expanded)

This section preserves the original tokens and expands with usage guidelines, roles, pairing rules, and accessibility considerations.

### **5.1. Core Color Philosophy**

Klard’s colors are functional — every color communicates meaning:

- Teal tones represent actions and trust.
- Navy tones represent structure and focus.
- Greens represent savings.
- Amber warns, red protects.

Color must guide, not decorate.

### **5.2. Color Tokens — Dark Theme**

*(Full token set preserved exactly and expanded upon.)*

**Primary Colors** — Drive user actions and primary interactions.

- Primary: #15B5B0
- Primary Foreground: #FFFFFF

Used for: CTA buttons, links, highlights, active indicators.

**Secondary Colors** — Reinforce brand identity subtly.

- Secondary: #0D7C7A

Used for: Secondary buttons, hover states, step indicators.

**Accent Colors** — Meaning-driven feedback.

- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

Used sparingly to maintain balance.

**Neutrals** — UI surfaces.

- Background: #0F172A (primary dark)
- Foreground: #F8FAFC (text)
- Muted: #1E293B

Used for layout, containers, cards, and panels.

These tokens ensure a calm, structured dashboard experience.

### **5.3. Color Tokens — Light Theme**

*(Full token set preserved and enhanced.)*

The light theme prioritizes clarity and openness.

Primary: #0D7C7A

Secondary: #15B5B0

Neutrals remain soft — #FFFFFF backgrounds, #F1F5F9 surfaces.

Amber/green/red tones are slightly darker to maintain contrast.

### **5.4. Color Roles by Component**

To reduce guesswork, every UI element has a semantic color mapping:

| Component | Dark Theme | Light Theme |
| --- | --- | --- |
| Primary Button | Primary + Primary Foreground | Primary + White |
| Secondary Button | Secondary | Secondary |
| Card Background | Muted | Surface 1 |
| Popover | Muted | White |
| Input Field | Muted | Near White |
| Border | Slate @ 12% | Slate @ 20% |
| Warning Banner | Amber Glow | Light Amber |
| Savings Widget | Success Green Glow | Success Light Green |

This enforces consistency across designers and engineers.

### **5.5. Accessibility Requirements**

- All text must meet WCAG AA.
- Use color + icon + text for warnings.
- High contrast mode must still work.
- Avoid low-contrast teal on mid-tone backgrounds.

---

## 6. Shadows, Effects & Glow (Expanded)

Klard uses sophisticated shadows and glow effects to reinforce depth and importance.

### **6.1. Glassmorphism**

Klard’s signature card style combines:

- 60% opacity dark surfaces
- Backdrop blur: 12px
- Soft teal glows for active elements

Use glassmorphism only for:

- Cards
- Dashboards
- Modals

Avoid in:

- Long forms
- Tables
- Legal pages

### **6.2. Glow Rules**

- Only primary CTAs may use the teal glow.
- Success glow appears ONLY in savings context.
- Warning glow draws attention to time-sensitive content.

Use glow sparingly to maintain visual calm.

---

## 7. Typography (Expanded)

Typography must maintain precision and clarity.

### **7.1. Typeface**

Recommended: **Inter** or **SF Pro** — geometric, clean, modern.

### **7.2. Type Scale**

Use a consistent 1.25 ratio modular scale:

- Display: 48px
- H1: 32px
- H2: 24px
- H3: 20px
- Body: 16px
- Label: 14px

### **7.3. Weight Rules**

- Display/H1: Semi‑Bold
- Body/Large Body: Regular
- Labels/Overlines: Medium

### **7.4. Readability Guidelines**

- Max line width: 65–75 characters.
- Use 150% line height for body text.
- Keep dashboard text compact.

---

## 8. Spacing & Layout

Spacing governs breathing room, not empty space.

### **8.1. Spacing Scale**

Use a 4/8 spacing grid:

- 4, 8, 12, 16, 24, 32, 40, 48

### **8.2. Layout Rules**

- Use 24–32px padding for major containers.
- Keep cards aligned to an 8px grid.
- Use consistent margins between sections.

### **8.3. Vertical Rhythm**

Header → Subheader → Content → CTA spacing should flow naturally.

---

## 9. Components (Expanded)

This section expands your design system into component-level guidelines.

### **9.1. Buttons**

Three primary variants:

- Primary
- Secondary
- Ghost / Quiet

Rules:

- Minimum touch area: 44px.
- Always include loading states.
- Primary button allowed only once per major view.

### **9.2. Cards**

Core surface for:

- Subscriptions
- Savings metrics
- Price alerts
- BurnerCards

Rules:

- Use subtle shadow or glass effect.
- Use consistent padding: 20–24px.
- Headers must be visually distinct from content.

### **9.3. Tables & Lists**

For subscription listings:

- Use alternating background for readability.
- Include badges: Active / Cancelled / Blocked / Trial.
- Right-align prices.

### **9.4. Forms & Inputs**

Form fields must feel calm and predictable.

Rules:

- Use muted backgrounds.
- On focus, show teal ring.
- Include helper text for cancellation URLs.

---

## 10. Interaction & Motion

Motion enhances clarity — never decoration.

### **10.1. Motion Principles**

- **Purposeful:** Motion indicates cause‑and‑effect.
- **Calm:** Avoid bouncy or chaotic transitions.
- **Consistent:** Same animation curve across components.

### **10.2. Recommended Curves**

- Default: ease-in-out
- Popover: ease-out
- Dismissal: ease-in

### **10.3. Duration Rules**

- Fast: 150ms
- Normal: 300ms

Avoid long animations in financial contexts.

---

## 11. Patterns (Expanded)

### **11.1. Dashboard Layout**

A standard Klard dashboard includes:

- Savings summary at top
- Active subscriptions list
- Upcoming renewals sidebar
- Price alerts component

### **11.2. Alerts Center**

Alerts are grouped into:

- Renewal Alerts
- Price Changes
- Card Events

Icons + color-coded banners improve scanning.

### **11.3. BurnerCard Setup Flow**

The flow must:

- Be short (max 3 steps)
- Explain rules visually
- Emphasize protection

---

## 12. Accessibility (Expanded)

Klard must accommodate all users.

Guidelines:

- Define aria-labels for every icon-only button.
- Maintain focus states with teal ring.
- Respect `prefers-reduced-motion`.
- Use descriptive alt text for savings charts.

---

## 13. UX Writing Microcopy Library

Examples for consistency:

- **Renewal Alert:** “Your renewal is coming up in 3 days.”
- **Price Increase:** “This service just got more expensive.”
- **Savings:** “You saved $12.99 — blocked renewal.”
- **BurnerCard:** “Your card is now locked after one use.”

---

## 14. UI Kit (Merged, Expanded)

Your UI Kit includes specifications for:

### **14.1. Component Library**

- Buttons
- Cards
- Inputs
- Tables
- Tags/Badges
- Modals
- Navigation Bars
- Empty States

### **14.2. Iconography**

Use a consistent icon set (Lucide or Heroicons recommended).

### **14.3. Chart Styles**

Use soft gradients + minimal axes.

### **14.4. Illustrations**

Use abstract geometric shapes with teal highlights.

---
Here are some links to the expanded documents:

[Klard Design System - Light Theme Colors & Effects.md](Klard%20Design%20System%20-%20Light%20Theme%20Colors%20%26%20Effects.md)

[Klard Design System - Dark Theme Colors & Effects.md](Klard%20Design%20System%20-%20Dark%20Theme%20Colors%20%26%20Effects.md)