# Klard UX Design Prompt — Batch 6
## Screens 26-30: Analytics, Savings & Discovery

---

## Screen 26: Renewal Reminder Detail

**Purpose:** Provide detailed information about an upcoming renewal with action options.

**User Story:** As a user, I want to see full details about an upcoming renewal so I can decide whether to keep or cancel before I'm charged.

---

### Web Specification

**Layout Approach:**

Present as a modal (500px width) accessible from the Alerts Center or dashboard widgets. The content should help users make an informed decision about the upcoming charge with enough time to act.

**Header:**

Display a calendar icon in teal with the title "Upcoming Renewal". Include the urgency indicator: "Renews in X days" as a badge. Use warning amber if 3 days or less, default teal otherwise.

**Subscription Context:**

Show the subscription card at the top for immediate recognition:
- Service logo (48px)
- Service name (H3)
- Category badge
- Current status badge

**Renewal Details:**

Present key renewal information clearly:

**Countdown Display:**
Create a prominent countdown element showing days until renewal. For imminent renewals (≤3 days), consider showing hours as well. Style this as a visual focal point — perhaps a circular countdown or bold number display.

**Charge Information:**
- Amount: "$15.99" (prominent)
- Billing cycle: "Monthly subscription"
- Renewal date: "January 15, 2026"
- Next renewal after this: "February 15, 2026"

**Payment Method:**
Show which card will be charged:
- Card icon and last 4 digits
- If BurnerCard: Show card name with shield indicator and remaining balance/limit
- If BurnerCard will block this renewal: Show warning "This card will block the renewal (limit exceeded)"

**Protection Status:**

If the subscription is linked to a BurnerCard, show the protection summary:
- "Protected by [Card Name]"
- Card status (Active/Locked)
- What will happen: "Renewal will process normally" or "Renewal will be blocked"

If not protected, show a subtle prompt: "Want to control this renewal? Link a BurnerCard"

**Historical Context:**

Provide helpful context:
- "You've been subscribed for X months"
- "Total paid to date: $X"
- "Last price change: None" or "Increased by $X on [Date]"

**Action Options:**

Present clear decision buttons:

**Primary Actions:**

1. **"I'll Keep It"** (Secondary/Ghost button)
   - Dismisses the reminder
   - Optionally snoozes future reminders for this subscription
   - Confirms user wants to continue

2. **"Cancel Subscription"** (Primary button with external link icon)
   - Opens the service's cancellation URL
   - If no URL stored, prompt to add one or show generic help

**Secondary Actions:**

3. **"Snooze Reminder"** (Text link)
   - Opens options: "Remind me tomorrow", "Remind me in 3 days", "Don't remind me for this subscription"

4. **"Link BurnerCard"** (Text link, shown if not protected)
   - Opens card linking flow

5. **"View Subscription"** (Text link)
   - Navigates to full subscription detail (Screen 12)

**Post-Action Behavior:**

After "I'll Keep It":
- Close modal
- Toast: "Got it! Enjoy [Service Name]"
- Mark alert as handled

After "Cancel Subscription":
- Open external link in new tab
- Keep modal open or show follow-up: "Did you cancel? Update your subscription status"

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen detail view or a tall bottom sheet (70% screen height). The design should create urgency without anxiety, helping users make confident decisions.

**Header:**

If full-screen: Navigation bar with back arrow and "Renewal Reminder" title
If bottom sheet: Drag indicator with close button and title

**Countdown Hero:**

Make the countdown the visual focus at the top:
- Large number (Display size): "3"
- Label below: "days until renewal"
- Service logo integrated or adjacent

For same-day renewals: "Today" or "In X hours"

**Subscription Card:**

Below the countdown, show a compact subscription summary card:
- Logo, name, price, billing cycle
- Tappable to view full details

**Payment Information:**

Display payment method in a clear row:
- Card icon + "Visa •••• 4821"
- Or BurnerCard with protection status
- Warning if payment will fail

**Actions:**

Stack action buttons in a sticky footer:

1. "Keep Subscription" — Secondary button
2. "Cancel Subscription" — Primary/Destructive button
3. "Snooze" — Text link

The cancel button should feel actionable but not alarming — users should feel empowered, not pressured.

**Swipe Gesture:**

Support swipe-to-dismiss for the bottom sheet variant. Full-screen should support standard back navigation.

**Snooze Options:**

When "Snooze" is tapped, present options in an action sheet (iOS) or bottom sheet (Android):
- "Remind me tomorrow"
- "Remind me in 3 days"
- "Stop reminders for this subscription"

**iOS-Specific Considerations:**

- Use SF Pro Display for countdown number
- Action sheet for snooze options
- Haptic feedback on action selection
- Support half-sheet presentation if using bottom sheet

**Android-Specific Considerations:**

- Use Material typography for countdown
- Bottom sheet dialog for snooze options
- Ripple effects on buttons
- Edge-to-edge content

---

## Screen 27: Spend Analytics Dashboard

**Purpose:** Comprehensive financial insights showing spending trends and patterns.

**User Story:** As a user, I want to understand my subscription spending patterns so I can make better financial decisions.

---

### Web Specification

**Layout Approach:**

This screen lives within the main application shell, accessible via sidebar navigation. The design should present complex data in an accessible, actionable way without overwhelming users.

**Page Header:**

Display "Analytics" as H1. Include a period selector to the right: segmented control or dropdown with options:
- This Month (default)
- Last Month
- This Quarter
- This Year
- Custom Range (opens date picker)

**Summary Statistics Row:**

Display four key metrics as stat cards spanning the width:

**Card 1 — Total Spent:**
- Large number: "$187.43"
- Label: "This month"
- Comparison: "↓ 5% vs last month" (green if down, red if up)

**Card 2 — Subscription Count:**
- Large number: "12"
- Label: "Active subscriptions"
- Comparison: "+2 from last month"

**Card 3 — Average per Subscription:**
- Large number: "$15.62"
- Label: "Average cost"
- Context: "Your average is X% [above/below] typical"

**Card 4 — Projected Annual:**
- Large number: "$2,249"
- Label: "Projected yearly spend"
- Context: Based on current subscriptions

**Spending Trend Chart:**

Create a prominent line chart showing spending over time:

**Chart Configuration:**
- X-axis: Time periods (days for month view, weeks for quarter, months for year)
- Y-axis: Dollar amounts
- Line: Primary teal color with area fill (gradient)
- Data points: Dots at each period with hover tooltips

**Interactivity:**
- Hover/tap on data points shows exact amount and date
- Toggle between: Total Spend, By Category (multiple lines)
- Zoom/pan for longer time ranges

**Chart Legend:**
If showing multiple categories, display a legend below the chart with category colors.

**Category Breakdown:**

Display spending distribution by category using a donut/pie chart or horizontal bar chart:

**Donut Chart Approach:**
- Center shows total spend
- Segments colored by category
- Hover shows category name and amount
- Legend lists all categories with amounts and percentages

**Recommended Categories:**
- Streaming & Entertainment
- Productivity & Tools
- Gaming
- Health & Fitness
- Cloud & Storage
- Other

**Top Subscriptions Table:**

Show a ranked list of subscriptions by cost:

**Table Columns:**
- Rank (#)
- Service (logo + name)
- Category
- Monthly Cost
- % of Total
- Trend (up/down/stable indicator)

**Default Sort:** By cost (highest first)
**Alternative Sorts:** Alphabetical, Category, Trend

Limit to top 10 with "View All" link to full subscription list.

**Insights Section:**

Provide AI-generated or rule-based insights:

**Insight Cards:**
- "Your streaming spending increased 20% this quarter"
- "You have 3 subscriptions in the same category — consider consolidating"
- "Netflix is your longest-running subscription (24 months)"

Keep insights actionable and non-judgmental.

**Export Option:**

Include "Export Report" button in the header area that opens Screen 29 (Export Modal).

---

### Mobile Specification

**Layout Approach:**

Analytics on mobile should prioritize the most important metrics and allow progressive disclosure of details. Avoid cramming desktop charts onto a small screen — redesign for mobile consumption patterns.

**Header:**

"Analytics" as large title. Period selector as a compact dropdown or segmented control below the title.

**Summary Cards:**

Display the four key metrics in a 2x2 grid:
- Total Spent | Subscriptions
- Average | Projected Annual

Each card should be tappable to see more detail or filter the view.

**Spending Trend:**

Simplify the chart for mobile:
- Horizontal scrollable if showing many data points
- Larger touch targets for data points
- Tap (not hover) to show tooltips
- Consider showing just the current period prominently with "View trend" to expand

**Alternative: Sparkline + Number**
Instead of full chart, show a sparkline next to the total spend number. Tap to see full chart in a detail view or bottom sheet.

**Category Breakdown:**

Use horizontal bars instead of pie/donut for better mobile readability:
- Category name on left
- Bar showing proportion
- Amount on right
- Sorted by amount (largest first)

Each bar should be tappable to filter subscriptions by that category.

**Top Subscriptions:**

Show as a simple list:
- Rank + Logo + Name
- Amount on right
- Tap to view subscription detail

Show top 5 with "See all" link.

**Insights:**

Display insights as horizontally scrollable cards or a vertical stack at the bottom. Keep them brief and actionable.

**Pull to Refresh:**

Support pull-to-refresh to update analytics data.

**iOS-Specific Considerations:**

- Use SF Pro for numbers, ensuring proper tabular figure alignment
- Charts should use iOS color palette
- Consider using Swift Charts-style animations
- Support Dynamic Type for accessibility

**Android-Specific Considerations:**

- Use Material charts styling
- Support gesture navigation
- Consider using MPAndroidChart-style interactions
- Ensure proper dark theme support for charts

---

## Screen 28: Savings Report View

**Purpose:** Celebrate and detail the money saved through Klard features.

**User Story:** As a user, I want to see how much money I've saved so I feel good about using Klard.

---

### Web Specification

**Layout Approach:**

This screen should feel celebratory and rewarding while providing detailed breakdown of savings. It's an opportunity to demonstrate Klard's value and reinforce positive financial behavior.

**Hero Section:**

Create a prominent, celebratory display of total savings:

**Savings Amount:**
- Display size typography: "$142.50"
- Success green color with subtle glow effect
- Label below: "Total Saved with Klard"
- Time context: "Since [join date]" or "This year"

**Visual Enhancement:**
Consider adding subtle celebratory elements:
- Success green background tint
- Sparkle/confetti illustration (static, not animated continuously)
- Upward trend arrow icon

**Savings Breakdown:**

Show how savings were achieved across different methods:

**Breakdown Cards (3-4 cards in a row):**

**Card 1 — Blocked Charges:**
- Icon: ShieldCheck
- Amount: "$89.00"
- Count: "4 charges blocked"
- Description: "Unwanted renewals stopped by BurnerCards"

**Card 2 — Cancelled in Time:**
- Icon: XCircle
- Amount: "$32.50"
- Count: "2 subscriptions"
- Description: "Cancelled before renewal thanks to reminders"

**Card 3 — Switched to Cheaper:**
- Icon: ArrowRightLeft
- Amount: "$21.00"
- Count: "1 switch"
- Description: "Saved by switching to alternatives"

**Card 4 — Price Alerts Acted On** (optional):
- Icon: Bell
- Amount: "$X.XX"
- Count: "X decisions"
- Description: "Saved by responding to price increases"

**Savings Timeline:**

Display a chronological list of savings events:

**Timeline Entry Format:**
- Date
- Event description (e.g., "Blocked Hulu renewal")
- Amount saved
- Service logo

Sort by date (newest first) with option to filter by savings type.

**Projected Future Savings:**

If patterns can be identified, show:
- "At this rate, you'll save $X by end of year"
- "Your BurnerCards could save you $X more"

Keep projections conservative and clearly labeled as estimates.

**Share Your Savings:**

Provide a "Share" button that generates a shareable image:
- Klard branded graphic
- Total savings amount
- Time period
- No sensitive subscription details

Options: Download image, Share to social media, Copy link

**Actions:**

- "Export Detailed Report" → Opens Export Modal
- "View Analytics" → Navigate to Analytics Dashboard

---

### Mobile Specification

**Layout Approach:**

The mobile savings report should feel like opening a rewards statement — celebratory, clear, and shareable. Optimize for the "screenshot and share" behavior.

**Hero Section:**

Make the total savings impossible to miss:
- Large number centered at top (Display size)
- Success green color
- "Total Saved" label
- Subtle success glow or celebration illustration

Consider adding a brief animation on first view (confetti, number counting up) that only plays once.

**Breakdown Cards:**

Display breakdown as vertically stacked cards:
- Each card shows icon, title, amount, and brief description
- Cards should feel tappable even if they just show more detail

Alternatively, use a horizontal scrollable card row for the breakdown categories.

**Timeline:**

Show recent savings events as a scrollable list:
- Compact rows with date, description, amount
- Service logo for recognition
- Tap for more detail about the event

Limit initial display to 5-10 events with "Show more" option.

**Share Feature:**

Make sharing prominent and easy:
- "Share Your Savings" button with share icon
- Tapping generates a pre-formatted image optimized for social sharing
- Use native share sheet for distribution options

**Celebration Moments:**

Consider milestone celebrations:
- First $50 saved
- First $100 saved
- Monthly savings record

Show these as special badges or celebratory cards when achieved.

**iOS-Specific Considerations:**

- Use native share sheet with image preview
- Consider adding confetti animation using UIKit dynamics
- Support saving image to Photos
- Haptic feedback on share action

**Android-Specific Considerations:**

- Use Material share sheet
- Support saving to device gallery
- Consider adding Lottie animation for celebration
- Ensure share image works well on various social platforms

---

## Screen 29: Export Modal

**Purpose:** Allow users to export their data in various formats for personal records or external use.

**User Story:** As a user, I want to export my subscription data so I can use it in spreadsheets or for tax purposes.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 30: Alternative Finder

**Purpose:** Help users discover cheaper alternatives to their current subscriptions.

**User Story:** As a user, I want to find cheaper alternatives to my subscriptions so I can save money without losing functionality.

---

### Web Specification

**Layout Approach:**

This screen can be accessed from subscription details, price increase alerts, or as a standalone discovery feature. The design should facilitate comparison shopping while highlighting potential savings.

**Entry Contexts:**

The screen behaves slightly differently based on entry point:

1. **From Subscription Detail:** Pre-filtered to show alternatives for that specific service
2. **From Price Alert:** Pre-filtered for the service that increased in price
3. **From Navigation:** Shows all categories, user browses freely

**Header Section:**

When viewing alternatives for a specific service:
- "Alternatives to [Service Name]" as H1
- Show the current subscription in a compact card: logo, name, price

When browsing generally:
- "Find Alternatives" as H1
- Category filter dropdown or tabs

**Current Subscription Context:**

When comparing to a specific subscription, show it as a reference point at the top:

**Current Service Card:**
- Logo (48px)
- Service name
- Current price: "$15.99/month"
- "Your current service" label
- Key features you're using (if known)

**Alternatives List:**

Display alternatives as comparison cards. Each alternative should clearly show:

**Service Information:**
- Logo and name
- Brief description (one line)
- Rating (star rating if available, sourced from app stores or review aggregators)

**Pricing:**
- Monthly price
- Annual price (if different)
- Savings badge: "Save $24/year" in success green
- Affiliate discount badge if available: "Extra 20% off"

**Feature Comparison:**

Show a quick feature comparison relevant to the category:
- For streaming: "4K available", "Offline downloads", "Number of screens"
- For productivity: "Storage", "Collaboration", "Integrations"

Use checkmarks/x-marks for feature presence.

**Call to Action:**
- "Learn More" (primary-ish) — opens service website
- "Compare" — adds to comparison tray

**Comparison Mode:**

Allow users to select multiple alternatives for side-by-side comparison:

**Comparison Tray:**
When user clicks "Compare" on alternatives, add them to a sticky comparison tray at the bottom:
- Shows logos of selected alternatives (up to 3-4)
- "Compare X Services" button
- "Clear" link

**Comparison Table View:**

When comparison is triggered, show a detailed side-by-side table:
- Columns: Current service + selected alternatives
- Rows: Price, Key features, Pros, Cons, Rating, Savings

This could be a modal or a new view.

**Savings Calculator:**

Show aggregate potential savings:
- "Switching could save you up to $45/year"
- Based on the cheapest alternative that meets core feature needs

**Affiliate Disclosure:**

If affiliate links are used, include appropriate disclosure:
- Small text: "Some links may earn Klard a commission at no cost to you"
- Doesn't affect recommendations (ensure this is true)

**Empty/No Alternatives State:**

If no alternatives are available:
- "No alternatives found for [Service Name]"
- "This might be because [Service] offers unique features"
- Suggest: "Try broadening your search" or "Check back later"

---

### Mobile Specification

**Layout Approach:**

On mobile, focus on clear comparison and easy action-taking. Users should be able to evaluate alternatives and make decisions quickly.

**Header:**

If comparing to specific service: "[Service] Alternatives" as title with the current service shown below
If browsing: "Find Alternatives" with category filter chips

**Category Navigation:**

Use horizontally scrollable category chips:
- All
- Streaming
- Productivity
- Gaming
- Fitness
- etc.

Selected chip has filled background.

**Current Service Reference:**

When comparing to a specific subscription, show it as a sticky mini-card at the top:
- Logo, name, price on one line
- "Your current" label
- This stays visible while scrolling alternatives

**Alternatives List:**

Display alternatives as full-width cards:

**Card Content:**
- Logo and name (prominent)
- Price with savings badge: "$9.99/mo — Save $6/mo"
- Rating: ★★★★☆ 4.2
- Quick feature list (2-3 items)
- "View" button

**Card Interactions:**
- Tap card to expand inline details
- Tap "View" to open service website
- Long-press for quick actions (Add to comparison, Share)

**Inline Expansion:**

When a card is tapped, expand it to show:
- Full feature comparison vs current service
- Pros and cons
- "Switch to This" CTA

This avoids navigating away while providing details.

**Comparison Feature:**

On mobile, simplify comparison:
- Allow selecting up to 2 alternatives
- Show a floating "Compare (2)" button when items selected
- Comparison opens as a bottom sheet with side-by-side view

**Savings Summary:**

Show potential savings prominently:
- Sticky banner or footer: "Save up to $45/year by switching"
- Updates based on viewed alternatives

**Action Flow:**

When user decides to switch:
1. Tap "Switch to This" or "Learn More"
2. Open service website in in-app browser
3. After returning, prompt: "Did you sign up? Update your subscriptions"

**iOS-Specific Considerations:**

- Use SFSafariViewController for viewing alternative sites
- Support haptic feedback on selection
- Comparison sheet should be a half-sheet
- Cards should support context menus

**Android-Specific Considerations:**

- Use Chrome Custom Tabs for external sites
- Support Material motion for card expansion
- Comparison as bottom sheet dialog
- Ripple effects on interactive elements

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 6 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 26: Renewal Reminder Detail | Card, AlertCard, Badge, Button, ServiceLogo, DatePicker, Switch, Separator |
| Screen 27: Spend Analytics Dashboard | Card, Chart, Badge, Select, DatePicker, Tabs, Skeleton, Tooltip, SegmentedControl |
| Screen 28: Savings Report View | Card, Chart, Badge, Button, ServiceLogo, Separator, ProgressBar |
| Screen 29: Export Modal | Modal, Select, DatePicker, Checkbox, Button, ProgressBar, Alert |
| Screen 30: Alternative Finder | Card, SearchInput, ServiceLogo, Badge, Button, Skeleton, EmptyState, Separator |

---

# End of Batch 6

---

*Batch 6 Complete: Screens 26-30 (Renewal Reminder Detail, Spend Analytics Dashboard, Savings Report View, Export Modal, Alternative Finder)*

*Next: Batch 7 — Screens 31-34 (Settings, Profile & Plan Management, Help & FAQ, Empty States)*
