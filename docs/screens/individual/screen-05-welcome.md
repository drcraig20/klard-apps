---
screen: 5
name: Welcome
batch: 1
status: not_started
purpose: "Orient newly verified users and set expectations for the onboarding flow ahead."
user_story: "As a newly verified user, I want to understand what Klard offers and what steps are coming so I feel confident proceeding with setup."
components:
  web:
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
  mobile:
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
error_messages: []
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Staggered entry animations must respect prefers-reduced-motion preference"
    - "Progress stepper must announce current step position (e.g., 'Step 0 of 4, not started')"
    - "Value proposition cards should be semantically grouped as a list"
    - "Skip link must be clearly announced as navigation option"
---

# Screen 5: Welcome

## Purpose
Orient newly verified users and set expectations for the onboarding flow ahead.

## User Story
"As a newly verified user, I want to understand what Klard offers and what steps are coming so I feel confident proceeding with setup."

---

## Web Implementation

### Layout Structure
Full-screen layout with centered content, no navigation shell visible. Maximum content width of 800px.

### Content Structure

**Hero Section:**
- Large illustration showing a person relaxing while their subscriptions are organized (abstract, friendly style)
- "Welcome to Klard, [First Name]!" as H1
- Subtitle: "Let's get you set up in just a few minutes." in Body Large size

**Value Propositions:**
Display three key benefits in a horizontal row (or stacked on smaller screens):

1. **Track Everything**
   - Icon: Layers/stack icon
   - "Import your subscriptions automatically or add them manually."

2. **Stop Surprise Charges**
   - Icon: Shield icon
   - "Get alerts before renewals and block unwanted charges."

3. **Save Money**
   - Icon: Piggy bank icon
   - "Discover savings with analytics and cheaper alternatives."

**Onboarding Steps Preview:**
Show a horizontal progress indicator with 4 steps, all currently uncompleted:
1. Choose your plan
2. Import subscriptions
3. Set up alerts
4. Explore BurnerCards

Currently on step 0 (not started). This gives users visibility into what's ahead.

**Actions:**
- "Get Started" primary button (large, prominent) → navigates to Plan Selection (Screen 6)
- "Skip setup for now" text link → takes user to Dashboard with minimal configuration

**Footer:**
"This typically takes about 3-5 minutes."

---

## Mobile Implementation

### Layout Structure
Full-screen, scrollable content with illustrations that don't overwhelm the viewport.

### Header
Show the Klard logo centered in the header. No back button or close—forward momentum only.

### Content

**Hero:**
- Scaled-down version of the welcome illustration (approximately 200px height)
- "Welcome, [First Name]!" as H1
- "Let's set up your account." in Body size

**Value Propositions:**
Display the three benefits as vertically stacked cards with icons on the left:
- Each card: icon (40px) | title + description
- Cards are tappable to reveal more detail (optional enhancement)

**Progress Indicator:**
Simplified horizontal stepper showing dots for 4 steps, with none filled in yet. Don't show step labels on mobile—just the visual progress.

**Actions:**
- "Get Started" primary button pinned to bottom above safe area
- "Skip for now" text link above the button

### Animations and Polish

**Entry Animation:**
When the screen loads, stagger the appearance of elements:
1. Illustration fades in (0-200ms)
2. Welcome text slides up (100-300ms)
3. Benefit cards slide in from right, staggered (200-500ms)
4. Button fades in last (400-600ms)

**Haptic Feedback:**
Light haptic when user taps "Get Started."

### Personalization
If the user's first name is available from registration, use it: "Welcome, Sarah!" Otherwise, fall back to: "Welcome to Klard!"
