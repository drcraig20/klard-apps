/**
 * react-native-safe-area-context mock for Storybook web environment
 *
 * Provides zero insets since web browsers don't have safe areas like mobile devices.
 */

import React, { createContext, useContext } from 'react';
import { View, type ViewStyle } from 'react-native';

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Metrics {
  insets: EdgeInsets;
  frame: Rect;
}

const defaultInsets: EdgeInsets = { top: 0, right: 0, bottom: 0, left: 0 };
const defaultFrame: Rect = { x: 0, y: 0, width: 390, height: 844 };

export const SafeAreaInsetsContext = createContext<EdgeInsets | null>(defaultInsets);
export const SafeAreaFrameContext = createContext<Rect | null>(defaultFrame);

export function useSafeAreaInsets(): EdgeInsets {
  const insets = useContext(SafeAreaInsetsContext);
  return insets || defaultInsets;
}

export function useSafeAreaFrame(): Rect {
  const frame = useContext(SafeAreaFrameContext);
  return frame || defaultFrame;
}

export function useInitialSafeAreaInsets(): EdgeInsets | null {
  return defaultInsets;
}

export function useInitialSafeAreaFrame(): Rect | null {
  return defaultFrame;
}

interface SafeAreaProviderProps {
  children: React.ReactNode;
  initialMetrics?: Metrics | null;
  style?: ViewStyle;
}

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaInsetsContext.Provider value={defaultInsets}>
      <SafeAreaFrameContext.Provider value={defaultFrame}>
        <View style={[{ flex: 1 }, style]}>
          {children}
        </View>
      </SafeAreaFrameContext.Provider>
    </SafeAreaInsetsContext.Provider>
  );
};

interface SafeAreaViewProps {
  children?: React.ReactNode;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  mode?: 'padding' | 'margin';
  style?: ViewStyle;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  edges,
  mode = 'padding',
  style,
}) => {
  const insets = useSafeAreaInsets();

  const edgeInsets: Record<string, number> = {};
  const prefix = mode === 'margin' ? 'margin' : 'padding';

  if (!edges || edges.includes('top')) {
    edgeInsets[`${prefix}Top`] = insets.top;
  }
  if (!edges || edges.includes('right')) {
    edgeInsets[`${prefix}Right`] = insets.right;
  }
  if (!edges || edges.includes('bottom')) {
    edgeInsets[`${prefix}Bottom`] = insets.bottom;
  }
  if (!edges || edges.includes('left')) {
    edgeInsets[`${prefix}Left`] = insets.left;
  }

  return (
    <View style={[edgeInsets as ViewStyle, style]}>
      {children}
    </View>
  );
};

export function withSafeAreaInsets<P extends { insets?: EdgeInsets }>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, 'insets'>> {
  return function WithSafeAreaInsets(props: Omit<P, 'insets'>) {
    const insets = useSafeAreaInsets();
    return <WrappedComponent {...(props as P)} insets={insets} />;
  };
}

export const initialWindowMetrics: Metrics | null = {
  insets: defaultInsets,
  frame: defaultFrame,
};

export default {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaInsetsContext,
  SafeAreaFrameContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  useInitialSafeAreaInsets,
  useInitialSafeAreaFrame,
  withSafeAreaInsets,
  initialWindowMetrics,
};
