import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Settings, User, CreditCard, Bell, Shield } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContainer,
  type TabItem,
} from "./tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs component for organizing content into multiple panels. Built on Radix UI Tabs with Klard styling. Includes TabsContainer for declarative usage.",
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default composition example
export const Default: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Account Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account information and preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Password Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Update your password and security settings.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">General Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your application preferences.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};

// Two tabs
export const TwoTabs: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4 border rounded-md mt-2">
            <p className="text-sm">Overview content goes here.</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="p-4 border rounded-md mt-2">
            <p className="text-sm">Analytics content goes here.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="size-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="size-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="size-4" />
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your public profile information.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Billing</h3>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your billing information.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your notification preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="security">
          <div className="p-4 border rounded-md mt-2">
            <h3 className="font-medium">Security</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your security settings and two-factor authentication.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};

// Disabled tab
export const WithDisabledTab: Story = {
  render: function Render() {
    return (
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="locked" disabled>
            Locked
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="p-4 border rounded-md mt-2">
            <p className="text-sm">Active tab content.</p>
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="p-4 border rounded-md mt-2">
            <p className="text-sm">Pending tab content.</p>
          </div>
        </TabsContent>
        <TabsContent value="locked">
          <div className="p-4 border rounded-md mt-2">
            <p className="text-sm">This tab is locked.</p>
          </div>
        </TabsContent>
      </Tabs>
    );
  },
};

// TabsContainer - declarative API
export const UsingTabsContainer: Story = {
  render: function Render() {
    const [value, setValue] = useState("account");

    const tabs: TabItem[] = [
      { value: "account", label: "Account", icon: <User className="size-4" /> },
      { value: "billing", label: "Billing", icon: <CreditCard className="size-4" /> },
      { value: "settings", label: "Settings", icon: <Settings className="size-4" /> },
    ];

    return (
      <TabsContainer value={value} onChange={setValue} tabs={tabs}>
        <TabsContent value="account">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Account</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account details.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Billing</h3>
            <p className="text-sm text-muted-foreground mt-1">
              View your billing history.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your preferences.
            </p>
          </div>
        </TabsContent>
      </TabsContainer>
    );
  },
};

// TabsContainer with badges
export const WithBadges: Story = {
  render: function Render() {
    const [value, setValue] = useState("inbox");

    const tabs: TabItem[] = [
      { value: "inbox", label: "Inbox", badge: 12 },
      { value: "drafts", label: "Drafts", badge: 3 },
      { value: "sent", label: "Sent" },
      { value: "archive", label: "Archive", badge: 99 },
    ];

    return (
      <TabsContainer value={value} onChange={setValue} tabs={tabs}>
        <TabsContent value="inbox">
          <div className="p-4 border rounded-md">
            <p className="text-sm">You have 12 new messages in your inbox.</p>
          </div>
        </TabsContent>
        <TabsContent value="drafts">
          <div className="p-4 border rounded-md">
            <p className="text-sm">You have 3 draft messages.</p>
          </div>
        </TabsContent>
        <TabsContent value="sent">
          <div className="p-4 border rounded-md">
            <p className="text-sm">Your sent messages will appear here.</p>
          </div>
        </TabsContent>
        <TabsContent value="archive">
          <div className="p-4 border rounded-md">
            <p className="text-sm">You have 99 archived messages.</p>
          </div>
        </TabsContent>
      </TabsContainer>
    );
  },
};

// TabsContainer small size
export const SmallSize: Story = {
  render: function Render() {
    const [value, setValue] = useState("tab1");

    const tabs: TabItem[] = [
      { value: "tab1", label: "First" },
      { value: "tab2", label: "Second" },
      { value: "tab3", label: "Third" },
    ];

    return (
      <TabsContainer value={value} onChange={setValue} tabs={tabs} size="sm">
        <TabsContent value="tab1">
          <div className="p-3 border rounded-md">
            <p className="text-sm">First tab content.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="p-3 border rounded-md">
            <p className="text-sm">Second tab content.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="p-3 border rounded-md">
            <p className="text-sm">Third tab content.</p>
          </div>
        </TabsContent>
      </TabsContainer>
    );
  },
};

// TabsContainer full width
export const FullWidth: Story = {
  render: function Render() {
    const [value, setValue] = useState("overview");

    const tabs: TabItem[] = [
      { value: "overview", label: "Overview" },
      { value: "analytics", label: "Analytics" },
      { value: "reports", label: "Reports" },
      { value: "settings", label: "Settings" },
    ];

    return (
      <div className="w-full max-w-2xl">
        <TabsContainer value={value} onChange={setValue} tabs={tabs} fullWidth>
          <TabsContent value="overview">
            <div className="p-4 border rounded-md">
              <p className="text-sm">Overview content with full width tabs.</p>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="p-4 border rounded-md">
              <p className="text-sm">Analytics content.</p>
            </div>
          </TabsContent>
          <TabsContent value="reports">
            <div className="p-4 border rounded-md">
              <p className="text-sm">Reports content.</p>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-4 border rounded-md">
              <p className="text-sm">Settings content.</p>
            </div>
          </TabsContent>
        </TabsContainer>
      </div>
    );
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: function Render() {
    const [smValue, setSmValue] = useState("tab1");
    const [mdValue, setMdValue] = useState("tab1");

    const tabs: TabItem[] = [
      { value: "tab1", label: "First", icon: <User className="size-4" /> },
      { value: "tab2", label: "Second", icon: <Settings className="size-4" /> },
    ];

    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
          <TabsContainer value={smValue} onChange={setSmValue} tabs={tabs} size="sm">
            <TabsContent value="tab1">
              <div className="p-3 border rounded-md text-sm">Small tabs content.</div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-3 border rounded-md text-sm">Second tab.</div>
            </TabsContent>
          </TabsContainer>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Medium (md) - Default</p>
          <TabsContainer value={mdValue} onChange={setMdValue} tabs={tabs} size="md">
            <TabsContent value="tab1">
              <div className="p-4 border rounded-md">Medium tabs content.</div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-4 border rounded-md">Second tab.</div>
            </TabsContent>
          </TabsContainer>
        </div>
      </div>
    );
  },
};
