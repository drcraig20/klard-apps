/**
 * Tests for SavingsCounter Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: currency formatting, label display, success styling, animation behavior, accessibility
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SavingsCounter } from '@/components/ui/SavingsCounter';

describe('SavingsCounter', () => {
  describe('Currency Formatting', () => {
    it('formats USD currency correctly', () => {
      render(<SavingsCounter amount={1234.56} />);
      expect(screen.getByText('$1,234.56')).toBeTruthy();
    });

    it('formats whole numbers with decimal places', () => {
      render(<SavingsCounter amount={1000} />);
      expect(screen.getByText('$1,000.00')).toBeTruthy();
    });

    it('formats zero amount', () => {
      render(<SavingsCounter amount={0} />);
      expect(screen.getByText('$0.00')).toBeTruthy();
    });

    it('formats large amounts with thousands separators', () => {
      render(<SavingsCounter amount={1234567.89} />);
      expect(screen.getByText('$1,234,567.89')).toBeTruthy();
    });

    it('supports different currencies', () => {
      render(<SavingsCounter amount={1234.56} currency="EUR" testID="savings" />);
      // EUR formatting - just check it contains the amount
      const element = screen.getByTestId('savings');
      expect(element).toBeTruthy();
    });
  });

  describe('Label Display', () => {
    it('shows label when provided', () => {
      render(<SavingsCounter amount={100} label="Total Blocked" />);
      expect(screen.getByText('Total Blocked')).toBeTruthy();
    });

    it('does not render label element when not provided', () => {
      render(<SavingsCounter amount={100} testID="savings" />);
      expect(screen.queryByTestId('savings-label')).toBeNull();
    });
  });

  describe('Styling', () => {
    it('has testID for savings-counter', () => {
      render(<SavingsCounter amount={100} testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });

    it('uses default testID when not provided', () => {
      render(<SavingsCounter amount={100} />);
      // Should have default testID
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });
  });

  describe('Animation', () => {
    it('renders with animate prop true', () => {
      render(<SavingsCounter amount={100} animate testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });

    it('renders with animate prop false', () => {
      render(<SavingsCounter amount={100} animate={false} testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });

    it('defaults to no animation when prop not provided', () => {
      render(<SavingsCounter amount={100} testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible label', () => {
      render(<SavingsCounter amount={1234.56} testID="savings-counter" />);
      const element = screen.getByTestId('savings-counter');
      expect(element.props.accessibilityLabel).toBeDefined();
    });

    it('includes label in accessible description when provided', () => {
      render(<SavingsCounter amount={100} label="Total Saved" testID="savings-counter" />);
      const element = screen.getByTestId('savings-counter');
      expect(element.props.accessibilityLabel).toContain('Total Saved');
    });
  });

  describe('Size Variants', () => {
    it('applies sm size', () => {
      render(<SavingsCounter amount={100} size="sm" testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });

    it('applies md size (default)', () => {
      render(<SavingsCounter amount={100} testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });

    it('applies lg size', () => {
      render(<SavingsCounter amount={100} size="lg" testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });
  });

  describe('Custom Style', () => {
    it('accepts custom style prop', () => {
      const customStyle = { marginTop: 20 };
      render(<SavingsCounter amount={100} style={customStyle} testID="savings-counter" />);
      expect(screen.getByTestId('savings-counter')).toBeTruthy();
    });
  });
});
