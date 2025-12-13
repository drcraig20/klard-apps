import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { buttonContainerStyles, buttonTextStyles } from './button.styles';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  onPress,
  style,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = async () => {
    if (disabled || loading) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const isDisabled = disabled || loading;

  const getActivityIndicatorColor = () => {
    if (variant === 'primary' || variant === 'destructive' || variant === 'secondary') {
      return '#FFFFFF';
    }
    return isDark ? '#15B5B0' : '#0D7C7A';
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        ...buttonContainerStyles(isDark, {
          variant,
          size,
          fullWidth: fullWidth ? 'true' : undefined,
          pressed: (pressed && !isDisabled) ? 'true' : undefined,
          disabled: isDisabled ? 'true' : undefined,
        }),
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {iconPosition === 'left' && !loading && icon}
      {loading ? (
        <ActivityIndicator color={getActivityIndicatorColor()} size="small" />
      ) : (
        <Text style={buttonTextStyles(isDark, { variant, size })}>
          {children}
        </Text>
      )}
      {iconPosition === 'right' && !loading && icon}
    </Pressable>
  );
}