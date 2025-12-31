import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./price-display";

const meta = {
  title: "Data Display/PriceDisplay",
  component: PriceDisplay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Price display component for showing formatted currency amounts with optional billing cycles and price change indicators.",
      },
    },
  },
  argTypes: {
    amount: {
      control: "number",
      description: "The price amount to display",
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "CAD", "AUD"],
      description: "Currency code for formatting",
    },
    billingCycle: {
      control: "select",
      options: ["monthly", "yearly", "weekly", "one-time", undefined],
      description: "Billing cycle label",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Display size",
    },
    showChange: {
      control: "object",
      description: "Optional price change indicator",
    },
  },
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    amount: 9.99,
  },
};

// Monthly billing
export const Monthly: Story = {
  args: {
    amount: 14.99,
    billingCycle: "monthly",
  },
};

// Yearly billing
export const Yearly: Story = {
  args: {
    amount: 99.99,
    billingCycle: "yearly",
  },
};

// Weekly billing
export const Weekly: Story = {
  args: {
    amount: 4.99,
    billingCycle: "weekly",
  },
};

// One-time payment
export const OneTime: Story = {
  args: {
    amount: 199.99,
    billingCycle: "one-time",
  },
};

// Small size
export const Small: Story = {
  args: {
    amount: 9.99,
    billingCycle: "monthly",
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    amount: 19.99,
    billingCycle: "monthly",
    size: "md",
  },
};

// Large size
export const Large: Story = {
  args: {
    amount: 49.99,
    billingCycle: "monthly",
    size: "lg",
  },
};

// Price increase
export const PriceIncrease: Story = {
  args: {
    amount: 14.99,
    billingCycle: "monthly",
    showChange: {
      from: 9.99,
      direction: "increase",
    },
  },
};

// Price decrease
export const PriceDecrease: Story = {
  args: {
    amount: 7.99,
    billingCycle: "monthly",
    showChange: {
      from: 9.99,
      direction: "decrease",
    },
  },
};

// Euro currency
export const EuroCurrency: Story = {
  args: {
    amount: 12.99,
    currency: "EUR",
    billingCycle: "monthly",
  },
};

// British Pounds
export const GBPCurrency: Story = {
  args: {
    amount: 10.99,
    currency: "GBP",
    billingCycle: "monthly",
  },
};

// Canadian Dollars
export const CADCurrency: Story = {
  args: {
    amount: 15.99,
    currency: "CAD",
    billingCycle: "monthly",
  },
};

// Large amount
export const LargeAmount: Story = {
  args: {
    amount: 1234.56,
    billingCycle: "yearly",
    size: "lg",
  },
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PriceDisplay amount={9.99} billingCycle="monthly" size="sm" />
      <PriceDisplay amount={9.99} billingCycle="monthly" size="md" />
      <PriceDisplay amount={9.99} billingCycle="monthly" size="lg" />
    </div>
  ),
};

// All billing cycles
export const AllBillingCycles: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <PriceDisplay amount={4.99} billingCycle="weekly" />
      <PriceDisplay amount={19.99} billingCycle="monthly" />
      <PriceDisplay amount={149.99} billingCycle="yearly" />
      <PriceDisplay amount={299.99} billingCycle="one-time" />
    </div>
  ),
};

// Price changes comparison
export const PriceChanges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Price Increased</p>
        <PriceDisplay
          amount={14.99}
          billingCycle="monthly"
          showChange={{ from: 9.99, direction: "increase" }}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">Price Decreased (Savings!)</p>
        <PriceDisplay
          amount={7.99}
          billingCycle="monthly"
          showChange={{ from: 12.99, direction: "decrease" }}
        />
      </div>
    </div>
  ),
};

// Currency comparison
export const CurrencyComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-xs text-muted-foreground mb-1">USD</p>
        <PriceDisplay amount={9.99} currency="USD" billingCycle="monthly" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">EUR</p>
        <PriceDisplay amount={9.99} currency="EUR" billingCycle="monthly" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">GBP</p>
        <PriceDisplay amount={9.99} currency="GBP" billingCycle="monthly" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">CAD</p>
        <PriceDisplay amount={9.99} currency="CAD" billingCycle="monthly" />
      </div>
    </div>
  ),
};

// Subscription pricing example
export const SubscriptionPricing: Story = {
  render: () => (
    <div className="space-y-4 p-4 border rounded-lg max-w-sm">
      <h3 className="font-semibold">Pro Plan</h3>
      <div className="flex items-baseline gap-2">
        <PriceDisplay amount={19.99} billingCycle="monthly" size="lg" />
      </div>
      <p className="text-sm text-muted-foreground">
        Billed monthly. Cancel anytime.
      </p>
      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">Or save with annual billing:</p>
        <PriceDisplay
          amount={14.99}
          billingCycle="monthly"
          size="md"
          showChange={{ from: 19.99, direction: "decrease" }}
        />
        <p className="text-xs text-success mt-1">Save $60/year</p>
      </div>
    </div>
  ),
};
