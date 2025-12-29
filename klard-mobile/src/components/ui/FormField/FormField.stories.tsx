import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormField } from './FormField';

/**
 * FormField component provides a wrapper for form inputs with label,
 * required indicator, error message, and helper text support.
 * It's a layout component that works with any input element.
 */
const meta: Meta<typeof FormField> = {
  title: 'Layout/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    required: {
      control: 'boolean',
      description: 'Shows required asterisk after label',
    },
    error: {
      control: 'text',
      description: 'Error message displayed in red below input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below input (hidden when error exists)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A form field wrapper component for labels, validation errors, and helper text.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock input styles
const inputStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#DC2626',
  },
});

// Mock input component
function MockInput({
  error,
  placeholder = 'Enter text...',
}: {
  error?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      style={[inputStyles.input, error && inputStyles.inputError]}
    />
  );
}

// Default form field
export const Default: Story = {
  render: () => (
    <FormField label="Email">
      <MockInput placeholder="Enter your email" />
    </FormField>
  ),
};

// Required field
export const Required: Story = {
  render: () => (
    <FormField label="Email" required>
      <MockInput placeholder="Enter your email" />
    </FormField>
  ),
};

// With helper text
export const WithHelperText: Story = {
  render: () => (
    <FormField
      label="Password"
      helperText="Must be at least 8 characters with one number"
    >
      <MockInput placeholder="Enter password" />
    </FormField>
  ),
};

// With error
export const WithError: Story = {
  render: () => (
    <FormField label="Email" error="Please enter a valid email address">
      <MockInput placeholder="Enter your email" error />
    </FormField>
  ),
};

// Required with error
export const RequiredWithError: Story = {
  render: () => (
    <FormField label="Email" required error="This field is required">
      <MockInput placeholder="Enter your email" error />
    </FormField>
  ),
};

// Error replaces helper text
export const ErrorReplacesHelper: Story = {
  render: () => (
    <FormField
      label="Username"
      required
      helperText="Choose a unique username"
      error="Username is already taken"
    >
      <MockInput placeholder="Choose username" error />
    </FormField>
  ),
};

// Without label
export const WithoutLabel: Story = {
  render: () => (
    <FormField helperText="Optional search field">
      <MockInput placeholder="Search..." />
    </FormField>
  ),
};

// Interactive validation example
function InteractiveValidationDemo() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;

  return (
    <FormField
      label="Email"
      required
      error={showError ? 'Please enter a valid email address' : undefined}
      helperText="We'll send your confirmation to this address"
    >
      <TextInput
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched(true)}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[inputStyles.input, showError && inputStyles.inputError]}
      />
    </FormField>
  );
}

export const InteractiveValidation: Story = {
  render: () => <InteractiveValidationDemo />,
};

// Form with multiple fields
export const MultipleFields: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <FormField label="Full Name" required>
        <MockInput placeholder="John Doe" />
      </FormField>
      <FormField
        label="Email"
        required
        helperText="We'll never share your email"
      >
        <MockInput placeholder="john@example.com" />
      </FormField>
      <FormField
        label="Phone"
        helperText="Optional - for account recovery"
      >
        <MockInput placeholder="+1 (555) 000-0000" />
      </FormField>
      <FormField label="Bio">
        <MockInput placeholder="Tell us about yourself..." />
      </FormField>
    </View>
  ),
};

// Form with validation states
export const ValidationStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <FormField label="Valid Field" required>
        <View
          style={[
            inputStyles.input,
            { borderColor: '#059669', backgroundColor: '#F0FDF4' },
          ]}
        >
          <Text>john@example.com</Text>
        </View>
      </FormField>
      <FormField label="Error Field" required error="Invalid email format">
        <View
          style={[
            inputStyles.input,
            { borderColor: '#DC2626', backgroundColor: '#FEF2F2' },
          ]}
        >
          <Text>invalid-email</Text>
        </View>
      </FormField>
      <FormField label="Pending Field" required helperText="Checking availability...">
        <View style={inputStyles.input}>
          <Text>checking...</Text>
        </View>
      </FormField>
    </View>
  ),
};
