import React from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  alertContainerStyles,
  alertTextStyles,
  getIconColor,
  layoutStyles,
  type AlertType,
} from './alert-banner.styles';

type AlertSize = 'default' | 'compact';

const typeIconMap: Record<AlertType, keyof typeof Ionicons.glyphMap> = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  warning: 'warning',
  info: 'information-circle',
};

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
}: Readonly<AlertBannerProps>) {
  const isDark = useColorScheme() === 'dark';
  const iconColor = getIconColor(type, isDark);

  const handleDismiss = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDismiss?.();
  };

  return (
    <View
      style={[...alertContainerStyles(isDark, { type, size }), style]}
      accessibilityRole="alert"
      testID={testID}
    >
      <View style={layoutStyles.iconWrapper}>
        {icon ?? (
          <Ionicons
            testID="alert-icon"
            name={typeIconMap[type]}
            size={20}
            color={iconColor}
          />
        )}
      </View>
      <View style={layoutStyles.content}>
        {title ? (
          <Text style={alertTextStyles(isDark, { type, textType: 'title' })}>
            {title}
          </Text>
        ) : null}
        <Text style={alertTextStyles(isDark, { type, textType: 'description' })}>
          {children}
        </Text>
        {action ? <View style={layoutStyles.actionWrapper}>{action}</View> : null}
      </View>
      {dismissible ? (
        <Pressable
          accessibilityLabel="Dismiss alert"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={handleDismiss}
          style={layoutStyles.dismiss}
        >
          <Ionicons name="close" size={18} color={iconColor} />
        </Pressable>
      ) : null}
    </View>
  );
}

export type { AlertType };