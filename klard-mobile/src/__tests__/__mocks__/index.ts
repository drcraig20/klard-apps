/**
 * Centralized Mock Factory - Main Entry Point
 *
 * Import all mocks from here for consistency:
 *   import { mockLightColors, createExpoRouterMock } from '@/__tests__/__mocks__';
 *
 * SOLID Compliance:
 * - SRP: Each mock module handles one concern
 * - OCP: Add new mocks without modifying existing ones
 * - ISP: Import only what you need
 * - DIP: Tests depend on these abstractions
 */

// Theme mocks
export {
  mockLightColors,
  mockDarkColors,
  mockUseThemeColors,
  createUseThemeColorsMock,
  createThemeContextMock,
} from './theme';

// Expo SDK mocks
export {
  mockExpoRouter,
  mockExpoLinearGradient,
  mockExpoImage,
  mockExpoHaptics,
  mockVectorIcons,
  mockExpoBlur,
  createExpoRouterMock,
  createExpoLinearGradientMock,
  createExpoImageMock,
  createExpoHapticsMock,
  createVectorIconsMock,
  createExpoBlurMock,
} from './expo';

// Navigation mocks
export {
  mockRouter,
  createRouterMock,
  createReactNavigationMock,
  createDeepLinkMock,
} from './navigation';
