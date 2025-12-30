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
    shadowColor: 'rgb(21, 181, 176)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  success: {
    backgroundColor: '#DCFCE7', // green-100
    shadowColor: 'rgb(16, 185, 129)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  warning: {
    backgroundColor: '#FEF3C7', // amber-100
    shadowColor: 'rgb(245, 158, 11)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  error: {
    backgroundColor: '#FEE2E2', // red-100
    shadowColor: 'rgb(239, 68, 68)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
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
