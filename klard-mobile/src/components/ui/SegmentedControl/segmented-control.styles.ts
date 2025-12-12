import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9', // slate-100
    borderRadius: 8,
    padding: 2,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 4,
  },
  segmentFullWidth: {
    flex: 1,
  },
  firstSegment: {
    // Additional styling for first segment if needed
  },
  lastSegment: {
    // Additional styling for last segment if needed
  },
  selectedSegment: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pressedSegment: {
    opacity: 0.7,
  },
  disabledSegment: {
    opacity: 0.5,
  },
  iconContainer: {
    flexShrink: 0,
  },
  label: {
    fontWeight: '500',
    color: '#64748B', // slate-500
  },
  selectedLabel: {
    color: '#0D7C7A', // teal-700 (Klard primary)
  },
  disabledLabel: {
    color: '#94A3B8', // slate-400
  },
});

export const sizeStyles = {
  sm: StyleSheet.create({
    container: {
      height: 32,
    },
    segment: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    label: {
      fontSize: 13,
    },
  }),
  md: StyleSheet.create({
    container: {
      height: 40,
    },
    segment: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    label: {
      fontSize: 14,
    },
  }),
};
