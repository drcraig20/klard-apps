import { isNetworkError } from '../error-helpers';

describe('isNetworkError', () => {
  it('should return true for TypeError: Network request failed', () => {
    expect(isNetworkError(new TypeError('Network request failed'))).toBe(true);
  });

  it('should return true for fetch failed errors', () => {
    expect(isNetworkError(new Error('fetch failed'))).toBe(true);
  });

  it('should return true for timeout errors', () => {
    expect(isNetworkError(new Error('Request timeout'))).toBe(true);
  });

  it('should return true for DNS errors', () => {
    expect(isNetworkError(new Error('getaddrinfo ENOTFOUND'))).toBe(true);
  });

  it('should return true for connection refused', () => {
    expect(isNetworkError(new Error('ECONNREFUSED'))).toBe(true);
  });

  it('should return false for auth errors', () => {
    expect(isNetworkError(new Error('Invalid credentials'))).toBe(false);
  });

  it('should return false for validation errors', () => {
    expect(isNetworkError(new Error('Email is required'))).toBe(false);
  });

  it('should handle null/undefined gracefully', () => {
    expect(isNetworkError(null)).toBe(false);
    expect(isNetworkError(undefined)).toBe(false);
  });
});
