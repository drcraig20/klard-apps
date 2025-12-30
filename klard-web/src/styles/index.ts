/**
 * Klard Design System - Token Exports (Web)
 *
 * TypeScript design tokens that mirror the CSS variables in globals.css.
 * Use CSS variables (via Tailwind) for styling when possible.
 * Use these TypeScript values for:
 * - Type safety in calculations
 * - Dynamic value generation
 * - Non-CSS contexts (charts, canvas, etc.)
 *
 * SOLID Compliance:
 * - SRP: Re-exports only, no logic
 * - OCP: Add new token files without modifying existing
 */

// Colors
export {
  lightColors,
  darkColors,
  semanticColors,
  burnerCardColors,
  type LightColors,
  type DarkColors,
  type SemanticColors,
  type BurnerCardColors,
  type ColorScheme,
} from './colors';

// Spacing
export {
  spacing,
  spacingPx,
  namedSpacing,
  componentSpacing,
  type Spacing,
  type SpacingPx,
  type NamedSpacing,
  type ComponentSpacing,
  type SpacingKey,
} from './spacing';

// Radius
export {
  radius,
  radiusPx,
  componentRadius,
  type Radius,
  type RadiusPx,
  type ComponentRadius,
  type RadiusKey,
} from './radius';

// Effects
export {
  glassmorphism,
  glowEffects,
  shadowEffects,
  focusEffects,
  type Glassmorphism,
  type GlowEffects,
  type ShadowEffects,
  type FocusEffects,
  type ShadowKey,
} from './effects';

// Animation
export {
  duration,
  durationMs,
  easing,
  animation,
  scaleValues,
  type Duration,
  type DurationMs,
  type Easing,
  type Animation,
  type ScaleValues,
  type DurationKey,
  type EasingKey,
} from './animation';