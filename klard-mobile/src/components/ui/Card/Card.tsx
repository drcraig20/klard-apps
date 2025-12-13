import React from 'react';
import {
  View,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { cardStyles, staticStyles } from './card.styles';

export type CardVariant = 'default' | 'elevated' | 'ghost' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  onPress,
  disabled = false,
  style,
  testID,
}: Readonly<CardProps>) {
  const isDark = useColorScheme() === 'dark';

  const handlePress = () => {
    if (disabled || !onPress) return;
    // Fire haptics non-blocking for better UX
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const baseStyles = cardStyles(isDark, { variant, padding });
  const cardStyle = [
    ...baseStyles,
    disabled && staticStyles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          ...cardStyle,
          pressed && !disabled && staticStyles.pressed,
        ]}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} testID={testID} accessibilityRole="none">
      {children}
    </View>
  );
}