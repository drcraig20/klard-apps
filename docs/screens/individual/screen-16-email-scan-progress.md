---
screen: 16
name: Email Scan Progress
batch: 4
status: not_started
purpose: "Show real-time progress as Klard scans the user's email for subscription receipts."
user_story: "As a user who connected my email, I want to see the scan progress so I know the system is working."
components:
  web:
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Spinner
      path: klard-web/src/components/ui/spinner.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
  mobile:
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Spinner
      path: klard-mobile/src/components/ui/Spinner/Spinner.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
error_messages:
  - scenario: "Connection interrupted during scan"
    message: "Connection interrupted"
  - scenario: "Unable to access some emails"
    message: "Unable to access some emails"
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Status message updates must use aria-live='polite' to announce scan progress"
    - "Subscription count updates must be announced to screen readers"
    - "Background option must be keyboard accessible"
    - "Completion animation must respect reduced motion preferences"
    - "Error states must have clear focus management and screen reader announcements"
---

# Screen 16: Email Scan Progress

## Purpose
Show real-time progress as Klard scans the user's email for subscription receipts.

## User Story
As a user who connected my email, I want to see the scan progress so I know the system is working.

---

## Web Implementation

**Layout Approach:**

This screen should feel like a focused task view. Use a centered layout (max-width 560px) without the main navigation shell, as users should stay focused on the scanning process. However, provide a way to minimize to background if desired.

**Progress Visualization:**

The primary visual element should be an animated progress indicator that communicates active scanning without showing a misleading percentage (since email scanning time varies unpredictably).

Implement an indeterminate progress animation: a horizontal bar with a moving gradient or a circular spinner with subtle pulse effect. Accompany this with animated iconography — consider a mail icon with a magnifying glass that has subtle motion.

**Status Messaging:**

Display dynamic status messages that update as the scan progresses. These messages should rotate every 3-5 seconds to indicate activity:

- "Connecting to your inbox..."
- "Scanning for subscription receipts..."
- "Found 3 subscriptions so far..."
- "Checking payment confirmations..."
- "Looking for recurring charges..."
- "Almost done..."

The count of found subscriptions should update in real-time when new subscriptions are detected. Display this prominently: "12 subscriptions found" with each new discovery triggering a subtle animation (number incrementing with a brief highlight).

**Live Discovery Feed:**

Below the main progress indicator, show a live feed of discovered subscriptions as they're found. Each item appears with a slide-in animation:

- Service logo (small, 32px)
- Service name
- Detected price
- Confidence indicator (high/medium/low as subtle badge)

Limit the visible feed to the 5 most recent discoveries with "and X more..." indicator. This gives users confidence that the scan is productive.

**Time Estimate:**

Provide a gentle time estimate without being overly specific: "This usually takes 2-5 minutes" initially, then update to "Almost done..." when nearing completion. Never show a countdown that might be inaccurate.

**Background Option:**

Include a "Continue in Background" secondary button that returns users to the dashboard or previous location. When backgrounded:
- Show a persistent but unobtrusive indicator in the topbar
- Send a notification when complete (if permissions granted)
- Allow returning to this progress view by clicking the indicator

**Completion Transition:**

When scanning completes:
1. Progress indicator transforms to a checkmark with success animation
2. Brief pause (1 second) to register completion
3. Display summary: "Scan complete! Found 15 subscriptions"
4. Auto-navigate to Review screen (Screen 17) after 2 seconds, or immediately on "Review Results" button click

**Error Handling:**

If the scan encounters issues:
- Show specific error message: "Connection interrupted" or "Unable to access some emails"
- Provide "Retry" button
- Offer "Continue with partial results" if some subscriptions were found
- Never lose already-discovered subscriptions

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen focused view. The user should feel engaged with the process without feeling trapped. Support the system back gesture but confirm if the user wants to cancel the scan.

**Progress Visualization:**

Center a prominent animated element — a circular progress indicator with the Klard logo or mail icon in the center works well on mobile. The animation should be smooth and battery-efficient (use Lottie or native animations rather than JavaScript).

Below the animation, show the subscription count prominently: large number (Display size) with "subscriptions found" label below.

**Status Updates:**

Rotate through status messages below the count. Keep messages short for mobile: "Scanning inbox...", "Found Netflix!", "Checking receipts..."

When a new subscription is discovered, briefly flash the service name with its logo before returning to the generic status message. This creates moments of delight as users see familiar services appear.

**Discovery Feed:**

Show the 3 most recent discoveries in a compact horizontal scroll or simple vertical list. Each shows logo and name only (price shown on review screen). New items animate in from the right or bottom.

**Background Behavior:**

The "Continue in Background" option is particularly important on mobile. When tapped:
- Return to the previous screen or dashboard
- Show a small progress indicator in the tab bar or header
- Queue a local notification for completion
- Support returning to full progress view

Implement proper background task handling:
- iOS: Use background fetch and local notifications
- Android: Use WorkManager for reliable background processing

**Completion:**

On completion, provide haptic feedback (success pattern). Show a brief celebratory animation if a significant number of subscriptions were found. Auto-navigate to the review screen.

**iOS-Specific Considerations:**

- Use native activity indicator styling as base
- Support Dynamic Island / Live Activities if available (iOS 16.1+)
- Background scanning should use BGTaskScheduler
- Completion notification should be actionable (tap to review)

**Android-Specific Considerations:**

- Consider showing progress in a foreground notification
- Use WorkManager for background reliability
- Completion notification should deep-link to review screen
- Support split-screen / picture-in-picture for multitasking users
