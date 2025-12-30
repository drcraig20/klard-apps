import type { Meta, StoryObj } from "@storybook/react";
import { SubscriptionCard, type SubscriptionData } from "./subscription-card";

// Mock subscription data
const mockSubscriptions: Record<string, SubscriptionData> = {
  netflix: {
    id: "sub-1",
    name: "Netflix",
    logoUrl: "https://logo.clearbit.com/netflix.com",
    price: 15.99,
    currency: "USD",
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: new Date("2025-01-15"),
    category: "Entertainment",
  },
  spotify: {
    id: "sub-2",
    name: "Spotify Premium",
    logoUrl: "https://logo.clearbit.com/spotify.com",
    price: 9.99,
    currency: "USD",
    billingCycle: "monthly",
    status: "active",
    nextBillingDate: new Date("2025-01-20"),
    category: "Music",
  },
  github: {
    id: "sub-3",
    name: "GitHub Pro",
    logoUrl: "https://logo.clearbit.com/github.com",
    price: 4.0,
    currency: "USD",
    billingCycle: "monthly",
    status: "trial",
    nextBillingDate: new Date("2025-02-01"),
    category: "Developer Tools",
  },
  adobe: {
    id: "sub-4",
    name: "Adobe Creative Cloud",
    logoUrl: "https://logo.clearbit.com/adobe.com",
    price: 599.88,
    currency: "USD",
    billingCycle: "yearly",
    status: "active",
    nextBillingDate: new Date("2025-06-15"),
    category: "Software",
  },
  paused: {
    id: "sub-5",
    name: "Hulu",
    logoUrl: "https://logo.clearbit.com/hulu.com",
    price: 12.99,
    currency: "USD",
    billingCycle: "monthly",
    status: "paused",
    nextBillingDate: new Date("2025-02-10"),
    category: "Entertainment",
  },
  cancelled: {
    id: "sub-6",
    name: "Disney+",
    logoUrl: "https://logo.clearbit.com/disneyplus.com",
    price: 10.99,
    currency: "USD",
    billingCycle: "monthly",
    status: "cancelled",
    nextBillingDate: new Date("2025-01-31"),
    category: "Entertainment",
  },
  expired: {
    id: "sub-7",
    name: "HBO Max",
    price: 14.99,
    currency: "USD",
    billingCycle: "monthly",
    status: "expired",
    nextBillingDate: new Date("2024-12-15"),
    category: "Entertainment",
  },
};

const meta = {
  title: "Data Display/SubscriptionCard",
  component: SubscriptionCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Subscription card component for displaying subscription details including name, price, billing cycle, status, and next billing date.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "detailed"],
      description: "Card layout variant",
    },
    healthStatus: {
      control: "select",
      options: [undefined, "forgotten", "price-increased", "healthy"],
      description: "Health status indicator for the subscription",
    },
    isProtected: {
      control: "boolean",
      description: "Whether the subscription is protected by Klard",
    },
    showActions: {
      control: "boolean",
      description: "Whether to show action buttons",
    },
    onPress: {
      action: "pressed",
      description: "Click handler for interactive cards",
    },
  },
} satisfies Meta<typeof SubscriptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    subscription: mockSubscriptions.netflix,
    variant: "default",
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    subscription: mockSubscriptions.spotify,
    variant: "compact",
  },
};

// Detailed variant
export const Detailed: Story = {
  args: {
    subscription: mockSubscriptions.adobe,
    variant: "detailed",
  },
};

// Active status
export const ActiveStatus: Story = {
  args: {
    subscription: mockSubscriptions.netflix,
    variant: "default",
  },
};

// Trial status
export const TrialStatus: Story = {
  args: {
    subscription: mockSubscriptions.github,
    variant: "default",
  },
};

// Paused status
export const PausedStatus: Story = {
  args: {
    subscription: mockSubscriptions.paused,
    variant: "default",
  },
};

// Cancelled status
export const CancelledStatus: Story = {
  args: {
    subscription: mockSubscriptions.cancelled,
    variant: "default",
  },
};

// Expired status
export const ExpiredStatus: Story = {
  args: {
    subscription: mockSubscriptions.expired,
    variant: "default",
  },
};

// Interactive card
export const Interactive: Story = {
  args: {
    subscription: mockSubscriptions.netflix,
    variant: "default",
    onPress: () => console.log("Card pressed"),
  },
};

// Yearly billing
export const YearlyBilling: Story = {
  args: {
    subscription: mockSubscriptions.adobe,
    variant: "default",
  },
};

// Without logo (uses fallback)
export const WithoutLogo: Story = {
  args: {
    subscription: mockSubscriptions.expired,
    variant: "default",
  },
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Compact</p>
        <SubscriptionCard subscription={mockSubscriptions.spotify} variant="compact" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <SubscriptionCard subscription={mockSubscriptions.spotify} variant="default" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Detailed</p>
        <SubscriptionCard subscription={mockSubscriptions.spotify} variant="detailed" />
      </div>
    </div>
  ),
};

// All statuses
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <SubscriptionCard subscription={mockSubscriptions.netflix} />
      <SubscriptionCard subscription={mockSubscriptions.github} />
      <SubscriptionCard subscription={mockSubscriptions.paused} />
      <SubscriptionCard subscription={mockSubscriptions.cancelled} />
      <SubscriptionCard subscription={mockSubscriptions.expired} />
    </div>
  ),
};

// Subscription list example
export const SubscriptionList: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <h3 className="font-semibold text-lg">Your Subscriptions</h3>
      <SubscriptionCard
        subscription={mockSubscriptions.netflix}
        onPress={() => console.log("Netflix clicked")}
      />
      <SubscriptionCard
        subscription={mockSubscriptions.spotify}
        onPress={() => console.log("Spotify clicked")}
      />
      <SubscriptionCard
        subscription={mockSubscriptions.github}
        onPress={() => console.log("GitHub clicked")}
      />
      <SubscriptionCard
        subscription={mockSubscriptions.adobe}
        onPress={() => console.log("Adobe clicked")}
      />
    </div>
  ),
};

// Compact list for sidebar
export const CompactList: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-xs p-4 bg-muted/30 rounded-lg">
      <h4 className="text-sm font-medium text-muted-foreground mb-1">Upcoming</h4>
      <SubscriptionCard subscription={mockSubscriptions.netflix} variant="compact" />
      <SubscriptionCard subscription={mockSubscriptions.spotify} variant="compact" />
      <SubscriptionCard subscription={mockSubscriptions.github} variant="compact" />
    </div>
  ),
};

// Different currencies
export const DifferentCurrencies: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-md">
      <SubscriptionCard
        subscription={{
          ...mockSubscriptions.netflix,
          id: "eur-sub",
          currency: "EUR",
          price: 13.99,
        }}
      />
      <SubscriptionCard
        subscription={{
          ...mockSubscriptions.spotify,
          id: "gbp-sub",
          currency: "GBP",
          price: 10.99,
        }}
      />
    </div>
  ),
};

// Health Status: Forgotten
export const WithHealthStatusForgotten: Story = {
  args: {
    subscription: mockSubscriptions.netflix,
    healthStatus: "forgotten",
    variant: "default",
  },
};

// Health Status: Price Increased
export const WithHealthStatusPriceIncreased: Story = {
  args: {
    subscription: mockSubscriptions.spotify,
    healthStatus: "price-increased",
    variant: "default",
  },
};

// Health Status: Healthy
export const WithHealthStatusHealthy: Story = {
  args: {
    subscription: mockSubscriptions.github,
    healthStatus: "healthy",
    variant: "default",
  },
};

// Protected subscription
export const Protected: Story = {
  args: {
    subscription: mockSubscriptions.netflix,
    isProtected: true,
    variant: "default",
  },
};

// Protected with health status
export const ProtectedWithHealthStatus: Story = {
  args: {
    subscription: mockSubscriptions.adobe,
    isProtected: true,
    healthStatus: "healthy",
    variant: "default",
  },
};

// All features showcase
export const AllFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Forgotten subscription</p>
        <SubscriptionCard
          subscription={mockSubscriptions.netflix}
          healthStatus="forgotten"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Price increased</p>
        <SubscriptionCard
          subscription={mockSubscriptions.spotify}
          healthStatus="price-increased"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Healthy subscription</p>
        <SubscriptionCard
          subscription={mockSubscriptions.github}
          healthStatus="healthy"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Protected subscription</p>
        <SubscriptionCard
          subscription={mockSubscriptions.adobe}
          isProtected={true}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Protected + Healthy</p>
        <SubscriptionCard
          subscription={mockSubscriptions.netflix}
          isProtected={true}
          healthStatus="healthy"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Protected + Price Increased (needs attention)</p>
        <SubscriptionCard
          subscription={mockSubscriptions.spotify}
          isProtected={true}
          healthStatus="price-increased"
        />
      </div>
    </div>
  ),
};
