import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectField, type SelectOption } from './SelectField';

/**
 * SelectField provides a dropdown selection interface with a modal picker.
 * It supports custom options with optional icons, disabled options, and
 * integrates haptic feedback on selection.
 */
const meta: Meta<typeof SelectField> = {
  title: 'Form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected',
    },
    error: {
      control: 'text',
      description: 'Error message - displays in red below select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
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

const basicOptions: SelectOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'weekly', label: 'Weekly' },
];

const categoryOptions: SelectOption[] = [
  { value: 'streaming', label: 'Streaming' },
  { value: 'music', label: 'Music' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'news', label: 'News' },
  { value: 'other', label: 'Other' },
];

const currencyOptions: SelectOption[] = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
  { value: 'JPY', label: 'Japanese Yen (JPY)' },
  { value: 'CAD', label: 'Canadian Dollar (CAD)' },
  { value: 'AUD', label: 'Australian Dollar (AUD)' },
];

// Default select field
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        label="Billing Cycle"
        placeholder="Select cycle..."
        value={value}
        onChange={setValue}
        options={basicOptions}
      />
    );
  },
};

// With selected value
export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('monthly');
    return (
      <SelectField
        label="Billing Cycle"
        value={value}
        onChange={setValue}
        options={basicOptions}
      />
    );
  },
};

// With error state
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        label="Category"
        placeholder="Select a category..."
        value={value}
        onChange={setValue}
        options={categoryOptions}
        error="Please select a category"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('yearly');
    return (
      <SelectField
        label="Billing Cycle"
        value={value}
        onChange={setValue}
        options={basicOptions}
        disabled
      />
    );
  },
};

// With many options
export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        label="Subscription Category"
        placeholder="Choose category..."
        value={value}
        onChange={setValue}
        options={categoryOptions}
      />
    );
  },
};

// With disabled options
export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const optionsWithDisabled: SelectOption[] = [
      { value: 'free', label: 'Free Plan' },
      { value: 'basic', label: 'Basic Plan' },
      { value: 'pro', label: 'Pro Plan', disabled: true },
      { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
    ];
    return (
      <View style={{ gap: 8 }}>
        <SelectField
          label="Subscription Plan"
          placeholder="Select plan..."
          value={value}
          onChange={setValue}
          options={optionsWithDisabled}
        />
        <Text style={{ color: '#64748B', fontSize: 12 }}>
          Pro and Enterprise require upgrade
        </Text>
      </View>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const iconOptions: SelectOption[] = [
      {
        value: 'streaming',
        label: 'Streaming',
        icon: <Ionicons name="tv-outline" size={20} color="#64748B" />,
      },
      {
        value: 'music',
        label: 'Music',
        icon: <Ionicons name="musical-notes-outline" size={20} color="#64748B" />,
      },
      {
        value: 'gaming',
        label: 'Gaming',
        icon: <Ionicons name="game-controller-outline" size={20} color="#64748B" />,
      },
      {
        value: 'fitness',
        label: 'Fitness',
        icon: <Ionicons name="fitness-outline" size={20} color="#64748B" />,
      },
    ];
    return (
      <SelectField
        label="Category"
        placeholder="Select with icons..."
        value={value}
        onChange={setValue}
        options={iconOptions}
      />
    );
  },
};

// Currency selector
export const CurrencySelector: Story = {
  render: () => {
    const [value, setValue] = useState('USD');
    return (
      <SelectField
        label="Currency"
        value={value}
        onChange={setValue}
        options={currencyOptions}
      />
    );
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        label="Notification Preference"
        placeholder="How should we notify you?"
        value={value}
        onChange={setValue}
        options={[
          { value: 'email', label: 'Email' },
          { value: 'push', label: 'Push Notification' },
          { value: 'sms', label: 'SMS' },
          { value: 'none', label: 'No notifications' },
        ]}
      />
    );
  },
};

// Without label
export const WithoutLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SelectField
        placeholder="Select an option..."
        value={value}
        onChange={setValue}
        options={basicOptions}
      />
    );
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => {
    const [value, setValue] = useState('monthly');

    return (
      <View style={{ gap: 16 }}>
        <SelectField
          label="Empty State"
          placeholder="Nothing selected"
          value=""
          onChange={() => {}}
          options={basicOptions}
        />
        <SelectField
          label="Filled State"
          value={value}
          onChange={setValue}
          options={basicOptions}
        />
        <SelectField
          label="Error State"
          value=""
          onChange={() => {}}
          options={basicOptions}
          placeholder="Required field"
          error="This field is required"
        />
        <SelectField
          label="Disabled State"
          value="yearly"
          onChange={() => {}}
          options={basicOptions}
          disabled
        />
      </View>
    );
  },
};
