---
screen: 14
name: Calendar View
batch: 3
status: not_started
purpose: "Visualize subscription renewals across time for better financial planning."
user_story: "As a user, I want to see my renewals on a calendar so I can plan my spending."
components:
  web:
    - name: Calendar
      path: klard-web/src/components/ui/calendar.tsx
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
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: Popover
      path: klard-web/src/components/ui/popover.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-mobile/src/components/ui/SubscriptionCard/SubscriptionCard.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
    - name: Calendar
      path: klard-mobile/src/components/ui/Calendar/Calendar.tsx
      exists: false
      note: "Mobile calendar component needs to be created. Consider using react-native-calendars or building custom."
error_messages:
  - scenario: "Failed to load calendar data"
    message: "Unable to load renewal calendar. Please try again."
  - scenario: "No renewals this month"
    message: "No renewals scheduled for this month."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Calendar grid must be fully keyboard navigable
    - Each day cell must announce date and number of renewals
    - Month navigation must announce new month name
    - Today's date must be clearly announced
    - Selected date must announce full date and renewal summary
    - View toggle (Month/Week) must announce selected state
    - Color-coded urgency must have text alternatives
    - Swipe navigation must have button alternatives
---

# Screen 14: Calendar View

## Purpose
Visualize subscription renewals across time for better financial planning.

## User Story
As a user, I want to see my renewals on a calendar so I can plan my spending.

---

## Web Implementation

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

## Mobile Implementation

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
