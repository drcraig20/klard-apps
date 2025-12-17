/**
 * Tests for NetworkErrorSheet Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { NetworkErrorSheet } from '@/components/auth/network-error-sheet';

// Mock expo-haptics to return promises
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
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

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    default: React.forwardRef(({ children, index, onChange }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        expand: jest.fn(),
        close: jest.fn(),
      }));

      // Simulate sheet being open when index >= 0
      if (index >= 0) {
        return <View testID="bottom-sheet">{children}</View>;
      }
      return null;
    }),
    BottomSheetView: ({ children }: any) => <View testID="bottom-sheet-view">{children}</View>,
    BottomSheetBackdrop: ({ testID }: any) => <View testID={testID || 'bottom-sheet-backdrop'} />,
  };
});

// Mock BottomSheet component
jest.mock('@/components/ui/BottomSheet', () => ({
  BottomSheet: ({ open, onClose, children }: any) => {
    const { View, Pressable } = require('react-native');

    if (!open) return null;

    return (
      <View testID="bottom-sheet-wrapper">
        <Pressable testID="backdrop" onPress={onClose} />
        <View testID="bottom-sheet-content">{children}</View>
      </View>
    );
  },
}));

describe('NetworkErrorSheet', () => {
  const mockOnClose = jest.fn();
  const mockOnRetry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render when open is true', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error occurred' }}
        />
      );

      expect(screen.getByTestId('bottom-sheet-wrapper')).toBeTruthy();
    });

    it('should not render when open is false', () => {
      render(
        <NetworkErrorSheet
          open={false}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error occurred' }}
        />
      );

      expect(screen.queryByTestId('bottom-sheet-wrapper')).toBeNull();
    });

    it('should display the error message', () => {
      const errorMessage = 'Unable to connect to the server';

      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: errorMessage }}
        />
      );

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });

    it('should display a title', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      expect(screen.getByText('Connection Error')).toBeTruthy();
    });

    it('should render a "Try again" button', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      expect(screen.getByText('Try again')).toBeTruthy();
    });
  });

  describe('Error Code Display', () => {
    it('should not display error code when not provided', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      expect(screen.queryByText(/Error code:/)).toBeNull();
    });

    it('should display error code when provided', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error', code: 'ERR_NETWORK_TIMEOUT' }}
        />
      );

      expect(screen.getByText(/Error code: ERR_NETWORK_TIMEOUT/)).toBeTruthy();
    });
  });

  describe('User Interactions', () => {
    it('should call onRetry when "Try again" button is pressed', async () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      const retryButton = screen.getByRole('button');
      fireEvent.press(retryButton);

      await waitFor(() => {
        expect(mockOnRetry).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onClose when backdrop is pressed', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      const backdrop = screen.getByTestId('backdrop');
      fireEvent.press(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility role for retry button', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: 'Network error' }}
        />
      );

      const retryButton = screen.getByRole('button');
      expect(retryButton).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long error messages', () => {
      const longMessage = 'This is a very long error message that should still be displayed properly without breaking the layout or causing any rendering issues in the component';

      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: longMessage }}
        />
      );

      expect(screen.getByText(longMessage)).toBeTruthy();
    });

    it('should handle empty error message gracefully', () => {
      render(
        <NetworkErrorSheet
          open={true}
          onClose={mockOnClose}
          onRetry={mockOnRetry}
          error={{ message: '' }}
        />
      );

      // Should still render the component
      expect(screen.getByTestId('bottom-sheet-wrapper')).toBeTruthy();
      expect(screen.getByText('Try again')).toBeTruthy();
    });
  });
});
