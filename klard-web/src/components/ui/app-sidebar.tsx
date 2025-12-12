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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
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

function AppSidebar({
  items,
  activeItem,
  groupLabel = 'Application',
  header,
  footer,
  className,
  collapsible = 'offcanvas',
}: AppSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar data-testid="app-sidebar" className={className} collapsible={collapsible}>
        {header && <SidebarHeader>{header}</SidebarHeader>}

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id} data-slot="menu-item">
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        aria-current={isActive ? 'page' : undefined}
                        disabled={item.disabled}
                      >
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge !== undefined && item.badge > 0 && (
                        <SidebarMenuBadge data-slot="badge">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
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

function AppSidebarSkeleton({ count = 4 }: AppSidebarSkeletonProps) {
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
