# Klard Design System - Dark Theme Colors & Effects

> **Note:** Dark theme is preferred by power users and dashboard-heavy workflows. Celebration screens (block notifications, milestone achievements, shareable reports) render in the user's chosen theme. Dark theme celebrations feature enhanced glow effects that make teal/green colors pop.

## Colors

### Primary Colors
- **Primary Color:** #15B5B0 (Vibrant Teal)
- **Primary Foreground:** #FFFFFF (White)

### Secondary Colors
- **Secondary Color:** #0D7C7A (Deep Teal)
- **Secondary Foreground:** #F8FAFC (Near White)

### Accent Colors
- **Accent Success:** #10B981 (Savings Green) — Also used for **Block Celebrations**
- **Accent Warning:** #F59E0B (Alert Amber)
- **Accent Error:** #EF4444 (Critical Coral) — **Actual failures only, NEVER for blocked charges**
- **Accent Foreground:** #FFFFFF (White)

### Block Celebration Colors (NEW)
- **Block Success:** #10B981 (Savings Green) with enhanced glow
- **Block Success Glow:** rgba(16, 185, 129, 0.35) — 35% opacity, increased from standard 25%
- **Alternate Block Color:** #15B5B0 (Primary Teal) for variety
- **Confetti Colors:** #10B981, #15B5B0, #F59E0B (green, teal, gold)

### Neutral Colors
- **Background:** #0F172A (Dark Navy)
- **Foreground:** #F8FAFC (Near White)
- **Muted:** #1E293B (Elevated Navy)
- **Muted Foreground:** #94A3B8 (Slate Gray)

### Card Colors
- **Card Background:** #1E293B (Elevated Navy)
- **Card Foreground:** #F8FAFC (Near White)
- **Popover Background:** #1E293B (Elevated Navy)
- **Popover Foreground:** #F8FAFC (Near White)

### Border & Input Colors
- **Border:** rgba(148, 163, 184, 0.12) (Slate with 12% opacity)
- **Input:** #1E293B (Elevated Navy)
- **Ring:** #15B5B0 (Vibrant Teal)

### Destructive Colors
- **Destructive:** #EF4444 (Critical Coral)
- **Destructive Foreground:** #FFFFFF (White)

---

## Border Radius & Effects

### Radius
- **Small:** 8px
- **Default:** 12px
- **Medium:** 16px
- **Large:** 24px
- **Full:** 9999px (Pill shape)

### Shadows
- **Shadow Color:** rgba(0, 0, 0, 0.5)

### Effects

#### Small Shadow (Cards on rest state)
- **X Position:** 0px
- **Y Position:** 2px
- **Blur:** 8px
- **Spread:** 0px
- **Color:** rgba(0, 0, 0, 0.1)

#### Medium Shadow (Cards on hover)
- **X Position:** 0px
- **Y Position:** 8px
- **Blur:** 24px
- **Spread:** 0px
- **Color:** rgba(0, 0, 0, 0.15)

#### Large Shadow (Elevated elements)
- **X Position:** 0px
- **Y Position:** 16px
- **Blur:** 48px
- **Spread:** 0px
- **Color:** rgba(0, 0, 0, 0.2)

#### Teal Glow Effect (Primary CTA buttons)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 24px
- **Spread:** 0px
- **Color:** rgba(21, 181, 176, 0.35)

#### Green Success Glow (Savings indicators)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 16px
- **Spread:** 0px
- **Color:** rgba(16, 185, 129, 0.25)

#### Block Celebration Glow (Block notifications) — NEW
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 24px
- **Spread:** 4px
- **Color:** rgba(16, 185, 129, 0.35)
- **Animation:** Pulse on block event (0.8s ease-in-out)
- **Usage:** Block success notifications, milestone achievements

#### Amber Warning Glow (Alert states)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 16px
- **Spread:** 0px
- **Color:** rgba(245, 158, 11, 0.25)

#### Glassmorphism Effect (Cards and panels)
- **Background:** rgba(30, 41, 59, 0.6)
- **Backdrop Blur:** 12px
- **Border:** 1px solid rgba(148, 163, 184, 0.12)
- **Shadow X:** 0px
- **Shadow Y:** 4px
- **Shadow Blur:** 16px
- **Shadow Spread:** 0px
- **Shadow Color:** rgba(0, 0, 0, 0.1)

#### Focus Ring (Interactive elements)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 0px
- **Spread:** 3px
- **Color:** rgba(21, 181, 176, 0.5)

---

## Gradient Definitions

### Primary Gradient (CTA Buttons)
- **Start Color:** #15B5B0 (Vibrant Teal)
- **End Color:** #0D7C7A (Deep Teal)
- **Direction:** 135deg (Diagonal)

### Background Gradient (Hero sections)
- **Start Color:** #0F172A (Dark Navy)
- **End Color:** #1E293B (Elevated Navy)
- **Direction:** 180deg (Top to bottom)

### Success Gradient (Savings displays)
- **Start Color:** #10B981 (Savings Green)
- **End Color:** #059669 (Darker Green)
- **Direction:** 135deg (Diagonal)

---

## Opacity Values

### Backgrounds
- **Primary Opacity:** 100%
- **Secondary Opacity:** 60%
- **Muted Opacity:** 40%
- **Disabled Opacity:** 50%

### Borders
- **Default Border Opacity:** 12%
- **Hover Border Opacity:** 20%
- **Focus Border Opacity:** 40%

### Text
- **Primary Text Opacity:** 100%
- **Secondary Text Opacity:** 75%
- **Muted Text Opacity:** 60%
- **Disabled Text Opacity:** 40%

---

## Animation Transitions

### Duration
- **Fast:** 150ms
- **Default:** 300ms
- **Slow:** 800ms

### Easing
- **Default:** ease-in-out
- **Entrance:** ease-out
- **Exit:** ease-in
- **Bounce:** cubic-bezier(0.68, -0.55, 0.265, 1.55)

---

## Usage Notes

### Primary Color (#15B5B0)
- Use for: Primary CTAs, active states, links, important icons
- Never use on: Error states, disabled elements

### Secondary Color (#0D7C7A)
- Use for: Hover states, secondary CTAs, dividers
- Never use on: Primary actions, warnings

### Accent Success (#10B981)
- Use for: Savings amounts, success messages, positive indicators
- Always pair with: Dark backgrounds for contrast

### Accent Warning (#F59E0B)
- Use for: Alerts, price increases, important notifications
- Always pair with: Dark backgrounds, never as background color

### Accent Error (#EF4444)
- Use for: Error messages, critical actions, destructive buttons
- Use sparingly: Only for genuine errors or destructive actions
- **NEVER use for:** Blocked charges — blocks are CELEBRATIONS, use Success Green

### Block Celebration (#10B981 with enhanced glow) — NEW
- Use for: Block notifications, savings milestones, achievement badges
- Pair with: Dark background for optimal screenshot sharing
- Always include: Enhanced glow effect (35% opacity)
- Animation: Confetti permitted for first block and milestones

### Background (#0F172A)
- Use for: Main page background, dark sections
- Contrast ratio: Ensure 4.5:1 with foreground colors

### Glassmorphism
- Use for: Cards, panels, modals, overlays
- Always include: backdrop-blur (12px) and subtle border
- Best on: Dark backgrounds with slight transparency