---
screen: 20
name: Create BurnerCard - Step 2 (Rules Configuration)
batch: 4
status: not_started
purpose: "Configure spending limits, expiry rules, and other parameters for the new BurnerCard."
user_story: "As a user, I want to set rules for my BurnerCard so it protects me the way I need."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Slider
      path: klard-web/src/components/ui/slider.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: CurrencyInput
      path: klard-web/src/components/ui/currency-input.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: DatePicker
      path: klard-web/src/components/ui/date-picker.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: SliderField
      path: klard-mobile/src/components/ui/SliderField/SliderField.tsx
      exists: true
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: CurrencyInput
      path: klard-mobile/src/components/ui/CurrencyInput/CurrencyInput.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: DatePicker
      path: klard-mobile/src/components/ui/DatePicker/DatePicker.tsx
      exists: true
error_messages:
  - scenario: "Missing required field"
    message: "Please complete all required fields."
  - scenario: "Invalid spending limit"
    message: "Spending limit must be greater than $0."
  - scenario: "No category selected (Category card)"
    message: "Please select at least one category."
  - scenario: "Invalid charge count"
    message: "Charge count must be between 1 and 100."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Form validation errors must be announced and have programmatic association"
    - "Slider values must announce current value during adjustment"
    - "Radio button groups must have proper group labeling"
    - "Required fields must be indicated both visually and programmatically"
    - "Character counter must be announced when approaching limit"
    - "Quick-select chips must be keyboard navigable"
    - "Notification toggles must announce state changes"
---

# Screen 20: Create BurnerCard - Step 2 (Rules Configuration)

## Purpose
Configure spending limits, expiry rules, and other parameters for the new BurnerCard.

## User Story
As a user, I want to set rules for my BurnerCard so it protects me the way I need.

---

## Web Implementation

**Layout Approach:**

Continue the modal wizard from Step 1. This step has more form fields, so ensure the modal is scrollable if content exceeds viewport. Maintain the same width and styling for consistency.

**Progress Indicator:**

Update to show "Step 2 of 3" with the second step highlighted/filled.

**Header:**

"Set your rules" as H2 with contextual subtitle based on selected type:
- One-Time: "Configure your one-time card"
- Recurring: "Configure your recurring card"
- Category: "Configure your category card"

**Common Fields (All Types):**

**Card Nickname:**
- Text input with placeholder "e.g., Netflix Trial, Streaming Budget"
- Helper text: "Give your card a name you'll recognize"
- Character limit: 30 characters with counter
- Required field

**Spending Limit:**
- Currency input with $ prefix
- Placeholder: "Enter amount"
- Helper text: "Maximum amount this card can be charged"
- Required field
- Validation: Must be greater than $0

**Type-Specific Fields:**

**One-Time Card:**

*Auto-Lock Timing:*
- Slider or dropdown: "Lock after X days if unused"
- Options: 7 days, 14 days, 30 days, 60 days, No auto-lock
- Default: 14 days
- Helper: "Card will automatically lock if no charge is made within this period"

**Recurring Card:**

*Charge Limit (choose one):*
- Radio option 1: "Lock after X charges"
  - Number input (1-100)
  - Helper: "Card locks after this many successful charges"
- Radio option 2: "Lock after spending $X total"
  - Currency input
  - Helper: "Card locks when total spending reaches this amount"
- Radio option 3: "Lock on specific date"
  - Date picker
  - Helper: "Card locks on this date regardless of usage"

**Category Card:**

*Allowed Categories:*
- Multi-select checkbox list
- Categories: Streaming & Entertainment, Software & Apps, Gaming, Health & Fitness, Food & Delivery, Shopping, Travel, Other
- At least one required
- Helper: "Card will only work at merchants in selected categories"

**Optional Fields (All Types):**

**Link to Subscription:**
- Dropdown populated with user's unprotected subscriptions
- Options: "[Subscription names]", "Don't link to a subscription"
- Helper: "Linking helps track which subscription uses this card"
- Optional but recommended

**Notification Preferences:**
- Checkbox: "Notify me when 80% of limit is reached"
- Checkbox: "Notify me on every charge"
- Both checked by default

**Form Validation:**

Validate fields in real-time:
- Nickname: Required, non-empty
- Spending limit: Required, must be positive number
- Type-specific rules: At least one configured

Show inline errors below fields. Disable "Continue" until form is valid.

**Navigation:**

- Primary: "Continue" (to Step 3)
- Secondary: "Back" (to Step 1, preserves selections)
- Tertiary: "Cancel" (with confirmation)

---

## Mobile Implementation

**Layout Approach:**

Continue full-screen modal wizard. This screen has more content, so implement as a scrollable form with sticky footer for navigation.

**Header:**

Same pattern as Step 1: "Cancel" | "Step 2 of 3" | [empty]. Title below: "Set your rules"

**Form Organization:**

Organize fields into clear sections with headers:

**Section 1: Card Identity**
- Nickname field (full width)

**Section 2: Spending Limit**
- Currency input (full width)
- Consider adding quick-select chips: "$10", "$25", "$50", "$100"

**Section 3: Locking Rules** (varies by type)
- For One-Time: Slider for auto-lock days
- For Recurring: Stacked radio options with associated inputs
- For Category: Scrollable chips or expandable category list

**Section 4: Link to Subscription** (optional)
- Tapping opens a selection sheet

**Section 5: Notifications**
- Toggle switches instead of checkboxes for mobile

**Input Optimization:**

- Nickname: Standard keyboard with autocapitalization
- Spending limit: Numeric keypad with decimal
- Charge count: Number pad
- Dates: Native date picker

**Smart Defaults:**

Pre-populate sensible defaults to reduce friction:
- Auto-lock: 14 days for One-Time
- Notifications: Both enabled
- Categories: None selected (requires user choice)

**Validation:**

Show validation feedback inline. Use real-time validation but avoid aggressive error display while user is still typing. Show errors on blur or on continue attempt.

**Sticky Footer:**

Two buttons fixed at bottom:
- "Continue" (primary)
- "Back" (secondary/text)

**iOS-Specific Considerations:**

- Use native input styles (rounded grouped sections)
- Slider for auto-lock should use native UISlider feel
- Date picker inline or as wheel picker sheet
- Toggle switches for notifications

**Android-Specific Considerations:**

- Use Material text field outlines
- Slider should follow Material Slider component
- Date picker as Material Date Picker dialog
- Switches for notifications per Material guidelines

**Keyboard Handling:**

Ensure the form scrolls to keep the active field visible. On "Done" or field submit, advance to the next field. On final field, "Done" should attempt form submission if valid.
