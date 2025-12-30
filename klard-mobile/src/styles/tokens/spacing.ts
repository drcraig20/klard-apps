/**
 * Klard Design System - Spacing Tokens (Mobile)
 *
 * Base unit: 4px grid system
 * These are the canonical values - all spacing should use these tokens.
 *
 * SOLID Compliance:
 * - SRP: Only spacing values
 * - OCP: Extend via derivedSpacing, not modifying base
 */

// ============================================================================
// BASE SPACING SCALE (numeric values for React Native)
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
// COMPONENT-SPECIFIC SPACING (derived from base tokens)
// ============================================================================

export const componentSpacing = {
  // Card padding
  cardPadding: spacing[8], // 32
  cardPaddingSm: spacing[4], // 16
  cardPaddingLg: spacing[10], // 40

  // Button padding
  buttonPaddingX: spacing[4], // 16
  buttonPaddingY: spacing[2] + 2, // 10
  buttonPaddingXSm: spacing[3], // 12
  buttonPaddingYSm: spacing[1] + 2, // 6
  buttonPaddingXLg: spacing[6], // 24
  buttonPaddingYLg: spacing[3] + 2, // 14

  // Input padding
  inputPaddingX: spacing[3], // 12
  inputPaddingY: spacing[2] + 2, // 10
} as const;

// ============================================================================
// LAYOUT SPACING (derived from base tokens)
// ============================================================================

export const layoutSpacing = {
  sectionGap: spacing[12], // 48
  contentGap: spacing[6], // 24
  itemGap: spacing[4], // 16
  inlineGap: spacing[2], // 8

  // Screen padding (with safe area consideration)
  screenPaddingX: spacing[4], // 16
  screenPaddingY: spacing[4], // 16
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Spacing = typeof spacing;
export type NamedSpacing = typeof namedSpacing;
export type ComponentSpacing = typeof componentSpacing;
export type LayoutSpacing = typeof layoutSpacing;
export type SpacingKey = keyof typeof spacing;
export type NamedSpacingKey = keyof typeof namedSpacing;