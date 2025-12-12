import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  amount: {
    fontWeight: '500',
    color: '#0F172A', // slate-900
  },
  cycleLabel: {
    fontWeight: '400',
    color: '#64748B', // slate-500
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
  },
  changeAmount: {
    fontWeight: '400',
  },
});

export const amountSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export const cycleSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
});

export const changeSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
});
