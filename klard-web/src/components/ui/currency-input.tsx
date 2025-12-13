'use client';

import { type VariantProps } from 'class-variance-authority';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormFieldIds } from '@/hooks';
import {
  inputFieldVariants,
  leftIconStyles,
  inputContainerStyles,
} from '@/lib/form-field-styles';

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** The numeric value */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Currency code (default: 'USD') */
  currency?: string;
  /** Label text displayed above the input */
  label?: string;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Input id for label association */
  id?: string;
  /** Additional class name for input */
  className?: string;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
};

function getCurrencySymbol(currency: string): string {
  const key = currency.toUpperCase();
  return currencySymbols[key] ?? key;
}

function parseCurrencyValue(rawValue: string): number {
  if (!rawValue) {
    return 0;
  }

  const hasNegativeSign = rawValue.includes('-');
  const sanitized = rawValue.trim();
  const hasDot = sanitized.includes('.');
  const hasComma = sanitized.includes(',');

  // Treat commas as thousand separators when a dot is present; otherwise allow comma as decimal
  const withNormalizedSeparators = hasComma && !hasDot ? sanitized.replace(/,/g, '.') : sanitized.replace(/,/g, '');

  const normalized = withNormalizedSeparators.replace(/[^0-9.]/g, '');
  const [integerPart, decimalPart] = normalized.split('.');
  const composed = decimalPart !== undefined ? `${integerPart || '0'}.${decimalPart}` : integerPart;
  const parsed = Number.parseFloat(composed);

  if (hasNegativeSign || Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function clampValue(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined && result < min) {
    result = min;
  }
  if (max !== undefined && result > max) {
    result = max;
  }
  return result;
}

function formatValue(value: number): string {
  if (!Number.isFinite(value)) {
    return '0.00';
  }
  return value.toFixed(2);
}

export function CurrencyInput({
  value,
  onChange,
  currency = 'USD',
  label,
  error,
  helperText,
  min,
  max,
  disabled,
  required,
  id: providedId,
  name,
  className,
  ...props
}: CurrencyInputProps) {
  const { inputId, describedBy } = useFormFieldIds(
    providedId,
    name ?? 'currency',
    error,
    helperText
  );
  const symbol = getCurrencySymbol(currency);
  const formattedValue = formatValue(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrencyValue(event.target.value);
    const clamped = clampValue(parsed, min, max);
    onChange(clamped);
  };

  return (
    <FormField
      id={inputId}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      className="w-full"
    >
      <div data-slot="currency-input" className={inputContainerStyles}>
        <span className={leftIconStyles}>
          {symbol}
        </span>
        <Input
          id={inputId}
          value={formattedValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            inputFieldVariants({
              hasError: !!error,
              disabled,
              hasLeftIcon: true,
            }),
            className
          )}
          {...props}
        />
      </div>
    </FormField>
  );
}
