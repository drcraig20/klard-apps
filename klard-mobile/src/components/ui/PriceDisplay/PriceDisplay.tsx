import React, { useMemo } from 'react';
import {
  View,
  Text,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, amountSizeStyles, cycleSizeStyles, changeSizeStyles } from './price-display.styles';
import { cycleLabels, changeColors, changeSizes } from './price-display.constants';

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
