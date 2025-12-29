import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./progress-bar";

const meta = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Progress bar component with multiple variants, sizes, and optional labels. Built on Radix UI Progress primitive.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    max: {
      control: "number",
      description: "Maximum value (default: 100)",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Bar height variant",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
    label: {
      control: "text",
      description: "Optional text label",
    },
    animated: {
      control: "boolean",
      description: "Enable smooth transition animation",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress bar
export const Default: Story = {
  args: {
    value: 60,
  },
};

// With percentage label
export const WithPercentage: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

// With text label
export const WithLabel: Story = {
  args: {
    value: 45,
    label: "Upload progress",
    showLabel: true,
  },
};

// Variants
export const VariantDefault: Story = {
  args: {
    value: 50,
    variant: "default",
  },
};

export const VariantSuccess: Story = {
  args: {
    value: 100,
    variant: "success",
    label: "Complete",
    showLabel: true,
  },
};

export const VariantWarning: Story = {
  args: {
    value: 75,
    variant: "warning",
    label: "Storage usage",
    showLabel: true,
  },
};

export const VariantError: Story = {
  args: {
    value: 90,
    variant: "error",
    label: "Critical level",
    showLabel: true,
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    value: 60,
    size: "sm",
  },
};

export const SizeMedium: Story = {
  args: {
    value: 60,
    size: "md",
  },
};

export const SizeLarge: Story = {
  args: {
    value: 60,
    size: "lg",
  },
};

// Custom max value
export const CustomMax: Story = {
  args: {
    value: 750,
    max: 1000,
    showLabel: true,
    label: "Points earned",
  },
};

// Without animation
export const NoAnimation: Story = {
  args: {
    value: 50,
    animated: false,
  },
};

// Zero progress
export const ZeroProgress: Story = {
  args: {
    value: 0,
    showLabel: true,
    label: "Not started",
  },
};

// Complete progress
export const Complete: Story = {
  args: {
    value: 100,
    variant: "success",
    showLabel: true,
    label: "Download complete",
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <span className="text-sm text-muted-foreground">Small</span>
        <ProgressBar value={60} size="sm" />
      </div>
      <div>
        <span className="text-sm text-muted-foreground">Medium</span>
        <ProgressBar value={60} size="md" />
      </div>
      <div>
        <span className="text-sm text-muted-foreground">Large</span>
        <ProgressBar value={60} size="lg" />
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <ProgressBar value={50} variant="default" label="Default" showLabel />
      <ProgressBar value={100} variant="success" label="Success" showLabel />
      <ProgressBar value={75} variant="warning" label="Warning" showLabel />
      <ProgressBar value={90} variant="error" label="Error" showLabel />
    </div>
  ),
};

// Usage progress example
export const UsageExample: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <ProgressBar
        value={8}
        max={10}
        label="Subscriptions tracked"
        showLabel
        variant={8 / 10 > 0.9 ? "error" : 8 / 10 > 0.7 ? "warning" : "default"}
      />
      <p className="text-xs text-muted-foreground">
        8 of 10 subscriptions used
      </p>
    </div>
  ),
};
