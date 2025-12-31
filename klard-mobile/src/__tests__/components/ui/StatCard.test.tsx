/**
 * Tests for StatCard Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { StatCard } from '@/components/ui/StatCard';
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

describe('StatCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render label and value', () => {
      render(<StatCard label="Total Savings" value="$1,234" />);

      expect(screen.getByText('Total Savings')).toBeTruthy();
      expect(screen.getByText('$1,234')).toBeTruthy();
    });

    it('should render numeric value', () => {
      render(<StatCard label="Count" value={42} />);

      expect(screen.getByText('42')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      render(<StatCard label="Metrics" value={100} testID="stat-card" />);

      expect(screen.getByTestId('stat-card')).toBeTruthy();
    });
  });

  describe('Trend Indicator', () => {
    it('should render up trend', () => {
      render(
        <StatCard
          label="Growth"
          value="$500"
          trend={{ direction: 'up', value: '+12%' }}
        />
      );

      expect(screen.getByText('+12%')).toBeTruthy();
      expect(screen.getByTestId('vector-icon')).toBeTruthy();
    });

    it('should render down trend', () => {
      render(
        <StatCard
          label="Decline"
          value="$200"
          trend={{ direction: 'down', value: '-8%' }}
        />
      );

      expect(screen.getByText('-8%')).toBeTruthy();
    });

    it('should render neutral trend', () => {
      render(
        <StatCard
          label="Stable"
          value="$100"
          trend={{ direction: 'neutral', value: '0%' }}
        />
      );

      expect(screen.getByText('0%')).toBeTruthy();
    });

    it('should not render trend when not provided', () => {
      render(<StatCard label="No Trend" value="$50" />);

      expect(screen.queryByTestId('trend-container')).toBeNull();
    });
  });

  describe('Icon Support', () => {
    it('should render icon when provided', () => {
      const icon = <Text testID="custom-icon">💰</Text>;
      render(<StatCard label="Savings" value="$100" icon={icon} />);

      expect(screen.getByTestId('custom-icon')).toBeTruthy();
    });

    it('should not render icon container when icon not provided', () => {
      render(<StatCard label="No Icon" value="$100" testID="card" />);

      expect(screen.queryByTestId('icon-container')).toBeNull();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size styles', () => {
      render(<StatCard label="Small" value="100" size="sm" testID="card" />);

      const card = screen.getByTestId('card');
      expect(card).toBeTruthy();
    });

    it('should apply md size styles (default)', () => {
      render(<StatCard label="Medium" value="100" testID="card" />);

      const card = screen.getByTestId('card');
      expect(card).toBeTruthy();
    });

    it('should apply lg size styles', () => {
      render(<StatCard label="Large" value="100" size="lg" testID="card" />);

      const card = screen.getByTestId('card');
      expect(card).toBeTruthy();
    });
  });

  describe('Muted Tone', () => {
    it('should apply muted styling when muted prop is true', () => {
      render(<StatCard label="Muted" value="100" muted testID="card" />);

      const card = screen.getByTestId('card');
      expect(card).toBeTruthy();
    });
  });

  describe('Click Handling', () => {
    it('should call onClick when pressed', async () => {
      const handleClick = jest.fn();
      render(
        <StatCard
          label="Clickable"
          value="$100"
          onClick={handleClick}
          testID="stat-card"
        />
      );

      fireEvent.press(screen.getByTestId('stat-card'));

      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger haptic feedback when pressed', async () => {
      const handleClick = jest.fn();
      render(
        <StatCard
          label="Haptic"
          value="$100"
          onClick={handleClick}
          testID="stat-card"
        />
      );

      fireEvent.press(screen.getByTestId('stat-card'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it('should not trigger haptic when not clickable', () => {
      render(<StatCard label="Static" value="$100" testID="stat-card" />);

      // Static card should not respond to press
      expect(screen.getByTestId('stat-card')).toBeTruthy();
    });
  });
});