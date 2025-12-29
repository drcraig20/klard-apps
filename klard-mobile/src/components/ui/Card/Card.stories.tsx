import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Card } from './Card';

/**
 * Card is a foundational container component that provides consistent styling,
 * padding, and optional interactivity. Use it to group related content with
 * visual hierarchy through variants like elevated, ghost, or interactive.
 */
const meta: Meta<typeof Card> = {
  title: 'Cards/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'ghost', 'interactive'],
      description: 'The visual style variant of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The internal padding of the card',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled (only affects interactive cards)',
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when the card is pressed (makes it interactive)',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content for cards
const SampleContent = ({ title = 'Card Title', description = 'This is sample card content.' }) => (
  <View style={{ gap: 8 }}>
    <Text style={{ fontSize: 16, fontWeight: '600', color: '#0F172A' }}>{title}</Text>
    <Text style={{ fontSize: 14, color: '#64748B' }}>{description}</Text>
  </View>
);

// Default card
export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
  },
  render: (args) => (
    <Card {...args}>
      <SampleContent />
    </Card>
  ),
};

// Elevated card with shadow
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
  },
  render: (args) => (
    <Card {...args}>
      <SampleContent title="Elevated Card" description="This card has an elevated shadow effect." />
    </Card>
  ),
};

// Ghost card (minimal styling)
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    padding: 'md',
  },
  render: (args) => (
    <Card {...args}>
      <SampleContent title="Ghost Card" description="Minimal styling, blends with background." />
    </Card>
  ),
};

// Interactive card
export const Interactive: Story = {
  args: {
    variant: 'interactive',
    padding: 'md',
    onPress: () => console.log('Card pressed'),
  },
  render: (args) => (
    <Card {...args}>
      <SampleContent title="Interactive Card" description="Tap me! I respond to press events." />
    </Card>
  ),
};

// Disabled interactive card
export const Disabled: Story = {
  args: {
    variant: 'interactive',
    padding: 'md',
    disabled: true,
    onPress: () => console.log('Card pressed'),
  },
  render: (args) => (
    <Card {...args}>
      <SampleContent title="Disabled Card" description="This interactive card is disabled." />
    </Card>
  ),
};

// Padding variations
export const PaddingVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card padding="none">
        <View style={{ padding: 16, backgroundColor: '#F1F5F9' }}>
          <Text style={{ fontWeight: '600' }}>padding: none</Text>
        </View>
      </Card>
      <Card padding="sm">
        <Text style={{ fontWeight: '600' }}>padding: sm</Text>
      </Card>
      <Card padding="md">
        <Text style={{ fontWeight: '600' }}>padding: md (default)</Text>
      </Card>
      <Card padding="lg">
        <Text style={{ fontWeight: '600' }}>padding: lg</Text>
      </Card>
    </View>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="default">
        <SampleContent title="Default" description="Standard card styling" />
      </Card>
      <Card variant="elevated">
        <SampleContent title="Elevated" description="With shadow elevation" />
      </Card>
      <Card variant="ghost">
        <SampleContent title="Ghost" description="Minimal, transparent feel" />
      </Card>
      <Card variant="interactive" onPress={() => {}}>
        <SampleContent title="Interactive" description="Responds to tap" />
      </Card>
    </View>
  ),
};

// Nested content example
export const NestedContent: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
  },
  render: (args) => (
    <Card {...args}>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>
          Monthly Summary
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, color: '#64748B' }}>Total Spent</Text>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#0D7C7A' }}>$247.99</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#64748B' }}>Savings</Text>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#059669' }}>$52.00</Text>
          </View>
        </View>
      </View>
    </Card>
  ),
};
