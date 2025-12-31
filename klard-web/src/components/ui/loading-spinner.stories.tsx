import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSpinner } from "./loading-spinner";

const meta = {
  title: "Feedback/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading spinner component with size and color variants. Note: This component is deprecated in favor of the Spinner component from './spinner'.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spinner size variant",
    },
    variant: {
      control: "select",
      options: ["primary", "white"],
      description: "Color variant - primary for dark backgrounds, white for light",
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default spinner
export const Default: Story = {
  args: {
    size: "md",
    variant: "primary",
  },
};

// Small size
export const Small: Story = {
  args: {
    size: "sm",
    variant: "primary",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    size: "md",
    variant: "primary",
  },
};

// Large size
export const Large: Story = {
  args: {
    size: "lg",
    variant: "primary",
  },
};

// White variant (for dark backgrounds)
export const WhiteVariant: Story = {
  args: {
    size: "md",
    variant: "white",
  },
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="md" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};

// Both variants comparison
export const BothVariants: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border">
        <LoadingSpinner size="md" variant="primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary">
        <LoadingSpinner size="md" variant="white" />
        <span className="text-xs text-primary-foreground">White</span>
      </div>
    </div>
  ),
};

// In button context
export const InButtonContext: Story = {
  render: () => (
    <div className="space-y-4">
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-80"
      >
        <LoadingSpinner size="sm" variant="white" />
        Submitting...
      </button>
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground opacity-80"
      >
        <LoadingSpinner size="sm" variant="primary" />
        Loading...
      </button>
    </div>
  ),
};

// Loading state example
export const LoadingStateExample: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border border-border rounded-lg min-h-[200px]">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">Loading your data...</p>
    </div>
  ),
};
