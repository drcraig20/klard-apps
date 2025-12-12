/**
 * Tests for SubscriptionCard Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SubscriptionCard } from '@/components/ui/SubscriptionCard';
import * as Haptics from 'expo-haptics';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
  },
}));

// Mock expo-image
jest.mock('expo-image', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    Image: ({ source, accessibilityLabel, testID, onError }: any) => (
      <View testID={testID || 'expo-image'} accessibilityLabel={accessibilityLabel}>
        <Text>{source}</Text>
      </View>
    ),
  };
});

const mockSubscription = {
  id: '1',
  name: 'Netflix',
  logoUrl: 'https://example.com/netflix.png',
  price: 15.99,
  currency: 'USD',
  billingCycle: 'monthly' as const,
  status: 'active' as const,
  nextBillingDate: new Date('2025-01-15'),
  category: 'streaming',
};

describe('SubscriptionCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the subscription name', () => {
      render(<SubscriptionCard subscription={mockSubscription} testID="card" />);
      expect(screen.getByText('Netflix')).toBeTruthy();
    });

    it('should render the price with currency', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      expect(screen.getByText(/\$15\.99/)).toBeTruthy();
    });

    it('should render the billing cycle label', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      expect(screen.getByText(/\/mo/)).toBeTruthy();
    });

    it('should have correct testID', () => {
      render(<SubscriptionCard subscription={mockSubscription} testID="subscription-card" />);
      expect(screen.getByTestId('subscription-card')).toBeTruthy();
    });
  });

  describe('Status Badge', () => {
    it('should render active status badge', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'active' }} />);
      expect(screen.getByText('Active')).toBeTruthy();
    });

    it('should render trial status badge', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'trial' }} />);
      expect(screen.getByText('Trial')).toBeTruthy();
    });

    it('should render expired status badge', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'expired' }} />);
      expect(screen.getByText('Expired')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render default variant with status badge', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="default" />);
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText(/\$15\.99/)).toBeTruthy();
    });

    it('should render compact variant without status badge', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="compact" />);
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.queryByText('Active')).toBeNull();
    });

    it('should render detailed variant with category', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="detailed" />);
      expect(screen.getByText('streaming')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when card is pressed', async () => {
      const handlePress = jest.fn();
      render(
        <SubscriptionCard
          subscription={mockSubscription}
          onPress={handlePress}
          testID="card"
        />
      );

      fireEvent.press(screen.getByTestId('card'));

      await waitFor(() => {
        expect(handlePress).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger haptic feedback when pressed', async () => {
      const handlePress = jest.fn();
      render(
        <SubscriptionCard
          subscription={mockSubscription}
          onPress={handlePress}
          testID="card"
        />
      );

      fireEvent.press(screen.getByTestId('card'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Service Logo', () => {
    it('should render fallback initial when no logoUrl', () => {
      render(
        <SubscriptionCard
          subscription={{ ...mockSubscription, logoUrl: undefined }}
        />
      );
      expect(screen.getByText('N')).toBeTruthy();
    });
  });
});
