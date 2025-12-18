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
