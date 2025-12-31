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

// Mock useThemeColors hook to provide theme context
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    primaryForeground: '#FFFFFF',
    secondary: '#15B5B0',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    textSecondary: '#475569',
    foreground: '#0F172A',
    background: '#FFFFFF',
    // Glow colors used for badge shadows
    glowPrimary: 'rgba(13, 124, 122, 0.3)',
    glowSuccess: 'rgba(5, 150, 105, 0.2)',
    glowWarning: 'rgba(217, 119, 6, 0.2)',
    glowError: 'rgba(220, 38, 38, 0.2)',
    // Background colors for badge variants
    primaryBackground: '#E6F5F5',
    successBackground: '#ECFDF5',
    warningBackground: '#FEF3C7',
    errorBackground: '#FEF2F2',
    border: 'rgba(148, 163, 184, 0.2)',
    isDark: false,
  }),
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

  describe('Glow Effects', () => {
    it('should apply success glow shadow styles', () => {
      const { getByTestId } = render(
        <Badge variant="success" testID="badge">
          Active
        </Badge>
      );

      const badge = getByTestId('badge');
      // Verify badge renders with success variant (shadow applied via style)
      expect(badge).toBeTruthy();
      // Check that the style includes shadowColor using design token (glowSuccess)
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBe('rgba(5, 150, 105, 0.2)');
    });

    it('should apply warning glow shadow styles', () => {
      const { getByTestId } = render(
        <Badge variant="warning" testID="badge">
          Pending
        </Badge>
      );

      const badge = getByTestId('badge');
      // Check that the style includes shadowColor using design token (glowWarning)
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBe('rgba(217, 119, 6, 0.2)');
    });

    it('should apply error glow shadow styles', () => {
      const { getByTestId } = render(
        <Badge variant="error" testID="badge">
          Failed
        </Badge>
      );

      const badge = getByTestId('badge');
      // Check that the style includes shadowColor using design token (glowError)
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBe('rgba(220, 38, 38, 0.2)');
    });

    it('should apply primary glow shadow styles', () => {
      const { getByTestId } = render(
        <Badge variant="primary" testID="badge">
          Primary
        </Badge>
      );

      const badge = getByTestId('badge');
      // Check that the style includes shadowColor using design token (glowPrimary)
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBe('rgba(13, 124, 122, 0.3)');
    });

    it('should not apply glow to default variant', () => {
      const { getByTestId } = render(
        <Badge variant="default" testID="badge">
          Default
        </Badge>
      );

      const badge = getByTestId('badge');
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBeUndefined();
    });

    it('should not apply glow to outline variant', () => {
      const { getByTestId } = render(
        <Badge variant="outline" testID="badge">
          Outline
        </Badge>
      );

      const badge = getByTestId('badge');
      const flatStyle = Array.isArray(badge.props.style)
        ? Object.assign({}, ...badge.props.style)
        : badge.props.style;
      expect(flatStyle.shadowColor).toBeUndefined();
    });
  });
});
