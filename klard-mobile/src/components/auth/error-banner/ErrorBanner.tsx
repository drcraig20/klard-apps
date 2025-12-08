import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks';
import { typography } from '@/styles';
import { styles } from './error-banner.styles';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.errorBackground,
          borderColor: colors.errorBorder,
        },
      ]}
      accessibilityRole="alert"
    >
      <Text style={[styles.message, typography.body, { color: colors.errorForeground }]}>
        {message}
      </Text>
      <TouchableOpacity
        onPress={onDismiss}
        style={styles.dismissButton}
        accessibilityRole="button"
        accessibilityLabel="Dismiss error"
      >
        <Text style={{ color: colors.errorForeground }}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}
