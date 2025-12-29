import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./card";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A versatile card component with header, title, description, content, footer, and action slots. Used for grouping related content and actions.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default card with all subcomponents
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any elements you need.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Simple card with just content
export const SimpleContent: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// Card with header only
export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>Your current plan details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm font-medium">Pro Plan</p>
          <p className="text-muted-foreground text-sm">$19.99/month</p>
        </div>
      </CardContent>
    </Card>
  ),
};

// Card with action button in header
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">You have 3 unread notifications.</p>
      </CardContent>
    </Card>
  ),
};

// Card with footer actions
export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This action cannot be undone.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with border separator
export const WithBorderSeparator: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="border-b">
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-muted-foreground text-sm">user@example.com</p>
          </div>
          <div>
            <p className="text-sm font-medium">Language</p>
            <p className="text-muted-foreground text-sm">English</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="outline" className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Interactive form card
export const FormCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your details to create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Pricing card example
export const PricingCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-2xl">Pro Plan</CardTitle>
        <CardDescription>Best for growing businesses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>Unlimited projects</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
          <li>Custom integrations</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="klard" className="w-full">
          Get Started
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Multiple cards layout
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">First card content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Second card content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Third card content</p>
        </CardContent>
      </Card>
    </div>
  ),
};
