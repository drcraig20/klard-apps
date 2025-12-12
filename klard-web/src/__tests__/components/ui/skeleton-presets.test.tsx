/**
 * Tests for Skeleton Preset Components (Web)
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  SubscriptionCardSkeleton,
  AvatarSkeleton,
  TextLineSkeleton,
} from '@/components/ui/skeleton-presets';

describe('Skeleton Presets', () => {
  describe('SubscriptionCardSkeleton', () => {
    it('should render subscription card skeleton structure', () => {
      const { container } = render(<SubscriptionCardSkeleton />);

      // Should have avatar skeleton (circular)
      const circular = container.querySelector('.rounded-full');
      expect(circular).toBeInTheDocument();

      // Should have multiple text skeletons
      const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
      expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('AvatarSkeleton', () => {
    it('should render circular skeleton with default size', () => {
      const { container } = render(<AvatarSkeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass('rounded-full');
      expect(skeleton).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('should accept custom size', () => {
      const { container } = render(<AvatarSkeleton size={64} />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '64px', height: '64px' });
    });
  });

  describe('TextLineSkeleton', () => {
    it('should render text line skeleton', () => {
      const { container } = render(<TextLineSkeleton />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveClass('h-4');
    });

    it('should accept custom width', () => {
      const { container } = render(<TextLineSkeleton width={200} />);

      const skeleton = container.querySelector('[data-slot="skeleton"]');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });
  });
});
