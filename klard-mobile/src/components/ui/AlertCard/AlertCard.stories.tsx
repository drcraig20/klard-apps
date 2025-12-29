import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { AlertCard, type Alert, type AlertType } from './AlertCard';

/**
 * AlertCard displays notification-style alerts for subscription events like
 * renewals, price changes, blocked transactions, and savings opportunities.
 * Features icon bubbles, unread indicators, subscription chips, and optional
 * CTA buttons.
 */
const meta: Meta<typeof AlertCard> = {
  title: 'Feedback/AlertCard',
  component: AlertCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'The size of the alert card',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when the alert is pressed',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when the alert is dismissed',
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

// Mock alert factory
const createMockAlert = (overrides: Partial<Alert> = {}): Alert => ({
  id: '1',
  type: 'renewal',
  title: 'Subscription Renewal',
  body: 'Your Netflix subscription will renew in 3 days.',
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  read: false,
  ...overrides,
});

// Renewal alert
export const Renewal: Story = {
  args: {
    alert: createMockAlert({
      type: 'renewal',
      title: 'Upcoming Renewal',
      body: 'Your Netflix subscription ($15.99/mo) will renew on Jan 15.',
      subscription: { name: 'Netflix', logoUrl: 'https://logo.clearbit.com/netflix.com' },
      actionLabel: 'Manage',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Price increase alert
export const PriceIncrease: Story = {
  args: {
    alert: createMockAlert({
      type: 'price-increase',
      title: 'Price Increase',
      body: 'Spotify is increasing from $9.99 to $11.99 starting next month.',
      subscription: { name: 'Spotify', logoUrl: 'https://logo.clearbit.com/spotify.com' },
      actionLabel: 'Review',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Price decrease alert
export const PriceDecrease: Story = {
  args: {
    alert: createMockAlert({
      type: 'price-decrease',
      title: 'Price Decrease',
      body: 'Good news! YouTube Premium dropped from $13.99 to $11.99.',
      subscription: { name: 'YouTube', logoUrl: 'https://logo.clearbit.com/youtube.com' },
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Blocked transaction alert
export const Blocked: Story = {
  args: {
    alert: createMockAlert({
      type: 'blocked',
      title: 'Transaction Blocked',
      body: 'A $49.99 charge from an unknown merchant was blocked by your burner card.',
      actionLabel: 'View Details',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Savings alert
export const Savings: Story = {
  args: {
    alert: createMockAlert({
      type: 'savings',
      title: 'Savings Achieved',
      body: 'You saved $24.00 this month by blocking unwanted charges!',
      actionLabel: 'See Breakdown',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// System alert
export const System: Story = {
  args: {
    alert: createMockAlert({
      type: 'system',
      title: 'System Update',
      body: 'We\'ve improved our card security features. Your cards are now even safer.',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Unread alert
export const Unread: Story = {
  args: {
    alert: createMockAlert({
      read: false,
      title: 'New Alert',
      body: 'This alert has not been read yet. Notice the unread indicator.',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// Read alert
export const Read: Story = {
  args: {
    alert: createMockAlert({
      read: true,
      title: 'Read Alert',
      body: 'This alert has been read. No unread indicator shown.',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// With dismiss button
export const Dismissible: Story = {
  args: {
    alert: createMockAlert({
      type: 'system',
      title: 'Dismissible Alert',
      body: 'This alert can be dismissed using the X button.',
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
    onDismiss: () => console.log('Alert dismissed'),
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    alert: createMockAlert({
      title: 'Compact Alert',
      body: 'This is a smaller version of the alert card.',
    }),
    size: 'sm',
    onPress: () => console.log('Alert pressed'),
  },
};

// With subscription chip (no logo)
export const SubscriptionNoLogo: Story = {
  args: {
    alert: createMockAlert({
      type: 'renewal',
      title: 'Renewal Notice',
      body: 'Your custom service subscription is due for renewal.',
      subscription: { name: 'Custom Service' },
    }),
    size: 'md',
    onPress: () => console.log('Alert pressed'),
  },
};

// All alert types showcase
export const AllTypes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <AlertCard
        alert={createMockAlert({
          type: 'renewal',
          title: 'Renewal',
          body: 'Subscription renewal alert',
        })}
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          type: 'price-increase',
          title: 'Price Increase',
          body: 'Price going up alert',
        })}
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          type: 'price-decrease',
          title: 'Price Decrease',
          body: 'Price going down alert',
        })}
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          type: 'blocked',
          title: 'Blocked',
          body: 'Transaction blocked alert',
        })}
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          type: 'savings',
          title: 'Savings',
          body: 'Savings achieved alert',
        })}
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          type: 'system',
          title: 'System',
          body: 'System notification alert',
        })}
        onPress={() => {}}
      />
    </View>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <AlertCard
        alert={createMockAlert({
          title: 'Medium Size (md)',
          body: 'This is the default medium size alert card.',
        })}
        size="md"
        onPress={() => {}}
      />
      <AlertCard
        alert={createMockAlert({
          title: 'Small Size (sm)',
          body: 'This is a compact small size alert card.',
        })}
        size="sm"
        onPress={() => {}}
      />
    </View>
  ),
};

// Complete alert with all features
export const FullFeatured: Story = {
  args: {
    alert: {
      id: 'full',
      type: 'renewal',
      title: 'Netflix Renewal Tomorrow',
      body: 'Your subscription will automatically renew for $15.99. Tap to manage your subscription settings.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      subscription: { name: 'Netflix', logoUrl: 'https://logo.clearbit.com/netflix.com' },
      actionLabel: 'Manage',
    },
    size: 'md',
    onPress: () => console.log('Alert pressed'),
    onDismiss: () => console.log('Alert dismissed'),
  },
};
