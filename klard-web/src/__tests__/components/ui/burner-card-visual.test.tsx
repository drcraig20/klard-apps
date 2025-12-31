/**
 * Tests for BurnerCardVisual Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, status variants, accessibility, awaiting state
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

const mockAwaitingCard = {
  ...mockActiveCard,
  status: 'awaiting' as const,
};

const mockBurnedCard = {
  ...mockActiveCard,
  status: 'burned' as const,
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

  describe('Awaiting State', () => {
    it('should render awaiting state with dashed border', () => {
      const { container } = render(<BurnerCardVisual card={mockAwaitingCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('border-dashed');
    });

    it('should show Awaiting Activation label when awaiting', () => {
      render(<BurnerCardVisual card={mockAwaitingCard} />);

      expect(screen.getByText('Awaiting Activation')).toBeInTheDocument();
    });

    it('should show KYC CTA button when awaiting with onActivate', () => {
      const onActivate = vi.fn();
      render(<BurnerCardVisual card={mockAwaitingCard} onActivate={onActivate} />);

      expect(screen.getByRole('button', { name: /activate/i })).toBeInTheDocument();
    });

    it('should call onActivate when CTA clicked', () => {
      const onActivate = vi.fn();
      render(<BurnerCardVisual card={mockAwaitingCard} onActivate={onActivate} />);

      fireEvent.click(screen.getByRole('button', { name: /activate/i }));
      expect(onActivate).toHaveBeenCalledTimes(1);
    });

    it('should not show CTA button when onActivate is not provided', () => {
      render(<BurnerCardVisual card={mockAwaitingCard} />);

      expect(screen.queryByRole('button', { name: /activate/i })).not.toBeInTheDocument();
    });

    it('should apply muted background when awaiting', () => {
      const { container } = render(<BurnerCardVisual card={mockAwaitingCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('bg-muted');
    });
  });

  describe('Status Glows', () => {
    it('should apply primary glow when active', () => {
      const { container } = render(<BurnerCardVisual card={mockActiveCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      // Check for primary glow shadow class using CSS variable
      expect(card?.className).toContain('shadow-[var(--rec-glow-primary)]');
    });

    it('should apply warning glow when locked', () => {
      const { container } = render(<BurnerCardVisual card={mockLockedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      // Check for warning glow shadow class using CSS variable
      expect(card?.className).toContain('shadow-[var(--rec-glow-warning)]');
    });

    it('should apply error glow when burned', () => {
      const { container } = render(<BurnerCardVisual card={mockBurnedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      // Check for error glow shadow class using CSS variable
      expect(card?.className).toContain('shadow-[var(--rec-glow-error)]');
    });

    it('should not apply glow when awaiting', () => {
      const { container } = render(<BurnerCardVisual card={mockAwaitingCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      // Awaiting should not have any glow shadow
      expect(card?.className).not.toMatch(/shadow-\[0_0_16px_rgba/);
    });
  });

  describe('Burned Status', () => {
    it('should apply burned gradient classes', () => {
      const { container } = render(<BurnerCardVisual card={mockBurnedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('from-red-500');
      expect(card?.className).toContain('to-red-600');
    });

    it('should apply reduced opacity when burned', () => {
      const { container } = render(<BurnerCardVisual card={mockBurnedCard} />);

      const card = container.querySelector('[data-slot="burner-card-visual"]');
      expect(card?.className).toContain('opacity-60');
    });
  });
});
