import type { Meta, StoryObj } from "@storybook/react";
import { FormLabel } from "./form-label";

const meta = {
  title: "Forms/FormLabel",
  component: FormLabel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Simple form label component with optional required indicator. Use for labeling form inputs.",
      },
    },
  },
  argTypes: {
    required: {
      control: "boolean",
      description: "Shows required asterisk after label text",
    },
    children: {
      control: "text",
      description: "Label text content",
    },
  },
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default label
export const Default: Story = {
  args: {
    children: "Email Address",
  },
};

// Required label
export const Required: Story = {
  args: {
    children: "Password",
    required: true,
  },
};

// With htmlFor attribute
export const WithHtmlFor: Story = {
  args: {
    children: "Username",
    htmlFor: "username-input",
  },
  render: (args) => (
    <div className="space-y-2">
      <FormLabel {...args} />
      <input
        id="username-input"
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter username"
      />
    </div>
  ),
};

// Custom className
export const CustomClassName: Story = {
  args: {
    children: "Custom Styled Label",
    className: "text-primary uppercase tracking-wide",
  },
};

// Multiple labels showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <FormLabel>Optional Field</FormLabel>
        <p className="text-xs text-muted-foreground mt-1">Standard label without required indicator</p>
      </div>
      <div>
        <FormLabel required>Required Field</FormLabel>
        <p className="text-xs text-muted-foreground mt-1">Label with required asterisk</p>
      </div>
    </div>
  ),
};

// Form context example
export const FormContextExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <FormLabel htmlFor="email" required>
          Email Address
        </FormLabel>
        <input
          id="email"
          type="email"
          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <FormLabel htmlFor="company">
          Company
        </FormLabel>
        <input
          id="company"
          type="text"
          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Your company name"
        />
      </div>
    </div>
  ),
};
