import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './Badge';

/**
 * Badge component for displaying small labels, tags, or status indicators.
 * Supports multiple variants, sizes, icons, and removable functionality.
 */
const meta: Meta<typeof Badge> = {
  title: 'Basic Controls/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'outline'],
      description: 'The visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'The size of the badge',
    },
    removable: {
      control: 'boolean',
      description: 'Whether the badge shows a remove button',
    },
    children: {
      control: 'text',
      description: 'The badge label text',
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

// Default badge
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
    size: 'md',
  },
};

// Primary badge
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
    size: 'md',
  },
};

// Success badge
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Active',
    size: 'md',
  },
};

// Warning badge
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending',
    size: 'md',
  },
};

// Error badge
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Blocked',
    size: 'md',
  },
};

// Outline badge
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
    size: 'md',
  },
};

// Small size
export const Small: Story = {
  args: {
    variant: 'primary',
    children: 'Small',
    size: 'sm',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    variant: 'success',
    children: 'Verified',
    size: 'md',
    icon: <Ionicons name="checkmark-circle" size={12} color="#15803D" />,
  },
};

// Removable badge
export const Removable: Story = {
  args: {
    variant: 'primary',
    children: 'Removable',
    size: 'md',
    removable: true,
    onRemove: () => console.log('Remove clicked'),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </View>
  ),
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, color: '#64748B' }}>Small:</Text>
        <Badge variant="primary" size="sm">Small Badge</Badge>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, color: '#64748B' }}>Medium:</Text>
        <Badge variant="primary" size="md">Medium Badge</Badge>
      </View>
    </View>
  ),
};

// Badges with icons
export const WithIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge
        variant="success"
        icon={<Ionicons name="checkmark-circle" size={12} color="#15803D" />}
      >
        Active
      </Badge>
      <Badge
        variant="warning"
        icon={<Ionicons name="time" size={12} color="#B45309" />}
      >
        Pending
      </Badge>
      <Badge
        variant="error"
        icon={<Ionicons name="ban" size={12} color="#B91C1C" />}
      >
        Blocked
      </Badge>
      <Badge
        variant="primary"
        icon={<Ionicons name="star" size={12} color="#0D7C7A" />}
      >
        Featured
      </Badge>
    </View>
  ),
};

// Removable badges
export const RemovableBadges: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="default" removable onRemove={() => {}}>
        Tag 1
      </Badge>
      <Badge variant="primary" removable onRemove={() => {}}>
        Tag 2
      </Badge>
      <Badge variant="success" removable onRemove={() => {}}>
        Tag 3
      </Badge>
    </View>
  ),
};

// Real-world usage examples
export const UseCases: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Subscription Status
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Badge
            variant="success"
            icon={<Ionicons name="checkmark-circle" size={12} color="#15803D" />}
          >
            Active
          </Badge>
          <Badge
            variant="warning"
            icon={<Ionicons name="time" size={12} color="#B45309" />}
          >
            Trial
          </Badge>
          <Badge
            variant="error"
            icon={<Ionicons name="close-circle" size={12} color="#B91C1C" />}
          >
            Cancelled
          </Badge>
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Categories
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge variant="outline">Entertainment</Badge>
          <Badge variant="outline">Productivity</Badge>
          <Badge variant="outline">Health</Badge>
          <Badge variant="outline">Finance</Badge>
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Pricing Tiers
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Badge variant="default">Free</Badge>
          <Badge variant="primary">Pro</Badge>
          <Badge
            variant="warning"
            icon={<Ionicons name="star" size={12} color="#B45309" />}
          >
            Premium
          </Badge>
        </View>
      </View>
    </View>
  ),
};
