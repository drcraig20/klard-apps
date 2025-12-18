# Face ID Permission Verification Checklist

**Task:** AUTH-012-02
**Date Created:** 2025-12-18
**Purpose:** Manual verification of iOS Face ID permission prompt

---

## Configuration Verified

The following configuration has been added to `klard-mobile/app.json`:

```json
"ios": {
  "infoPlist": {
    "NSFaceIDUsageDescription": "Klard uses Face ID for secure passwordless login"
  }
}
```

---

## Prerequisites

- iOS device or simulator with Face ID capability (iPhone X or later)
- Xcode installed
- Development environment set up

---

## Verification Steps

### 1. Build and Run on iOS

```bash
cd klard-mobile
pnpm ios
```

### 2. Trigger Face ID Permission Prompt

1. Navigate to the Login screen
2. Attempt to use passkey/biometric authentication
3. On first biometric use, iOS should display the permission prompt

### 3. Verify Permission Prompt

Check that:
- [ ] Permission prompt appears automatically on first biometric use
- [ ] Prompt displays the message: **"Klard uses Face ID for secure passwordless login"**
- [ ] Prompt shows "Don't Allow" and "OK" options

### 4. Test Permission Granted Scenario

1. Tap "OK" to grant permission
2. Verify:
   - [ ] Face ID authentication proceeds normally
   - [ ] Subsequent biometric requests work without showing the prompt again

### 5. Test Permission Denied Scenario

To test denial (if needed, reset permissions first):
1. Tap "Don't Allow" on the permission prompt
2. Verify:
   - [ ] App handles denial gracefully (no crash)
   - [ ] User sees appropriate fallback message or alternative auth method
   - [ ] App continues to function normally

### 6. Reset Permissions (Optional)

To re-test the permission prompt:
1. Go to iOS Settings → General → Reset → Reset Location & Privacy
2. Rebuild and run the app
3. Permission prompt should appear again on first biometric use

---

## Expected Results

| Criterion | Expected Behavior | Status |
|-----------|-------------------|--------|
| Permission prompt appears | Shows on first biometric use | ⬜ Pass / ⬜ Fail |
| Message matches configuration | "Klard uses Face ID for secure passwordless login" | ⬜ Pass / ⬜ Fail |
| Permission granted works | Face ID authentication proceeds | ⬜ Pass / ⬜ Fail |
| Permission denied handled | App shows fallback, no crash | ⬜ Pass / ⬜ Fail |

---

## Test Results

**Tested By:** _______________
**Date:** _______________
**Device/Simulator:** _______________
**iOS Version:** _______________

**Overall Result:** ⬜ Pass / ⬜ Fail

**Notes:**
```
_______________________________________________________________________________
_______________________________________________________________________________
_______________________________________________________________________________
```

---

## Troubleshooting

### Permission Prompt Doesn't Appear
- Ensure you're testing on a Face ID-capable device/simulator
- Check that `NSFaceIDUsageDescription` is in `app.json`
- Rebuild the app (`pnpm ios --clean`)

### Permission Already Granted
- Reset permissions via iOS Settings → General → Reset
- Or use a fresh simulator instance

### Face ID Not Available
- Verify simulator has Face ID enrolled (Features → Face ID → Enrolled)
- Check device settings for Face ID configuration
