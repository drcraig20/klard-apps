# Klard UX Design Prompt — Batch 5
## Screens 21-25: BurnerCard Completion + Alerts System

---

## Screen 21: Create BurnerCard — Step 3 (Confirmation)

**Purpose:** Final review step before creating the BurnerCard, followed by secure card details reveal.

**User Story:** As a user, I want to review my card settings before creation and securely receive my card details.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 22: BurnerCard Detail View

**Purpose:** Comprehensive view of a single BurnerCard with full management capabilities.

**User Story:** As a user, I want to see all details about a BurnerCard so I can manage it effectively.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 23: Card Rules Configuration

**Purpose:** Edit the rules and settings of an existing BurnerCard.

**User Story:** As a user, I want to modify my BurnerCard rules when my needs change.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 24: Alerts Center

**Purpose:** Centralized hub for all notifications, alerts, and actionable items.

**User Story:** As a user, I want to see all my alerts in one place so I don't miss important subscription events.

---

### Web Specification

**Layout Approach:**

This screen lives within the main application shell, accessible via sidebar navigation. It serves as the central hub for all notification types, organized for easy scanning and action.

**Page Header:**

Display "Alerts" as H1 with an unread count badge if applicable: "Alerts (5)". Include a "Mark All as Read" action link in the header row that clears all unread indicators.

**Filter Tabs:**

Provide horizontal tabs for filtering alert types:

- **All:** Shows everything (default)
- **Renewals:** Upcoming renewal reminders
- **Price Changes:** Price increase/decrease alerts
- **Card Events:** BurnerCard charges, blocks, expirations
- **System:** Account-related notifications, tips

Show count badges on each tab indicating unread items in that category.

**Alert List:**

Display alerts as a vertical list of cards, sorted by date (newest first) by default. Provide a sort dropdown: "Newest first", "Oldest first", "Unread first".

**Alert Card Structure:**

Each alert should be a clear, scannable card containing:

**Left Edge Color Bar:**
A 4px colored bar on the left edge indicating alert type:
- Renewals: Teal (#0D7C7A)
- Price Increase: Warning Amber (#D97706)
- Price Decrease: Success Green (#059669)
- Blocked Charge: Error Red (#DC2626)
- Card Events: Teal
- Savings: Success Green
- System: Gray

**Icon:**
Type-specific icon matching the category:
- Calendar for renewals
- TrendingUp for price increases
- TrendingDown for price decreases
- Shield for blocked charges
- CreditCard for card events
- PiggyBank for savings
- Info for system

**Content:**
- **Title:** Brief description (e.g., "Netflix renews in 3 days")
- **Body:** Additional context (e.g., "You'll be charged $15.99 on January 15")
- **Timestamp:** Relative time ("2 hours ago", "Yesterday")

**Unread Indicator:**
Small teal dot on the left side for unread alerts. Clicking the alert marks it as read.

**Action Button:**
Contextual action button on the right:
- "View Subscription" for renewal alerts
- "See Details" for price change alerts
- "View Card" for card events

**Alert-Specific Content:**

**Renewal Reminder:**
- Title: "[Service] renews in X days"
- Body: "You'll be charged $X.XX on [Date]"
- Action: "View Subscription"

**Price Increase:**
- Title: "Price increase detected"
- Body: "[Service] went from $X to $Y (+Z%)"
- Action: "See Details" → Screen 25

**Blocked Charge:**
- Title: "Charge blocked"
- Body: "Your [Card Name] blocked a $X charge from [Merchant]"
- Action: "View Card"
- Include celebratory savings indicator if applicable

**Savings Milestone:**
- Title: "You saved $X this month!"
- Body: Celebratory message
- Action: "View Savings Report"

**Empty State:**

When no alerts exist:
- Illustration: Bell with checkmark
- Headline: "You're all caught up"
- Body: "No alerts right now. We'll notify you when something needs your attention."
- Optional: "View Subscriptions" secondary action

**Bulk Actions:**

Consider providing bulk action capabilities:
- Multi-select checkboxes
- "Delete Selected" action
- "Mark Selected as Read" action

---

### Mobile Specification

**Layout Approach:**

Alerts are accessible via the bottom tab bar. The screen should feel native to each platform's notification patterns while maintaining Klard branding.

**Header:**

"Alerts" as large title with unread badge. Include "Mark All Read" as a text button in navigation bar (top right).

**Filter Implementation:**

Use horizontally scrollable filter chips below the header instead of tabs:
- All (default)
- Renewals
- Price Changes
- Cards
- System

Each chip shows its unread count. Selected chip has filled background.

**Alert List:**

Display alerts as list items optimized for touch:

Each item should have:
- Color indicator bar (left edge)
- Icon (left)
- Content area (title, body, timestamp)
- Unread dot (if applicable)
- Disclosure indicator (right chevron)

Minimum row height: 72px for comfortable touch targets.

**Swipe Actions:**

Support swipe gestures:
- Swipe left: Delete / Dismiss
- Swipe right: Mark as read/unread

**Pull to Refresh:**

Implement pull-to-refresh to check for new alerts. Show native refresh indicator.

**Tap Behavior:**

Tapping an alert should:
1. Mark it as read
2. Navigate to the appropriate detail screen (Screen 25 for price alerts, Screen 26 for renewals, Card Detail for card events)

**Grouped by Date:**

Consider grouping alerts by date for easier scanning:
- Today
- Yesterday
- This Week
- Earlier

Show section headers for each group.

**Empty State:**

Center the empty state illustration and messaging. Use the same content as web but sized for mobile.

**Badge Management:**

The tab bar Alerts icon should show an unread count badge. This badge should update in real-time as alerts are read or new ones arrive.

**iOS-Specific Considerations:**

- Use native swipe-to-delete patterns
- Support pull-to-refresh with native indicator
- Large title should collapse on scroll
- Consider grouping with native section headers

**Android-Specific Considerations:**

- Use Material swipe actions with background icons
- Implement SwipeRefreshLayout for pull-to-refresh
- Use collapsing toolbar pattern
- Support snackbar with "Undo" for deletions

---

## Screen 25: Price Increase Alert Detail

**Purpose:** Provide detailed information about a detected price increase with actionable options.

**User Story:** As a user, I want to understand a price change and decide what action to take.

---

### Web Specification

**Layout Approach:**

This detail view can be a modal (560px width) or a dedicated page. The modal approach keeps users in context of the Alerts Center. Content should guide users toward making a decision about the subscription.

**Header:**

Display an alert icon (TrendingUp in amber) with the title "Price Increase Detected". Show the timestamp of when the increase was detected.

**Subscription Context:**

Show a subscription card preview at the top:
- Service logo (44px)
- Service name
- Category badge
- Status badge

This immediately orients the user to which subscription is affected.

**Price Comparison:**

Create a clear visual comparison of the price change:

**Before → After Display:**
Show old price and new price with an arrow between them:
"$12.99 → $14.99"

Use warning amber color for the increase amount.

**Change Details:**
- Monthly difference: "+$2.00/month"
- Percentage increase: "+15%"
- Annual impact: "+$24.00/year" (calculate and display)

This section should feel impactful but not alarmist — the goal is to inform, not create anxiety.

**Detection Source:**

Briefly explain how the price change was detected:
- "Detected from your recent receipt on [Date]"
- "Detected from service pricing page scan"

This builds trust in the accuracy of the alert.

**Impact Context:**

Provide perspective on what this means:
- "This is your Xth tracked price increase this year"
- "Your monthly total increases from $X to $Y"

**Action Options:**

Present clear action buttons:

**Primary Actions:**

1. **"Find Alternatives"** (Secondary button)
   - Navigates to Screen 30 (Alternative Finder) pre-filtered for this service's category
   - Label could include savings potential: "Find Alternatives (save up to $5/mo)"

2. **"Keep Subscription"** (Ghost button)
   - Dismisses the alert
   - Marks it as acknowledged
   - Optional: Add note explaining why keeping

**Secondary Actions:**

3. **"Open Cancellation Page"** (Text link with external icon)
   - Opens the service's cancellation URL in new tab
   - Only shown if cancellation URL is stored

4. **"Add Note"** (Text link)
   - Allows user to add a note to this subscription about the price change

**Post-Decision:**

After user takes action:
- If "Keep Subscription": Close modal, show toast "Got it. We'll keep tracking [Service] for you."
- If "Find Alternatives": Navigate to Alternative Finder
- If they cancel externally and return: Prompt to update subscription status

**Related Information:**

Optionally show:
- Price history chart (if available) showing trend over time
- Comparison to similar services
- Link to view full subscription details

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen detail view that pushes from the Alerts list. Users should be able to fully understand the situation and take action without leaving this screen.

**Header:**

Navigation bar with back arrow and "Price Alert" as title. Consider showing the service logo in the header for immediate recognition.

**Content Structure:**

Organize content as a scrollable single-column layout:

**Hero Section:**
- Service logo (large, 64px)
- Service name
- "Price Increased" badge in amber

**Price Change Display:**
Create a clear before/after comparison:
- Old price (crossed out or muted)
- Arrow icon
- New price (prominent, amber tint)
- Change amount and percentage below

Example layout:
```
    $12.99    →    $14.99
  ─────────────────────────
    +$2.00/month (+15%)
    +$24.00 per year
```

**Impact Summary:**

One or two lines explaining the broader impact:
"Your monthly subscription total is now $X"

**Action Buttons:**

Stack action buttons vertically for mobile:

1. "Find Cheaper Alternatives" — Primary button, full width
2. "Keep This Subscription" — Secondary button, full width
3. "Cancel Subscription" — Text link (opens external URL)

Position these in a sticky footer area for easy access while scrolling.

**Additional Context:**

Below the actions (scrollable area):
- Detection source
- Price history (if available, simplified for mobile)
- Link to full subscription details

**Swipe Gesture:**

Support swipe-from-left-edge to go back, consistent with platform navigation.

**Decision Confirmation:**

When user taps "Keep Subscription":
- Haptic feedback (light)
- Brief confirmation animation
- Toast: "Got it!"
- Auto-navigate back to Alerts (with this alert marked as handled)

When user taps "Find Alternatives":
- Navigate to Alternative Finder
- Deep-link context so alternatives are relevant to this service

**iOS-Specific Considerations:**

- Use SF Pro for price typography
- Price change should use semantic colors from iOS palette
- Actions should use iOS button styling
- Support swipe back gesture

**Android-Specific Considerations:**

- Use Material typography for price display
- Actions should follow Material button guidelines
- Support predictive back gesture
- External links should use Chrome Custom Tabs

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 5 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 21: Create BurnerCard – Step 3 | Card, BurnerCardDisplay, Button, Stepper, Alert, Checkbox |
| Screen 22: BurnerCard Detail View | Card, BurnerCardDisplay, Badge, Button, Switch, Separator, Tooltip, BottomSheet, Alert |
| Screen 23: Card Rules Configuration | Card, Switch, Input, Select, Slider, Button, Tooltip, Alert, Separator |
| Screen 24: Alerts Center | Card, AlertCard, Badge, Button, Tabs, EmptyState, Skeleton, SegmentedControl |
| Screen 25: Price Increase Alert Detail | Card, AlertCard, Badge, Button, ServiceLogo, Separator, Chart, Tooltip |

---

# End of Batch 5

---

*Batch 5 Complete: Screens 21-25 (Create BurnerCard Step 3, Card Detail View, Card Rules Config, Alerts Center, Price Increase Alert Detail)*

*Next: Batch 6 — Screens 26-30 (Renewal Reminder Detail, Spend Analytics Dashboard, Savings Report View, Export Modal, Alternative Finder)*
