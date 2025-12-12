import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    gap: 4,
  },
  iconContainer: {
    flexShrink: 0,
  },
  text: {
    fontWeight: '500',
  },
  removeButton: {
    marginLeft: 2,
    padding: 2,
    borderRadius: 9999,
  },
});

export const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: '#F1F5F9', // slate-100
  },
  primary: {
    backgroundColor: '#CCFBF1', // teal-100
  },
  success: {
    backgroundColor: '#DCFCE7', // green-100
  },
  warning: {
    backgroundColor: '#FEF3C7', // amber-100
  },
  error: {
    backgroundColor: '#FEE2E2', // red-100
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CBD5E1', // slate-300
  },
});

export const textStyles = StyleSheet.create({
  default: {
    color: '#334155', // slate-700
  },
  primary: {
    color: '#0D7C7A', // teal-700
  },
  success: {
    color: '#15803D', // green-700
  },
  warning: {
    color: '#B45309', // amber-700
  },
  error: {
    color: '#B91C1C', // red-700
  },
  outline: {
    color: '#475569', // slate-600
  },
});

export const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

export const textSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
});
