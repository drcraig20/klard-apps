import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { ProgressBar, type ProgressBarVariant, type ProgressBarSize } from './ProgressBar';
import { Button } from '../Button';

/**
 * ProgressBar component displays progress as a horizontal bar.
 * It supports different variants (colors), sizes, labels, and
 * animated transitions when the value changes.
 */
const meta: Meta<typeof ProgressBar> = {
  title: 'Layout/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value (default: 100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Color variant of the progress bar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height of the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animation when value changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A progress bar component for showing completion status with multiple variants and sizes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 24 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress bar
export const Default: Story = {
  args: {
    value: 60,
    variant: 'default',
    size: 'md',
  },
};

// With percentage label
export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

// With custom label
export const WithCustomLabel: Story = {
  args: {
    value: 45,
    label: 'Upload Progress',
    showLabel: true,
  },
};

// Variant showcase
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Default</Text>
        <ProgressBar value={70} variant="default" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Success</Text>
        <ProgressBar value={70} variant="success" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Warning</Text>
        <ProgressBar value={70} variant="warning" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Error</Text>
        <ProgressBar value={70} variant="error" />
      </View>
    </View>
  ),
};

// Size showcase
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Small (sm)</Text>
        <ProgressBar value={60} size="sm" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Medium (md)</Text>
        <ProgressBar value={60} size="md" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Large (lg)</Text>
        <ProgressBar value={60} size="lg" />
      </View>
    </View>
  ),
};

// Progress states
export const ProgressStates: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Empty (0%)</Text>
        <ProgressBar value={0} showLabel />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Quarter (25%)</Text>
        <ProgressBar value={25} showLabel />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Half (50%)</Text>
        <ProgressBar value={50} showLabel />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Three Quarters (75%)</Text>
        <ProgressBar value={75} showLabel />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Complete (100%)</Text>
        <ProgressBar value={100} showLabel variant="success" />
      </View>
    </View>
  ),
};

// Interactive progress
function InteractiveProgressDemo() {
  const [progress, setProgress] = useState(30);

  return (
    <View>
      <ProgressBar value={progress} showLabel label="Progress" />
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <Button
          variant="outline"
          size="sm"
          onPress={() => setProgress(Math.max(0, progress - 10))}
        >
          -10%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => setProgress(Math.min(100, progress + 10))}
        >
          +10%
        </Button>
        <Button
          variant="outline"
          size="sm"
          onPress={() => setProgress(0)}
        >
          Reset
        </Button>
      </View>
    </View>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveProgressDemo />,
};

// Animated progress simulation
function AnimatedProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 15;
          return Math.min(100, next);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const handleStart = () => {
    setProgress(0);
    setIsRunning(true);
  };

  const variant: ProgressBarVariant =
    progress === 100 ? 'success' : progress > 80 ? 'warning' : 'default';

  return (
    <View>
      <ProgressBar
        value={progress}
        showLabel
        label="Download Progress"
        variant={variant}
      />
      <View style={{ marginTop: 16 }}>
        <Button
          onPress={handleStart}
          disabled={isRunning && progress < 100}
        >
          {progress === 100 ? 'Download Complete!' : isRunning ? 'Downloading...' : 'Start Download'}
        </Button>
      </View>
    </View>
  );
}

export const AnimatedProgress: Story = {
  render: () => <AnimatedProgressDemo />,
};

// Budget usage example
export const BudgetUsage: Story = {
  render: () => {
    const spent = 750;
    const budget = 1000;
    const percentage = (spent / budget) * 100;
    const variant: ProgressBarVariant =
      percentage >= 90 ? 'error' : percentage >= 75 ? 'warning' : 'default';

    return (
      <View>
        <ProgressBar
          value={spent}
          max={budget}
          variant={variant}
          label={`$${spent} of $${budget} spent`}
          showLabel
        />
      </View>
    );
  },
};

// Subscription limit example
export const SubscriptionLimit: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Subscriptions</Text>
        <ProgressBar value={8} max={10} label="8 of 10 slots used" showLabel />
      </View>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Storage</Text>
        <ProgressBar value={4.2} max={5} label="4.2 GB of 5 GB" showLabel variant="warning" />
      </View>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>API Calls</Text>
        <ProgressBar value={950} max={1000} label="950 of 1000" showLabel variant="error" />
      </View>
    </View>
  ),
};
