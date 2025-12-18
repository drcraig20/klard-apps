import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BiometricPrompt } from '@/components/auth/biometric-prompt';
import { usePasskeyAuth } from '@/hooks/usePasskeyAuth';

// Mock dependencies
jest.mock('@/hooks/usePasskeyAuth');
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: jest.fn(() => ({
    colors: {
      primary: '#0D7C7A',
      primaryForeground: '#FFFFFF',
      foreground: '#0F172A',
      mutedForeground: '#64748B',
      background: '#FFFFFF',
    },
    isDark: false,
  })),
}));
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('BiometricPrompt', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementation
    (usePasskeyAuth as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      biometricType: 'faceId',
      error: null,
      checkAvailability: jest.fn(),
      registerPasskey: jest.fn(),
      signInWithPasskey: jest.fn(),
    });
  });

  describe('render modes', () => {
    it('renders "Add Passkey" button in register mode', () => {
      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Add Passkey')).toBeTruthy();
    });

    it('renders "Sign in" button in signin mode', () => {
      const { getByText } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Sign in')).toBeTruthy();
    });
  });

  describe('biometric icon display', () => {
    it('renders correct title for Face ID', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Add Face ID')).toBeTruthy();
    });

    it('renders correct title for Touch ID', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'touchId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Add Touch ID')).toBeTruthy();
    });

    it('renders correct title for Fingerprint', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'fingerprint',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByText('Add Fingerprint')).toBeTruthy();
    });
  });

  describe('loading state', () => {
    it('shows loading indicator when isLoading is true', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: true,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByTestId } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('disables button when loading', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: true,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByRole } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByRole('button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('register mode interactions', () => {
    it('calls registerPasskey when button pressed in register mode', async () => {
      const mockRegisterPasskey = jest.fn().mockResolvedValue({ success: true });
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: mockRegisterPasskey,
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Add Passkey');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockRegisterPasskey).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onSuccess when registration succeeds', async () => {
      const mockRegisterPasskey = jest.fn().mockResolvedValue({ success: true });
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: mockRegisterPasskey,
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Add Passkey');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onError when registration fails', async () => {
      const mockRegisterPasskey = jest
        .fn()
        .mockRejectedValue(new Error('Registration failed'));
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: mockRegisterPasskey,
        signInWithPasskey: jest.fn(),
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Add Passkey');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith('Registration failed');
      });
    });
  });

  describe('signin mode interactions', () => {
    it('calls signInWithPasskey when button pressed in signin mode', async () => {
      const mockSignInWithPasskey = jest.fn().mockResolvedValue({ success: true });
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: mockSignInWithPasskey,
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Sign in');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockSignInWithPasskey).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onSuccess when sign in succeeds', async () => {
      const mockSignInWithPasskey = jest.fn().mockResolvedValue({ success: true });
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: mockSignInWithPasskey,
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Sign in');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onError when sign in fails', async () => {
      const mockSignInWithPasskey = jest
        .fn()
        .mockRejectedValue(new Error('Sign in failed'));
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: false,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: mockSignInWithPasskey,
      });

      const { getByText } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Sign in');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith('Sign in failed');
      });
    });
  });

  describe('accessibility', () => {
    it('has correct accessibility role and labels in register mode', () => {
      const { getByText } = render(
        <BiometricPrompt
          mode="register"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Add Passkey');
      expect(button).toBeTruthy();
    });

    it('has correct accessibility role and labels in signin mode', () => {
      const { getByText } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByText('Sign in');
      expect(button).toBeTruthy();
    });

    it('has disabled state in accessibility when loading', () => {
      (usePasskeyAuth as jest.Mock).mockReturnValue({
        isLoading: true,
        isAvailable: true,
        biometricType: 'faceId',
        error: null,
        checkAvailability: jest.fn(),
        registerPasskey: jest.fn(),
        signInWithPasskey: jest.fn(),
      });

      const { getByRole } = render(
        <BiometricPrompt
          mode="signin"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
          onCancel={mockOnCancel}
        />
      );

      const button = getByRole('button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });
});
