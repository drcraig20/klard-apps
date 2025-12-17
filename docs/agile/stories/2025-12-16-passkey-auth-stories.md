# Login Enhancements (Passkey/WebAuthn) - User Stories

> **PRD:** [`docs/agile/prds/2025-12-16-passkey-auth-prd.md`](../prds/2025-12-16-passkey-auth-prd.md)
> **Architecture:** [`docs/agile/architecture/2025-12-16-passkey-auth-arch.md`](../architecture/2025-12-16-passkey-auth-arch.md)
> **Status:** Approved
> **Date:** 2025-12-16

---

## Story Map

```
Epic: Login Enhancements (Passkey/WebAuthn Authentication)
│
├── Epic 1: Passkey Authentication
│   ├── US-001: Configure backend passkey plugin
│   ├── US-002: Configure mobile auth client with passkey support
│   ├── US-003: Configure web auth client with passkey support
│   ├── US-004: Mobile passkey registration
│   ├── US-005: Web passkey registration
│   ├── US-006: Mobile passkey sign-in
│   └── US-007: Web passkey sign-in with Conditional UI
│
├── Epic 2: Error Handling & UX Feedback
│   ├── US-008: Form shake animation on auth failure
│   ├── US-009: Haptic feedback on successful login (mobile)
│   └── US-010: Network error bottom sheet (mobile)
│
└── Epic 3: Infrastructure
    ├── US-011: Deploy domain verification files
    ├── US-012: Configure iOS Face ID permission
    └── US-013: Configure passkey environment variables
```

---

## Epic 1: Passkey Authentication

### US-001: Configure Backend Passkey Plugin

**Story:** As a **developer**, I want the klard-auth server to support passkey operations so that users can register and authenticate with WebAuthn credentials.

**Priority:** P0 | **Size:** M (3-4h)

**Acceptance Criteria:**
- [ ] `@better-auth/passkey` plugin is installed and configured in `klard-auth/src/lib/auth.ts`
- [ ] Passkey endpoints are available (`/api/auth/passkey/*`)
- [ ] Database migration creates `passkey` table with required columns
- [ ] Rate limiting is applied to passkey endpoints (10 requests/60s)
- [ ] Existing auth flows continue to work without regression

**Files:** `klard-auth/src/lib/auth.ts`, `klard-auth/package.json`

**Ticket:** | **Status:** `todo`

---

### US-002: Configure Mobile Auth Client with Passkey Support

**Story:** As a **mobile user**, I want the app to support passkey authentication so that I can register and sign in with biometrics.

**Priority:** P0 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] `passkeyClient()` is configured alongside `expoClient()` in auth-client
- [ ] `authClient.passkey.*` methods are accessible
- [ ] `expo-local-authentication` is installed for biometric detection
- [ ] Cookie prefix matches server configuration

**Files:** `klard-mobile/src/lib/auth-client.ts`, `klard-mobile/package.json`

**Dependencies:** US-001

**Ticket:** | **Status:** `todo`

---

### US-003: Configure Web Auth Client with Passkey Support

**Story:** As a **web user**, I want the website to support passkey authentication so that I can register and sign in with platform authenticators.

**Priority:** P0 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] `passkeyClient()` is configured in web auth-client
- [ ] `authClient.passkey.*` and `authClient.signIn.passkey()` methods are accessible

**Files:** `klard-web/src/lib/auth-client.ts`, `klard-web/package.json`

**Dependencies:** US-001

**Ticket:** | **Status:** `todo`

---

### US-004: Mobile Passkey Registration

**Story:** As a **returning mobile user**, I want to register a passkey from my device so that I can sign in faster with biometrics next time.

**Priority:** P0 | **Size:** L (1d)

**Acceptance Criteria:**
- [ ] BiometricPrompt component renders in "register" mode
- [ ] User can register a passkey via biometric verification (Face ID/Touch ID/Fingerprint)
- [ ] Passkey is stored in database with auto-detected device name
- [ ] Success confirmation is displayed after registration
- [ ] Biometric unavailable devices show appropriate fallback message
- [ ] User cancellation returns to previous screen without error

**Files:** `klard-mobile/src/components/auth/biometric-prompt/`, `klard-mobile/src/hooks/usePasskeyAuth.ts`

**Dependencies:** US-002

**Ticket:** | **Status:** `todo`

---

### US-005: Web Passkey Registration

**Story:** As a **returning web user**, I want to register a passkey in my browser so that I can sign in faster with platform authentication next time.

**Priority:** P0 | **Size:** M (3-4h)

**Acceptance Criteria:**
- [ ] PasskeyButton component renders in "register" mode
- [ ] User can register a passkey via browser authenticator prompt
- [ ] Passkey is stored in database with auto-detected device name
- [ ] Success confirmation is displayed after registration
- [ ] Non-WebAuthn browsers hide the PasskeyButton

**Files:** `klard-web/src/components/auth/passkey-button/`, `klard-web/src/hooks/usePasskeyAuth.ts`

**Dependencies:** US-003

**Ticket:** | **Status:** `todo`

---

### US-006: Mobile Passkey Sign-In

**Story:** As a **returning mobile user**, I want to sign in with my registered passkey so that I don't need to enter my password.

**Priority:** P0 | **Size:** L (1d)

**Acceptance Criteria:**
- [ ] "Sign in with Passkey" option is available on LoginForm for users with registered passkeys
- [ ] User can authenticate via biometric verification
- [ ] Successful sign-in navigates to dashboard
- [ ] Invalid credentials show error message
- [ ] User cancellation returns to login screen without error
- [ ] Users without registered passkeys see disabled/hidden option

**Files:** `klard-mobile/src/components/auth/login-form/LoginForm.tsx`

**Dependencies:** US-004, US-008

**Ticket:** | **Status:** `todo`

---

### US-007: Web Passkey Sign-In with Conditional UI

**Story:** As a **returning web user**, I want to sign in with my registered passkey, including browser autofill suggestions, so that I have a seamless passwordless experience.

**Priority:** P0 | **Size:** M (3-4h)

**Acceptance Criteria:**
- [ ] "Sign in with Passkey" option is available on LoginForm
- [ ] User can authenticate via browser authenticator prompt
- [ ] Successful sign-in redirects to dashboard
- [ ] Email input has `autocomplete="webauthn"` for Conditional UI
- [ ] Browser shows passkey autofill suggestion when email field is focused
- [ ] Invalid credentials show error message

**Files:** `klard-web/src/components/auth/login-form.tsx`

**Dependencies:** US-005, US-008

**Ticket:** | **Status:** `todo`

---

## Epic 2: Error Handling & UX Feedback

### US-008: Form Shake Animation on Auth Failure

**Story:** As a **user attempting to log in**, I want to see a visual shake animation when authentication fails so that I have clear feedback that my credentials were incorrect.

**Priority:** P0 | **Size:** M (3-4h)

**Acceptance Criteria:**
- [ ] `useShakeAnimation` hook is implemented for mobile (Reanimated)
- [ ] `useShakeAnimation` hook is implemented for web (CSS)
- [ ] Login form shakes horizontally on authentication failure
- [ ] Animation duration is 200ms
- [ ] Animation triggers for all auth failure types (password, passkey, social)

**Files:**
- `klard-mobile/src/hooks/useShakeAnimation.ts`
- `klard-web/src/hooks/useShakeAnimation.ts`

**Ticket:** | **Status:** `todo`

---

### US-009: Haptic Feedback on Successful Login (Mobile)

**Story:** As a **mobile user**, I want to feel haptic feedback when I successfully log in so that I have tactile confirmation of the action.

**Priority:** P1 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] Haptic pulse fires on successful email/password login
- [ ] Haptic pulse fires on successful passkey sign-in
- [ ] Haptic pulse fires on successful social login
- [ ] Haptic feedback is uniform across all login methods
- [ ] No haptic feedback on failed attempts

**Files:** `klard-mobile/src/components/auth/login-form/LoginForm.tsx`

**Dependencies:** US-006 (uses existing `useHaptics` hook)

**Ticket:** | **Status:** `todo`

---

### US-010: Network Error Bottom Sheet (Mobile)

**Story:** As a **mobile user experiencing network issues**, I want to see a prominent error modal with retry option so that I can recover from temporary connectivity problems.

**Priority:** P0 | **Size:** M (3-4h)

**Acceptance Criteria:**
- [ ] NetworkErrorSheet component displays as BottomSheet modal
- [ ] Error message is clearly visible
- [ ] "Try again" button retries the failed operation
- [ ] Form values are preserved when retrying
- [ ] Sheet can be dismissed to return to login form
- [ ] Network errors during passkey operations show NetworkErrorSheet

**Files:** `klard-mobile/src/components/auth/network-error-sheet/`

**Dependencies:** Uses existing BottomSheet component

**Ticket:** | **Status:** `todo`

---

## Epic 3: Infrastructure

### US-011: Deploy Domain Verification Files

**Story:** As a **developer deploying passkey support**, I want domain verification files hosted correctly so that passkeys work on production domains.

**Priority:** P0 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] `/.well-known/assetlinks.json` is served from klard-auth (Android)
- [ ] `/.well-known/apple-app-site-association` is served from klard-auth (iOS)
- [ ] Files are accessible at correct paths without authentication
- [ ] Files contain correct app identifiers and package names
- [ ] Express static file serving is configured in `app.ts`

**Files:**
- `klard-auth/public/.well-known/assetlinks.json`
- `klard-auth/public/.well-known/apple-app-site-association`
- `klard-auth/src/app.ts`

**Ticket:** | **Status:** `todo`

---

### US-012: Configure iOS Face ID Permission

**Story:** As a **mobile developer**, I want the iOS app to request Face ID permission correctly so that users can authenticate with biometrics.

**Priority:** P0 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] `NSFaceIDUsageDescription` is added to iOS Info.plist
- [ ] Permission description explains why Face ID is needed
- [ ] iOS prompts for Face ID permission when first used

**Files:** `klard-mobile/ios/klard-mobile/Info.plist` (or `app.json` for Expo config)

**Ticket:** | **Status:** `todo`

---

### US-013: Configure Passkey Environment Variables

**Story:** As a **developer**, I want passkey configuration to be environment-driven so that it works across development, staging, and production.

**Priority:** P0 | **Size:** S (1-2h)

**Acceptance Criteria:**
- [ ] `PASSKEY_RP_ID` environment variable is used for relying party ID
- [ ] `PASSKEY_RP_NAME` environment variable is used for display name
- [ ] `PASSKEY_ORIGIN` environment variable is used for origin validation
- [ ] Default values work for local development
- [ ] Environment variables are documented

**Files:** `klard-auth/src/lib/auth.ts`, `.env.example`

**Ticket:** | **Status:** `todo`

---

## Prioritization Matrix

| Story | Value | Effort | Priority | Dependencies |
|-------|-------|--------|----------|--------------|
| US-001 | High | M | **P0** | - (Foundation) |
| US-002 | High | S | **P0** | US-001 |
| US-003 | High | S | **P0** | US-001 |
| US-011 | High | S | **P0** | - (Parallel) |
| US-012 | High | S | **P0** | - (Parallel) |
| US-013 | Med | S | **P0** | - (Parallel) |
| US-004 | High | L | **P0** | US-002 |
| US-005 | High | M | **P0** | US-003 |
| US-008 | High | M | **P0** | - (Parallel) |
| US-006 | High | L | **P0** | US-004, US-008 |
| US-007 | High | M | **P0** | US-005, US-008 |
| US-010 | Med | M | **P0** | - (Parallel) |
| US-009 | Med | S | **P1** | US-006 |

---

## Dependency Graph

```
Foundation (Parallel)
├── US-001 (Backend passkey) ─────┬─► US-002 (Mobile client) ─► US-004 (Mobile reg) ─► US-006 (Mobile sign-in)
│                                 │
│                                 └─► US-003 (Web client) ────► US-005 (Web reg) ───► US-007 (Web sign-in)
│
├── US-011 (Domain verification)  ─────────────────────────────────────────────────┘
├── US-012 (iOS permissions)
└── US-013 (Env vars)

Parallel Tracks
├── US-008 (Shake animation) ─────► US-006, US-007 (integrates on failure)
├── US-010 (Network error sheet)
└── US-009 (Haptic feedback) ─────► US-006 (integrates on success)
```

---

## SOLID Compliance

| Story | SRP | OCP | LSP | ISP | DIP |
|-------|-----|-----|-----|-----|-----|
| US-001 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-002 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-003 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-004 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-005 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-006 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-007 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-008 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-009 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-010 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-011 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-012 | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-013 | ✅ | ✅ | ✅ | ✅ | ✅ |

All stories have single responsibility and promote extensible, loosely-coupled design.

---

## Next Steps

Run `/agile:tasks` to break down stories into implementable tasks.