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

export const triggerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
  }),
  variants: {
    error: {
      true: (colors) => ({ borderColor: colors.error }),
    },
    disabled: {
      true: (colors) => ({
        backgroundColor: colors.muted,
        opacity: 0.7,
      }),
    },
  },
});

export const triggerTextStyles = sva({
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

export const errorStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  }),
});

export const overlayStyles = sva({
  base: (colors) => ({
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  }),
});

export const modalContentStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingBottom: 32,
  }),
});

export const modalHeaderStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  }),
});

export const modalTitleStyles = sva({
  base: (colors) => ({
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
  }),
});

export const optionStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
  }),
  variants: {
    selected: {
      true: (colors) => ({ backgroundColor: colors.primaryBackground }),
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  },
});

export const optionTextStyles = sva({
  base: (colors) => ({
    flex: 1,
    fontSize: 16,
    color: colors.foreground,
  }),
  variants: {
    selected: {
      true: (colors) => ({ color: colors.primary, fontWeight: '500' }),
    },
    disabled: {
      true: (colors) => ({ color: colors.textSecondary }),
    },
  },
});

// Helper to get icon color
export function getIconColor(disabled: boolean, isDark: boolean): string {
  if (disabled) {
    return isDark ? '#64748B' : '#94A3B8';
  }
  return isDark ? '#94A3B8' : '#475569';
}

export function getCloseIconColor(isDark: boolean): string {
  return isDark ? '#F8FAFC' : '#0F172A';
}

export function getPrimaryColor(isDark: boolean): string {
  return isDark ? '#15B5B0' : '#0D7C7A';
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  closeButton: {
    padding: 4,
  },
  optionIcon: {
    marginRight: 12,
  },
});