---
screen: 7
name: Import Hub
batch: 2
status: not_started
purpose: "Offer users multiple pathways to populate their subscription list, with email sync as the recommended approach for minimum friction."
user_story: "As a new user, I want to choose the easiest way to add my subscriptions so I can see value from the app quickly."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
error_messages:
  - scenario: "OAuth fails"
    message: "Unable to connect to your email. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Import options must be clearly labeled with descriptive accessible names"
    - "Recommended badge must be announced with option title"
    - "Trust note for email sync must be readable by screen readers"
    - "Chevron indicators must not be announced as separate elements"
---

# Screen 7: Import Hub

## Purpose
Offer users multiple pathways to populate their subscription list, with email sync as the recommended approach for minimum friction.

## User Story
"As a new user, I want to choose the easiest way to add my subscriptions so I can see value from the app quickly."

---

## Web Implementation

### Layout Structure
Full-screen centered layout without navigation shell. Maximum content width of 800px. This is Step 2 of onboarding.

### Header
"← Back" link in top-left (returns to Plan Selection). "Skip" in top-right (goes to Dashboard with empty state).

**Title:** "How would you like to add your subscriptions?" as H1. Subtitle: "Choose the method that works best for you. You can always add more later."

### Import Options

Display three option cards stacked vertically, each clearly explaining what it does:

**Option 1: Email Sync (Recommended)**
- Highlight this option with a "RECOMMENDED" badge
- Icon: Mail/envelope icon (48px, teal)
- Title: "Connect your email"
- Description: "We'll scan your inbox for subscription receipts and automatically detect your services. Takes about 2 minutes."
- CTA: "Connect Email" primary button
- Trust note below: "We only scan for subscriptions. Your emails stay private."

**Option 2: Manual Entry**
- Icon: Plus/edit icon (48px, slate)
- Title: "Add manually"
- Description: "Know exactly what you're paying for? Add subscriptions one by one."
- CTA: "Add First Subscription" secondary button

**Option 3: Skip for Now**
- Less prominent styling (ghost appearance)
- Icon: Arrow-right icon (40px, slate light)
- Title: "I'll do this later"
- Description: "Jump straight to your dashboard. You can import subscriptions anytime."
- CTA: "Go to Dashboard" ghost button

### Tooltip/Help
Add an info icon next to the Email Sync option that, on hover/click, shows a tooltip: "We use read-only access to find receipts. We never store your email content."

### Behaviors

**Connect Email:** Navigates to Email Connection Setup (Screen 15 in Batch 3). After successful connection, user proceeds through Scan Progress (16) and Scan Results (17).

**Add First Subscription:** Navigates to Add First Subscription screen (Screen 8).

**Skip/Go to Dashboard:** Navigates to Main Dashboard (Screen 10) showing an empty state.

---

## Mobile Implementation

### Layout Structure
Full-screen scrollable layout with options as tappable full-width cards.

### Header
Back arrow in top-left, "Skip" in top-right. Title: "Add your subscriptions" as H1.

### Option Cards
Stack the three options vertically as tappable cards. Each card should have:
- Icon on the left (40px)
- Title and description on the right
- The entire card is tappable (no separate button inside)
- Chevron (arrow-right) on the far right indicates tappability

**Card Order (top to bottom):**
1. Email Sync (highlighted with teal left border and "RECOMMENDED" badge)
2. Manual Entry
3. Skip for Now (styled less prominently)

### Behaviors

When a card is tapped:
1. Brief scale-down animation (press feedback)
2. Light haptic feedback
3. Navigate to the appropriate screen

The trust note for Email Sync should appear below that specific card, not at the bottom of the screen.

### Platform-Specific

**iOS:**
- Card tap uses native highlight styling
- Email sync will open an in-app OAuth flow (not Safari)

**Android:**
- Ripple effect on card tap
- Email sync uses Chrome Custom Tabs for OAuth
