# SVA Theme System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace 122+ hardcoded colors in klard-mobile with a CVA-inspired Style Variance Authority (SVA) system that supports automatic light/dark theme switching.

**Architecture:** Create an `sva()` utility that pre-compiles themed styles at import time. Components call `buttonStyles(isDark, { variant })` to get pre-computed styles. Colors are defined once using `(colors) => ({...})` functions.

**Tech Stack:** React Native, Expo SDK 54, TypeScript, StyleSheet API

---

## Phase 0: Expo Configuration (PREREQUISITE)

### Task 0: Enable Automatic Theme Detection

**Files:**
- Modify: `klard-mobile/app.json`

**Why this is critical:**
The current `app.json` has `"userInterfaceStyle": "light"` which **locks the app to light mode**. The `useColorScheme()` hook will always return `'light'` regardless of system settings. This must be changed to `"automatic"` for theme switching to work.

**Step 1: Update app.json**

Change line 9 from:
```json
"userInterfaceStyle": "light",
```

To:
```json
"userInterfaceStyle": "automatic",
```

**Step 2: Rebuild the app**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps/klard-mobile && npx expo prebuild --clean`

Or if using development build:
Run: `npx expo start --clear`

**Step 3: Test theme detection**

1. Open iOS Settings → Display & Brightness → Toggle Dark Mode
2. Or on Android: Settings → Display → Dark Theme
3. The app should now respond to system theme changes

**Step 4: Commit**

```bash
git add klard-mobile/app.json
git commit -m "fix(mobile): enable automatic theme detection in app.json"
```

---

## Phase 1: Infrastructure

### Task 1: Create SVA Utility

**Files:**
- Create: `klard-mobile/src/styles/sva.ts`
- Test: `klard-mobile/src/__tests__/styles/sva.test.ts`

**Step 1: Write the failing test**

```typescript
// klard-mobile/src/__tests__/styles/sva.test.ts
import { sva } from '@/styles/sva';

const mockColors = {
  light: { primary: '#0D7C7A', background: '#FFFFFF' },
  dark: { primary: '#15B5B0', background: '#0F172A' },
};

// Mock the Colors import
jest.mock('@/styles/colors', () => ({
  Colors: {
    light: { primary: '#0D7C7A', background: '#FFFFFF' },
    dark: { primary: '#15B5B0', background: '#0F172A' },
  },
}));

describe('sva', () => {
  it('should return base styles', () => {
    const styles = sva({
      base: { padding: 16 },
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ padding: 16 });
  });

  it('should apply light theme colors', () => {
    const styles = sva({
      base: (colors) => ({ backgroundColor: colors.primary }),
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ backgroundColor: '#0D7C7A' });
  });

  it('should apply dark theme colors', () => {
    const styles = sva({
      base: (colors) => ({ backgroundColor: colors.primary }),
    });

    const result = styles(true, {});
    expect(result).toContainEqual({ backgroundColor: '#15B5B0' });
  });

  it('should apply variant styles', () => {
    const styles = sva({
      variants: {
        size: {
          sm: { padding: 8 },
          lg: { padding: 24 },
        },
      },
    });

    const result = styles(false, { size: 'lg' });
    expect(result).toContainEqual({ padding: 24 });
  });

  it('should apply default variants', () => {
    const styles = sva({
      variants: {
        size: {
          sm: { padding: 8 },
          lg: { padding: 24 },
        },
      },
      defaultVariants: { size: 'sm' },
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ padding: 8 });
  });

  it('should apply themed variant styles', () => {
    const styles = sva({
      variants: {
        variant: {
          primary: (colors) => ({ backgroundColor: colors.primary }),
        },
      },
    });

    const lightResult = styles(false, { variant: 'primary' });
    const darkResult = styles(true, { variant: 'primary' });

    expect(lightResult).toContainEqual({ backgroundColor: '#0D7C7A' });
    expect(darkResult).toContainEqual({ backgroundColor: '#15B5B0' });
  });

  it('should apply compound variants', () => {
    const styles = sva({
      variants: {
        variant: {
          primary: { backgroundColor: 'blue' },
        },
        size: {
          lg: { padding: 24 },
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          size: 'lg',
          style: { fontWeight: 'bold' },
        },
      ],
    });

    const result = styles(false, { variant: 'primary', size: 'lg' });
    expect(result).toContainEqual({ fontWeight: 'bold' });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/styles/sva.test.ts --run`

Expected: FAIL with "Cannot find module '@/styles/sva'"

**Step 3: Write minimal implementation**

```typescript
// klard-mobile/src/styles/sva.ts
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, ThemeColors } from './colors';

type Style = ViewStyle | TextStyle | ImageStyle;
type StyleDef<T extends Style = Style> = T | ((colors: ThemeColors) => T);

export interface SVAConfig<
  V extends Record<string, Record<string, StyleDef>> = Record<string, Record<string, StyleDef>>
> {
  /** Base styles applied to all variants */
  base?: StyleDef;
  /** Variant definitions */
  variants?: V;
  /** Styles applied when multiple variants match */
  compoundVariants?: Array<
    { [K in keyof V]?: keyof V[K] } & { style: StyleDef }
  >;
  /** Default variant values */
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
}

export type VariantProps<C extends SVAConfig> = C['variants'] extends Record<string, Record<string, StyleDef>>
  ? { [K in keyof C['variants']]?: keyof C['variants'][K] }
  : Record<string, never>;

interface CompiledStyles {
  base?: Style;
  variants?: Record<string, Record<string, Style>>;
  compoundVariants?: Array<{ style: Style } & Record<string, unknown>>;
}

/**
 * Style Variance Authority for React Native
 * Pre-computes themed styles at import time for optimal performance
 *
 * @example
 * const buttonStyles = sva({
 *   base: { padding: 16 },
 *   variants: {
 *     variant: {
 *       primary: (colors) => ({ backgroundColor: colors.primary }),
 *     },
 *   },
 * });
 *
 * // In component:
 * const styles = buttonStyles(isDark, { variant: 'primary' });
 */
export function sva<V extends Record<string, Record<string, StyleDef>>>(
  config: SVAConfig<V>
) {
  // Pre-compile both themes at module load
  const compiled = {
    light: compileConfig(config, Colors.light),
    dark: compileConfig(config, Colors.dark),
  };

  // Return selector function
  return function selectStyles(
    isDark: boolean,
    props?: { [K in keyof V]?: keyof V[K] }
  ): Style[] {
    const theme = isDark ? compiled.dark : compiled.light;
    const result: Style[] = [];

    // 1. Add base styles
    if (theme.base) {
      result.push(theme.base);
    }

    // 2. Add variant styles
    if (config.variants && theme.variants) {
      for (const variantKey of Object.keys(config.variants)) {
        const selected = props?.[variantKey] ?? config.defaultVariants?.[variantKey];
        if (selected && theme.variants[variantKey]?.[selected as string]) {
          result.push(theme.variants[variantKey][selected as string]);
        }
      }
    }

    // 3. Add compound variant styles
    if (theme.compoundVariants) {
      for (const compound of theme.compoundVariants) {
        const { style, ...conditions } = compound;
        const matches = Object.entries(conditions).every(
          ([key, value]) => (props?.[key] ?? config.defaultVariants?.[key]) === value
        );
        if (matches) {
          result.push(style as Style);
        }
      }
    }

    return result;
  };
}

function compileConfig<V extends Record<string, Record<string, StyleDef>>>(
  config: SVAConfig<V>,
  colors: ThemeColors
): CompiledStyles {
  const resolve = (def: StyleDef): Style =>
    typeof def === 'function' ? def(colors) : def;

  const compiled: CompiledStyles = {};

  // Compile base
  if (config.base) {
    compiled.base = resolve(config.base);
  }

  // Compile variants
  if (config.variants) {
    compiled.variants = {};
    for (const [variantKey, variantValues] of Object.entries(config.variants)) {
      compiled.variants[variantKey] = {};
      for (const [valueName, styleDef] of Object.entries(variantValues as Record<string, StyleDef>)) {
        compiled.variants[variantKey][valueName] = resolve(styleDef);
      }
    }
  }

  // Compile compound variants
  if (config.compoundVariants) {
    compiled.compoundVariants = config.compoundVariants.map(({ style, ...conditions }) => ({
      ...conditions,
      style: resolve(style),
    }));
  }

  return compiled;
}
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/styles/sva.test.ts --run`

Expected: PASS (all 7 tests)

**Step 5: Commit**

```bash
git add klard-mobile/src/styles/sva.ts klard-mobile/src/__tests__/styles/sva.test.ts
git commit -m "feat(mobile): add SVA (Style Variance Authority) utility for theming"
```

---

### Task 2: Enrich Colors File

**Files:**
- Modify: `klard-mobile/src/styles/colors.ts`
- Test: `klard-mobile/src/__tests__/styles/colors.test.ts`

**Step 1: Write the failing test**

```typescript
// klard-mobile/src/__tests__/styles/colors.test.ts
import { Colors } from '@/styles/colors';

describe('Colors', () => {
  describe('light theme', () => {
    it('should have all primary colors', () => {
      expect(Colors.light.primary).toBe('#0D7C7A');
      expect(Colors.light.primaryForeground).toBe('#FFFFFF');
      expect(Colors.light.primaryHover).toBeDefined();
    });

    it('should have all alert backgrounds', () => {
      expect(Colors.light.infoBackground).toBeDefined();
      expect(Colors.light.successBackground).toBeDefined();
      expect(Colors.light.warningBackground).toBeDefined();
      expect(Colors.light.errorBackground).toBeDefined();
    });

    it('should have all alert foregrounds', () => {
      expect(Colors.light.infoForeground).toBeDefined();
      expect(Colors.light.successForeground).toBeDefined();
      expect(Colors.light.warningForeground).toBeDefined();
      expect(Colors.light.errorForeground).toBeDefined();
    });

    it('should have all alert borders', () => {
      expect(Colors.light.infoBorder).toBeDefined();
      expect(Colors.light.successBorder).toBeDefined();
      expect(Colors.light.warningBorder).toBeDefined();
      expect(Colors.light.errorBorder).toBeDefined();
    });

    it('should have surface colors', () => {
      expect(Colors.light.surface).toBeDefined();
      expect(Colors.light.surface1).toBeDefined();
      expect(Colors.light.surface2).toBeDefined();
    });

    it('should have glow colors', () => {
      expect(Colors.light.glowPrimary).toBeDefined();
      expect(Colors.light.glowSuccess).toBeDefined();
      expect(Colors.light.glowWarning).toBeDefined();
      expect(Colors.light.glowError).toBeDefined();
    });

    it('should have interactive state colors', () => {
      expect(Colors.light.hoverBackground).toBeDefined();
      expect(Colors.light.activeBackground).toBeDefined();
      expect(Colors.light.selectedBackground).toBeDefined();
      expect(Colors.light.disabledBackground).toBeDefined();
    });
  });

  describe('dark theme', () => {
    it('should have swapped primary/secondary', () => {
      expect(Colors.dark.primary).toBe('#15B5B0');
      expect(Colors.dark.secondary).toBe('#0D7C7A');
    });

    it('should have all alert backgrounds with transparency', () => {
      expect(Colors.dark.infoBackground).toContain('rgba');
      expect(Colors.dark.successBackground).toContain('rgba');
      expect(Colors.dark.warningBackground).toContain('rgba');
    });
  });

  describe('type safety', () => {
    it('light and dark should have the same keys', () => {
      const lightKeys = Object.keys(Colors.light).sort();
      const darkKeys = Object.keys(Colors.dark).sort();
      expect(lightKeys).toEqual(darkKeys);
    });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/styles/colors.test.ts --run`

Expected: FAIL with "Property 'primaryHover' does not exist" or "received undefined"

**Step 3: Write the enriched colors file**

```typescript
// klard-mobile/src/styles/colors.ts
export const Colors = {
  light: {
    // ===== PRIMARY COLORS =====
    primary: '#0D7C7A',
    primaryForeground: '#FFFFFF',
    primaryHover: '#0A6866',
    primaryPressed: '#085756',

    // ===== SECONDARY COLORS =====
    secondary: '#15B5B0',
    secondaryForeground: '#FFFFFF',

    // ===== ACCENT COLORS (Semantic) =====
    success: '#059669',
    accentSuccess: '#059669',
    warning: '#D97706',
    accentWarning: '#D97706',
    error: '#DC2626',
    accentError: '#DC2626',

    // ===== NEUTRAL / BACKGROUND =====
    background: '#FFFFFF',
    foreground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',

    // ===== SURFACE COLORS =====
    surface: 'rgba(255, 255, 255, 0.8)',
    surfaceStrong: 'rgba(255, 255, 255, 0.95)',
    surface1: '#FFFFFF',
    surface2: '#F8FAFC',
    surface3: '#F1F5F9',
    surface4: '#E2E8F0',

    // ===== CARD / POPOVER =====
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    popover: '#FFFFFF',
    popoverForeground: '#0F172A',

    // ===== BORDER & INPUT =====
    border: 'rgba(148, 163, 184, 0.2)',
    borderStrong: 'rgba(148, 163, 184, 0.3)',
    borderFocus: 'rgba(148, 163, 184, 0.5)',
    input: '#F8FAFC',
    ring: '#0D7C7A',

    // ===== DESTRUCTIVE =====
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    // ===== TEXT HIERARCHY =====
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    textDisabled: '#94A3B8',

    // ===== ALERT: INFO =====
    infoBackground: '#EFF6FF',
    infoForeground: '#1E40AF',
    infoBorder: '#BFDBFE',

    // ===== ALERT: SUCCESS =====
    successBackground: '#ECFDF5',
    successForeground: '#065F46',
    successBorder: '#A7F3D0',

    // ===== ALERT: WARNING =====
    warningBackground: '#FEF3C7',
    warningForeground: '#92400E',
    warningBorder: '#FDE68A',

    // ===== ALERT: ERROR =====
    errorBackground: '#FEF2F2',
    errorForeground: '#991B1B',
    errorBorder: '#FECACA',

    // ===== INTERACTIVE STATES =====
    hoverBackground: '#F8FAFC',
    activeBackground: '#F1F5F9',
    selectedBackground: '#E0F2F1',
    disabledBackground: '#F1F5F9',

    // ===== OVERLAY =====
    overlay: 'rgba(255, 255, 255, 0.85)',
    overlaySoft: 'rgba(248, 250, 252, 0.75)',
    overlayStrong: 'rgba(255, 255, 255, 0.95)',
    backdropOverlay: 'rgba(15, 23, 42, 0.5)',

    // ===== GLASSMORPHISM =====
    glassBorder: 'rgba(148, 163, 184, 0.2)',
    glassBackground: 'rgba(255, 255, 255, 0.8)',

    // ===== GLOW EFFECTS =====
    glowPrimary: 'rgba(13, 124, 122, 0.3)',
    glowSuccess: 'rgba(5, 150, 105, 0.2)',
    glowWarning: 'rgba(217, 119, 6, 0.2)',
    glowError: 'rgba(220, 38, 38, 0.2)',
    focusRing: 'rgba(13, 124, 122, 0.4)',

    // ===== GRADIENTS =====
    gradientPrimaryStart: '#0D7C7A',
    gradientPrimaryEnd: '#0A5F5D',
    gradientSuccessStart: '#059669',
    gradientSuccessEnd: '#047857',
    gradientBackgroundStart: '#FFFFFF',
    gradientBackgroundEnd: '#F8FAFC',

    // ===== SHADOW COLORS =====
    shadowColor: 'rgba(15, 23, 42, 0.1)',
    shadowColorSm: 'rgba(15, 23, 42, 0.08)',
    shadowColorMd: 'rgba(15, 23, 42, 0.12)',
    shadowColorLg: 'rgba(15, 23, 42, 0.15)',

    // ===== CHART COLORS =====
    chart1: '#0D7C7A',
    chart2: '#15B5B0',
    chart3: '#059669',
    chart4: '#D97706',
    chart5: '#DC2626',

    // ===== BURNER CARD STATUSES =====
    burnerActive: '#0D7C7A',
    burnerLocked: '#64748B',
    burnerBlocked: '#DC2626',
    burnerExpired: '#94A3B8',
  },

  dark: {
    // ===== PRIMARY COLORS =====
    primary: '#15B5B0',
    primaryForeground: '#FFFFFF',
    primaryHover: '#1DCDC7',
    primaryPressed: '#25E5DE',

    // ===== SECONDARY COLORS =====
    secondary: '#0D7C7A',
    secondaryForeground: '#F8FAFC',

    // ===== ACCENT COLORS (Semantic) =====
    success: '#10B981',
    accentSuccess: '#10B981',
    warning: '#F59E0B',
    accentWarning: '#F59E0B',
    error: '#EF4444',
    accentError: '#EF4444',

    // ===== NEUTRAL / BACKGROUND =====
    background: '#0F172A',
    foreground: '#F8FAFC',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',

    // ===== SURFACE COLORS =====
    surface: 'rgba(30, 41, 59, 0.6)',
    surfaceStrong: 'rgba(12, 19, 36, 0.9)',
    surface1: '#0F172A',
    surface2: '#1E293B',
    surface3: '#334155',
    surface4: '#475569',

    // ===== CARD / POPOVER =====
    card: '#1E293B',
    cardForeground: '#F8FAFC',
    popover: '#1E293B',
    popoverForeground: '#F8FAFC',

    // ===== BORDER & INPUT =====
    border: 'rgba(148, 163, 184, 0.12)',
    borderStrong: 'rgba(148, 163, 184, 0.2)',
    borderFocus: 'rgba(148, 163, 184, 0.4)',
    input: '#1E293B',
    ring: '#15B5B0',

    // ===== DESTRUCTIVE =====
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',

    // ===== TEXT HIERARCHY =====
    textPrimary: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    textDisabled: '#64748B',

    // ===== ALERT: INFO =====
    infoBackground: 'rgba(59, 130, 246, 0.15)',
    infoForeground: '#60A5FA',
    infoBorder: 'rgba(59, 130, 246, 0.3)',

    // ===== ALERT: SUCCESS =====
    successBackground: 'rgba(16, 185, 129, 0.15)',
    successForeground: '#34D399',
    successBorder: 'rgba(16, 185, 129, 0.3)',

    // ===== ALERT: WARNING =====
    warningBackground: 'rgba(245, 158, 11, 0.15)',
    warningForeground: '#FBBF24',
    warningBorder: 'rgba(245, 158, 11, 0.3)',

    // ===== ALERT: ERROR =====
    errorBackground: 'rgba(239, 68, 68, 0.1)',
    errorForeground: '#EF4444',
    errorBorder: 'rgba(239, 68, 68, 0.3)',

    // ===== INTERACTIVE STATES =====
    hoverBackground: '#334155',
    activeBackground: '#475569',
    selectedBackground: 'rgba(21, 181, 176, 0.2)',
    disabledBackground: '#1E293B',

    // ===== OVERLAY =====
    overlay: 'rgba(5, 8, 16, 0.85)',
    overlaySoft: 'rgba(5, 8, 16, 0.75)',
    overlayStrong: 'rgba(5, 8, 16, 0.95)',
    backdropOverlay: 'rgba(0, 0, 0, 0.5)',

    // ===== GLASSMORPHISM =====
    glassBorder: 'rgba(148, 163, 184, 0.12)',
    glassBackground: 'rgba(30, 41, 59, 0.6)',

    // ===== GLOW EFFECTS =====
    glowPrimary: 'rgba(21, 181, 176, 0.35)',
    glowSuccess: 'rgba(16, 185, 129, 0.25)',
    glowWarning: 'rgba(245, 158, 11, 0.25)',
    glowError: 'rgba(239, 68, 68, 0.25)',
    focusRing: 'rgba(21, 181, 176, 0.5)',

    // ===== GRADIENTS =====
    gradientPrimaryStart: '#15B5B0',
    gradientPrimaryEnd: '#0D7C7A',
    gradientSuccessStart: '#10B981',
    gradientSuccessEnd: '#059669',
    gradientBackgroundStart: '#0F172A',
    gradientBackgroundEnd: '#1E293B',

    // ===== SHADOW COLORS =====
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowColorSm: 'rgba(0, 0, 0, 0.1)',
    shadowColorMd: 'rgba(0, 0, 0, 0.15)',
    shadowColorLg: 'rgba(0, 0, 0, 0.2)',

    // ===== CHART COLORS =====
    chart1: '#15B5B0',
    chart2: '#0D7C7A',
    chart3: '#10B981',
    chart4: '#F59E0B',
    chart5: '#EF4444',

    // ===== BURNER CARD STATUSES =====
    burnerActive: '#15B5B0',
    burnerLocked: '#94A3B8',
    burnerBlocked: '#EF4444',
    burnerExpired: '#64748B',
  },
} as const;

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = (typeof Colors)[ColorScheme];
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/styles/colors.test.ts --run`

Expected: PASS (all tests)

**Step 5: Commit**

```bash
git add klard-mobile/src/styles/colors.ts klard-mobile/src/__tests__/styles/colors.test.ts
git commit -m "feat(mobile): enrich colors.ts with 79 semantic tokens per theme"
```

---

### Task 3: Export SVA from styles index

**Files:**
- Modify: `klard-mobile/src/styles/index.ts`

**Step 1: Read current exports**

Check what's currently exported from the styles index.

**Step 2: Add SVA export**

```typescript
// klard-mobile/src/styles/index.ts
export { Colors, type ColorScheme, type ThemeColors } from './colors';
export { sva, type SVAConfig, type VariantProps } from './sva';
export { useThemeColors } from './useThemeColors';
```

**Step 3: Verify TypeScript compilation**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile exec tsc --noEmit`

Expected: No errors

**Step 4: Commit**

```bash
git add klard-mobile/src/styles/index.ts
git commit -m "feat(mobile): export sva from styles index"
```

---

## Phase 2: Component Migration

### Task 4: Migrate Button Component

**Files:**
- Modify: `klard-mobile/src/components/ui/Button/button.styles.ts`
- Modify: `klard-mobile/src/components/ui/Button/Button.tsx`
- Test: `klard-mobile/src/__tests__/components/ui/Button.test.tsx`

**Step 1: Write the failing test**

```typescript
// klard-mobile/src/__tests__/components/ui/Button.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

// Mock useColorScheme
jest.mock('react-native', () => {
  const actual = jest.requireActual('react-native');
  return {
    ...actual,
    useColorScheme: jest.fn(() => 'light'),
  };
});

describe('Button', () => {
  it('renders with primary variant by default', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { getByText, rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(getByText('Secondary')).toBeTruthy();

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(getByText('Destructive')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(<Button size="sm">Small</Button>);
    expect(getByText('Small')).toBeTruthy();

    rerender(<Button size="lg">Large</Button>);
    expect(getByText('Large')).toBeTruthy();
  });

  it('shows loading indicator when loading', () => {
    const { getByTestId } = render(<Button loading testID="loading-button">Loading</Button>);
    expect(getByTestId('loading-button')).toBeTruthy();
  });

  it('applies themed styles based on color scheme', () => {
    const { useColorScheme } = require('react-native');

    // Test light mode
    useColorScheme.mockReturnValue('light');
    const { rerender } = render(<Button>Test</Button>);

    // Test dark mode
    useColorScheme.mockReturnValue('dark');
    rerender(<Button>Test</Button>);

    // If it renders without crashing, SVA is working
    expect(true).toBe(true);
  });
});
```

**Step 2: Run test to verify baseline**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/components/ui/Button.test.tsx --run`

**Step 3: Rewrite button.styles.ts with SVA**

```typescript
// klard-mobile/src/components/ui/Button/button.styles.ts
import { sva } from '@/styles/sva';

export const buttonContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  variants: {
    variant: {
      primary: (colors) => ({
        backgroundColor: colors.primary,
      }),
      secondary: (colors) => ({
        backgroundColor: colors.secondary,
      }),
      outline: (colors) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      }),
      ghost: (colors) => ({
        backgroundColor: 'transparent',
      }),
      destructive: (colors) => ({
        backgroundColor: colors.accentError,
      }),
    },

    size: {
      sm: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        gap: 6,
      },
      md: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
      },
      lg: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 10,
        gap: 10,
      },
    },

    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },

    fullWidth: {
      true: { width: '100%' },
      false: {},
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: 'false',
    fullWidth: 'false',
  },
});

export const buttonTextStyles = sva({
  base: {
    fontWeight: '600',
  },

  variants: {
    variant: {
      primary: (colors) => ({ color: colors.primaryForeground }),
      secondary: (colors) => ({ color: colors.secondaryForeground }),
      outline: (colors) => ({ color: colors.foreground }),
      ghost: (colors) => ({ color: colors.primary }),
      destructive: (colors) => ({ color: colors.destructiveForeground }),
    },

    size: {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// Type exports for component props
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
```

**Step 4: Update Button.tsx to use SVA**

```typescript
// klard-mobile/src/components/ui/Button/Button.tsx
import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  useColorScheme,
  PressableProps,
  ViewStyle,
} from 'react-native';
import {
  buttonContainerStyles,
  buttonTextStyles,
  ButtonVariant,
  ButtonSize,
} from './button.styles';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  const isDark = useColorScheme() === 'dark';
  const isDisabled = disabled || loading;

  const containerStyle = buttonContainerStyles(isDark, {
    variant,
    size,
    disabled: isDisabled ? 'true' : 'false',
    fullWidth: fullWidth ? 'true' : 'false',
  });

  const textStyle = buttonTextStyles(isDark, { variant, size });

  return (
    <Pressable
      style={[...containerStyle, style]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textStyle.find((s) => 'color' in s)?.color as string}
        />
      ) : (
        <Text style={textStyle}>{children}</Text>
      )}
    </Pressable>
  );
}
```

**Step 5: Run test to verify it passes**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test src/__tests__/components/ui/Button.test.tsx --run`

Expected: PASS

**Step 6: Commit**

```bash
git add klard-mobile/src/components/ui/Button/
git commit -m "refactor(mobile): migrate Button to SVA theme system"
```

---

### Task 5: Migrate AlertBanner Component

**Files:**
- Modify: `klard-mobile/src/components/ui/AlertBanner/alert-banner.constants.ts`
- Modify: `klard-mobile/src/components/ui/AlertBanner/alert-banner.styles.ts`
- Modify: `klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx`

**Step 1: Rewrite alert-banner.styles.ts with SVA**

```typescript
// klard-mobile/src/components/ui/AlertBanner/alert-banner.styles.ts
import { sva } from '@/styles/sva';

export const alertBannerContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 12,
    borderWidth: 1,
  },

  variants: {
    variant: {
      success: (colors) => ({
        backgroundColor: colors.successBackground,
        borderColor: colors.successBorder,
      }),
      error: (colors) => ({
        backgroundColor: colors.errorBackground,
        borderColor: colors.errorBorder,
      }),
      warning: (colors) => ({
        backgroundColor: colors.warningBackground,
        borderColor: colors.warningBorder,
      }),
      info: (colors) => ({
        backgroundColor: colors.infoBackground,
        borderColor: colors.infoBorder,
      }),
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

export const alertBannerIconStyles = sva({
  variants: {
    variant: {
      success: (colors) => ({ color: colors.successForeground }),
      error: (colors) => ({ color: colors.errorForeground }),
      warning: (colors) => ({ color: colors.warningForeground }),
      info: (colors) => ({ color: colors.infoForeground }),
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

export const alertBannerTextStyles = sva({
  base: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },

  variants: {
    variant: {
      success: (colors) => ({ color: colors.successForeground }),
      error: (colors) => ({ color: colors.errorForeground }),
      warning: (colors) => ({ color: colors.warningForeground }),
      info: (colors) => ({ color: colors.infoForeground }),
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

export type AlertBannerVariant = 'success' | 'error' | 'warning' | 'info';
```

**Step 2: Delete alert-banner.constants.ts (no longer needed)**

The hardcoded constants file should be deleted as all colors now come from SVA.

**Step 3: Update AlertBanner.tsx to use SVA**

```typescript
// klard-mobile/src/components/ui/AlertBanner/AlertBanner.tsx
import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  alertBannerContainerStyles,
  alertBannerIconStyles,
  alertBannerTextStyles,
  AlertBannerVariant,
} from './alert-banner.styles';

const VARIANT_ICONS: Record<AlertBannerVariant, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
};

export interface AlertBannerProps {
  variant?: AlertBannerVariant;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function AlertBanner({
  variant = 'info',
  message,
  icon,
}: AlertBannerProps) {
  const isDark = useColorScheme() === 'dark';

  const containerStyle = alertBannerContainerStyles(isDark, { variant });
  const iconStyle = alertBannerIconStyles(isDark, { variant });
  const textStyle = alertBannerTextStyles(isDark, { variant });

  const iconColor = iconStyle.find((s) => 'color' in s)?.color as string;

  return (
    <View style={containerStyle}>
      <Ionicons
        name={icon ?? VARIANT_ICONS[variant]}
        size={20}
        color={iconColor}
      />
      <Text style={textStyle}>{message}</Text>
    </View>
  );
}
```

**Step 4: Verify TypeScript compilation**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile exec tsc --noEmit`

Expected: No errors

**Step 5: Commit**

```bash
git add klard-mobile/src/components/ui/AlertBanner/
git rm klard-mobile/src/components/ui/AlertBanner/alert-banner.constants.ts 2>/dev/null || true
git commit -m "refactor(mobile): migrate AlertBanner to SVA theme system"
```

---

### Task 6-27: Migrate Remaining Components

Follow the same pattern for each remaining component. The components to migrate are:

| # | Component | Violations | Priority |
|---|-----------|------------|----------|
| 6 | AlertCard | 23 | High |
| 7 | Card | 4 | High |
| 8 | TabBar | 7 | High |
| 9 | Stepper | 2 | Medium |
| 10 | Tooltip | 3 | Medium |
| 11 | PriceDisplay | 6 | Medium |
| 12 | DatePicker | 9 | Medium |
| 13 | SelectField | 9 | Medium |
| 14 | FormField | 3 | Medium |
| 15 | Spinner | 2 | Low |
| 16 | SubscriptionCard | 9 | Medium |
| 17 | StatCard | 8 | Medium |
| 18 | BurnerCardVisual | 11 | Medium |
| 19 | SegmentedControl | 4 | Low |
| 20 | ToastConfig | 20+ | Medium |
| 21 | BottomSheet | 4 | Low |
| 22 | Modal | 1 | Low |
| 23 | SearchInput | 8 | Low |
| 24 | Skeleton | (if exists) | Low |
| 25 | SubscriptionForm | 6 | Medium |
| 26 | OnboardingScreen | 1 | Low |
| 27 | ServiceGrid | 4 | Low |

**For each component, follow these steps:**

1. Write/update test file
2. Rewrite `.styles.ts` with SVA
3. Delete `.constants.ts` if it only contained colors
4. Update component `.tsx` to use `useColorScheme()` + SVA
5. Run TypeScript check
6. Commit with message: `refactor(mobile): migrate [ComponentName] to SVA theme system`

---

## Phase 3: Web Fixes

### Task 28: Fix Tooltip Hardcoded Colors

**Files:**
- Modify: `klard-web/src/components/ui/tooltip.tsx`

**Step 1: Read current implementation**

Check the current hardcoded values in tooltip.tsx.

**Step 2: Replace with semantic tokens**

```typescript
// Replace:
"bg-[#0F172A] text-[#F8FAFC] dark:bg-[#F8FAFC] dark:text-[#0F172A]"

// With:
"bg-popover text-popover-foreground"
```

**Step 3: Verify build**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-web build`

Expected: Build succeeds

**Step 4: Commit**

```bash
git add klard-web/src/components/ui/tooltip.tsx
git commit -m "fix(web): replace hardcoded colors in Tooltip with semantic tokens"
```

---

### Task 29: Fix Progress Bar Colors

**Files:**
- Modify: `klard-web/src/components/ui/progress-bar.tsx`

**Step 1: Replace slate colors with semantic tokens**

```typescript
// Replace:
"text-slate-600 dark:text-slate-400"
// With:
"text-muted-foreground"

// Replace:
"bg-slate-200 dark:bg-slate-700"
// With:
"bg-muted"
```

**Step 2: Commit**

```bash
git add klard-web/src/components/ui/progress-bar.tsx
git commit -m "fix(web): replace hardcoded colors in ProgressBar with semantic tokens"
```

---

### Task 30: Fix Skeleton Colors

**Files:**
- Modify: `klard-web/src/components/ui/skeleton.tsx`

**Step 1: Replace slate colors**

```typescript
// Replace:
"bg-slate-200/80 dark:bg-slate-700/60"
// With:
"bg-muted/80"
```

**Step 2: Commit**

```bash
git add klard-web/src/components/ui/skeleton.tsx
git commit -m "fix(web): replace hardcoded colors in Skeleton with semantic tokens"
```

---

## Phase 4: Prevention

### Task 31: Add ESLint Rule

**Files:**
- Modify: `klard-mobile/.eslintrc.js` (or `.eslintrc.json`)

**Step 1: Add no-restricted-syntax rule**

```javascript
// Add to rules section:
'no-restricted-syntax': [
  'warn', // Start with warn, upgrade to error after migration
  {
    selector: 'Literal[value=/^#[0-9A-Fa-f]{3,8}$/]',
    message: 'Hardcoded hex colors are not allowed. Use sva() with theme colors from @/styles/colors instead.',
  },
  {
    selector: 'TemplateLiteral:has(TemplateElement[value.raw=/^#[0-9A-Fa-f]{3,8}$/])',
    message: 'Hardcoded hex colors in template literals are not allowed. Use sva() with theme colors.',
  },
],
```

**Step 2: Run lint to see current violations**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile lint`

Expected: Warnings for any remaining violations

**Step 3: Commit**

```bash
git add klard-mobile/.eslintrc.js
git commit -m "chore(mobile): add ESLint rule to prevent hardcoded colors"
```

---

### Task 32: Update AGENTS.md

**Files:**
- Modify: `klard-mobile/AGENTS.md`

**Step 1: Add theming section**

Add a section documenting the SVA system:

```markdown
## MANDATORY: Theme System (SVA)

**All component styles MUST use the SVA (Style Variance Authority) system.**

### Usage Pattern

```typescript
// In .styles.ts files:
import { sva } from '@/styles/sva';

export const componentStyles = sva({
  base: { /* static styles */ },
  variants: {
    variant: {
      primary: (colors) => ({ backgroundColor: colors.primary }),
    },
  },
});

// In component files:
import { useColorScheme } from 'react-native';
const isDark = useColorScheme() === 'dark';
const styles = componentStyles(isDark, { variant: 'primary' });
```

### Rules

- **NEVER** use hardcoded hex colors (#FFFFFF, #0F172A, etc.)
- **NEVER** use hardcoded rgba() values
- **ALWAYS** use colors from `@/styles/colors` via SVA functions
- **ALWAYS** test components in both light and dark modes
```

**Step 2: Commit**

```bash
git add klard-mobile/AGENTS.md
git commit -m "docs(mobile): add SVA theme system documentation to AGENTS.md"
```

---

## Final Verification

### Task 33: Full Test Suite

**Step 1: Run all mobile tests**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile test --run`

Expected: All tests pass

**Step 2: Run TypeScript check**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm --filter klard-mobile exec tsc --noEmit`

Expected: No errors

**Step 3: Run lint**

Run: `cd /Users/drcraig/Desktop/PersonalProjects/klard-apps && pnpm lint`

Expected: No errors (warnings OK for unmigrated components)

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore(mobile): complete SVA theme system migration"
```

---

## Summary

| Phase | Tasks | Components |
|-------|-------|------------|
| **0. Expo Config (PREREQUISITE)** | **0** | **app.json userInterfaceStyle** |
| 1. Infrastructure | 1-3 | sva.ts, colors.ts, exports |
| 2. Component Migration | 4-27 | 24 components |
| 3. Web Fixes | 28-30 | tooltip, progress-bar, skeleton |
| 4. Prevention | 31-32 | ESLint rule, AGENTS.md |
| 5. Verification | 33 | Full test suite |

**Total Tasks: 34 (including Task 0)**
**Estimated Time: 4-6 hours with parallel execution**

> **CRITICAL:** Task 0 MUST be completed first, or `useColorScheme()` will always return `'light'` regardless of system settings!