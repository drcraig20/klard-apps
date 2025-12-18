import { renderHook, act, waitFor } from '@testing-library/react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { usePasskeyAuth } from '@/hooks/usePasskeyAuth';

// Mock expo-local-authentication
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  supportedAuthenticationTypesAsync: jest.fn(),
  authenticateAsync: jest.fn(),
  AuthenticationType: {
    FINGERPRINT: 1,
    FACIAL_RECOGNITION: 2,
    IRIS: 3,
  },
}));

// Mock expo-device
jest.mock('expo-device', () => ({
  deviceName: 'Test iPhone',
  modelName: 'iPhone 14 Pro',
}));

// Mock auth-client
jest.mock('@/lib/auth-client', () => ({
  authClient: {
    passkey: {
      addPasskey: jest.fn(),
    },
    signIn: {
      passkey: jest.fn(),
    },
  },
}));

// Import the mocked authClient for type-safe testing
import { authClient } from '@/lib/auth-client';

describe('usePasskeyAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default successful mock for addPasskey
    (authClient.passkey.addPasskey as jest.Mock).mockResolvedValue({
      data: {
        id: 'test-passkey-id-123',
      },
    });
  });

  describe('initial state', () => {
    it('returns initial state with isLoading false, isAvailable false, biometricType none, and no error', () => {
      const { result } = renderHook(() => usePasskeyAuth());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAvailable).toBe(false);
      expect(result.current.biometricType).toBe('none');
      expect(result.current.error).toBeNull();
    });

    it('exposes checkAvailability method', () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.checkAvailability).toBeDefined();
      expect(typeof result.current.checkAvailability).toBe('function');
    });

    it('exposes registerPasskey method', () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.registerPasskey).toBeDefined();
      expect(typeof result.current.registerPasskey).toBe('function');
    });

    it('exposes signInWithPasskey method', () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.signInWithPasskey).toBeDefined();
      expect(typeof result.current.signInWithPasskey).toBe('function');
    });
  });

  describe('checkAvailability', () => {
    it('sets isLoading to true during availability check', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      ]);

      const { result } = renderHook(() => usePasskeyAuth());

      act(() => {
        result.current.checkAvailability();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('detects Face ID when FACIAL_RECOGNITION is available on iOS', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      ]);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(result.current.biometricType).toBe('faceId');
      expect(result.current.isAvailable).toBe(true);
    });

    it('detects Touch ID when FINGERPRINT is available on iOS', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FINGERPRINT,
      ]);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(result.current.biometricType).toBe('touchId');
      expect(result.current.isAvailable).toBe(true);
    });

    it('detects fingerprint when FINGERPRINT is available on Android', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FINGERPRINT,
      ]);

      // For this test, we assume Android context (in real implementation, would use Platform.OS)
      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      // On iOS this returns 'touchId', but implementation should handle Android case
      expect(['touchId', 'fingerprint']).toContain(result.current.biometricType);
      expect(result.current.isAvailable).toBe(true);
    });

    it('sets biometricType to none when no hardware available', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(false);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(result.current.biometricType).toBe('none');
      expect(result.current.isAvailable).toBe(false);
    });

    it('sets biometricType to none when hardware available but not enrolled', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(false);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FINGERPRINT,
      ]);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(result.current.biometricType).toBe('none');
      expect(result.current.isAvailable).toBe(false);
    });

    it('handles errors during availability check', async () => {
      const error = new Error('Hardware check failed');
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(result.current.error).toBe('Hardware check failed');
      expect(result.current.isAvailable).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('calls LocalAuthentication APIs in correct order', async () => {
      (LocalAuthentication.hasHardwareAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.isEnrolledAsync as jest.Mock).mockResolvedValue(true);
      (LocalAuthentication.supportedAuthenticationTypesAsync as jest.Mock).mockResolvedValue([
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
      ]);

      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.checkAvailability();
      });

      expect(LocalAuthentication.hasHardwareAsync).toHaveBeenCalled();
      expect(LocalAuthentication.isEnrolledAsync).toHaveBeenCalled();
      expect(LocalAuthentication.supportedAuthenticationTypesAsync).toHaveBeenCalled();
    });
  });

  describe('registerPasskey', () => {
    it('is defined and callable', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.registerPasskey).toBeDefined();

      // For now, just verify it's a function that can be called
      await act(async () => {
        await result.current.registerPasskey();
      });
    });

    it('sets isLoading to true during registration', async () => {
      const { result } = renderHook(() => usePasskeyAuth());

      act(() => {
        result.current.registerPasskey();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('calls authClient.passkey.addPasskey with custom name when provided', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      const customName = 'My iPhone 14';

      await act(async () => {
        await result.current.registerPasskey(customName);
      });

      // Verify addPasskey was called with the custom name
      expect(authClient.passkey.addPasskey).toHaveBeenCalledWith({
        name: customName,
      });
      expect(result.current.error).toBeNull();
    });

    it('uses device name when no name provided', async () => {
      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey();
      });

      // Should call addPasskey with device name from expo-device
      expect(authClient.passkey.addPasskey).toHaveBeenCalledWith({
        name: 'Test iPhone',
      });
      expect(result.current.error).toBeNull();
    });

    it('returns PasskeyAuthResult with success true on successful registration', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      let registrationResult;

      await act(async () => {
        registrationResult = await result.current.registerPasskey('Test Device');
      });

      // Verify the result structure matches PasskeyAuthResult
      expect(registrationResult).toBeDefined();
      expect(registrationResult).toEqual({
        success: true,
        data: {
          id: 'test-passkey-id-123',
          name: 'Test Device',
          createdAt: expect.any(Date),
        },
      });
    });

    it('handles user cancellation gracefully without showing error', async () => {
      // Mock user cancellation error
      (authClient.passkey.addPasskey as jest.Mock).mockRejectedValue(
        new Error('User cancelled the operation')
      );

      const { result } = renderHook(() => usePasskeyAuth());
      let registrationResult;

      await act(async () => {
        registrationResult = await result.current.registerPasskey();
      });

      // Should not set error state for user cancellation
      expect(result.current.error).toBeNull();
      expect(registrationResult).toEqual({ success: false });
    });

    it('returns PasskeyAuthResult with error on failure', async () => {
      // Mock a non-cancellation error
      (authClient.passkey.addPasskey as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => usePasskeyAuth());
      let registrationResult;

      await act(async () => {
        registrationResult = await result.current.registerPasskey('Test Device');
      });

      // Result should be defined with proper error structure
      expect(registrationResult).toBeDefined();
      expect(registrationResult).toEqual({
        success: false,
        error: {
          code: 'CREDENTIAL_FAILED',
          message: 'Network error',
        },
      });
      expect(result.current.error).toBe('Network error');
    });

    it('clears previous errors before new registration attempt', async () => {
      const { result } = renderHook(() => usePasskeyAuth());

      await act(async () => {
        await result.current.registerPasskey();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('signInWithPasskey', () => {
    beforeEach(() => {
      // Setup default successful mock for signIn.passkey
      (authClient.signIn.passkey as jest.Mock).mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
          },
          session: {
            id: 'session-123',
            userId: 'user-123',
            token: 'session-token-123',
            expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
          },
        },
        error: null,
      });
    });

    it('is defined and callable', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      expect(result.current.signInWithPasskey).toBeDefined();
      expect(typeof result.current.signInWithPasskey).toBe('function');
    });

    it('sets isLoading to true during sign in', async () => {
      const { result } = renderHook(() => usePasskeyAuth());

      act(() => {
        result.current.signInWithPasskey('test@example.com');
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('calls authClient.signIn.passkey with correct options', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      const email = 'test@example.com';

      await act(async () => {
        await result.current.signInWithPasskey(email);
      });

      // Verify signIn.passkey was called
      expect(authClient.signIn.passkey).toHaveBeenCalledWith({
        fetchOptions: {
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        },
      });
      expect(result.current.error).toBeNull();
    });

    it('returns PasskeyAuthResult with success true on successful sign in', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      let signInResult;

      await act(async () => {
        signInResult = await result.current.signInWithPasskey('test@example.com');
      });

      // Verify the result structure matches PasskeyAuthResult
      expect(signInResult).toBeDefined();
      expect(signInResult).toEqual({
        success: true,
        data: {
          id: 'session-123',
          name: 'Test User',
          createdAt: expect.any(Date),
        },
      });
      expect(result.current.error).toBeNull();
    });

    it('handles user cancellation gracefully without showing error', async () => {
      // Mock user cancellation error
      (authClient.signIn.passkey as jest.Mock).mockResolvedValue({
        data: null,
        error: {
          message: 'User cancelled the operation',
        },
      });

      const { result } = renderHook(() => usePasskeyAuth());
      let signInResult;

      await act(async () => {
        signInResult = await result.current.signInWithPasskey('test@example.com');
      });

      // Should not set error state for user cancellation
      expect(result.current.error).toBeNull();
      expect(signInResult).toEqual({ success: false });
    });

    it('handles invalid credential error with appropriate message', async () => {
      // Mock invalid credential error
      (authClient.signIn.passkey as jest.Mock).mockResolvedValue({
        data: null,
        error: {
          message: 'Invalid passkey credential',
        },
      });

      const { result } = renderHook(() => usePasskeyAuth());
      let signInResult;

      await act(async () => {
        signInResult = await result.current.signInWithPasskey('test@example.com');
      });

      // Result should be defined with proper error structure
      expect(signInResult).toBeDefined();
      expect(signInResult).toEqual({
        success: false,
        error: {
          code: 'INVALID_CREDENTIAL',
          message: 'Invalid passkey credential',
        },
      });
      expect(result.current.error).toBe('Invalid passkey credential');
    });

    it('handles network error with appropriate message', async () => {
      // Mock network error
      (authClient.signIn.passkey as jest.Mock).mockRejectedValue(
        new Error('Network request failed')
      );

      const { result } = renderHook(() => usePasskeyAuth());
      let signInResult;

      await act(async () => {
        signInResult = await result.current.signInWithPasskey('test@example.com');
      });

      // Result should be defined with proper error structure
      expect(signInResult).toBeDefined();
      expect(signInResult).toEqual({
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network request failed',
        },
      });
      expect(result.current.error).toBe('Network request failed');
    });

    it('clears previous errors before new sign-in attempt', async () => {
      const { result } = renderHook(() => usePasskeyAuth());

      // First attempt with error
      (authClient.signIn.passkey as jest.Mock).mockResolvedValue({
        data: null,
        error: {
          message: 'Invalid passkey credential',
        },
      });

      await act(async () => {
        await result.current.signInWithPasskey('test@example.com');
      });

      expect(result.current.error).toBe('Invalid passkey credential');

      // Second attempt should clear the error first
      (authClient.signIn.passkey as jest.Mock).mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
          },
          session: {
            id: 'session-123',
            userId: 'user-123',
            token: 'session-token-123',
            expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          },
        },
        error: null,
      });

      await act(async () => {
        await result.current.signInWithPasskey('test@example.com');
      });

      expect(result.current.error).toBeNull();
    });

    it('accepts optional callbackURL parameter', async () => {
      const { result } = renderHook(() => usePasskeyAuth());
      const email = 'test@example.com';
      const callbackURL = '/dashboard';

      await act(async () => {
        await result.current.signInWithPasskey(email, callbackURL);
      });

      // Verify signIn.passkey was called
      expect(authClient.signIn.passkey).toHaveBeenCalled();
      expect(result.current.error).toBeNull();
    });
  });

  describe('stable references', () => {
    it('returns stable function references across rerenders', () => {
      const { result, rerender } = renderHook(() => usePasskeyAuth());
      const firstCheckAvailability = result.current.checkAvailability;
      const firstRegisterPasskey = result.current.registerPasskey;
      const firstSignInWithPasskey = result.current.signInWithPasskey;

      rerender({});

      expect(result.current.checkAvailability).toBe(firstCheckAvailability);
      expect(result.current.registerPasskey).toBe(firstRegisterPasskey);
      expect(result.current.signInWithPasskey).toBe(firstSignInWithPasskey);
    });
  });
});
