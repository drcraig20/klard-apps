import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  type TextInputProps,
  type KeyboardTypeOptions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface InputFieldProps extends TextInputProps {
  /** Input type - affects keyboard type and behavior */
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'currency' | 'tel';
  /** Label text displayed above the input */
  label?: string;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Icon displayed on the left side of input */
  leftIcon?: React.ReactNode;
  /** Icon displayed on the right side of input (not shown for password/search types) */
  rightIcon?: React.ReactNode;
  /** Clear handler for search inputs */
  onClear?: () => void;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

// Keyboard type mapping for different input types
const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
  text: 'default',
  email: 'email-address',
  password: 'default',
  search: 'default',
  number: 'numeric',
  currency: 'decimal-pad',
  tel: 'phone-pad',
};

// Auto capitalize mapping
const autoCapitalizeMap: Record<string, TextInputProps['autoCapitalize']> = {
  email: 'none',
  search: 'none',
  password: 'none',
};

export function InputField({
  type = 'text',
  label,
  error,
  helperText,
  required,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  onClear,
  onFocus,
  onBlur,
  containerStyle,
  editable = true,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const isSearch = type === 'search';

  // Determine if we should show a right-side action button
  const hasRightAction = isPassword || (isSearch && value);
  const showRightIcon = rightIcon && !hasRightAction;

  const handleChangeText = (text: string) => {
    onChangeText?.(text);
  };

  const handleClear = () => {
    onChangeText?.('');
    onClear?.();
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Get keyboard type based on input type
  const keyboardType = keyboardTypeMap[type] ?? 'default';
  const autoCapitalize = autoCapitalizeMap[type] ?? 'sentences';

  // Dynamic border color
  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const disabled = !editable;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Input container */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          disabled && styles.inputContainerDisabled,
        ]}
      >
        {/* Left icon */}
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        {/* TextInput */}
        <TextInput
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={type === 'email' || type === 'password' ? false : undefined}
          placeholderTextColor={colors.placeholder}
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            (hasRightAction || showRightIcon) ? styles.inputWithRightIcon : undefined,
            disabled ? styles.inputDisabled : undefined,
          ]}
          accessibilityLabel={label}
          accessibilityHint={helperText}
          testID="input-field"
          {...props}
        />

        {/* Password toggle */}
        {isPassword && (
          <Pressable
            onPress={handleTogglePassword}
            disabled={disabled}
            style={styles.rightActionButton}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.icon}
            />
          </Pressable>
        )}

        {/* Search clear button */}
        {isSearch && value && (
          <Pressable
            onPress={handleClear}
            disabled={disabled}
            style={styles.rightActionButton}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Ionicons name="close-circle" size={20} color={colors.icon} />
          </Pressable>
        )}

        {/* Right icon (only shown if no action button) */}
        {showRightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>

      {/* Error message */}
      {error && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Helper text */}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

// Color constants aligned with Klard design system
const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  icon: '#64748B',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  required: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 48,
  },
  inputContainerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  leftIconContainer: {
    paddingLeft: 12,
  },
  rightIconContainer: {
    paddingRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  inputDisabled: {
    color: colors.icon,
  },
  rightActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});