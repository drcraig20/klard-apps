/**
 * Centralized Mock Factory - Main Entry Point (Web)
 *
 * Import all mocks from here for consistency:
 *   import { mockNextNavigation, createAuthClientMock } from '@/__tests__/__mocks__';
 *
 * SOLID Compliance:
 * - SRP: Each mock module handles one concern
 * - OCP: Add new mocks without modifying existing ones
 * - ISP: Import only what you need
 * - DIP: Tests depend on these abstractions
 */

// Next.js mocks
export {
  mockNextNavigation,
  mockNextLink,
  mockNextImage,
  createNextNavigationMock,
  createNextLinkMock,
  createNextImageMock,
  createNextHeadersMock,
} from './next';

// Auth mocks
export {
  mockUser,
  mockSession,
  mockAuthClient,
  mockAuthClientUnauthenticated,
  createAuthClientMock,
  createUseSessionMock,
  createOAuthMock,
} from './auth';
