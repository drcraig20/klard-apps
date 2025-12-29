import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox component for binary choices. Supports checked, unchecked, indeterminate, and disabled states. Built on Radix UI primitives.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Shows error state styling",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default unchecked
export const Default: Story = {
  args: {},
};

// Checked state
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

// Disabled unchecked
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

// Indeterminate state
export const Indeterminate: Story = {
  render: function IndeterminateRender() {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(
      "indeterminate"
    );
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          onCheckedChange={(value) =>
            setChecked(value === "indeterminate" ? "indeterminate" : value)
          }
        />
        <Label>Indeterminate (click to cycle)</Label>
      </div>
    );
  },
};

// Error state
export const Error: Story = {
  args: {
    "aria-invalid": true,
  },
};

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

// With label and description
export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="marketing" className="mt-0.5" />
      <div className="space-y-1">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-muted-foreground text-sm">
          Receive updates about new features and promotions.
        </p>
      </div>
    </div>
  ),
};

// Disabled with label
export const DisabledWithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled" className="opacity-50">
        Disabled option
      </Label>
    </div>
  ),
};

// Controlled checkbox
export const Controlled: Story = {
  render: function ControlledRender() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <p className="text-muted-foreground text-sm">
          State: {checked ? "Checked" : "Unchecked"}
        </p>
      </div>
    );
  },
};

// States comparison
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-state" disabled />
        <Label htmlFor="disabled-state" className="opacity-50">
          Disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled-checked-state" disabled defaultChecked />
        <Label htmlFor="disabled-checked-state" className="opacity-50">
          Disabled Checked
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="error-state" aria-invalid />
        <Label htmlFor="error-state">Error</Label>
      </div>
    </div>
  ),
};

// Form example with multiple checkboxes
export const FormExample: Story = {
  render: () => (
    <fieldset className="space-y-4">
      <legend className="mb-2 text-sm font-medium">Notification preferences</legend>
      <div className="flex items-center gap-2">
        <Checkbox id="email-notifications" defaultChecked />
        <Label htmlFor="email-notifications">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="sms-notifications" />
        <Label htmlFor="sms-notifications">SMS notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="push-notifications" defaultChecked />
        <Label htmlFor="push-notifications">Push notifications</Label>
      </div>
    </fieldset>
  ),
};

// Select all example
export const SelectAll: Story = {
  render: function SelectAllRender() {
    const [items, setItems] = React.useState([
      { id: "item1", label: "Item 1", checked: true },
      { id: "item2", label: "Item 2", checked: false },
      { id: "item3", label: "Item 3", checked: true },
    ]);

    const allChecked = items.every((item) => item.checked);
    const someChecked = items.some((item) => item.checked);
    const selectAllState: boolean | "indeterminate" = allChecked
      ? true
      : someChecked
        ? "indeterminate"
        : false;

    const handleSelectAll = (checked: boolean | "indeterminate") => {
      if (checked === "indeterminate") return;
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleItemChange = (id: string, checked: boolean) => {
      setItems(
        items.map((item) => (item.id === id ? { ...item, checked } : item))
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Checkbox
            id="select-all"
            checked={selectAllState}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            Select all
          </Label>
        </div>
        <div className="space-y-2 pl-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(checked) =>
                  handleItemChange(item.id, checked === true)
                }
              />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
