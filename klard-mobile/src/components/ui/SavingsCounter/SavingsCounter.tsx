import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import {
  containerStyles,
  labelStyles,
  amountStyles,
  sizeConfig,
  layoutStyles,
} from './savings-counter.styles';

/**
 * Formats a number as currency using Intl.NumberFormat
 *
 * @param amount - The numeric value to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @returns Formatted currency string
 */
function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export interface SavingsCounterProps {
  /** The savings amount to display */
  amount: number;
  /** ISO 4217 currency code (default: 'USD') */
  currency?: string;
  /** Whether to animate the counter (count-up effect) */
  animate?: boolean;
  /** Optional label to display above the amount */
  label?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * SavingsCounter Component (Mobile)
 *
 * Displays a formatted currency amount with success green styling and glow effect.
 * Used to highlight savings achievements in the Klard design system.
 *
 * SRP: Only responsible for displaying formatted savings with success styling
 * OCP: Extensible via style prop and size variants
 * DIP: Depends on abstractions (Intl.NumberFormat) for currency formatting
 */
export function SavingsCounter({
  amount,
  currency = 'USD',
  animate = false,
  label,
  size = 'md',
  style,
  testID = 'savings-counter',
}: Readonly<SavingsCounterProps>) {
  const isDark = useColorScheme() === 'dark';
  const sizeStyles = sizeConfig[size];
  const formattedAmount = formatCurrency(amount, currency);

  // Build accessible label
  const accessibleLabel = label
    ? `${label}: ${formattedAmount}`
    : `Savings: ${formattedAmount}`;

  return (
    <View
      testID={testID}
      accessibilityLabel={accessibleLabel}
      accessibilityRole="text"
      style={[
        containerStyles(isDark),
        { padding: sizeStyles.padding },
        style,
      ]}
    >
      {label && (
        <Text
          testID={`${testID}-label`}
          style={[labelStyles(isDark), { fontSize: sizeStyles.labelFontSize }]}
        >
          {label}
        </Text>
      )}
      <Text
        testID={`${testID}-amount`}
        style={[amountStyles(isDark), { fontSize: sizeStyles.amountFontSize }]}
      >
        {formattedAmount}
      </Text>
    </View>
  );
}
