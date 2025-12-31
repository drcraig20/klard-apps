import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CurrencyInput } from "./currency-input";

const meta = {
  title: "Forms/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Currency input with automatic formatting, currency symbol prefix, min/max constraints, and proper decimal handling. Supports multiple currencies.",
      },
    },
  },
  argTypes: {
    value: {
      control: "number",
      description: "The numeric value",
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "CAD", "AUD"],
      description: "Currency code (default: USD)",
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    error: {
      control: "text",
      description: "Error message - displays in red below input",
    },
    helperText: {
      control: "text",
      description: "Helper text - displays below input when no error",
    },
    min: {
      control: "number",
      description: "Minimum allowed value",
    },
    max: {
      control: "number",
      description: "Maximum allowed value",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field indicator",
    },
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default USD input
export const Default: Story = {
  args: {
    value: 0,
    onChange: () => {},
    label: "Amount",
  },
};

// With value
export const WithValue: Story = {
  args: {
    value: 99.99,
    onChange: () => {},
    label: "Price",
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    value: 50,
    onChange: () => {},
    label: "Monthly Budget",
    helperText: "Enter your monthly spending limit",
  },
};

// With error state
export const WithError: Story = {
  args: {
    value: 0,
    onChange: () => {},
    label: "Transfer Amount",
    error: "Amount must be greater than $0",
  },
};

// Required field
export const Required: Story = {
  args: {
    value: 0,
    onChange: () => {},
    label: "Payment Amount",
    required: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: 250.5,
    onChange: () => {},
    label: "Fixed Amount",
    disabled: true,
  },
};

// EUR currency
export const Euro: Story = {
  args: {
    value: 149.99,
    onChange: () => {},
    label: "Price (EUR)",
    currency: "EUR",
  },
};

// GBP currency
export const BritishPound: Story = {
  args: {
    value: 89.5,
    onChange: () => {},
    label: "Price (GBP)",
    currency: "GBP",
  },
};

// CAD currency
export const CanadianDollar: Story = {
  args: {
    value: 125,
    onChange: () => {},
    label: "Price (CAD)",
    currency: "CAD",
  },
};

// AUD currency
export const AustralianDollar: Story = {
  args: {
    value: 199.99,
    onChange: () => {},
    label: "Price (AUD)",
    currency: "AUD",
  },
};

// With minimum value
export const WithMinValue: Story = {
  args: {
    value: 10,
    onChange: () => {},
    label: "Deposit Amount",
    min: 10,
    helperText: "Minimum deposit: $10",
  },
};

// With maximum value
export const WithMaxValue: Story = {
  args: {
    value: 500,
    onChange: () => {},
    label: "Daily Limit",
    max: 1000,
    helperText: "Maximum: $1,000 per day",
  },
};

// With min and max range
export const WithRange: Story = {
  args: {
    value: 50,
    onChange: () => {},
    label: "Transfer Amount",
    min: 10,
    max: 500,
    helperText: "Amount must be between $10 and $500",
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [amount, setAmount] = useState(0);
  return (
    <div className="max-w-sm">
      <CurrencyInput
        value={amount}
        onChange={setAmount}
        label="Interactive Amount"
        helperText="Type to see the value update"
      />
      <p className="mt-4 text-sm text-muted-foreground">
        Current value: ${amount.toFixed(2)}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Payment form example
const PaymentFormTemplate = () => {
  const [amount, setAmount] = useState(0);
  const [tip, setTip] = useState(0);
  const total = amount + tip;

  return (
    <div className="space-y-4 max-w-sm">
      <CurrencyInput
        value={amount}
        onChange={setAmount}
        label="Amount"
        required
        error={amount <= 0 ? "Please enter an amount" : undefined}
      />
      <CurrencyInput
        value={tip}
        onChange={setTip}
        label="Tip (optional)"
        min={0}
      />
      <div className="pt-4 border-t border-border">
        <p className="text-lg font-semibold text-foreground">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export const PaymentFormExample: Story = {
  render: () => <PaymentFormTemplate />,
};

// All currencies showcase
export const AllCurrencies: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <CurrencyInput
        value={99.99}
        onChange={() => {}}
        label="US Dollar"
        currency="USD"
      />
      <CurrencyInput
        value={89.99}
        onChange={() => {}}
        label="Euro"
        currency="EUR"
      />
      <CurrencyInput
        value={79.99}
        onChange={() => {}}
        label="British Pound"
        currency="GBP"
      />
      <CurrencyInput
        value={129.99}
        onChange={() => {}}
        label="Canadian Dollar"
        currency="CAD"
      />
      <CurrencyInput
        value={149.99}
        onChange={() => {}}
        label="Australian Dollar"
        currency="AUD"
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <CurrencyInput
        value={0}
        onChange={() => {}}
        label="Default"
      />
      <CurrencyInput
        value={99.99}
        onChange={() => {}}
        label="With Value"
      />
      <CurrencyInput
        value={50}
        onChange={() => {}}
        label="With Helper"
        helperText="Enter amount in USD"
      />
      <CurrencyInput
        value={0}
        onChange={() => {}}
        label="With Error"
        error="Amount is required"
      />
      <CurrencyInput
        value={100}
        onChange={() => {}}
        label="Required"
        required
      />
      <CurrencyInput
        value={250.5}
        onChange={() => {}}
        label="Disabled"
        disabled
      />
    </div>
  ),
};
