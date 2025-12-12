/**
 * Tests for Skeleton Component (Web)
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, variants, sizes, animation, accessibility
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('should render skeleton element', () => {
      const { container } = render(<Skeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('should apply base skeleton classes', () => {
      const { container } = render(<Skeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).toContain('animate-pulse');
      expect(skeleton?.className).toContain('bg-slate-200');
    });
  });

  describe('Variants', () => {
    it('should apply rectangular variant by default', () => {
      const { container } = render(<Skeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).toContain('rounded-md');
    });

    it('should apply circular variant with rounded-full', () => {
      const { container } = render(<Skeleton variant="circular" />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).toContain('rounded-full');
    });

    it('should apply text variant with h-4 and rounded', () => {
      const { container } = render(<Skeleton variant="text" />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).toContain('h-4');
      expect(skeleton?.className).toContain('rounded');
    });
  });

  describe('Dimensions', () => {
    it('should accept width prop', () => {
      const { container } = render(<Skeleton width={100} />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '100px' });
    });

    it('should accept height prop', () => {
      const { container } = render(<Skeleton height={50} />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveStyle({ height: '50px' });
    });

    it('should accept string width', () => {
      const { container } = render(<Skeleton width="100%" />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '100%' });
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const { container } = render(<Skeleton className="custom-class" />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass('custom-class');
    });
  });

  describe('Animation', () => {
    it('should have animate-pulse class by default', () => {
      const { container } = render(<Skeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).toContain('animate-pulse');
    });

    it('should not have animate-pulse when animated is false', () => {
      const { container } = render(<Skeleton animated={false} />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton?.className).not.toContain('animate-pulse');
    });
  });
});
