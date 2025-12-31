/**
 * Klard Design System - Dark Theme (Mobile)
 *
 * Dark theme color values.
 *
 * @see klard-mobile/src/styles/colors/light.ts (light theme)
 * @see klard-web/src/styles/themes/dark.css (web counterpart)
 * @see docs/design/tokens-reference.md (full documentation)
 */

import type { ThemeColors } from './semantic';

export const darkTheme: ThemeColors = {
  // ===== PRIMARY COLORS =====
  primary: '#15B5B0',
  primaryForeground: '#FFFFFF',
  primaryHover: '#1DCDC7',
  primaryPressed: '#25E5DE',
  primaryBackground: 'rgba(21, 181, 176, 0.1)',
  primaryBorder: 'rgba(21, 181, 176, 0.2)',

  // ===== SECONDARY COLORS =====
  secondary: '#0D7C7A',
  secondaryForeground: '#F8FAFC',

  // ===== ACCENT COLORS (Semantic) =====
  success: '#10B981',
  accentSuccess: '#10B981',
  warning: '#F59E0B',
  accentWarning: '#F59E0B',
  error: '#EF4444',
  accentError: '#EF4444',

  // ===== NEUTRAL / BACKGROUND =====
  background: '#0F172A',
  foreground: '#F8FAFC',
  muted: '#1E293B',
  mutedForeground: '#94A3B8',

  // ===== SURFACE COLORS =====
  surface: 'rgba(30, 41, 59, 0.6)',
  surfaceSubtle: 'rgba(30, 41, 59, 0.4)',
  surfaceStrong: 'rgba(12, 19, 36, 0.9)',
  surface1: '#0F172A',
  surface2: '#1E293B',
  surface3: '#334155',
  surface4: '#475569',

  // ===== CARD / POPOVER =====
  card: '#1E293B',
  cardForeground: '#F8FAFC',
  cardGlass: 'rgba(30, 41, 59, 0.85)',
  popover: '#1E293B',
  popoverForeground: '#F8FAFC',

  // ===== BORDER & INPUT =====
  border: 'rgba(148, 163, 184, 0.12)',
  borderStrong: 'rgba(148, 163, 184, 0.2)',
  borderFocus: 'rgba(148, 163, 184, 0.4)',
  input: '#1E293B',
  ring: '#15B5B0',

  // ===== DESTRUCTIVE =====
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  // ===== TEXT HIERARCHY =====
  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  textDisabled: '#64748B',

  // ===== ALERT: INFO =====
  infoBackground: 'rgba(59, 130, 246, 0.15)',
  infoForeground: '#60A5FA',
  infoBorder: 'rgba(59, 130, 246, 0.3)',

  // ===== ALERT: SUCCESS =====
  successBackground: 'rgba(16, 185, 129, 0.15)',
  successForeground: '#34D399',
  successBorder: 'rgba(16, 185, 129, 0.3)',

  // ===== ALERT: WARNING =====
  warningBackground: 'rgba(245, 158, 11, 0.15)',
  warningForeground: '#FBBF24',
  warningBorder: 'rgba(245, 158, 11, 0.3)',

  // ===== ALERT: ERROR =====
  errorBackground: 'rgba(239, 68, 68, 0.1)',
  errorForeground: '#EF4444',
  errorBorder: 'rgba(239, 68, 68, 0.3)',

  // ===== INTERACTIVE STATES =====
  hoverBackground: '#334155',
  activeBackground: '#475569',
  selectedBackground: 'rgba(21, 181, 176, 0.2)',
  disabledBackground: '#1E293B',

  // ===== OVERLAY =====
  overlay: 'rgba(5, 8, 16, 0.85)',
  overlaySoft: 'rgba(5, 8, 16, 0.75)',
  overlayStrong: 'rgba(5, 8, 16, 0.95)',
  backdropOverlay: 'rgba(0, 0, 0, 0.5)',

  // ===== GLASSMORPHISM =====
  glassBorder: 'rgba(148, 163, 184, 0.12)',
  glassBackground: 'rgba(30, 41, 59, 0.6)',

  // ===== GLOW EFFECTS =====
  glowPrimary: 'rgba(21, 181, 176, 0.35)',
  glowSuccess: 'rgba(16, 185, 129, 0.25)',
  glowWarning: 'rgba(245, 158, 11, 0.25)',
  glowError: 'rgba(239, 68, 68, 0.25)',
  focusRing: 'rgba(21, 181, 176, 0.5)',

  // ===== GRADIENTS =====
  gradientPrimaryStart: '#15B5B0',
  gradientPrimaryEnd: '#0D7C7A',
  gradientSuccessStart: '#10B981',
  gradientSuccessEnd: '#059669',
  gradientBackgroundStart: '#0F172A',
  gradientBackgroundEnd: '#1E293B',

  // ===== SHADOW COLORS =====
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowColorSm: 'rgba(0, 0, 0, 0.1)',
  shadowColorMd: 'rgba(0, 0, 0, 0.15)',
  shadowColorLg: 'rgba(0, 0, 0, 0.2)',

  // ===== CHART COLORS =====
  chart1: '#15B5B0',
  chart2: '#0D7C7A',
  chart3: '#10B981',
  chart4: '#F59E0B',
  chart5: '#EF4444',

  // ===== BURNER CARD STATUSES =====
  burnerActive: '#15B5B0',
  burnerLocked: '#94A3B8',
  burnerBlocked: '#EF4444',
  burnerExpired: '#64748B',

  // ===== BURNER CARD GRADIENTS =====
  burnerActiveGradientStart: '#15B5B0',
  burnerActiveGradientEnd: '#0D7C7A',
  burnerLockedGradientStart: '#F59E0B',
  burnerLockedGradientEnd: '#D97706',
  burnerExpiredGradientStart: '#94A3B8',
  burnerExpiredGradientEnd: '#64748B',
  burnerUsedGradientStart: '#64748B',
  burnerUsedGradientEnd: '#475569',
};
