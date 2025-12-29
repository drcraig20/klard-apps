import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Apple, Grape, Cherry, Banana, User, Globe, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select";

const meta = {
  title: "Navigation/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A select component for choosing from a list of options. Built on Radix UI Select with keyboard navigation and accessibility.",
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default select
export const Default: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// Controlled select
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("");

    return (
      <div className="flex flex-col gap-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Selected value: {value || "none"}
        </p>
      </div>
    );
  },
};

// With default value
export const WithDefaultValue: Story = {
  render: function Render() {
    return (
      <Select defaultValue="banana">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">
            <div className="flex items-center gap-2">
              <Apple className="size-4" />
              Apple
            </div>
          </SelectItem>
          <SelectItem value="banana">
            <div className="flex items-center gap-2">
              <Banana className="size-4" />
              Banana
            </div>
          </SelectItem>
          <SelectItem value="cherry">
            <div className="flex items-center gap-2">
              <Cherry className="size-4" />
              Cherry
            </div>
          </SelectItem>
          <SelectItem value="grape">
            <div className="flex items-center gap-2">
              <Grape className="size-4" />
              Grape
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// With groups
export const WithGroups: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="cst-asia">China Standard Time (CST)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise" disabled>
            Enterprise (Coming Soon)
          </SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// Disabled select
export const Disabled: Story = {
  render: function Render() {
    return (
      <Select disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// Small size
export const SmallSize: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[140px]" size="sm">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="xs">Extra Small</SelectItem>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// Default size
export const DefaultSize: Story = {
  render: function Render() {
    return (
      <Select>
        <SelectTrigger className="w-[180px]" size="default">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="xs">Extra Small</SelectItem>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

// With label
export const WithLabel: Story = {
  render: function Render() {
    return (
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Select>
          <SelectTrigger id="country" className="w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// Full width
export const FullWidth: Story = {
  render: function Render() {
    return (
      <div className="w-full max-w-sm">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// Form example
export const FormExample: Story = {
  render: function Render() {
    const [role, setRole] = useState("");
    const [language, setLanguage] = useState("");
    const [theme, setTheme] = useState("");

    return (
      <div className="grid gap-4 max-w-sm">
        <div className="grid gap-2">
          <Label className="flex items-center gap-2">
            <User className="size-4" />
            Role
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-2">
            <Globe className="size-4" />
            Language
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="flex items-center gap-2">
            <Palette className="size-4" />
            Theme
          </Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2 text-sm text-muted-foreground">
          <p>Role: {role || "not selected"}</p>
          <p>Language: {language || "not selected"}</p>
          <p>Theme: {theme || "not selected"}</p>
        </div>
      </div>
    );
  },
};

// Long list with scroll
export const LongList: Story = {
  render: function Render() {
    const countries = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
      "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
      "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
      "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
      "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    ];

    return (
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country.toLowerCase()}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
          <Select>
            <SelectTrigger className="w-[180px]" size="sm">
              <SelectValue placeholder="Small select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Default</p>
          <Select>
            <SelectTrigger className="w-[180px]" size="default">
              <SelectValue placeholder="Default select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
};
