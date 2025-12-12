import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type AlertType = 'success' | 'error' | 'warning' | 'info';
type AlertSize = 'default' | 'compact';

export interface AlertBannerProps {
  type: AlertType;
  size?: AlertSize;
  title?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const typeIconMap: Record<AlertType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
};

export function AlertBanner({
  type,
  size = 'default',
  title,
  children,
  action,
  dismissible = false,
  onDismiss,
  icon,
  style,
  testID,
}: AlertBannerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const typeColors = getTypeColors(type, colorScheme);
  const padding = sizeStyles[size];

  const handleDismiss = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDismiss?.();
  };

  return (
    <View
      style={[styles.container, typeColors.container, padding, style]}
      accessibilityRole="alert"
      testID={testID}
    >
      <View style={styles.iconWrapper}>
        {icon ?? (
          <Ionicons
            testID="alert-icon"
            name={typeIconMap[type]}
            size={20}
            color={typeColors.iconColor}
          />
        )}
      </View>
      <View style={styles.content}>
        {title ? <Text style={[styles.title, { color: typeColors.textColor }]}>{title}</Text> : null}
        <Text style={[styles.description, { color: typeColors.textColor }]}>{children}</Text>
        {action ? <View style={styles.actionWrapper}>{action}</View> : null}
      </View>
      {dismissible ? (
        <Pressable
          accessibilityLabel="Dismiss alert"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={handleDismiss}
          style={styles.dismiss}
        >
          <Ionicons name="close" size={18} color={typeColors.iconColor} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    gap: 8,
  },
  iconWrapper: {
    paddingTop: 2,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionWrapper: {
    marginTop: 8,
  },
  dismiss: {
    padding: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
});

const sizeStyles = StyleSheet.create({
  default: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  compact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

function getTypeColors(
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

// Light theme colors
const lightSuccess = {
  container: { backgroundColor: '#F0FDF4', borderColor: '#22C55E', borderWidth: 1 },
  textColor: '#166534',
  iconColor: '#22C55E',
};

const lightError = {
  container: { backgroundColor: '#FEF2F2', borderColor: '#EF4444', borderWidth: 1 },
  textColor: '#991B1B',
  iconColor: '#EF4444',
};

const lightWarning = {
  container: { backgroundColor: '#FFFBEB', borderColor: '#F59E0B', borderWidth: 1 },
  textColor: '#92400E',
  iconColor: '#F59E0B',
};

const lightInfo = {
  container: { backgroundColor: '#F0FDFA', borderColor: '#14B8A6', borderWidth: 1 },
  textColor: '#134E4A',
  iconColor: '#14B8A6',
};

// Dark theme colors
const darkSuccess = {
  container: { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderColor: '#22C55E', borderWidth: 1 },
  textColor: '#4ADE80',
  iconColor: '#4ADE80',
};

const darkError = {
  container: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#EF4444', borderWidth: 1 },
  textColor: '#F87171',
  iconColor: '#F87171',
};

const darkWarning = {
  container: { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#F59E0B', borderWidth: 1 },
  textColor: '#FBBF24',
  iconColor: '#FBBF24',
};

const darkInfo = {
  container: { backgroundColor: 'rgba(20, 184, 166, 0.15)', borderColor: '#14B8A6', borderWidth: 1 },
  textColor: '#2DD4BF',
  iconColor: '#2DD4BF',
};
