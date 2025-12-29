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
        <div className="p-4 rounded-full bg-teal-100 dark:bg-teal-900/50">
          <CreditCard className="h-8 w-8 text-teal-700 dark:text-teal-300" />
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
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 flex items-center justify-center">
            <CreditCard className="h-10 w-10 text-teal-600 dark:text-teal-300" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-teal-500 flex items-center justify-center">
            <span className="text-teal-600 dark:text-teal-400 text-lg font-bold">
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
