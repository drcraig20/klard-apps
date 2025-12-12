import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type AccessibilityState,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { FormField } from '@/components/ui/FormField';

export interface CurrencyInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onChange'> {
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
  /** Disabled state (alternative to editable) */
  disabled?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
};

const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
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
  const withNormalizedSeparators =
    hasComma && !hasDot ? sanitized.replace(/,/g, '.') : sanitized.replace(/,/g, '');

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
  containerStyle,
  editable = true,
  onFocus,
  onBlur,
  accessibilityLabel,
  ...props
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = disabled || !editable;
  const symbol = getCurrencySymbol(currency);
  const formattedValue = formatValue(value);

  const handleChangeText = (text: string) => {
    const parsed = parseCurrencyValue(text);
    const clamped = clampValue(parsed, min, max);
    onChange(clamped);
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const accessibilityState: AccessibilityState & { invalid?: boolean } = {
    disabled: isDisabled,
    ...(error ? { invalid: true } : {}),
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      containerStyle={containerStyle}
    >
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          isDisabled && styles.inputContainerDisabled,
        ]}
      >
        <Text style={[styles.symbol, isDisabled && styles.symbolDisabled]}>
          {symbol}
        </Text>
        <TextInput
          value={formattedValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!isDisabled}
          keyboardType="decimal-pad"
          placeholderTextColor={colors.placeholder}
          style={[styles.input, isDisabled && styles.inputDisabled]}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={accessibilityState}
          testID="currency-input"
          {...props}
        />
      </View>
    </FormField>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  inputContainerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  symbol: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: 8,
  },
  symbolDisabled: {
    color: colors.placeholder,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: colors.text,
  },
  inputDisabled: {
    color: colors.placeholder,
  },
});
