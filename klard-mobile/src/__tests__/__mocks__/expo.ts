/**
 * Centralized Expo SDK Mock Factory
 *
 * SRP: Provides Expo SDK mocks only
 * OCP: Extend by adding new mock creators
 * DIP: Tests depend on these abstractions
 *
 * Usage in tests:
 *   import { createExpoRouterMock, createExpoImageMock } from '@/__tests__/__mocks__/expo';
 */

/**
 * Creates a mock for expo-router
 * @param overrides - Override specific router methods
 */
export function createExpoRouterMock(overrides: Record<string, jest.Mock> = {}) {
  return {
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
      ...overrides,
    })),
    useLocalSearchParams: jest.fn(() => ({})),
    useSegments: jest.fn(() => []),
    usePathname: jest.fn(() => '/'),
    Link: ({ children }: { children: React.ReactNode }) => children,
    router: {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      canGoBack: jest.fn(() => true),
    },
  };
}

/**
 * Creates a mock for expo-linear-gradient
 */
export function createExpoLinearGradientMock() {
  const View = require('react-native').View;
  return {
    LinearGradient: View,
  };
}

/**
 * Creates a mock for expo-image
 */
export function createExpoImageMock() {
  const View = require('react-native').View;
  return {
    Image: ({
      testID,
      accessibilityLabel,
      style,
    }: {
      testID?: string;
      accessibilityLabel?: string;
      style?: object;
    }) =>
      View({
        testID,
        accessibilityLabel,
        style,
      }),
  };
}

/**
 * Creates a mock for expo-haptics (already in jest.setup.ts, but available for overrides)
 */
export function createExpoHapticsMock(overrides: Partial<{
  impactAsync: jest.Mock;
  notificationAsync: jest.Mock;
  selectionAsync: jest.Mock;
}> = {}) {
  return {
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
    selectionAsync: jest.fn(),
    ...overrides,
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
  };
}

/**
 * Creates a mock for @expo/vector-icons
 * @param iconNames - Array of icon component names to mock
 */
export function createVectorIconsMock(iconNames: string[] = ['Ionicons', 'MaterialIcons', 'Feather']) {
  const mocks: Record<string, () => null> = {};
  iconNames.forEach((name) => {
    mocks[name] = () => null;
  });
  return mocks;
}

/**
 * Creates a mock for expo-blur
 */
export function createExpoBlurMock() {
  const View = require('react-native').View;
  return {
    BlurView: ({
      children,
      style,
      testID,
    }: {
      children?: React.ReactNode;
      intensity?: number;
      tint?: string;
      style?: object;
      testID?: string;
    }) => View({ testID: testID || 'blur-view', style, children }),
  };
}

/** Pre-built mocks ready for jest.mock() */
export const mockExpoRouter = createExpoRouterMock();
export const mockExpoLinearGradient = createExpoLinearGradientMock();
export const mockExpoImage = createExpoImageMock();
export const mockExpoHaptics = createExpoHapticsMock();
export const mockVectorIcons = createVectorIconsMock();
export const mockExpoBlur = createExpoBlurMock();
