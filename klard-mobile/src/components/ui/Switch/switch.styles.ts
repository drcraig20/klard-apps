import { StyleSheet } from 'react-native';

// Klard design system colors
export const colors = {
  primary: '#0D7C7A',
  trackOff: '#E2E8F0',
  trackOn: '#0D7C7A',
  thumbColor: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#475569',
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  descriptionDisabled: {
    opacity: 0.5,
  },
  switchSm: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
