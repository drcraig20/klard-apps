/**
 * Klard Design System - Animation Tokens
 *
 * SOLID Compliance:
 * - SRP: Only animation values (durations, easings, transforms)
 * - OCP: Extend by adding new animation types, not modifying existing
 * - DIP: Platform packages depend on these abstractions
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
// EASING FUNCTIONS
// ============================================================================

export const easing = {
  // Standard easings
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Emphasized easings
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',

  // Spring-like easings
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  springBouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Smooth transitions
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

// ============================================================================
// COMPOSITE ANIMATIONS (CSS animation shorthand ready)
// ============================================================================

export const animation = {
  // Button animations
  buttonPress: `transform ${duration.buttonPress}ms ${easing.easeOut}`,
  buttonHover: `all ${duration.buttonHover}ms ${easing.default}`,

  // Fade animations
  fadeIn: `opacity ${duration.normal}ms ${easing.easeOut}`,
  fadeOut: `opacity ${duration.fast}ms ${easing.easeIn}`,

  // Scale animations
  scaleIn: `transform ${duration.normal}ms ${easing.spring}`,
  scaleOut: `transform ${duration.fast}ms ${easing.easeIn}`,

  // Slide animations
  slideInUp: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInDown: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInLeft: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,
  slideInRight: `transform ${duration.slow}ms ${easing.emphasizedDecelerate}`,

  // Modal animations
  modalOverlay: `opacity ${duration.modalEnter}ms ${easing.easeOut}`,
  modalContent: `transform ${duration.modalEnter}ms ${easing.spring}, opacity ${duration.modalEnter}ms ${easing.easeOut}`,

  // Toast animations
  toastEnter: `transform ${duration.toastEnter}ms ${easing.spring}, opacity ${duration.toastEnter}ms ${easing.easeOut}`,
  toastExit: `transform ${duration.toastExit}ms ${easing.easeIn}, opacity ${duration.toastExit}ms ${easing.easeIn}`,

  // Scale values for transforms
  hoverScale: 1.02,
  pressScale: 0.98,
  cardHoverScale: 1.01,
} as const;

// ============================================================================
// MOBILE-SPECIFIC ANIMATION VALUES (React Native)
// ============================================================================

export const mobileAnimation = {
  // Spring config for React Native Reanimated
  springConfig: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },

  // Timing config
  timingConfig: {
    duration: duration.normal,
  },

  // Haptic-paired durations
  hapticDelay: 0,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Duration = typeof duration;
export type Easing = typeof easing;
export type Animation = typeof animation;
export type MobileAnimation = typeof mobileAnimation;
