import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Spinner } from './Spinner';

/**
 * Spinner provides loading indicators using React Native's ActivityIndicator.
 * Supports multiple sizes, custom colors, and optional labels for context.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    color: {
      control: 'color',
      description: 'Custom color for the spinner (defaults to theme primary)',
    },
    label: {
      control: 'text',
      description: 'Optional label text displayed below the spinner',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default spinner
export const Default: Story = {
  args: {
    size: 'md',
  },
};

// Spinner with label
export const WithLabel: Story = {
  args: {
    size: 'md',
    label: 'Loading...',
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
};

// Sizes with labels
export const SizesWithLabels: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 32, alignItems: 'flex-start' }}>
      <Spinner size="sm" label="Small" />
      <Spinner size="md" label="Medium" />
      <Spinner size="lg" label="Large" />
    </View>
  ),
};

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
      <Spinner size="md" color="#0D7C7A" />
      <Spinner size="md" color="#E50914" />
      <Spinner size="md" color="#1DB954" />
      <Spinner size="md" color="#007AFF" />
    </View>
  ),
};

// Loading states examples
export const LoadingStates: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Spinner size="md" label="Fetching subscriptions..." />
      <Spinner size="md" label="Processing payment..." />
      <Spinner size="md" label="Syncing data..." />
    </View>
  ),
};

// Button loading state example
export const ButtonLoadingState: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#0D7C7A',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Spinner size="sm" color="#FFFFFF" />
      <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Saving...</Text>
    </View>
  ),
};

// Inline loading
export const InlineLoading: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Spinner size="sm" />
      <Text style={{ color: '#64748B' }}>Refreshing...</Text>
    </View>
  ),
};

// Page loading overlay example
export const PageLoadingOverlay: Story = {
  render: () => (
    <View
      style={{
        width: 300,
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 12,
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Spinner size="lg" />
        <Text style={{ fontWeight: '600' }}>Loading...</Text>
      </View>
    </View>
  ),
};

// Card with loading content
export const CardLoading: Story = {
  render: () => (
    <View
      style={{
        padding: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
      }}
    >
      <Spinner size="md" label="Loading subscription details..." />
    </View>
  ),
};

// Small inline spinner
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

// Large centered spinner
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Please wait...',
  },
};
