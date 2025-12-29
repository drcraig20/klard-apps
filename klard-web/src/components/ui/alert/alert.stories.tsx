import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Terminal, Info, CheckCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Base alert component from shadcn/ui. Used as foundation for AlertBanner and other alert variations. Supports default and destructive variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "Visual variant of the alert",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default alert
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};

// Destructive variant
export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "destructive",
  },
};

// Info style (using default variant with info icon)
export const InfoStyle: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational message for the user.
      </AlertDescription>
    </Alert>
  ),
};

// Success style (using default variant with check icon)
export const SuccessStyle: Story = {
  render: () => (
    <Alert>
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

// Without icon
export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This alert does not have an icon, showing only text content.
      </AlertDescription>
    </Alert>
  ),
};

// Title only
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Quick notification</AlertTitle>
    </Alert>
  ),
};

// Description only
export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        A simple description without a title.
      </AlertDescription>
    </Alert>
  ),
};

// Long content
export const LongContent: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Important Update</AlertTitle>
      <AlertDescription>
        We have made significant changes to our terms of service. Please review
        the updated terms carefully before continuing to use our services. If
        you have any questions, contact our support team for assistance.
      </AlertDescription>
    </Alert>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default Variant</AlertTitle>
        <AlertDescription>
          This is the default alert variant styling.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive Variant</AlertTitle>
        <AlertDescription>
          This is the destructive alert variant for errors.
        </AlertDescription>
      </Alert>
    </div>
  ),
};
