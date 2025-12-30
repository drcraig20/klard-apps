/**
 * Klard Design System - Spacing Tokens (Web)
 *
 * Base unit: 4px grid system.
 * These mirror the CSS --rec-* variables in globals.css.
 * Use Tailwind spacing classes when possible, use these for:
 * - TypeScript calculations
 * - Dynamic spacing values
 * - Non-Tailwind contexts
 *
 * SOLID Compliance:
 * - SRP: Only spacing values
 * - OCP: Extend via additional exports
 */

// ============================================================================
// BASE SPACING SCALE (numeric values)
// ============================================================================

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
} as const;

// ============================================================================
// SPACING SCALE WITH UNITS (for CSS)
// ============================================================================

export const spacingPx = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// ============================================================================
// NAMED SPACING (convenient aliases)
// ============================================================================

export const namedSpacing = {
  none: spacing[0],
  xs: spacing[1], // 4
  sm: spacing[2], // 8
  md: spacing[4], // 16
  lg: spacing[6], // 24
  xl: spacing[8], // 32
  '2xl': spacing[12], // 48
  '3xl': spacing[16], // 64
} as const;

// ============================================================================
// COMPONENT-SPECIFIC SPACING
// ============================================================================

export const componentSpacing = {
  cardPadding: spacing[8], // 32
  cardPaddingSm: spacing[4], // 16
  cardPaddingLg: spacing[10], // 40

  buttonPaddingX: spacing[4], // 16
  buttonPaddingY: 10, // 10 (not on grid)
  buttonPaddingXSm: spacing[3], // 12
  buttonPaddingYSm: 6, // 6
  buttonPaddingXLg: spacing[6], // 24
  buttonPaddingYLg: 14, // 14

  inputPaddingX: spacing[3], // 12
  inputPaddingY: 10, // 10

  sectionGap: spacing[12], // 48
  contentGap: spacing[6], // 24
  itemGap: spacing[4], // 16
  inlineGap: spacing[2], // 8
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Spacing = typeof spacing;
export type SpacingPx = typeof spacingPx;
export type NamedSpacing = typeof namedSpacing;
export type ComponentSpacing = typeof componentSpacing;
export type SpacingKey = keyof typeof spacing;