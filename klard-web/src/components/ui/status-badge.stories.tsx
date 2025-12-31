import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge, type StatusType } from "./status-badge";

const meta = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Status badge component that displays subscription/account status with appropriate icon and color. Supports active, trial, paused, blocked, cancelled, locked, expired, and pending states.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "trial", "paused", "blocked", "cancelled", "locked", "expired", "pending"] as StatusType[],
      description: "Status type that determines the badge appearance",
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Active status
export const Active: Story = {
  args: {
    status: "active",
  },
};

// Trial status
export const Trial: Story = {
  args: {
    status: "trial",
  },
};

// Paused status
export const Paused: Story = {
  args: {
    status: "paused",
  },
};

// Blocked status
export const Blocked: Story = {
  args: {
    status: "blocked",
  },
};

// Cancelled status
export const Cancelled: Story = {
  args: {
    status: "cancelled",
  },
};

// Locked status
export const Locked: Story = {
  args: {
    status: "locked",
  },
};

// Expired status
export const Expired: Story = {
  args: {
    status: "expired",
  },
};

// Pending status
export const Pending: Story = {
  args: {
    status: "pending",
  },
};

// All statuses showcase
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <StatusBadge status="active" />
      <StatusBadge status="trial" />
      <StatusBadge status="paused" />
      <StatusBadge status="blocked" />
      <StatusBadge status="cancelled" />
      <StatusBadge status="locked" />
      <StatusBadge status="expired" />
      <StatusBadge status="pending" />
    </div>
  ),
};

// Statuses with descriptions
export const StatusesWithDescriptions: Story = {
  render: () => {
    const statuses: { status: StatusType; description: string }[] = [
      { status: "active", description: "Subscription is active and billing normally" },
      { status: "trial", description: "Free trial period, not yet billing" },
      { status: "paused", description: "Subscription temporarily paused by user" },
      { status: "blocked", description: "Payment blocked by Klard protection" },
      { status: "cancelled", description: "Subscription cancelled, may have access until period end" },
      { status: "locked", description: "Account locked due to payment issues" },
      { status: "expired", description: "Subscription period has ended" },
      { status: "pending", description: "Awaiting confirmation or processing" },
    ];

    return (
      <div className="space-y-3">
        {statuses.map(({ status, description }) => (
          <div key={status} className="flex items-center gap-4">
            <div className="w-28">
              <StatusBadge status={status} />
            </div>
            <span className="text-sm text-muted-foreground">{description}</span>
          </div>
        ))}
      </div>
    );
  },
};

// In subscription card context
export const SubscriptionCardContext: Story = {
  render: () => {
    const subscriptions = [
      { name: "Netflix", price: "$15.99/mo", status: "active" as StatusType },
      { name: "Spotify", price: "$9.99/mo", status: "trial" as StatusType },
      { name: "HBO Max", price: "$14.99/mo", status: "blocked" as StatusType },
      { name: "Disney+", price: "$7.99/mo", status: "cancelled" as StatusType },
    ];

    return (
      <div className="space-y-3 max-w-md">
        {subscriptions.map((sub) => (
          <div
            key={sub.name}
            className="flex items-center justify-between p-4 border border-border rounded-lg"
          >
            <div>
              <p className="font-medium">{sub.name}</p>
              <p className="text-sm text-muted-foreground">{sub.price}</p>
            </div>
            <StatusBadge status={sub.status} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "StatusBadge used in a subscription list context.",
      },
    },
  },
};

// Grouped by variant type
export const GroupedByVariant: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">Success variant</p>
        <StatusBadge status="active" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">Warning variant</p>
        <div className="flex gap-2">
          <StatusBadge status="trial" />
          <StatusBadge status="locked" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">Error variant</p>
        <StatusBadge status="blocked" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2 text-muted-foreground">Default variant</p>
        <div className="flex gap-2">
          <StatusBadge status="paused" />
          <StatusBadge status="cancelled" />
          <StatusBadge status="expired" />
          <StatusBadge status="pending" />
        </div>
      </div>
    </div>
  ),
};
