import { StyleSheet } from 'react-native';

import { Colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  illustration: {
    width: 160,
    height: 160,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: Colors.light.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: Colors.light.mutedForeground,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
