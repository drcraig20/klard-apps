'use client';

import { useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const currencyInputVariants = cva(
  [
    'w-full',
    'text-slate-700 dark:text-slate-200',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'bg-transparent dark:bg-input/30',
    'border-input',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 pl-8 pr-3 text-sm',
        md: 'h-10 pl-9 pr-3.5 text-base',
        lg: 'h-11 pl-10 pr-4 text-base',
      },
      hasError: {
        true: 'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        false: '',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      isDisabled: false,
    },
  }
);

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>,
    VariantProps<typeof currencyInputVariants> {
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
  className,
  size,
  ...props
}: CurrencyInputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy =
    [error ? `${id}-error` : null, helperText && !error ? `${id}-helper` : null]
      .filter(Boolean)
      .join(' ') || undefined;
  const symbol = getCurrencySymbol(currency);
  const formattedValue = formatValue(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseCurrencyValue(event.target.value);
    const clamped = clampValue(parsed, min, max);
    onChange(clamped);
  };

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      className="w-full"
    >
      <div data-slot="currency-input" className="relative w-full">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
          {symbol}
        </span>
        <Input
          id={id}
          value={formattedValue}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            currencyInputVariants({
              size,
              hasError: !!error,
              isDisabled: disabled,
            }),
            'pr-3',
            className
          )}
          {...props}
        />
      </div>
    </FormField>
  );
}
