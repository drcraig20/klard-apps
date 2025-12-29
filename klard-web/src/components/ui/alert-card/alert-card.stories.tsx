import type { Meta, StoryObj } from "@storybook/react";
import { AlertCard, type AlertNotification } from "./alert-card";

const meta = {
  title: "Feedback/AlertCard",
  component: AlertCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Notification card component for displaying subscription alerts. Supports different alert types (renewal, payment failed, service blocked, new charge, card expiring, system) with optional subscription info and CTAs.",
      },
    },
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "warning", "error"],
      description: "Visual tone of the alert",
    },
    size: {
      control: "select",
      options: ["md", "sm"],
      description: "Card size variant",
    },
  },
} satisfies Meta<typeof AlertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base alert for stories
const baseAlert: AlertNotification = {
  id: "1",
  type: "renewal",
  title: "Subscription Renewal",
  body: "Your Netflix subscription will renew in 3 days.",
  timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  read: false,
};

// Default renewal alert
export const Default: Story = {
  args: {
    alert: baseAlert,
    onPress: () => console.log("Card pressed"),
  },
};

// Renewal alert
export const Renewal: Story = {
  args: {
    alert: {
      ...baseAlert,
      type: "renewal",
      title: "Subscription Renewal",
      body: "Your Spotify Premium subscription will renew in 3 days for $9.99.",
      subscription: {
        name: "Spotify",
        logoUrl: "https://logo.clearbit.com/spotify.com",
      },
    },
    onPress: () => console.log("Card pressed"),
  },
};

// Payment failed alert
export const PaymentFailed: Story = {
  args: {
    alert: {
      id: "2",
      type: "payment_failed",
      title: "Payment Failed",
      body: "We could not process your payment for Adobe Creative Cloud.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      subscription: {
        name: "Adobe Creative Cloud",
        logoUrl: "https://logo.clearbit.com/adobe.com",
      },
      ctaLabel: "Update Payment",
      onCtaPress: () => console.log("Update payment clicked"),
    },
    onPress: () => console.log("Card pressed"),
  },
};

// Service blocked alert
export const ServiceBlocked: Story = {
  args: {
    alert: {
      id: "3",
      type: "service_blocked",
      title: "Service Blocked",
      body: "Your Disney+ subscription has been blocked due to failed payments.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      subscription: {
        name: "Disney+",
        logoUrl: "https://logo.clearbit.com/disneyplus.com",
      },
    },
    onPress: () => console.log("Card pressed"),
  },
};

// New charge alert
export const NewCharge: Story = {
  args: {
    alert: {
      id: "4",
      type: "new_charge",
      title: "New Charge Detected",
      body: "A new charge of $14.99 was detected for your Hulu subscription.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      subscription: {
        name: "Hulu",
        logoUrl: "https://logo.clearbit.com/hulu.com",
      },
    },
    onPress: () => console.log("Card pressed"),
  },
};

// Card expiring alert
export const CardExpiring: Story = {
  args: {
    alert: {
      id: "5",
      type: "card_expiring",
      title: "Card Expiring Soon",
      body: "The card ending in 4242 expires next month. Update it to avoid service interruption.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: false,
      ctaLabel: "Update Card",
      onCtaPress: () => console.log("Update card clicked"),
    },
    onPress: () => console.log("Card pressed"),
  },
};

// System alert
export const SystemAlert: Story = {
  args: {
    alert: {
      id: "6",
      type: "system",
      title: "Maintenance Scheduled",
      body: "Klard will be undergoing maintenance on Sunday, 2 AM - 4 AM EST.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
    },
    onPress: () => console.log("Card pressed"),
  },
};

// Small size
export const Small: Story = {
  args: {
    alert: baseAlert,
    size: "sm",
    onPress: () => console.log("Card pressed"),
  },
};

// With dismiss button
export const WithDismiss: Story = {
  args: {
    alert: baseAlert,
    onPress: () => console.log("Card pressed"),
    onDismiss: () => console.log("Alert dismissed"),
  },
};

// Read notification (no unread dot)
export const ReadNotification: Story = {
  args: {
    alert: {
      ...baseAlert,
      read: true,
    },
    onPress: () => console.log("Card pressed"),
  },
};

// Without subscription info
export const WithoutSubscription: Story = {
  args: {
    alert: {
      id: "7",
      type: "system",
      title: "Welcome to Klard",
      body: "Start tracking your subscriptions to save money.",
      timestamp: new Date(),
      read: false,
    },
    onPress: () => console.log("Card pressed"),
  },
};

// All tones showcase
export const AllTones: Story = {
  render: () => (
    <div className="space-y-4">
      <AlertCard
        tone="info"
        alert={{
          id: "1",
          type: "renewal",
          title: "Info Tone Alert",
          body: "This is an info tone alert card.",
          timestamp: new Date(),
          read: false,
        }}
        onPress={() => console.log("Info pressed")}
      />
      <AlertCard
        tone="warning"
        alert={{
          id: "2",
          type: "new_charge",
          title: "Warning Tone Alert",
          body: "This is a warning tone alert card.",
          timestamp: new Date(),
          read: false,
        }}
        onPress={() => console.log("Warning pressed")}
      />
      <AlertCard
        tone="error"
        alert={{
          id: "3",
          type: "payment_failed",
          title: "Error Tone Alert",
          body: "This is an error tone alert card.",
          timestamp: new Date(),
          read: false,
        }}
        onPress={() => console.log("Error pressed")}
      />
    </div>
  ),
};
