import { StyleSheet } from 'react-native';

// Color constants aligned with Klard design system
export const colors = {
  error: '#DC2626',
  textSecondary: '#475569',
  textMuted: '#64748B',
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  required: {
    fontSize: 14,
    color: colors.error,
  },
  error: {
    fontSize: 14,
    color: colors.error,
  },
  helper: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
