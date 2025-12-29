import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper, type Step } from "./stepper";

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A stepper component for displaying progress through a sequence of steps. Supports horizontal and vertical orientations with step descriptions.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the stepper",
    },
    currentStep: {
      control: { type: "number", min: 0, max: 4 },
      description: "Current active step (0-indexed)",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic steps
const basicSteps: Step[] = [
  { label: "Account" },
  { label: "Details" },
  { label: "Review" },
  { label: "Complete" },
];

// Steps with descriptions
const detailedSteps: Step[] = [
  { label: "Account", description: "Create your account" },
  { label: "Personal Info", description: "Provide your details" },
  { label: "Verification", description: "Verify your identity" },
  { label: "Complete", description: "All done!" },
];

// Default stepper
export const Default: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    orientation: "horizontal",
  },
};

// At first step
export const FirstStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 0,
    orientation: "horizontal",
  },
};

// Middle step
export const MiddleStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    orientation: "horizontal",
  },
};

// Last step
export const LastStep: Story = {
  args: {
    steps: basicSteps,
    currentStep: 3,
    orientation: "horizontal",
  },
};

// All completed
export const AllCompleted: Story = {
  args: {
    steps: basicSteps,
    currentStep: 4,
    orientation: "horizontal",
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
    orientation: "horizontal",
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
    orientation: "vertical",
  },
};

// Vertical all steps
export const VerticalProgress: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 2,
    orientation: "vertical",
  },
};

// Interactive stepper
export const Interactive: Story = {
  render: function Render() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps: Step[] = [
      { label: "Step 1", description: "First step" },
      { label: "Step 2", description: "Second step" },
      { label: "Step 3", description: "Third step" },
      { label: "Step 4", description: "Final step" },
    ];

    const canGoBack = currentStep > 0;
    const canGoForward = currentStep < steps.length;
    const isComplete = currentStep >= steps.length;

    return (
      <div className="flex flex-col gap-6 max-w-2xl">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="p-4 border rounded-md">
          {isComplete ? (
            <p className="text-center text-green-600 font-medium">
              All steps completed!
            </p>
          ) : (
            <p className="text-center text-muted-foreground">
              Currently on: {steps[currentStep]?.label}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={!canGoBack}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={!canGoForward}
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    );
  },
};

// Interactive vertical
export const InteractiveVertical: Story = {
  render: function Render() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps: Step[] = [
      { label: "Create Account", description: "Sign up with your email" },
      { label: "Verify Email", description: "Check your inbox for verification" },
      { label: "Set Password", description: "Create a secure password" },
      { label: "Complete Profile", description: "Add your personal information" },
    ];

    return (
      <div className="flex gap-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
        />

        <div className="flex-1 flex flex-col gap-4">
          <div className="p-4 border rounded-md flex-1">
            <h3 className="font-medium mb-2">
              {currentStep < steps.length
                ? steps[currentStep].label
                : "Complete!"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentStep < steps.length
                ? steps[currentStep].description
                : "All steps have been completed successfully."}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
              disabled={currentStep >= steps.length}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Three steps
export const ThreeSteps: Story = {
  args: {
    steps: [
      { label: "Start" },
      { label: "Process" },
      { label: "End" },
    ],
    currentStep: 1,
    orientation: "horizontal",
  },
};

// Five steps
export const FiveSteps: Story = {
  args: {
    steps: [
      { label: "Cart" },
      { label: "Shipping" },
      { label: "Payment" },
      { label: "Review" },
      { label: "Confirm" },
    ],
    currentStep: 2,
    orientation: "horizontal",
  },
};

// With explicit status
export const WithExplicitStatus: Story = {
  args: {
    steps: [
      { label: "Step 1", status: "completed" as const },
      { label: "Step 2", status: "completed" as const },
      { label: "Step 3", status: "current" as const },
      { label: "Step 4", status: "upcoming" as const },
    ],
    currentStep: 0, // Will be overridden by explicit status
    orientation: "horizontal",
  },
};

// Custom aria label
export const WithCustomAriaLabel: Story = {
  args: {
    steps: basicSteps,
    currentStep: 1,
    orientation: "horizontal",
    ariaLabel: "Account creation progress",
  },
};

// Orientation comparison
export const OrientationComparison: Story = {
  render: function Render() {
    const steps: Step[] = [
      { label: "Step 1", description: "First step" },
      { label: "Step 2", description: "Second step" },
      { label: "Step 3", description: "Third step" },
    ];

    return (
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Horizontal</p>
          <Stepper steps={steps} currentStep={1} orientation="horizontal" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-4">Vertical</p>
          <Stepper steps={steps} currentStep={1} orientation="vertical" />
        </div>
      </div>
    );
  },
};

// Empty steps (edge case)
export const EmptySteps: Story = {
  args: {
    steps: [],
    currentStep: 0,
    orientation: "horizontal",
  },
};

// Long labels
export const LongLabels: Story = {
  args: {
    steps: [
      { label: "Personal Information", description: "Enter your personal details" },
      { label: "Contact Details", description: "How can we reach you?" },
      { label: "Employment History", description: "Your work experience" },
      { label: "Final Review", description: "Review and submit" },
    ],
    currentStep: 1,
    orientation: "horizontal",
  },
};
