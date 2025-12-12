/**
 * Tests for SubscriptionCard Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, variants, status badges, interactions, accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubscriptionCard } from '@/components/ui/subscription-card';

const mockSubscription = {
  id: '1',
  name: 'Netflix',
  logoUrl: 'https://example.com/netflix.png',
  price: 15.99,
  currency: 'USD',
  billingCycle: 'monthly' as const,
  status: 'active' as const,
  nextBillingDate: new Date('2025-01-15'),
  category: 'streaming',
};

describe('SubscriptionCard', () => {
  describe('Rendering', () => {
    it('should render the subscription name', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      expect(screen.getByText('Netflix')).toBeInTheDocument();
    });

    it('should render the price with currency', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      expect(screen.getByText(/\$15\.99/)).toBeInTheDocument();
    });

    it('should render the billing cycle', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      expect(screen.getByText(/\/mo/i)).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      const card = screen.getByText('Netflix').closest('[data-slot="subscription-card"]');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Status Badge', () => {
    it('should render active status with success variant', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'active' }} />);
      const badge = screen.getByText('Active');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toMatch(/green|success/i);
    });

    it('should render trial status with warning variant', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'trial' }} />);
      const badge = screen.getByText('Trial');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toMatch(/amber|warning/i);
    });

    it('should render cancelled status with default variant', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'cancelled' }} />);
      const badge = screen.getByText('Cancelled');
      expect(badge).toBeInTheDocument();
    });

    it('should render expired status with error variant', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, status: 'expired' }} />);
      const badge = screen.getByText('Expired');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toMatch(/red|error/i);
    });
  });

  describe('Variants', () => {
    it('should render default variant with all information', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="default" />);
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      expect(screen.getByText(/\$15\.99/)).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render compact variant with minimal information', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="compact" />);
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      // Compact should not show status badge
      expect(screen.queryByText('Active')).not.toBeInTheDocument();
    });

    it('should render detailed variant with category', () => {
      render(<SubscriptionCard subscription={mockSubscription} variant="detailed" />);
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      expect(screen.getByText('streaming')).toBeInTheDocument();
    });
  });

  describe('Service Logo', () => {
    it('should render service logo when logoUrl provided', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      const logo = screen.getByRole('img', { name: /netflix/i });
      expect(logo).toBeInTheDocument();
    });

    it('should render fallback initial when no logoUrl', () => {
      render(<SubscriptionCard subscription={{ ...mockSubscription, logoUrl: undefined }} />);
      expect(screen.getByText('N')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when card is clicked', () => {
      const handlePress = vi.fn();
      render(<SubscriptionCard subscription={mockSubscription} onPress={handlePress} />);
      const card = screen.getByText('Netflix').closest('[data-slot="subscription-card"]');
      fireEvent.click(card!);
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('should not be clickable when onPress is not provided', () => {
      render(<SubscriptionCard subscription={mockSubscription} />);
      const card = screen.getByText('Netflix').closest('[data-slot="subscription-card"]');
      expect(card?.tagName.toLowerCase()).not.toBe('button');
    });

    it('should have correct cursor style when clickable', () => {
      render(<SubscriptionCard subscription={mockSubscription} onPress={() => {}} />);
      const card = screen.getByText('Netflix').closest('[data-slot="subscription-card"]');
      expect(card?.className).toContain('cursor-pointer');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with default classes', () => {
      render(<SubscriptionCard subscription={mockSubscription} className="custom-class" />);
      const card = screen.getByText('Netflix').closest('[data-slot="subscription-card"]');
      expect(card?.className).toContain('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible role when clickable', () => {
      render(<SubscriptionCard subscription={mockSubscription} onPress={() => {}} />);
      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
    });

    it('should have aria-label with subscription info', () => {
      render(<SubscriptionCard subscription={mockSubscription} onPress={() => {}} />);
      const card = screen.getByRole('button');
      expect(card.getAttribute('aria-label')).toContain('Netflix');
    });
  });
});
