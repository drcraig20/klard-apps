import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster } from "./sonner";
import { Button } from "./button";

const meta = {
  title: "Feedback/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Klard-styled toast notification provider using Sonner. Provides themed toasts with rich colors and custom styling for success, error, warning, and info states.",
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Position of toast notifications",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default position (bottom-right)
export const Default: Story = {
  args: {
    position: "bottom-right",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Default toast notification")}>
        Show Toast
      </Button>
    </>
  ),
};

// Success toast
export const Success: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        variant="default"
        onClick={() => toast.success("Successfully saved!", {
          description: "Your changes have been saved.",
        })}
      >
        Show Success Toast
      </Button>
    </>
  ),
};

// Error toast
export const Error: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        variant="destructive"
        onClick={() => toast.error("Something went wrong", {
          description: "Please try again later.",
        })}
      >
        Show Error Toast
      </Button>
    </>
  ),
};

// Warning toast
export const Warning: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        variant="outline"
        onClick={() => toast.warning("Warning", {
          description: "Your session will expire in 5 minutes.",
        })}
      >
        Show Warning Toast
      </Button>
    </>
  ),
};

// Info toast
export const Info: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        variant="secondary"
        onClick={() => toast.info("New update available", {
          description: "A new version is ready to install.",
        })}
      >
        Show Info Toast
      </Button>
    </>
  ),
};

// With action button
export const WithAction: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        onClick={() => toast.success("Item deleted", {
          description: "The item has been removed.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })}
      >
        Show Toast with Action
      </Button>
    </>
  ),
};

// Custom duration
export const CustomDuration: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <Button
        onClick={() => toast("Quick notification", {
          description: "This disappears in 2 seconds.",
          duration: 2000,
        })}
      >
        Show Quick Toast (2s)
      </Button>
    </>
  ),
};

// All toast types playground
export const AllTypes: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-wrap gap-4">
        <Button variant="default" onClick={() => toast.success("Success", { description: "Operation completed" })}>
          Success
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Error", { description: "Operation failed" })}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Warning", { description: "Please review" })}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.info("Info", { description: "For your information" })}>
          Info
        </Button>
      </div>
    </>
  ),
};

// Different positions
export const TopLeft: Story = {
  args: {
    position: "top-left",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Toast at top-left")}>
        Show Toast
      </Button>
    </>
  ),
};

export const TopCenter: Story = {
  args: {
    position: "top-center",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Toast at top-center")}>
        Show Toast
      </Button>
    </>
  ),
};

export const TopRight: Story = {
  args: {
    position: "top-right",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Toast at top-right")}>
        Show Toast
      </Button>
    </>
  ),
};

export const BottomLeft: Story = {
  args: {
    position: "bottom-left",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Toast at bottom-left")}>
        Show Toast
      </Button>
    </>
  ),
};

export const BottomCenter: Story = {
  args: {
    position: "bottom-center",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast("Toast at bottom-center")}>
        Show Toast
      </Button>
    </>
  ),
};

// Interactive playground
export const Playground: Story = {
  render: () => (
    <>
      <Toaster position="bottom-right" />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click any button to trigger different toast notifications.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <Button variant="default" onClick={() => toast.success("Subscription activated!", { description: "Your premium features are now available." })}>
            Subscription Success
          </Button>
          <Button variant="destructive" onClick={() => toast.error("Payment failed", { description: "Please check your card details." })}>
            Payment Error
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Trial ending soon", { description: "Your free trial ends in 3 days." })}>
            Trial Warning
          </Button>
          <Button variant="secondary" onClick={() => toast.info("New feature available", { description: "Check out burner cards for one-time payments." })}>
            Feature Info
          </Button>
        </div>
      </div>
    </>
  ),
};
