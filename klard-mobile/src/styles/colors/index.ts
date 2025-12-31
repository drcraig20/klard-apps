/**
 * Klard Design System - Colors Index (Mobile)
 *
 * Barrel export for color system. Maintains backward compatibility
 * with existing Colors import while providing new modular access.
 *
 * @see klard-web/src/styles/themes/ (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 */

// Type exports
export type { ThemeColors, ColorScheme } from './semantic';

// Palette exports (for direct access to brand colors)
export { teal, slate, semanticBase } from './palette';

// Theme exports (for direct access to theme objects)
export { lightTheme } from './light';
export { darkTheme } from './dark';
