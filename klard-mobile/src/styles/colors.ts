/**
 * Klard Design System - Colors Re-export (Mobile)
 *
 * This file re-exports from the modular colors/ directory for backward compatibility.
 * New code should import directly from '@/styles/colors' (the directory).
 *
 * @see klard-mobile/src/styles/colors/ (modular color system)
 * @see docs/design/tokens-reference.md (full documentation)
 */

// Re-export everything from the modular colors directory
export { type ColorScheme, type ThemeColors } from './colors/index';

// Export the individual themes for direct access
export { lightTheme, darkTheme } from './colors/index';

// Export palette for direct color access
export { teal, slate, semanticBase } from './colors/index';
