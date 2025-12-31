import type { Meta, StoryObj } from "@storybook/react";
import { KlardIcon, KlardLogo } from "./klard-icon";

const meta = {
  title: "Brand/KlardIcon",
  component: KlardIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Klard brand icon component with multiple size variants. Use for branding elements throughout the application.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Icon size variant",
    },
    priority: {
      control: "boolean",
      description: "Priority loading for Next.js Image optimization",
    },
  },
} satisfies Meta<typeof KlardIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default icon (medium size)
export const Default: Story = {
  args: {
    size: "md",
  },
};

// Extra small size
export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
};

// Small size
export const Small: Story = {
  args: {
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    size: "md",
  },
};

// Large size
export const Large: Story = {
  args: {
    size: "lg",
  },
};

// Extra large size
export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

// 2XL size
export const XXLarge: Story = {
  args: {
    size: "2xl",
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="xs" />
        <span className="text-xs text-muted-foreground">xs (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="sm" />
        <span className="text-xs text-muted-foreground">sm (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="md" />
        <span className="text-xs text-muted-foreground">md (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="lg" />
        <span className="text-xs text-muted-foreground">lg (48px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="xl" />
        <span className="text-xs text-muted-foreground">xl (64px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KlardIcon size="2xl" />
        <span className="text-xs text-muted-foreground">2xl (96px)</span>
      </div>
    </div>
  ),
};

// KlardLogo component
export const Logo: Story = {
  render: () => <KlardLogo />,
  parameters: {
    docs: {
      description: {
        story: "Full Klard logo with icon and text, typically used in headers and auth pages.",
      },
    },
  },
};

// Logo with custom className
export const LogoCustomClass: Story = {
  render: () => <KlardLogo className="justify-center" />,
  parameters: {
    docs: {
      description: {
        story: "KlardLogo accepts className prop for additional styling.",
      },
    },
  },
};

// Usage contexts
export const UsageContexts: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Header context */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <KlardLogo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Navigation</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Header navigation context</p>
      </div>

      {/* Auth page context */}
      <div className="border border-border rounded-lg p-8 flex flex-col items-center gap-4">
        <KlardIcon size="xl" />
        <h1 className="text-xl font-semibold">Welcome to Klard</h1>
        <p className="text-sm text-muted-foreground">Sign in to continue</p>
        <p className="text-xs text-muted-foreground mt-4">Auth page context</p>
      </div>

      {/* Favicon/small context */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center gap-2">
          <KlardIcon size="xs" />
          <span className="text-sm">Tab/Favicon size</span>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Small icon context</p>
      </div>
    </div>
  ),
};
