/**
 * Tests for EmptyState Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '@/components/ui/EmptyState';

// Mock expo-image
jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Image: ({ testID, accessibilityLabel }: { testID?: string; accessibilityLabel?: string }) => (
      <View testID={testID || 'expo-image'} accessibilityLabel={accessibilityLabel} />
    ),
  };
});

// Mock Button component
jest.mock('@/components/ui/Button', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');
  return {
    Button: ({
      children,
      onPress,
      testID,
    }: {
      children: React.ReactNode;
      onPress?: () => void;
      testID?: string;
    }) => (
      <Pressable onPress={onPress} testID={testID} accessibilityRole="button">
        <Text>{children}</Text>
      </Pressable>
    ),
  };
});

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('should render with title', () => {
      render(<EmptyState title="No subscriptions yet" />);

      expect(screen.getByText('No subscriptions yet')).toBeTruthy();
    });

    it('should render with title and description', () => {
      render(
        <EmptyState
          title="No subscriptions"
          description="Add your first subscription to start tracking."
        />
      );

      expect(screen.getByText('No subscriptions')).toBeTruthy();
      expect(
        screen.getByText('Add your first subscription to start tracking.')
      ).toBeTruthy();
    });

    it('should render with testID', () => {
      render(<EmptyState title="Empty" testID="empty-state" />);

      expect(screen.getByTestId('empty-state')).toBeTruthy();
    });
  });

  describe('Illustration', () => {
    it('should render illustration when provided', () => {
      render(
        <EmptyState
          title="No data"
          illustration="subscriptions"
        />
      );

      expect(screen.getByTestId('empty-state-illustration')).toBeTruthy();
    });

    it('should not render illustration container when not provided', () => {
      render(<EmptyState title="No data" />);

      expect(screen.queryByTestId('empty-state-illustration')).toBeNull();
    });
  });

  describe('Actions', () => {
    it('should render primary action when provided', () => {
      const handlePress = jest.fn();
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add Item',
            onPress: handlePress,
          }}
        />
      );

      const button = screen.getByText('Add Item');
      expect(button).toBeTruthy();
    });

    it('should call onPress when primary action is pressed', () => {
      const handlePress = jest.fn();
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Add Item',
            onPress: handlePress,
          }}
        />
      );

      fireEvent.press(screen.getByText('Add Item'));

      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('should render secondary action when provided', () => {
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Primary',
            onPress: () => {},
          }}
          secondaryAction={{
            label: 'Secondary',
            onPress: () => {},
          }}
        />
      );

      expect(screen.getByText('Primary')).toBeTruthy();
      expect(screen.getByText('Secondary')).toBeTruthy();
    });

    it('should call onPress when secondary action is pressed', () => {
      const handlePrimary = jest.fn();
      const handleSecondary = jest.fn();
      render(
        <EmptyState
          title="No items"
          primaryAction={{
            label: 'Primary',
            onPress: handlePrimary,
          }}
          secondaryAction={{
            label: 'Secondary',
            onPress: handleSecondary,
          }}
        />
      );

      fireEvent.press(screen.getByText('Secondary'));

      expect(handleSecondary).toHaveBeenCalledTimes(1);
      expect(handlePrimary).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible title', () => {
      render(<EmptyState title="No subscriptions" />);

      expect(screen.getByText('No subscriptions')).toBeTruthy();
    });

    it('should pass accessibilityLabel to illustration', () => {
      render(
        <EmptyState
          title="No data"
          illustration="subscriptions"
          illustrationAccessibilityLabel="Empty subscriptions illustration"
        />
      );

      expect(screen.getByLabelText('Empty subscriptions illustration')).toBeTruthy();
    });
  });
});
