import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SocialButton } from "@/components/ui/social-button";
import { GoogleIcon, AppleIcon } from "@/components/ui/icons";

/**
 * Social Buttons Stories
 *
 * These stories demonstrate the social authentication buttons used for OAuth
 * login/signup. The SocialButtons component renders Google and Apple sign-in
 * options with loading states and error handling.
 */

interface SocialButtonsPresentationProps {
  disabled?: boolean;
  loadingProvider?: "google" | "apple" | null;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
}

/**
 * Presentational version of SocialButtons for Storybook.
 * Mimics the behavior of the actual component without auth dependencies.
 */
function SocialButtonsPresentation({
  disabled = false,
  loadingProvider = null,
  onGoogleClick,
  onAppleClick,
}: SocialButtonsPresentationProps) {
  return (
    <div className="flex gap-4">
      <SocialButton
        provider="Google"
        icon={<GoogleIcon />}
        isLoading={loadingProvider === "google"}
        disabled={disabled || loadingProvider !== null}
        onClick={onGoogleClick || (() => {})}
      />
      <SocialButton
        provider="Apple"
        icon={<AppleIcon />}
        isLoading={loadingProvider === "apple"}
        disabled={disabled || loadingProvider !== null}
        onClick={onAppleClick || (() => {})}
      />
    </div>
  );
}

/**
 * Interactive version that simulates loading behavior.
 */
function SocialButtonsInteractive() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  const handleClick = (provider: "google" | "apple") => {
    setLoadingProvider(provider);
    console.log(`${provider} clicked`);

    // Simulate API call
    setTimeout(() => {
      setLoadingProvider(null);
      console.log(`${provider} completed`);
    }, 2000);
  };

  return (
    <div className="flex gap-4">
      <SocialButton
        provider="Google"
        icon={<GoogleIcon />}
        isLoading={loadingProvider === "google"}
        disabled={loadingProvider !== null}
        onClick={() => handleClick("google")}
      />
      <SocialButton
        provider="Apple"
        icon={<AppleIcon />}
        isLoading={loadingProvider === "apple"}
        disabled={loadingProvider !== null}
        onClick={() => handleClick("apple")}
      />
    </div>
  );
}

const meta = {
  title: "Auth/SocialButtons",
  component: SocialButtonsPresentation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Social authentication buttons for OAuth sign-in with Google and Apple. Features loading states per provider and disables all buttons while one is loading. Built with the SocialButton primitive component.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables all social buttons",
    },
    loadingProvider: {
      control: "select",
      options: [null, "google", "apple"],
      description: "Which provider is currently loading",
    },
    onGoogleClick: {
      action: "google-clicked",
      description: "Callback when Google button is clicked",
    },
    onAppleClick: {
      action: "apple-clicked",
      description: "Callback when Apple button is clicked",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-card rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SocialButtonsPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with both buttons enabled.
 * Click to trigger the action handlers.
 */
export const Default: Story = {
  args: {
    disabled: false,
    loadingProvider: null,
  },
};

/**
 * All buttons disabled state.
 * Used when form is submitting via another method.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * Google button in loading state.
 * Apple button is also disabled while loading.
 */
export const GoogleLoading: Story = {
  args: {
    loadingProvider: "google",
  },
  parameters: {
    docs: {
      description: {
        story: "When Google is clicked, it shows a loading spinner and Apple is disabled.",
      },
    },
  },
};

/**
 * Apple button in loading state.
 * Google button is also disabled while loading.
 */
export const AppleLoading: Story = {
  args: {
    loadingProvider: "apple",
  },
  parameters: {
    docs: {
      description: {
        story: "When Apple is clicked, it shows a loading spinner and Google is disabled.",
      },
    },
  },
};

/**
 * Interactive demo that simulates real click behavior.
 * Click either button to see the loading state in action.
 */
export const Interactive: Story = {
  render: () => <SocialButtonsInteractive />,
  parameters: {
    docs: {
      description: {
        story: "Click either button to simulate OAuth flow. Shows loading state for 2 seconds.",
      },
    },
  },
};

/**
 * Social buttons in various container widths.
 */
export const ResponsiveSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Narrow container (280px)
        </p>
        <div className="w-[280px] p-4 bg-muted/30 rounded-lg">
          <SocialButtonsPresentation />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Medium container (400px)
        </p>
        <div className="w-[400px] p-4 bg-muted/30 rounded-lg">
          <SocialButtonsPresentation />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Wide container (500px)
        </p>
        <div className="w-[500px] p-4 bg-muted/30 rounded-lg">
          <SocialButtonsPresentation />
        </div>
      </div>
    </div>
  ),
};

/**
 * All states comparison for documentation.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Default
        </p>
        <SocialButtonsPresentation />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Disabled
        </p>
        <SocialButtonsPresentation disabled />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Google Loading
        </p>
        <SocialButtonsPresentation loadingProvider="google" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Apple Loading
        </p>
        <SocialButtonsPresentation loadingProvider="apple" />
      </div>
    </div>
  ),
};

/**
 * Within auth form context to show proper placement.
 */
export const InFormContext: Story = {
  render: () => (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-lg">
      {/* Form fields would go here */}
      <div className="h-32 bg-muted/20 rounded-lg mb-6 flex items-center justify-center text-muted-foreground text-sm">
        Form fields above
      </div>

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

      {/* Social buttons */}
      <SocialButtonsPresentation />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows social buttons in context with form divider as they appear in login/signup forms.",
      },
    },
  },
};
