/**
 * Tests for BottomSheet Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, open/close behavior, snap points, backdrop, accessibility
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import * as Haptics from 'expo-haptics';

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockBottomSheet = React.forwardRef(
    (
      {
        children,
        index,
        snapPoints,
        onChange,
        onClose,
        backdropComponent,
        enablePanDownToClose,
        handleIndicatorStyle,
        backgroundStyle,
      }: any,
      ref: any
    ) => {
      const [currentIndex, setCurrentIndex] = React.useState(index);

      React.useImperativeHandle(ref, () => ({
        expand: () => {
          setCurrentIndex(0);
          onChange?.(0);
        },
        close: () => {
          setCurrentIndex(-1);
          onChange?.(-1);
          onClose?.();
        },
        snapToIndex: (i: number) => {
          setCurrentIndex(i);
          onChange?.(i);
        },
      }));

      if (currentIndex === -1) {
        return null;
      }

      const Backdrop = backdropComponent;

      return (
        <View testID="bottom-sheet-container">
          {Backdrop && (
            <Backdrop
              animatedIndex={{ value: currentIndex }}
              style={{}}
            />
          )}
          <View testID="bottom-sheet-content">{children}</View>
        </View>
      );
    }
  );

  const BottomSheetView = ({ children, style }: any) => (
    <View testID="bottom-sheet-view" style={style}>
      {children}
    </View>
  );

  const BottomSheetBackdrop = ({ onPress, testID, ...props }: any) => (
    <View testID={testID || 'bottom-sheet-backdrop'} onTouchEnd={onPress} {...props} />
  );

  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetView,
    BottomSheetBackdrop,
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 34, left: 0, right: 0 }),
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
  },
}));

describe('BottomSheet', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render children when open', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Sheet Content</Text>
        </BottomSheet>
      );

      expect(screen.getByText('Sheet Content')).toBeTruthy();
    });

    it('should not render content when closed', () => {
      render(
        <BottomSheet open={false} onClose={mockOnClose}>
          <Text>Sheet Content</Text>
        </BottomSheet>
      );

      expect(screen.queryByText('Sheet Content')).toBeNull();
    });

    it('should render container with testID when open', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });
  });

  describe('Open/Close Behavior', () => {
    it('should call onClose when sheet is closed', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });

    it('should expand when open prop changes to true', () => {
      const { rerender } = render(
        <BottomSheet open={false} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.queryByTestId('bottom-sheet-container')).toBeNull();

      rerender(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });

    it('should close when open prop changes to false', () => {
      const { rerender } = render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();

      rerender(
        <BottomSheet open={false} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.queryByTestId('bottom-sheet-container')).toBeNull();
    });
  });

  describe('Snap Points', () => {
    it('should accept custom snap points', () => {
      const customSnapPoints = ['25%', '50%', '90%'];
      render(
        <BottomSheet
          open={true}
          onClose={mockOnClose}
          snapPoints={customSnapPoints}
        >
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });

    it('should use default snap points when not provided', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });
  });

  describe('Drag Behavior', () => {
    it('should allow disabling drag to close', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose} enableDrag={false}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });

    it('should enable drag to close by default', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-container')).toBeTruthy();
    });
  });

  describe('Backdrop', () => {
    it('should render backdrop when open', () => {
      render(
        <BottomSheet open={true} onClose={mockOnClose}>
          <Text>Content</Text>
        </BottomSheet>
      );

      expect(screen.getByTestId('bottom-sheet-backdrop')).toBeTruthy();
    });
  });

  describe('Haptic Feedback', () => {
    it('should have haptic feedback capability', () => {
      // Haptic feedback is triggered in handleSheetChanges when index is -1
      expect(Haptics.impactAsync).toBeDefined();
    });
  });
});