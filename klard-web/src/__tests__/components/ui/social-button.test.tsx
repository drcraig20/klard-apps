/**
 * Tests for SocialButton Component
 *
 * These tests verify:
 * 1. Renders provider name and icon
 * 2. Loading state shows spinner
 * 3. Disabled state prevents interaction
 * 4. Click handler is called
 * 5. Accessibility attributes
 * 6. Edge cases (disabled+loading, empty provider)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SocialButton } from '@/components/ui/social-button';

describe('SocialButton', () => {
  const mockOnClick = vi.fn();
  const mockIcon = <span data-testid="mock-icon">Icon</span>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render provider name', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      expect(screen.getByText('Google')).toBeTruthy();
    });

    it('should render icon', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      expect(screen.getByTestId('mock-icon')).toBeTruthy();
    });

    it('should be a button element', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should have type="button" to prevent form submission', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should have data-slot for traceability', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'social-button');
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          isLoading
        />
      );

      // Spinner renders with role="status"
      expect(screen.getByRole('status')).toBeTruthy();
    });

    it('should hide icon when loading', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          isLoading
        />
      );

      expect(screen.queryByTestId('mock-icon')).toBeNull();
    });

    it('should be disabled when loading', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          isLoading
        />
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          disabled
        />
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should have reduced opacity when disabled', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          disabled
        />
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('disabled:opacity-50');
    });

    it('should not call onClick when disabled', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          disabled
        />
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Click Handling', () => {
    it('should call onClick when clicked', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when loading', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          isLoading
        />
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should apply outline button styling', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('border');
    });

    it('should apply flex-1 for equal width distribution', () => {
      render(
        <SocialButton provider="Google" icon={mockIcon} onClick={mockOnClick} />
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('flex-1');
    });

    it('should merge custom className', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          className="custom-class"
        />
      );

      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('should handle both disabled and loading simultaneously', () => {
      render(
        <SocialButton
          provider="Google"
          icon={mockIcon}
          onClick={mockOnClick}
          disabled
          isLoading
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should render with empty provider name', () => {
      render(
        <SocialButton provider="" icon={mockIcon} onClick={mockOnClick} />
      );

      expect(screen.getByRole('button')).toBeTruthy();
    });
  });
});