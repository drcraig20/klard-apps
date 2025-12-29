import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./date-picker";

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Date picker component with calendar popover, date range constraints, and multiple display modes. Built on shadcn/ui Calendar and Popover.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the picker",
    },
    error: {
      control: "text",
      description: "Error message - displays in red below picker",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no date selected",
    },
    mode: {
      control: "select",
      options: ["date", "time", "datetime"],
      description: "Selection mode for display formatting",
    },
    disabled: {
      control: "boolean",
      description: "Disables the picker",
    },
    required: {
      control: "boolean",
      description: "Shows required asterisk after label",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default date picker
export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Select Date",
    placeholder: "Pick a date",
  },
};

// With pre-selected date
export const WithValue: Story = {
  args: {
    value: new Date(2024, 11, 25),
    onChange: () => {},
    label: "Event Date",
  },
};

// With error state
export const WithError: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Due Date",
    error: "Please select a valid date",
  },
};

// Required field
export const Required: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Birth Date",
    placeholder: "Select your birth date",
    required: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: new Date(2024, 11, 25),
    onChange: () => {},
    label: "Locked Date",
    disabled: true,
  },
};

// With minimum date
export const WithMinDate: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Future Date",
    placeholder: "Select a future date",
    minDate: new Date(),
  },
};

// With maximum date
export const WithMaxDate: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Past Date",
    placeholder: "Select a past date",
    maxDate: new Date(),
  },
};

// With date range (min and max)
export const WithDateRange: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Appointment Date",
    placeholder: "Select within range",
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    value: null,
    onChange: () => {},
    label: "Start Date",
    placeholder: "When does it start?",
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="max-w-sm">
      <DatePicker
        value={date}
        onChange={setDate}
        label="Interactive Date"
        placeholder="Pick a date"
      />
      {date && (
        <p className="mt-4 text-sm text-slate-600">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Booking form example
const BookingFormTemplate = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const today = new Date();

  return (
    <div className="space-y-4 max-w-sm">
      <DatePicker
        value={checkIn}
        onChange={setCheckIn}
        label="Check-in Date"
        placeholder="Select check-in"
        minDate={today}
        required
      />
      <DatePicker
        value={checkOut}
        onChange={setCheckOut}
        label="Check-out Date"
        placeholder="Select check-out"
        minDate={checkIn ?? today}
        required
      />
    </div>
  );
};

export const BookingFormExample: Story = {
  render: () => <BookingFormTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <DatePicker
        value={null}
        onChange={() => {}}
        label="Default"
        placeholder="Pick a date"
      />
      <DatePicker
        value={new Date(2024, 11, 25)}
        onChange={() => {}}
        label="With Value"
      />
      <DatePicker
        value={null}
        onChange={() => {}}
        label="With Error"
        error="Date is required"
      />
      <DatePicker
        value={null}
        onChange={() => {}}
        label="Required"
        required
      />
      <DatePicker
        value={new Date()}
        onChange={() => {}}
        label="Disabled"
        disabled
      />
      <DatePicker
        value={null}
        onChange={() => {}}
        label="Future Only"
        placeholder="Future dates only"
        minDate={new Date()}
      />
    </div>
  ),
};
