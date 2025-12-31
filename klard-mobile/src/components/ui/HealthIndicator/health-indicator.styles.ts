import { StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from '@/styles';

/**
 * HealthIndicator Styles (Mobile)
 *
 * SOLID Compliance:
 * - SRP: Only defines visual style variants
 * - OCP: Extend by adding new variants, not modifying existing
 * - DIP: Uses design token abstractions
 */

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    borderRadius: 9999,
  },
  label: {
    fontWeight: '500',
  },
});

// Size variants for dot
export const dotSizeStyles = StyleSheet.create({
  sm: {
    width: 8,
    height: 8,
  },
  md: {
    width: 10,
    height: 10,
  },
});

// Size variants for text
export const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
});

// Light theme colors
export const lightThemeColors = {
  forgotten: {
    dot: lightTheme.error,
    text: lightTheme.error,
    glowColor: lightTheme.glowError,
  },
  'price-increased': {
    dot: lightTheme.warning,
    text: lightTheme.warning,
    glowColor: lightTheme.glowWarning,
  },
  healthy: {
    dot: lightTheme.success,
    text: lightTheme.success,
    glowColor: lightTheme.glowSuccess,
  },
} as const;

// Dark theme colors
export const darkThemeColors = {
  forgotten: {
    dot: darkTheme.error,
    text: darkTheme.error,
    glowColor: darkTheme.glowError,
  },
  'price-increased': {
    dot: darkTheme.warning,
    text: darkTheme.warning,
    glowColor: darkTheme.glowWarning,
  },
  healthy: {
    dot: darkTheme.success,
    text: darkTheme.success,
    glowColor: darkTheme.glowSuccess,
  },
} as const;

export type HealthStatus = 'forgotten' | 'price-increased' | 'healthy';
export type HealthIndicatorSize = 'sm' | 'md';
