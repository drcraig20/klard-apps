# Passkey Auth - Task Board

> **Last Updated:** 2025-12-17
> **Tasks Document:** [`../tasks/2025-12-17-passkey-auth-tasks.md`](../tasks/2025-12-17-passkey-auth-tasks.md)

---

## 📋 Ready (No Dependencies)

| Task ID | Title | Story | Est. |
|---------|-------|-------|------|
| AUTH-001-04 | Run database migration for passkey table | US-001 | 30m |

---

## ⏸️ Blocked

| Task ID | Title | Blocked By | Story |
|---------|-------|------------|-------|
| AUTH-001-05 | Add rate limiting to passkey endpoints | AUTH-001-04 | US-001 |
| AUTH-002-01 | Install mobile passkey dependencies | AUTH-001-05 | US-002 |
| AUTH-002-02 | Configure passkeyClient in mobile auth-client | AUTH-002-01 | US-002 |
| AUTH-002-03 | Verify cookie prefix alignment | AUTH-002-02 | US-002 |
| AUTH-003-01 | Install web passkey dependency | AUTH-001-05 | US-003 |
| AUTH-003-02 | Configure passkeyClient in web auth-client | AUTH-003-01 | US-003 |
| AUTH-003-03 | Create passkey types for web | AUTH-003-02 | US-003 |
| AUTH-004-01 | Create usePasskeyAuth hook (mobile) | AUTH-002-03 | US-004 |
| AUTH-004-02 | Create BiometricPrompt component | AUTH-004-01 | US-004 |
| AUTH-004-03 | Add passkey types to commons | AUTH-004-01 | US-004 |
| AUTH-004-04 | Implement passkey registration flow | AUTH-004-03 | US-004 |
| AUTH-004-05 | Handle biometric unavailable fallback | AUTH-004-04 | US-004 |
| AUTH-004-06 | Add success haptic feedback on registration | AUTH-004-05 | US-004 |
| AUTH-005-01 | Create usePasskeyAuth hook (web) | AUTH-003-03 | US-005 |
| AUTH-005-02 | Create PasskeyButton component | AUTH-005-01 | US-005 |
| AUTH-005-03 | Implement web passkey registration flow | AUTH-005-02 | US-005 |
| AUTH-005-04 | Hide PasskeyButton on unsupported browsers | AUTH-005-03 | US-005 |
| AUTH-005-05 | Add success animation on registration | AUTH-005-04 | US-005 |
| AUTH-006-01 | Implement signInWithPasskey in hook | AUTH-004-06 | US-006 |
| AUTH-006-02 | Integrate passkey option into LoginForm | AUTH-006-01, AUTH-008-02 | US-006 |
| AUTH-006-03 | Add shake animation on passkey failure | AUTH-006-02 | US-006 |
| AUTH-006-04 | Add haptic feedback on successful sign-in | AUTH-006-03 | US-006 |
| AUTH-007-01 | Implement signInWithPasskey in web hook | AUTH-005-05 | US-007 |
| AUTH-007-02 | Implement Conditional UI with autocomplete | AUTH-007-01 | US-007 |
| AUTH-007-03 | Integrate passkey into web LoginForm | AUTH-007-02, AUTH-008-04 | US-007 |
| AUTH-007-04 | Add shake animation on web failure | AUTH-007-03 | US-007 |
| AUTH-009-01 | Add haptic success to all login methods | AUTH-006-04 | US-009 |
| AUTH-009-02 | Ensure no haptic on failure | AUTH-009-01 | US-009 |
| AUTH-010-04 | Handle network errors in passkey flows | AUTH-010-03 | US-010 |

---

## 🔄 In Progress

*None currently*

---

## ✅ Completed

| Task ID | Title | Story | Commit |
|---------|-------|-------|--------|
| AUTH-001-01 | Install passkey plugin dependency | US-001 | (earlier) |
| AUTH-001-02 | Configure passkey environment variables | US-001 | `c3fc02b` |
| AUTH-001-03 | Add passkey plugin to auth configuration | US-001 | `0f1cbe5` |
| AUTH-008-01 | Create useShakeAnimation hook (mobile) | US-008 | `cc6893c` |
| AUTH-008-02 | Integrate shake into mobile LoginForm | US-008 | `e9db408` |
| AUTH-008-03 | Create useShakeAnimation hook (web) | US-008 | `c4d4927` |
| AUTH-008-04 | Integrate shake into web LoginForm | US-008 | `df32d47` |
| AUTH-010-01 | Create NetworkErrorSheet component | US-010 | `4119ae6` |
| AUTH-010-02 | Create isNetworkError utility | US-010 | `17bd51a` |
| AUTH-010-03 | Integrate NetworkErrorSheet into LoginForm | US-010 | `7d3a657` |
| AUTH-011-01 | Create assetlinks.json for Android | US-011 | `da613c1` |
| AUTH-011-02 | Create apple-app-site-association for iOS | US-011 | `e7baf81` |
| AUTH-011-03 | Configure Express static file serving | US-011 | `867a5ab` |
| AUTH-012-01 | Add NSFaceIDUsageDescription to app.json | US-012 | `dfa5ea5` |
| AUTH-012-02 | Verify Face ID permission prompt | US-012 | `6f9c747` |
| AUTH-013-01 | Document environment variables | US-013 | `6beb0e9` |
| AUTH-013-02 | Add environment validation | US-013 | `a1289af` |

---

## Summary

| Status | Count |
|--------|-------|
| Ready | 1 |
| Blocked | 29 |
| In Progress | 0 |
| Completed | 17 |
| **Total** | **47** |
| **Progress** | **36.2%** |

---

## Critical Path

```
AUTH-001-04 → AUTH-001-05 → AUTH-002-01 → AUTH-004-01 → ... → AUTH-006-04
```

**Next on critical path:** AUTH-001-04 (Run database migration)

---

## Quick Commands

```bash
# Continue implementation
/agile:impl AUTH-001-04

# Check status
/agile:status

# View board
/agile:board passkey-auth
```
