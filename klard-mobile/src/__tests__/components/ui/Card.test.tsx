/**
 * Tests for Card Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import * as Haptics from 'expo-haptics';

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render card with children', () => {
      render(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );

      expect(screen.getByText('Card Content')).toBeTruthy();
    });

    it('should render with testID', () => {
      render(
        <Card testID="card">
          <Text>Content</Text>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeTruthy();
    });

    it('should have accessibility role none by default', () => {
      render(
        <Card testID="card">
          <Text>Content</Text>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card.props.accessibilityRole).toBe('none');
    });
  });

  describe('Variants', () => {
    const variants = ['default', 'elevated', 'ghost', 'interactive'] as const;

    variants.forEach((variant) => {
      it(`should render ${variant} variant without error`, () => {
        render(
          <Card variant={variant} testID="card">
            <Text>{variant}</Text>
          </Card>
        );

        expect(screen.getByText(variant)).toBeTruthy();
      });
    });

    it('should apply default variant when none specified', () => {
      render(
        <Card testID="card">
          <Text>Default</Text>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeTruthy();
    });

    it('should apply elevated variant style with shadow', () => {
      render(
        <Card variant="elevated" testID="card">
          <Text>Elevated</Text>
        </Card>
      );

      const card = screen.getByTestId('card');
      const style = Array.isArray(card.props.style)
        ? card.props.style.flat()
        : [card.props.style];
      expect(style).toEqual(
        expect.arrayContaining([expect.objectContaining({ shadowOpacity: expect.any(Number) })])
      );
    });
  });

  describe('Padding', () => {
    const paddings = ['none', 'sm', 'md', 'lg'] as const;
    const paddingValues = { none: 0, sm: 12, md: 16, lg: 24 };

    paddings.forEach((padding) => {
      it(`should render with ${padding} padding (${paddingValues[padding]}px)`, () => {
        render(
          <Card padding={padding} testID="card">
            <Text>Content</Text>
          </Card>
        );

        const card = screen.getByTestId('card');
        const style = Array.isArray(card.props.style)
          ? card.props.style.flat()
          : [card.props.style];
        expect(style).toEqual(
          expect.arrayContaining([expect.objectContaining({ padding: paddingValues[padding] })])
        );
      });
    });
  });

  describe('Interactive Behavior', () => {
    it('should have button accessibility role when onPress is provided', () => {
      const handlePress = jest.fn();
      render(
        <Card onPress={handlePress} testID="card">
          <Text>Pressable</Text>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card.props.accessibilityRole).toBe('button');
    });

    it('should call onPress when pressed', () => {
      const handlePress = jest.fn();
      render(
        <Card onPress={handlePress} testID="card">
          <Text>Pressable</Text>
        </Card>
      );

      fireEvent.press(screen.getByTestId('card'));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('should trigger haptic feedback when pressed', async () => {
      const handlePress = jest.fn();
      render(
        <Card onPress={handlePress} testID="card">
          <Text>Pressable</Text>
        </Card>
      );

      fireEvent.press(screen.getByTestId('card'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it('should not call onPress when disabled', () => {
      const handlePress = jest.fn();
      render(
        <Card onPress={handlePress} disabled testID="card">
          <Text>Disabled</Text>
        </Card>
      );

      fireEvent.press(screen.getByTestId('card'));
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('should have disabled accessibility state when disabled', () => {
      render(
        <Card onPress={() => {}} disabled testID="card">
          <Text>Disabled</Text>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Custom Style', () => {
    it('should merge custom style with base styles', () => {
      render(
        <Card style={{ marginTop: 20 }} testID="card">
          <Text>Content</Text>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeTruthy();
    });
  });
});