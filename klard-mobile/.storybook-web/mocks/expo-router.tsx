/**
 * expo-router mock for Storybook web environment
 *
 * Provides stub implementations for routing hooks and components.
 */

import React from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle } from 'react-native';

export interface RouterMethods {
  push: (href: string | { pathname: string; params?: Record<string, string> }) => void;
  replace: (href: string | { pathname: string; params?: Record<string, string> }) => void;
  back: () => void;
  canGoBack: () => boolean;
  setParams: (params: Record<string, string>) => void;
  dismiss: (count?: number) => void;
  dismissAll: () => void;
  navigate: (href: string | { pathname: string; params?: Record<string, string> }) => void;
}

const routerMethods: RouterMethods = {
  push: (href) => console.log('[Storybook] router.push:', href),
  replace: (href) => console.log('[Storybook] router.replace:', href),
  back: () => console.log('[Storybook] router.back'),
  canGoBack: () => false,
  setParams: (params) => console.log('[Storybook] router.setParams:', params),
  dismiss: (count) => console.log('[Storybook] router.dismiss:', count),
  dismissAll: () => console.log('[Storybook] router.dismissAll'),
  navigate: (href) => console.log('[Storybook] router.navigate:', href),
};

export const router = routerMethods;

export function useRouter(): RouterMethods {
  return routerMethods;
}

export function useLocalSearchParams<T extends Record<string, string> = Record<string, string>>(): T {
  return {} as T;
}

export function useGlobalSearchParams<T extends Record<string, string> = Record<string, string>>(): T {
  return {} as T;
}

export function useSegments(): string[] {
  return [];
}

export function usePathname(): string {
  return '/';
}

export function useNavigation() {
  return {
    navigate: routerMethods.navigate,
    goBack: routerMethods.back,
    canGoBack: routerMethods.canGoBack,
    setParams: routerMethods.setParams,
    setOptions: (_options: unknown) => {},
    addListener: (_event: string, _callback: () => void) => ({ remove: () => {} }),
    removeListener: (_event: string, _callback: () => void) => {},
  };
}

export function useFocusEffect(_callback: () => void | (() => void)): void {
  // No-op in Storybook
}

export function useIsFocused(): boolean {
  return true;
}

interface LinkProps {
  href: string | { pathname: string; params?: Record<string, string> };
  children: React.ReactNode;
  asChild?: boolean;
  replace?: boolean;
  push?: boolean;
  style?: ViewStyle | TextStyle;
  onPress?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  style,
  onPress,
}) => {
  const handlePress = () => {
    console.log('[Storybook] Link pressed:', href);
    onPress?.();
  };

  if (typeof children === 'string') {
    return (
      <Pressable onPress={handlePress}>
        <Text style={[{ color: '#007AFF' }, style as TextStyle]}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} style={style as ViewStyle}>
      {children}
    </Pressable>
  );
};

interface StackProps {
  children?: React.ReactNode;
}

interface StackScreenProps {
  name?: string;
  options?: Record<string, unknown>;
  children?: React.ReactNode;
}

const StackScreen: React.FC<StackScreenProps> = ({ children }) => {
  return <>{children}</>;
};

export const Stack: React.FC<StackProps> & { Screen: typeof StackScreen } = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};
Stack.Screen = StackScreen;

interface TabsProps {
  children?: React.ReactNode;
  screenOptions?: Record<string, unknown>;
}

interface TabsScreenProps {
  name?: string;
  options?: Record<string, unknown>;
  children?: React.ReactNode;
}

const TabsScreen: React.FC<TabsScreenProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> & { Screen: typeof TabsScreen } = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};
Tabs.Screen = TabsScreen;

interface SlotProps {
  children?: React.ReactNode;
}

export const Slot: React.FC<SlotProps> = ({ children }) => {
  return <>{children}</>;
};

interface RedirectProps {
  href: string;
}

export const Redirect: React.FC<RedirectProps> = ({ href }) => {
  console.log('[Storybook] Redirect to:', href);
  return null;
};

export function withLayoutContext<T>(_Layout: React.ComponentType<T>) {
  return function LayoutWithContext(props: T) {
    return React.createElement(View, { style: { flex: 1 } }, null);
  };
}

export default {
  router,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
  useSegments,
  usePathname,
  useNavigation,
  useFocusEffect,
  useIsFocused,
  Link,
  Stack,
  Tabs,
  Slot,
  Redirect,
  withLayoutContext,
};
