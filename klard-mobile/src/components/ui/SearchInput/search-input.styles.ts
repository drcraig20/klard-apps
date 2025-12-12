import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0D7C7A',
  border: '#CBD5E1',
  borderFocused: '#0D7C7A',
  placeholder: '#94A3B8',
  icon: '#64748B',
  text: '#0F172A',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 48,
  },
  containerFocused: {
    borderWidth: 2,
    borderColor: colors.borderFocused,
  },
  containerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  iconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
    paddingRight: 12,
  },
  inputWithAction: {
    paddingRight: 8,
  },
  inputDisabled: {
    color: colors.icon,
  },
  actionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
