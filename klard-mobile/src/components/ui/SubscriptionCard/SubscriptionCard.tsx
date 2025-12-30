import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

import { Badge } from '../Badge';
import { HealthIndicator, type HealthStatus } from '../HealthIndicator';
import {
  cardStyles,
  logoFallbackStyles,
  logoFallbackTextStyles,
  nameStyles,
  categoryStyles,
  dateStyles,
  priceStyles,
  cycleStyles,
  layoutStyles,
  statusConfig,
  billingCycleLabels,
  protectedBadgeStyles,
  protectedBadgeTextStyles,
} from './subscription-card.styles';

/**
 * SubscriptionCard Component (Mobile)
 *
 * Displays subscription information with optional health status and protection indicators.
 *
 * SOLID Compliance:
 * - SRP: Only renders subscription card UI
 * - OCP: Extend via props (healthStatus, isProtected) not modification
 * - DIP: Depends on design token abstractions via styles
 */

export interface SubscriptionData {
  id: string;
  name: string;
  logoUrl?: string;
  price: number;
  currency?: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'trial';
  nextBillingDate: Date;
  category?: string;
}

export interface SubscriptionCardProps {
  subscription: SubscriptionData;
  variant?: 'default' | 'compact' | 'detailed';
  /** Health status indicator for the subscription */
  healthStatus?: HealthStatus;
  /** Whether the subscription is protected by Klard */
  isProtected?: boolean;
  showActions?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function SubscriptionCard({
  subscription,
  variant = 'default',
  healthStatus,
  isProtected = false,
  showActions = false,
  onPress,
  style,
  testID,
}: Readonly<SubscriptionCardProps>) {
  const isDark = useColorScheme() === 'dark';
  const [logoError, setLogoError] = useState(false);

  const {
    name,
    logoUrl,
    price,
    currency = 'USD',
    billingCycle,
    status,
    nextBillingDate,
    category,
  } = subscription;

  const statusInfo = statusConfig[status];
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);

  const formattedDate = format(new Date(nextBillingDate), 'MMM d');

  const handlePress = async () => {
    if (onPress) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const logoSize = isCompact ? 32 : 40;
  const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

  const content = (
    <>
      {/* Service Logo */}
      <View style={[layoutStyles.logoContainer, { width: logoSize, height: logoSize }]}>
        {logoUrl && !logoError ? (
          <Image
            source={logoUrl}
            style={[layoutStyles.logo, { width: logoSize, height: logoSize }]}
            contentFit="cover"
            placeholder={{ blurhash }}
            transition={200}
            onError={() => setLogoError(true)}
            accessibilityLabel={`${name} logo`}
          />
        ) : (
          <View style={[logoFallbackStyles(isDark), { width: logoSize, height: logoSize }]}>
            <Text style={logoFallbackTextStyles(isDark)}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={layoutStyles.content}>
        <View style={layoutStyles.nameRow}>
          <Text style={nameStyles(isDark)} numberOfLines={1}>
            {name}
          </Text>
          {!isCompact && (
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          )}
        </View>

        {isDetailed && category && (
          <Text style={categoryStyles(isDark)}>{category}</Text>
        )}

        <Text style={dateStyles(isDark)}>
          {isCompact ? formattedDate : `Next: ${formattedDate}`}
        </Text>
      </View>

      {/* Right Section: Price, Health Status, Protected Badge */}
      <View style={layoutStyles.rightSection}>
        {/* Health Indicator and Protected Badge row */}
        {(healthStatus || isProtected) && (
          <View style={layoutStyles.badgeRow}>
            {healthStatus && (
              <HealthIndicator status={healthStatus} size="sm" showLabel />
            )}
            {isProtected && (
              <View style={protectedBadgeStyles(isDark)}>
                <Ionicons
                  name="shield-checkmark"
                  size={12}
                  color={isDark ? '#10B981' : '#059669'}
                />
                <Text style={protectedBadgeTextStyles(isDark)}>Protected</Text>
              </View>
            )}
          </View>
        )}

        {/* Price */}
        {!isCompact && (
          <View style={layoutStyles.priceContainer}>
            <Text style={priceStyles(isDark)}>{formattedPrice}</Text>
            <Text style={cycleStyles(isDark)}>{billingCycleLabels[billingCycle]}</Text>
          </View>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          cardStyles(isDark, {
            variant,
            pressed: pressed ? 'true' : undefined,
            protected: isProtected ? 'true' : undefined,
          }),
          style,
        ]}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${name} subscription, ${formattedPrice} ${billingCycleLabels[billingCycle]}${isProtected ? ', Protected' : ''}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        cardStyles(isDark, {
          variant,
          protected: isProtected ? 'true' : undefined,
        }),
        style,
      ]}
      testID={testID}
    >
      {content}
    </View>
  );
}
