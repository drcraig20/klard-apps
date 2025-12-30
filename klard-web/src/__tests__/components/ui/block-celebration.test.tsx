/**
 * Tests for BlockCelebration Component
 *
 * TDD: Tests verify compound component structure, confetti triggers,
 * accessibility, and merchant anonymization.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Mock canvas-confetti before importing component
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

import { BlockCelebration } from '@/components/ui/block-celebration';
import confetti from 'canvas-confetti';

describe('BlockCelebration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders amount prominently', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
        </BlockCelebration>
      );
      const amount = screen.getByText('$47.98');
      expect(amount).toBeInTheDocument();
      expect(amount).toHaveClass('text-5xl');
    });

    it('renders with correct data-slot attribute', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const card = screen.getByText('$10.00').closest('[data-slot="block-celebration"]');
      expect(card).toBeInTheDocument();
    });

    it('renders merchant name', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" />
        </BlockCelebration>
      );
      expect(screen.getByText('TrialService')).toBeInTheDocument();
    });

    it('renders ShareZone with children', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareZone>
            <span>Share content</span>
          </BlockCelebration.ShareZone>
        </BlockCelebration>
      );
      expect(screen.getByText('Share content')).toBeInTheDocument();
    });

    it('renders ShareButton with label', () => {
      const handleShare = vi.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );
      expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });
  });

  describe('Confetti Behavior', () => {
    it('triggers confetti on first level', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(confetti).toHaveBeenCalledTimes(1);
      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 150,
          spread: 70,
        })
      );
    });

    it('triggers confetti on milestone level', () => {
      render(
        <BlockCelebration level="milestone">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(confetti).toHaveBeenCalledTimes(1);
      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 80,
          spread: 55,
        })
      );
    });

    it('triggers confetti on streak level', () => {
      render(
        <BlockCelebration level="streak">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(confetti).toHaveBeenCalledTimes(1);
      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 40,
          spread: 40,
        })
      );
    });

    it('skips confetti on subtle level', () => {
      render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      expect(confetti).not.toHaveBeenCalled();
    });

    it('triggers confetti only once on mount', () => {
      const { rerender } = render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );

      // Rerender with same props
      rerender(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={20} />
        </BlockCelebration>
      );

      // Should still only be called once
      expect(confetti).toHaveBeenCalledTimes(1);
    });
  });

  describe('Merchant Anonymization', () => {
    it('anonymizes merchant when requested', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" anonymize />
        </BlockCelebration>
      );
      expect(screen.getByText('[Hidden]')).toBeInTheDocument();
      expect(screen.queryByText('TrialService')).not.toBeInTheDocument();
    });

    it('shows merchant name when not anonymized', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" anonymize={false} />
        </BlockCelebration>
      );
      expect(screen.getByText('TrialService')).toBeInTheDocument();
      expect(screen.queryByText('[Hidden]')).not.toBeInTheDocument();
    });

    it('applies italic styling to anonymized merchant', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Merchant name="TrialService" anonymize />
        </BlockCelebration>
      );
      const merchant = screen.getByText('[Hidden]');
      expect(merchant).toHaveClass('italic');
    });
  });

  describe('Accessibility', () => {
    it('announces to screen reader', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
          <BlockCelebration.Merchant name="TrialService" />
        </BlockCelebration>
      );
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Blocked $47.98 from TrialService');
    });

    it('announces with anonymized merchant', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={25.00} />
          <BlockCelebration.Merchant name="TrialService" anonymize />
        </BlockCelebration>
      );
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Blocked $25.00 from [Hidden]');
    });

    it('has accessible share button', () => {
      const handleShare = vi.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Share blocked charge celebration');
    });
  });

  describe('ShareButton Interaction', () => {
    it('calls onShare when clicked', () => {
      const handleShare = vi.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleShare).toHaveBeenCalledTimes(1);
    });

    it('renders custom label', () => {
      const handleShare = vi.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.ShareButton onShare={handleShare} label="Share Victory" />
        </BlockCelebration>
      );
      expect(screen.getByText('Share Victory')).toBeInTheDocument();
    });
  });

  describe('Currency Formatting', () => {
    it('formats USD by default', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={99.99} />
        </BlockCelebration>
      );
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });

    it('formats EUR currency', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={99.99} currency="EUR" />
        </BlockCelebration>
      );
      // EUR formatting varies by locale, check the amount element specifically
      const amount = screen.getByTestId
        ? screen.getByText(/99\.99/, { selector: '[data-slot="block-celebration-amount"]' })
        : screen.getAllByText(/99\.99/)[1]; // Fallback to second match (visible one)
      expect(amount).toBeInTheDocument();
    });

    it('formats GBP currency', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={50.00} currency="GBP" />
        </BlockCelebration>
      );
      // Check the amount element specifically, not the screen reader text
      const amount = screen.getByText(/50\.00/, { selector: '[data-slot="block-celebration-amount"]' });
      expect(amount).toBeInTheDocument();
    });
  });

  describe('Level Variants', () => {
    it('applies first level styling', () => {
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const card = screen.getByText('$10.00').closest('[data-slot="block-celebration"]');
      expect(card?.className).toMatch(/animate-pulse-glow/);
    });

    it('applies milestone level styling', () => {
      render(
        <BlockCelebration level="milestone">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const card = screen.getByText('$10.00').closest('[data-slot="block-celebration"]');
      expect(card).toBeInTheDocument();
      expect(card?.className).toMatch(/border-success/);
    });

    it('applies subtle level styling without glow animation', () => {
      render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const card = screen.getByText('$10.00').closest('[data-slot="block-celebration"]');
      expect(card?.className).not.toMatch(/animate-pulse-glow/);
    });
  });

  describe('Compound Usage', () => {
    it('renders full compound structure', () => {
      const handleShare = vi.fn();
      render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
          <BlockCelebration.Merchant name="TrialService" anonymize={false} />
          <BlockCelebration.ShareZone>
            <span>Screenshot this!</span>
          </BlockCelebration.ShareZone>
          <BlockCelebration.ShareButton onShare={handleShare} />
        </BlockCelebration>
      );

      expect(screen.getByText('$47.98')).toBeInTheDocument();
      expect(screen.getByText('TrialService')).toBeInTheDocument();
      expect(screen.getByText('Screenshot this!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });

    it('works with minimal children', () => {
      render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={5.99} />
        </BlockCelebration>
      );
      expect(screen.getByText('$5.99')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('merges custom className with default classes', () => {
      render(
        <BlockCelebration level="first" className="custom-celebration-class">
          <BlockCelebration.Amount value={10} />
        </BlockCelebration>
      );
      const card = screen.getByText('$10.00').closest('[data-slot="block-celebration"]');
      expect(card?.className).toContain('custom-celebration-class');
    });
  });

  describe('Accessibility (jest-axe)', () => {
    it('should have no accessibility violations with amount only', async () => {
      const { container } = render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
        </BlockCelebration>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with full compound structure', async () => {
      const { container } = render(
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
          <BlockCelebration.Merchant name="TrialService" />
          <BlockCelebration.ShareButton onShare={vi.fn()} />
        </BlockCelebration>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with anonymized merchant', async () => {
      const { container } = render(
        <BlockCelebration level="milestone">
          <BlockCelebration.Amount value={25.00} />
          <BlockCelebration.Merchant name="Secret" anonymize />
        </BlockCelebration>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with subtle level', async () => {
      const { container } = render(
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={5.99} />
        </BlockCelebration>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});