import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const labelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    fontWeight: '500',
    color: colors.mutedForeground,
    marginBottom: 8,
  }),
  variants: {
    disabled: {
      true: { opacity: 0.5 },
    },
  },
});

export const requiredStyles = sva({
  base: (colors) => ({
    color: colors.error,
  }),
});

export const triggerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  }),
  variants: {
    error: {
      true: (colors) => ({
        borderColor: colors.error,
        borderWidth: 2,
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

export const valueStyles = sva({
  base: (colors) => ({
    flex: 1,
    fontSize: 16,
    color: colors.foreground,
  }),
  variants: {
    placeholder: {
      true: (colors) => ({ color: colors.mutedForeground }),
    },
    disabled: {
      true: (colors) => ({ color: colors.textSecondary }),
    },
  },
});

export const pickerContainerStyles = sva({
  base: (colors) => ({
    marginTop: 8,
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  }),
});

export const errorStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  }),
});

import type { ThemeColors } from '@/styles/colors/semantic';

// Helper to get icon color
export function getIconColor(colors: ThemeColors, disabled: boolean): string {
  return disabled ? colors.textDisabled : colors.textTertiary;
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
});