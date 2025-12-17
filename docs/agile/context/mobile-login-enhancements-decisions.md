# Mobile Login Enhancements - Decision Log

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
| ADR-001 | Credential manager library | A) react-native-credentials-manager, B) expo-better-auth-passkey | B) expo-better-auth-passkey | Tighter better-auth integration, consistent API |
| ADR-002 | Domain verification hosting | A) klard-auth, B) CDN, C) klard-web | A) klard-auth | Same domain as rpID, single deployment |
| ADR-003 | Passkey naming convention | A) Auto-detect, B) User-provided, C) Platform+timestamp | A) Auto-detect device | Zero friction, good defaults |

**SOLID Compliance Status:**
- SRP: ✅ All components have single responsibility
- OCP: ✅ Extensible via props/options
- LSP: ✅ Consistent interfaces
- ISP: ✅ Focused interfaces
- DIP: ✅ Dependencies injected via hooks