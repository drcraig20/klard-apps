# Klard UX Design Prompt — Batch 3
## Screens 11-15: Core Subscription Management + Email Sync

---

## Screen 11: Subscription List View

**Purpose:** Provide a comprehensive, filterable view of all tracked subscriptions.

**User Story:** As a user, I want to see all my subscriptions in one place so I can manage them efficiently.

---

### Web Specification

**Layout Approach:**

This screen lives within the main application shell (sidebar + topbar). The content area should maximize the subscription list while providing powerful filtering without overwhelming the interface.

**Page Header:**

Position the page title "Subscriptions" as an H1 in the top-left of the content area. Include a count badge next to the title showing the total number of subscriptions (e.g., "Subscriptions (12)"). This count should update dynamically when filters are applied to show "X of Y" format.

To the right of the title, place a view toggle using a segmented control with three options: List (default), Grid, and Calendar. The Calendar option navigates to Screen 14 rather than changing the view in-place. Use icons with labels for clarity: List icon, Grid icon, Calendar icon.

**Filter System:**

Implement a collapsible filter panel that sits between the header and the list. By default, show a single row with the most common filters: a search input, status dropdown, and a "More Filters" button. When expanded, reveal the complete filter set.

The filter fields should include:

- **Search:** Full-width text input that searches service names. Implement debounced search (300ms delay) to avoid excessive API calls. The search should be case-insensitive and support partial matching.

- **Status:** Multi-select dropdown with options: All (default), Active, Trial, Paused, Blocked, Cancelled. Use status badges with appropriate colors in the dropdown items for visual recognition.

- **Category:** Multi-select dropdown populated dynamically from user's subscription categories. Show category icon next to each option.

- **Price Range:** Two number inputs (Min/Max) with currency symbol prefix. Include quick presets: "Under $10", "$10-25", "$25-50", "Over $50".

- **Renewal Timeframe:** Dropdown with options: Any time, This week, This month, Next 30 days, Next 90 days.

- **Payment Method:** Dropdown showing user's payment methods including any linked BurnerCards.

- **Sort By:** Dropdown with options: Renewal date (soonest first), Renewal date (latest first), Price (high to low), Price (low to high), Name (A-Z), Name (Z-A), Recently added, Category.

Include a "Clear All Filters" ghost button that appears when any filter is active. Show an active filter count badge on the "More Filters" button when collapsed filters are applied.

**List View Implementation:**

Each subscription should render as a card-style row with consistent height (approximately 72px). Structure each row with the following elements from left to right:

1. **Service Logo:** 44px circular container with the service logo. Use a placeholder icon (Globe) for custom services without logos.

2. **Primary Info Column:** Service name as the primary text (Body weight medium), with category badge and payment method indicator below (Caption size).

3. **Status Column:** Status badge using semantic colors (Active = teal, Trial = amber, Paused = slate, Blocked = red, Cancelled = gray).

4. **Price Column:** Monthly price prominently displayed. If billed annually, show monthly equivalent with "billed annually" caption below.

5. **Renewal Column:** Next renewal date with countdown. Format as "Jan 15" with "in 3 days" below. Color the countdown: 3 days or less = warning amber, otherwise default.

6. **Protection Indicator:** If linked to a BurnerCard, show a small shield icon with teal color. On hover, tooltip shows "Protected by [Card Name]".

7. **Price Change Indicator:** If a price increase was detected, show an upward arrow icon in warning amber.

8. **Actions Column:** Three icon buttons visible on hover: Edit (Pencil), Open Cancel Link (ExternalLink), Delete (Trash). The delete action should require confirmation.

Implement alternating row backgrounds for improved scanability (#FFFFFF and #F8FAFC). On hover, show a subtle elevation increase and reveal the action buttons.

**Grid View Implementation:**

When Grid view is selected, display subscriptions as cards in a responsive grid. Use 4 columns on desktop (1440px+), 3 columns on laptop (1024px+), and 2 columns on tablet.

Each card should include: service logo (64px), service name, status badge, category, price with billing cycle, and renewal date with countdown. Cards linked to BurnerCards should have a teal left border (3px) as a protection indicator.

Card actions should appear in a footer row: Edit and Delete buttons. Clicking anywhere else on the card navigates to the detail view.

**Empty State:**

When no subscriptions exist, center an illustration showing an empty wallet or calendar. Display the headline "No subscriptions yet" with body text "Start tracking your recurring payments to take control of your spending." Include a primary CTA button "Add Your First Subscription" that opens the add modal.

When filters return no results, show a different empty state: "No subscriptions match your filters" with a "Clear Filters" button.

**Loading State:**

While data loads, show skeleton cards matching the row structure. Use shimmer animation moving left-to-right. Display 5-8 skeleton rows to fill the viewport.

**Pagination:**

Implement infinite scroll as the primary pagination method. Load 20 subscriptions initially, then fetch more as the user scrolls within 200px of the bottom. Show a subtle loading indicator when fetching.

Provide a "Load More" button as fallback for users who prefer explicit pagination or have infinite scroll disabled.

---

### Mobile Specification

**Layout Approach:**

On mobile, the subscription list is a primary destination accessible via the bottom tab bar. The screen should feel native to each platform while maintaining Klard's design language.

**Header Behavior:**

Use a large title style that collapses on scroll ("Subscriptions" as the title). Include the subscription count in the collapsed state. Place a filter icon button in the top-right that opens a filter bottom sheet.

The view toggle (List/Grid) should be a segmented control below the title, above the list content. Calendar view is accessed through the tab bar rather than this toggle.

**Search Implementation:**

Position a search bar below the header that becomes sticky when scrolling. The search bar should use the platform-native search field styling (iOS search bar, Android search with clear button). Implement the same 300ms debounce as web.

When search is active, show a "Cancel" button to clear and dismiss. Hide the view toggle while search is focused to maximize list space.

**Filter Bottom Sheet:**

Tapping the filter icon opens a bottom sheet (iOS) or full-screen modal (Android) containing all filter options. Structure filters as a scrollable form with clear section headers.

Include an "Apply Filters" primary button fixed at the bottom. Show a "Reset" text button in the header to clear all filters. Display the count of active filters on the filter icon badge.

**List Items:**

Each list item should be designed for touch interaction with a minimum height of 72px. Structure each item as:

- Left: Service logo (40px)
- Center: Service name (primary), category + renewal info (secondary)
- Right: Price and status badge stacked

Implement swipe gestures for quick actions:
- Swipe left reveals: Cancel Link (blue), Delete (red)
- Swipe right reveals: Edit (teal)

Include a BurnerCard protection indicator as a small shield icon next to the service name when applicable.

Tapping an item navigates to the Subscription Detail View. Ensure the entire row is the touch target.

**Grid View:**

On mobile, grid view displays 2 columns. Cards should be compact, showing logo, name, price, and status only. Tap navigates to detail; long-press reveals action menu.

**Pull to Refresh:**

Implement pull-to-refresh to reload subscription data. Use platform-native refresh indicators. Show a brief success haptic when refresh completes.

**iOS-Specific Considerations:**

- Use SF Pro for typography with proper Dynamic Type support
- Swipe actions should use iOS system styling (destructive = red background)
- List should use grouped inset table styling for visual consistency
- Support 3D Touch / Haptic Touch for preview (peek) of subscription detail
- Filter sheet should be a half-sheet (detent) that can expand to full

**Android-Specific Considerations:**

- Implement Material 3 list item styling
- Swipe actions should use Material delete/edit icon backgrounds
- Support predictive back gesture
- Filter modal should slide up from bottom with scrim
- Include FAB for "Add Subscription" in addition to center tab

---

## Screen 12: Subscription Detail View

**Purpose:** Provide comprehensive information about a single subscription with all available actions.

**User Story:** As a user, I want to see all details about a subscription so I can make informed decisions about keeping or cancelling it.

---

### Web Specification

**Layout Approach:**

This view can be implemented either as a full page or as a slide-over panel from the right (480px width). The slide-over approach is recommended as it maintains context of the subscription list. If using full page, provide clear back navigation.

**Header Section:**

Display the service logo prominently (64px) alongside the service name as H1. Position the status badge to the right of the name. Include an icon button row in the top-right: Edit (opens edit modal), External Link (opens service website), and Delete (with confirmation).

Below the name, show a breadcrumb or back link: "← Back to Subscriptions" for full-page view, or an X close button for slide-over.

**Overview Card:**

The first content section should be a card containing the essential subscription information:

- **Price:** Display prominently in H2 size (e.g., "$15.99/month"). If billed annually, show the annual total in caption below.
- **Next Renewal:** Date formatted as "January 15, 2026" with countdown badge ("in 3 days").
- **Category:** Badge with category icon and name.
- **Payment Method:** Card ending (e.g., "•••• 4821") or BurnerCard name.
- **Date Added:** Caption showing when the user started tracking this subscription.

**BurnerCard Protection Section:**

If the subscription is linked to a BurnerCard, display a dedicated section with a teal background tint. Show:

- Shield icon with "Protected by [Card Name]"
- Card status (Active/Locked/Expired)
- Spending limit progress bar if applicable
- "View Card" link navigating to Screen 22 (BurnerCard Detail)

If not linked, show a prompt card: "Protect this subscription with a BurnerCard" with "Link Card" button. This section is only visible for Saver+ users.

**Price History Section:**

Display a line chart showing price over time. The x-axis represents time (months), y-axis represents price. Plot each price change as a point on the line.

Below the chart, list price change events chronologically:
- Date of change
- Old price → New price
- Percentage change

If no price changes have occurred, show a simple message: "No price changes detected since you started tracking."

Include a comparison stat: "Current price vs. when you started: +$2.00 (+15%)" in warning color if increased, success color if decreased.

**Actions Section:**

Provide prominent action buttons:

1. **Open Cancellation Page** (Primary style, external link icon): Opens the service's cancellation URL in new tab. If no URL is saved, show "Add Cancellation Link" instead.

2. **Find Alternatives** (Secondary style): Navigates to Screen 30 (Alternative Finder) pre-filtered for this subscription's category.

3. **Link BurnerCard** (Secondary style, Saver+ only): Opens card linking flow if not already protected.

**Notes Section:**

Include an expandable notes area where users can add personal notes about the subscription. Implement auto-save on blur with a subtle "Saved" indicator. Use a textarea with placeholder: "Add notes about this subscription..."

**Metadata Footer:**

At the bottom, show metadata in caption size: Date added, Last updated, Subscription ID (for support purposes).

---

### Mobile Specification

**Layout Approach:**

On mobile, implement this as a full-screen view that pushes onto the navigation stack. Use a native navigation pattern with back button and title in the header.

**Header:**

The navigation bar should display the service name as the title with the status badge inline. Place an overflow menu (three dots) in the top-right containing: Edit, Share, Delete actions.

**Content Structure:**

Organize content as a scrollable list of sections. Each section should be a card with consistent padding and spacing. The order should be:

1. Service identity (logo + name) as a hero section
2. Overview details (price, renewal, category, payment)
3. BurnerCard protection status
4. Price history (simplified chart)
5. Actions
6. Notes

**Service Hero:**

Display the service logo large (80px) centered at the top with the service name below. Include the website domain as a tappable link.

**Overview Section:**

Present key details in a structured list format:
- Price: "$15.99/month" (right-aligned)
- Next Renewal: "Jan 15, 2026 (in 3 days)"
- Category: "Streaming" with icon
- Payment: "Visa •••• 4821"
- Tracking Since: "Mar 2024"

**Price History:**

On mobile, simplify the chart to show the last 6 months maximum. Display price points with dots connected by lines. Show percentage change prominently below the chart.

If history is limited, show a card format instead: "You started at $12.99 → Now $15.99 (+23%)"

**Actions:**

Display actions as full-width buttons stacked vertically:
1. "Open Cancellation Page" (Primary)
2. "Find Cheaper Alternatives" (Secondary)
3. "Link BurnerCard" (Secondary, conditional)

These should be positioned in a sticky footer area for easy access while scrolling.

**Swipe to Delete:**

Support swipe-from-right to reveal delete action, consistent with the list view. Require confirmation before deletion.

**iOS-Specific Considerations:**

- Use iOS-native share sheet for sharing subscription info
- Implement haptic feedback on action button taps
- Price history chart should use SF Symbols for data points
- Notes field should expand smoothly with keyboard

**Android-Specific Considerations:**

- Use Material bottom sheet for overflow menu items
- Implement ripple effects on all tappable areas
- Support Android share intent for subscription sharing
- Notes should use outlined text field style

---

## Screen 13: Add/Edit Subscription Modal

**Purpose:** Unified form for creating new subscriptions or editing existing ones.

**User Story:** As a user, I want to add or edit subscription details so my tracking is accurate.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 14: Calendar View

**Purpose:** Visualize subscription renewals across time for better financial planning.

**User Story:** As a user, I want to see my renewals on a calendar so I can plan my spending.

---

### Web Specification

**Layout Approach:**

This view lives within the main application shell. The content area should dedicate maximum space to the calendar grid with a detail panel for the selected day.

**Header:**

Display "Calendar" as the H1 page title. Include navigation controls: Previous/Next month arrows flanking the current month/year display (e.g., "December 2025"). Add a "Today" button that jumps to the current month and selects today's date.

Provide a view toggle: Month (default) and Week views as a segmented control. Include a "List View" link that navigates back to Screen 11.

**Month View Grid:**

Render a standard 7-column calendar grid with day headers (Sun-Sat or Mon-Sun based on locale). Each day cell should be a minimum of 100px height to accommodate content.

**Day Cell Content:**

For each day with renewals, display:
- The day number in the top-left
- Up to 3 subscription indicators (small pills with service initial or logo)
- A "+X more" indicator if more than 3 renewals exist
- Total amount due that day as a subtle badge in the corner

Days with renewals in the next 3 days should have a warning tint. Today's date should have a distinctive border (teal).

**Day Cell Interactions:**

Hovering a day should show a tooltip with quick summary: "3 renewals • $45.97 due". Clicking a day selects it and populates the detail panel. Double-clicking a subscription pill navigates directly to that subscription's detail.

**Selected Day Detail Panel:**

Position a panel on the right side (320px width) or below the calendar (on narrower screens). This panel shows:

- Selected date header with day of week
- Total amount due
- List of subscriptions renewing that day

Each subscription in the list shows: logo, name, price, status badge, and quick actions (View, Edit). If the list is long, make it scrollable within the panel.

Include a "Add Subscription" button at the bottom of the panel to pre-fill the renewal date.

**Week View:**

When Week view is selected, show 7 days horizontally with more vertical space per day. This allows showing more subscription details directly in the cells rather than relying on the detail panel.

Each day column should list subscriptions vertically with: logo, name (truncated), and price. This view is particularly useful for users with many subscriptions.

**Color Coding:**

Consider color-coding renewal indicators by category or by urgency:
- Overdue: Error red
- Today/Tomorrow: Warning amber
- This week: Default teal
- Future: Muted gray

Provide a legend if color coding is used.

---

### Mobile Specification

**Layout Approach:**

On mobile, the calendar should feel native to the platform while maintaining Klard functionality. Prioritize the month view with a scrollable detail section below.

**Header:**

Use a collapsing header pattern. In expanded state, show the full month/year with navigation arrows. Add "Today" as a text button. The header should collapse to just the month/year on scroll.

**Month View:**

Display a compact calendar grid optimized for mobile viewports. Each day cell should show:
- Day number
- Colored dots indicating renewals (up to 3 dots)
- Single dot styles: filled circle for 1 renewal, ring + fill for 2+

The current date should have a filled teal circle background on the day number. Selected date should have a teal ring outline.

**Day Selection:**

Tapping a day should:
1. Highlight the selected day
2. Scroll to reveal the detail section below the calendar
3. Provide light haptic feedback

**Detail Section:**

Below the calendar grid, show the selected day's details. This section should be a full-width list:

- Date header (e.g., "Monday, January 15")
- Total due badge
- Subscription list with swipe actions

If no date is selected, show upcoming renewals for the current week as the default view.

**Week View:**

On mobile, week view shows a horizontal scrollable strip of 7 days at the top with the detail list below. Each day in the strip shows the date number and a renewal count badge. Tapping a day in the strip updates the list below.

**Swipe Navigation:**

Support horizontal swipe on the calendar grid to navigate between months. Use spring physics for natural feel. Haptic feedback on month change.

**iOS-Specific Considerations:**

- Calendar grid should match iOS Calendar app patterns
- Support peek and pop on subscription items
- Month navigation should animate smoothly
- Consider using DatePicker inline style for quick date jumping

**Android-Specific Considerations:**

- Follow Material Design calendar patterns
- Support edge swipe for month navigation
- Implement shared element transitions when opening subscription detail
- Use Material motion for section reveals

---

## Screen 15: Email Connection Setup

**Purpose:** Guide users through connecting their email for automatic subscription detection.

**User Story:** As a user, I want to connect my email so Klard can find my subscriptions automatically.

---

### Web Specification

**Layout Approach:**

This can be a full-page flow or a modal wizard. Given the sensitivity of email connection, a dedicated page with clear privacy messaging is recommended. Center content with max-width of 640px.

**Introduction Section:**

Begin with reassuring messaging. Display a large illustration showing emails being scanned for receipts (abstract, not showing actual email content). 

Headline: "Connect Your Email" (H1)
Subheadline: "We'll scan for subscription receipts to save you time."

Include a prominent privacy statement card with a lock icon:
"**Your privacy is protected**
• We only scan for subscription receipts and payment confirmations
• We never read personal emails, attachments, or contacts
• You can disconnect anytime and we'll delete all synced data
• Connection is read-only — we cannot send emails or modify anything"

**Email Provider Selection:**

Display supported email providers as large selection cards:

1. **Gmail** (Google logo): Most common, OAuth via Google
2. **Outlook** (Microsoft logo): OAuth via Microsoft  
3. **Yahoo** (Yahoo logo): OAuth via Yahoo
4. **Other** (Mail icon): Show message that other providers are coming soon

Each card should show the provider logo prominently with the provider name below. On hover, show subtle elevation. Selected state shows teal border.

**OAuth Flow:**

When a provider is selected, show a brief loading state ("Connecting to Gmail...") before redirecting to the OAuth consent screen.

After OAuth consent is granted, the user returns to Klard. Show a success state:
- Checkmark animation
- "Gmail connected successfully"
- "We're now scanning for subscriptions. This may take a few minutes."

Provide options:
- "Scan Now" (Primary) → Navigates to Screen 16 (Scan Progress)
- "Scan in Background" → Returns to previous screen, shows progress indicator in header

**Error Handling:**

If OAuth fails or is cancelled:
- Show inline error message: "Connection was cancelled or failed"
- Provide "Try Again" button
- Link to troubleshooting help

If the provider is temporarily unavailable:
- Show service status message
- Suggest trying again later or using a different import method

**Already Connected State:**

If visiting this screen with an already-connected email:
- Show the connected email address
- Display last sync timestamp
- Provide "Sync Now" and "Disconnect" options
- Show connection health indicator

**Skip Option:**

Include a subtle "Skip this step" or "I'll add subscriptions manually" link at the bottom for users who don't want to connect email.

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen flow accessible from the Import Hub or Settings. Use native navigation patterns with clear back navigation.

**Privacy-First Header:**

Display a shield icon with the screen title "Email Sync". In the header area, include a small privacy badge: "Read-only access • Optional"

**Introduction:**

Show a compact illustration (120px height) depicting email scanning. Keep the privacy messaging prominent but more compact:

"We scan for subscription receipts only. Your personal emails stay private."

Include an expandable "Learn more about privacy" section that reveals the detailed privacy bullet points.

**Provider Selection:**

Display provider options as large touch-friendly cards (minimum 64px height):
- Gmail with Google logo
- Outlook with Microsoft logo  
- Yahoo with Yahoo logo
- Apple Mail (iOS only) — note: "Coming soon"

Cards should fill the width with consistent spacing. Show a checkmark on the selected provider before proceeding.

**OAuth Flow:**

Tapping a provider should:
1. Show brief "Connecting..." loading state
2. Open OAuth in native auth session (ASWebAuthenticationSession on iOS, Custom Tabs on Android)
3. Return to app with result

On successful connection:
- Show success animation with haptic feedback
- Display the connected email address
- Provide "Start Scanning" primary button

On failure:
- Return to selection state
- Show error alert with retry option

**Scan Initiation:**

After connection, give users control:
- "Start Scanning Now" → Navigate to Screen 16
- "Scan in Background" → Return to previous flow with status indicator

Display estimated time: "This usually takes 2-5 minutes depending on your inbox size."

**iOS-Specific Considerations:**

- Use ASWebAuthenticationSession for OAuth (shares Safari cookies)
- Support Sign in with Apple for Apple Mail integration (future)
- Provide haptic feedback on successful connection
- Consider adding to Settings app integration for mail access

**Android-Specific Considerations:**

- Use Chrome Custom Tabs for OAuth flow
- Support Google One Tap for Gmail if available
- Handle back button during OAuth gracefully
- Show loading indicator in status bar during connection

**Accessibility:**

- All provider options must be accessible via screen reader
- OAuth loading states should announce to assistive technology
- Privacy information should be accessible without visual-only cues

---

# End of Batch 3

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 3 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 11: Subscription List View | Card, SubscriptionCard, SearchInput, Select, Badge, Button, Skeleton, EmptyState, Sidebar, TabBar |
| Screen 12: Subscription Detail View | Card, ServiceLogo, Badge, Button, ProgressBar, Separator, AlertCard, Tooltip, BottomSheet |
| Screen 13: Add/Edit Subscription Modal | Modal, Input, Select, DatePicker, CurrencyInput, SearchInput, Button, Checkbox, Switch |
| Screen 14: Calendar View | Calendar, Card, Badge, SubscriptionCard, Button, Tooltip, Popover |
| Screen 15: Email Connection Setup | Card, Button, Checkbox, Alert, Spinner, Stepper, Badge |

---

*Batch 3 Complete: Screens 11-15 (Subscription List View, Subscription Detail View, Add/Edit Modal, Calendar View, Email Connection Setup)*

*Next: Batch 4 — Screens 16-20 (Scan Progress, Scan Results Review, BurnerCard Overview, Create BurnerCard Steps 1-2)*
