import { StyleSheet, type ViewStyle, type TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  } as ViewStyle,
  contentContainer: {
    paddingHorizontal: 16,
    gap: 8,
  } as ViewStyle,
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    gap: 8,
  } as ViewStyle,
  activeTab: {
    backgroundColor: '#F1F5F9', // slate-100
    borderBottomWidth: 2,
    borderBottomColor: '#0D7C7A', // primary teal
  } as ViewStyle,
  disabledTab: {
    opacity: 0.5,
  } as ViewStyle,
  pressedTab: {
    opacity: 0.7,
  } as ViewStyle,
  iconContainer: {
    marginRight: 4,
  } as ViewStyle,
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B', // slate-500
  } as TextStyle,
  activeTabLabel: {
    color: '#0D7C7A', // primary teal
    fontWeight: '600',
  } as TextStyle,
  disabledTabLabel: {
    color: '#94A3B8', // slate-400
  } as TextStyle,
  badge: {
    backgroundColor: '#F1F5F9', // slate-100
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  } as ViewStyle,
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B', // slate-500
  } as TextStyle,
});
