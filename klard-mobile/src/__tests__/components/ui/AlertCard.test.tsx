import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { AlertCard } from '@/components/ui/AlertCard';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
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
      expect(screen.getByText('1 day ago')).toBeTruthy();
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
});
