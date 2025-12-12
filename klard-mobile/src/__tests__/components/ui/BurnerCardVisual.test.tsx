/**
 * Tests for BurnerCardVisual Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { BurnerCardVisual } from '@/components/ui/BurnerCardVisual';

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, testID, style, ...props }: any) => {
    const { View } = require('react-native');
    return (
      <View testID={testID} style={style} {...props}>
        {children}
      </View>
    );
  },
}));

const mockActiveCard = {
  nickname: 'Netflix Subscription',
  type: 'recurring' as const,
  status: 'active' as const,
  lastFour: '4242',
  expiryMonth: '12',
  expiryYear: '25',
  spentAmount: 15.99,
  spendLimit: 20.00,
};

const mockLockedCard = {
  ...mockActiveCard,
  status: 'locked' as const,
};

const mockExpiredCard = {
  ...mockActiveCard,
  status: 'expired' as const,
};

const mockUsedCard = {
  ...mockActiveCard,
  type: 'single-use' as const,
  status: 'used' as const,
};

describe('BurnerCardVisual', () => {
  describe('Rendering', () => {
    it('should render card container', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByTestId('burner-card-visual')).toBeTruthy();
    });

    it('should display Klard brand name', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Klard')).toBeTruthy();
    });

    it('should display card type badge', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('recurring')).toBeTruthy();
    });

    it('should display masked card number with last four digits', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText(/•••• •••• •••• 4242/)).toBeTruthy();
    });

    it('should display card nickname', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Netflix Subscription')).toBeTruthy();
    });

    it('should display expiry date', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('12/25')).toBeTruthy();
    });

    it('should display spending information', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Spent')).toBeTruthy();
      expect(screen.getByText('$15.99 / $20.00')).toBeTruthy();
    });

    it('should render progress bar track', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByTestId('spending-progress-track')).toBeTruthy();
    });

    it('should render progress bar fill', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByTestId('spending-progress-fill')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size (256x160)', () => {
      render(<BurnerCardVisual card={mockActiveCard} size="sm" />);

      const card = screen.getByTestId('burner-card-visual');
      const flatStyle = Array.isArray(card.props.style)
        ? Object.assign({}, ...card.props.style)
        : card.props.style;
      expect(flatStyle).toMatchObject({ width: 256, height: 160 });
    });

    it('should apply md size by default (320x192)', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByTestId('burner-card-visual');
      const flatStyle = Array.isArray(card.props.style)
        ? Object.assign({}, ...card.props.style)
        : card.props.style;
      expect(flatStyle).toMatchObject({ width: 320, height: 192 });
    });

    it('should apply lg size (384x224)', () => {
      render(<BurnerCardVisual card={mockActiveCard} size="lg" />);

      const card = screen.getByTestId('burner-card-visual');
      const flatStyle = Array.isArray(card.props.style)
        ? Object.assign({}, ...card.props.style)
        : card.props.style;
      expect(flatStyle).toMatchObject({ width: 384, height: 224 });
    });
  });

  describe('Status Variants', () => {
    it('should render active status card', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card).toBeTruthy();
    });

    it('should render locked status card', () => {
      render(<BurnerCardVisual card={mockLockedCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card).toBeTruthy();
    });

    it('should render expired status card', () => {
      render(<BurnerCardVisual card={mockExpiredCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card).toBeTruthy();
    });

    it('should render used status card', () => {
      render(<BurnerCardVisual card={mockUsedCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have summary accessibility role', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card.props.accessibilityRole).toBe('summary');
    });

    it('should have accessibility label with card info', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByTestId('burner-card-visual');
      expect(card.props.accessibilityLabel).toContain('Netflix Subscription');
      expect(card.props.accessibilityLabel).toContain('4242');
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate correct progress percentage', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const progressFill = screen.getByTestId('spending-progress-fill');
      const flatStyle = Array.isArray(progressFill.props.style)
        ? Object.assign({}, ...progressFill.props.style)
        : progressFill.props.style;
      // 15.99 / 20.00 = 79.95%
      expect(flatStyle).toMatchObject({ width: '79.95%' });
    });

    it('should cap progress at 100%', () => {
      const overSpentCard = {
        ...mockActiveCard,
        spentAmount: 25.00,
        spendLimit: 20.00,
      };
      render(<BurnerCardVisual card={overSpentCard} />);

      const progressFill = screen.getByTestId('spending-progress-fill');
      const flatStyle = Array.isArray(progressFill.props.style)
        ? Object.assign({}, ...progressFill.props.style)
        : progressFill.props.style;
      expect(flatStyle).toMatchObject({ width: '100.00%' });
    });

    it('should handle zero spend limit', () => {
      const zeroLimitCard = {
        ...mockActiveCard,
        spentAmount: 0,
        spendLimit: 0,
      };
      render(<BurnerCardVisual card={zeroLimitCard} />);

      const progressFill = screen.getByTestId('spending-progress-fill');
      const flatStyle = Array.isArray(progressFill.props.style)
        ? Object.assign({}, ...progressFill.props.style)
        : progressFill.props.style;
      expect(flatStyle).toMatchObject({ width: '0%' });
    });
  });
});
