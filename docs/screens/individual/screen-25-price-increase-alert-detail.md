---
screen: 25
name: Price Increase Alert Detail
batch: 5
status: not_started
purpose: "Provide detailed information about a detected price increase with actionable options."
user_story: "As a user, I want to understand a price change and decide what action to take."
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
    - name: ServiceLogo
      path: klard-web/src/components/ui/service-logo.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: Chart
      path: klard-web/src/components/ui/chart.tsx
      exists: false
      note: "Price history chart is optional; implement inline or defer to future enhancement"
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
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
    - name: ServiceLogo
      path: klard-mobile/src/components/ui/ServiceLogo/ServiceLogo.tsx
      exists: true
    - name: Separator
      path: klard-mobile/src/components/ui/Separator/Separator.tsx
      exists: false
      note: "Mobile uses View with borderBottom styling for separation"
    - name: Chart
      path: klard-mobile/src/components/ui/Chart/Chart.tsx
      exists: false
      note: "Price history chart is optional; defer to future enhancement"
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
error_messages:
  - scenario: "Alert details fail to load"
    message: "Unable to load alert details. Please try again."
  - scenario: "Keep subscription action fails"
    message: "Unable to update. Please try again."
  - scenario: "External cancellation URL unavailable"
    message: "Cancellation link not available for this service."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Price comparison must be clearly announced (e.g., "Price increased from $12.99 to $14.99")
    - Percentage change must be announced with context (e.g., "15% increase")
    - Action buttons must have descriptive labels indicating consequence
    - External link icon must announce "Opens in new window/tab"
    - Decision confirmation animations must respect reduced motion
    - Annual impact calculation must be announced as part of the comparison
---

# Screen 25: Price Increase Alert Detail

## Purpose
Provide detailed information about a detected price increase with actionable options.

## User Story
As a user, I want to understand a price change and decide what action to take.

---

## Web Implementation

**Layout Approach:**

This detail view can be a modal (560px width) or a dedicated page. The modal approach keeps users in context of the Alerts Center. Content should guide users toward making a decision about the subscription.

**Header:**

Display an alert icon (TrendingUp in amber) with the title "Price Increase Detected". Show the timestamp of when the increase was detected.

**Subscription Context:**

Show a subscription card preview at the top:
- Service logo (44px)
- Service name
- Category badge
- Status badge

This immediately orients the user to which subscription is affected.

**Price Comparison:**

Create a clear visual comparison of the price change:

**Before → After Display:**
Show old price and new price with an arrow between them:
"$12.99 → $14.99"

Use warning amber color for the increase amount.

**Change Details:**
- Monthly difference: "+$2.00/month"
- Percentage increase: "+15%"
- Annual impact: "+$24.00/year" (calculate and display)

This section should feel impactful but not alarmist — the goal is to inform, not create anxiety.

**Detection Source:**

Briefly explain how the price change was detected:
- "Detected from your recent receipt on [Date]"
- "Detected from service pricing page scan"

This builds trust in the accuracy of the alert.

**Impact Context:**

Provide perspective on what this means:
- "This is your Xth tracked price increase this year"
- "Your monthly total increases from $X to $Y"

**Action Options:**

Present clear action buttons:

**Primary Actions:**

1. **"Find Alternatives"** (Secondary button)
   - Navigates to Screen 30 (Alternative Finder) pre-filtered for this service's category
   - Label could include savings potential: "Find Alternatives (save up to $5/mo)"

2. **"Keep Subscription"** (Ghost button)
   - Dismisses the alert
   - Marks it as acknowledged
   - Optional: Add note explaining why keeping

**Secondary Actions:**

3. **"Open Cancellation Page"** (Text link with external icon)
   - Opens the service's cancellation URL in new tab
   - Only shown if cancellation URL is stored

4. **"Add Note"** (Text link)
   - Allows user to add a note to this subscription about the price change

**Post-Decision:**

After user takes action:
- If "Keep Subscription": Close modal, show toast "Got it. We'll keep tracking [Service] for you."
- If "Find Alternatives": Navigate to Alternative Finder
- If they cancel externally and return: Prompt to update subscription status

**Related Information:**

Optionally show:
- Price history chart (if available) showing trend over time
- Comparison to similar services
- Link to view full subscription details

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen detail view that pushes from the Alerts list. Users should be able to fully understand the situation and take action without leaving this screen.

**Header:**

Navigation bar with back arrow and "Price Alert" as title. Consider showing the service logo in the header for immediate recognition.

**Content Structure:**

Organize content as a scrollable single-column layout:

**Hero Section:**
- Service logo (large, 64px)
- Service name
- "Price Increased" badge in amber

**Price Change Display:**
Create a clear before/after comparison:
- Old price (crossed out or muted)
- Arrow icon
- New price (prominent, amber tint)
- Change amount and percentage below

Example layout:
```
    $12.99    →    $14.99
  ─────────────────────────
    +$2.00/month (+15%)
    +$24.00 per year
```

**Impact Summary:**

One or two lines explaining the broader impact:
"Your monthly subscription total is now $X"

**Action Buttons:**

Stack action buttons vertically for mobile:

1. "Find Cheaper Alternatives" — Primary button, full width
2. "Keep This Subscription" — Secondary button, full width
3. "Cancel Subscription" — Text link (opens external URL)

Position these in a sticky footer area for easy access while scrolling.

**Additional Context:**

Below the actions (scrollable area):
- Detection source
- Price history (if available, simplified for mobile)
- Link to full subscription details

**Swipe Gesture:**

Support swipe-from-left-edge to go back, consistent with platform navigation.

**Decision Confirmation:**

When user taps "Keep Subscription":
- Haptic feedback (light)
- Brief confirmation animation
- Toast: "Got it!"
- Auto-navigate back to Alerts (with this alert marked as handled)

When user taps "Find Alternatives":
- Navigate to Alternative Finder
- Deep-link context so alternatives are relevant to this service

**iOS-Specific Considerations:**

- Use SF Pro for price typography
- Price change should use semantic colors from iOS palette
- Actions should use iOS button styling
- Support swipe back gesture

**Android-Specific Considerations:**

- Use Material typography for price display
- Actions should follow Material button guidelines
- Support predictive back gesture
- External links should use Chrome Custom Tabs
