import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SubscriptionCard, type SubscriptionData } from './SubscriptionCard';

/**
 * SubscriptionCard displays subscription service information including logo,
 * name, price, billing cycle, status badge, and next billing date. Supports
 * multiple variants (default, compact, detailed) for different layout needs.
 */
const meta: Meta<typeof SubscriptionCard> = {
  title: 'Cards/SubscriptionCard',
  component: SubscriptionCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'The layout variant of the card',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when the card is pressed',
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

// Mock subscription data factory
const createMockSubscription = (overrides: Partial<SubscriptionData> = {}): SubscriptionData => ({
  id: '1',
  name: 'Netflix',
  logoUrl: 'https://logo.clearbit.com/netflix.com',
  price: 15.99,
  currency: 'USD',
  billingCycle: 'monthly',
  status: 'active',
  nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  category: 'Entertainment',
  ...overrides,
});

// Default subscription card
export const Default: Story = {
  args: {
    subscription: createMockSubscription(),
    variant: 'default',
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Spotify',
      logoUrl: 'https://logo.clearbit.com/spotify.com',
      price: 9.99,
    }),
    variant: 'compact',
  },
};

// Detailed variant with category
export const Detailed: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Adobe Creative Cloud',
      logoUrl: 'https://logo.clearbit.com/adobe.com',
      price: 54.99,
      category: 'Productivity',
    }),
    variant: 'detailed',
  },
};

// Active status
export const Active: Story = {
  args: {
    subscription: createMockSubscription({
      status: 'active',
    }),
    variant: 'default',
  },
};

// Paused status
export const Paused: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'YouTube Premium',
      logoUrl: 'https://logo.clearbit.com/youtube.com',
      price: 13.99,
      status: 'paused',
    }),
    variant: 'default',
  },
};

// Cancelled status
export const Cancelled: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Disney+',
      logoUrl: 'https://logo.clearbit.com/disneyplus.com',
      price: 10.99,
      status: 'cancelled',
    }),
    variant: 'default',
  },
};

// Expired status
export const Expired: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'HBO Max',
      logoUrl: 'https://logo.clearbit.com/hbomax.com',
      price: 15.99,
      status: 'expired',
      nextBillingDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    }),
    variant: 'default',
  },
};

// Trial status
export const Trial: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Apple Music',
      logoUrl: 'https://logo.clearbit.com/apple.com',
      price: 10.99,
      status: 'trial',
      nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    }),
    variant: 'default',
  },
};

// Different billing cycles
export const MonthlyBilling: Story = {
  args: {
    subscription: createMockSubscription({
      billingCycle: 'monthly',
      price: 9.99,
    }),
    variant: 'default',
  },
};

export const QuarterlyBilling: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Notion',
      logoUrl: 'https://logo.clearbit.com/notion.so',
      billingCycle: 'quarterly',
      price: 24.0,
    }),
    variant: 'default',
  },
};

export const YearlyBilling: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Microsoft 365',
      logoUrl: 'https://logo.clearbit.com/microsoft.com',
      billingCycle: 'yearly',
      price: 99.99,
      category: 'Productivity',
    }),
    variant: 'default',
  },
};

// Without logo (fallback to initial)
export const NoLogo: Story = {
  args: {
    subscription: createMockSubscription({
      name: 'Custom Service',
      logoUrl: undefined,
      price: 19.99,
    }),
    variant: 'default',
  },
};

// Interactive card
export const Interactive: Story = {
  args: {
    subscription: createMockSubscription(),
    variant: 'default',
    onPress: () => console.log('Card pressed'),
  },
};

// All status states
export const AllStatuses: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Active Sub', status: 'active' })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Paused Sub', status: 'paused' })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Cancelled Sub', status: 'cancelled' })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Expired Sub', status: 'expired' })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Trial Sub', status: 'trial' })}
      />
    </View>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Default Variant' })}
        variant="default"
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Compact Variant' })}
        variant="compact"
      />
      <SubscriptionCard
        subscription={createMockSubscription({ name: 'Detailed Variant', category: 'Entertainment' })}
        variant="detailed"
      />
    </View>
  ),
};

// Multiple currencies
export const DifferentCurrencies: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <SubscriptionCard
        subscription={createMockSubscription({
          name: 'US Service',
          currency: 'USD',
          price: 15.99,
        })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({
          name: 'UK Service',
          currency: 'GBP',
          price: 12.99,
        })}
      />
      <SubscriptionCard
        subscription={createMockSubscription({
          name: 'EU Service',
          currency: 'EUR',
          price: 14.99,
        })}
      />
    </View>
  ),
};
