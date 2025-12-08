import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { t } from '@/lib/i18n';
import { styles } from './terms-checkbox.styles';

interface TermsCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function TermsCheckbox({
  value,
  onValueChange,
  error,
  disabled,
}: TermsCheckboxProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => onValueChange(!value)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={t('auth.signup.termsLabel')}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: error ? colors.accentError : colors.border,
              backgroundColor: value ? colors.primary : 'transparent',
            },
          ]}
        >
          {value && (
            <Text style={[styles.checkmark, { color: colors.primaryForeground }]}>
              ✓
            </Text>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            I agree to the{' '}
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => {
                // Placeholder - will open actual terms page later
              }}
            >
              {t('auth.signup.termsLink')}
            </Text>
            {' '}and{' '}
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => {
                // Placeholder - will open actual privacy page later
              }}
            >
              {t('auth.signup.privacyLink')}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.error, { color: colors.errorForeground }]}>
          {error}
        </Text>
      )}
    </View>
  );
}