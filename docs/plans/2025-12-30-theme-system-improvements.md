# Theme System Improvements - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Date:** 2025-12-30
**Goal:** Unify style architecture across web and mobile, fix SOLID violations, align token values
**Architecture:** Incremental refactoring with verification at each step
**Tech Stack:** Tailwind CSS 4, CVA, SVA, React Native, next-themes

---

## Executive Summary

This plan addresses **seven priority areas** identified in deep cross-platform analysis:

1. **Align Token Values** (CRITICAL - breaks visual consistency)
2. **Remove hardcoded colors** (DIP violation - highest impact)
3. **Standardize variant naming** across platforms
4. **Standardize file/folder naming** across platforms
5. **Split globals.css** into organized files (web organization)
6. **Add ThemeContext** for programmatic theme control (mobile enhancement)
7. **Create token documentation**

### Critical Discrepancies Found

| Token | Web Value | Mobile Value | Impact |
|-------|-----------|--------------|--------|
| `radius.md` | 16px | 12px | Cards/buttons differ by 4px |
| `button.md` height | 36px | 40px | Buttons differ by 4px |
| `duration.default` | "default" | "normal" | Name mismatch |
| Folder naming | `button/` | `Button/` | Developer confusion |
| Component files | `button.tsx` | `Button.tsx` | Case sensitivity issues |

### SOLID Principles Applied

| Principle | Application |
|-----------|-------------|
| **SRP** | Each token file has single responsibility |
| **OCP** | Extend variants via config, not by modifying component internals |
| **DIP** | Components depend on CSS variable abstractions, not hardcoded values |

---

## Task Group 0: Align Token Values (CRITICAL)

**Priority:** CRITICAL - Visual consistency across platforms
**Impact:** Without this, web and mobile will look visually different

### Task 0.1: Align Radius Token Values

**Files to Modify:**
- `klard-web/src/app/globals.css`
- `klard-mobile/src/styles/tokens/radius.ts`

**Time Estimate:** 10 minutes

**Current State:**

| Token | Web (CSS) | Mobile (TS) | Decision |
|-------|-----------|-------------|----------|
| `sm` | 8px | 8 | ✅ Aligned |
| `md` | 16px | 12 | Use **12px** (mobile) |
| `lg` | 24px | 16 | Use **16px** (mobile) |
| `xl` | 24px | 24 | ✅ Aligned |
| `2xl` | 32px | 32 | ✅ Aligned |
| `default` | 12px | 12 (md) | ✅ Aligned |

**Instructions (Web):**
1. Open `klard-web/src/app/globals.css`
2. Find radius token section (around line 7-26)
3. Update values:
   ```css
   --rec-radius-sm: 8px;    /* unchanged */
   --rec-radius-md: 12px;   /* was 16px, now matches mobile */
   --rec-radius-lg: 16px;   /* was 24px, now matches mobile */
   --rec-radius-xl: 24px;   /* unchanged */
   --rec-radius-2xl: 32px;  /* unchanged */
   --rec-radius-default: var(--rec-radius-md); /* 12px */
   ```

**Why:** Mobile structure is more granular (8→12→16→24→32), web was skipping 12 and 16.

**Verification:**
1. Run `pnpm dev:web`
2. Check button and card corners - should appear slightly less rounded
3. Compare with mobile visually

**Rollback:** `git checkout klard-web/src/app/globals.css`

**Commit Message:** `fix(klard-web): align radius tokens with mobile values`

---

### Task 0.2: Align Button Size Heights

**Files to Modify:**
- `klard-web/src/components/ui/button/button.styles.ts`

**Time Estimate:** 5 minutes

**Current State:**

| Size | Web Height | Mobile Height | Decision |
|------|------------|---------------|----------|
| `sm` | 32px (h-8) | 32px | ✅ Aligned |
| `md` | 36px (h-9) | 40px | Use **40px** (mobile) |
| `lg` | 48px (h-12) | 48px | ✅ Aligned |

**Instructions:**
1. Open `klard-web/src/components/ui/button/button.styles.ts`
2. Find the `size` variants (around line 27-34)
3. Update `default` and `md` sizes:
   ```typescript
   size: {
     default: "h-10 px-4 py-2 has-[>svg]:px-3",  // was h-9
     md: "h-10 px-4 py-2 has-[>svg]:px-3",       // was h-9
     sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
     lg: "h-12 rounded-[var(--radius-default)] px-8 has-[>svg]:px-4",
     icon: "size-10",      // was size-9
     "icon-sm": "size-8",
     "icon-lg": "size-10",
   },
   ```

**Why:** 40px (h-10) provides better touch targets and matches mobile.

**Verification:**
1. Check button heights in browser dev tools
2. Compare with mobile buttons

**Commit Message:** `fix(klard-web): align button heights with mobile (40px default)`

---

### Task 0.3: Align Animation Duration Naming

**Files to Modify:**
- `klard-web/src/app/globals.css`

**Time Estimate:** 5 minutes

**Current State:**

| Web Name | Mobile Name | Value | Decision |
|----------|-------------|-------|----------|
| `duration-default` | `duration.normal` | 200ms | Use **normal** |

**Instructions:**
1. Open `klard-web/src/app/globals.css`
2. Find animation duration section (around line 49-65)
3. Add `normal` as primary name, keep `default` as alias:
   ```css
   --rec-animate-duration-normal: 200ms;
   --rec-animate-duration-default: var(--rec-animate-duration-normal); /* alias */
   ```

4. Update the `@theme inline` block to expose `normal`:
   ```css
   --animate-duration-normal: var(--rec-animate-duration-normal);
   ```

**Why:** "normal" is more descriptive than "default" and matches mobile naming.

**Verification:**
1. Ensure animations still work
2. Test theme switching transitions

**Commit Message:** `fix(klard-web): rename duration-default to duration-normal for consistency`

---

## Task Group 1: Remove Hardcoded Colors (Web)

**Priority:** HIGHEST - DIP Violation
**Impact:** Fixes dependency on concrete values, enables theme switching to work properly

### Task 1.1: Audit and Document All Hardcoded Colors

**Files to Modify:** None (audit only)
**Time Estimate:** 10 minutes

**Instructions:**
1. Open terminal and run grep to identify all hardcoded Tailwind color classes in styles files:
   ```bash
   grep -r "hsl\|bg-slate\|bg-teal\|bg-green\|bg-amber\|bg-red\|bg-blue\|text-slate\|text-teal\|text-green\|text-amber\|text-red" klard-web/src/components/ui/**/*.styles.ts
   ```
2. Document each file and the specific hardcoded values found
3. Create a mapping of hardcoded value to semantic CSS variable

**Hardcoded Colors Identified (from analysis):**

| File | Hardcoded Pattern | Semantic Replacement |
|------|-------------------|---------------------|
| `button.styles.ts` | `hsl(173,79%,27%)` | `var(--rec-color-primary)` |
| `badge.styles.ts` | `bg-slate-100`, `bg-teal-100`, `bg-green-100`, `bg-amber-100`, `bg-red-100` | `bg-muted`, `bg-primary/10`, `bg-success/10`, `bg-warning/10`, `bg-error/10` |
| `health-indicator.styles.ts` | `text-red-600`, `text-amber-600`, `text-green-600` | `text-error`, `text-warning`, `text-success` |
| `alert-card.styles.ts` | `bg-blue-50`, `bg-amber-50`, `bg-red-50` | Custom CSS variables |
| `segmented-control.styles.ts` | `bg-slate-100`, `text-teal-700` | `bg-muted`, `text-primary` |
| `tabs.styles.ts` | `bg-slate-100`, `text-slate-500` | `bg-muted`, `text-muted-foreground` |

**Verification:**
- Grep output shows all files with hardcoded patterns
- Mapping document complete

**Commit Message:** `chore(klard-web): audit hardcoded colors in component styles`

---

### Task 1.2: Add Missing Semantic Color Classes to globals.css

**File to Modify:** `klard-web/src/app/globals.css`
**Time Estimate:** 10 minutes

**Instructions:**
1. Open `globals.css`
2. Locate the light theme section (`:root` block, around line 116)
3. Add info color tokens:
   ```css
   --rec-color-info: #3B82F6;
   --rec-color-info-foreground: #FFFFFF;
   ```

4. Locate the dark theme section (`[data-theme="dark"]` block, around line 263)
5. Add info color tokens for dark:
   ```css
   --rec-color-info: #60A5FA;
   --rec-color-info-foreground: #FFFFFF;
   ```

6. Locate the `@theme inline` block (around line 405)
7. Add info color mappings:
   ```css
   --color-info: var(--rec-color-info);
   --color-info-foreground: var(--rec-color-info-foreground);
   ```

8. Locate the `@layer utilities` section (around line 614)
9. Add muted color utility classes:
   ```css
   .bg-info-muted {
     background-color: color-mix(in srgb, var(--rec-color-info) 10%, transparent);
   }
   .bg-success-muted {
     background-color: color-mix(in srgb, var(--rec-color-success) 10%, transparent);
   }
   .bg-warning-muted {
     background-color: color-mix(in srgb, var(--rec-color-warning) 10%, transparent);
   }
   .bg-error-muted {
     background-color: color-mix(in srgb, var(--rec-color-error) 10%, transparent);
   }
   ```

**Why (DIP):** Components should depend on semantic abstractions like `bg-success-muted` rather than concrete values like `bg-green-100`.

**Verification:**
1. Run `pnpm dev:web`
2. Inspect browser dev tools - confirm new CSS variables are defined in `:root`
3. Test applying `bg-success-muted` class in browser console

**Rollback:** Revert the globals.css changes using git

**Commit Message:** `feat(klard-web): add semantic muted color utility classes`

---

### Task 1.3: Refactor button.styles.ts - Remove HSL Hardcoding

**File to Modify:** `klard-web/src/components/ui/button/button.styles.ts`
**Time Estimate:** 10 minutes

**Instructions:**
1. Open `button.styles.ts`
2. Locate the `klard` variant (line 21)
3. Find this hardcoded pattern:
   ```
   "bg-gradient-to-br from-[hsl(173,79%,27%)] to-[hsl(173,79%,20%)] dark:from-[hsl(176,78%,39%)] dark:to-[hsl(173,79%,27%)]..."
   ```

4. Replace the entire `klard` variant value with:
   ```
   "bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/70 text-white font-semibold shadow-[var(--rec-glow-primary)] hover:scale-[1.02] hover:shadow-glow-primary active:scale-[0.98]"
   ```

5. The hover shadow references are simplified because `shadow-glow-primary` utility already exists in globals.css

**Why (DIP):** The button component now depends on the `primary` color abstraction, not concrete HSL values.

**Verification:**
1. Run `pnpm dev:web`
2. Navigate to any page with a Klard button
3. Toggle dark/light theme - button gradient should update correctly
4. Hover over button - glow effect should work

**Rollback:** `git checkout klard-web/src/components/ui/button/button.styles.ts`

**Commit Message:** `refactor(klard-web): replace hardcoded HSL with CSS variables in button`

---

### Task 1.4: Refactor badge.styles.ts - Use Semantic Colors

**File to Modify:** `klard-web/src/components/ui/badge/badge.styles.ts`
**Time Estimate:** 15 minutes

**Instructions:**
1. Open `badge.styles.ts`
2. Find each variant in the `variant` object and replace:

**Line 9 (default variant):**
- Find: `bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300`
- Replace with: `bg-muted text-muted-foreground`

**Line 11 (primary variant):**
- Find: `bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300`
- Replace with: `bg-primary/10 text-primary dark:bg-primary/20`

**Line 13 (success variant):**
- Find: `bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`
- Replace with: `bg-success/10 text-success dark:bg-success/20`

**Line 15 (warning variant):**
- Find: `bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300`
- Replace with: `bg-warning/10 text-warning dark:bg-warning/20`

**Line 17 (error variant):**
- Find: `bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300`
- Replace with: `bg-error/10 text-error dark:bg-error/20`

**Line 19 (outline variant):**
- Find: `bg-transparent border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400`
- Replace with: `bg-transparent border border-border text-muted-foreground`

3. Keep any glow shadows using existing variables (`shadow-glow-primary`, etc.)

**Why (DIP):** Badge now depends on semantic color tokens that respond to theme changes.

**Verification:**
1. Run `pnpm dev:web`
2. If Storybook available: `pnpm storybook` and check Badge stories
3. Toggle dark/light theme - all badge variants should adapt

**Rollback:** `git checkout klard-web/src/components/ui/badge/badge.styles.ts`

**Commit Message:** `refactor(klard-web): replace hardcoded colors with semantic tokens in badge`

---

### Task 1.5: Refactor health-indicator.styles.ts

**File to Modify:** `klard-web/src/components/ui/health-indicator/health-indicator.styles.ts`
**Time Estimate:** 10 minutes

**Instructions:**
1. Open `health-indicator.styles.ts`
2. Find `healthIndicatorVariants` status variants (around lines 17-19)

**Replace status text colors:**
| Status | Find | Replace with |
|--------|------|--------------|
| forgotten | `text-red-600 dark:text-red-400` | `text-error` |
| price-increased | `text-amber-600 dark:text-amber-400` | `text-warning` |
| healthy | `text-green-600 dark:text-green-400` | `text-success` |

3. Find `healthIndicatorDotVariants` (around lines 39-43)

**Replace dot background colors:**
| Status | Find | Replace with |
|--------|------|--------------|
| forgotten | `bg-red-500 dark:bg-red-400 shadow-[0_0_8px_rgba(220,38,38,0.5)]...` | `bg-error shadow-glow-error` |
| price-increased | `bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(217,119,6,0.5)]...` | `bg-warning shadow-glow-warning` |
| healthy | `bg-green-500 dark:bg-green-400 shadow-[0_0_8px_rgba(5,150,105,0.5)]...` | `bg-success shadow-glow-success` |

**Why (DIP):** Uses semantic color abstractions that adapt to theme.

**Verification:**
1. Check HealthIndicator component in app or Storybook
2. Toggle theme - colors should adapt correctly

**Rollback:** `git checkout klard-web/src/components/ui/health-indicator/health-indicator.styles.ts`

**Commit Message:** `refactor(klard-web): use semantic colors in health-indicator`

---

### Task 1.6: Refactor alert-card.styles.ts

**File to Modify:** `klard-web/src/components/ui/alert-card/alert-card.styles.ts`
**Time Estimate:** 10 minutes

**Instructions:**
1. Open `alert-card.styles.ts`
2. Find variant definitions (around lines 8-11)

**Replace variant colors:**

| Variant | Find | Replace with |
|---------|------|--------------|
| info | `border-blue-200 bg-blue-50/50 dark:border-blue-900/40 dark:bg-blue-950/20` | `border-info/20 bg-info/5 dark:border-info/30 dark:bg-info/10` |
| warning | `border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20` | `border-warning/20 bg-warning/5 dark:border-warning/30 dark:bg-warning/10` |
| error | `border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20` | `border-error/20 bg-error/5 dark:border-error/30 dark:bg-error/10` |

**Note:** This requires the `--color-info` variable added in Task 1.2.

**Verification:**
1. Test AlertCard component with each variant
2. Verify colors adapt to theme changes

**Rollback:** `git checkout klard-web/src/components/ui/alert-card/alert-card.styles.ts`

**Commit Message:** `refactor(klard-web): use semantic colors in alert-card`

---

### Task 1.7: Refactor tabs.styles.ts and segmented-control.styles.ts

**Files to Modify:**
- `klard-web/src/components/ui/tabs/tabs.styles.ts`
- `klard-web/src/components/ui/segmented-control/segmented-control.styles.ts`

**Time Estimate:** 10 minutes

**Instructions for tabs.styles.ts:**
1. Open `tabs.styles.ts`
2. Find and replace:
   - `bg-slate-100` → `bg-muted`
   - `text-slate-500` → `text-muted-foreground`
   - `dark:ring-offset-slate-950` → `dark:ring-offset-background`
   - `dark:data-[state=active]:bg-slate-700` → `dark:data-[state=active]:bg-card`

**Instructions for segmented-control.styles.ts:**
1. Open `segmented-control.styles.ts`
2. Find and replace:
   - `bg-slate-100 dark:bg-slate-800` → `bg-muted`
   - `text-teal-700` → `text-primary`
   - `dark:bg-slate-950` → `dark:bg-background`
   - `dark:text-teal-400` → `dark:text-primary`

**Verification:**
1. Test Tabs and SegmentedControl components
2. Toggle theme - should adapt correctly

**Commit Message:** `refactor(klard-web): use semantic colors in tabs and segmented-control`

---

### Task 1.8: Refactor Mobile Badge Styles (DIP Violation)

**File to Modify:** `klard-mobile/src/components/ui/Badge/badge.styles.ts`
**Time Estimate:** 15 minutes

**Context7 Reference:** Check SVA pattern in mobile Button component first

**Instructions:**
1. First, read the existing Button SVA pattern:
   - Open `klard-mobile/src/components/ui/Button/button.styles.ts`
   - Note how it uses `sva()` with `(colors) => ({ ... })` pattern

2. Open `klard-mobile/src/components/ui/Badge/badge.styles.ts`
3. The file currently uses `StyleSheet.create` with hardcoded hex colors
4. Refactor to use the SVA pattern:

**Replace the entire file structure to match this pattern:**
```typescript
import { sva } from '@/styles/sva';
import type { ThemeColors } from '@/styles';

export const badgeContainerStyles = sva({
  base: (colors: ThemeColors) => ({
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  }),
  variants: {
    variant: {
      default: (colors: ThemeColors) => ({
        backgroundColor: colors.muted,
      }),
      primary: (colors: ThemeColors) => ({
        backgroundColor: colors.primaryBackground,
      }),
      success: (colors: ThemeColors) => ({
        backgroundColor: colors.successBackground,
      }),
      warning: (colors: ThemeColors) => ({
        backgroundColor: colors.warningBackground,
      }),
      error: (colors: ThemeColors) => ({
        backgroundColor: colors.errorBackground,
      }),
    },
  },
});

export const badgeTextStyles = sva({
  base: (colors: ThemeColors) => ({
    fontSize: 12,
    fontWeight: '500',
  }),
  variants: {
    variant: {
      default: (colors: ThemeColors) => ({
        color: colors.mutedForeground,
      }),
      primary: (colors: ThemeColors) => ({
        color: colors.primary,
      }),
      success: (colors: ThemeColors) => ({
        color: colors.success,
      }),
      warning: (colors: ThemeColors) => ({
        color: colors.warning,
      }),
      error: (colors: ThemeColors) => ({
        color: colors.error,
      }),
    },
  },
});
```

5. Update the Badge component to use the new styles with `useThemeColors()`

**Why (DIP):** Mobile Badge currently bypasses the theme system entirely with hardcoded values.

**Verification:**
1. Run `pnpm dev:mobile`
2. Test Badge component on both light and dark themes
3. All variants should use theme-appropriate colors

**Rollback:** `git checkout klard-mobile/src/components/ui/Badge/badge.styles.ts`

**Commit Message:** `refactor(klard-mobile): convert Badge to SVA pattern for theme support`

---

## Task Group 2: Standardize Variant Naming

**Priority:** HIGH
**Impact:** Cross-platform consistency, developer experience

### Task 2.1: Document and Align Variant Names

**Time Estimate:** 15 minutes

**Current State Analysis:**

| Component | Web Variants | Mobile Variants | Action |
|-----------|--------------|-----------------|--------|
| Button | default, primary, secondary, destructive, outline, ghost, link, klard, burn, social | primary, secondary, outline, ghost, destructive, link, klard, burn | Add `social` to mobile OR remove from web |
| Badge | default, primary, success, warning, error, outline, secondary, destructive | default, primary, success, warning, error, outline | Add `secondary`, `destructive` to mobile |
| Card | default, elevated, ghost, glass, interactive | default, elevated, ghost, interactive, glass | ✅ Already aligned |

**Standard Variant Names (unified):**
- **Semantic:** `primary`, `secondary`, `success`, `warning`, `error`, `destructive`
- **Style:** `default`, `outline`, `ghost`, `link`
- **Custom:** `klard`, `burn`, `glass`, `interactive`, `elevated`

**Instructions:**
1. Create a shared variants documentation in `docs/design/component-variants.md`
2. Document which variants each component supports

**Commit Message:** `docs: document unified component variant standards`

---

### Task 2.2: Add Missing Variants to Mobile Badge

**File to Modify:** `klard-mobile/src/components/ui/Badge/badge.styles.ts`
**Time Estimate:** 10 minutes

**Prerequisites:** Task 1.8 must be complete (SVA refactor)

**Instructions:**
1. Open the refactored `badge.styles.ts`
2. Add `secondary` variant to both `badgeContainerStyles` and `badgeTextStyles`:
   ```typescript
   secondary: (colors: ThemeColors) => ({
     backgroundColor: colors.secondaryBackground,
   }),
   ```
3. Add `destructive` variant (alias behavior to `error`):
   ```typescript
   destructive: (colors: ThemeColors) => ({
     backgroundColor: colors.errorBackground,
   }),
   ```

**Why (OCP):** Adding new variants without modifying existing behavior.

**Verification:**
1. Test new variants in mobile app
2. Compare with web Badge variants

**Commit Message:** `feat(klard-mobile): add secondary and destructive variants to Badge`

---

### Task 2.3: Decide on Button `social` Variant

**Decision Required:** Keep `social` web-only OR add to mobile

**Current State:**
- Web has `social` variant for social auth buttons
- Mobile does not have `social` variant

**Recommendation:** Keep `social` as **web-only** since social auth buttons have different UX patterns on mobile (native sheets vs buttons).

**Instructions:**
1. Document in `docs/design/component-variants.md` that `social` is web-only
2. No code changes needed

**Commit Message:** `docs: document social variant as web-only`

---

## Task Group 3: Standardize File/Folder Naming

**Priority:** HIGH
**Impact:** Developer experience, consistency, import reliability

### Task 3.1: Document and Choose Naming Convention

**Time Estimate:** 10 minutes

**Current State:**

| Aspect | Web | Mobile | Decision |
|--------|-----|--------|----------|
| Folders | `button/` (kebab-case) | `Button/` (PascalCase) | **Keep both** (platform convention) |
| Components | `button.tsx` (lowercase) | `Button.tsx` (PascalCase) | **Keep both** (platform convention) |
| Styles | `button.styles.ts` | `button.styles.ts` | ✅ Already aligned |
| Stories | `button.stories.tsx` | `Button.stories.tsx` | Align to **lowercase** |
| Index | `index.ts` | `index.ts` | ✅ Already aligned |

**Decision:**
- **Folder naming:** Keep platform-specific (web=kebab, mobile=PascalCase)
- **Component files:** Keep platform-specific (web=lowercase, mobile=PascalCase)
- **Style files:** MUST be `[component-name].styles.ts` (kebab-case) on BOTH platforms
- **Story files:** SHOULD be `[component-name].stories.tsx` (kebab-case) on BOTH platforms

**Instructions:**
1. Document naming conventions in `CLAUDE.md` under both klard-web and klard-mobile sections
2. No immediate renames needed - enforce on new components

**Commit Message:** `docs: document cross-platform file naming conventions`

---

### Task 3.2: Create Unified styles/tokens Structure

**Goal:** Ensure both platforms have identical `styles/tokens/` structure

**Target Structure (BOTH platforms):**
```
src/styles/
├── tokens/
│   ├── colors.[ts|css]       # Color palette
│   ├── spacing.[ts|css]      # Spacing scale
│   ├── radius.[ts|css]       # Border radius
│   ├── shadows.[ts|css]      # Shadow definitions
│   ├── animation.[ts|css]    # Animation tokens
│   └── index.[ts|css]        # Re-exports
└── index.[ts|css]            # Main export
```

**Mobile Status:** ✅ Already has this structure
**Web Status:** ❌ Needs to be created (Task Group 4 addresses this)

---

## Task Group 4: Split globals.css (Web Organization)

**Priority:** MEDIUM
**Impact:** Maintainability, mirrors mobile structure

### Task 4.1: Create CSS Token Files Structure

**Files to Create:**
- `klard-web/src/styles/tokens/radius.css`
- `klard-web/src/styles/tokens/shadows.css`
- `klard-web/src/styles/tokens/animation.css`
- `klard-web/src/styles/tokens/glassmorphism.css`
- `klard-web/src/styles/tokens/colors.css`
- `klard-web/src/styles/tokens/index.css`

**Time Estimate:** 20 minutes

**Instructions:**

1. Create directory:
   ```bash
   mkdir -p klard-web/src/styles/tokens
   ```

2. Create `radius.css`:
   ```css
   /**
    * Klard Design System - Radius Tokens
    * Border radius values (aligned with mobile)
    * @see klard-mobile/src/styles/tokens/radius.ts
    */
   :root {
     --rec-radius-none: 0px;
     --rec-radius-sm: 8px;
     --rec-radius-md: 12px;
     --rec-radius-lg: 16px;
     --rec-radius-xl: 24px;
     --rec-radius-2xl: 32px;
     --rec-radius-full: 9999px;
     --rec-radius-default: var(--rec-radius-md);
   }
   ```

3. Create `shadows.css`:
   - Extract shadow tokens (`--rec-shadow-*`, `--rec-glow-*`)

4. Create `animation.css`:
   - Extract animation tokens (`--rec-animate-*`)
   - Use `normal` instead of `default` for duration

5. Create `glassmorphism.css`:
   - Extract glass effect tokens (`--rec-glass-*`)

6. Create `colors.css`:
   - Extract light theme colors (`:root` block)
   - Extract dark theme colors (`[data-theme="dark"]` block)

7. Create `index.css`:
   ```css
   /**
    * Klard Design System - Token Index
    * Import all token files
    */
   @import "./radius.css";
   @import "./shadows.css";
   @import "./animation.css";
   @import "./glassmorphism.css";
   @import "./colors.css";
   ```

**Why (SRP):** Each file has single responsibility, mirrors mobile structure.

**Verification:**
1. Files created with correct content
2. No duplicate definitions

**Commit Message:** `refactor(klard-web): create token CSS files mirroring mobile structure`

---

### Task 4.2: Update globals.css to Import Token Files

**File to Modify:** `klard-web/src/app/globals.css`
**Time Estimate:** 10 minutes

**Instructions:**
1. At the top of globals.css (after Tailwind imports), add:
   ```css
   @import "../styles/tokens/index.css";
   ```

2. Remove the token definitions that were moved to separate files
3. Keep in globals.css:
   - Tailwind imports (`@import "tailwindcss"`)
   - Custom variant definitions
   - `@theme inline` block (Tailwind integration)
   - `@layer base` blocks
   - Utility classes
   - Keyframe animations

**Verification:**
1. Run `pnpm dev:web`
2. Check browser dev tools - all CSS variables should still be defined
3. Theme switching should work
4. Run `pnpm build:web` - no errors

**Rollback:** Restore globals.css from git and delete token files

**Commit Message:** `refactor(klard-web): import token files in globals.css`

---

### Task 4.3: Create TypeScript Token Types (Optional)

**File to Create:** `klard-web/src/styles/index.ts`
**Time Estimate:** 5 minutes

**Instructions:**
1. Create TypeScript file with token type exports:
   ```typescript
   /**
    * Klard Design System - Web Token Types
    * Provides TypeScript types matching mobile structure.
    * Actual values come from CSS variables.
    * @see klard-mobile/src/styles/tokens/index.ts
    */

   export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
   export type ShadowToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'card' | 'cardElevated';
   export type GlowToken = 'primary' | 'success' | 'warning' | 'error';
   export type DurationToken = 'instant' | 'fastest' | 'faster' | 'fast' | 'normal' | 'slow' | 'slower' | 'slowest';

   // CSS variable helper
   export const cssVar = (name: string) => `var(--rec-${name})`;
   ```

**Why:** Provides type-safe token access matching mobile patterns.

**Commit Message:** `feat(klard-web): add TypeScript token types matching mobile`

---

## Task Group 5: Add ThemeContext (Mobile Enhancement)

**Priority:** MEDIUM
**Impact:** Enables programmatic theme control beyond OS settings

### Task 5.1: Create ThemeContext Provider

**File to Create:** `klard-mobile/src/contexts/ThemeContext.tsx`
**Time Estimate:** 15 minutes

**Instructions:**
1. Create contexts directory:
   ```bash
   mkdir -p klard-mobile/src/contexts
   ```

2. Create `ThemeContext.tsx`:

```typescript
/**
 * ThemeContext - Programmatic theme control for React Native
 *
 * SOLID Compliance:
 * - SRP: Only manages theme state
 * - OCP: Extend by adding new theme options
 * - DIP: Components depend on context abstraction
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, type ColorScheme, type ThemeColors } from '@/styles';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ColorScheme;
  themePreference: ThemePreference;
  colors: ThemeColors;
  isDark: boolean;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = '@klard/theme-preference';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((saved) => {
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        setThemePreferenceState(saved as ThemePreference);
      }
      setIsLoaded(true);
    });
  }, []);

  const setThemePreference = (preference: ThemePreference) => {
    setThemePreferenceState(preference);
    AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
  };

  const theme: ColorScheme = themePreference === 'system'
    ? (systemColorScheme ?? 'light')
    : themePreference;

  const colors = Colors[theme];
  const isDark = theme === 'dark';

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, themePreference, colors, isDark, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

**Verification:**
1. TypeScript compiles without errors
2. No runtime errors when provider is added

**Commit Message:** `feat(klard-mobile): add ThemeContext for programmatic theme control`

---

### Task 5.2: Add ThemeProvider to Root Layout

**File to Modify:** `klard-mobile/src/app/_layout.tsx`
**Time Estimate:** 10 minutes

**Instructions:**
1. Import ThemeProvider:
   ```typescript
   import { ThemeProvider } from '@/contexts/ThemeContext';
   ```
2. Wrap app content with ThemeProvider (near top of provider stack)

**Verification:**
1. Run `pnpm dev:mobile`
2. App loads without errors
3. Theme responds to OS settings

**Commit Message:** `feat(klard-mobile): integrate ThemeProvider in root layout`

---

### Task 5.3: Update useThemeColors Hook to Use Context

**File to Modify:** `klard-mobile/src/hooks/useThemeColors.ts`
**Time Estimate:** 10 minutes

**Instructions:**
1. Replace current implementation:

**Current:**
```typescript
import { useColorScheme } from 'react-native';
import { Colors, type ThemeColors } from '@/styles';

export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme() ?? 'light';
  return Colors[colorScheme];
}
```

**New:**
```typescript
import { Colors, type ThemeColors } from '@/styles';
import { useTheme } from '@/contexts/ThemeContext';

export function useThemeColors(): ThemeColors & { isDark: boolean } {
  const { colors, isDark } = useTheme();
  return { ...colors, isDark };
}

export { useTheme } from '@/contexts/ThemeContext';
```

**Verification:**
1. All existing components continue working
2. Components can access `isDark` from the hook

**Commit Message:** `refactor(klard-mobile): update useThemeColors to use ThemeContext`

---

## Task Group 6: Create Token Documentation

**Priority:** LOW
**Impact:** Developer experience, onboarding

### Task 6.1: Create Cross-Platform Token Reference

**File to Create:** `docs/design/tokens-reference.md`
**Time Estimate:** 25 minutes

**Instructions:**
1. Create markdown file documenting all tokens
2. Include comparison tables showing web and mobile values
3. Highlight any intentional platform differences

**Content structure:**
```markdown
# Klard Design Tokens Reference

## Overview
Single source of truth for design tokens across web and mobile.

## Token Alignment Status
| Category | Web | Mobile | Aligned |
|----------|-----|--------|---------|
| Colors | globals.css | colors.ts | ✅ |
| Radius | tokens/radius.css | tokens/radius.ts | ✅ |
| ...

## Color Tokens
### Semantic Colors
| Token | Light | Dark | Web Usage | Mobile Usage |
...

## Radius Tokens
| Token | Value | Web | Mobile |
| sm | 8px | --rec-radius-sm | radius.sm |
| md | 12px | --rec-radius-md | radius.md |
...

## Shadow Tokens
...

## Animation Tokens
...

## Variant Standards
| Variant | Button | Badge | Card |
| primary | ✅ | ✅ | - |
| secondary | ✅ | ✅ | - |
...

## Platform-Specific Notes
...
```

**Verification:**
1. Document renders correctly
2. All values match implementation
3. Discrepancies are documented

**Commit Message:** `docs: add cross-platform design tokens reference`

---

### Task 6.2: Add Inline Documentation to Token Files

**Files to Modify:**
- `klard-mobile/src/styles/tokens/*.ts`
- `klard-web/src/styles/tokens/*.css`

**Time Estimate:** 15 minutes

**Instructions:**
1. Add header comments to all token files with:
   - Purpose description
   - Link to cross-platform counterpart
   - Link to tokens-reference.md

**Example for mobile `radius.ts`:**
```typescript
/**
 * Klard Design System - Radius Tokens (Mobile)
 * Border radius values using 4px increments.
 *
 * @see klard-web/src/styles/tokens/radius.css (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 *
 * SOLID Compliance:
 * - SRP: Only radius definitions
 * - OCP: Extend via componentRadius
 */
```

**Verification:**
1. Comments appear in IDE hover
2. Links are valid

**Commit Message:** `docs: add inline documentation to token files`

---

## Implementation Order Summary

**Phase 1 - Critical Alignment (Day 1):**
1. ✅ Task 0.1: Align radius token values
2. ✅ Task 0.2: Align button size heights
3. ✅ Task 0.3: Align animation duration naming
4. ✅ Task 1.1: Audit hardcoded colors
5. ✅ Task 1.2: Add semantic color classes

**Phase 2 - DIP Fixes (Day 1-2):**
6. ✅ Task 1.3: Refactor button.styles.ts
7. ✅ Task 1.4: Refactor badge.styles.ts
8. ✅ Task 1.5: Refactor health-indicator.styles.ts
9. ✅ Task 1.6: Refactor alert-card.styles.ts
10. ✅ Task 1.7: Refactor tabs and segmented-control
11. ✅ Task 1.8: Refactor mobile Badge to SVA

**Phase 3 - Variant Alignment (Day 2):**
12. ✅ Task 2.1: Document variant standards
13. ✅ Task 2.2: Add missing variants to mobile Badge
14. ✅ Task 2.3: Document social variant decision
15. ✅ Task 3.1: Document naming conventions

**Phase 4 - Structure Alignment (Day 2-3):**
16. ✅ Task 4.1: Create web token CSS files
17. ✅ Task 4.2: Update globals.css imports
18. ✅ Task 4.3: Create TypeScript token types

**Phase 5 - Mobile Enhancement (Day 3):**
19. ✅ Task 5.1: Create ThemeContext
20. ✅ Task 5.2: Add ThemeProvider to layout
21. ✅ Task 5.3: Update useThemeColors hook

**Phase 6 - Documentation (Day 3):**
22. ✅ Task 6.1: Create token reference doc
23. ✅ Task 6.2: Add inline documentation

---

## Verification Checklist

After completing all tasks:

- [ ] `pnpm build` passes for all packages
- [ ] `pnpm lint` passes
- [ ] Web and mobile button heights match (40px for md)
- [ ] Web and mobile radius values match (sm=8, md=12, lg=16)
- [ ] Animation duration uses "normal" naming
- [ ] Web theme switching works correctly
- [ ] Mobile theme switching works correctly
- [ ] All component variants render correctly in both themes
- [ ] No hardcoded color values remain in *.styles.ts files
- [ ] Token file structure matches between web and mobile
- [ ] Documentation is complete and accurate

---

## Rollback Plan

If issues are discovered:

1. **Individual task rollback:** Each task includes specific rollback instructions
2. **Full rollback:** `git reset --hard HEAD~N` where N is number of commits
3. **Feature flag:** Not applicable - these are styling changes

---

## Critical Files Reference

| File | Purpose |
|------|---------|
| `klard-web/src/app/globals.css` | Web token source of truth |
| `klard-web/src/components/ui/button/button.styles.ts` | Web button (DIP violation example) |
| `klard-mobile/src/styles/tokens/` | Mobile token structure (reference for web) |
| `klard-mobile/src/styles/colors.ts` | Mobile color source of truth |
| `klard-mobile/src/styles/sva.ts` | SVA pattern reference |
| `klard-mobile/src/components/ui/Badge/badge.styles.ts` | Mobile badge (DIP violation) |

---

## Cross-Platform Alignment Summary

### Token Value Alignment

| Token | Before (Web) | Before (Mobile) | After (Both) |
|-------|--------------|-----------------|--------------|
| `radius.sm` | 8px | 8 | 8px |
| `radius.md` | 16px | 12 | **12px** |
| `radius.lg` | 24px | 16 | **16px** |
| `radius.xl` | 24px | 24 | 24px |
| `button.md` height | 36px | 40 | **40px** |
| `duration.default` | "default" | "normal" | **"normal"** |

### Folder Structure Alignment

```
Both platforms:
src/styles/
├── tokens/
│   ├── colors.[ts|css]
│   ├── spacing.[ts|css]
│   ├── radius.[ts|css]
│   ├── shadows.[ts|css]
│   ├── animation.[ts|css]
│   └── index.[ts|css]
└── index.[ts|css]
```

### Variant Alignment

| Variant | Button (Web) | Button (Mobile) | Badge (Web) | Badge (Mobile) |
|---------|--------------|-----------------|-------------|----------------|
| primary | ✅ | ✅ | ✅ | ✅ |
| secondary | ✅ | ✅ | ✅ | ✅ (add) |
| success | - | - | ✅ | ✅ |
| warning | - | - | ✅ | ✅ |
| error | - | - | ✅ | ✅ |
| destructive | ✅ | ✅ | ✅ | ✅ (add) |
| outline | ✅ | ✅ | ✅ | ✅ |
| ghost | ✅ | ✅ | - | - |
| link | ✅ | ✅ | - | - |
| klard | ✅ | ✅ | - | - |
| burn | ✅ | ✅ | - | - |
| social | ✅ | - (web-only) | - | - |
