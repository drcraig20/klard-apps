/**
 * Tests for AlertBanner Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AlertBanner } from '@/components/ui/AlertBanner';
import * as Haptics from 'expo-haptics';

// Mock vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }: { name: string }) => (
      <Text testID="vector-icon">{name}</Text>
    ),
  };
});

describe('AlertBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<AlertBanner type="info">Test message</AlertBanner>);

      expect(screen.getByText('Test message')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      render(
        <AlertBanner type="info" testID="alert">
          Message
        </AlertBanner>
      );

      const alert = screen.getByTestId('alert');
      expect(alert.props.accessibilityRole).toBe('alert');
    });

    it('should render title when provided', () => {
      render(
        <AlertBanner type="info" title="Alert Title">
          Message
        </AlertBanner>
      );

      expect(screen.getByText('Alert Title')).toBeTruthy();
    });
  });

  describe('Type Variants', () => {
    const types = ['success', 'error', 'warning', 'info'] as const;

    types.forEach((type) => {
      it(`should render ${type} variant without error`, () => {
        render(<AlertBanner type={type}>{type} message</AlertBanner>);

        expect(screen.getByText(`${type} message`)).toBeTruthy();
      });
    });
  });

  describe('Icons', () => {
    it('should render icon for each type', () => {
      render(<AlertBanner type="success">Success</AlertBanner>);

      expect(screen.getByTestId('vector-icon')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('should apply default size padding', () => {
      const { getByTestId } = render(
        <AlertBanner type="info" testID="banner">
          Message
        </AlertBanner>
      );

      const banner = getByTestId('banner');
      const style = Array.isArray(banner.props.style)
        ? Object.assign({}, ...banner.props.style)
        : banner.props.style;
      expect(style.paddingHorizontal).toBe(12);
      expect(style.paddingVertical).toBe(10);
    });

    it('should apply compact size padding', () => {
      const { getByTestId } = render(
        <AlertBanner type="info" size="compact" testID="banner">
          Message
        </AlertBanner>
      );

      const banner = getByTestId('banner');
      const style = Array.isArray(banner.props.style)
        ? Object.assign({}, ...banner.props.style)
        : banner.props.style;
      expect(style.paddingHorizontal).toBe(10);
      expect(style.paddingVertical).toBe(8);
    });
  });

  describe('Dismissible', () => {
    it('should show dismiss button when dismissible is true', () => {
      render(
        <AlertBanner type="info" dismissible>
          Message
        </AlertBanner>
      );

      expect(screen.getByLabelText(/dismiss/i)).toBeTruthy();
    });

    it('should not show dismiss button by default', () => {
      render(<AlertBanner type="info">Message</AlertBanner>);

      expect(screen.queryByLabelText(/dismiss/i)).toBeNull();
    });

    it('should call onDismiss when dismiss button is pressed', async () => {
      const handleDismiss = jest.fn();
      render(
        <AlertBanner type="info" dismissible onDismiss={handleDismiss}>
          Message
        </AlertBanner>
      );

      fireEvent.press(screen.getByLabelText(/dismiss/i));

      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger haptic feedback on dismiss', async () => {
      const handleDismiss = jest.fn();
      render(
        <AlertBanner type="info" dismissible onDismiss={handleDismiss}>
          Message
        </AlertBanner>
      );

      fireEvent.press(screen.getByLabelText(/dismiss/i));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Action', () => {
    it('should render action element when provided', () => {
      render(
        <AlertBanner
          type="info"
          action={<Text testID="action-button">Take Action</Text>}
        >
          Message
        </AlertBanner>
      );

      expect(screen.getByTestId('action-button')).toBeTruthy();
    });
  });

  describe('Custom Icon', () => {
    it('should accept custom icon override', () => {
      const icon = <Text testID="custom-icon">!</Text>;
      render(
        <AlertBanner type="info" icon={icon}>
          Info
        </AlertBanner>
      );

      expect(screen.getByTestId('custom-icon')).toBeTruthy();
      expect(screen.queryByTestId('alert-icon')).toBeNull();
    });
  });
});
