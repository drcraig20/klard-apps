import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const overlayStyles = sva({
  base: (colors) => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  }),
});

export const contentStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: '90%',
  }),
});

export const handleStyles = sva({
  base: (colors) => ({
    width: 40,
    height: 4,
    backgroundColor: colors.muted,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  }),
});

export const titleStyles = sva({
  base: (colors) => ({
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    flex: 1,
  }),
});

export const descriptionStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
    marginBottom: 16,
  }),
});

export const footerStyles = sva({
  base: (colors) => ({
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 16,
  }),
});

// Helper to get close icon color
export function getCloseIconColor(isDark: boolean): string {
  return isDark ? '#94A3B8' : '#64748B';
}

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
  body: {
    flex: 1,
  },
});
