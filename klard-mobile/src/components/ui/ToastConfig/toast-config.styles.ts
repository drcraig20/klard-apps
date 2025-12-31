import { sva, type ThemeColors } from '@/styles/sva';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }),
  variants: {
    type: {
      success: (colors) => ({
        backgroundColor: colors.successBackground,
        borderLeftColor: colors.success,
      }),
      error: (colors) => ({
        backgroundColor: colors.errorBackground,
        borderLeftColor: colors.error,
      }),
      warning: (colors) => ({
        backgroundColor: colors.warningBackground,
        borderLeftColor: colors.warning,
      }),
      info: (colors) => ({
        backgroundColor: colors.infoBackground,
        borderLeftColor: colors.primary,
      }),
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

export const titleStyles = sva({
  base: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  variants: {
    type: {
      success: (colors) => ({ color: colors.successForeground }),
      error: (colors) => ({ color: colors.errorForeground }),
      warning: (colors) => ({ color: colors.warningForeground }),
      info: (colors) => ({ color: colors.infoForeground }),
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

export const descriptionStyles = sva({
  base: {
    fontSize: 13,
    opacity: 0.9,
  },
  variants: {
    type: {
      success: (colors) => ({ color: colors.successForeground }),
      error: (colors) => ({ color: colors.errorForeground }),
      warning: (colors) => ({ color: colors.warningForeground }),
      info: (colors) => ({ color: colors.infoForeground }),
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

export const actionButtonStyles = sva({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    type: {
      success: (colors) => ({ backgroundColor: colors.success }),
      error: (colors) => ({ backgroundColor: colors.error }),
      warning: (colors) => ({ backgroundColor: colors.warning }),
      info: (colors) => ({ backgroundColor: colors.primary }),
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

// Helper to get icon color from theme
export function getIconColor(type: 'success' | 'error' | 'warning' | 'info', colors: ThemeColors): string {
  const colorMap = {
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.primary,
  };
  return colorMap[type];
}

// Icon names
export const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'close-circle',
  warning: 'warning',
  info: 'information-circle',
};

// Static layout styles
export const layoutStyles = StyleSheet.create({
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
