import React, { useMemo } from 'react';
import { View, Text, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, sizeMap } from './burner-card-visual.styles';
import { useThemeColors } from '@/hooks/useThemeColors';

export type CardStatus = 'active' | 'locked' | 'expired' | 'used';
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

  // Theme-aware status gradients
  const statusGradients = useMemo<Record<CardStatus, [string, string]>>(() => ({
    active: [colors.burnerActiveGradientStart, colors.burnerActiveGradientEnd],
    locked: [colors.burnerLockedGradientStart, colors.burnerLockedGradientEnd],
    expired: [colors.burnerExpiredGradientStart, colors.burnerExpiredGradientEnd],
    used: [colors.burnerUsedGradientStart, colors.burnerUsedGradientEnd],
  }), [colors]);

  const dimensions = sizeMap[size];
  const gradientColors = statusGradients[status];
  const progressWidth = calculateProgressPercentage(spentAmount, spendLimit);

  const accessibilityLabel = `${nickname} card ending in ${lastFour}, ${status}, spent ${formatCurrency(spentAmount)} of ${formatCurrency(spendLimit)}`;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, dimensions, style]}
      testID={testID ?? 'burner-card-visual'}
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
    >
      {/* Header: Brand + Type Badge */}
      <View style={styles.header}>
        <Text style={styles.brand}>Klard</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>

      {/* Card Number */}
      <Text style={styles.cardNumber}>•••• •••• •••• {lastFour}</Text>

      {/* Footer: Card Info + Spending */}
      <View>
        <View style={styles.footer}>
          <View style={styles.cardInfo}>
            <Text style={styles.nickname}>{nickname}</Text>
            <Text style={styles.expiry}>
              {expiryMonth}/{expiryYear}
            </Text>
          </View>
          <View style={styles.spending}>
            <Text style={styles.spendLabel}>Spent</Text>
            <Text style={styles.spendAmount}>
              {formatCurrency(spentAmount)} / {formatCurrency(spendLimit)}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack} testID="spending-progress-track">
            <View
              style={[styles.progressFill, { width: progressWidth as any }]}
              testID="spending-progress-fill"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

export { BurnerCardVisual };
