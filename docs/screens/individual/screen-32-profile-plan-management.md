---
screen: 32
name: Profile & Plan Management
batch: 7
status: not_started
purpose: "Manage subscription plan, view billing history, and update payment methods."
user_story: "As a user, I want to manage my Klard subscription and billing so I can upgrade, downgrade, or update payment."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Avatar
      path: klard-web/src/components/ui/avatar.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: Modal
      path: klard-web/src/components/ui/modal.tsx
      exists: true
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: Avatar
      path: klard-mobile/src/components/ui/Avatar/Avatar.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Modal
      path: klard-mobile/src/components/ui/Modal/Modal.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "Payment method update failure"
    message: "Could not update payment method. Please try again."
  - scenario: "Payment processing error"
    message: "Payment failed. Please check your card details and try again."
  - scenario: "Upgrade failure"
    message: "Could not process upgrade. Please try again or contact support."
  - scenario: "Downgrade failure"
    message: "Could not process downgrade. Please try again or contact support."
  - scenario: "Cancellation failure"
    message: "Could not cancel plan. Please contact support."
  - scenario: "Invoice download failure"
    message: "Could not download invoice. Please try again."
  - scenario: "Last payment failed"
    message: "Your last payment failed. Update your payment method to continue service."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Plan status badges must have accessible names describing the plan state"
    - "Billing history table must be navigable by screen readers with row/column context"
    - "Payment method card icons must have descriptive alt text (e.g., 'Visa card')"
    - "Upgrade/downgrade confirmation modals must trap focus and be keyboard navigable"
    - "Failed payment banners must be announced via aria-live"
    - "Invoice download links must indicate file type and action"
---

# Screen 32: Profile & Plan Management

## Purpose
Manage subscription plan, view billing history, and update payment methods.

## User Story
As a user, I want to manage my Klard subscription and billing so I can upgrade, downgrade, or update payment.

---

## Web Implementation

**Layout Approach:**

This can be a dedicated page or a section within Settings. Given the importance of plan management, a dedicated page with clear hierarchy is recommended. Use the main application shell.

**Page Header:**

"Your Plan" as H1 with subtitle showing current plan: "You're on the [Plan Name] plan"

**Current Plan Card:**

Create a prominent card showing the user's active plan:

**Card Content:**
- Plan name with badge styling (Basic / Pro / Saver+)
- Price: "$16.99/month" or "$163/year"
- Billing cycle indicator
- Renewal date: "Renews on February 15, 2026"
- Status: "Active" badge in success green

**Plan Features:**
- Checklist of included features for current plan
- Styled to reinforce value

**Plan Actions:**
- If on trial: "X days remaining in trial" banner with "Choose Plan" button
- If on Basic/Pro: "Upgrade" button
- If on Saver+: "You're on our best plan!" message
- "Cancel Plan" text link (not prominent)

**Plan Comparison (Upgrade Section):**

If user is not on the highest plan, show upgrade options:

**Comparison Cards:**
Display available plans side by side (similar to Screen 6 Plan Selection but in account context):

- Current plan marked: "Current Plan" badge
- Higher plans show "Upgrade" button
- Lower plans show "Downgrade" button (if applicable)
- Highlight recommended upgrade with "Best Value" badge

**Upgrade Flow:**
Clicking "Upgrade" should:
1. Show confirmation of new price and features gained
2. Confirm payment method
3. Process upgrade (prorated if mid-cycle)
4. Show success confirmation

**Billing History Section:**

Display a table of past invoices and payments:

**Table Columns:**
- Date
- Description (e.g., "Saver+ Monthly", "Additional BurnerCard")
- Amount
- Status (Paid ✓, Failed ✗, Pending)
- Invoice (download link)

**Pagination:**
Show last 10 transactions with "Load More" or pagination for history.

**Failed Payment Handling:**
If any payment failed, show a banner: "Your last payment failed. Update your payment method to continue service."

**Payment Method Section:**

**Current Payment Method:**
- Card icon + "Visa ending in 4821"
- Expiry date
- "Default" badge if multiple methods
- "Update" button

**Add Payment Method:**
- "Add Payment Method" button
- Opens payment form (Stripe Elements or similar)
- Support for cards (credit/debit)

**Multiple Payment Methods:**
If supporting multiple:
- List all saved methods
- "Set as Default" action per method
- "Remove" action (with confirmation)

**Cancel Plan Section:**

Position at the bottom, de-emphasized but accessible:

**Cancellation Flow:**
1. Click "Cancel Plan"
2. Show what they'll lose (feature list)
3. Offer alternatives: "Downgrade to Pro instead?"
4. Confirm cancellation
5. Show end date: "Your plan will remain active until [Date]"

**Winback Offer (optional):**
Consider offering a discount or pause option before final cancellation.

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen view accessible from Settings or Profile. Organize content as scrollable sections.

**Header:**

"Plan & Billing" as navigation title

**Current Plan Section:**

Display prominently at the top:
- Plan name (large)
- Price
- "Renews [Date]" or "Trial ends [Date]"
- Status badge

**Quick Actions:**

Below the plan info, show relevant actions:
- "Upgrade Plan" (if not on Saver+) — Primary button
- "Manage Plan" — Secondary button (opens options sheet)

**Plan Options Sheet:**

When "Manage Plan" is tapped, show action sheet with:
- View All Plans
- Change Billing Cycle (monthly ↔ annual)
- Cancel Plan

**Billing History:**

Display as a scrollable list:
- Each row: Date, description, amount, status indicator
- Tap to view invoice detail or download

Keep this section collapsed by default with "View Billing History" to expand, since most users won't need it frequently.

**Payment Method:**

Show current payment method in a card format:
- Card brand icon + last 4 digits
- Expiry
- "Update" button

**Adding/Updating Payment:**

Present payment form in a bottom sheet or full-screen modal. Use Stripe or payment processor's mobile-optimized UI components.

**Plan Comparison:**

If user wants to upgrade, navigate to a dedicated comparison screen (similar to onboarding plan selection) optimized for the decision context.

**Cancellation Flow:**

Multi-step bottom sheets or full-screen flow:
1. "Are you sure?" with feature loss summary
2. Reason for cancellation (optional feedback)
3. Final confirmation with end date

**iOS-Specific Considerations:**

- Use native payment sheet styling if using Apple Pay
- Billing history should use grouped table styling
- Cancellation should feel deliberate (multiple confirmations)
- Support receipt viewing in Quick Look

**Android-Specific Considerations:**

- Support Google Pay if applicable
- Use Material cards for plan display
- Billing history as Material list items
- Handle Google Play subscription management if distributing via Play Store
