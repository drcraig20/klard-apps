import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#0D7C7A',
    shadowColor: '#0D7C7A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  secondary: {
    backgroundColor: '#15B5B0',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#DC2626',
  },
  link: {
    backgroundColor: 'transparent',
  },
});

export const sizeStyles = StyleSheet.create({
  sm: {
    height: 32,
    paddingHorizontal: 12,
  },
  md: {
    height: 40,
    paddingHorizontal: 16,
  },
  lg: {
    height: 48,
    paddingHorizontal: 24,
  },
});

export const textStyles = StyleSheet.create({
  primary: {
    color: '#FFFFFF',
  },
  secondary: {
    color: '#FFFFFF',
  },
  outline: {
    color: '#0F172A',
  },
  ghost: {
    color: '#0F172A',
  },
  destructive: {
    color: '#FFFFFF',
  },
  link: {
    color: '#0D7C7A',
    textDecorationLine: 'underline',
  },
});

export const textSizeStyles = StyleSheet.create({
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
