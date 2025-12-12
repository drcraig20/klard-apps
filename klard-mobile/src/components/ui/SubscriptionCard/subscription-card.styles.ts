import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardCompact: {
    padding: 12,
    gap: 12,
  },
  cardDetailed: {
    padding: 20,
  },
  cardPressed: {
    backgroundColor: '#F8FAFC',
    borderColor: 'rgba(13, 124, 122, 0.3)',
  },
  logoContainer: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  logo: {
    borderRadius: 9999,
  },
  logoFallback: {
    backgroundColor: '#CCFBF1',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFallbackText: {
    color: '#0D7C7A',
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  category: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  cycle: {
    fontSize: 14,
    color: '#64748B',
  },
});
