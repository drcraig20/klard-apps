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
import { styles, variantStyles, iconColors, sizeStyles, textSizeStyles } from './alert-card.styles';

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

type AlertType = 'renewal' | 'price-increase' | 'price-decrease' | 'blocked' | 'savings' | 'system';

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
}: AlertCardProps) {
  const { icon } = typeConfig[alert.type];
  const timeText = formatRelative(alert.timestamp);
  const iconSize = size === 'sm' ? 16 : 20;

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
        styles.container,
        sizeStyles[size],
        pressed && styles.pressed,
        style,
      ]}
      testID={testID}
    >
      {/* Icon bubble */}
      <View style={[styles.iconBubble, variantStyles[alert.type]]}>
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColors[alert.type]}
          testID="alert-icon"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, textSizeStyles[size].title]}
            numberOfLines={1}
          >
            {alert.title}
          </Text>
          {!alert.read && (
            <View
              style={styles.unreadDot}
              accessibilityLabel="unread"
            />
          )}
        </View>

        {/* Body */}
        <Text
          style={[styles.body, textSizeStyles[size].body]}
          numberOfLines={2}
        >
          {alert.body}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.time}>{timeText}</Text>

          {/* Subscription chip */}
          {alert.subscription && (
            <View style={styles.subscription}>
              {alert.subscription.logoUrl ? (
                <Image
                  source={alert.subscription.logoUrl}
                  style={styles.subscriptionLogo}
                  contentFit="cover"
                  accessibilityLabel={alert.subscription.name}
                />
              ) : (
                <View style={[styles.subscriptionLogo, styles.subscriptionFallback]}>
                  <Text style={styles.subscriptionInitial}>
                    {alert.subscription.name[0]}
                  </Text>
                </View>
              )}
              <Text style={styles.subscriptionText}>{alert.subscription.name}</Text>
            </View>
          )}

          {/* CTA button */}
          {alert.actionLabel && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                handlePress();
              }}
              style={styles.cta}
              accessibilityLabel={alert.actionLabel}
            >
              <Text style={styles.ctaText}>{alert.actionLabel}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Dismiss button */}
      {onDismiss && (
        <Pressable
          onPress={handleDismiss}
          style={styles.dismissButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel={`Dismiss ${alert.title}`}
          accessibilityRole="button"
        >
          <Ionicons name="close" size={16} color="#94A3B8" />
        </Pressable>
      )}
    </Pressable>
  );
}
