import { describe, it, expect } from 'vitest';
import { calculatePasswordStrength } from '../src/utils/password-strength';

describe('calculatePasswordStrength', () => {
  it('returns weak for empty password', () => {
    const result = calculatePasswordStrength('');
    expect(result.level).toBe('weak');
    expect(result.score).toBe(0);
  });

  it('returns weak for short password', () => {
    const result = calculatePasswordStrength('abc');
    expect(result.level).toBe('weak');
    expect(result.score).toBeLessThan(30);
  });

  it('returns fair for password with length only', () => {
    const result = calculatePasswordStrength('abcdefghij');
    expect(result.level).toBe('fair');
    expect(result.score).toBeGreaterThanOrEqual(30);
    expect(result.score).toBeLessThan(60);
  });

  it('returns good for password with length + number + uppercase', () => {
    const result = calculatePasswordStrength('Abcdefgh1');
    expect(result.level).toBe('good');
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.score).toBeLessThan(80);
  });

  it('returns strong for password meeting all criteria', () => {
    const result = calculatePasswordStrength('Abcdefgh1!');
    expect(result.level).toBe('strong');
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it('provides feedback for missing criteria', () => {
    const result = calculatePasswordStrength('abcdefgh');
    expect(result.feedback).toContain('Add a number');
    expect(result.feedback).toContain('Add an uppercase letter');
    expect(result.feedback).toContain('Add a special character');
  });
});
