# Klard UX Design Prompt — Batch 4
## Screens 16-20: Email Scan Completion + BurnerCard System

---

## Screen 16: Email Scan Progress

**Purpose:** Show real-time progress as Klard scans the user's email for subscription receipts.

**User Story:** As a user who connected my email, I want to see the scan progress so I know the system is working.

---

### Web Specification

**Layout Approach:**

This screen should feel like a focused task view. Use a centered layout (max-width 560px) without the main navigation shell, as users should stay focused on the scanning process. However, provide a way to minimize to background if desired.

**Progress Visualization:**

The primary visual element should be an animated progress indicator that communicates active scanning without showing a misleading percentage (since email scanning time varies unpredictably).

Implement an indeterminate progress animation: a horizontal bar with a moving gradient or a circular spinner with subtle pulse effect. Accompany this with animated iconography — consider a mail icon with a magnifying glass that has subtle motion.

**Status Messaging:**

Display dynamic status messages that update as the scan progresses. These messages should rotate every 3-5 seconds to indicate activity:

- "Connecting to your inbox..."
- "Scanning for subscription receipts..."
- "Found 3 subscriptions so far..."
- "Checking payment confirmations..."
- "Looking for recurring charges..."
- "Almost done..."

The count of found subscriptions should update in real-time when new subscriptions are detected. Display this prominently: "12 subscriptions found" with each new discovery triggering a subtle animation (number incrementing with a brief highlight).

**Live Discovery Feed:**

Below the main progress indicator, show a live feed of discovered subscriptions as they're found. Each item appears with a slide-in animation:

- Service logo (small, 32px)
- Service name
- Detected price
- Confidence indicator (high/medium/low as subtle badge)

Limit the visible feed to the 5 most recent discoveries with "and X more..." indicator. This gives users confidence that the scan is productive.

**Time Estimate:**

Provide a gentle time estimate without being overly specific: "This usually takes 2-5 minutes" initially, then update to "Almost done..." when nearing completion. Never show a countdown that might be inaccurate.

**Background Option:**

Include a "Continue in Background" secondary button that returns users to the dashboard or previous location. When backgrounded:
- Show a persistent but unobtrusive indicator in the topbar
- Send a notification when complete (if permissions granted)
- Allow returning to this progress view by clicking the indicator

**Completion Transition:**

When scanning completes:
1. Progress indicator transforms to a checkmark with success animation
2. Brief pause (1 second) to register completion
3. Display summary: "Scan complete! Found 15 subscriptions"
4. Auto-navigate to Review screen (Screen 17) after 2 seconds, or immediately on "Review Results" button click

**Error Handling:**

If the scan encounters issues:
- Show specific error message: "Connection interrupted" or "Unable to access some emails"
- Provide "Retry" button
- Offer "Continue with partial results" if some subscriptions were found
- Never lose already-discovered subscriptions

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen focused view. The user should feel engaged with the process without feeling trapped. Support the system back gesture but confirm if the user wants to cancel the scan.

**Progress Visualization:**

Center a prominent animated element — a circular progress indicator with the Klard logo or mail icon in the center works well on mobile. The animation should be smooth and battery-efficient (use Lottie or native animations rather than JavaScript).

Below the animation, show the subscription count prominently: large number (Display size) with "subscriptions found" label below.

**Status Updates:**

Rotate through status messages below the count. Keep messages short for mobile: "Scanning inbox...", "Found Netflix!", "Checking receipts..."

When a new subscription is discovered, briefly flash the service name with its logo before returning to the generic status message. This creates moments of delight as users see familiar services appear.

**Discovery Feed:**

Show the 3 most recent discoveries in a compact horizontal scroll or simple vertical list. Each shows logo and name only (price shown on review screen). New items animate in from the right or bottom.

**Background Behavior:**

The "Continue in Background" option is particularly important on mobile. When tapped:
- Return to the previous screen or dashboard
- Show a small progress indicator in the tab bar or header
- Queue a local notification for completion
- Support returning to full progress view

Implement proper background task handling:
- iOS: Use background fetch and local notifications
- Android: Use WorkManager for reliable background processing

**Completion:**

On completion, provide haptic feedback (success pattern). Show a brief celebratory animation if a significant number of subscriptions were found. Auto-navigate to the review screen.

**iOS-Specific Considerations:**

- Use native activity indicator styling as base
- Support Dynamic Island / Live Activities if available (iOS 16.1+)
- Background scanning should use BGTaskScheduler
- Completion notification should be actionable (tap to review)

**Android-Specific Considerations:**

- Consider showing progress in a foreground notification
- Use WorkManager for background reliability
- Completion notification should deep-link to review screen
- Support split-screen / picture-in-picture for multitasking users

---

## Screen 17: Email Scan Results Review

**Purpose:** Allow users to review and selectively import subscriptions discovered via email scan.

**User Story:** As a user, I want to review discovered subscriptions before importing so I only track what's relevant.

---

### Web Specification

**Layout Approach:**

This is a critical decision-making screen, so provide ample space and clear organization. Use the main application shell with a focused content area. The layout should support reviewing many items efficiently.

**Header Section:**

Display a summary header showing the scan results:
- "We found 15 subscriptions" as H1
- "Select which ones to add to your dashboard" as subtitle
- Timestamp: "Scanned from [email] • Just now"

Include bulk action controls: "Select All" checkbox, "Deselect All" link, and a count of selected items: "8 of 15 selected"

**Subscription List:**

Present discovered subscriptions as selectable cards in a list format. Each card should contain:

**Selection Control:** Checkbox on the left side, prominently sized for easy clicking.

**Service Identity:** Logo (44px) and service name. If the logo couldn't be determined, show a generic icon with the detected merchant name.

**Detected Details:**
- Price detected from receipts
- Billing cycle (if determinable)
- Last charge date found
- Category (auto-assigned)

**Confidence Indicator:** Show how confident the detection is:
- High confidence (green badge): Clear subscription receipt found
- Medium confidence (amber badge): Recurring charge pattern detected
- Low confidence (gray badge): Single receipt, might not be recurring

**Edit Option:** "Edit" link that expands the card to show editable fields for price, cycle, and category. Users should be able to correct any misdetected information before import.

**Grouping and Sorting:**

By default, sort by confidence (high first) so users see the most reliable detections at the top. Provide sort options: Confidence, Price (high to low), Alphabetical, Recently charged.

Consider grouping by category with collapsible sections: "Streaming (4)", "Productivity (3)", etc.

**Duplicate Detection:**

If a discovered subscription matches an existing tracked subscription, show it differently:
- Dimmed appearance
- "Already tracking" badge
- Pre-deselected
- Option to "Update existing" if details differ

**Card Expansion:**

When "Edit" is clicked on a card, expand it inline to reveal:
- Service name (editable text input)
- Price (editable currency input)
- Billing cycle (dropdown)
- Category (dropdown)
- "Looks wrong? Mark as not a subscription" link

**Import Actions:**

Fix a primary action bar at the bottom of the viewport:
- Primary button: "Add X Subscriptions" (count updates with selection)
- Secondary button: "Skip for Now"

The primary button should be disabled if nothing is selected.

**Post-Import Flow:**

After clicking "Add X Subscriptions":
1. Show brief loading state
2. Success toast: "8 subscriptions added to your dashboard"
3. Navigate to Subscription List or Dashboard
4. Offer to "Set up renewal reminders" or "Connect a BurnerCard" as follow-up prompts

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen list view with sticky header and footer. The list should support efficient bulk selection while allowing detailed review of individual items.

**Header:**

Use a compact header showing: "15 Found" as the title with "Select subscriptions to import" as subtitle. Place a "Select All" toggle in the header row.

Show the selection count updating in real-time: "8 selected"

**List Implementation:**

Each list item should be designed for touch interaction:

- Left side: Large checkbox (44px touch target)
- Center: Logo, service name (primary), price and cycle (secondary)
- Right side: Confidence badge and expand chevron

Support multi-select gestures:
- Tap checkbox to toggle selection
- Tap anywhere else on row to expand/view details
- Long-press to enter selection mode (if not already)

**Detail Expansion:**

Tapping a row (not the checkbox) should expand it to show full details and edit options. Use an accordion pattern where only one item is expanded at a time.

Expanded state shows:
- All detected details
- Edit fields for corrections
- "Not a subscription" option
- Collapse button

**Confidence Communication:**

For mobile, simplify confidence to visual indicators:
- High: Filled circle (green)
- Medium: Half-filled circle (amber)
- Low: Empty circle (gray)

Include a subtle "What's this?" info button that explains confidence levels in a bottom sheet.

**Sticky Footer:**

Fix the import button at the bottom above the safe area:
- Full-width primary button: "Add 8 Subscriptions"
- Disabled state when nothing selected
- Updates count in real-time

**Swipe Actions:**

Support swipe gestures for quick actions:
- Swipe right: Select/deselect item
- Swipe left: Mark as "Not a subscription"

**iOS-Specific Considerations:**

- Use native list selection styling (checkmarks on right side is iOS convention, but left works for this use case)
- Support edit mode with drag-to-reorder if useful
- Haptic feedback on selection changes
- Use iOS sheet presentation for detail editing

**Android-Specific Considerations:**

- Follow Material selection patterns (checkboxes on left)
- Support contextual action bar for bulk operations
- Ripple effect on touch
- Use Material bottom sheet for editing

---

## Screen 18: BurnerCard Overview

**Purpose:** Central management hub for all user's virtual BurnerCards.

**User Story:** As a Saver+ user, I want to see all my BurnerCards in one place so I can manage my payment protection.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 19: Create BurnerCard — Step 1 (Type Selection)

**Purpose:** First step of card creation wizard where users choose the type of protection they need.

**User Story:** As a user creating a BurnerCard, I want to understand the different card types so I can choose the right protection.

---

### Web Specification

**Layout Approach:**

Implement as a modal wizard (640px max-width) that guides users through card creation. The wizard should feel focused and not overwhelming despite the configuration options.

**Progress Indicator:**

Show a step indicator at the top: "Step 1 of 3" with visual dots or segments. Label the steps: Type → Rules → Confirm.

**Header:**

Display "Create BurnerCard" as H2 with subtitle "Choose your card type" below. Include a close button (X) that triggers an "are you sure?" confirmation if any selections have been made.

**Type Selection Cards:**

Present three card type options as large, selectable cards arranged horizontally (or vertically on narrow viewports). Each card should clearly communicate its use case.

**One-Time Card:**

- Icon: Zap (or similar instant/single-use icon)
- Title: "One-Time"
- Description: "Single use only. Automatically locks after the first charge."
- Best for: "Free trials, one-time purchases"
- Visual indicator: "1" badge or single-use iconography

**Recurring Card:**

- Icon: Repeat
- Title: "Recurring"
- Description: "Allows multiple charges up to limits you set."
- Best for: "Subscriptions with known end dates, budgeted spending"
- Visual indicator: Circular arrows or repeat iconography

**Category-Locked Card:**

- Icon: Tag (or Shield with tag)
- Title: "Category"
- Description: "Only works for specific merchant categories you choose."
- Best for: "Budget control by spending type (streaming only, etc.)"
- Visual indicator: Category icons

**Selection Interaction:**

When a card type is selected:
- Apply teal border and subtle teal background tint
- Show a checkmark in the corner
- Other cards become slightly dimmed
- "Continue" button becomes enabled

Hovering a card should show subtle elevation increase and a brief tooltip with additional detail if helpful.

**Educational Element:**

Below the card options, include a "Which should I choose?" collapsible section that expands to show a comparison table or decision flowchart:

- "Signing up for a free trial?" → One-Time
- "Want to limit how long you pay for something?" → Recurring
- "Want to control spending by type?" → Category

**Navigation:**

- Primary button: "Continue" (disabled until selection made)
- Secondary button: "Cancel" (closes wizard with confirmation)

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen modal that slides up. The wizard should feel like a focused flow that guides users step-by-step.

**Header:**

Navigation bar with "Cancel" on left, step indicator centered ("Step 1 of 3"), and empty right side. Title below nav: "Choose card type"

**Type Selection:**

Display the three card types as vertically stacked, full-width selection cards. Each card should be tappable with clear selected/unselected states.

**Card Layout:**

Each type card contains:
- Icon (32px) and title on the same line
- Description text below
- "Best for:" helper text in caption style
- Radio indicator or checkmark showing selection state

Make the entire card tappable, not just a radio button.

**Selection Feedback:**

On tap:
- Selected card gets teal border and subtle background
- Haptic feedback (light impact)
- Other cards dim slightly
- "Continue" button enables and may animate subtly

**Help Section:**

Include a "Help me choose" expandable section at the bottom. When tapped, expand to show simple guidance or open a help bottom sheet with comparison information.

**Sticky Footer:**

Fix the "Continue" button at the bottom above safe area. Show disabled state until selection is made.

**iOS-Specific Considerations:**

- Use native selection styling (checkmark in trailing position)
- Cards should have rounded corners matching iOS design
- Haptic: Selection feedback on type choice
- Support swipe-to-dismiss with confirmation

**Android-Specific Considerations:**

- Use radio button indicators per Material patterns
- Ripple effect on card tap
- Material elevation on selected card
- Support back gesture with confirmation

---

## Screen 20: Create BurnerCard — Step 2 (Rules Configuration)

**Purpose:** Configure spending limits, expiry rules, and other parameters for the new BurnerCard.

**User Story:** As a user, I want to set rules for my BurnerCard so it protects me the way I need.

---

### Web Specification

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

### Mobile Specification

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

---
# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 4 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 16: Scan Progress | ProgressBar, Card, Spinner, Button, Alert, Skeleton |
| Screen 17: Scan Results Review | Card, Checkbox, SubscriptionCard, ServiceLogo, Button, Badge, Alert, Skeleton |
| Screen 18: BurnerCard Overview | Card, BurnerCardDisplay, Badge, Button, EmptyState, Tooltip, Tabs |
| Screen 19: Create BurnerCard – Step 1 | Card, Input, Select, Stepper, Button, SearchInput, ServiceLogo |
| Screen 20: Create BurnerCard – Step 2 | Card, Slider, Input, Switch, Stepper, Button, Tooltip, CurrencyInput |

---

# End of Batch 4

---

*Batch 4 Complete: Screens 16-20 (Scan Progress, Scan Results Review, BurnerCard Overview, Create BurnerCard Steps 1-2)*

*Next: Batch 5 — Screens 21-25 (Create BurnerCard Step 3, Card Detail View, Card Rules Config, Alerts Center, Price Increase Alert Detail)*
