import { Ionicons } from '@expo/vector-icons';
import type { ViewStyle } from 'react-native';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const typeIconMap: Record<AlertType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
};

// Light theme colors
export const lightSuccess = {
  container: { backgroundColor: '#F0FDF4', borderColor: '#22C55E', borderWidth: 1 },
  textColor: '#166534',
  iconColor: '#22C55E',
};

export const lightError = {
  container: { backgroundColor: '#FEF2F2', borderColor: '#EF4444', borderWidth: 1 },
  textColor: '#991B1B',
  iconColor: '#EF4444',
};

export const lightWarning = {
  container: { backgroundColor: '#FFFBEB', borderColor: '#F59E0B', borderWidth: 1 },
  textColor: '#92400E',
  iconColor: '#F59E0B',
};

export const lightInfo = {
  container: { backgroundColor: '#F0FDFA', borderColor: '#14B8A6', borderWidth: 1 },
  textColor: '#134E4A',
  iconColor: '#14B8A6',
};

// Dark theme colors
export const darkSuccess = {
  container: { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: '#22C55E', borderWidth: 1 },
  textColor: '#4ADE80',
  iconColor: '#4ADE80',
};

export const darkError = {
  container: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444', borderWidth: 1 },
  textColor: '#F87171',
  iconColor: '#F87171',
};

export const darkWarning = {
  container: { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B', borderWidth: 1 },
  textColor: '#FBBF24',
  iconColor: '#FBBF24',
};

export const darkInfo = {
  container: { backgroundColor: 'rgba(20, 184, 166, 0.15)', borderColor: '#14B8A6', borderWidth: 1 },
  textColor: '#2DD4BF',
  iconColor: '#2DD4BF',
};

export function getTypeColors(
  type: AlertType,
  colorScheme: 'light' | 'dark'
): { container: ViewStyle; textColor: string; iconColor: string } {
  const isLight = colorScheme === 'light';

  const colorMap: Record<
    AlertType,
    { light: typeof lightSuccess; dark: typeof darkSuccess }
  > = {
    success: { light: lightSuccess, dark: darkSuccess },
    error: { light: lightError, dark: darkError },
    warning: { light: lightWarning, dark: darkWarning },
    info: { light: lightInfo, dark: darkInfo },
  };

  return isLight ? colorMap[type].light : colorMap[type].dark;
}
