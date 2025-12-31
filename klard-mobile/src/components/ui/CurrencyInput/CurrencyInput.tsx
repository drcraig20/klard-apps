import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  type AccessibilityState,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { FormField } from '@/components/ui/FormField';
import { useThemeColors } from '@/contexts/ThemeContext';
import { styles, getCurrencyInputColors } from './currency-input.styles';
import {
  getCurrencySymbol,
  parseCurrencyValue,
  clampValue,
  formatValue,
} from './currency-input.utils';

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
}: Readonly<CurrencyInputProps>) {
  const themeColors = useThemeColors();
  const colors = getCurrencyInputColors(themeColors);
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
            backgroundColor: colors.background,
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          isDisabled && styles.inputContainerDisabled,
          isDisabled && { backgroundColor: colors.backgroundDisabled },
        ]}
      >
        <Text
          style={[
            styles.symbol,
            { color: colors.textSecondary },
            isDisabled && { color: colors.placeholder },
          ]}
        >
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
          style={[
            styles.input,
            { color: colors.text },
            isDisabled && { color: colors.placeholder },
          ]}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={accessibilityState}
          testID="currency-input"
          {...props}
        />
      </View>
    </FormField>
  );
}
