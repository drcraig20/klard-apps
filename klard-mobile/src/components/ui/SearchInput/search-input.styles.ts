import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 48,
  }),
  variants: {
    focused: {
      true: (colors) => ({
        borderWidth: 2,
        borderColor: colors.primary,
      }),
    },
    disabled: {
      true: (colors) => ({
        backgroundColor: colors.muted,
        opacity: 0.7,
      }),
    },
  },
});

export const inputStyles = sva({
  base: (colors) => ({
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.foreground,
    paddingRight: 12,
  }),
  variants: {
    withAction: {
      true: { paddingRight: 8 },
    },
    disabled: {
      true: (colors) => ({ color: colors.textSecondary }),
    },
  },
});

// Helper to get icon color
export function getIconColor(isDark: boolean): string {
  return isDark ? '#94A3B8' : '#64748B';
}

// Helper to get placeholder color
export function getPlaceholderColor(isDark: boolean): string {
  return isDark ? '#64748B' : '#94A3B8';
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  actionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
