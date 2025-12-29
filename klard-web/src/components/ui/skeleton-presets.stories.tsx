import type { Meta, StoryObj } from "@storybook/react";
import {
  AvatarSkeleton,
  TextLineSkeleton,
  SubscriptionCardSkeleton,
} from "./skeleton-presets";

// Meta for the primary component
const meta = {
  title: "Feedback/SkeletonPresets",
  component: SubscriptionCardSkeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pre-built skeleton compositions for common UI patterns. Includes AvatarSkeleton, TextLineSkeleton, and SubscriptionCardSkeleton.",
      },
    },
  },
} satisfies Meta<typeof SubscriptionCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Avatar skeleton
export const Avatar: Story = {
  render: () => <AvatarSkeleton />,
};

// Avatar with custom size
export const AvatarLarge: Story = {
  render: () => <AvatarSkeleton size={64} />,
};

// Avatar sizes
export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AvatarSkeleton size={24} />
      <AvatarSkeleton size={32} />
      <AvatarSkeleton size={40} />
      <AvatarSkeleton size={48} />
      <AvatarSkeleton size={64} />
    </div>
  ),
};

// Text line skeleton
export const TextLine: Story = {
  render: () => <TextLineSkeleton />,
};

// Text line with custom width
export const TextLineCustomWidth: Story = {
  render: () => <TextLineSkeleton width={200} />,
};

// Multiple text lines
export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <TextLineSkeleton width="100%" />
      <TextLineSkeleton width="80%" />
      <TextLineSkeleton width="60%" />
    </div>
  ),
};

// Subscription card skeleton
export const SubscriptionCard: Story = {
  render: () => <SubscriptionCardSkeleton />,
};

// Multiple subscription cards
export const SubscriptionCardList: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <SubscriptionCardSkeleton />
      <SubscriptionCardSkeleton />
      <SubscriptionCardSkeleton />
    </div>
  ),
};

// Combined usage - Profile header
export const ProfileHeader: Story = {
  render: () => (
    <div className="flex items-start gap-4 p-4 border rounded-lg w-80">
      <AvatarSkeleton size={56} />
      <div className="flex-1 space-y-2">
        <TextLineSkeleton width={120} />
        <TextLineSkeleton width="100%" />
        <TextLineSkeleton width="80%" />
      </div>
    </div>
  ),
};

// Dashboard skeleton example
export const DashboardSkeleton: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <TextLineSkeleton width={180} />
          <TextLineSkeleton width={120} />
        </div>
        <AvatarSkeleton size={40} />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <TextLineSkeleton width={60} />
            <TextLineSkeleton width={80} />
          </div>
        ))}
      </div>

      {/* Subscription list */}
      <div className="space-y-4">
        <TextLineSkeleton width={140} />
        <SubscriptionCardSkeleton />
        <SubscriptionCardSkeleton />
      </div>
    </div>
  ),
};

// All presets showcase
export const AllPresets: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3">AvatarSkeleton</h3>
        <div className="flex items-center gap-4">
          <AvatarSkeleton size={32} />
          <AvatarSkeleton size={40} />
          <AvatarSkeleton size={48} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">TextLineSkeleton</h3>
        <div className="space-y-2 w-64">
          <TextLineSkeleton width="100%" />
          <TextLineSkeleton width={150} />
          <TextLineSkeleton width="50%" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">SubscriptionCardSkeleton</h3>
        <div className="w-96">
          <SubscriptionCardSkeleton />
        </div>
      </div>
    </div>
  ),
};
