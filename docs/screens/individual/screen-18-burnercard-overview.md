---
screen: 18
name: BurnerCard Overview
batch: 4
status: not_started
purpose: "Central management hub for all user's virtual BurnerCards."
user_story: "As a Saver+ user, I want to see all my BurnerCards in one place so I can manage my payment protection."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: BurnerCardVisual
      path: klard-web/src/components/ui/burner-card-visual.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: Tabs
      path: klard-web/src/components/ui/tabs/tabs.tsx
      exists: true
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: BurnerCardVisual
      path: klard-mobile/src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: TabBar
      path: klard-mobile/src/components/ui/TabBar/TabBar.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "Failed to load cards"
    message: "Unable to load your BurnerCards. Please try again."
  - scenario: "Lock/unlock failed"
    message: "Unable to update card status. Please try again."
  - scenario: "Delete failed"
    message: "Unable to delete card. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Card status (Active/Locked/Expired) must be announced to screen readers"
    - "Lock/Unlock toggle must announce state change"
    - "Usage indicator must have accessible text describing cards used vs available"
    - "Filter pills must announce filter results count"
    - "Card actions in overflow menu must be keyboard accessible"
    - "Empty state and upgrade prompts must have clear focus order"
---

# Screen 18: BurnerCard Overview

## Purpose
Central management hub for all user's virtual BurnerCards.

## User Story
As a Saver+ user, I want to see all my BurnerCards in one place so I can manage my payment protection.

---

## Web Implementation

**Layout Approach:**

This screen lives within the main application shell, accessible via the sidebar navigation. The design should convey security and control while making card management intuitive.

**Page Header:**

Display "BurnerCards" as H1 with the usage indicator prominently shown:
- "3 of 4 cards used this month"
- Visual progress bar showing usage
- "Resets in X days" caption

To the right, place the primary CTA: "+ Create BurnerCard" button with teal glow.

If the user has reached their monthly limit, show: "Need more? $1 per additional card" as a link that opens the purchase flow.

**Usage Indicator Details:**

The monthly allowance visualization should clearly communicate:
- Cards used vs. available
- Visual progress bar (filled segments or continuous)
- Reset timing

If approaching the limit (3 of 4 used), consider an amber warning state. If at limit, show the bar in a muted state with the upsell option prominent.

**Card Grid:**

Display BurnerCards in a responsive grid: 3 columns on desktop, 2 on tablet. Each card should be a visually distinctive element that resembles a physical card while containing management information.

**Card Component Design:**

Each BurnerCard in the grid should display:

**Card Visual Header:**
- Glassmorphism or gradient background suggesting a premium card
- Card nickname prominently displayed
- Card type badge (One-Time, Recurring, Category)
- Status indicator (Active = teal, Locked = amber, Expired = gray)

**Card Details:**
- Masked card number: "•••• 4821"
- Spending progress: Progress bar showing "$15 of $20 spent"
- Linked subscription: Logo and name if linked, "Not linked" otherwise
- Expiry info: "Expires in 5 days" or "After 2 more charges"

**Quick Actions:**
- Lock/Unlock toggle switch
- "View Details" link
- Overflow menu (three dots) with: Edit Rules, Unlink Subscription, Delete

**Status-Based Styling:**

Apply distinct visual treatments based on card status:

- **Active:** Standard styling, teal accent elements
- **Locked:** Amber overlay, lock icon prominent, "Unlock" action emphasized
- **Expired:** Grayed out, "Expired" badge, minimal actions available
- **Used (One-Time):** Grayed out with "Used" badge, show single transaction

**Filter Pills:**

Above the grid, provide filter pills for quick filtering:
- All (default)
- Active
- Locked
- Expired

Show counts in each pill: "Active (2)", "Locked (1)"

**Empty State:**

For users with no BurnerCards:
- Illustration of a credit card with shield
- Headline: "No BurnerCards yet"
- Body: "Create virtual cards to protect against unwanted charges and control your spending."
- Primary CTA: "Create Your First BurnerCard"

**Tier Gating:**

For Basic/Pro users who don't have BurnerCard access:
- Show a promotional card explaining BurnerCards
- Feature highlights with icons
- "Upgrade to Saver+" CTA
- "Start 14-day free trial" secondary option

---

## Mobile Implementation

**Layout Approach:**

BurnerCards are accessed via the bottom tab bar (Cards tab). The screen should feel like a card wallet — swipeable, visual, and tactile.

**Header:**

Display "Cards" as the navigation title with the usage indicator below: "3 of 4 used • Resets in 12 days"

Place the "+ New Card" button in the navigation bar (top right) or as a floating action button.

**Card Display Options:**

Consider two display approaches for mobile:

**Option A — Stacked Card View:**
Cards displayed as overlapping stack that users swipe through horizontally. Each card shows its visual design prominently. Feels like flipping through a wallet.

**Option B — List View:**
Cards displayed as list items with card-like styling. More efficient for managing many cards. Better for quick scanning.

Recommend starting with List View for MVP, with card-like visual treatment for each row.

**List Item Design:**

Each card list item should show:
- Card visual preview (mini card graphic with masked number)
- Card nickname and type badge
- Status badge (Active/Locked/Expired)
- Spending progress bar
- Linked subscription indicator (logo or "Not linked")

**Swipe Actions:**

Support swipe gestures for quick management:
- Swipe left: Lock/Unlock toggle, Delete
- Swipe right: View Details

**Card Detail Quick View:**

Tapping a card should open a detail bottom sheet (half-screen) showing:
- Full card visual with all details
- Copy buttons for card number, expiry, CVV (with authentication)
- Quick actions: Lock/Unlock, View Full Details, Edit Rules

The full "View Details" action navigates to Screen 22.

**Empty State:**

Display a friendly illustration with:
- "No cards yet"
- Brief value proposition
- "Create Card" button

For non-Saver+ users, show upgrade prompt.

**iOS-Specific Considerations:**

- Consider using a page-style card stack (like Apple Wallet) for visual appeal
- Support haptic feedback on lock/unlock toggle
- Use context menus (long-press) for quick actions
- Card number copy should use secure paste

**Android-Specific Considerations:**

- Use Material card elevation for depth
- Support FAB for new card creation
- Implement bottom sheet with proper scrim
- Consider biometric prompt before showing full card details
