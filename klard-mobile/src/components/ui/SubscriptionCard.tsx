import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';

import { Badge } from './Badge';

const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  trial: { label: 'Trial', variant: 'warning' as const },
  paused: { label: 'Paused', variant: 'default' as const },
  cancelled: { label: 'Cancelled', variant: 'default' as const },
  expired: { label: 'Expired', variant: 'error' as const },
};

const billingCycleLabels = {
  monthly: '/mo',
  quarterly: '/qtr',
  yearly: '/yr',
};

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
  showActions?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function SubscriptionCard({
  subscription,
  variant = 'default',
  showActions = false,
  onPress,
  style,
  testID,
}: SubscriptionCardProps) {
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
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        {logoUrl && !logoError ? (
          <Image
            source={logoUrl}
            style={[styles.logo, { width: logoSize, height: logoSize }]}
            contentFit="cover"
            placeholder={{ blurhash }}
            transition={200}
            onError={() => setLogoError(true)}
            accessibilityLabel={`${name} logo`}
          />
        ) : (
          <View style={[styles.logoFallback, { width: logoSize, height: logoSize }]}>
            <Text style={styles.logoFallbackText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          {!isCompact && (
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          )}
        </View>

        {isDetailed && category && (
          <Text style={styles.category}>{category}</Text>
        )}

        <Text style={styles.date}>
          {isCompact ? formattedDate : `Next: ${formattedDate}`}
        </Text>
      </View>

      {/* Price */}
      {!isCompact && (
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Text style={styles.cycle}>{billingCycleLabels[billingCycle]}</Text>
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.card,
          isCompact && styles.cardCompact,
          isDetailed && styles.cardDetailed,
          pressed && styles.cardPressed,
          style,
        ]}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${name} subscription, ${formattedPrice} ${billingCycleLabels[billingCycle]}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        isCompact && styles.cardCompact,
        isDetailed && styles.cardDetailed,
        style,
      ]}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardCompact: {
    padding: 12,
    gap: 12,
  },
  cardDetailed: {
    padding: 20,
  },
  cardPressed: {
    backgroundColor: '#F8FAFC',
    borderColor: 'rgba(13, 124, 122, 0.3)',
  },
  logoContainer: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  logo: {
    borderRadius: 9999,
  },
  logoFallback: {
    backgroundColor: '#CCFBF1',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFallbackText: {
    color: '#0D7C7A',
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  category: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    color: '#64748B',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  cycle: {
    fontSize: 14,
    color: '#64748B',
  },
});
