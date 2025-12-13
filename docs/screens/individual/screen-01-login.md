---
screen: 1
name: Login
batch: 1
status: not_started
purpose: "Authenticate returning users securely and efficiently while building trust through privacy messaging."
user_story: "As a returning user, I want to sign in quickly using my email/password or social accounts so I can access my subscription dashboard without friction."
components:
  web:
    - name: Button
      path: klard-web/src/components/ui/button/button.tsx
      exists: true
    - name: Input
      path: klard-web/src/components/ui/input.tsx
      exists: true
    - name: PasswordInput
      path: klard-web/src/components/ui/password-input.tsx
      exists: true
    - name: Checkbox
      path: klard-web/src/components/ui/checkbox.tsx
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
    - name: PasswordInput
      path: klard-mobile/src/components/ui/PasswordInput/PasswordInput.tsx
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
  - scenario: "Invalid credentials"
    message: "Invalid email or password. Please try again."
  - scenario: "Network error"
    message: "Connection failed. Please check your internet and try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Password visibility toggle must announce state change ('Password shown'/'Password hidden')"
    - "Biometric prompt must have keyboard-accessible fallback"
    - "Social login buttons must have descriptive accessible names (e.g., 'Sign in with Google')"
    - "Authentication error banner must be announced with role='alert'"
---

# Screen 1: Login

## Purpose
Authenticate returning users securely and efficiently while building trust through privacy messaging.

## User Story
"As a returning user, I want to sign in quickly using my email/password or social accounts so I can access my subscription dashboard without friction."

---

## Web Implementation

### Layout Structure
Use a split-screen layout where the left half (50%) contains branding and the right half (50%) contains the login form. On tablet, adjust to a 40/60 ratio.

### Left Panel (Branding)
Display an abstract geometric illustration featuring overlapping shield and card shapes in teal tones that communicate financial protection. Below the illustration, show the tagline "Track. Detect. Protect." in Body Large size using the Text Secondary color. Add a supporting line: "Subscription management that respects your privacy."

The background should use a subtle gradient from pure white (#FFFFFF) to slate-50 (#F8FAFC).

### Right Panel (Form)
Center the content vertically with a maximum width of 400px and horizontal padding of 48px.

**Header Section:** Display the Klard logo at top. Below it, add a heading "Welcome back" using H1 styling, followed by "Sign in to your account" in Body size with Text Secondary color.

**Form Fields:**
1. **Email Input:** Full-width input field with a mail icon prefix. Use email keyboard type. Validate that the value is a properly formatted email address. Display validation errors inline below the field in Caption size with Error color.

2. **Password Input:** Full-width input field with a lock icon prefix. Include an eye/eye-off toggle button as a suffix to show/hide the password. Require a minimum of 8 characters.

**Form Options Row:** Place a "Remember me" checkbox on the left (persists session for 30 days when checked) and a "Forgot password?" text link on the right that navigates to Screen 3.

**Primary Action:** A full-width button labeled "Sign In" using primary/teal styling. On hover, apply a subtle teal glow effect. During form submission, replace the label with a spinner and disable all form inputs.

**Social Login Section:** Display a divider with the text "or continue with" centered. Below it, place two outline-style buttons side by side: "Continue with Google" (with Google icon) and "Continue with Apple" (with Apple icon in dark).

**Footer:** Display "Don't have an account? Sign up" with "Sign up" as a link to Screen 2. Below that, add a trust element in Caption size: "🔒 Privacy-first. No bank access required."

### States and Behaviors

**Loading State:** When the user clicks Sign In, show a spinner in the button, disable all form fields, and prevent duplicate submissions.

**Field Validation Errors:** Display inline below each field. Use a red border on the erroring field and show the error message in Caption size with Error color (#DC2626).

**Authentication Error:** If login fails, display an error banner above the form with a red background: "Invalid email or password. Please try again."

**Success:** On successful authentication, redirect to the Dashboard (Screen 10) if the user has completed onboarding, or to the Welcome screen (Screen 5) if this is their first login.

---

## Mobile Implementation

### Layout Structure
Use a single-column scrollable layout. The form should be vertically centered when the keyboard is not visible.

### Header
Display a compact version of the geometric illustration (approximately 120px height) centered at the top. If the user arrived from a landing page, show a back arrow in the top-left corner. Place the Klard logo in the top-right.

### Form Content
Display "Welcome back" as H1 centered, followed by "Sign in to your account" in Body size centered.

Render the same email and password fields as the web version, but with full-width styling appropriate for mobile. Remove the "Remember me" checkbox—on mobile, rely on biometric unlock instead.

Center the "Forgot password?" link below the password field.

Place the "Sign In" button full-width below the form. When the keyboard is visible, ensure the button remains accessible by scrolling the form content appropriately.

Include the social login buttons and the "Don't have an account?" link below the primary button.

### Platform-Specific Behaviors

**iOS:**
- If the user has previously logged in and enabled biometrics, prompt for Face ID or Touch ID before showing the form. Display a "Use password instead" option.
- Use the native Apple Sign In button styling (`ASAuthorizationAppleIDButton`).
- Apply light haptic feedback when a field passes validation.
- Set the email field to use the email keyboard type and the password field to use secure text entry.

**Android:**
- Integrate with Google One Tap UI for returning users when available.
- Support Credential Manager for autofilling saved passwords.
- In dark mode, respect Material You dynamic theming.

**Keyboard Handling:** When the keyboard appears, scroll the form up so the active field is visible and the Sign In button remains above the keyboard.

**Error Handling:**
- Display inline errors below each field immediately on blur if validation fails.
- For network errors, show a bottom sheet with "Connection failed" and a "Retry" button.
- For authentication failures, briefly shake the form and display an error banner at the top.

**Loading Feedback:** During authentication, show a circular progress indicator in the button and apply a subtle haptic pulse when authentication completes.