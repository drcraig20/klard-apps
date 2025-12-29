import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Button } from '../Button';

// Mock BottomSheet for Storybook (React Native Web doesn't support @gorhom/bottom-sheet)
// The actual component uses @gorhom/bottom-sheet which requires native modules
interface MockBottomSheetProps {
  open: boolean;
  onClose: () => void;
  snapPoints?: Array<string | number>;
  children: React.ReactNode;
  enableDrag?: boolean;
}

function MockBottomSheet({
  open,
  onClose,
  snapPoints = ['50%'],
  children,
}: MockBottomSheetProps) {
  if (!open) return null;

  const height = typeof snapPoints[0] === 'string'
    ? snapPoints[0]
    : `${snapPoints[0]}px`;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height,
          padding: 16,
        }}
      >
        {/* Handle indicator */}
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: '#e0e0e0',
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 16,
          }}
        />
        {/* Close button for demo */}
        <View style={{ position: 'absolute', top: 8, right: 16 }}>
          <Button variant="ghost" size="sm" onPress={onClose}>
            Close
          </Button>
        </View>
        <View style={{ marginTop: 24 }}>{children}</View>
      </View>
    </View>
  );
}

/**
 * BottomSheet component provides a draggable bottom sheet overlay
 * using @gorhom/bottom-sheet. It supports multiple snap points,
 * backdrop press to close, and haptic feedback.
 *
 * Note: This Storybook demo uses a mock implementation as @gorhom/bottom-sheet
 * requires native modules not available in React Native Web.
 */
const meta: Meta<typeof MockBottomSheet> = {
  title: 'Layout/BottomSheet',
  component: MockBottomSheet,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the bottom sheet is visible',
    },
    snapPoints: {
      control: 'object',
      description: 'Array of snap points (e.g., ["25%", "50%", "90%"])',
    },
    enableDrag: {
      control: 'boolean',
      description: 'Whether dragging to close is enabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A bottom sheet component with snap points, backdrop, and drag-to-close support. Uses @gorhom/bottom-sheet under the hood.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ height: 500, position: 'relative' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper
function BottomSheetDemo({
  snapPoints = ['50%'],
  contentText = 'This is the bottom sheet content.',
}: {
  snapPoints?: Array<string | number>;
  contentText?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open Bottom Sheet</Button>
      </View>
      <MockBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={snapPoints}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          Bottom Sheet Title
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>{contentText}</Text>
      </MockBottomSheet>
    </View>
  );
}

// Default bottom sheet
export const Default: Story = {
  render: () => <BottomSheetDemo />,
};

// Small bottom sheet (25%)
export const Small: Story = {
  render: () => (
    <BottomSheetDemo
      snapPoints={['25%']}
      contentText="A compact bottom sheet for quick actions."
    />
  ),
};

// Large bottom sheet (90%)
export const Large: Story = {
  render: () => (
    <BottomSheetDemo
      snapPoints={['90%']}
      contentText="A full-height bottom sheet for complex content like forms or lists."
    />
  ),
};

// Bottom sheet with actions
function BottomSheetWithActionsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open Actions Sheet</Button>
      </View>
      <MockBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={['40%']}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
          Choose an Action
        </Text>
        <View style={{ gap: 12 }}>
          <Button variant="outline" onPress={() => setOpen(false)}>
            Edit Item
          </Button>
          <Button variant="outline" onPress={() => setOpen(false)}>
            Share Item
          </Button>
          <Button variant="outline" onPress={() => setOpen(false)}>
            Duplicate Item
          </Button>
          <Button variant="destructive" onPress={() => setOpen(false)}>
            Delete Item
          </Button>
        </View>
      </MockBottomSheet>
    </View>
  );
}

export const WithActions: Story = {
  render: () => <BottomSheetWithActionsDemo />,
};

// Bottom sheet with list content
function BottomSheetWithListDemo() {
  const [open, setOpen] = useState(false);
  const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Button onPress={() => setOpen(true)}>Open List Sheet</Button>
      </View>
      <MockBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={['60%']}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
          Select an Option
        </Text>
        <View style={{ gap: 8 }}>
          {items.map((item) => (
            <View
              key={item}
              style={{
                padding: 16,
                backgroundColor: '#f5f5f5',
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </View>
          ))}
        </View>
      </MockBottomSheet>
    </View>
  );
}

export const WithList: Story = {
  render: () => <BottomSheetWithListDemo />,
};
