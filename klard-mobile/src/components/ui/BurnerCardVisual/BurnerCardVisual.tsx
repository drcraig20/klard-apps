import React, { useMemo } from 'react';
import { View, Text, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, sizeMap, awaitingStyles, burnedStyles } from './burner-card-visual.styles';
import { useThemeColors } from '@/hooks/useThemeColors';

export type CardStatus = 'active' | 'locked' | 'expired' | 'used' | 'awaiting' | 'burned';
export type CardType = 'single-use' | 'recurring';
export type CardSize = 'sm' | 'md' | 'lg';

export interface BurnerCardData {
  nickname: string;
  type: CardType;
  status: CardStatus;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  spentAmount: number;
  spendLimit: number;
}

export interface BurnerCardVisualProps {
  card: BurnerCardData;
  size?: CardSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onActivate?: () => void;
  children?: React.ReactNode;
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function calculateProgressPercentage(spent: number, limit: number): string {
  if (limit <= 0) return '0%';
  const percentage = Math.min((spent / limit) * 100, 100);
  return `${percentage.toFixed(2)}%`;
}

function BurnerCardVisual({
  card,
  size = 'md',
  style,
  testID,
  onActivate,
  children,
}: Readonly<BurnerCardVisualProps>) {
  const colors = useThemeColors();
  const {
    nickname,
    type,
    status,
    lastFour,
    expiryMonth,
    expiryYear,
    spentAmount,
    spendLimit,
  } = card;

  const isAwaiting = status === 'awaiting';
  const isBurned = status === 'burned';

  // Theme-aware status gradients
  const statusGradients = useMemo<Record<CardStatus, [string, string]>>(() => ({
    active: [colors.burnerActiveGradientStart, colors.burnerActiveGradientEnd],
    locked: [colors.burnerLockedGradientStart, colors.burnerLockedGradientEnd],
    expired: [colors.burnerExpiredGradientStart, colors.burnerExpiredGradientEnd],
    used: [colors.burnerUsedGradientStart, colors.burnerUsedGradientEnd],
    awaiting: [colors.muted, colors.muted],
    burned: [colors.error, colors.accentError],
  }), [colors]);

  const dimensions = sizeMap[size];
  const gradientColors = statusGradients[status];
  const progressWidth = calculateProgressPercentage(spentAmount, spendLimit);

  const accessibilityLabel = `${nickname} card ending in ${lastFour}, ${status}, spent ${formatCurrency(spentAmount)} of ${formatCurrency(spendLimit)}`;

  // Determine text colors based on status
  const textPrimaryColor = isAwaiting ? colors.foreground : '#FFFFFF';
  const textSecondaryColor = isAwaiting ? colors.mutedForeground : 'rgba(255, 255, 255, 0.8)';
  const textTertiaryColor = isAwaiting ? colors.textTertiary : 'rgba(255, 255, 255, 0.7)';
  const badgeBgColor = isAwaiting ? 'rgba(100, 116, 139, 0.2)' : 'rgba(255, 255, 255, 0.2)';
  const progressTrackColor = isAwaiting ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.3)';
  const progressFillColor = isAwaiting ? 'rgba(100, 116, 139, 0.6)' : 'rgba(255, 255, 255, 0.9)';

  // Build container styles
  const containerStyles = [
    styles.card,
    dimensions,
    isAwaiting && awaitingStyles.container,
    isBurned && burnedStyles.container,
    style
  ];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={containerStyles}
      testID={testID ?? 'burner-card-visual'}
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
    >
      {/* Header: Brand + Type Badge */}
      <View style={styles.header}>
        <Text style={[styles.brand, { color: textPrimaryColor }]}>Klard</Text>
        <View style={[styles.typeBadge, { backgroundColor: badgeBgColor }]}>
          <Text style={[styles.typeText, { color: textPrimaryColor }]}>{type}</Text>
        </View>
      </View>

      {/* Card Number */}
      <Text style={[styles.cardNumber, { color: textPrimaryColor }]}>
        •••• •••• •••• {lastFour}
      </Text>

      {/* Awaiting Activation Label */}
      {isAwaiting && (
        <View style={awaitingStyles.labelContainer}>
          <Text style={[awaitingStyles.label, { color: colors.mutedForeground }]}>
            Awaiting Activation
          </Text>
        </View>
      )}

      {/* KYC CTA Button for awaiting state */}
      {isAwaiting && onActivate && (
        <Pressable
          onPress={onActivate}
          style={[awaitingStyles.ctaButton, { backgroundColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Activate card now"
        >
          <Text style={[awaitingStyles.ctaText, { color: colors.primaryForeground }]}>
            Activate Now
          </Text>
        </Pressable>
      )}

      {/* Footer: Card Info + Spending */}
      <View>
        <View style={styles.footer}>
          <View style={styles.cardInfo}>
            <Text style={[styles.nickname, { color: textPrimaryColor }]}>{nickname}</Text>
            <Text style={[styles.expiry, { color: textSecondaryColor }]}>
              {expiryMonth}/{expiryYear}
            </Text>
          </View>
          <View style={styles.spending}>
            <Text style={[styles.spendLabel, { color: textTertiaryColor }]}>Spent</Text>
            <Text style={[styles.spendAmount, { color: textPrimaryColor }]}>
              {formatCurrency(spentAmount)} / {formatCurrency(spendLimit)}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressTrack, { backgroundColor: progressTrackColor }]}
            testID="spending-progress-track"
          >
            <View
              style={[styles.progressFill, { width: progressWidth as any, backgroundColor: progressFillColor }]}
              testID="spending-progress-fill"
            />
          </View>
        </View>
      </View>

      {/* Support for compound pattern children */}
      {children}
    </LinearGradient>
  );
}

export { BurnerCardVisual };
