/**
 * Klard Design System - Effect Tokens (Mobile)
 *
 * Visual effects for shadows, glows, and glassmorphism.
 * React Native compatible - uses numeric values and rgba strings.
 *
 * SOLID Compliance:
 * - SRP: Only visual effect values
 * - OCP: Extend by adding new effect types
 */

import { ViewStyle } from 'react-native';

// ============================================================================
// SHADOW EFFECTS (React Native style objects)
// ============================================================================

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  xs: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,

  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  } as ViewStyle,

  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  } as ViewStyle,

  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  } as ViewStyle,

  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  } as ViewStyle,

  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  } as ViewStyle,

  cardElevated: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  } as ViewStyle,
} as const;

// ============================================================================
// GLASSMORPHISM VALUES
// ============================================================================

export const glassmorphism = {
  blur: {
    card: 24,
    nav: 12,
    modal: 24,
    subtle: 8,
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
// GLOW EFFECTS (for special states)
// ============================================================================

export const glowEffects = {
  light: {
    primary: 'rgba(13, 124, 122, 0.25)',
    primaryHover: 'rgba(13, 124, 122, 0.35)',
    success: 'rgba(5, 150, 105, 0.3)',
    warning: 'rgba(217, 119, 6, 0.3)',
    error: 'rgba(220, 38, 38, 0.3)',
  },

  dark: {
    primary: 'rgba(21, 181, 176, 0.35)',
    primaryHover: 'rgba(21, 181, 176, 0.45)',
    success: 'rgba(16, 185, 129, 0.35)',
    warning: 'rgba(245, 158, 11, 0.35)',
    error: 'rgba(239, 68, 68, 0.35)',
  },
} as const;

// ============================================================================
// FOCUS EFFECTS
// ============================================================================

export const focusEffects = {
  ring: {
    light: 'rgba(13, 124, 122, 0.4)',
    dark: 'rgba(21, 181, 176, 0.5)',
  },

  ringWidth: 2,
  ringOffset: 2,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Shadows = typeof shadows;
export type Glassmorphism = typeof glassmorphism;
export type GlowEffects = typeof glowEffects;
export type FocusEffects = typeof focusEffects;
export type ShadowKey = keyof typeof shadows;