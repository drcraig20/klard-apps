import type { Meta, StoryObj } from "@storybook/react";
import { Mail, User, Lock, Search } from "lucide-react";
import { InputField } from "./input-field";

const meta = {
  title: "Forms/InputField",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Versatile text input component with support for labels, icons, error states, helper text, and built-in password/search behaviors.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number", "tel", "url"],
      description: "Input type - affects keyboard on mobile and validation",
    },
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
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default text input
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    helperText: "We'll never share your email with anyone.",
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: "Email Address",
    type: "email",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    value: "Cannot edit this",
    disabled: true,
  },
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    leftIcon: <Mail className="size-4" />,
  },
};

// With right icon
export const WithRightIcon: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    rightIcon: <User className="size-4" />,
  },
};

// With both icons
export const WithBothIcons: Story = {
  args: {
    label: "Secure Field",
    placeholder: "Enter value",
    leftIcon: <Lock className="size-4" />,
    rightIcon: <User className="size-4" />,
  },
};

// Password type with toggle
export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

// Search type with clear button
export const SearchType: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search...",
    value: "search term",
  },
};

// Number input
export const NumberInput: Story = {
  args: {
    label: "Quantity",
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
};

// Phone input
export const PhoneInput: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
};

// URL input
export const URLInput: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
  },
};

// Email with icon and error
export const EmailWithError: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    leftIcon: <Mail className="size-4" />,
    value: "notanemail",
    error: "Please enter a valid email address",
    required: true,
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <InputField label="Default" placeholder="Default input" />
      <InputField
        label="With Helper"
        placeholder="Input with helper"
        helperText="This is helpful context"
      />
      <InputField
        label="With Error"
        value="Invalid value"
        error="This field has an error"
      />
      <InputField
        label="Required"
        placeholder="Required field"
        required
      />
      <InputField
        label="Disabled"
        value="Disabled value"
        disabled
      />
      <InputField
        label="With Icon"
        placeholder="With left icon"
        leftIcon={<Search className="size-4" />}
      />
    </div>
  ),
};
