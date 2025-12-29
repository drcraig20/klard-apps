import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

/**
 * Tooltip component displays contextual information on long press.
 * It includes haptic feedback, fade animation, auto-hide after duration,
 * and accessibility announcements for screen readers.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Layout/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Duration in ms before tooltip auto-hides (default: 2000)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip interaction',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A tooltip component that appears on long press with auto-dismiss and accessibility support.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 32, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tooltip
export const Default: Story = {
  render: () => (
    <Tooltip content="This is a helpful tooltip">
      <View
        style={{
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text>Long press me</Text>
      </View>
    </Tooltip>
  ),
};

// With icon trigger
export const WithIconTrigger: Story = {
  render: () => (
    <Tooltip
      content="Click to learn more about this feature"
      accessibilityLabel="Help icon"
    >
      <View style={{ padding: 8 }}>
        <Ionicons name="help-circle-outline" size={24} color="#666" />
      </View>
    </Tooltip>
  ),
};

// With button trigger
export const WithButtonTrigger: Story = {
  render: () => (
    <Tooltip content="Long press for more options">
      <Button variant="outline">Actions</Button>
    </Tooltip>
  ),
};

// Longer duration
export const LongerDuration: Story = {
  render: () => (
    <Tooltip content="This tooltip stays visible for 5 seconds" duration={5000}>
      <View
        style={{
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text>Long press (5s duration)</Text>
      </View>
    </Tooltip>
  ),
};

// Disabled tooltip
export const Disabled: Story = {
  render: () => (
    <Tooltip content="You won't see this" disabled>
      <View
        style={{
          padding: 12,
          backgroundColor: '#e0e0e0',
          borderRadius: 8,
          opacity: 0.6,
        }}
      >
        <Text style={{ color: '#999' }}>Tooltip disabled</Text>
      </View>
    </Tooltip>
  ),
};

// With callbacks
export const WithCallbacks: Story = {
  render: () => (
    <Tooltip
      content="Tooltip shown!"
      onShow={() => console.log('Tooltip shown')}
      onHide={() => console.log('Tooltip hidden')}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text>Check console on show/hide</Text>
      </View>
    </Tooltip>
  ),
};

// Multiple tooltips
export const MultipleTooltips: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <Tooltip content="First tooltip">
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#0D7C7A',
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>1</Text>
        </View>
      </Tooltip>
      <Tooltip content="Second tooltip">
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#15B5B0',
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>2</Text>
        </View>
      </Tooltip>
      <Tooltip content="Third tooltip">
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#059669',
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>3</Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// Information tooltip pattern
export const InformationPattern: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>Subscription Limit</Text>
      <Tooltip
        content="You can have up to 10 active subscriptions on the free plan. Upgrade to Premium for unlimited subscriptions."
        accessibilityLabel="Subscription limit information"
      >
        <Ionicons name="information-circle-outline" size={20} color="#666" />
      </Tooltip>
    </View>
  ),
};

// Feature badge with tooltip
export const FeatureBadge: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text style={{ fontSize: 16 }}>Smart Alerts</Text>
      <Tooltip
        content="AI-powered alerts notify you of unusual charges and subscription changes"
        accessibilityLabel="Smart alerts feature info"
      >
        <View
          style={{
            backgroundColor: '#0D7C7A',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
            PRO
          </Text>
        </View>
      </Tooltip>
    </View>
  ),
};

// Custom styled content
export const CustomContent: Story = {
  render: () => (
    <Tooltip
      content={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Ionicons name="bulb" size={16} color="#F59E0B" />
          <Text style={{ color: '#fff', fontSize: 14 }}>Pro tip: Use shortcuts!</Text>
        </View>
      }
    >
      <View
        style={{
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text>Tooltip with custom content</Text>
      </View>
    </Tooltip>
  ),
};
