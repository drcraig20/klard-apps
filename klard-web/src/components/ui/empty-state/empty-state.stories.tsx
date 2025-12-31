import type { Meta, StoryObj } from "@storybook/react";
import {
  CreditCard,
  Search,
  Inbox,
  FileX,
  WifiOff,
  ShoppingBag,
  Bell,
  FolderOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../button";
import {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "./empty-state";

const meta = {
  title: "Data Display/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Empty state component for displaying placeholder content when no data is available. Supports illustrations, titles, descriptions, and action buttons.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Empty state size affecting spacing",
    },
    variant: {
      control: "select",
      options: ["default", "first-time", "cleared", "error"],
      description: "Visual tone variant affecting glow and styling",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <Inbox className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No items found</EmptyStateTitle>
      <EmptyStateDescription>
        There are no items to display at this time.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

// With actions
export const WithActions: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <CreditCard className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No cards yet</EmptyStateTitle>
      <EmptyStateDescription>
        Create your first virtual card to start managing your subscriptions
        securely.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard">Create Card</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// Multiple actions
export const MultipleActions: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No subscriptions</EmptyStateTitle>
      <EmptyStateDescription>
        Add your first subscription to start tracking your recurring payments.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard">Add Subscription</Button>
        <Button variant="outline">Import from Bank</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// Small size
export const Small: Story = {
  render: () => (
    <EmptyState size="sm">
      <EmptyStateMedia>
        <FileX className="h-8 w-8 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No results</EmptyStateTitle>
      <EmptyStateDescription>Try adjusting your filters.</EmptyStateDescription>
    </EmptyState>
  ),
};

// Medium size (default)
export const Medium: Story = {
  render: () => (
    <EmptyState size="md">
      <EmptyStateMedia>
        <Inbox className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>Your inbox is empty</EmptyStateTitle>
      <EmptyStateDescription>
        When you receive notifications, they will appear here.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

// Large size
export const Large: Story = {
  render: () => (
    <EmptyState size="lg">
      <EmptyStateMedia>
        <FolderOpen className="h-16 w-16 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No documents</EmptyStateTitle>
      <EmptyStateDescription>
        Upload your first document to get started with document management.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard" size="lg">
          Upload Document
        </Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// Search no results
export const SearchNoResults: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <Search className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        We couldn&apos;t find any subscriptions matching &quot;Netflix&quot;.
        Try a different search term.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="outline">Clear Search</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// Offline state
export const Offline: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <WifiOff className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>You&apos;re offline</EmptyStateTitle>
      <EmptyStateDescription>
        Please check your internet connection and try again.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="outline">Retry</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// No notifications
export const NoNotifications: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <Bell className="h-12 w-12 text-muted-foreground" />
      </EmptyStateMedia>
      <EmptyStateTitle>All caught up!</EmptyStateTitle>
      <EmptyStateDescription>
        You have no new notifications. We&apos;ll let you know when something
        needs your attention.
      </EmptyStateDescription>
    </EmptyState>
  ),
};

// No cards
export const NoCards: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <div className="p-4 rounded-full bg-primary/10">
          <CreditCard className="h-8 w-8 text-primary" />
        </div>
      </EmptyStateMedia>
      <EmptyStateTitle>No virtual cards</EmptyStateTitle>
      <EmptyStateDescription>
        Virtual cards help you protect your real card details. Create one for
        each subscription or online purchase.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard">Create Your First Card</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">size: sm</p>
        <EmptyState size="sm">
          <EmptyStateMedia>
            <Inbox className="h-8 w-8 text-muted-foreground" />
          </EmptyStateMedia>
          <EmptyStateTitle>Small empty state</EmptyStateTitle>
          <EmptyStateDescription>Compact spacing</EmptyStateDescription>
        </EmptyState>
      </div>
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">size: md</p>
        <EmptyState size="md">
          <EmptyStateMedia>
            <Inbox className="h-12 w-12 text-muted-foreground" />
          </EmptyStateMedia>
          <EmptyStateTitle>Medium empty state</EmptyStateTitle>
          <EmptyStateDescription>Default spacing</EmptyStateDescription>
        </EmptyState>
      </div>
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">size: lg</p>
        <EmptyState size="lg">
          <EmptyStateMedia>
            <Inbox className="h-16 w-16 text-muted-foreground" />
          </EmptyStateMedia>
          <EmptyStateTitle>Large empty state</EmptyStateTitle>
          <EmptyStateDescription>Spacious layout</EmptyStateDescription>
        </EmptyState>
      </div>
    </div>
  ),
};

// With custom illustration
export const WithCustomIllustration: Story = {
  render: () => (
    <EmptyState>
      <EmptyStateMedia>
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
            <CreditCard className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <span className="text-primary text-lg font-bold">
              +
            </span>
          </div>
        </div>
      </EmptyStateMedia>
      <EmptyStateTitle>Create your first card</EmptyStateTitle>
      <EmptyStateDescription>
        Virtual cards keep your real payment details safe when shopping online
        or managing subscriptions.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard">Get Started</Button>
        <Button variant="ghost">Learn More</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
};

// In card container
export const InCardContainer: Story = {
  render: () => (
    <div className="border rounded-xl p-6 max-w-md mx-auto">
      <EmptyState size="sm">
        <EmptyStateMedia>
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </EmptyStateMedia>
        <EmptyStateTitle>No recent activity</EmptyStateTitle>
        <EmptyStateDescription>
          Your transaction history will appear here.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};

// First-time variant - Educational/onboarding tone
export const FirstTime: Story = {
  render: () => (
    <EmptyState variant="first-time">
      <EmptyStateMedia>
        <div className="p-4 rounded-full bg-primary/10">
          <Sparkles className="h-10 w-10 text-primary" />
        </div>
      </EmptyStateMedia>
      <EmptyStateTitle>Welcome to Klard!</EmptyStateTitle>
      <EmptyStateDescription>
        Create your first virtual card to start protecting your subscriptions.
        Virtual cards keep your real payment details safe while giving you full
        control over recurring charges.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="klard">Create Your First Card</Button>
        <Button variant="ghost">Learn How It Works</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Educational/onboarding variant with primary glow effect. Use for first-time user experiences when introducing new features or guiding users through initial setup.",
      },
    },
  },
};

// Cleared variant - Celebratory "all done" tone
export const Cleared: Story = {
  render: () => (
    <EmptyState variant="cleared">
      <EmptyStateMedia>
        <div className="p-4 rounded-full bg-success/10">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
      </EmptyStateMedia>
      <EmptyStateTitle>All caught up!</EmptyStateTitle>
      <EmptyStateDescription>
        You have reviewed all your pending subscriptions. Great job staying on
        top of your recurring payments!
      </EmptyStateDescription>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Celebratory variant with success glow effect. Use when users have completed all tasks or cleared their inbox/queue. Reinforces positive behavior.",
      },
    },
  },
};

// Error variant - Recovery-focused tone
export const ErrorVariant: Story = {
  render: () => (
    <EmptyState variant="error">
      <EmptyStateMedia>
        <div className="p-4 rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
      </EmptyStateMedia>
      <EmptyStateTitle>Unable to load subscriptions</EmptyStateTitle>
      <EmptyStateDescription>
        We encountered a problem loading your data. This might be a temporary
        issue. Please try again or contact support if the problem persists.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="destructive">Try Again</Button>
        <Button variant="outline">Contact Support</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Recovery-focused variant with destructive glow effect. Use for error states that require user action to resolve. Provides clear recovery paths.",
      },
    },
  },
};

// Variant comparison - All 4 variants side by side
export const VariantComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">
          variant: default
        </p>
        <EmptyState variant="default">
          <EmptyStateMedia>
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </EmptyStateMedia>
          <EmptyStateTitle>No items</EmptyStateTitle>
          <EmptyStateDescription>
            Standard neutral empty state for general use.
          </EmptyStateDescription>
        </EmptyState>
      </div>
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">
          variant: first-time
        </p>
        <EmptyState variant="first-time">
          <EmptyStateMedia>
            <div className="p-3 rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </EmptyStateMedia>
          <EmptyStateTitle>Welcome!</EmptyStateTitle>
          <EmptyStateDescription>
            Educational tone with primary glow for onboarding.
          </EmptyStateDescription>
        </EmptyState>
      </div>
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">
          variant: cleared
        </p>
        <EmptyState variant="cleared">
          <EmptyStateMedia>
            <div className="p-3 rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </EmptyStateMedia>
          <EmptyStateTitle>All done!</EmptyStateTitle>
          <EmptyStateDescription>
            Celebratory tone with success glow for completion.
          </EmptyStateDescription>
        </EmptyState>
      </div>
      <div className="border rounded-lg">
        <p className="text-xs text-muted-foreground p-2 bg-muted">
          variant: error
        </p>
        <EmptyState variant="error">
          <EmptyStateMedia>
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </EmptyStateMedia>
          <EmptyStateTitle>Error occurred</EmptyStateTitle>
          <EmptyStateDescription>
            Recovery-focused tone with destructive glow.
          </EmptyStateDescription>
        </EmptyState>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of all 4 variant types: default (neutral), first-time (onboarding), cleared (celebratory), and error (recovery).",
      },
    },
  },
};
