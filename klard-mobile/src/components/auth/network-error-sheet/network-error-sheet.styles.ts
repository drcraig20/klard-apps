import { sva } from '@/styles/sva';

export const containerStyles = sva({
  base: {
    paddingVertical: 24,
    gap: 16,
  },
});

export const titleStyles = sva({
  base: (colors) => ({
    fontSize: 20,
    fontWeight: '600',
    color: colors.foreground,
    textAlign: 'center',
  }),
});

export const messageStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    lineHeight: 20,
    color: colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: 8,
  }),
});

export const errorCodeStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    fontFamily: 'monospace',
  }),
});

export const buttonContainerStyles = sva({
  base: {
    marginTop: 8,
  },
});
