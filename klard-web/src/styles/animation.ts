/**
 * Klard Design System - Animation Tokens (Web)
 *
 * Animation values for CSS transitions and keyframes.
 * These mirror the CSS --rec-animate-* variables in globals.css.
 *
 * SOLID Compliance:
 * - SRP: Only animation values
 * - OCP: Extend by adding new animation presets
 */

// ============================================================================
// DURATION VALUES (milliseconds)
// ============================================================================

export const duration = {
  instant: 0,
  fastest: 50,
  faster: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
  slowest: 700,

  // Component-specific durations
  buttonPress: 100,
  buttonHover: 150,
  cardHover: 200,
  modalEnter: 300,
  modalExit: 200,
  toastEnter: 300,
  toastExit: 200,
  pageTransition: 300,
  celebrationDuration: 2000,
} as const;

// ============================================================================
// DURATION WITH UNITS (for CSS)
// ============================================================================

export const durationMs = {
  instant: '0ms',
  fastest: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  slowest: '700ms',
} as const;

// ============================================================================
// EASING FUNCTIONS (CSS cubic-bezier)
// ============================================================================

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  springBouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// ============================================================================
// COMPOSITE ANIMATIONS (CSS transition shorthand)
// ============================================================================

export const animation = {
  buttonPress: `transform ${duration.buttonPress}ms ${easing.easeOut}`,
  buttonHover: `all ${duration.buttonHover}ms ${easing.default}`,

  fadeIn: `opacity ${duration.normal}ms ${easing.easeOut}`,
  fadeOut: `opacity ${duration.fast}ms ${easing.easeIn}`,

  scaleIn: `transform ${duration.normal}ms ${easing.spring}`,
  scaleOut: `transform ${duration.fast}ms ${easing.easeIn}`,

  slideInUp: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInDown: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInLeft: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInRight: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,

  modalOverlay: `opacity ${duration.modalEnter}ms ${easing.easeOut}`,
  modalContent: `transform ${duration.modalEnter}ms ${easing.spring}, opacity ${duration.modalEnter}ms ${easing.easeOut}`,

  toastEnter: `transform ${duration.toastEnter}ms ${easing.spring}, opacity ${duration.toastEnter}ms ${easing.easeOut}`,
  toastExit: `transform ${duration.toastExit}ms ${easing.easeIn}, opacity ${duration.toastExit}ms ${easing.easeIn}`,
} as const;

// ============================================================================
// TRANSFORM SCALE VALUES
// ============================================================================

export const scaleValues = {
  hoverScale: 1.02,
  pressScale: 0.98,
  cardHoverScale: 1.01,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Duration = typeof duration;
export type DurationMs = typeof durationMs;
export type Easing = typeof easing;
export type Animation = typeof animation;
export type ScaleValues = typeof scaleValues;
export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;