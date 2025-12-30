/**
 * Klard Design System - Token Exports (Mobile)
 *
 * Single source of truth for all design tokens in the mobile app.
 * Import from here for consistent styling across components.
 *
 * SOLID Compliance:
 * - SRP: Re-exports only, no logic
 * - OCP: Add new token files without modifying existing
 */

// Spacing
export {
  spacing,
  namedSpacing,
  componentSpacing,
  layoutSpacing,
  type Spacing,
  type NamedSpacing,
  type ComponentSpacing,
  type LayoutSpacing,
  type SpacingKey,
  type NamedSpacingKey,
} from './spacing';

// Radius
export {
  radius,
  componentRadius,
  type Radius,
  type ComponentRadius,
  type RadiusKey,
} from './radius';

// Effects
export {
  shadows,
  glassmorphism,
  glowEffects,
  focusEffects,
  type Shadows,
  type Glassmorphism,
  type GlowEffects,
  type FocusEffects,
  type ShadowKey,
} from './effects';

// Animation
export {
  duration,
  easing,
  springConfig,
  timingConfig,
  scaleValues,
  type Duration,
  type Easing,
  type SpringConfig,
  type TimingConfig,
  type ScaleValues,
  type DurationKey,
  type EasingKey,
} from './animation';