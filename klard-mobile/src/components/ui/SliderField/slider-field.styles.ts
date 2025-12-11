import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
  },
  value: {
    fontSize: 14,
    fontWeight: '400',
    fontVariant: ['tabular-nums'],
  },
  sliderContainer: {
    minHeight: 44,
  },
});
