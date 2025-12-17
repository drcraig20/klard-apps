# Architecture Phase Summary: Passkey Authentication (Web + Mobile)

**Date:** 2025-12-16
**Phase:** Architecture
**Scope:** Full-stack (klard-web, klard-mobile, klard-auth)

## Diagrams Created

- [x] System Context (flowchart) - includes klard-web + klard-mobile with unified passkeyClient
- [x] Component Architecture (flowchart)
- [x] Passkey Registration (sequence)
- [x] Passkey Sign-In (sequence)
- [x] Auth Failure with Shake (sequence)

## ADRs Recorded

1. **ADR-001:** Passkey Client Library → `@better-auth/passkey/client` with `passkeyClient()` (official)
2. **ADR-002:** Domain Verification Hosting → `klard-auth` Express server
3. **ADR-003:** Passkey Naming Convention → Auto-detect device name

## SOLID Compliance

All components validated across both platforms:

| Component | Platform | SRP | OCP | LSP | ISP | DIP |
|-----------|----------|-----|-----|-----|-----|-----|
| BiometricPrompt | Mobile | ✅ | ✅ | ✅ | ✅ | ✅ |
| PasskeyButton | Web | ✅ | ✅ | ✅ | ✅ | ✅ |
| usePasskeyAuth | Both | ✅ | ✅ | ✅ | ✅ | ✅ |
| useShakeAnimation | Both | ✅ | ✅ | ✅ | ✅ | ✅ |
| NetworkErrorSheet | Mobile | ✅ | ✅ | ✅ | ✅ | ✅ |
| LoginForm (enhanced) | Both | ✅ | ✅ | N/A | ✅ | ✅ |

## Technology Stack Decisions

| Package | Library | Version |
|---------|---------|---------|
| klard-mobile | @better-auth/passkey | ^1.4.7 |
| klard-mobile | expo-local-authentication | ~18.0.10 |
| klard-web | @better-auth/passkey | ^1.4.7 |
| klard-auth | @better-auth/passkey | ^1.4.7 |

## Key Architecture Insight

**Unified `passkeyClient()` across platforms:**
- Web: `passkeyClient()` alone handles WebAuthn API
- Mobile: `passkeyClient()` + `expoClient()` handles cookie/challenge flow automatically
- Same `authClient.passkey.*` and `authClient.signIn.passkey()` API on both

## Component Specifications

### New Files to Create

**klard-mobile:**
- `/src/components/auth/biometric-prompt/BiometricPrompt.tsx`
- `/src/components/auth/biometric-prompt/biometric-prompt.styles.ts`
- `/src/components/auth/network-error-sheet/NetworkErrorSheet.tsx`
- `/src/components/auth/network-error-sheet/network-error-sheet.styles.ts`
- `/src/hooks/usePasskeyAuth.ts`
- `/src/hooks/useShakeAnimation.ts`

**klard-web:**
- `/src/components/auth/passkey-button/PasskeyButton.tsx`
- `/src/hooks/usePasskeyAuth.ts`
- `/src/hooks/useShakeAnimation.ts`

**klard-auth:**
- `/public/.well-known/assetlinks.json`
- `/public/.well-known/apple-app-site-association`

### Files to Modify

- `/klard-auth/src/lib/auth.ts` - Add passkey plugin
- `/klard-mobile/src/lib/auth-client.ts` - Add passkeyClient + expoClient
- `/klard-web/src/lib/auth-client.ts` - Add passkeyClient
- `/klard-mobile/src/components/auth/login-form/LoginForm.tsx` - Integrate BiometricPrompt
- `/klard-web/src/components/auth/login-form/LoginForm.tsx` - Integrate PasskeyButton

## Implementation Phases

1. **Foundation** - Install @better-auth/passkey, configure auth-clients, run DB migration
2. **Hooks** - usePasskeyAuth (both), useShakeAnimation (both)
3. **UI Components** - BiometricPrompt (mobile), PasskeyButton (web), NetworkErrorSheet (mobile)
4. **Integration** - LoginForm enhancement (both platforms)
5. **Infrastructure** - Domain verification files
6. **Testing** - Unit, integration, device, browser testing

## Files Touched

- Created: `docs/agile/architecture/2025-12-16-passkey-auth-arch.md`
- Updated: `docs/agile/context/passkey-auth-decisions.md`

## Handoff Context

```json
{
  "feature": "passkey-auth",
  "phase": "arch",
  "scope": ["klard-web", "klard-mobile", "klard-auth"],
  "prd_file": "docs/agile/prds/2025-12-16-passkey-auth-prd.md",
  "arch_file": "docs/agile/architecture/2025-12-16-passkey-auth-arch.md",
  "adrs": ["ADR-001", "ADR-002", "ADR-003"],
  "tech_stack": {
    "all_packages": "@better-auth/passkey ^1.4.7",
    "mobile_biometric": "expo-local-authentication ~18.0.10",
    "client_plugin": "passkeyClient()",
    "server_plugin": "passkey()"
  },
  "solid_validated": true,
  "next_phase": "stories"
}
```

## Next Steps

| Option | Command | Description |
|--------|---------|-------------|
| A | `/agile:stories passkey-auth` | Generate user stories |
| B | `/agile:tasks passkey-auth` | Create implementation tasks |