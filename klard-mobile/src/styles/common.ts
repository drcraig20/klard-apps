import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from './spacing';

export const commonStyles = StyleSheet.create({
  // Containers
  screenContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddedContainer: {
    padding: spacing.lg,
  },

  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Buttons
  buttonBase: {
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },

  // Cards
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },

  // Inputs
  inputBase: {
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
});
