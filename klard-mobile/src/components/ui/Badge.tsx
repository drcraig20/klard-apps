import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

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
}: BadgeProps) {
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

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    gap: 4,
  },
  iconContainer: {
    flexShrink: 0,
  },
  text: {
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 2,
    padding: 2,
    borderRadius: 9999,
  },
});

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: '#F1F5F9', // slate-100
  },
  primary: {
    backgroundColor: '#CCFBF1', // teal-100
  },
  success: {
    backgroundColor: '#DCFCE7', // green-100
  },
  warning: {
    backgroundColor: '#FEF3C7', // amber-100
  },
  error: {
    backgroundColor: '#FEE2E2', // red-100
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CBD5E1', // slate-300
  },
});

const textStyles = StyleSheet.create({
  default: {
    color: '#334155', // slate-700
  },
  primary: {
    color: '#0D7C7A', // teal-700
  },
  success: {
    color: '#15803D', // green-700
  },
  warning: {
    color: '#B45309', // amber-700
  },
  error: {
    color: '#B91C1C', // red-700
  },
  outline: {
    color: '#475569', // slate-600
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
});
