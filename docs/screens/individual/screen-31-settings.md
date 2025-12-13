---
screen: 31
name: Settings
batch: 7
status: not_started
purpose: "Central hub for configuring account preferences, notifications, security, and app behavior."
user_story: "As a user, I want to customize how Klard works for me so the app fits my preferences."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Switch
      path: klard-web/src/components/ui/switch/switch.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Separator
      path: klard-web/src/components/ui/separator.tsx
      exists: true
    - name: Avatar
      path: klard-web/src/components/ui/avatar.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Switch
      path: klard-mobile/src/components/ui/Switch/Switch.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Avatar
      path: klard-mobile/src/components/ui/Avatar/Avatar.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
      exists: true
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: Separator
      path: klard-mobile/src/components/ui/Separator/Separator.tsx
      exists: false
      note: "Use View with border styling as divider"
error_messages:
  - scenario: "Profile update failure"
    message: "Failed to save changes. Please try again."
  - scenario: "Avatar upload failure"
    message: "Image upload failed. Please try a different file."
  - scenario: "Email change verification required"
    message: "A verification link has been sent to your new email address."
  - scenario: "Password change failure"
    message: "Current password is incorrect."
  - scenario: "2FA setup failure"
    message: "Could not verify authentication code. Please try again."
  - scenario: "Session sign out failure"
    message: "Could not sign out session. Please try again."
  - scenario: "Account deletion error"
    message: "Could not schedule account deletion. Please contact support."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Settings category navigation must announce selected state"
    - "Toggle switches must announce on/off state change"
    - "Avatar change button must have descriptive accessible name"
    - "Destructive actions (delete account) must have confirmation dialogs accessible to screen readers"
    - "Active sessions list must be navigable and announce device details"
    - "Auto-save confirmation must be announced via aria-live"
---

# Screen 31: Settings

## Purpose
Central hub for configuring account preferences, notifications, security, and app behavior.

## User Story
As a user, I want to customize how Klard works for me so the app fits my preferences.

---

## Web Implementation

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
  - Renewal reminders
  - Price change alerts
  - BurnerCard activity
  - Weekly spending summary
  - Product updates and tips

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

## Mobile Implementation

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
