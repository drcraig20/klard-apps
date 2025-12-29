import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Search as SearchIcon, Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text input component supporting various types, states, and validation. Extends native input element with consistent styling.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Shows error state styling",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default text input
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

// Email input
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "name@example.com",
  },
};

// Password input
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

// Number input
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "0",
  },
};

// Search input
export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
};

// Error state
export const Error: Story = {
  args: {
    type: "email",
    placeholder: "Invalid email",
    "aria-invalid": true,
    defaultValue: "invalid-email",
  },
};

// With value
export const WithValue: Story = {
  args: {
    type: "text",
    defaultValue: "Pre-filled value",
  },
};

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email-input">Email</Label>
      <Input id="email-input" type="email" placeholder="name@example.com" />
    </div>
  ),
};

// With label and error
export const WithLabelAndError: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email-error">Email</Label>
      <Input
        id="email-error"
        type="email"
        placeholder="name@example.com"
        aria-invalid={true}
        defaultValue="invalid"
      />
      <p className="text-destructive text-sm">Please enter a valid email address.</p>
    </div>
  ),
};

// With icon prefix (composition example)
export const WithIconPrefix: Story = {
  render: () => (
    <div className="relative">
      <Mail className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input type="email" placeholder="name@example.com" className="pl-10" />
    </div>
  ),
};

// Search with icon
export const SearchWithIcon: Story = {
  render: () => (
    <div className="relative">
      <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input type="search" placeholder="Search..." className="pl-10" />
    </div>
  ),
};

// Password with toggle (interactive example)
export const PasswordWithToggle: Story = {
  render: function PasswordWithToggleRender() {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          defaultValue="mysecretpassword"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>
    );
  },
};

// File input
export const FileInput: Story = {
  args: {
    type: "file",
  },
};

// All input types showcase
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="Email input" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password input" />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="Number input" />
      </div>
      <div className="space-y-2">
        <Label>Tel</Label>
        <Input type="tel" placeholder="Phone number" />
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input type="url" placeholder="https://example.com" />
      </div>
      <div className="space-y-2">
        <Label>Search</Label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

// States comparison
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input type="text" placeholder="Default state" />
      </div>
      <div className="space-y-2">
        <Label>With value</Label>
        <Input type="text" defaultValue="Filled value" />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input type="text" placeholder="Disabled state" disabled />
      </div>
      <div className="space-y-2">
        <Label>Error</Label>
        <Input
          type="text"
          placeholder="Error state"
          aria-invalid={true}
          defaultValue="Invalid value"
        />
      </div>
    </div>
  ),
};
