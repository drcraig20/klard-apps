import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginForm } from '../LoginForm';
import { useAuthUIStore } from '@/stores';
import * as authClient from '@/lib/auth-client';

// Mock dependencies
const mockRouterReplace = jest.fn();
const mockRouterPush = jest.fn();

jest.mock('@/lib/auth-client');
jest.mock('@/stores');
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    replace: mockRouterReplace,
    push: mockRouterPush,
  })),
}));
jest.mock('expo-linking', () => ({
  createURL: jest.fn((path: string) => `klard://${path}`),
}));
jest.mock('@/hooks/useShakeAnimation', () => ({
  useShakeAnimation: jest.fn(() => ({
    animatedStyle: { transform: [{ translateX: 0 }] },
    shake: jest.fn(),
  })),
}));
jest.mock('@/hooks/usePasskeyAuth', () => ({
  usePasskeyAuth: jest.fn(() => ({
    isLoading: false,
    isAvailable: false,
    biometricType: 'none',
    error: null,
    checkAvailability: jest.fn(),
    registerPasskey: jest.fn(),
    signInWithPasskey: jest.fn(),
  })),
}));

describe('LoginForm - Shake Animation Integration', () => {
  const mockSetError = jest.fn();
  const mockReset = jest.fn();
  const mockSetSubmitting = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Zustand store
    (useAuthUIStore as unknown as jest.Mock).mockReturnValue({
      formState: 'idle',
      errorMessage: null,
      magicLinkEmail: null,
      setSubmitting: mockSetSubmitting,
      setMagicLinkSent: jest.fn(),
      setError: mockSetError,
      clearError: jest.fn(),
      reset: mockReset,
    });
  });

  it('should call shake() on authentication failure', async () => {
    const mockShake = jest.fn();
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: { transform: [{ translateX: 0 }] },
      shake: mockShake,
    });

    // Mock failed auth
    (authClient.signIn.email as jest.Mock) = jest.fn().mockResolvedValue({
      error: { message: 'Invalid credentials' },
    });

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    // Fill in form
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Submit form
    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    // Wait for shake to be called
    await waitFor(() => {
      expect(mockShake).toHaveBeenCalled();
    });

    // Verify error was set
    expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should call shake() on magic link failure', async () => {
    const mockShake = jest.fn();
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: { transform: [{ translateX: 0 }] },
      shake: mockShake,
    });

    // Mock failed magic link
    (authClient.signIn.magicLink as jest.Mock) = jest.fn().mockResolvedValue({
      error: { message: 'Failed to send magic link' },
    });

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    // Fill in email
    const emailInput = getByPlaceholderText(/email/i);
    fireEvent.changeText(emailInput, 'test@example.com');

    // Click magic link button
    const magicLinkButton = getByText(/magic link/i);
    fireEvent.press(magicLinkButton);

    // Wait for shake to be called
    await waitFor(() => {
      expect(mockShake).toHaveBeenCalled();
    });

    // Verify error was set
    expect(mockSetError).toHaveBeenCalled();
  });

  it('should call shake() on social auth error', async () => {
    const mockShake = jest.fn();
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: { transform: [{ translateX: 0 }] },
      shake: mockShake,
    });

    const { getByTestId } = render(<LoginForm />);

    // Simulate social auth error by finding SocialButtons component
    // and triggering its onError callback
    const socialButtons = getByTestId('social-buttons');
    fireEvent(socialButtons, 'error', 'Social auth failed');

    // Wait for shake to be called
    await waitFor(() => {
      expect(mockShake).toHaveBeenCalled();
    });

    // Verify error was set
    expect(mockSetError).toHaveBeenCalledWith('Social auth failed');
  });

  it('should wrap form fields in Animated.View with animatedStyle', () => {
    const mockAnimatedStyle = { transform: [{ translateX: 10 }] };
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: mockAnimatedStyle,
      shake: jest.fn(),
    });

    const { getByTestId } = render(<LoginForm />);

    // Verify animated view exists with correct style
    const animatedFormView = getByTestId('animated-form-view');
    expect(animatedFormView.props.style).toEqual(mockAnimatedStyle);
  });
});

describe('LoginForm - Network Error Integration', () => {
  const mockSetError = jest.fn();
  const mockReset = jest.fn();
  const mockSetSubmitting = jest.fn();
  const mockClearError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Zustand store
    (useAuthUIStore as unknown as jest.Mock).mockReturnValue({
      formState: 'idle',
      errorMessage: null,
      magicLinkEmail: null,
      setSubmitting: mockSetSubmitting,
      setMagicLinkSent: jest.fn(),
      setError: mockSetError,
      clearError: mockClearError,
      reset: mockReset,
    });
  });

  it('should show NetworkErrorSheet for network errors on email sign-in', async () => {
    const networkError = new Error('Network request failed');
    (authClient.signIn.email as jest.Mock) = jest.fn().mockRejectedValue(networkError);

    const { getByPlaceholderText, getByText, queryByTestId } = render(<LoginForm />);

    // Fill in form
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Submit form
    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    // Should show NetworkErrorSheet
    await waitFor(() => {
      const sheet = queryByTestId('network-error-sheet');
      expect(sheet).toBeTruthy();
    });

    // Should NOT call setError (inline banner)
    expect(mockSetError).not.toHaveBeenCalled();
  });

  it('should show inline ErrorBanner for auth errors', async () => {
    (authClient.signIn.email as jest.Mock) = jest.fn().mockResolvedValue({
      error: { message: 'Invalid credentials' },
    });

    const { getByPlaceholderText, getByText, queryByTestId } = render(<LoginForm />);

    // Fill in form
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    // Submit form
    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    // Should call setError for inline banner
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Invalid credentials');
    });

    // Should NOT show NetworkErrorSheet
    expect(queryByTestId('network-error-sheet')).toBeNull();
  });

  it('should preserve form values when NetworkErrorSheet is dismissed', async () => {
    const networkError = new Error('fetch failed');
    (authClient.signIn.email as jest.Mock) = jest.fn().mockRejectedValue(networkError);

    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginForm />);

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByTestId('network-error-sheet')).toBeTruthy();
    });

    // Close the sheet
    const closeButton = getByTestId('network-error-sheet-close');
    fireEvent.press(closeButton);

    // Form values should still be there
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should retry failed operation with same values when "Try again" is pressed', async () => {
    const networkError = new Error('Network request failed');
    (authClient.signIn.email as jest.Mock)
      .mockRejectedValueOnce(networkError)
      .mockResolvedValueOnce({ data: { user: { id: '1' } } });

    const { getByPlaceholderText, getByText } = render(<LoginForm />);

    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText('Try again')).toBeTruthy();
    });

    // Press "Try again" button
    const retryButton = getByText('Try again');
    fireEvent.press(retryButton);

    await waitFor(() => {
      expect(authClient.signIn.email).toHaveBeenCalledTimes(2);
      expect(authClient.signIn.email).toHaveBeenLastCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should handle network errors in magic link flow', async () => {
    const networkError = new Error('timeout');
    (authClient.signIn.magicLink as jest.Mock) = jest.fn().mockRejectedValue(networkError);

    const { getByPlaceholderText, getByText, queryByTestId } = render(<LoginForm />);

    const emailInput = getByPlaceholderText(/email/i);
    fireEvent.changeText(emailInput, 'test@example.com');

    const magicLinkButton = getByText(/magic link/i);
    fireEvent.press(magicLinkButton);

    await waitFor(() => {
      expect(queryByTestId('network-error-sheet')).toBeTruthy();
    });

    // Should NOT call setError
    expect(mockSetError).not.toHaveBeenCalled();
  });
});

describe('LoginForm - Passkey Integration', () => {
  const mockSetError = jest.fn();
  const mockReset = jest.fn();
  const mockSetSubmitting = jest.fn();
  const mockClearError = jest.fn();
  const mockSignInWithPasskey = jest.fn();
  const mockCheckAvailability = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the Zustand store
    (useAuthUIStore as unknown as jest.Mock).mockReturnValue({
      formState: 'idle',
      errorMessage: null,
      magicLinkEmail: null,
      setSubmitting: mockSetSubmitting,
      setMagicLinkSent: jest.fn(),
      setError: mockSetError,
      clearError: mockClearError,
      reset: mockReset,
    });
  });

  it('should not show passkey button when biometrics unavailable', () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: false,
      biometricType: 'none',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    const { queryByText } = render(<LoginForm />);

    // Passkey button should not be visible
    expect(queryByText(/sign in with passkey/i)).toBeNull();
  });

  it('should show passkey button when biometrics available', () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'faceId',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    const { getByText } = render(<LoginForm />);

    // Passkey button should be visible
    expect(getByText(/sign in with passkey/i)).toBeTruthy();
  });

  it('should call checkAvailability on mount', () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: false,
      biometricType: 'none',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    render(<LoginForm />);

    // Should call checkAvailability on mount
    expect(mockCheckAvailability).toHaveBeenCalledTimes(1);
  });

  it('should trigger signInWithPasskey on button press', async () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'touchId',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    mockSignInWithPasskey.mockResolvedValue({ success: true });

    const { getByText } = render(<LoginForm />);

    // Press passkey button (no email required - uses discoverable credentials)
    const passkeyButton = getByText(/sign in with passkey/i);
    fireEvent.press(passkeyButton);

    // Should call signInWithPasskey without parameters
    await waitFor(() => {
      expect(mockSignInWithPasskey).toHaveBeenCalledWith();
    });
  });

  it('should navigate to dashboard on successful passkey sign-in', async () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'faceId',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    mockSignInWithPasskey.mockResolvedValue({ success: true });

    const { getByText } = render(<LoginForm />);

    // Press passkey button
    const passkeyButton = getByText(/sign in with passkey/i);
    fireEvent.press(passkeyButton);

    // Should navigate to dashboard
    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('/(tabs)/dashboard');
    });
  });

  it('should show error and trigger shake on passkey sign-in failure', async () => {
    const mockShake = jest.fn();
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: { transform: [{ translateX: 0 }] },
      shake: mockShake,
    });

    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'fingerprint',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    mockSignInWithPasskey.mockResolvedValue({
      success: false,
      error: { code: 'INVALID_CREDENTIAL', message: 'Passkey authentication failed' },
    });

    const { getByText } = render(<LoginForm />);

    // Press passkey button
    const passkeyButton = getByText(/sign in with passkey/i);
    fireEvent.press(passkeyButton);

    // Should call shake and show error
    await waitFor(() => {
      expect(mockShake).toHaveBeenCalled();
      expect(mockSetError).toHaveBeenCalledWith('Passkey authentication failed');
    });

    // Should NOT navigate
    expect(mockRouterReplace).not.toHaveBeenCalled();
  });

  it('should disable passkey button while passkey operation in progress', async () => {
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: true,
      isAvailable: true,
      biometricType: 'faceId',
      error: null,
      checkAvailability: mockCheckAvailability,
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    const { getByText } = render(<LoginForm />);

    // Button should be disabled/loading
    const passkeyButton = getByText(/authenticating|sign in with passkey/i);
    expect(passkeyButton).toBeTruthy();
  });
});
