import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Globe, CreditCard, Building } from "lucide-react";
import { SelectField, type SelectOption } from "./select-field";

const meta = {
  title: "Forms/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown select component built on shadcn/ui Select. Supports icons, disabled options, labels, error states, and helper text.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the select",
    },
    error: {
      control: "text",
      description: "Error message - displays in red below select",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the select when no error",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value selected",
    },
    disabled: {
      control: "boolean",
      description: "Disables the select",
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const paymentOptions: SelectOption[] = [
  { value: "credit", label: "Credit Card", icon: <CreditCard className="size-4" /> },
  { value: "bank", label: "Bank Transfer", icon: <Building className="size-4" /> },
  { value: "international", label: "International Wire", icon: <Globe className="size-4" /> },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "disabled", label: "Disabled", disabled: true },
  { value: "archived", label: "Archived" },
];

// Default select
export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country",
  },
};

// With pre-selected value
export const WithValue: Story = {
  args: {
    value: "us",
    onChange: () => {},
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country",
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    value: "",
    onChange: () => {},
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country",
    helperText: "Select your country of residence",
  },
};

// With error state
export const WithError: Story = {
  args: {
    value: "",
    onChange: () => {},
    options: countryOptions,
    label: "Country",
    placeholder: "Select a country",
    error: "Country selection is required",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: "us",
    onChange: () => {},
    options: countryOptions,
    label: "Country",
    disabled: true,
  },
};

// With icons in options
export const WithIcons: Story = {
  args: {
    value: "",
    onChange: () => {},
    options: paymentOptions,
    label: "Payment Method",
    placeholder: "Select payment method",
  },
};

// With disabled option
export const WithDisabledOption: Story = {
  args: {
    value: "",
    onChange: () => {},
    options: statusOptions,
    label: "Status",
    placeholder: "Select status",
    helperText: "Some options may be unavailable",
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-sm">
      <SelectField
        value={value}
        onChange={setValue}
        options={countryOptions}
        label="Interactive Select"
        placeholder="Make a selection"
      />
      {value && (
        <p className="mt-4 text-sm text-muted-foreground">
          Selected: {countryOptions.find((o) => o.value === value)?.label}
        </p>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Form example with multiple selects
const FormExampleTemplate = () => {
  const [country, setCountry] = useState("");
  const [payment, setPayment] = useState("");

  return (
    <div className="space-y-4 max-w-sm">
      <SelectField
        value={country}
        onChange={setCountry}
        options={countryOptions}
        label="Country"
        placeholder="Select country"
        error={!country ? "Country is required" : undefined}
      />
      <SelectField
        value={payment}
        onChange={setPayment}
        options={paymentOptions}
        label="Payment Method"
        placeholder="Select payment"
        helperText="Choose how you'd like to pay"
      />
    </div>
  );
};

export const FormExample: Story = {
  render: () => <FormExampleTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <SelectField
        value=""
        onChange={() => {}}
        options={countryOptions}
        label="Default"
        placeholder="Select..."
      />
      <SelectField
        value="us"
        onChange={() => {}}
        options={countryOptions}
        label="With Value"
      />
      <SelectField
        value=""
        onChange={() => {}}
        options={countryOptions}
        label="With Helper"
        placeholder="Select..."
        helperText="This is helpful context"
      />
      <SelectField
        value=""
        onChange={() => {}}
        options={countryOptions}
        label="With Error"
        error="Selection is required"
      />
      <SelectField
        value="us"
        onChange={() => {}}
        options={countryOptions}
        label="Disabled"
        disabled
      />
      <SelectField
        value=""
        onChange={() => {}}
        options={paymentOptions}
        label="With Icons"
        placeholder="Select payment..."
      />
    </div>
  ),
};
