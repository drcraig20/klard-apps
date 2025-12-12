import { StyleSheet, type ViewStyle } from 'react-native';

// Style generator for dynamic container styles (SoC compliance)
export function getContainerStyle(
  dimension: number,
  borderRadius: number,
  backgroundColor: string
): ViewStyle {
  return {
    width: dimension,
    height: dimension,
    borderRadius,
    backgroundColor,
  };
}

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5F5F4', // teal-100
  },
  fallbackText: {
    fontWeight: '500',
    color: '#0D7C7A', // teal-700
  },
  xsText: { fontSize: 10 },
  smText: { fontSize: 12 },
  mdText: { fontSize: 14 },
  lgText: { fontSize: 16 },
  xlText: { fontSize: 20 },
});
