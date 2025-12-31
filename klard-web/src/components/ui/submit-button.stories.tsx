import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SubmitButton } from "./submit-button";

const meta = {
  title: "Forms/SubmitButton",
  component: SubmitButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form submit button component with built-in loading state. Uses the Klard button variant with large size and full width styling.",
      },
    },
  },
  argTypes: {
    isSubmitting: {
      control: "boolean",
      description: "Shows loading spinner when true",
    },
    children: {
      control: "text",
      description: "Button text content",
    },
  },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {
    isSubmitting: false,
    children: "Submit",
  },
};

// Submitting state
export const Submitting: Story = {
  args: {
    isSubmitting: true,
    children: "Submit",
  },
};

// Sign In button
export const SignIn: Story = {
  args: {
    isSubmitting: false,
    children: "Sign In",
  },
};

// Sign In loading
export const SignInLoading: Story = {
  args: {
    isSubmitting: true,
    children: "Sign In",
  },
};

// Create Account button
export const CreateAccount: Story = {
  args: {
    isSubmitting: false,
    children: "Create Account",
  },
};

// Save Changes button
export const SaveChanges: Story = {
  args: {
    isSubmitting: false,
    children: "Save Changes",
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <SubmitButton isSubmitting={isSubmitting}>
          Submit Form
        </SubmitButton>
      </form>
      <p className="text-xs text-muted-foreground mt-2">
        Click to simulate a 2-second submission
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <SubmitButton isSubmitting={false}>Submit</SubmitButton>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Submitting</p>
        <SubmitButton isSubmitting={true}>Submit</SubmitButton>
      </div>
    </div>
  ),
};

// Form context example
const FormContextTemplate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="max-w-sm p-6 border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Sign In</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter password"
            required
          />
        </div>
        <SubmitButton isSubmitting={isSubmitting}>
          Sign In
        </SubmitButton>
      </form>
      {submitted && (
        <p className="text-sm text-success mt-4">Form submitted successfully!</p>
      )}
    </div>
  );
};

export const FormContext: Story = {
  render: () => <FormContextTemplate />,
  parameters: {
    docs: {
      description: {
        story: "SubmitButton in a typical sign-in form context.",
      },
    },
  },
};

// With custom className
export const CustomClassName: Story = {
  args: {
    isSubmitting: false,
    children: "Continue",
    className: "rounded-full",
  },
};
