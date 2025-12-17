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

## Tasks Phase Decisions - 2025-12-17

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| Task granularity | A) Full detailed TDD steps for all 47 tasks, B) Summarized with templates, C) Progressive breakdown | C) Progressive breakdown | Full TDD details for foundation tasks (US-001-003), summaries for rest, generate details on-demand with `/agile:impl` |
| Execution approach | A) Subagent-driven (this session), B) Parallel session | Pending user decision | Both options available; subagent-driven recommended for faster iteration |
| Parallel track strategy | A) Sequential, B) Parallel independent work | B) Parallel independent | US-008, US-010, US-011-013 can start Day 1 alongside US-001 |
| Task ID format | A) Sequential, B) Story-based | B) Story-based (AUTH-XXX-YY) | Clear traceability: AUTH-001-01 = US-001 Task 1 |

**Tasks Created:**

| Story | Tasks | Total Est. |
|-------|-------|-----------|
| US-001 | 5 | 4h |
| US-002 | 3 | 2h |
| US-003 | 3 | 2h |
| US-004 | 6 | 8h |
| US-005 | 5 | 6h |
| US-006 | 4 | 6h |
| US-007 | 4 | 6h |
| US-008 | 4 | 4h |
| US-009 | 2 | 2h |
| US-010 | 4 | 4h |
| US-011 | 3 | 2h |
| US-012 | 2 | 1h |
| US-013 | 2 | 1h |
| **TOTAL** | **47** | **~48h** |

**Parallel Tracks Identified:**
- Critical Path: US-001 → US-002/003 → US-004/005 → US-006/007
- UX Track: US-008 (no deps, unblocks sign-in)
- Error Handling Track: US-010 (no deps)
- Infrastructure Track: US-011, US-012, US-013 (no deps)