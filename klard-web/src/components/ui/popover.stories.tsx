import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Settings, User, Calendar, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./popover";

const meta = {
  title: "Navigation/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A popover component for displaying rich content in a floating panel. Built on Radix UI Popover with animations and positioning.",
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default popover
export const Default: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Simple content
export const SimpleContent: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Info className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <p className="text-sm">
            This is a simple popover with text content. It can be used for tooltips
            with more complex information.
          </p>
        </PopoverContent>
      </Popover>
    );
  },
};

// Alignment options
export const AlignStart: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="text-sm">This popover is aligned to the start.</p>
        </PopoverContent>
      </Popover>
    );
  },
};

export const AlignCenter: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="text-sm">This popover is aligned to the center (default).</p>
        </PopoverContent>
      </Popover>
    );
  },
};

export const AlignEnd: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-sm">This popover is aligned to the end.</p>
        </PopoverContent>
      </Popover>
    );
  },
};

// Side offset
export const WithSideOffset: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Large Offset (16px)</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={16}>
          <p className="text-sm">This popover has a larger offset from the trigger.</p>
        </PopoverContent>
      </Popover>
    );
  },
};

// User menu popover
export const UserMenu: Story = {
  render: function Render() {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="flex flex-col gap-1">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <div className="border-t my-1" />
            <Button variant="ghost" className="justify-start h-8">
              <User className="size-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" className="justify-start h-8">
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
            <div className="border-t my-1" />
            <Button variant="ghost" className="justify-start h-8 text-destructive">
              Log out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Date picker placeholder
export const DatePickerExample: Story = {
  render: function Render() {
    const [date, setDate] = useState<string>("");

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start gap-2">
            <Calendar className="size-4" />
            {date || "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Calendar component would go here
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDate("Today")}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDate("Tomorrow")}
              >
                Tomorrow
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

// Help tooltip with popover
export const HelpPopover: Story = {
  render: function Render() {
    return (
      <div className="flex items-center gap-2">
        <Label>Password</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <HelpCircle className="size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-2">
              <h4 className="font-medium">Password Requirements</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// Controlled popover
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Popover</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Popover
          </Button>
          <span className="text-sm text-muted-foreground self-center">
            Popover is {open ? "open" : "closed"}
          </span>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Trigger (also works)</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm">This popover is controlled externally.</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

// With anchor
export const WithAnchor: Story = {
  render: function Render() {
    return (
      <Popover>
        <div className="flex items-center gap-4">
          <PopoverAnchor asChild>
            <div className="p-4 border rounded-md bg-muted">
              <p className="text-sm">Anchor Element</p>
            </div>
          </PopoverAnchor>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Near Anchor</Button>
          </PopoverTrigger>
        </div>
        <PopoverContent>
          <p className="text-sm">
            This popover is anchored to the element on the left, not the trigger button.
          </p>
        </PopoverContent>
      </Popover>
    );
  },
};

// Alignment comparison
export const AlignmentComparison: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Start</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48">
            <p className="text-sm">Aligned to start</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Center</Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-48">
            <p className="text-sm">Aligned to center</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">End</Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48">
            <p className="text-sm">Aligned to end</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
