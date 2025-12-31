import { type ThemeColors } from '@/styles';
import { useTheme } from '@/contexts/ThemeContext';

export function useThemeColors(): ThemeColors & { isDark: boolean } {
  const { colors, isDark } = useTheme();
  return { ...colors, isDark };
}

// Re-export useTheme for components that need full theme control
export { useTheme } from '@/contexts/ThemeContext';
