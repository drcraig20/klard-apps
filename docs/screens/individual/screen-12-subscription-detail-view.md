---
screen: 12
name: Subscription Detail View
batch: 3
status: not_started
purpose: "Provide comprehensive information about a single subscription with all available actions."
user_story: "As a user, I want to see all details about a subscription so I can make informed decisions about keeping or cancelling it."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: ServiceLogo
      path: klard-web/src/components/ui/service-logo.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: AlertCard
      path: klard-web/src/components/ui/alert-card/alert-card.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: Sheet
      path: klard-web/src/components/ui/sheet.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: ServiceLogo
      path: klard-mobile/src/components/ui/ServiceLogo/ServiceLogo.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
    - name: AlertCard
      path: klard-mobile/src/components/ui/AlertCard/AlertCard.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "Failed to load subscription details"
    message: "Unable to load subscription details. Please try again."
  - scenario: "Failed to save notes"
    message: "Failed to save notes. Please try again."
  - scenario: "Failed to delete subscription"
    message: "Failed to delete subscription. Please try again."
  - scenario: "No cancellation URL available"
    message: "No cancellation link saved for this subscription."
  - scenario: "Failed to link BurnerCard"
    message: "Failed to link BurnerCard. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Price history chart must have text alternative describing trend
    - Notes auto-save must announce "Saved" confirmation
    - BurnerCard protection section must be clearly announced as protected/unprotected
    - Price change indicators must be announced with percentage and direction
    - Swipe-to-delete must have accessible alternative (overflow menu)
    - External links must announce "opens in new tab"
---

# Screen 12: Subscription Detail View

## Purpose
Provide comprehensive information about a single subscription with all available actions.

## User Story
As a user, I want to see all details about a subscription so I can make informed decisions about keeping or cancelling it.

---

## Web Implementation

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

## Mobile Implementation

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
