import { StyleSheet } from 'react-native';
import { type ThemeColors } from '@/styles';

/**
 * Returns theme-aware colors for Switch component.
 * Call this from the component with useThemeColors() result.
 */
export const getSwitchColors = (themeColors: ThemeColors) => ({
  primary: themeColors.primary,
  trackOff: themeColors.muted,
  trackOn: themeColors.primary,
  thumbColor: themeColors.background,
  text: themeColors.foreground,
  textSecondary: themeColors.textSecondary,
});

export type SwitchColors = ReturnType<typeof getSwitchColors>;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelDisabled: {
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
  },
  descriptionDisabled: {
    opacity: 0.5,
  },
  switchSm: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
