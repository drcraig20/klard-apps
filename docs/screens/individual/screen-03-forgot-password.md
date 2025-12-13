---
screen: 3
name: Forgot Password
batch: 1
status: not_started
purpose: "Provide a secure, user-friendly way for users to recover access to their account."
user_story: "As a user who forgot my password, I want to reset it via email so I can regain access to my account without calling support."
components:
  web:
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
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
    - name: InputField
      path: klard-mobile/src/components/ui/InputField/InputField.tsx
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
  - scenario: "Invalid email format"
    message: "Please enter a valid email address"
  - scenario: "Rate limited (resend)"
    message: "Please wait before requesting another email"
  - scenario: "Network error"
    message: "Connection failed. Please check your internet and try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Countdown timer for resend must be announced with aria-live='polite'"
    - "Success state transition must be announced ('Check your email' heading)"
    - "Resend confirmation must be announced with aria-live='assertive'"
    - "Back to login link must be clearly labeled for screen readers"
---

# Screen 3: Forgot Password

## Purpose
Provide a secure, user-friendly way for users to recover access to their account.

## User Story
"As a user who forgot my password, I want to reset it via email so I can regain access to my account without calling support."

---

## Web Implementation

### Layout Structure
Use a centered card layout (no split-screen). Maximum width of 480px, vertically centered in the viewport.

### Initial State

**Header:** A back link "← Back to login" in the top-left of the card.

**Content:** Display a mail icon (48px, teal color) centered. Below it, "Reset your password" as H1 centered. Add explanatory text: "Enter your email address and we'll send you a link to reset your password."

**Form:** Single email input field with mail icon prefix, followed by a full-width "Send Reset Link" primary button.

### Success State (After Submission)

Replace the form content with a success message:

**Content:** Display a checkmark-circle icon (48px, success green) centered. Below it, "Check your email" as H1. Add text: "We've sent a password reset link to john@example.com" (showing the actual submitted email). Include instructions: "Click the link in the email to create a new password."

**Actions:**
- "Didn't receive it? Resend" as a text link (with cooldown behavior)
- "Back to Login" as a secondary button

### States and Behaviors

**Loading:** Show spinner in button during API call.

**Invalid Email Format:** Display error below field: "Please enter a valid email address."

**Email Not Found:** For security, show the same success screen regardless of whether the email exists in the system. Never reveal whether an email is registered.

**Resend Cooldown:** When the user clicks "Resend", change the link text to "Sent!" for 2 seconds, then disable with a 60-second countdown: "Resend in 58s..."

---

## Mobile Implementation

### Layout Structure
Full-screen layout with content centered vertically.

### Header
Display a back button in the top-left that returns to Login.

### Content
Show a larger mail icon (56px) centered. Display the same heading and explanatory text as web, centered.

### Form
Full-width email input with email keyboard type. Place the "Send Reset Link" button at the bottom of the screen, pinned above the safe area. When the keyboard appears, the button should remain visible above it.

### Success State
Transition to a full-screen success view with animation:
1. The checkmark icon scales in with a bounce effect (400ms duration)
2. Trigger light haptic feedback
3. Display the user's email with a subtle highlight

**Resend Behavior:** Show a visible countdown timer: "Resend in 58s". Trigger haptic feedback when the user taps resend. Display a toast confirmation: "Reset link sent".

### Deep Link Handling
When the user taps the reset link in their email, the app should open directly to a "Set New Password" screen (not specified in this batch, but the routing should be configured).
