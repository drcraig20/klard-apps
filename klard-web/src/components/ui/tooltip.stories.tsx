import type { Meta, StoryObj } from "@storybook/react";
import { Info, HelpCircle, Settings, Trash2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
} from "./tooltip";

const meta = {
  title: "Navigation/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A tooltip component for displaying additional information on hover. Built on Radix UI Tooltip with animations and positioning options. Includes TooltipWrapper for simplified usage.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default tooltip using primitives
export const Default: Story = {
  render: function Render() {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

// Using TooltipWrapper (simplified API)
export const UsingWrapper: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="This is a simple tooltip">
        <Button variant="outline">Hover me</Button>
      </TooltipWrapper>
    );
  },
};

// Icon with tooltip
export const IconTooltip: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="More information">
        <Button variant="ghost" size="icon">
          <Info className="size-4" />
        </Button>
      </TooltipWrapper>
    );
  },
};

// Side positions
export const TopSide: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="Tooltip on top" side="top">
        <Button variant="outline">Top</Button>
      </TooltipWrapper>
    );
  },
};

export const BottomSide: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="Tooltip on bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </TooltipWrapper>
    );
  },
};

export const LeftSide: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="Tooltip on left" side="left">
        <Button variant="outline">Left</Button>
      </TooltipWrapper>
    );
  },
};

export const RightSide: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="Tooltip on right" side="right">
        <Button variant="outline">Right</Button>
      </TooltipWrapper>
    );
  },
};

// All sides comparison
export const AllSides: Story = {
  render: function Render() {
    return (
      <div className="flex flex-wrap gap-4 justify-center p-8">
        <TooltipWrapper content="Top tooltip" side="top">
          <Button variant="outline">Top</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Right tooltip" side="right">
          <Button variant="outline">Right</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Bottom tooltip" side="bottom">
          <Button variant="outline">Bottom</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Left tooltip" side="left">
          <Button variant="outline">Left</Button>
        </TooltipWrapper>
      </div>
    );
  },
};

// Custom delay
export const CustomDelay: Story = {
  render: function Render() {
    return (
      <div className="flex gap-4">
        <TooltipWrapper content="Instant (0ms)" delayDuration={0}>
          <Button variant="outline">Instant</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Fast (100ms)" delayDuration={100}>
          <Button variant="outline">Fast</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Default (200ms)" delayDuration={200}>
          <Button variant="outline">Default</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Slow (500ms)" delayDuration={500}>
          <Button variant="outline">Slow</Button>
        </TooltipWrapper>
      </div>
    );
  },
};

// Custom offset
export const CustomOffset: Story = {
  render: function Render() {
    return (
      <div className="flex gap-4">
        <TooltipWrapper content="Default offset (4px)" sideOffset={4}>
          <Button variant="outline">Default</Button>
        </TooltipWrapper>
        <TooltipWrapper content="Large offset (12px)" sideOffset={12}>
          <Button variant="outline">Large Offset</Button>
        </TooltipWrapper>
        <TooltipWrapper content="No offset (0px)" sideOffset={0}>
          <Button variant="outline">No Offset</Button>
        </TooltipWrapper>
      </div>
    );
  },
};

// Rich content
export const RichContent: Story = {
  render: function Render() {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="gap-2">
              <HelpCircle className="size-4" />
              Help
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">Need help?</p>
              <p className="text-xs opacity-80">
                Click to open the help center with detailed documentation and
                tutorials.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

// Action buttons with tooltips
export const ActionButtons: Story = {
  render: function Render() {
    return (
      <div className="flex gap-2">
        <TooltipWrapper content="Copy to clipboard">
          <Button variant="ghost" size="icon">
            <Copy className="size-4" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Download file">
          <Button variant="ghost" size="icon">
            <Download className="size-4" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Settings">
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper content="Delete item">
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash2 className="size-4" />
          </Button>
        </TooltipWrapper>
      </div>
    );
  },
};

// Disabled button with tooltip
export const DisabledButtonTooltip: Story = {
  render: function Render() {
    return (
      <TooltipWrapper content="You don't have permission to perform this action">
        <span tabIndex={0}>
          <Button disabled>
            Submit
          </Button>
        </span>
      </TooltipWrapper>
    );
  },
};

// Keyboard shortcut hint
export const KeyboardShortcut: Story = {
  render: function Render() {
    return (
      <div className="flex gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Save</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                <span>Save</span>
                <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono">
                  Ctrl+S
                </kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Copy</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                <span>Copy</span>
                <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono">
                  Ctrl+C
                </kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  },
};

// Multiple tooltips with shared provider
export const SharedProvider: Story = {
  render: function Render() {
    return (
      <TooltipProvider delayDuration={100}>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Copy className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Download className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
  },
};

// Text with tooltip
export const TextTooltip: Story = {
  render: function Render() {
    return (
      <p className="text-sm">
        This text has a{" "}
        <TooltipWrapper content="Additional context about this term">
          <span className="underline decoration-dotted cursor-help">
            tooltip
          </span>
        </TooltipWrapper>{" "}
        for additional information.
      </p>
    );
  },
};

// Long content
export const LongContent: Story = {
  render: function Render() {
    return (
      <TooltipWrapper
        content="This is a longer tooltip message that provides more detailed information about the element. It can span multiple lines when needed."
        className="max-w-[200px]"
      >
        <Button variant="outline">Long Tooltip</Button>
      </TooltipWrapper>
    );
  },
};

// Form field helper
export const FormFieldHelper: Story = {
  render: function Render() {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">API Key</span>
        <TooltipWrapper
          content="Your API key is used to authenticate requests. Keep it secret and never share it publicly."
          side="right"
        >
          <button className="text-muted-foreground hover:text-foreground">
            <Info className="size-4" />
          </button>
        </TooltipWrapper>
      </div>
    );
  },
};
