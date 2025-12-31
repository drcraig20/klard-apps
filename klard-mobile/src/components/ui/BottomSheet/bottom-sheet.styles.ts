import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const handleIndicatorStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.muted,
    width: 40,
    height: 4,
    borderRadius: 2,
  }),
});

export const backgroundStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  }),
});

// Helper to get backdrop color from theme
export function getBackdropColor(colors: { backdropOverlay: string }): string {
  return colors.backdropOverlay;
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
