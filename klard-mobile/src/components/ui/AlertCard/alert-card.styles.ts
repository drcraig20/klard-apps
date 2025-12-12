import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.3)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    position: 'relative',
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#15B5B0',
  },
  body: {
    color: '#475569',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  time: {
    fontSize: 12,
    color: '#64748B',
  },
  subscription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(148,163,184,0.15)',
    borderRadius: 999,
  },
  subscriptionLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  subscriptionFallback: {
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionInitial: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0F172A',
  },
  subscriptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  cta: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D7C7A',
  },
  dismissButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
});

export const variantStyles = StyleSheet.create({
  renewal: { backgroundColor: 'rgba(13,124,122,0.15)' },
  'price-increase': { backgroundColor: 'rgba(245,158,11,0.15)' },
  'price-decrease': { backgroundColor: 'rgba(16,185,129,0.15)' },
  blocked: { backgroundColor: 'rgba(239,68,68,0.15)' },
  savings: { backgroundColor: 'rgba(16,185,129,0.15)' },
  system: { backgroundColor: 'rgba(71,85,105,0.15)' },
});

export const iconColors: Record<string, string> = {
  renewal: '#0D7C7A',
  'price-increase': '#F59E0B',
  'price-decrease': '#10B981',
  blocked: '#EF4444',
  savings: '#10B981',
  system: '#475569',
};

export const sizeStyles = StyleSheet.create({
  md: { padding: 14 },
  sm: { padding: 10, gap: 10 },
});

export const textSizeStyles = {
  md: StyleSheet.create({
    title: { fontSize: 15 },
    body: { fontSize: 14 },
  }),
  sm: StyleSheet.create({
    title: { fontSize: 14 },
    body: { fontSize: 13 },
  }),
};
