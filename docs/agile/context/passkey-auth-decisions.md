# Passkey Authentication - Decision Log

**Scope:** Full-stack (klard-web, klard-mobile, klard-auth)

## PRD Phase Decisions - 2025-12-16

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| Biometric prompt text | A) Device-aware, B) Generic text, C) Icon-only | B) Generic "Unlock with Biometrics" + icon | Simpler implementation, consistent cross-platform |
| Network error retry | A) Preserve values, B) Clear form, C) Auto-retry | A) Preserve form values | Better UX - user doesn't re-enter credentials |
| Haptic feedback | A) Uniform, B) Differentiated by method | A) Uniform pulse | Consistent feedback regardless of login method |
| Auth architecture | A) Token-based, B) Device-bound, C) Passkey/WebAuthn | C) Passkey/WebAuthn | Most secure, industry standard, future-proof |

## Technical Constraints Confirmed

- iOS 16+ required for Passkey support
- Android 10+ required for Credential Manager
- Expo Go not supported - requires dev builds
- better-auth passkey plugin handles server-side WebAuthn
- Domain verification required (AASA + assetlinks.json)

## Architecture Phase Decisions - 2025-12-16

| ADR | Question | Options | Decision | Rationale |
|-----|----------|---------|----------|-----------|
| ADR-001 | Passkey client library | A) react-native-credentials-manager, B) expo-better-auth-passkey, C) @better-auth/passkey/client | **C) @better-auth/passkey/client** | Official library, same API on web+mobile, automatic Expo integration |
| ADR-002 | Domain verification hosting | A) klard-auth, B) CDN, C) klard-web | A) klard-auth | Same domain as rpID, single deployment |
| ADR-003 | Passkey naming convention | A) Auto-detect, B) User-provided, C) Platform+timestamp | A) Auto-detect device | Zero friction, good defaults |

## Technology Stack (Final)

| Platform | Package | Library |
|----------|---------|---------|
| klard-auth (backend) | `@better-auth/passkey` | Server-side WebAuthn with `passkey()` plugin |
| klard-web (frontend) | `@better-auth/passkey` | Client-side with `passkeyClient()` |
| klard-mobile (frontend) | `@better-auth/passkey` | Client-side with `passkeyClient()` + `expoClient()` |
| klard-mobile | `expo-local-authentication` | Biometric capability detection |

## Key Integration Pattern

**Unified API across platforms:**
```typescript
// Both web and mobile use the same API:
await authClient.passkey.addPasskey({ name });
await authClient.signIn.passkey({ autoFill });
await authClient.passkey.listUserPasskeys();
await authClient.passkey.deletePasskey({ id });
```

**Mobile-specific:** `expoClient()` handles cookie/challenge flow automatically when combined with `passkeyClient()`.

## SOLID Compliance Status

- SRP: ✅ All components have single responsibility
- OCP: ✅ Extensible via props/options
- LSP: ✅ Consistent interfaces
- ISP: ✅ Focused interfaces
- DIP: ✅ Dependencies injected via hooks and authClient abstraction

## Stories Phase Decisions - 2025-12-16

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| Story granularity | A) Merged platform stories, B) Separate mobile/web stories | B) Separate stories | Enables parallel development, clearer tracking |
| Haptic feedback priority | A) P0, B) P1 | B) P1 | UX polish, not core functionality |
| Acceptance criteria format | A) Gherkin scenarios, B) Simple checkboxes | B) Simple checkboxes | Defines "done", not test implementation |

**Stories Created:**

| ID | Title | Priority | Size |
|----|-------|----------|------|
| US-001 | Configure backend passkey plugin | P0 | M |
| US-002 | Configure mobile auth client with passkey support | P0 | S |
| US-003 | Configure web auth client with passkey support | P0 | S |
| US-004 | Mobile passkey registration | P0 | L |
| US-005 | Web passkey registration | P0 | M |
| US-006 | Mobile passkey sign-in | P0 | L |
| US-007 | Web passkey sign-in with Conditional UI | P0 | M |
| US-008 | Form shake animation on auth failure | P0 | M |
| US-009 | Haptic feedback on successful login (mobile) | P1 | S |
| US-010 | Network error bottom sheet (mobile) | P0 | M |
| US-011 | Deploy domain verification files | P0 | S |
| US-012 | Configure iOS Face ID permission | P0 | S |
| US-013 | Configure passkey environment variables | P0 | S |