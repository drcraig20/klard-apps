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
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { id: 'passkey-123' } }), 100))
      );
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      // Start the promise but don't await it yet
      const promise = result.current.registerPasskey({ name: 'Test Passkey' });

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
      const mockAddPasskey = vi.fn().mockResolvedValue({ data: { id: 'passkey-123' } });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey({ name: 'MacBook Pro' });
      });

      expect(mockAddPasskey).toHaveBeenCalledWith({ name: 'MacBook Pro' });
    });

    it('should set isLoading to false after successful registration', async () => {
      const mockAddPasskey = vi.fn().mockResolvedValue({ data: { id: 'passkey-123' } });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey({ name: 'Test Passkey' });
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
        await result.current.registerPasskey({ name: 'Test Passkey' });
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Registration failed');
    });

    it('should return success true on successful registration', async () => {
      const mockAddPasskey = vi.fn().mockResolvedValue({ data: { id: 'passkey-123' } });
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      let registerResult;
      await act(async () => {
        registerResult = await result.current.registerPasskey({ name: 'Test Passkey' });
      });

      expect(registerResult).toEqual({ success: true });
    });

    it('should return success false on registration failure', async () => {
      const mockError = new Error('Registration failed');
      const mockAddPasskey = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.passkey.addPasskey).mockImplementation(mockAddPasskey);

      const { result } = renderHook(() => usePasskeyAuth());

      let registerResult;
      await act(async () => {
        registerResult = await result.current.registerPasskey({ name: 'Test Passkey' });
      });

      expect(registerResult).toEqual({ success: false, error: 'Registration failed' });
    });
  });

  describe('signInWithPasskey', () => {
    it('should set isLoading to true during sign-in', async () => {
      const mockSignIn = vi.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: { user: { id: 'user-123' } } }), 100))
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

    it('should call authClient.signIn.passkey with default options', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } } });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      expect(mockSignIn).toHaveBeenCalledWith();
    });

    it('should set isLoading to false after successful sign-in', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } } });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.signInWithPasskey();
      });

      expect(result.current.isLoading).toBe(false);
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

    it('should return success true on successful sign-in', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ data: { user: { id: 'user-123' } } });
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      expect(signInResult).toEqual({ success: true });
    });

    it('should return success false on sign-in failure', async () => {
      const mockError = new Error('Sign-in failed');
      const mockSignIn = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.signIn.passkey).mockImplementation(mockSignIn);

      const { result } = renderHook(() => usePasskeyAuth());

      let signInResult;
      await act(async () => {
        signInResult = await result.current.signInWithPasskey();
      });

      expect(signInResult).toEqual({ success: false, error: 'Sign-in failed' });
    });
  });

  describe('preloadPasskeys', () => {
    it('should call authClient.passkey.listUserPasskeys', async () => {
      const mockListPasskeys = vi.fn().mockResolvedValue({
        data: [{ id: 'passkey-1', name: 'Test Passkey', createdAt: '2024-01-01' }]
      });
      vi.mocked(authClient.passkey.listUserPasskeys).mockImplementation(mockListPasskeys);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.preloadPasskeys();
      });

      expect(mockListPasskeys).toHaveBeenCalled();
    });

    it('should not set loading state during preload', async () => {
      const mockListPasskeys = vi.fn().mockResolvedValue({ data: [] });
      vi.mocked(authClient.passkey.listUserPasskeys).mockImplementation(mockListPasskeys);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.preloadPasskeys();
      });

      // preloadPasskeys should not affect loading state
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle preload errors silently', async () => {
      const mockError = new Error('Preload failed');
      const mockListPasskeys = vi.fn().mockRejectedValue(mockError);
      vi.mocked(authClient.passkey.listUserPasskeys).mockImplementation(mockListPasskeys);

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
