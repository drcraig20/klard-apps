import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { styles } from './magic-link-sent.styles';

interface MagicLinkSentProps {
  email: string;
  onBack: () => void;
}

export function MagicLinkSent({ email, onBack }: MagicLinkSentProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: colors.accentSuccess + '1A' }]}>
        <Text style={{ color: colors.accentSuccess, fontSize: 32 }}>✓</Text>
      </View>
      <Text style={[styles.title, typography.h2, { color: colors.foreground }]}>
        {t('auth.magicLink.title')}
      </Text>
      <Text style={[styles.message, typography.body, { color: colors.textSecondary }]}>
        {t('auth.magicLink.description')} {email}
      </Text>
      <TouchableOpacity
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={t('auth.magicLink.backToLogin')}
      >
        <Text style={[styles.backLink, typography.label, { color: colors.primary }]}>
          {t('auth.magicLink.backToLogin')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
