import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const circleStyles = sva({
  base: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    state: {
      completed: (colors) => ({ backgroundColor: colors.primary }),
      current: (colors) => ({
        backgroundColor: colors.primary,
        shadowColor: colors.glowPrimary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      }),
      upcoming: (colors) => ({ backgroundColor: colors.muted }),
    },
  },
  defaultVariants: {
    state: 'upcoming',
  },
});

export const circleTextStyles = sva({
  base: {
    fontSize: 14,
    fontWeight: '500',
  },
  variants: {
    state: {
      completed: { color: '#FFFFFF' },
      current: { color: '#FFFFFF' },
      upcoming: (colors) => ({ color: colors.mutedForeground }),
    },
  },
  defaultVariants: {
    state: 'upcoming',
  },
});

export const labelStyles = sva({
  base: {
    fontSize: 14,
  },
  variants: {
    state: {
      completed: (colors) => ({ color: colors.textPrimary }),
      current: (colors) => ({ color: colors.textPrimary, fontWeight: '500' }),
      upcoming: (colors) => ({ color: colors.textSecondary }),
    },
  },
  defaultVariants: {
    state: 'upcoming',
  },
});

export const descriptionStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    marginTop: 2,
    color: colors.textSecondary,
  }),
});

export const connectorStyles = sva({
  base: {
    borderRadius: 999,
  },
  variants: {
    completed: {
      true: (colors) => ({ backgroundColor: colors.primary }),
      false: (colors) => ({ backgroundColor: colors.muted }),
    },
  },
  defaultVariants: {
    completed: 'false',
  },
});

// Static layout styles (not themed)
export const layoutStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapperVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContentVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  connectorHorizontal: {
    height: 2,
    flex: 1,
    marginHorizontal: 16,
  },
  connectorVertical: {
    width: 2,
    height: 32,
    marginLeft: 15,
    marginVertical: 8,
  },
});