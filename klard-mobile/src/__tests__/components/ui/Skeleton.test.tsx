/**
 * Tests for Skeleton Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Skeleton } from '@/components/ui/Skeleton';

// Mock hooks
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    muted: '#E2E8F0',
    mutedForeground: '#94A3B8',
  }),
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('should render skeleton container', () => {
      render(<Skeleton />);

      expect(screen.getByTestId('skeleton-container')).toBeTruthy();
    });

    it('should render shimmer element', () => {
      render(<Skeleton />);

      expect(screen.getByTestId('skeleton-shimmer')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should apply rectangular variant by default', () => {
      render(<Skeleton />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.style[1]).toMatchObject({ borderRadius: 6 });
    });

    it('should apply circular variant', () => {
      render(<Skeleton variant="circular" width={48} height={48} />);

      const container = screen.getByTestId('skeleton-container');
      // Circular should have borderRadius = width/2
      expect(container.props.style[1]).toMatchObject({ borderRadius: 24 });
    });

    it('should apply text variant with default height', () => {
      render(<Skeleton variant="text" />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.style[1]).toMatchObject({ height: 16 });
    });
  });

  describe('Dimensions', () => {
    it('should accept width prop', () => {
      render(<Skeleton width={100} />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.style[1]).toMatchObject({ width: 100 });
    });

    it('should accept height prop', () => {
      render(<Skeleton height={50} />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.style[1]).toMatchObject({ height: 50 });
    });

    it('should accept percentage width as string', () => {
      render(<Skeleton width="100%" />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.style[1]).toMatchObject({ width: '100%' });
    });
  });

  describe('Animation', () => {
    it('should render with animation by default', () => {
      render(<Skeleton />);

      // Shimmer element should be present when animated
      expect(screen.getByTestId('skeleton-shimmer')).toBeTruthy();
    });

    it('should not render shimmer when animated is false', () => {
      render(<Skeleton animated={false} />);

      expect(screen.queryByTestId('skeleton-shimmer')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible role', () => {
      render(<Skeleton />);

      const container = screen.getByTestId('skeleton-container');
      expect(container.props.accessibilityRole).toBe('none');
      expect(container.props.accessibilityLabel).toBe('Loading');
    });
  });
});
