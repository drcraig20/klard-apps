/**
 * Klard Design System - Mobile Styles Entry Point
 *
 * Main export for all mobile styling utilities and design tokens.
 * Prefer using the tokens from ./tokens for new code.
 *
 * @see klard-web/src/styles/index.ts (web counterpart)
 * @see klard-mobile/src/styles/tokens/index.ts (token exports)
 * @see docs/design/tokens-reference.md (full documentation)
 *
 * SOLID Compliance:
 * - SRP: Re-exports only, no implementation logic
 * - OCP: Add new exports without modifying existing
 */

// Colors (canonical source for mobile)
export { lightTheme, darkTheme, type ColorScheme, type ThemeColors } from './colors';

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
