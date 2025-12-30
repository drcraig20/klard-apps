/**
 * Klard Design System - Spacing Tokens
 *
 * SOLID Compliance:
 * - SRP: Only spacing values (4px base grid)
 * - OCP: Extend by adding new spacing keys, not modifying existing
 * - DIP: Platform packages depend on these abstractions
 *
 * Base unit: 4px
 * Grid: 4/8 system (4, 8, 12, 16, 24, 32, 40, 48...)
 */

// ============================================================================
// NUMERIC SPACING SCALE (for calculations)
// ============================================================================

export const spacing = {
  // Core scale (multiplier * 4px)
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

  // Component-specific spacing
  cardPadding: 32,
  cardPaddingSm: 16,
  cardPaddingLg: 40,

  buttonPaddingX: 16,
  buttonPaddingY: 10,
  buttonPaddingXSm: 12,
  buttonPaddingYSm: 6,
  buttonPaddingXLg: 24,
  buttonPaddingYLg: 14,

  inputPaddingX: 12,
  inputPaddingY: 10,

  // Layout spacing
  sectionGap: 48,
  contentGap: 24,
  itemGap: 16,
  inlineGap: 8,
} as const;

// ============================================================================
// SPACING SCALE WITH UNITS (for CSS)
// ============================================================================

export const spacingScale = {
  // Pixel values
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '14': '56px',
  '16': '64px',
  '20': '80px',
  '24': '96px',

  // Rem values (for accessibility - 1rem = 16px base)
  '1rem': '0.25rem',
  '2rem': '0.5rem',
  '3rem': '0.75rem',
  '4rem': '1rem',
  '5rem': '1.25rem',
  '6rem': '1.5rem',
  '8rem': '2rem',
  '10rem': '2.5rem',
  '12rem': '3rem',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Spacing = typeof spacing;
export type SpacingScale = typeof spacingScale;
export type SpacingKey = keyof typeof spacing;
