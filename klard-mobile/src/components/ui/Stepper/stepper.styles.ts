import { StyleSheet } from 'react-native';

/**
 * Stepper component styles
 *
 * Design tokens:
 * - Circle size: 32px
 * - Icon size: 16px
 * - Gap: 8px (horizontal), 12px (vertical)
 * - Connector thickness: 2px
 */
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapperVertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContentVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    // Ring effect via shadow (iOS) and elevation (Android)
    shadowColor: '#0D7C7A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  circleNumber: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelContainer: {
    flexDirection: 'column',
    flexShrink: 1, // Allow wrapping
  },
  label: {
    fontSize: 14,
  },
  labelActive: {
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    marginTop: 2,
  },
  connectorHorizontal: {
    height: 2,
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 999, // Fully rounded
  },
  connectorVertical: {
    width: 2,
    height: 32,
    marginLeft: 15, // Center under 32px circle
    marginVertical: 8,
    borderRadius: 999, // Fully rounded
  },
});
