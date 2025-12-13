---
screen: 33
name: Help & FAQ
batch: 7
status: not_started
purpose: "Self-service support and answers to common questions."
user_story: "As a user, I want to find answers to my questions without contacting support."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Accordion
      path: klard-web/src/components/ui/accordion/accordion.tsx
      exists: false
      note: "Need to create accordion component or use shadcn accordion"
    - name: SearchInput
      path: klard-web/src/components/ui/search-input.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: EmptyState
      path: klard-web/src/components/ui/empty-state/empty-state.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Accordion
      path: klard-mobile/src/components/ui/Accordion/Accordion.tsx
      exists: false
      note: "Need to create expandable list component using LayoutAnimation"
    - name: SearchInput
      path: klard-mobile/src/components/ui/SearchInput/SearchInput.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: EmptyState
      path: klard-mobile/src/components/ui/EmptyState/EmptyState.tsx
      exists: true
error_messages:
  - scenario: "Search no results"
    message: "No results found for '[search term]'. Try different keywords."
  - scenario: "Contact form submission failure"
    message: "Could not send message. Please try again."
  - scenario: "Chat unavailable"
    message: "Live chat is currently unavailable. Please try email or check back later."
  - scenario: "Help content loading failure"
    message: "Could not load help content. Please check your connection and try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Search input must have clear label and announce result count"
    - "Accordion headers must be keyboard navigable and announce expanded/collapsed state"
    - "FAQ answers must be associated with their questions for screen readers"
    - "Quick action cards must have descriptive accessible names"
    - "External links must indicate they open in new tab/window"
    - "Search results filtering must announce updates via aria-live"
---

# Screen 33: Help & FAQ

## Purpose
Self-service support and answers to common questions.

## User Story
As a user, I want to find answers to my questions without contacting support.

---

## Web Implementation

**Layout Approach:**

Help & FAQ can be a dedicated page or a slide-over panel. A dedicated page allows for comprehensive content organization. Use the main application shell.

**Page Header:**

"Help & Support" as H1 with a search bar prominently positioned below:
- Placeholder: "Search for help..."
- Search should filter FAQ items and help articles in real-time

**Quick Actions Section:**

Display 3-4 common support actions as cards:

**Getting Started:**
- Icon: PlayCircle
- "New to Klard? Start here"
- Links to onboarding content or tutorial

**Contact Support:**
- Icon: MessageCircle
- "Need help? Chat with us"
- Opens support chat or contact form

**Report a Problem:**
- Icon: AlertCircle
- "Something not working?"
- Opens bug report form

**Feature Request:**
- Icon: Lightbulb
- "Have an idea?"
- Opens feedback form or links to feedback portal

**FAQ Section:**

Organize frequently asked questions by category using an accordion pattern:

**Categories:**

**Account & Billing**
- How do I change my plan?
- How do I update my payment method?
- How do I cancel my subscription?
- What happens when my trial ends?

**Subscriptions**
- How do I add a subscription?
- How does email sync work?
- Why is my subscription price different?
- How do renewal reminders work?

**BurnerCards**
- What is a BurnerCard?
- How do I create a BurnerCard?
- What happens when a BurnerCard blocks a charge?
- Can I see my full card number again?

**Privacy & Security**
- How does Klard protect my data?
- Does Klard access my bank account?
- How do I enable two-factor authentication?
- How do I delete my account?

**Accordion Behavior:**
- Click category header to expand/collapse
- Show 4-6 questions per category
- Each question expands to show the answer
- Only one question expanded at a time (optional)

**Search Results:**

When user types in search:
- Filter FAQ items matching query
- Highlight matching text
- Show results grouped by category
- "No results" state with suggestions

**Contact Section:**

At the bottom, provide direct contact options:

**Contact Methods:**
- Email: support@klard.com (mailto link)
- Chat: "Start Chat" button (if live chat available)
- Response time expectation: "We typically respond within 24 hours"

**Additional Resources:**

- Link to full documentation/knowledge base (if exists)
- Link to status page (if service status monitoring exists)
- Link to community forum (if exists)

---

## Mobile Implementation

**Layout Approach:**

Help should be easily accessible from Settings or as a dedicated tab/menu item. On mobile, optimize for quick answer discovery and easy contact.

**Header:**

"Help" as navigation title with search bar below (sticky on scroll).

**Search Behavior:**

Tapping search should:
- Expand to full-width
- Show keyboard
- Display recent searches or popular queries
- Filter results as user types

**Quick Actions:**

Display as horizontally scrollable cards or 2x2 grid:
- Getting Started
- Contact Us
- Report Problem
- Give Feedback

Each card should be tappable and clearly labeled.

**FAQ List:**

Display categories as expandable sections:

**Category Headers:**
- Category name
- Question count badge
- Expand/collapse chevron

**Questions:**
- When category is expanded, show questions as tappable rows
- Tapping a question navigates to answer screen or expands inline

**Answer Display:**

Two options for showing answers:

**Option A — Inline Expansion:**
- Question expands to reveal answer below
- Good for short answers
- Supports accordion behavior

**Option B — Detail Screen:**
- Question tap navigates to full-screen answer
- Better for longer answers with formatting
- Allows related questions suggestion

Recommend Option A for simple FAQs, Option B for complex answers.

**Contact Options:**

Make contacting support prominent and easy:

**Sticky Footer or Bottom Section:**
- "Still need help?" heading
- "Contact Support" button
- Expected response time

**Support Chat:**

If live chat is available, consider a floating chat button (bottom right) that persists across help screens.

**iOS-Specific Considerations:**

- Use iOS search bar styling
- FAQ sections should use grouped table appearance
- Support 3D Touch / Haptic Touch for quick actions
- Consider using SFSafariViewController for external help links

**Android-Specific Considerations:**

- Use Material search bar patterns
- FAQ should use expandable Material lists
- Support share action for help articles
- Consider using Chrome Custom Tabs for external links
