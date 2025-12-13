---
screen: 15
name: Email Connection Setup
batch: 3
status: not_started
purpose: "Guide users through connecting their email for automatic subscription detection."
user_story: "As a user, I want to connect my email so Klard can find my subscriptions automatically."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
    - name: Spinner
      path: klard-web/src/components/ui/spinner.tsx
      exists: true
    - name: Stepper
      path: klard-web/src/components/ui/stepper.tsx
      exists: true
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
    - name: Spinner
      path: klard-mobile/src/components/ui/Spinner/Spinner.tsx
      exists: true
    - name: Stepper
      path: klard-mobile/src/components/ui/Stepper/Stepper.tsx
      exists: true
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
error_messages:
  - scenario: "OAuth cancelled"
    message: "Connection was cancelled or failed"
  - scenario: "Provider temporarily unavailable"
    message: "This email provider is temporarily unavailable. Please try again later."
  - scenario: "Connection failed"
    message: "Failed to connect to your email. Please try again."
  - scenario: "Already connected"
    message: "This email is already connected to your account."
  - scenario: "Scan failed"
    message: "Failed to scan emails. Please try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Email provider selection cards must announce provider name and status
    - OAuth loading states must be announced to screen readers
    - Privacy information must be fully accessible without visual-only cues
    - Connection success/failure must be announced immediately
    - Skip option must be clearly discoverable for screen reader users
    - Provider cards must be keyboard navigable and have visible focus states
    - Progress during email scan must be announced periodically
---

# Screen 15: Email Connection Setup

## Purpose
Guide users through connecting their email for automatic subscription detection.

## User Story
As a user, I want to connect my email so Klard can find my subscriptions automatically.

---

## Web Implementation

**Layout Approach:**

This can be a full-page flow or a modal wizard. Given the sensitivity of email connection, a dedicated page with clear privacy messaging is recommended. Center content with max-width of 640px.

**Introduction Section:**

Begin with reassuring messaging. Display a large illustration showing emails being scanned for receipts (abstract, not showing actual email content).

Headline: "Connect Your Email" (H1)
Subheadline: "We'll scan for subscription receipts to save you time."

Include a prominent privacy statement card with a lock icon:
"**Your privacy is protected**
• We only scan for subscription receipts and payment confirmations
• We never read personal emails, attachments, or contacts
• You can disconnect anytime and we'll delete all synced data
• Connection is read-only — we cannot send emails or modify anything"

**Email Provider Selection:**

Display supported email providers as large selection cards:

1. **Gmail** (Google logo): Most common, OAuth via Google
2. **Outlook** (Microsoft logo): OAuth via Microsoft
3. **Yahoo** (Yahoo logo): OAuth via Yahoo
4. **Other** (Mail icon): Show message that other providers are coming soon

Each card should show the provider logo prominently with the provider name below. On hover, show subtle elevation. Selected state shows teal border.

**OAuth Flow:**

When a provider is selected, show a brief loading state ("Connecting to Gmail...") before redirecting to the OAuth consent screen.

After OAuth consent is granted, the user returns to Klard. Show a success state:
- Checkmark animation
- "Gmail connected successfully"
- "We're now scanning for subscriptions. This may take a few minutes."

Provide options:
- "Scan Now" (Primary) → Navigates to Screen 16 (Scan Progress)
- "Scan in Background" → Returns to previous screen, shows progress indicator in header

**Error Handling:**

If OAuth fails or is cancelled:
- Show inline error message: "Connection was cancelled or failed"
- Provide "Try Again" button
- Link to troubleshooting help

If the provider is temporarily unavailable:
- Show service status message
- Suggest trying again later or using a different import method

**Already Connected State:**

If visiting this screen with an already-connected email:
- Show the connected email address
- Display last sync timestamp
- Provide "Sync Now" and "Disconnect" options
- Show connection health indicator

**Skip Option:**

Include a subtle "Skip this step" or "I'll add subscriptions manually" link at the bottom for users who don't want to connect email.

---

## Mobile Implementation

**Layout Approach:**

Present as a full-screen flow accessible from the Import Hub or Settings. Use native navigation patterns with clear back navigation.

**Privacy-First Header:**

Display a shield icon with the screen title "Email Sync". In the header area, include a small privacy badge: "Read-only access • Optional"

**Introduction:**

Show a compact illustration (120px height) depicting email scanning. Keep the privacy messaging prominent but more compact:

"We scan for subscription receipts only. Your personal emails stay private."

Include an expandable "Learn more about privacy" section that reveals the detailed privacy bullet points.

**Provider Selection:**

Display provider options as large touch-friendly cards (minimum 64px height):
- Gmail with Google logo
- Outlook with Microsoft logo
- Yahoo with Yahoo logo
- Apple Mail (iOS only) — note: "Coming soon"

Cards should fill the width with consistent spacing. Show a checkmark on the selected provider before proceeding.

**OAuth Flow:**

Tapping a provider should:
1. Show brief "Connecting..." loading state
2. Open OAuth in native auth session (ASWebAuthenticationSession on iOS, Custom Tabs on Android)
3. Return to app with result

On successful connection:
- Show success animation with haptic feedback
- Display the connected email address
- Provide "Start Scanning" primary button

On failure:
- Return to selection state
- Show error alert with retry option

**Scan Initiation:**

After connection, give users control:
- "Start Scanning Now" → Navigate to Screen 16
- "Scan in Background" → Return to previous flow with status indicator

Display estimated time: "This usually takes 2-5 minutes depending on your inbox size."

**iOS-Specific Considerations:**

- Use ASWebAuthenticationSession for OAuth (shares Safari cookies)
- Support Sign in with Apple for Apple Mail integration (future)
- Provide haptic feedback on successful connection
- Consider adding to Settings app integration for mail access

**Android-Specific Considerations:**

- Use Chrome Custom Tabs for OAuth flow
- Support Google One Tap for Gmail if available
- Handle back button during OAuth gracefully
- Show loading indicator in status bar during connection

**Accessibility:**

- All provider options must be accessible via screen reader
- OAuth loading states should announce to assistive technology
- Privacy information should be accessible without visual-only cues
