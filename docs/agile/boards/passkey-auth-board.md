# Passkey Auth - Task Board

> **Last Updated:** 2025-12-17
> **Tasks Document:** [`../tasks/2025-12-17-passkey-auth-tasks.md`](../tasks/2025-12-17-passkey-auth-tasks.md)

---

## 📋 Ready (No Dependencies)

| Task ID | Title | Story | Est. |
|---------|-------|-------|------|
| AUTH-001-01 | Install passkey plugin dependency | US-001 | 15m |
| AUTH-008-01 | Create useShakeAnimation hook (mobile) | US-008 | 1.5h |
| AUTH-008-03 | Create useShakeAnimation hook (web) | US-008 | 1h |
| AUTH-010-01 | Create NetworkErrorSheet component | US-010 | 2h |
| AUTH-010-02 | Create isNetworkError utility | US-010 | 30m |
| AUTH-011-01 | Create assetlinks.json for Android | US-011 | 30m |
| AUTH-011-02 | Create apple-app-site-association for iOS | US-011 | 30m |
| AUTH-012-01 | Add NSFaceIDUsageDescription to app.json | US-012 | 30m |
| AUTH-013-01 | Document environment variables | US-013 | 30m |

---

## ⏸️ Blocked

| Task ID | Title | Blocked By | Story |
|---------|-------|------------|-------|
| AUTH-001-02 | Configure passkey environment variables | AUTH-001-01 | US-001 |
| AUTH-001-03 | Add passkey plugin to auth configuration | AUTH-001-02 | US-001 |
| AUTH-001-04 | Run database migration for passkey table | AUTH-001-03 | US-001 |
| AUTH-001-05 | Add rate limiting to passkey endpoints | AUTH-001-04 | US-001 |
| AUTH-002-01 | Install mobile passkey dependencies | AUTH-001-05 | US-002 |
| AUTH-002-02 | Configure passkeyClient in mobile auth-client | AUTH-002-01 | US-002 |
| AUTH-002-03 | Verify cookie prefix alignment | AUTH-002-02 | US-002 |
| AUTH-003-01 | Install web passkey dependency | AUTH-001-05 | US-003 |
| AUTH-003-02 | Configure passkeyClient in web auth-client | AUTH-003-01 | US-003 |
| AUTH-003-03 | Create passkey types for web | AUTH-003-02 | US-003 |
| AUTH-004-01 | Create usePasskeyAuth hook (mobile) | AUTH-002-03 | US-004 |
| AUTH-005-01 | Create usePasskeyAuth hook (web) | AUTH-003-03 | US-005 |
| *...and 25 more* | | | |

---

## 🔄 In Progress

*None yet - run `/agile:impl AUTH-001-01` to start*

---

## ✅ Completed

*None yet*

---

## Summary

| Status | Count |
|--------|-------|
| Ready | 9 |
| Blocked | 38 |
| In Progress | 0 |
| Completed | 0 |
| **Total** | **47** |

---

## Critical Path

```
AUTH-001-01 → AUTH-001-02 → AUTH-001-03 → AUTH-001-04 → AUTH-001-05
                                                          ↓
                                              AUTH-002-01 → AUTH-004-01 → ... → AUTH-006-04
```

**Estimated Critical Path Duration:** ~6 days

---

## Quick Commands

```bash
# Start first task
/agile:impl AUTH-001-01

# Check status
/agile:status

# View board
/agile:board passkey-auth
```