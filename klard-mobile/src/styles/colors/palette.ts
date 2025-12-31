/**
 * Klard Design System - Color Palette (Mobile)
 *
 * Brand palette colors - fixed values that don't change by theme.
 * Theme-specific variations are in light.ts and dark.ts.
 *
 * @see klard-web/src/styles/themes/ (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 */

// Brand teal palette
export const teal = {
  50: '#E6F5F5',
  100: '#CCEBEB',
  200: '#99D7D6',
  300: '#6DE2DD',
  400: '#4FD7D0',
  500: '#15B5B0',  // Vibrant teal
  600: '#0D7C7A',  // Deep teal (primary brand)
  700: '#0A6866',
  800: '#085756',
  900: '#064544',
} as const;

// Neutral slate palette
export const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
} as const;

// Semantic base colors (used to derive theme variants)
export const semanticBase = {
  success: {
    light: '#059669',  // Emerald 600
    dark: '#10B981',   // Emerald 500
  },
  warning: {
    light: '#D97706',  // Amber 600
    dark: '#F59E0B',   // Amber 500
  },
  error: {
    light: '#DC2626',  // Red 600
    dark: '#EF4444',   // Red 500
  },
  info: {
    light: '#2563EB',  // Blue 600
    dark: '#3B82F6',   // Blue 500
  },
} as const;
