import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Base progress component from shadcn/ui built on Radix UI Progress primitive. A simpler alternative to ProgressBar for basic progress indicators.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress
export const Default: Story = {
  args: {
    value: 60,
  },
};

// Empty progress
export const Empty: Story = {
  args: {
    value: 0,
  },
};

// Half progress
export const Half: Story = {
  args: {
    value: 50,
  },
};

// Almost complete
export const AlmostComplete: Story = {
  args: {
    value: 90,
  },
};

// Complete
export const Complete: Story = {
  args: {
    value: 100,
  },
};

// With custom width
export const CustomWidth: Story = {
  args: {
    value: 75,
    className: "w-48",
  },
};

// Progress steps example
export const ProgressSteps: Story = {
  render: () => (
    <div className="space-y-6 w-64">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step 1: Account</span>
          <span className="text-muted-foreground">Complete</span>
        </div>
        <Progress value={100} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step 2: Profile</span>
          <span className="text-muted-foreground">In progress</span>
        </div>
        <Progress value={60} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step 3: Preferences</span>
          <span className="text-muted-foreground">Pending</span>
        </div>
        <Progress value={0} />
      </div>
    </div>
  ),
};

// Loading simulation
export const LoadingSimulation: Story = {
  render: () => {
    return (
      <div className="space-y-2 w-64">
        <Progress value={33} />
        <p className="text-sm text-muted-foreground text-center">
          Loading... 33%
        </p>
      </div>
    );
  },
};

// Multiple progress bars
export const MultipleProgressBars: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <span className="text-sm">JavaScript</span>
        <Progress value={85} className="mt-1" />
      </div>
      <div>
        <span className="text-sm">TypeScript</span>
        <Progress value={72} className="mt-1" />
      </div>
      <div>
        <span className="text-sm">React</span>
        <Progress value={90} className="mt-1" />
      </div>
      <div>
        <span className="text-sm">Next.js</span>
        <Progress value={65} className="mt-1" />
      </div>
    </div>
  ),
};
