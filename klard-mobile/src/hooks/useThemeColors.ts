import { useColorScheme } from 'react-native';
import { Colors, type ThemeColors } from '@/styles';

export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme() ?? 'light';
  return Colors[colorScheme];
}
