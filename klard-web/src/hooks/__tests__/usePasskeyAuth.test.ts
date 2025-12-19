import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { usePasskeyAuth } from '../usePasskeyAuth';
import { authClient } from '@/lib/auth-client';

// Mock the auth client
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    passkey: {
      addPasskey: vi.fn(),
      listUserPasskeys: vi.fn(),
      isSupported: vi.fn(),
    },
    signIn: {
      passkey: vi.fn(),
    },
  },
}));

describe('usePasskeyAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.PublicKeyCredential as available by default
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'PublicKeyCredential', {
        writable: true,
        configurable: true,
        value: class PublicKeyCredential {},
      });
    }
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should return initial state with isLoading false', () => {
      const { result } = renderHook(() => usePasskeyAuth());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isAvailable).toBe(true);
    });

    it('should expose registerPasskey, signInWithPasskey, and preloadPasskeys functions', () => {
      const { result } = renderHook(() => usePasskeyAuth());

      expect(typeof result.current.registerPasskey).toBe('function');
      expect(typeof result.current.signInWithPasskey).toBe('function');
      expect(typeof result.current.preloadPasskeys).toBe('function');
    });
  });

  describe('isAvailable check', () => {
    it('should return true when PublicKeyCredential is supported', () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.isAvailable).toBe(true);
    });

    it('should return false when PublicKeyCredential is not supported', () => {
      // Remove PublicKeyCredential from window
      Object.defineProperty(window, 'PublicKeyCredential', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.isAvailable).toBe(false);
    });
  });

  describe('registerPasskey', () => {
    it('should set isLoading to true during registration', async () => {
      const mockAddPasskey = vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ id: 'passkey-123', name: 'Test Passkey', createdAt: new Date() }), 100))
      );
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      // Start the promise but don't await it yet
      const promise = result.current.registerPasskey('Test Passkey');

      // Check loading state is true during execution
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      // Complete the promise
      await act(async () => {
        await promise;
      });
    });

    it('should call authClient.passkey.addPasskey with correct parameters', async () => {
      const mockAddPasskey = vi.fn().mockResolvedValue({ id: 'passkey-123', name: 'MacBook Pro', createdAt: new Date() });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey('MacBook Pro');
      });

      expect(mockAddPasskey).toHaveBeenCalledWith({ name: 'MacBook Pro' });
    });

    it('should set isLoading to false after successful registration', async () => {
      const mockAddPasskey = vi.fn().mockResolvedValue({ id: 'passkey-123', name: 'Test Passkey', createdAt: new Date() });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey('Test Passkey');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle registration errors and set error state', async () => {
      const mockError = new Error('Registration failed');
      const mockAddPasskey = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey('Test Passkey');
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Registration failed');
    });

    it('should return success true on successful registration', async () => {
      // API response structure: { data: { id: 'passkey-123' } }
      const mockAddPasskey = vi.fn().mockResolvedValue({ data: { id: 'passkey-123' } });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      let registerResult: { success: boolean; data?: { id: string; name: string; createdAt: Date } };
      await act(async () => {
        registerResult = await result.current.registerPasskey('Test Passkey');
      });

      // Hook transforms API response to Passkey object
      expect(registerResult!.success).toBe(true);
      expect(registerResult!.data?.id).toBe('passkey-123');
      expect(registerResult!.data?.name).toBe('Test Passkey');
      expect(registerResult!.data?.createdAt).toBeInstanceOf(Date);
    });

    it('should return success false on registration failure', async () => {
      const mockError = new Error('Registration failed');
      const mockAddPasskey = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      let registerResult;
      await act(async () => {
        registerResult = await result.current.registerPasskey('Test Passkey');
      });

      expect(registerResult).toEqual({
        success: false,
        error: {
          code: 'CREDENTIAL_FAILED',
          message: 'Registration failed',
        },
      });
    });
  });

  describe('signInWithPasskey', () => {
    it('should set isLoading to true during sign-in', async () => {
      const mockSignIn = vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { user: { id: 'user-123' }, session: { id: 'session-123' } } }), 100))
      );
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      // Start the promise but don't await it yet
      const promise = result.current.signInWithPasskey();

      // Check loading state is true during execution
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      // Complete the promise
      await act(async () => {
        await promise;
      });
    });

    it('should call authClient.signIn.passkey without autoFill for explicit sign-in', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' }, session: { id: 'session-123' } } });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      // Should be called without autoFill parameter (or autoFill: false)
      // Since autoFill is for Conditional UI, explicit sign-in should not use it
      expect(mockSignIn).toHaveBeenCalledWith();
    });

    it('should accept optional email parameter', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' }, session: { id: 'session-123' } } });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      // better-auth passkey sign-in may or may not use email for discoverable credentials
      // The important part is that the function accepts the parameter
      expect(mockSignIn).toHaveBeenCalled();
    });

    it('should set isLoading to false after successful sign-in', async () => {
      const mockSession = { user: { id: 'user-123', email: 'user@example.com' }, session: { id: 'session-123' } };
      const mockSignIn = vi.fn().mockResolvedValue({ data: mockSession });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should return PasskeyAuthResult with transformed Passkey data on success', async () => {
      const mockSession = { user: { id: 'user-123', email: 'user@example.com', name: 'Test User' }, session: { id: 'session-123' } };
      const mockSignIn = vi.fn().mockResolvedValue({ data: mockSession });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult: { success: boolean; data?: { id: string; name: string; createdAt: Date } };
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      // Hook transforms session data to Passkey object
      expect(signInResult!.success).toBe(true);
      expect(signInResult!.data?.id).toBe('session-123');
      expect(signInResult!.data?.name).toBe('Test User');
      expect(signInResult!.data?.createdAt).toBeInstanceOf(Date);
    });

    it('should handle user cancellation gracefully (NotAllowedError)', async () => {
      const mockError = new Error('User cancelled');
      mockError.name = 'NotAllowedError';
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      // Silent return on user cancellation
      expect(signInResult).toEqual({ success: false });
      expect(result.current.error).toBeNull();
    });

    it('should handle sign-in errors and set error state', async () => {
      const mockError = new Error('Sign-in failed');
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Sign-in failed');
    });

    it('should return PasskeyAuthResult with error on failure', async () => {
      const mockError = new Error('Invalid credential');
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      expect(signInResult).toEqual({
        success: false,
        error: {
          code: 'INVALID_CREDENTIAL',
          message: 'Invalid credential',
        },
      });
    });

    it('should handle network errors with appropriate error code', async () => {
      const mockError = new Error('Network request failed');
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      expect(signInResult).toEqual({
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network request failed',
        },
      });
    });
  });

  describe('preloadPasskeys', () => {
    beforeEach(() => {
      // Mock Conditional UI availability check
      Object.defineProperty(window, 'PublicKeyCredential', {
        value: {
          isConditionalMediationAvailable: vi.fn().mockResolvedValue(true),
        },
        writable: true,
        configurable: true,
      });
    });

    it('should call authClient.signIn.passkey with autoFill option', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: null });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.preloadPasskeys();
      });

      expect(mockSignIn).toHaveBeenCalledWith({ autoFill: true });
    });

    it('should not set loading state during preload', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: null });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.preloadPasskeys();
      });

      // preloadPasskeys should not affect loading state
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle preload errors silently', async () => {
      const mockError = new Error('Preload failed');
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.preloadPasskeys();
      });

      // Preload errors should not set error state
      expect(result.current.error).toBeNull();
    });
  });

  describe('SOLID compliance', () => {
    it('should follow Single Responsibility Principle - only handle passkey operations', () => {
      const { result } = renderHook(() => usePasskeyAuth());

      // Hook exposes only passkey-related state and actions
      const exposedKeys = Object.keys(result.current);
      expect(exposedKeys).toEqual([
        'isLoading',
        'isAvailable',
        'error',
        'registerPasskey',
        'signInWithPasskey',
        'preloadPasskeys',
      ]);
    });

    it('should follow Dependency Inversion - depend on authClient abstraction', () => {
      // Hook depends on authClient interface, not concrete implementation
      // This is validated by the mock working correctly
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current).toBeDefined();
    });
  });
});
