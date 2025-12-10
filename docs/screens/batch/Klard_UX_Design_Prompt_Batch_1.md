# Klard UX Design Prompt
## Complete Screen-by-Screen Design Specification
### Batch 1: Screens 1-5 (Authentication + Welcome)

---

# Document Overview

## Purpose

This document provides comprehensive UX design specifications for **Klard**, a privacy-first subscription management platform. Each screen includes parallel specifications for Web and Mobile platforms with clear implementation guidance.

**Product:** Klard  
**Tagline:** "Track. Detect. Protect."  
**Tech Stack:** Next.js 16 (Web), React Native + Expo SDK 54 (Mobile), Spring Boot (Backend)

---

## Screen Inventory Summary

| Batch | Screens | Description |
|-------|---------|-------------|
| **Batch 1** | 1-5 | Authentication (Login, Sign Up, Forgot Password, Email Verification) + Welcome |
| Batch 2 | 6-10 | Plan Selection, Import Hub, Add First Subscription, BurnerCard Tutorial, Main Dashboard |
| Batch 3 | 11-17 | Subscription Management + Email Sync |
| Batch 4 | 18-23 | BurnerCard System |
| Batch 5 | 24-29 | Alerts + Analytics |
| Batch 6 | 30-34 | Discovery + Account + Empty States |
| Batch 7 | 35-55 | Phase 2 Features |

---

## Global Navigation

### Web Navigation

On desktop screens (1024px and wider), display a persistent left sidebar that is 240px wide. The sidebar should be collapsible to a 72px icon-only mode. Place a top bar containing a global search input, notifications bell icon with badge, and a profile avatar that opens a dropdown menu.

The sidebar should contain these navigation items in order: Dashboard (home icon), Subscriptions (list icon), Calendar (calendar icon), BurnerCards (credit card icon), Alerts (bell icon with unread count badge), Analytics (bar chart icon), and Settings (gear icon). The active item should have a teal background highlight.

On tablet screens (768px–1023px), collapse the sidebar by default to icon-only mode. Provide a hamburger menu in the top bar that expands the sidebar as an overlay.

### Mobile Navigation

Use a bottom tab bar with exactly 5 items. From left to right: Home (house icon leading to Dashboard), Subscriptions (layers icon leading to Subscription List), a prominent center Add button (plus icon in a circular teal button that floats 8px above the tab bar), Cards (credit card icon leading to BurnerCard Overview), and Alerts (bell icon with badge leading to Alerts Center).

When the user taps the center Add button, present a bottom action sheet with three options: "Add Subscription" (manual entry), "Sync from Email" (launches email connection), and "Create BurnerCard" (available only for Saver+ subscribers, otherwise show upgrade prompt).

Place a profile avatar in the top-right of the header. Tapping it opens a menu with access to Settings, Analytics, Calendar, Help & FAQ, and Logout.

---

## Theme Configuration

Default to following the system's light/dark mode preference. Provide a manual override in Settings with three options: System (follows OS), Light (always light), and Dark (always dark).

---

## Responsive Breakpoints

| Breakpoint | Width Range | Behavior |
|------------|-------------|----------|
| Desktop XL | 1440px+ | Full layout with 4-column grids where applicable |
| Desktop | 1024px–1439px | Full sidebar visible, 3-column grids |
| Tablet | 768px–1023px | Sidebar collapsed by default, 2-column grids |
| Mobile | 375px–767px | Bottom tab navigation, single-column layout |

---

# Screen Specifications

---

## Screen 1: Login

### Purpose
Authenticate returning users securely and efficiently while building trust through privacy messaging.

### User Story
"As a returning user, I want to sign in quickly using my email/password or social accounts so I can access my subscription dashboard without friction."

---

### Web Implementation

#### Layout Structure
Use a split-screen layout where the left half (50%) contains branding and the right half (50%) contains the login form. On tablet, adjust to a 40/60 ratio.

#### Left Panel (Branding)
Display an abstract geometric illustration featuring overlapping shield and card shapes in teal tones that communicate financial protection. Below the illustration, show the tagline "Track. Detect. Protect." in Body Large size using the Text Secondary color. Add a supporting line: "Subscription management that respects your privacy."

The background should use a subtle gradient from pure white (#FFFFFF) to slate-50 (#F8FAFC).

#### Right Panel (Form)
Center the content vertically with a maximum width of 400px and horizontal padding of 48px.

**Header Section:** Display the Klard logo at top. Below it, add a heading "Welcome back" using H1 styling, followed by "Sign in to your account" in Body size with Text Secondary color.

**Form Fields:**
1. **Email Input:** Full-width input field with a mail icon prefix. Use email keyboard type. Validate that the value is a properly formatted email address. Display validation errors inline below the field in Caption size with Error color.

2. **Password Input:** Full-width input field with a lock icon prefix. Include an eye/eye-off toggle button as a suffix to show/hide the password. Require a minimum of 8 characters.

**Form Options Row:** Place a "Remember me" checkbox on the left (persists session for 30 days when checked) and a "Forgot password?" text link on the right that navigates to Screen 3.

**Primary Action:** A full-width button labeled "Sign In" using primary/teal styling. On hover, apply a subtle teal glow effect. During form submission, replace the label with a spinner and disable all form inputs.

**Social Login Section:** Display a divider with the text "or continue with" centered. Below it, place two outline-style buttons side by side: "Continue with Google" (with Google icon) and "Continue with Apple" (with Apple icon in dark).

**Footer:** Display "Don't have an account? Sign up" with "Sign up" as a link to Screen 2. Below that, add a trust element in Caption size: "🔒 Privacy-first. No bank access required."

#### States and Behaviors

**Loading State:** When the user clicks Sign In, show a spinner in the button, disable all form fields, and prevent duplicate submissions.

**Field Validation Errors:** Display inline below each field. Use a red border on the erroring field and show the error message in Caption size with Error color (#DC2626).

**Authentication Error:** If login fails, display an error banner above the form with a red background: "Invalid email or password. Please try again."

**Success:** On successful authentication, redirect to the Dashboard (Screen 10) if the user has completed onboarding, or to the Welcome screen (Screen 5) if this is their first login.

---

### Mobile Implementation

#### Layout Structure
Use a single-column scrollable layout. The form should be vertically centered when the keyboard is not visible.

#### Header
Display a compact version of the geometric illustration (approximately 120px height) centered at the top. If the user arrived from a landing page, show a back arrow in the top-left corner. Place the Klard logo in the top-right.

#### Form Content
Display "Welcome back" as H1 centered, followed by "Sign in to your account" in Body size centered.

Render the same email and password fields as the web version, but with full-width styling appropriate for mobile. Remove the "Remember me" checkbox—on mobile, rely on biometric unlock instead.

Center the "Forgot password?" link below the password field.

Place the "Sign In" button full-width below the form. When the keyboard is visible, ensure the button remains accessible by scrolling the form content appropriately.

Include the social login buttons and the "Don't have an account?" link below the primary button.

#### Platform-Specific Behaviors

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

---

## Screen 2: Sign Up

### Purpose
Convert new visitors into registered users with minimal friction while collecting necessary information and ensuring password security.

### User Story
"As a new user, I want to create an account quickly so I can start tracking my subscriptions without a complicated process."

---

### Web Implementation

#### Layout Structure
Mirror the Login screen's split-screen layout with branding on the left and the form on the right.

#### Left Panel
Use the same branding panel as Login: geometric illustration with shields/cards, tagline, and privacy messaging.

#### Right Panel (Form)

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

#### States and Behaviors

**Email Already Exists:** Display error below email field with link to Login.

**Passwords Don't Match:** Display error below confirm password field: "Passwords don't match."

**Terms Not Checked:** When the user attempts to submit without checking terms, apply an error ring highlight to the checkbox.

**Loading:** Show spinner in button, disable all fields.

**Success:** Navigate to Email Verification (Screen 4).

---

### Mobile Implementation

#### Layout Structure
Single-column scrollable form. No illustration at top—maximize space for form fields.

#### Header
Display a back button in the top-left corner. Show "Create your account" as H1.

#### Form Content
Render all five form fields (name, email, password, confirm password, terms) in a scrollable container. Space fields appropriately for thumb-friendly tap targets (minimum 44pt height for inputs).

**Password Requirements (Mobile):** Collapse the requirements checklist into a single line summary initially, such as "8+ chars, number, special". Expand to show the full checklist when the password field receives focus.

#### Keyboard Navigation
Configure the keyboard with a "Next" button that advances focus through fields in order. The final field (Confirm Password) should show a "Done" button that dismisses the keyboard.

**Email Validation:** Debounce the availability check by 500ms to avoid excessive API calls while typing.

**Terms Links:** Open Terms of Service and Privacy Policy in an in-app browser sheet rather than leaving the app.

**Social Sign Up:** Use the same native OAuth flows as Login (Google Sign-In, Sign in with Apple).

#### Platform-Specific Behaviors

**iOS:**
- Enable Password AutoFill by setting appropriate `textContentType` values.
- When all password requirements are met, trigger success haptic feedback.
- Offer the system's automatic strong password suggestion from Keychain.

**Android:**
- Integrate with Credential Manager for saving the new password.
- Use Material icons for the password visibility toggle.
- After successful registration, prompt the user to enable biometric unlock for future sessions.

#### Success Animation
1. Display a checkmark animation for 300ms
2. Trigger success haptic feedback
3. Navigate to Email Verification screen

---

## Screen 3: Forgot Password

### Purpose
Provide a secure, user-friendly way for users to recover access to their account.

### User Story
"As a user who forgot my password, I want to reset it via email so I can regain access to my account without calling support."

---

### Web Implementation

#### Layout Structure
Use a centered card layout (no split-screen). Maximum width of 480px, vertically centered in the viewport.

#### Initial State

**Header:** A back link "← Back to login" in the top-left of the card.

**Content:** Display a mail icon (48px, teal color) centered. Below it, "Reset your password" as H1 centered. Add explanatory text: "Enter your email address and we'll send you a link to reset your password."

**Form:** Single email input field with mail icon prefix, followed by a full-width "Send Reset Link" primary button.

#### Success State (After Submission)

Replace the form content with a success message:

**Content:** Display a checkmark-circle icon (48px, success green) centered. Below it, "Check your email" as H1. Add text: "We've sent a password reset link to john@example.com" (showing the actual submitted email). Include instructions: "Click the link in the email to create a new password."

**Actions:** 
- "Didn't receive it? Resend" as a text link (with cooldown behavior)
- "Back to Login" as a secondary button

#### States and Behaviors

**Loading:** Show spinner in button during API call.

**Invalid Email Format:** Display error below field: "Please enter a valid email address."

**Email Not Found:** For security, show the same success screen regardless of whether the email exists in the system. Never reveal whether an email is registered.

**Resend Cooldown:** When the user clicks "Resend", change the link text to "Sent!" for 2 seconds, then disable with a 60-second countdown: "Resend in 58s..."

---

### Mobile Implementation

#### Layout Structure
Full-screen layout with content centered vertically.

#### Header
Display a back button in the top-left that returns to Login.

#### Content
Show a larger mail icon (56px) centered. Display the same heading and explanatory text as web, centered.

#### Form
Full-width email input with email keyboard type. Place the "Send Reset Link" button at the bottom of the screen, pinned above the safe area. When the keyboard appears, the button should remain visible above it.

#### Success State
Transition to a full-screen success view with animation:
1. The checkmark icon scales in with a bounce effect (400ms duration)
2. Trigger light haptic feedback
3. Display the user's email with a subtle highlight

**Resend Behavior:** Show a visible countdown timer: "Resend in 58s". Trigger haptic feedback when the user taps resend. Display a toast confirmation: "Reset link sent".

#### Deep Link Handling
When the user taps the reset link in their email, the app should open directly to a "Set New Password" screen (not specified in this batch, but the routing should be configured).

---

## Screen 4: Email Verification

### Purpose
Confirm the user's email address after registration to activate their account.

### User Story
"As a newly registered user, I want to verify my email quickly so my account is secured and I can proceed with onboarding."

---

### Web Implementation

#### Layout Structure
Centered card layout, maximum width 480px.

#### Waiting State (Before Verification)

**Visual:** Display an animated mail envelope icon with subtle sparkle effects—a looping animation that suggests waiting for something to happen.

**Content:**
- "Verify your email" as H1
- Explanatory text: "We've sent a verification link to john@example.com. Please check your inbox and click the link to activate your account."

**Actions:**
- "Open Email App" primary button (attempts to detect and open the user's email provider)
- "Resend verification email" text link (same cooldown behavior as Forgot Password)
- "Use a different email" text link (opens a modal to change email, requires re-sending verification)

#### Verified State (After Clicking Link)

The user clicks the verification link in their email, which opens the app or a web page that calls the verification API. On success:

**Visual:** Display an animated checkmark icon with a success animation.

**Content:**
- "Email verified!" as H1 in Success Green color
- "Your account is now active. Let's get you started."

**Actions:**
- "Get Started" primary button → navigates to Onboarding (Screen 5)
- Auto-redirect countdown: "Redirecting in 3..." that counts down from 5 and automatically navigates. The user can skip by clicking the button.

#### Behaviors

**Open Email App:** Attempt to detect the user's email provider based on their email domain. For common providers (Gmail, Outlook, Yahoo), deep link directly to the inbox. For others, fall back to a mailto: link or show a generic "Open your email app" message.

**Different Email:** Opens a modal with an email input. Submitting changes the registered email and restarts the verification flow.

---

### Mobile Implementation

#### Layout Structure
Full-screen with content vertically centered.

#### Header
Display the Klard logo small in the header area. No back button—the user must complete verification or go back via "Use a different email."

#### Waiting State

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

#### Verified State

**Animation:**
1. Confetti or sparkle burst animation (brief, celebratory)
2. Success haptic feedback
3. Checkmark icon animates in

**Content:**
- "You're verified!" as H1
- "Welcome to Klard. Let's set up your account."

**Action:**
- "Continue" primary button → navigates to Welcome screen (Screen 5)

#### Platform-Specific

**iOS:**
- Universal Links configured so email verification link opens directly in app
- Use SFSafariViewController as fallback for opening email

**Android:**
- App Links configured for verification URL
- Chrome Custom Tabs for email provider fallback

---

## Screen 5: Welcome

### Purpose
Orient newly verified users and set expectations for the onboarding flow ahead.

### User Story
"As a newly verified user, I want to understand what Klard offers and what steps are coming so I feel confident proceeding with setup."

---

### Web Implementation

#### Layout Structure
Full-screen layout with centered content, no navigation shell visible. Maximum content width of 800px.

#### Content Structure

**Hero Section:**
- Large illustration showing a person relaxing while their subscriptions are organized (abstract, friendly style)
- "Welcome to Klard, [First Name]!" as H1
- Subtitle: "Let's get you set up in just a few minutes." in Body Large size

**Value Propositions:**
Display three key benefits in a horizontal row (or stacked on smaller screens):

1. **Track Everything**
   - Icon: Layers/stack icon
   - "Import your subscriptions automatically or add them manually."

2. **Stop Surprise Charges**
   - Icon: Shield icon
   - "Get alerts before renewals and block unwanted charges."

3. **Save Money**
   - Icon: Piggy bank icon
   - "Discover savings with analytics and cheaper alternatives."

**Onboarding Steps Preview:**
Show a horizontal progress indicator with 4 steps, all currently uncompleted:
1. Choose your plan
2. Import subscriptions
3. Set up alerts
4. Explore BurnerCards

Currently on step 0 (not started). This gives users visibility into what's ahead.

**Actions:**
- "Get Started" primary button (large, prominent) → navigates to Plan Selection (Screen 6)
- "Skip setup for now" text link → takes user to Dashboard with minimal configuration

**Footer:**
"This typically takes about 3-5 minutes."

---

### Mobile Implementation

#### Layout Structure
Full-screen, scrollable content with illustrations that don't overwhelm the viewport.

#### Header
Show the Klard logo centered in the header. No back button or close—forward momentum only.

#### Content

**Hero:**
- Scaled-down version of the welcome illustration (approximately 200px height)
- "Welcome, [First Name]!" as H1
- "Let's set up your account." in Body size

**Value Propositions:**
Display the three benefits as vertically stacked cards with icons on the left:
- Each card: icon (40px) | title + description
- Cards are tappable to reveal more detail (optional enhancement)

**Progress Indicator:**
Simplified horizontal stepper showing dots for 4 steps, with none filled in yet. Don't show step labels on mobile—just the visual progress.

**Actions:**
- "Get Started" primary button pinned to bottom above safe area
- "Skip for now" text link above the button

#### Animations and Polish

**Entry Animation:**
When the screen loads, stagger the appearance of elements:
1. Illustration fades in (0-200ms)
2. Welcome text slides up (100-300ms)
3. Benefit cards slide in from right, staggered (200-500ms)
4. Button fades in last (400-600ms)

**Haptic Feedback:**
Light haptic when user taps "Get Started."

#### Personalization
If the user's first name is available from registration, use it: "Welcome, Sarah!" Otherwise, fall back to: "Welcome to Klard!"

---

# Component Reference Summary

The following components from the Klard Component Specifications are used in Batch 1 screens:

| Screen | Components Used |
|--------|-----------------|
| Screen 1: Login | Button, Input, PasswordInput, Checkbox, Card, Spinner, Alert |
| Screen 2: Sign Up | Button, Input, PasswordInput, Checkbox, ProgressBar, Card, Spinner, Alert |
| Screen 3: Forgot Password | Button, Input, Card, Spinner, Alert |
| Screen 4: Email Verification | Button, Card, Spinner, Alert |
| Screen 5: Welcome | Button, Card, Stepper/ProgressIndicator |

---

# Accessibility Requirements

All screens in this batch must meet the following accessibility standards:

**Keyboard Navigation (Web):**
- All interactive elements must be focusable and operable via keyboard
- Tab order must follow logical reading order
- Focus states must be clearly visible

**Screen Reader Support:**
- All form fields must have associated labels
- Error messages must be announced when they appear
- Button states (loading, disabled) must be communicated
- Decorative images must have empty alt text; meaningful images must have descriptive alt text

**Touch Targets (Mobile):**
- All interactive elements must have a minimum touch target of 44x44 points
- Adequate spacing between adjacent touch targets

**Color and Contrast:**
- Text must meet WCAG AA contrast requirements (4.5:1 for body text, 3:1 for large text)
- Error states must not rely solely on color—include icons or text

**Motion:**
- Respect user's reduced motion preferences
- Provide alternative static states for animations

---

# Error Message Reference

| Scenario | Message |
|----------|---------|
| Invalid email format | "Please enter a valid email address" |
| Email already registered | "This email is already registered. Sign in instead?" |
| Password too short | "Password must be at least 8 characters" |
| Passwords don't match | "Passwords don't match" |
| Invalid credentials | "Invalid email or password. Please try again." |
| Network error | "Connection failed. Please check your internet and try again." |
| Rate limited (resend) | "Please wait before requesting another email" |
| Terms not accepted | "You must accept the Terms of Service to continue" |

---

# End of Batch 1

Continue to Batch 2 for Screens 6-10: Plan Selection, Import Hub, Add First Subscription, BurnerCard Tutorial, and Main Dashboard.
