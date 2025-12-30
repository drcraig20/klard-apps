import type { Meta, StoryObj } from "@storybook/react";
import { ProtectionStatus } from "./protection-status";

const meta = {
  title: "Data Display/ProtectionStatus",
  component: ProtectionStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays how many cards are actively protecting the user with a teal glow effect and optional pulse animation.",
      },
    },
  },
  argTypes: {
    activeCards: {
      control: { type: "number", min: 0, max: 20 },
      description: "Number of active cards watching",
    },
    showPulse: {
      control: "boolean",
      description: "Whether to show pulse animation",
    },
  },
} satisfies Meta<typeof ProtectionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default with 3 active cards */
export const Default: Story = {
  args: {
    activeCards: 3,
  },
};

/** Single card watching */
export const SingleCard: Story = {
  args: {
    activeCards: 1,
  },
};

/** Multiple cards (5) */
export const MultipleCards: Story = {
  args: {
    activeCards: 5,
  },
};

/** No cards active */
export const NoCards: Story = {
  args: {
    activeCards: 0,
  },
};

/** With pulse animation enabled */
export const WithPulse: Story = {
  args: {
    activeCards: 3,
    showPulse: true,
  },
};

/** Without pulse animation */
export const WithoutPulse: Story = {
  args: {
    activeCards: 3,
    showPulse: false,
  },
};

/** All variations comparison */
export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">0 cards:</span>
        <ProtectionStatus activeCards={0} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">1 card:</span>
        <ProtectionStatus activeCards={1} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">5 cards:</span>
        <ProtectionStatus activeCards={5} />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-24 text-sm text-muted-foreground">With pulse:</span>
        <ProtectionStatus activeCards={3} showPulse />
      </div>
    </div>
  ),
};
