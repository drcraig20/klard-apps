# Theme Compliance Design - SVA System

**Date:** 2025-12-13
**Status:** Approved
**Scope:** klard-mobile (primary), klard-web (secondary)

## Executive Summary

This design addresses **122+ hardcoded color violations** in klard-mobile and **~10 violations** in klard-web. The solution introduces a **Style Variance Authority (SVA)** utility for React Native that provides a CVA-like API while following Expo's official theming recommendations.

## Problem Statement

### Mobile (Critical)
- 24 components have hardcoded hex colors that don't respond to theme changes
- `.styles.ts` files use `StyleSheet.create()` at module load time, before theme context is available
- Dark mode is effectively broken across AlertBanner, AlertCard, Button, DatePicker, SelectField, and many more

### Web (Medium)
- ~10 components use hardcoded colors instead of semantic Tailwind tokens
- Violations include `bg-[#0F172A]`, `text-slate-600`, and hardcoded RGBA shadows

## Solution: Collapsed SVA (Style Variance Authority)

### Architecture

```
src/styles/
├── colors.ts          # Enriched theme color definitions
├── sva.ts             # NEW: Style Variance Authority utility
├── useThemeColors.ts  # Simplified (kept for backwards compat)
└── index.ts           # Re-exports

src/components/ui/Button/
├── Button.tsx         # Component using SVA
├── button.styles.ts   # SVA style definitions (collapsed)
└── index.ts
```

### Key Benefits

1. **CVA-like API** - Familiar mental model for developers using CVA on web
2. **Pre-computed performance** - Both themes compiled at import time
3. **Automatic variant selection** - `buttonStyles(isDark, { variant, size })`
4. **Collapsed definitions** - Define colors once with `(colors) => ({...})` functions
5. **Type-safe variants** - Full TypeScript inference
6. **Compound variant support** - For complex variant combinations

### SVA Core API

```typescript
// Definition
export const buttonStyles = sva({
  base: { paddingHorizontal: 16, borderRadius: 8 },
  variants: {
    variant: {
      primary: (colors) => ({ backgroundColor: colors.primary }),
      secondary: (colors) => ({ backgroundColor: colors.secondary }),
    },
    size: {
      sm: { paddingVertical: 8 },
      md: { paddingVertical: 12 },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

// Usage
const isDark = useColorScheme() === 'dark';
const styles = buttonStyles(isDark, { variant: 'primary', size: 'md' });
```

## Color System (Enriched)

### Token Categories

| Category | Count | Examples |
|----------|-------|----------|
| Primary/Secondary | 8 | `primary`, `primaryForeground`, `primaryHover` |
| Accent/Semantic | 6 | `success`, `warning`, `error` |
| Neutral/Background | 4 | `background`, `foreground`, `muted` |
| Surface | 6 | `surface`, `surface1-4`, `surfaceStrong` |
| Card/Popover | 4 | `card`, `cardForeground`, `popover` |
| Border/Input | 5 | `border`, `borderStrong`, `borderFocus`, `input`, `ring` |
| Text Hierarchy | 4 | `textPrimary`, `textSecondary`, `textTertiary`, `textDisabled` |
| Alert States | 12 | `infoBackground/Foreground/Border` × 4 types |
| Interactive States | 4 | `hoverBackground`, `activeBackground`, `selectedBackground`, `disabledBackground` |
| Overlay | 4 | `overlay`, `overlaySoft`, `overlayStrong`, `backdropOverlay` |
| Glassmorphism | 2 | `glassBorder`, `glassBackground` |
| Glow Effects | 5 | `glowPrimary`, `glowSuccess`, `glowWarning`, `glowError`, `focusRing` |
| Gradients | 6 | `gradientPrimaryStart/End`, `gradientSuccessStart/End`, `gradientBackgroundStart/End` |
| Shadow Colors | 4 | `shadowColor`, `shadowColorSm/Md/Lg` |
| Chart | 5 | `chart1-5` |
| BurnerCard | 4 | `burnerActive`, `burnerLocked`, `burnerBlocked`, `burnerExpired` |

**Total: ~79 tokens per theme**

## Migration Strategy

### Phase 1: Infrastructure
1. Create `sva.ts` utility
2. Enrich `colors.ts` with all tokens
3. Export from `styles/index.ts`

### Phase 2: Component Migration (Priority Order)
1. **Button** - Foundation component, used everywhere
2. **AlertBanner** - 22 violations, highly visible
3. **AlertCard** - 23 violations
4. **Card** - Base for many components
5. **TabBar** - Navigation, always visible
6. **All remaining components** (19 more)

### Phase 3: Web Fixes
1. Replace hardcoded hex in `tooltip.tsx`
2. Replace `bg-slate-*` with `bg-muted`
3. Replace hardcoded shadows with utilities

### Phase 4: Prevention
1. Add ESLint rule to flag hardcoded colors
2. Update AGENTS.md with theming requirements

## ESLint Rule

```javascript
{
  'no-restricted-syntax': [
    'error',
    {
      selector: 'Literal[value=/^#[0-9A-Fa-f]{3,8}$/]',
      message: 'Hardcoded hex colors not allowed. Use sva() with theme colors.',
    },
    {
      selector: 'Literal[value=/^rgba?\\(/]',
      message: 'Hardcoded RGB/RGBA not allowed. Use sva() with theme colors.',
    },
  ],
}
```

## Success Criteria

- [ ] All 24 mobile components use SVA with dynamic theming
- [ ] Dark mode toggle changes all component colors instantly
- [ ] All 10 web violations fixed with semantic tokens
- [ ] ESLint rule catches new violations in CI
- [ ] TypeScript compilation passes with no errors

## References

- Expo Theming Docs: https://docs.expo.dev/develop/user-interface/color-themes
- CVA (web): https://cva.style
- Klard Design System: `docs/design/Klard Design System.md`
