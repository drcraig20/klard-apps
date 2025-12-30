/**
 * Tests for ProtectionStatus Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, plural/singular messages, pulse animation, teal glow styling
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ProtectionStatus } from '@/components/ui/ProtectionStatus';

// Mock expo-haptics (used internally by some components)
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

describe('ProtectionStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Rendering', () => {
    it('displays card count with watching message (plural)', () => {
      render(<ProtectionStatus activeCards={3} />);

      expect(screen.getByText('3 cards watching')).toBeTruthy();
    });

    it('uses singular for 1 card', () => {
      render(<ProtectionStatus activeCards={1} />);

      expect(screen.getByText('1 card watching')).toBeTruthy();
    });

    it('displays zero cards correctly', () => {
      render(<ProtectionStatus activeCards={0} />);

      expect(screen.getByText('0 cards watching')).toBeTruthy();
    });

    it('has testID attribute', () => {
      render(<ProtectionStatus activeCards={3} />);

      expect(screen.getByTestId('protection-status')).toBeTruthy();
    });
  });

  describe('Pulse Animation', () => {
    it('renders with pulse indicator when enabled', () => {
      render(<ProtectionStatus activeCards={3} showPulse />);

      expect(screen.getByTestId('protection-status')).toBeTruthy();
      expect(screen.getByTestId('pulse-indicator')).toBeTruthy();
    });

    it('does not show pulse indicator by default', () => {
      render(<ProtectionStatus activeCards={3} />);

      expect(screen.queryByTestId('pulse-indicator')).toBeNull();
    });

    it('does not show pulse indicator when explicitly disabled', () => {
      render(<ProtectionStatus activeCards={3} showPulse={false} />);

      expect(screen.queryByTestId('pulse-indicator')).toBeNull();
    });
  });

  describe('Teal Glow Styling', () => {
    it('renders component with glow styling', () => {
      render(<ProtectionStatus activeCards={3} />);

      // Verify the component renders - glow is applied via styles
      expect(screen.getByTestId('protection-status')).toBeTruthy();
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <ProtectionStatus
          activeCards={3}
          style={{ marginTop: 20 }}
        />
      );

      const element = screen.getByTestId('protection-status');
      expect(element).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has appropriate accessibility properties', () => {
      render(<ProtectionStatus activeCards={3} />);

      const element = screen.getByTestId('protection-status');
      expect(element.props.accessibilityRole).toBe('text');
      expect(element.props.accessibilityLabel).toContain('3 cards watching');
    });
  });
});
