import React from 'react';
import {
  View,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { styles } from './form-field.styles';

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
  return (
    <View
      testID="form-field"
      style={[styles.container, containerStyle]}
    >
      {label && (
        <View style={styles.labelRow} testID="form-field-label">
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      {children}
      {error && (
        <Text
          testID="form-field-error"
          style={styles.error}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text testID="form-field-helper" style={styles.helper}>
          {helperText}
        </Text>
      )}
    </View>
  );
}
