import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

/**
 * Skeleton provides loading placeholders with animated shimmer effects.
 * Supports rectangular, circular, and text variants with customizable dimensions.
 * Uses expo-linear-gradient for smooth shimmer animations.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangular', 'circular', 'text'],
      description: 'Shape variant of the skeleton',
    },
    width: {
      control: 'number',
      description: 'Width of the skeleton (number for pixels or string for percentage)',
    },
    height: {
      control: 'number',
      description: 'Height of the skeleton (text variant defaults to 16px)',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to show shimmer animation',
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

// Default rectangular skeleton
export const Default: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 100,
    animated: true,
  },
};

// Circular skeleton (avatar placeholder)
export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
    animated: true,
  },
};

// Text line skeleton
export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
    animated: true,
  },
};

// All variants showcase
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Skeleton variant="rectangular" width={200} height={80} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="text" width={200} />
    </View>
  ),
};

// Static skeleton (no animation)
export const Static: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 100,
    animated: false,
  },
};

// Avatar sizes
export const AvatarSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="circular" width={64} height={64} />
    </View>
  ),
};

// Text lines (paragraph placeholder)
export const TextLines: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
    </View>
  ),
};

// Card placeholder
export const CardPlaceholder: Story = {
  render: () => (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.05)',
        gap: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </View>
      </View>
      <Skeleton variant="rectangular" width="100%" height={120} />
      <View style={{ gap: 8 }}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
      </View>
    </View>
  ),
};

// List item placeholder
export const ListItemPlaceholder: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 8,
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <View style={{ flex: 1, gap: 8 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </View>
          <Skeleton variant="rectangular" width={60} height={24} />
        </View>
      ))}
    </View>
  ),
};

// Subscription card loading state
export const SubscriptionCardLoading: Story = {
  render: () => (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.03)',
        gap: 16,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <View style={{ gap: 6 }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={60} />
          </View>
        </View>
        <Skeleton variant="rectangular" width={70} height={32} />
      </View>
      <Skeleton variant="rectangular" width="100%" height={1} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={60} />
      </View>
    </View>
  ),
};

// Dashboard stats loading
export const DashboardStatsLoading: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.03)',
            gap: 8,
          }}
        >
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" width="80%" height={32} />
          <Skeleton variant="text" width="40%" />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.03)',
            gap: 8,
          }}
        >
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" width="80%" height={32} />
          <Skeleton variant="text" width="40%" />
        </View>
      </View>
    </View>
  ),
};

// Full width skeleton
export const FullWidth: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 48,
    animated: true,
  },
};
