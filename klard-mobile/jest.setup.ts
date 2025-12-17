// Jest setup file for React Native Testing Library
// Note: In v13+, matchers are extended by default when importing from '@testing-library/react-native'

// Silence console warnings in tests (optional - remove if you want to see warnings)
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  // Filter out specific warnings if needed
  const message = args[0];
  if (typeof message === 'string' && message.includes('Animated')) {
    return;
  }
  originalWarn(...args);
};

// Mock expo vector icons to avoid ESM transform issues in tests
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    name: 'klard-mobile',
    slug: 'klard-mobile',
  },
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;

  return {
    default: {
      View,
      Text: View,
      ScrollView: View,
      createAnimatedComponent: (component: unknown) => component,
    },
    useSharedValue: (initial: unknown) => ({ value: initial }),
    useAnimatedStyle: (callback: () => unknown) => callback(),
    withTiming: (value: unknown) => value,
    withSpring: (value: unknown) => value,
    withSequence: (...values: unknown[]) => values[values.length - 1],
    withDelay: (_delay: number, value: unknown) => value,
    withRepeat: (value: unknown) => value,
    runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
    useAnimatedGestureHandler: () => ({}),
    useAnimatedScrollHandler: () => () => {},
    Easing: {
      linear: (x: number) => x,
      ease: (x: number) => x,
      quad: (x: number) => x,
      cubic: (x: number) => x,
    },
  };
});
