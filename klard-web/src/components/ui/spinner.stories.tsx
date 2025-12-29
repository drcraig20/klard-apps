import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading spinner component with multiple sizes. Can display an optional label next to the spinner.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spinner size variant",
    },
    label: {
      control: "text",
      description: "Optional text label displayed next to the spinner",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default spinner
export const Default: Story = {
  args: {
    size: "md",
  },
};

// Small size
export const Small: Story = {
  args: {
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    size: "md",
  },
};

// Large size
export const Large: Story = {
  args: {
    size: "lg",
  },
};

// With label
export const WithLabel: Story = {
  args: {
    size: "md",
    label: "Loading...",
  },
};

// Loading states examples
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Spinner size="sm" label="Saving..." />
      <Spinner size="md" label="Loading data..." />
      <Spinner size="lg" label="Processing..." />
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-sm text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

// In button context
export const InButtonContext: Story = {
  render: () => (
    <button
      disabled
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50"
    >
      <Spinner size="sm" className="text-primary-foreground" />
      Submitting...
    </button>
  ),
};
