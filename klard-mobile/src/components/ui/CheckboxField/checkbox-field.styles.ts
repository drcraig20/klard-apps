import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginTop: 2,
  },
  labelContainer: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  descriptionDisabled: {
    opacity: 0.5,
  },
});