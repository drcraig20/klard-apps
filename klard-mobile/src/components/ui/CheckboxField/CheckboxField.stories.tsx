import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { CheckboxField } from './CheckboxField';

/**
 * CheckboxField component for toggling boolean values with an optional
 * label and description. Includes haptic feedback and accessibility support.
 */
const meta: Meta<typeof CheckboxField> = {
  title: 'Basic Controls/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox',
    },
    description: {
      control: 'text',
      description: 'Description text displayed below the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
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

// Interactive wrapper for controlled checkbox
const ControlledCheckbox = (props: React.ComponentProps<typeof CheckboxField>) => {
  const [checked, setChecked] = useState(props.checked ?? false);
  return <CheckboxField {...props} checked={checked} onChange={setChecked} />;
};

// Default unchecked
export const Default: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: false,
    label: 'Accept terms and conditions',
  },
};

// Checked state
export const Checked: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: true,
    label: 'Accept terms and conditions',
  },
};

// With description
export const WithDescription: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: false,
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates about new features and tips',
  },
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: false,
    label: 'Premium feature',
    description: 'Upgrade to enable this option',
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: true,
    label: 'Required option',
    description: 'This option cannot be changed',
    disabled: true,
  },
};

// Without label (checkbox only)
export const WithoutLabel: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  args: {
    checked: false,
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12, color: '#0F172A' }}>
          Basic States
        </Text>
        <View style={{ gap: 12 }}>
          <ControlledCheckbox
            checked={false}
            onChange={() => {}}
            label="Unchecked"
          />
          <ControlledCheckbox
            checked={true}
            onChange={() => {}}
            label="Checked"
          />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12, color: '#0F172A' }}>
          Disabled States
        </Text>
        <View style={{ gap: 12 }}>
          <ControlledCheckbox
            checked={false}
            onChange={() => {}}
            label="Disabled unchecked"
            disabled
          />
          <ControlledCheckbox
            checked={true}
            onChange={() => {}}
            label="Disabled checked"
            disabled
          />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12, color: '#0F172A' }}>
          With Description
        </Text>
        <View style={{ gap: 12 }}>
          <ControlledCheckbox
            checked={true}
            onChange={() => {}}
            label="Email notifications"
            description="Receive email alerts for important updates"
          />
          <ControlledCheckbox
            checked={false}
            onChange={() => {}}
            label="Marketing emails"
            description="Occasional promotions and announcements"
          />
        </View>
      </View>
    </View>
  ),
};

// Real-world form example
export const FormExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: '600', fontSize: 16, color: '#0F172A' }}>
        Account Settings
      </Text>

      <View style={{ gap: 12 }}>
        <ControlledCheckbox
          checked={true}
          onChange={() => {}}
          label="Enable two-factor authentication"
          description="Add an extra layer of security to your account"
        />
        <ControlledCheckbox
          checked={true}
          onChange={() => {}}
          label="Show subscription reminders"
          description="Get notified 3 days before renewal"
        />
        <ControlledCheckbox
          checked={false}
          onChange={() => {}}
          label="Share usage analytics"
          description="Help us improve by sharing anonymous usage data"
        />
        <ControlledCheckbox
          checked={false}
          onChange={() => {}}
          label="Enable beta features"
          description="Try new features before they're released"
          disabled
        />
      </View>
    </View>
  ),
};

// Terms and conditions example
export const TermsExample: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <ControlledCheckbox
        checked={true}
        onChange={() => {}}
        label="I agree to the Terms of Service"
      />
      <ControlledCheckbox
        checked={true}
        onChange={() => {}}
        label="I agree to the Privacy Policy"
      />
      <ControlledCheckbox
        checked={false}
        onChange={() => {}}
        label="I want to receive promotional emails"
        description="You can unsubscribe at any time"
      />
    </View>
  ),
};
