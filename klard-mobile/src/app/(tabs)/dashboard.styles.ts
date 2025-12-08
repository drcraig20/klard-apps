import { StyleSheet } from 'react-native';
import { spacing } from '@/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  greeting: {
    marginBottom: spacing.xs,
  },
  signOutButton: {
    padding: spacing.sm,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
  },
});
