import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  labelStyles,
  requiredStyles,
  errorStyles,
  helperStyles,
  layoutStyles,
} from './form-field.styles';

export interface FormFieldProps {
  /** Label text displayed above the input */
  label?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Children input element(s) */
  children: React.ReactNode;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  containerStyle,
}: FormFieldProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View
      testID="form-field"
      style={[layoutStyles.container, containerStyle]}
    >
      {label && (
        <View style={layoutStyles.labelRow} testID="form-field-label">
          <Text style={labelStyles(isDark, {})}>{label}</Text>
          {required && <Text style={requiredStyles(isDark, {})}>*</Text>}
        </View>
      )}
      {children}
      {error && (
        <Text
          testID="form-field-error"
          style={errorStyles(isDark, {})}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text testID="form-field-helper" style={helperStyles(isDark, {})}>
          {helperText}
        </Text>
      )}
    </View>
  );
}
