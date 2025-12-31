import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const skeletonStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.muted,
    overflow: 'hidden',
  }),
});

// Static layout styles (not themed)
export const layoutStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
});

// Shimmer gradient colors (theme-aware)
export function getShimmerColors(shimmerHighlight: string): [string, string, string] {
  return ['transparent', shimmerHighlight, 'transparent'];
}
