import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmButton } from "./confirm-button";

const action = (name: string) => () => console.log(`Action: ${name}`);

const meta = {
  title: "Actions/ConfirmButton",
  component: ConfirmButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Two-step confirmation button for destructive actions. Click once to reveal confirmation options, auto-resets after timeout.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["destructive", "warning"],
      description: "Visual variant",
    },
    confirmText: {
      control: "text",
      description: "Text shown in confirmation state",
    },
    resetTimeout: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "Time before auto-reset (ms)",
    },
    children: {
      control: "text",
      description: "Button label",
    },
  },
  args: {
    onConfirm: action("onConfirm"),
  },
} satisfies Meta<typeof ConfirmButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default destructive button */
export const Default: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

/** Warning variant */
export const WarningVariant: Story = {
  args: {
    children: "Remove",
    variant: "warning",
  },
};

/** Custom confirmation text */
export const CustomConfirmText: Story = {
  args: {
    children: "Delete",
    confirmText: "Really delete?",
    variant: "destructive",
  },
};

/** Quick reset (2 seconds) */
export const QuickReset: Story = {
  args: {
    children: "Delete",
    resetTimeout: 2000,
    variant: "destructive",
  },
};

/** Archive action */
export const Archive: Story = {
  args: {
    children: "Archive",
    variant: "warning",
    confirmText: "Archive this item?",
  },
};

/** Cancel subscription */
export const CancelSubscription: Story = {
  args: {
    children: "Cancel Subscription",
    variant: "destructive",
    confirmText: "Cancel your subscription?",
  },
};
