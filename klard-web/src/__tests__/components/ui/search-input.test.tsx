/**
 * Tests for SearchInput Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, search icon, placeholder, clear button, loading, debounce
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SearchInput } from '@/components/ui/search-input';

describe('SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render with search icon', () => {
      render(<SearchInput value="" onChange={() => {}} />);

      const searchIcon = document.querySelector('[data-slot="search-icon"]');
      expect(searchIcon).toBeTruthy();
    });

    it('should render with data-slot attribute', () => {
      const { container } = render(<SearchInput value="" onChange={() => {}} />);

      const wrapper = container.querySelector('[data-slot="search-input"]');
      expect(wrapper).toBeTruthy();
    });

    it('should render with default placeholder', () => {
      render(<SearchInput value="" onChange={() => {}} />);

      expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
    });

    it('should render with custom placeholder', () => {
      render(<SearchInput value="" onChange={() => {}} placeholder="Find subscriptions" />);

      expect(screen.getByPlaceholderText('Find subscriptions')).toBeTruthy();
    });

    it('should render as searchbox role with type search', () => {
      render(<SearchInput value="" onChange={() => {}} />);

      expect(screen.getByRole('searchbox')).toBeTruthy();
      expect(screen.getByPlaceholderText('Search...')).toHaveAttribute('type', 'search');
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when value is present', () => {
      render(<SearchInput value="test" onChange={() => {}} />);

      expect(screen.getByLabelText('Clear search')).toBeTruthy();
    });

    it('should not show clear button when value is empty', () => {
      render(<SearchInput value="" onChange={() => {}} />);

      expect(screen.queryByLabelText('Clear search')).toBeNull();
    });

    it('should call onChange with empty string when clear is clicked', () => {
      const handleChange = vi.fn();
      render(<SearchInput value="test" onChange={handleChange} />);

      fireEvent.click(screen.getByLabelText('Clear search'));

      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should call onSearch with empty string when clear is clicked', () => {
      const handleSearch = vi.fn();
      render(<SearchInput value="test" onChange={() => {}} onSearch={handleSearch} />);

      fireEvent.click(screen.getByLabelText('Clear search'));

      expect(handleSearch).toHaveBeenCalledWith('');
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading is true', () => {
      render(<SearchInput value="test" onChange={() => {}} loading />);

      const spinner = document.querySelector('[data-slot="loading-spinner"]');
      expect(spinner).toBeTruthy();
    });

    it('should hide clear button when loading', () => {
      render(<SearchInput value="test" onChange={() => {}} loading />);

      expect(screen.queryByLabelText('Clear search')).toBeNull();
    });

    it('should not show spinner when not loading', () => {
      render(<SearchInput value="test" onChange={() => {}} loading={false} />);

      const spinner = document.querySelector('[data-slot="loading-spinner"]');
      expect(spinner).toBeNull();
    });
  });

  describe('Value and Change Handling', () => {
    it('should display controlled value', () => {
      render(<SearchInput value="test value" onChange={() => {}} />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveValue('test value');
    });

    it('should call onChange immediately when typing', () => {
      const handleChange = vi.fn();
      render(<SearchInput value="" onChange={handleChange} />);

      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'new value' } });

      expect(handleChange).toHaveBeenCalledWith('new value');
    });
  });

  describe('Debounced Search', () => {
    it('should call onSearch after debounce delay', () => {
      const handleSearch = vi.fn();
      render(
        <SearchInput
          value=""
          onChange={() => {}}
          onSearch={handleSearch}
          debounceMs={300}
        />
      );

      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleSearch).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('should use default debounce of 300ms', () => {
      const handleSearch = vi.fn();
      render(<SearchInput value="" onChange={() => {}} onSearch={handleSearch} />);

      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'test' } });

      act(() => {
        vi.advanceTimersByTime(299);
      });
      expect(handleSearch).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('should debounce multiple rapid inputs', () => {
      const handleSearch = vi.fn();
      render(
        <SearchInput
          value=""
          onChange={() => {}}
          onSearch={handleSearch}
          debounceMs={300}
        />
      );

      const input = screen.getByRole('searchbox');

      fireEvent.change(input, { target: { value: 't' } });
      act(() => { vi.advanceTimersByTime(100); });

      fireEvent.change(input, { target: { value: 'te' } });
      act(() => { vi.advanceTimersByTime(100); });

      fireEvent.change(input, { target: { value: 'tes' } });
      act(() => { vi.advanceTimersByTime(100); });

      fireEvent.change(input, { target: { value: 'test' } });
      act(() => { vi.advanceTimersByTime(300); });

      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<SearchInput value="" onChange={() => {}} disabled />);

      const input = screen.getByRole('searchbox');
      expect(input).toBeDisabled();
    });

    it('should disable clear button when input is disabled', () => {
      render(<SearchInput value="test" onChange={() => {}} disabled />);

      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeDisabled();
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const { container } = render(
        <SearchInput value="" onChange={() => {}} className="custom-class" />
      );

      const wrapper = container.querySelector('[data-slot="search-input"]');
      expect(wrapper?.className).toContain('custom-class');
    });
  });
});
