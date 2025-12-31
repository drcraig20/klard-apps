import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./calendar";

const meta = {
  title: "Forms/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Calendar component built on react-day-picker with Klard styling. Supports single date selection, date ranges, and multiple selection modes.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
      description: "Selection mode for the calendar",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days from adjacent months",
    },
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "default"],
      description: "Variant for navigation buttons",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default single date selection
export const Default: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
  },
};

// With pre-selected date
const WithSelectedTemplate = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
};

export const WithSelectedDate: Story = {
  render: () => <WithSelectedTemplate />,
};

// Date range selection
const DateRangeTemplate = () => {
  const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>({
    from: new Date(2024, 11, 15),
    to: new Date(2024, 11, 25),
  });
  return (
    <div className="space-y-4">
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />
      {range?.from && (
        <p className="text-sm text-muted-foreground">
          Selected: {range.from.toLocaleDateString()}
          {range.to && ` - ${range.to.toLocaleDateString()}`}
        </p>
      )}
    </div>
  );
};

export const DateRange: Story = {
  render: () => <DateRangeTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Calendar in range mode for selecting a date range (e.g., booking check-in/check-out).",
      },
    },
  },
};

// Multiple dates selection
const MultipleDatesTemplate = () => {
  const [dates, setDates] = useState<Date[] | undefined>([
    new Date(2024, 11, 10),
    new Date(2024, 11, 15),
    new Date(2024, 11, 20),
  ]);
  return (
    <div className="space-y-4">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
      />
      {dates && dates.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Selected {dates.length} date(s)
        </p>
      )}
    </div>
  );
};

export const MultipleDates: Story = {
  render: () => <MultipleDatesTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Calendar in multiple mode for selecting multiple individual dates.",
      },
    },
  },
};

// With disabled dates
const WithDisabledDatesTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  const disabledDays = [
    new Date(2024, 11, 25), // Christmas
    new Date(2024, 11, 31), // New Year's Eve
    { dayOfWeek: [0, 6] }, // Weekends
  ];
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disabledDays}
    />
  );
};

export const WithDisabledDates: Story = {
  render: () => <WithDisabledDatesTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with specific dates and weekends disabled.",
      },
    },
  },
};

// With minimum and maximum dates
const WithDateBoundsTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  const today = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(today.getDate() + 14);

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: today, after: twoWeeksFromNow }}
      />
      <p className="text-sm text-muted-foreground">
        Only dates within the next 2 weeks are selectable
      </p>
    </div>
  );
};

export const WithDateBounds: Story = {
  render: () => <WithDateBoundsTemplate />,
};

// Without outside days
export const WithoutOutsideDays: Story = {
  args: {
    mode: "single",
    showOutsideDays: false,
  },
};

// Two months display
const TwoMonthsTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
    />
  );
};

export const TwoMonths: Story = {
  render: () => <TwoMonthsTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Calendar displaying two months side by side.",
      },
    },
  },
};

// With week numbers
const WithWeekNumbersTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showWeekNumber
    />
  );
};

export const WithWeekNumbers: Story = {
  render: () => <WithWeekNumbersTemplate />,
  parameters: {
    docs: {
      description: {
        story: "Calendar showing ISO week numbers.",
      },
    },
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
      />
      {date ? (
        <p className="text-sm text-muted-foreground">
          Selected: {date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click a date to select
        </p>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// All modes showcase
export const AllModes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">Single</p>
        <Calendar mode="single" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Range</p>
        <Calendar
          mode="range"
          selected={{
            from: new Date(2024, 11, 10),
            to: new Date(2024, 11, 20),
          }}
        />
      </div>
    </div>
  ),
};
