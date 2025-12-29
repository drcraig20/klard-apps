import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading placeholder component for content that is still loading. Supports rectangular, circular, and text variants with customizable dimensions.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["rectangular", "circular", "text"],
      description: "Shape variant of the skeleton",
    },
    width: {
      control: "text",
      description: "Width in pixels or CSS value",
    },
    height: {
      control: "text",
      description: "Height in pixels or CSS value",
    },
    animated: {
      control: "boolean",
      description: "Enable pulse animation",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default rectangular skeleton
export const Default: Story = {
  args: {
    width: 200,
    height: 20,
    variant: "rectangular",
  },
};

// Rectangular variant
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 300,
    height: 100,
  },
};

// Circular variant (avatar)
export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

// Text variant
export const Text: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

// No animation
export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 20,
    animated: false,
  },
};

// Custom dimensions with percentage
export const PercentageWidth: Story = {
  args: {
    variant: "rectangular",
    width: "80%",
    height: 16,
  },
};

// Card skeleton example
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4 space-y-4">
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div className="space-y-2">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="50%" />
      </div>
    </div>
  ),
};

// Profile skeleton example
export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={56} height={56} />
      <div className="space-y-2">
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={180} />
      </div>
    </div>
  ),
};

// Table row skeleton
export const TableRowSkeleton: Story = {
  render: () => (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="rectangular" width={80} height={24} />
        </div>
      ))}
    </div>
  ),
};

// Form skeleton
export const FormSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        <Skeleton variant="text" width={60} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width={80} />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </div>
      <Skeleton variant="rectangular" width="100%" height={40} />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Rectangular</p>
        <Skeleton variant="rectangular" width={200} height={40} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Circular</p>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Text</p>
        <div className="space-y-2 w-64">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
    </div>
  ),
};
