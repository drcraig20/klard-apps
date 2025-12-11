/**
 * Tests for ProgressBar Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ProgressBar } from '@/components/ui/ProgressBar';

// Mock hooks
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    accentSuccess: '#059669',
    accentWarning: '#D97706',
    accentError: '#DC2626',
    muted: '#E2E8F0',
    textSecondary: '#64748B',
  }),
}));

describe('ProgressBar', () => {
  describe('Rendering', () => {
    it('should render progress bar container', () => {
      render(<ProgressBar value={50} />);

      expect(screen.getByTestId('progress-bar-container')).toBeTruthy();
    });

    it('should render progress track', () => {
      render(<ProgressBar value={50} />);

      expect(screen.getByTestId('progress-track')).toBeTruthy();
    });

    it('should render progress fill', () => {
      render(<ProgressBar value={50} />);

      expect(screen.getByTestId('progress-fill')).toBeTruthy();
    });

    it('should have progressbar accessibility role', () => {
      render(<ProgressBar value={50} />);

      const container = screen.getByTestId('progress-bar-container');
      expect(container.props.accessibilityRole).toBe('progressbar');
    });
  });

  describe('Sizes', () => {
    it('should apply sm height (4px)', () => {
      render(<ProgressBar value={50} size="sm" />);

      const track = screen.getByTestId('progress-track');
      expect(track.props.style).toMatchObject({ height: 4 });
    });

    it('should apply md height by default (8px)', () => {
      render(<ProgressBar value={50} />);

      const track = screen.getByTestId('progress-track');
      expect(track.props.style).toMatchObject({ height: 8 });
    });

    it('should apply lg height (12px)', () => {
      render(<ProgressBar value={50} size="lg" />);

      const track = screen.getByTestId('progress-track');
      expect(track.props.style).toMatchObject({ height: 12 });
    });
  });

  describe('Labels', () => {
    it('should display percentage when showLabel is true', () => {
      render(<ProgressBar value={75} showLabel />);

      expect(screen.getByText('75%')).toBeTruthy();
    });

    it('should display custom label when provided', () => {
      render(<ProgressBar value={50} label="Loading..." />);

      expect(screen.getByText('Loading...')).toBeTruthy();
    });

    it('should display both label and percentage', () => {
      render(<ProgressBar value={50} label="Progress" showLabel />);

      expect(screen.getByText('Progress')).toBeTruthy();
      expect(screen.getByText('50%')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility value', () => {
      render(<ProgressBar value={75} />);

      const container = screen.getByTestId('progress-bar-container');
      expect(container.props.accessibilityValue).toEqual({
        now: 75,
        min: 0,
        max: 100,
      });
    });

    it('should respect custom max value in accessibility', () => {
      render(<ProgressBar value={25} max={50} />);

      const container = screen.getByTestId('progress-bar-container');
      expect(container.props.accessibilityValue).toEqual({
        now: 50, // 25/50 = 50%
        min: 0,
        max: 100,
      });
    });
  });
});
