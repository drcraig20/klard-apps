import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface PriceDisplayProps {
  amount: number;
  currency?: string;
  billingCycle?: 'monthly' | 'yearly' | 'weekly' | 'one-time';
  size?: 'sm' | 'md' | 'lg';
  showChange?: {
    from: number;
    direction: 'increase' | 'decrease';
  };
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const cycleLabels: Record<string, string> = {
  monthly: '/mo',
  yearly: '/yr',
  weekly: '/wk',
  'one-time': '',
};

export function PriceDisplay({
  amount,
  currency = 'USD',
  billingCycle,
  size = 'md',
  showChange,
  style,
  testID,
}: PriceDisplayProps) {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }),
    [currency]
  );

  const formattedAmount = formatter.format(amount);
  const cycleLabel = billingCycle ? cycleLabels[billingCycle] : '';
  const changeAmount = showChange ? Math.abs(amount - showChange.from) : 0;

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityRole="text"
    >
      <Text style={[styles.amount, amountSizeStyles[size]]}>
        {formattedAmount}
      </Text>
      {cycleLabel && (
        <Text style={[styles.cycleLabel, cycleSizeStyles[size]]}>
          {cycleLabel}
        </Text>
      )}
      {showChange && (
        <View
          style={styles.changeContainer}
          testID="price-change-indicator"
        >
          <Ionicons
            name={showChange.direction === 'increase' ? 'arrow-up' : 'arrow-down'}
            size={changeSizes[size].iconSize}
            color={changeColors[showChange.direction]}
            testID={showChange.direction === 'increase' ? 'arrow-up-icon' : 'arrow-down-icon'}
          />
          <Text
            style={[
              styles.changeAmount,
              changeSizeStyles[size],
              { color: changeColors[showChange.direction] },
            ]}
          >
            {formatter.format(changeAmount)}
          </Text>
        </View>
      )}
    </View>
  );
}

const changeColors = {
  increase: '#EF4444', // red-500
  decrease: '#22C55E', // green-500
};

const changeSizes = {
  sm: { iconSize: 10 },
  md: { iconSize: 12 },
  lg: { iconSize: 14 },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  amount: {
    fontWeight: '500',
    color: '#0F172A', // slate-900
  },
  cycleLabel: {
    fontWeight: '400',
    color: '#64748B', // slate-500
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
  },
  changeAmount: {
    fontWeight: '400',
  },
});

const amountSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 20,
    fontWeight: '600',
  },
});

const cycleSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
});

const changeSizeStyles = StyleSheet.create({
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
});
