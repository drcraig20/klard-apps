import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Button } from '@/components/ui/Button';

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

// Mock useThemeColors hook to provide theme context
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    primaryForeground: '#FFFFFF',
    secondary: '#15B5B0',
    secondaryForeground: '#FFFFFF',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    textSecondary: '#475569',
    foreground: '#0F172A',
    background: '#FFFFFF',
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',
    border: 'rgba(148, 163, 184, 0.2)',
    isDark: false,
  }),
}));

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with children text', () => {
      const { getByText } = render(
        <Button onPress={mockOnPress}>Press Me</Button>
      );

      expect(getByText('Press Me')).toBeTruthy();
    });

    it('should render with default variant (primary)', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>Primary Button</Button>
      );

      const button = getByRole('button');
      expect(button).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>Accessible Button</Button>
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('should render with icon on the left by default', () => {
      const testIcon = <Text testID="test-icon">Icon</Text>;
      const { getByTestId, getByText } = render(
        <Button onPress={mockOnPress} icon={testIcon}>
          With Icon
        </Button>
      );

      expect(getByTestId('test-icon')).toBeTruthy();
      expect(getByText('With Icon')).toBeTruthy();
    });

    it('should render with icon on the right when iconPosition is right', () => {
      const testIcon = <Text testID="test-icon">Icon</Text>;
      const { getByTestId, getByText } = render(
        <Button onPress={mockOnPress} icon={testIcon} iconPosition="right">
          With Right Icon
        </Button>
      );

      expect(getByTestId('test-icon')).toBeTruthy();
      expect(getByText('With Right Icon')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;

    variants.forEach((variant) => {
      it(`should render ${variant} variant without error`, () => {
        const { getByText } = render(
          <Button variant={variant} onPress={mockOnPress}>
            {variant} Button
          </Button>
        );

        expect(getByText(`${variant} Button`)).toBeTruthy();
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`should render ${size} size without error`, () => {
        const { getByText } = render(
          <Button size={size} onPress={mockOnPress}>
            {size} Button
          </Button>
        );

        expect(getByText(`${size} Button`)).toBeTruthy();
      });
    });
  });

  describe('Press Handling', () => {
    it('should call onPress when pressed', async () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>Press Me</Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger haptic feedback when pressed', async () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>Haptic Button</Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it('should not call onPress when disabled', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} disabled>
          Disabled Button
        </Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should not trigger haptic feedback when disabled', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} disabled>
          Disabled Button
        </Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show ActivityIndicator when loading', () => {
      const { UNSAFE_getByType } = render(
        <Button onPress={mockOnPress} loading>
          Loading Button
        </Button>
      );

      // ActivityIndicator should be present
      const { ActivityIndicator } = require('react-native');
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('should hide children text when loading', () => {
      const { queryByText } = render(
        <Button onPress={mockOnPress} loading>
          Hidden Text
        </Button>
      );

      expect(queryByText('Hidden Text')).toBeNull();
    });

    it('should not call onPress when loading', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} loading>
          Loading Button
        </Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should not trigger haptic feedback when loading', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} loading>
          Loading Button
        </Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });

    it('should hide icon when loading', () => {
      const testIcon = <Text testID="test-icon">Icon</Text>;
      const { queryByTestId } = render(
        <Button onPress={mockOnPress} loading icon={testIcon}>
          Loading
        </Button>
      );

      expect(queryByTestId('test-icon')).toBeNull();
    });
  });

  describe('Full Width', () => {
    it('should render with fullWidth style when fullWidth is true', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} fullWidth>
          Full Width Button
        </Button>
      );

      const button = getByRole('button');
      expect(button).toBeTruthy();
      // Style verification would need snapshot or style checking
    });
  });

  describe('Accessibility', () => {
    it('should have disabled accessibility state when disabled', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} disabled>
          Disabled Button
        </Button>
      );

      const button = getByRole('button');
      expect(button.props.accessibilityState).toEqual({ disabled: true });
    });

    it('should have disabled accessibility state when loading', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress} loading>
          Loading Button
        </Button>
      );

      const button = getByRole('button');
      expect(button.props.accessibilityState).toEqual({ disabled: true });
    });

    it('should not have disabled accessibility state when enabled', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>
          Enabled Button
        </Button>
      );

      const button = getByRole('button');
      expect(button.props.accessibilityState).toEqual({ disabled: false });
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined onPress gracefully', async () => {
      const { getByRole } = render(
        <Button>No onPress</Button>
      );

      const button = getByRole('button');

      // Should not throw when pressed without onPress handler
      expect(() => fireEvent.press(button)).not.toThrow();
    });

    it('should handle empty children', () => {
      const { getByRole } = render(
        <Button onPress={mockOnPress}>{''}</Button>
      );

      expect(getByRole('button')).toBeTruthy();
    });

    it('should handle both disabled and loading simultaneously', () => {
      const { getByRole, UNSAFE_getByType } = render(
        <Button onPress={mockOnPress} disabled loading>
          Both States
        </Button>
      );

      const button = getByRole('button');
      fireEvent.press(button);

      expect(mockOnPress).not.toHaveBeenCalled();

      const { ActivityIndicator } = require('react-native');
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('should apply custom style prop', () => {
      const customStyle = { marginTop: 20 };
      const { getByRole } = render(
        <Button onPress={mockOnPress} style={customStyle}>
          Styled Button
        </Button>
      );

      const button = getByRole('button');
      expect(button).toBeTruthy();
    });
  });
});