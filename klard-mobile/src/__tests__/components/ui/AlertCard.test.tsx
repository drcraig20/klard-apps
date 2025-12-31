import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { AlertCard } from '@/components/ui/AlertCard';

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
    textTertiary: '#64748B',
    foreground: '#0F172A',
    background: '#FFFFFF',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    border: 'rgba(148, 163, 184, 0.2)',
    isDark: false,
  }),
}));

// Mock expo-image
jest.mock('expo-image', () => {
  const React = require('react');
  const { View, Image } = require('react-native');
  return {
    Image: ({ testID, source, accessibilityLabel, ...props }: any) => (
      <Image
        testID={testID || 'expo-image'}
        source={source}
        accessibilityLabel={accessibilityLabel}
        {...props}
      />
    ),
  };
});

// Mock vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || 'ionicon'}>{name}</Text>
    ),
  };
});

const baseAlert = {
  id: '1',
  type: 'renewal' as const,
  title: 'Netflix renewal',
  body: 'Renews in 3 days',
  timestamp: new Date('2024-01-01T12:00:00Z'),
  read: false,
};

describe('AlertCard (Mobile)', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-02T12:00:00Z'));
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders title, body, relative time, and unread dot', () => {
      render(<AlertCard alert={baseAlert} onPress={jest.fn()} />);

      expect(screen.getByText('Netflix renewal')).toBeTruthy();
      expect(screen.getByText('Renews in 3 days')).toBeTruthy();
      expect(screen.getByText('yesterday')).toBeTruthy();
      expect(screen.getByLabelText(/unread/i)).toBeTruthy();
    });

    it('hides unread dot when alert.read is true', () => {
      render(<AlertCard alert={{ ...baseAlert, read: true }} onPress={jest.fn()} />);
      expect(screen.queryByLabelText(/unread/i)).toBeNull();
    });

    it('has correct accessibility role', () => {
      render(<AlertCard alert={baseAlert} onPress={jest.fn()} testID="alert-card" />);
      const card = screen.getByTestId('alert-card');
      expect(card.props.accessibilityRole).toBe('button');
    });
  });

  describe('Alert Types', () => {
    const types = ['renewal', 'price-increase', 'price-decrease', 'blocked', 'savings', 'system'] as const;

    types.forEach((type) => {
      it(`renders ${type} alert with icon`, () => {
        render(<AlertCard alert={{ ...baseAlert, type }} onPress={jest.fn()} />);
        expect(screen.getByTestId('alert-icon')).toBeTruthy();
      });
    });
  });

  describe('Interactions', () => {
    it('invokes onPress with haptics on press', async () => {
      const onPress = jest.fn();
      render(<AlertCard alert={baseAlert} onPress={onPress} testID="alert-card" />);

      fireEvent.press(screen.getByTestId('alert-card'));

      await waitFor(() => {
        expect(onPress).toHaveBeenCalledTimes(1);
        expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
      });
    });

    it('invokes onDismiss without triggering onPress', async () => {
      const onPress = jest.fn();
      const onDismiss = jest.fn();
      render(<AlertCard alert={baseAlert} onPress={onPress} onDismiss={onDismiss} />);

      fireEvent.press(screen.getByLabelText(/dismiss/i));

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
        expect(onPress).not.toHaveBeenCalled();
      });
    });
  });

  describe('Subscription', () => {
    it('shows subscription with logo when provided', () => {
      render(
        <AlertCard
          alert={{
            ...baseAlert,
            subscription: { name: 'Spotify', logoUrl: 'https://img/spotify.png' },
          }}
          onPress={jest.fn()}
        />
      );
      expect(screen.getByText('Spotify')).toBeTruthy();
      expect(screen.getByLabelText(/spotify/i)).toBeTruthy();
    });

    it('shows initial fallback when no logo', () => {
      render(
        <AlertCard
          alert={{
            ...baseAlert,
            subscription: { name: 'Netflix' },
          }}
          onPress={jest.fn()}
        />
      );
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.getByText('N')).toBeTruthy();
    });
  });

  describe('CTA Button', () => {
    it('renders CTA when actionLabel provided', () => {
      render(
        <AlertCard
          alert={{ ...baseAlert, actionLabel: 'Review' }}
          onPress={jest.fn()}
        />
      );
      expect(screen.getByText('Review')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('renders with md size by default', () => {
      render(<AlertCard alert={baseAlert} onPress={jest.fn()} testID="alert" />);
      const card = screen.getByTestId('alert');
      expect(card).toBeTruthy();
    });

    it('renders with sm size when specified', () => {
      render(<AlertCard alert={baseAlert} onPress={jest.fn()} size="sm" testID="alert" />);
      const card = screen.getByTestId('alert');
      expect(card).toBeTruthy();
    });
  });
});
