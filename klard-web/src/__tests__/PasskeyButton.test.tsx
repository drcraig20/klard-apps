import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasskeyButton } from '@/components/auth/passkey-button/PasskeyButton';

// Mock the usePasskeyAuth hook
const mockUsePasskeyAuth = vi.fn();
vi.mock('@/hooks/usePasskeyAuth', () => ({
  usePasskeyAuth: () => mockUsePasskeyAuth(),
}));

describe('PasskeyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when WebAuthn is not available', () => {
    it('returns null (hidden) when isAvailable is false', () => {
      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: false,
        isLoading: false,
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      const { container } = render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      expect(container.firstChild).toBeNull();
    });

    it('returns null even when loading state is true (no flash)', () => {
      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: false,
        isLoading: true, // Loading state should not cause flash
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      const { container } = render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      // Button should remain hidden regardless of loading state
      expect(container.firstChild).toBeNull();
    });

    it('remains hidden in both signin and register modes', () => {
      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: false,
        isLoading: false,
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      // Test register mode
      const { container: registerContainer } = render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );
      expect(registerContainer.firstChild).toBeNull();

      // Test signin mode
      const { container: signinContainer } = render(
        <PasskeyButton mode="signin" onSuccess={vi.fn()} onError={vi.fn()} />
      );
      expect(signinContainer.firstChild).toBeNull();
    });
  });

  describe('when WebAuthn is available', () => {
    beforeEach(() => {
      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: false,
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });
    });

    it('renders button in register mode', () => {
      render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/register passkey/i);
    });

    it('renders button in signin mode', () => {
      render(
        <PasskeyButton mode="signin" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/sign in with passkey/i);
    });

    it('shows passkey icon (Key or Fingerprint)', () => {
      render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      // Check that an icon element is present (lucide-react icons have an svg)
      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('can be disabled via disabled prop', () => {
      render(
        <PasskeyButton
          mode="register"
          onSuccess={vi.fn()}
          onError={vi.fn()}
          disabled
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('applies custom className', () => {
      render(
        <PasskeyButton
          mode="register"
          onSuccess={vi.fn()}
          onError={vi.fn()}
          className="custom-class"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('calls registerPasskey on register mode click', async () => {
      const mockRegister = vi.fn().mockResolvedValue({ success: true });
      const onSuccess = vi.fn();
      const onError = vi.fn();

      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: false,
        error: null,
        registerPasskey: mockRegister,
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      render(
        <PasskeyButton mode="register" onSuccess={onSuccess} onError={onError} />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockRegister).toHaveBeenCalledTimes(1);
    });

    it('calls signInWithPasskey on signin mode click', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ success: true });
      const onSuccess = vi.fn();
      const onError = vi.fn();

      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: false,
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: mockSignIn,
        preloadPasskeys: vi.fn(),
      });

      render(
        <PasskeyButton mode="signin" onSuccess={onSuccess} onError={onError} />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });

    it('calls onSuccess when registration succeeds', async () => {
      const mockRegister = vi.fn().mockResolvedValue({ success: true });
      const onSuccess = vi.fn();

      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: false,
        error: null,
        registerPasskey: mockRegister,
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      render(
        <PasskeyButton mode="register" onSuccess={onSuccess} onError={vi.fn()} />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Wait for async operation
      await vi.waitFor(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it('calls onError when registration fails', async () => {
      const mockRegister = vi
        .fn()
        .mockResolvedValue({ success: false, error: { code: 'CREDENTIAL_FAILED', message: 'Registration failed' } });
      const onError = vi.fn();

      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: false,
        error: null,
        registerPasskey: mockRegister,
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={onError} />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Wait for async operation
      await vi.waitFor(() => {
        expect(onError).toHaveBeenCalledWith('Registration failed');
      });
    });

    it('disables button when isLoading is true', () => {
      mockUsePasskeyAuth.mockReturnValue({
        isAvailable: true,
        isLoading: true,
        error: null,
        registerPasskey: vi.fn(),
        signInWithPasskey: vi.fn(),
        preloadPasskeys: vi.fn(),
      });

      render(
        <PasskeyButton mode="register" onSuccess={vi.fn()} onError={vi.fn()} />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});
