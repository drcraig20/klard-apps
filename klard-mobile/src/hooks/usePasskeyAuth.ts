import { useState, useCallback, useMemo } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

/**
 * Biometric authentication type available on the device
 */
export type BiometricType = 'faceId' | 'touchId' | 'fingerprint' | 'none';

/**
 * Hook providing passkey/biometric authentication functionality
 *
 * @returns Object with state (isLoading, isAvailable, biometricType, error) and actions (checkAvailability, registerPasskey, signInWithPasskey)
 *
 * @example
 * const { isAvailable, biometricType, checkAvailability, signInWithPasskey } = usePasskeyAuth();
 *
 * useEffect(() => {
 *   checkAvailability();
 * }, []);
 *
 * if (isAvailable) {
 *   await signInWithPasskey();
 * }
 */
export function usePasskeyAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<BiometricType>('none');
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if biometric authentication is available on the device
   * Detects hardware, enrollment status, and specific biometric type
   */
  const checkAvailability = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Check if hardware is available
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setIsAvailable(false);
        setBiometricType('none');
        setIsLoading(false);
        return;
      }

      // Step 2: Check if biometric data is enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        setIsAvailable(false);
        setBiometricType('none');
        setIsLoading(false);
        return;
      }

      // Step 3: Determine specific biometric type
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      let detectedType: BiometricType = 'none';

      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        // Face ID on iOS, Face Recognition on Android
        detectedType = 'faceId';
      } else if (
        supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      ) {
        // Touch ID on iOS, Fingerprint on Android
        // Differentiate based on platform
        detectedType = Platform.OS === 'ios' ? 'touchId' : 'fingerprint';
      }

      setBiometricType(detectedType);
      setIsAvailable(detectedType !== 'none');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to check availability';
      setError(errorMessage);
      setIsAvailable(false);
      setBiometricType('none');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register a new passkey using biometric authentication
   * Placeholder for future implementation with backend integration
   */
  const registerPasskey = useCallback(async () => {
    // Placeholder implementation
    // Will be implemented in future tasks with backend integration
    return;
  }, []);

  /**
   * Sign in using passkey with biometric authentication
   * Placeholder for future implementation with backend integration
   */
  const signInWithPasskey = useCallback(async () => {
    // Placeholder implementation
    // Will be implemented in future tasks with backend integration
    return;
  }, []);

  return useMemo(
    () => ({
      isLoading,
      isAvailable,
      biometricType,
      error,
      checkAvailability,
      registerPasskey,
      signInWithPasskey,
    }),
    [
      isLoading,
      isAvailable,
      biometricType,
      error,
      checkAvailability,
      registerPasskey,
      signInWithPasskey,
    ]
  );
}
