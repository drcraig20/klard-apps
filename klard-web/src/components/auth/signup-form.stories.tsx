import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button/button";
import { SocialButton } from "@/components/ui/social-button";
import { PasswordStrengthIndicator } from "@/components/ui/password-strength-indicator";
import { TermsCheckbox } from "@/components/ui/terms-checkbox";
import { GoogleIcon, AppleIcon } from "@/components/ui/icons";

/**
 * Signup Form Stories
 *
 * These stories demonstrate the signup form UI in various states.
 * Since the actual SignupForm component has complex dependencies (auth client,
 * router, i18n, stores), we recreate the visual presentation to showcase
 * the form layout, validation states, and interactive elements.
 */

interface SignupFormPresentationProps {
  isLoading?: boolean;
  errorMessage?: string;
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  termsError?: string;
  initialPassword?: string;
  termsAccepted?: boolean;
}

/**
 * Presentational version of the signup form for Storybook.
 * Provides visual representation without auth dependencies.
 */
function SignupFormPresentation({
  isLoading = false,
  errorMessage,
  nameError,
  emailError,
  passwordError,
  confirmPasswordError,
  termsError,
  initialPassword = "",
  termsAccepted = false,
}: SignupFormPresentationProps) {
  const [password, setPassword] = useState(initialPassword);
  const [terms, setTerms] = useState(termsAccepted);

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-foreground mb-2">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Start managing your subscriptions today
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
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          leftIcon={<User size={20} />}
          error={nameError}
          disabled={isLoading}
          autoComplete="name"
        />

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

        <div>
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            leftIcon={<Lock size={20} />}
            error={passwordError}
            disabled={isLoading}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthIndicator password={password} />
        </div>

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          leftIcon={<Lock size={20} />}
          error={confirmPasswordError}
          disabled={isLoading}
          autoComplete="new-password"
        />

        <TermsCheckbox
          checked={terms}
          onChange={setTerms}
          error={termsError}
          disabled={isLoading}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="klard"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>
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

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Sign in
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
  title: "Auth/SignupForm",
  component: SignupFormPresentation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Signup form component with full name, email, password (with strength indicator), password confirmation, and terms acceptance. Includes social signup options (Google, Apple) and validation states. Built with Klard design system styling.",
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
    nameError: {
      control: "text",
      description: "Validation error for name field",
    },
    emailError: {
      control: "text",
      description: "Validation error for email field",
    },
    passwordError: {
      control: "text",
      description: "Validation error for password field",
    },
    confirmPasswordError: {
      control: "text",
      description: "Validation error for password confirmation field",
    },
    termsError: {
      control: "text",
      description: "Validation error for terms checkbox",
    },
    initialPassword: {
      control: "text",
      description: "Initial password value (for password strength demo)",
    },
    termsAccepted: {
      control: "boolean",
      description: "Whether terms checkbox is checked",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg bg-card rounded-lg shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignupFormPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default signup form in idle state.
 * Shows all fields with social signup options.
 */
export const Default: Story = {
  args: {
    isLoading: false,
  },
};

/**
 * Signup form in submitting/loading state.
 * All inputs and buttons are disabled during submission.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Signup form displaying a general error message.
 * Error banner appears at the top of the form.
 */
export const WithError: Story = {
  args: {
    errorMessage: "An account with this email already exists.",
  },
};

/**
 * Signup form with validation errors on fields.
 * Shows inline error messages for invalid inputs.
 */
export const WithValidationErrors: Story = {
  args: {
    nameError: "Name is required",
    emailError: "Please enter a valid email address",
    passwordError: "Password must be at least 8 characters",
    confirmPasswordError: "Passwords do not match",
    termsError: "You must accept the terms and conditions",
  },
};

/**
 * Signup form with weak password entered.
 * Password strength indicator shows weak status.
 */
export const WeakPassword: Story = {
  args: {
    initialPassword: "abc",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows password strength indicator with a weak password (less than 8 characters).",
      },
    },
  },
};

/**
 * Signup form with medium password entered.
 * Password strength indicator shows medium status.
 */
export const MediumPassword: Story = {
  args: {
    initialPassword: "password123",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows password strength indicator with a medium-strength password.",
      },
    },
  },
};

/**
 * Signup form with strong password entered.
 * Password strength indicator shows strong status.
 */
export const StrongPassword: Story = {
  args: {
    initialPassword: "MyStr0ng!P@ssw0rd",
  },
  parameters: {
    docs: {
      description: {
        story: "Shows password strength indicator with a strong password (mixed case, numbers, symbols).",
      },
    },
  },
};

/**
 * Signup form with terms accepted.
 */
export const TermsAccepted: Story = {
  args: {
    termsAccepted: true,
  },
};

/**
 * Password strength comparison showing all levels.
 */
export const PasswordStrengthComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Weak Password
        </p>
        <div className="space-y-2">
          <InputField
            id="weak"
            label="Password"
            type="password"
            value="abc"
            leftIcon={<Lock size={20} />}
            readOnly
          />
          <PasswordStrengthIndicator password="abc" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Medium Password
        </p>
        <div className="space-y-2">
          <InputField
            id="medium"
            label="Password"
            type="password"
            value="password123"
            leftIcon={<Lock size={20} />}
            readOnly
          />
          <PasswordStrengthIndicator password="password123" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Strong Password
        </p>
        <div className="space-y-2">
          <InputField
            id="strong"
            label="Password"
            type="password"
            value="MyStr0ng!P@ss"
            leftIcon={<Lock size={20} />}
            readOnly
          />
          <PasswordStrengthIndicator password="MyStr0ng!P@ss" />
        </div>
      </div>
    </div>
  ),
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
          <SignupFormPresentation />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Loading State
        </p>
        <div className="bg-card rounded-lg shadow-sm">
          <SignupFormPresentation isLoading />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Error State
        </p>
        <div className="bg-card rounded-lg shadow-sm">
          <SignupFormPresentation errorMessage="An account with this email already exists." />
        </div>
      </div>
    </div>
  ),
};
