import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Key, Check } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";

/**
 * Passkey Button Stories
 *
 * These stories demonstrate the passkey/WebAuthn authentication button
 * in various states. The actual PasskeyButton component depends on the
 * usePasskeyAuth hook which checks for WebAuthn browser support.
 */

interface PasskeyButtonPresentationProps {
  mode: "register" | "signin";
  isLoading?: boolean;
  disabled?: boolean;
  showSuccess?: boolean;
  isAvailable?: boolean;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Presentational version of PasskeyButton for Storybook.
 * Provides visual representation without WebAuthn dependencies.
 */
function PasskeyButtonPresentation({
  mode,
  isLoading = false,
  disabled = false,
  showSuccess = false,
  isAvailable = true,
  className,
  onSuccess,
  onError,
}: PasskeyButtonPresentationProps) {
  // Hide button when WebAuthn is not available
  if (!isAvailable) {
    return null;
  }

  const buttonText = mode === "register" ? "Register Passkey" : "Sign in with Passkey";

  const handleClick = () => {
    console.log(`${mode}-passkey-clicked`);
    onSuccess?.();
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={disabled || isLoading}
      loading={isLoading}
      icon={
        showSuccess ? (
          <Check className="size-4 text-green-500 transition-opacity duration-200" />
        ) : (
          <Key className="size-4" />
        )
      }
      iconPosition="left"
      className={cn(className)}
    >
      {buttonText}
    </Button>
  );
}

/**
 * Interactive version that simulates passkey operations.
 */
function PasskeyButtonInteractive({ mode }: { mode: "register" | "signin" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    console.log(`${mode}-passkey-started`);

    // Simulate WebAuthn operation
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "register") {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
      }
      console.log(`${mode}-passkey-completed`);
    }, 1500);
  };

  const buttonText = mode === "register" ? "Register Passkey" : "Sign in with Passkey";

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isLoading}
      loading={isLoading}
      icon={
        showSuccess ? (
          <Check className="size-4 text-green-500 transition-opacity duration-200" />
        ) : (
          <Key className="size-4" />
        )
      }
      iconPosition="left"
    >
      {buttonText}
    </Button>
  );
}

const meta = {
  title: "Auth/PasskeyButton",
  component: PasskeyButtonPresentation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Passkey authentication button for WebAuthn-based sign-in and registration. Supports two modes: 'register' for adding a new passkey and 'signin' for authenticating with existing passkeys. Automatically hidden when WebAuthn is not supported by the browser.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["register", "signin"],
      description: "Button mode - register for new passkey, signin to authenticate",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading spinner during WebAuthn operation",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    showSuccess: {
      control: "boolean",
      description: "Shows success checkmark (used after registration)",
    },
    isAvailable: {
      control: "boolean",
      description: "Whether WebAuthn is available (hides button when false)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    onSuccess: {
      action: "success",
      description: "Callback when passkey operation succeeds",
    },
    onError: {
      action: "error",
      description: "Callback when passkey operation fails",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-card rounded-lg min-w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasskeyButtonPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sign-in mode (default).
 * Used on login page to authenticate with existing passkey.
 */
export const SignIn: Story = {
  args: {
    mode: "signin",
  },
};

/**
 * Register mode.
 * Used in account settings to add a new passkey.
 */
export const Register: Story = {
  args: {
    mode: "register",
  },
};

/**
 * Loading state during WebAuthn operation.
 * Shows spinner while waiting for user interaction.
 */
export const Loading: Story = {
  args: {
    mode: "signin",
    isLoading: true,
  },
};

/**
 * Disabled state.
 * Used when form is submitting or other action is in progress.
 */
export const Disabled: Story = {
  args: {
    mode: "signin",
    disabled: true,
  },
};

/**
 * Success state after passkey registration.
 * Shows checkmark briefly before resetting.
 */
export const Success: Story = {
  args: {
    mode: "register",
    showSuccess: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Success animation shown after successfully registering a new passkey.",
      },
    },
  },
};

/**
 * Hidden when WebAuthn unavailable.
 * Button returns null when browser doesn't support passkeys.
 */
export const Unavailable: Story = {
  args: {
    mode: "signin",
    isAvailable: false,
  },
  parameters: {
    docs: {
      description: {
        story: "When WebAuthn is not supported, the button is automatically hidden. This story shows an empty space where the button would be.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-card rounded-lg min-w-[300px]">
        <p className="text-sm text-muted-foreground mb-4">
          Button hidden (WebAuthn unavailable):
        </p>
        <div className="border border-dashed border-muted-foreground/30 rounded p-4 min-h-[40px] flex items-center justify-center text-xs text-muted-foreground">
          <Story />
          {/* Show placeholder text when button is null */}
          <span>(button would appear here)</span>
        </div>
      </div>
    ),
  ],
};

/**
 * Full width variant for form layouts.
 */
export const FullWidth: Story = {
  args: {
    mode: "signin",
    className: "w-full",
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-8 bg-card rounded-lg">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive sign-in demo.
 * Click to simulate WebAuthn flow.
 */
export const InteractiveSignIn: Story = {
  render: () => <PasskeyButtonInteractive mode="signin" />,
  parameters: {
    docs: {
      description: {
        story: "Click to simulate passkey sign-in. Shows loading state for 1.5 seconds.",
      },
    },
  },
};

/**
 * Interactive register demo with success animation.
 * Click to simulate registration with success checkmark.
 */
export const InteractiveRegister: Story = {
  render: () => <PasskeyButtonInteractive mode="register" />,
  parameters: {
    docs: {
      description: {
        story: "Click to simulate passkey registration. Shows loading, then success checkmark animation.",
      },
    },
  },
};

/**
 * Both modes side by side for comparison.
 */
export const ModeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Sign In Mode
        </p>
        <PasskeyButtonPresentation mode="signin" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Register Mode
        </p>
        <PasskeyButtonPresentation mode="register" />
      </div>
    </div>
  ),
};

/**
 * All states comparison for documentation.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Default (Sign In)
        </p>
        <PasskeyButtonPresentation mode="signin" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Loading
        </p>
        <PasskeyButtonPresentation mode="signin" isLoading />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Disabled
        </p>
        <PasskeyButtonPresentation mode="signin" disabled />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Success (Register)
        </p>
        <PasskeyButtonPresentation mode="register" showSuccess />
      </div>
    </div>
  ),
};

/**
 * In login form context to show proper placement.
 */
export const InFormContext: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-lg">
      {/* Simulated form fields */}
      <div className="space-y-4 mb-6">
        <div className="h-12 bg-muted/20 rounded-lg" />
        <div className="h-12 bg-muted/20 rounded-lg" />
        <div className="h-12 bg-primary/20 rounded-lg flex items-center justify-center text-sm text-muted-foreground">
          Sign In Button
        </div>
      </div>

      {/* Passkey button */}
      <PasskeyButtonPresentation mode="signin" className="w-full" />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      {/* Social buttons placeholder */}
      <div className="flex gap-4">
        <div className="flex-1 h-12 bg-muted/20 rounded-lg" />
        <div className="flex-1 h-12 bg-muted/20 rounded-lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows passkey button in context within a login form layout.",
      },
    },
  },
};
