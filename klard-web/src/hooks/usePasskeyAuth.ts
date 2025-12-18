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
      // Construct Passkey object from API response
      return {
        success: true,
        data: {
          id: result.data?.id || '',
          name: deviceName,
          createdAt: new Date(),
        },
      };
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
   * Uses discoverable credentials where the authenticator identifies the user automatically.
   *
   * SRP: Only handles passkey sign-in
   * DIP: Delegates to authClient.signIn.passkey
   *
   * @returns Promise resolving to PasskeyAuthResult with session data
   */
  const signInWithPasskey = useCallback(async (): Promise<PasskeyAuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.passkey();
      // Check if sign-in was successful
      if (result.data?.session) {
        // Construct Passkey object from session data
        return {
          success: true,
          data: {
            id: result.data.session.id,
            name: result.data.user?.name || 'User',
            createdAt: new Date(),
          },
        };
      }
      // If no session data, return failure
      return { success: false };
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
   * Preload user's passkeys with Conditional UI autofill.
   * Enables browser passkey suggestions when user interacts with webauthn input fields.
   * Does not set loading state to avoid UI flicker.
   *
   * SRP: Only handles passkey preloading with Conditional UI
   * DIP: Delegates to authClient.signIn.passkey with autoFill option
   *
   * @returns Promise resolving when preload completes
   */
  const preloadPasskeys = useCallback(async () => {
    // Check if Conditional UI is supported in the browser
    if (
      typeof window === 'undefined' ||
      !window.PublicKeyCredential ||
      !PublicKeyCredential.isConditionalMediationAvailable
    ) {
      return;
    }

    try {
      const isSupported = await PublicKeyCredential.isConditionalMediationAvailable();
      if (!isSupported) {
        return;
      }

      // Preload passkeys with autofill (Conditional UI)
      await authClient.signIn.passkey({ autoFill: true });
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
  signInWithPasskey: () => Promise<PasskeyAuthResult>;
  preloadPasskeys: () => Promise<void>;
}
