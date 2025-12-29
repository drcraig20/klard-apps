import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabBar, type TabItem } from './TabBar';

/**
 * TabBar component provides a horizontal scrollable tab navigation.
 * It supports icons, badges, disabled states, and haptic feedback on selection.
 */
const meta: Meta<typeof TabBar> = {
  title: 'Navigation/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected tab value',
    },
    tabs: {
      control: 'object',
      description: 'Array of tab items with value, label, icon, badge, and disabled props',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A horizontal scrollable tab bar with support for icons, notification badges, and disabled states.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
const basicTabs: TabItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancelled', label: 'Cancelled' },
];

// Interactive wrapper
function TabBarDemo({ tabs }: { tabs: TabItem[] }) {
  const [value, setValue] = useState(tabs[0].value);

  return (
    <View>
      <TabBar value={value} onChange={setValue} tabs={tabs} />
      <View
        style={{
          marginTop: 16,
          padding: 16,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#666' }}>Selected tab: {value}</Text>
      </View>
    </View>
  );
}

// Default tab bar
export const Default: Story = {
  render: () => <TabBarDemo tabs={basicTabs} />,
};

// Tab bar with icons
const tabsWithIcons: TabItem[] = [
  {
    value: 'home',
    label: 'Home',
    icon: <Ionicons name="home-outline" size={18} color="#666" />,
  },
  {
    value: 'subscriptions',
    label: 'Subscriptions',
    icon: <Ionicons name="card-outline" size={18} color="#666" />,
  },
  {
    value: 'cards',
    label: 'Cards',
    icon: <Ionicons name="wallet-outline" size={18} color="#666" />,
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: <Ionicons name="settings-outline" size={18} color="#666" />,
  },
];

export const WithIcons: Story = {
  render: () => <TabBarDemo tabs={tabsWithIcons} />,
};

// Tab bar with badges
const tabsWithBadges: TabItem[] = [
  { value: 'inbox', label: 'Inbox', badge: 5 },
  { value: 'sent', label: 'Sent' },
  { value: 'drafts', label: 'Drafts', badge: 2 },
  { value: 'spam', label: 'Spam', badge: 12 },
];

export const WithBadges: Story = {
  render: () => <TabBarDemo tabs={tabsWithBadges} />,
};

// Tab bar with icons and badges
const tabsWithIconsAndBadges: TabItem[] = [
  {
    value: 'notifications',
    label: 'Notifications',
    icon: <Ionicons name="notifications-outline" size={18} color="#666" />,
    badge: 3,
  },
  {
    value: 'messages',
    label: 'Messages',
    icon: <Ionicons name="chatbubble-outline" size={18} color="#666" />,
    badge: 8,
  },
  {
    value: 'alerts',
    label: 'Alerts',
    icon: <Ionicons name="alert-circle-outline" size={18} color="#666" />,
  },
];

export const WithIconsAndBadges: Story = {
  render: () => <TabBarDemo tabs={tabsWithIconsAndBadges} />,
};

// Tab bar with disabled tabs
const tabsWithDisabled: TabItem[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'premium', label: 'Premium', disabled: true },
  { value: 'archived', label: 'Archived', disabled: true },
];

export const WithDisabledTabs: Story = {
  render: () => <TabBarDemo tabs={tabsWithDisabled} />,
};

// Many tabs (scrollable)
const manyTabs: TabItem[] = [
  { value: 'tab1', label: 'First Tab' },
  { value: 'tab2', label: 'Second Tab' },
  { value: 'tab3', label: 'Third Tab' },
  { value: 'tab4', label: 'Fourth Tab' },
  { value: 'tab5', label: 'Fifth Tab' },
  { value: 'tab6', label: 'Sixth Tab' },
  { value: 'tab7', label: 'Seventh Tab' },
  { value: 'tab8', label: 'Eighth Tab' },
];

export const Scrollable: Story = {
  render: () => <TabBarDemo tabs={manyTabs} />,
};

// Subscription filter example
const subscriptionTabs: TabItem[] = [
  { value: 'all', label: 'All Subscriptions', badge: 12 },
  { value: 'active', label: 'Active', badge: 8 },
  { value: 'paused', label: 'Paused', badge: 2 },
  { value: 'cancelled', label: 'Cancelled', badge: 2 },
];

export const SubscriptionFilters: Story = {
  render: () => <TabBarDemo tabs={subscriptionTabs} />,
};
