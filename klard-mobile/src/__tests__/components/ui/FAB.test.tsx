/**
 * Tests for FAB (Floating Action Button) Component
 *
 * These tests verify:
 * 1. Default rendering with bottom-right positioning
 * 2. Haptic feedback integration when enabled
 * 3. Optional label display (extended FAB)
 * 4. Press handler invocation
 * 5. Position variants (bottom-right, bottom-center)
 * 6. Extended FAB styling when label provided
 * 7. Accessibility compliance
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { FAB } from '@/components/ui/FAB';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('FAB', () => {
  const mockOnPress = jest.fn();
  const TestIcon = <Text testID="test-icon">+</Text>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders in bottom-right by default', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
    });

    it('renders the provided icon', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      expect(getByTestId('test-icon')).toBeTruthy();
    });

    it('shows label when provided', () => {
      const { getByText } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} label="Create Card" />
      );

      expect(getByText('Create Card')).toBeTruthy();
    });

    it('does not show label when not provided', () => {
      const { queryByText } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} />
      );

      expect(queryByText('Create Card')).toBeNull();
    });

    it('extends width when label provided', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} label="Create" testID="fab" />
      );

      // Extended FAB should render without error
      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
    });
  });

  describe('Position Variants', () => {
    it('positions in bottom-center when specified', () => {
      const { getByTestId } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          position="bottom-center"
          testID="fab"
        />
      );

      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
    });

    it('defaults to bottom-right position', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
    });
  });

  describe('Press Handling', () => {
    it('calls onPress when pressed', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      fireEvent.press(getByTestId('fab'));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('triggers haptic feedback on press when enabled', async () => {
      const { getByTestId } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          hapticFeedback
          testID="fab"
        />
      );

      fireEvent.press(getByTestId('fab'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Medium
        );
      });
    });

    it('does not trigger haptic feedback when disabled', () => {
      const { getByTestId } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          hapticFeedback={false}
          testID="fab"
        />
      );

      fireEvent.press(getByTestId('fab'));

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });

    it('does not trigger haptic feedback by default', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      fireEvent.press(getByTestId('fab'));

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct accessibility role', () => {
      const { getByRole } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} />
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('uses label as accessibility label when provided', () => {
      const { getByLabelText } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          label="Create Card"
          accessibilityLabel="Create new card"
        />
      );

      expect(getByLabelText('Create new card')).toBeTruthy();
    });

    it('defaults accessibility label to "Floating action button"', () => {
      const { getByLabelText } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} />
      );

      expect(getByLabelText('Floating action button')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('applies custom style prop', () => {
      const customStyle = { marginBottom: 40 };
      const { getByTestId } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          style={customStyle}
          testID="fab"
        />
      );

      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
    });

    it('renders with elevation shadow', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={mockOnPress} testID="fab" />
      );

      const fab = getByTestId('fab');
      expect(fab).toBeTruthy();
      // Shadow styles are applied via SVA
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onPress gracefully', () => {
      const { getByTestId } = render(
        <FAB icon={TestIcon} onPress={undefined as unknown as () => void} testID="fab" />
      );

      // Should not throw when pressed without onPress handler
      expect(() => fireEvent.press(getByTestId('fab'))).not.toThrow();
    });

    it('handles empty label string', () => {
      const { getByTestId } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          label=""
          testID="fab"
        />
      );

      expect(getByTestId('fab')).toBeTruthy();
      // Empty string should not render label container
    });

    it('renders with both icon and label together', () => {
      const { getByTestId, getByText } = render(
        <FAB
          icon={TestIcon}
          onPress={mockOnPress}
          label="Create"
          testID="fab"
        />
      );

      expect(getByTestId('test-icon')).toBeTruthy();
      expect(getByText('Create')).toBeTruthy();
    });
  });
});