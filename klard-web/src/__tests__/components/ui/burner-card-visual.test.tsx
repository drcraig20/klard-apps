/**
 * Tests for BurnerCardVisual Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, status variants, accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BurnerCardVisual } from '@/components/ui/burner-card-visual';

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
    it('should render card container with data-slot', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card).toBeInTheDocument();
    });

    it('should display Klard brand name', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Klard')).toBeInTheDocument();
    });

    it('should display card type badge', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('recurring')).toBeInTheDocument();
    });

    it('should display masked card number with last four digits', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText(/•••• •••• •••• 4242/)).toBeInTheDocument();
    });

    it('should display card nickname', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Netflix Subscription')).toBeInTheDocument();
    });

    it('should display expiry date', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('12/25')).toBeInTheDocument();
    });

    it('should display spending information', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      expect(screen.getByText('Spent')).toBeInTheDocument();
      expect(screen.getByText('$15.99 / $20.00')).toBeInTheDocument();
    });

    it('should render progress bar track', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const progressTrack = container.querySelector('[data-slot="spending-progress-track"]');
      expect(progressTrack).toBeInTheDocument();
    });

    it('should render progress bar fill', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const progressFill = container.querySelector('[data-slot="spending-progress-fill"]');
      expect(progressFill).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} size="sm" />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('w-64');
      expect(card?.className).toContain('h-40');
    });

    it('should apply md size class by default', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('w-80');
      expect(card?.className).toContain('h-48');
    });

    it('should apply lg size class', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} size="lg" />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('w-96');
      expect(card?.className).toContain('h-56');
    });
  });

  describe('Status Variants', () => {
    it('should apply active gradient classes', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('from-teal-700');
      expect(card?.className).toContain('to-teal-800');
    });

    it('should apply locked gradient classes', () => {
      const { container } = render(<BurnerCardVisual card={mockLockedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('from-amber-600');
      expect(card?.className).toContain('to-amber-700');
    });

    it('should apply expired gradient classes', () => {
      const { container } = render(<BurnerCardVisual card={mockExpiredCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('from-slate-500');
      expect(card?.className).toContain('to-slate-600');
    });

    it('should apply used gradient classes', () => {
      const { container } = render(<BurnerCardVisual card={mockUsedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('from-slate-600');
      expect(card?.className).toContain('to-slate-700');
    });
  });

  describe('Accessibility', () => {
    it('should have article role', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
    });

    it('should have aria-label with card info', () => {
      render(<BurnerCardVisual card={mockActiveCard} />);

      const card = screen.getByRole('article');
      expect(card.getAttribute('aria-label')).toContain('Netflix Subscription');
      expect(card.getAttribute('aria-label')).toContain('4242');
    });
  });

  describe('Progress Calculation', () => {
    it('should set correct progress width style', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const progressFill = container.querySelector('[data-slot="spending-progress-fill"]');
      // 15.99 / 20.00 = 79.95%
      expect(progressFill?.getAttribute('style')).toContain('width: 79.95%');
    });

    it('should cap progress at 100%', () => {
      const overSpentCard = {
        ...mockActiveCard,
        spentAmount: 25.00,
        spendLimit: 20.00,
      };
      const { container } = render(<BurnerCardVisual card={overSpentCard} />);

      const progressFill = container.querySelector('[data-slot="spending-progress-fill"]');
      expect(progressFill?.getAttribute('style')).toContain('width: 100%');
    });

    it('should handle zero spend limit', () => {
      const zeroLimitCard = {
        ...mockActiveCard,
        spentAmount: 0,
        spendLimit: 0,
      };
      const { container } = render(<BurnerCardVisual card={zeroLimitCard} />);

      const progressFill = container.querySelector('[data-slot="spending-progress-fill"]');
      expect(progressFill?.getAttribute('style')).toContain('width: 0%');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const { container } = render(
        <BurnerCardVisual card={mockActiveCard} className="custom-class" />
      );

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card).toHaveClass('custom-class');
    });
  });
});
