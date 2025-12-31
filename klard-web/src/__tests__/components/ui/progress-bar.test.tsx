/**
 * Tests for ProgressBar Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, variants, labels, accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '@/components/ui/progress-bar';

describe('ProgressBar', () => {
  describe('Rendering', () => {
    it('should render progress bar container', () => {
      render(<ProgressBar value={50} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('should render with data-slot attribute', () => {
      const { container } = render(<ProgressBar value={50} />);

      const progress = container.querySelector('[data-slot="progress"]');
      expect(progress).toBeInTheDocument();
    });

    it('should render indicator with data-slot attribute', () => {
      const { container } = render(<ProgressBar value={50} />);

      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size class (h-1)', () => {
      const { container } = render(<ProgressBar value={50} size="sm" />);

      const progress = container.querySelector('[data-slot="progress"]');
      expect(progress?.className).toMatch(/h-1/);
    });

    it('should apply md size class by default (h-2)', () => {
      const { container } = render(<ProgressBar value={50} />);

      const progress = container.querySelector('[data-slot="progress"]');
      expect(progress?.className).toMatch(/h-2/);
    });

    it('should apply lg size class (h-3)', () => {
      const { container } = render(<ProgressBar value={50} size="lg" />);

      const progress = container.querySelector('[data-slot="progress"]');
      expect(progress?.className).toMatch(/h-3/);
    });
  });

  describe('Variants', () => {
    it('should apply default variant color (primary)', () => {
      const { container } = render(<ProgressBar value={50} />);

      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator?.className).toContain('bg-primary');
    });

    it('should apply success variant color (success)', () => {
      const { container } = render(<ProgressBar value={50} variant="success" />);

      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator?.className).toContain('bg-success');
    });

    it('should apply warning variant color (warning)', () => {
      const { container } = render(<ProgressBar value={50} variant="warning" />);

      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator?.className).toContain('bg-warning');
    });

    it('should apply error variant color (destructive)', () => {
      const { container } = render(<ProgressBar value={50} variant="error" />);

      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator?.className).toContain('bg-destructive');
    });
  });

  describe('Labels', () => {
    it('should display percentage when showLabel is true', () => {
      render(<ProgressBar value={75} showLabel />);

      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('should display custom label when provided', () => {
      render(<ProgressBar value={50} label="Loading..." />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display both label and percentage', () => {
      render(<ProgressBar value={50} label="Progress" showLabel />);

      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should not display label when not provided', () => {
      render(<ProgressBar value={50} />);

      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-valuenow', () => {
      render(<ProgressBar value={75} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('should have aria-valuemin', () => {
      render(<ProgressBar value={50} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax', () => {
      render(<ProgressBar value={50} max={100} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const { container } = render(
        <ProgressBar value={50} className="custom-class" />
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });
});
