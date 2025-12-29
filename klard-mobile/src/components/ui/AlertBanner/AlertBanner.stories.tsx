import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AlertBanner, type AlertType } from './AlertBanner';

/**
 * AlertBanner displays inline notification banners for success, error, warning,
 * and info states. Supports titles, descriptions, custom icons, action buttons,
 * and dismissible functionality. Use for contextual feedback within forms or
 * page sections.
 */
const meta: Meta<typeof AlertBanner> = {
  title: 'Feedback/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type/severity of the alert',
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'The size of the banner',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the banner can be dismissed',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when the banner is dismissed',
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

// Success banner
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

// Error banner
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    children: 'There was a problem processing your request. Please try again.',
  },
};

// Warning banner
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    children: 'Your subscription will expire in 3 days. Renew now to avoid interruption.',
  },
};

// Info banner
export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    children: 'A new version of the app is available. Update to get the latest features.',
  },
};

// Without title
export const NoTitle: Story = {
  args: {
    type: 'info',
    children: 'This banner has no title, only a description.',
  },
};

// Compact size
export const Compact: Story = {
  args: {
    type: 'success',
    size: 'compact',
    children: 'Compact banner for tighter layouts.',
  },
};

// Dismissible banner
export const Dismissible: Story = {
  args: {
    type: 'info',
    title: 'Dismissible',
    children: 'This banner can be dismissed by tapping the X button.',
    dismissible: true,
    onDismiss: () => console.log('Banner dismissed'),
  },
};

// With action button
export const WithAction: Story = {
  args: {
    type: 'warning',
    title: 'Action Required',
    children: 'Please verify your email address to continue.',
    action: (
      <Pressable
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: '#F59E0B',
          borderRadius: 6,
          marginTop: 8,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
          Verify Email
        </Text>
      </Pressable>
    ),
  },
};

// Custom icon
export const CustomIcon: Story = {
  args: {
    type: 'info',
    title: 'Security Update',
    children: 'We recommend enabling two-factor authentication.',
    icon: <Ionicons name="shield-checkmark" size={20} color="#14B8A6" />,
  },
};

// Long content
export const LongContent: Story = {
  args: {
    type: 'info',
    title: 'Terms Updated',
    children:
      'We have updated our terms of service and privacy policy. Please review the changes to understand how they affect your use of our services. By continuing to use Klard, you agree to the updated terms.',
  },
};

// All types showcase
export const AllTypes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <AlertBanner type="success" title="Success">
        Operation completed successfully.
      </AlertBanner>
      <AlertBanner type="error" title="Error">
        Something went wrong.
      </AlertBanner>
      <AlertBanner type="warning" title="Warning">
        Please review before continuing.
      </AlertBanner>
      <AlertBanner type="info" title="Info">
        Here is some helpful information.
      </AlertBanner>
    </View>
  ),
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <AlertBanner type="info" title="Default Size" size="default">
        This is the default banner size with standard padding.
      </AlertBanner>
      <AlertBanner type="info" title="Compact Size" size="compact">
        This is a compact banner with reduced padding.
      </AlertBanner>
    </View>
  ),
};

// All types without titles
export const TypesNoTitle: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <AlertBanner type="success">
        Success message without title.
      </AlertBanner>
      <AlertBanner type="error">
        Error message without title.
      </AlertBanner>
      <AlertBanner type="warning">
        Warning message without title.
      </AlertBanner>
      <AlertBanner type="info">
        Info message without title.
      </AlertBanner>
    </View>
  ),
};

// Dismissible variants
export const DismissibleVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <AlertBanner
        type="success"
        title="Dismissible Success"
        dismissible
        onDismiss={() => console.log('Success dismissed')}
      >
        Tap X to dismiss this success banner.
      </AlertBanner>
      <AlertBanner
        type="error"
        title="Dismissible Error"
        dismissible
        onDismiss={() => console.log('Error dismissed')}
      >
        Tap X to dismiss this error banner.
      </AlertBanner>
      <AlertBanner
        type="warning"
        title="Dismissible Warning"
        dismissible
        onDismiss={() => console.log('Warning dismissed')}
      >
        Tap X to dismiss this warning banner.
      </AlertBanner>
      <AlertBanner
        type="info"
        title="Dismissible Info"
        dismissible
        onDismiss={() => console.log('Info dismissed')}
      >
        Tap X to dismiss this info banner.
      </AlertBanner>
    </View>
  ),
};

// Form validation example
export const FormValidation: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <AlertBanner type="error">
        Please fix the following errors: Email is required, Password must be at least 8 characters.
      </AlertBanner>
    </View>
  ),
};

// Payment success example
export const PaymentSuccess: Story = {
  args: {
    type: 'success',
    title: 'Payment Successful',
    children: 'Your payment of $15.99 has been processed. Receipt sent to your email.',
    action: (
      <Pressable
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: '#22C55E',
          borderRadius: 6,
          marginTop: 8,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
          View Receipt
        </Text>
      </Pressable>
    ),
  },
};

// Card blocked notification
export const CardBlocked: Story = {
  args: {
    type: 'error',
    title: 'Card Blocked',
    children: 'Your burner card ending in 4242 has been blocked due to suspicious activity.',
    dismissible: true,
    action: (
      <Pressable
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: '#EF4444',
          borderRadius: 6,
          marginTop: 8,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
          Review Activity
        </Text>
      </Pressable>
    ),
  },
};
