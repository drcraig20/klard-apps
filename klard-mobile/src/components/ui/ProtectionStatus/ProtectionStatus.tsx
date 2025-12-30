import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  containerStyles,
  textStyles,
  pulseIndicatorStyles,
  layoutStyles,
} from './protection-status.styles';
import { Colors } from '@/styles/colors';

export interface ProtectionStatusProps {
  /** Number of active cards watching */
  activeCards: number;
  /** Show pulse animation */
  showPulse?: boolean;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * ProtectionStatus displays the number of active cards watching subscriptions.
 *
 * Features:
 * - Displays card count with singular/plural message
 * - Optional pulse animation for active monitoring
 * - Teal glow effect to indicate protection status
 *
 * SRP: Only handles display of protection/watching status
 * OCP: Extensible via style prop
 */
export function ProtectionStatus({
  activeCards,
  showPulse = false,
  style,
}: Readonly<ProtectionStatusProps>) {
  const isDark = useColorScheme() === 'dark';
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const colors = isDark ? Colors.dark : Colors.light;

  const message = activeCards === 1
    ? '1 card watching'
    : `${activeCards} cards watching`;

  useEffect(() => {
    if (showPulse) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.5,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [showPulse, pulseAnim]);

  return (
    <View
      testID="protection-status"
      accessibilityRole="text"
      accessibilityLabel={message}
      style={[containerStyles(isDark), style]}
    >
      <Ionicons
        name="shield-checkmark"
        size={16}
        color={colors.primary}
        style={layoutStyles.icon}
      />
      <Text style={textStyles(isDark)}>{message}</Text>
      {showPulse && (
        <Animated.View
          testID="pulse-indicator"
          style={[
            pulseIndicatorStyles(isDark),
            { opacity: pulseAnim },
          ]}
        />
      )}
    </View>
  );
}
