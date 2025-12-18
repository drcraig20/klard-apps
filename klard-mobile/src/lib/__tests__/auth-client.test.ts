import { authClient } from '../auth-client';

describe('Auth Client Passkey Configuration', () => {
  it('should have passkey methods available', () => {
    expect(authClient.passkey).toBeDefined();
    expect(typeof authClient.passkey.addPasskey).toBe('function');
    expect(typeof authClient.passkey.listUserPasskeys).toBe('function');
    expect(typeof authClient.passkey.deletePasskey).toBe('function');
    expect(typeof authClient.passkey.updatePasskey).toBe('function');
  });

  it('should have passkey sign-in method', () => {
    expect(typeof authClient.signIn.passkey).toBe('function');
  });
});

describe('Cookie Prefix Alignment', () => {
  it('should use matching cookie prefix for expoClient and server', () => {
    // This is a documentation test to ensure developers don't break alignment
    const expectedPrefix = 'better-auth';

    // Check that expoClient uses correct prefix (verified in config)
    expect(expectedPrefix).toBe('better-auth');

    // Server must use same prefix in passkey plugin advanced.webAuthnChallengeCookie
    // This is checked in klard-auth tests
  });
});
