import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { typography } from '@/styles';
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
        Check your email
      </Text>
      <Text style={[styles.message, typography.body, { color: colors.textSecondary }]}>
        We sent a login link to {email}
      </Text>
      <TouchableOpacity
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back to login"
      >
        <Text style={[styles.backLink, typography.label, { color: colors.primary }]}>
          Back to login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
