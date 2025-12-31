/**
 * Klard Design System - Border Radius Tokens (Mobile)
 *
 * Scale: sm (8px), md (12px), lg (16px), xl (24px).
 * These are the canonical values from the design system.
 *
 * @see klard-web/src/styles/tokens/radius.css (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 *
 * SOLID Compliance:
 * - SRP: Only border radius values
 * - OCP: Extend via componentRadius, not modifying base
 */

// ============================================================================
// BASE RADIUS SCALE
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
// COMPONENT-SPECIFIC RADIUS (derived from base tokens)
// ============================================================================

export const componentRadius = {
  // Button radius
  button: radius.lg, // 16
  buttonSm: radius.sm, // 8
  buttonPill: radius.full, // 9999

  // Card radius
  card: radius.lg, // 16
  cardSm: radius.md, // 12
  cardLg: radius.xl, // 24

  // Input radius
  input: radius.sm, // 8
  inputLg: radius.md, // 12

  // Badge radius
  badge: radius.full, // full (pill)
  badgeSquare: radius.sm, // 8

  // Avatar radius
  avatar: radius.full, // full (circular)
  avatarSquare: radius.md, // 12

  // Modal & overlay radius
  modal: radius.xl, // 24
  bottomSheet: radius.xl, // 24
  toast: radius.md, // 12
  tooltip: radius.sm, // 8
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Radius = typeof radius;
export type ComponentRadius = typeof componentRadius;
export type RadiusKey = keyof typeof radius;