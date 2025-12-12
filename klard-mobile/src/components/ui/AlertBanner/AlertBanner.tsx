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
import { styles, sizeStyles } from './alert-banner.styles';
import { typeIconMap, getTypeColors, type AlertType } from './alert-banner.constants';

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
