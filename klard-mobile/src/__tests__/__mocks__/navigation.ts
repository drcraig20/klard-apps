/**
 * Centralized Navigation Mock Factory
 *
 * SRP: Provides navigation-related mocks only
 * OCP: Extend by adding new navigation patterns
 * DIP: Tests depend on these abstractions
 *
 * Usage in tests:
 *   import { createRouterMock, createNavigationMock } from '@/__tests__/__mocks__/navigation';
 */

/**
 * Creates a controlled router mock with spy functions
 */
export function createRouterMock() {
  const push = jest.fn();
  const replace = jest.fn();
  const back = jest.fn();
  const canGoBack = jest.fn(() => true);
  const dismiss = jest.fn();
  const dismissAll = jest.fn();

  return {
    push,
    replace,
    back,
    canGoBack,
    dismiss,
    dismissAll,
    // Helper to reset all router mocks
    reset: () => {
      push.mockClear();
      replace.mockClear();
      back.mockClear();
      canGoBack.mockClear();
      dismiss.mockClear();
      dismissAll.mockClear();
    },
  };
}

/**
 * Creates a mock for React Navigation (if used alongside Expo Router)
 */
export function createReactNavigationMock() {
  return {
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(() => jest.fn()),
    })),
    useRoute: jest.fn(() => ({
      params: {},
      name: 'MockScreen',
    })),
    useFocusEffect: jest.fn((callback: () => void) => callback()),
    useIsFocused: jest.fn(() => true),
  };
}

/**
 * Creates a mock for deep linking
 */
export function createDeepLinkMock(initialUrl = 'klard://') {
  return {
    Linking: {
      getInitialURL: jest.fn().mockResolvedValue(initialUrl),
      addEventListener: jest.fn(() => ({ remove: jest.fn() })),
      openURL: jest.fn(),
      canOpenURL: jest.fn().mockResolvedValue(true),
    },
  };
}

/** Default router instance for tests */
export const mockRouter = createRouterMock();
