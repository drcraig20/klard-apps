// klard-web/src/types/__tests__/passkey.test.ts
import type { PasskeyAuthResult, PasskeyError, Passkey } from '../passkey';

describe('Passkey Types', () => {
  it('should have PasskeyAuthResult type', () => {
    const result: PasskeyAuthResult = {
      success: true,
      data: { id: '123', name: 'My Device', createdAt: new Date() },
    };
    expect(result.success).toBe(true);
  });

  it('should have PasskeyError type', () => {
    const error: PasskeyError = {
      code: 'USER_CANCELLED',
      message: 'User cancelled authentication',
    };
    expect(error.code).toBe('USER_CANCELLED');
  });
});
