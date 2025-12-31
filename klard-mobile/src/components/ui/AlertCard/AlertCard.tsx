import React from 'react';
import {
  View,
  Text,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  containerStyles,
  iconBubbleStyles,
  titleStyles,
  bodyStyles,
  timeStyles,
  unreadDotStyles,
  subscriptionChipStyles,
  subscriptionTextStyles,
  subscriptionFallbackStyles,
  subscriptionInitialStyles,
  ctaStyles,
  ctaTextStyles,
  getIconColor,
  layoutStyles,
  type AlertType,
} from './alert-card.styles';

// Shared relative time helper
function formatRelative(date: Date, now = new Date()): string {
  const diff = date.getTime() - now.getTime();
  const minutes = Math.round(diff / 60000);
  const absMinutes = Math.abs(minutes);

  if (absMinutes < 60) {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(minutes, 'minute');
  }
  const hours = Math.round(diff / 3600000);
  if (Math.abs(hours) < 24) {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(hours, 'hour');
  }
  const days = Math.round(diff / 86400000);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(days, 'day');
}

interface TypeConfig {
  icon: keyof typeof Ionicons.glyphMap;
}

const typeConfig: Record<AlertType, TypeConfig> = {
  renewal: { icon: 'calendar' },
  'price-increase': { icon: 'trending-up' },
  'price-decrease': { icon: 'trending-down' },
  blocked: { icon: 'shield' },
  savings: { icon: 'cash-outline' },
  system: { icon: 'information-circle' },
};

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  subscription?: { name: string; logoUrl?: string };
  actionLabel?: string;
}

export interface AlertCardProps {
  alert: Alert;
  onPress: () => void;
  onDismiss?: () => void;
  size?: 'md' | 'sm';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function AlertCard({
  alert,
  onPress,
  onDismiss,
  size = 'md',
  style,
  testID,
}: Readonly<AlertCardProps>) {
  const { isDark, ...colors } = useThemeColors();
  const { icon } = typeConfig[alert.type];
  const timeText = formatRelative(alert.timestamp);
  const iconSize = size === 'sm' ? 16 : 20;
  const iconColor = getIconColor(alert.type, colors);
  const dismissIconColor = colors.mutedForeground;

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const handleDismiss = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDismiss?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={alert.title}
      style={({ pressed }) => [
        ...containerStyles(isDark, { size, pressed: pressed ? 'true' : undefined }),
        style,
      ]}
      testID={testID}
    >
      {/* Icon bubble */}
      <View style={iconBubbleStyles(isDark, { type: alert.type })}>
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          testID="alert-icon"
        />
      </View>

      {/* Content */}
      <View style={layoutStyles.content}>
        {/* Title row */}
        <View style={layoutStyles.titleRow}>
          <Text
            style={titleStyles(isDark, { size })}
            numberOfLines={1}
          >
            {alert.title}
          </Text>
          {!alert.read && (
            <View
              style={unreadDotStyles(isDark, {})}
              accessibilityLabel="unread"
            />
          )}
        </View>

        {/* Body */}
        <Text
          style={bodyStyles(isDark, { size })}
          numberOfLines={2}
        >
          {alert.body}
        </Text>

        {/* Footer */}
        <View style={layoutStyles.footer}>
          <Text style={timeStyles(isDark, {})}>{timeText}</Text>

          {/* Subscription chip */}
          {alert.subscription && (
            <View style={subscriptionChipStyles(isDark, {})}>
              {alert.subscription.logoUrl ? (
                <Image
                  source={alert.subscription.logoUrl}
                  style={layoutStyles.subscriptionLogo}
                  contentFit="cover"
                  accessibilityLabel={alert.subscription.name}
                />
              ) : (
                <View style={[layoutStyles.subscriptionLogo, ...subscriptionFallbackStyles(isDark, {})]}>
                  <Text style={subscriptionInitialStyles(isDark, {})}>
                    {alert.subscription.name[0]}
                  </Text>
                </View>
              )}
              <Text style={subscriptionTextStyles(isDark, {})}>{alert.subscription.name}</Text>
            </View>
          )}

          {/* CTA button */}
          {alert.actionLabel && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                handlePress();
              }}
              style={ctaStyles(isDark, {})}
              accessibilityLabel={alert.actionLabel}
            >
              <Text style={ctaTextStyles(isDark, {})}>{alert.actionLabel}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Dismiss button */}
      {onDismiss && (
        <Pressable
          onPress={handleDismiss}
          style={layoutStyles.dismissButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={`Dismiss ${alert.title}`}
          accessibilityRole="button"
        >
          <Ionicons name="close" size={16} color={dismissIconColor} />
        </Pressable>
      )}
    </Pressable>
  );
}

export type { AlertType };