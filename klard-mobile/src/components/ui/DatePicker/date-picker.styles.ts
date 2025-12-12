import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  icon: '#64748B',
  iconDisabled: '#94A3B8',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
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
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
  },
  triggerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.placeholder,
  },
  valueDisabled: {
    color: colors.icon,
  },
  pickerContainer: {
    marginTop: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
});
