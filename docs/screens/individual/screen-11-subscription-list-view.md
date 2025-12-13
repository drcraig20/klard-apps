---
screen: 11
name: Subscription List View
batch: 3
status: not_started
purpose: "Provide a comprehensive, filterable view of all tracked subscriptions."
user_story: "As a user, I want to see all my subscriptions in one place so I can manage them efficiently."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-web/src/components/ui/subscription-card/subscription-card.tsx
      exists: true
    - name: SearchInput
      path: klard-web/src/components/ui/search-input.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
    - name: Sidebar
      path: klard-web/src/components/ui/sidebar/index.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-mobile/src/components/ui/SubscriptionCard/SubscriptionCard.tsx
      exists: true
    - name: SearchInput
      path: klard-mobile/src/components/ui/SearchInput/SearchInput.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
    - name: TabBar
      path: klard-mobile/src/components/ui/TabBar/TabBar.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "No subscriptions exist"
    message: "No subscriptions yet"
  - scenario: "Filters return no results"
    message: "No subscriptions match your filters"
  - scenario: "Failed to load subscriptions"
    message: "Unable to load subscriptions. Please try again."
  - scenario: "Failed to delete subscription"
    message: "Failed to delete subscription. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Filter panel must announce when expanded/collapsed
    - Subscription count badge must update dynamically and be announced
    - View toggle (List/Grid/Calendar) must announce selected state
    - Swipe actions on mobile must have accessible alternatives
    - Infinite scroll must announce when new items are loaded
    - Empty state must be announced when no results found
---

# Screen 11: Subscription List View

## Purpose
Provide a comprehensive, filterable view of all tracked subscriptions.

## User Story
As a user, I want to see all my subscriptions in one place so I can manage them efficiently.

---

## Web Implementation

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

## Mobile Implementation

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
