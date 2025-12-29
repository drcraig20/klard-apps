import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Visual separator component for dividing content sections. Supports horizontal and vertical orientations. Built on Radix UI primitives.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Separator orientation",
    },
    decorative: {
      control: "boolean",
      description:
        "When true, indicates the separator is purely visual and has no semantic meaning",
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default horizontal separator
export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
};

// Vertical separator
export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <span>Item 1</span>
      <Separator orientation="vertical" />
      <span>Item 2</span>
      <Separator orientation="vertical" />
      <span>Item 3</span>
    </div>
  ),
};

// Horizontal in content
export const HorizontalInContent: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section Title</h3>
        <p className="text-muted-foreground text-sm">
          This is some content in the first section.
        </p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold">Another Section</h3>
        <p className="text-muted-foreground text-sm">
          This is some content in the second section.
        </p>
      </div>
    </div>
  ),
};

// With text
export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <span className="text-muted-foreground text-xs uppercase">or</span>
      <Separator className="flex-1" />
    </div>
  ),
};

// In a card
export const InCard: Story = {
  render: () => (
    <div className="bg-card w-80 rounded-lg border p-4 shadow-sm">
      <div className="space-y-1">
        <h4 className="font-medium">Account Details</h4>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Email</span>
          <span className="text-muted-foreground text-sm">user@example.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Plan</span>
          <span className="text-muted-foreground text-sm">Pro</span>
        </div>
      </div>
      <Separator className="my-4" />
      <button className="text-primary text-sm font-medium hover:underline">
        Manage subscription
      </button>
    </div>
  ),
};

// Navigation breadcrumb style
export const Breadcrumb: Story = {
  render: () => (
    <nav className="flex items-center gap-2 text-sm">
      <a href="#" className="text-muted-foreground hover:text-foreground">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-muted-foreground hover:text-foreground">
        Products
      </a>
      <Separator orientation="vertical" className="h-4" />
      <span className="font-medium">Details</span>
    </nav>
  ),
};

// Toolbar
export const Toolbar: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-md border p-2">
      <button className="text-muted-foreground hover:text-foreground rounded p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
        </svg>
      </button>
      <button className="text-muted-foreground hover:text-foreground rounded p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      </button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <button className="text-muted-foreground hover:text-foreground rounded p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
          <path d="M3.75 8.5a.75.75 0 00-.75.75V10c0 3.866 3.134 7 7 7h.75a.75.75 0 00.75-.75v-.5a.75.75 0 00-.75-.75H10a5.5 5.5 0 01-5.5-5.5v-.75a.75.75 0 00-.75-.75h-.5zM3 14.25a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v.5c0 .414-.336.75-.75.75h-.5a.75.75 0 01-.75-.75v-.5z" />
        </svg>
      </button>
      <button className="text-muted-foreground hover:text-foreground rounded p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
      </button>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <button className="text-muted-foreground hover:text-foreground rounded p-1 hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  ),
};

// Menu items
export const MenuItems: Story = {
  render: () => (
    <div className="w-56 rounded-md border p-1 shadow-md">
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Profile
      </button>
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Settings
      </button>
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Keyboard shortcuts
      </button>
      <Separator className="my-1" />
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Team
      </button>
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Invite users
      </button>
      <Separator className="my-1" />
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        GitHub
      </button>
      <button className="hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Support
      </button>
      <Separator className="my-1" />
      <button className="text-destructive hover:bg-accent flex w-full items-center rounded-sm px-2 py-1.5 text-sm">
        Log out
      </button>
    </div>
  ),
};

// Footer links
export const FooterLinks: Story = {
  render: () => (
    <footer className="text-muted-foreground text-sm">
      <Separator className="mb-4" />
      <div className="flex items-center justify-center gap-4">
        <a href="#" className="hover:text-foreground">
          Privacy
        </a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="hover:text-foreground">
          Terms
        </a>
        <Separator orientation="vertical" className="h-4" />
        <a href="#" className="hover:text-foreground">
          Contact
        </a>
      </div>
    </footer>
  ),
};

// Orientation comparison
export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Horizontal</p>
        <Separator orientation="horizontal" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-sm">Vertical</p>
        <div className="flex h-10 items-center gap-4">
          <span>Left</span>
          <Separator orientation="vertical" />
          <span>Right</span>
        </div>
      </div>
    </div>
  ),
};
