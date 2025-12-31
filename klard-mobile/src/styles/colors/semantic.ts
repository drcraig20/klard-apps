/**
 * Klard Design System - Semantic Colors (Mobile)
 *
 * Type definitions and interfaces for semantic color tokens.
 *
 * @see klard-web/src/styles/themes/ (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 */

/**
 * Complete theme color interface.
 * Both light and dark themes implement this interface.
 */
export interface ThemeColors {
  // Primary brand
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  primaryPressed: string;
  primaryBackground: string;
  primaryBorder: string;

  // Secondary brand
  secondary: string;
  secondaryForeground: string;

  // Semantic accent
  success: string;
  accentSuccess: string;
  warning: string;
  accentWarning: string;
  error: string;
  accentError: string;

  // Neutral backgrounds
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;

  // Surfaces
  surface: string;
  surfaceSubtle: string;
  surfaceStrong: string;
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;

  // Card & Popover
  card: string;
  cardForeground: string;
  cardGlass: string;
  popover: string;
  popoverForeground: string;

  // Border & Input
  border: string;
  borderStrong: string;
  borderFocus: string;
  input: string;
  ring: string;

  // Destructive
  destructive: string;
  destructiveForeground: string;

  // Text hierarchy
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;

  // Alert states
  infoBackground: string;
  infoForeground: string;
  infoBorder: string;
  successBackground: string;
  successForeground: string;
  successBorder: string;
  warningBackground: string;
  warningForeground: string;
  warningBorder: string;
  errorBackground: string;
  errorForeground: string;
  errorBorder: string;

  // Interactive states
  hoverBackground: string;
  activeBackground: string;
  selectedBackground: string;
  disabledBackground: string;

  // Overlay
  overlay: string;
  overlaySoft: string;
  overlayStrong: string;
  backdropOverlay: string;

  // Glassmorphism
  glassBorder: string;
  glassBackground: string;

  // Glow effects
  glowPrimary: string;
  glowSuccess: string;
  glowWarning: string;
  glowError: string;
  focusRing: string;

  // Gradients
  gradientPrimaryStart: string;
  gradientPrimaryEnd: string;
  gradientSuccessStart: string;
  gradientSuccessEnd: string;
  gradientBackgroundStart: string;
  gradientBackgroundEnd: string;

  // Shadows
  shadowColor: string;
  shadowColorSm: string;
  shadowColorMd: string;
  shadowColorLg: string;

  // Charts
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  // Burner card
  burnerActive: string;
  burnerLocked: string;
  burnerBlocked: string;
  burnerExpired: string;
  burnerActiveGradientStart: string;
  burnerActiveGradientEnd: string;
  burnerLockedGradientStart: string;
  burnerLockedGradientEnd: string;
  burnerExpiredGradientStart: string;
  burnerExpiredGradientEnd: string;
  burnerUsedGradientStart: string;
  burnerUsedGradientEnd: string;

  // Burner card text (for text on gradient backgrounds)
  burnerCardTextPrimary: string;
  burnerCardTextSecondary: string;
  burnerCardTextTertiary: string;
  burnerCardOverlayLight: string;
  burnerCardOverlayMedium: string;
  burnerCardOverlayStrong: string;

  // Skeleton shimmer
  shimmerHighlight: string;
}

export type ColorScheme = 'light' | 'dark';
