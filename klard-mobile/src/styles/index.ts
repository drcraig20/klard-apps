/**
 * Klard Mobile Styles - Main Export
 *
 * This module exports all styling utilities and design tokens.
 * Prefer using the tokens from ./tokens for new code.
 */

// Colors (canonical source for mobile)
export { Colors, type ColorScheme, type ThemeColors } from './colors';

// SVA styling system
export { sva, type SVAConfig, type VariantProps } from './sva';

// Typography
export { typography, type TypographyKey } from './typography';

// Legacy spacing/radius exports (deprecated - use tokens instead)
export { spacing, borderRadius, type SpacingKey, type BorderRadiusKey } from './spacing';

// Common styles
export { commonStyles } from './common';

// Design tokens (preferred for new code)
export * from './tokens';
