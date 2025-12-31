/**
 * Klard Design System - Light Theme (Mobile)
 *
 * Light theme color values.
 *
 * @see klard-mobile/src/styles/colors/dark.ts (dark theme)
 * @see klard-web/src/styles/themes/light.css (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 */

import type { ThemeColors } from './semantic';

export const lightTheme: ThemeColors = {
  // ===== PRIMARY COLORS =====
  primary: '#0D7C7A',
  primaryForeground: '#FFFFFF',
  primaryHover: '#0A6866',
  primaryPressed: '#085756',
  primaryBackground: '#E6F5F5',
  primaryBorder: 'rgba(13, 124, 122, 0.2)',

  // ===== SECONDARY COLORS =====
  secondary: '#15B5B0',
  secondaryForeground: '#FFFFFF',

  // ===== ACCENT COLORS (Semantic) =====
  success: '#059669',
  accentSuccess: '#059669',
  warning: '#D97706',
  accentWarning: '#D97706',
  error: '#DC2626',
  accentError: '#DC2626',

  // ===== NEUTRAL / BACKGROUND =====
  background: '#FFFFFF',
  foreground: '#0F172A',
  muted: '#F1F5F9',
  mutedForeground: '#64748B',

  // ===== SURFACE COLORS =====
  surface: 'rgba(255, 255, 255, 0.8)',
  surfaceSubtle: 'rgba(255, 255, 255, 0.6)',
  surfaceStrong: 'rgba(255, 255, 255, 0.95)',
  surface1: '#FFFFFF',
  surface2: '#F8FAFC',
  surface3: '#F1F5F9',
  surface4: '#E2E8F0',

  // ===== CARD / POPOVER =====
  card: '#FFFFFF',
  cardForeground: '#0F172A',
  cardGlass: 'rgba(255, 255, 255, 0.85)',
  popover: '#FFFFFF',
  popoverForeground: '#0F172A',

  // ===== BORDER & INPUT =====
  border: 'rgba(148, 163, 184, 0.2)',
  borderStrong: 'rgba(148, 163, 184, 0.3)',
  borderFocus: 'rgba(148, 163, 184, 0.5)',
  input: '#F8FAFC',
  ring: '#0D7C7A',

  // ===== DESTRUCTIVE =====
  destructive: '#DC2626',
  destructiveForeground: '#FFFFFF',

  // ===== TEXT HIERARCHY =====
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textDisabled: '#94A3B8',

  // ===== ALERT: INFO =====
  infoBackground: '#EFF6FF',
  infoForeground: '#1E40AF',
  infoBorder: '#BFDBFE',

  // ===== ALERT: SUCCESS =====
  successBackground: '#ECFDF5',
  successForeground: '#065F46',
  successBorder: '#A7F3D0',

  // ===== ALERT: WARNING =====
  warningBackground: '#FEF3C7',
  warningForeground: '#92400E',
  warningBorder: '#FDE68A',

  // ===== ALERT: ERROR =====
  errorBackground: '#FEF2F2',
  errorForeground: '#991B1B',
  errorBorder: '#FECACA',

  // ===== INTERACTIVE STATES =====
  hoverBackground: '#F8FAFC',
  activeBackground: '#F1F5F9',
  selectedBackground: '#E0F2F1',
  disabledBackground: '#F1F5F9',

  // ===== OVERLAY =====
  overlay: 'rgba(255, 255, 255, 0.85)',
  overlaySoft: 'rgba(248, 250, 252, 0.75)',
  overlayStrong: 'rgba(255, 255, 255, 0.95)',
  backdropOverlay: 'rgba(15, 23, 42, 0.5)',

  // ===== GLASSMORPHISM =====
  glassBorder: 'rgba(148, 163, 184, 0.2)',
  glassBackground: 'rgba(255, 255, 255, 0.8)',

  // ===== GLOW EFFECTS =====
  glowPrimary: 'rgba(13, 124, 122, 0.3)',
  glowSuccess: 'rgba(5, 150, 105, 0.2)',
  glowWarning: 'rgba(217, 119, 6, 0.2)',
  glowError: 'rgba(220, 38, 38, 0.2)',
  focusRing: 'rgba(13, 124, 122, 0.4)',

  // ===== GRADIENTS =====
  gradientPrimaryStart: '#0D7C7A',
  gradientPrimaryEnd: '#0A5F5D',
  gradientSuccessStart: '#059669',
  gradientSuccessEnd: '#047857',
  gradientBackgroundStart: '#FFFFFF',
  gradientBackgroundEnd: '#F8FAFC',

  // ===== SHADOW COLORS =====
  shadowColor: 'rgba(15, 23, 42, 0.1)',
  shadowColorSm: 'rgba(15, 23, 42, 0.08)',
  shadowColorMd: 'rgba(15, 23, 42, 0.12)',
  shadowColorLg: 'rgba(15, 23, 42, 0.15)',

  // ===== CHART COLORS =====
  chart1: '#0D7C7A',
  chart2: '#15B5B0',
  chart3: '#059669',
  chart4: '#D97706',
  chart5: '#DC2626',

  // ===== BURNER CARD STATUSES =====
  burnerActive: '#0D7C7A',
  burnerLocked: '#64748B',
  burnerBlocked: '#DC2626',
  burnerExpired: '#94A3B8',

  // ===== BURNER CARD GRADIENTS =====
  burnerActiveGradientStart: '#0D7C7A',
  burnerActiveGradientEnd: '#085E5C',
  burnerLockedGradientStart: '#D97706',
  burnerLockedGradientEnd: '#B45309',
  burnerExpiredGradientStart: '#64748B',
  burnerExpiredGradientEnd: '#475569',
  burnerUsedGradientStart: '#475569',
  burnerUsedGradientEnd: '#334155',
};
