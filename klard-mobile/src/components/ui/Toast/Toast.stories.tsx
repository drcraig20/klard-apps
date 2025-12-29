import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Button } from '../Button';

// Note: The actual Toast implementation uses react-native-toast-message
// which requires native modules. This story demonstrates the toast API
// with mock visuals since the actual toast library won't render in Storybook web.

interface MockToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

// Mock Toast visual for Storybook demonstration
function MockToast({ type, title, description }: MockToastProps) {
  const colors = {
    success: { bg: '#F0FDF4', border: '#059669', icon: '#059669' },
    error: { bg: '#FEF2F2', border: '#DC2626', icon: '#DC2626' },
    warning: { bg: '#FFFBEB', border: '#D97706', icon: '#D97706' },
    info: { bg: '#EFF6FF', border: '#2563EB', icon: '#2563EB' },
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  const style = colors[type];

  return (
    <View
      style={{
        backgroundColor: style.bg,
        borderWidth: 1,
        borderColor: style.border,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: style.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>{icons[type]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', fontSize: 16, color: '#0F172A' }}>
          {title}
        </Text>
        {description && (
          <Text style={{ color: '#64748B', marginTop: 4, fontSize: 14 }}>
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}

/**
 * Toast component provides non-intrusive notifications.
 * It uses react-native-toast-message under the hood with haptic feedback.
 *
 * Usage:
 * ```typescript
 * import { showToast } from '@/components/ui/Toast';
 *
 * showToast({
 *   type: 'success',
 *   title: 'Subscription added',
 *   description: 'Netflix has been added to your subscriptions',
 * });
 * ```
 *
 * Note: This Storybook demo shows mock visuals. The actual component
 * uses react-native-toast-message which requires native modules.
 */
const meta: Meta<typeof MockToast> = {
  title: 'Layout/Toast',
  component: MockToast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Toast type determines color and haptic feedback',
    },
    title: {
      control: 'text',
      description: 'Primary toast message (required)',
    },
    description: {
      control: 'text',
      description: 'Secondary description text (optional)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A toast notification system with haptic feedback. Types: success, error, warning, info.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 400 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Success toast
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Subscription added',
    description: 'Netflix has been added to your subscriptions',
  },
};

// Error toast
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Payment failed',
    description: 'Please check your card details and try again',
  },
};

// Warning toast
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Subscription expiring',
    description: 'Your Spotify subscription expires in 3 days',
  },
};

// Info toast
export const Info: Story = {
  args: {
    type: 'info',
    title: 'Sync in progress',
    description: 'Importing subscriptions from your bank',
  },
};

// Title only
export const TitleOnly: Story = {
  args: {
    type: 'success',
    title: 'Settings saved',
  },
};

// All types showcase
export const AllTypes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <MockToast
        type="success"
        title="Success"
        description="Operation completed successfully"
      />
      <MockToast
        type="error"
        title="Error"
        description="Something went wrong"
      />
      <MockToast
        type="warning"
        title="Warning"
        description="Please review before continuing"
      />
      <MockToast
        type="info"
        title="Info"
        description="Here's some useful information"
      />
    </View>
  ),
};

// Interactive demo showing API usage
function InteractiveToastDemo() {
  // Note: In actual usage, you would call showToast() from the Toast module
  // This demo shows the API pattern
  const [lastAction, setLastAction] = React.useState('');

  const simulateToast = (type: string, message: string) => {
    setLastAction(`showToast({ type: '${type}', title: '${message}' })`);
  };

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 14, color: '#64748B', marginBottom: 8 }}>
        Click buttons to see API calls (actual toasts require native runtime)
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Button
          size="sm"
          onPress={() => simulateToast('success', 'Action completed')}
        >
          Success Toast
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onPress={() => simulateToast('error', 'Action failed')}
        >
          Error Toast
        </Button>
        <Button
          size="sm"
          variant="outline"
          onPress={() => simulateToast('warning', 'Please review')}
        >
          Warning Toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => simulateToast('info', 'FYI')}
        >
          Info Toast
        </Button>
      </View>
      {lastAction && (
        <View
          style={{
            backgroundColor: '#F1F5F9',
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {lastAction}
          </Text>
        </View>
      )}
    </View>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveToastDemo />,
};

// Usage example code
export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>API Usage</Text>
      <View
        style={{
          backgroundColor: '#1E293B',
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#F8FAFC', fontFamily: 'monospace', fontSize: 12 }}>
          {`import { showToast, hideToast } from '@/components/ui/Toast';

// Show a success toast
showToast({
  type: 'success',
  title: 'Subscription saved',
  description: 'Your changes have been saved',
  duration: 3000, // optional, default 3000ms
});

// Show an error toast
showToast({
  type: 'error',
  title: 'Failed to save',
  description: 'Please try again',
});

// Hide the current toast
hideToast();`}
        </Text>
      </View>
      <Text style={{ fontSize: 14, color: '#64748B' }}>
        The toast system includes haptic feedback: success, error, and warning
        types trigger appropriate haptic patterns. Info toasts have no haptic.
      </Text>
    </View>
  ),
};
