import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { PasswordInput } from './PasswordInput';

/**
 * PasswordInput is a specialized input component for password entry with built-in
 * visibility toggle, password strength indicator, and requirements checklist.
 * It integrates with the commons package for password strength calculation.
 */
const meta: Meta<typeof PasswordInput> = {
  title: 'Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
    },
    error: {
      control: 'text',
      description: 'Error message - displays in red below input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text - displays below input when no error',
    },
    required: {
      control: 'boolean',
      description: 'Shows required asterisk after label',
    },
    showStrength: {
      control: 'boolean',
      description: 'Show password strength indicator bar',
    },
    editable: {
      control: 'boolean',
      description: 'Whether the input is editable (opposite of disabled)',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, minWidth: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default password input
export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

// Controlled input with value
export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('MySecurePassword123!');
    return (
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

// Input with error state
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('weak');
    return (
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={value}
        onChangeText={setValue}
        error="Password is too weak"
      />
    );
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: 'DisabledPassword',
    editable: false,
  },
};

// With strength indicator
export const WithStrengthIndicator: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PasswordInput
        label="Create Password"
        placeholder="Enter a strong password"
        value={value}
        onChangeText={setValue}
        showStrength
        helperText="Use a mix of letters, numbers, and symbols"
      />
    );
  },
};

// With requirements checklist
export const WithRequirements: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const requirements = useMemo(() => ({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    }), [value]);

    return (
      <PasswordInput
        label="Create Password"
        placeholder="Enter a strong password"
        value={value}
        onChangeText={setValue}
        requirements={requirements}
      />
    );
  },
};

// Full featured with strength and requirements
export const FullFeatured: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const requirements = useMemo(() => ({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    }), [value]);

    return (
      <PasswordInput
        label="Create Password"
        placeholder="Enter a strong password"
        value={value}
        onChangeText={setValue}
        showStrength
        requirements={requirements}
        required
      />
    );
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Required field',
    required: true,
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters',
  },
};

// Strength levels showcase
export const StrengthLevels: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <PasswordInput
        label="Weak Password"
        value="abc"
        onChangeText={() => {}}
        showStrength
      />
      <PasswordInput
        label="Fair Password"
        value="abcdefgh"
        onChangeText={() => {}}
        showStrength
      />
      <PasswordInput
        label="Good Password"
        value="Abcdefgh1"
        onChangeText={() => {}}
        showStrength
      />
      <PasswordInput
        label="Strong Password"
        value="Abcdefgh1!@#"
        onChangeText={() => {}}
        showStrength
      />
    </View>
  ),
};
