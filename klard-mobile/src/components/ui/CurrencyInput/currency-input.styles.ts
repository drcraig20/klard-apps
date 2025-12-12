import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
};

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
  },
  inputContainerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  symbol: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: 8,
  },
  symbolDisabled: {
    color: colors.placeholder,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    fontSize: 16,
    color: colors.text,
  },
  inputDisabled: {
    color: colors.placeholder,
  },
});
