/**
 * Klard Design System - Color Tokens (Web)
 *
 * These TypeScript values mirror the CSS variables in globals.css.
 * Use CSS variables (via Tailwind) for styling, use these for:
 * - TypeScript type safety
 * - Dynamic color calculations
 * - Non-CSS contexts (charts, canvas, etc.)
 *
 * SOLID Compliance:
 * - SRP: Only color values
 * - OCP: Extend via additional exports, not modifying existing
 */

// ============================================================================
// LIGHT THEME COLORS
// ============================================================================

export const lightColors = {
  // Primary palette
  primary: '#0D7C7A',
  primaryForeground: '#FFFFFF',
  primaryHover: '#0A6866',
  primaryPressed: '#085756',

  // Secondary palette
  secondary: '#15B5B0',
  secondaryForeground: '#FFFFFF',

  // Background & foreground
  background: '#FFFFFF',
  foreground: '#0F172A',

  // Muted colors
  muted: '#F1F5F9',
  mutedForeground: '#64748B',

  // Card colors
  card: '#FFFFFF',
  cardForeground: '#0F172A',

  // Popover colors
  popover: '#FFFFFF',
  popoverForeground: '#0F172A',

  // Border & input
  border: 'rgba(148, 163, 184, 0.2)',
  borderStrong: 'rgba(148, 163, 184, 0.3)',
  input: '#F8FAFC',
  ring: '#0D7C7A',

  // Accent
  accent: '#15B5B0',
  accentForeground: '#FFFFFF',

  // Semantic colors
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  destructive: '#DC2626',
  destructiveForeground: '#FFFFFF',

  // Surface hierarchy
  surface1: '#FFFFFF',
  surface2: '#F8FAFC',
  surface3: '#F1F5F9',
  surface4: '#E2E8F0',

  // Text hierarchy
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textDisabled: '#94A3B8',

  // Chart colors
  chart1: '#0D7C7A',
  chart2: '#15B5B0',
  chart3: '#059669',
  chart4: '#D97706',
  chart5: '#DC2626',
} as const;

// ============================================================================
// DARK THEME COLORS
// ============================================================================

export const darkColors = {
  // Primary palette
  primary: '#15B5B0',
  primaryForeground: '#FFFFFF',
  primaryHover: '#1DCDC7',
  primaryPressed: '#25E5DE',

  // Secondary palette
  secondary: '#0D7C7A',
  secondaryForeground: '#F8FAFC',

  // Background & foreground
  background: '#0F172A',
  foreground: '#F8FAFC',

  // Muted colors
  muted: '#1E293B',
  mutedForeground: '#94A3B8',

  // Card colors
  card: '#1E293B',
  cardForeground: '#F8FAFC',

  // Popover colors
  popover: '#1E293B',
  popoverForeground: '#F8FAFC',

  // Border & input
  border: 'rgba(148, 163, 184, 0.12)',
  borderStrong: 'rgba(148, 163, 184, 0.2)',
  input: '#1E293B',
  ring: '#15B5B0',

  // Accent
  accent: '#0D7C7A',
  accentForeground: '#F8FAFC',

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  // Surface hierarchy
  surface1: '#0F172A',
  surface2: '#1E293B',
  surface3: '#334155',
  surface4: '#475569',

  // Text hierarchy
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textDisabled: '#64748B',

  // Chart colors
  chart1: '#15B5B0',
  chart2: '#0D7C7A',
  chart3: '#10B981',
  chart4: '#F59E0B',
  chart5: '#EF4444',
} as const;

// ============================================================================
// SEMANTIC COLORS
// ============================================================================

export const semanticColors = {
  light: {
    success: '#059669',
    successForeground: '#FFFFFF',
    successBackground: '#ECFDF5',
    successBorder: '#A7F3D0',

    warning: '#D97706',
    warningForeground: '#FFFFFF',
    warningBackground: '#FEF3C7',
    warningBorder: '#FDE68A',

    error: '#DC2626',
    errorForeground: '#FFFFFF',
    errorBackground: '#FEF2F2',
    errorBorder: '#FECACA',

    info: '#2563EB',
    infoForeground: '#FFFFFF',
    infoBackground: '#EFF6FF',
    infoBorder: '#BFDBFE',
  },

  dark: {
    success: '#10B981',
    successForeground: '#FFFFFF',
    successBackground: '#064E3B',
    successBorder: '#047857',

    warning: '#F59E0B',
    warningForeground: '#000000',
    warningBackground: '#78350F',
    warningBorder: '#B45309',

    error: '#EF4444',
    errorForeground: '#FFFFFF',
    errorBackground: '#7F1D1D',
    errorBorder: '#B91C1C',

    info: '#3B82F6',
    infoForeground: '#FFFFFF',
    infoBackground: '#1E3A5F',
    infoBorder: '#1D4ED8',
  },
} as const;

// ============================================================================
// BURNER CARD STATUS COLORS
// ============================================================================

export const burnerCardColors = {
  light: {
    active: '#0D7C7A',
    locked: '#64748B',
    blocked: '#DC2626',
    expired: '#94A3B8',
    awaiting: '#D97706',
  },
  dark: {
    active: '#15B5B0',
    locked: '#94A3B8',
    blocked: '#EF4444',
    expired: '#64748B',
    awaiting: '#F59E0B',
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type SemanticColors = typeof semanticColors;
export type BurnerCardColors = typeof burnerCardColors;
export type ColorScheme = 'light' | 'dark';