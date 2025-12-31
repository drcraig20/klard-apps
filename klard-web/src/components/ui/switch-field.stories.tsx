import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SwitchField } from "./switch-field";

const meta = {
  title: "Forms/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Toggle switch with label and optional description. Used for binary on/off settings. Supports two sizes. Built on shadcn/ui Switch.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
    label: {
      control: "text",
      description: "Label text displayed next to the switch",
    },
    description: {
      control: "text",
      description: "Description text displayed below the label",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size variant",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
  },
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default off
export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Enable notifications",
  },
};

// Default on
export const On: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Enable notifications",
  },
};

// With description
export const WithDescription: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Dark mode",
    description: "Switch between light and dark themes",
  },
};

// On with description
export const OnWithDescription: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Auto-save",
    description: "Automatically save changes as you work",
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Compact setting",
    size: "sm",
  },
};

// Medium size (default)
export const MediumSize: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Regular setting",
    size: "md",
  },
};

// Disabled off
export const DisabledOff: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Unavailable feature",
    disabled: true,
  },
};

// Disabled on
export const DisabledOn: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Locked setting",
    disabled: true,
  },
};

// Disabled with description
export const DisabledWithDescription: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: "Premium feature",
    description: "Upgrade your plan to access this feature",
    disabled: true,
  },
};

// Label only (no description)
export const LabelOnly: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: "Remember me",
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="space-y-4 max-w-md">
      <SwitchField
        checked={enabled}
        onChange={setEnabled}
        label="Interactive switch"
        description="Click to toggle the state"
      />
      <p className="text-sm text-muted-foreground">
        State: {enabled ? "On" : "Off"}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// Settings panel example
const SettingsPanelTemplate = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-6 max-w-md p-4 bg-muted rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">
        Settings
      </h3>
      <div className="space-y-4">
        <SwitchField
          checked={notifications}
          onChange={setNotifications}
          label="Push notifications"
          description="Receive push notifications on your device"
        />
        <SwitchField
          checked={emailAlerts}
          onChange={setEmailAlerts}
          label="Email alerts"
          description="Receive email notifications for important updates"
        />
        <SwitchField
          checked={darkMode}
          onChange={setDarkMode}
          label="Dark mode"
          description="Use dark theme for the interface"
        />
        <SwitchField
          checked={autoSave}
          onChange={setAutoSave}
          label="Auto-save"
          description="Automatically save your work"
        />
      </div>
    </div>
  );
};

export const SettingsPanelExample: Story = {
  render: () => <SettingsPanelTemplate />,
};

// Feature flags example
const FeatureFlagsTemplate = () => {
  const [features, setFeatures] = useState({
    beta: false,
    analytics: true,
    cookies: true,
  });

  const updateFeature = (key: keyof typeof features, value: boolean) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 max-w-md">
      <SwitchField
        checked={features.beta}
        onChange={(v) => updateFeature("beta", v)}
        label="Beta features"
        description="Try out new features before they're released"
      />
      <SwitchField
        checked={features.analytics}
        onChange={(v) => updateFeature("analytics", v)}
        label="Usage analytics"
        description="Help us improve by sharing anonymous usage data"
      />
      <SwitchField
        checked={features.cookies}
        onChange={(v) => updateFeature("cookies", v)}
        label="Accept cookies"
        description="Allow cookies for a personalized experience"
      />
    </div>
  );
};

export const FeatureFlagsExample: Story = {
  render: () => <FeatureFlagsTemplate />,
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <SwitchField
        checked={true}
        onChange={() => {}}
        label="Small switch"
        description="Compact size for dense UIs"
        size="sm"
      />
      <SwitchField
        checked={true}
        onChange={() => {}}
        label="Medium switch"
        description="Default size for standard use"
        size="md"
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <SwitchField
        checked={false}
        onChange={() => {}}
        label="Off"
      />
      <SwitchField
        checked={true}
        onChange={() => {}}
        label="On"
      />
      <SwitchField
        checked={false}
        onChange={() => {}}
        label="With Description"
        description="Additional context for the setting"
      />
      <SwitchField
        checked={false}
        onChange={() => {}}
        label="Small Size"
        size="sm"
      />
      <SwitchField
        checked={false}
        onChange={() => {}}
        label="Disabled Off"
        disabled
      />
      <SwitchField
        checked={true}
        onChange={() => {}}
        label="Disabled On"
        disabled
      />
      <SwitchField
        checked={false}
        onChange={() => {}}
        label="Disabled with Description"
        description="This setting is not available"
        disabled
      />
    </div>
  ),
};
