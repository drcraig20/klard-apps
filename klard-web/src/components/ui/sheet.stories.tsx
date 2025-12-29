import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu, Settings, User, CreditCard, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";

const meta = {
  title: "Navigation/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A sheet/drawer component that slides in from the edge of the screen. Built on Radix UI Dialog with slide animations.",
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default (right side)
export const Default: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>
              This is a sheet that slides in from the right side of the screen.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Sheet content goes here. This is commonly used for navigation menus,
              settings panels, or detailed views.
            </p>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

// Right side (explicit)
export const RightSide: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Right Sheet</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Content here.</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

// Left side
export const LeftSide: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Left Sheet</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Content here.</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

// Top side
export const TopSide: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Top Sheet</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the top.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Great for notifications, announcements, or quick actions.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

// Bottom side
export const BottomSide: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Bottom Sheet</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the bottom.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Perfect for mobile-style action sheets or additional options.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

// Navigation menu
export const NavigationMenu: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            <Button variant="ghost" className="justify-start gap-2">
              <User className="size-4" />
              Profile
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <CreditCard className="size-4" />
              Billing
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Bell className="size-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings className="size-4" />
              Settings
            </Button>
            <div className="border-t my-2" />
            <Button variant="ghost" className="justify-start gap-2 text-destructive">
              <LogOut className="size-4" />
              Log Out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    );
  },
};

// Settings panel
export const SettingsPanel: Story = {
  render: function Render() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Settings className="size-4" />
            Settings
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Manage your account settings and preferences.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button>Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

// Controlled sheet
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Sheet</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Sheet
          </Button>
          <span className="text-sm text-muted-foreground self-center">
            Sheet is {open ? "open" : "closed"}
          </span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Controlled Sheet</SheetTitle>
              <SheetDescription>
                This sheet&apos;s open state is controlled externally.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                You can control when this sheet opens and closes programmatically.
              </p>
            </div>
            <SheetFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};

// All sides comparison
export const AllSides: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Top</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Top Sheet</SheetTitle>
            </SheetHeader>
            <div className="p-4">Slides from top</div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Right</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Right Sheet</SheetTitle>
            </SheetHeader>
            <div className="p-4">Slides from right</div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Bottom Sheet</SheetTitle>
            </SheetHeader>
            <div className="p-4">Slides from bottom</div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Left</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Left Sheet</SheetTitle>
            </SheetHeader>
            <div className="p-4">Slides from left</div>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};
