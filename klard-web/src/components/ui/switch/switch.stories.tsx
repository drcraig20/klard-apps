import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Switch } from "./switch";
import { Label } from "../label";

/**
 * Switch component for toggling between on/off states.
 * Built on Radix UI Switch primitive with customizable size variants.
 */
const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A toggle switch component for binary on/off choices. Supports two sizes (sm, md) and various states including checked, unchecked, and disabled. Built on Radix UI primitives for accessibility.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size variant of the switch",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback when checked state changes",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default unchecked
export const Default: Story = {
  args: {},
};

// Checked state
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

// Disabled unchecked
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

// Small size
export const SizeSmall: Story = {
  args: {
    size: "sm",
  },
};

// Small size checked
export const SizeSmallChecked: Story = {
  args: {
    size: "sm",
    defaultChecked: true,
  },
};

// Medium size (default)
export const SizeMedium: Story = {
  args: {
    size: "md",
  },
};

// Medium size checked
export const SizeMediumChecked: Story = {
  args: {
    size: "md",
    defaultChecked: true,
  },
};

// With label (left)
export const WithLabelLeft: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
      <Switch id="airplane-mode" />
    </div>
  ),
};

// With label (right)
export const WithLabelRight: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

// With label and description
export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Switch id="marketing" className="mt-0.5" />
      <div className="space-y-1">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-sm text-muted-foreground">
          Receive updates about new features and promotions.
        </p>
      </div>
    </div>
  ),
};

// Controlled switch
export const Controlled: Story = {
  render: function ControlledRender() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">Controlled switch</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          State: {checked ? "On" : "Off"}
        </p>
      </div>
    );
  },
};

// Toggle example with visual feedback
export const ToggleWithFeedback: Story = {
  render: function ToggleWithFeedbackRender() {
    const [darkMode, setDarkMode] = React.useState(false);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode">Dark mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark themes
            </p>
          </div>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
        <div
          className={`rounded-lg p-4 ${
            darkMode ? "bg-foreground text-background" : "bg-muted"
          }`}
        >
          Preview: {darkMode ? "Dark Mode Active" : "Light Mode Active"}
        </div>
      </div>
    );
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch size="sm" />
          <Label>Small (sm)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch size="sm" defaultChecked />
          <Label>Small checked</Label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch size="md" />
          <Label>Medium (md)</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch size="md" defaultChecked />
          <Label>Medium checked</Label>
        </div>
      </div>
    </div>
  ),
};

// States comparison
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="checked-state" defaultChecked />
        <Label htmlFor="checked-state">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="opacity-50">
          Disabled (off)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="opacity-50">
          Disabled (on)
        </Label>
      </div>
    </div>
  ),
};

// Settings panel example
export const SettingsPanel: Story = {
  render: function SettingsPanelRender() {
    const [settings, setSettings] = React.useState({
      notifications: true,
      sounds: true,
      autoPlay: false,
      analytics: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="max-w-md space-y-1 rounded-lg border">
        <div className="flex items-center justify-between p-4 hover:bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="setting-notifications">Push notifications</Label>
            <p className="text-xs text-muted-foreground">
              Receive push notifications
            </p>
          </div>
          <Switch
            id="setting-notifications"
            checked={settings.notifications}
            onCheckedChange={() => toggleSetting("notifications")}
          />
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="setting-sounds">Sound effects</Label>
            <p className="text-xs text-muted-foreground">
              Play sounds for actions
            </p>
          </div>
          <Switch
            id="setting-sounds"
            checked={settings.sounds}
            onCheckedChange={() => toggleSetting("sounds")}
          />
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="setting-autoplay">Auto-play videos</Label>
            <p className="text-xs text-muted-foreground">
              Videos play automatically
            </p>
          </div>
          <Switch
            id="setting-autoplay"
            checked={settings.autoPlay}
            onCheckedChange={() => toggleSetting("autoPlay")}
          />
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="setting-analytics">Analytics</Label>
            <p className="text-xs text-muted-foreground">
              Share usage analytics
            </p>
          </div>
          <Switch
            id="setting-analytics"
            checked={settings.analytics}
            onCheckedChange={() => toggleSetting("analytics")}
          />
        </div>
      </div>
    );
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: function FormIntegrationRender() {
    const [formData, setFormData] = React.useState({
      emailUpdates: true,
      smsAlerts: false,
      terms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-updates">Email updates</Label>
            <Switch
              id="email-updates"
              checked={formData.emailUpdates}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, emailUpdates: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-alerts">SMS alerts</Label>
            <Switch
              id="sms-alerts"
              checked={formData.smsAlerts}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, smsAlerts: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="terms-accept">Accept terms</Label>
            <Switch
              id="terms-accept"
              checked={formData.terms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, terms: checked }))
              }
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!formData.terms}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          Save preferences
        </button>
      </form>
    );
  },
};
