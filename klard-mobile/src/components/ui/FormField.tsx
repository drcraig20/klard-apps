import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

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

// Color constants aligned with Klard design system
const colors = {
  error: '#DC2626',
  textSecondary: '#475569',
  textMuted: '#64748B',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  required: {
    fontSize: 14,
    color: colors.error,
  },
  error: {
    fontSize: 14,
    color: colors.error,
  },
  helper: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
