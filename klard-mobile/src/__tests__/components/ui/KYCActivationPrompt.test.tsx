/**
 * Tests for KYCActivationPrompt Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: activation framing, card name display, variant rendering, onActivate callback
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { KYCActivationPrompt } from '@/components/ui/KYCActivationPrompt';

// Mock vector icons to avoid ESM parse issues in Jest
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || 'vector-icon'}>{name}</Text>
    ),
  };
});

describe('KYCActivationPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Activation Framing', () => {
    it('uses activation framing not verification', () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={jest.fn()} />);

      // Title and button both contain "Activate" - just check there's at least one
      expect(screen.getAllByText(/Activate/i).length).toBeGreaterThan(0);
      expect(screen.queryByText(/Verify your identity/i)).toBeNull();
    });

    it('displays activation title', () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={jest.fn()} />);

      expect(screen.getByText('Activate your protection')).toBeTruthy();
    });
  });

  describe('Card Name Display', () => {
    it('shows card name in description', () => {
      render(<KYCActivationPrompt cardName="Netflix Blocker" onActivate={jest.fn()} />);

      expect(screen.getByText(/Netflix Blocker/)).toBeTruthy();
    });

    it('includes card name in verification message', () => {
      render(<KYCActivationPrompt cardName="Spotify Guard" onActivate={jest.fn()} />);

      expect(screen.getByText(/Complete a quick verification to start using Spotify Guard/)).toBeTruthy();
    });
  });

  describe('Variant Rendering', () => {
    it('renders inline variant by default', () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={jest.fn()} />);

      expect(screen.getByTestId('kyc-prompt-inline')).toBeTruthy();
    });

    it('renders modal variant when specified', () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={jest.fn()} variant="modal" />);

      expect(screen.getByTestId('kyc-prompt-modal')).toBeTruthy();
    });

    it('renders card-overlay variant when specified', () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={jest.fn()} variant="card-overlay" />);

      expect(screen.getByTestId('kyc-prompt-card-overlay')).toBeTruthy();
    });
  });

  describe('Activate Button', () => {
    it('has activate button with correct text', () => {
      render(<KYCActivationPrompt cardName="Test" onActivate={jest.fn()} />);

      expect(screen.getByText('Activate Now')).toBeTruthy();
    });

    it('calls onActivate when button pressed', async () => {
      const onActivate = jest.fn();
      render(<KYCActivationPrompt cardName="Test" onActivate={onActivate} />);

      // Button component wraps text in Pressable with accessibilityRole="button"
      const button = screen.getByRole('button');
      fireEvent.press(button);

      // handlePress in Button is async due to haptics, so we need to wait
      await waitFor(() => {
        expect(onActivate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('has appropriate accessibility properties for the prompt section', () => {
      render(<KYCActivationPrompt cardName="Test Card" onActivate={jest.fn()} />);

      const promptElement = screen.getByTestId('kyc-prompt-inline');
      expect(promptElement.props.accessibilityRole).toBe('none');
      expect(promptElement.props.accessibilityLabel).toBe('KYC activation prompt');
    });
  });

  describe('Custom style', () => {
    it('applies custom style', () => {
      render(
        <KYCActivationPrompt
          cardName="Test"
          onActivate={jest.fn()}
          style={{ marginTop: 20 }}
        />
      );

      const element = screen.getByTestId('kyc-prompt-inline');
      expect(element).toBeTruthy();
    });
  });
});