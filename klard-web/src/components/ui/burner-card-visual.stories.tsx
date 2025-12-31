import type { Meta, StoryObj } from "@storybook/react";
import { BurnerCardVisual, type BurnerCardData } from "./burner-card-visual";

// Action helper for stories
const action = (name: string) => () => console.log(`Action: ${name}`);

// Mock card data
const mockCards: Record<string, BurnerCardData> = {
  active: {
    nickname: "Netflix Subscription",
    type: "recurring",
    status: "active",
    lastFour: "4242",
    expiryMonth: "12",
    expiryYear: "26",
    spentAmount: 45.97,
    spendLimit: 100.0,
  },
  activeHighUsage: {
    nickname: "Gaming Card",
    type: "recurring",
    status: "active",
    lastFour: "8888",
    expiryMonth: "06",
    expiryYear: "27",
    spentAmount: 89.99,
    spendLimit: 100.0,
  },
  singleUse: {
    nickname: "Amazon Purchase",
    type: "single-use",
    status: "active",
    lastFour: "1234",
    expiryMonth: "03",
    expiryYear: "25",
    spentAmount: 0,
    spendLimit: 150.0,
  },
  locked: {
    nickname: "Paused Streaming",
    type: "recurring",
    status: "locked",
    lastFour: "5678",
    expiryMonth: "09",
    expiryYear: "26",
    spentAmount: 29.99,
    spendLimit: 50.0,
  },
  expired: {
    nickname: "Old Shopping Card",
    type: "single-use",
    status: "expired",
    lastFour: "9012",
    expiryMonth: "01",
    expiryYear: "24",
    spentAmount: 75.0,
    spendLimit: 100.0,
  },
  used: {
    nickname: "Completed Purchase",
    type: "single-use",
    status: "used",
    lastFour: "3456",
    expiryMonth: "08",
    expiryYear: "25",
    spentAmount: 199.99,
    spendLimit: 200.0,
  },
  awaiting: {
    nickname: "New Subscription",
    type: "recurring",
    status: "awaiting",
    lastFour: "0000",
    expiryMonth: "--",
    expiryYear: "--",
    spentAmount: 0,
    spendLimit: 100.0,
  },
  burned: {
    nickname: "Compromised Card",
    type: "single-use",
    status: "burned",
    lastFour: "6666",
    expiryMonth: "12",
    expiryYear: "25",
    spentAmount: 50.0,
    spendLimit: 100.0,
  },
};

const meta = {
  title: "Data Display/BurnerCardVisual",
  component: BurnerCardVisual,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual representation of a burner/virtual card showing card details, spending progress, and status. Supports different card types and statuses.",
      },
    },
    backgrounds: {
      default: "light",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Card size",
    },
    card: {
      control: "object",
      description: "Card data object",
    },
    onActivate: {
      action: "onActivate",
      description: "Callback when activate button is clicked (awaiting status only)",
    },
  },
} satisfies Meta<typeof BurnerCardVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story (active card)
export const Default: Story = {
  args: {
    card: mockCards.active,
    size: "md",
  },
};

// Active card
export const Active: Story = {
  args: {
    card: mockCards.active,
    size: "md",
  },
};

// Active with high usage
export const ActiveHighUsage: Story = {
  args: {
    card: mockCards.activeHighUsage,
    size: "md",
  },
};

// Single-use card
export const SingleUse: Story = {
  args: {
    card: mockCards.singleUse,
    size: "md",
  },
};

// Locked card
export const Locked: Story = {
  args: {
    card: mockCards.locked,
    size: "md",
  },
};

// Expired card
export const Expired: Story = {
  args: {
    card: mockCards.expired,
    size: "md",
  },
};

// Used card
export const Used: Story = {
  args: {
    card: mockCards.used,
    size: "md",
  },
};

// Awaiting activation card
export const Awaiting: Story = {
  args: {
    card: mockCards.awaiting,
    size: "md",
  },
};

// Awaiting with CTA button
export const AwaitingWithCTA: Story = {
  args: {
    card: mockCards.awaiting,
    size: "md",
    onActivate: action("onActivate"),
  },
};

// Burned/destroyed card
export const Burned: Story = {
  args: {
    card: mockCards.burned,
    size: "md",
  },
};

// Small size
export const Small: Story = {
  args: {
    card: mockCards.active,
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    card: mockCards.active,
    size: "md",
  },
};

// Large size
export const Large: Story = {
  args: {
    card: mockCards.active,
    size: "lg",
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
        <BurnerCardVisual card={mockCards.active} size="sm" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium (md)</p>
        <BurnerCardVisual card={mockCards.active} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large (lg)</p>
        <BurnerCardVisual card={mockCards.active} size="lg" />
      </div>
    </div>
  ),
};

// All statuses
export const AllStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Active</p>
        <BurnerCardVisual card={mockCards.active} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Locked</p>
        <BurnerCardVisual card={mockCards.locked} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Expired</p>
        <BurnerCardVisual card={mockCards.expired} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Used</p>
        <BurnerCardVisual card={mockCards.used} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Awaiting</p>
        <BurnerCardVisual card={mockCards.awaiting} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Burned</p>
        <BurnerCardVisual card={mockCards.burned} size="md" />
      </div>
    </div>
  ),
};

// Card types comparison
export const CardTypes: Story = {
  render: () => (
    <div className="flex flex-col md:flex-row gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Recurring</p>
        <BurnerCardVisual card={mockCards.active} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Single-Use</p>
        <BurnerCardVisual card={mockCards.singleUse} size="md" />
      </div>
    </div>
  ),
};

// Spending progress examples
export const SpendingProgress: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">No spending (0%)</p>
        <BurnerCardVisual card={mockCards.singleUse} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Moderate spending (~46%)
        </p>
        <BurnerCardVisual card={mockCards.active} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          High spending (~90%)
        </p>
        <BurnerCardVisual card={mockCards.activeHighUsage} size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Fully used (100%)</p>
        <BurnerCardVisual card={mockCards.used} size="md" />
      </div>
    </div>
  ),
};

// Card wallet example
export const CardWallet: Story = {
  render: () => (
    <div className="p-6 bg-muted rounded-xl">
      <h3 className="font-semibold text-lg mb-4">My Cards</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <BurnerCardVisual card={mockCards.active} size="sm" />
        <BurnerCardVisual card={mockCards.singleUse} size="sm" />
        <BurnerCardVisual card={mockCards.locked} size="sm" />
      </div>
    </div>
  ),
};

// Featured card display
export const FeaturedCard: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-muted/50 to-muted rounded-2xl">
      <BurnerCardVisual card={mockCards.active} size="lg" />
      <div className="text-center">
        <p className="font-semibold">Primary Card</p>
        <p className="text-sm text-muted-foreground">
          Used for streaming subscriptions
        </p>
      </div>
    </div>
  ),
};

// Custom spending limits
export const CustomSpendingLimits: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Low limit ($50)</p>
        <BurnerCardVisual
          card={{
            ...mockCards.active,
            spendLimit: 50,
            spentAmount: 25,
          }}
          size="md"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">High limit ($1000)</p>
        <BurnerCardVisual
          card={{
            ...mockCards.active,
            nickname: "Business Expenses",
            spendLimit: 1000,
            spentAmount: 456.78,
          }}
          size="md"
        />
      </div>
    </div>
  ),
};

// Compound pattern with sub-components
export const CompoundPattern: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Using compound sub-components for custom layouts
        </p>
        <BurnerCardVisual card={mockCards.active} size="lg">
          <div className="absolute top-2 right-2">
            <BurnerCardVisual.CVC value="***" className="text-white/60" />
          </div>
        </BurnerCardVisual>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Awaiting card with custom CTA using compound pattern
        </p>
        <BurnerCardVisual card={mockCards.awaiting} size="md">
          <BurnerCardVisual.Label>Complete KYC to activate</BurnerCardVisual.Label>
          <BurnerCardVisual.CTA onClick={action("verify")}>
            Verify Identity
          </BurnerCardVisual.CTA>
        </BurnerCardVisual>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Sub-components used standalone
        </p>
        <div className="flex gap-4 items-center p-4 bg-muted rounded-lg">
          <BurnerCardVisual.Number value="**** **** **** 1234" className="text-foreground" />
          <BurnerCardVisual.Expiry value="12/26" className="text-muted-foreground" />
          <BurnerCardVisual.CVC value="123" className="text-muted-foreground" />
        </div>
      </div>
    </div>
  ),
};
