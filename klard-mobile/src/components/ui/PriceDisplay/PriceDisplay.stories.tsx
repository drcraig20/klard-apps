import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { PriceDisplay } from './PriceDisplay';

/**
 * PriceDisplay renders formatted currency amounts with optional billing cycle labels
 * and price change indicators. Supports multiple sizes and currencies via Intl.NumberFormat.
 */
const meta: Meta<typeof PriceDisplay> = {
  title: 'Display/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: 'number',
      description: 'The price amount to display',
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
      description: 'Currency code for formatting',
    },
    billingCycle: {
      control: 'select',
      options: ['monthly', 'yearly', 'weekly', 'one-time', undefined],
      description: 'Billing cycle label to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the price display',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default monthly subscription price
export const Default: Story = {
  args: {
    amount: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    size: 'md',
  },
};

// Yearly subscription
export const YearlySubscription: Story = {
  args: {
    amount: 99.99,
    currency: 'USD',
    billingCycle: 'yearly',
    size: 'md',
  },
};

// Weekly subscription
export const WeeklySubscription: Story = {
  args: {
    amount: 2.99,
    currency: 'USD',
    billingCycle: 'weekly',
    size: 'md',
  },
};

// One-time purchase
export const OneTimePurchase: Story = {
  args: {
    amount: 149.99,
    currency: 'USD',
    billingCycle: 'one-time',
    size: 'md',
  },
};

// Price without billing cycle
export const NoBillingCycle: Story = {
  args: {
    amount: 24.99,
    currency: 'USD',
    size: 'md',
  },
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <PriceDisplay amount={9.99} billingCycle="monthly" size="sm" />
      <PriceDisplay amount={9.99} billingCycle="monthly" size="md" />
      <PriceDisplay amount={9.99} billingCycle="monthly" size="lg" />
    </View>
  ),
};

// Price increase indicator
export const PriceIncrease: Story = {
  args: {
    amount: 14.99,
    currency: 'USD',
    billingCycle: 'monthly',
    size: 'md',
    showChange: {
      from: 9.99,
      direction: 'increase',
    },
  },
};

// Price decrease indicator (savings)
export const PriceDecrease: Story = {
  args: {
    amount: 7.99,
    currency: 'USD',
    billingCycle: 'monthly',
    size: 'md',
    showChange: {
      from: 12.99,
      direction: 'decrease',
    },
  },
};

// Different currencies
export const Currencies: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <PriceDisplay amount={9.99} currency="USD" billingCycle="monthly" />
      <PriceDisplay amount={8.99} currency="EUR" billingCycle="monthly" />
      <PriceDisplay amount={7.99} currency="GBP" billingCycle="monthly" />
      <PriceDisplay amount={1200} currency="JPY" billingCycle="monthly" />
      <PriceDisplay amount={12.99} currency="CAD" billingCycle="monthly" />
    </View>
  ),
};

// Subscription comparison
export const SubscriptionComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 8 }}>
        <PriceDisplay
          amount={9.99}
          billingCycle="monthly"
          size="md"
        />
      </View>
      <View style={{ gap: 8 }}>
        <PriceDisplay
          amount={99.99}
          billingCycle="yearly"
          size="md"
          showChange={{
            from: 119.88,
            direction: 'decrease',
          }}
        />
      </View>
    </View>
  ),
};

// Large price (premium tier)
export const PremiumPrice: Story = {
  args: {
    amount: 299.99,
    currency: 'USD',
    billingCycle: 'yearly',
    size: 'lg',
  },
};

// Small inline price
export const InlineSmall: Story = {
  args: {
    amount: 4.99,
    currency: 'USD',
    billingCycle: 'monthly',
    size: 'sm',
  },
};
