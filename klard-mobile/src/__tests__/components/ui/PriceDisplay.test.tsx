/**
 * Tests for PriceDisplay Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

// Mock vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || `icon-${name}`}>{name}</Text>
    ),
  };
});

describe('PriceDisplay', () => {
  describe('Basic Rendering', () => {
    it('should render the formatted price', () => {
      render(<PriceDisplay amount={9.99} />);

      expect(screen.getByText('$9.99')).toBeTruthy();
    });

    it('should format currency with two decimal places', () => {
      render(<PriceDisplay amount={100} />);

      expect(screen.getByText('$100.00')).toBeTruthy();
    });

    it('should handle zero amount', () => {
      render(<PriceDisplay amount={0} />);

      expect(screen.getByText('$0.00')).toBeTruthy();
    });

    it('should handle large amounts with thousand separators', () => {
      render(<PriceDisplay amount={1234.56} />);

      expect(screen.getByText('$1,234.56')).toBeTruthy();
    });
  });

  describe('Currency Support', () => {
    it('should default to USD currency', () => {
      render(<PriceDisplay amount={50} />);

      expect(screen.getByText('$50.00')).toBeTruthy();
    });

    it('should support EUR currency', () => {
      render(<PriceDisplay amount={50} currency="EUR" />);

      // Check for euro format
      expect(screen.getByText(/€50\.00|50,00\s?€/)).toBeTruthy();
    });

    it('should support GBP currency', () => {
      render(<PriceDisplay amount={50} currency="GBP" />);

      expect(screen.getByText('£50.00')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('should render with sm size', () => {
      render(<PriceDisplay amount={9.99} size="sm" testID="price-display" />);

      expect(screen.getByTestId('price-display')).toBeTruthy();
    });

    it('should render with md size by default', () => {
      render(<PriceDisplay amount={9.99} testID="price-display" />);

      expect(screen.getByTestId('price-display')).toBeTruthy();
    });

    it('should render with lg size', () => {
      render(<PriceDisplay amount={9.99} size="lg" testID="price-display" />);

      expect(screen.getByTestId('price-display')).toBeTruthy();
    });
  });

  describe('Billing Cycle Labels', () => {
    it('should not show billing cycle by default', () => {
      render(<PriceDisplay amount={9.99} />);

      expect(screen.queryByText(/\/mo|\/yr|\/wk/)).toBeNull();
    });

    it('should show /mo for monthly billing', () => {
      render(<PriceDisplay amount={9.99} billingCycle="monthly" />);

      expect(screen.getByText('/mo')).toBeTruthy();
    });

    it('should show /yr for yearly billing', () => {
      render(<PriceDisplay amount={99.99} billingCycle="yearly" />);

      expect(screen.getByText('/yr')).toBeTruthy();
    });

    it('should show /wk for weekly billing', () => {
      render(<PriceDisplay amount={2.99} billingCycle="weekly" />);

      expect(screen.getByText('/wk')).toBeTruthy();
    });

    it('should show nothing for one-time billing', () => {
      render(<PriceDisplay amount={299.99} billingCycle="one-time" />);

      expect(screen.queryByText(/\/mo|\/yr|\/wk/)).toBeNull();
    });
  });

  describe('Price Change Indicators', () => {
    it('should not show change indicator by default', () => {
      render(<PriceDisplay amount={9.99} />);

      expect(screen.queryByTestId('price-change-indicator')).toBeNull();
    });

    it('should show increase indicator', () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: 'increase' }}
        />
      );

      expect(screen.getByTestId('price-change-indicator')).toBeTruthy();
    });

    it('should show decrease indicator', () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: 'decrease' }}
        />
      );

      expect(screen.getByTestId('price-change-indicator')).toBeTruthy();
    });

    it('should display the price difference amount for increase', () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: 'increase' }}
        />
      );

      expect(screen.getByText('$3.00')).toBeTruthy();
    });

    it('should display the price difference amount for decrease', () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: 'decrease' }}
        />
      );

      expect(screen.getByText('$2.00')).toBeTruthy();
    });

    it('should show up arrow icon for increase', () => {
      render(
        <PriceDisplay
          amount={12.99}
          showChange={{ from: 9.99, direction: 'increase' }}
        />
      );

      expect(screen.getByTestId('arrow-up-icon')).toBeTruthy();
    });

    it('should show down arrow icon for decrease', () => {
      render(
        <PriceDisplay
          amount={7.99}
          showChange={{ from: 9.99, direction: 'decrease' }}
        />
      );

      expect(screen.getByTestId('arrow-down-icon')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative amounts', () => {
      render(<PriceDisplay amount={-9.99} />);

      expect(screen.getByText('-$9.99')).toBeTruthy();
    });

    it('should handle very small amounts', () => {
      render(<PriceDisplay amount={0.01} />);

      expect(screen.getByText('$0.01')).toBeTruthy();
    });
  });
});
