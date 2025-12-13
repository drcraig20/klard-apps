---
screen: 9
name: BurnerCard Tutorial
batch: 2
status: not_started
purpose: "Introduce Saver+ users to the BurnerCard feature through an engaging, educational overlay that explains the value proposition."
user_story: "As a Saver+ user, I want to understand how BurnerCards work so I can protect myself from unwanted subscription renewals."
components:
  web:
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
  mobile:
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
error_messages: []
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Tutorial carousel must be navigable with keyboard (left/right arrows)"
    - "Screen reader must announce current slide number and total (e.g., 'Slide 1 of 4')"
    - "Dot pagination must be tappable and announce slide numbers"
    - "Auto-advance (if implemented) must respect prefers-reduced-motion"
    - "Swipe navigation must have keyboard alternatives"
---

# Screen 9: BurnerCard Tutorial

## Purpose
Introduce Saver+ users to the BurnerCard feature through an engaging, educational overlay that explains the value proposition.

## User Story
"As a Saver+ user, I want to understand how BurnerCards work so I can protect myself from unwanted subscription renewals."

---

## Web Implementation

### Layout Structure
Modal overlay on dimmed background. Maximum width 640px, vertically centered. The modal should be dismissible but encourage engagement.

### Entry Conditions
This tutorial appears:
- After a Saver+ user completes adding their first subscription
- When a new Saver+ user first visits the BurnerCard section
- Can be re-accessed from Help & FAQ

For Basic and Pro users, this screen is skipped in onboarding. If they navigate to BurnerCards later, show an upgrade prompt instead.

### Tutorial Content

Structure the tutorial as a multi-step slideshow/carousel with 3-4 slides:

**Slide 1: Introduction**
- Illustration: A virtual card with a shield icon
- Headline: "Meet BurnerCards"
- Body: "Virtual payment cards that protect you from unwanted charges. Use them for subscriptions you want to control."
- Visual indicator: Dot pagination showing slide 1 of 4

**Slide 2: How It Works**
- Illustration: Card connecting to a subscription service icon
- Headline: "One card per subscription"
- Body: "Create a dedicated BurnerCard for each subscription. Set spending limits and control when charges go through."

**Slide 3: Block Unwanted Charges**
- Illustration: Card with a "blocked" overlay and declined charge
- Headline: "Block renewals instantly"
- Body: "Forgot to cancel? Lock your BurnerCard and the renewal is automatically declined. No more surprise charges."

**Slide 4: Get Started**
- Illustration: Success/celebration visual
- Headline: "You have 4 BurnerCards ready"
- Body: "Your Saver+ plan includes 4 BurnerCards per month. Create your first one now."
- CTA Button: "Create My First BurnerCard" (primary)
- Secondary: "Maybe Later" text link

### Navigation
- Left/Right arrows on the sides to navigate between slides
- Dot pagination at the bottom, clickable
- Keyboard arrow keys work for navigation
- Can swipe on trackpad/touch

### Behaviors

**Skip/Dismiss:**
- X button in top-right corner
- Clicking overlay background doesn't dismiss (we want engagement)
- "Maybe Later" on final slide dismisses

**On Dismiss:**
- Set a flag so the tutorial doesn't auto-appear again
- Navigate to Dashboard

**On "Create BurnerCard":**
- Navigate to Create BurnerCard flow (Screen 19)

---

## Mobile Implementation

### Layout Structure
Full-screen takeover with carousel/pager functionality.

### Header
X (close) button in top-right. No back button—use swipe navigation.

### Content Layout

Use a full-screen horizontal pager/swiper. Each slide should have:
- Illustration in the upper portion (approximately 40% of screen height)
- Text content below, centered
- Dot pagination fixed at bottom

### Interactions

**Navigation:**
- Swipe left/right to move between slides
- Tapping left/right edges also navigates
- Dot pagination is tappable

**Haptic Feedback:**
- Light haptic on slide change
- Medium haptic when reaching final slide

### Final Slide CTA
- "Create My First BurnerCard" primary button, full-width at bottom
- "Maybe Later" text link above the button

### Auto-Advance (Optional)
Consider auto-advancing slides every 5 seconds with visible progress, pausing when user interacts. This is optional and should respect user's reduced motion preferences.
