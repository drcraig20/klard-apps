/**
 * Legacy spacing and borderRadius exports.
 *
 * @deprecated Use tokens/spacing.ts and tokens/radius.ts instead.
 * These are kept for backward compatibility with existing components.
 *
 * Migration:
 *   import { namedSpacing, radius } from '@/styles/tokens';
 */

import { namedSpacing, radius as tokenRadius } from './tokens';

// Re-export named spacing with legacy names
export const spacing = {
  xs: namedSpacing.xs,   // 4
  sm: namedSpacing.sm,   // 8
  md: namedSpacing.md,   // 16
  lg: namedSpacing.lg,   // 24
  xl: namedSpacing.xl,   // 32
  xxl: namedSpacing['2xl'], // 48
} as const;

// Re-export radius with canonical values
// NOTE: Values updated to match design system (sm:8, md:12, lg:16 instead of sm:4, md:8, lg:12)
export const borderRadius = {
  sm: tokenRadius.sm,    // 8 (was 4)
  md: tokenRadius.md,    // 12 (was 8)
  lg: tokenRadius.lg,    // 16 (was 12)
  xl: tokenRadius.xl,    // 24 (was 16)
  full: tokenRadius.full, // 9999
} as const;

export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
