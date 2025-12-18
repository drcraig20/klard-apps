import { authClient } from '../auth-client';

describe('Auth Client Passkey Configuration', () => {
  it('should have passkey methods available', () => {
    expect(authClient.passkey).toBeDefined();
    expect(authClient.passkey.addPasskey).toBeInstanceOf(Function);
    expect(authClient.passkey.listUserPasskeys).toBeInstanceOf(Function);
    expect(authClient.passkey.deletePasskey).toBeInstanceOf(Function);
    expect(authClient.passkey.updatePasskey).toBeInstanceOf(Function);
  });

  it('should have passkey sign-in method', () => {
    expect(authClient.signIn.passkey).toBeInstanceOf(Function);
  });
});
