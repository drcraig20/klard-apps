import { StyleSheet } from 'react-native';
import { Colors } from '@/styles';

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
    dot: Colors.light.error,
    text: Colors.light.error,
    glowColor: Colors.light.glowError,
  },
  'price-increased': {
    dot: Colors.light.warning,
    text: Colors.light.warning,
    glowColor: Colors.light.glowWarning,
  },
  healthy: {
    dot: Colors.light.success,
    text: Colors.light.success,
    glowColor: Colors.light.glowSuccess,
  },
} as const;

// Dark theme colors
export const darkThemeColors = {
  forgotten: {
    dot: Colors.dark.error,
    text: Colors.dark.error,
    glowColor: Colors.dark.glowError,
  },
  'price-increased': {
    dot: Colors.dark.warning,
    text: Colors.dark.warning,
    glowColor: Colors.dark.glowWarning,
  },
  healthy: {
    dot: Colors.dark.success,
    text: Colors.dark.success,
    glowColor: Colors.dark.glowSuccess,
  },
} as const;

export type HealthStatus = 'forgotten' | 'price-increased' | 'healthy';
export type HealthIndicatorSize = 'sm' | 'md';
