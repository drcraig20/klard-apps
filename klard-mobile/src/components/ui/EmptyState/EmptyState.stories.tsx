import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { EmptyState } from './EmptyState';

/**
 * EmptyState component displays a placeholder when content is unavailable.
 * It supports illustrations, titles, descriptions, and primary/secondary actions.
 * Used for empty lists, search results, error states, and onboarding.
 */
const meta: Meta<typeof EmptyState> = {
  title: 'Layout/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    illustration: {
      control: 'select',
      options: ['subscriptions', 'cards', 'alerts', undefined],
      description: 'Illustration key or custom image source',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An empty state component for displaying placeholder content with optional illustrations and actions.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, minHeight: 400, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty state
export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'There are no items to display at this time.',
  },
};

// With illustration (using placeholder key)
export const WithIllustration: Story = {
  args: {
    title: 'No subscriptions yet',
    description: 'Start tracking your subscriptions to see them here.',
    illustration: 'subscriptions',
  },
};

// With primary action
export const WithPrimaryAction: Story = {
  args: {
    title: 'No subscriptions yet',
    description: 'Add your first subscription to start tracking your spending.',
    illustration: 'subscriptions',
    primaryAction: {
      label: 'Add Subscription',
      onPress: () => console.log('Add subscription pressed'),
    },
  },
};

// With both actions
export const WithBothActions: Story = {
  args: {
    title: 'No subscriptions yet',
    description: 'Add your subscriptions manually or connect your bank to import them automatically.',
    illustration: 'subscriptions',
    primaryAction: {
      label: 'Connect Bank',
      onPress: () => console.log('Connect bank pressed'),
    },
    secondaryAction: {
      label: 'Add Manually',
      onPress: () => console.log('Add manually pressed'),
    },
  },
};

// No search results
export const NoSearchResults: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    primaryAction: {
      label: 'Clear Filters',
      onPress: () => console.log('Clear filters pressed'),
    },
  },
};

// Cards empty state
export const CardsEmptyState: Story = {
  args: {
    title: 'No virtual cards',
    description: 'Create a burner card to protect your subscription payments.',
    illustration: 'cards',
    primaryAction: {
      label: 'Create Card',
      onPress: () => console.log('Create card pressed'),
    },
  },
};

// Alerts empty state
export const AlertsEmptyState: Story = {
  args: {
    title: 'No alerts',
    description: 'You\'re all caught up! We\'ll notify you when something needs your attention.',
    illustration: 'alerts',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We couldn\'t load your data. Please try again.',
    primaryAction: {
      label: 'Retry',
      onPress: () => console.log('Retry pressed'),
    },
    secondaryAction: {
      label: 'Contact Support',
      onPress: () => console.log('Contact support pressed'),
    },
  },
};

// Offline state
export const OfflineState: Story = {
  args: {
    title: 'You\'re offline',
    description: 'Connect to the internet to view your subscriptions and cards.',
    primaryAction: {
      label: 'Try Again',
      onPress: () => console.log('Try again pressed'),
    },
  },
};

// Minimal (title only)
export const Minimal: Story = {
  args: {
    title: 'Nothing here',
  },
};

// Long content
export const LongContent: Story = {
  args: {
    title: 'Your subscription history is empty',
    description:
      'Once you start tracking subscriptions, you\'ll see a detailed history of all your payments, renewals, and cancellations here. This helps you understand your spending patterns and identify opportunities to save money.',
    primaryAction: {
      label: 'Get Started',
      onPress: () => console.log('Get started pressed'),
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 48 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 16, fontWeight: '600' }}>Minimal</Text>
        <EmptyState title="No items" />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 16, fontWeight: '600' }}>With Description</Text>
        <EmptyState
          title="No items"
          description="Add items to see them here"
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 16, fontWeight: '600' }}>With Actions</Text>
        <EmptyState
          title="No subscriptions"
          description="Track your recurring payments"
          primaryAction={{
            label: 'Add Subscription',
            onPress: () => {},
          }}
          secondaryAction={{
            label: 'Learn More',
            onPress: () => {},
          }}
        />
      </View>
    </View>
  ),
};
