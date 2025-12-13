# SoC & DRY Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor all Klard UI components to follow Separation of Concerns (SoC) and DRY principles, using the ProgressBar component as the reference pattern.

**Architecture:** Extract inline StyleSheet definitions to separate `.styles.ts` files, convert single-file components to folder structure, create shared style utilities for web, and decompose oversized components.

**Tech Stack:** React Native (mobile), Next.js + Tailwind CSS (web), TypeScript, CVA (class-variance-authority)

---

## Reference Pattern

The ProgressBar component demonstrates the ideal structure:

```
ComponentName/
├── ComponentName.tsx           # Logic, state, JSX only - NO StyleSheet.create
├── component-name.styles.ts    # All StyleSheet.create definitions
└── index.ts                    # Clean exports of component and types
```

---

## Phase 1: Web Infrastructure (DRY Foundation)

### Task 1.1: Create Shared Form Field Styles Module

**Files:**
- Create: `klard-web/src/lib/form-field-styles.ts`

**Step 1: Create the shared styles module**

```typescript
import { cva } from 'class-variance-authority';

/**
 * Shared form field styles to eliminate DRY violations across form components.
 * Used by: input-field, password-input, select-field, currency-input, search-input
 */

export const inputFieldVariants = cva(
  [
    'w-full h-12 px-4 text-base',
    'bg-white dark:bg-slate-900',
    'text-slate-900 dark:text-slate-100',
    'border rounded-xl',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
  ],
  {
    variants: {
      hasError: {
        true: 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
        false: 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800',
        false: '',
      },
      hasLeftIcon: {
        true: 'pl-11',
        false: '',
      },
      hasRightIcon: {
        true: 'pr-11',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
      disabled: false,
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  }
);

export const labelStyles = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2';

export const errorStyles = 'mt-2 text-sm text-red-500';

export const helperTextStyles = 'mt-2 text-sm text-slate-500 dark:text-slate-400';

export const iconButtonStyles = [
  'absolute right-3 top-1/2 -translate-y-1/2',
  'text-slate-400 hover:text-slate-600',
  'dark:text-slate-500 dark:hover:text-slate-300',
  'transition-colors p-1 rounded',
  'focus:outline-none focus:ring-2 focus:ring-primary/30',
].join(' ');

export const leftIconStyles = [
  'absolute left-3 top-1/2 -translate-y-1/2',
  'text-slate-400 dark:text-slate-500',
  'pointer-events-none',
].join(' ');

export const inputContainerStyles = 'relative';

export type InputFieldVariantProps = {
  hasError?: boolean;
  disabled?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
};
```

**Step 2: Verify TypeScript compilation**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-web exec tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add klard-web/src/lib/form-field-styles.ts
git commit -m "feat(web): add shared form field styles module for DRY compliance"
```

---

## Phase 2: Mobile Folder Component Fixes (1 violation)

### Task 2.1: Fix Avatar Inline Styles

**Files:**
- Modify: `klard-mobile/src/components/ui/Avatar/Avatar.tsx`
- Modify: `klard-mobile/src/components/ui/Avatar/avatar.styles.ts`

**Step 1: Read current files to understand structure**

Read both Avatar.tsx and avatar.styles.ts to understand current implementation.

**Step 2: Add style generator function to avatar.styles.ts**

Add to `klard-mobile/src/components/ui/Avatar/avatar.styles.ts`:

```typescript
import { StyleSheet, type ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackText: {
    fontWeight: '600',
  },
});

// Style generator for dynamic container styles
export function getContainerStyle(
  dimension: number,
  borderRadius: number,
  backgroundColor: string
): ViewStyle {
  return {
    width: dimension,
    height: dimension,
    borderRadius,
    backgroundColor,
  };
}
```

**Step 3: Update Avatar.tsx to use style generator**

In `klard-mobile/src/components/ui/Avatar/Avatar.tsx`, replace the inline StyleSheet.flatten with:

```typescript
import { styles, getContainerStyle } from './avatar.styles';

// Inside component, replace lines 57-66 with:
const dynamicContainerStyle = getContainerStyle(dimension, borderRadius, colors.muted);
const containerStyle = StyleSheet.flatten([styles.container, dynamicContainerStyle, style]);
```

**Step 4: Run tests**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/components/ui/Avatar.test.tsx --run`
Expected: All tests pass

**Step 5: Verify TypeScript**

Run: `pnpm --filter klard-mobile exec tsc --noEmit`
Expected: No errors

**Step 6: Commit**

```bash
git add klard-mobile/src/components/ui/Avatar/
git commit -m "refactor(mobile): extract Avatar inline styles to styles file"
```

---

## Phase 3: Mobile Single-File to Folder Structure (Critical - 10 components)

### Task 3.1: Refactor PasswordInput (377 lines - LARGEST)

**Files:**
- Create: `klard-mobile/src/components/ui/PasswordInput/PasswordInput.tsx`
- Create: `klard-mobile/src/components/ui/PasswordInput/password-input.styles.ts`
- Create: `klard-mobile/src/components/ui/PasswordInput/password-input.constants.ts`
- Create: `klard-mobile/src/components/ui/PasswordInput/index.ts`
- Delete: `klard-mobile/src/components/ui/PasswordInput.tsx`

**Step 1: Create folder structure**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/PasswordInput
```

**Step 2: Create constants file**

Create `klard-mobile/src/components/ui/PasswordInput/password-input.constants.ts`:

```typescript
export const PASSWORD_REQUIREMENTS = [
  { key: 'minLength', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { key: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { key: 'number', label: 'One number', test: (p: string) => /\d/.test(p) },
  { key: 'special', label: 'One special character', test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
] as const;

export type PasswordRequirementKey = typeof PASSWORD_REQUIREMENTS[number]['key'];
```

**Step 3: Create styles file**

Create `klard-mobile/src/components/ui/PasswordInput/password-input.styles.ts`:

```typescript
import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 48,
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export const strengthStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  barContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export const requirementsStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
});
```

**Step 4: Create component file**

Create `klard-mobile/src/components/ui/PasswordInput/PasswordInput.tsx` by:
1. Reading the original file
2. Moving all component code (without StyleSheet.create blocks)
3. Importing styles from `./password-input.styles`
4. Importing constants from `./password-input.constants`

The component should import:
```typescript
import { inputStyles, strengthStyles, requirementsStyles } from './password-input.styles';
import { PASSWORD_REQUIREMENTS } from './password-input.constants';
```

**Step 5: Create index.ts**

Create `klard-mobile/src/components/ui/PasswordInput/index.ts`:

```typescript
export { PasswordInput, type PasswordInputProps } from './PasswordInput';
export { PASSWORD_REQUIREMENTS, type PasswordRequirementKey } from './password-input.constants';
```

**Step 6: Delete original file**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/PasswordInput.tsx
```

**Step 7: Update parent index.ts exports**

In `klard-mobile/src/components/ui/index.ts`, the export should already work if it uses:
```typescript
export * from './PasswordInput';
```

**Step 8: Run tests**

Run: `pnpm --filter klard-mobile test --run`
Expected: All tests pass

**Step 9: Commit**

```bash
git add klard-mobile/src/components/ui/PasswordInput/
git add klard-mobile/src/components/ui/index.ts
git commit -m "refactor(mobile): extract PasswordInput to folder structure with SoC"
```

---

### Task 3.2: Refactor SelectField (293 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/SelectField/SelectField.tsx`
- Create: `klard-mobile/src/components/ui/SelectField/select-field.styles.ts`
- Create: `klard-mobile/src/components/ui/SelectField/index.ts`
- Delete: `klard-mobile/src/components/ui/SelectField.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/SelectField
```

**Step 2: Read original file**

Read `klard-mobile/src/components/ui/SelectField.tsx` to extract styles (lines 179-293).

**Step 3: Create styles file**

Extract all StyleSheet.create content and color constants to `select-field.styles.ts`.

**Step 4: Create component file**

Move component logic to `SelectField.tsx`, importing styles.

**Step 5: Create index.ts**

```typescript
export { SelectField, type SelectFieldProps, type SelectOption } from './SelectField';
```

**Step 6: Delete original and test**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/SelectField.tsx
pnpm --filter klard-mobile test --run
```

**Step 7: Commit**

```bash
git add klard-mobile/src/components/ui/SelectField/
git commit -m "refactor(mobile): extract SelectField to folder structure with SoC"
```

---

### Task 3.3: Refactor InputField (290 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/InputField/InputField.tsx`
- Create: `klard-mobile/src/components/ui/InputField/input-field.styles.ts`
- Create: `klard-mobile/src/components/ui/InputField/input-field.constants.ts`
- Create: `klard-mobile/src/components/ui/InputField/index.ts`
- Delete: `klard-mobile/src/components/ui/InputField.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/InputField
```

**Step 2: Create constants file**

Extract `keyboardTypeMap` and `autoCapitalizeMap` to `input-field.constants.ts`:

```typescript
import type { KeyboardTypeOptions } from 'react-native';

export const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
  text: 'default',
  email: 'email-address',
  phone: 'phone-pad',
  number: 'numeric',
  decimal: 'decimal-pad',
  url: 'url',
};

export const autoCapitalizeMap: Record<string, 'none' | 'sentences' | 'words' | 'characters'> = {
  text: 'sentences',
  email: 'none',
  phone: 'none',
  number: 'none',
  decimal: 'none',
  url: 'none',
};
```

**Step 3: Create styles file**

Extract StyleSheet and color constants to `input-field.styles.ts`.

**Step 4: Create component and index files**

Follow same pattern as PasswordInput.

**Step 5: Test and commit**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/InputField.tsx
pnpm --filter klard-mobile test --run
git add klard-mobile/src/components/ui/InputField/
git commit -m "refactor(mobile): extract InputField to folder structure with SoC"
```

---

### Task 3.4: Refactor SubscriptionCard (259 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/SubscriptionCard/SubscriptionCard.tsx`
- Create: `klard-mobile/src/components/ui/SubscriptionCard/subscription-card.styles.ts`
- Create: `klard-mobile/src/components/ui/SubscriptionCard/subscription-card.constants.ts`
- Create: `klard-mobile/src/components/ui/SubscriptionCard/index.ts`
- Delete: `klard-mobile/src/components/ui/SubscriptionCard.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/SubscriptionCard
```

**Step 2: Create constants file**

Extract `statusConfig` and `billingCycleLabels`:

```typescript
export const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  paused: { label: 'Paused', variant: 'warning' as const },
  cancelled: { label: 'Cancelled', variant: 'error' as const },
  expired: { label: 'Expired', variant: 'default' as const },
};

export const billingCycleLabels = {
  weekly: '/week',
  monthly: '/month',
  quarterly: '/quarter',
  yearly: '/year',
};
```

**Step 3-5: Create styles, component, index files**

Follow same pattern. Extract all StyleSheet.create to styles file.

**Step 6: Test and commit**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/SubscriptionCard.tsx
pnpm --filter klard-mobile test --run
git add klard-mobile/src/components/ui/SubscriptionCard/
git commit -m "refactor(mobile): extract SubscriptionCard to folder structure with SoC"
```

---

### Task 3.5: Refactor DatePicker (249 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/DatePicker/DatePicker.tsx`
- Create: `klard-mobile/src/components/ui/DatePicker/date-picker.styles.ts`
- Create: `klard-mobile/src/components/ui/DatePicker/date-picker.utils.ts`
- Create: `klard-mobile/src/components/ui/DatePicker/index.ts`
- Delete: `klard-mobile/src/components/ui/DatePicker.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/DatePicker
```

**Step 2: Create utils file**

Extract helper functions:

```typescript
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export function getDisplayedComponents(
  mode: 'date' | 'time' | 'datetime'
): { date: boolean; time: boolean } {
  return {
    date: mode === 'date' || mode === 'datetime',
    time: mode === 'time' || mode === 'datetime',
  };
}
```

**Step 3-5: Create styles, component, index files**

Follow same pattern.

**Step 6: Test and commit**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/DatePicker.tsx
pnpm --filter klard-mobile test --run
git add klard-mobile/src/components/ui/DatePicker/
git commit -m "refactor(mobile): extract DatePicker to folder structure with SoC"
```

---

### Task 3.6: Refactor CurrencyInput (230 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/CurrencyInput/CurrencyInput.tsx`
- Create: `klard-mobile/src/components/ui/CurrencyInput/currency-input.styles.ts`
- Create: `klard-mobile/src/components/ui/CurrencyInput/currency-input.utils.ts`
- Create: `klard-mobile/src/components/ui/CurrencyInput/index.ts`
- Delete: `klard-mobile/src/components/ui/CurrencyInput.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/CurrencyInput
```

**Step 2: Create utils file**

Extract parsing and formatting functions:

```typescript
export function parseCurrencyValue(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function clampValue(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined) result = Math.max(result, min);
  if (max !== undefined) result = Math.min(result, max);
  return result;
}

export function formatValue(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
```

**Step 3-5: Create styles, component, index files**

**Step 6: Test and commit**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/CurrencyInput.tsx
pnpm --filter klard-mobile test --run
git add klard-mobile/src/components/ui/CurrencyInput/
git commit -m "refactor(mobile): extract CurrencyInput to folder structure with SoC"
```

---

### Task 3.7: Refactor SearchInput (212 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/SearchInput/SearchInput.tsx`
- Create: `klard-mobile/src/components/ui/SearchInput/search-input.styles.ts`
- Create: `klard-mobile/src/components/ui/SearchInput/index.ts`
- Delete: `klard-mobile/src/components/ui/SearchInput.tsx`

Follow same pattern. Extract styles (lines 160-212).

**Commit message:** `refactor(mobile): extract SearchInput to folder structure with SoC`

---

### Task 3.8: Refactor AlertBanner (205 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx`
- Create: `klard-mobile/src/components/ui/AlertBanner/alert-banner.styles.ts`
- Create: `klard-mobile/src/components/ui/AlertBanner/alert-banner.constants.ts`
- Create: `klard-mobile/src/components/ui/AlertBanner/index.ts`
- Delete: `klard-mobile/src/components/ui/AlertBanner.tsx`

Extract 3 StyleSheet.create blocks and color constants.

**Commit message:** `refactor(mobile): extract AlertBanner to folder structure with SoC`

---

### Task 3.9: Refactor Tooltip (198 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Tooltip/Tooltip.tsx`
- Create: `klard-mobile/src/components/ui/Tooltip/tooltip.styles.ts`
- Create: `klard-mobile/src/components/ui/Tooltip/index.ts`
- Delete: `klard-mobile/src/components/ui/Tooltip.tsx`

**Commit message:** `refactor(mobile): extract Tooltip to folder structure with SoC`

---

### Task 3.10: Refactor StatCard (198 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/StatCard/StatCard.tsx`
- Create: `klard-mobile/src/components/ui/StatCard/stat-card.styles.ts`
- Create: `klard-mobile/src/components/ui/StatCard/stat-card.constants.ts`
- Create: `klard-mobile/src/components/ui/StatCard/index.ts`
- Delete: `klard-mobile/src/components/ui/StatCard.tsx`

Extract `trendConfig` and `sizeConfig` constants.

**Commit message:** `refactor(mobile): extract StatCard to folder structure with SoC`

---

## Phase 4: Mobile Single-File to Folder Structure (Medium Priority - 11 components)

### Task 4.1: Refactor Modal (191 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Modal/Modal.tsx`
- Create: `klard-mobile/src/components/ui/Modal/modal.styles.ts`
- Create: `klard-mobile/src/components/ui/Modal/index.ts`
- Delete: `klard-mobile/src/components/ui/Modal.tsx`

**Commit message:** `refactor(mobile): extract Modal to folder structure with SoC`

---

### Task 4.2: Refactor SegmentedControl (181 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx`
- Create: `klard-mobile/src/components/ui/SegmentedControl/segmented-control.styles.ts`
- Create: `klard-mobile/src/components/ui/SegmentedControl/index.ts`
- Delete: `klard-mobile/src/components/ui/SegmentedControl.tsx`

Has 2 StyleSheet.create blocks (styles + sizeStyles).

**Commit message:** `refactor(mobile): extract SegmentedControl to folder structure with SoC`

---

### Task 4.3: Refactor Button (180 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Button/Button.tsx`
- Create: `klard-mobile/src/components/ui/Button/button.styles.ts`
- Create: `klard-mobile/src/components/ui/Button/index.ts`
- Delete: `klard-mobile/src/components/ui/Button.tsx`

Has 4 StyleSheet.create blocks.

**Commit message:** `refactor(mobile): extract Button to folder structure with SoC`

---

### Task 4.4: Refactor Switch (172 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Switch/Switch.tsx`
- Create: `klard-mobile/src/components/ui/Switch/switch.styles.ts`
- Create: `klard-mobile/src/components/ui/Switch/index.ts`
- Delete: `klard-mobile/src/components/ui/Switch.tsx`

Contains 2 components (Switch and SwitchField) - keep both in same file for now.

**Commit message:** `refactor(mobile): extract Switch to folder structure with SoC`

---

### Task 4.5: Refactor ToastConfig (172 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/ToastConfig/ToastConfig.tsx`
- Create: `klard-mobile/src/components/ui/ToastConfig/toast-config.styles.ts`
- Create: `klard-mobile/src/components/ui/ToastConfig/toast-config.constants.ts`
- Create: `klard-mobile/src/components/ui/ToastConfig/index.ts`
- Delete: `klard-mobile/src/components/ui/ToastConfig.tsx`

Extract color constants (lines 7-32) and icon mapping.

**Commit message:** `refactor(mobile): extract ToastConfig to folder structure with SoC`

---

### Task 4.6: Refactor PriceDisplay (165 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/PriceDisplay/PriceDisplay.tsx`
- Create: `klard-mobile/src/components/ui/PriceDisplay/price-display.styles.ts`
- Create: `klard-mobile/src/components/ui/PriceDisplay/price-display.constants.ts`
- Create: `klard-mobile/src/components/ui/PriceDisplay/index.ts`
- Delete: `klard-mobile/src/components/ui/PriceDisplay.tsx`

Has 4 StyleSheet.create blocks and multiple constants.

**Commit message:** `refactor(mobile): extract PriceDisplay to folder structure with SoC`

---

### Task 4.7: Refactor Badge (151 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Badge/Badge.tsx`
- Create: `klard-mobile/src/components/ui/Badge/badge.styles.ts`
- Create: `klard-mobile/src/components/ui/Badge/index.ts`
- Delete: `klard-mobile/src/components/ui/Badge.tsx`

Has 4 StyleSheet.create blocks.

**Commit message:** `refactor(mobile): extract Badge to folder structure with SoC`

---

### Task 4.8: Refactor TabBar (142 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/TabBar/TabBar.tsx`
- Create: `klard-mobile/src/components/ui/TabBar/tab-bar.styles.ts`
- Create: `klard-mobile/src/components/ui/TabBar/index.ts`
- Delete: `klard-mobile/src/components/ui/TabBar.tsx`

**Commit message:** `refactor(mobile): extract TabBar to folder structure with SoC`

---

### Task 4.9: Refactor EmptyState (136 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/EmptyState/EmptyState.tsx`
- Create: `klard-mobile/src/components/ui/EmptyState/empty-state.styles.ts`
- Create: `klard-mobile/src/components/ui/EmptyState/empty-state.constants.ts`
- Create: `klard-mobile/src/components/ui/EmptyState/index.ts`
- Delete: `klard-mobile/src/components/ui/EmptyState.tsx`

Extract illustrations map constant.

**Commit message:** `refactor(mobile): extract EmptyState to folder structure with SoC`

---

### Task 4.10: Refactor Card (128 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/Card/Card.tsx`
- Create: `klard-mobile/src/components/ui/Card/card.styles.ts`
- Create: `klard-mobile/src/components/ui/Card/index.ts`
- Delete: `klard-mobile/src/components/ui/Card.tsx`

Has 3 StyleSheet.create blocks.

**Commit message:** `refactor(mobile): extract Card to folder structure with SoC`

---

### Task 4.11: Refactor FormField (98 lines)

**Files:**
- Create: `klard-mobile/src/components/ui/FormField/FormField.tsx`
- Create: `klard-mobile/src/components/ui/FormField/form-field.styles.ts`
- Create: `klard-mobile/src/components/ui/FormField/index.ts`
- Delete: `klard-mobile/src/components/ui/FormField.tsx`

Close to threshold but has inline colors.

**Commit message:** `refactor(mobile): extract FormField to folder structure with SoC`

---

## Phase 5: Web Sidebar Decomposition

### Task 5.1: Create Sidebar Folder Structure

**Files:**
- Create: `klard-web/src/components/ui/sidebar/index.tsx` (re-exports)
- Create: `klard-web/src/components/ui/sidebar/sidebar-provider.tsx`
- Create: `klard-web/src/components/ui/sidebar/sidebar-core.tsx`
- Create: `klard-web/src/components/ui/sidebar/sidebar-menu.tsx`
- Create: `klard-web/src/components/ui/sidebar/sidebar-types.ts`
- Delete: `klard-web/src/components/ui/sidebar.tsx`

**Step 1: Create folder**

```bash
mkdir -p /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/sidebar
```

**Step 2: Create types file**

Create `sidebar-types.ts` with shared types and constants.

**Step 3: Create provider file**

Extract `SidebarProvider`, `useSidebar` hook, and context to `sidebar-provider.tsx`.

**Step 4: Create core file**

Extract `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarContent`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator` to `sidebar-core.tsx`.

**Step 5: Create menu file**

Extract `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton` to `sidebar-menu.tsx`.

**Step 6: Create index re-exports**

```typescript
// sidebar/index.tsx
export * from './sidebar-provider';
export * from './sidebar-core';
export * from './sidebar-menu';
export type * from './sidebar-types';
```

**Step 7: Update parent index.ts**

In `klard-web/src/components/ui/index.ts`, update:
```typescript
export * from './sidebar';
```

**Step 8: Delete original and test**

```bash
rm /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/sidebar.tsx
pnpm --filter klard-web build
pnpm --filter klard-web test --run
```

**Step 9: Commit**

```bash
git add klard-web/src/components/ui/sidebar/
git add klard-web/src/components/ui/index.ts
git commit -m "refactor(web): decompose sidebar.tsx (727 lines) into modular folder structure"
```

---

## Phase 6: Web Form Components DRY Refactoring

### Task 6.1: Refactor input-field.tsx to use shared styles

**Files:**
- Modify: `klard-web/src/components/ui/input-field.tsx`

**Step 1: Update imports**

Add at top of file:
```typescript
import {
  inputFieldVariants,
  labelStyles,
  errorStyles,
  helperTextStyles,
  iconButtonStyles,
  leftIconStyles,
  inputContainerStyles,
} from '@/lib/form-field-styles';
```

**Step 2: Replace inline Tailwind classes**

Replace repeated input classes with `inputFieldVariants({ hasError: !!error, disabled, hasLeftIcon: !!leftIcon, hasRightIcon: !!rightIcon || type === 'password' })`.

**Step 3: Test**

```bash
pnpm --filter klard-web build
pnpm --filter klard-web test --run
```

**Step 4: Commit**

```bash
git add klard-web/src/components/ui/input-field.tsx
git commit -m "refactor(web): use shared form-field-styles in input-field"
```

---

### Task 6.2: Refactor password-input.tsx to use shared styles

Same pattern as Task 6.1.

**Commit message:** `refactor(web): use shared form-field-styles in password-input`

---

### Task 6.3: Refactor select-field.tsx to use shared styles

Same pattern as Task 6.1.

**Commit message:** `refactor(web): use shared form-field-styles in select-field`

---

### Task 6.4: Refactor currency-input.tsx to use shared styles

Same pattern as Task 6.1.

**Commit message:** `refactor(web): use shared form-field-styles in currency-input`

---

### Task 6.5: Refactor search-input.tsx to use shared styles

Same pattern as Task 6.1.

**Commit message:** `refactor(web): use shared form-field-styles in search-input`

---

## Phase 7: Final Verification

### Task 7.0: SoC/DRY Compliance Verification (CRITICAL)

**Purpose:** Re-audit all components against the original findings to verify violations are resolved.

**Files to verify:**
- All mobile component folders in `klard-mobile/src/components/ui/`
- All web components in `klard-web/src/components/ui/`
- Shared styles module `klard-web/src/lib/form-field-styles.ts`

---

#### Step 1: Verify Mobile Folder Structure Compliance

**Command:**
```bash
# List all UI component directories (should all be folders now)
ls -la /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/
```

**Expected:**
- NO `.tsx` files in root (except index.ts)
- ALL components should be folders with structure: `ComponentName/index.ts`

**Checklist - Original 21 single-file violations must now be folders:**

| Component | Must Be Folder | Has styles.ts | Has index.ts |
|-----------|----------------|---------------|--------------|
| AlertBanner | ☐ | ☐ | ☐ |
| Badge | ☐ | ☐ | ☐ |
| Button | ☐ | ☐ | ☐ |
| Card | ☐ | ☐ | ☐ |
| CurrencyInput | ☐ | ☐ | ☐ |
| DatePicker | ☐ | ☐ | ☐ |
| EmptyState | ☐ | ☐ | ☐ |
| FormField | ☐ | ☐ | ☐ |
| InputField | ☐ | ☐ | ☐ |
| Modal | ☐ | ☐ | ☐ |
| PasswordInput | ☐ | ☐ | ☐ |
| PriceDisplay | ☐ | ☐ | ☐ |
| SearchInput | ☐ | ☐ | ☐ |
| SegmentedControl | ☐ | ☐ | ☐ |
| SelectField | ☐ | ☐ | ☐ |
| StatCard | ☐ | ☐ | ☐ |
| SubscriptionCard | ☐ | ☐ | ☐ |
| Switch | ☐ | ☐ | ☐ |
| TabBar | ☐ | ☐ | ☐ |
| ToastConfig | ☐ | ☐ | ☐ |
| Tooltip | ☐ | ☐ | ☐ |

---

#### Step 2: Verify NO Inline StyleSheet.create in Mobile Components

**Command:**
```bash
# Search for StyleSheet.create in component .tsx files (should only be in .styles.ts)
grep -r "StyleSheet.create" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/ --include="*.tsx" | grep -v ".styles.ts"
```

**Expected:** Empty output (no matches)

**If violations found:** List file:line for each and mark as FAIL

---

#### Step 3: Verify Avatar Inline Styles Fixed

**Command:**
```bash
# Check Avatar.tsx for StyleSheet.flatten with inline object literals
grep -n "StyleSheet.flatten" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile/src/components/ui/Avatar/Avatar.tsx
```

**Expected:**
- Should use `getContainerStyle()` from styles file
- NO inline `{ width: dimension, height: dimension, ... }` objects

---

#### Step 4: Verify Web Sidebar Decomposition

**Command:**
```bash
# Verify sidebar is now a folder with multiple files
ls -la /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/sidebar/
```

**Expected:**
- `index.tsx` (re-exports)
- `sidebar-provider.tsx`
- `sidebar-core.tsx`
- `sidebar-menu.tsx`
- `sidebar-types.ts`

**Verify original file deleted:**
```bash
ls /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/sidebar.tsx 2>&1
```

**Expected:** "No such file or directory"

---

#### Step 5: Verify Web Shared Styles Module Exists

**Command:**
```bash
# Check shared styles module exists and has expected exports
head -50 /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/lib/form-field-styles.ts
```

**Expected exports:**
- `inputFieldVariants` (CVA function)
- `labelStyles`
- `errorStyles`
- `helperTextStyles`
- `iconButtonStyles`
- `leftIconStyles`
- `inputContainerStyles`

---

#### Step 6: Verify Web Form Components Use Shared Styles

**Commands:**
```bash
# Check each form component imports from shared styles
grep -l "form-field-styles" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/input-field.tsx
grep -l "form-field-styles" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/password-input.tsx
grep -l "form-field-styles" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/select-field.tsx
grep -l "form-field-styles" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/currency-input.tsx
grep -l "form-field-styles" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/search-input.tsx
```

**Expected:** Each grep returns the file path (5 total)

---

#### Step 7: Verify NO Repeated Tailwind Patterns (DRY)

**Command:**
```bash
# Count occurrences of the original repeated pattern (should be in shared module only)
grep -r "w-full h-12 px-4 text-base" /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-web/src/components/ui/ --include="*.tsx" | wc -l
```

**Expected:** 0 or 1 (only in shared module, not in components)

---

#### Step 8: Generate Compliance Report

**Output format:**
```
=== SoC/DRY COMPLIANCE REPORT ===

MOBILE FOLDER STRUCTURE: PASS/FAIL
- Single-file components remaining: [count]
- Components with inline StyleSheet: [list]

MOBILE AVATAR FIX: PASS/FAIL
- Inline styles in Avatar.tsx: YES/NO

WEB SIDEBAR DECOMPOSITION: PASS/FAIL
- Files created: [count]/5
- Original deleted: YES/NO

WEB SHARED STYLES: PASS/FAIL
- Module exists: YES/NO
- Components using shared styles: [count]/5

WEB DRY COMPLIANCE: PASS/FAIL
- Repeated patterns found: [count]

OVERALL: PASS/FAIL
```

**Action if FAIL:**
- List specific violations
- Do NOT proceed to Task 7.1 until all checks pass
- Return to relevant phase to fix issues

---

### Task 7.1: Run Full Test Suite

**Step 1: Run mobile tests**

```bash
pnpm --filter klard-mobile test --run
```
Expected: All tests pass

**Step 2: Run web tests**

```bash
pnpm --filter klard-web test --run
```
Expected: All tests pass

**Step 3: Run TypeScript check**

```bash
pnpm --filter klard-mobile exec tsc --noEmit
pnpm --filter klard-web exec tsc --noEmit
```
Expected: No errors

**Step 4: Run build**

```bash
pnpm build
```
Expected: Build succeeds

---

### Task 7.2: Update UI Index Exports

**Files:**
- Modify: `klard-mobile/src/components/ui/index.ts`

Ensure all new folder exports are properly included:

```typescript
// Folder-structured components
export * from './AlertBanner';
export * from './AlertCard';
export * from './Avatar';
export * from './Badge';
export * from './BottomSheet';
export * from './BurnerCardVisual';
export * from './Button';
export * from './Card';
export * from './CheckboxField';
export * from './CurrencyInput';
export * from './DatePicker';
export * from './EmptyState';
export * from './FormField';
export * from './InputField';
export * from './Modal';
export * from './PasswordInput';
export * from './PriceDisplay';
export * from './ProgressBar';
export * from './SearchInput';
export * from './SegmentedControl';
export * from './SelectField';
export * from './ServiceLogo';
export * from './Skeleton';
export * from './SliderField';
export * from './Spinner';
export * from './StatCard';
export * from './StatusBadge';
export * from './Stepper';
export * from './SubscriptionCard';
export * from './Switch';
export * from './TabBar';
export * from './Toast';
export * from './ToastConfig';
export * from './Tooltip';
```

---

### Task 7.3: Final Commit

```bash
git add .
git commit -m "chore: complete SoC/DRY refactoring for all UI components"
```

---

## Summary

| Phase | Tasks | Components |
|-------|-------|------------|
| Phase 1 | 1 | Web shared styles infrastructure |
| Phase 2 | 1 | Mobile folder fix (Avatar) |
| Phase 3 | 10 | Mobile critical single-file (200+ lines) |
| Phase 4 | 11 | Mobile medium single-file (100-200 lines) |
| Phase 5 | 1 | Web sidebar decomposition |
| Phase 6 | 5 | Web form components DRY |
| Phase 7 | 4 | Verification (incl. SoC/DRY compliance audit) |

**Total Tasks:** 33
**Estimated Time:** 4-6 hours with parallel execution

---

## Execution Notes

- Each task is independent within its phase
- Phases 3 and 4 can be parallelized (multiple agents per component)
- Always run tests after each component refactor
- Commit frequently to enable easy rollback