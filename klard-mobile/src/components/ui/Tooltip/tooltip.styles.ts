import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

// Tooltip uses inverted colors (dark bg on light mode, light bg on dark mode)
export const tooltipStyles = sva({
  base: (colors) => ({
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: colors.popover,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 150,
    maxWidth: 250,
    marginBottom: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  }),
});

export const tooltipTextStyles = sva({
  base: (colors) => ({
    color: colors.popoverForeground,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  }),
});

export const arrowStyles = sva({
  base: (colors) => ({
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.popover,
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});