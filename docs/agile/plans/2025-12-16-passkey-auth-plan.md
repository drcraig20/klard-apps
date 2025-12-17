# Mobile Login Enhancements - Planning Phase Document

> **Status:** Planning Phase Complete
> **Next Phase:** `/agile:prd` to create requirements

## Problem Statement

Mobile login screen lacks platform-specific UX enhancements that the detailed spec requires:
- No biometric authentication option for returning users
- No visual/haptic feedback on form errors
- Network errors show inline banner (should be modal per spec)
- No form shake animation on auth failure

## Chosen Approach

**Component Composition Strategy:** Enhance existing login form by composing 4 modular, SOLID-compliant layers:
1. Biometric prompt layer (optional, for returning users)
2. Form interaction layer (shake animation, haptic feedback)
3. Authentication layer (success/error handling)
4. Error handling layer (network vs auth errors)

**Rationale:**
- Reuse 90% existing components (BottomSheet, ErrorBanner, useHaptics)
- Add only 2 new hooks + 1 new component
- Maintain SOLID principles (no god components, all dependencies injected)
- No new dependencies required

## Architecture Decision

**Layered Composition (Not Inheritance):**
- `BiometricPrompt` → Optional wrapper around form (renders null if disabled)
- `LoginForm` → Enhanced with hooks (useShakeAnimation, useHaptics)
- `NetworkErrorSheet` → Reuse existing BottomSheet component
- `useShakeAnimation` → Simple Animated.Value wrapper

**Tech Stack:**
- React Native `Animated` API (already used in onboarding)
- `expo-haptics` (already in use)
- `@gorhom/bottom-sheet` (already in use)
- No new dependencies

## Key Decisions

| Decision | Options | Chosen | Rationale |
|----------|---------|--------|-----------|
| Biometric Timing | Immediate / After Form / Hybrid | After Form + Fallback | User choice, clearer UX |
| Form Shake | Fields only / Entire form / Shake + haptic | Fields only | Per your spec |
| Haptics Strategy | Always / Valid only / Success only | Success only | Silent validation (per your choice) |
| Network Error UI | Banner / BottomSheet / Hybrid | BottomSheet (spec requirement) | Explicit spec requirement |
| Component Reuse | Build new / Reuse existing | Reuse 90% | SOLID compliance, no duplication |

## Scope: In vs Out

### In Scope
- ✅ Biometric UI prompt (placeholder - actual auth requires future setup)
- ✅ Form shake animation on auth failure
- ✅ Haptic pulse on successful login
- ✅ Network error BottomSheet modal
- ✅ Component integration tests
- ✅ SOLID-compliant architecture

### Out of Scope
- ❌ Actual biometric authentication (requires `expo-local-authentication` install + backend work)
- ❌ Google One Tap integration (Android, separate feature)
- ❌ Remember Me persistence (backend integration needed)
- ❌ Biometric enrollment flow (future phase)

## Constraints & Risks

### Constraints
- Must not break existing login functionality
- Must use existing component library (BottomSheet, ErrorBanner, etc.)
- Must follow SOLID principles (per project standards)
- Must have 100% test coverage (TDD requirement)

### Risks
- **Network error detection**: Identifying network errors vs timeout errors requires careful error handling
  - Mitigation: Create `isNetworkError()` helper with comprehensive checks
- **Shake animation timing**: Too fast and user misses it, too slow and feels sluggish
  - Mitigation: 50ms per segment (4 segments = 200ms total) based on onboarding patterns
- **Haptic on device without vibration**: Some devices don't support haptics
  - Mitigation: `expo-haptics` handles gracefully, no errors thrown

## SOLID Compliance Validation

| Principle | Status | Evidence |
|-----------|--------|----------|
| **SRP** | ✅ Excellent | 5 focused components (Prompt, Form, Animation, Haptics, BottomSheet) |
| **OCP** | ✅ Excellent | Data-driven via props, no modification needed for extensions |
| **LSP** | ✅ Good | BiometricPrompt returns null when not applicable (substitutable) |
| **ISP** | ✅ Excellent | Small focused prop interfaces (2-4 props each) |
| **DIP** | ✅ Excellent | All dependencies injected via props/hooks, no direct imports |

## Component Reuse Inventory

**Ready to Reuse (Existing):**
- `useHaptics` → All haptic types available ✅
- `BottomSheet` → Perfect for network errors ✅
- `ErrorBanner` → Auth error display ✅
- `InputField` → Form validation support ✅
- `Button` → Already has haptics ✅
- `Animated` API → Shake patterns from onboarding ✅

**New Components:**
- `useShakeAnimation` (30 lines)
- `BiometricPrompt` (120 lines)

**Enhanced Components:**
- `LoginForm` (50 lines added)

## Open Questions for PRD Phase

1. Should biometric be device-aware (Face ID on iOS, fingerprint fallback on Android)?
2. Should we show "Unlock with" text or just the icon?
3. For network error retry: Should we preserve form values or clear them?
4. Should haptic pulse vary by success type (login vs social login)?

## Files Affected Summary

**New Files:** 4 (2 hooks + components, 2 style files)
**Modified Files:** 6 (LoginForm, styles, locales, exports)
**Test Files:** 5 (all new functionality tested)
**No Dependencies Added** ✅

## Success Criteria (for PRD/Arch phases)

1. All acceptance criteria from spec met (biometric, shake, haptics, network error)
2. 100% test coverage (TDD)
3. No breaking changes to existing login
4. SOLID compliance verified
5. No performance regression
6. Zero new dependencies

## Next Phase

✅ Planning complete. Ready for `/agile:prd` to detail requirements.