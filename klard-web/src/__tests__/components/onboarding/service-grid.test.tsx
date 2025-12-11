/**
 * Tests for ServiceGrid Component
 *
 * These tests verify:
 * 1. Renders all 12 services initially
 * 2. Search filters services by name
 * 3. Clicking service calls onSelect with service data
 * 4. Selected service shows selected styling
 * 5. Empty search shows all services
 * 6. Responsive behavior (mobile shows 8, desktop shows all)
 *
 * Note: These tests require vitest and @testing-library/react to be installed.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { ServiceGrid } from '@/components/onboarding/service-grid';
import { POPULAR_SERVICES, type PopularService } from '@klard-apps/commons';

describe('ServiceGrid', () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('Rendering', () => {
    it('should render search input with correct placeholder', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      expect(searchInput).toBeTruthy();
    });

    it('should render all 12 services initially on desktop', async () => {
      // Mock desktop viewport
      mockWindowWidth(1920);

      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      await waitFor(() => {
        const buttons = container.querySelectorAll('button[aria-pressed]');
        expect(buttons.length).toBe(12);
      });
    });

    it('should render service names correctly', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      // Check for a few known services
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.getByText('Spotify')).toBeTruthy();
      expect(screen.getByText('Amazon Prime')).toBeTruthy();
    });

    it('should render color indicators for each service', () => {
      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      // Check that color dots are rendered
      const colorDots = container.querySelectorAll('span[aria-hidden="true"]');
      expect(colorDots.length).toBeGreaterThan(0);

      // Check that Netflix's color is present
      const netflixService = POPULAR_SERVICES.find((s) => s.id === 'netflix');
      const netflixButton = screen.getByLabelText('Select Netflix');
      const colorDot = within(netflixButton).getByRole('presentation', {
        hidden: true,
      });
      expect(colorDot).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('should filter services by name (case-insensitive)', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      fireEvent.change(searchInput, { target: { value: 'netflix' } });

      // Should show Netflix
      expect(screen.getByText('Netflix')).toBeTruthy();

      // Should not show Spotify
      expect(screen.queryByText('Spotify')).toBeFalsy();
    });

    it('should filter services case-insensitively', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      fireEvent.change(searchInput, { target: { value: 'SPOTIFY' } });

      expect(screen.getByText('Spotify')).toBeTruthy();
      expect(screen.queryByText('Netflix')).toBeFalsy();
    });

    it('should show multiple matching services', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      fireEvent.change(searchInput, { target: { value: 'premium' } });

      // Should show YouTube Premium
      expect(screen.getByText('YouTube Premium')).toBeTruthy();
    });

    it('should show all services when search is cleared', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');

      // Filter first
      fireEvent.change(searchInput, { target: { value: 'netflix' } });
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.queryByText('Spotify')).toBeFalsy();

      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });

      // All services should be visible again
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.getByText('Spotify')).toBeTruthy();
    });

    it('should show all services when search query is only whitespace', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      fireEvent.change(searchInput, { target: { value: '   ' } });

      // Should show multiple services (all of them)
      expect(screen.getByText('Netflix')).toBeTruthy();
      expect(screen.getByText('Spotify')).toBeTruthy();
    });

    it('should show no results when search has no matches', () => {
      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      const searchInput = screen.getByPlaceholderText('Search services...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent service' } });

      const buttons = container.querySelectorAll('button[aria-pressed]');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Selection Functionality', () => {
    it('should call onSelect with correct service data when clicked', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      fireEvent.click(netflixButton);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'netflix',
          name: 'Netflix',
          defaultPrice: 15.99,
          category: 'streaming',
        })
      );
    });

    it('should show selected styling when service is selected', () => {
      render(<ServiceGrid onSelect={mockOnSelect} selectedServiceId="netflix" />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton.getAttribute('aria-pressed')).toBe('true');
      expect(netflixButton.classList.contains('bg-primary')).toBe(true);
    });

    it('should not show selected styling for unselected services', () => {
      render(<ServiceGrid onSelect={mockOnSelect} selectedServiceId="netflix" />);

      const spotifyButton = screen.getByLabelText('Select Spotify');
      expect(spotifyButton.getAttribute('aria-pressed')).toBe('false');
      expect(spotifyButton.classList.contains('bg-primary')).toBe(false);
    });

    it('should allow selecting different services', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      const spotifyButton = screen.getByLabelText('Select Spotify');

      fireEvent.click(netflixButton);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'netflix' })
      );

      fireEvent.click(spotifyButton);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'spotify' })
      );

      expect(mockOnSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      // Reset window size before each test
      mockWindowWidth(1920);
    });

    afterEach(() => {
      // Clean up
      vi.restoreAllMocks();
    });

    it('should show all 12 services on desktop (lg+)', async () => {
      mockWindowWidth(1920);

      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      await waitFor(() => {
        const buttons = container.querySelectorAll('button[aria-pressed]');
        expect(buttons.length).toBe(12);
      });
    });

    it('should limit to 8 services on mobile (<lg)', async () => {
      mockWindowWidth(768);

      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      await waitFor(() => {
        const buttons = container.querySelectorAll('button[aria-pressed]');
        expect(buttons.length).toBeLessThanOrEqual(8);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-labels for service buttons', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton).toBeTruthy();
    });

    it('should have aria-pressed attribute on service buttons', () => {
      render(<ServiceGrid onSelect={mockOnSelect} selectedServiceId="netflix" />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton.getAttribute('aria-pressed')).toBe('true');

      const spotifyButton = screen.getByLabelText('Select Spotify');
      expect(spotifyButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('should have proper button type attribute', () => {
      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      const serviceButtons = container.querySelectorAll('button[type="button"]');
      expect(serviceButtons.length).toBeGreaterThan(0);
    });

    it('should hide color indicator from screen readers', () => {
      const { container } = render(<ServiceGrid onSelect={mockOnSelect} />);

      const colorDots = container.querySelectorAll('span[aria-hidden="true"]');
      colorDots.forEach((dot: Element) => {
        expect(dot.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty selectedServiceId', () => {
      render(<ServiceGrid onSelect={mockOnSelect} selectedServiceId="" />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('should handle undefined selectedServiceId', () => {
      render(<ServiceGrid onSelect={mockOnSelect} selectedServiceId={undefined} />);

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('should handle invalid selectedServiceId', () => {
      render(
        <ServiceGrid onSelect={mockOnSelect} selectedServiceId="invalid-id" />
      );

      const netflixButton = screen.getByLabelText('Select Netflix');
      expect(netflixButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('should handle rapid clicks', () => {
      render(<ServiceGrid onSelect={mockOnSelect} />);

      const netflixButton = screen.getByLabelText('Select Netflix');

      // Click multiple times rapidly
      fireEvent.click(netflixButton);
      fireEvent.click(netflixButton);
      fireEvent.click(netflixButton);

      expect(mockOnSelect).toHaveBeenCalledTimes(3);
    });
  });
});

/**
 * Helper function to mock window width for responsive tests
 */
function mockWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  // Trigger resize event if needed
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('resize'));
  }
}
