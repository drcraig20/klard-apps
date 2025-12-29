import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarSize, type AvatarShape } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar component for displaying user profile images with fallback support. Supports multiple sizes and shapes.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    fallback: {
      control: "text",
      description: "Fallback text when image is unavailable (typically initials)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"] as AvatarSize[],
      description: "Avatar size",
    },
    shape: {
      control: "select",
      options: ["circle", "square"] as AvatarShape[],
      description: "Avatar shape",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default avatar with fallback
export const Default: Story = {
  args: {
    alt: "John Doe",
    fallback: "JD",
    size: "md",
    shape: "circle",
  },
};

// Avatar with image
export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "User Profile",
    fallback: "UP",
    size: "md",
    shape: "circle",
  },
};

// Square shape
export const Square: Story = {
  args: {
    alt: "Jane Smith",
    fallback: "JS",
    size: "md",
    shape: "square",
  },
};

// Square with image
export const SquareWithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    alt: "User Profile",
    fallback: "UP",
    size: "md",
    shape: "square",
  },
};

// Extra small size
export const ExtraSmall: Story = {
  args: {
    alt: "User",
    fallback: "U",
    size: "xs",
    shape: "circle",
  },
};

// Small size
export const Small: Story = {
  args: {
    alt: "User",
    fallback: "SM",
    size: "sm",
    shape: "circle",
  },
};

// Medium size (default)
export const Medium: Story = {
  args: {
    alt: "User",
    fallback: "MD",
    size: "md",
    shape: "circle",
  },
};

// Large size
export const Large: Story = {
  args: {
    alt: "User",
    fallback: "LG",
    size: "lg",
    shape: "circle",
  },
};

// Extra large size
export const ExtraLarge: Story = {
  args: {
    alt: "User",
    fallback: "XL",
    size: "xl",
    shape: "circle",
  },
};

// Broken image (shows fallback)
export const BrokenImage: Story = {
  args: {
    src: "https://broken-image-url.com/image.jpg",
    alt: "User",
    fallback: "FB",
    size: "md",
    shape: "circle",
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar alt="XS" fallback="XS" size="xs" shape="circle" />
      <Avatar alt="SM" fallback="SM" size="sm" shape="circle" />
      <Avatar alt="MD" fallback="MD" size="md" shape="circle" />
      <Avatar alt="LG" fallback="LG" size="lg" shape="circle" />
      <Avatar alt="XL" fallback="XL" size="xl" shape="circle" />
    </div>
  ),
};

// All sizes with images
export const AllSizesWithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
        size="xs"
        shape="circle"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
        size="sm"
        shape="circle"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
        size="md"
        shape="circle"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
        size="lg"
        shape="circle"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        alt="User"
        fallback="U"
        size="xl"
        shape="circle"
      />
    </div>
  ),
};

// Shape comparison
export const ShapeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Avatar alt="Circle" fallback="CR" size="lg" shape="circle" />
        <p className="text-muted-foreground mt-2 text-sm">Circle</p>
      </div>
      <div className="text-center">
        <Avatar alt="Square" fallback="SQ" size="lg" shape="square" />
        <p className="text-muted-foreground mt-2 text-sm">Square</p>
      </div>
    </div>
  ),
};

// Avatar group example
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="User 1"
        fallback="U1"
        size="sm"
        shape="circle"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
        alt="User 2"
        fallback="U2"
        size="sm"
        shape="circle"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="User 3"
        fallback="U3"
        size="sm"
        shape="circle"
        className="ring-2 ring-white"
      />
      <Avatar
        alt="More"
        fallback="+3"
        size="sm"
        shape="circle"
        className="ring-2 ring-white"
      />
    </div>
  ),
};

// User card example
export const UserCard: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
        fallback="JD"
        size="md"
        shape="circle"
      />
      <div>
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-muted-foreground text-xs">john@example.com</p>
      </div>
    </div>
  ),
};
