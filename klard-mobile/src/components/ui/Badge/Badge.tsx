import React from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useThemeColors } from '@/hooks/useThemeColors';
import { badgeContainerStyles, badgeTextStyles, staticStyles } from './badge.styles';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'secondary' | 'destructive' | 'outline';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = useThemeColors();

  const handleRemove = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRemove?.();
  };

  // Get the text color for the icon based on variant
  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
      case 'destructive':
        return colors.error;
      case 'secondary':
        return colors.secondary;
      case 'outline':
        return colors.textSecondary;
      default:
        return colors.mutedForeground;
    }
  };

  return (
    <View
      style={[
        ...badgeContainerStyles(isDark, { variant, size }),
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
    >
      {icon && <View style={staticStyles.iconContainer}>{icon}</View>}
      <Text style={badgeTextStyles(isDark, { variant, size })}>
        {children}
      </Text>
      {removable && (
        <Pressable
          onPress={handleRemove}
          style={staticStyles.removeButton}
          accessibilityLabel="Remove"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="close"
            size={size === 'sm' ? 10 : 12}
            color={getIconColor()}
          />
        </Pressable>
      )}
    </View>
  );
}
