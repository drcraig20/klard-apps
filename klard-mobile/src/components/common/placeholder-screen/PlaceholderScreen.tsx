import { View, Text } from 'react-native';
import { useThemeColors } from '@/hooks';
import { typography } from '@/styles';
import { styles } from './placeholder-screen.styles';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
}

export function PlaceholderScreen({
  title,
  subtitle = 'Coming soon...'
}: PlaceholderScreenProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, typography.h2, { color: colors.foreground }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, typography.body, { color: colors.textSecondary }]}>
        {subtitle}
      </Text>
    </View>
  );
}
