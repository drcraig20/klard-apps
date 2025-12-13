---
screen: 24
name: Alerts Center
batch: 5
status: not_started
purpose: "Centralized hub for all notifications, alerts, and actionable items."
user_story: "As a user, I want to see all my alerts in one place so I don't miss important subscription events."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: AlertCard
      path: klard-web/src/components/ui/alert-card/alert-card.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Tabs
      path: klard-web/src/components/ui/tabs/tabs.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: AlertCard
      path: klard-mobile/src/components/ui/AlertCard/AlertCard.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Tabs
      path: klard-mobile/src/components/ui/TabBar/TabBar.tsx
      exists: false
      note: "Mobile uses horizontally scrollable filter chips instead of tabs"
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
error_messages:
  - scenario: "Alerts fail to load"
    message: "Unable to load alerts. Pull to refresh."
  - scenario: "Mark as read fails"
    message: "Unable to update alert. Please try again."
  - scenario: "Delete alert fails"
    message: "Unable to delete alert. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Filter tabs/chips must announce current selection and count
    - New alerts arriving must be announced via aria-live region
    - Unread count badges must have accessible labels (e.g., "5 unread alerts")
    - Swipe actions must have accessible alternatives (long-press menu)
    - Pull to refresh must announce when refresh starts and completes
    - Alert list must support keyboard navigation with arrow keys
    - "Mark All as Read" must announce confirmation
---

# Screen 24: Alerts Center

## Purpose
Centralized hub for all notifications, alerts, and actionable items.

## User Story
As a user, I want to see all my alerts in one place so I don't miss important subscription events.

---

## Web Implementation

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

## Mobile Implementation

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
