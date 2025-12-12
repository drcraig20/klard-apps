/**
 * Tests for CurrencyInput Component
 *
 * These tests verify:
 * 1. Renders with currency symbol
 * 2. Formats value with decimal places
 * 3. Handles numeric input parsing
 * 4. Different currency support
 * 5. Label and error display
 * 6. Min/max validation
 * 7. Disabled state
 * 8. Accessibility
 * 9. Size variants
 * 10. Edge cases
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyInput } from '@/components/ui/currency-input';

describe('CurrencyInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with USD symbol by default', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      expect(screen.getByText('$')).toBeTruthy();
    });

    it('should render with label when provided', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} label="Amount" />);

      expect(screen.getByText('Amount')).toBeTruthy();
    });

    it('should render input with formatted value', () => {
      render(<CurrencyInput value={99.5} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('99.50');
    });

    it('should format value with 2 decimal places', () => {
      render(<CurrencyInput value={100} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('100.00');
    });

    it('should show 0.00 for empty/zero value', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('0.00');
    });
  });

  describe('Currency Support', () => {
    it('should display EUR symbol for EUR currency', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} currency="EUR" />);

      expect(screen.getByText('€')).toBeTruthy();
    });

    it('should display GBP symbol for GBP currency', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} currency="GBP" />);

      expect(screen.getByText('£')).toBeTruthy();
    });

    it('should display CAD symbol for CAD currency', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} currency="CAD" />);

      expect(screen.getByText('C$')).toBeTruthy();
    });

    it('should display AUD symbol for AUD currency', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} currency="AUD" />);

      expect(screen.getByText('A$')).toBeTruthy();
    });

    it('should display currency code for unsupported currencies', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} currency="JPY" />);

      expect(screen.getByText('JPY')).toBeTruthy();
    });
  });

  describe('Input Handling', () => {
    it('should call onChange with parsed number value', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '123.45' } });

      expect(mockOnChange).toHaveBeenCalledWith(123.45);
    });

    it('should strip non-numeric characters except decimal', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '$1,234.56abc' } });

      expect(mockOnChange).toHaveBeenCalledWith(1234.56);
    });

    it('should sanitize input and call onChange with numeric value', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '$19.5a' } });
      expect(mockOnChange).toHaveBeenCalledWith(19.5);
    });

    it('should call onChange with 0 for empty input', () => {
      render(<CurrencyInput value={100} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '' } });

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should handle decimal point only input', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '.' } });

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Min/Max Validation', () => {
    it('should clamp value to min when below minimum', () => {
      render(<CurrencyInput value={10} onChange={mockOnChange} min={5} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '3' } });

      expect(mockOnChange).toHaveBeenCalledWith(5);
    });

    it('should clamp value to max when above maximum', () => {
      render(<CurrencyInput value={10} onChange={mockOnChange} max={100} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '150' } });

      expect(mockOnChange).toHaveBeenCalledWith(100);
    });

    it('should allow values within min/max range', () => {
      render(<CurrencyInput value={10} onChange={mockOnChange} min={0} max={100} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '50' } });

      expect(mockOnChange).toHaveBeenCalledWith(50);
    });

    it('should clamp when both min and max are violated', () => {
      const handleChange = vi.fn();
      render(<CurrencyInput value={0} onChange={handleChange} min={10} max={20} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '2' } });
      expect(handleChange).toHaveBeenCalledWith(10);
      fireEvent.change(input, { target: { value: '99' } });
      expect(handleChange).toHaveBeenCalledWith(20);
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} error="Invalid amount" />);

      expect(screen.getByText('Invalid amount')).toBeTruthy();
    });

    it('should have error role on error message', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} error="Invalid amount" />);

      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('should apply error aria wiring and styles', () => {
      render(<CurrencyInput value={5} onChange={mockOnChange} error="Required" helperText="Helper" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent('Required');
      expect(input.getAttribute('aria-describedby')).toContain(error.id);
      // Error should hide helper text
      expect(screen.queryByText('Helper')).toBeNull();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when no error', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} helperText="Enter amount" />);

      expect(screen.getByText('Enter amount')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} helperText="Enter amount" error="Invalid" />);

      expect(screen.queryByText('Enter amount')).toBeNull();
      expect(screen.getByText('Invalid')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} disabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should have disabled styling', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} disabled />);

      const input = screen.getByRole('textbox');
      expect(input.className).toMatch(/opacity-50|cursor-not-allowed/);
    });
  });

  describe('Styling', () => {
    it('should apply shared form field styles', () => {
      render(<CurrencyInput value={1} onChange={mockOnChange} />);
      const input = screen.getByRole('textbox');
      expect(input.className).toMatch(/h-12/); // shared styles use h-12
    });

    it('should apply left icon padding for currency symbol', () => {
      render(<CurrencyInput value={1} onChange={mockOnChange} />);
      const input = screen.getByRole('textbox');
      expect(input.className).toMatch(/pl-11/); // hasLeftIcon variant
    });
  });

  describe('Accessibility', () => {
    it('should have inputMode decimal for mobile keyboards', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('inputMode')).toBe('decimal');
    });

    it('should link label to input via htmlFor', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} label="Price" id="price" />);

      const label = screen.getByText('Price');
      expect(label.getAttribute('for')).toBe('price');
    });

    it('should set aria-invalid when error is present', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} error="Error" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have data-slot attribute', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('data-slot')).toBe('input');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      render(<CurrencyInput value={999999999.99} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('999999999.99');
    });

    it('should handle negative values as 0', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '-50' } });

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should handle multiple decimal points', () => {
      render(<CurrencyInput value={0} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '12.34.56' } });

      // Should take first valid decimal
      expect(mockOnChange).toHaveBeenCalledWith(12.34);
    });

    it('should round to 2 decimal places on display', () => {
      render(<CurrencyInput value={12.345} onChange={mockOnChange} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('12.35');
    });
  });
});
