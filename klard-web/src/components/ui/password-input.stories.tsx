import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./password-input";

const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Password input with visibility toggle, optional strength indicator, and requirements checklist. Used for login and registration forms.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    error: {
      control: "text",
      description: "Error message - displays in red below input",
    },
    helperText: {
      control: "text",
      description: "Helper text - displays below input when no error",
    },
    required: {
      control: "boolean",
      description: "Shows required asterisk after label",
    },
    showStrength: {
      control: "boolean",
      description: "Show password strength indicator bar",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default password input
export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helperText: "Password must be at least 8 characters",
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: "Password",
    value: "weak",
    error: "Password is too weak",
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Password",
    value: "secretpassword",
    disabled: true,
  },
};

// With strength indicator - weak
export const StrengthWeak: Story = {
  args: {
    label: "Create Password",
    value: "abc",
    showStrength: true,
  },
};

// With strength indicator - fair
export const StrengthFair: Story = {
  args: {
    label: "Create Password",
    value: "abc123",
    showStrength: true,
  },
};

// With strength indicator - good
export const StrengthGood: Story = {
  args: {
    label: "Create Password",
    value: "Abc123!@",
    showStrength: true,
  },
};

// With strength indicator - strong
export const StrengthStrong: Story = {
  args: {
    label: "Create Password",
    value: "MySecure@Pass123!",
    showStrength: true,
  },
};

// With requirements checklist - none met
export const RequirementsNoneMet: Story = {
  args: {
    label: "Create Password",
    placeholder: "Enter a strong password",
    requirements: {
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false,
    },
  },
};

// With requirements checklist - some met
export const RequirementsSomeMet: Story = {
  args: {
    label: "Create Password",
    value: "Password1",
    requirements: {
      minLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: false,
    },
  },
};

// With requirements checklist - all met
export const RequirementsAllMet: Story = {
  args: {
    label: "Create Password",
    value: "SecureP@ss123",
    requirements: {
      minLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: true,
    },
  },
};

// With both strength and requirements
export const WithStrengthAndRequirements: Story = {
  args: {
    label: "Create Password",
    value: "SecureP@ss123",
    showStrength: true,
    requirements: {
      minLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: true,
    },
  },
};

// Registration form example
export const RegistrationExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <PasswordInput
        label="Create Password"
        placeholder="Enter a strong password"
        required
        showStrength
        value="MyP@ssword1"
        requirements={{
          minLength: true,
          hasUppercase: true,
          hasLowercase: true,
          hasNumber: true,
          hasSpecial: true,
        }}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter your password"
        required
        value="MyP@ssword1"
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <PasswordInput label="Default" placeholder="Enter password" />
      <PasswordInput
        label="With Helper"
        placeholder="Enter password"
        helperText="At least 8 characters recommended"
      />
      <PasswordInput
        label="With Error"
        value="abc"
        error="Password is too short"
      />
      <PasswordInput
        label="Required"
        placeholder="Enter password"
        required
      />
      <PasswordInput
        label="Disabled"
        value="secretpassword"
        disabled
      />
      <PasswordInput
        label="With Strength"
        value="StrongP@ss1"
        showStrength
      />
    </div>
  ),
};
