/**
 * Klard Design System - Effect Tokens (Web)
 *
 * Visual effects for shadows, glows, and glassmorphism.
 * These mirror the CSS --rec-* variables in globals.css.
 *
 * SOLID Compliance:
 * - SRP: Only visual effect values
 * - OCP: Extend by adding new effect types
 */

// ============================================================================
// GLASSMORPHISM EFFECTS
// ============================================================================

export const glassmorphism = {
  blur: {
    card: '24px',
    nav: '12px',
    modal: '24px',
    subtle: '8px',
  },

  border: {
    light: 'rgba(148, 163, 184, 0.2)',
    dark: 'rgba(148, 163, 184, 0.12)',
  },

  background: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(30, 41, 59, 0.6)',
  },

  overlay: {
    light: 'rgba(255, 255, 255, 0.85)',
    dark: 'rgba(5, 8, 16, 0.85)',
  },

  backdrop: {
    light: 'rgba(15, 23, 42, 0.5)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

// ============================================================================
// GLOW EFFECTS
// ============================================================================

export const glowEffects = {
  light: {
    primary: '0 0 24px rgba(13, 124, 122, 0.25)',
    primaryHover: '0 0 32px rgba(13, 124, 122, 0.35)',
    success: '0 0 24px rgba(5, 150, 105, 0.3)',
    warning: '0 0 24px rgba(217, 119, 6, 0.3)',
    error: '0 0 24px rgba(220, 38, 38, 0.3)',
  },

  dark: {
    primary: '0 0 24px rgba(21, 181, 176, 0.35)',
    primaryHover: '0 0 32px rgba(21, 181, 176, 0.45)',
    success: '0 0 24px rgba(16, 185, 129, 0.35)',
    warning: '0 0 24px rgba(245, 158, 11, 0.35)',
    error: '0 0 24px rgba(239, 68, 68, 0.35)',
  },

  badge: {
    light: {
      success: '0 0 8px rgba(5, 150, 105, 0.3)',
      warning: '0 0 8px rgba(217, 119, 6, 0.3)',
      error: '0 0 8px rgba(220, 38, 38, 0.3)',
    },
    dark: {
      success: '0 0 8px rgba(16, 185, 129, 0.3)',
      warning: '0 0 8px rgba(245, 158, 11, 0.3)',
      error: '0 0 8px rgba(239, 68, 68, 0.3)',
    },
  },
} as const;

// ============================================================================
// SHADOW EFFECTS
// ============================================================================

export const shadowEffects = {
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
  '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',

  card: '0 2px 12px rgba(15, 23, 42, 0.08)',
  cardElevated: '0 4px 20px rgba(15, 23, 42, 0.12)',
  hero: '0 35px 120px rgba(15, 23, 42, 0.1)',

  inner: 'inset 0 2px 4px 0 rgba(15, 23, 42, 0.05)',
  none: 'none',
} as const;

// ============================================================================
// FOCUS EFFECTS
// ============================================================================

export const focusEffects = {
  ring: {
    light: 'rgba(13, 124, 122, 0.4)',
    dark: 'rgba(21, 181, 176, 0.5)',
  },

  ringWidth: '2px',
  ringOffset: '2px',

  outline: {
    light: '2px solid rgba(13, 124, 122, 0.4)',
    dark: '2px solid rgba(21, 181, 176, 0.5)',
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Glassmorphism = typeof glassmorphism;
export type GlowEffects = typeof glowEffects;
export type ShadowEffects = typeof shadowEffects;
export type FocusEffects = typeof focusEffects;
export type ShadowKey = keyof typeof shadowEffects;