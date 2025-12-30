/**
 * Klard Design System - Animation Tokens (Mobile)
 *
 * Animation values optimized for React Native and Reanimated.
 * Uses milliseconds for duration and spring configs for natural motion.
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
// EASING FUNCTIONS (cubic bezier arrays for Reanimated)
// ============================================================================

export const easing = {
  // Standard easings (as Bezier control points)
  default: [0.4, 0, 0.2, 1] as const,
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,

  // Emphasized easings
  emphasized: [0.2, 0, 0, 1] as const,
  emphasizedDecelerate: [0.05, 0.7, 0.1, 1] as const,
  emphasizedAccelerate: [0.3, 0, 0.8, 0.15] as const,

  // Spring-like easings
  spring: [0.175, 0.885, 0.32, 1.275] as const,
  springBouncy: [0.68, -0.55, 0.265, 1.55] as const,

  // Smooth transitions
  smooth: [0.25, 0.1, 0.25, 1] as const,
} as const;

// ============================================================================
// SPRING CONFIGURATIONS (for React Native Reanimated)
// ============================================================================

export const springConfig = {
  // Default spring
  default: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },

  // Snappy spring (quick response)
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },

  // Bouncy spring (playful)
  bouncy: {
    damping: 10,
    stiffness: 100,
    mass: 1,
  },

  // Gentle spring (slow, smooth)
  gentle: {
    damping: 20,
    stiffness: 80,
    mass: 1.2,
  },

  // Stiff spring (almost no bounce)
  stiff: {
    damping: 30,
    stiffness: 400,
    mass: 0.8,
  },
} as const;

// ============================================================================
// TIMING CONFIGURATIONS
// ============================================================================

export const timingConfig = {
  fast: {
    duration: duration.fast,
  },
  normal: {
    duration: duration.normal,
  },
  slow: {
    duration: duration.slow,
  },
} as const;

// ============================================================================
// TRANSFORM SCALE VALUES
// ============================================================================

export const scaleValues = {
  hoverScale: 1.02,
  pressScale: 0.98,
  cardHoverScale: 1.01,
  buttonPressScale: 0.95,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Duration = typeof duration;
export type Easing = typeof easing;
export type SpringConfig = typeof springConfig;
export type TimingConfig = typeof timingConfig;
export type ScaleValues = typeof scaleValues;
export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;