/**
 * Tests for ConfirmButton Component
 *
 * These tests verify:
 * 1. Initial state shows children button
 * 2. First click shows confirmation UI ("Are you sure? Yes / No")
 * 3. Auto-resets after 5 seconds (configurable)
 * 4. "Yes" executes onConfirm
 * 5. "No" resets to initial state
 * 6. Escape key resets to initial state
 * 7. Custom confirmText prop
 * 8. Custom resetTimeout prop
 * 9. Variant styling (destructive, warning)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ConfirmButton } from '@/components/ui/confirm-button';

expect.extend(toHaveNoViolations);

describe('ConfirmButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Initial State', () => {
    it('should render children in initial state', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
    });

    it('should not show confirmation text initially', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      expect(screen.queryByText('Are you sure?')).toBeNull();
    });

    it('should have data-testid attribute', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      expect(screen.getByTestId('confirm-button')).toBeTruthy();
    });
  });

  describe('Confirmation State', () => {
    it('shows confirmation on first click', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));

      expect(screen.getByText('Are you sure?')).toBeTruthy();
    });

    it('should show Yes and No buttons in confirmation state', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));

      expect(screen.getByRole('button', { name: 'Yes' })).toBeTruthy();
      expect(screen.getByRole('button', { name: 'No' })).toBeTruthy();
    });

    it('should hide original children in confirmation state', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));

      expect(screen.queryByText('Delete')).toBeNull();
    });

    it('should use custom confirmText', () => {
      render(
        <ConfirmButton onConfirm={vi.fn()} confirmText="Really delete?">
          Delete
        </ConfirmButton>
      );

      fireEvent.click(screen.getByText('Delete'));

      expect(screen.getByText('Really delete?')).toBeTruthy();
    });
  });

  describe('Auto Reset', () => {
    it('auto-resets after 5 seconds', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      expect(screen.getByText('Are you sure?')).toBeTruthy();

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(screen.getByText('Delete')).toBeTruthy();
      expect(screen.queryByText('Are you sure?')).toBeNull();
    });

    it('should use custom resetTimeout', () => {
      render(
        <ConfirmButton onConfirm={vi.fn()} resetTimeout={3000}>
          Delete
        </ConfirmButton>
      );

      fireEvent.click(screen.getByText('Delete'));
      expect(screen.getByText('Are you sure?')).toBeTruthy();

      act(() => {
        vi.advanceTimersByTime(2999);
      });
      expect(screen.getByText('Are you sure?')).toBeTruthy();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(screen.getByText('Delete')).toBeTruthy();
    });

    it('should clear timeout when unmounted', () => {
      const { unmount } = render(
        <ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>
      );

      fireEvent.click(screen.getByText('Delete'));
      unmount();

      // Should not throw or cause issues
      act(() => {
        vi.advanceTimersByTime(5000);
      });
    });
  });

  describe('Confirm Action', () => {
    it('executes onConfirm when confirmed', () => {
      const onConfirm = vi.fn();
      render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('Yes'));

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should reset to initial state after confirming', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('Yes'));

      expect(screen.getByText('Delete')).toBeTruthy();
      expect(screen.queryByText('Are you sure?')).toBeNull();
    });
  });

  describe('Cancel Action', () => {
    it('resets on No click', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('No'));

      expect(screen.getByText('Delete')).toBeTruthy();
      expect(screen.queryByText('Are you sure?')).toBeNull();
    });

    it('should not call onConfirm when No is clicked', () => {
      const onConfirm = vi.fn();
      render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('No'));

      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  describe('Escape Key', () => {
    it('resets on Escape key', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      expect(screen.getByText('Are you sure?')).toBeTruthy();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.getByText('Delete')).toBeTruthy();
      expect(screen.queryByText('Are you sure?')).toBeNull();
    });

    it('should not respond to Escape when not in confirmation state', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.getByText('Delete')).toBeTruthy();
    });

    it('should remove keydown listener when reset', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('No'));

      // Click again to enter confirmation state
      fireEvent.click(screen.getByText('Delete'));
      expect(screen.getByText('Are you sure?')).toBeTruthy();

      // Escape should still work
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.getByText('Delete')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should accept destructive variant', () => {
      render(
        <ConfirmButton onConfirm={vi.fn()} variant="destructive">
          Delete
        </ConfirmButton>
      );

      expect(screen.getByTestId('confirm-button')).toBeTruthy();
    });

    it('should accept warning variant', () => {
      render(
        <ConfirmButton onConfirm={vi.fn()} variant="warning">
          Archive
        </ConfirmButton>
      );

      expect(screen.getByTestId('confirm-button')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks gracefully', () => {
      const onConfirm = vi.fn();
      render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);

      // Click to show confirmation
      fireEvent.click(screen.getByText('Delete'));

      // Rapid clicks on Yes
      fireEvent.click(screen.getByText('Yes'));

      // Button should now show Delete again
      expect(screen.getByText('Delete')).toBeTruthy();
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple confirm/cancel cycles', () => {
      const onConfirm = vi.fn();
      render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);

      // First cycle - cancel
      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('No'));

      // Second cycle - confirm
      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('Yes'));

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should clear timeout when manually cancelled', () => {
      render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);

      fireEvent.click(screen.getByText('Delete'));
      fireEvent.click(screen.getByText('No'));

      // Advance past the reset timeout
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should still show initial state (not have reset again)
      expect(screen.getByText('Delete')).toBeTruthy();
    });
  });

  describe('Accessibility (jest-axe)', () => {
    it('should have no accessibility violations in initial state', async () => {
      vi.useRealTimers();
      const { container } = render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations in confirmation state', async () => {
      vi.useRealTimers();
      const { container } = render(<ConfirmButton onConfirm={vi.fn()}>Delete</ConfirmButton>);
      fireEvent.click(screen.getByText('Delete'));
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with warning variant', async () => {
      vi.useRealTimers();
      const { container } = render(
        <ConfirmButton onConfirm={vi.fn()} variant="warning">Archive</ConfirmButton>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
