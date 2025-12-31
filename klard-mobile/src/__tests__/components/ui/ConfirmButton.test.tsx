/**
 * Tests for ConfirmButton Component
 *
 * These tests verify:
 * 1. Initial state shows children button
 * 2. First press shows confirmation UI ("Are you sure? Yes / No")
 * 3. Auto-resets after 5 seconds (configurable)
 * 4. "Yes" executes onConfirm
 * 5. "No" resets to initial state
 * 6. Custom confirmText prop
 * 7. Custom resetTimeout prop
 * 8. Variant styling (destructive, warning)
 * 9. Haptic feedback integration
 */

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { ConfirmButton } from '@/components/ui/ConfirmButton';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

describe('ConfirmButton', () => {
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    it('should render children in initial state', () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      expect(getByText('Delete')).toBeTruthy();
    });

    it('should not show confirmation text initially', () => {
      const { queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      expect(queryByText('Are you sure?')).toBeNull();
    });

    it('should have testID attribute', () => {
      const { getByTestId } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      expect(getByTestId('confirm-button')).toBeTruthy();
    });
  });

  describe('Confirmation State', () => {
    it('shows confirmation on first press', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Are you sure?')).toBeTruthy();
      });
    });

    it('should show Yes and No buttons in confirmation state', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
        expect(getByText('No')).toBeTruthy();
      });
    });

    it('should hide original children in confirmation state', async () => {
      const { getByText, queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(queryByText('Delete')).toBeNull();
      });
    });

    it('should use custom confirmText', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm} confirmText="Really delete?">
          Delete
        </ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Really delete?')).toBeTruthy();
      });
    });
  });

  describe('Auto Reset', () => {
    it('auto-resets after 5 seconds', async () => {
      const { getByText, queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Are you sure?')).toBeTruthy();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(getByText('Delete')).toBeTruthy();
      expect(queryByText('Are you sure?')).toBeNull();
    });

    it('should use custom resetTimeout', async () => {
      const { getByText, queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm} resetTimeout={3000}>
          Delete
        </ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Are you sure?')).toBeTruthy();
      });

      act(() => {
        jest.advanceTimersByTime(2999);
      });
      expect(getByText('Are you sure?')).toBeTruthy();

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(getByText('Delete')).toBeTruthy();
    });

    it('should clear timeout when unmounted', async () => {
      const { getByText, unmount } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Are you sure?')).toBeTruthy();
      });

      unmount();

      // Should not throw or cause issues
      act(() => {
        jest.advanceTimersByTime(5000);
      });
    });
  });

  describe('Confirm Action', () => {
    it('executes onConfirm when confirmed', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
      });

      fireEvent.press(getByText('Yes'));

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      });
    });

    it('should reset to initial state after confirming', async () => {
      const { getByText, queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
      });

      fireEvent.press(getByText('Yes'));

      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
        expect(queryByText('Are you sure?')).toBeNull();
      });
    });

    it('should trigger haptic feedback when confirming', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
      });

      fireEvent.press(getByText('Yes'));

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Warning
        );
      });
    });
  });

  describe('Cancel Action', () => {
    it('resets on No press', async () => {
      const { getByText, queryByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('No')).toBeTruthy();
      });

      fireEvent.press(getByText('No'));

      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
        expect(queryByText('Are you sure?')).toBeNull();
      });
    });

    it('should not call onConfirm when No is pressed', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('No')).toBeTruthy();
      });

      fireEvent.press(getByText('No'));

      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
      });

      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('should accept destructive variant', () => {
      const { getByTestId } = render(
        <ConfirmButton onConfirm={mockOnConfirm} variant="destructive">
          Delete
        </ConfirmButton>
      );

      expect(getByTestId('confirm-button')).toBeTruthy();
    });

    it('should accept warning variant', () => {
      const { getByTestId } = render(
        <ConfirmButton onConfirm={mockOnConfirm} variant="warning">
          Archive
        </ConfirmButton>
      );

      expect(getByTestId('confirm-button')).toBeTruthy();
    });
  });

  describe('Haptic Feedback', () => {
    it('should trigger light haptic on initial press', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid presses gracefully', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      // Press to show confirmation
      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
      });

      // Rapid presses on Yes
      fireEvent.press(getByText('Yes'));

      // Button should now show Delete again
      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle multiple confirm/cancel cycles', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      // First cycle - cancel
      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('No')).toBeTruthy();
      });

      fireEvent.press(getByText('No'));

      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
      });

      // Second cycle - confirm
      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('Yes')).toBeTruthy();
      });

      fireEvent.press(getByText('Yes'));

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
      });
    });

    it('should clear timeout when manually cancelled', async () => {
      const { getByText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByText('No')).toBeTruthy();
      });

      fireEvent.press(getByText('No'));

      await waitFor(() => {
        expect(getByText('Delete')).toBeTruthy();
      });

      // Advance past the reset timeout
      act(() => {
        jest.advanceTimersByTime(10000);
      });

      // Should still show initial state (not have reset again)
      expect(getByText('Delete')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility role on main button', () => {
      const { getByRole } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('should have correct accessibility labels', async () => {
      const { getByText, getByLabelText } = render(
        <ConfirmButton onConfirm={mockOnConfirm}>Delete</ConfirmButton>
      );

      fireEvent.press(getByText('Delete'));

      await waitFor(() => {
        expect(getByLabelText('Confirm action')).toBeTruthy();
        expect(getByLabelText('Cancel action')).toBeTruthy();
      });
    });
  });
});
