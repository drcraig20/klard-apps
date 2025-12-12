import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#FFFFFF', // Light mode
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pressed: {
    borderColor: '#0D7C7A', // primary accent
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  muted: {
    opacity: 0.75,
    borderColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: '#475569', // muted text (light)
    fontWeight: '400',
  },
  value: {
    color: '#0F172A', // foreground (light)
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  mutedText: {
    opacity: 0.7,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendValue: {
    fontWeight: '500',
  },
  iconContainer: {
    backgroundColor: '#CCFBF1', // teal-100 (light)
    alignItems: 'center',
    justifyContent: 'center',
  },
});
