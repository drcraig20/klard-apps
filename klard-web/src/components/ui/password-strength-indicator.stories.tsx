import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import { Input } from "./input";

const meta = {
  title: "Forms/PasswordStrengthIndicator",
  component: PasswordStrengthIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual password strength indicator that shows strength level (weak, fair, good, strong) with a progress bar and feedback text. Uses calculatePasswordStrength from commons.",
      },
    },
  },
  argTypes: {
    password: {
      control: "text",
      description: "The password to evaluate",
    },
  },
} satisfies Meta<typeof PasswordStrengthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Empty password (hidden)
export const Empty: Story = {
  args: {
    password: "",
  },
  parameters: {
    docs: {
      description: {
        story: "When password is empty, the indicator is hidden.",
      },
    },
  },
};

// Weak password
export const Weak: Story = {
  args: {
    password: "abc",
  },
};

// Fair password
export const Fair: Story = {
  args: {
    password: "password1",
  },
};

// Good password
export const Good: Story = {
  args: {
    password: "Password1!",
  },
};

// Strong password
export const Strong: Story = {
  args: {
    password: "MyStr0ng!P@ssword123",
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="max-w-sm space-y-2">
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <PasswordStrengthIndicator password={password} />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Type a password to see the strength indicator update in real-time.",
      },
    },
  },
};

// All strength levels showcase
export const AllStrengthLevels: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="text-sm font-medium mb-2">Weak</p>
        <PasswordStrengthIndicator password="abc" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Fair</p>
        <PasswordStrengthIndicator password="password1" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Good</p>
        <PasswordStrengthIndicator password="Password1!" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Strong</p>
        <PasswordStrengthIndicator password="MyStr0ng!P@ssword123" />
      </div>
    </div>
  ),
};

// Sign up form context
const SignUpFormTemplate = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="max-w-sm space-y-4 p-6 border border-border rounded-lg">
      <h3 className="text-lg font-semibold">Create Account</h3>
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        <PasswordStrengthIndicator password={password} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
      </div>
      <button
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        disabled={password.length < 8 || password !== confirmPassword}
      >
        Create Account
      </button>
    </div>
  );
};

export const SignUpFormContext: Story = {
  render: () => <SignUpFormTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Password strength indicator in a typical sign-up form context.",
      },
    },
  },
};
