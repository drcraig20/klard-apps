import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Platform } from 'react-native';
import { DatePicker } from './DatePicker';

/**
 * DatePicker provides a native date/time selection experience using platform-specific
 * pickers (SwiftUI on iOS, Jetpack Compose on Android). In Storybook web view,
 * only the trigger button is functional - native pickers require device testing.
 *
 * Note: The actual date picker modal only works on native iOS/Android devices.
 * In the web Storybook, you can see the trigger styling and states.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['date', 'time', 'datetime'],
      description: 'Selection mode - date, time, or both',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the picker',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date selected',
    },
    error: {
      control: 'text',
      description: 'Error message - displays in red below picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the picker',
    },
    required: {
      control: 'boolean',
      description: 'Shows required asterisk after label',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, minWidth: 300 }}>
        <Story />
        {Platform.OS === 'web' && (
          <Text style={{ color: '#64748B', fontSize: 12, fontStyle: 'italic' }}>
            Note: Native picker modals only work on iOS/Android devices.
          </Text>
        )}
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default date picker
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Select Date"
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

// With selected date
export const Filled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        label="Billing Date"
        value={date}
        onChange={setDate}
      />
    );
  },
};

// With error state
export const WithError: Story = {
  render: () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    const [date, setDate] = useState<Date | null>(pastDate);
    return (
      <DatePicker
        label="Start Date"
        value={date}
        onChange={setDate}
        error="Date cannot be in the past"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        label="Fixed Date"
        value={date}
        onChange={setDate}
        disabled
      />
    );
  },
};

// Time picker mode
export const TimePicker: Story = {
  render: () => {
    const [time, setTime] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Reminder Time"
        value={time}
        onChange={setTime}
        mode="time"
        placeholder="Select time"
      />
    );
  },
};

// DateTime picker mode
export const DateTimePicker: Story = {
  render: () => {
    const [dateTime, setDateTime] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Appointment"
        value={dateTime}
        onChange={setDateTime}
        mode="datetime"
        placeholder="Select date and time"
      />
    );
  },
};

// With min date constraint
export const WithMinDate: Story = {
  render: () => {
    const today = new Date();
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Future Date Only"
        value={date}
        onChange={setDate}
        minDate={today}
        placeholder="Select a future date"
      />
    );
  },
};

// With max date constraint
export const WithMaxDate: Story = {
  render: () => {
    const today = new Date();
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Past Date Only"
        value={date}
        onChange={setDate}
        maxDate={today}
        placeholder="Select a past date"
      />
    );
  },
};

// With date range constraint
export const WithDateRange: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 30);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Date Range (+/- 30 days)"
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select within range"
      />
    );
  },
};

// Required field
export const Required: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        label="Birth Date"
        value={date}
        onChange={setDate}
        required
      />
    );
  },
};

// All modes showcase
export const AllModes: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState<Date | null>(new Date());
    const [dateTime, setDateTime] = useState<Date | null>(new Date());

    return (
      <View style={{ gap: 16 }}>
        <DatePicker
          label="Date Only"
          value={date}
          onChange={setDate}
          mode="date"
        />
        <DatePicker
          label="Time Only"
          value={time}
          onChange={setTime}
          mode="time"
        />
        <DatePicker
          label="Date and Time"
          value={dateTime}
          onChange={setDateTime}
          mode="datetime"
        />
      </View>
    );
  },
};

// States showcase
export const AllStates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());

    return (
      <View style={{ gap: 16 }}>
        <DatePicker
          label="Empty State"
          value={null}
          onChange={() => {}}
          placeholder="No date selected"
        />
        <DatePicker
          label="Filled State"
          value={date}
          onChange={setDate}
        />
        <DatePicker
          label="Error State"
          value={date}
          onChange={setDate}
          error="Invalid date selection"
        />
        <DatePicker
          label="Disabled State"
          value={date}
          onChange={setDate}
          disabled
        />
        <DatePicker
          label="Required State"
          value={null}
          onChange={() => {}}
          required
          placeholder="Required field"
        />
      </View>
    );
  },
};
