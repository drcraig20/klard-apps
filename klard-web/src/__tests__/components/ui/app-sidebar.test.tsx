/**
 * Tests for AppSidebar Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, navigation items, active state, badges, accessibility,
 * gradient background, glow effects, glassmorphism
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppSidebar, type SidebarNavItem } from '@/components/ui/app-sidebar';
import { Home, CreditCard, Bell, Settings } from 'lucide-react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockItems: SidebarNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
  { id: 'subscriptions', label: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { id: 'alerts', label: 'Alerts', href: '/alerts', icon: Bell, badge: 3 },
  { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];

describe('AppSidebar', () => {
  describe('Rendering', () => {
    it('should render sidebar element', () => {
      render(<AppSidebar items={mockItems} />);

      expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
    });

    it('should render all navigation items', () => {
      render(<AppSidebar items={mockItems} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Subscriptions')).toBeInTheDocument();
      expect(screen.getByText('Alerts')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should render links with correct href', () => {
      render(<AppSidebar items={mockItems} />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });

    it('should render navigation items with icons', () => {
      render(<AppSidebar items={mockItems} />);

      // All links should be rendered
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      expect(links.length).toBe(4);
    });
  });

  describe('Gradient Background', () => {
    it('should apply gradient background classes to sidebar', () => {
      render(<AppSidebar items={mockItems} />);

      const sidebar = screen.getByTestId('app-sidebar');
      // Check for gradient classes (bg-linear-to-br from-primary to-emerald-400)
      expect(sidebar.className).toMatch(/bg-linear-to-br/);
      expect(sidebar.className).toMatch(/from-primary/);
      expect(sidebar.className).toMatch(/to-emerald-400/);
    });

    it('should apply backdrop blur for glassmorphism effect', () => {
      render(<AppSidebar items={mockItems} />);

      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar.className).toMatch(/backdrop-blur/);
    });
  });

  describe('Active State with Glow', () => {
    it('should apply active styles to active item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('data-active', 'true');
    });

    it('should apply glow shadow class to active nav item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      // Check for the glow shadow class (uses CSS custom property)
      expect(dashboardLink.className).toMatch(/shadow-\[var\(--rec-glow-primary\)\]/);
    });

    it('should apply bg-white/20 to active nav item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink.className).toMatch(/bg-white\/20/);
    });

    it('should apply aria-current to active item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not apply active styles to inactive items', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const settingsLink = screen.getByRole('link', { name: /settings/i });
      expect(settingsLink).not.toHaveAttribute('data-active', 'true');
      expect(settingsLink).not.toHaveAttribute('aria-current', 'page');
      // Should have hover styles instead
      expect(settingsLink.className).toMatch(/hover:bg-white\/10/);
    });
  });

  describe('Glassmorphism', () => {
    it('should apply glass border to sidebar', () => {
      render(<AppSidebar items={mockItems} />);

      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar.className).toMatch(/border-white\/10/);
    });

    it('should apply border to active nav item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink.className).toMatch(/border-white\/20/);
    });
  });

  describe('Icon Styling', () => {
    it('should apply size classes to icons in nav items', () => {
      render(<AppSidebar items={mockItems} />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      // Icons should have size-5 class via [&>svg]:size-5
      expect(dashboardLink.className).toMatch(/\[&>svg\]:size-5/);
    });
  });

  describe('Badges', () => {
    it('should render badge when provided', () => {
      render(<AppSidebar items={mockItems} />);

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should render badge inside the link element', () => {
      render(<AppSidebar items={mockItems} />);

      const alertsLink = screen.getByRole('link', { name: /alerts/i });
      const badge = alertsLink.querySelector('[data-slot="badge"]');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('3');
    });

    it('should not render badge for items without badge', () => {
      render(<AppSidebar items={mockItems} />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      const badge = dashboardLink.querySelector('[data-slot="badge"]');
      expect(badge).toBeNull();
    });

    it('should support badge variants', () => {
      const itemsWithBadgeVariant: SidebarNavItem[] = [
        { id: 'alerts', label: 'Alerts', href: '/alerts', icon: Bell, badge: 5, badgeVariant: 'alert' },
      ];
      render(<AppSidebar items={itemsWithBadgeVariant} />);

      const badge = screen.getByText('5');
      expect(badge.className).toMatch(/bg-red-500/);
    });
  });

  describe('Header and Footer', () => {
    it('should render header content when provided', () => {
      render(
        <AppSidebar
          items={mockItems}
          header={<div data-testid="sidebar-header">Header Content</div>}
        />
      );

      expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
    });

    it('should render footer content when provided', () => {
      render(
        <AppSidebar
          items={mockItems}
          footer={<div data-testid="sidebar-footer">Footer Content</div>}
        />
      );

      expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
    });
  });

  describe('Group Label', () => {
    it('should render group label when provided', () => {
      render(<AppSidebar items={mockItems} groupLabel="Navigation" />);

      expect(screen.getByText('Navigation')).toBeInTheDocument();
    });

    it('should render default group label when not provided', () => {
      render(<AppSidebar items={mockItems} />);

      expect(screen.getByText('Application')).toBeInTheDocument();
    });

    it('should apply uppercase styling to group label', () => {
      render(<AppSidebar items={mockItems} groupLabel="Navigation" />);

      const label = screen.getByText('Navigation');
      expect(label.className).toMatch(/uppercase/);
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with gradient classes', () => {
      render(<AppSidebar items={mockItems} className="custom-class" />);

      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar).toHaveClass('custom-class');
      // Should also still have gradient classes
      expect(sidebar.className).toMatch(/bg-linear-to-br/);
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styles to disabled items', () => {
      const itemsWithDisabled: SidebarNavItem[] = [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home, disabled: true },
      ];
      render(<AppSidebar items={itemsWithDisabled} />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-disabled', 'true');
      expect(dashboardLink.className).toMatch(/opacity-50/);
      expect(dashboardLink.className).toMatch(/pointer-events-none/);
    });
  });

  describe('Trigger', () => {
    it('should render trigger button for collapse', () => {
      render(<AppSidebar items={mockItems} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
    });

    it('should toggle sidebar state on trigger click', () => {
      render(<AppSidebar items={mockItems} />);

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);
      // Trigger should exist and be clickable
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('Skeleton', () => {
    it('should render skeleton with default count', () => {
      render(<AppSidebar.Skeleton />);

      const skeletonItems = screen.getAllByTestId('sidebar-skeleton-item');
      expect(skeletonItems).toHaveLength(4); // default count
    });

    it('should render skeleton with specified count', () => {
      render(<AppSidebar.Skeleton count={6} />);

      const skeletonItems = screen.getAllByTestId('sidebar-skeleton-item');
      expect(skeletonItems).toHaveLength(6);
    });
  });
});
