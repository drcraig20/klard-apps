import { Ionicons } from '@expo/vector-icons';
import type { ThemeColors } from '@/styles';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const typeIconMap: Record<AlertType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
};

export interface AlertColorSet {
  bg: string;
  border: string;
  icon: string;
  text: string;
}

/**
 * Get theme-aware colors for alert variants.
 * Uses the centralized theme system instead of hardcoded values.
 */
export const getAlertColors = (colors: ThemeColors): Record<AlertType, AlertColorSet> => ({
  success: {
    bg: colors.successBackground,
    border: colors.successBorder,
    icon: colors.success,
    text: colors.successForeground,
  },
  error: {
    bg: colors.errorBackground,
    border: colors.errorBorder,
    icon: colors.error,
    text: colors.errorForeground,
  },
  warning: {
    bg: colors.warningBackground,
    border: colors.warningBorder,
    icon: colors.warning,
    text: colors.warningForeground,
  },
  info: {
    bg: colors.infoBackground,
    border: colors.infoBorder,
    icon: colors.primary,
    text: colors.infoForeground,
  },
});
