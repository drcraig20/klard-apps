# Klard Design Tokens Reference

Single source of truth for design tokens across web and mobile platforms.

## Overview

The Klard design system uses consistent tokens across both web (Tailwind CSS 4) and mobile (React Native) platforms. This document provides a cross-platform reference for developers working on either platform.

## Token Alignment Status

| Category | Web Location | Mobile Location | Status |
|----------|--------------|-----------------|--------|
| Colors | `globals.css` | `styles/colors.ts` | Aligned |
| Radius | `globals.css` | `styles/tokens/radius.ts` | Aligned |
| Shadows | `globals.css` | `styles/tokens/effects.ts` | Aligned |
| Animation | `globals.css` | `styles/tokens/animation.ts` | Aligned |
| Glassmorphism | `globals.css` | `styles/tokens/effects.ts` | Aligned |
| Spacing | `globals.css` | `styles/tokens/spacing.ts` | Aligned |

---

## Radius Tokens

| Token | Value | Web CSS Variable | Mobile TS |
|-------|-------|------------------|-----------|
| none | 0px | `--rec-radius-none` | `radius.none` |
| sm | 8px | `--rec-radius-sm` | `radius.sm` |
| md | 12px | `--rec-radius-md` | `radius.md` |
| lg | 16px | `--rec-radius-lg` | `radius.lg` |
| xl | 24px | `--rec-radius-xl` | `radius.xl` |
| 2xl | 32px | `--rec-radius-2xl` | `radius['2xl']` |
| full | 9999px | `--rec-radius-full` | `radius.full` |

### Component-Specific Radius

| Component | Value | Web | Mobile |
|-----------|-------|-----|--------|
| Button | 12px | `--rec-radius-button` | `componentRadius.button` (16px) |
| Card | 12px | `--rec-radius-card` | `componentRadius.card` (16px) |
| Input | 8px | `--rec-radius-input` | `componentRadius.input` (8px) |
| Modal | 16px | `--rec-radius-modal` | `componentRadius.modal` (24px) |
| Badge | 9999px | `--rec-radius-badge` | `componentRadius.badge` (9999px) |
| Toast | 12px | `--rec-radius-toast` | `componentRadius.toast` (12px) |

---

## Animation Duration Tokens

| Token | Value | Web CSS Variable | Mobile TS |
|-------|-------|------------------|-----------|
| instant | 0ms | `--rec-animate-duration-instant` | `duration.instant` |
| fastest | 50ms | `--rec-animate-duration-fastest` | `duration.fastest` |
| faster | 100ms | `--rec-animate-duration-faster` | `duration.faster` |
| fast | 150ms | `--rec-animate-duration-fast` | `duration.fast` |
| normal | 200ms | `--rec-animate-duration-normal` | `duration.normal` |
| slow | 300ms | `--rec-animate-duration-slow` | `duration.slow` |
| slower | 500ms | `--rec-animate-duration-slower` | `duration.slower` |
| slowest | 700ms | `--rec-animate-duration-slowest` | `duration.slowest` |

### Easing Functions

| Token | Web CSS Variable | Mobile TS |
|-------|------------------|-----------|
| default | `--rec-animate-ease-default` | `easing.default` |
| in | `--rec-animate-ease-in` | `easing.easeIn` |
| out | `--rec-animate-ease-out` | `easing.easeOut` |
| in-out | `--rec-animate-ease-in-out` | `easing.easeInOut` |
| bounce | `--rec-animate-ease-bounce` | `easing.springBouncy` |
| spring | `--rec-animate-ease-spring` | `easing.spring` |
| emphasized | `--rec-animate-ease-emphasized` | `easing.emphasized` |

---

## Semantic Color Tokens

### Primary Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| primary | #0D7C7A | #15B5B0 | CTAs, interactive elements |
| primary-foreground | #FFFFFF | #FFFFFF | Text on primary |
| secondary | #15B5B0 | #0D7C7A | Accents |
| secondary-foreground | #FFFFFF | #F8FAFC | Text on secondary |

### Semantic Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| success | #059669 | #10B981 | Positive states, savings |
| warning | #D97706 | #F59E0B | Caution states |
| error | #DC2626 | #EF4444 | Error states |
| info | #3B82F6 | #60A5FA | Informational |

### Background Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| background | #FFFFFF | #0F172A | Page background |
| foreground | #0F172A | #F8FAFC | Primary text |
| muted | #F1F5F9 | #1E293B | Muted backgrounds |
| muted-foreground | #64748B | #94A3B8 | Secondary text |

### Surface Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| card | #FFFFFF | #1E293B | Card backgrounds |
| card-foreground | #0F172A | #F8FAFC | Card text |
| surface | rgba(255,255,255,0.8) | rgba(30,41,59,0.6) | Semi-transparent surfaces |
| surface-strong | rgba(255,255,255,0.95) | rgba(12,19,36,0.9) | Elevated surfaces |

### Border Colors

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| border | rgba(148,163,184,0.2) | rgba(148,163,184,0.12) | Default borders |
| border-strong | rgba(148,163,184,0.3) | rgba(148,163,184,0.2) | Emphasized borders |
| border-focus | rgba(148,163,184,0.5) | rgba(148,163,184,0.4) | Focus state borders |

---

## Shadow Tokens

| Token | Web CSS Variable | Mobile TS | Usage |
|-------|------------------|-----------|-------|
| xs | `--rec-shadow-xs` | `shadows.xs` | Subtle elevation |
| sm | `--rec-shadow-sm` | `shadows.sm` | Low elevation |
| md | `--rec-shadow-md` | `shadows.md` | Medium elevation |
| lg | `--rec-shadow-lg` | `shadows.lg` | High elevation |
| xl | `--rec-shadow-xl` | `shadows.xl` | Floating elements |
| card | `--rec-shadow-card` | `shadows.card` | Card default |
| card-elevated | `--rec-shadow-card-elevated` | `shadows.cardElevated` | Elevated cards |

---

## Glow Effects

| Token | Web Utility | Mobile TS | Usage |
|-------|-------------|-----------|-------|
| glow-primary | `shadow-glow-primary` | `glowEffects.*.primary` | Primary buttons |
| glow-success | `shadow-glow-success` | `glowEffects.*.success` | Success indicators |
| glow-warning | `shadow-glow-warning` | `glowEffects.*.warning` | Warning indicators |
| glow-error | `shadow-glow-error` | `glowEffects.*.error` | Error indicators |

### Glow Values

| Token | Light Value | Dark Value |
|-------|-------------|------------|
| primary | rgba(13,124,122,0.3) | rgba(21,181,176,0.35) |
| success | rgba(5,150,105,0.2) | rgba(16,185,129,0.25) |
| warning | rgba(217,119,6,0.2) | rgba(245,158,11,0.25) |
| error | rgba(220,38,38,0.2) | rgba(239,68,68,0.25) |

---

## Glassmorphism Tokens

| Token | Web CSS Variable | Mobile TS | Value |
|-------|------------------|-----------|-------|
| blur | `--rec-glass-blur` | `glassmorphism.blur.nav` | 12px |
| blur-card | `--rec-glass-blur-card` | `glassmorphism.blur.card` | 24px |
| blur-modal | `--rec-glass-blur-modal` | `glassmorphism.blur.modal` | 24px |
| blur-subtle | `--rec-glass-blur-subtle` | `glassmorphism.blur.subtle` | 8px |
| border-width | `--rec-glass-border-width` | N/A | 1px |

### Glass Background (by theme)

| Theme | Web Variable | Mobile TS |
|-------|--------------|-----------|
| Light | `--rec-color-surface` | `glassmorphism.background.light` |
| Dark | `--rec-color-surface` | `glassmorphism.background.dark` |

---

## Spacing Tokens

Base unit: 4px grid system

| Token | Value | Web Usage | Mobile TS |
|-------|-------|-----------|-----------|
| 0 | 0px | `p-0` | `spacing[0]` |
| 1 | 4px | `p-1` | `spacing[1]` |
| 2 | 8px | `p-2` | `spacing[2]` |
| 3 | 12px | `p-3` | `spacing[3]` |
| 4 | 16px | `p-4` | `spacing[4]` |
| 5 | 20px | `p-5` | `spacing[5]` |
| 6 | 24px | `p-6` | `spacing[6]` |
| 8 | 32px | `p-8` | `spacing[8]` |
| 10 | 40px | `p-10` | `spacing[10]` |
| 12 | 48px | `p-12` | `spacing[12]` |
| 16 | 64px | `p-16` | `spacing[16]` |

### Component-Specific Spacing

| Token | Value | Web Variable | Mobile TS |
|-------|-------|--------------|-----------|
| card | 32px | `--rec-spacing-card` | `componentSpacing.cardPadding` |
| card-sm | 16px | `--rec-spacing-card-sm` | `componentSpacing.cardPaddingSm` |
| card-lg | 40px | `--rec-spacing-card-lg` | `componentSpacing.cardPaddingLg` |
| section-gap | 48px | `--rec-spacing-section-gap` | `layoutSpacing.sectionGap` |
| content-gap | 24px | `--rec-spacing-content-gap` | `layoutSpacing.contentGap` |
| item-gap | 16px | `--rec-spacing-item-gap` | `layoutSpacing.itemGap` |
| inline-gap | 8px | `--rec-spacing-inline-gap` | `layoutSpacing.inlineGap` |

---

## Focus Ring Tokens

| Token | Web Variable | Mobile TS |
|-------|--------------|-----------|
| ring-color (light) | `--rec-focus-ring-color` | `focusEffects.ring.light` |
| ring-color (dark) | `--rec-focus-ring-color` | `focusEffects.ring.dark` |
| ring-width | `--rec-focus-ring-width` | `focusEffects.ringWidth` |
| ring-offset | `--rec-focus-ring-offset` | `focusEffects.ringOffset` |

---

## Component Variant Standards

See `docs/design/component-variants.md` for component-specific variant documentation.

---

## Usage Examples

### Web (Tailwind CSS 4)

```tsx
// Using CSS variables directly
<div className="bg-primary text-primary-foreground rounded-md shadow-glow-primary">
  Primary Button
</div>

// Using Klard utility classes
<div className="klard-glass-panel rounded-lg shadow-elevation-md">
  Glass Card
</div>

// Using spacing and radius tokens
<div className="p-8 rounded-[var(--rec-radius-lg)]">
  Content with 32px padding and 16px radius
</div>
```

### Mobile (React Native)

```tsx
import { radius, componentRadius } from '@/styles/tokens/radius';
import { shadows } from '@/styles/tokens/effects';
import { spacing } from '@/styles/tokens/spacing';
import { useThemeColors } from '@/hooks/useThemeColors';

function MyComponent() {
  const { colors } = useThemeColors();

  return (
    <View style={[
      {
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        padding: spacing[8],
      },
      shadows.card,
    ]}>
      <Text style={{ color: colors.primaryForeground }}>
        Primary Button
      </Text>
    </View>
  );
}
```

---

## Adding New Tokens

When adding new design tokens, follow this process:

1. **Define in both platforms**
   - Web: Add to `klard-web/src/app/globals.css` (or appropriate token file in `styles/tokens/`)
   - Mobile: Add to appropriate file in `klard-mobile/src/styles/tokens/`

2. **Use matching token names**
   - Web uses kebab-case CSS variables: `--rec-token-name`
   - Mobile uses camelCase TypeScript: `tokenName`

3. **Document in this file**
   - Add the token to the appropriate section above
   - Include values for both light and dark themes if applicable

4. **Update TypeScript types** (mobile only)
   - Export appropriate type definitions for the new tokens

5. **Test on both platforms**
   - Verify the token renders correctly in light and dark modes
   - Check that the values are visually consistent across platforms

---

## Token Naming Conventions

### Web (CSS Variables)

All Klard tokens use the `--rec-` prefix (Recommended CSS):

```css
--rec-{category}-{name}
--rec-{category}-{name}-{variant}
```

Examples:
- `--rec-color-primary`
- `--rec-radius-lg`
- `--rec-shadow-card-elevated`

### Mobile (TypeScript)

Tokens are organized in exported objects with camelCase keys:

```typescript
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
}
```

Access: `radius.lg`, `colors.primary`, `shadows.card`

---

## Cross-Platform Considerations

### Colors

- Web uses CSS variables that auto-switch with `[data-theme="dark"]`
- Mobile uses the `useThemeColors()` hook to get theme-aware colors

### Shadows

- Web uses CSS box-shadow values
- Mobile uses React Native shadow style objects with `elevation` for Android

### Blur Effects

- Web uses `backdrop-filter: blur()`
- Mobile requires `expo-blur` or similar for blur effects

### Typography

- See the Klard Design System document for font specifications
- Web uses Inter/SF Pro via CSS
- Mobile uses system fonts with platform-specific adjustments
