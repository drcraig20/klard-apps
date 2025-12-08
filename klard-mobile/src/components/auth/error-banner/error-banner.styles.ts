import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  message: {
    flex: 1,
  },
  dismissButton: {
    padding: spacing.xs,
  },
});
