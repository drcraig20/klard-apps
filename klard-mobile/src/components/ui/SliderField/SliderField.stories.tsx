import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Platform } from 'react-native';
import { SliderField } from './SliderField';

/**
 * SliderField provides a native slider experience with platform-specific implementations
 * (SwiftUI Slider on iOS, Community Slider on Android). It supports custom ranges,
 * step values, labels, and value display.
 *
 * Note: In web Storybook, a mock slider is displayed. Native sliders require device testing.
 */
const meta: Meta<typeof SliderField> = {
  title: 'Form/SliderField',
  component: SliderField,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum slider value',
    },
    max: {
      control: 'number',
      description: 'Maximum slider value',
    },
    step: {
      control: 'number',
      description: 'Step increment value',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the slider',
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value next to label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the slider',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, minWidth: 300 }}>
        <Story />
        {Platform.OS === 'web' && (
          <Text style={{ color: '#64748B', fontSize: 12, fontStyle: 'italic' }}>
            Note: Native sliders only work on iOS/Android devices.
          </Text>
        )}
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default slider
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <SliderField
        value={value}
        onChange={setValue}
      />
    );
  },
};

// With label
export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <SliderField
        label="Volume"
        value={value}
        onChange={setValue}
      />
    );
  },
};

// With value display
export const WithValueDisplay: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <SliderField
        label="Brightness"
        value={value}
        onChange={setValue}
        showValue
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState(75);
    return (
      <SliderField
        label="Locked Setting"
        value={value}
        onChange={setValue}
        showValue
        disabled
      />
    );
  },
};

// Custom range (0-100)
export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return (
      <SliderField
        label="Progress"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        showValue
      />
    );
  },
};

// Budget slider (currency range)
export const BudgetSlider: Story = {
  render: () => {
    const [value, setValue] = useState(500);
    return (
      <View style={{ gap: 8 }}>
        <SliderField
          label="Monthly Budget"
          value={value}
          onChange={setValue}
          min={0}
          max={2000}
          step={50}
          showValue
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          ${value.toFixed(2)} / month
        </Text>
      </View>
    );
  },
};

// Step increment
export const WithStepIncrement: Story = {
  render: () => {
    const [value, setValue] = useState(10);
    return (
      <View style={{ gap: 8 }}>
        <SliderField
          label="Quantity (step: 5)"
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={5}
          showValue
        />
      </View>
    );
  },
};

// Small range (1-10)
export const SmallRange: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return (
      <SliderField
        label="Rating (1-10)"
        value={value}
        onChange={setValue}
        min={1}
        max={10}
        step={1}
        showValue
      />
    );
  },
};

// Percentage slider
export const PercentageSlider: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <View style={{ gap: 8 }}>
        <SliderField
          label="Completion"
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
          showValue
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          {value}% complete
        </Text>
      </View>
    );
  },
};

// Temperature slider
export const TemperatureSlider: Story = {
  render: () => {
    const [value, setValue] = useState(72);
    return (
      <View style={{ gap: 8 }}>
        <SliderField
          label="Temperature"
          value={value}
          onChange={setValue}
          min={60}
          max={90}
          step={1}
          showValue
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          {value}F ({Math.round((value - 32) * 5 / 9)}C)
        </Text>
      </View>
    );
  },
};

// Without label
export const WithoutLabel: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <SliderField
        value={value}
        onChange={setValue}
      />
    );
  },
};

// Multiple sliders (audio mixer)
export const AudioMixer: Story = {
  render: () => {
    const [master, setMaster] = useState(80);
    const [music, setMusic] = useState(60);
    const [effects, setEffects] = useState(40);
    const [voice, setVoice] = useState(70);

    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontWeight: '600', color: '#0F172A', fontSize: 16 }}>
          Audio Mixer
        </Text>
        <SliderField
          label="Master Volume"
          value={master}
          onChange={setMaster}
          showValue
        />
        <SliderField
          label="Music"
          value={music}
          onChange={setMusic}
          showValue
        />
        <SliderField
          label="Sound Effects"
          value={effects}
          onChange={setEffects}
          showValue
        />
        <SliderField
          label="Voice Chat"
          value={voice}
          onChange={setVoice}
          showValue
        />
      </View>
    );
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <View style={{ gap: 16 }}>
        <SliderField
          label="Default State"
          value={value}
          onChange={setValue}
          showValue
        />
        <SliderField
          label="With Label Only"
          value={value}
          onChange={setValue}
        />
        <SliderField
          value={value}
          onChange={setValue}
          showValue
        />
        <SliderField
          label="Disabled State"
          value={75}
          onChange={() => {}}
          showValue
          disabled
        />
      </View>
    );
  },
};
