import type { Meta, StoryObj } from "@storybook/react";
import { AlertBanner } from "./alert-banner";
import { Button } from "../button";

const meta = {
  title: "Feedback/AlertBanner",
  component: AlertBanner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Contextual alert banner for displaying feedback messages. Supports success, error, warning, and info types with optional dismiss and action buttons.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "Alert type determining color and icon",
    },
    size: {
      control: "select",
      options: ["default", "compact"],
      description: "Banner size variant",
    },
    dismissible: {
      control: "boolean",
      description: "Shows dismiss button when true",
    },
    title: {
      control: "text",
      description: "Optional title for the alert",
    },
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default info alert
export const Default: Story = {
  args: {
    type: "info",
    children: "This is an informational message.",
  },
};

// Success alert
export const Success: Story = {
  args: {
    type: "success",
    children: "Your changes have been saved successfully.",
  },
};

// Error alert
export const Error: Story = {
  args: {
    type: "error",
    children: "An error occurred while processing your request.",
  },
};

// Warning alert
export const Warning: Story = {
  args: {
    type: "warning",
    children: "Your subscription will expire in 3 days.",
  },
};

// Info alert
export const Info: Story = {
  args: {
    type: "info",
    children: "New features are available. Check out the changelog.",
  },
};

// With title
export const WithTitle: Story = {
  args: {
    type: "success",
    title: "Success!",
    children: "Your subscription has been renewed.",
  },
};

// Dismissible alert
export const Dismissible: Story = {
  args: {
    type: "info",
    children: "You can dismiss this alert by clicking the X button.",
    dismissible: true,
    onDismiss: () => console.log("Alert dismissed"),
  },
};

// With action button
export const WithAction: Story = {
  args: {
    type: "warning",
    title: "Subscription Expiring",
    children: "Your subscription will expire in 3 days.",
    action: (
      <Button variant="outline" size="sm">
        Renew Now
      </Button>
    ),
  },
};

// Compact size
export const Compact: Story = {
  args: {
    type: "info",
    size: "compact",
    children: "This is a compact alert message.",
  },
};

// Complete example with all features
export const Complete: Story = {
  args: {
    type: "error",
    title: "Payment Failed",
    children:
      "We could not process your payment. Please update your payment method.",
    dismissible: true,
    onDismiss: () => console.log("Alert dismissed"),
    action: (
      <Button variant="outline" size="sm">
        Update Payment
      </Button>
    ),
  },
};

// All types showcase
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <AlertBanner type="success">
        Success message - Operation completed successfully.
      </AlertBanner>
      <AlertBanner type="error">
        Error message - Something went wrong.
      </AlertBanner>
      <AlertBanner type="warning">
        Warning message - Please review before proceeding.
      </AlertBanner>
      <AlertBanner type="info">
        Info message - Here is some helpful information.
      </AlertBanner>
    </div>
  ),
};
