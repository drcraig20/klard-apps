import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Stepper, type Step } from './Stepper';
import { Button } from '../Button';

/**
 * Stepper component displays progress through a multi-step process.
 * It supports horizontal and vertical orientations, step descriptions,
 * and automatic state calculation based on current step index.
 */
const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Zero-indexed current step',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the stepper',
    },
    steps: {
      control: 'object',
      description: 'Array of steps with label, description, and optional status',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A progress stepper for multi-step flows like onboarding, checkout, or forms.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic steps
const basicSteps: Step[] = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Payment' },
  { label: 'Review' },
];

// Steps with descriptions
const stepsWithDescriptions: Step[] = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Payment', description: 'Add payment method' },
  { label: 'Review', description: 'Confirm details' },
];

// Interactive wrapper
function StepperDemo({
  steps,
  orientation = 'horizontal',
}: {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        orientation={orientation}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          marginTop: 24,
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outline"
          onPress={handlePrev}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onPress={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </View>
      <View
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#666', textAlign: 'center' }}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
        </Text>
      </View>
    </View>
  );
}

// Default horizontal stepper
export const Default: Story = {
  render: () => <StepperDemo steps={basicSteps} />,
};

// With descriptions
export const WithDescriptions: Story = {
  render: () => <StepperDemo steps={stepsWithDescriptions} />,
};

// Vertical orientation
export const Vertical: Story = {
  render: () => <StepperDemo steps={stepsWithDescriptions} orientation="vertical" />,
};

// Static examples at different states
export const FirstStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 0,
    orientation: 'horizontal',
  },
};

export const MiddleStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    orientation: 'horizontal',
  },
};

export const LastStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 3,
    orientation: 'horizontal',
  },
};

// Three step flow
const threeSteps: Step[] = [
  { label: 'Select', description: 'Choose subscription' },
  { label: 'Configure', description: 'Set limits and alerts' },
  { label: 'Confirm', description: 'Review and save' },
];

export const ThreeSteps: Story = {
  render: () => <StepperDemo steps={threeSteps} />,
};

// Onboarding flow
const onboardingSteps: Step[] = [
  { label: 'Welcome', description: 'Get started with Klard' },
  { label: 'Connect Bank', description: 'Link your accounts' },
  { label: 'Import', description: 'Import subscriptions' },
  { label: 'Customize', description: 'Set your preferences' },
  { label: 'Done', description: 'Ready to save!' },
];

export const OnboardingFlow: Story = {
  render: () => <StepperDemo steps={onboardingSteps} />,
};

// Checkout flow
const checkoutSteps: Step[] = [
  { label: 'Cart' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirm' },
];

export const CheckoutFlow: Story = {
  render: () => <StepperDemo steps={checkoutSteps} />,
};

// Vertical with descriptions
export const VerticalWithDescriptions: Story = {
  render: () => (
    <Stepper
      steps={onboardingSteps}
      currentStep={2}
      orientation="vertical"
    />
  ),
};

// Comparison of orientations
export const OrientationComparison: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 16 }}>
          Horizontal
        </Text>
        <Stepper steps={basicSteps} currentStep={1} orientation="horizontal" />
      </View>
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 16 }}>
          Vertical
        </Text>
        <Stepper
          steps={stepsWithDescriptions}
          currentStep={1}
          orientation="vertical"
        />
      </View>
    </View>
  ),
};
