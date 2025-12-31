import React, { useMemo } from 'react';
import {
  View,
  Text,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  amountStyles,
  cycleLabelStyles,
  changeAmountStyles,
  getChangeColor,
  changeSizes,
  cycleLabels,
  layoutStyles,
} from './price-display.styles';

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
}: Readonly<PriceDisplayProps>) {
  const { isDark, ...colors } = useThemeColors();

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
  const changeColor = showChange ? getChangeColor(showChange.direction, colors) : undefined;

  return (
    <View
      style={[layoutStyles.container, style]}
      testID={testID}
      accessibilityRole="text"
    >
      <Text style={amountStyles(isDark, { size })}>
        {formattedAmount}
      </Text>
      {cycleLabel && (
        <Text style={cycleLabelStyles(isDark, { size })}>
          {cycleLabel}
        </Text>
      )}
      {showChange && (
        <View
          style={layoutStyles.changeContainer}
          testID="price-change-indicator"
        >
          <Ionicons
            name={showChange.direction === 'increase' ? 'arrow-up' : 'arrow-down'}
            size={changeSizes[size].iconSize}
            color={changeColor}
            testID={showChange.direction === 'increase' ? 'arrow-up-icon' : 'arrow-down-icon'}
          />
          <Text
            style={[
              ...changeAmountStyles(isDark, { size, direction: showChange.direction }),
            ]}
          >
            {formatter.format(changeAmount)}
          </Text>
        </View>
      )}
    </View>
  );
}
