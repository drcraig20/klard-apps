import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Switch, SwitchField } from './Switch';

/**
 * Switch component for toggling boolean values.
 * Includes haptic feedback and accessibility support.
 *
 * - `Switch`: Standalone switch control
 * - `SwitchField`: Switch with label and description
 */
const meta: Meta<typeof Switch> = {
  title: 'Basic Controls/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size variant of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
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

// Interactive wrapper for controlled switch
const ControlledSwitch = (props: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <Switch {...props} checked={checked} onChange={setChecked} />;
};

const ControlledSwitchField = (props: React.ComponentProps<typeof SwitchField>) => {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <SwitchField {...props} checked={checked} onChange={setChecked} />;
};

// Default switch (unchecked)
export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: false,
    size: 'md',
  },
};

// Checked switch
export const Checked: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: true,
    size: 'md',
  },
};

// Small size variant
export const Small: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: true,
    size: 'sm',
  },
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: false,
    disabled: true,
    size: 'md',
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  render: (args) => <ControlledSwitch {...args} />,
  args: {
    checked: true,
    disabled: true,
    size: 'md',
  },
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, color: '#64748B' }}>Small:</Text>
        <ControlledSwitch checked={true} onChange={() => {}} size="sm" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text style={{ width: 80, color: '#64748B' }}>Medium:</Text>
        <ControlledSwitch checked={true} onChange={() => {}} size="md" />
      </View>
    </View>
  ),
};

// SwitchField with label only
export const WithLabel: Story = {
  render: () => (
    <ControlledSwitchField
      checked={false}
      onChange={() => {}}
      label="Enable notifications"
    />
  ),
};

// SwitchField with label and description
export const WithLabelAndDescription: Story = {
  render: () => (
    <ControlledSwitchField
      checked={true}
      onChange={() => {}}
      label="Dark mode"
      description="Switch to dark theme for low-light environments"
    />
  ),
};

// SwitchField disabled
export const FieldDisabled: Story = {
  render: () => (
    <ControlledSwitchField
      checked={false}
      onChange={() => {}}
      label="Premium feature"
      description="Upgrade to unlock this feature"
      disabled
    />
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Standalone Switch
        </Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <ControlledSwitch checked={false} onChange={() => {}} />
          <ControlledSwitch checked={true} onChange={() => {}} />
          <ControlledSwitch checked={false} onChange={() => {}} disabled />
          <ControlledSwitch checked={true} onChange={() => {}} disabled />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#0F172A' }}>
          Switch Field
        </Text>
        <View style={{ gap: 12 }}>
          <ControlledSwitchField
            checked={true}
            onChange={() => {}}
            label="Push notifications"
            description="Receive push notifications for important updates"
          />
          <ControlledSwitchField
            checked={false}
            onChange={() => {}}
            label="Email digest"
            description="Weekly summary of your subscriptions"
          />
          <ControlledSwitchField
            checked={false}
            onChange={() => {}}
            label="Biometric login"
            description="Requires Face ID or fingerprint"
            disabled
          />
        </View>
      </View>
    </View>
  ),
};
