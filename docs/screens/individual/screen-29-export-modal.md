---
screen: 29
name: Export Modal
batch: 6
status: not_started
purpose: "Allow users to export their data in various formats for personal records or external use."
user_story: "As a user, I want to export my subscription data so I can use it in spreadsheets or for tax purposes."
components:
  web:
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: DatePicker
      path: klard-web/src/components/ui/date-picker.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
  mobile:
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: DatePicker
      path: klard-mobile/src/components/ui/DatePicker/DatePicker.tsx
      exists: true
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
error_messages:
  - scenario: "Export generation failed"
    message: "Couldn't generate your export. Please try again."
  - scenario: "No data to export"
    message: "No data available for the selected options."
  - scenario: "Invalid date range"
    message: "End date must be after start date."
  - scenario: "File download failed"
    message: "Download failed. Try again or use a different browser."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Format selection radio buttons must announce current selection state
    - Data type checkboxes must announce checked/unchecked state
    - Export progress must be announced (starting, percentage, complete)
    - Success state must be announced with download link focus
    - Privacy note should be associated with the form via aria-describedby
---

# Screen 29: Export Modal

## Purpose
Allow users to export their data in various formats for personal records or external use.

## User Story
As a user, I want to export my subscription data so I can use it in spreadsheets or for tax purposes.

---

## Web Implementation

**Layout Approach:**

Implement as a modal (480px width) accessible from Analytics, Savings Report, or Settings. The export process should be straightforward with clear options.

**Header:**

"Export Data" as H2 with close button (X) in the top-right corner.

**Format Selection:**

Present export format options as radio buttons or selectable cards:

**CSV:**
- Description: "Spreadsheet-compatible format"
- Best for: Excel, Google Sheets, data analysis
- Icon: Table icon

**PDF:**
- Description: "Formatted report document"
- Best for: Printing, archiving, sharing
- Icon: FileText icon

**Excel (XLSX):**
- Description: "Native Excel format with formatting"
- Best for: Advanced Excel users
- Icon: Grid icon

Pre-select CSV as the most universal option.

**Data Selection:**

Allow users to choose what data to include via checkboxes:

**Data Types:**
- ☑️ Subscriptions (name, price, category, renewal date, status)
- ☑️ BurnerCards (name, type, limit, status — not full card numbers)
- ☐ Transaction History (BurnerCard charges)
- ☐ Savings Report (breakdown of savings)
- ☐ Price History (price changes over time)

Default: Subscriptions selected. Show record counts: "12 subscriptions", "4 cards", etc.

**Date Range:**

Provide date range options:

- All Time (default)
- This Year
- This Month
- Custom Range (reveals date pickers)

For "Custom Range", show two date pickers: Start Date and End Date.

**Privacy Note:**

Include a brief privacy assurance:
"Your export will be downloaded directly to your device. Klard does not store or transmit exported files."

**Actions:**

- Primary: "Export" (triggers download)
- Secondary: "Cancel"

**Export Progress:**

For larger exports, show a brief progress indicator:
- "Preparing your export..."
- Progress bar or spinner
- "Export complete!" with download trigger

For small exports, this can be nearly instantaneous.

**Success State:**

After export completes:
- Show success checkmark
- "Your export is ready"
- Download should trigger automatically
- "Download Again" link if auto-download failed
- "Export Another" to reset the form

---

## Mobile Implementation

**Layout Approach:**

Present as a bottom sheet or full-screen modal. Keep the interface simple — mobile users likely want quick exports without complex configuration.

**Header:**

"Export Data" as title with close/cancel button.

**Simplified Flow:**

On mobile, consider simplifying to fewer options:

**Step 1: What to Export**
Radio options:
- All My Data
- Subscriptions Only
- Savings Report Only

**Step 2: Format**
Radio options:
- PDF (recommended for mobile viewing)
- CSV (for spreadsheet apps)

**Step 3: Date Range**
Segmented control:
- All Time | This Year | This Month

**Export Button:**

Single "Export" button at the bottom. Keep it simple.

**Export Delivery:**

On mobile, consider these delivery options:

**Direct Download:**
- File downloads to device
- System handles file location (Files app on iOS, Downloads on Android)

**Share Sheet:**
- Opens native share sheet after generation
- User can save to Files, email, cloud storage, etc.
- More flexible than direct download

Recommend the Share Sheet approach for mobile as it gives users more control.

**Progress Feedback:**

Show brief loading indicator during generation. For quick exports, this might flash by. For larger exports, show progress.

**Success:**

Haptic feedback on completion. Either auto-open share sheet or show "Done" confirmation with "Share" button.

**iOS-Specific Considerations:**

- Use UIActivityViewController for sharing
- Support saving to Files app
- Consider AirDrop as share option
- PDF should be viewable in Quick Look preview

**Android-Specific Considerations:**

- Use Intent.ACTION_SEND for sharing
- Support saving to Downloads folder
- Consider Google Drive as common destination
- Handle storage permissions appropriately