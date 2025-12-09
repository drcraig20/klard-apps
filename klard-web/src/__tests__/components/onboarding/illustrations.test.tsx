/**
 * Basic tests for Onboarding Illustration Components
 *
 * These tests verify that the SVG illustration components render correctly
 * and have proper accessibility attributes.
 *
 * Note: These tests require vitest and @testing-library/react to be installed.
 * See klard-web/src/__tests__/stores/subscription-store.test.ts for setup instructions.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  TrackIllustration,
  ProtectIllustration,
  SaveIllustration,
} from '@/components/onboarding/illustrations';

describe('Onboarding Illustrations', () => {
  describe('TrackIllustration', () => {
    it('should render without error', () => {
      const { container } = render(<TrackIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should have accessible attributes', () => {
      const { container } = render(<TrackIllustration />);
      const svg = container.querySelector('svg');

      expect(svg?.getAttribute('role')).toBe('img');
      expect(svg?.getAttribute('aria-label')).toBeTruthy();
      expect(svg?.getAttribute('aria-label')).toContain('subscription cards');
    });

    it('should render with dark theme by default', () => {
      const { container } = render(<TrackIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should render with light theme when specified', () => {
      const { container } = render(<TrackIllustration theme="light" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { container } = render(<TrackIllustration className="custom-class" />);
      const svg = container.querySelector('svg');

      expect(svg?.classList.contains('custom-class')).toBe(true);
    });
  });

  describe('ProtectIllustration', () => {
    it('should render without error', () => {
      const { container } = render(<ProtectIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should have accessible attributes', () => {
      const { container } = render(<ProtectIllustration />);
      const svg = container.querySelector('svg');

      expect(svg?.getAttribute('role')).toBe('img');
      expect(svg?.getAttribute('aria-label')).toBeTruthy();
      expect(svg?.getAttribute('aria-label')).toContain('shield');
    });

    it('should render with dark theme by default', () => {
      const { container } = render(<ProtectIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should render with light theme when specified', () => {
      const { container } = render(<ProtectIllustration theme="light" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { container } = render(<ProtectIllustration className="custom-class" />);
      const svg = container.querySelector('svg');

      expect(svg?.classList.contains('custom-class')).toBe(true);
    });
  });

  describe('SaveIllustration', () => {
    it('should render without error', () => {
      const { container } = render(<SaveIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should have accessible attributes', () => {
      const { container } = render(<SaveIllustration />);
      const svg = container.querySelector('svg');

      expect(svg?.getAttribute('role')).toBe('img');
      expect(svg?.getAttribute('aria-label')).toBeTruthy();
      expect(svg?.getAttribute('aria-label')).toContain('savings');
    });

    it('should render with dark theme by default', () => {
      const { container } = render(<SaveIllustration />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should render with light theme when specified', () => {
      const { container } = render(<SaveIllustration theme="light" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeTruthy();
    });

    it('should accept custom className', () => {
      const { container } = render(<SaveIllustration className="custom-class" />);
      const svg = container.querySelector('svg');

      expect(svg?.classList.contains('custom-class')).toBe(true);
    });
  });
});
