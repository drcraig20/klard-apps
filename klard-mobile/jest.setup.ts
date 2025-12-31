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

// Mock expo-blur
jest.mock('expo-blur', () => {
  const View = require('react-native').View;
  return {
    BlurView: ({ children, intensity, tint, style, testID }: {
      children?: React.ReactNode;
      intensity?: number;
      tint?: string;
      style?: object;
      testID?: string;
    }) => View({ testID: testID || 'blur-view', style, children }),
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View, Text: RNText, ScrollView: RNScrollView } = require('react-native');

  const identity = (x: number) => x;

  // Animated components that work as React components
  const AnimatedView = View;
  const AnimatedText = RNText;
  const AnimatedScrollView = RNScrollView;

  const Animated = {
    View: AnimatedView,
    Text: AnimatedText,
    ScrollView: AnimatedScrollView,
    createAnimatedComponent: (component: unknown) => component,
    addWhitelistedUIProps: jest.fn(),
  };

  return {
    __esModule: true,
    default: Animated,
    // Also export View, Text, etc. directly for named imports
    View: AnimatedView,
    Text: AnimatedText,
    ScrollView: AnimatedScrollView,
    createAnimatedComponent: Animated.createAnimatedComponent,
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
      linear: identity,
      ease: identity,
      quad: identity,
      cubic: identity,
      in: () => identity,
      out: () => identity,
      inOut: () => identity,
      bezier: () => identity,
    },
  };
});

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock better-auth
jest.mock('better-auth/react', () => ({
  createAuthClient: jest.fn((config) => {
    // Create base client
    const client: any = {
      signIn: {
        email: jest.fn(),
      },
      signUp: {
        email: jest.fn(),
      },
      signOut: jest.fn(),
      useSession: jest.fn(),
      updateUser: jest.fn(),
    };

    // Only add passkey methods if passkeyClient plugin is present
    if (config?.plugins?.some((plugin: any) => plugin?.__passkey)) {
      client.passkey = {
        addPasskey: jest.fn(),
        listUserPasskeys: jest.fn(),
        deletePasskey: jest.fn(),
        updatePasskey: jest.fn(),
      };
      client.signIn.passkey = jest.fn();
    }

    return client;
  }),
}));

// Mock better-auth/client/plugins
jest.mock('better-auth/client/plugins', () => ({
  inferAdditionalFields: jest.fn(() => ({})),
}));

// Mock @better-auth/expo/client
jest.mock('@better-auth/expo/client', () => ({
  expoClient: jest.fn(() => ({})),
}));

// Mock @better-auth/passkey/client
jest.mock('@better-auth/passkey/client', () => ({
  passkeyClient: jest.fn(() => ({ __passkey: true })),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
  },
}));

// Mock @expo/ui
jest.mock('@expo/ui/swift-ui', () => ({
  DateTimePicker: () => null,
  Host: () => null,
  BottomSheet: () => null,
}));

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const View = require('react-native').View;
  return {
    __esModule: true,
    default: View,
    BottomSheetView: View,
    BottomSheetBackdrop: View,
    BottomSheetHandle: View,
    BottomSheetFlatList: View,
    BottomSheetScrollView: View,
  };
});

// Mock ThemeContext - Provide default light theme for all tests
jest.mock('@/contexts/ThemeContext', () => {
  const { lightTheme } = jest.requireActual('@/styles/colors/light');
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => ({
      theme: 'light' as const,
      themePreference: 'system' as const,
      colors: lightTheme,
      isDark: false,
      setThemePreference: jest.fn(),
    }),
  };
});

// Mock useThemeColors hook - Centralized theme colors for all tests
// Individual tests can override by calling jest.mock('@/hooks/useThemeColors', ...)
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: jest.fn(() => ({
    // Core
    primary: '#0D7C7A',
    primaryForeground: '#FFFFFF',
    secondary: '#15B5B0',
    secondaryForeground: '#FFFFFF',
    // Backgrounds
    background: '#FFFFFF',
    foreground: '#0F172A',
    // Cards
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    // Muted
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    // Borders
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#0D7C7A',
    // Status colors
    success: '#059669',
    successForeground: '#FFFFFF',
    warning: '#D97706',
    warningForeground: '#FFFFFF',
    error: '#DC2626',
    errorForeground: '#FFFFFF',
    info: '#0284C7',
    infoForeground: '#FFFFFF',
    // Glow effects
    glowPrimary: 'rgba(13, 124, 122, 0.2)',
    glowSuccess: 'rgba(5, 150, 105, 0.2)',
    glowWarning: 'rgba(217, 119, 6, 0.2)',
    glowError: 'rgba(220, 38, 38, 0.2)',
    // Misc
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',
    accent: '#15B5B0',
    accentForeground: '#FFFFFF',
    // Theme indicator
    isDark: false,
  })),
}));
