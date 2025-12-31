/**
 * Centralized Auth Mock Factory
 *
 * SRP: Provides authentication-related mocks only
 * OCP: Extend by adding new auth methods
 * DIP: Tests depend on these abstractions
 *
 * Usage in tests:
 *   import { createAuthClientMock, mockSession } from '@/__tests__/__mocks__/auth';
 */

import { vi } from 'vitest';

/** Mock user data */
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  image: null,
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

/** Mock session data */
export const mockSession = {
  user: mockUser,
  session: {
    id: 'test-session-id',
    userId: 'test-user-id',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
};

/**
 * Creates a mock for @/lib/auth-client
 * @param overrides - Override specific auth methods or session state
 */
export function createAuthClientMock(overrides: {
  isAuthenticated?: boolean;
  user?: typeof mockUser | null;
  session?: typeof mockSession.session | null;
  signInResult?: { error?: { message: string } } | null;
  signUpResult?: { error?: { message: string } } | null;
} = {}) {
  const isAuthenticated = overrides.isAuthenticated ?? true;
  const user = overrides.user ?? (isAuthenticated ? mockUser : null);
  const session = overrides.session ?? (isAuthenticated ? mockSession.session : null);

  const signIn = {
    email: vi.fn().mockResolvedValue(overrides.signInResult ?? {}),
    social: vi.fn().mockResolvedValue({}),
  };

  const signUp = {
    email: vi.fn().mockResolvedValue(overrides.signUpResult ?? {}),
  };

  const signOut = vi.fn().mockResolvedValue({});

  const useSession = vi.fn(() => ({
    data: isAuthenticated ? { user, session } : null,
    isPending: false,
    error: null,
  }));

  return {
    signIn,
    signUp,
    signOut,
    useSession,
    authClient: {
      signIn,
      signUp,
      signOut,
      useSession,
    },
    // Expose for direct import pattern
    default: {
      signIn,
      signUp,
      signOut,
      useSession,
    },
  };
}

/**
 * Creates a mock for useSession hook (standalone)
 */
export function createUseSessionMock(isAuthenticated = true) {
  return vi.fn(() => ({
    data: isAuthenticated ? mockSession : null,
    isPending: false,
    error: null,
  }));
}

/**
 * Creates a mock for OAuth providers
 */
export function createOAuthMock() {
  return {
    signIn: {
      social: vi.fn().mockResolvedValue({}),
    },
    providers: {
      google: { id: 'google', name: 'Google' },
      github: { id: 'github', name: 'GitHub' },
      apple: { id: 'apple', name: 'Apple' },
    },
  };
}

/** Pre-built mocks */
export const mockAuthClient = createAuthClientMock();
export const mockAuthClientUnauthenticated = createAuthClientMock({ isAuthenticated: false });
