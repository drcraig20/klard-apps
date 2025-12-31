import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TermsCheckbox } from "./terms-checkbox";

const meta = {
  title: "Forms/TermsCheckbox",
  component: TermsCheckbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Terms and conditions checkbox component with linked Terms of Service and Privacy Policy text. Uses i18n for translations.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    error: {
      control: "text",
      description: "Error message displayed below the checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
  },
} satisfies Meta<typeof TermsCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Unchecked state
export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
};

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
};

// With error
export const WithError: Story = {
  args: {
    checked: false,
    onChange: () => {},
    error: "You must accept the terms and conditions to continue",
  },
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="max-w-sm space-y-4">
      <TermsCheckbox
        checked={checked}
        onChange={setChecked}
      />
      <p className="text-sm text-muted-foreground">
        State: {checked ? "Accepted" : "Not accepted"}
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
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Unchecked</p>
        <TermsCheckbox checked={false} onChange={() => {}} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Checked</p>
        <TermsCheckbox checked={true} onChange={() => {}} />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Error</p>
        <TermsCheckbox
          checked={false}
          onChange={() => {}}
          error="You must accept the terms to continue"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <TermsCheckbox checked={false} onChange={() => {}} disabled />
      </div>
    </div>
  ),
};

// Sign up form context
const SignUpFormTemplate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setError(undefined);
    console.log("Form submitted", { email, password, termsAccepted });
  };

  return (
    <div className="max-w-sm p-6 border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Create Account</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Create a password"
            required
          />
        </div>
        <TermsCheckbox
          checked={termsAccepted}
          onChange={(checked) => {
            setTermsAccepted(checked);
            if (checked) setError(undefined);
          }}
          error={error}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export const SignUpFormContext: Story = {
  render: () => <SignUpFormTemplate />,
  parameters: {
    docs: {
      description: {
        story: "TermsCheckbox in a typical sign-up form context with validation.",
      },
    },
  },
};
