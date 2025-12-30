import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { buttonContainerStyles, buttonTextStyles } from '@/components/ui/Button/button.styles';
import {
  confirmButtonContainerStyles,
  confirmButtonTextStyles,
  actionButtonContainerStyles,
  actionButtonTextStyles,
} from './confirm-button.styles';

/**
 * ConfirmButton - Two-step destructive action pattern for React Native
 *
 * SRP: Handles only the confirmation flow logic for destructive actions.
 * OCP: Extensible via variant prop and confirmText customization.
 * DIP: Depends on Button abstraction, not concrete implementation.
 *
 * Pattern: [Delete] -> press -> [Are you sure? Yes / No] -> 5s auto-reset OR confirm -> action
 */
export interface ConfirmButtonProps {
  /** Content to display in initial state */
  children: React.ReactNode;
  /** Callback executed when user confirms the action */
  onConfirm: () => void;
  /** Text to show in confirmation state (default: "Are you sure?") */
  confirmText?: string;
  /** Time in ms before auto-reset (default: 5000) */
  resetTimeout?: number;
  /** Button variant for styling */
  variant?: 'destructive' | 'warning';
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

export function ConfirmButton({
  children,
  onConfirm,
  confirmText = 'Are you sure?',
  resetTimeout = 5000,
  variant = 'destructive',
  style,
}: Readonly<ConfirmButtonProps>) {
  const [isConfirming, setIsConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimeoutRef();
    setIsConfirming(false);
  }, [clearTimeoutRef]);

  const handleInitialPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsConfirming(true);
    timeoutRef.current = setTimeout(() => {
      setIsConfirming(false);
    }, resetTimeout);
  }, [resetTimeout]);

  const handleConfirm = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    reset();
    onConfirm();
  }, [reset, onConfirm]);

  const handleCancel = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
  }, [reset]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, [clearTimeoutRef]);

  if (isConfirming) {
    return (
      <View
        testID="confirm-button"
        style={[...confirmButtonContainerStyles(isDark, {}), style]}
      >
        <Text style={confirmButtonTextStyles(isDark, { variant })}>
          {confirmText}
        </Text>
        <Pressable
          onPress={handleConfirm}
          accessibilityRole="button"
          accessibilityLabel="Confirm action"
          style={({ pressed }) =>
            actionButtonContainerStyles(isDark, {
              type: 'confirm',
              variant,
              pressed: pressed ? 'true' : undefined,
            })
          }
        >
          <Text style={actionButtonTextStyles(isDark, { type: 'confirm' })}>
            Yes
          </Text>
        </Pressable>
        <Pressable
          onPress={handleCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel action"
          style={({ pressed }) =>
            actionButtonContainerStyles(isDark, {
              type: 'cancel',
              pressed: pressed ? 'true' : undefined,
            })
          }
        >
          <Text style={actionButtonTextStyles(isDark, { type: 'cancel' })}>
            No
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      testID="confirm-button"
      onPress={handleInitialPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        ...buttonContainerStyles(isDark, {
          variant,
          size: 'md',
          pressed: pressed ? 'true' : undefined,
        }),
        style,
      ]}
    >
      <Text style={buttonTextStyles(isDark, { variant, size: 'md' })}>
        {children}
      </Text>
    </Pressable>
  );
}
