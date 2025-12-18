import { useState, useCallback, useMemo } from 'react';
import { authClient } from '@/lib/auth-client';

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
   * @param options - Registration options (name, authenticatorAttachment)
   * @returns Promise resolving to success status
   */
  const registerPasskey = useCallback(
    async (options?: { name?: string; authenticatorAttachment?: 'platform' | 'cross-platform' }) => {
      setIsLoading(true);
      setError(null);

      try {
        await authClient.passkey.addPasskey(options);
        return { success: true };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Sign in using a registered passkey.
   *
   * SRP: Only handles passkey sign-in
   * DIP: Delegates to authClient.signIn.passkey
   *
   * @returns Promise resolving to success status
   */
  const signInWithPasskey = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.passkey();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign-in failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
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
  registerPasskey: (options?: {
    name?: string;
    authenticatorAttachment?: 'platform' | 'cross-platform';
  }) => Promise<{ success: boolean; error?: string }>;
  signInWithPasskey: () => Promise<{ success: boolean; error?: string }>;
  preloadPasskeys: () => Promise<void>;
}
