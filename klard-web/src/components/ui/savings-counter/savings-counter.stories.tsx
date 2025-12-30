import type { Meta, StoryObj } from "@storybook/react";
import { SavingsCounter } from "./savings-counter";

const meta = {
  title: "Data Display/SavingsCounter",
  component: SavingsCounter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays savings amount with success green styling and optional glow effect. Supports multiple currencies and sizes.",
      },
    },
  },
  argTypes: {
    amount: {
      control: { type: "number" },
      description: "The savings amount to display",
    },
    currency: {
      control: "text",
      description: "ISO 4217 currency code",
    },
    animate: {
      control: "boolean",
      description: "Whether to animate the counter",
    },
    label: {
      control: "text",
      description: "Optional label above the amount",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Display size variant",
    },
  },
} satisfies Meta<typeof SavingsCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default savings display */
export const Default: Story = {
  args: {
    amount: 1234.56,
  },
};

/** Small amount */
export const SmallAmount: Story = {
  args: {
    amount: 12.99,
  },
};

/** Large amount */
export const LargeAmount: Story = {
  args: {
    amount: 10543.27,
  },
};

/** With label */
export const WithLabel: Story = {
  args: {
    amount: 2500.0,
    label: "Total Blocked",
  },
};

/** With animation */
export const Animated: Story = {
  args: {
    amount: 1500.0,
    animate: true,
  },
};

/** Euro currency */
export const EuroCurrency: Story = {
  args: {
    amount: 899.99,
    currency: "EUR",
  },
};

/** British Pounds */
export const GBPCurrency: Story = {
  args: {
    amount: 750.0,
    currency: "GBP",
  },
};

/** Zero amount */
export const ZeroAmount: Story = {
  args: {
    amount: 0,
  },
};

/** Small size */
export const Small: Story = {
  args: {
    amount: 500,
    size: "sm",
  },
};

/** Large size */
export const Large: Story = {
  args: {
    amount: 5000,
    size: "lg",
  },
};

/** Size comparison */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <SavingsCounter amount={1234.56} size="sm" />
      <SavingsCounter amount={1234.56} size="md" />
      <SavingsCounter amount={1234.56} size="lg" />
    </div>
  ),
};

/** Currency comparison */
export const CurrencyComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <SavingsCounter amount={1234.56} currency="USD" label="USD" />
      <SavingsCounter amount={1234.56} currency="EUR" label="EUR" />
      <SavingsCounter amount={1234.56} currency="GBP" label="GBP" />
      <SavingsCounter amount={1234.56} currency="CAD" label="CAD" />
    </div>
  ),
};
