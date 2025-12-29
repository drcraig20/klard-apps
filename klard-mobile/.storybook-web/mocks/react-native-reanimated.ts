/**
 * react-native-reanimated mock for Storybook web environment
 *
 * Provides pass-through implementations for animation hooks and utilities.
 */

import { View } from 'react-native';

// Shared value mock
interface SharedValue<T> {
  value: T;
}

export function useSharedValue<T>(initialValue: T): SharedValue<T> {
  return { value: initialValue };
}

export function useDerivedValue<T>(
  processor: () => T,
  _dependencies?: unknown[]
): SharedValue<T> {
  return { value: processor() };
}

export function useAnimatedStyle<T extends object>(
  updater: () => T,
  _dependencies?: unknown[]
): T {
  return updater();
}

export function useAnimatedProps<T extends object>(
  updater: () => T,
  _dependencies?: unknown[]
): T {
  return updater();
}

// Animation functions - return the final value immediately
export function withTiming<T>(toValue: T, _config?: object, _callback?: (finished: boolean) => void): T {
  return toValue;
}

export function withSpring<T>(toValue: T, _config?: object, _callback?: (finished: boolean) => void): T {
  return toValue;
}

export function withDecay(_config?: object, _callback?: (finished: boolean) => void): number {
  return 0;
}

export function withSequence<T>(...animations: T[]): T {
  return animations[animations.length - 1];
}

export function withDelay<T>(_delay: number, animation: T): T {
  return animation;
}

export function withRepeat<T>(animation: T, _numberOfReps?: number, _reverse?: boolean, _callback?: (finished: boolean) => void): T {
  return animation;
}

export function cancelAnimation(_sharedValue: SharedValue<unknown>): void {
  // No-op
}

// Interpolation
export function interpolate(
  value: number,
  inputRange: number[],
  outputRange: number[],
  _extrapolationType?: object
): number {
  if (inputRange.length < 2 || outputRange.length < 2) return outputRange[0] || 0;

  // Simple linear interpolation
  const inputMin = inputRange[0];
  const inputMax = inputRange[inputRange.length - 1];
  const outputMin = outputRange[0];
  const outputMax = outputRange[outputRange.length - 1];

  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
}

export function interpolateColor(
  value: number,
  inputRange: number[],
  outputRange: string[],
  _colorSpace?: 'RGB' | 'HSV'
): string {
  const index = Math.min(Math.floor(value), outputRange.length - 1);
  return outputRange[Math.max(0, index)];
}

// Run on JS thread
export function runOnJS<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return fn;
}

export function runOnUI<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return fn;
}

// Worklet helpers
export function createWorklet<T extends (...args: unknown[]) => unknown>(fn: T): T {
  return fn;
}

// Gesture handler integration
export function useAnimatedGestureHandler<T extends object>(_handlers: T): T {
  return {} as T;
}

export function useAnimatedScrollHandler<T extends object>(_handlers: T | ((event: unknown) => void)): (event: unknown) => void {
  return () => {};
}

export function useAnimatedRef<T>(): { current: T | null } {
  return { current: null };
}

export function useScrollViewOffset(_animatedRef: unknown): SharedValue<number> {
  return { value: 0 };
}

// Measure
export function measure(_animatedRef: unknown): { x: number; y: number; width: number; height: number; pageX: number; pageY: number } | null {
  return null;
}

export function scrollTo(
  _animatedRef: unknown,
  _x: number,
  _y: number,
  _animated: boolean
): void {
  // No-op
}

// Extrapolation types
export const Extrapolation = {
  EXTEND: 'extend',
  CLAMP: 'clamp',
  IDENTITY: 'identity',
} as const;

export const Extrapolate = Extrapolation;

// Easing functions
const identity = (t: number) => t;

export const Easing = {
  linear: identity,
  ease: identity,
  quad: identity,
  cubic: identity,
  poly: (_n: number) => identity,
  sin: identity,
  circle: identity,
  exp: identity,
  elastic: (_bounciness?: number) => identity,
  back: (_s?: number) => identity,
  bounce: identity,
  bezier: (_x1: number, _y1: number, _x2: number, _y2: number) => identity,
  bezierFn: (_x1: number, _y1: number, _x2: number, _y2: number) => identity,
  in: (_easing: (t: number) => number) => identity,
  out: (_easing: (t: number) => number) => identity,
  inOut: (_easing: (t: number) => number) => identity,
};

// Layout animation
export const Layout = {
  duration: (_duration: number) => Layout,
  delay: (_delay: number) => Layout,
  springify: () => Layout,
  damping: (_damping: number) => Layout,
  mass: (_mass: number) => Layout,
  stiffness: (_stiffness: number) => Layout,
  overshootClamping: (_overshootClamping: boolean) => Layout,
  restDisplacementThreshold: (_restDisplacementThreshold: number) => Layout,
  restSpeedThreshold: (_restSpeedThreshold: number) => Layout,
  withInitialValues: (_values: object) => Layout,
  withCallback: (_callback: (finished: boolean) => void) => Layout,
};

export const FadeIn = Layout;
export const FadeOut = Layout;
export const FadeInUp = Layout;
export const FadeInDown = Layout;
export const FadeOutUp = Layout;
export const FadeOutDown = Layout;
export const SlideInLeft = Layout;
export const SlideInRight = Layout;
export const SlideOutLeft = Layout;
export const SlideOutRight = Layout;
export const ZoomIn = Layout;
export const ZoomOut = Layout;

// Animated components
export function createAnimatedComponent<T>(component: T): T {
  return component;
}

const Animated = {
  View,
  Text: View,
  Image: View,
  ScrollView: View,
  FlatList: View,
  createAnimatedComponent,
  addWhitelistedUIProps: () => {},
  addWhitelistedNativeProps: () => {},
};

export default Animated;
