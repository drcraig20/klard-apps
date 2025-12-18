import React, { useCallback, useState } from 'react';
import { View, Text, ActivityIndicator, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { usePasskeyAuth, BiometricType } from '@/hooks/usePasskeyAuth';
import { Button } from '@/components/ui/Button';
import { useThemeColors } from '@/hooks/useThemeColors';
import { isNetworkError } from '@/utils/error-helpers';
import { NetworkErrorSheet } from '@/components/auth/network-error-sheet';
import {
  containerStyles,
  iconContainerStyles,
  iconStyles,
  titleStyles,
  descriptionStyles,
  buttonContainerStyles,
} from './biometric-prompt.styles';

/**
 * Props for BiometricPrompt component
 */
export interface BiometricPromptProps {
  /** Mode determines the action: register a new passkey or sign in with existing */
  mode: 'register' | 'signin';
  /** Callback when passkey operation succeeds */
  onSuccess: () => void;
  /** Callback when passkey operation fails */
  onError: (error: string) => void;
  /** Callback when user cancels the operation */
  onCancel: () => void;
}

/**
 * Map biometric type to icon name
 */
const getBiometricIcon = (biometricType: BiometricType): keyof typeof Ionicons.glyphMap => {
  switch (biometricType) {
    case 'faceId':
      return 'scan';
    case 'touchId':
      return 'finger-print';
    case 'fingerprint':
      return 'finger-print';
    case 'none':
    default:
      return 'shield-checkmark';
  }
};

/**
 * Get biometric type display name
 */
const getBiometricName = (biometricType: BiometricType): string => {
  switch (biometricType) {
    case 'faceId':
      return 'Face ID';
    case 'touchId':
      return 'Touch ID';
    case 'fingerprint':
      return 'Fingerprint';
    case 'none':
    default:
      return 'Biometric';
  }
};

/**
 * BiometricPrompt Component
 *
 * Renders a biometric authentication prompt with icon and action button.
 * Supports both registration and sign-in modes with Face ID/Touch ID/Fingerprint.
 *
 * SOLID Principles:
 * - SRP: Renders biometric prompt UI only
 * - OCP: Mode and biometric type driven by props/hook
 * - LSP: Handles all prop combinations consistently
 * - ISP: Single focused interface with required props
 * - DIP: Depends on usePasskeyAuth abstraction
 *
 * @example
 * <BiometricPrompt
 *   mode="register"
 *   onSuccess={() => console.log('Success')}
 *   onError={(err) => console.error(err)}
 *   onCancel={() => console.log('Cancelled')}
 * />
 */
export function BiometricPrompt({
  mode,
  onSuccess,
  onError,
  onCancel,
}: Readonly<BiometricPromptProps>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = useThemeColors();

  const {
    isLoading: hookLoading,
    biometricType,
    registerPasskey,
    signInWithPasskey,
  } = usePasskeyAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [networkError, setNetworkError] = useState<{ message: string } | null>(null);

  // Determine button text and accessibility label based on mode
  const buttonText = mode === 'register' ? 'Add Passkey' : 'Sign in';
  const accessibilityLabel =
    mode === 'register' ? 'Add Passkey' : 'Sign in with biometrics';

  // Determine title and description based on mode
  const title =
    mode === 'register'
      ? `Add ${getBiometricName(biometricType)}`
      : `Sign in with ${getBiometricName(biometricType)}`;

  const description =
    mode === 'register'
      ? 'Secure your account with biometric authentication'
      : 'Use your biometric to sign in quickly and securely';

  /**
   * Handle button press - calls appropriate passkey method based on mode
   * Implements error handling with network error detection and success/error callbacks
   */
  const handlePress = useCallback(async () => {
    setIsProcessing(true);

    try {
      if (mode === 'register') {
        await registerPasskey();
        onSuccess();
      } else {
        await signInWithPasskey();
        onSuccess();
      }
    } catch (error) {
      // Check if this is a network error
      if (isNetworkError(error)) {
        const errorMessage =
          error instanceof Error ? error.message : 'Network error occurred';
        setNetworkError({ message: errorMessage });
        return;
      }

      // Handle non-network errors through the error callback
      const errorMessage =
        error instanceof Error ? error.message : 'Operation failed';
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [mode, registerPasskey, signInWithPasskey, onSuccess, onError]);

  const isLoading = hookLoading || isProcessing;
  const iconName = getBiometricIcon(biometricType);

  return (
    <View style={containerStyles(isDark)}>
      {/* Biometric Icon */}
      <View style={iconContainerStyles(isDark, { variant: 'default' })}>
        {isLoading ? (
          <ActivityIndicator
            testID="loading-indicator"
            size="large"
            color={colors.primary}
          />
        ) : (
          <Ionicons
            testID={`biometric-icon-${biometricType}`}
            name={iconName}
            size={40}
            color={colors.primary}
          />
        )}
      </View>

      {/* Title */}
      <Text style={titleStyles(isDark, { variant: 'default' })}>{title}</Text>

      {/* Description */}
      <Text style={descriptionStyles(isDark, { variant: 'default' })}>
        {description}
      </Text>

      {/* Action Button */}
      <View style={buttonContainerStyles(isDark)}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          onPress={handlePress}
        >
          {buttonText}
        </Button>
      </View>

      {/* Network Error Sheet */}
      <NetworkErrorSheet
        open={!!networkError}
        onClose={() => setNetworkError(null)}
        onRetry={handlePress}
        error={networkError || { message: '' }}
      />
    </View>
  );
}
