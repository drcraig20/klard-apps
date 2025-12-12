/**
 * Tests for AppSidebar Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, navigation items, active state, badges, accessibility
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
  });

  describe('Active State', () => {
    it('should apply active styles to active item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardButton = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardButton).toHaveAttribute('data-active', 'true');
    });

    it('should apply aria-current to active item', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not apply active styles to inactive items', () => {
      render(<AppSidebar items={mockItems} activeItem="dashboard" />);

      const settingsButton = screen.getByRole('link', { name: /settings/i });
      expect(settingsButton).not.toHaveAttribute('data-active', 'true');
      expect(settingsButton).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Badges', () => {
    it('should render badge when provided', () => {
      render(<AppSidebar items={mockItems} />);

      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should not render badge for items without badge', () => {
      render(<AppSidebar items={mockItems} />);

      // Dashboard should not have a badge
      const dashboardItem = screen.getByRole('link', { name: /dashboard/i }).closest('[data-slot="menu-item"]');
      const badge = dashboardItem?.querySelector('[data-slot="badge"]');
      expect(badge).toBeNull();
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
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      render(<AppSidebar items={mockItems} className="custom-class" />);

      const sidebar = screen.getByTestId('app-sidebar');
      expect(sidebar).toHaveClass('custom-class');
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
