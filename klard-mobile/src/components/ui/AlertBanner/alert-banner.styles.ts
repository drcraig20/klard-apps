import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const alertContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
  },
  variants: {
    type: {
      success: (colors) => ({
        backgroundColor: colors.successBackground,
        borderColor: colors.successBorder,
      }),
      error: (colors) => ({
        backgroundColor: colors.errorBackground,
        borderColor: colors.errorBorder,
      }),
      warning: (colors) => ({
        backgroundColor: colors.warningBackground,
        borderColor: colors.warningBorder,
      }),
      info: (colors) => ({
        backgroundColor: colors.infoBackground,
        borderColor: colors.infoBorder,
      }),
    },
    size: {
      default: {
        paddingHorizontal: 12,
        paddingVertical: 10,
      },
      compact: {
        paddingHorizontal: 10,
        paddingVertical: 8,
      },
    },
  },
  defaultVariants: {
    type: 'info',
    size: 'default',
  },
});

export const alertTextStyles = sva({
  base: {
    fontSize: 14,
  },
  variants: {
    type: {
      success: (colors) => ({ color: colors.successForeground }),
      error: (colors) => ({ color: colors.errorForeground }),
      warning: (colors) => ({ color: colors.warningForeground }),
      info: (colors) => ({ color: colors.infoForeground }),
    },
    textType: {
      title: { fontWeight: '600' },
      description: { lineHeight: 20 },
    },
  },
  defaultVariants: {
    type: 'info',
    textType: 'description',
  },
});

// Helper to get icon color
export function getIconColor(type: AlertType, isDark: boolean): string {
  const colors = {
    light: {
      success: '#059669',
      error: '#DC2626',
      warning: '#D97706',
      info: '#1E40AF',
    },
    dark: {
      success: '#34D399',
      error: '#EF4444',
      warning: '#FBBF24',
      info: '#60A5FA',
    },
  };
  return isDark ? colors.dark[type] : colors.light[type];
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  iconWrapper: {
    paddingTop: 2,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  actionWrapper: {
    marginTop: 8,
  },
  dismiss: {
    padding: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
});