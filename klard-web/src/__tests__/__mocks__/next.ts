/**
 * Centralized Next.js Mock Factory
 *
 * SRP: Provides Next.js related mocks only
 * OCP: Extend by adding new mock creators
 * DIP: Tests depend on these abstractions
 *
 * Usage in tests:
 *   import { createNextNavigationMock, createNextLinkMock } from '@/__tests__/__mocks__/next';
 */

import { vi } from 'vitest';

/**
 * Creates a mock for next/navigation
 * @param overrides - Override specific navigation methods
 */
export function createNextNavigationMock(overrides: Record<string, ReturnType<typeof vi.fn>> = {}) {
  const push = vi.fn();
  const replace = vi.fn();
  const back = vi.fn();
  const forward = vi.fn();
  const refresh = vi.fn();
  const prefetch = vi.fn();

  return {
    useRouter: vi.fn(() => ({
      push,
      replace,
      back,
      forward,
      refresh,
      prefetch,
      ...overrides,
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    useParams: vi.fn(() => ({})),
    redirect: vi.fn(),
    notFound: vi.fn(),
    // Expose individual mocks for assertions
    _mocks: {
      push,
      replace,
      back,
      forward,
      refresh,
      prefetch,
    },
  };
}

/**
 * Creates a mock for next/link
 */
export function createNextLinkMock() {
  return {
    __esModule: true,
    default: ({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode;
      href: string;
      [key: string]: unknown;
    }) => {
      // Return anchor element for testing
      return <a href={href} {...props}>{children}</a>;
    },
  };
}

/**
 * Creates a mock for next/image
 */
export function createNextImageMock() {
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      ...props
    }: {
      src: string;
      alt: string;
      [key: string]: unknown;
    }) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} {...props} />;
    },
  };
}

/**
 * Creates a mock for next/headers
 */
export function createNextHeadersMock(
  headers: Record<string, string> = {},
  cookies: Record<string, string> = {}
) {
  return {
    headers: vi.fn(() => ({
      get: vi.fn((key: string) => headers[key] || null),
      has: vi.fn((key: string) => key in headers),
      entries: vi.fn(() => Object.entries(headers)),
    })),
    cookies: vi.fn(() => ({
      get: vi.fn((key: string) => cookies[key] ? { value: cookies[key] } : undefined),
      has: vi.fn((key: string) => key in cookies),
      getAll: vi.fn(() => Object.entries(cookies).map(([name, value]) => ({ name, value }))),
    })),
  };
}

/** Pre-built mocks ready for vi.mock() */
export const mockNextNavigation = createNextNavigationMock();
export const mockNextLink = createNextLinkMock();
export const mockNextImage = createNextImageMock();
