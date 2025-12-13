---
screen: 22
name: BurnerCard Detail View
batch: 5
status: not_started
purpose: "Comprehensive view of a single BurnerCard with full management capabilities."
user_story: "As a user, I want to see all details about a BurnerCard so I can manage it effectively."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: BurnerCardDisplay
      path: klard-web/src/components/ui/burner-card-visual.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: BottomSheet
      path: klard-web/src/components/ui/sheet.tsx
      exists: true
      note: "Web uses Sheet component for slide-over panels"
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: BurnerCardDisplay
      path: klard-mobile/src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: Separator
      path: klard-mobile/src/components/ui/Separator/Separator.tsx
      exists: false
      note: "Mobile uses View with borderBottom styling for separation"
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
    - name: Alert
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
error_messages:
  - scenario: "Card lock/unlock fails"
    message: "Unable to update card status. Please try again."
  - scenario: "Card deletion fails"
    message: "Unable to delete card. Please try again."
  - scenario: "Biometric authentication fails"
    message: "Authentication failed. Please try again or use your passcode."
  - scenario: "Transaction export fails"
    message: "Unable to export transactions. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Lock/unlock toggle must announce current state ("Card is now locked" / "Card is now active")
    - Spending progress bar must have accessible description with percentage
    - Copy buttons must announce "Copied" confirmation
    - Auto-hide countdown for revealed details must be announced
    - Biometric prompt must have keyboard-accessible fallback
    - Transaction list items must be navigable with screen reader
    - Swipe actions must have accessible alternatives (context menu)
---

# Screen 22: BurnerCard Detail View

## Purpose
Comprehensive view of a single BurnerCard with full management capabilities.

## User Story
As a user, I want to see all details about a BurnerCard so I can manage it effectively.

---

## Web Implementation

**Layout Approach:**

Implement as a slide-over panel (480px width) from the right side of the BurnerCard Overview, or as a dedicated page with back navigation. The slide-over maintains context of the card list.

**Header Section:**

Display the card nickname as H1 with the type badge (One-Time/Recurring/Category) and status badge (Active/Locked/Expired) inline. Position icon actions in the top-right: Edit Name (Pencil), Delete (Trash with confirmation).

Include breadcrumb or back navigation: "← Back to BurnerCards"

**Card Visual Section:**

Display a large card graphic (similar to a physical credit card) containing:

- Klard logo/branding
- Card nickname
- Masked card number by default: "•••• •••• •••• 4821"
- Expiry date (masked or shown based on security preference)
- Cardholder name

Include a "Show Full Details" button below the card that requires re-authentication (password or biometric on mobile) before revealing full card number and CVV. This is a security measure for shared computers or when others might see the screen.

When revealed, show:
- Full 16-digit card number with copy button
- Full expiry with copy button
- CVV with copy button
- Auto-hide after 30 seconds or on user action

**Spending Overview Section:**

Display spending progress prominently:

**Progress Bar:**
Visual bar showing amount spent vs. limit. Use semantic colors:
- Under 50%: Default teal
- 50-80%: Default teal
- 80-99%: Warning amber
- At limit: Error red

**Stats Display:**
- "Spent: $15.50"
- "Limit: $20.00"
- "Remaining: $4.50"

If card has charge count limit instead of spending limit, show:
- "Charges: 2 of 3 used"
- "Remaining: 1 charge"

**Rules Summary Section:**

Display all configured rules in a readable format:

- **Card Type:** One-Time / Recurring / Category
- **Spending Limit:** $20.00
- **Expiry Rule:** Description based on type
- **Categories:** (for category cards) List of allowed categories
- **Notification Settings:** What alerts are enabled

Include an "Edit Rules" button that opens Screen 23 (Card Rules Configuration).

**Linked Subscription Section:**

If the card is linked to a subscription:
- Show subscription card preview (logo, name, price, status)
- "View Subscription" link to detail page
- "Unlink" action with confirmation

If not linked:
- "Link to Subscription" button
- Dropdown or search to select subscription

**Transaction History Section:**

Display a chronological list of all charges to this card:

Each transaction row shows:
- Date and time
- Merchant name
- Amount
- Status badge (Approved ✓, Declined ✗, Pending ⏳)

For declined transactions, show the decline reason if available:
- "Exceeded limit"
- "Card locked"
- "Invalid category"

If no transactions, show empty state: "No transactions yet. Charges will appear here when you use this card."

Provide "Export Transactions" option for users who need records.

**Primary Actions Section:**

Display prominent action buttons:

**Lock/Unlock Toggle:**
Large, obvious toggle switch showing current state. When locked, card is immediately unable to process charges. Include confirmation for locking an active card with remaining balance.

**Delete Card:**
Destructive action button (red/ghost style). Requires confirmation modal explaining that deletion is permanent and any linked subscriptions will need a new payment method.

---

## Mobile Implementation

**Layout Approach:**

Full-screen view accessible by tapping a card in the Overview. Use native navigation with back button and title.

**Header:**

Navigation bar with back arrow and card nickname as title. Place overflow menu (three dots) containing: Edit Name, Share Details, Delete.

**Card Visual:**

Display the card graphic prominently at the top (~50% width, centered). The card should feel tangible and premium.

Below the card, show the masked number with a "View Full Details" button. Tapping this should trigger biometric authentication (Face ID / Touch ID / Fingerprint) before revealing full details in a secure bottom sheet.

**Secure Details Sheet:**

When full details are revealed, present in a bottom sheet:
- Full card number with "Copy" button
- Expiry with "Copy" button
- CVV with "Copy" button
- "Copy All" button
- Auto-dismiss after 30 seconds with countdown indicator
- Manual "Done" to dismiss earlier

Provide haptic feedback on copy actions.

**Spending Section:**

Display spending progress as a horizontal progress bar spanning full width with stats below. Make this section visually prominent as it's key information users check frequently.

**Rules Section:**

Collapsible section showing all rules. Tap to expand full details. Include "Edit" button that navigates to rules config.

**Linked Subscription:**

If linked, show as a tappable card that navigates to subscription detail. If unlinked, show "Link Subscription" button that opens a selection sheet.

**Transaction History:**

Display as a scrollable list. Each row shows date, merchant, amount, and status indicator. Tap a transaction to see full details in a bottom sheet (timestamp, authorization code, etc.).

If the list is long, implement infinite scroll with "Load more" option.

**Lock/Unlock Action:**

Position a prominent lock toggle at the bottom of the scroll area or in a sticky footer. The toggle should be large and obvious with clear labeling:
- "Locked" (amber background, lock icon)
- "Active" (teal background, unlock icon)

**Swipe Actions:**

Support swipe gestures:
- Swipe left on a transaction: Report issue
- Long-press on card visual: Quick copy options

**iOS-Specific Considerations:**

- Biometric prompt should use Face ID / Touch ID with fallback to passcode
- Transaction list should use native grouped table styling
- Lock toggle should match iOS switch sizing
- Support 3D Touch / Haptic Touch for quick actions on card visual

**Android-Specific Considerations:**

- Biometric prompt should use BiometricPrompt API
- Transaction list should use Material list items
- Lock toggle should follow Material switch guidelines
- Support long-press context menus
