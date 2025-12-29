import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { CurrencyInput } from './CurrencyInput';

/**
 * CurrencyInput is a specialized input for monetary values with automatic
 * currency symbol display, decimal formatting, and optional min/max validation.
 * It wraps FormField for consistent label and error handling.
 */
const meta: Meta<typeof CurrencyInput> = {
  title: 'Form/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  argTypes: {
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
      description: 'Currency code for symbol display',
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
    min: {
      control: 'number',
      description: 'Minimum allowed value',
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Shows required asterisk after label',
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

// Default currency input
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <CurrencyInput
        label="Amount"
        placeholder="0.00"
        value={value}
        onChange={setValue}
      />
    );
  },
};

// With a filled value
export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState(99.99);
    return (
      <CurrencyInput
        label="Price"
        value={value}
        onChange={setValue}
      />
    );
  },
};

// With error state
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <CurrencyInput
        label="Minimum Deposit"
        value={value}
        onChange={setValue}
        min={10}
        error="Minimum deposit is $10.00"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(150);
    return (
      <CurrencyInput
        label="Current Balance"
        value={value}
        onChange={setValue}
        disabled
      />
    );
  },
};

// With min/max constraints
export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <CurrencyInput
        label="Donation Amount"
        value={value}
        onChange={setValue}
        min={5}
        max={1000}
        helperText="Min: $5.00, Max: $1,000.00"
      />
    );
  },
};

// Euro currency
export const EuroCurrency: Story = {
  render: () => {
    const [value, setValue] = useState(49.99);
    return (
      <CurrencyInput
        label="Price (EUR)"
        value={value}
        onChange={setValue}
        currency="EUR"
      />
    );
  },
};

// British Pound currency
export const GBPCurrency: Story = {
  render: () => {
    const [value, setValue] = useState(29.99);
    return (
      <CurrencyInput
        label="Price (GBP)"
        value={value}
        onChange={setValue}
        currency="GBP"
      />
    );
  },
};

// Japanese Yen currency
export const JPYCurrency: Story = {
  render: () => {
    const [value, setValue] = useState(1500);
    return (
      <CurrencyInput
        label="Price (JPY)"
        value={value}
        onChange={setValue}
        currency="JPY"
      />
    );
  },
};

// Required field
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <CurrencyInput
        label="Payment Amount"
        value={value}
        onChange={setValue}
        required
      />
    );
  },
};

// With helper text
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <CurrencyInput
        label="Monthly Budget"
        value={value}
        onChange={setValue}
        helperText="Enter your target monthly spending limit"
      />
    );
  },
};

// Multiple currencies showcase
export const MultipleCurrencies: Story = {
  render: () => {
    const [usd, setUsd] = useState(100);
    const [eur, setEur] = useState(85);
    const [gbp, setGbp] = useState(75);
    const [jpy, setJpy] = useState(15000);

    return (
      <View style={{ gap: 16 }}>
        <CurrencyInput
          label="US Dollars"
          value={usd}
          onChange={setUsd}
          currency="USD"
        />
        <CurrencyInput
          label="Euros"
          value={eur}
          onChange={setEur}
          currency="EUR"
        />
        <CurrencyInput
          label="British Pounds"
          value={gbp}
          onChange={setGbp}
          currency="GBP"
        />
        <CurrencyInput
          label="Japanese Yen"
          value={jpy}
          onChange={setJpy}
          currency="JPY"
        />
      </View>
    );
  },
};
