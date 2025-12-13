---
screen: 21
name: Create BurnerCard — Step 3 (Confirmation)
batch: 5
status: not_started
purpose: "Final review step before creating the BurnerCard, followed by secure card details reveal."
user_story: "As a user, I want to review my card settings before creation and securely receive my card details."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: BurnerCardDisplay
      path: klard-web/src/components/ui/burner-card-visual.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: BurnerCardDisplay
      path: klard-mobile/src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
    - name: Alert
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Checkbox
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
error_messages:
  - scenario: "Card creation fails"
    message: "Unable to create card. Please try again."
  - scenario: "Card details copy fails"
    message: "Failed to copy. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Success animation must respect reduced motion preference
    - Copy buttons must announce "Copied" state to screen readers
    - Security warning banners must use role="alert" for immediate announcement
    - Auto-hide countdown for revealed details must be announced
    - Confetti/sparkle animations must be purely decorative with no accessibility impact
---

# Screen 21: Create BurnerCard — Step 3 (Confirmation)

## Purpose
Final review step before creating the BurnerCard, followed by secure card details reveal.

## User Story
As a user, I want to review my card settings before creation and securely receive my card details.

---

## Web Implementation

**Layout Approach:**

This is the final step of the wizard modal. The screen has two distinct states: pre-creation review and post-creation reveal. Design both states within the same modal, with a clear transition between them.

**Progress Indicator:**

Show "Step 3 of 3" with all three steps complete/filled. The step labels should read: Type ✓ → Rules ✓ → Confirm.

**Pre-Creation State — Review Summary:**

**Header:**
Display "Review your BurnerCard" as H2 with subtitle "Confirm your settings before creating."

**Card Preview:**

Create a visual preview that resembles the final card. This preview should include:

- Card visual with glassmorphism styling
- Card nickname displayed prominently
- Type badge (One-Time / Recurring / Category)
- Masked placeholder number: "•••• ••••" (actual number not yet generated)
- Klard branding element

**Settings Summary:**

Below the card preview, display a summary list of all configured settings:

- **Card Type:** One-Time / Recurring / Category
- **Spending Limit:** $XX.XX
- **Expiry Rule:** Specific to type (e.g., "Locks after 14 days unused" or "Locks after 3 charges")
- **Linked Subscription:** [Service name] or "Not linked"
- **Notifications:** "On every charge" / "At 80% limit" / "Both" / "None"

For category cards, also show:
- **Allowed Categories:** List of selected categories

Each line item should have an "Edit" link that returns to Step 2 with that section focused.

**Important Notice:**

Display an info banner with a key icon or security shield:
"Your card details will be shown once after creation. Make sure to save them securely — they cannot be retrieved later."

This warning is critical as card details (full number, CVV) are shown only once for security.

**Navigation:**

- Primary button: "Create BurnerCard" with teal glow
- Secondary button: "Back" returns to Step 2
- Cancel link with confirmation

**Post-Creation State — Card Details Reveal:**

After successful creation, transform the modal content:

**Success Animation:**
Brief confetti or sparkle animation (subtle, 1-2 seconds). The card preview should animate to reveal the actual card details.

**Card Details Display:**

Show the full card information in a secure-feeling container:

- **Card Number:** Full 16-digit number with copy button
- **Expiry Date:** MM/YY format with copy button
- **CVV:** 3-digit code with copy button
- **Cardholder Name:** "KLARD USER" or user's name

Each detail row should have a prominent copy-to-clipboard button. When clicked, show brief "Copied!" feedback.

**Security Warning:**

Display a prominent warning banner in amber/warning color:
"⚠️ Save these details now. For security, they won't be shown again."

**Quick Actions:**

Provide immediate next steps:
- "Copy All Details" button that copies all card info formatted for password managers
- "Add to [Linked Subscription]" if a subscription was linked — navigates to edit that subscription with card pre-selected
- "View Card" link to go to the card detail view

**Completion:**

Primary button: "Done" closes the modal and navigates to BurnerCard Overview (Screen 18) or the linked subscription's detail page.

---

## Mobile Implementation

**Layout Approach:**

Continue the full-screen modal wizard. The post-creation reveal is particularly important on mobile where users may need to copy details to another app.

**Pre-Creation State:**

**Header:**
Navigation bar: "Back" | "Step 3 of 3" | [empty]
Screen title: "Review & Create"

**Card Preview:**

Display a larger card preview (filling ~40% of screen width) with all configured settings visible on the card graphic itself. This creates a "what you'll get" preview.

**Settings Summary:**

List all settings in a grouped section format. Each row shows the setting label, value, and an edit icon that returns to Step 2.

Keep the summary concise for mobile:
- Type: One-Time
- Limit: $20.00
- Expires: After 14 days
- Linked: Netflix
- Alerts: On

**Security Notice:**

Position the "save your details" warning prominently above the create button. Use warning color background to ensure visibility.

**Sticky Footer:**

"Create BurnerCard" as full-width primary button.

**Post-Creation State:**

**Success Feedback:**
- Haptic feedback (success pattern)
- Brief celebration animation
- Card visual transforms to show actual details

**Card Details Display:**

Show each detail in a clear, tappable row:

- Card Number: Displayed with spacing (4-digit groups), tap to copy
- Expiry: MM/YY, tap to copy
- CVV: •••, tap to reveal and copy (requires additional tap for security)
- Name: KLARD USER

Each row should show a copy icon and provide haptic feedback when copied. Show a toast: "Card number copied"

**Share/Save Options:**

Provide mobile-optimized saving options:
- "Copy All" button that copies all details
- "Save to Notes" (iOS) / "Save to Keep" (Android) integration if available
- "Share" using system share sheet (for password manager import)

**Security Warning:**

Persistent warning banner that this is the only time details are shown. Make it visually prominent without being dismissible.

**Completion:**

"Done" button navigates to card overview. If subscription was linked, offer "View Subscription" as secondary action.

**iOS-Specific Considerations:**

- Support adding card to Apple Wallet if technically feasible (future enhancement)
- Use haptic feedback on copy actions
- Consider using iOS password autofill integration hints
- Success animation should use native spring physics

**Android-Specific Considerations:**

- Support Google Pay integration if feasible (future)
- Use Material snackbar for copy confirmations
- Ripple effect on tappable detail rows
- Consider clipboard manager warnings on Android 13+
