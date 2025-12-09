import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { ServiceGrid } from '@/components/onboarding/ServiceGrid';
import { POPULAR_SERVICES } from '@klard-apps/commons';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
}));

describe('ServiceGrid', () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without error', () => {
      const { getByPlaceholderText } = render(<ServiceGrid {...defaultProps} />);

      expect(getByPlaceholderText('Search services...')).toBeTruthy();
    });

    it('should render 8 services initially', () => {
      const { getAllByRole } = render(<ServiceGrid {...defaultProps} />);

      const buttons = getAllByRole('button');
      expect(buttons).toHaveLength(8);
    });

    it('should render service names', () => {
      const { getByText } = render(<ServiceGrid {...defaultProps} />);

      // Check first few services from POPULAR_SERVICES
      expect(getByText('Netflix')).toBeTruthy();
      expect(getByText('Spotify')).toBeTruthy();
      expect(getByText('Amazon Prime')).toBeTruthy();
    });

    it('should render with selected service', () => {
      const selectedServiceId = 'netflix';
      const { getByLabelText } = render(
        <ServiceGrid {...defaultProps} selectedServiceId={selectedServiceId} />
      );

      const selectedButton = getByLabelText('Select Netflix');
      expect(selectedButton).toBeTruthy();
    });
  });

  describe('Search Functionality', () => {
    it('should filter services by name', () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <ServiceGrid {...defaultProps} />
      );

      const searchInput = getByPlaceholderText('Search services...');

      // Search for Netflix
      fireEvent.changeText(searchInput, 'Netflix');

      expect(getByText('Netflix')).toBeTruthy();
      expect(queryByText('Spotify')).toBeNull();
    });

    it('should be case-insensitive when filtering', () => {
      const { getByPlaceholderText, getByText } = render(
        <ServiceGrid {...defaultProps} />
      );

      const searchInput = getByPlaceholderText('Search services...');

      // Search with lowercase
      fireEvent.changeText(searchInput, 'netflix');

      expect(getByText('Netflix')).toBeTruthy();
    });

    it('should show partial matches', () => {
      const { getByPlaceholderText, getByText } = render(
        <ServiceGrid {...defaultProps} />
      );

      const searchInput = getByPlaceholderText('Search services...');

      // Search for "spot" should match "Spotify"
      fireEvent.changeText(searchInput, 'spot');

      expect(getByText('Spotify')).toBeTruthy();
    });

    it('should limit filtered results to 8 services', () => {
      const { getByPlaceholderText, getAllByRole } = render(
        <ServiceGrid {...defaultProps} />
      );

      const searchInput = getByPlaceholderText('Search services...');

      // Clear search to potentially show more than 8
      fireEvent.changeText(searchInput, '');

      const buttons = getAllByRole('button');
      expect(buttons.length).toBeLessThanOrEqual(8);
    });
  });

  describe('Selection Interaction', () => {
    it('should call onSelect with service data when pressed', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'netflix',
          name: 'Netflix',
          category: 'streaming',
        })
      );
    });

    it('should trigger haptic feedback on press', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      expect(Haptics.selectionAsync).toHaveBeenCalledTimes(1);
    });

    it('should call haptic feedback before onSelect callback', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      const callOrder: string[] = [];

      (Haptics.selectionAsync as jest.Mock).mockImplementation(() => {
        callOrder.push('haptic');
      });

      mockOnSelect.mockImplementation(() => {
        callOrder.push('onSelect');
      });

      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      expect(callOrder).toEqual(['haptic', 'onSelect']);
    });
  });

  describe('Selected State Styling', () => {
    it('should apply selected styling to selected service', () => {
      const { getByLabelText } = render(
        <ServiceGrid {...defaultProps} selectedServiceId="netflix" />
      );

      const netflixButton = getByLabelText('Select Netflix');
      const spotifyButton = getByLabelText('Select Spotify');

      // Selected button should have selected state
      expect(netflixButton.props.accessibilityState).toEqual({ selected: true });
      expect(spotifyButton.props.accessibilityState).toEqual({ selected: false });
    });

    it('should update selected state when different service is selected', () => {
      const { getByLabelText, rerender } = render(
        <ServiceGrid {...defaultProps} selectedServiceId="netflix" />
      );

      const netflixButton = getByLabelText('Select Netflix');
      expect(netflixButton.props.accessibilityState).toEqual({ selected: true });

      // Rerender with different selected service
      rerender(
        <ServiceGrid {...defaultProps} selectedServiceId="spotify" />
      );

      const spotifyButton = getByLabelText('Select Spotify');
      expect(spotifyButton.props.accessibilityState).toEqual({ selected: true });
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility role for service buttons', () => {
      const { getAllByRole } = render(<ServiceGrid {...defaultProps} />);

      const buttons = getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should have descriptive accessibility labels', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      expect(getByLabelText('Select Netflix')).toBeTruthy();
      expect(getByLabelText('Select Spotify')).toBeTruthy();
      expect(getByLabelText('Select Amazon Prime')).toBeTruthy();
    });

    it('should indicate selected state in accessibility state', () => {
      const { getByLabelText } = render(
        <ServiceGrid {...defaultProps} selectedServiceId="netflix" />
      );

      const netflixButton = getByLabelText('Select Netflix');
      expect(netflixButton.props.accessibilityState.selected).toBe(true);
    });

    it('should have proper placeholder for search input', () => {
      const { getByPlaceholderText } = render(<ServiceGrid {...defaultProps} />);

      expect(getByPlaceholderText('Search services...')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search results gracefully', () => {
      const { getByPlaceholderText, queryAllByRole } = render(
        <ServiceGrid {...defaultProps} />
      );

      const searchInput = getByPlaceholderText('Search services...');
      fireEvent.changeText(searchInput, 'nonexistentservice12345');

      const buttons = queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('should handle selection of undefined service gracefully', () => {
      const { getByLabelText } = render(
        <ServiceGrid {...defaultProps} selectedServiceId={undefined} />
      );

      const netflixButton = getByLabelText('Select Netflix');
      expect(netflixButton.props.accessibilityState.selected).toBe(false);
    });

    it('should handle selection of non-existent service id', () => {
      const { getByLabelText } = render(
        <ServiceGrid {...defaultProps} selectedServiceId="non-existent-id" />
      );

      const netflixButton = getByLabelText('Select Netflix');
      expect(netflixButton.props.accessibilityState.selected).toBe(false);
    });
  });

  describe('Data Integration', () => {
    it('should use POPULAR_SERVICES from commons', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      // Verify we're using actual data from commons
      POPULAR_SERVICES.slice(0, 8).forEach(service => {
        expect(getByLabelText(`Select ${service.name}`)).toBeTruthy();
      });
    });

    it('should pass complete service object to onSelect', () => {
      const { getByLabelText } = render(<ServiceGrid {...defaultProps} />);

      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          defaultPrice: expect.any(Number),
          defaultCycle: expect.any(String),
          category: expect.any(String),
          color: expect.any(String),
        })
      );
    });
  });
});
