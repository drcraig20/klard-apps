import { StyleSheet } from 'react-native';
import { type ThemeColors } from '@/styles';

// ============================================================================
// Theme-Aware Colors
// ============================================================================

/**
 * Returns theme-aware colors for PasswordInput component.
 * Call this from the component with useThemeColors() result.
 */
export const getPasswordInputColors = (themeColors: ThemeColors) => ({
  primary: themeColors.primary,
  error: themeColors.error,
  border: themeColors.border,
  placeholder: themeColors.textDisabled,
  icon: themeColors.textTertiary,
  text: themeColors.foreground,
  textSecondary: themeColors.textSecondary,
  background: themeColors.background,
  backgroundDisabled: themeColors.disabledBackground,
});

export type PasswordInputColors = ReturnType<typeof getPasswordInputColors>;

// ============================================================================
// Input Styles
// ============================================================================

export const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  required: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
  },
  inputContainerDisabled: {
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  inputDisabled: {},
  toggleButton: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    marginTop: 8,
  },
});

// ============================================================================
// Strength Indicator Styles
// ============================================================================

export const strengthStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  feedback: {
    fontSize: 12,
  },
});

// ============================================================================
// Requirements List Styles
// ============================================================================

export const reqStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
  },
});
