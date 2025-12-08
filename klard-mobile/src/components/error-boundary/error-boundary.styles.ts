import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
});
