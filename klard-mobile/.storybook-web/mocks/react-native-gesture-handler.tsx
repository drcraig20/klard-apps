/**
 * react-native-gesture-handler mock for Storybook web environment
 *
 * Provides pass-through components since gesture handling works differently on web.
 */

import React from 'react';
import {
  View,
  ScrollView as RNScrollView,
  FlatList as RNFlatList,
  type ViewProps,
  type ScrollViewProps,
  type FlatListProps,
} from 'react-native';

// Gesture state constants
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
} as const;

export type State = typeof State[keyof typeof State];

// Direction constants
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
} as const;

export type Directions = typeof Directions[keyof typeof Directions];

// Root view wrapper
interface GestureHandlerRootViewProps extends ViewProps {
  children?: React.ReactNode;
}

export const GestureHandlerRootView: React.FC<GestureHandlerRootViewProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      {children}
    </View>
  );
};

// Gesture handler components (pass-through to children)
interface GestureHandlerProps {
  children?: React.ReactNode;
  onGestureEvent?: (event: unknown) => void;
  onHandlerStateChange?: (event: unknown) => void;
  enabled?: boolean;
  [key: string]: unknown;
}

const createGestureHandler = (name: string): React.FC<GestureHandlerProps> => {
  const Handler: React.FC<GestureHandlerProps> = ({ children }) => {
    return <>{children}</>;
  };
  Handler.displayName = name;
  return Handler;
};

export const PanGestureHandler = createGestureHandler('PanGestureHandler');
export const TapGestureHandler = createGestureHandler('TapGestureHandler');
export const LongPressGestureHandler = createGestureHandler('LongPressGestureHandler');
export const PinchGestureHandler = createGestureHandler('PinchGestureHandler');
export const RotationGestureHandler = createGestureHandler('RotationGestureHandler');
export const FlingGestureHandler = createGestureHandler('FlingGestureHandler');
export const ForceTouchGestureHandler = createGestureHandler('ForceTouchGestureHandler');
export const NativeViewGestureHandler = createGestureHandler('NativeViewGestureHandler');

// Touchable components
export const TouchableOpacity = View;
export const TouchableHighlight = View;
export const TouchableWithoutFeedback = View;
export const TouchableNativeFeedback = View;

// Wrapped scroll components
export const ScrollView: React.FC<ScrollViewProps> = (props) => {
  return <RNScrollView {...props} />;
};

export const FlatList = <T,>(props: FlatListProps<T>) => {
  return <RNFlatList {...props} />;
};

// Swipeable component
interface SwipeableProps {
  children?: React.ReactNode;
  renderLeftActions?: () => React.ReactNode;
  renderRightActions?: () => React.ReactNode;
  onSwipeableOpen?: (direction: 'left' | 'right') => void;
  onSwipeableClose?: () => void;
  [key: string]: unknown;
}

export const Swipeable: React.FC<SwipeableProps> = ({ children }) => {
  return <>{children}</>;
};

// Drawer layout
interface DrawerLayoutProps {
  children?: React.ReactNode;
  drawerWidth?: number;
  drawerPosition?: 'left' | 'right';
  renderNavigationView?: () => React.ReactNode;
  [key: string]: unknown;
}

export const DrawerLayout: React.FC<DrawerLayoutProps> = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

// HOC for wrapping components
export function gestureHandlerRootHOC<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WrappedComponent(props: P) {
    return (
      <GestureHandlerRootView>
        <Component {...props} />
      </GestureHandlerRootView>
    );
  };
}

// Gesture detector (new API)
interface GestureDetectorProps {
  children?: React.ReactNode;
  gesture?: unknown;
}

export const GestureDetector: React.FC<GestureDetectorProps> = ({ children }) => {
  return <>{children}</>;
};

// Gesture factory
const createGestureFactory = () => ({
  onBegin: () => createGestureFactory(),
  onStart: () => createGestureFactory(),
  onUpdate: () => createGestureFactory(),
  onEnd: () => createGestureFactory(),
  onFinalize: () => createGestureFactory(),
  enabled: () => createGestureFactory(),
  minDistance: () => createGestureFactory(),
  maxDistance: () => createGestureFactory(),
  minPointers: () => createGestureFactory(),
  maxPointers: () => createGestureFactory(),
  minDuration: () => createGestureFactory(),
  maxDuration: () => createGestureFactory(),
  shouldCancelWhenOutside: () => createGestureFactory(),
  simultaneousWithExternalGesture: () => createGestureFactory(),
  requireExternalGestureToFail: () => createGestureFactory(),
  blocksExternalGesture: () => createGestureFactory(),
  withRef: () => createGestureFactory(),
  withTestId: () => createGestureFactory(),
  runOnJS: () => createGestureFactory(),
});

export const Gesture = {
  Pan: () => createGestureFactory(),
  Tap: () => createGestureFactory(),
  LongPress: () => createGestureFactory(),
  Pinch: () => createGestureFactory(),
  Rotation: () => createGestureFactory(),
  Fling: () => createGestureFactory(),
  ForceTouch: () => createGestureFactory(),
  Native: () => createGestureFactory(),
  Manual: () => createGestureFactory(),
  Hover: () => createGestureFactory(),
  Race: (..._gestures: unknown[]) => createGestureFactory(),
  Simultaneous: (..._gestures: unknown[]) => createGestureFactory(),
  Exclusive: (..._gestures: unknown[]) => createGestureFactory(),
};

export default {
  State,
  Directions,
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  FlingGestureHandler,
  ForceTouchGestureHandler,
  NativeViewGestureHandler,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  ScrollView,
  FlatList,
  Swipeable,
  DrawerLayout,
  gestureHandlerRootHOC,
  GestureDetector,
  Gesture,
};
