import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Avatar } from './Avatar';

/**
 * Avatar displays user profile images with fallback initials.
 * Supports multiple sizes and shapes (circle/square).
 * Uses expo-image for optimized loading with blurhash placeholders.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar (xs: 24px, sm: 32px, md: 40px, lg: 48px, xl: 64px)',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Accessibility label for the avatar',
    },
    fallback: {
      control: 'text',
      description: 'Initials to display when image is not available',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default avatar with image
export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
    fallback: 'JD',
    size: 'md',
    shape: 'circle',
  },
};

// Avatar with fallback initials (no image)
export const Fallback: Story = {
  args: {
    alt: 'Sarah Miller',
    fallback: 'SM',
    size: 'md',
    shape: 'circle',
  },
};

// Square avatar
export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    alt: 'Alex Johnson',
    fallback: 'AJ',
    size: 'md',
    shape: 'square',
  },
};

// All sizes showcase
export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="Extra small"
        fallback="XS"
        size="xs"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="Small"
        fallback="SM"
        size="sm"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="Medium"
        fallback="MD"
        size="md"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="Large"
        fallback="LG"
        size="lg"
      />
      <Avatar
        src="https://i.pravatar.cc/150?img=3"
        alt="Extra large"
        fallback="XL"
        size="xl"
      />
    </View>
  ),
};

// Fallback sizes showcase
export const FallbackSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <Avatar alt="XS fallback" fallback="XS" size="xs" />
      <Avatar alt="SM fallback" fallback="SM" size="sm" />
      <Avatar alt="MD fallback" fallback="MD" size="md" />
      <Avatar alt="LG fallback" fallback="LG" size="lg" />
      <Avatar alt="XL fallback" fallback="XL" size="xl" />
    </View>
  ),
};

// Circle vs Square comparison
export const Shapes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=5"
          alt="Circle avatar"
          fallback="CR"
          size="lg"
          shape="circle"
        />
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=5"
          alt="Square avatar"
          fallback="SQ"
          size="lg"
          shape="square"
        />
      </View>
    </View>
  ),
};

// User list example
export const UserList: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=10"
          alt="Emma Wilson"
          fallback="EW"
          size="md"
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=11"
          alt="Michael Chen"
          fallback="MC"
          size="md"
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar
          alt="New User"
          fallback="NU"
          size="md"
        />
      </View>
    </View>
  ),
};

// Broken image (shows fallback)
export const BrokenImage: Story = {
  args: {
    src: 'https://invalid-url.com/broken-image.jpg',
    alt: 'Broken image example',
    fallback: 'BI',
    size: 'lg',
    shape: 'circle',
  },
};
