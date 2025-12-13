import { View, Text, DimensionValue } from 'react-native';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';
import { useThemeColors } from '@/hooks';
import { t } from '@/lib/i18n';
import { styles } from './password-strength-indicator.styles';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const LEVEL_WIDTHS: Record<PasswordStrength['level'], DimensionValue> = {
  weak: '25%',
  fair: '50%',
  good: '75%',
  strong: '100%',
};

export function PasswordStrengthIndicator({ password }: Readonly<PasswordStrengthIndicatorProps>) {
  const colors = useThemeColors();
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const levelColors: Record<PasswordStrength['level'], string> = {
    weak: colors.accentError,
    fair: colors.accentWarning,
    good: colors.accentSuccess,
    strong: colors.primary,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarContainer, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: LEVEL_WIDTHS[strength.level],
              backgroundColor: levelColors[strength.level],
            },
          ]}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {t(`auth.signup.passwordStrength.${strength.level}`)}
        </Text>
        {strength.feedback.length > 0 && (
          <Text style={[styles.feedback, { color: colors.textTertiary }]}>
            {strength.feedback[0]}
          </Text>
        )}
      </View>
    </View>
  );
}