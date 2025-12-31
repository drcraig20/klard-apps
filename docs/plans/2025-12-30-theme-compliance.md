# Theme Compliance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Achieve full light/dark theme compliance across klard-web (35% → 95%) and klard-mobile (89.5% → 98%) by replacing hardcoded colors with theme tokens.

**Architecture:** Replace hardcoded Tailwind classes (`text-slate-*`, `bg-slate-*`) with semantic theme tokens (`text-foreground`, `bg-muted`). For mobile, integrate all components with ThemeContext and remove duplicate color definitions.

**Tech Stack:** Tailwind CSS 4, CSS Variables, next-themes (web), React Context + SVA pattern (mobile)

---

## Priority Levels

| Level | Description | Impact |
|-------|-------------|--------|
| P0 | Critical - Breaks theme toggle | Affects >50% of UI |
| P1 | High - Major user-facing components | Affects 20-50% of UI |
| P2 | Medium - Secondary components | Affects <20% of UI |
| P3 | Low - Edge cases, technical debt | Minimal user impact |

---

# PHASE 1: CRITICAL INFRASTRUCTURE (P0)

## Task 1: Fix klard-web Form Field Styles (HIGHEST IMPACT)

**Why Critical:** This file defines base styles for ALL form inputs - InputField, PasswordInput, SearchInput, DatePicker, SelectField, etc. Fixing this one file improves ~85% of form theming.

**Files:**
- Modify: `klard-web/src/lib/form-field-styles.ts`

**Step 1: Read the current file to understand structure**

```bash
cat klard-web/src/lib/form-field-styles.ts
```

**Step 2: Replace hardcoded colors with theme tokens**

Replace these patterns:
| Current (Hardcoded) | Replace With (Theme Token) |
|---------------------|---------------------------|
| `text-slate-900 dark:text-slate-100` | `text-foreground` |
| `text-slate-700 dark:text-slate-300` | `text-foreground` |
| `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| `text-slate-400 dark:text-slate-500` | `text-muted-foreground` |
| `placeholder:text-slate-400 dark:placeholder:text-slate-500` | `placeholder:text-muted-foreground` |
| `bg-slate-50 dark:bg-slate-800` | `bg-muted` |
| `text-red-500` | `text-destructive` |
| `hover:text-slate-600 dark:hover:text-slate-400` | `hover:text-foreground` |

**Step 3: Run TypeScript check**

```bash
pnpm --filter klard-web exec tsc --noEmit
```
Expected: No type errors

**Step 4: Visual verification**

Open Storybook or dev server and verify form inputs look correct in both light and dark themes.

**Step 5: Commit**

```bash
git add klard-web/src/lib/form-field-styles.ts
git commit -m "fix(web): replace hardcoded colors in form-field-styles with theme tokens"
```

---

## Task 2: Fix klard-web Sonner Toast Component

**Why Critical:** All toast notifications use hardcoded colors that don't respect theme.

**Files:**
- Modify: `klard-web/src/components/ui/sonner.tsx`

**Step 1: Read the current file**

```bash
cat klard-web/src/components/ui/sonner.tsx
```

**Step 2: Replace hardcoded colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 20 | `border-slate-200 dark:border-slate-800` | `border-border` |
| 20 | `bg-white dark:bg-slate-950` | `bg-card` |
| 21 | `text-slate-900 dark:text-slate-50` | `text-card-foreground` |
| 22 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| 24 | `bg-slate-100 hover:bg-slate-200` | `bg-muted hover:bg-muted/80` |
| 24 | `dark:bg-slate-800 dark:hover:bg-slate-700` | (covered by above) |

**Step 3: Run TypeScript check**

```bash
pnpm --filter klard-web exec tsc --noEmit
```

**Step 4: Test toast in both themes**

Trigger a toast notification and verify it looks correct in light and dark mode.

**Step 5: Commit**

```bash
git add klard-web/src/components/ui/sonner.tsx
git commit -m "fix(web): replace hardcoded colors in sonner toast with theme tokens"
```

---

## Task 3: Fix klard-mobile OnboardingScreen Dark Theme Lock

**Why Critical:** OnboardingScreen is hardcoded to dark theme - ignores user preference entirely.

**Files:**
- Modify: `klard-mobile/src/components/onboarding/OnboardingScreen.tsx`

**Step 1: Read current implementation**

```bash
head -50 klard-mobile/src/components/onboarding/OnboardingScreen.tsx
```

Look for line 22: `import { darkTheme } from '@/styles/colors'`

**Step 2: Replace hardcoded import with useTheme hook**

Change:
```typescript
// BEFORE (line 22)
import { darkTheme } from '@/styles/colors';

// Line 24-25
// onboarding is always dark mode
const colors = { ...darkTheme, ...overrides };
```

To:
```typescript
// AFTER
import { useTheme } from '@/contexts/ThemeContext';

// Inside component
const { colors } = useTheme();
```

**Step 3: Remove the comment about "always dark mode"**

Delete the comment on line 24 that says "onboarding is always dark mode"

**Step 4: Run TypeScript check**

```bash
pnpm --filter klard-mobile exec tsc --noEmit
```

**Step 5: Test in both themes**

Open onboarding flow and toggle device theme - verify it responds to changes.

**Step 6: Commit**

```bash
git add klard-mobile/src/components/onboarding/OnboardingScreen.tsx
git commit -m "fix(mobile): remove hardcoded dark theme from OnboardingScreen, use ThemeContext"
```

---

## Task 4: Fix klard-mobile AlertBanner Duplicate Color System

**Why Critical:** AlertBanner defines 46 duplicate colors instead of using theme system.

**Files:**
- Modify: `klard-mobile/src/components/ui/AlertBanner/alert-banner.constants.ts`
- Modify: `klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx`

**Step 1: Read current constants**

```bash
cat klard-mobile/src/components/ui/AlertBanner/alert-banner.constants.ts
```

**Step 2: Replace hardcoded color objects with theme-aware function**

The file defines separate light/dark color objects. Replace with a function that takes theme colors:

```typescript
// BEFORE
export const ALERT_COLORS_LIGHT = {
  success: { bg: '#F0FDF4', border: '#22C55E', ... },
  error: { bg: '#FEF2F2', border: '#EF4444', ... },
  ...
};

// AFTER
export const getAlertColors = (colors: ThemeColors) => ({
  success: {
    bg: colors.successBackground,
    border: colors.success,
    icon: colors.success,
    text: colors.successForeground
  },
  error: {
    bg: colors.errorBackground,
    border: colors.error,
    icon: colors.error,
    text: colors.errorForeground
  },
  warning: {
    bg: colors.warningBackground,
    border: colors.warning,
    icon: colors.warning,
    text: colors.warningForeground
  },
  info: {
    bg: colors.infoBackground,
    border: colors.info,
    icon: colors.info,
    text: colors.infoForeground
  },
});
```

**Step 3: Update AlertBanner.tsx to use the function**

```typescript
// In AlertBanner.tsx
const { colors } = useTheme();
const alertColors = getAlertColors(colors);
const variantColors = alertColors[variant];
```

**Step 4: Run tests**

```bash
pnpm --filter klard-mobile test src/__tests__/components/ui/AlertBanner.test.tsx --run
```

**Step 5: Run TypeScript check**

```bash
pnpm --filter klard-mobile exec tsc --noEmit
```

**Step 6: Commit**

```bash
git add klard-mobile/src/components/ui/AlertBanner/
git commit -m "fix(mobile): replace AlertBanner hardcoded colors with theme-aware function"
```

---

# PHASE 2: HIGH-PRIORITY COMPONENTS (P1)

## Task 5: Fix klard-web Stepper Component

**Files:**
- Modify: `klard-web/src/components/ui/stepper.tsx`

**Step 1: Read current file and identify violations**

Lines with hardcoded colors: 37, 41, 42, 43, 118, 133, 147

**Step 2: Replace colors**

| Location | Current | Replace With |
|----------|---------|--------------|
| Line 37 | `bg-slate-200 dark:bg-slate-700` | `bg-muted` |
| Line 37 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| Line 41-43 | `text-slate-900 dark:text-slate-100` | `text-foreground` |
| Line 43 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| Line 118 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| Lines 133, 147 | `bg-slate-200 dark:bg-slate-700` | `bg-muted` |

**Step 3: Run TypeScript check**

```bash
pnpm --filter klard-web exec tsc --noEmit
```

**Step 4: Commit**

```bash
git add klard-web/src/components/ui/stepper.tsx
git commit -m "fix(web): replace hardcoded colors in stepper with theme tokens"
```

---

## Task 6: Fix klard-web Progress Bar Component

**Files:**
- Modify: `klard-web/src/components/ui/progress-bar.tsx`

**Step 1: Read file and identify violations**

Lines: 15-18, 52, 55, 64

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 15 | `bg-teal-600 dark:bg-teal-500` | `bg-primary` |
| 16 | `bg-green-600 dark:bg-green-500` | `bg-success` |
| 17 | `bg-amber-500 dark:bg-amber-400` | `bg-warning` |
| 18 | `bg-red-600 dark:bg-red-500` | `bg-destructive` |
| 52 | `text-slate-600 dark:text-slate-400` | `text-muted-foreground` |
| 55 | `text-slate-500 dark:text-slate-500` | `text-muted-foreground` |
| 64 | `bg-slate-200 dark:bg-slate-700` | `bg-muted` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/progress-bar.tsx
git commit -m "fix(web): replace hardcoded colors in progress-bar with theme tokens"
```

---

## Task 7: Fix klard-web Password Input Component

**Files:**
- Modify: `klard-web/src/components/ui/password-input.tsx`

**Step 1: Identify violations**

Lines: 58-60, 80, 90, 94, 125, 131, 180

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 58 | `bg-red-500` | `bg-destructive` |
| 59 | `bg-amber-500` | `bg-warning` |
| 60 | `bg-emerald-500` | `bg-success` |
| 80 | `bg-slate-200 dark:bg-slate-700` | `bg-muted` |
| 90 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| 94 | `text-slate-400 dark:text-slate-500` | `text-muted-foreground` |
| 125 | `text-emerald-600 dark:text-emerald-400` | `text-success` |
| 125 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| 131 | `text-slate-400` | `text-muted-foreground` |
| 180 | `text-red-500` | `text-destructive` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/password-input.tsx
git commit -m "fix(web): replace hardcoded colors in password-input with theme tokens"
```

---

## Task 8: Fix klard-web Slider Field Component

**Files:**
- Modify: `klard-web/src/components/ui/slider-field.tsx`

**Step 1: Identify violations**

Lines: 36, 39, 57, 58, 62, 66

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 36 | `text-slate-600 dark:text-slate-400` | `text-muted-foreground` |
| 39 | `text-slate-500 dark:text-slate-500` | `text-muted-foreground` |
| 57 | `bg-slate-200 dark:bg-slate-700` | `bg-muted` |
| 58 | `bg-teal-600 dark:bg-teal-500` | `bg-primary` |
| 62 | `border-teal-600 dark:border-teal-500` | `border-primary` |
| 66 | `dark:bg-slate-900 dark:ring-offset-slate-900` | `dark:bg-background dark:ring-offset-background` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/slider-field.tsx
git commit -m "fix(web): replace hardcoded colors in slider-field with theme tokens"
```

---

## Task 9: Fix klard-web Date Picker Component

**Files:**
- Modify: `klard-web/src/components/ui/date-picker.tsx`

**Step 1: Identify violations**

Lines: 106, 110, 132, 137, 155

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 106 | `text-slate-700 dark:text-slate-300` | `text-foreground` |
| 110 | `text-red-500` | `text-destructive` |
| 132 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| 137 | `text-slate-400` | `text-muted-foreground` |
| 155 | `text-red-500` | `text-destructive` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/date-picker.tsx
git commit -m "fix(web): replace hardcoded colors in date-picker with theme tokens"
```

---

## Task 10: Fix klard-web Form Field Component

**Files:**
- Modify: `klard-web/src/components/ui/form-field.tsx`

**Step 1: Identify violations**

Lines: 51, 55, 63, 68

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 51 | `text-slate-700 dark:text-slate-300` | `text-foreground` |
| 55 | `text-red-500` | `text-destructive` |
| 63 | `text-red-500` | `text-destructive` |
| 68 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/form-field.tsx
git commit -m "fix(web): replace hardcoded colors in form-field with theme tokens"
```

---

## Task 11: Fix klard-web Form Label Component

**Files:**
- Modify: `klard-web/src/components/ui/form-label.tsx`

**Step 1: Identify violations**

Lines: 12, 18

**Step 2: Replace colors**

| Line | Current | Replace With |
|------|---------|--------------|
| 12 | `text-slate-700 dark:text-slate-300` | `text-foreground` |
| 18 | `text-red-500` | `text-destructive` |

**Step 3: Run TypeScript check and commit**

```bash
pnpm --filter klard-web exec tsc --noEmit
git add klard-web/src/components/ui/form-label.tsx
git commit -m "fix(web): replace hardcoded colors in form-label with theme tokens"
```

---

## Task 12: Fix klard-mobile BurnerCardVisual Component

**Files:**
- Modify: `klard-mobile/src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx`
- Modify: `klard-mobile/src/components/ui/BurnerCardVisual/burner-card-visual.styles.ts`

**Step 1: Read both files**

```bash
cat klard-mobile/src/components/ui/BurnerCardVisual/BurnerCardVisual.tsx
cat klard-mobile/src/components/ui/BurnerCardVisual/burner-card-visual.styles.ts
```

**Step 2: In BurnerCardVisual.tsx, replace ternary colors (lines 81-86)**

Replace hardcoded rgba values with theme colors:

```typescript
// BEFORE
const textPrimaryColor = isAwaiting ? colors.foreground : '#FFFFFF';
const textSecondaryColor = isAwaiting ? colors.mutedForeground : 'rgba(255, 255, 255, 0.8)';

// AFTER - Add these to theme if not present:
const textPrimaryColor = isAwaiting ? colors.foreground : colors.cardTextPrimary;
const textSecondaryColor = isAwaiting ? colors.mutedForeground : colors.cardTextSecondary;
```

**Step 3: In styles file, remove hardcoded #FFFFFF defaults**

These are overridden at runtime anyway - remove the hardcoded values or replace with theme references.

**Step 4: Run tests**

```bash
pnpm --filter klard-mobile test src/__tests__/components/ui/BurnerCardVisual.test.tsx --run
```

**Step 5: Commit**

```bash
git add klard-mobile/src/components/ui/BurnerCardVisual/
git commit -m "fix(mobile): replace hardcoded colors in BurnerCardVisual with theme tokens"
```

---

## Task 13: Fix klard-mobile InputField Styles

**Files:**
- Modify: `klard-mobile/src/components/ui/InputField/input-field.styles.ts`

**Step 1: Read file**

```bash
cat klard-mobile/src/components/ui/InputField/input-field.styles.ts
```

**Step 2: Remove local color constants (lines 8-21)**

These duplicate theme values. Replace with direct theme references in the SVA styles.

**Step 3: Update SVA to use theme colors parameter**

```typescript
// BEFORE
const COLORS = {
  primary: '#0D7C7A',
  error: '#DC2626',
  // ...
};

// AFTER - remove COLORS constant, use colors from theme in SVA
```

**Step 4: Run tests and commit**

```bash
pnpm --filter klard-mobile test src/__tests__/components/ui/InputField.test.tsx --run
pnpm --filter klard-mobile exec tsc --noEmit
git add klard-mobile/src/components/ui/InputField/
git commit -m "fix(mobile): remove duplicate color definitions from InputField styles"
```

---

# PHASE 3: MEDIUM-PRIORITY COMPONENTS (P2)

## Task 14: Fix klard-web Input Field Component

**Files:**
- Modify: `klard-web/src/components/ui/input-field.tsx`

**Violations:** Lines 88, 145

| Line | Current | Replace With |
|------|---------|--------------|
| 88 | `text-red-500` | `text-destructive` |
| 145 | `text-slate-400 dark:text-slate-500` | `text-muted-foreground` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded colors in input-field with theme tokens"
```

---

## Task 15: Fix klard-web Search Input Component

**Files:**
- Modify: `klard-web/src/components/ui/search-input.tsx`

**Violations:** Line 116

| Line | Current | Replace With |
|------|---------|--------------|
| 116 | `text-slate-400 dark:text-slate-500` | `text-muted-foreground` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded icon color in search-input with theme token"
```

---

## Task 16: Fix klard-web Switch Field Component

**Files:**
- Modify: `klard-web/src/components/ui/switch-field.tsx`

**Violations:** Lines 49, 60

| Line | Current | Replace With |
|------|---------|--------------|
| 49 | `text-slate-900 dark:text-slate-100` | `text-foreground` |
| 60 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded colors in switch-field with theme tokens"
```

---

## Task 17: Fix klard-web Skeleton Component

**Files:**
- Modify: `klard-web/src/components/ui/skeleton.tsx`

**Violations:** Line 42

| Line | Current | Replace With |
|------|---------|--------------|
| 42 | `bg-slate-200/80 dark:bg-slate-700/60` | `bg-muted/80` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded color in skeleton with theme token"
```

---

## Task 18: Fix klard-web Spinner Component

**Files:**
- Modify: `klard-web/src/components/ui/spinner.tsx`

**Violations:** Line 31

| Line | Current | Replace With |
|------|---------|--------------|
| 31 | `text-slate-600 dark:text-slate-400` | `text-muted-foreground` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded color in spinner with theme token"
```

---

## Task 19: Fix klard-web Price Display Component

**Files:**
- Modify: `klard-web/src/components/ui/price-display/price-display.tsx`

**Violations:** Lines 56, 66, 67

| Line | Current | Replace With |
|------|---------|--------------|
| 56 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| 66 | `text-red-500 dark:text-red-400` | `text-destructive` |
| 67 | `text-green-500 dark:text-green-400` | `text-success` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded colors in price-display with theme tokens"
```

---

## Task 20: Fix klard-web Stat Card Constants

**Files:**
- Modify: `klard-web/src/components/ui/stat-card/stat-card.constants.ts`

**Violations:** Lines 6, 10, 14

| Line | Current | Replace With |
|------|---------|--------------|
| 6 | `text-green-600 dark:text-green-400` | `text-success` |
| 10 | `text-red-600 dark:text-red-400` | `text-destructive` |
| 14 | `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded colors in stat-card constants with theme tokens"
```

---

## Task 21: Fix klard-web Skeleton Presets

**Files:**
- Modify: `klard-web/src/components/ui/skeleton-presets.tsx`

**Violations:** Line 46

| Line | Current | Replace With |
|------|---------|--------------|
| 46 | `border-slate-200 dark:border-slate-700` | `border-border` |

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded border in skeleton-presets with theme token"
```

---

## Task 22: Integrate klard-mobile Illustrations with ThemeContext

**Files:**
- Modify: `klard-mobile/src/components/onboarding/illustrations/BurnerCardIllustration.tsx`
- Modify: `klard-mobile/src/components/onboarding/illustrations/ProtectIllustration.tsx`
- Modify: `klard-mobile/src/components/onboarding/illustrations/SaveIllustration.tsx`
- Modify: `klard-mobile/src/components/onboarding/illustrations/TrackIllustration.tsx`

**Step 1: For each illustration, replace manual theme prop with useTheme hook**

```typescript
// BEFORE
interface Props {
  theme?: 'light' | 'dark';
}

export const BurnerCardIllustration = ({ theme = 'dark' }: Props) => {
  const primaryColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';
  // ...
};

// AFTER
import { useTheme } from '@/contexts/ThemeContext';

export const BurnerCardIllustration = () => {
  const { colors, isDark } = useTheme();
  const primaryColor = colors.primary;
  // ...
};
```

**Step 2: Update all usages to remove theme prop**

Search for `<BurnerCardIllustration theme=` and remove the prop.

**Step 3: Commit**

```bash
git add klard-mobile/src/components/onboarding/illustrations/
git commit -m "fix(mobile): integrate onboarding illustrations with ThemeContext"
```

---

## Task 23: Fix klard-mobile Skeleton Shimmer Colors

**Files:**
- Modify: `klard-mobile/src/components/ui/Skeleton/skeleton.styles.ts`

**Violations:** Lines 31, 33

Replace hardcoded shimmer rgba with theme-aware colors.

**Commit:**
```bash
git commit -m "fix(mobile): replace hardcoded shimmer colors in skeleton with theme tokens"
```

---

# PHASE 4: SHADOW/RGBA TECHNICAL DEBT (P3)

## Task 24: Create CSS Variables for klard-web Shadow Colors

**Files:**
- Modify: `klard-web/src/styles/themes/light.css`
- Modify: `klard-web/src/styles/themes/dark.css`

**Step 1: Add shadow color variables**

```css
/* light.css */
--rec-shadow-color: 15 23 42; /* slate-900 RGB for shadows */
--rec-shadow-primary: 13 124 122; /* teal-700 RGB */
--rec-shadow-success: 5 150 105; /* green-600 RGB */
--rec-shadow-error: 220 38 38; /* red-600 RGB */

/* dark.css */
--rec-shadow-color: 0 0 0; /* black RGB for shadows */
--rec-shadow-primary: 21 181 176; /* teal-400 RGB */
--rec-shadow-success: 16 185 129; /* green-500 RGB */
--rec-shadow-error: 239 68 68; /* red-500 RGB */
```

**Step 2: Commit**

```bash
git add klard-web/src/styles/themes/
git commit -m "feat(web): add shadow color CSS variables to theme"
```

---

## Task 25: Update klard-web Empty State Shadows

**Files:**
- Modify: `klard-web/src/components/ui/empty-state/empty-state.styles.ts`

**Step 1: Replace hardcoded rgba shadows with CSS variable references**

```typescript
// BEFORE
shadow-[0_2px_12px_rgba(15,23,42,0.08)]

// AFTER
shadow-[0_2px_12px_rgb(var(--rec-shadow-color)/0.08)]
```

**Step 2: Commit**

```bash
git add klard-web/src/components/ui/empty-state/empty-state.styles.ts
git commit -m "fix(web): replace hardcoded shadows in empty-state with CSS variables"
```

---

## Task 26: Update klard-web Subscription Card Shadows

**Files:**
- Modify: `klard-web/src/components/ui/subscription-card/subscription-card.styles.ts`

Replace hardcoded rgba shadows with CSS variable references (same pattern as Task 25).

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded shadows in subscription-card with CSS variables"
```

---

## Task 27: Update klard-web Burner Card Visual Shadows

**Files:**
- Modify: `klard-web/src/components/ui/burner-card-visual.tsx`

Replace hardcoded rgba shadows (lines 39, 40, 44) with CSS variable references.

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded shadows in burner-card-visual with CSS variables"
```

---

## Task 28: Update klard-web Button Styles Shadows

**Files:**
- Modify: `klard-web/src/components/ui/button/button.styles.ts`

Replace hardcoded burn button shadow (line 23) with CSS variable reference.

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded shadow in button styles with CSS variable"
```

---

## Task 29: Update klard-web Protection Status Shadows

**Files:**
- Modify: `klard-web/src/components/ui/protection-status/protection-status.styles.ts`

Replace hardcoded shadows with CSS variable references.

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded shadows in protection-status with CSS variables"
```

---

## Task 30: Update klard-web Components.css Shadow

**Files:**
- Modify: `klard-web/src/styles/components.css`

Replace line 56 hardcoded shadow with CSS variable reference.

**Commit:**
```bash
git commit -m "fix(web): replace hardcoded shadow in components.css with CSS variable"
```

---

## Task 31: Fix klard-mobile BlockCelebration Shadows

**Files:**
- Modify: `klard-mobile/src/components/ui/BlockCelebration/block-celebration.styles.ts`

Replace hardcoded #0F172A and #FFFFFF colors (lines 28, 82, 184) with theme tokens.

**Commit:**
```bash
git commit -m "fix(mobile): replace hardcoded colors in block-celebration with theme tokens"
```

---

# PHASE 5: FINAL VERIFICATION

## Task 32: Run Full Test Suites

**Step 1: Run web tests**

```bash
pnpm --filter klard-web test --run
```

Expected: All tests pass

**Step 2: Run mobile tests**

```bash
pnpm --filter klard-mobile test --run
```

Expected: All tests pass

**Step 3: Run TypeScript checks**

```bash
pnpm --filter klard-web exec tsc --noEmit
pnpm --filter klard-mobile exec tsc --noEmit
```

Expected: No type errors

---

## Task 33: Visual QA in Both Themes

**Step 1: Start web dev server**

```bash
pnpm dev:web
```

**Step 2: Test light theme**
- Navigate through all major pages
- Check forms, buttons, cards, toasts
- Verify no hardcoded colors visible

**Step 3: Toggle to dark theme**
- Repeat navigation
- Verify all components properly switch
- Check shadows adapt appropriately

**Step 4: Start mobile dev server**

```bash
pnpm dev:mobile
```

**Step 5: Repeat theme testing on mobile**
- Test onboarding flow in both themes
- Verify illustrations respond to theme
- Check all components adapt

---

## Task 34: Create Final Commit for Theme Compliance

```bash
git add -A
git commit -m "chore: complete theme compliance audit - web 95%, mobile 98%"
```

---

# Summary

| Phase | Tasks | Priority | Estimated Effort |
|-------|-------|----------|------------------|
| Phase 1 | 1-4 | P0 Critical | 2 hours |
| Phase 2 | 5-13 | P1 High | 3 hours |
| Phase 3 | 14-23 | P2 Medium | 2 hours |
| Phase 4 | 24-31 | P3 Low | 2 hours |
| Phase 5 | 32-34 | Verification | 1 hour |

**Total: 34 tasks, ~10 hours estimated**

---

## Quick Reference: Theme Token Mappings

### klard-web (Tailwind)

| Hardcoded | Theme Token |
|-----------|-------------|
| `text-slate-900 dark:text-slate-100` | `text-foreground` |
| `text-slate-700 dark:text-slate-300` | `text-foreground` |
| `text-slate-500 dark:text-slate-400` | `text-muted-foreground` |
| `bg-slate-50 dark:bg-slate-800` | `bg-muted` |
| `bg-slate-200 dark:bg-slate-700` | `bg-muted` |
| `border-slate-200 dark:border-slate-800` | `border-border` |
| `text-red-500` | `text-destructive` |
| `bg-red-500` | `bg-destructive` |
| `text-green-500` | `text-success` |
| `bg-green-500` | `bg-success` |
| `text-amber-500` | `text-warning` |
| `bg-amber-500` | `bg-warning` |
| `bg-teal-600 dark:bg-teal-500` | `bg-primary` |
| `text-teal-600 dark:text-teal-500` | `text-primary` |

### klard-mobile (Theme Colors)

| Hardcoded | Theme Property |
|-----------|----------------|
| `#0F172A` | `colors.background` (dark) |
| `#FFFFFF` | `colors.background` (light) |
| `#0D7C7A` | `colors.primary` (light) |
| `#15B5B0` | `colors.primary` (dark) |
| `#DC2626` | `colors.error` |
| `#22C55E` | `colors.success` |
| `#F59E0B` | `colors.warning` |
| `rgba(100, 116, 139, *)` | `colors.border` with opacity |
| `rgba(255, 255, 255, *)` | `colors.primaryForeground` with opacity |
