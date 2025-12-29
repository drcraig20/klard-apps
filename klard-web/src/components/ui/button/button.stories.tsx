import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Mail, ArrowRight } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary button component with multiple variants, sizes, and loading states. Supports icons and full-width mode.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "klard",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "social",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg", "icon", "icon-sm", "icon-lg"],
      description: "Button size",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Expands button to full container width",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon relative to text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

// Klard brand variant
export const Klard: Story = {
  args: {
    children: "Klard Button",
    variant: "klard",
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

// Destructive variant
export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

// Link variant
export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

// Social variant (for OAuth buttons)
export const Social: Story = {
  args: {
    children: "Continue with Google",
    variant: "social",
  },
};

// Loading state
export const Loading: Story = {
  args: {
    children: "Loading...",
    variant: "primary",
    loading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "primary",
    disabled: true,
  },
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    children: "Favorite",
    variant: "primary",
    icon: <Heart className="size-4" />,
    iconPosition: "left",
  },
};

// With right icon
export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    variant: "primary",
    icon: <ArrowRight className="size-4" />,
    iconPosition: "right",
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    variant: "primary",
    fullWidth: true,
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Icon only buttons
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon-sm">
        <Mail className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Mail className="size-4" />
      </Button>
      <Button variant="outline" size="icon-lg">
        <Mail className="size-5" />
      </Button>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="klard">Klard</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="social">Social</Button>
    </div>
  ),
};
