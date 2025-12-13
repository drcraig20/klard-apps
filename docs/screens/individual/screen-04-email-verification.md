---
screen: 4
name: Email Verification
batch: 1
status: not_started
purpose: "Confirm the user's email address after registration to activate their account."
user_story: "As a newly registered user, I want to verify my email quickly so my account is secured and I can proceed with onboarding."
components:
  web:
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Spinner
      path: klard-web/src/components/ui/spinner.tsx
      exists: true
    - name: Alert
      path: klard-web/src/components/ui/alert/alert.tsx
      exists: true
  mobile:
    - name: Button
      path: klard-mobile/src/components/ui/Button/Button.tsx
      exists: true
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Spinner
      path: klard-mobile/src/components/ui/Spinner/Spinner.tsx
      exists: true
    - name: AlertBanner
      path: klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
      exists: true
error_messages:
  - scenario: "Rate limited (resend)"
    message: "Please wait before requesting another email"
  - scenario: "Network error"
    message: "Connection failed. Please check your internet and try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Auto-redirect countdown must be announced with aria-live='polite'"
    - "Verification success state must be announced immediately"
    - "Animated mail envelope must have role='img' with appropriate aria-label"
    - "Change email modal must trap focus appropriately"
---

# Screen 4: Email Verification

## Purpose
Confirm the user's email address after registration to activate their account.

## User Story
"As a newly registered user, I want to verify my email quickly so my account is secured and I can proceed with onboarding."

---

## Web Implementation

### Layout Structure
Centered card layout, maximum width 480px.

### Waiting State (Before Verification)

**Visual:** Display an animated mail envelope icon with subtle sparkle effects—a looping animation that suggests waiting for something to happen.

**Content:**
- "Verify your email" as H1
- Explanatory text: "We've sent a verification link to john@example.com. Please check your inbox and click the link to activate your account."

**Actions:**
- "Open Email App" primary button (attempts to detect and open the user's email provider)
- "Resend verification email" text link (same cooldown behavior as Forgot Password)
- "Use a different email" text link (opens a modal to change email, requires re-sending verification)

### Verified State (After Clicking Link)

The user clicks the verification link in their email, which opens the app or a web page that calls the verification API. On success:

**Visual:** Display an animated checkmark icon with a success animation.

**Content:**
- "Email verified!" as H1 in Success Green color
- "Your account is now active. Let's get you started."

**Actions:**
- "Get Started" primary button → navigates to Onboarding (Screen 5)
- Auto-redirect countdown: "Redirecting in 3..." that counts down from 5 and automatically navigates. The user can skip by clicking the button.

### Behaviors

**Open Email App:** Attempt to detect the user's email provider based on their email domain. For common providers (Gmail, Outlook, Yahoo), deep link directly to the inbox. For others, fall back to a mailto: link or show a generic "Open your email app" message.

**Different Email:** Opens a modal with an email input. Submitting changes the registered email and restarts the verification flow.

---

## Mobile Implementation

### Layout Structure
Full-screen with content vertically centered.

### Header
Display the Klard logo small in the header area. No back button—the user must complete verification or go back via "Use a different email."

### Waiting State

**Visual:** Animated mail envelope (80px) centered, with a gentle floating/pulsing animation.

**Content:**
- "Verify your email" as H1
- "We've sent a verification link to:" followed by the email address on its own line, highlighted
- "Check your inbox and tap the link to continue."

**Actions:**
- "Open Email App" primary button at bottom, pinned above safe area
- "Resend" text link with cooldown
- "Use different email" text link

**Detection of Verification:**
On mobile, implement deep link handling so that when the user taps the verification link in their email, the app opens and automatically verifies. Use polling (every 3 seconds) as a fallback if the user verifies in a separate browser—the screen should automatically update when verification is detected.

### Verified State

**Animation:**
1. Confetti or sparkle burst animation (brief, celebratory)
2. Success haptic feedback
3. Checkmark icon animates in

**Content:**
- "You're verified!" as H1
- "Welcome to Klard. Let's set up your account."

**Action:**
- "Continue" primary button → navigates to Welcome screen (Screen 5)

### Platform-Specific

**iOS:**
- Universal Links configured so email verification link opens directly in app
- Use SFSafariViewController as fallback for opening email

**Android:**
- App Links configured for verification URL
- Chrome Custom Tabs for email provider fallback
