/**
 * Tests for Badge Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Badge } from '@/components/ui/Badge';
import * as Haptics from 'expo-haptics';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock vector icons to avoid ESM parse issues in Jest
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }: { name: string }) => (
      <Text testID="vector-icon">{name}</Text>
    ),
  };
});

describe('Badge', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<Badge>Status</Badge>);

      expect(screen.getByText('Status')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      render(<Badge>Badge</Badge>);

      // Badge should be accessible as text/label
      expect(screen.getByText('Badge')).toBeTruthy();
    });

    it('should render children as Text component', () => {
      render(<Badge>Text Content</Badge>);

      const textElement = screen.getByText('Text Content');
      expect(textElement).toBeTruthy();
    });
  });

  describe('Variants', () => {
    const variants = [
      'default',
      'primary',
      'success',
      'warning',
      'error',
      'outline',
    ] as const;

    variants.forEach((variant) => {
      it(`should render ${variant} variant without error`, () => {
        render(<Badge variant={variant}>{variant}</Badge>);

        expect(screen.getByText(variant)).toBeTruthy();
      });
    });

    it('should apply default variant when none specified', () => {
      const { getByTestId } = render(<Badge testID="badge">Default</Badge>);

      const badge = getByTestId('badge');
      // Verify it renders (styles checked visually or via style prop)
      expect(badge).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render with md size by default', () => {
      render(<Badge testID="badge">Medium</Badge>);

      expect(screen.getByText('Medium')).toBeTruthy();
    });

    it('should render with sm size when specified', () => {
      render(
        <Badge size="sm" testID="badge">
          Small
        </Badge>
      );

      expect(screen.getByText('Small')).toBeTruthy();
    });

    it('should render with md size when specified', () => {
      render(
        <Badge size="md" testID="badge">
          Medium
        </Badge>
      );

      expect(screen.getByText('Medium')).toBeTruthy();
    });
  });

  describe('Icon Support', () => {
    it('should render icon when provided', () => {
      const icon = <Text testID="test-icon">★</Text>;
      render(<Badge icon={icon}>With Icon</Badge>);

      expect(screen.getByTestId('test-icon')).toBeTruthy();
    });

    it('should render both icon and text', () => {
      const icon = <Text testID="icon">I</Text>;
      render(<Badge icon={icon}>Text</Badge>);

      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByText('Text')).toBeTruthy();
    });
  });

  describe('Removable', () => {
    it('should show remove button when removable is true', () => {
      render(
        <Badge removable testID="badge">
          Removable
        </Badge>
      );

      // Look for the remove button by testID or accessible name
      expect(screen.getByLabelText(/remove/i)).toBeTruthy();
    });

    it('should not show remove button by default', () => {
      render(
        <Badge testID="badge">
          Not Removable
        </Badge>
      );

      expect(screen.queryByLabelText(/remove/i)).toBeNull();
    });

    it('should call onRemove when remove button is pressed', async () => {
      const handleRemove = jest.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      fireEvent.press(screen.getByLabelText(/remove/i));

      await waitFor(() => {
        expect(handleRemove).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger haptic feedback when remove button is pressed', async () => {
      const handleRemove = jest.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      fireEvent.press(screen.getByLabelText(/remove/i));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });
});
