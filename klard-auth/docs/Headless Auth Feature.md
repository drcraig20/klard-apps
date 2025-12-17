# Headless Authentication Server Features

A comprehensive checklist of features for Klard's headless authentication using **Better Auth** (Node.js/Express/Hono) as a standalone authentication service.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Applications                         │
├─────────────────┬─────────────────┬─────────────────────────────────┤
│    Next.js      │    Android      │         iOS                     │
│    (Web)        │    (Kotlin)     │       (Swift)                   │
└────────┬────────┴────────┬────────┴────────┬────────────────────────┘
         │                 │                 │
         │    Auth API Calls (REST)          │
         ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Better Auth Service (Node.js/Express/Hono)             │
│                                                                     │
│  Plugins:                                                           │
│  • jwt() - JWT tokens + JWKS endpoint                              │
│  • bearer() - Bearer token authentication                          │
│  • twoFactor() - TOTP/OTP MFA                                      │
│  • magicLink() - Passwordless login                                │
│  • emailOTP() - Email-based OTP codes                              │
│  • passkey() - WebAuthn/Passkeys                                   │
│  • organization() - Multi-tenancy (Phase 2)                        │
│                                                                     │
│  Endpoints: /api/auth/*                                            │
│  JWKS: /api/auth/jwks                                              │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              │ JWKS (public keys for validation)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Spring Boot Microservices                         │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Agent API   │  │  Billing API │  │  Core API    │              │
│  │              │  │              │  │              │              │
│  │ JWT Validation│ │ JWT Validation│ │ JWT Validation│             │
│  │ via JWKS     │  │ via JWKS     │  │ via JWKS     │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

**Priority Legend:**
- **(H)** — High Priority (MVP/Launch requirement)
- **(M)** — Medium Priority (Important but can follow shortly after launch)
- **(L)** — Low Priority (Nice to have)
- **(P2)** — Phase 2 (Post-launch feature)

**Better Auth Legend:**
- **🟢 BETTER-AUTH** — Handled automatically by Better Auth core or plugins
- **🟡 BETTER-AUTH-PARTIAL** — Better Auth provides building blocks, minimal custom code needed
- **🔴 CUSTOM** — Must be implemented from scratch

---

## 1. Authentication Methods

- [x] **Email/Password** (H) — **COMPLETED**
    - [x] Secure password hashing (scrypt/argon2) (H) — **🟢 BETTER-AUTH** (scrypt default, configurable) — **COMPLETED**
    - [x] Password strength validation (H) — **🟢 BETTER-AUTH** (8-128 chars default, configurable) — **COMPLETED**
    - [ ] Password breach checking (HaveIBeenPwned) (P2) — **🔴 CUSTOM**
    - [x] Configurable password policies (L) — **🟡 BETTER-AUTH-PARTIAL** (basic config available) — **COMPLETED**

- [x] **Passwordless/Magic Links** (M) — **COMPLETED**
    - [x] Generate secure one-time login links (M) — **🟢 BETTER-AUTH** `magic-link` plugin — **COMPLETED**
    - [x] Configurable link expiration (M) — **🟢 BETTER-AUTH** (default 5 min, configurable) — **COMPLETED**
    - [x] Single-use enforcement (M) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Rate limiting on link generation (M) — **🟢 BETTER-AUTH** (built-in rate limiter) — **COMPLETED**

- [x] **OTP Codes** (M) — **COMPLETED**
    - [x] Email OTP delivery (M) — **🟢 BETTER-AUTH** `email-otp` plugin — **COMPLETED**
    - [ ] SMS OTP delivery (L) — **🟢 BETTER-AUTH** `phone-number` plugin
    - [x] Configurable code length and expiration (M) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Rate limiting on code requests (M) — **🟢 BETTER-AUTH** — **COMPLETED**

- [x] **Social OAuth** (H) — **COMPLETED**
    - [x] Google (H) — **🟢 BETTER-AUTH** built-in — **COMPLETED**
    - [x] GitHub (M) — **🟢 BETTER-AUTH** built-in — **COMPLETED**
    - [x] Apple (M) — **🟢 BETTER-AUTH** built-in — **COMPLETED**
    - [ ] Microsoft (L) — **🟢 BETTER-AUTH** `generic-oauth` plugin (Entra ID helper)
    - [ ] Discord (L) — **🟢 BETTER-AUTH** built-in
    - [ ] Facebook (L) — **🟢 BETTER-AUTH** built-in
    - [ ] Twitter/X (L) — **🟢 BETTER-AUTH** built-in
    - [ ] LinkedIn (L) — **🟢 BETTER-AUTH** built-in
    - [ ] Custom OAuth providers (L) — **🟢 BETTER-AUTH** `generic-oauth` plugin
    - [x] Account linking (connect social to existing account) (M) — **🟢 BETTER-AUTH** `linkSocial()` / `unlinkAccount()` — **COMPLETED**

- [ ] **Passkeys/WebAuthn** (L)
    - [ ] Passkey registration (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] Passkey authentication (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] Multiple passkeys per account (L) — **🟢 BETTER-AUTH**
    - [ ] Passkey management (list, rename, delete) (L) — **🟢 BETTER-AUTH**
    - [ ] Cross-platform support (L) — **🟢 BETTER-AUTH** (SimpleWebAuthn)

- [ ] **Phone/SMS Authentication** (L)
    - [ ] Phone number as primary identifier (L) — **🟢 BETTER-AUTH** `phone-number` plugin
    - [ ] Phone number verification (L) — **🟢 BETTER-AUTH** `phone-number` plugin
    - [ ] SMS provider integration (Twilio, etc.) (L) — **🟡 BETTER-AUTH-PARTIAL** (you provide sendOTP function)

---

## 2. Multi-Factor Authentication (MFA)

- [ ] **TOTP (Authenticator Apps)** (M)
    - [ ] QR code generation for setup (M) — **🟢 BETTER-AUTH** `two-factor` plugin (totpURI)
    - [ ] Manual secret key entry option (L) — **🟢 BETTER-AUTH** (secret returned on enable)
    - [ ] TOTP verification (M) — **🟢 BETTER-AUTH** `twoFactor.verifyTotp()`
    - [ ] Support for Google Authenticator, Authy, etc. (M) — **🟢 BETTER-AUTH**

- [ ] **SMS/Email OTP as Second Factor** (M)
    - [ ] SMS code delivery (L) — **🟢 BETTER-AUTH** `two-factor` plugin OTP
    - [ ] Email code delivery (M) — **🟢 BETTER-AUTH** `two-factor` plugin OTP
    - [ ] Configurable code expiration (M) — **🟢 BETTER-AUTH**

- [ ] **WebAuthn as Second Factor** (L)
    - [ ] Hardware key support (YubiKey) (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] Biometric authentication (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] Platform authenticator support (L) — **🟢 BETTER-AUTH** `passkey` plugin

- [ ] **Recovery Codes** (H)
    - [ ] Generate backup codes on MFA setup (H) — **🟢 BETTER-AUTH** (auto-generated on 2FA enable)
    - [ ] Single-use enforcement (H) — **🟢 BETTER-AUTH** (deleted after use)
    - [ ] Code regeneration (M) — **🟢 BETTER-AUTH** `generateBackupCodes()`
    - [ ] Secure code storage (H) — **🟢 BETTER-AUTH** (stored in database)

- [ ] **MFA Management** (M)
    - [ ] Enable/disable MFA methods (M) — **🟢 BETTER-AUTH** `twoFactor.enable()` / `twoFactor.disable()`
    - [ ] Require MFA for sensitive actions (M) — **🔴 CUSTOM** (Step-Up Auth pattern)
    - [ ] MFA bypass for trusted devices (L) — **🟢 BETTER-AUTH** `trustDevice` option (30 days)
    - [ ] Admin-enforced MFA policies (L) — **🔴 CUSTOM**

---

## 3. Session Management

- [x] **JWT Access Tokens** (H) — **COMPLETED**
    - [x] Short-lived tokens (5-15 min) (H) — **🟢 BETTER-AUTH** `jwt` plugin — **COMPLETED**
    - [x] Configurable expiration (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [ ] Custom claims support (H) — **🟡 BETTER-AUTH-PARTIAL** (via hooks)
    - [x] RS256/ES256 signing (H) — **🟢 BETTER-AUTH** `jwt` plugin — **COMPLETED**
    - [x] Key rotation support (M) — **🟢 BETTER-AUTH-PARTIAL** **COMPLETED**

- [x] **Bearer Token Authentication** (H) — **COMPLETED**
    - [x] Bearer token support for mobile/API clients (H) — **🟢 BETTER-AUTH** `bearer()` plugin — **COMPLETED**
    - [x] Authorization header support (H) — **🟢 BETTER-AUTH** — **COMPLETED**

- [ ] **Refresh Tokens** (H)
    - [ ] Long-lived opaque tokens (H) — **🟢 BETTER-AUTH** (session-based, 7 days default)
    - [ ] Database-backed storage (H) — **🟢 BETTER-AUTH** (session table)
    - [ ] Configurable expiration (H) — **🟢 BETTER-AUTH** `expiresIn` config
    - [ ] Secure token generation (H) — **🟢 BETTER-AUTH**

- [ ] **Refresh Token Rotation** (H)
    - [ ] New token on each refresh (H) — **🟢 BETTER-AUTH** `updateAge` config
    - [ ] Reuse detection (H) — **🔴 CUSTOM**
    - [ ] Token family tracking (H) — **🔴 CUSTOM**
    - [ ] Automatic revocation on reuse (H) — **🔴 CUSTOM**

- [ ] **Device Sessions** (M)
    - [ ] Track sessions per device (M) — **🟢 BETTER-AUTH** (IP, userAgent in session table)
    - [ ] Device fingerprinting (M) — **🔴 CUSTOM**
    - [ ] Device metadata storage (browser, OS, IP) (M) — **🟢 BETTER-AUTH** (session stores ipAddress, userAgent)
    - [ ] Named devices (L) — **🔴 CUSTOM**

- [ ] **Session Listing** (M)
    - [ ] List all active sessions (M) — **🟢 BETTER-AUTH** `listSessions()`
    - [ ] Show device info per session (M) — **🟢 BETTER-AUTH** (IP, userAgent included)
    - [ ] Show last active timestamp (M) — **🟢 BETTER-AUTH** (expiresAt in session)
    - [ ] Identify current session (M) — **🟢 BETTER-AUTH** `getSession()`

- [ ] **Remote Logout** (H)
    - [ ] Revoke specific session (H) — **🟢 BETTER-AUTH** `revokeSession()`
    - [ ] Revoke all sessions (H) — **🟢 BETTER-AUTH** `revokeSessions()`
    - [ ] Revoke all except current (M) — **🟢 BETTER-AUTH** `revokeOtherSessions()`

- [x] **Session Timeouts** (M) — **COMPLETED**
    - [x] Idle timeout (inactivity) (M) — **🟢 BETTER-AUTH** `updateAge` config — **COMPLETED**
    - [x] Absolute timeout (max lifetime) (M) — **🟢 BETTER-AUTH** `expiresIn` config — **COMPLETED**
    - [x] Sliding expiration option (L) — **🟢 BETTER-AUTH** (default behavior) — **COMPLETED**

---

## 4. Account Management

- [x] **Registration** (H) — **COMPLETED**
    - [x] Email/password registration (H) — **🟢 BETTER-AUTH** `signUp.email()` — **COMPLETED**
    - [ ] Custom registration fields (M) — **🟡 BETTER-AUTH-PARTIAL** (extend user schema)
    - [ ] Terms of service acceptance tracking (M) — **🔴 CUSTOM**
    - [ ] Invite-only registration option (L) — **🔴 CUSTOM**
    - [ ] Registration disabled option (L) — **🟡 BETTER-AUTH-PARTIAL** (disable signUp endpoint)

- [x] **Email Verification** (H) — **COMPLETED**
    - [x] Verification email on registration (H) — **🟢 BETTER-AUTH** `sendVerificationEmail` config — **COMPLETED**
    - [x] Resend verification email (H) — **🟢 BETTER-AUTH** `sendVerificationEmail()` — **COMPLETED**
    - [x] Configurable token expiration (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Block unverified accounts option (M) — **🟢 BETTER-AUTH** `requireEmailVerification` option — **COMPLETED**

- [x] **Password Reset** (H) — **COMPLETED**
    - [x] Forgot password flow (H) — **🟢 BETTER-AUTH** `requestPasswordReset()` — **COMPLETED**
    - [x] Secure reset token generation (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Time-limited reset links (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Single-use enforcement (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Invalidate on password change (H) — **🟢 BETTER-AUTH** — **COMPLETED**

- [x] **Password Change** (H) — **COMPLETED**
    - [x] Require current password (H) — **🟢 BETTER-AUTH** `changePassword()` requires current — **COMPLETED**
    - [x] Validate new password strength (H) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [x] Optionally revoke all sessions (M) — **🟢 BETTER-AUTH** `revokeOtherSessions` option — **COMPLETED**
    - [ ] Notification email on change (M) — **🔴 CUSTOM**

- [ ] **Email Change** (M)
    - [ ] Verify new email before switch (M) — **🟢 BETTER-AUTH** `changeEmail()` with verification
    - [ ] Notify old email of change (M) — **🔴 CUSTOM**
    - [ ] Require password confirmation (M) — **🟢 BETTER-AUTH**
    - [ ] Revert option within time window (L) — **🔴 CUSTOM**

- [ ] **Profile Updates** (M)
    - [ ] Update display name (M) — **🟢 BETTER-AUTH** `updateUser()` name field
    - [ ] Update avatar/profile picture (L) — **🟢 BETTER-AUTH** `updateUser()` image field
    - [ ] Custom metadata fields (M) — **🟡 BETTER-AUTH-PARTIAL** (extend user schema)
    - [ ] Profile completeness tracking (L) — **🔴 CUSTOM**

- [ ] **Account Deletion** (M)
    - [ ] User-initiated deletion (M) — **🟢 BETTER-AUTH** `deleteUser()` (must enable)
    - [ ] Require password confirmation (M) — **🟢 BETTER-AUTH** (or fresh session)
    - [ ] Grace period before permanent deletion (L) — **🔴 CUSTOM**
    - [ ] GDPR-compliant data removal (M) — **🟡 BETTER-AUTH-PARTIAL** (`afterDelete` hook)
    - [ ] Webhook notification on deletion (L) — **🟡 BETTER-AUTH-PARTIAL** (`afterDelete` hook)

---

## 5. Attack Protection

- [x] **Rate Limiting** (H) — **COMPLETED**
    - [x] Per-IP rate limits (H) — **🟢 BETTER-AUTH** (built-in, 100/60s default) — **COMPLETED**
    - [ ] Per-account rate limits (H) — **🔴 CUSTOM**
    - [x] Per-endpoint configuration (M) — **🟢 BETTER-AUTH** `customRules` config — **COMPLETED**
    - [x] Configurable thresholds and windows (M) — **🟢 BETTER-AUTH** `window`, `max` config — **COMPLETED**

- [ ] **Brute Force Protection** (H)
    - [ ] Progressive delays on failures (H) — **🔴 CUSTOM**
    - [ ] Exponential backoff (H) — **🔴 CUSTOM**
    - [ ] Temporary IP blocks (M) — **🔴 CUSTOM**
    - [ ] Alerts on suspicious activity (M) — **🔴 CUSTOM**

- [ ] **Account Lockout** (H)
    - [ ] Lock after N failed attempts (H) — **🟢 BETTER-AUTH** `admin` plugin ban feature
    - [ ] Configurable lockout duration (H) — **🟢 BETTER-AUTH** `banExpires` field
    - [ ] Admin unlock capability (H) — **🟢 BETTER-AUTH** `admin.unbanUser()`
    - [ ] Self-service unlock via email (M) — **🔴 CUSTOM**

- [ ] **CAPTCHA Integration** (M)
    - [ ] hCaptcha support (M) — **🟢 BETTER-AUTH** `captcha` plugin
    - [ ] reCAPTCHA v2/v3 support (M) — **🟢 BETTER-AUTH** `captcha` plugin
    - [ ] Turnstile support (L) — **🟢 BETTER-AUTH** `captcha` plugin (Cloudflare)
    - [ ] Trigger on suspicious activity (M) — **🟢 BETTER-AUTH** (configurable endpoints)
    - [ ] Configurable challenge thresholds (L) — **🟡 BETTER-AUTH-PARTIAL** (reCAPTCHA v3 score)

- [ ] **Bot Detection** (L)
    - [ ] Device fingerprinting (L) — **🔴 CUSTOM**
    - [ ] Behavioral analysis (L) — **🔴 CUSTOM**
    - [ ] Known bot IP blocking (L) — **🔴 CUSTOM**
    - [ ] Headless browser detection (L) — **🔴 CUSTOM**

- [ ] **Credential Stuffing Protection** (M)
    - [ ] Detect automated login attempts (M) — **🔴 CUSTOM**
    - [ ] Cross-reference known breached credentials (M) — **🔴 CUSTOM**
    - [ ] Anomaly detection on login patterns (L) — **🔴 CUSTOM**

---

## 6. Token Security

- [x] **JWT Signing** (H) — **COMPLETED**
    - [x] RS256 support (H) — **🟢 BETTER-AUTH** `jwt` plugin — **COMPLETED**
    - [ ] ES256 support (M) — **🟢 BETTER-AUTH** `jwt` plugin
    - [x] Configurable algorithm (M) — **🟢 BETTER-AUTH** — **COMPLETED**
    - [ ] Key rotation without downtime (M) — **🔴 CUSTOM**

- [x] **JWKS Endpoint** (H) — **COMPLETED**
    - [x] Public keys for verification (H) — **🟢 BETTER-AUTH** `jwt` plugin `/jwks` endpoint — **COMPLETED**
    - [ ] Multiple keys for rotation (M) — **🔴 CUSTOM**
    - [x] Standard `.well-known/jwks.json` path (H) — **🟢 BETTER-AUTH** — **COMPLETED**

- [ ] **Token Binding** (M)
    - [ ] Bind tokens to device fingerprint (M) — **🔴 CUSTOM**
    - [ ] Bind tokens to IP range (L) — **🔴 CUSTOM**
    - [ ] Detect token migration (M) — **🔴 CUSTOM**

- [ ] **Reuse Detection** (H)
    - [ ] Track refresh token usage (H) — **🔴 CUSTOM**
    - [ ] Detect concurrent usage (H) — **🔴 CUSTOM**
    - [ ] Automatic family revocation (H) — **🔴 CUSTOM**

- [ ] **Automatic Revocation** (H)
    - [ ] Revoke on password change (H) — **🟢 BETTER-AUTH** `revokeOtherSessions` option
    - [ ] Revoke on email change (M) — **🔴 CUSTOM**
    - [ ] Revoke on suspicious activity (M) — **🔴 CUSTOM**
    - [ ] Revoke on admin action (M) — **🟢 BETTER-AUTH** `admin.revokeUserSessions()`

---

## 7. Security Events & Audit

- [ ] **Event Logging** (H)
    - [ ] Login success/failure (H) — **🔴 CUSTOM** (use hooks)
    - [ ] Registration events (H) — **🔴 CUSTOM** (use hooks)
    - [ ] Password changes (H) — **🔴 CUSTOM** (use `onPasswordReset` hook)
    - [ ] Email changes (M) — **🔴 CUSTOM**
    - [ ] MFA enrollment/removal (M) — **🔴 CUSTOM**
    - [ ] Session creation/revocation (M) — **🔴 CUSTOM** (use hooks)
    - [ ] Account lockouts (H) — **🔴 CUSTOM**

- [ ] **Audit Trail** (M)
    - [ ] Immutable event log (M) — **🔴 CUSTOM**
    - [ ] Timestamp and IP tracking (H) — **🟢 BETTER-AUTH** (session table has IP)
    - [ ] User agent capture (M) — **🟢 BETTER-AUTH** (session table has userAgent)
    - [ ] Admin action logging (M) — **🔴 CUSTOM**
    - [ ] Retention policies (L) — **🔴 CUSTOM**

- [ ] **Security Alerts** (M)
    - [ ] Email on new device login (M) — **🔴 CUSTOM**
    - [ ] Email on password change (M) — **🔴 CUSTOM**
    - [ ] Email on suspicious activity (L) — **🔴 CUSTOM**
    - [ ] Configurable alert thresholds (L) — **🔴 CUSTOM**

---

## 8. API Endpoints

- [ ] **Authentication Endpoints** (H)
    - [ ] `POST /auth/register` — Create account (H) — **🟢 BETTER-AUTH** `/sign-up/email`
    - [ ] `POST /auth/login` — Email/password login (H) — **🟢 BETTER-AUTH** `/sign-in/email`
    - [ ] `POST /auth/logout` — End session (H) — **🟢 BETTER-AUTH** `/sign-out`
    - [ ] `POST /auth/refresh` — Refresh access token (H) — **🟢 BETTER-AUTH** (auto via session)
    - [ ] `POST /auth/forgot-password` — Initiate reset (H) — **🟢 BETTER-AUTH** `/forget-password`
    - [ ] `POST /auth/reset-password` — Complete reset (H) — **🟢 BETTER-AUTH** `/reset-password`
    - [ ] `POST /auth/verify-email` — Verify email token (H) — **🟢 BETTER-AUTH** `/verify-email`
    - [ ] `POST /auth/resend-verification` — Resend verification email (H) — **🟢 BETTER-AUTH**

- [ ] **User Endpoints** (H)
    - [ ] `GET /auth/me` — Get current user (H) — **🟢 BETTER-AUTH** `/get-session`
    - [ ] `PATCH /auth/me` — Update profile (M) — **🟢 BETTER-AUTH** `/update-user`
    - [ ] `DELETE /auth/me` — Delete account (M) — **🟢 BETTER-AUTH** `/delete-user`
    - [ ] `POST /auth/change-password` — Change password (H) — **🟢 BETTER-AUTH** `/change-password`
    - [ ] `POST /auth/change-email` — Initiate email change (M) — **🟢 BETTER-AUTH** `/change-email`

- [ ] **OAuth/Social Endpoints** (H)
    - [ ] `GET /auth/oauth/:provider` — Initiate OAuth flow (H) — **🟢 BETTER-AUTH** `/sign-in/social`
    - [ ] `GET /auth/oauth/:provider/callback` — OAuth callback (H) — **🟢 BETTER-AUTH** `/callback/:provider`
    - [ ] `POST /auth/oauth/:provider/link` — Link social account (M) — **🟢 BETTER-AUTH** `/link-social`
    - [ ] `DELETE /auth/oauth/:provider` — Unlink social account (M) — **🟢 BETTER-AUTH** `/unlink-account`

- [ ] **MFA Endpoints** (M)
    - [ ] `POST /auth/mfa/totp/setup` — Get TOTP QR code (M) — **🟢 BETTER-AUTH** `/two-factor/enable`
    - [ ] `POST /auth/mfa/totp/verify` — Verify and enable TOTP (M) — **🟢 BETTER-AUTH** `/two-factor/verify-totp`
    - [ ] `DELETE /auth/mfa/totp` — Disable TOTP (M) — **🟢 BETTER-AUTH** `/two-factor/disable`
    - [ ] `POST /auth/mfa/challenge` — Submit MFA code (M) — **🟢 BETTER-AUTH** `/two-factor/verify-totp`
    - [ ] `GET /auth/mfa/recovery-codes` — Get recovery codes (M) — **🟢 BETTER-AUTH** `/two-factor/view-backup-codes`
    - [ ] `POST /auth/mfa/recovery-codes/regenerate` — Regenerate codes (M) — **🟢 BETTER-AUTH** `/two-factor/generate-backup-codes`

- [ ] **Session Endpoints** (M)
    - [ ] `GET /auth/sessions` — List active sessions (M) — **🟢 BETTER-AUTH** `/list-sessions`
    - [ ] `GET /auth/sessions/:id` — Get session details (M) — **🟢 BETTER-AUTH** `/get-session`
    - [ ] `DELETE /auth/sessions/:id` — Revoke specific session (H) — **🟢 BETTER-AUTH** `/revoke-session`
    - [ ] `DELETE /auth/sessions` — Revoke all sessions (H) — **🟢 BETTER-AUTH** `/revoke-sessions`

- [ ] **Passkey Endpoints** (L)
    - [ ] `POST /auth/passkey/register/options` — Get registration options (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] `POST /auth/passkey/register/verify` — Complete registration (L) — **🟢 BETTER-AUTH** `/passkey/add-passkey`
    - [ ] `POST /auth/passkey/login/options` — Get login options (L) — **🟢 BETTER-AUTH** `passkey` plugin
    - [ ] `POST /auth/passkey/login/verify` — Complete login (L) — **🟢 BETTER-AUTH** `/sign-in/passkey`
    - [ ] `GET /auth/passkeys` — List registered passkeys (L) — **🟢 BETTER-AUTH** `/passkey/list-passkeys`
    - [ ] `DELETE /auth/passkeys/:id` — Remove passkey (L) — **🟢 BETTER-AUTH** `/passkey/delete-passkey`

---

## 9. OIDC/OAuth2 Provider (Optional)

- [ ] **Standard Endpoints** (M)
    - [ ] `GET /oauth/authorize` — Authorization endpoint (M) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] `POST /oauth/token` — Token endpoint (M) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] `GET /oauth/userinfo` — UserInfo endpoint (M) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] `POST /oauth/revoke` — Token revocation (M) — **🔴 CUSTOM**
    - [ ] `POST /oauth/introspect` — Token introspection (L) — **🔴 CUSTOM**

- [ ] **Discovery** (M)
    - [ ] `GET /.well-known/openid-configuration` — OIDC discovery (M) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] `GET /.well-known/jwks.json` — JSON Web Key Set (H) — **🟢 BETTER-AUTH** `jwt` plugin

- [ ] **Grant Types** (M)
    - [ ] Authorization Code (M) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] Authorization Code + PKCE (H) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] Refresh Token (H) — **🔴 CUSTOM** (session-based by default)
    - [ ] Client Credentials (M) — **🔴 CUSTOM**

- [ ] **Client Management** (M)
    - [ ] Register OAuth clients (M) — **🔴 CUSTOM**
    - [ ] Client credentials management (M) — **🔴 CUSTOM**
    - [ ] Redirect URI validation (H) — **🟢 BETTER-AUTH** `oidc-provider` plugin
    - [ ] Scope configuration (M) — **🟡 BETTER-AUTH-PARTIAL**

---

## 10. Multi-Tenancy & Organizations (P2)

- [ ] **Organizations/Teams** (P2) — **🟢 BETTER-AUTH** `organization` plugin
    - [x] Create organizations (P2) — **🟢 BETTER-AUTH**
    - [x] Organization metadata (P2) — **🟢 BETTER-AUTH** (name, slug, logo)
    - [x] Organization settings (P2) — **🟢 BETTER-AUTH**
    - [x] Organization deletion (P2) — **🟢 BETTER-AUTH** (owner only)

- [ ] **Membership** (P2) — **🟢 BETTER-AUTH** `organization` plugin
    - [x] Add members to organizations (P2) — **🟢 BETTER-AUTH** `addMember()`
    - [x] Remove members (P2) — **🟢 BETTER-AUTH** `removeMember()`
    - [x] Transfer ownership (P2) — **🟢 BETTER-AUTH**
    - [x] Member listing (P2) — **🟢 BETTER-AUTH** `listMembers()`

- [ ] **Invitations** (P2) — **🟢 BETTER-AUTH** `organization` plugin
    - [x] Email invitations (P2) — **🟢 BETTER-AUTH**
    - [x] Invitation links (P2) — **🟢 BETTER-AUTH**
    - [x] Invitation expiration (P2) — **🟢 BETTER-AUTH**
    - [x] Resend invitations (P2) — **🟢 BETTER-AUTH**
    - [x] Revoke pending invitations (P2) — **🟢 BETTER-AUTH** `cancelInvitation()`

- [ ] **Organization Roles & Permissions** (P2) — **🟢 BETTER-AUTH** `organization` plugin
    - [x] Predefined roles (owner, admin, member) (P2) — **🟢 BETTER-AUTH**
    - [x] Custom roles (P2) — **🟢 BETTER-AUTH** (dynamic roles at runtime)
    - [x] Role assignment (P2) — **🟢 BETTER-AUTH** `updateMemberRole()`
    - [x] Permission checking (P2) — **🟢 BETTER-AUTH** `hasPermission()`

- [ ] **Organization Switching** (P2) — **🟢 BETTER-AUTH** `organization` plugin
    - [x] Users belong to multiple orgs (P2) — **🟢 BETTER-AUTH**
    - [x] Switch active organization (P2) — **🟢 BETTER-AUTH** `setActiveOrganization()`
    - [ ] Org-scoped tokens (P2) — **🔴 CUSTOM**

- [ ] **Enterprise SSO (per Organization)** (P2)
    - [x] SAML integration (P2) — **🟢 BETTER-AUTH** `sso` plugin
    - [x] OIDC integration (P2) — **🟢 BETTER-AUTH** `sso` plugin
    - [ ] Just-in-time provisioning (P2) — **🔴 CUSTOM**
    - [ ] Domain verification (P2) — **🔴 CUSTOM**

- [ ] **Custom Domains** (P2) — **🔴 CUSTOM**
    - [ ] Per-organization auth domains (P2)
    - [ ] SSL certificate management (P2)
    - [ ] DNS verification (P2)

---

## 11. Webhooks

- [ ] **Webhook Management** (M) — **🔴 CUSTOM**
    - [ ] Register webhook endpoints (M)
    - [ ] Select events to receive (M)
    - [ ] Webhook secrets for verification (M)
    - [ ] Enable/disable webhooks (M)

- [ ] **Event Types** (M) — **🔴 CUSTOM**
    - [ ] `user.created` (H)
    - [ ] `user.updated` (M)
    - [ ] `user.deleted` (M)
    - [ ] `user.verified` (M)
    - [ ] `session.created` (M)
    - [ ] `session.revoked` (M)
    - [ ] `password.changed` (M)
    - [ ] `password.reset` (M)
    - [ ] `mfa.enabled` (L)
    - [ ] `mfa.disabled` (L)
    - [ ] `organization.created` (P2)
    - [ ] `organization.member.added` (P2)
    - [ ] `organization.member.removed` (P2)

- [ ] **Delivery** (M) — **🔴 CUSTOM**
    - [ ] Retry on failure (M)
    - [ ] Exponential backoff (M)
    - [ ] Delivery logs (L)
    - [ ] Manual retry option (L)

- [ ] **Security** (M) — **🔴 CUSTOM**
    - [ ] HMAC signature verification (M)
    - [ ] Timestamp validation (M)
    - [ ] IP allowlisting (L)

---

## 12. Hooks & Extensibility (P2)

- [ ] **Lifecycle Hooks** (P2)
    - [ ] Pre-registration hook (P2) — **🟡 BETTER-AUTH-PARTIAL** (use middleware)
    - [ ] Post-registration hook (P2) — **🟡 BETTER-AUTH-PARTIAL** (use hooks)
    - [ ] Pre-login hook (P2) — **🟡 BETTER-AUTH-PARTIAL** (use middleware)
    - [ ] Post-login hook (P2) — **🟡 BETTER-AUTH-PARTIAL** (use hooks)
    - [ ] Pre-logout hook (P2) — **🟡 BETTER-AUTH-PARTIAL**
    - [x] Post-password-change hook (P2) — **🟢 BETTER-AUTH** `onPasswordReset` callback

- [ ] **Token Hooks** (P2)
    - [ ] Custom access token claims (P2) — **🟡 BETTER-AUTH-PARTIAL** (jwt plugin hooks)
    - [ ] Custom ID token claims (P2) — **🟡 BETTER-AUTH-PARTIAL**
    - [ ] Token validation hooks (P2) — **🔴 CUSTOM**

- [ ] **Validation Hooks** (P2) — **🔴 CUSTOM**
    - [ ] Custom password validation (P2)
    - [ ] Custom email validation (P2)
    - [ ] Custom registration validation (P2)
    - [ ] Custom profile validation (P2)

- [ ] **External Integrations** (P2) — **🔴 CUSTOM**
    - [ ] Sync users to external systems (P2)
    - [ ] Enrich user data from external sources (P2)
    - [ ] Block login based on external rules (P2)

---

## 13. Admin Features (P2)

- [ ] **User Management** (P2) — **🟢 BETTER-AUTH** `admin` plugin
    - [x] List users (paginated, searchable) (P2) — **🟢 BETTER-AUTH** `admin.listUsers()`
    - [x] View user details (P2) — **🟢 BETTER-AUTH**
    - [x] Edit user profile (P2) — **🟢 BETTER-AUTH**
    - [x] Lock/unlock accounts (P2) — **🟢 BETTER-AUTH** `admin.banUser()` / `admin.unbanUser()`
    - [ ] Force password reset (P2) — **🔴 CUSTOM**
    - [ ] Manually verify email (P2) — **🔴 CUSTOM**
    - [x] Impersonate user (P2) — **🟢 BETTER-AUTH** `admin.impersonateUser()`
    - [x] Delete user (P2) — **🟢 BETTER-AUTH** `admin.removeUser()`

- [ ] **Session Management** (P2)
    - [x] View all active sessions (P2) — **🟢 BETTER-AUTH**
    - [ ] Filter by user (P2) — **🔴 CUSTOM**
    - [x] Revoke sessions (P2) — **🟢 BETTER-AUTH** `admin.revokeUserSessions()`
    - [ ] Session analytics (P2) — **🔴 CUSTOM**

- [ ] **Security Dashboard** (P2) — **🔴 CUSTOM**
    - [ ] Failed login attempts (P2)
    - [ ] Locked accounts (P2)
    - [ ] Suspicious activity (P2)
    - [ ] Security event timeline (P2)

- [ ] **Configuration** (P2) — **🔴 CUSTOM**
    - [ ] Authentication settings (P2)
    - [ ] Security policies (P2)
    - [ ] Email templates (P2)
    - [ ] OAuth provider setup (P2)

---

## 14. Email & Communication (P2)

- [ ] **Email Templates** (P2) — **🔴 CUSTOM**
    - [ ] Verification email (H - use simple template initially)
    - [ ] Password reset email (H - use simple template initially)
    - [ ] Magic link email (M)
    - [ ] OTP code email (M)
    - [ ] Welcome email (P2)
    - [ ] Password changed notification (P2)
    - [ ] New device login alert (P2)
    - [ ] Account locked notification (P2)
    - [ ] Invitation email (P2)

- [ ] **Template Customization** (P2) — **🔴 CUSTOM**
    - [ ] Custom branding (P2)
    - [ ] Custom copy (P2)
    - [ ] Localization/i18n (P2)
    - [ ] HTML and plain text versions (P2)

- [ ] **Email Providers** (P2)
    - [ ] SMTP (H) — **🔴 CUSTOM** (you provide sendEmail function)
    - [ ] SendGrid (M) — **🔴 CUSTOM**
    - [ ] Mailgun (L) — **🔴 CUSTOM**
    - [ ] AWS SES (M) — **🔴 CUSTOM**
    - [ ] Postmark (L) — **🔴 CUSTOM**
    - [ ] Resend (M) — **🔴 CUSTOM**

- [ ] **SMS Providers** (P2) — **🔴 CUSTOM**
    - [ ] Twilio (L)
    - [ ] MessageBird (L)
    - [ ] Vonage (L)
    - [ ] AWS SNS (L)

---

## 15. Database & Storage (P2)

- [ ] **Database Support** (P2)
    - [x] PostgreSQL (H) — **🟢 BETTER-AUTH** (Prisma, Drizzle, Kysely adapters)
    - [x] MySQL (M) — **🟢 BETTER-AUTH**
    - [x] SQLite (L - dev only) — **🟢 BETTER-AUTH**
    - [x] MongoDB (L) — **🟢 BETTER-AUTH** (adapter available)
    - [ ] Custom adapters (P2) — **🟡 BETTER-AUTH-PARTIAL** (adapter interface)

- [ ] **Data Management** (P2)
    - [x] Migration scripts (H) — **🟢 BETTER-AUTH** `npx @better-auth/cli migrate`
    - [ ] Backup support (P2) — **🔴 CUSTOM**
    - [ ] Data export (GDPR) (P2) — **🔴 CUSTOM**
    - [ ] Data retention policies (P2) — **🔴 CUSTOM**

- [ ] **Scalability** (P2)
    - [ ] Connection pooling (H) — **🟡 BETTER-AUTH-PARTIAL** (via ORM)
    - [ ] Read replicas (P2) — **🔴 CUSTOM**
    - [x] Horizontal scaling (P2) — **🟢 BETTER-AUTH** (stateless sessions w/ secondary storage)
    - [x] Caching layer (P2) — **🟢 BETTER-AUTH** (Redis secondary storage)

---

## 16. Deployment & Operations (P2)

- [ ] **Deployment Options** (P2)
    - [x] Self-hosted (H) — **🟢 BETTER-AUTH** (Node.js/Express)
    - [x] Docker image (H) — **🟢 BETTER-AUTH** (standard Node.js Docker)
    - [ ] Kubernetes Helm chart (P2) — **🔴 CUSTOM**
    - [ ] Cloud hosted option (P2) — **🔴 CUSTOM**

- [ ] **Configuration** (P2)
    - [x] Environment variables (H) — **🟢 BETTER-AUTH** (standard Node.js)
    - [x] Configuration file (M) — **🟢 BETTER-AUTH** (auth config object)
    - [ ] Secrets management (H) — **🔴 CUSTOM** (use Vault, AWS Secrets, etc.)
    - [ ] Hot reload (P2) — **🔴 CUSTOM**

- [ ] **Monitoring** (P2)
    - [ ] Health check endpoint (H) — **🔴 CUSTOM** (add Express endpoint)
    - [ ] Metrics endpoint (Prometheus) (P2) — **🔴 CUSTOM**
    - [ ] Structured logging (H) — **🔴 CUSTOM** (use Winston, Pino)
    - [ ] Distributed tracing (P2) — **🔴 CUSTOM** (use OpenTelemetry)

- [ ] **High Availability** (P2)
    - [x] Stateless design (H) — **🟢 BETTER-AUTH** (with secondary storage)
    - [x] Multi-instance support (P2) — **🟢 BETTER-AUTH** (Redis session storage)
    - [x] Load balancer ready (H) — **🟢 BETTER-AUTH**
    - [ ] Zero-downtime deployments (P2) — **🔴 CUSTOM**

---

## Summary: Better Auth Coverage

### 🟢 Fully Handled by Better Auth (No Custom Code)

| Category | Count |
|----------|-------|
| Email/Password Auth | 8 |
| Social OAuth Providers | 10 |
| Passwordless (Magic Link, OTP) | 8 |
| Passkeys/WebAuthn | 6 |
| Two-Factor Auth (TOTP, Backup) | 12 |
| Session Management | 15 |
| Account Management | 18 |
| API Endpoints | 30+ |
| Organizations/Teams | 20 |
| Admin Features | 10 |
| **Total** | **~137 features** |

### 🟡 Better Auth Provides Building Blocks (Minimal Code)

| Category | Count |
|----------|-------|
| Custom User Fields | 3 |
| Lifecycle Hooks | 6 |
| Token Customization | 3 |
| **Total** | **~12 features** |

### 🔴 Must Build Custom (Significant Work)

| Category | Count |
|----------|-------|
| Webhooks | 15 |
| Email Templates & Providers | 12 |
| Security Events/Audit | 10 |
| Bot Detection | 4 |
| Monitoring/Observability | 6 |
| Custom OIDC Features | 5 |
| **Total** | **~52 features** |

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                      Klard Client Apps                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Next.js    │  │     iOS      │  │   Android    │          │
│  │  Dashboard   │  │     App      │  │     App      │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼─────────────────┼─────────────────┼───────────────────┘
          │                 │                 │
          └────────────────┬┴─────────────────┘
                           │ REST API + Bearer Tokens
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│               Better Auth Service (Node.js/Express)             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Plugins: 2FA, Passkey, Magic-Link, Organization, Admin  │  │
│  │           JWT, OIDC-Provider, Captcha, Phone-Number      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                    ┌─────────┴─────────┐                       │
│                    ▼                   ▼                       │
│             ┌───────────┐       ┌───────────┐                  │
│             │ PostgreSQL│       │   Redis   │                  │
│             │  (Users,  │       │ (Sessions,│                  │
│             │  Sessions)│       │   Cache)  │                  │
│             └───────────┘       └───────────┘                  │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ JWT Access Token (JWKS verified)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│            Spring Boot API Gateway (Resource Server)            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  spring-security-oauth2-resource-server                  │  │
│  │  Validates JWT via JWKS: auth.klard.io/.well-known/jwks  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│                    ┌─────────────────┐                         │
│                    │  Klard Core     │                         │
│                    │  Services       │                         │
│                    └─────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recommendation

For Klard MVP with Better Auth:
1. **Use Better Auth's 🟢 built-in features** for auth, sessions, 2FA, passkeys, organizations
2. **Add these plugins**: `two-factor`, `passkey`, `magic-link`, `organization`, `admin`, `jwt`, `captcha`
3. **Build 🔴 CUSTOM** only for: Webhooks, Email templates, Audit logging
4. **Defer to Phase 2**: Security dashboard, Custom OIDC features, Advanced monitoring

---

## Implementation Reference

### Project Structure

```
klard-auth/
├── src/
│   ├── index.ts          # Express/Hono server
│   ├── auth.ts           # Better Auth configuration
│   ├── db.ts             # Database connection
│   ├── email.ts          # Email sending service
│   └── webhooks.ts       # Webhook handlers
├── package.json
├── tsconfig.json
├── .env
└── Dockerfile
```

### Better Auth Configuration Example

```typescript
// auth.ts
import { betterAuth } from "better-auth";
import { bearer, jwt, twoFactor, magicLink, emailOTP } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { Pool } from "pg";
import { sendEmail } from "./email";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,

  // Base URL for the auth server
  baseURL: process.env.BETTER_AUTH_URL,

  // Secret for signing (min 32 chars)
  secret: process.env.BETTER_AUTH_SECRET,

  // Trusted origins (your apps)
  trustedOrigins: [
    "https://klard.io",
    "https://app.klard.io",
    "klard://", // Mobile deep link
  ],

  // Email & Password
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Klard password",
        html: `<a href="${url}">Reset Password</a>`,
      });
    },
  },

  // Email Verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Klard account",
        html: `<a href="${url}">Verify Email</a>`,
      });
    },
    sendOnSignUp: true,
  },

  // Social Providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    },
  },

  // Account Linking
  accountLinking: {
    enabled: true,
    trustedProviders: ["google", "github", "apple"],
  },

  // Session Configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Refresh daily
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min cache
    },
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 10, max: 5 },
      "/sign-up/email": { window: 60, max: 3 },
      "/forgot-password": { window: 60, max: 3 },
      "/two-factor/verify": { window: 10, max: 3 },
    },
  },

  // User Configuration
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirm email change",
          html: `Confirm change to ${newEmail}: <a href="${url}">Confirm</a>`,
        });
      },
    },
    deleteUser: {
      enabled: true,
    },
  },

  // Plugins
  plugins: [
    // JWT for Spring Boot integration
    jwt({
      jwks: {
        keyPairConfig: { alg: "RS256" },
        rotationInterval: 60 * 60 * 24 * 30, // 30 days
        gracePeriod: 60 * 60 * 24 * 7, // 7 days
      },
    }),

    // Bearer token support for mobile
    bearer(),

    // Two-Factor Authentication
    twoFactor({
      issuer: "Klard",
      backupCodeCount: 10,
    }),

    // Magic Link (passwordless)
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "Sign in to Klard",
          html: `<a href="${url}">Click to sign in</a>`,
        });
      },
      expiresIn: 60 * 15, // 15 minutes
    }),

    // Email OTP
    emailOTP({
      otpLength: 6,
      expiresIn: 60 * 10,
      sendVerificationOTP: async ({ email, otp, type }) => {
        const subjects = {
          "sign-in": "Your Klard sign-in code",
          "email-verification": "Verify your email",
          "forget-password": "Reset your password",
        };
        await sendEmail({
          to: email,
          subject: subjects[type] || "Your Klard code",
          text: `Your code is: ${otp}`,
        });
      },
    }),

    // Passkeys (Phase 2)
    passkey({
      rpID: "klard.io",
      rpName: "Klard",
      origin: process.env.BETTER_AUTH_URL!,
    }),
  ],

  // IP Address detection
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
  },
});

export type Auth = typeof auth;
```

### Express Server Example

```typescript
// index.ts
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

const app = express();
const port = process.env.PORT || 3000;

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Better Auth handler (must be before express.json())
app.all("/api/auth/*", toNodeHandler(auth));

// JSON parsing for other routes
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
  console.log(`JWKS available at /api/auth/jwks`);
});
```

### Spring Boot Integration

```yaml
# application.yml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: https://auth.klard.io/api/auth/jwks
          issuer-uri: https://auth.klard.io
```

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}
```

### Environment Variables

```env
# Required
BETTER_AUTH_SECRET=your-32-char-secret-here
BETTER_AUTH_URL=https://auth.klard.io
DATABASE_URL=postgresql://user:pass@host:5432/auth

# OAuth Providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: klard-auth
spec:
  replicas: 3
  selector:
    matchLabels:
      app: klard-auth
  template:
    spec:
      containers:
      - name: auth
        image: klard/auth:latest
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: auth-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
```

---

## API Endpoint Reference

Better Auth automatically exposes these endpoints at `/api/auth/*`:

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-up/email` | POST | Email/password registration |
| `/api/auth/sign-in/email` | POST | Email/password login |
| `/api/auth/sign-out` | POST | End session |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/token` | GET | Get JWT token (with jwt plugin) |
| `/api/auth/jwks` | GET | JWKS public keys |
| `/api/auth/forgot-password` | POST | Initiate password reset |
| `/api/auth/reset-password` | POST | Complete password reset |
| `/api/auth/verify-email` | GET | Verify email token |
| `/api/auth/send-verification-email` | POST | Resend verification |

### OAuth Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sign-in/social` | POST | Initiate OAuth flow |
| `/api/auth/callback/:provider` | GET | OAuth callback |

### MFA Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/two-factor/enable` | POST | Enable 2FA (returns QR) |
| `/api/auth/two-factor/disable` | POST | Disable 2FA |
| `/api/auth/two-factor/verify` | POST | Verify TOTP code |
| `/api/auth/two-factor/generate-backup-codes` | POST | Generate recovery codes |

### Session Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/list-sessions` | GET | List all sessions |
| `/api/auth/revoke-session` | POST | Revoke specific session |
| `/api/auth/revoke-sessions` | POST | Revoke all sessions |

### JWKS Response Format

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "key-id-123",
      "use": "sig",
      "alg": "RS256",
      "n": "...",
      "e": "AQAB"
    }
  ]
}
```