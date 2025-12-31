import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";
import { Input } from "./input";

const meta = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form field wrapper component that provides label, error, and helper text for form inputs. Handles accessibility with proper aria-describedby associations.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    required: {
      control: "boolean",
      description: "Shows required asterisk after label",
    },
    error: {
      control: "text",
      description: "Error message - displays in red below input",
    },
    helperText: {
      control: "text",
      description: "Helper text - displays below input when no error",
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default form field
export const Default: Story = {
  args: {
    label: "Email Address",
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: "Password",
    helperText: "Must be at least 8 characters long",
    children: <Input type="password" placeholder="Enter password" />,
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: "Email Address",
    error: "Please enter a valid email address",
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Full Name",
    required: true,
    children: <Input placeholder="Enter your full name" />,
  },
};

// Required with error
export const RequiredWithError: Story = {
  args: {
    label: "Email Address",
    required: true,
    error: "Email is required",
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    helperText: "This field has no label",
    children: <Input placeholder="No label input" />,
  },
};

// Error overrides helper text
export const ErrorOverridesHelper: Story = {
  args: {
    label: "Username",
    helperText: "Choose a unique username",
    error: "Username is already taken",
    children: <Input placeholder="Enter username" />,
  },
  parameters: {
    docs: {
      description: {
        story: "When both error and helperText are provided, only the error is displayed.",
      },
    },
  },
};

// Form example with multiple fields
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <FormField label="Email" required>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField
        label="Password"
        required
        helperText="Must be at least 8 characters"
      >
        <Input type="password" placeholder="Enter password" />
      </FormField>
      <FormField label="Bio" helperText="Tell us about yourself (optional)">
        <Input placeholder="A short bio..." />
      </FormField>
    </div>
  ),
};

// Validation states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <FormField label="Default">
        <Input placeholder="Default input" />
      </FormField>
      <FormField label="With Helper" helperText="Helpful context for the user">
        <Input placeholder="Input with helper" />
      </FormField>
      <FormField label="With Error" error="This field has an error">
        <Input placeholder="Input with error" />
      </FormField>
      <FormField label="Required" required>
        <Input placeholder="Required field" />
      </FormField>
      <FormField
        label="Required with Error"
        required
        error="This required field is empty"
      >
        <Input placeholder="Required with error" />
      </FormField>
    </div>
  ),
};
