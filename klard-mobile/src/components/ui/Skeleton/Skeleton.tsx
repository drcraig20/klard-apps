import { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/hooks';
import { styles } from './skeleton.styles';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: DimensionValue;
  height?: DimensionValue;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  animated = true,
  style,
}: SkeletonProps) {
  const colors = useThemeColors();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const shouldAnimate = animated && process.env.NODE_ENV !== 'test';

  // Determine dimensions based on variant
  const resolvedHeight = height ?? (variant === 'text' ? 16 : undefined);
  const resolvedWidth = width;

  // Calculate border radius based on variant
  const getBorderRadius = (): number => {
    if (variant === 'circular') {
      // For circular, use half of the smaller dimension
      const dim = typeof resolvedWidth === 'number' ? resolvedWidth : 48;
      return dim / 2;
    }
    if (variant === 'text') {
      return 4;
    }
    return 6; // rectangular default
  };

  useEffect(() => {
    if (shouldAnimate) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [shouldAnimate, animatedValue]);

  const containerStyle: ViewStyle = {
    backgroundColor: colors.muted,
    borderRadius: getBorderRadius(),
    width: resolvedWidth,
    height: resolvedHeight,
  };

  return (
    <View
      testID="skeleton-container"
      accessibilityRole="none"
      accessibilityLabel="Loading"
      style={[styles.container, containerStyle, style]}
    >
      {animated && (
        <Animated.View
          testID="skeleton-shimmer"
          style={[
            styles.shimmer,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 200],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      )}
    </View>
  );
}
