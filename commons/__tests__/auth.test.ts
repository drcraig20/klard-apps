import { describe, it, expect } from 'vitest';
import { SignupSchema } from '../src/validation/auth';

describe('SignupSchema', () => {
  it('validates correct signup data', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = SignupSchema.safeParse({
      name: '',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'short',
      confirmPassword: 'short',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Different123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword');
    }
  });

  it('rejects when terms not agreed', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: false,
    });
    expect(result.success).toBe(false);
  });
});