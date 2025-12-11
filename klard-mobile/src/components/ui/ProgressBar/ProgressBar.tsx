import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useThemeColors } from '@/hooks';
import { styles } from './progress-bar.styles';

const sizeMap = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export type ProgressBarSize = keyof typeof sizeMap;
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  style,
}: ProgressBarProps) {
  const colors = useThemeColors();
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const height = sizeMap[size];
  const shouldAnimate = animated && process.env.NODE_ENV !== 'test';

  const variantColors: Record<ProgressBarVariant, string> = {
    default: colors.primary,
    success: colors.accentSuccess,
    warning: colors.accentWarning,
    error: colors.accentError,
  };

  useEffect(() => {
    if (shouldAnimate) {
      Animated.timing(animatedWidth, {
        toValue: percentage,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(percentage);
    }
  }, [percentage, shouldAnimate, animatedWidth]);

  const trackStyle = StyleSheet.flatten([
    styles.track,
    { height, backgroundColor: colors.muted },
  ]);

  return (
    <View
      testID="progress-bar-container"
      accessibilityRole="progressbar"
      accessibilityValue={{ now: percentage, min: 0, max: 100 }}
      style={[styles.container, style]}
    >
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          {label && (
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {label}
            </Text>
          )}
          {showLabel && (
            <Text style={[styles.percentage, { color: colors.textSecondary }]}>
              {Math.round(percentage)}%
            </Text>
          )}
        </View>
      )}
      <View
        testID="progress-track"
        style={trackStyle}
      >
        <Animated.View
          testID="progress-fill"
          style={[
            styles.fill,
            {
              backgroundColor: variantColors[variant],
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}
