/**
 * Klard Design System - Border Radius Tokens
 *
 * SOLID Compliance:
 * - SRP: Only border radius values
 * - OCP: Extend by adding new radius keys, not modifying existing
 * - DIP: Platform packages depend on these abstractions
 *
 * Scale: sm (8px), md (12px), lg (16px), xl (24px)
 */

// ============================================================================
// NUMERIC RADIUS SCALE (for calculations)
// ============================================================================

export const radius = {
  // Named scale
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,

  // Component-specific radius
  button: 16, // lg
  buttonSm: 8, // sm
  buttonPill: 9999, // full

  card: 16, // lg
  cardSm: 12, // md
  cardLg: 24, // xl

  input: 8, // sm
  inputLg: 12, // md

  badge: 9999, // full (pill)
  badgeSquare: 8, // sm

  avatar: 9999, // full (circular)
  avatarSquare: 12, // md

  modal: 24, // xl
  toast: 12, // md
  tooltip: 8, // sm
} as const;

// ============================================================================
// RADIUS SCALE WITH UNITS (for CSS)
// ============================================================================

export const radiusScale = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Radius = typeof radius;
export type RadiusScale = typeof radiusScale;
export type RadiusKey = keyof typeof radiusScale;
