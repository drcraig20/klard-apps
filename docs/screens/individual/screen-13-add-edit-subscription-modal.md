---
screen: 13
name: Add/Edit Subscription Modal
batch: 3
status: not_started
purpose: "Unified form for creating new subscriptions or editing existing ones."
user_story: "As a user, I want to add or edit subscription details so my tracking is accurate."
components:
  web:
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
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
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
  mobile:
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
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
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "Price validation failed"
    message: "Price must be greater than $0"
  - scenario: "Renewal date validation failed"
    message: "Renewal date cannot be in the past"
  - scenario: "URL validation failed"
    message: "Please enter a valid URL"
  - scenario: "Required field missing"
    message: "Please fill in all required fields"
  - scenario: "Failed to save subscription"
    message: "Failed to save subscription. Please try again."
  - scenario: "Failed to delete subscription"
    message: "Failed to delete subscription. Please try again."
  - scenario: "Service not found"
    message: "Service not found. Try adding a custom service."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Modal must trap focus and return focus on close
    - Form validation errors must be announced in real-time
    - Required fields must be indicated with aria-required
    - Service autocomplete must announce number of results
    - Price input must announce currency format
    - Date picker must be fully keyboard navigable
    - Unsaved changes warning must be announced before dismiss
    - Delete confirmation must be announced clearly
---

# Screen 13: Add/Edit Subscription Modal

## Purpose
Unified form for creating new subscriptions or editing existing ones.

## User Story
As a user, I want to add or edit subscription details so my tracking is accurate.

---

## Web Implementation

**Modal Configuration:**

Implement as a centered modal with max-width of 560px. Use a semi-transparent backdrop that closes the modal when clicked (with unsaved changes warning). The modal should be scrollable if content exceeds viewport height.

**Header:**

Display contextual title: "Add Subscription" for new entries, "Edit [Service Name]" for edits. Include a close button (X icon) in the top-right corner. When editing, show the service logo next to the title.

**Form Structure:**

Organize the form into logical sections with clear visual separation.

**Service Selection Section:**

For new subscriptions, this is the first step. Provide a search input with autocomplete connected to a service database. As the user types, show matching services with logos and typical price.

Display 8 popular service buttons below the search for quick selection: Netflix, Spotify, Adobe, Disney+, ChatGPT, YouTube Premium, Notion, Dropbox. These should show logo and name.

Include a "Can't find it? Add custom service" link that reveals a manual name input field.

For edits, show the current service with a "Change" link instead of full search.

**Service Details Section:**

Once a service is selected (or for edits), display:

- **Service Preview:** Logo + name in a read-only styled field with "Change" action.

- **Price:** Currency input with proper formatting. Pre-populate with typical price if available. Include helper text: "Enter your actual price if different from the suggested amount."

- **Billing Cycle:** Segmented control or radio group with options: Monthly, Annual, Weekly, Custom. If Custom is selected, show additional fields for interval number and unit (days/weeks/months).

- **Next Renewal Date:** Date picker input. For new subscriptions, default to one cycle from today. Provide quick options: "Tomorrow", "Next week", "Next month", or custom date.

- **Category:** Dropdown with icon-prefixed options. Categories should include: Streaming & Entertainment, Productivity & Tools, Gaming, Health & Fitness, News & Reading, Finance & Business, Cloud & Storage, Music, Education, Other. Auto-select based on service if known.

**Optional Details Section:**

These fields are collapsed by default with an "Add more details" toggle:

- **Payment Method:** Dropdown of user's saved cards plus "Add new card" option. BurnerCards should appear with a shield icon.

- **Cancellation URL:** URL input with validation. Include helper text: "Where can you cancel this subscription?" Some services auto-populate this field.

- **Notes:** Textarea for personal notes (500 character limit with counter).

**Form Validation:**

Required fields: Service name, Price, Billing cycle, Next renewal date.

Validate in real-time with inline error messages:
- Price must be greater than $0
- Renewal date cannot be in the past
- URL must be valid format if provided

**Actions:**

Position two buttons at the bottom:
- Primary: "Add Subscription" or "Save Changes"
- Secondary: "Cancel"

Show loading state in the primary button during submission. On success, close modal and show success toast.

**Delete Action (Edit Mode Only):**

Include a "Delete Subscription" destructive link at the very bottom of the form. This should trigger a confirmation dialog before proceeding.

---

## Mobile Implementation

**Presentation:**

On mobile, present this as a full-screen modal that slides up from the bottom. Use a native modal/sheet presentation style. Include a drag indicator at the top and support swipe-to-dismiss (with unsaved changes warning).

**Header:**

Position a "Cancel" text button on the left and "Save" (or "Add") on the right. The title should be centered. The save button should be disabled until the form is valid.

**Form Adaptation:**

Stack all form fields vertically with consistent spacing (16px between fields). Use native input components for each platform.

**Service Selection:**

For new subscriptions, the initial state shows a search bar and popular services grid (2 columns, 4 visible with "Show more" option). Tapping search opens a full-screen search with keyboard.

**Input Fields:**

- **Price:** Use a numeric keypad with decimal support. Include currency symbol as a prefix label.

- **Billing Cycle:** Display as a horizontal scrollable chip group or action sheet.

- **Renewal Date:** Use native date picker (iOS wheel, Android date picker dialog).

- **Category:** Open as an action sheet (iOS) or bottom sheet (Android) with icon-labeled options.

- **Payment Method:** Sheet selector with card visuals.

**Keyboard Flow:**

Implement "Next" button behavior to advance through fields. The keyboard accessory should show "Done" on the final field. Ensure the form scrolls to keep the active field visible above the keyboard.

**Save Confirmation:**

After successful save, provide haptic feedback (success pattern) and briefly show a checkmark animation before dismissing the modal.

**iOS-Specific Considerations:**

- Use iOS form styling with grouped sections
- Date picker should use compact inline style when possible
- Keyboard should show ".00" key for price input
- Support shake-to-undo for recent edits

**Android-Specific Considerations:**

- Use Material outlined text fields
- Date picker should be Material Date Picker dialog
- Show "SAVE" in all caps per Material guidelines
- Support back gesture to cancel (with confirmation if dirty)
