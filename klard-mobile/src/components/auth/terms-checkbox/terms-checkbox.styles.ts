import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontWeight: '600',
  },
  error: {
    fontSize: 14,
    marginTop: 8,
  },
});