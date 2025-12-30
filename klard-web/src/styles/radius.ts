/**
 * Klard Design System - Border Radius Tokens (Web)
 *
 * Scale: sm (8px), md (12px), lg (16px), xl (24px)
 * These mirror the CSS --rec-radius-* variables in globals.css.
 *
 * SOLID Compliance:
 * - SRP: Only border radius values
 * - OCP: Extend via componentRadius
 */

// ============================================================================
// BASE RADIUS SCALE (numeric values)
// ============================================================================

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

// ============================================================================
// RADIUS SCALE WITH UNITS (for CSS)
// ============================================================================

export const radiusPx = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

// ============================================================================
// COMPONENT-SPECIFIC RADIUS
// ============================================================================

export const componentRadius = {
  button: radius.lg, // 16
  buttonSm: radius.sm, // 8
  buttonPill: radius.full, // 9999

  card: radius.lg, // 16
  cardSm: radius.md, // 12
  cardLg: radius.xl, // 24

  input: radius.sm, // 8
  inputLg: radius.md, // 12

  badge: radius.full, // pill
  badgeSquare: radius.sm, // 8

  avatar: radius.full, // circular
  avatarSquare: radius.md, // 12

  modal: radius.xl, // 24
  toast: radius.md, // 12
  tooltip: radius.sm, // 8
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Radius = typeof radius;
export type RadiusPx = typeof radiusPx;
export type ComponentRadius = typeof componentRadius;
export type RadiusKey = keyof typeof radius;