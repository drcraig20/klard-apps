import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label component for form elements. Provides accessible labeling with automatic disabled state handling when paired with form controls. Built on Radix UI primitives.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Label text content",
    },
    htmlFor: {
      control: "text",
      description: "ID of the form element this label is for",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default label
export const Default: Story = {
  args: {
    children: "Email address",
  },
};

// With input
export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  ),
};

// With checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="accept" />
      <Label htmlFor="accept">Accept terms and conditions</Label>
    </div>
  ),
};

// Required field indicator
export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="required-field">
        Full name <span className="text-destructive">*</span>
      </Label>
      <Input id="required-field" type="text" placeholder="John Doe" />
    </div>
  ),
};

// With helper text
export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" placeholder="Enter password" />
      <p className="text-muted-foreground text-sm">
        Must be at least 8 characters.
      </p>
    </div>
  ),
};

// Disabled state (via peer)
export const DisabledPeer: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input">Disabled field</Label>
      <Input
        id="disabled-input"
        type="text"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};

// With group disabled
export const GroupDisabled: Story = {
  render: () => (
    <div className="group" data-disabled="true">
      <Label>Disabled via group</Label>
    </div>
  ),
};

// Multiple labels form layout
export const FormLayout: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div className="space-y-2">
        <Label htmlFor="first-name">First name</Label>
        <Input id="first-name" type="text" placeholder="John" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name">Last name</Label>
        <Input id="last-name" type="text" placeholder="Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-form">Email</Label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
    </div>
  ),
};

// Inline label layout
export const InlineLayout: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
        <Label htmlFor="inline-name" className="text-right">
          Name
        </Label>
        <Input id="inline-name" type="text" />
      </div>
      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
        <Label htmlFor="inline-email" className="text-right">
          Email
        </Label>
        <Input id="inline-email" type="email" />
      </div>
      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
        <Label htmlFor="inline-phone" className="text-right">
          Phone
        </Label>
        <Input id="inline-phone" type="tel" />
      </div>
    </div>
  ),
};

// Label with icon
export const WithIcon: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="with-icon" className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
        </svg>
        Email address
      </Label>
      <Input id="with-icon" type="email" placeholder="name@example.com" />
    </div>
  ),
};

// Optional field
export const Optional: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="optional-field">
        Company name{" "}
        <span className="text-muted-foreground text-xs font-normal">
          (optional)
        </span>
      </Label>
      <Input id="optional-field" type="text" placeholder="Acme Inc." />
    </div>
  ),
};
