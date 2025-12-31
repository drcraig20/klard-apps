import { StyleSheet } from 'react-native';
import { type ThemeColors } from '@/styles';

/**
 * Returns theme-aware colors for CurrencyInput component.
 * Call this from the component with useThemeColors() result.
 */
export const getCurrencyInputColors = (themeColors: ThemeColors) => ({
  primary: themeColors.primary,
  error: themeColors.error,
  border: themeColors.border,
  placeholder: themeColors.textDisabled,
  text: themeColors.foreground,
  textSecondary: themeColors.textSecondary,
  background: themeColors.background,
  backgroundDisabled: themeColors.disabledBackground,
});

export type CurrencyInputColors = ReturnType<typeof getCurrencyInputColors>;

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  inputContainerDisabled: {
    opacity: 0.7,
  },
  symbol: {
    fontSize: 16,
    marginRight: 8,
  },
  symbolDisabled: {},
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  inputDisabled: {},
});
