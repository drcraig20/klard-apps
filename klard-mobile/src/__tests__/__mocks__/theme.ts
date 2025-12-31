/**
 * Centralized Theme Mock Factory
 *
 * SRP: Provides theme-related mock values only
 * OCP: Extend by adding new color tokens to mockLightColors/mockDarkColors
 * DIP: Tests depend on these abstractions, not hardcoded values
 *
 * Usage in tests:
 *   import { mockLightColors, createUseThemeColorsMock } from '@/__tests__/__mocks__/theme';
 */

/** Light theme color tokens - matches lightTheme from @/styles/colors/light */
export const mockLightColors = {
  // Core
  primary: '#0D7C7A',
  primaryForeground: '#FFFFFF',
  secondary: '#15B5B0',
  secondaryForeground: '#FFFFFF',

  // Backgrounds
  background: '#FFFFFF',
  foreground: '#0F172A',

  // Cards
  card: '#FFFFFF',
  cardForeground: '#0F172A',

  // Muted
  muted: '#F1F5F9',
  mutedForeground: '#64748B',

  // Text hierarchy
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textDisabled: '#94A3B8',

  // Borders
  border: '#E2E8F0',
  input: '#E2E8F0',
  ring: '#0D7C7A',

  // Glassmorphism & Backgrounds
  glassBackground: 'rgba(255, 255, 255, 0.8)',
  disabledBackground: '#F1F5F9',

  // Status colors
  success: '#059669',
  successForeground: '#FFFFFF',
  warning: '#D97706',
  warningForeground: '#FFFFFF',
  error: '#DC2626',
  errorForeground: '#FFFFFF',
  info: '#0284C7',
  infoForeground: '#FFFFFF',

  // Glow effects
  glowPrimary: 'rgba(13, 124, 122, 0.2)',
  glowSuccess: 'rgba(5, 150, 105, 0.2)',
  glowWarning: 'rgba(217, 119, 6, 0.2)',
  glowError: 'rgba(220, 38, 38, 0.2)',

  // Misc
  destructive: '#DC2626',
  destructiveForeground: '#FFFFFF',
  accent: '#15B5B0',
  accentForeground: '#FFFFFF',

  // Burner card gradients
  burnerActiveGradientStart: '#0D7C7A',
  burnerActiveGradientEnd: '#085E5C',
  burnerLockedGradientStart: '#D97706',
  burnerLockedGradientEnd: '#B45309',
  burnerExpiredGradientStart: '#64748B',
  burnerExpiredGradientEnd: '#475569',
  burnerUsedGradientStart: '#475569',
  burnerUsedGradientEnd: '#334155',
  accentError: '#DC2626',

  // Burner card text (on gradient backgrounds)
  burnerCardTextPrimary: '#FFFFFF',
  burnerCardTextSecondary: 'rgba(255, 255, 255, 0.8)',
  burnerCardTextTertiary: 'rgba(255, 255, 255, 0.7)',
  burnerCardOverlayLight: 'rgba(255, 255, 255, 0.2)',
  burnerCardOverlayMedium: 'rgba(255, 255, 255, 0.3)',
  burnerCardOverlayStrong: 'rgba(255, 255, 255, 0.9)',

  // Theme indicator
  isDark: false,
} as const;

/** Dark theme color tokens - matches darkTheme from @/styles/colors/dark */
export const mockDarkColors = {
  // Core
  primary: '#15B5B0',
  primaryForeground: '#FFFFFF',
  secondary: '#0D7C7A',
  secondaryForeground: '#FFFFFF',

  // Backgrounds
  background: '#0F172A',
  foreground: '#F8FAFC',

  // Cards
  card: '#1E293B',
  cardForeground: '#F8FAFC',

  // Muted
  muted: '#334155',
  mutedForeground: '#94A3B8',

  // Text hierarchy
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textDisabled: '#64748B',

  // Borders
  border: '#334155',
  input: '#334155',
  ring: '#15B5B0',

  // Glassmorphism & Backgrounds
  glassBackground: 'rgba(30, 41, 59, 0.6)',
  disabledBackground: '#1E293B',

  // Status colors
  success: '#10B981',
  successForeground: '#FFFFFF',
  warning: '#F59E0B',
  warningForeground: '#FFFFFF',
  error: '#EF4444',
  errorForeground: '#FFFFFF',
  info: '#0EA5E9',
  infoForeground: '#FFFFFF',

  // Glow effects
  glowPrimary: 'rgba(21, 181, 176, 0.3)',
  glowSuccess: 'rgba(16, 185, 129, 0.3)',
  glowWarning: 'rgba(245, 158, 11, 0.3)',
  glowError: 'rgba(239, 68, 68, 0.3)',

  // Misc
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',
  accent: '#0D7C7A',
  accentForeground: '#FFFFFF',

  // Burner card gradients
  burnerActiveGradientStart: '#15B5B0',
  burnerActiveGradientEnd: '#0D7C7A',
  burnerLockedGradientStart: '#F59E0B',
  burnerLockedGradientEnd: '#D97706',
  burnerExpiredGradientStart: '#94A3B8',
  burnerExpiredGradientEnd: '#64748B',
  burnerUsedGradientStart: '#64748B',
  burnerUsedGradientEnd: '#475569',
  accentError: '#EF4444',

  // Burner card text (on gradient backgrounds)
  burnerCardTextPrimary: '#FFFFFF',
  burnerCardTextSecondary: 'rgba(255, 255, 255, 0.8)',
  burnerCardTextTertiary: 'rgba(255, 255, 255, 0.7)',
  burnerCardOverlayLight: 'rgba(255, 255, 255, 0.2)',
  burnerCardOverlayMedium: 'rgba(255, 255, 255, 0.3)',
  burnerCardOverlayStrong: 'rgba(255, 255, 255, 0.9)',

  // Theme indicator
  isDark: true,
} as const;

/**
 * Creates a mock for useThemeColors hook
 * @param overrides - Partial color values to override defaults
 * @param isDark - Whether to use dark theme as base (default: false)
 */
export function createUseThemeColorsMock(
  overrides: Partial<typeof mockLightColors> = {},
  isDark = false
) {
  const baseColors = isDark ? mockDarkColors : mockLightColors;
  return {
    useThemeColors: jest.fn(() => ({
      ...baseColors,
      ...overrides,
    })),
  };
}

/**
 * Creates a mock for ThemeContext
 * @param isDark - Whether to use dark theme (default: false)
 */
export function createThemeContextMock(isDark = false) {
  const colors = isDark ? mockDarkColors : mockLightColors;
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => ({
      theme: isDark ? ('dark' as const) : ('light' as const),
      themePreference: 'system' as const,
      colors,
      isDark,
      setThemePreference: jest.fn(),
    }),
  };
}

/** Default useThemeColors mock - ready to use with jest.mock */
export const mockUseThemeColors = createUseThemeColorsMock();
