---
screen: 2
name: Sign Up
batch: 1
status: not_started
purpose: "Convert new visitors into registered users with minimal friction while collecting necessary information and ensuring password security."
user_story: "As a new user, I want to create an account quickly so I can start tracking my subscriptions without a complicated process."
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
    - name: ProgressBar
      path: klard-web/src/components/ui/progress-bar.tsx
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
    - name: CheckboxField
      path: klard-mobile/src/components/ui/CheckboxField/CheckboxField.tsx
      exists: true
    - name: ProgressBar
      path: klard-mobile/src/components/ui/ProgressBar/ProgressBar.tsx
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
  - scenario: "Email already registered"
    message: "This email is already registered. Sign in instead?"
  - scenario: "Password too short"
    message: "Password must be at least 8 characters"
  - scenario: "Passwords don't match"
    message: "Passwords don't match"
  - scenario: "Terms not accepted"
    message: "You must accept the Terms of Service to continue"
  - scenario: "Network error"
    message: "Connection failed. Please check your internet and try again."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - "Password strength indicator must be announced to screen readers (use aria-live='polite')"
    - "Password requirements checklist updates must use aria-live='polite' for real-time announcements"
    - "Terms checkbox label must include full link text for screen readers"
    - "Password visibility toggle must announce state change"
---

# Screen 2: Sign Up

## Purpose
Convert new visitors into registered users with minimal friction while collecting necessary information and ensuring password security.

## User Story
"As a new user, I want to create an account quickly so I can start tracking my subscriptions without a complicated process."

---

## Web Implementation

### Layout Structure
Mirror the Login screen's split-screen layout with branding on the left and the form on the right.

### Left Panel
Use the same branding panel as Login: geometric illustration with shields/cards, tagline, and privacy messaging.

### Right Panel (Form)

**Header:** Display the Klard logo, followed by "Create your account" as H1, and "Start protecting your subscriptions today" in Body size with Text Secondary color.

**Form Fields:**

1. **Full Name:** Text input with a user icon prefix. Required field, minimum 2 characters. Use a single field—splitting into first/last name happens on the backend if needed.

2. **Email:** Email input with a mail icon prefix. Required field, must be valid email format. On blur, trigger an async check to verify the email isn't already registered. If it is, display: "This email is already registered. Sign in instead?" with "Sign in" as a link.

3. **Password:** Password input with a lock icon prefix and show/hide toggle. Required field with strength requirements.

4. **Confirm Password:** Password input with a lock icon prefix. Must exactly match the password field. Validate on blur.

5. **Terms Checkbox:** Required checkbox with label: "I agree to the Terms of Service and Privacy Policy" where both "Terms of Service" and "Privacy Policy" are links that open their respective documents in a modal overlay.

**Password Strength Indicator:**
Below the password field, display a three-segment progress bar that fills based on password strength:
- Weak (1 segment, red #DC2626): Fewer than 3 requirements met
- Medium (2 segments, amber #D97706): 3-4 requirements met
- Strong (3 segments, green #059669): All 5 requirements met

**Password Requirements Checklist:**
Display a checklist showing the following requirements with checkmarks (✓) or X marks based on current input:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character (!@#$%^&*)

Update this checklist in real-time as the user types.

**Primary Action:** "Create Account" button, full-width, primary styling. Disabled until all required fields are valid and terms are checked.

**Social Sign Up:** Same divider and buttons as Login, but with text "or sign up with".

**Footer:** "Already have an account? Sign in" with link to Screen 1.

### States and Behaviors

**Email Already Exists:** Display error below email field with link to Login.

**Passwords Don't Match:** Display error below confirm password field: "Passwords don't match."

**Terms Not Checked:** When the user attempts to submit without checking terms, apply an error ring highlight to the checkbox.

**Loading:** Show spinner in button, disable all fields.

**Success:** Navigate to Email Verification (Screen 4).

---

## Mobile Implementation

### Layout Structure
Single-column scrollable form. No illustration at top—maximize space for form fields.

### Header
Display a back button in the top-left corner. Show "Create your account" as H1.

### Form Content
Render all five form fields (name, email, password, confirm password, terms) in a scrollable container. Space fields appropriately for thumb-friendly tap targets (minimum 44pt height for inputs).

**Password Requirements (Mobile):** Collapse the requirements checklist into a single line summary initially, such as "8+ chars, number, special". Expand to show the full checklist when the password field receives focus.

### Keyboard Navigation
Configure the keyboard with a "Next" button that advances focus through fields in order. The final field (Confirm Password) should show a "Done" button that dismisses the keyboard.

**Email Validation:** Debounce the availability check by 500ms to avoid excessive API calls while typing.

**Terms Links:** Open Terms of Service and Privacy Policy in an in-app browser sheet rather than leaving the app.

**Social Sign Up:** Use the same native OAuth flows as Login (Google Sign-In, Sign in with Apple).

### Platform-Specific Behaviors

**iOS:**
- Enable Password AutoFill by setting appropriate `textContentType` values.
- When all password requirements are met, trigger success haptic feedback.
- Offer the system's automatic strong password suggestion from Keychain.

**Android:**
- Integrate with Credential Manager for saving the new password.
- Use Material icons for the password visibility toggle.
- After successful registration, prompt the user to enable biometric unlock for future sessions.

### Success Animation
1. Display a checkmark animation for 300ms
2. Trigger success haptic feedback
3. Navigate to Email Verification screen
