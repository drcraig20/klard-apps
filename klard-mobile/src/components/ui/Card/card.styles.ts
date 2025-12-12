import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

export const variantStyles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // slate-200
  },
  elevated: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  ghost: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  interactive: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // slate-200, hover changes to #15B5B0 (teal)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});

export const paddingStyles = StyleSheet.create({
  none: {
    padding: 0,
  },
  sm: {
    padding: 12,
  },
  md: {
    padding: 16,
  },
  lg: {
    padding: 24,
  },
});
