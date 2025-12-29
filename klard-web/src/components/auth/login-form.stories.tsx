import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Lock } from "lucide-react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button/button";
import { SocialButton } from "@/components/ui/social-button";
import { GoogleIcon, AppleIcon } from "@/components/ui/icons";

/**
 * Login Form Stories
 *
 * These stories demonstrate the login form UI in various states.
 * Since the actual LoginForm component has complex dependencies (auth client,
 * router, i18n, stores), we recreate the visual presentation to showcase
 * the form layout, validation states, and interactive elements.
 */

interface LoginFormPresentationProps {
  isLoading?: boolean;
  errorMessage?: string;
  emailError?: string;
  passwordError?: string;
  showPasskey?: boolean;
}

/**
 * Presentational version of the login form for Storybook.
 * Provides visual representation without auth dependencies.
 */
function LoginFormPresentation({
  isLoading = false,
  errorMessage,
  emailError,
  passwordError,
  showPasskey = true,
}: LoginFormPresentationProps) {
  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-foreground mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
          <div className="flex-1 text-sm text-destructive">{errorMessage}</div>
          <button className="text-destructive hover:text-destructive/80">
            <span className="sr-only">Dismiss</span>
            &times;
          </button>
        </div>
      )}

      {/* Form */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail size={20} />}
          error={emailError}
          disabled={isLoading}
          autoComplete="email"
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          leftIcon={<Lock size={20} />}
          error={passwordError}
          disabled={isLoading}
          autoComplete="current-password"
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="klard"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>

        {/* Passkey button */}
        {showPasskey && (
          <Button
            type="button"
            variant="outline"
            fullWidth
            disabled={isLoading}
            className="gap-2"
          >
            <span className="size-4">🔑</span>
            Sign in with Passkey
          </Button>
        )}
      </form>

      {/* Divider */}
      <div className="relative my-8">
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
      <div className="flex gap-4">
        <SocialButton
          provider="Google"
          icon={<GoogleIcon />}
          onClick={() => {}}
          disabled={isLoading}
        />
        <SocialButton
          provider="Apple"
          icon={<AppleIcon />}
          onClick={() => {}}
          disabled={isLoading}
        />
      </div>

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Sign up
        </a>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock size={14} />
        <span>Your data is encrypted and secure</span>
      </div>
    </div>
  );
}

const meta = {
  title: "Auth/LoginForm",
  component: LoginFormPresentation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Login form component with email/password authentication, social login options (Google, Apple), and passkey support. Features form validation, error handling, and loading states. Built with Klard design system styling.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Shows loading state with disabled inputs",
    },
    errorMessage: {
      control: "text",
      description: "Error message displayed in banner at top of form",
    },
    emailError: {
      control: "text",
      description: "Validation error for email field",
    },
    passwordError: {
      control: "text",
      description: "Validation error for password field",
    },
    showPasskey: {
      control: "boolean",
      description: "Whether to show passkey authentication option",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg bg-card rounded-lg shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginFormPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default login form in idle state.
 * Shows email and password fields with social login options.
 */
export const Default: Story = {
  args: {
    isLoading: false,
    showPasskey: true,
  },
};

/**
 * Login form in submitting/loading state.
 * All inputs and buttons are disabled during submission.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    showPasskey: true,
  },
};

/**
 * Login form displaying a general error message.
 * Error banner appears at the top of the form.
 */
export const WithError: Story = {
  args: {
    errorMessage: "Invalid email or password. Please try again.",
  },
};

/**
 * Login form with validation errors on fields.
 * Shows inline error messages for invalid inputs.
 */
export const WithValidationErrors: Story = {
  args: {
    emailError: "Please enter a valid email address",
    passwordError: "Password must be at least 8 characters",
  },
};

/**
 * Login form without passkey support.
 * Passkey button is hidden when WebAuthn is unavailable.
 */
export const WithoutPasskey: Story = {
  args: {
    showPasskey: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Login form when passkeys are not supported by the browser. The passkey button is automatically hidden.",
      },
    },
  },
};

/**
 * All form states combined for comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Default State
        </p>
        <div className="bg-card rounded-lg shadow-sm">
          <LoginFormPresentation />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Loading State
        </p>
        <div className="bg-card rounded-lg shadow-sm">
          <LoginFormPresentation isLoading />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Error State
        </p>
        <div className="bg-card rounded-lg shadow-sm">
          <LoginFormPresentation errorMessage="Invalid email or password. Please try again." />
        </div>
      </div>
    </div>
  ),
};
