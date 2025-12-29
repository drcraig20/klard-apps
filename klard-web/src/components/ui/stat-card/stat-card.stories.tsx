import type { Meta, StoryObj } from "@storybook/react";
import { DollarSign, CreditCard, TrendingUp, Wallet, Users } from "lucide-react";
import { StatCard } from "./stat-card";

const meta = {
  title: "Data Display/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Statistical card component for displaying metrics with optional trend indicators and icons. Supports multiple sizes and click interactions.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label describing the metric",
    },
    value: {
      control: "text",
      description: "The metric value to display",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Card size",
    },
    muted: {
      control: "boolean",
      description: "Reduces visual prominence",
    },
    trend: {
      control: "object",
      description: "Optional trend indicator with direction and value",
    },
    icon: {
      control: false,
      description: "Optional icon to display",
    },
    onClick: {
      action: "clicked",
      description: "Click handler - makes card interactive",
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: "Total Spending",
    value: "$1,234.56",
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    label: "Monthly Spending",
    value: "$456.78",
    icon: <DollarSign className="h-5 w-5" />,
  },
};

// With upward trend
export const TrendUp: Story = {
  args: {
    label: "Active Subscriptions",
    value: "12",
    trend: {
      direction: "up",
      value: "+3 this month",
    },
    icon: <CreditCard className="h-5 w-5" />,
  },
};

// With downward trend
export const TrendDown: Story = {
  args: {
    label: "Monthly Savings",
    value: "$89.50",
    trend: {
      direction: "down",
      value: "-$12.00 vs last month",
    },
    icon: <TrendingUp className="h-5 w-5" />,
  },
};

// Neutral trend
export const TrendNeutral: Story = {
  args: {
    label: "Avg per Subscription",
    value: "$24.99",
    trend: {
      direction: "neutral",
      value: "No change",
    },
    icon: <Wallet className="h-5 w-5" />,
  },
};

// Small size
export const Small: Story = {
  args: {
    label: "Cards",
    value: "5",
    size: "sm",
    icon: <CreditCard className="h-4 w-4" />,
  },
};

// Medium size
export const Medium: Story = {
  args: {
    label: "Total Subscriptions",
    value: "24",
    size: "md",
    icon: <Users className="h-5 w-5" />,
  },
};

// Large size
export const Large: Story = {
  args: {
    label: "Annual Spending",
    value: "$4,567.89",
    size: "lg",
    icon: <DollarSign className="h-6 w-6" />,
    trend: {
      direction: "down",
      value: "-8% vs last year",
    },
  },
};

// Muted variant
export const Muted: Story = {
  args: {
    label: "Inactive Cards",
    value: "2",
    muted: true,
    icon: <CreditCard className="h-5 w-5" />,
  },
};

// Interactive (clickable)
export const Interactive: Story = {
  args: {
    label: "View All Subscriptions",
    value: "15",
    icon: <CreditCard className="h-5 w-5" />,
    onClick: () => console.log("Card clicked"),
  },
};

// Interactive with trend
export const InteractiveWithTrend: Story = {
  args: {
    label: "This Month",
    value: "$234.56",
    trend: {
      direction: "up",
      value: "+$45.00",
    },
    icon: <DollarSign className="h-5 w-5" />,
    onClick: () => console.log("View details"),
  },
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatCard
        label="Small Card"
        value="$99.00"
        size="sm"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <StatCard
        label="Medium Card"
        value="$199.00"
        size="md"
        icon={<DollarSign className="h-5 w-5" />}
      />
      <StatCard
        label="Large Card"
        value="$499.00"
        size="lg"
        icon={<DollarSign className="h-6 w-6" />}
      />
    </div>
  ),
};

// Dashboard example
export const DashboardExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Monthly Spending"
        value="$456.78"
        trend={{ direction: "down", value: "-12%" }}
        icon={<DollarSign className="h-5 w-5" />}
      />
      <StatCard
        label="Active Subscriptions"
        value="15"
        trend={{ direction: "up", value: "+2" }}
        icon={<CreditCard className="h-5 w-5" />}
      />
      <StatCard
        label="Active Cards"
        value="8"
        trend={{ direction: "neutral", value: "No change" }}
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard
        label="Saved This Year"
        value="$1,234"
        trend={{ direction: "up", value: "+$234" }}
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  ),
};

// All trend directions
export const AllTrendDirections: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        label="Increasing"
        value="$500"
        trend={{ direction: "up", value: "+15%" }}
        icon={<TrendingUp className="h-5 w-5" />}
      />
      <StatCard
        label="Stable"
        value="$300"
        trend={{ direction: "neutral", value: "0%" }}
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard
        label="Decreasing"
        value="$200"
        trend={{ direction: "down", value: "-8%" }}
        icon={<DollarSign className="h-5 w-5" />}
      />
    </div>
  ),
};
