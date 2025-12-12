import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    gap: 8,
  },
  iconWrapper: {
    paddingTop: 2,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionWrapper: {
    marginTop: 8,
  },
  dismiss: {
    padding: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
});

export const sizeStyles = StyleSheet.create({
  default: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  compact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
