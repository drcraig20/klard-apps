import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SliderField } from "./slider-field";

const meta = {
  title: "Forms/SliderField",
  component: SliderField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slider input for selecting numeric values within a range. Supports labels, value display, custom min/max/step, and disabled state. Built on Radix UI Slider.",
      },
    },
  },
  argTypes: {
    value: {
      control: "number",
      description: "Current slider value",
    },
    min: {
      control: "number",
      description: "Minimum value (default: 0)",
    },
    max: {
      control: "number",
      description: "Maximum value (default: 100)",
    },
    step: {
      control: "number",
      description: "Step increment (default: 1)",
    },
    label: {
      control: "text",
      description: "Label text displayed above slider",
    },
    showValue: {
      control: "boolean",
      description: "Show current value next to label",
    },
    disabled: {
      control: "boolean",
      description: "Disables the slider",
    },
  },
} satisfies Meta<typeof SliderField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default slider
export const Default: Story = {
  args: {
    value: 50,
    onChange: () => {},
    label: "Volume",
  },
};

// With value display
export const WithValueDisplay: Story = {
  args: {
    value: 75,
    onChange: () => {},
    label: "Brightness",
    showValue: true,
  },
};

// Custom range (0-10)
export const CustomRange: Story = {
  args: {
    value: 5,
    onChange: () => {},
    min: 0,
    max: 10,
    label: "Rating",
    showValue: true,
  },
};

// Large range (0-1000)
export const LargeRange: Story = {
  args: {
    value: 500,
    onChange: () => {},
    min: 0,
    max: 1000,
    step: 50,
    label: "Budget",
    showValue: true,
  },
};

// Custom step
export const CustomStep: Story = {
  args: {
    value: 25,
    onChange: () => {},
    min: 0,
    max: 100,
    step: 25,
    label: "Quality",
    showValue: true,
  },
};

// Decimal step
export const DecimalStep: Story = {
  args: {
    value: 0.5,
    onChange: () => {},
    min: 0,
    max: 1,
    step: 0.1,
    label: "Opacity",
    showValue: true,
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    value: 50,
    onChange: () => {},
    showValue: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: 30,
    onChange: () => {},
    label: "Locked setting",
    showValue: true,
    disabled: true,
  },
};

// Minimum value
export const AtMinimum: Story = {
  args: {
    value: 0,
    onChange: () => {},
    label: "Volume",
    showValue: true,
  },
};

// Maximum value
export const AtMaximum: Story = {
  args: {
    value: 100,
    onChange: () => {},
    label: "Volume",
    showValue: true,
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [value, setValue] = useState(50);
  return (
    <div className="space-y-4 max-w-md">
      <SliderField
        value={value}
        onChange={setValue}
        label="Interactive Slider"
        showValue
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Current value: {value}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Volume control example
const VolumeControlTemplate = () => {
  const [volume, setVolume] = useState(75);

  return (
    <div className="space-y-4 max-w-md p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <SliderField
        value={volume}
        onChange={setVolume}
        label="Volume"
        showValue
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>Mute</span>
        <span>Max</span>
      </div>
    </div>
  );
};

export const VolumeControlExample: Story = {
  render: () => <VolumeControlTemplate />,
};

// Price range filter example
const PriceRangeTemplate = () => {
  const [price, setPrice] = useState(250);

  return (
    <div className="space-y-4 max-w-md">
      <SliderField
        value={price}
        onChange={setPrice}
        min={0}
        max={1000}
        step={10}
        label="Max Price"
        showValue
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing products under ${price}
      </p>
    </div>
  );
};

export const PriceRangeExample: Story = {
  render: () => <PriceRangeTemplate />,
};

// Settings panel example
const SettingsPanelTemplate = () => {
  const [brightness, setBrightness] = useState(70);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(100);

  return (
    <div className="space-y-6 max-w-md p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Display Settings
      </h3>
      <SliderField
        value={brightness}
        onChange={setBrightness}
        label="Brightness"
        showValue
      />
      <SliderField
        value={contrast}
        onChange={setContrast}
        label="Contrast"
        showValue
      />
      <SliderField
        value={saturation}
        onChange={setSaturation}
        min={0}
        max={200}
        label="Saturation"
        showValue
      />
    </div>
  );
};

export const SettingsPanelExample: Story = {
  render: () => <SettingsPanelTemplate />,
};

// Rating selector example
const RatingSelectorTemplate = () => {
  const [rating, setRating] = useState(3);
  const labels = ["Terrible", "Poor", "Fair", "Good", "Excellent"];

  return (
    <div className="space-y-4 max-w-md">
      <SliderField
        value={rating}
        onChange={setRating}
        min={1}
        max={5}
        step={1}
        label="Rate your experience"
        showValue
      />
      <p className="text-center text-lg font-medium text-slate-900 dark:text-slate-100">
        {labels[rating - 1]}
      </p>
    </div>
  );
};

export const RatingSelectorExample: Story = {
  render: () => <RatingSelectorTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <SliderField
        value={50}
        onChange={() => {}}
        label="Default"
      />
      <SliderField
        value={75}
        onChange={() => {}}
        label="With Value"
        showValue
      />
      <SliderField
        value={5}
        onChange={() => {}}
        min={0}
        max={10}
        label="Custom Range (0-10)"
        showValue
      />
      <SliderField
        value={50}
        onChange={() => {}}
        step={25}
        label="Custom Step (25)"
        showValue
      />
      <SliderField
        value={30}
        onChange={() => {}}
        label="Disabled"
        showValue
        disabled
      />
    </div>
  ),
};
