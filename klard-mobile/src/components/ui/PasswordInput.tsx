import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';
import { useThemeColors } from '@/hooks';

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
  colors: ReturnType<typeof useThemeColors>;
}

const LEVEL_WIDTHS: Record<PasswordStrength['level'], DimensionValue> = {
  weak: '25%',
  fair: '50%',
  good: '75%',
  strong: '100%',
};

const LEVEL_LABELS: Record<PasswordStrength['level'], string> = {
  weak: 'Weak',
  fair: 'Fair',
  good: 'Good',
  strong: 'Strong',
};

function PasswordStrengthBar({ password, colors }: PasswordStrengthBarProps) {
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
  colors: ReturnType<typeof useThemeColors>;
}

function PasswordRequirementsList({ requirements, colors }: PasswordRequirementsListProps) {
  const requirementLabels: Record<keyof PasswordRequirementsState, string> = {
    minLength: 'At least 8 characters',
    hasUppercase: 'One uppercase letter',
    hasLowercase: 'One lowercase letter',
    hasNumber: 'One number',
    hasSpecial: 'One special character',
  };

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
              {requirementLabels[key]}
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
}: PasswordInputProps) {
  const colors = useThemeColors();
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
        <Text style={[inputStyles.label, disabled && inputStyles.labelDisabled]}>
          {label}
          {required && <Text style={inputStyles.required}> *</Text>}
        </Text>
      )}

      {/* Input container */}
      <View
        style={[
          inputStyles.inputContainer,
          {
            borderColor: getBorderColor(),
            borderWidth: isFocused ? 2 : 1,
          },
          disabled && inputStyles.inputContainerDisabled,
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
            disabled && inputStyles.inputDisabled,
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
        <Text style={inputStyles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <Text style={inputStyles.helperText}>{helperText}</Text>
      )}

      {/* Strength indicator */}
      {showStrength && typeof value === 'string' && (
        <PasswordStrengthBar password={value} colors={colors} />
      )}

      {/* Requirements checklist */}
      {requirements && (
        <PasswordRequirementsList requirements={requirements} colors={colors} />
      )}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const inputColors = {
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

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: inputColors.textSecondary,
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  required: {
    color: inputColors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: inputColors.background,
    borderRadius: 12,
    height: 48,
  },
  inputContainerDisabled: {
    backgroundColor: inputColors.backgroundDisabled,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: inputColors.text,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  inputDisabled: {
    color: inputColors.icon,
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: inputColors.error,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    color: inputColors.textSecondary,
    marginTop: 8,
  },
});

const strengthStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  feedback: {
    fontSize: 12,
  },
});

const reqStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
  },
});