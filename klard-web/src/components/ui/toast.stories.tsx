import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "sonner";
import { Button } from "./button";
import { showToast, showCelebrationToast, type ToastType, type CelebrationLevel } from "./toast";

/**
 * Toast notification component built on Sonner.
 * Provides success, error, warning, and info toast variants with optional actions.
 */
const meta = {
  title: "Feedback/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Toast notification system using Sonner. Displays non-blocking messages for success, error, warning, and info states. Supports descriptions, custom durations, and action buttons.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[200px]">
        <Toaster position="bottom-right" richColors />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to trigger toasts
function ToastTrigger({
  type,
  title,
  description,
  duration,
  actionLabel,
}: {
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  actionLabel?: string;
}) {
  const handleClick = () => {
    showToast({
      type,
      title,
      description,
      duration,
      action: actionLabel
        ? {
            label: actionLabel,
            onClick: () => console.log("Action clicked"),
          }
        : undefined,
    });
  };

  const variantMap: Record<ToastType, "default" | "destructive" | "outline"> = {
    success: "default",
    error: "destructive",
    warning: "outline",
    info: "outline",
  };

  return (
    <Button variant={variantMap[type]} onClick={handleClick}>
      Show {type} toast
    </Button>
  );
}

// Success toast
export const Success: Story = {
  render: () => (
    <ToastTrigger
      type="success"
      title="Successfully saved!"
      description="Your changes have been saved."
    />
  ),
};

// Error toast
export const Error: Story = {
  render: () => (
    <ToastTrigger
      type="error"
      title="Something went wrong"
      description="Please try again later."
    />
  ),
};

// Warning toast
export const Warning: Story = {
  render: () => (
    <ToastTrigger
      type="warning"
      title="Warning"
      description="Your session will expire in 5 minutes."
    />
  ),
};

// Info toast
export const Info: Story = {
  render: () => (
    <ToastTrigger
      type="info"
      title="New update available"
      description="A new version is ready to install."
    />
  ),
};

// Toast with action button
export const WithAction: Story = {
  render: () => (
    <ToastTrigger
      type="success"
      title="Subscription cancelled"
      description="Your subscription has been cancelled."
      actionLabel="Undo"
    />
  ),
};

// Toast with custom duration
export const CustomDuration: Story = {
  render: () => (
    <ToastTrigger
      type="info"
      title="Quick notification"
      description="This disappears in 2 seconds."
      duration={2000}
    />
  ),
};

// Title only toast
export const TitleOnly: Story = {
  render: () => <ToastTrigger type="success" title="Saved!" />,
};

// All toast types
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ToastTrigger type="success" title="Success" description="Operation completed" />
      <ToastTrigger type="error" title="Error" description="Operation failed" />
      <ToastTrigger type="warning" title="Warning" description="Please review" />
      <ToastTrigger type="info" title="Info" description="For your information" />
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  render: () => {
    const triggerToast = (type: ToastType) => {
      showToast({
        type,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
        description: `This is a ${type} notification with a description.`,
        action: {
          label: "View",
          onClick: () => console.log(`${type} action clicked`),
        },
      });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click any button to trigger a toast notification in the bottom-right corner.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" onClick={() => triggerToast("success")}>
            Success
          </Button>
          <Button variant="destructive" onClick={() => triggerToast("error")}>
            Error
          </Button>
          <Button variant="outline" onClick={() => triggerToast("warning")}>
            Warning
          </Button>
          <Button variant="secondary" onClick={() => triggerToast("info")}>
            Info
          </Button>
        </div>
      </div>
    );
  },
};

// Helper component to trigger celebration toasts
function CelebrationTrigger({
  amount,
  merchant,
  celebrationLevel = "full",
  label,
}: {
  amount: number;
  merchant?: string;
  celebrationLevel?: CelebrationLevel;
  label: string;
}) {
  const handleClick = () => {
    showCelebrationToast({
      amount,
      merchant,
      celebrationLevel,
    });
  };

  return (
    <Button variant="default" onClick={handleClick}>
      {label}
    </Button>
  );
}

// Celebration toast with full confetti burst
export const CelebrationFull: Story = {
  render: () => (
    <CelebrationTrigger
      amount={49.99}
      celebrationLevel="full"
      label="Show Full Celebration"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Full celebration with maximum confetti burst from center and sides. Best for significant savings.",
      },
    },
  },
};

// Celebration toast with medium confetti
export const CelebrationMedium: Story = {
  render: () => (
    <CelebrationTrigger
      amount={24.99}
      celebrationLevel="medium"
      label="Show Medium Celebration"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Medium celebration with moderate confetti. Good for average savings amounts.",
      },
    },
  },
};

// Celebration toast with subtle confetti
export const CelebrationSubtle: Story = {
  render: () => (
    <CelebrationTrigger
      amount={9.99}
      celebrationLevel="subtle"
      label="Show Subtle Celebration"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Subtle celebration with minimal confetti. Appropriate for smaller savings.",
      },
    },
  },
};

// Celebration toast without confetti
export const CelebrationNone: Story = {
  render: () => (
    <CelebrationTrigger
      amount={4.99}
      celebrationLevel="none"
      label="Show No Celebration"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Celebration toast without confetti animation. Shows the savings notification only.",
      },
    },
  },
};

// Celebration toast with merchant name
export const CelebrationWithMerchant: Story = {
  render: () => (
    <CelebrationTrigger
      amount={14.99}
      merchant="Netflix"
      celebrationLevel="full"
      label="Show Celebration with Merchant"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Celebration toast displaying the merchant name that was blocked.",
      },
    },
  },
};

// Celebration playground with all levels
export const CelebrationPlayground: Story = {
  render: () => {
    const triggerCelebration = (level: CelebrationLevel, amount: number) => {
      showCelebrationToast({
        amount,
        merchant: "Example Subscription",
        celebrationLevel: level,
      });
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click any button to trigger a celebration toast with different confetti intensities.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" onClick={() => triggerCelebration("full", 99.99)}>
            Full ($99.99)
          </Button>
          <Button variant="default" onClick={() => triggerCelebration("medium", 49.99)}>
            Medium ($49.99)
          </Button>
          <Button variant="outline" onClick={() => triggerCelebration("subtle", 19.99)}>
            Subtle ($19.99)
          </Button>
          <Button variant="secondary" onClick={() => triggerCelebration("none", 9.99)}>
            None ($9.99)
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to compare all celebration levels with different amounts.",
      },
    },
  },
};
