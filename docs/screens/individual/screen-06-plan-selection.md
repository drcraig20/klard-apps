---
screen: 6
name: Plan Selection
batch: 2
status: not_started
purpose: "Present pricing options clearly, highlight the recommended tier, and allow users to start a free trial without payment information."
user_story: "As a new user completing onboarding, I want to understand what each plan offers so I can choose the best option for my needs without feeling pressured."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
    - name: PriceDisplay
      path: klard-web/src/components/ui/price-display/price-display.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
    - name: PriceDisplay
      path: klard-mobile/src/components/ui/PriceDisplay/PriceDisplay.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
error_messages:
  - scenario: "Subscription API fails"
    message: "Unable to load plans. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Plan cards must announce plan name, price, and feature count"
    - "Billing toggle must announce current selection (Monthly/Annual) and savings amount"
    - "Price changes on toggle must be announced via aria-live region"
    - "Recommended/Popular badge must be announced with plan name"
---

# Screen 6: Plan Selection

## Purpose
Present pricing options clearly, highlight the recommended tier, and allow users to start a free trial without payment information.

## User Story
"As a new user completing onboarding, I want to understand what each plan offers so I can choose the best option for my needs without feeling pressured."

---

## Web Implementation

### Layout Structure
Full-screen centered layout without the navigation shell. Display a subtle progress indicator showing this is Step 1 of the onboarding flow. Maximum content width of 1200px to accommodate three side-by-side plan cards.

### Header Section

**Navigation:** Place a "← Back" text link in the top-left (returns to Welcome) and a "Skip →" text link in the top-right (defaults user to Basic tier and proceeds to Import Hub).

**Title:** "Choose your plan" as H1 centered. Below it: "Start with a 14-day free trial of Saver+. No credit card required." in Body size with Text Secondary color.

**Billing Toggle:** Display a segmented control or toggle switch between "Monthly" and "Annual (Save 20%)" centered below the subtitle. The toggle should be set to Monthly by default.

### Plan Cards

Display three plan cards side by side with equal width. Each card should contain:

1. **Plan Name** at the top (H3 size)
2. **Price** prominently displayed (H2 size for the dollar amount)
3. **Billing Period** indicator ("/month" or "/year")
4. **Feature List** with checkmarks
5. **CTA Button** at the bottom

**Basic Plan ($3/month, $29/year):**
- No special highlighting
- Secondary button style for CTA: "Select Basic"
- Features:
  - Track up to 3 subscriptions
  - Renewal date alerts
  - Manual cancellation links

**Pro Plan ($9.99/month, $95/year):**
- No special highlighting
- Secondary button style for CTA: "Select Pro"
- Features:
  - Unlimited subscription tracking
  - Price increase alerts
  - Alternative suggestions
  - Spend analytics dashboard
  - Export reports

**Saver+ Plan ($16.99/month, $163/year):**
- Highlighted card: teal border, subtle teal background tint
- "POPULAR" or "RECOMMENDED" badge in top-right corner
- Primary button style with glow for CTA: "Start Free Trial"
- Features:
  - Everything in Pro, plus:
  - 4 BurnerCards per month (+$1/each additional)
  - Custom card spending rules
  - Auto-block unwanted renewals
  - Priority support
  - SMS alerts

### Footer

Below the cards, display: "All plans include email sync & privacy protection" as a centered note.

Add a trust element: "No credit card required for trial - Cancel anytime"

### Behaviors

**Billing Toggle:**
When the user switches between Monthly and Annual:
- Animate the prices using a number transition effect (numbers roll/morph to new values)
- Update the billing period indicator
- Show a "Save 20%" badge near the Annual option when selected

**Card Hover (Desktop):**
- Subtle elevation increase (shadow deepens)
- Card scales up very slightly (1.02x)

**Card Selection:**
When a user clicks a CTA button:
1. The selected card gets a checkmark overlay briefly
2. Navigate to Import Hub (Screen 7)
3. Store the selected plan in user session/state

**Skip Behavior:**
Clicking "Skip" defaults the user to Basic tier and proceeds to Import Hub with a toast: "You're on the Basic plan. You can upgrade anytime."

### Tablet Adaptation (768px-1023px)
Stack the cards with Saver+ full-width on top (since it's recommended) and Basic and Pro side by side below. Collapse feature lists to show top 3 features with an expandable "See all features" link.

---

## Mobile Implementation

### Layout Structure
Vertically scrolling full-screen layout. Cards are stacked vertically, full-width.

### Header
Back arrow in top-left, "Skip" text in top-right. Display "Choose your plan" as H1 and "14-day free trial available" as subtitle.

### Billing Toggle
Use a native segmented control. The control should have two segments: "Monthly" and "Annual -20%". When the user changes selection, trigger light haptic feedback and animate the price changes.

### Card Order
Unlike web, display Saver+ (the recommended plan) first at the top of the scroll, followed by Pro, then Basic at the bottom. This puts the best value proposition in the most prominent position.

### Card Styling
Each card should be a full-width rounded container with:
- Plan name and badge (if applicable) at top
- Price large and prominent
- Feature list with checkmarks
- CTA button at bottom of card

Use adequate vertical spacing between cards (16px minimum).

### CTA Styling
- Saver+: Primary button with "Start 14-Day Free Trial"
- Pro: Secondary/outline button with "Select Pro"
- Basic: Ghost button with "Select Basic"

### Scroll Indicator
When the page loads and content extends beyond the viewport, show a subtle gradient fade at the bottom edge to indicate there's more content to scroll.

### Footer
Display the "No card required" trust message at the bottom after all cards.

### Platform-Specific Behaviors

**iOS:**
- Use native `UISegmentedControl` styling for the billing toggle
- Trigger selection haptic feedback when toggling or selecting a plan
- Prepare for StoreKit 2 integration for in-app purchases (future)
- Use SF Symbols for checkmarks

**Android:**
- Use Material segmented button for the billing toggle
- Apply ripple effect when tapping cards
- Prepare for Google Play Billing Library integration
- Respect Material You dynamic theming in dark mode

### Accessibility
- Screen readers should announce: "[Plan name], [price] per [period], [number] features included"
- Toggle should be labeled: "Billing cycle: Monthly or Annual"
- Each feature should be announced individually when navigating
