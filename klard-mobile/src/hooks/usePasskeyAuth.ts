import { useState, useCallback, useMemo } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { authClient } from '@/lib/auth-client';
import type { PasskeyAuthResult } from '@klard-apps/commons';

/**
 * Biometric authentication type available on the device
 */
export type BiometricType = 'faceId' | 'touchId' | 'fingerprint' | 'none';

/**
 * Get device name for passkey registration.
 * Falls back to model name if device name is unavailable.
 */
async function getDeviceName(): Promise<string> {
  const deviceName = Device.deviceName;
  if (deviceName) {
    return deviceName;
  }

  // Fallback to model name if device name is not available
  const modelName = Device.modelName;
  if (modelName) {
    return modelName;
  }

  // Final fallback
  return Platform.OS === 'ios' ? 'iPhone' : 'Android Device';
}

/**
 * Check if error is user cancellation.
 * User cancellations should not show error messages.
 */
function isUserCancellation(error: unknown): boolean {
  if (!error) return false;

  let errorMessage = '';

  if (error instanceof Error) {
    errorMessage = error.message.toLowerCase();
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    errorMessage = String((error as { message: unknown }).message).toLowerCase();
  } else {
    errorMessage = String(error).toLowerCase();
  }

  // Common cancellation patterns across platforms
  return (
    errorMessage.includes('cancel') ||
    errorMessage.includes('abort') ||
    errorMessage.includes('user denied') ||
    errorMessage.includes('dismissed')
  );
}

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
   * Calls backend to create a new passkey credential for the user
   *
   * @param name - Optional custom name for the passkey. If not provided, uses device name.
   * @returns PasskeyAuthResult with success status and passkey data or error
   */
  const registerPasskey = useCallback(async (name?: string): Promise<PasskeyAuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get device name if custom name not provided
      const passkeyName = name || (await getDeviceName());

      // Call better-auth addPasskey API
      const result = await authClient.passkey.addPasskey({
        name: passkeyName,
      });

      // Return success result
      return {
        success: true,
        data: {
          id: result.data?.id || '',
          name: passkeyName,
          createdAt: new Date(),
        },
      };
    } catch (err) {
      // Handle user cancellation silently (no error message)
      if (isUserCancellation(err)) {
        return { success: false };
      }

      // Handle other errors
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to register passkey';
      setError(errorMessage);

      return {
        success: false,
        error: {
          code: 'CREDENTIAL_FAILED',
          message: errorMessage,
        },
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sign in using passkey with biometric authentication
   * Triggers biometric prompt and authenticates user with better-auth backend
   *
   * @param email - User's email for identifying the account
   * @param callbackURL - Optional redirect URL after successful sign-in
   * @returns PasskeyAuthResult with success status and session data or error
   */
  const signInWithPasskey = useCallback(async (
    email: string,
    callbackURL?: string
  ): Promise<PasskeyAuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Call better-auth signIn.passkey API
      const result = await authClient.signIn.passkey({
        fetchOptions: {
          onSuccess(context) {
            // Success handled by returning result
          },
          onError(context) {
            // Error handled by checking result.error
          },
        },
      });

      // Check if sign-in was successful
      if (result.data && result.data.session) {
        return {
          success: true,
          data: {
            id: result.data.session.id,
            name: result.data.user?.name || 'User',
            createdAt: new Date(),
          },
        };
      }

      // Check if error exists
      if (result.error) {
        // Handle user cancellation silently (no error message)
        if (isUserCancellation(result.error)) {
          return { success: false };
        }

        const errorMessage = result.error.message || 'Sign-in failed';

        // Set error state for display
        setError(errorMessage);

        // Determine error code based on error message
        const errorCode: 'INVALID_CREDENTIAL' | 'NETWORK_ERROR' = errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('credential')
          ? 'INVALID_CREDENTIAL'
          : 'NETWORK_ERROR';

        return {
          success: false,
          error: {
            code: errorCode,
            message: errorMessage,
          },
        };
      }

      // Fallback error if no data and no error (shouldn't happen)
      setError('Sign-in failed');
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Sign-in failed',
        },
      };
    } catch (err) {
      // Handle exceptions (network errors, etc.)
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign in with passkey';
      setError(errorMessage);

      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: errorMessage,
        },
      };
    } finally {
      setIsLoading(false);
    }
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
