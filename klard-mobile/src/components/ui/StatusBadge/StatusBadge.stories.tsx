import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { StatusBadge } from './StatusBadge';
import type { StatusType } from './status-badge.constants';

/**
 * StatusBadge is a specialized Badge component for displaying subscription
 * or account status. It automatically maps status types to appropriate
 * variants, labels, and icons.
 *
 * Available statuses: active, trial, paused, blocked, cancelled, locked, expired, pending
 */
const meta: Meta<typeof StatusBadge> = {
  title: 'Basic Controls/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['active', 'trial', 'paused', 'blocked', 'cancelled', 'locked', 'expired', 'pending'],
      description: 'The status type to display',
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

// Active status
export const Active: Story = {
  args: {
    status: 'active',
  },
};

// Trial status
export const Trial: Story = {
  args: {
    status: 'trial',
  },
};

// Paused status
export const Paused: Story = {
  args: {
    status: 'paused',
  },
};

// Blocked status
export const Blocked: Story = {
  args: {
    status: 'blocked',
  },
};

// Cancelled status
export const Cancelled: Story = {
  args: {
    status: 'cancelled',
  },
};

// Locked status
export const Locked: Story = {
  args: {
    status: 'locked',
  },
};

// Expired status
export const Expired: Story = {
  args: {
    status: 'expired',
  },
};

// Pending status
export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

// All statuses showcase
export const AllStatuses: Story = {
  render: () => {
    const statuses: StatusType[] = [
      'active',
      'trial',
      'paused',
      'blocked',
      'cancelled',
      'locked',
      'expired',
      'pending',
    ];

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {statuses.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </View>
    );
  },
};

// Grouped by category
export const GroupedByCategory: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Positive States
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusBadge status="active" />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Warning States
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusBadge status="trial" />
          <StatusBadge status="locked" />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Error States
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusBadge status="blocked" />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Neutral States
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatusBadge status="paused" />
          <StatusBadge status="cancelled" />
          <StatusBadge status="expired" />
          <StatusBadge status="pending" />
        </View>
      </View>
    </View>
  ),
};

// In context - subscription list example
export const InContext: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text style={{ fontWeight: '600', marginBottom: 4, color: '#0F172A' }}>
        Subscription List Example
      </Text>

      {[
        { name: 'Netflix', status: 'active' as StatusType },
        { name: 'Spotify', status: 'trial' as StatusType },
        { name: 'HBO Max', status: 'paused' as StatusType },
        { name: 'Hulu', status: 'cancelled' as StatusType },
        { name: 'Disney+', status: 'blocked' as StatusType },
      ].map((subscription) => (
        <View
          key={subscription.name}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            backgroundColor: '#F8FAFC',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: '500', color: '#0F172A' }}>
            {subscription.name}
          </Text>
          <StatusBadge status={subscription.status} />
        </View>
      ))}
    </View>
  ),
};
