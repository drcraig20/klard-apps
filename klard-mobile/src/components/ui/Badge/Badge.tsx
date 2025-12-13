import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { styles, variantStyles, textStyles, sizeStyles, textSizeStyles } from './badge.styles';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Badge({
  variant = 'default',
  size = 'md',
  icon,
  removable = false,
  onRemove,
  children,
  style,
  testID,
}: Readonly<BadgeProps>) {
  const handleRemove = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRemove?.();
  };

  return (
    <View
      style={[styles.base, variantStyles[variant], sizeStyles[size], style]}
      testID={testID}
      accessibilityRole="text"
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, textStyles[variant], textSizeStyles[size]]}>
        {children}
      </Text>
      {removable && (
        <Pressable
          onPress={handleRemove}
          style={styles.removeButton}
          accessibilityLabel="Remove"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="close"
            size={size === 'sm' ? 10 : 12}
            color={textStyles[variant].color}
          />
        </Pressable>
      )}
    </View>
  );
}
