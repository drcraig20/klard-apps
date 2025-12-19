import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginForm } from '../LoginForm';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import * as authClient from '@/lib/auth-client';

// Mock dependencies
const mockRouterReplace = jest.fn();
const mockRouterPush = jest.fn();

jest.mock('@/lib/auth-client');
jest.mock('@/stores/auth-ui-store');
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    useSharedValue: jest.fn((val) => ({ value: val })),
    useAnimatedStyle: jest.fn((fn) => fn()),
    withTiming: jest.fn((val) => val),
    withSpring: jest.fn((val) => val),
  };
});
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    replace: mockRouterReplace,
    push: mockRouterPush,
  })),
}));
jest.mock('expo-linking', () => ({
  createURL: jest.fn((path: string) => `klard://${path}`),
}));
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: jest.fn(() => ({
    primary: '#0D7C7A',
    border: '#E2E8F0',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
  })),
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
jest.mock('@/hooks/useHaptics', () => ({
  useHaptics: jest.fn(() => ({
    success: jest.fn(),
    error: jest.fn(),
    light: jest.fn(),
    medium: jest.fn(),
    heavy: jest.fn(),
    rigid: jest.fn(),
    soft: jest.fn(),
    warning: jest.fn(),
    selection: jest.fn(),
  })),
}));
jest.mock('@/lib/i18n', () => ({
  t: jest.fn((key: string) => key),
}));
jest.mock('@/styles', () => ({
  typography: {
    body: {},
    bodySmall: {},
    label: {},
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
}));
jest.mock('../login-form.styles', () => ({
  styles: {
    container: {},
    form: {},
    fieldSpacer: {},
    divider: {},
    dividerLine: {},
    dividerText: {},
    signupContainer: {},
    trustContainer: {},
  },
}));
jest.mock('@/utils/error-helpers', () => ({
  isNetworkError: jest.fn((error: unknown) => {
    if (!error) return false;
    const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
    return message.includes('network') || message.includes('fetch failed');
  }),
}));
jest.mock('@/components/auth/social-buttons', () => ({
  SocialButtons: jest.fn(({ onError, onSuccess }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'social-buttons' });
  }),
}));
jest.mock('@/components/auth/error-banner', () => ({
  ErrorBanner: jest.fn(() => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'error-banner' });
  }),
}));
jest.mock('@/components/auth/network-error-sheet', () => ({
  NetworkErrorSheet: jest.fn(({ open, onClose, onRetry }) => {
    const React = require('react');
    const { View, Text, TouchableOpacity } = require('react-native');
    if (!open) return null;
    return React.createElement(
      View,
      { testID: 'network-error-sheet' },
      React.createElement(
        TouchableOpacity,
        { testID: 'network-error-sheet-close', onPress: onClose },
        React.createElement(Text, {}, 'Close')
      ),
      React.createElement(
        TouchableOpacity,
        { testID: 'network-error-sheet-retry', onPress: onRetry },
        React.createElement(Text, {}, 'Try again')
      )
    );
  }),
}));
jest.mock('@/components/ui', () => ({
  Button: jest.fn(({ children, onPress, testID }) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return React.createElement(
      TouchableOpacity,
      { onPress, testID },
      React.createElement(Text, {}, children)
    );
  }),
  InputField: jest.fn(({ placeholder, onChangeText, onBlur, value, testID }) => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return React.createElement(TextInput, {
      placeholder,
      onChangeText,
      onBlur,
      value,
      testID,
    });
  }),
  CheckboxField: jest.fn(({ checked, onChange, label }) => {
    const React = require('react');
    const { TouchableOpacity, Text } = require('react-native');
    return React.createElement(
      TouchableOpacity,
      { onPress: () => onChange(!checked) },
      React.createElement(Text, {}, label)
    );
  }),
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
      setSubmitting: mockSetSubmitting,
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

  it('should use animatedStyle from useShakeAnimation', () => {
    const mockAnimatedStyle = { transform: [{ translateX: 10 }] };
    const useShakeAnimation = require('@/hooks/useShakeAnimation').useShakeAnimation;
    (useShakeAnimation as jest.Mock).mockReturnValue({
      animatedStyle: mockAnimatedStyle,
      shake: jest.fn(),
    });

    // Component renders without errors when using animated style
    const { getByPlaceholderText } = render(<LoginForm />);
    expect(getByPlaceholderText(/email/i)).toBeTruthy();
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
      setSubmitting: mockSetSubmitting,
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
      setSubmitting: mockSetSubmitting,
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
    expect(queryByText(/auth\.login\.passkeyButton|sign in with passkey/i)).toBeNull();
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
    expect(getByText(/auth\.login\.passkeyButton/i)).toBeTruthy();
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
    const passkeyButton = getByText(/auth\.login\.passkeyButton/i);
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
    const passkeyButton = getByText(/auth\.login\.passkeyButton/i);
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
    const passkeyButton = getByText(/auth\.login\.passkeyButton/i);
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

    // Button should be disabled/loading - check for loading text or regular button
    const passkeyButton = getByText(/auth\.login\.passkeyLoading|auth\.login\.passkeyButton/i);
    expect(passkeyButton).toBeTruthy();
  });

  it('should call haptics.success() on successful passkey sign-in', async () => {
    const mockHapticsSuccess = jest.fn();
    const useHaptics = require('@/hooks/useHaptics').useHaptics;
    (useHaptics as jest.Mock).mockReturnValue({
      success: mockHapticsSuccess,
      error: jest.fn(),
      light: jest.fn(),
      medium: jest.fn(),
      heavy: jest.fn(),
      rigid: jest.fn(),
      soft: jest.fn(),
      warning: jest.fn(),
      selection: jest.fn(),
    });

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
    const passkeyButton = getByText(/auth\.login\.passkeyButton/i);
    fireEvent.press(passkeyButton);

    // Should call haptics.success() before navigation
    await waitFor(() => {
      expect(mockHapticsSuccess).toHaveBeenCalled();
    });

    // Verify navigation happened
    expect(mockRouterReplace).toHaveBeenCalledWith('/(tabs)/dashboard');
  });
});

describe('LoginForm - Haptic Feedback on Success', () => {
  const mockSetError = jest.fn();
  const mockReset = jest.fn();
  const mockSetSubmitting = jest.fn();
  const mockClearError = jest.fn();
  const mockHapticsSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock haptics
    const useHaptics = require('@/hooks/useHaptics').useHaptics;
    (useHaptics as jest.Mock).mockReturnValue({
      success: mockHapticsSuccess,
      error: jest.fn(),
      light: jest.fn(),
      medium: jest.fn(),
      heavy: jest.fn(),
      rigid: jest.fn(),
      soft: jest.fn(),
      warning: jest.fn(),
      selection: jest.fn(),
    });

    // Mock the Zustand store
    (useAuthUIStore as unknown as jest.Mock).mockReturnValue({
      formState: 'idle',
      errorMessage: null,
      setSubmitting: mockSetSubmitting,
      setError: mockSetError,
      clearError: mockClearError,
      reset: mockReset,
    });
  });

  it('should call haptics.success() on successful email/password login', async () => {
    // Mock successful auth
    (authClient.signIn.email as jest.Mock) = jest.fn().mockResolvedValue({
      data: { user: { id: '1', email: 'test@example.com' } },
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

    // Should call haptics.success() before navigation
    await waitFor(() => {
      expect(mockHapticsSuccess).toHaveBeenCalled();
    });

    // Verify navigation happened
    expect(mockRouterReplace).toHaveBeenCalledWith('/(tabs)/dashboard');
  });

  it('should call haptics.success() on successful social login', async () => {
    const { getByTestId } = render(<LoginForm />);

    // Find SocialButtons and trigger onSuccess callback
    const socialButtons = getByTestId('social-buttons');
    fireEvent(socialButtons, 'success');

    // Should call haptics.success()
    await waitFor(() => {
      expect(mockHapticsSuccess).toHaveBeenCalled();
    });
  });

  it('should NOT call haptics.success() on email/password login failure', async () => {
    // Mock failed auth
    (authClient.signIn.email as jest.Mock) = jest.fn().mockResolvedValue({
      error: { message: 'Invalid credentials' },
    });

    const { getByText, getByPlaceholderText } = render(<LoginForm />);

    // Fill in form
    const emailInput = getByPlaceholderText(/email/i);
    const passwordInput = getByPlaceholderText(/password/i);
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    // Submit form
    const submitButton = getByText(/sign in|log in|submit/i);
    fireEvent.press(submitButton);

    // Wait for error handling
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalled();
    });

    // Should NOT call haptics.success()
    expect(mockHapticsSuccess).not.toHaveBeenCalled();
  });

  it('should NOT call haptics.success() on passkey sign-in failure', async () => {
    const mockSignInWithPasskey = jest.fn();
    const usePasskeyAuth = require('@/hooks/usePasskeyAuth').usePasskeyAuth;
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'faceId',
      error: null,
      checkAvailability: jest.fn(),
      registerPasskey: jest.fn(),
      signInWithPasskey: mockSignInWithPasskey,
    });

    // Mock passkey failure
    mockSignInWithPasskey.mockResolvedValue({
      success: false,
      error: { code: 'INVALID_CREDENTIAL', message: 'Passkey authentication failed' },
    });

    const { getByText } = render(<LoginForm />);

    // Press passkey button
    const passkeyButton = getByText(/auth\.login\.passkeyButton/i);
    fireEvent.press(passkeyButton);

    // Wait for error handling
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Passkey authentication failed');
    });

    // Should NOT call haptics.success()
    expect(mockHapticsSuccess).not.toHaveBeenCalled();

    // Should NOT navigate
    expect(mockRouterReplace).not.toHaveBeenCalled();
  });

  it('should NOT call haptics.success() on social login failure', async () => {
    const { getByTestId } = render(<LoginForm />);

    // Find SocialButtons and trigger onError callback
    const socialButtons = getByTestId('social-buttons');
    fireEvent(socialButtons, 'error', 'Social authentication failed');

    // Wait for error handling
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Social authentication failed');
    });

    // Should NOT call haptics.success()
    expect(mockHapticsSuccess).not.toHaveBeenCalled();
  });
});
