/**
 * Tests for CardTypeSelector Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: card type selection, context recommendations, advanced options, styling
 *
 * SOLID Compliance:
 * - SRP: Component only handles card type selection UI
 * - OCP: Extensible via new card types in config
 * - DIP: Depends on CardType abstraction
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { CardTypeSelector } from '@/components/ui/CardTypeSelector';

describe('CardTypeSelector', () => {
  describe('Rendering', () => {
    it('should render with testID attribute', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.getByTestId('card-type-selector')).toBeTruthy();
    });

    it('should render One-Time and Recurring options by default', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.getByText('One-Time')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
    });
  });

  describe('Context Recommendations', () => {
    it('suggests One-Time for trial context', () => {
      render(<CardTypeSelector context="trial" onSelect={jest.fn()} />);

      // Check for recommended badge on One-Time option
      expect(screen.getByText('Recommended')).toBeTruthy();
      expect(screen.getByText('One-Time')).toBeTruthy();
    });

    it('suggests Recurring for subscription context', () => {
      render(<CardTypeSelector context="subscription" onSelect={jest.fn()} />);

      // Check for recommended badge on Recurring option
      expect(screen.getByText('Recommended')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
    });

    it('has no recommendation for general context', () => {
      render(<CardTypeSelector context="general" onSelect={jest.fn()} />);

      expect(screen.queryByText('Recommended')).toBeNull();
    });

    it('has no recommendation when context is not provided', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.queryByText('Recommended')).toBeNull();
    });

    it('shows recommended badge for trial context on One-Time', () => {
      render(<CardTypeSelector context="trial" onSelect={jest.fn()} />);

      expect(screen.getByText('Recommended')).toBeTruthy();
    });

    it('shows recommended badge for subscription context on Recurring', () => {
      render(<CardTypeSelector context="subscription" onSelect={jest.fn()} />);

      expect(screen.getByText('Recommended')).toBeTruthy();
    });
  });

  describe('Basic Options', () => {
    it('shows only 2 options by default', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.getByText('One-Time')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
      expect(screen.queryByText('Category-Locked')).toBeNull();
      expect(screen.queryByText('Merchant-Locked')).toBeNull();
    });

    it('does not show Category-Locked by default', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.queryByText('Category-Locked')).toBeNull();
    });

    it('does not show Merchant-Locked by default', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.queryByText('Merchant-Locked')).toBeNull();
    });
  });

  describe('Advanced Options', () => {
    it('reveals advanced options when showAdvanced is true', () => {
      render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);

      expect(screen.getByText('Category-Locked')).toBeTruthy();
      expect(screen.getByText('Merchant-Locked')).toBeTruthy();
    });

    it('shows 4 options when showAdvanced is true', () => {
      render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);

      expect(screen.getByText('One-Time')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
      expect(screen.getByText('Category-Locked')).toBeTruthy();
      expect(screen.getByText('Merchant-Locked')).toBeTruthy();
    });
  });

  describe('Selection Behavior', () => {
    it("calls onSelect with 'one-time' when One-Time is clicked", async () => {
      const onSelect = jest.fn();
      render(<CardTypeSelector onSelect={onSelect} />);

      fireEvent.press(screen.getByText('One-Time'));

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith('one-time');
      });
    });

    it("calls onSelect with 'recurring' when Recurring is clicked", async () => {
      const onSelect = jest.fn();
      render(<CardTypeSelector onSelect={onSelect} />);

      fireEvent.press(screen.getByText('Recurring'));

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith('recurring');
      });
    });

    it("calls onSelect with 'category-locked' when Category-Locked is clicked", async () => {
      const onSelect = jest.fn();
      render(<CardTypeSelector onSelect={onSelect} showAdvanced />);

      fireEvent.press(screen.getByText('Category-Locked'));

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith('category-locked');
      });
    });

    it("calls onSelect with 'merchant-locked' when Merchant-Locked is clicked", async () => {
      const onSelect = jest.fn();
      render(<CardTypeSelector onSelect={onSelect} showAdvanced />);

      fireEvent.press(screen.getByText('Merchant-Locked'));

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith('merchant-locked');
      });
    });
  });

  describe('Selected State', () => {
    it('highlights selected value', () => {
      render(<CardTypeSelector onSelect={jest.fn()} value="recurring" />);

      // The Recurring option should be visually highlighted
      expect(screen.getByTestId('card-type-option-recurring')).toBeTruthy();
    });

    it('highlights one-time when selected', () => {
      render(<CardTypeSelector onSelect={jest.fn()} value="one-time" />);

      expect(screen.getByTestId('card-type-option-one-time')).toBeTruthy();
    });

    it('highlights category-locked when selected with showAdvanced', () => {
      render(
        <CardTypeSelector
          onSelect={jest.fn()}
          value="category-locked"
          showAdvanced
        />
      );

      expect(screen.getByTestId('card-type-option-category-locked')).toBeTruthy();
    });
  });

  describe('Descriptions', () => {
    it('shows description for One-Time card type', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(
        screen.getByText(/single use|auto-closes after charge/i)
      ).toBeTruthy();
    });

    it('shows description for Recurring card type', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      expect(screen.getByText(/subscriptions|stays open/i)).toBeTruthy();
    });

    it('shows description for Category-Locked when advanced', () => {
      render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);

      expect(screen.getByText(/merchant category/i)).toBeTruthy();
    });

    it('shows description for Merchant-Locked when advanced', () => {
      render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);

      expect(screen.getByText(/specific merchant/i)).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button roles', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      // Both options should be accessible
      expect(screen.getByText('One-Time')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
    });

    it('should have accessibilityRole on options', () => {
      render(<CardTypeSelector onSelect={jest.fn()} />);

      const oneTimeOption = screen.getByTestId('card-type-option-one-time');
      expect(oneTimeOption.props.accessibilityRole).toBe('button');
    });

    it('should indicate selected state accessibly', () => {
      render(<CardTypeSelector onSelect={jest.fn()} value="one-time" />);

      const oneTimeOption = screen.getByTestId('card-type-option-one-time');
      expect(oneTimeOption.props.accessibilityState?.selected).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle value not matching any option', () => {
      render(
        <CardTypeSelector
          onSelect={jest.fn()}
          value={'invalid' as 'one-time'}
        />
      );

      // Should still render without crashing
      expect(screen.getByTestId('card-type-selector')).toBeTruthy();
    });

    it('should handle switching from basic to advanced options', () => {
      const { rerender } = render(
        <CardTypeSelector onSelect={jest.fn()} showAdvanced={false} />
      );
      expect(screen.queryByText('Category-Locked')).toBeNull();

      rerender(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);
      expect(screen.getByText('Category-Locked')).toBeTruthy();
    });

    it('should render all four card types when advanced is enabled', () => {
      render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);

      expect(screen.getByText('One-Time')).toBeTruthy();
      expect(screen.getByText('Recurring')).toBeTruthy();
      expect(screen.getByText('Category-Locked')).toBeTruthy();
      expect(screen.getByText('Merchant-Locked')).toBeTruthy();
    });

    it('should accept custom testID', () => {
      render(
        <CardTypeSelector onSelect={jest.fn()} testID="custom-selector" />
      );

      expect(screen.getByTestId('custom-selector')).toBeTruthy();
    });
  });
});