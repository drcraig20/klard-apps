/**
 * Tests for SocialButtons Component
 *
 * These tests verify:
 * 1. Renders all configured providers
 * 2. Handles loading state per provider
 * 3. Calls signIn.social with correct provider
 * 4. Error handling and onError callback
 * 5. Success callback invocation
 * 6. Disabled state propagation
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocialButtons } from '@/components/auth/social-buttons';

// Mock the auth client
vi.mock('@/lib/auth-client', () => ({
  signIn: {
    social: vi.fn(),
  },
}));

// Mock the icons
vi.mock('@/components/ui/icons', () => ({
  GoogleIcon: () => <span data-testid="google-icon">G</span>,
  AppleIcon: () => <span data-testid="apple-icon">A</span>,
}));

import { signIn } from '@/lib/auth-client';

describe('SocialButtons', () => {
  const mockOnError = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render Google provider button', () => {
      render(<SocialButtons />);

      expect(screen.getByText('Google')).toBeTruthy();
    });

    it('should render Apple provider button', () => {
      render(<SocialButtons />);

      expect(screen.getByText('Apple')).toBeTruthy();
    });

    it('should render provider icons', () => {
      render(<SocialButtons />);

      expect(screen.getByTestId('google-icon')).toBeTruthy();
      expect(screen.getByTestId('apple-icon')).toBeTruthy();
    });

    it('should render buttons in a flex container with gap', () => {
      const { container } = render(<SocialButtons />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('flex');
      expect(wrapper.className).toContain('gap-4');
    });
  });

  describe('Authentication Flow', () => {
    it('should call signIn.social with google provider when Google clicked', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

      render(<SocialButtons />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        expect(signIn.social).toHaveBeenCalledWith({ provider: 'google' });
      });
    });

    it('should call signIn.social with apple provider when Apple clicked', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

      render(<SocialButtons />);

      fireEvent.click(screen.getByText('Apple'));

      await waitFor(() => {
        expect(signIn.social).toHaveBeenCalledWith({ provider: 'apple' });
      });
    });

    it('should call onSuccess when authentication succeeds', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

      render(<SocialButtons onSuccess={mockOnSuccess} />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading on clicked provider only', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      (signIn.social as ReturnType<typeof vi.fn>).mockReturnValueOnce(promise);

      render(<SocialButtons />);

      fireEvent.click(screen.getByText('Google'));

      // Google button should be loading
      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled(); // Google
      });

      // Resolve to clean up
      resolvePromise!();
    });

    it('should disable all buttons while one is loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      (signIn.social as ReturnType<typeof vi.fn>).mockReturnValueOnce(promise);

      render(<SocialButtons />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).toBeDisabled();
        });
      });

      resolvePromise!();
    });

    it('should re-enable buttons after authentication completes', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

      render(<SocialButtons />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).not.toBeDisabled();
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('should call onError when authentication fails', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Auth failed')
      );

      render(<SocialButtons onError={mockOnError} />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith(
          'Failed to sign in with google. Please try again.'
        );
      });
    });

    it('should re-enable buttons after error', async () => {
      (signIn.social as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Auth failed')
      );

      render(<SocialButtons onError={mockOnError} />);

      fireEvent.click(screen.getByText('Google'));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).not.toBeDisabled();
        });
      });
    });
  });

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      render(<SocialButtons disabled />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('should not call signIn.social when disabled', () => {
      render(<SocialButtons disabled />);

      fireEvent.click(screen.getByText('Google'));

      expect(signIn.social).not.toHaveBeenCalled();
    });
  });
});