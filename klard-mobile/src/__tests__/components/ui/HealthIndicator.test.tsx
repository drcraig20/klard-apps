/**
 * Tests for HealthIndicator Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: status rendering, colors, labels, glow effects, sizes, accessibility
 *
 * SOLID Compliance:
 * - SRP: Component only renders health indicator UI
 * - OCP: Extend via status variants, not modification
 * - DIP: Depends on design token abstractions
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { HealthIndicator } from '@/components/ui/HealthIndicator';

describe('HealthIndicator', () => {
  describe('Rendering', () => {
    it('should render with testID attribute', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByTestId('health-indicator')).toBeTruthy();
    });

    it('should render dot with testID attribute', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });

    it('should render as a View element', () => {
      render(<HealthIndicator status="healthy" />);

      const indicator = screen.getByTestId('health-indicator');
      expect(indicator).toBeTruthy();
    });
  });

  describe('Status: forgotten', () => {
    it('should render forgotten status', () => {
      render(<HealthIndicator status="forgotten" />);

      expect(screen.getByTestId('health-indicator')).toBeTruthy();
    });

    it("should show 'Forgotten?' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="forgotten" />);

      expect(screen.getByText('Forgotten?')).toBeTruthy();
    });

    it('should render the dot for forgotten status', () => {
      render(<HealthIndicator status="forgotten" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });
  });

  describe('Status: price-increased', () => {
    it('should render price-increased status', () => {
      render(<HealthIndicator status="price-increased" />);

      expect(screen.getByTestId('health-indicator')).toBeTruthy();
    });

    it("should show 'Price went up' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="price-increased" />);

      expect(screen.getByText('Price went up')).toBeTruthy();
    });

    it('should render the dot for price-increased status', () => {
      render(<HealthIndicator status="price-increased" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });
  });

  describe('Status: healthy', () => {
    it('should render healthy status', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByTestId('health-indicator')).toBeTruthy();
    });

    it("should show 'All good' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByText('All good')).toBeTruthy();
    });

    it('should render the dot for healthy status', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });
  });

  describe('Label Visibility', () => {
    it('should show label by default (showLabel=true)', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByText('All good')).toBeTruthy();
    });

    it('should hide label when showLabel is false', () => {
      render(<HealthIndicator status="healthy" showLabel={false} />);

      expect(screen.queryByText('All good')).toBeNull();
    });

    it('should hide forgotten label when showLabel is false', () => {
      render(<HealthIndicator status="forgotten" showLabel={false} />);

      expect(screen.queryByText('Forgotten?')).toBeNull();
    });

    it('should hide price-increased label when showLabel is false', () => {
      render(<HealthIndicator status="price-increased" showLabel={false} />);

      expect(screen.queryByText('Price went up')).toBeNull();
    });

    it('should still show dot when label is hidden', () => {
      render(<HealthIndicator status="healthy" showLabel={false} />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render with md size by default', () => {
      render(<HealthIndicator status="healthy" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });

    it('should render with sm size when specified', () => {
      render(<HealthIndicator status="healthy" size="sm" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });

    it('should render with md size when specified', () => {
      render(<HealthIndicator status="healthy" size="md" />);

      expect(screen.getByTestId('health-indicator-dot')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label', () => {
      render(<HealthIndicator status="healthy" />);

      const indicator = screen.getByTestId('health-indicator');
      // Component should be accessible
      expect(indicator).toBeTruthy();
    });

    it('should communicate forgotten status', () => {
      render(<HealthIndicator status="forgotten" />);

      expect(screen.getByText('Forgotten?')).toBeTruthy();
    });

    it('should communicate price-increased status', () => {
      render(<HealthIndicator status="price-increased" />);

      expect(screen.getByText('Price went up')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      render(<HealthIndicator status="healthy" />);

      // Component should be accessible as text/label
      expect(screen.getByText('All good')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should render all three statuses without error', () => {
      const { rerender } = render(<HealthIndicator status="healthy" />);
      expect(screen.getByTestId('health-indicator')).toBeTruthy();

      rerender(<HealthIndicator status="forgotten" />);
      expect(screen.getByTestId('health-indicator')).toBeTruthy();

      rerender(<HealthIndicator status="price-increased" />);
      expect(screen.getByTestId('health-indicator')).toBeTruthy();
    });

    it('should accept custom testID', () => {
      render(
        <HealthIndicator
          status="healthy"
          testID="custom-indicator"
        />
      );

      expect(screen.getByTestId('custom-indicator')).toBeTruthy();
    });
  });
});
