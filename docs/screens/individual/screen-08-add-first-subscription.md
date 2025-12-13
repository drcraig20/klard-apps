---
screen: 8
name: Add First Subscription
batch: 2
status: not_started
purpose: "Guide users through manually adding their first subscription with a simple, focused form."
user_story: "As a user who chose manual entry, I want to add a subscription quickly by entering the basic details I already know."
components:
  web:
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: DatePicker
      path: klard-web/src/components/ui/date-picker.tsx
      exists: true
    - name: CurrencyInput
      path: klard-web/src/components/ui/currency-input.tsx
      exists: true
    - name: SearchInput
      path: klard-web/src/components/ui/search-input.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
  mobile:
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: DatePicker
      path: klard-mobile/src/components/ui/DatePicker/DatePicker.tsx
      exists: true
    - name: CurrencyInput
      path: klard-mobile/src/components/ui/CurrencyInput/CurrencyInput.tsx
      exists: true
    - name: SearchInput
      path: klard-mobile/src/components/ui/SearchInput/SearchInput.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
error_messages:
  - scenario: "Validation errors"
    message: "Please check the highlighted fields and try again."
  - scenario: "Service name required"
    message: "Please enter a subscription name."
  - scenario: "Invalid amount"
    message: "Please enter a valid amount."
  - scenario: "Invalid date"
    message: "Billing date must be today or in the future."
  - scenario: "Save fails"
    message: "Unable to save subscription. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Form fields must have proper labels and error announcements"
    - "Autocomplete dropdown must be navigable with arrow keys"
    - "Selected service chip must announce service name and provide clear action"
    - "Required field indicators must be announced"
    - "Success confirmation must be announced"
---

# Screen 8: Add First Subscription (Manual Entry)

## Purpose
Guide users through manually adding their first subscription with a simple, focused form.

## User Story
"As a user who chose manual entry, I want to add a subscription quickly by entering the basic details I already know."

---

## Web Implementation

### Layout Structure
Modal-style centered card (maximum width 600px) overlaid on a dimmed background, or a full-screen form depending on entry point. Include Step 3 progress indicator.

### Form Structure

The form should be laid out in a single scrollable column with clear section groupings.

**Section 1: Service Identification**

**Service Search/Name:**
- Searchable input field with autocomplete
- As the user types, show matching services from a predefined database (Netflix, Spotify, Adobe, etc.)
- If a service is selected from the dropdown, auto-populate the logo and category
- If no match, allow custom text entry

**Logo Display:**
- If a known service is selected, display its logo (40px) next to the name
- If custom entry, show a placeholder icon or allow image upload (optional enhancement)

**Category:**
- Dropdown select with predefined categories: Entertainment, Productivity, Health & Fitness, Finance, News & Media, Shopping, Cloud Storage, Gaming, Education, Other
- Auto-selected if known service, otherwise user selects

**Section 2: Cost Details**

**Amount:**
- Currency input with dollar sign prefix
- Numeric keyboard on mobile
- Format to two decimal places

**Billing Cycle:**
- Dropdown select: Weekly, Monthly, Quarterly, Yearly, One-time
- Default to Monthly

**Next Renewal/Billing Date:**
- Date picker input
- Default to 30 days from today for Monthly
- Calendar popup on focus

**Section 3: Additional Details (Optional)**

These fields should be clearly marked as optional and can be collapsed by default:

**Notes:**
- Textarea for user's personal notes
- Example placeholder: "Family plan shared with 3 others"

**Reminder Preference:**
- Dropdown: 1 day before, 3 days before, 7 days before, 14 days before
- Default to 3 days before

**Actions**

- "Add Subscription" primary button (full width at bottom of form)
- "Cancel" secondary/text button

### Validation

- Service name: Required
- Amount: Required, must be a valid positive number
- Billing cycle: Required
- Next billing date: Required, must be today or in the future

### Behaviors

**Service Autocomplete:**
- Debounce search by 200ms
- Show up to 8 matching results
- Display service logo thumbnails in dropdown
- Selecting a result fills name, logo, and suggests a category

**After Successful Add:**
1. Show success toast: "[Service name] added!"
2. If this is during onboarding, show a prompt: "Would you like to add another?" with "Add Another" and "Continue to Dashboard" buttons
3. Light celebration animation (confetti or checkmark pulse)

**Cancel Behavior:**
During onboarding, canceling shows a confirmation: "Skip adding subscriptions for now?" with "Skip" and "Keep Adding" options.

---

## Mobile Implementation

### Layout Structure
Full-screen form with a fixed header and scrollable content. The primary action button is pinned to the bottom above the safe area.

### Header
Close (X) button in top-left that cancels and returns to Import Hub. Title: "Add Subscription" centered.

### Form Layout

Present fields in a vertically stacked layout with clear spacing between sections.

**Service Search:**
- Full-width input with search icon
- As user types, show autocomplete results in a dropdown that pushes content down (not overlay)
- When a service is selected, collapse the search and show the selected service with its logo as a "chip" that can be cleared

**Category:**
- Use native picker (iOS: wheel picker in action sheet, Android: dropdown)
- Show category icon alongside text

**Amount:**
- Full-width input with dollar sign
- Numeric keyboard
- Large, easy-to-tap input area

**Billing Cycle:**
- Native picker with options

**Next Billing Date:**
- Tapping opens native date picker
- iOS: Uses the new compact date picker style by default
- Android: Material date picker dialog

**Notes:**
- Expandable section that starts collapsed
- Tapping "Add notes (optional)" expands to show textarea

### Keyboard Handling
- Fields should scroll into view when focused
- Numeric keyboard for amount
- Date picker doesn't require keyboard
- "Done" button on keyboard submits if all required fields are valid

### Success Flow
1. Button shows checkmark momentarily
2. Success haptic feedback
3. Display prompt asking if user wants to add another
4. If yes: Clear form and return to empty state
5. If no: Navigate to Dashboard (or next onboarding step)
