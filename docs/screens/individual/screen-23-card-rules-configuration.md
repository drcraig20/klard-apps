---
screen: 23
name: Card Rules Configuration
batch: 5
status: not_started
purpose: "Edit the rules and settings of an existing BurnerCard."
user_story: "As a user, I want to modify my BurnerCard rules when my needs change."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: Slider
      path: klard-web/src/components/ui/slider.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: Input
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: Select
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: Slider
      path: klard-mobile/src/components/ui/SliderField/SliderField.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: Alert
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Separator
      path: klard-mobile/src/components/ui/Separator/Separator.tsx
      exists: false
      note: "Mobile uses View with borderBottom styling for separation"
error_messages:
  - scenario: "Invalid spending limit"
    message: "Please enter a valid amount between $1 and $10,000."
  - scenario: "Limit below spent amount"
    message: "New limit ($15) is below current spending ($18.50). The card will be locked immediately."
  - scenario: "Save changes fails"
    message: "Unable to save changes. Please try again."
  - scenario: "Nickname too long"
    message: "Card name must be 30 characters or less."
  - scenario: "Nickname required"
    message: "Please enter a name for your card."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Unsaved changes warning must be announced when attempting to close
    - Inline validation messages must be associated with their fields via aria-describedby
    - Toggle switches must announce their current state
    - Destructive delete action must have confirmation that's keyboard accessible
    - Form sections must use proper heading hierarchy for navigation
    - Real-time feedback on limit changes must use aria-live regions
---

# Screen 23: Card Rules Configuration

## Purpose
Edit the rules and settings of an existing BurnerCard.

## User Story
As a user, I want to modify my BurnerCard rules when my needs change.

---

## Web Implementation

**Layout Approach:**

Implement as a modal form (500px width) that opens from the Card Detail view. This keeps the user in context of the specific card they're editing.

**Header:**

"Edit Card Rules" as H2 with the card nickname as subtitle. Close button (X) in top-right that prompts for unsaved changes if applicable.

**Editable Fields:**

**Card Nickname:**
Text input pre-filled with current name. Same validation as creation (required, max 30 chars).

**Spending Limit:**
Currency input pre-filled with current limit.

Important validation: If the new limit is lower than the current spent amount, show a warning: "New limit ($15) is below current spending ($18.50). The card will be locked immediately."

If increasing the limit, show encouraging message: "Increasing limit to $50. Card will have $31.50 remaining."

**Expiry Rule:**

For One-Time cards:
- Auto-lock timing dropdown (same options as creation)
- If card has already been used, show: "This card has been used and is now locked. Expiry rules cannot be changed."

For Recurring cards:
- Radio options for charge limit, spending total, or date
- Pre-select and populate current rule
- Show progress toward current limit

For Category cards:
- Category multi-select with current selections checked
- Warning if removing a category that the card has been used at

**Notification Preferences:**

Toggle switches for notification options, pre-set to current values.

**Non-Editable Information:**

Display the following as read-only information (cannot be changed after creation):

- Card Type (One-Time/Recurring/Category)
- Card Number (masked)
- Creation Date

Explain: "Card type cannot be changed. Create a new card if you need a different type."

**Actions:**

- Primary: "Save Changes"
- Secondary: "Cancel"
- Destructive: "Delete Card" (at bottom, requires confirmation)

**Validation and Save:**

Validate all fields before enabling save. On successful save, close modal and show success toast. If critical changes were made (limit reduction causing lock), show a more prominent notification.

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen modal that slides up from the Card Detail view. Include standard modal navigation (Cancel, Save).

**Header:**

Navigation bar: "Cancel" (left) | "Edit Rules" (center) | "Save" (right, disabled until changes made)

**Form Structure:**

Organize as a scrollable form with clear section groupings:

**Section 1: Card Identity**
- Nickname field
- Read-only card type display

**Section 2: Limits**
- Spending limit input
- Warning/info messages about limit changes

**Section 3: Expiry Rules**
- Type-specific rule inputs
- Progress indicators where applicable

**Section 4: Notifications**
- Toggle switches for each notification type

**Section 5: Danger Zone**
- "Delete Card" button in destructive styling
- Separated from other content with clear visual break

**Inline Feedback:**

Show real-time feedback for limit changes:
- Increasing: "Card will have $X remaining after this change"
- Decreasing below spent: Warning banner explaining consequences

**Save Behavior:**

When Save is tapped:
1. Validate all fields
2. If validation fails, scroll to first error and show inline message
3. If validation passes, save and dismiss with success haptic
4. Show toast confirmation

**iOS-Specific Considerations:**

- Use iOS form styling with grouped inset sections
- Toggle switches should use native iOS styling
- Destructive actions should use red text styling
- Keyboard should automatically advance between fields

**Android-Specific Considerations:**

- Use Material outlined text fields
- Toggle switches should follow Material guidelines
- Destructive button should be outlined red
- Support predictive back gesture
