/**
 * Tests for SearchInput Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { SearchInput } from '@/components/ui/SearchInput';

jest.useFakeTimers();

describe('SearchInput', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('Rendering', () => {
    it('should render with search icon', () => {
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={() => {}} />
      );

      expect(getByTestId('search-icon')).toBeTruthy();
    });

    it('should render search input container', () => {
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={() => {}} />
      );

      expect(getByTestId('search-input-container')).toBeTruthy();
    });

    it('should render with default placeholder', () => {
      const { getByPlaceholderText } = render(
        <SearchInput value="" onChangeText={() => {}} />
      );

      expect(getByPlaceholderText('Search...')).toBeTruthy();
    });

    it('should render with custom placeholder', () => {
      const { getByPlaceholderText } = render(
        <SearchInput value="" onChangeText={() => {}} placeholder="Find subscriptions" />
      );

      expect(getByPlaceholderText('Find subscriptions')).toBeTruthy();
    });

    it('should render with search return key type', () => {
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={() => {}} />
      );

      const input = getByTestId('search-input');
      expect(input.props.returnKeyType).toBe('search');
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when value is present', () => {
      const { getByLabelText } = render(
        <SearchInput value="test" onChangeText={() => {}} />
      );

      expect(getByLabelText('Clear search')).toBeTruthy();
    });

    it('should not show clear button when value is empty', () => {
      const { queryByLabelText } = render(
        <SearchInput value="" onChangeText={() => {}} />
      );

      expect(queryByLabelText('Clear search')).toBeNull();
    });

    it('should call onChangeText with empty string when clear is pressed', () => {
      const handleChange = jest.fn();
      const { getByLabelText } = render(
        <SearchInput value="test" onChangeText={handleChange} />
      );

      fireEvent.press(getByLabelText('Clear search'));

      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should call onSearch with empty string when clear is pressed', () => {
      const handleSearch = jest.fn();
      const { getByLabelText } = render(
        <SearchInput value="test" onChangeText={() => {}} onSearch={handleSearch} />
      );

      fireEvent.press(getByLabelText('Clear search'));

      expect(handleSearch).toHaveBeenCalledWith('');
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator when loading is true', () => {
      const { getByTestId } = render(
        <SearchInput value="test" onChangeText={() => {}} loading />
      );

      expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('should hide clear button when loading', () => {
      const { queryByLabelText } = render(
        <SearchInput value="test" onChangeText={() => {}} loading />
      );

      expect(queryByLabelText('Clear search')).toBeNull();
    });

    it('should not show loading indicator when not loading', () => {
      const { queryByTestId } = render(
        <SearchInput value="test" onChangeText={() => {}} loading={false} />
      );

      expect(queryByTestId('loading-indicator')).toBeNull();
    });
  });

  describe('Value and Change Handling', () => {
    it('should display controlled value', () => {
      const { getByTestId } = render(
        <SearchInput value="test value" onChangeText={() => {}} />
      );

      const input = getByTestId('search-input');
      expect(input.props.value).toBe('test value');
    });

    it('should call onChangeText immediately when typing', () => {
      const handleChange = jest.fn();
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={handleChange} />
      );

      fireEvent.changeText(getByTestId('search-input'), 'new value');

      expect(handleChange).toHaveBeenCalledWith('new value');
    });
  });

  describe('Debounced Search', () => {
    it('should call onSearch after debounce delay', () => {
      const handleSearch = jest.fn();
      const { getByTestId } = render(
        <SearchInput
          value=""
          onChangeText={() => {}}
          onSearch={handleSearch}
          debounceMs={300}
        />
      );

      fireEvent.changeText(getByTestId('search-input'), 'test');

      expect(handleSearch).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('should use default debounce of 300ms', () => {
      const handleSearch = jest.fn();
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={() => {}} onSearch={handleSearch} />
      );

      fireEvent.changeText(getByTestId('search-input'), 'test');

      act(() => {
        jest.advanceTimersByTime(299);
      });
      expect(handleSearch).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Submit Handling', () => {
    it('should call onSearch immediately on submit', () => {
      const handleSearch = jest.fn();
      const { getByTestId } = render(
        <SearchInput value="test" onChangeText={() => {}} onSearch={handleSearch} />
      );

      fireEvent(getByTestId('search-input'), 'submitEditing');

      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Disabled State', () => {
    it('should not be editable when disabled', () => {
      const { getByTestId } = render(
        <SearchInput value="" onChangeText={() => {}} editable={false} />
      );

      const input = getByTestId('search-input');
      expect(input.props.editable).toBe(false);
    });
  });
});