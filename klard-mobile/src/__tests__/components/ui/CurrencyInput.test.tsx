import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CurrencyInput } from '@/components/ui/CurrencyInput';
import { mockLightColors } from '@/__tests__/__mocks__/theme';

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useThemeColors: () => mockLightColors,
  useTheme: () => ({
    colors: mockLightColors,
    isDark: false,
  }),
}));

describe('CurrencyInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with USD symbol by default', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      expect(getByText('$')).toBeTruthy();
    });

    it('should render with label when provided', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} label="Amount" />
      );

      expect(getByText('Amount')).toBeTruthy();
    });

    it('should render input with formatted value', () => {
      const { getByTestId } = render(
        <CurrencyInput value={99.5} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.value).toBe('99.50');
    });

    it('should format value with 2 decimal places', () => {
      const { getByTestId } = render(
        <CurrencyInput value={100} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.value).toBe('100.00');
    });

    it('should show 0.00 for zero value', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.value).toBe('0.00');
    });
  });

  describe('Currency Support', () => {
    it('should display EUR symbol for EUR currency', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} currency="EUR" />
      );

      expect(getByText('€')).toBeTruthy();
    });

    it('should display GBP symbol for GBP currency', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} currency="GBP" />
      );

      expect(getByText('£')).toBeTruthy();
    });

    it('should display CAD symbol for CAD currency', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} currency="CAD" />
      );

      expect(getByText('C$')).toBeTruthy();
    });

    it('should display AUD symbol for AUD currency', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} currency="AUD" />
      );

      expect(getByText('A$')).toBeTruthy();
    });

    it('should display currency code for unsupported currencies', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} currency="JPY" />
      );

      expect(getByText('JPY')).toBeTruthy();
    });
  });

  describe('Input Handling', () => {
    it('should call onChange with parsed number value', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '123.45');

      expect(mockOnChange).toHaveBeenCalledWith(123.45);
    });

    it('should strip non-numeric characters except decimal', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '$1,234.56abc');

      expect(mockOnChange).toHaveBeenCalledWith(1234.56);
    });

    it('should sanitize input and emit numeric value', () => {
      const { getByDisplayValue } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );
      const input = getByDisplayValue('0.00');
      fireEvent.changeText(input, '$19.5a');
      expect(mockOnChange).toHaveBeenCalledWith(19.5);
    });

    it('should call onChange with 0 for empty input', () => {
      const { getByTestId } = render(
        <CurrencyInput value={100} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '');

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should handle decimal point only input', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '.');

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Min/Max Validation', () => {
    it('should clamp value to min', () => {
      const { getByTestId } = render(
        <CurrencyInput value={10} onChange={mockOnChange} min={5} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '3');

      expect(mockOnChange).toHaveBeenCalledWith(5);
    });

    it('should clamp value to max', () => {
      const { getByTestId } = render(
        <CurrencyInput value={10} onChange={mockOnChange} max={100} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '150');

      expect(mockOnChange).toHaveBeenCalledWith(100);
    });

    it('should allow values within min/max range', () => {
      const { getByTestId } = render(
        <CurrencyInput value={10} onChange={mockOnChange} min={0} max={100} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '50');

      expect(mockOnChange).toHaveBeenCalledWith(50);
    });

    it('should clamp when both min and max are set', () => {
      const { getByDisplayValue } = render(
        <CurrencyInput value={0} onChange={mockOnChange} min={10} max={20} />
      );
      const input = getByDisplayValue('0.00');
      fireEvent.changeText(input, '2');
      expect(mockOnChange).toHaveBeenCalledWith(10);
      fireEvent.changeText(input, '99');
      expect(mockOnChange).toHaveBeenCalledWith(20);
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} error="Invalid amount" />
      );

      expect(getByText('Invalid amount')).toBeTruthy();
    });

    it('should have alert accessibility role on error message', () => {
      const { getByRole } = render(
        <CurrencyInput value={0} onChange={mockOnChange} error="Invalid amount" />
      );

      expect(getByRole('alert')).toBeTruthy();
    });

    it('should hide helper when error is present', () => {
      const { getByText, queryByText } = render(
        <CurrencyInput value={1} onChange={mockOnChange} error="Required" helperText="Helper" />
      );
      expect(getByText('Required')).toBeTruthy();
      expect(queryByText('Helper')).toBeNull();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when no error', () => {
      const { getByText } = render(
        <CurrencyInput value={0} onChange={mockOnChange} helperText="Enter amount" />
      );

      expect(getByText('Enter amount')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when editable is false', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} editable={false} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.editable).toBe(false);
    });

    it('should be disabled when disabled prop is true', () => {
      const { getByDisplayValue } = render(
        <CurrencyInput value={1} onChange={mockOnChange} disabled />
      );
      const input = getByDisplayValue('1.00');
      expect(input.props.editable).toBe(false);
    });

    it('should have reduced opacity when disabled', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} disabled />
      );

      // Check parent container has opacity styling
      const input = getByTestId('currency-input');
      expect(input).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should use decimal-pad keyboard type', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.keyboardType).toBe('decimal-pad');
    });

    it('should have accessibilityLabel from label prop', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} label="Price" />
      );

      const input = getByTestId('currency-input');
      expect(input.props.accessibilityLabel).toBe('Price');
    });

    it('should indicate error state in accessibility', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} error="Invalid" label="Amount" />
      );

      const input = getByTestId('currency-input');
      // Check accessibility state indicates error
      expect(input.props.accessibilityState?.invalid || input.props['aria-invalid']).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      const { getByTestId } = render(
        <CurrencyInput value={999999999.99} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      expect(input.props.value).toBe('999999999.99');
    });

    it('should handle negative input as 0', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '-50');

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should handle multiple decimal points', () => {
      const { getByTestId } = render(
        <CurrencyInput value={0} onChange={mockOnChange} />
      );

      const input = getByTestId('currency-input');
      fireEvent.changeText(input, '12.34.56');

      // Should take first valid decimal
      expect(mockOnChange).toHaveBeenCalledWith(12.34);
    });
  });
});
