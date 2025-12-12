import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import {
  styles,
  variantStyles,
  sizeStyles,
  textStyles,
  textSizeStyles,
} from './button.styles';

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
    return '#0D7C7A';
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {iconPosition === 'left' && !loading && icon}
      {loading ? (
        <ActivityIndicator color={getActivityIndicatorColor()} size="small" />
      ) : (
        <Text style={[styles.text, textStyles[variant], textSizeStyles[size]]}>
          {children}
        </Text>
      )}
      {iconPosition === 'right' && !loading && icon}
    </Pressable>
  );
}
