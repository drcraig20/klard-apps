# ESLint Report - 2025-12-13

## Summary

| Package | Errors | Warnings | Total |
|---------|--------|----------|-------|
| **klard-web** | 5 | 200 | 205 |
| **klard-mobile** | 0 | 178 | 178 |
| **Total** | 5 | 378 | 383 |

---

## Critical Errors (Must Fix)

### klard-web (5 errors)

#### 1. `src/__tests__/components/ui/slider-field.test.tsx:28`
- **Rule:** `@typescript-eslint/ban-ts-comment`
- **Issue:** Use `@ts-expect-error` instead of `@ts-ignore`
- **Fix:**
```typescript
// Before
// @ts-ignore

// After
// @ts-expect-error - [reason for suppression]
```

#### 2. `src/__tests__/components/ui/toast.test.tsx:136`
- **Rule:** `@typescript-eslint/no-explicit-any`
- **Issue:** Unexpected `any` type
- **Fix:** Replace `any` with proper type annotation

#### 3. `src/app/dashboard/page.tsx:32`
- **Rule:** `react-hooks/rules-of-hooks`
- **Issue:** React Hook `useMemo` is called conditionally
- **Fix:** Move the `useMemo` call before any early returns

```typescript
// Before (BROKEN)
function Component() {
  if (condition) return null;
  const memoized = React.useMemo(() => ..., []);  // ERROR: after return
}

// After (CORRECT)
function Component() {
  const memoized = React.useMemo(() => ..., []);  // Before any returns
  if (condition) return null;
}
```

---

## Warnings by Category

### 1. Read-Only Props (`@typescript-eslint/prefer-readonly-parameter-types`)

**Count:** ~280 warnings across both packages

**What it means:** Function parameters should be typed as readonly to enforce immutability.

**How to fix:**

```typescript
// Option 1: Wrap entire props type with Readonly
interface ButtonProps {
  items: string[];
  onClick: () => void;
}

// Before
function Button({ items, onClick }: ButtonProps) { ... }

// After
function Button({ items, onClick }: Readonly<ButtonProps>) { ... }
```

```typescript
// Option 2: Make interface properties readonly
interface ButtonProps {
  readonly items: readonly string[];
  readonly onClick: () => void;
}
```

**Affected files (klard-web):**
- `src/app/(auth)/layout.tsx:3`
- `src/app/layout.tsx:45`
- `src/app/onboarding/add-subscription/page.tsx:32,69,103,107`
- `src/components/auth/login-form.tsx:61`
- `src/components/auth/magic-link-success.tsx:11`
- `src/components/auth/signup-form.tsx:58`
- `src/components/auth/social-buttons.tsx:21`
- `src/components/onboarding/burnercard-tutorial.tsx:41,194`
- `src/components/onboarding/service-grid.tsx:17,21,32,74`
- `src/components/onboarding/subscription-form.tsx:53,71,213,239,262,286`
- `src/components/ui/**/*.tsx` (most UI components)
- `src/lib/utils.ts:4`
- `src/stores/subscription-store.ts:11,27`

**Affected files (klard-mobile):**
- `src/app/(tabs)/_layout.tsx:15`
- `src/app/(tabs)/dashboard.tsx:79`
- `src/components/auth/**/*.tsx` (all auth components)
- `src/components/onboarding/**/*.tsx` (all onboarding components)
- `src/components/ui/**/*.tsx` (all UI components)
- `src/lib/i18n/index.ts:22`
- `src/stores/subscriptionStore.ts:9,19`
- `src/styles/sva.ts:51,62,100,103`

---

### 2. Unused Variables (`@typescript-eslint/no-unused-vars`)

**Count:** ~60 warnings

**How to fix:**

```typescript
// Option 1: Remove unused variable
const { getByText } = render(<Component />);

// Option 2: Prefix with underscore (if intentionally unused)
const { getByText, _unused } = render(<Component />);

// Option 3: Remove unused import
// Before
import { useState, useEffect, useCallback } from 'react';
// After (if useCallback not used)
import { useState, useEffect } from 'react';
```

**Common patterns found:**
- Unused destructured variables from `render()` in tests
- Unused React import (React 17+ doesn't require it for JSX)
- Unused function parameters

**Affected files (klard-web):**
- `src/__tests__/components/onboarding/service-grid.test.tsx:18,64`
- `src/__tests__/components/onboarding/subscription-form.test.tsx:248,469`
- `src/__tests__/components/ui/segmented-control.test.tsx:217,218`
- `src/__tests__/components/ui/switch.test.tsx:17`
- `src/components/onboarding/burnercard-tutorial.tsx:6`
- `src/components/onboarding/illustrations/burnercard-illustration.tsx:9,10,12`
- `src/components/ui/subscription-card/subscription-card.tsx:37`

**Affected files (klard-mobile):**
- `src/__tests__/components/onboarding/OnboardingScreen.test.tsx:2,83,94,122`
- `src/__tests__/components/onboarding/SubscriptionForm.test.tsx:491`
- `src/__tests__/components/ui/*.test.tsx` (many test files with unused React import)
- `src/app/onboarding.tsx:15`
- `src/components/onboarding/BurnerCardTutorial.tsx:40,84`
- `src/components/onboarding/illustrations/ProtectIllustration.tsx:18`
- `src/components/onboarding/illustrations/TrackIllustration.tsx:2`
- `src/components/ui/BottomSheet/bottom-sheet.styles.ts:22`
- `src/components/ui/SubscriptionCard/SubscriptionCard.tsx:53`

---

### 3. Explicit Any (`@typescript-eslint/no-explicit-any`)

**Count:** ~25 warnings

**How to fix:**

```typescript
// Before
const handleError = (error: any) => { ... }

// After - Use unknown for truly unknown types
const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

// After - Use specific type if known
const handleError = (error: Error) => { ... }
```

**Affected files (klard-web):**
- `src/__tests__/components/ui/toast.test.tsx:136`

**Affected files (klard-mobile):**
- `src/__tests__/components/ui/AlertCard.test.tsx:21`
- `src/__tests__/components/ui/BottomSheet.test.tsx:31,32,72,78`
- `src/__tests__/components/ui/BurnerCardVisual.test.tsx:13`
- `src/__tests__/components/ui/DatePicker.test.tsx:41,42,49,62,66`
- `src/__tests__/components/ui/SubscriptionCard.test.tsx:26`
- `src/__tests__/components/ui/Toast.test.tsx:231`
- `src/components/ui/BottomSheet/BottomSheet.tsx:71`
- `src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx:113`
- `src/components/ui/CurrencyInput/CurrencyInput.tsx:75,80`
- `src/components/ui/DatePicker/DatePicker.tsx:26,27,28`
- `src/components/ui/InputField/InputField.tsx:73,78`

---

### 4. Other Warnings

#### React Hooks Exhaustive Deps
- `klard-mobile/src/components/ui/Tooltip/Tooltip.tsx:82` - Missing dependency `hideTooltip`

#### Next.js Image Optimization
- `klard-web/src/__tests__/components/ui/empty-state.test.tsx:75` - Use `<Image />` from `next/image`

---

## Recommended Fix Priority

| Priority | Category | Count | Effort | Approach |
|----------|----------|-------|--------|----------|
| P0 | Errors | 5 | Low | Fix immediately - breaks lint CI |
| P1 | Unused vars | ~60 | Low | Quick cleanup pass |
| P2 | Explicit any | ~25 | Medium | Add proper types |
| P3 | Readonly props | ~280 | High | Gradual adoption or disable |

---

## Quick Fix Commands

### Fix unused React imports (klard-mobile tests)
Many test files have `import React from 'react'` that's unused. With React 17+ JSX transform, this import is not needed.

### Disable readonly rule temporarily
If the readonly warnings are too noisy during development:

```javascript
// In eslint.config.mjs, change warn to off:
'@typescript-eslint/prefer-readonly-parameter-types': 'off',
```

---

## Files with Most Issues

### klard-web
1. `src/components/onboarding/subscription-form.tsx` - 6 readonly warnings
2. `src/components/ui/tabs/tabs.tsx` - 5 readonly warnings
3. `src/components/onboarding/service-grid.tsx` - 4 readonly warnings
4. `src/app/onboarding/add-subscription/page.tsx` - 4 readonly warnings

### klard-mobile
1. `src/components/onboarding/SubscriptionForm.tsx` - 7 readonly warnings
2. `src/components/onboarding/OnboardingScreen.tsx` - 4 readonly warnings
3. `src/components/onboarding/ServiceGrid.tsx` - 4 readonly warnings
4. `src/components/ui/error-boundary/ErrorBoundary.tsx` - 4 readonly warnings
5. `src/__tests__/hooks/useDebounce.test.ts` - 4 readonly warnings

---

## Next Steps

1. **Immediate:** Fix the 5 errors in klard-web
2. **Short-term:** Clean up unused variables (~60 issues)
3. **Medium-term:** Replace `any` types with proper types (~25 issues)
4. **Long-term:** Decide on readonly props strategy:
   - Option A: Gradually fix as you touch files
   - Option B: Dedicated cleanup sprint
   - Option C: Disable rule until ready