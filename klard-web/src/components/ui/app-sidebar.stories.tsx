import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  CreditCard,
  Calendar,
  Settings,
  Bell,
  LayoutDashboard,
  User,
  LogOut,
} from 'lucide-react';
import { AppSidebar, type SidebarNavItem } from './app-sidebar';

/**
 * AppSidebar - A styled navigation sidebar with Klard branding
 *
 * Features:
 * - **Gradient background**: Teal-to-emerald gradient (`from-primary to-emerald-400`)
 * - **Active item glow**: Subtle glow effect on active items (`shadow-[0_0_12px_rgba(21,181,176,0.4)]`)
 * - **Glassmorphism**: Backdrop blur with translucent borders
 * - **Badge variants**: Default (white), alert (red), success (green)
 * - **Collapsible modes**: offcanvas, icon, none
 * - **Skeleton loading**: Built-in loading state
 */
const meta = {
  title: 'Navigation/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled navigation sidebar with teal-to-emerald gradient, glassmorphism effects, and active item glow. Supports badges with different variants and collapsible modes.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-full overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const baseNavItems: SidebarNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#', icon: LayoutDashboard },
  { id: 'subscriptions', label: 'Subscriptions', href: '#', icon: CreditCard },
  { id: 'calendar', label: 'Calendar', href: '#', icon: Calendar },
  { id: 'settings', label: 'Settings', href: '#', icon: Settings },
];

// Navigation items with badges
const navItemsWithBadges: SidebarNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#', icon: LayoutDashboard },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    href: '#',
    icon: CreditCard,
    badge: 12,
    badgeVariant: 'default',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '#',
    icon: Bell,
    badge: 3,
    badgeVariant: 'alert',
  },
  {
    id: 'savings',
    label: 'Savings',
    href: '#',
    icon: Home,
    badge: 5,
    badgeVariant: 'success',
  },
  { id: 'settings', label: 'Settings', href: '#', icon: Settings },
];

/**
 * Default sidebar with basic navigation items.
 * Displays the gradient background and glassmorphism effects.
 */
export const Default: Story = {
  args: {
    items: baseNavItems,
    groupLabel: 'Navigation',
  },
};

/**
 * Sidebar with an active item showing the glow effect.
 * The active item has a subtle teal glow (`shadow-[0_0_12px_rgba(21,181,176,0.4)]`)
 * and enhanced background opacity.
 */
export const WithActiveItem: Story = {
  args: {
    items: baseNavItems,
    activeItem: 'subscriptions',
    groupLabel: 'Navigation',
  },
};

/**
 * Sidebar demonstrating all badge variants:
 * - **default**: White translucent badge
 * - **alert**: Red badge for urgent notifications
 * - **success**: Green badge for positive indicators
 */
export const WithBadges: Story = {
  args: {
    items: navItemsWithBadges,
    activeItem: 'subscriptions',
    groupLabel: 'Application',
  },
};

/**
 * Sidebar with custom header and footer content.
 * Shows how to add branding in the header and user info in the footer.
 */
export const WithHeaderAndFooter: Story = {
  args: {
    items: baseNavItems,
    activeItem: 'dashboard',
    groupLabel: 'Menu',
    header: (
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 font-bold text-white">
          K
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">Klard</span>
          <span className="text-xs text-white/60">Subscription Manager</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex flex-col gap-2 px-2">
        <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <User className="size-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-white/60">john@example.com</span>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <LogOut className="size-4" />
          <span className="text-sm">Sign out</span>
        </button>
      </div>
    ),
  },
};

/**
 * Sidebar in collapsed icon mode.
 * When collapsed, only icons are visible. Use `collapsible="icon"` for this behavior.
 */
export const Collapsed: Story = {
  args: {
    items: baseNavItems,
    activeItem: 'dashboard',
    groupLabel: 'Navigation',
    collapsible: 'icon',
  },
};

/**
 * Skeleton loading state for the sidebar.
 * Use `AppSidebar.Skeleton` when loading navigation data.
 */
export const Skeleton: Story = {
  render: () => <AppSidebar.Skeleton count={5} />,
};

/**
 * Sidebar with disabled items.
 * Disabled items have reduced opacity and are not interactive.
 */
export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '#', icon: LayoutDashboard },
      { id: 'subscriptions', label: 'Subscriptions', href: '#', icon: CreditCard },
      {
        id: 'premium',
        label: 'Premium Features',
        href: '#',
        icon: Home,
        disabled: true,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: '#',
        icon: Calendar,
        disabled: true,
      },
      { id: 'settings', label: 'Settings', href: '#', icon: Settings },
    ],
    activeItem: 'subscriptions',
    groupLabel: 'Navigation',
  },
};

/**
 * Complete application layout example.
 * Shows header, navigation with badges, active state, and footer together.
 */
export const CompleteLayout: Story = {
  args: {
    items: navItemsWithBadges,
    activeItem: 'subscriptions',
    groupLabel: 'Application',
    header: (
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 font-bold text-white shadow-lg">
          K
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">Klard</span>
          <span className="text-xs text-white/60">Save on subscriptions</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex flex-col gap-2 border-t border-white/10 px-2 pt-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10">
            <User className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Sarah Wilson</span>
            <span className="text-xs text-white/60">Premium Plan</span>
          </div>
        </div>
      </div>
    ),
  },
};
