---
screen: 34
name: Empty States
batch: 7
status: not_started
purpose: "Guide users constructively when content areas are empty."
user_story: "As a user encountering an empty section, I want to understand why it's empty and what I can do about it."
components:
  web:
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Illustration
      path: klard-web/src/components/ui/illustrations/
      exists: false
      note: "Need to create illustration assets for each empty state variant"
  mobile:
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Illustration
      path: klard-mobile/src/components/ui/illustrations/
      exists: false
      note: "Need to create illustration assets (SVG for iOS, XML vector for Android)"
error_messages:
  - scenario: "Connection error"
    message: "You're offline. Check your internet connection and try again."
  - scenario: "Content load failure"
    message: "Could not load content. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Illustrations should have empty alt text (decorative) unless conveying unique information"
    - "Empty state headline and body must be accessible to screen readers"
    - "CTA buttons must be properly labeled with action context"
    - "Focus should move to empty state container when it appears dynamically"
    - "Pull-to-refresh actions must be announced when triggered"
    - "Color contrast must meet WCAG AA for all empty state text"
---

# Screen 34: Empty States

## Purpose
Guide users constructively when content areas are empty.

## User Story
As a user encountering an empty section, I want to understand why it's empty and what I can do about it.

---

## Design Philosophy

Empty states are opportunities, not dead ends. Each empty state should:
1. Clearly communicate what would normally appear here
2. Explain why it's empty (if not obvious)
3. Provide a clear action to resolve the empty state
4. Feel encouraging, not discouraging

**Visual Pattern:**

All empty states should follow a consistent visual pattern:
- Centered content
- Illustration (abstract, branded, ~120-160px)
- Headline (H2, Text Primary)
- Body text (Body, Text Secondary, 1-2 sentences)
- Primary CTA button (when action available)
- Secondary action (optional, text link)

---

## Empty State Variants

**Variant 1: No Subscriptions**

**Context:** Subscription List (Screen 11) when user has no subscriptions

**Illustration:** Abstract calendar with floating cards or empty wallet

**Headline:** "No subscriptions yet"

**Body:** "Start tracking your recurring payments to take control of your spending."

**Primary CTA:** "Add Your First Subscription"

**Secondary:** "Import from Email" (text link)

---

**Variant 2: No BurnerCards**

**Context:** BurnerCard Overview (Screen 18) for Saver+ users with no cards

**Illustration:** Credit card with shield graphic

**Headline:** "No BurnerCards yet"

**Body:** "Create virtual cards to protect against unwanted charges and control your spending."

**Primary CTA:** "Create Your First BurnerCard"

**Secondary:** "Learn how BurnerCards work" (text link)

---

**Variant 3: BurnerCards Locked (Tier Gate)**

**Context:** BurnerCard Overview for Basic/Pro users

**Illustration:** Locked card with sparkles

**Headline:** "Unlock BurnerCards"

**Body:** "Upgrade to Saver+ to create virtual cards that protect you from unwanted charges."

**Primary CTA:** "Upgrade to Saver+"

**Secondary:** "Start 14-day free trial" (if available)

---

**Variant 4: No Alerts**

**Context:** Alerts Center (Screen 24) when no alerts exist

**Illustration:** Bell with checkmark

**Headline:** "You're all caught up"

**Body:** "No alerts right now. We'll notify you when something needs your attention."

**Primary CTA:** None needed (this is a positive state)

**Secondary:** "View Subscriptions" (optional navigation)

---

**Variant 5: No Search Results**

**Context:** Any search returning zero results

**Illustration:** Magnifying glass with question mark

**Headline:** "No results found"

**Body:** "We couldn't find anything matching '[search term]'. Try different keywords or check your filters."

**Primary CTA:** "Clear Search" or "Clear Filters"

**Secondary:** "Browse all [items]" (text link)

---

**Variant 6: No Transactions (BurnerCard)**

**Context:** BurnerCard Detail (Screen 22) transaction history when card is unused

**Illustration:** Empty receipt or transaction icon

**Headline:** "No transactions yet"

**Body:** "Charges will appear here once you use this card."

**Primary CTA:** "Copy Card Details" (if card is active)

**Secondary:** None

---

**Variant 7: No Analytics Data**

**Context:** Analytics Dashboard (Screen 27) for new users

**Illustration:** Empty chart or graph

**Headline:** "Not enough data yet"

**Body:** "Add subscriptions to start seeing your spending insights and trends."

**Primary CTA:** "Add Subscriptions"

**Secondary:** "Import from Email" (text link)

---

**Variant 8: No Savings Yet**

**Context:** Savings Report (Screen 28) for new users

**Illustration:** Piggy bank or coins

**Headline:** "No savings recorded yet"

**Body:** "As you use Klard to block charges, cancel subscriptions, or find alternatives, your savings will appear here."

**Primary CTA:** "Explore BurnerCards" (for Saver+) or "View Subscriptions"

**Secondary:** "How saving works" (help link)

---

**Variant 9: Email Sync Empty Results**

**Context:** Email Scan Results (Screen 17) when scan finds nothing

**Illustration:** Inbox with magnifying glass

**Headline:** "No subscriptions found"

**Body:** "We didn't detect any subscription receipts in your email. This could mean your subscriptions use a different email or the receipts are in a different format."

**Primary CTA:** "Add Manually"

**Secondary:** "Scan Again" or "Try Different Email"

---

**Variant 10: No Alternatives Found**

**Context:** Alternative Finder (Screen 30) with no alternatives

**Illustration:** Comparison icon with empty state

**Headline:** "No alternatives found"

**Body:** "[Service Name] is unique! We don't have any similar services to suggest right now."

**Primary CTA:** "View Other Categories"

**Secondary:** "Suggest an Alternative" (feedback link)

---

**Variant 11: Calendar Empty**

**Context:** Calendar View (Screen 14) when no subscriptions

**Illustration:** Empty calendar

**Headline:** "No renewals to show"

**Body:** "Add subscriptions to see your renewal dates on the calendar."

**Primary CTA:** "Add Subscription"

**Secondary:** None

---

**Variant 12: Connection Error / Offline**

**Context:** Any screen when network is unavailable

**Illustration:** Cloud with disconnect icon

**Headline:** "You're offline"

**Body:** "Check your internet connection and try again."

**Primary CTA:** "Try Again"

**Secondary:** None

---

## Web Implementation Notes

**Sizing:**
- Illustration: 160px max height
- Container: Max-width 400px, centered horizontally and vertically in available space
- Spacing: 24px between elements

**Responsive Behavior:**
- On smaller containers, illustration may scale down
- Text remains readable at all sizes
- CTA should be prominent and accessible

---

## Mobile Implementation Notes

**Sizing:**
- Illustration: 120px max height (smaller for mobile)
- Full-width container with 24px horizontal padding
- Vertically centered in available space

**Touch Targets:**
- Primary CTA should be full-width button (minimum 48px height)
- Secondary actions should have adequate touch area

**Pull to Refresh:**
- Some empty states (like "No alerts") should support pull-to-refresh
- Others (like "No subscriptions") should not (user action required)

**Illustrations:**
- Use vector illustrations (SVG or PDF for iOS, XML for Android) for crisp rendering
- Support dark mode variants if illustrations have colored backgrounds
- Keep file sizes small for performance

---

## Accessibility Considerations

**All Empty States:**
- Illustration should have empty alt text (decorative) or meaningful alt if conveying information
- Headline and body must be accessible to screen readers
- CTA buttons must be properly labeled
- Focus should move to the empty state container when it appears

**Color Contrast:**
- All text must meet WCAG AA standards against the background
- Illustrations should work in both light and dark themes
