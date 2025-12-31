import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 20,
    fontWeight: '700',
    // Color applied inline via theme token
    letterSpacing: 1,
  },
  typeBadge: {
    // Background color applied inline via theme token
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    // Color applied inline via theme token
    textTransform: 'uppercase',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '500',
    // Color applied inline via theme token
    letterSpacing: 3,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 14,
    fontWeight: '600',
    // Color applied inline via theme token
    marginBottom: 2,
  },
  expiry: {
    fontSize: 12,
    // Color applied inline via theme token
  },
  spending: {
    alignItems: 'flex-end',
  },
  spendLabel: {
    fontSize: 10,
    // Color applied inline via theme token
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  spendAmount: {
    fontSize: 12,
    fontWeight: '600',
    // Color applied inline via theme token
  },
  progressContainer: {
    marginTop: 12,
  },
  progressTrack: {
    height: 4,
    // Background color applied inline via theme token
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    // Background color applied inline via theme token
    borderRadius: 2,
  },
});

/**
 * Awaiting state specific styles
 *
 * SOLID: SRP - Awaiting-specific styling separated from base styles
 */
export const awaitingStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(100, 116, 139, 0.5)',
  },
  labelContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  ctaButton: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

/**
 * Burned state specific styles
 *
 * SOLID: SRP - Burned-specific styling separated from base styles
 */
export const burnedStyles = StyleSheet.create({
  container: {
    opacity: 0.6,
  },
});

export const sizeMap = {
  sm: { width: 256, height: 160 },
  md: { width: 320, height: 192 },
  lg: { width: 384, height: 224 },
} as const;
