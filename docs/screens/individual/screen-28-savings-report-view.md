---
screen: 28
name: Savings Report View
batch: 6
status: not_started
purpose: "Celebrate and detail the money saved through Klard features."
user_story: "As a user, I want to see how much money I've saved so I feel good about using Klard."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Chart
      path: klard-web/src/components/ui/chart.tsx
      exists: false
      note: "Needs to be created for timeline visualization"
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
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Chart
      path: klard-mobile/src/components/ui/Chart/Chart.tsx
      exists: false
      note: "Needs to be created for timeline visualization"
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: ServiceLogo
      path: klard-mobile/src/components/ui/ServiceLogo/ServiceLogo.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
      exists: true
error_messages:
  - scenario: "No savings data available"
    message: "Start using BurnerCards and set up reminders to track your savings!"
  - scenario: "Failed to generate share image"
    message: "Couldn't create your share image. Please try again."
  - scenario: "Share failed"
    message: "Sharing failed. Try saving the image and sharing manually."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Total savings amount must be announced prominently with context
    - Celebration animations must respect reduced motion preferences
    - Timeline events must be navigable and announce date, description, and amount
    - Share button must indicate what will be shared
    - Savings breakdown cards must announce their category, amount, and count
---

# Screen 28: Savings Report View

## Purpose
Celebrate and detail the money saved through Klard features.

## User Story
As a user, I want to see how much money I've saved so I feel good about using Klard.

---

## Web Implementation

**Layout Approach:**

This screen should feel celebratory and rewarding while providing detailed breakdown of savings. It's an opportunity to demonstrate Klard's value and reinforce positive financial behavior.

**Hero Section:**

Create a prominent, celebratory display of total savings:

**Savings Amount:**
- Display size typography: "$142.50"
- Success green color with subtle glow effect
- Label below: "Total Saved with Klard"
- Time context: "Since [join date]" or "This year"

**Visual Enhancement:**
Consider adding subtle celebratory elements:
- Success green background tint
- Sparkle/confetti illustration (static, not animated continuously)
- Upward trend arrow icon

**Savings Breakdown:**

Show how savings were achieved across different methods:

**Breakdown Cards (3-4 cards in a row):**

**Card 1 — Blocked Charges:**
- Icon: ShieldCheck
- Amount: "$89.00"
- Count: "4 charges blocked"
- Description: "Unwanted renewals stopped by BurnerCards"

**Card 2 — Cancelled in Time:**
- Icon: XCircle
- Amount: "$32.50"
- Count: "2 subscriptions"
- Description: "Cancelled before renewal thanks to reminders"

**Card 3 — Switched to Cheaper:**
- Icon: ArrowRightLeft
- Amount: "$21.00"
- Count: "1 switch"
- Description: "Saved by switching to alternatives"

**Card 4 — Price Alerts Acted On** (optional):
- Icon: Bell
- Amount: "$X.XX"
- Count: "X decisions"
- Description: "Saved by responding to price increases"

**Savings Timeline:**

Display a chronological list of savings events:

**Timeline Entry Format:**
- Date
- Event description (e.g., "Blocked Hulu renewal")
- Amount saved
- Service logo

Sort by date (newest first) with option to filter by savings type.

**Projected Future Savings:**

If patterns can be identified, show:
- "At this rate, you'll save $X by end of year"
- "Your BurnerCards could save you $X more"

Keep projections conservative and clearly labeled as estimates.

**Share Your Savings:**

Provide a "Share" button that generates a shareable image:
- Klard branded graphic
- Total savings amount
- Time period
- No sensitive subscription details

Options: Download image, Share to social media, Copy link

**Actions:**

- "Export Detailed Report" → Opens Export Modal
- "View Analytics" → Navigate to Analytics Dashboard

---

## Mobile Implementation

**Layout Approach:**

The mobile savings report should feel like opening a rewards statement — celebratory, clear, and shareable. Optimize for the "screenshot and share" behavior.

**Hero Section:**

Make the total savings impossible to miss:
- Large number centered at top (Display size)
- Success green color
- "Total Saved" label
- Subtle success glow or celebration illustration

Consider adding a brief animation on first view (confetti, number counting up) that only plays once.

**Breakdown Cards:**

Display breakdown as vertically stacked cards:
- Each card shows icon, title, amount, and brief description
- Cards should feel tappable even if they just show more detail

Alternatively, use a horizontal scrollable card row for the breakdown categories.

**Timeline:**

Show recent savings events as a scrollable list:
- Compact rows with date, description, amount
- Service logo for recognition
- Tap for more detail about the event

Limit initial display to 5-10 events with "Show more" option.

**Share Feature:**

Make sharing prominent and easy:
- "Share Your Savings" button with share icon
- Tapping generates a pre-formatted image optimized for social sharing
- Use native share sheet for distribution options

**Celebration Moments:**

Consider milestone celebrations:
- First $50 saved
- First $100 saved
- Monthly savings record

Show these as special badges or celebratory cards when achieved.

**iOS-Specific Considerations:**

- Use native share sheet with image preview
- Consider adding confetti animation using UIKit dynamics
- Support saving image to Photos
- Haptic feedback on share action

**Android-Specific Considerations:**

- Use Material share sheet
- Support saving to device gallery
- Consider adding Lottie animation for celebration
- Ensure share image works well on various social platforms