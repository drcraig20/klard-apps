/**
 * Klard Design System - Design Tokens
 *
 * Single source of truth for all design tokens.
 * Platform packages (web, mobile) import from here.
 *
 * SOLID Compliance:
 * - SRP: Re-exports only, no logic
 * - OCP: Add new token files without modifying existing
 * - DIP: Platforms depend on this abstraction
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
} from './effects';

// Spacing
export {
  spacing,
  spacingScale,
  type Spacing,
  type SpacingScale,
  type SpacingKey,
} from './spacing';

// Radius
export {
  radius,
  radiusScale,
  type Radius,
  type RadiusScale,
  type RadiusKey,
} from './radius';

// Animation
export {
  duration,
  easing,
  animation,
  mobileAnimation,
  type Duration,
  type Easing,
  type Animation,
  type MobileAnimation,
} from './animation';
