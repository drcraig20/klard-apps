import { StyleSheet } from 'react-native';

// Color constants aligned with Klard design system
export const colors = {
  primary: '#0D7C7A',
  primaryDark: '#15B5B0',
  error: '#DC2626',
  border: 'rgba(148, 163, 184, 0.2)',
  borderDark: 'rgba(148, 163, 184, 0.12)',
  placeholder: '#94A3B8',
  icon: '#64748B',
  text: '#0F172A',
  textSecondary: '#475569',
  // Glassmorphic backgrounds
  background: 'rgba(255, 255, 255, 0.02)',
  backgroundDark: 'rgba(255, 255, 255, 0.01)',
  backgroundDisabled: '#F1F5F9',
  // Glow effects
  glowPrimary: 'rgba(13, 124, 122, 0.3)',
  glowPrimaryDark: 'rgba(21, 181, 176, 0.35)',
  glowError: 'rgba(220, 38, 38, 0.2)',
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  required: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Glassmorphic background
    backgroundColor: colors.background,
    borderRadius: 8,
    height: 48,
  },
  inputContainerFocused: {
    // Glow effect on focus
    shadowColor: colors.glowPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  inputContainerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  leftIconContainer: {
    paddingLeft: 12,
  },
  rightIconContainer: {
    paddingRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  inputDisabled: {
    color: colors.icon,
  },
  rightActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
