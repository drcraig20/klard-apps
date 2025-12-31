import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxField } from "./checkbox-field";

const meta = {
  title: "Forms/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox with label and optional description. Supports checked, unchecked, indeterminate, and disabled states. Built on shadcn/ui Checkbox.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    label: {
      control: "text",
      description: "Label text next to checkbox",
    },
    description: {
      control: "text",
      description: "Description text below label",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    indeterminate: {
      control: "boolean",
      description: "Shows indeterminate state (partial selection)",
    },
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default unchecked
export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Accept terms and conditions",
  },
};

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Accept terms and conditions",
  },
};

// With description
export const WithDescription: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Marketing emails",
    description: "Receive emails about new products and promotions",
  },
};

// Checked with description
export const CheckedWithDescription: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Newsletter subscription",
    description: "Get weekly updates delivered to your inbox",
  },
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Unavailable option",
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Required agreement",
    disabled: true,
  },
};

// Disabled with description
export const DisabledWithDescription: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Premium feature",
    description: "Upgrade to access this feature",
    disabled: true,
  },
};

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Select all items",
    indeterminate: true,
  },
};

// Label only (no description)
export const LabelOnly: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Remember me",
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-4">
      <CheckboxField
        checked={checked}
        onChange={setChecked}
        label="Interactive checkbox"
        description="Click to toggle the state"
      />
      <p className="text-sm text-muted-foreground">
        State: {checked ? "Checked" : "Unchecked"}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Terms and conditions example
const TermsExampleTemplate = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  return (
    <div className="space-y-4 max-w-md">
      <CheckboxField
        checked={termsAccepted}
        onChange={setTermsAccepted}
        label="I accept the Terms of Service"
        description="You must accept our terms to create an account"
      />
      <CheckboxField
        checked={marketingOptIn}
        onChange={setMarketingOptIn}
        label="Subscribe to newsletter"
        description="Receive updates about new features and promotions"
      />
      <button
        disabled={!termsAccepted}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Account
      </button>
    </div>
  );
};

export const TermsExample: Story = {
  render: () => <TermsExampleTemplate />,
};

// Select all with indeterminate example
const SelectAllTemplate = () => {
  const [items, setItems] = useState([
    { id: "1", label: "Item 1", checked: true },
    { id: "2", label: "Item 2", checked: false },
    { id: "3", label: "Item 3", checked: true },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked);
  const isIndeterminate = someChecked && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems(items.map((item) => ({ ...item, checked })));
  };

  const handleItemChange = (id: string, checked: boolean) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked } : item
      )
    );
  };

  return (
    <div className="space-y-4 max-w-sm">
      <CheckboxField
        checked={allChecked}
        onChange={handleSelectAll}
        label="Select all"
        indeterminate={isIndeterminate}
      />
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <CheckboxField
            key={item.id}
            checked={item.checked}
            onChange={(checked) => handleItemChange(item.id, checked)}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export const SelectAllExample: Story = {
  render: () => <SelectAllTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <CheckboxField
        checked={false}
        onChange={() => {}}
        label="Unchecked"
      />
      <CheckboxField
        checked={true}
        onChange={() => {}}
        label="Checked"
      />
      <CheckboxField
        checked={false}
        onChange={() => {}}
        label="With Description"
        description="Additional context for the option"
      />
      <CheckboxField
        checked={false}
        onChange={() => {}}
        label="Indeterminate"
        indeterminate
      />
      <CheckboxField
        checked={false}
        onChange={() => {}}
        label="Disabled Unchecked"
        disabled
      />
      <CheckboxField
        checked={true}
        onChange={() => {}}
        label="Disabled Checked"
        disabled
      />
      <CheckboxField
        checked={false}
        onChange={() => {}}
        label="Disabled with Description"
        description="This option is not available"
        disabled
      />
    </div>
  ),
};
