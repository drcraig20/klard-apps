import { View, Text, ActivityIndicator } from 'react-native';
import { useThemeColors } from '@/hooks';
import { typography } from '@/styles';
import { styles } from './loading-screen.styles';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message }: LoadingScreenProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text style={[styles.message, typography.body, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
}
