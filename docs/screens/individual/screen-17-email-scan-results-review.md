---
screen: 17
name: Email Scan Results Review
batch: 4
status: not_started
purpose: "Allow users to review and selectively import subscriptions discovered via email scan."
user_story: "As a user, I want to review discovered subscriptions before importing so I only track what's relevant."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-web/src/components/ui/subscription-card/subscription-card.tsx
      exists: true
    - name: ServiceLogo
      path: klard-web/src/components/ui/service-logo.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: SubscriptionCard
      path: klard-mobile/src/components/ui/SubscriptionCard/SubscriptionCard.tsx
      exists: true
    - name: ServiceLogo
      path: klard-mobile/src/components/ui/ServiceLogo/ServiceLogo.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
error_messages:
  - scenario: "Import fails"
    message: "Unable to import subscriptions. Please try again."
  - scenario: "Partial import failure"
    message: "Some subscriptions could not be imported."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Selection count must use aria-live to announce changes"
    - "Checkboxes must have accessible labels including subscription name"
    - "Confidence badges must have accessible names explaining confidence level"
    - "Select All/Deselect All must announce resulting selection count"
    - "Card expansion state must be announced to screen readers"
    - "Swipe actions on mobile must have accessible alternatives"
---

# Screen 17: Email Scan Results Review

## Purpose
Allow users to review and selectively import subscriptions discovered via email scan.

## User Story
As a user, I want to review discovered subscriptions before importing so I only track what's relevant.

---

## Web Implementation

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

## Mobile Implementation

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
