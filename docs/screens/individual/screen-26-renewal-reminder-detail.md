---
screen: 26
name: Renewal Reminder Detail
batch: 6
status: not_started
purpose: "Provide detailed information about an upcoming renewal with action options."
user_story: "As a user, I want to see full details about an upcoming renewal so I can decide whether to keep or cancel before I'm charged."
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
    - name: DatePicker
      path: klard-web/src/components/ui/date-picker.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
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
    - name: DatePicker
      path: klard-mobile/src/components/ui/DatePicker/DatePicker.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "No cancellation URL stored"
    message: "No cancellation link available. Try visiting the service directly."
  - scenario: "Snooze action failed"
    message: "Couldn't update reminder. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Countdown timer must be announced and update screen reader when urgency increases
    - Action buttons must have clear accessible names indicating their purpose
    - Snooze options must be navigable and selectable via keyboard/VoiceOver
    - Warning states (e.g., card will block renewal) must be announced
---

# Screen 26: Renewal Reminder Detail

## Purpose
Provide detailed information about an upcoming renewal with action options.

## User Story
As a user, I want to see full details about an upcoming renewal so I can decide whether to keep or cancel before I'm charged.

---

## Web Implementation

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

## Mobile Implementation

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