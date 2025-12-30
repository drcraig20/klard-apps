import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { BlockCelebration } from "./block-celebration";

const meta = {
  title: "Feedback/BlockCelebration",
  component: BlockCelebration,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compound component for celebrating blocked charges with confetti effects. Supports different celebration levels and sub-components for amount, merchant, and sharing.",
      },
    },
  },
  argTypes: {
    level: {
      control: "select",
      options: ["first", "milestone", "streak", "subtle"],
      description: "Celebration intensity level",
    },
  },
} satisfies Meta<typeof BlockCelebration>;

export default meta;
type Story = StoryObj<typeof meta>;

/** First-ever block - full confetti celebration */
export const FirstBlock: Story = {
  args: {
    level: "first",
    children: <BlockCelebration.Amount value={47.98} />,
  },
};

/** Milestone celebration (e.g., $1000 saved) */
export const Milestone: Story = {
  args: {
    level: "milestone",
    children: <BlockCelebration.Amount value={1000.0} />,
  },
};

/** Streak celebration (consecutive blocks) */
export const Streak: Story = {
  args: {
    level: "streak",
    children: <BlockCelebration.Amount value={14.99} />,
  },
};

/** Subtle - no confetti, just glow */
export const Subtle: Story = {
  args: {
    level: "subtle",
    children: <BlockCelebration.Amount value={9.99} />,
  },
};

/** With merchant name displayed */
export const WithMerchant: Story = {
  render: () => (
    <BlockCelebration level="first">
      <BlockCelebration.Amount value={47.98} />
      <BlockCelebration.Merchant name="Netflix Premium" />
    </BlockCelebration>
  ),
};

/** Anonymized merchant for privacy */
export const AnonymizedMerchant: Story = {
  render: () => (
    <BlockCelebration level="milestone">
      <BlockCelebration.Amount value={129.0} />
      <BlockCelebration.Merchant name="Private Service" anonymize />
    </BlockCelebration>
  ),
};

/** With share button */
export const WithShareButton: Story = {
  render: () => (
    <BlockCelebration level="first">
      <BlockCelebration.Amount value={47.98} />
      <BlockCelebration.ShareZone>
        <BlockCelebration.ShareButton onShare={fn()} />
      </BlockCelebration.ShareZone>
    </BlockCelebration>
  ),
};

/** Full composition with all sub-components */
export const FullComposition: Story = {
  render: () => (
    <BlockCelebration level="first">
      <BlockCelebration.Amount value={47.98} />
      <BlockCelebration.Merchant name="TrialService" />
      <BlockCelebration.ShareZone>
        <BlockCelebration.ShareButton onShare={fn()} />
      </BlockCelebration.ShareZone>
    </BlockCelebration>
  ),
};

/** All celebration levels comparison */
export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">First (full confetti)</p>
        <BlockCelebration level="first">
          <BlockCelebration.Amount value={47.98} />
        </BlockCelebration>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Milestone (medium confetti)</p>
        <BlockCelebration level="milestone">
          <BlockCelebration.Amount value={1000.0} />
        </BlockCelebration>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Streak (subtle confetti)</p>
        <BlockCelebration level="streak">
          <BlockCelebration.Amount value={14.99} />
        </BlockCelebration>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Subtle (no confetti)</p>
        <BlockCelebration level="subtle">
          <BlockCelebration.Amount value={4.99} />
        </BlockCelebration>
      </div>
    </div>
  ),
};

/** Different currencies */
export const DifferentCurrencies: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <BlockCelebration level="subtle">
        <BlockCelebration.Amount value={47.98} currency="USD" />
      </BlockCelebration>
      <BlockCelebration level="subtle">
        <BlockCelebration.Amount value={42.5} currency="EUR" />
      </BlockCelebration>
      <BlockCelebration level="subtle">
        <BlockCelebration.Amount value={38.0} currency="GBP" />
      </BlockCelebration>
      <BlockCelebration level="subtle">
        <BlockCelebration.Amount value={5000} currency="JPY" />
      </BlockCelebration>
    </div>
  ),
};
