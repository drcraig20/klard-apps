import type { Meta, StoryObj } from "@storybook/react";
import { Check, Star, AlertCircle, Bell } from "lucide-react";
import { Badge } from "./badge";

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component for displaying status, labels, and tags. Supports multiple variants, sizes, icons, and removable functionality.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "error",
        "outline",
        "secondary",
        "destructive",
      ],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Badge size",
    },
    removable: {
      control: "boolean",
      description: "Shows remove button",
    },
    icon: {
      control: false,
      description: "Optional icon to display before text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

// Success variant
export const Success: Story = {
  args: {
    children: "Active",
    variant: "success",
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    children: "Pending",
    variant: "warning",
  },
};

// Error variant
export const Error: Story = {
  args: {
    children: "Expired",
    variant: "error",
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

// Destructive variant
export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

// Small size
export const Small: Story = {
  args: {
    children: "Small Badge",
    variant: "primary",
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    children: "Medium Badge",
    variant: "primary",
    size: "md",
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    children: "Verified",
    variant: "success",
    icon: <Check className="h-3 w-3" />,
  },
};

// With star icon
export const WithStarIcon: Story = {
  args: {
    children: "Featured",
    variant: "primary",
    icon: <Star className="h-3 w-3" />,
  },
};

// With alert icon
export const WithAlertIcon: Story = {
  args: {
    children: "Attention",
    variant: "warning",
    icon: <AlertCircle className="h-3 w-3" />,
  },
};

// Removable badge
export const Removable: Story = {
  args: {
    children: "Removable",
    variant: "default",
    removable: true,
    onRemove: () => console.log("Remove clicked"),
  },
};

// Removable with icon
export const RemovableWithIcon: Story = {
  args: {
    children: "Notification",
    variant: "primary",
    icon: <Bell className="h-3 w-3" />,
    removable: true,
    onRemove: () => console.log("Remove clicked"),
  },
};

// Size comparison
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm" variant="primary">
        Small
      </Badge>
      <Badge size="md" variant="primary">
        Medium
      </Badge>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

// Status badges common use case
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" icon={<Check className="h-3 w-3" />}>
        Active
      </Badge>
      <Badge variant="warning">Trial</Badge>
      <Badge variant="default">Paused</Badge>
      <Badge variant="error">Expired</Badge>
    </div>
  ),
};

// Tag list example
export const TagList: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" removable onRemove={() => {}}>
        Entertainment
      </Badge>
      <Badge variant="outline" removable onRemove={() => {}}>
        Streaming
      </Badge>
      <Badge variant="outline" removable onRemove={() => {}}>
        Music
      </Badge>
      <Badge variant="outline" removable onRemove={() => {}}>
        Software
      </Badge>
    </div>
  ),
};
