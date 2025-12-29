import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LayoutGrid, List, Calendar, Clock, Settings, User } from "lucide-react";
import { SegmentedControl, type SegmentedControlOption } from "./segmented-control";

const meta = {
  title: "Navigation/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A segmented control component for switching between mutually exclusive options. Built on top of Radix Tabs with Klard styling.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size variant of the segmented control",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the control should take full width",
    },
    disabled: {
      control: "boolean",
      description: "Disables all options",
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic options for stories
const viewOptions: SegmentedControlOption[] = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
];

const periodOptions: SegmentedControlOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const viewOptionsWithIcons: SegmentedControlOption[] = [
  { value: "grid", label: "Grid", icon: <LayoutGrid className="size-4" /> },
  { value: "list", label: "List", icon: <List className="size-4" /> },
];

// Default story with wrapper for state
export const Default: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Two options
export const TwoOptions: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Three options
export const ThreeOptions: Story = {
  args: {
    value: "weekly",
    onChange: () => {},
    options: periodOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptionsWithIcons,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Multiple icons example
export const MultipleOptionsWithIcons: Story = {
  args: {
    value: "schedule",
    onChange: () => {},
    options: [
      { value: "schedule", label: "Schedule", icon: <Calendar className="size-4" /> },
      { value: "time", label: "Time", icon: <Clock className="size-4" /> },
      { value: "settings", label: "Settings", icon: <Settings className="size-4" /> },
      { value: "profile", label: "Profile", icon: <User className="size-4" /> },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptions,
    size: "sm",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Medium size (default)
export const MediumSize: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptions,
    size: "md",
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    value: "weekly",
    onChange: () => {},
    options: periodOptions,
    fullWidth: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-full max-w-md">
        <SegmentedControl {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// Full width with icons
export const FullWidthWithIcons: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptionsWithIcons,
    fullWidth: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-full max-w-sm">
        <SegmentedControl {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: "grid",
    onChange: () => {},
    options: viewOptions,
    disabled: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: function Render() {
    const [smallValue, setSmallValue] = useState("grid");
    const [mediumValue, setMediumValue] = useState("grid");

    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
          <SegmentedControl
            value={smallValue}
            onChange={setSmallValue}
            options={viewOptionsWithIcons}
            size="sm"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Medium (md) - Default</p>
          <SegmentedControl
            value={mediumValue}
            onChange={setMediumValue}
            options={viewOptionsWithIcons}
            size="md"
          />
        </div>
      </div>
    );
  },
};
