import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SegmentedControl, type SegmentedControlOption } from './SegmentedControl';

/**
 * SegmentedControl component provides a pill-style toggle between options.
 * It supports different sizes, icons, full-width mode, and haptic feedback.
 * Ideal for binary or small-set selections like view toggles.
 */
const meta: Meta<typeof SegmentedControl> = {
  title: 'Navigation/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected option value',
    },
    options: {
      control: 'object',
      description: 'Array of options with value, label, and optional icon',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant of the control',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the control takes full container width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the control is disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A segmented control for toggling between a small set of mutually exclusive options.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic options
const basicOptions: SegmentedControlOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
];

// Interactive wrapper
function SegmentedControlDemo({
  options,
  size = 'md',
  fullWidth = false,
  disabled = false,
}: {
  options: SegmentedControlOption[];
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(options[0].value);

  return (
    <View>
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={options}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
      />
      <View
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#666' }}>Selected: {value}</Text>
      </View>
    </View>
  );
}

// Default segmented control
export const Default: Story = {
  render: () => <SegmentedControlDemo options={basicOptions} />,
};

// Small size
export const Small: Story = {
  render: () => <SegmentedControlDemo options={basicOptions} size="sm" />,
};

// Full width
export const FullWidth: Story = {
  render: () => <SegmentedControlDemo options={basicOptions} fullWidth />,
};

// Disabled state
export const Disabled: Story = {
  render: () => <SegmentedControlDemo options={basicOptions} disabled />,
};

// Three options
const threeOptions: SegmentedControlOption[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const ThreeOptions: Story = {
  render: () => <SegmentedControlDemo options={threeOptions} />,
};

// With icons
const optionsWithIcons: SegmentedControlOption[] = [
  {
    value: 'list',
    label: 'List',
    icon: <Ionicons name="list-outline" size={16} color="#666" />,
  },
  {
    value: 'grid',
    label: 'Grid',
    icon: <Ionicons name="grid-outline" size={16} color="#666" />,
  },
];

export const WithIcons: Story = {
  render: () => <SegmentedControlDemo options={optionsWithIcons} />,
};

// Time period selector
const timePeriodOptions: SegmentedControlOption[] = [
  { value: '1W', label: '1W' },
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '1Y', label: '1Y' },
  { value: 'ALL', label: 'All' },
];

export const TimePeriodSelector: Story = {
  render: () => <SegmentedControlDemo options={timePeriodOptions} />,
};

// Billing frequency selector
const billingOptions: SegmentedControlOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly (Save 20%)' },
];

export const BillingFrequency: Story = {
  render: () => <SegmentedControlDemo options={billingOptions} fullWidth />,
};

// View mode toggle
const viewModeOptions: SegmentedControlOption[] = [
  {
    value: 'card',
    label: 'Cards',
    icon: <Ionicons name="layers-outline" size={16} color="#666" />,
  },
  {
    value: 'list',
    label: 'List',
    icon: <Ionicons name="reorder-four-outline" size={16} color="#666" />,
  },
  {
    value: 'compact',
    label: 'Compact',
    icon: <Ionicons name="menu-outline" size={16} color="#666" />,
  },
];

export const ViewModeToggle: Story = {
  render: () => <SegmentedControlDemo options={viewModeOptions} />,
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Small (sm)</Text>
        <SegmentedControlDemo options={basicOptions} size="sm" />
      </View>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Medium (md)</Text>
        <SegmentedControlDemo options={basicOptions} size="md" />
      </View>
    </View>
  ),
};
