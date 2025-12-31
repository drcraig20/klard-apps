import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';
import { useThemeColors } from '@/hooks';
import { type ThemeColors } from '@/styles';
import { inputStyles, strengthStyles, reqStyles, getPasswordInputColors } from './password-input.styles';
import { LEVEL_WIDTHS, LEVEL_LABELS, REQUIREMENT_LABELS } from './password-input.constants';

// ============================================================================
// Types
// ============================================================================

interface PasswordRequirementsState {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Show password strength indicator */
  showStrength?: boolean;
  /** Password requirements checklist state */
  requirements?: PasswordRequirementsState;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

// ============================================================================
// Sub-components (SRP: Each has single responsibility)
// ============================================================================

interface PasswordStrengthBarProps {
  password: string;
  colors: ThemeColors & { isDark: boolean };
}

function PasswordStrengthBar({ password, colors }: Readonly<PasswordStrengthBarProps>) {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const levelColors: Record<PasswordStrength['level'], string> = {
    weak: colors.accentError,
    fair: colors.accentWarning,
    good: colors.accentSuccess,
    strong: colors.primary,
  };

  return (
    <View style={strengthStyles.container} testID="password-strength-indicator">
      <View style={[strengthStyles.track, { backgroundColor: colors.muted }]}>
        <View
          style={[
            strengthStyles.bar,
            {
              width: LEVEL_WIDTHS[strength.level],
              backgroundColor: levelColors[strength.level],
            },
          ]}
        />
      </View>
      <View style={strengthStyles.labelContainer}>
        <Text style={[strengthStyles.label, { color: colors.textSecondary }]}>
          {LEVEL_LABELS[strength.level]}
        </Text>
        {strength.feedback.length > 0 && (
          <Text style={[strengthStyles.feedback, { color: colors.textTertiary }]}>
            {strength.feedback[0]}
          </Text>
        )}
      </View>
    </View>
  );
}

interface PasswordRequirementsListProps {
  requirements: PasswordRequirementsState;
  colors: ThemeColors & { isDark: boolean };
}

function PasswordRequirementsList({ requirements, colors }: Readonly<PasswordRequirementsListProps>) {
  return (
    <View style={reqStyles.container} testID="password-requirements">
      {(Object.entries(requirements) as [keyof PasswordRequirementsState, boolean][]).map(
        ([key, isMet]) => (
          <View key={key} style={reqStyles.item} testID={`requirement-${key}`}>
            <Ionicons
              name={isMet ? 'checkmark-circle' : 'close-circle'}
              size={16}
              color={isMet ? colors.accentSuccess : colors.textTertiary}
            />
            <Text
              style={[
                reqStyles.label,
                { color: isMet ? colors.accentSuccess : colors.textSecondary },
              ]}
            >
              {REQUIREMENT_LABELS[key]}
            </Text>
          </View>
        )
      )}
    </View>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function PasswordInput({
  label,
  error,
  helperText,
  required,
  showStrength,
  requirements,
  value,
  onChangeText,
  containerStyle,
  editable = true,
  testID = 'password-input',
  ...props
}: Readonly<PasswordInputProps>) {
  const themeColors = useThemeColors();
  const inputColors = getPasswordInputColors(themeColors);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const disabled = !editable;

  const getBorderColor = () => {
    if (error) return inputColors.error;
    if (isFocused) return inputColors.primary;
    return inputColors.border;
  };

  return (
    <View style={[inputStyles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[inputStyles.label, { color: inputColors.textSecondary }, disabled && inputStyles.labelDisabled]}>
          {label}
          {required && <Text style={{ color: inputColors.error }}> *</Text>}
        </Text>
      )}

      {/* Input container */}
      <View
        style={[
          inputStyles.inputContainer,
          {
            backgroundColor: inputColors.background,
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          disabled && inputStyles.inputContainerDisabled,
          disabled && { backgroundColor: inputColors.backgroundDisabled },
        ]}
      >
        {/* TextInput */}
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={inputColors.placeholder}
          style={[
            inputStyles.input,
            inputStyles.inputWithRightIcon,
            { color: inputColors.text },
            disabled && { color: inputColors.icon },
          ]}
          accessibilityLabel={label || 'Password'}
          accessibilityHint={helperText}
          {...props}
        />

        {/* Visibility toggle */}
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          disabled={disabled}
          style={inputStyles.toggleButton}
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          accessibilityRole="button"
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={inputColors.icon}
          />
        </Pressable>
      </View>

      {/* Error message */}
      {error && (
        <Text style={[inputStyles.error, { color: inputColors.error }]} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <Text style={[inputStyles.helperText, { color: inputColors.textSecondary }]}>{helperText}</Text>
      )}

      {/* Strength indicator */}
      {showStrength && typeof value === 'string' && (
        <PasswordStrengthBar password={value} colors={themeColors} />
      )}

      {/* Requirements checklist */}
      {requirements && (
        <PasswordRequirementsList requirements={requirements} colors={themeColors} />
      )}
    </View>
  );
}
