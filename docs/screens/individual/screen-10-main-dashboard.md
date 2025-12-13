---
screen: 10
name: Main Dashboard
batch: 2
status: not_started
purpose: "Provide a comprehensive overview of the user's subscription landscape, highlight actionable items, and serve as the primary navigation hub."
user_story: "As a logged-in user, I want to see my total spending, upcoming renewals, and any alerts at a glance so I can manage my subscriptions efficiently."
components:
  web:
    - name: StatCard
      path: klard-web/src/components/ui/stat-card/stat-card.tsx
      exists: true
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-web/src/components/ui/subscription-card/subscription-card.tsx
      exists: true
    - name: AlertCard
      path: klard-web/src/components/ui/alert-card/alert-card.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Sidebar
      path: klard-web/src/components/ui/sidebar/index.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
  mobile:
    - name: StatCard
      path: klard-mobile/src/components/ui/StatCard/StatCard.tsx
      exists: true
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-mobile/src/components/ui/SubscriptionCard/SubscriptionCard.tsx
      exists: true
    - name: AlertCard
      path: klard-mobile/src/components/ui/AlertCard/AlertCard.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: TabBar
      path: klard-mobile/src/components/ui/TabBar/TabBar.tsx
      exists: true
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
error_messages:
  - scenario: "Data load fails"
    message: "Unable to load your dashboard. Pull down to refresh."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Dashboard stat cards must announce their values and trend direction"
    - "Pull-to-refresh must be accessible via alternative action (refresh button)"
    - "Alert count badge must be announced with navigation item"
    - "Upcoming renewals list must use proper list semantics"
    - "Empty state must clearly communicate next actions"
---

# Screen 10: Main Dashboard

## Purpose
Provide a comprehensive overview of the user's subscription landscape, highlight actionable items, and serve as the primary navigation hub.

## User Story
"As a logged-in user, I want to see my total spending, upcoming renewals, and any alerts at a glance so I can manage my subscriptions efficiently."

---

## Web Implementation

### Layout Structure
This is the first screen with the full navigation shell visible. The left sidebar is present and "Dashboard" is the active item. Content area uses a responsive grid layout.

### Content Organization

The dashboard is divided into sections. Use a 3-column grid on desktop XL (1440px+), 2-column on desktop (1024px+), and single column on tablet.

**Row 1: Summary Stats (4 cards in a row)**

Display four stat cards horizontally with equal width:

1. **Monthly Spend**
   - Large dollar amount (H2 size): "$247.50"
   - Trend indicator: "Up 12% vs last month" (green if decrease, red if increase)
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
- "View all" link at bottom

**Alerts Section:**
- Header: "Alerts" with badge count
- List of 2-3 most recent/important alerts:
  - Price increase detected
  - Renewal reminder
  - Blocked charge notification
- Each alert is clickable to view details
- "View all alerts" link at bottom

**Row 3: Quick Actions (Full width)**

Horizontal row of action cards/buttons:
- "Add Subscription" - Opens Add/Edit modal
- "Sync Email" - Goes to Email Sync flow
- "Create BurnerCard" - Goes to BurnerCard creation (Saver+ only)
- "View Analytics" - Goes to Analytics Dashboard

**Row 4: Recent Activity (Optional, if space)**
- Timeline of recent events: charges, blocked renewals, price changes
- Limited to 5 items with "View all" link

### Empty States

**No Subscriptions:**
When the user has no subscriptions tracked, replace the main content with an empty state:
- Illustration: Friendly graphic of empty inbox or starting point
- Headline: "No subscriptions yet"
- Body: "Start tracking your subscriptions to take control of your spending."
- CTA: "Add Your First Subscription" primary button
- Secondary: "Connect Email" outline button

**No Alerts:**
Show a subtle "All caught up!" message in the alerts section with a checkmark.

### Behaviors

**Stat Card Interactions:**
- Cards are clickable and navigate to relevant detailed views
- Monthly Spend - Analytics
- Active Subscriptions - Subscription List
- Savings - Savings Report
- BurnerCards - BurnerCard Overview

**Refresh:**
- Pull-to-refresh gesture (implemented via scroll behavior on web)
- Refresh button in header
- Auto-refresh every 5 minutes when tab is active

---

## Mobile Implementation

### Layout Structure
Single-column scrollable layout with the bottom tab bar visible. "Home" tab is selected. Header contains the Klard logo centered, notifications bell with badge on the right, and profile avatar on the left.

### Content Organization

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

### Floating Action Button (FAB)
The center tab button (+ icon) in the tab bar serves as the FAB. It's always visible and opens the add action sheet.

### Pull-to-Refresh
Implement pull-to-refresh with haptic feedback at the pull threshold. Show a brief loading indicator.

### Empty State
When no subscriptions exist:
- Full-screen empty state with illustration
- "Get started by adding your first subscription"
- Two buttons: "Add Manually" and "Connect Email"

### Notification Badge
The Alerts tab icon shows an unread count badge. The header bell icon mirrors this count.

### Platform-Specific

**iOS:**
- Large title in navigation bar that shrinks on scroll
- Native pull-to-refresh
- Haptic feedback on refresh completion

**Android:**
- Collapsing toolbar pattern
- Material pull-to-refresh indicator
- Follows Material You theming
