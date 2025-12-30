'use client';

import * as React from 'react';
import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  sidebarContainerVariants,
  navItemVariants,
  navBadgeVariants,
  groupLabelVariants,
} from './app-sidebar.styles';

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  badgeVariant?: 'default' | 'alert' | 'success';
  disabled?: boolean;
}

export interface AppSidebarProps {
  items: SidebarNavItem[];
  activeItem?: string;
  groupLabel?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

export interface AppSidebarSkeletonProps {
  count?: number;
}

/**
 * AppSidebar Component with Bold Gradient and Glow Effects
 *
 * SOLID Compliance:
 * - SRP: Sidebar renders navigation only
 * - OCP: Extensible via nav items config and CVA variants
 */
function AppSidebar({
  items,
  activeItem,
  groupLabel = 'Application',
  header,
  footer,
  className,
  collapsible = 'offcanvas',
}: Readonly<AppSidebarProps>) {
  return (
    <SidebarProvider>
      <Sidebar
        data-testid="app-sidebar"
        className={cn(sidebarContainerVariants(), className)}
        collapsible={collapsible}
      >
        {header && <SidebarHeader>{header}</SidebarHeader>}

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={groupLabelVariants()}>
              {groupLabel}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id} data-slot="menu-item">
                      <Link
                        href={item.href}
                        className={navItemVariants({
                          active: isActive,
                          disabled: item.disabled,
                        })}
                        data-active={isActive}
                        aria-current={isActive ? 'page' : undefined}
                        aria-disabled={item.disabled}
                      >
                        <Icon />
                        <span>{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            data-slot="badge"
                            className={cn(
                              navBadgeVariants({ variant: item.badgeVariant }),
                              'ml-auto'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {footer && <SidebarFooter>{footer}</SidebarFooter>}
      </Sidebar>

      <SidebarInset>
        <SidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  );
}

function AppSidebarSkeleton({ count = 4 }: Readonly<AppSidebarSkeletonProps>) {
  return (
    <SidebarProvider>
      <Sidebar data-testid="app-sidebar">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: count }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <div data-testid="sidebar-skeleton-item">
                      <SidebarMenuSkeleton showIcon />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

AppSidebar.Skeleton = AppSidebarSkeleton;

export { AppSidebar };
