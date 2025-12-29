import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Slider } from "./slider";
import { Label } from "./label";

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slider component for selecting values from a range. Supports single and range selection, custom min/max, step values, and disabled states. Built on Radix UI primitives.",
      },
    },
  },
  argTypes: {
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Disables the slider",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default slider
export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 1,
  },
};

// Range slider (two thumbs)
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    min: 0,
    step: 1,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    disabled: true,
  },
};

// Custom min/max
export const CustomRange: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 200,
    step: 10,
  },
};

// Custom step
export const CustomStep: Story = {
  args: {
    defaultValue: [25],
    min: 0,
    max: 100,
    step: 25,
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    defaultValue: [50],
    orientation: "vertical",
    className: "h-48",
  },
};

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <Label>Volume</Label>
      <Slider defaultValue={[50]} max={100} min={0} step={1} />
    </div>
  ),
};

// With value display
export const WithValueDisplay: Story = {
  render: function WithValueDisplayRender() {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Brightness</Label>
          <span className="text-muted-foreground text-sm">{value[0]}%</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={1}
        />
      </div>
    );
  },
};

// Range slider with values
export const RangeWithValues: Story = {
  render: function RangeWithValuesRender() {
    const [value, setValue] = React.useState([25, 75]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-muted-foreground text-sm">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={1}
        />
      </div>
    );
  },
};

// Temperature example
export const Temperature: Story = {
  render: function TemperatureRender() {
    const [value, setValue] = React.useState([22]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Temperature</Label>
          <span className="text-muted-foreground text-sm">{value[0]}C</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={30}
          min={16}
          step={0.5}
        />
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>16C</span>
          <span>30C</span>
        </div>
      </div>
    );
  },
};

// Budget slider (with formatted values)
export const Budget: Story = {
  render: function BudgetRender() {
    const [value, setValue] = React.useState([500]);
    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Monthly Budget</Label>
          <span className="text-sm font-medium">{formatCurrency(value[0])}</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          max={1000}
          min={0}
          step={50}
        />
        <div className="text-muted-foreground flex justify-between text-xs">
          <span>$0</span>
          <span>$1,000</span>
        </div>
      </div>
    );
  },
};

// Vertical with value
export const VerticalWithValue: Story = {
  render: function VerticalWithValueRender() {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="flex items-center gap-4">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={1}
          orientation="vertical"
          className="h-48"
        />
        <div className="text-center">
          <p className="text-2xl font-bold">{value[0]}</p>
          <p className="text-muted-foreground text-sm">Volume</p>
        </div>
      </div>
    );
  },
};

// Multiple sliders form
export const AudioMixer: Story = {
  render: function AudioMixerRender() {
    const [master, setMaster] = React.useState([80]);
    const [music, setMusic] = React.useState([60]);
    const [effects, setEffects] = React.useState([40]);
    const [voice, setVoice] = React.useState([100]);

    return (
      <div className="w-64 space-y-6">
        <h3 className="text-sm font-medium">Audio Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Master</Label>
              <span className="text-muted-foreground text-xs">{master[0]}%</span>
            </div>
            <Slider value={master} onValueChange={setMaster} max={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Music</Label>
              <span className="text-muted-foreground text-xs">{music[0]}%</span>
            </div>
            <Slider value={music} onValueChange={setMusic} max={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Effects</Label>
              <span className="text-muted-foreground text-xs">{effects[0]}%</span>
            </div>
            <Slider value={effects} onValueChange={setEffects} max={100} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Voice</Label>
              <span className="text-muted-foreground text-xs">{voice[0]}%</span>
            </div>
            <Slider value={voice} onValueChange={setVoice} max={100} />
          </div>
        </div>
      </div>
    );
  },
};

// States comparison
export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label>Default</Label>
        <Slider defaultValue={[50]} max={100} />
      </div>
      <div className="space-y-2">
        <Label>Range</Label>
        <Slider defaultValue={[25, 75]} max={100} />
      </div>
      <div className="space-y-2">
        <Label className="opacity-50">Disabled</Label>
        <Slider defaultValue={[50]} max={100} disabled />
      </div>
    </div>
  ),
};
