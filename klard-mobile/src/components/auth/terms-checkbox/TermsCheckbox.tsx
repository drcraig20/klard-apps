import { View, Text, Pressable } from 'react-native';
import { CheckboxField } from '@/components/ui';
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
}: Readonly<TermsCheckboxProps>) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CheckboxField
          checked={value}
          onChange={onValueChange}
          disabled={disabled}
        />
        <Pressable
          style={styles.labelContainer}
          onPress={() => !disabled && onValueChange(!value)}
          disabled={disabled}
        >
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
        </Pressable>
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.errorForeground }]}>
          {error}
        </Text>
      )}
    </View>
  );
}