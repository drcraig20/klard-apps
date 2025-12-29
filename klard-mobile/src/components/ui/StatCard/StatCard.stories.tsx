import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from './StatCard';

/**
 * StatCard displays key metrics with optional trend indicators and icons.
 * Supports clickable cards with haptic feedback, multiple sizes, and muted styling.
 */
const meta: Meta<typeof StatCard> = {
  title: 'Display/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label describing the metric',
    },
    value: {
      control: 'text',
      description: 'The metric value to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the card',
    },
    muted: {
      control: 'boolean',
      description: 'Whether to use muted styling for non-primary stats',
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

// Default stat card
export const Default: Story = {
  args: {
    label: 'Total Subscriptions',
    value: '12',
    size: 'md',
  },
};

// Stat with upward trend
export const TrendUp: Story = {
  args: {
    label: 'Monthly Savings',
    value: '$47.50',
    trend: {
      direction: 'up',
      value: '+12%',
    },
    size: 'md',
  },
};

// Stat with downward trend
export const TrendDown: Story = {
  args: {
    label: 'Monthly Spending',
    value: '$89.99',
    trend: {
      direction: 'down',
      value: '-8%',
    },
    size: 'md',
  },
};

// Stat with neutral trend
export const TrendNeutral: Story = {
  args: {
    label: 'Active Services',
    value: '8',
    trend: {
      direction: 'neutral',
      value: '0%',
    },
    size: 'md',
  },
};

// Stat with icon
export const WithIcon: Story = {
  args: {
    label: 'Total Savings',
    value: '$284.00',
    icon: <Ionicons name="wallet-outline" size={24} color="#0D7C7A" />,
    size: 'md',
  },
};

// Stat with icon and trend
export const WithIconAndTrend: Story = {
  args: {
    label: 'Monthly Spending',
    value: '$156.47',
    trend: {
      direction: 'down',
      value: '-$23.50',
    },
    icon: <Ionicons name="trending-down-outline" size={24} color="#059669" />,
    size: 'md',
  },
};

// Clickable stat card
export const Clickable: Story = {
  args: {
    label: 'View Details',
    value: '24 items',
    onClick: () => console.log('StatCard clicked'),
    size: 'md',
  },
};

// Muted stat card
export const Muted: Story = {
  args: {
    label: 'Cancelled',
    value: '3',
    muted: true,
    size: 'md',
  },
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <StatCard label="Small" value="$24.99" size="sm" />
      <StatCard label="Medium" value="$49.99" size="md" />
      <StatCard label="Large" value="$99.99" size="lg" />
    </View>
  ),
};

// Dashboard stats example
export const DashboardStats: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <StatCard
            label="Active Subscriptions"
            value="12"
            trend={{ direction: 'up', value: '+2' }}
            icon={<Ionicons name="card-outline" size={20} color="#0D7C7A" />}
            size="sm"
          />
        </View>
        <View style={{ flex: 1 }}>
          <StatCard
            label="Monthly Cost"
            value="$89.97"
            trend={{ direction: 'down', value: '-$15' }}
            icon={<Ionicons name="cash-outline" size={20} color="#059669" />}
            size="sm"
          />
        </View>
      </View>
      <StatCard
        label="Total Annual Savings"
        value="$547.00"
        trend={{ direction: 'up', value: '+23%' }}
        icon={<Ionicons name="trending-up-outline" size={24} color="#0D7C7A" />}
        size="lg"
      />
    </View>
  ),
};

// Subscription stats
export const SubscriptionStats: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <StatCard
        label="Netflix"
        value="$15.99/mo"
        icon={<Ionicons name="play-circle-outline" size={24} color="#E50914" />}
        onClick={() => console.log('Netflix clicked')}
      />
      <StatCard
        label="Spotify"
        value="$9.99/mo"
        icon={<Ionicons name="musical-notes-outline" size={24} color="#1DB954" />}
        onClick={() => console.log('Spotify clicked')}
      />
      <StatCard
        label="iCloud Storage"
        value="$2.99/mo"
        icon={<Ionicons name="cloud-outline" size={24} color="#007AFF" />}
        onClick={() => console.log('iCloud clicked')}
      />
    </View>
  ),
};

// Muted vs active comparison
export const MutedComparison: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <StatCard
        label="Active"
        value="8 subscriptions"
        trend={{ direction: 'up', value: '+2' }}
      />
      <StatCard
        label="Paused"
        value="2 subscriptions"
        muted
      />
      <StatCard
        label="Cancelled"
        value="4 subscriptions"
        muted
      />
    </View>
  ),
};
