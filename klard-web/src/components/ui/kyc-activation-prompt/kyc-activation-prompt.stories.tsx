import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { KYCActivationPrompt } from "./kyc-activation-prompt";

const meta = {
  title: "Feedback/KYCActivationPrompt",
  component: KYCActivationPrompt,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'KYC verification prompt with positive "activation" framing. Supports inline, modal, and card-overlay variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["inline", "modal", "card-overlay"],
      description: "Visual variant",
    },
    cardName: {
      control: "text",
      description: "Name of the card being activated",
    },
  },
  args: {
    onActivate: fn(),
  },
} satisfies Meta<typeof KYCActivationPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Inline variant (default) */
export const Inline: Story = {
  args: {
    cardName: "Subscription Shield",
    variant: "inline",
  },
};

/** Modal variant */
export const Modal: Story = {
  args: {
    cardName: "Trial Blocker",
    variant: "modal",
  },
};

/** Card overlay variant */
export const CardOverlay: Story = {
  args: {
    cardName: "Netflix Blocker",
    variant: "card-overlay",
  },
  decorators: [
    (Story) => (
      <div className="relative w-[350px] h-[200px] bg-slate-800 rounded-xl p-4">
        <Story />
      </div>
    ),
  ],
};

/** Netflix Blocker card */
export const NetflixBlocker: Story = {
  args: {
    cardName: "Netflix Blocker",
    variant: "inline",
  },
};

/** Trial Protection card */
export const TrialProtection: Story = {
  args: {
    cardName: "Trial Protection",
    variant: "inline",
  },
};

/** All variants comparison */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium mb-2">Inline Variant</p>
        <KYCActivationPrompt
          cardName="Subscription Shield"
          variant="inline"
          onActivate={fn()}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Modal Variant</p>
        <KYCActivationPrompt
          cardName="Trial Blocker"
          variant="modal"
          onActivate={fn()}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Card Overlay Variant</p>
        <div className="relative w-[350px] h-[180px] bg-slate-800 rounded-xl p-4">
          <KYCActivationPrompt
            cardName="Netflix Blocker"
            variant="card-overlay"
            onActivate={fn()}
          />
        </div>
      </div>
    </div>
  ),
};
