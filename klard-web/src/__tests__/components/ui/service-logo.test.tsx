/**
 * Tests for ServiceLogo Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, fallback text, logo display
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceLogo } from '@/components/ui/service-logo';

describe('ServiceLogo', () => {
  const mockService = {
    name: 'Netflix',
    logoUrl: 'https://example.com/netflix-logo.png',
  };

  const mockServiceNoLogo = {
    name: 'Spotify',
  };

  describe('Rendering', () => {
    it('should render with data-slot attribute', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="md" />
      );

      const logo = container.querySelector('[data-slot="service-logo"]');
      expect(logo).toBeInTheDocument();
    });

    it('should render fallback with first character of service name when no logo', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="md" />);

      expect(screen.getByText('S')).toBeInTheDocument();
    });

    it('should render image when service has logoUrl', () => {
      render(<ServiceLogo service={mockService} size="md" />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Netflix');
    });
  });

  describe('Sizes', () => {
    it('should apply xs size classes (h-6 w-6)', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="xs" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-6/);
      expect(avatar?.className).toMatch(/w-6/);
    });

    it('should apply sm size classes (h-8 w-8)', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="sm" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-8/);
      expect(avatar?.className).toMatch(/w-8/);
    });

    it('should apply md size classes (h-10 w-10)', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="md" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-10/);
      expect(avatar?.className).toMatch(/w-10/);
    });

    it('should apply lg size classes (h-12 w-12)', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="lg" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-12/);
      expect(avatar?.className).toMatch(/w-12/);
    });
  });

  describe('Fallback Generation', () => {
    it('should uppercase the first character for fallback', () => {
      render(
        <ServiceLogo service={{ name: 'hulu' }} size="md" />
      );

      expect(screen.getByText('H')).toBeInTheDocument();
    });

    it('should handle service names starting with lowercase', () => {
      render(
        <ServiceLogo service={{ name: 'disney+' }} size="md" />
      );

      expect(screen.getByText('D')).toBeInTheDocument();
    });
  });

  describe('Shape', () => {
    it('should always render as circle shape', () => {
      const { container } = render(
        <ServiceLogo service={mockServiceNoLogo} size="md" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toContain('rounded-full');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with wrapper', () => {
      const { container } = render(
        <ServiceLogo
          service={mockServiceNoLogo}
          size="md"
          className="custom-class"
        />
      );

      const wrapper = container.querySelector('[data-slot="service-logo"]');
      expect(wrapper?.className).toContain('custom-class');
    });
  });
});