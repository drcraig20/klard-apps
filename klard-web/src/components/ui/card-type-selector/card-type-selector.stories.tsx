import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { fn } from "@storybook/test";
import { CardTypeSelector, type CardType } from "./card-type-selector";

const meta = {
  title: "Forms/CardTypeSelector",
  component: CardTypeSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card type selector with context-aware recommendations. Shows 2 options by default, with optional advanced options.",
      },
    },
  },
  argTypes: {
    context: {
      control: "select",
      options: [undefined, "trial", "subscription", "general"],
      description: "Context for recommendations",
    },
    showAdvanced: {
      control: "boolean",
      description: "Show advanced card types",
    },
    value: {
      control: "select",
      options: [undefined, "one-time", "recurring", "category-locked", "merchant-locked"],
      description: "Currently selected card type",
    },
  },
  args: {
    onSelect: fn(),
  },
} satisfies Meta<typeof CardTypeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default - basic two options */
export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[400px]">
        <CardTypeSelector value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** Trial context - One-Time recommended */
export const TrialContext: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[400px]">
        <CardTypeSelector context="trial" value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** Subscription context - Recurring recommended */
export const SubscriptionContext: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[400px]">
        <CardTypeSelector context="subscription" value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** General context - no recommendation */
export const GeneralContext: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[400px]">
        <CardTypeSelector context="general" value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** With advanced options (all 4 card types) */
export const WithAdvancedOptions: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[500px]">
        <CardTypeSelector showAdvanced value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** Pre-selected value */
export const PreSelected: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType>("recurring");
    return (
      <div className="w-[400px]">
        <CardTypeSelector value={value} onSelect={setValue} />
      </div>
    );
  },
};

/** Interactive with selection display */
export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState<CardType | undefined>();
    return (
      <div className="w-[400px] space-y-4">
        <CardTypeSelector value={value} onSelect={setValue} />
        <p className="text-sm text-muted-foreground">
          Selected: {value || "None"}
        </p>
      </div>
    );
  },
};

/** Context comparison - all three side by side */
export const ContextComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-2">Trial Context (One-Time recommended)</p>
        <div className="w-[400px]">
          <CardTypeSelector context="trial" onSelect={fn()} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Subscription Context (Recurring recommended)</p>
        <div className="w-[400px]">
          <CardTypeSelector context="subscription" onSelect={fn()} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">General Context (No recommendation)</p>
        <div className="w-[400px]">
          <CardTypeSelector context="general" onSelect={fn()} />
        </div>
      </div>
    </div>
  ),
};
