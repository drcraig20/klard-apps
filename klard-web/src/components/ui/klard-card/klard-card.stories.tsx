import type { Meta, StoryObj } from "@storybook/react";
import { CreditCard, ArrowRight, Settings, Bell } from "lucide-react";
import { KlardCard } from "./klard-card";

const meta = {
  title: "Data Display/KlardCard",
  component: KlardCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Versatile card component with multiple variants and padding options. Supports interactive behavior with click handlers.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "ghost", "glass", "interactive"],
      description: "Visual style variant",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Internal padding",
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction when onPress is provided",
    },
    onPress: {
      action: "pressed",
      description: "Click handler - makes card interactive",
    },
  },
} satisfies Meta<typeof KlardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold mb-2">Default Card</h3>
        <p className="text-sm text-muted-foreground">
          This is a default card with standard border styling.
        </p>
      </div>
    ),
    variant: "default",
  },
};

// Elevated variant
export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold mb-2">Elevated Card</h3>
        <p className="text-sm text-muted-foreground">
          This card has a shadow for visual elevation.
        </p>
      </div>
    ),
    variant: "elevated",
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold mb-2">Ghost Card</h3>
        <p className="text-sm text-muted-foreground">
          Transparent background, no border. Minimal styling.
        </p>
      </div>
    ),
    variant: "ghost",
  },
};

// Glass variant with gradient background to showcase effect
export const Glass: Story = {
  parameters: {
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--foreground)) 100%)",
        },
      ],
    },
  },
  args: {
    children: (
      <div>
        <h3 className="font-semibold mb-2 text-white">Glass Card</h3>
        <p className="text-sm text-white/80">
          Glassmorphism effect with backdrop blur and semi-transparent
          background. Best viewed on gradient or image backgrounds.
        </p>
      </div>
    ),
    variant: "glass",
  },
};

// Interactive variant
export const Interactive: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Interactive Card</h3>
          <p className="text-sm text-muted-foreground">Click to interact</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>
    ),
    variant: "interactive",
    onPress: () => console.log("Card clicked"),
  },
};

// No padding
export const NoPadding: Story = {
  args: {
    children: (
      <div className="p-4 bg-primary/10">
        <p className="text-sm">Content with custom padding inside</p>
      </div>
    ),
    variant: "default",
    padding: "none",
  },
};

// Small padding
export const SmallPadding: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold text-sm">Compact Card</h3>
        <p className="text-xs text-muted-foreground">Small padding variant</p>
      </div>
    ),
    variant: "default",
    padding: "sm",
  },
};

// Medium padding (default)
export const MediumPadding: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold">Standard Card</h3>
        <p className="text-sm text-muted-foreground">Medium padding (default)</p>
      </div>
    ),
    variant: "default",
    padding: "md",
  },
};

// Large padding
export const LargePadding: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold text-lg">Spacious Card</h3>
        <p className="text-sm text-muted-foreground">
          Large padding for more breathing room
        </p>
      </div>
    ),
    variant: "default",
    padding: "lg",
  },
};

// Disabled interactive
export const DisabledInteractive: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Disabled Card</h3>
          <p className="text-sm text-muted-foreground">Cannot be clicked</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>
    ),
    variant: "interactive",
    onPress: () => console.log("This won't fire"),
    disabled: true,
  },
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <KlardCard variant="default">
        <h3 className="font-semibold mb-1">Default</h3>
        <p className="text-sm text-muted-foreground">Standard bordered card</p>
      </KlardCard>
      <KlardCard variant="elevated">
        <h3 className="font-semibold mb-1">Elevated</h3>
        <p className="text-sm text-muted-foreground">Shadow for depth</p>
      </KlardCard>
      <KlardCard variant="ghost">
        <h3 className="font-semibold mb-1">Ghost</h3>
        <p className="text-sm text-muted-foreground">Minimal styling</p>
      </KlardCard>
      <div className="p-4 rounded-lg bg-gradient-to-br from-primary via-secondary to-foreground">
        <KlardCard variant="glass">
          <h3 className="font-semibold mb-1 text-white">Glass</h3>
          <p className="text-sm text-white/80">Glassmorphism effect</p>
        </KlardCard>
      </div>
      <KlardCard variant="interactive" onPress={() => {}}>
        <h3 className="font-semibold mb-1">Interactive</h3>
        <p className="text-sm text-muted-foreground">Hover and click effects</p>
      </KlardCard>
    </div>
  ),
};

// Padding comparison
export const PaddingComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <KlardCard variant="default" padding="none">
        <div className="bg-muted/50 p-2">padding: none</div>
      </KlardCard>
      <KlardCard variant="default" padding="sm">
        <span>padding: sm</span>
      </KlardCard>
      <KlardCard variant="default" padding="md">
        <span>padding: md (default)</span>
      </KlardCard>
      <KlardCard variant="default" padding="lg">
        <span>padding: lg</span>
      </KlardCard>
    </div>
  ),
};

// Feature card example
export const FeatureCard: Story = {
  render: () => (
    <KlardCard variant="elevated" padding="lg">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Virtual Cards</h3>
          <p className="text-muted-foreground mt-1">
            Create unlimited virtual cards for your subscriptions. Each card has
            its own spending limit.
          </p>
        </div>
      </div>
    </KlardCard>
  ),
};

// Settings menu card
export const SettingsMenuCard: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <KlardCard
        variant="interactive"
        padding="md"
        onPress={() => console.log("Settings")}
      >
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Account Settings</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
        </div>
      </KlardCard>
      <KlardCard
        variant="interactive"
        padding="md"
        onPress={() => console.log("Notifications")}
      >
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Notifications</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto" />
        </div>
      </KlardCard>
    </div>
  ),
};

// Dashboard widget example
export const DashboardWidget: Story = {
  render: () => (
    <KlardCard variant="default" padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Monthly Overview</h3>
          <span className="text-xs text-muted-foreground">January 2025</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-primary">
              $234.56
            </p>
            <p className="text-sm text-muted-foreground">Total Spending</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">
              $45.00
            </p>
            <p className="text-sm text-muted-foreground">Saved This Month</p>
          </div>
        </div>
      </div>
    </KlardCard>
  ),
};

// Nested cards example
export const NestedCards: Story = {
  render: () => (
    <KlardCard variant="default" padding="lg">
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-2">
        <KlardCard variant="ghost" padding="sm">
          <div className="flex justify-between items-center">
            <span className="text-sm">Netflix charged</span>
            <span className="font-medium">$15.99</span>
          </div>
        </KlardCard>
        <KlardCard variant="ghost" padding="sm">
          <div className="flex justify-between items-center">
            <span className="text-sm">Spotify charged</span>
            <span className="font-medium">$9.99</span>
          </div>
        </KlardCard>
        <KlardCard variant="ghost" padding="sm">
          <div className="flex justify-between items-center">
            <span className="text-sm">New card created</span>
            <span className="text-primary text-sm">Gaming Card</span>
          </div>
        </KlardCard>
      </div>
    </KlardCard>
  ),
};
