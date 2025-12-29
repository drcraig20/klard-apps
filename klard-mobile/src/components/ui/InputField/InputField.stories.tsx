import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputField } from './InputField';

/**
 * InputField is a versatile text input component that supports multiple input types,
 * labels, error states, helper text, and icons. It handles password visibility toggle
 * and search clear functionality automatically based on the input type.
 */
const meta: Meta<typeof InputField> = {
  title: 'Form/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'currency', 'tel'],
      description: 'Input type - affects keyboard type and behavior',
    },
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

// Default text input
export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

// Controlled input with value
export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('John Doe');
    return (
      <InputField
        label="Full Name"
        placeholder="Enter your name"
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

// Input with error state
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('invalid-email');
    return (
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        value={value}
        onChangeText={setValue}
        error="Please enter a valid email address"
      />
    );
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    value: 'john_doe',
    editable: false,
  },
};

// Email input type
export const EmailInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Email"
        placeholder="you@example.com"
        type="email"
        value={value}
        onChangeText={setValue}
        helperText="We will never share your email"
      />
    );
  },
};

// Password input with toggle
export const PasswordInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={value}
        onChangeText={setValue}
        helperText="Must be at least 8 characters"
      />
    );
  },
};

// Search input with clear button
export const SearchInput: Story = {
  render: () => {
    const [value, setValue] = useState('React Native');
    return (
      <InputField
        placeholder="Search..."
        type="search"
        value={value}
        onChangeText={setValue}
        onClear={() => setValue('')}
      />
    );
  },
};

// Input with left icon
export const WithLeftIcon: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        type="tel"
        value={value}
        onChangeText={setValue}
        leftIcon={<Ionicons name="call-outline" size={20} color="#64748B" />}
      />
    );
  },
};

// Input with right icon
export const WithRightIcon: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Website"
        placeholder="https://example.com"
        type="text"
        value={value}
        onChangeText={setValue}
        rightIcon={<Ionicons name="globe-outline" size={20} color="#64748B" />}
      />
    );
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Required field',
    type: 'email',
    required: true,
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be 3-20 characters',
  },
};

// Number input
export const NumberInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Age"
        placeholder="Enter your age"
        type="number"
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

// All input types showcase
export const AllTypes: Story = {
  render: () => {
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState('');
    const [tel, setTel] = useState('');

    return (
      <View style={{ gap: 16 }}>
        <InputField
          label="Text"
          type="text"
          value={text}
          onChangeText={setText}
          placeholder="Regular text input"
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email input"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password input"
        />
        <InputField
          label="Search"
          type="search"
          value={search}
          onChangeText={setSearch}
          placeholder="Search input"
        />
        <InputField
          label="Number"
          type="number"
          value={number}
          onChangeText={setNumber}
          placeholder="Number input"
        />
        <InputField
          label="Phone"
          type="tel"
          value={tel}
          onChangeText={setTel}
          placeholder="Phone input"
        />
      </View>
    );
  },
};
