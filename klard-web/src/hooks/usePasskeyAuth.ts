import { useState, useCallback, useMemo } from 'react';
import { authClient } from '@/lib/auth-client';
import type { PasskeyAuthResult, PasskeyErrorCode } from '@klard-apps/commons';

/**
 * Auto-detects browser name from navigator.userAgent.
 * Follows SRP - single responsibility of browser detection.
 *
 * @returns Browser name (Chrome, Safari, Firefox, or Browser)
 */
function getBrowserName(): string {
  if (typeof navigator === 'undefined') {
    return 'Browser';
  }

  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  return 'Browser';
}

/**
 * Hook for passkey/WebAuthn authentication operations.
 *
 * SOLID Compliance:
 * - SRP: Only handles passkey authentication operations (register, sign-in, preload)
 * - OCP: Extensible via authClient plugin system, closed to modification
 * - LSP: N/A (not a subtype)
 * - ISP: Focused interface with only passkey-specific methods
 * - DIP: Depends on authClient abstraction, not concrete implementation
 *
 * @returns {UsePasskeyAuthReturn} Hook state and actions
 */
export function usePasskeyAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if passkeys are supported in the current environment.
   * Validates both browser environment and WebAuthn API availability.
   *
   * SRP: Only checks passkey availability
   */
  const isAvailable = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.PublicKeyCredential !== undefined;
  }, []);

  /**
   * Register a new passkey for the authenticated user.
   *
   * SRP: Only handles passkey registration
   * DIP: Delegates to authClient.passkey.addPasskey
   *
   * @param name - Optional passkey name (auto-detects browser if not provided)
   * @returns Promise resolving to PasskeyAuthResult
   */
  const registerPasskey = useCallback(async (name?: string): Promise<PasskeyAuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const deviceName = name || getBrowserName();
      const result = await authClient.passkey.addPasskey({ name: deviceName });
      return { success: true, data: result };
    } catch (err) {
      // Handle user cancellation gracefully (NotAllowedError = silent return)
      if (err instanceof Error && err.name === 'NotAllowedError') {
        return { success: false };
      }

      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
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
   * Sign in using a registered passkey.
   *
   * SRP: Only handles passkey sign-in
   * DIP: Delegates to authClient.signIn.passkey
   *
   * @param email - Optional email for identifying user (may be used with discoverable credentials)
   * @returns Promise resolving to PasskeyAuthResult with session data
   */
  const signInWithPasskey = useCallback(async (email?: string): Promise<PasskeyAuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.passkey();
      return { success: true, data: result.data };
    } catch (err) {
      // Handle user cancellation gracefully (NotAllowedError = silent return)
      if (err instanceof Error && err.name === 'NotAllowedError') {
        return { success: false };
      }

      const errorMessage = err instanceof Error ? err.message : 'Sign-in failed';
      setError(errorMessage);

      // Map error message to appropriate error code
      let errorCode: PasskeyErrorCode = 'CREDENTIAL_FAILED';
      if (errorMessage.toLowerCase().includes('network')) {
        errorCode = 'NETWORK_ERROR';
      } else if (errorMessage.toLowerCase().includes('invalid')) {
        errorCode = 'INVALID_CREDENTIAL';
      }

      return {
        success: false,
        error: {
          code: errorCode,
          message: errorMessage,
        },
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Preload user's passkeys for improved UX.
   * Does not set loading state to avoid UI flicker.
   *
   * SRP: Only handles passkey preloading
   * DIP: Delegates to authClient.passkey.listUserPasskeys
   *
   * @returns Promise resolving when preload completes
   */
  const preloadPasskeys = useCallback(async () => {
    try {
      await authClient.passkey.listUserPasskeys();
    } catch (err) {
      // Silently fail - preloading is non-critical
      console.debug('Passkey preload failed:', err);
    }
  }, []);

  return {
    isLoading,
    isAvailable,
    error,
    registerPasskey,
    signInWithPasskey,
    preloadPasskeys,
  };
}

/**
 * Return type for usePasskeyAuth hook.
 *
 * ISP: Focused interface with only necessary methods
 */
export interface UsePasskeyAuthReturn {
  isLoading: boolean;
  isAvailable: boolean;
  error: string | null;
  registerPasskey: (name?: string) => Promise<PasskeyAuthResult>;
  signInWithPasskey: (email?: string) => Promise<PasskeyAuthResult>;
  preloadPasskeys: () => Promise<void>;
}
