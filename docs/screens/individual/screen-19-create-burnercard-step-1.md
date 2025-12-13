---
screen: 19
name: Create BurnerCard - Step 1 (Type Selection)
batch: 4
status: not_started
purpose: "First step of card creation wizard where users choose the type of protection they need."
user_story: "As a user creating a BurnerCard, I want to understand the different card types so I can choose the right protection."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: SearchInput
      path: klard-web/src/components/ui/search-input.tsx
      exists: true
    - name: ServiceLogo
      path: klard-web/src/components/ui/service-logo.tsx
      exists: true
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: SearchInput
      path: klard-mobile/src/components/ui/SearchInput/SearchInput.tsx
      exists: true
    - name: ServiceLogo
      path: klard-mobile/src/components/ui/ServiceLogo/ServiceLogo.tsx
      exists: true
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
error_messages:
  - scenario: "No card type selected"
    message: "Please select a card type to continue."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Card type selection must be navigable with keyboard and screen reader"
    - "Selected card type must announce selection state"
    - "Step indicator must announce current step and total steps"
    - "Help/guidance section expansion must be announced"
    - "Cancel confirmation dialog must trap focus appropriately"
    - "Continue button disabled state must be announced"
---

# Screen 19: Create BurnerCard - Step 1 (Type Selection)

## Purpose
First step of card creation wizard where users choose the type of protection they need.

## User Story
As a user creating a BurnerCard, I want to understand the different card types so I can choose the right protection.

---

## Web Implementation

**Layout Approach:**

Implement as a modal wizard (640px max-width) that guides users through card creation. The wizard should feel focused and not overwhelming despite the configuration options.

**Progress Indicator:**

Show a step indicator at the top: "Step 1 of 3" with visual dots or segments. Label the steps: Type → Rules → Confirm.

**Header:**

Display "Create BurnerCard" as H2 with subtitle "Choose your card type" below. Include a close button (X) that triggers an "are you sure?" confirmation if any selections have been made.

**Type Selection Cards:**

Present three card type options as large, selectable cards arranged horizontally (or vertically on narrow viewports). Each card should clearly communicate its use case.

**One-Time Card:**

- Icon: Zap (or similar instant/single-use icon)
- Title: "One-Time"
- Description: "Single use only. Automatically locks after the first charge."
- Best for: "Free trials, one-time purchases"
- Visual indicator: "1" badge or single-use iconography

**Recurring Card:**

- Icon: Repeat
- Title: "Recurring"
- Description: "Allows multiple charges up to limits you set."
- Best for: "Subscriptions with known end dates, budgeted spending"
- Visual indicator: Circular arrows or repeat iconography

**Category-Locked Card:**

- Icon: Tag (or Shield with tag)
- Title: "Category"
- Description: "Only works for specific merchant categories you choose."
- Best for: "Budget control by spending type (streaming only, etc.)"
- Visual indicator: Category icons

**Selection Interaction:**

When a card type is selected:
- Apply teal border and subtle teal background tint
- Show a checkmark in the corner
- Other cards become slightly dimmed
- "Continue" button becomes enabled

Hovering a card should show subtle elevation increase and a brief tooltip with additional detail if helpful.

**Educational Element:**

Below the card options, include a "Which should I choose?" collapsible section that expands to show a comparison table or decision flowchart:

- "Signing up for a free trial?" → One-Time
- "Want to limit how long you pay for something?" → Recurring
- "Want to control spending by type?" → Category

**Navigation:**

- Primary button: "Continue" (disabled until selection made)
- Secondary button: "Cancel" (closes wizard with confirmation)

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen modal that slides up. The wizard should feel like a focused flow that guides users step-by-step.

**Header:**

Navigation bar with "Cancel" on left, step indicator centered ("Step 1 of 3"), and empty right side. Title below nav: "Choose card type"

**Type Selection:**

Display the three card types as vertically stacked, full-width selection cards. Each card should be tappable with clear selected/unselected states.

**Card Layout:**

Each type card contains:
- Icon (32px) and title on the same line
- Description text below
- "Best for:" helper text in caption style
- Radio indicator or checkmark showing selection state

Make the entire card tappable, not just a radio button.

**Selection Feedback:**

On tap:
- Selected card gets teal border and subtle background
- Haptic feedback (light impact)
- Other cards dim slightly
- "Continue" button enables and may animate subtly

**Help Section:**

Include a "Help me choose" expandable section at the bottom. When tapped, expand to show simple guidance or open a help bottom sheet with comparison information.

**Sticky Footer:**

Fix the "Continue" button at the bottom above safe area. Show disabled state until selection is made.

**iOS-Specific Considerations:**

- Use native selection styling (checkmark in trailing position)
- Cards should have rounded corners matching iOS design
- Haptic: Selection feedback on type choice
- Support swipe-to-dismiss with confirmation

**Android-Specific Considerations:**

- Use radio button indicators per Material patterns
- Ripple effect on card tap
- Material elevation on selected card
- Support back gesture with confirmation
