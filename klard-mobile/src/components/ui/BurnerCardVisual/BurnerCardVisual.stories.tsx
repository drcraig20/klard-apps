import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { BurnerCardVisual, type BurnerCardData } from './BurnerCardVisual';

/**
 * BurnerCardVisual displays a virtual card representation with gradient backgrounds
 * based on status (active, locked, expired, used). Shows card details including
 * nickname, last four digits, expiry, and a spending progress bar.
 */
const meta: Meta<typeof BurnerCardVisual> = {
  title: 'Cards/BurnerCardVisual',
  component: BurnerCardVisual,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the card visual',
    },
    card: {
      description: 'The card data object containing all card details',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock card data factory
const createMockCard = (overrides: Partial<BurnerCardData> = {}): BurnerCardData => ({
  nickname: 'Netflix',
  type: 'recurring',
  status: 'active',
  lastFour: '4242',
  expiryMonth: '12',
  expiryYear: '26',
  spentAmount: 45.99,
  spendLimit: 100.0,
  ...overrides,
});

// Active card (default state)
export const Active: Story = {
  args: {
    card: createMockCard({
      nickname: 'Streaming Services',
      status: 'active',
      spentAmount: 29.99,
      spendLimit: 50.0,
    }),
    size: 'md',
  },
};

// Locked card
export const Locked: Story = {
  args: {
    card: createMockCard({
      nickname: 'Shopping Card',
      status: 'locked',
      lastFour: '8765',
      spentAmount: 75.0,
      spendLimit: 100.0,
    }),
    size: 'md',
  },
};

// Expired card
export const Expired: Story = {
  args: {
    card: createMockCard({
      nickname: 'Old Subscription',
      status: 'expired',
      lastFour: '1234',
      expiryMonth: '06',
      expiryYear: '24',
      spentAmount: 89.99,
      spendLimit: 100.0,
    }),
    size: 'md',
  },
};

// Used (single-use card that has been spent)
export const Used: Story = {
  args: {
    card: createMockCard({
      nickname: 'One-Time Purchase',
      type: 'single-use',
      status: 'used',
      lastFour: '9999',
      spentAmount: 150.0,
      spendLimit: 150.0,
    }),
    size: 'md',
  },
};

// Single-use card type
export const SingleUse: Story = {
  args: {
    card: createMockCard({
      nickname: 'Amazon Purchase',
      type: 'single-use',
      status: 'active',
      lastFour: '5678',
      spentAmount: 0,
      spendLimit: 75.0,
    }),
    size: 'md',
  },
};

// Recurring card type
export const Recurring: Story = {
  args: {
    card: createMockCard({
      nickname: 'Spotify Premium',
      type: 'recurring',
      status: 'active',
      lastFour: '3456',
      spentAmount: 9.99,
      spendLimit: 15.0,
    }),
    size: 'md',
  },
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 20, alignItems: 'center' }}>
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Small Card' })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Medium Card' })}
        size="md"
      />
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Large Card' })}
        size="lg"
      />
    </View>
  ),
};

// All status states
export const AllStatuses: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Active Card', status: 'active' })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Locked Card', status: 'locked' })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({ nickname: 'Expired Card', status: 'expired' })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({
          nickname: 'Used Card',
          status: 'used',
          spentAmount: 100,
          spendLimit: 100,
        })}
        size="sm"
      />
    </View>
  ),
};

// Progress bar variations
export const SpendingProgress: Story = {
  render: () => (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <BurnerCardVisual
        card={createMockCard({
          nickname: '0% Spent',
          spentAmount: 0,
          spendLimit: 100,
        })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({
          nickname: '25% Spent',
          spentAmount: 25,
          spendLimit: 100,
        })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({
          nickname: '50% Spent',
          spentAmount: 50,
          spendLimit: 100,
        })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({
          nickname: '75% Spent',
          spentAmount: 75,
          spendLimit: 100,
        })}
        size="sm"
      />
      <BurnerCardVisual
        card={createMockCard({
          nickname: '100% Spent',
          spentAmount: 100,
          spendLimit: 100,
        })}
        size="sm"
      />
    </View>
  ),
};

// High spend limit card
export const HighLimit: Story = {
  args: {
    card: createMockCard({
      nickname: 'Premium Card',
      spentAmount: 2500.0,
      spendLimit: 5000.0,
    }),
    size: 'lg',
  },
};
