import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

import {
  styles,
  dotSizeStyles,
  textSizeStyles,
  lightThemeColors,
  darkThemeColors,
  type HealthStatus,
  type HealthIndicatorSize,
} from './health-indicator.styles';

/**
 * HealthIndicator Component (Mobile)
 *
 * Displays subscription health status with color-coded indicator and optional label.
 *
 * SOLID Compliance:
 * - SRP: Only renders health indicator UI
 * - OCP: Extend via status variants, not modification
 * - DIP: Depends on design token abstractions
 */

const STATUS_LABELS: Record<HealthStatus, string> = {
  forgotten: 'Forgotten?',
  'price-increased': 'Price went up',
  healthy: 'All good',
};

export interface HealthIndicatorProps {
  /** Health status to display */
  status: HealthStatus;
  /** Whether to show the text label (default: true) */
  showLabel?: boolean;
  /** Size variant */
  size?: HealthIndicatorSize;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom testID for testing */
  testID?: string;
}

export function HealthIndicator({
  status,
  showLabel = true,
  size = 'md',
  style,
  testID = 'health-indicator',
}: Readonly<HealthIndicatorProps>) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const themeColors = isDark ? darkThemeColors : lightThemeColors;
  const statusColors = themeColors[status];
  const label = STATUS_LABELS[status];

  const dotStyle: ViewStyle = {
    ...styles.dot,
    ...dotSizeStyles[size],
    backgroundColor: statusColors.dot,
    shadowColor: statusColors.glowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  };

  return (
    <View
      testID={testID}
      style={[styles.container, style]}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      <View
        testID="health-indicator-dot"
        style={dotStyle}
      />
      {showLabel && (
        <Text
          style={[
            styles.label,
            textSizeStyles[size],
            { color: statusColors.text },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

export type { HealthStatus, HealthIndicatorSize };
