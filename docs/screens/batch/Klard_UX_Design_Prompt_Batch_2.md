# Klard UX Design Prompt
## Complete Screen-by-Screen Design Specification
### Batch 2: Screens 6-10 (Onboarding Continued + Main Dashboard)

---

# Batch Overview

This batch covers the core onboarding flow after account verification and introduces the user to the main dashboard experience.

| Screen | Name | Purpose |
|--------|------|---------|
| 6 | Plan Selection | Choose subscription tier |
| 7 | Import Hub | Select method to add subscriptions |
| 8 | Add First Subscription | Manual entry wizard |
| 9 | BurnerCard Tutorial | Introduce BurnerCard feature |
| 10 | Main Dashboard | Primary app home screen |

---

## Screen 6: Plan Selection

### Purpose
Present pricing options clearly, highlight the recommended tier, and allow users to start a free trial without payment information.

### User Story
"As a new user completing onboarding, I want to understand what each plan offers so I can choose the best option for my needs without feeling pressured."

---

### Web Implementation

#### Layout Structure
Full-screen centered layout without the navigation shell. Display a subtle progress indicator showing this is Step 1 of the onboarding flow. Maximum content width of 1200px to accommodate three side-by-side plan cards.

#### Header Section

**Navigation:** Place a "← Back" text link in the top-left (returns to Welcome) and a "Skip →" text link in the top-right (defaults user to Basic tier and proceeds to Import Hub).

**Title:** "Choose your plan" as H1 centered. Below it: "Start with a 14-day free trial of Saver+. No credit card required." in Body size with Text Secondary color.

**Billing Toggle:** Display a segmented control or toggle switch between "Monthly" and "Annual (Save 20%)" centered below the subtitle. The toggle should be set to Monthly by default.

#### Plan Cards

Display three plan cards side by side with equal width. Each card should contain:

1. **Plan Name** at the top (H3 size)
2. **Price** prominently displayed (H2 size for the dollar amount)
3. **Billing Period** indicator ("/month" or "/year")
4. **Feature List** with checkmarks
5. **CTA Button** at the bottom

**Basic Plan ($3/month, $29/year):**
- No special highlighting
- Secondary button style for CTA: "Select Basic"
- Features:
  - Track up to 3 subscriptions
  - Renewal date alerts
  - Manual cancellation links

**Pro Plan ($9.99/month, $95/year):**
- No special highlighting
- Secondary button style for CTA: "Select Pro"
- Features:
  - Unlimited subscription tracking
  - Price increase alerts
  - Alternative suggestions
  - Spend analytics dashboard
  - Export reports

**Saver+ Plan ($16.99/month, $163/year):**
- Highlighted card: teal border, subtle teal background tint
- "POPULAR" or "RECOMMENDED" badge in top-right corner
- Primary button style with glow for CTA: "Start Free Trial"
- Features:
  - Everything in Pro, plus:
  - 4 BurnerCards per month (+$1/each additional)
  - Custom card spending rules
  - Auto-block unwanted renewals
  - Priority support
  - SMS alerts

#### Footer

Below the cards, display: "All plans include email sync & privacy protection" as a centered note.

Add a trust element: "💳 No credit card required for trial • Cancel anytime"

#### Behaviors

**Billing Toggle:**
When the user switches between Monthly and Annual:
- Animate the prices using a number transition effect (numbers roll/morph to new values)
- Update the billing period indicator
- Show a "Save 20%" badge near the Annual option when selected

**Card Hover (Desktop):**
- Subtle elevation increase (shadow deepens)
- Card scales up very slightly (1.02x)

**Card Selection:**
When a user clicks a CTA button:
1. The selected card gets a checkmark overlay briefly
2. Navigate to Import Hub (Screen 7)
3. Store the selected plan in user session/state

**Skip Behavior:**
Clicking "Skip" defaults the user to Basic tier and proceeds to Import Hub with a toast: "You're on the Basic plan. You can upgrade anytime."

#### Tablet Adaptation (768px-1023px)
Stack the cards with Saver+ full-width on top (since it's recommended) and Basic and Pro side by side below. Collapse feature lists to show top 3 features with an expandable "See all features" link.

---

### Mobile Implementation

#### Layout Structure
Vertically scrolling full-screen layout. Cards are stacked vertically, full-width.

#### Header
Back arrow in top-left, "Skip" text in top-right. Display "Choose your plan" as H1 and "14-day free trial available" as subtitle.

#### Billing Toggle
Use a native segmented control. The control should have two segments: "Monthly" and "Annual -20%". When the user changes selection, trigger light haptic feedback and animate the price changes.

#### Card Order
Unlike web, display Saver+ (the recommended plan) first at the top of the scroll, followed by Pro, then Basic at the bottom. This puts the best value proposition in the most prominent position.

#### Card Styling
Each card should be a full-width rounded container with:
- Plan name and badge (if applicable) at top
- Price large and prominent
- Feature list with checkmarks
- CTA button at bottom of card

Use adequate vertical spacing between cards (16px minimum).

#### CTA Styling
- Saver+: Primary button with "Start 14-Day Free Trial"
- Pro: Secondary/outline button with "Select Pro"
- Basic: Ghost button with "Select Basic"

#### Scroll Indicator
When the page loads and content extends beyond the viewport, show a subtle gradient fade at the bottom edge to indicate there's more content to scroll.

#### Footer
Display the "No card required" trust message at the bottom after all cards.

#### Platform-Specific Behaviors

**iOS:**
- Use native `UISegmentedControl` styling for the billing toggle
- Trigger selection haptic feedback when toggling or selecting a plan
- Prepare for StoreKit 2 integration for in-app purchases (future)
- Use SF Symbols for checkmarks

**Android:**
- Use Material segmented button for the billing toggle
- Apply ripple effect when tapping cards
- Prepare for Google Play Billing Library integration
- Respect Material You dynamic theming in dark mode

#### Accessibility
- Screen readers should announce: "[Plan name], [price] per [period], [number] features included"
- Toggle should be labeled: "Billing cycle: Monthly or Annual"
- Each feature should be announced individually when navigating

---

## Screen 7: Import Hub

### Purpose
Offer users multiple pathways to populate their subscription list, with email sync as the recommended approach for minimum friction.

### User Story
"As a new user, I want to choose the easiest way to add my subscriptions so I can see value from the app quickly."

---

### Web Implementation

#### Layout Structure
Full-screen centered layout without navigation shell. Maximum content width of 800px. This is Step 2 of onboarding.

#### Header
"← Back" link in top-left (returns to Plan Selection). "Skip" in top-right (goes to Dashboard with empty state).

**Title:** "How would you like to add your subscriptions?" as H1. Subtitle: "Choose the method that works best for you. You can always add more later."

#### Import Options

Display three option cards stacked vertically, each clearly explaining what it does:

**Option 1: Email Sync (Recommended)**
- Highlight this option with a "RECOMMENDED" badge
- Icon: Mail/envelope icon (48px, teal)
- Title: "Connect your email"
- Description: "We'll scan your inbox for subscription receipts and automatically detect your services. Takes about 2 minutes."
- CTA: "Connect Email" primary button
- Trust note below: "🔒 We only scan for subscriptions. Your emails stay private."

**Option 2: Manual Entry**
- Icon: Plus/edit icon (48px, slate)
- Title: "Add manually"
- Description: "Know exactly what you're paying for? Add subscriptions one by one."
- CTA: "Add First Subscription" secondary button

**Option 3: Skip for Now**
- Less prominent styling (ghost appearance)
- Icon: Arrow-right icon (40px, slate light)
- Title: "I'll do this later"
- Description: "Jump straight to your dashboard. You can import subscriptions anytime."
- CTA: "Go to Dashboard" ghost button

#### Tooltip/Help
Add an info icon next to the Email Sync option that, on hover/click, shows a tooltip: "We use read-only access to find receipts. We never store your email content."

#### Behaviors

**Connect Email:** Navigates to Email Connection Setup (Screen 15 in Batch 3). After successful connection, user proceeds through Scan Progress (16) and Scan Results (17).

**Add First Subscription:** Navigates to Add First Subscription screen (Screen 8).

**Skip/Go to Dashboard:** Navigates to Main Dashboard (Screen 10) showing an empty state.

---

### Mobile Implementation

#### Layout Structure
Full-screen scrollable layout with options as tappable full-width cards.

#### Header
Back arrow in top-left, "Skip" in top-right. Title: "Add your subscriptions" as H1.

#### Option Cards
Stack the three options vertically as tappable cards. Each card should have:
- Icon on the left (40px)
- Title and description on the right
- The entire card is tappable (no separate button inside)
- Chevron (arrow-right) on the far right indicates tappability

**Card Order (top to bottom):**
1. Email Sync (highlighted with teal left border and "RECOMMENDED" badge)
2. Manual Entry
3. Skip for Now (styled less prominently)

#### Behaviors

When a card is tapped:
1. Brief scale-down animation (press feedback)
2. Light haptic feedback
3. Navigate to the appropriate screen

The trust note for Email Sync should appear below that specific card, not at the bottom of the screen.

#### Platform-Specific

**iOS:**
- Card tap uses native highlight styling
- Email sync will open an in-app OAuth flow (not Safari)

**Android:**
- Ripple effect on card tap
- Email sync uses Chrome Custom Tabs for OAuth

---

## Screen 8: Add First Subscription (Manual Entry)

### Purpose
Guide users through manually adding their first subscription with a simple, focused form.

### User Story
"As a user who chose manual entry, I want to add a subscription quickly by entering the basic details I already know."

---

### Web Implementation

#### Layout Structure
Modal-style centered card (maximum width 600px) overlaid on a dimmed background, or a full-screen form depending on entry point. Include Step 3 progress indicator.

#### Form Structure

The form should be laid out in a single scrollable column with clear section groupings.

**Section 1: Service Identification**

**Service Search/Name:**
- Searchable input field with autocomplete
- As the user types, show matching services from a predefined database (Netflix, Spotify, Adobe, etc.)
- If a service is selected from the dropdown, auto-populate the logo and category
- If no match, allow custom text entry

**Logo Display:**
- If a known service is selected, display its logo (40px) next to the name
- If custom entry, show a placeholder icon or allow image upload (optional enhancement)

**Category:**
- Dropdown select with predefined categories: Entertainment, Productivity, Health & Fitness, Finance, News & Media, Shopping, Cloud Storage, Gaming, Education, Other
- Auto-selected if known service, otherwise user selects

**Section 2: Cost Details**

**Amount:**
- Currency input with dollar sign prefix
- Numeric keyboard on mobile
- Format to two decimal places

**Billing Cycle:**
- Dropdown select: Weekly, Monthly, Quarterly, Yearly, One-time
- Default to Monthly

**Next Renewal/Billing Date:**
- Date picker input
- Default to 30 days from today for Monthly
- Calendar popup on focus

**Section 3: Additional Details (Optional)**

These fields should be clearly marked as optional and can be collapsed by default:

**Notes:**
- Textarea for user's personal notes
- Example placeholder: "Family plan shared with 3 others"

**Reminder Preference:**
- Dropdown: 1 day before, 3 days before, 7 days before, 14 days before
- Default to 3 days before

**Actions**

- "Add Subscription" primary button (full width at bottom of form)
- "Cancel" secondary/text button

#### Validation

- Service name: Required
- Amount: Required, must be a valid positive number
- Billing cycle: Required
- Next billing date: Required, must be today or in the future

#### Behaviors

**Service Autocomplete:**
- Debounce search by 200ms
- Show up to 8 matching results
- Display service logo thumbnails in dropdown
- Selecting a result fills name, logo, and suggests a category

**After Successful Add:**
1. Show success toast: "[Service name] added!"
2. If this is during onboarding, show a prompt: "Would you like to add another?" with "Add Another" and "Continue to Dashboard" buttons
3. Light celebration animation (confetti or checkmark pulse)

**Cancel Behavior:**
During onboarding, canceling shows a confirmation: "Skip adding subscriptions for now?" with "Skip" and "Keep Adding" options.

---

### Mobile Implementation

#### Layout Structure
Full-screen form with a fixed header and scrollable content. The primary action button is pinned to the bottom above the safe area.

#### Header
Close (X) button in top-left that cancels and returns to Import Hub. Title: "Add Subscription" centered.

#### Form Layout

Present fields in a vertically stacked layout with clear spacing between sections.

**Service Search:**
- Full-width input with search icon
- As user types, show autocomplete results in a dropdown that pushes content down (not overlay)
- When a service is selected, collapse the search and show the selected service with its logo as a "chip" that can be cleared

**Category:**
- Use native picker (iOS: wheel picker in action sheet, Android: dropdown)
- Show category icon alongside text

**Amount:**
- Full-width input with dollar sign
- Numeric keyboard
- Large, easy-to-tap input area

**Billing Cycle:**
- Native picker with options

**Next Billing Date:**
- Tapping opens native date picker
- iOS: Uses the new compact date picker style by default
- Android: Material date picker dialog

**Notes:**
- Expandable section that starts collapsed
- Tapping "Add notes (optional)" expands to show textarea

#### Keyboard Handling
- Fields should scroll into view when focused
- Numeric keyboard for amount
- Date picker doesn't require keyboard
- "Done" button on keyboard submits if all required fields are valid

#### Success Flow
1. Button shows checkmark momentarily
2. Success haptic feedback
3. Display prompt asking if user wants to add another
4. If yes: Clear form and return to empty state
5. If no: Navigate to Dashboard (or next onboarding step)

---

## Screen 9: BurnerCard Tutorial

### Purpose
Introduce Saver+ users to the BurnerCard feature through an engaging, educational overlay that explains the value proposition.

### User Story
"As a Saver+ user, I want to understand how BurnerCards work so I can protect myself from unwanted subscription renewals."

---

### Web Implementation

#### Layout Structure
Modal overlay on dimmed background. Maximum width 640px, vertically centered. The modal should be dismissible but encourage engagement.

#### Entry Conditions
This tutorial appears:
- After a Saver+ user completes adding their first subscription
- When a new Saver+ user first visits the BurnerCard section
- Can be re-accessed from Help & FAQ

For Basic and Pro users, this screen is skipped in onboarding. If they navigate to BurnerCards later, show an upgrade prompt instead.

#### Tutorial Content

Structure the tutorial as a multi-step slideshow/carousel with 3-4 slides:

**Slide 1: Introduction**
- Illustration: A virtual card with a shield icon
- Headline: "Meet BurnerCards"
- Body: "Virtual payment cards that protect you from unwanted charges. Use them for subscriptions you want to control."
- Visual indicator: Dot pagination showing slide 1 of 4

**Slide 2: How It Works**
- Illustration: Card connecting to a subscription service icon
- Headline: "One card per subscription"
- Body: "Create a dedicated BurnerCard for each subscription. Set spending limits and control when charges go through."

**Slide 3: Block Unwanted Charges**
- Illustration: Card with a "blocked" overlay and declined charge
- Headline: "Block renewals instantly"
- Body: "Forgot to cancel? Lock your BurnerCard and the renewal is automatically declined. No more surprise charges."

**Slide 4: Get Started**
- Illustration: Success/celebration visual
- Headline: "You have 4 BurnerCards ready"
- Body: "Your Saver+ plan includes 4 BurnerCards per month. Create your first one now."
- CTA Button: "Create My First BurnerCard" (primary)
- Secondary: "Maybe Later" text link

#### Navigation
- Left/Right arrows on the sides to navigate between slides
- Dot pagination at the bottom, clickable
- Keyboard arrow keys work for navigation
- Can swipe on trackpad/touch

#### Behaviors

**Skip/Dismiss:**
- X button in top-right corner
- Clicking overlay background doesn't dismiss (we want engagement)
- "Maybe Later" on final slide dismisses

**On Dismiss:**
- Set a flag so the tutorial doesn't auto-appear again
- Navigate to Dashboard

**On "Create BurnerCard":**
- Navigate to Create BurnerCard flow (Screen 19)

---

### Mobile Implementation

#### Layout Structure
Full-screen takeover with carousel/pager functionality.

#### Header
X (close) button in top-right. No back button—use swipe navigation.

#### Content Layout

Use a full-screen horizontal pager/swiper. Each slide should have:
- Illustration in the upper portion (approximately 40% of screen height)
- Text content below, centered
- Dot pagination fixed at bottom

#### Interactions

**Navigation:**
- Swipe left/right to move between slides
- Tapping left/right edges also navigates
- Dot pagination is tappable

**Haptic Feedback:**
- Light haptic on slide change
- Medium haptic when reaching final slide

#### Final Slide CTA
- "Create My First BurnerCard" primary button, full-width at bottom
- "Maybe Later" text link above the button

#### Auto-Advance (Optional)
Consider auto-advancing slides every 5 seconds with visible progress, pausing when user interacts. This is optional and should respect user's reduced motion preferences.

---

## Screen 10: Main Dashboard

### Purpose
Provide a comprehensive overview of the user's subscription landscape, highlight actionable items, and serve as the primary navigation hub.

### User Story
"As a logged-in user, I want to see my total spending, upcoming renewals, and any alerts at a glance so I can manage my subscriptions efficiently."

---

### Web Implementation

#### Layout Structure
This is the first screen with the full navigation shell visible. The left sidebar is present and "Dashboard" is the active item. Content area uses a responsive grid layout.

#### Content Organization

The dashboard is divided into sections. Use a 3-column grid on desktop XL (1440px+), 2-column on desktop (1024px+), and single column on tablet.

**Row 1: Summary Stats (4 cards in a row)**

Display four stat cards horizontally with equal width:

1. **Monthly Spend**
   - Large dollar amount (H2 size): "$247.50"
   - Trend indicator: "↑ 12% vs last month" (green if decrease, red if increase)
   - Subtle bar chart mini-visualization (optional)

2. **Active Subscriptions**
   - Count as large number: "14"
   - Subtitle: "3 trials ending soon"

3. **This Month's Savings**
   - Dollar amount: "$52.00"
   - Subtitle: "from blocked renewals"

4. **BurnerCards Active** (Saver+ only)
   - Count: "3 of 4"
   - Subtitle: "1 available"
   - For non-Saver+: Show upgrade prompt instead

**Row 2: Upcoming Renewals (Left 2/3) + Alerts (Right 1/3)**

**Upcoming Renewals Section:**
- Header: "Coming up this week" with a "View Calendar" link
- List of 3-5 subscription cards showing:
  - Service logo and name
  - Renewal date (relative: "Tomorrow", "In 3 days")
  - Amount
  - Quick action: "Remind me" or "Block renewal" (if Saver+)
- "View all →" link at bottom

**Alerts Section:**
- Header: "Alerts" with badge count
- List of 2-3 most recent/important alerts:
  - Price increase detected
  - Renewal reminder
  - Blocked charge notification
- Each alert is clickable to view details
- "View all alerts →" link at bottom

**Row 3: Quick Actions (Full width)**

Horizontal row of action cards/buttons:
- "Add Subscription" → Opens Add/Edit modal
- "Sync Email" → Goes to Email Sync flow
- "Create BurnerCard" → Goes to BurnerCard creation (Saver+ only)
- "View Analytics" → Goes to Analytics Dashboard

**Row 4: Recent Activity (Optional, if space)**
- Timeline of recent events: charges, blocked renewals, price changes
- Limited to 5 items with "View all" link

#### Empty States

**No Subscriptions:**
When the user has no subscriptions tracked, replace the main content with an empty state:
- Illustration: Friendly graphic of empty inbox or starting point
- Headline: "No subscriptions yet"
- Body: "Start tracking your subscriptions to take control of your spending."
- CTA: "Add Your First Subscription" primary button
- Secondary: "Connect Email" outline button

**No Alerts:**
Show a subtle "All caught up!" message in the alerts section with a checkmark.

#### Behaviors

**Stat Card Interactions:**
- Cards are clickable and navigate to relevant detailed views
- Monthly Spend → Analytics
- Active Subscriptions → Subscription List
- Savings → Savings Report
- BurnerCards → BurnerCard Overview

**Refresh:**
- Pull-to-refresh gesture (implemented via scroll behavior on web)
- Refresh button in header
- Auto-refresh every 5 minutes when tab is active

---

### Mobile Implementation

#### Layout Structure
Single-column scrollable layout with the bottom tab bar visible. "Home" tab is selected. Header contains the Klard logo centered, notifications bell with badge on the right, and profile avatar on the left.

#### Content Organization

The mobile dashboard prioritizes vertical scanning and thumb-friendly interactions.

**Section 1: Greeting + Summary**
- "Good morning, Sarah" or time-appropriate greeting
- Current month spend prominently displayed: "$247.50 this month"
- Secondary text: "14 active subscriptions"

**Section 2: Stat Cards**
Display 2x2 grid of smaller stat cards or a horizontally scrollable row:
- Monthly Spend (with trend)
- Subscriptions Count
- Savings
- BurnerCards (Saver+) or Upgrade CTA

Keep these compact—focus on the numbers.

**Section 3: Alerts (if any)**
If there are unread alerts, show a prominent alert banner or card:
- "2 new alerts" with teal background
- Tappable to go to Alerts Center
- Can be dismissed

If no alerts, skip this section entirely.

**Section 4: Upcoming This Week**
- Section header: "Coming up" with "See all" link
- Horizontal scrollable list of subscription cards showing:
  - Service logo (circular)
  - Name
  - Date
  - Amount
- Maximum 5 items in scroll
- Last item is "View all" card

**Section 5: Quick Actions**
2x2 grid of action buttons with icons:
- Add Subscription
- Sync Email
- Create Card (Saver+) / Upgrade (others)
- View Analytics

#### Floating Action Button (FAB)
The center tab button (+ icon) in the tab bar serves as the FAB. It's always visible and opens the add action sheet.

#### Pull-to-Refresh
Implement pull-to-refresh with haptic feedback at the pull threshold. Show a brief loading indicator.

#### Empty State
When no subscriptions exist:
- Full-screen empty state with illustration
- "Get started by adding your first subscription"
- Two buttons: "Add Manually" and "Connect Email"

#### Notification Badge
The Alerts tab icon shows an unread count badge. The header bell icon mirrors this count.

#### Platform-Specific

**iOS:**
- Large title in navigation bar that shrinks on scroll
- Native pull-to-refresh
- Haptic feedback on refresh completion

**Android:**
- Collapsing toolbar pattern
- Material pull-to-refresh indicator
- Follows Material You theming

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 2 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 6: Plan Selection | Card, Badge, Button, SegmentedControl (Picker), PriceDisplay, Switch |
| Screen 7: Import Hub | Card, Button, Tooltip, Badge |
| Screen 8: Add First Subscription | Input, Select, DatePicker, CurrencyInput, SearchInput, Button, Modal |
| Screen 9: BurnerCard Tutorial | Modal, Card, Button, Stepper |
| Screen 10: Main Dashboard | StatCard, Card, Badge, SubscriptionCard, AlertCard, Button, Sidebar, TabBar, EmptyState |

---

# Navigation Flow Summary

```
Welcome (5)
    ↓
Plan Selection (6)
    ↓
Import Hub (7)
    ├─→ Connect Email → Email Flow (15-17) → Dashboard
    ├─→ Add Manually → Add Subscription (8) → Dashboard
    └─→ Skip → Dashboard (10)

[For Saver+ users only]
After first subscription or accessing BurnerCards:
    → BurnerCard Tutorial (9) → Create BurnerCard Flow or Dashboard
```

---

# Accessibility Checklist for Batch 2

- [ ] Plan cards announce plan name, price, and feature count
- [ ] Billing toggle announces current selection and savings
- [ ] Import options are focusable and have clear labels
- [ ] Form fields in Add Subscription have proper labels and error announcements
- [ ] Tutorial carousel can be navigated with keyboard/screen reader
- [ ] Dashboard stat cards announce their values and trends
- [ ] Pull-to-refresh is accessible via alternative action

---

# Error States

| Screen | Error Scenario | Handling |
|--------|---------------|----------|
| Plan Selection | Subscription API fails | Show retry option, allow proceeding with default plan |
| Import Hub | OAuth fails | Display error in modal with retry option |
| Add Subscription | Validation errors | Inline error messages below fields |
| Add Subscription | Save fails | Toast with retry, form state preserved |
| Dashboard | Data load fails | Show error banner with retry, display cached data if available |

---

# End of Batch 2

Continue to Batch 3 for Screens 11-17: Subscription Management screens (List View, Detail View, Add/Edit Modal, Calendar View) and Email Sync flow (Connection, Progress, Results).
