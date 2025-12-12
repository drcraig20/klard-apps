export const trendConfig = {
  up: {
    iconName: 'trending-up' as const,
    color: '#059669', // green-600 (light) / #10B981 (dark - handled via theme)
  },
  down: {
    iconName: 'trending-down' as const,
    color: '#DC2626', // red-600 (light) / #EF4444 (dark - handled via theme)
  },
  neutral: {
    iconName: 'remove' as const,
    color: '#64748B', // slate-500 (light) / #CBD5E1 (dark - handled via theme)
  },
} as const;

export const sizeConfig = {
  sm: { padding: 12, fontSize: 14, valueFontSize: 18, iconSize: 16 },
  md: { padding: 16, fontSize: 16, valueFontSize: 24, iconSize: 18 },
  lg: { padding: 20, fontSize: 18, valueFontSize: 28, iconSize: 20 },
};
