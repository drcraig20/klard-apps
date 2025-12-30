import type { Meta, StoryObj } from "@storybook/react";
import { HealthIndicator } from "./health-indicator";

const meta = {
  title: "Data Display/HealthIndicator",
  component: HealthIndicator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays subscription health status with color-coded indicator dot and optional label. Used to show if a subscription is forgotten, has price increased, or is healthy.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["forgotten", "price-increased", "healthy"],
      description: "Health status to display",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size variant",
    },
    showLabel: {
      control: "boolean",
      description: "Whether to show the text label",
    },
  },
} satisfies Meta<typeof HealthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default healthy status */
export const Default: Story = {
  args: {
    status: "healthy",
  },
};

/** Forgotten subscription - amber indicator */
export const Forgotten: Story = {
  args: {
    status: "forgotten",
  },
};

/** Price increased - warning indicator */
export const PriceIncreased: Story = {
  args: {
    status: "price-increased",
  },
};

/** Healthy subscription - success indicator */
export const Healthy: Story = {
  args: {
    status: "healthy",
  },
};

/** Small size variant */
export const SmallSize: Story = {
  args: {
    status: "healthy",
    size: "sm",
  },
};

/** Without text label - dot only */
export const WithoutLabel: Story = {
  args: {
    status: "forgotten",
    showLabel: false,
  },
};

/** All statuses side by side */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-6">
      <HealthIndicator status="forgotten" />
      <HealthIndicator status="price-increased" />
      <HealthIndicator status="healthy" />
    </div>
  ),
};

/** Size comparison */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <HealthIndicator status="forgotten" size="sm" />
        <HealthIndicator status="price-increased" size="sm" />
        <HealthIndicator status="healthy" size="sm" />
      </div>
      <div className="flex gap-6">
        <HealthIndicator status="forgotten" size="md" />
        <HealthIndicator status="price-increased" size="md" />
        <HealthIndicator status="healthy" size="md" />
      </div>
    </div>
  ),
};

/** Dots only - all statuses without labels */
export const DotsOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <HealthIndicator status="forgotten" showLabel={false} />
      <HealthIndicator status="price-increased" showLabel={false} />
      <HealthIndicator status="healthy" showLabel={false} />
    </div>
  ),
};
