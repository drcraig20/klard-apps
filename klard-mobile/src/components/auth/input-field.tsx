import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export function InputField({
  label,
  error,
  icon,
  isPassword,
  style,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.input,
            borderColor: error
              ? colors.accentError
              : isFocused
              ? colors.ring
              : colors.border,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.foreground },
            icon && styles.inputWithIcon,
            isPassword && styles.inputWithToggle,
            style,
          ]}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Text style={{ color: colors.mutedForeground }}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.errorForeground }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  inputWithToggle: {
    paddingRight: 60,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  error: {
    fontSize: 14,
    marginTop: 8,
  },
});
