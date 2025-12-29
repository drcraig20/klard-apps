import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Pressable } from 'react-native';
import { Modal } from './Modal';
import { Button } from '../Button';

/**
 * Modal component provides a bottom-sheet style modal overlay with
 * title, description, and customizable content and footer areas.
 * It includes haptic feedback, accessibility support, and optional
 * close-on-overlay behavior.
 */
const meta: Meta<typeof Modal> = {
  title: 'Layout/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the modal is visible',
    },
    title: {
      control: 'text',
      description: 'Modal title displayed at the top',
    },
    description: {
      control: 'text',
      description: 'Optional description text below the title',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, minHeight: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
function ModalDemo({
  title,
  description,
  closeOnOverlay = true,
}: {
  title?: string;
  description?: string;
  closeOnOverlay?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        closeOnOverlay={closeOnOverlay}
      >
        <Text style={{ fontSize: 16, color: '#666', marginVertical: 16 }}>
          This is the modal content area. You can place any React Native components here.
        </Text>
      </Modal>
    </View>
  );
}

// Default modal
export const Default: Story = {
  render: () => (
    <ModalDemo
      title="Modal Title"
      description="This is an optional description that provides additional context."
    />
  ),
};

// Modal without description
export const WithoutDescription: Story = {
  render: () => <ModalDemo title="Simple Modal" />,
};

// Modal with footer actions
function ModalWithFooterDemo() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setOpen(true)}>Open Modal with Footer</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        footer={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Button variant="outline" onPress={() => setOpen(false)}>
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button onPress={() => setOpen(false)}>Confirm</Button>
            </View>
          </View>
        }
      >
        <Text style={{ fontSize: 16, color: '#666', marginVertical: 16 }}>
          This action cannot be undone. Please confirm that you want to continue.
        </Text>
      </Modal>
    </View>
  );
}

export const WithFooter: Story = {
  render: () => <ModalWithFooterDemo />,
};

// Modal that doesn't close on overlay
export const NoCloseOnOverlay: Story = {
  render: () => (
    <ModalDemo
      title="Persistent Modal"
      description="This modal requires clicking the close button to dismiss."
      closeOnOverlay={false}
    />
  ),
};

// Form modal example
function FormModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button onPress={() => setOpen(true)}>Open Form Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
        description="Update your profile information below."
        footer={
          <Button fullWidth onPress={() => setOpen(false)}>
            Save Changes
          </Button>
        }
      >
        <View style={{ gap: 16, marginVertical: 16 }}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
          >
            <Text style={{ color: '#666' }}>Name input placeholder</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e0e0e0',
            }}
          >
            <Text style={{ color: '#666' }}>Email input placeholder</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const FormModal: Story = {
  render: () => <FormModalDemo />,
};

// Showcase all modal variants
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <ModalDemo title="Basic Modal" />
      <ModalDemo
        title="With Description"
        description="A helpful description explaining what this modal does."
      />
      <ModalWithFooterDemo />
    </View>
  ),
};
