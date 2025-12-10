# Klard UX Design Prompt — Batch 7
## Screens 31-34: Account Management & System States (Final MVP Batch)

---

## Screen 31: Settings

**Purpose:** Central hub for configuring account preferences, notifications, security, and app behavior.

**User Story:** As a user, I want to customize how Klard works for me so the app fits my preferences.

---

### Web Specification

**Layout Approach:**

Settings should be organized into logical sections within the main application shell. Use a two-column layout on desktop: a navigation sidebar on the left listing setting categories, and the detail panel on the right showing the selected category's options. This pattern scales well and allows quick navigation between sections.

**Settings Navigation (Left Column):**

Organize settings into these categories:

1. **Profile** — Personal information, avatar
2. **Notifications** — Email, push, SMS preferences
3. **Preferences** — Currency, reminders, theme
4. **Security** — Password, two-factor auth, sessions
5. **Connected Accounts** — Email sync, social logins
6. **Data & Privacy** — Export, deletion, policies
7. **Plan & Billing** — Links to Screen 32

Each category shows as a list item with icon and label. Selected category has active state (teal background tint, bold text).

**Profile Section:**

**Avatar:**
Display current avatar (or initials placeholder) at 80px size with "Change" overlay on hover. Clicking opens file picker for image upload. Support cropping/repositioning after selection.

**Personal Information:**
- Full Name: Editable text field
- Email: Display with "Change" link (triggers verification flow)
- Phone (optional): For SMS alerts, with country code selector

**Save Behavior:**
Auto-save on field blur with subtle "Saved" confirmation, or provide explicit "Save Changes" button at section bottom.

**Notifications Section:**

Organize notification preferences by channel and type:

**Email Notifications:**
- Master toggle: "Email notifications" (on/off)
- Sub-options (when enabled):
  - ☑️ Renewal reminders
  - ☑️ Price change alerts
  - ☑️ BurnerCard activity
  - ☑️ Weekly spending summary
  - ☐ Product updates and tips

**Push Notifications:**
- Master toggle: "Push notifications" (on/off)
- Same sub-options as email

**SMS Notifications (Saver+ only):**
- Master toggle: "SMS alerts" (on/off)
- Phone number display with edit option
- Limited to critical alerts: Renewals within 24 hours, blocked charges

**Notification Frequency:**
- Dropdown: "Renewal reminder timing"
- Options: 1 day before, 3 days before, 7 days before, 1 day + 7 days

**Preferences Section:**

**Currency:**
- Dropdown selector with common currencies
- Affects all price displays throughout the app
- Note: "Changing currency converts display only, not actual charge amounts"

**Default Reminder Timing:**
- Dropdown: Days before renewal to receive reminder
- Options: 1, 3, 5, 7, 14 days

**Theme:**
- Radio options: Light / Dark / System (follows device)
- Preview thumbnail for each option
- Change applies immediately

**First Day of Week:**
- Dropdown: Sunday / Monday
- Affects calendar view display

**Security Section:**

**Password:**
- Current password display: "••••••••" with "Change Password" button
- Change flow: Current password → New password → Confirm → Save
- Password strength indicator on new password

**Two-Factor Authentication:**
- Toggle to enable/disable
- Setup flow: Choose method (Authenticator app / SMS) → Verify → Backup codes
- If enabled, show "Manage 2FA" with options to view backup codes or change method

**Active Sessions:**
- List of devices/browsers with active sessions
- Each shows: Device type, browser, location (approximate), last active
- "Sign out" action per session
- "Sign out all other sessions" bulk action

**Connected Accounts Section:**

**Email Sync:**
- Show connected email address if any
- Connection status: "Connected" (green) or "Not connected"
- "Disconnect" action with confirmation (warns about losing sync)
- "Connect Email" button if not connected → Screen 15

**Social Logins:**
- Show connected social accounts (Google, Apple)
- Toggle to connect/disconnect each
- At least one login method must remain active

**Data & Privacy Section:**

**Export Data:**
- "Export All Data" button → Opens Export Modal (Screen 29)
- Description: "Download a copy of all your Klard data"

**Delete Account:**
- "Delete Account" destructive link
- Multi-step confirmation:
  1. Click reveals warning about permanent deletion
  2. Must type "DELETE" to confirm
  3. Optional: Reason for leaving (feedback)
  4. Final confirmation button
- Grace period: "Your account will be scheduled for deletion in 7 days. Sign in to cancel."

**Legal Links:**
- Privacy Policy (opens in new tab)
- Terms of Service (opens in new tab)
- Cookie Policy (opens in new tab)

---

### Mobile Specification

**Layout Approach:**

On mobile, settings use a drill-down navigation pattern. The main settings screen shows a list of categories; tapping a category navigates to a detail screen for that section.

**Main Settings Screen:**

Display as a grouped list with section headers:

**Account**
- Profile (chevron →)
- Plan & Billing (chevron →)

**Preferences**
- Notifications (chevron →)
- Appearance (chevron →)
- Currency & Region (chevron →)

**Security**
- Password & Authentication (chevron →)
- Connected Accounts (chevron →)

**Data**
- Export Data (chevron →)
- Privacy Policy (external link icon)
- Terms of Service (external link icon)

**Danger Zone**
- Delete Account (red text, chevron →)

**App Info (footer):**
- Version number
- "Rate Klard" link
- "Send Feedback" link

**Profile Detail Screen:**

- Avatar (large, tappable to change)
- Name field
- Email field (with verification indicator)
- Phone field (optional)
- Save button (if not auto-saving)

**Notifications Detail Screen:**

Organize as toggles in grouped sections:

**Email**
- Master toggle with sub-options indented below

**Push**
- Master toggle with sub-options

**SMS (Saver+ only)**
- Toggle with phone number display

**Reminder Timing**
- Tappable row opening action sheet with options

**Appearance Detail Screen:**

- Theme selection: Light / Dark / System
- Each option as a tappable row with checkmark on selected
- Optional: Preview thumbnails

**Security Detail Screen:**

- Change Password (tappable row → Change password flow)
- Two-Factor Authentication (toggle + setup flow)
- Active Sessions (tappable row → Sessions list with sign-out actions)

**Swipe Actions:**

In the Active Sessions list, support swipe-to-sign-out for individual sessions.

**Delete Account Flow:**

Present as a multi-step flow:
1. Initial screen with warnings
2. Confirmation screen requiring "DELETE" input
3. Optional feedback form
4. Final confirmation

Each step should feel deliberate to prevent accidental deletion.

**iOS-Specific Considerations:**

- Use iOS Settings app styling (grouped inset tables)
- Toggle switches should use native iOS styling
- Destructive actions should use red text
- Support Face ID / Touch ID for security changes

**Android-Specific Considerations:**

- Follow Material Settings patterns
- Use Material switches for toggles
- Destructive actions should use Material dialog confirmations
- Support biometric authentication for security changes

---

## Screen 32: Profile & Plan Management

**Purpose:** Manage subscription plan, view billing history, and update payment methods.

**User Story:** As a user, I want to manage my Klard subscription and billing so I can upgrade, downgrade, or update payment.

---

### Web Specification

**Layout Approach:**

This can be a dedicated page or a section within Settings. Given the importance of plan management, a dedicated page with clear hierarchy is recommended. Use the main application shell.

**Page Header:**

"Your Plan" as H1 with subtitle showing current plan: "You're on the [Plan Name] plan"

**Current Plan Card:**

Create a prominent card showing the user's active plan:

**Card Content:**
- Plan name with badge styling (Basic / Pro / Saver+)
- Price: "$16.99/month" or "$163/year"
- Billing cycle indicator
- Renewal date: "Renews on February 15, 2026"
- Status: "Active" badge in success green

**Plan Features:**
- Checklist of included features for current plan
- Styled to reinforce value

**Plan Actions:**
- If on trial: "X days remaining in trial" banner with "Choose Plan" button
- If on Basic/Pro: "Upgrade" button
- If on Saver+: "You're on our best plan!" message
- "Cancel Plan" text link (not prominent)

**Plan Comparison (Upgrade Section):**

If user is not on the highest plan, show upgrade options:

**Comparison Cards:**
Display available plans side by side (similar to Screen 6 Plan Selection but in account context):

- Current plan marked: "Current Plan" badge
- Higher plans show "Upgrade" button
- Lower plans show "Downgrade" button (if applicable)
- Highlight recommended upgrade with "Best Value" badge

**Upgrade Flow:**
Clicking "Upgrade" should:
1. Show confirmation of new price and features gained
2. Confirm payment method
3. Process upgrade (prorated if mid-cycle)
4. Show success confirmation

**Billing History Section:**

Display a table of past invoices and payments:

**Table Columns:**
- Date
- Description (e.g., "Saver+ Monthly", "Additional BurnerCard")
- Amount
- Status (Paid ✓, Failed ✗, Pending)
- Invoice (download link)

**Pagination:**
Show last 10 transactions with "Load More" or pagination for history.

**Failed Payment Handling:**
If any payment failed, show a banner: "Your last payment failed. Update your payment method to continue service."

**Payment Method Section:**

**Current Payment Method:**
- Card icon + "Visa ending in 4821"
- Expiry date
- "Default" badge if multiple methods
- "Update" button

**Add Payment Method:**
- "Add Payment Method" button
- Opens payment form (Stripe Elements or similar)
- Support for cards (credit/debit)

**Multiple Payment Methods:**
If supporting multiple:
- List all saved methods
- "Set as Default" action per method
- "Remove" action (with confirmation)

**Cancel Plan Section:**

Position at the bottom, de-emphasized but accessible:

**Cancellation Flow:**
1. Click "Cancel Plan"
2. Show what they'll lose (feature list)
3. Offer alternatives: "Downgrade to Pro instead?"
4. Confirm cancellation
5. Show end date: "Your plan will remain active until [Date]"

**Winback Offer (optional):**
Consider offering a discount or pause option before final cancellation.

---

### Mobile Specification

**Layout Approach:**

Present as a full-screen view accessible from Settings or Profile. Organize content as scrollable sections.

**Header:**

"Plan & Billing" as navigation title

**Current Plan Section:**

Display prominently at the top:
- Plan name (large)
- Price
- "Renews [Date]" or "Trial ends [Date]"
- Status badge

**Quick Actions:**

Below the plan info, show relevant actions:
- "Upgrade Plan" (if not on Saver+) — Primary button
- "Manage Plan" — Secondary button (opens options sheet)

**Plan Options Sheet:**

When "Manage Plan" is tapped, show action sheet with:
- View All Plans
- Change Billing Cycle (monthly ↔ annual)
- Cancel Plan

**Billing History:**

Display as a scrollable list:
- Each row: Date, description, amount, status indicator
- Tap to view invoice detail or download

Keep this section collapsed by default with "View Billing History" to expand, since most users won't need it frequently.

**Payment Method:**

Show current payment method in a card format:
- Card brand icon + last 4 digits
- Expiry
- "Update" button

**Adding/Updating Payment:**

Present payment form in a bottom sheet or full-screen modal. Use Stripe or payment processor's mobile-optimized UI components.

**Plan Comparison:**

If user wants to upgrade, navigate to a dedicated comparison screen (similar to onboarding plan selection) optimized for the decision context.

**Cancellation Flow:**

Multi-step bottom sheets or full-screen flow:
1. "Are you sure?" with feature loss summary
2. Reason for cancellation (optional feedback)
3. Final confirmation with end date

**iOS-Specific Considerations:**

- Use native payment sheet styling if using Apple Pay
- Billing history should use grouped table styling
- Cancellation should feel deliberate (multiple confirmations)
- Support receipt viewing in Quick Look

**Android-Specific Considerations:**

- Support Google Pay if applicable
- Use Material cards for plan display
- Billing history as Material list items
- Handle Google Play subscription management if distributing via Play Store

---

## Screen 33: Help & FAQ

**Purpose:** Self-service support and answers to common questions.

**User Story:** As a user, I want to find answers to my questions without contacting support.

---

### Web Specification

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

### Mobile Specification

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

---

## Screen 34: Empty States

**Purpose:** Guide users constructively when content areas are empty.

**User Story:** As a user encountering an empty section, I want to understand why it's empty and what I can do about it.

---

### Design Philosophy

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

### Empty State Variants

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

### Web Implementation Notes

**Sizing:**
- Illustration: 160px max height
- Container: Max-width 400px, centered horizontally and vertically in available space
- Spacing: 24px between elements

**Responsive Behavior:**
- On smaller containers, illustration may scale down
- Text remains readable at all sizes
- CTA should be prominent and accessible

---

### Mobile Implementation Notes

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

### Accessibility Considerations

**All Empty States:**
- Illustration should have empty alt text (decorative) or meaningful alt if conveying information
- Headline and body must be accessible to screen readers
- CTA buttons must be properly labeled
- Focus should move to the empty state container when it appears

**Color Contrast:**
- All text must meet WCAG AA standards against the background
- Illustrations should work in both light and dark themes

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 7 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 31: Settings | Card, Switch, Select, Button, Separator, Avatar, Badge, Alert |
| Screen 32: Profile & Plan Management | Card, Input, Avatar, Button, Badge, Alert, Separator, Modal, ProgressBar |
| Screen 33: Help & FAQ | Card, Accordion, SearchInput, Button, Badge, Separator, EmptyState |
| Screen 34: Empty States | EmptyState, Button, Illustration (various configurations for different contexts) |

---

# End of Batch 7 — MVP Complete!

---

*Batch 7 Complete: Screens 31-34 (Settings, Profile & Plan Management, Help & FAQ, Empty States)*

---

## MVP Screen Inventory Summary

| Screen # | Name | Batch |
|----------|------|-------|
| 1 | Login | 1 |
| 2 | Sign Up | 1 |
| 3 | Forgot Password | 1 |
| 4 | Email Verification | 1 |
| 5 | Welcome (Onboarding) | 1 |
| 6 | Plan Selection | 2 |
| 7 | Import Hub | 2 |
| 8 | Add First Subscription | 2 |
| 9 | BurnerCard Tutorial | 2 |
| 10 | Main Dashboard | 2 |
| 11 | Subscription List View | 3 |
| 12 | Subscription Detail View | 3 |
| 13 | Add/Edit Subscription Modal | 3 |
| 14 | Calendar View | 3 |
| 15 | Email Connection Setup | 3 |
| 16 | Email Scan Progress | 4 |
| 17 | Email Scan Results Review | 4 |
| 18 | BurnerCard Overview | 4 |
| 19 | Create BurnerCard — Step 1 | 4 |
| 20 | Create BurnerCard — Step 2 | 4 |
| 21 | Create BurnerCard — Step 3 | 5 |
| 22 | BurnerCard Detail View | 5 |
| 23 | Card Rules Configuration | 5 |
| 24 | Alerts Center | 5 |
| 25 | Price Increase Alert Detail | 5 |
| 26 | Renewal Reminder Detail | 6 |
| 27 | Spend Analytics Dashboard | 6 |
| 28 | Savings Report View | 6 |
| 29 | Export Modal | 6 |
| 30 | Alternative Finder | 6 |
| 31 | Settings | 7 |
| 32 | Profile & Plan Management | 7 |
| 33 | Help & FAQ | 7 |
| 34 | Empty States | 7 |

---

**Total MVP Screens: 34**
**Total Batches: 7**
**Phase 2 Screens Remaining: 21 (documented in Batch 1 inventory)**
