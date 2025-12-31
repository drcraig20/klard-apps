import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ErrorBanner } from "./error-banner";

/**
 * Error banner component for displaying error messages prominently.
 * Supports optional dismiss functionality and custom styling.
 */
const meta = {
  title: "Feedback/ErrorBanner",
  component: ErrorBanner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dedicated error banner component for displaying error messages. Features an error icon, message text, and optional dismiss button. Uses error-specific design tokens for consistent error state styling.",
      },
    },
  },
  argTypes: {
    message: {
      control: "text",
      description: "The error message to display",
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback when the dismiss button is clicked",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof ErrorBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default error banner
export const Default: Story = {
  args: {
    message: "An error occurred while processing your request.",
  },
};

// Short message
export const ShortMessage: Story = {
  args: {
    message: "Invalid email address.",
  },
};

// Long message
export const LongMessage: Story = {
  args: {
    message:
      "We encountered an unexpected error while trying to save your subscription settings. Please check your network connection and try again. If the problem persists, contact our support team for assistance.",
  },
};

// With dismiss button
export const Dismissible: Story = {
  args: {
    message: "Your session has expired. Please log in again.",
    onDismiss: () => console.log("Error dismissed"),
  },
};

// Non-dismissible (no onDismiss provided)
export const NonDismissible: Story = {
  args: {
    message: "This error cannot be dismissed and requires user action.",
  },
};

// Interactive dismissible example
export const InteractiveDismiss: Story = {
  render: function InteractiveDismissRender() {
    const [visible, setVisible] = React.useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="text-sm text-primary underline"
        >
          Show error banner again
        </button>
      );
    }

    return (
      <ErrorBanner
        message="Click the X button to dismiss this error."
        onDismiss={() => setVisible(false)}
      />
    );
  },
};

// Multiple error scenarios
export const MultipleErrors: Story = {
  render: () => (
    <div className="space-y-4">
      <ErrorBanner message="Authentication failed. Please check your credentials." />
      <ErrorBanner message="Network error. Unable to connect to server." />
      <ErrorBanner message="Form validation failed. Please review your inputs." />
    </div>
  ),
};

// In form context
export const InFormContext: Story = {
  render: function InFormContextRender() {
    const [error, setError] = React.useState<string | null>(
      "Invalid password. Password must be at least 8 characters."
    );

    return (
      <div className="max-w-md space-y-4">
        {error && (
          <ErrorBanner message={error} onDismiss={() => setError(null)} />
        )}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <button
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground"
          onClick={() =>
            setError("Password must contain at least one special character.")
          }
        >
          Submit
        </button>
      </div>
    );
  },
};

// With custom className
export const CustomClassName: Story = {
  args: {
    message: "Error with custom styling applied.",
    className: "max-w-md mx-auto",
  },
};

// All variations showcase
export const AllVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Standard Error
        </h3>
        <ErrorBanner message="Standard error message without dismiss option." />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Dismissible Error
        </h3>
        <ErrorBanner
          message="Dismissible error message with close button."
          onDismiss={() => console.log("Dismissed")}
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Short Error
        </h3>
        <ErrorBanner message="Required field." />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Long Error
        </h3>
        <ErrorBanner
          message="This is a very long error message that demonstrates how the component handles extended text content. It should wrap properly and maintain readability while keeping the layout intact with the icon and optional dismiss button."
          onDismiss={() => console.log("Dismissed")}
        />
      </div>
    </div>
  ),
};
