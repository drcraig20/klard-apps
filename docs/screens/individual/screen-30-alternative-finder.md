---
screen: 30
name: Alternative Finder
batch: 6
status: not_started
purpose: "Help users discover cheaper alternatives to their current subscriptions."
user_story: "As a user, I want to find cheaper alternatives to my subscriptions so I can save money without losing functionality."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: SearchInput
      path: klard-web/src/components/ui/search-input.tsx
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
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: SearchInput
      path: klard-mobile/src/components/ui/SearchInput/SearchInput.tsx
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
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
    - name: BottomSheet
      path: klard-mobile/src/components/ui/BottomSheet/BottomSheet.tsx
      exists: true
error_messages:
  - scenario: "Failed to load alternatives"
    message: "Couldn't load alternatives. Please try again."
  - scenario: "No alternatives found"
    message: "No alternatives found for [Service Name]. This might be because it offers unique features."
  - scenario: "Comparison failed"
    message: "Couldn't load comparison. Try selecting fewer services."
  - scenario: "External link failed"
    message: "Couldn't open the service website. Try again or search for it manually."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Alternative cards must announce service name, price, and savings amount
    - Savings badges must be announced as part of the card context
    - Category filter chips must announce selected/unselected state
    - Comparison mode selection must announce item added/removed
    - Rating stars must have accessible text equivalent (e.g., "4.2 out of 5 stars")
    - External links must indicate they open in new window/browser
---

# Screen 30: Alternative Finder

## Purpose
Help users discover cheaper alternatives to their current subscriptions.

## User Story
As a user, I want to find cheaper alternatives to my subscriptions so I can save money without losing functionality.

---

## Web Implementation

**Layout Approach:**

This screen can be accessed from subscription details, price increase alerts, or as a standalone discovery feature. The design should facilitate comparison shopping while highlighting potential savings.

**Entry Contexts:**

The screen behaves slightly differently based on entry point:

1. **From Subscription Detail:** Pre-filtered to show alternatives for that specific service
2. **From Price Alert:** Pre-filtered for the service that increased in price
3. **From Navigation:** Shows all categories, user browses freely

**Header Section:**

When viewing alternatives for a specific service:
- "Alternatives to [Service Name]" as H1
- Show the current subscription in a compact card: logo, name, price

When browsing generally:
- "Find Alternatives" as H1
- Category filter dropdown or tabs

**Current Subscription Context:**

When comparing to a specific subscription, show it as a reference point at the top:

**Current Service Card:**
- Logo (48px)
- Service name
- Current price: "$15.99/month"
- "Your current service" label
- Key features you're using (if known)

**Alternatives List:**

Display alternatives as comparison cards. Each alternative should clearly show:

**Service Information:**
- Logo and name
- Brief description (one line)
- Rating (star rating if available, sourced from app stores or review aggregators)

**Pricing:**
- Monthly price
- Annual price (if different)
- Savings badge: "Save $24/year" in success green
- Affiliate discount badge if available: "Extra 20% off"

**Feature Comparison:**

Show a quick feature comparison relevant to the category:
- For streaming: "4K available", "Offline downloads", "Number of screens"
- For productivity: "Storage", "Collaboration", "Integrations"

Use checkmarks/x-marks for feature presence.

**Call to Action:**
- "Learn More" (primary-ish) — opens service website
- "Compare" — adds to comparison tray

**Comparison Mode:**

Allow users to select multiple alternatives for side-by-side comparison:

**Comparison Tray:**
When user clicks "Compare" on alternatives, add them to a sticky comparison tray at the bottom:
- Shows logos of selected alternatives (up to 3-4)
- "Compare X Services" button
- "Clear" link

**Comparison Table View:**

When comparison is triggered, show a detailed side-by-side table:
- Columns: Current service + selected alternatives
- Rows: Price, Key features, Pros, Cons, Rating, Savings

This could be a modal or a new view.

**Savings Calculator:**

Show aggregate potential savings:
- "Switching could save you up to $45/year"
- Based on the cheapest alternative that meets core feature needs

**Affiliate Disclosure:**

If affiliate links are used, include appropriate disclosure:
- Small text: "Some links may earn Klard a commission at no cost to you"
- Doesn't affect recommendations (ensure this is true)

**Empty/No Alternatives State:**

If no alternatives are available:
- "No alternatives found for [Service Name]"
- "This might be because [Service] offers unique features"
- Suggest: "Try broadening your search" or "Check back later"

---

## Mobile Implementation

**Layout Approach:**

On mobile, focus on clear comparison and easy action-taking. Users should be able to evaluate alternatives and make decisions quickly.

**Header:**

If comparing to specific service: "[Service] Alternatives" as title with the current service shown below
If browsing: "Find Alternatives" with category filter chips

**Category Navigation:**

Use horizontally scrollable category chips:
- All
- Streaming
- Productivity
- Gaming
- Fitness
- etc.

Selected chip has filled background.

**Current Service Reference:**

When comparing to a specific subscription, show it as a sticky mini-card at the top:
- Logo, name, price on one line
- "Your current" label
- This stays visible while scrolling alternatives

**Alternatives List:**

Display alternatives as full-width cards:

**Card Content:**
- Logo and name (prominent)
- Price with savings badge: "$9.99/mo — Save $6/mo"
- Rating: ★★★★☆ 4.2
- Quick feature list (2-3 items)
- "View" button

**Card Interactions:**
- Tap card to expand inline details
- Tap "View" to open service website
- Long-press for quick actions (Add to comparison, Share)

**Inline Expansion:**

When a card is tapped, expand it to show:
- Full feature comparison vs current service
- Pros and cons
- "Switch to This" CTA

This avoids navigating away while providing details.

**Comparison Feature:**

On mobile, simplify comparison:
- Allow selecting up to 2 alternatives
- Show a floating "Compare (2)" button when items selected
- Comparison opens as a bottom sheet with side-by-side view

**Savings Summary:**

Show potential savings prominently:
- Sticky banner or footer: "Save up to $45/year by switching"
- Updates based on viewed alternatives

**Action Flow:**

When user decides to switch:
1. Tap "Switch to This" or "Learn More"
2. Open service website in in-app browser
3. After returning, prompt: "Did you sign up? Update your subscriptions"

**iOS-Specific Considerations:**

- Use SFSafariViewController for viewing alternative sites
- Support haptic feedback on selection
- Comparison sheet should be a half-sheet
- Cards should support context menus

**Android-Specific Considerations:**

- Use Chrome Custom Tabs for external sites
- Support Material motion for card expansion
- Comparison as bottom sheet dialog
- Ripple effects on interactive elements