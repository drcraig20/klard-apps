import { describe, it, expect } from 'vitest';
import { radius, radiusScale } from '../radius';

describe('Radius Tokens', () => {
  describe('Named Radius Values', () => {
    it('exports sm radius (8px)', () => {
      expect(radius.sm).toBe(8);
    });

    it('exports md radius (12px)', () => {
      expect(radius.md).toBe(12);
    });

    it('exports lg radius (16px)', () => {
      expect(radius.lg).toBe(16);
    });

    it('exports xl radius (24px)', () => {
      expect(radius.xl).toBe(24);
    });

    it('exports full radius for pills', () => {
      expect(radius.full).toBe(9999);
    });

    it('exports none radius', () => {
      expect(radius.none).toBe(0);
    });
  });

  describe('Radius Scale with Units', () => {
    it('exports pixel string values', () => {
      expect(radiusScale.sm).toBe('8px');
      expect(radiusScale.md).toBe('12px');
      expect(radiusScale.lg).toBe('16px');
      expect(radiusScale.xl).toBe('24px');
    });

    it('exports full as large value', () => {
      expect(radiusScale.full).toBe('9999px');
    });
  });

  describe('Component-Specific Radius', () => {
    it('exports button radius', () => {
      expect(radius.button).toBeDefined();
    });

    it('exports card radius', () => {
      expect(radius.card).toBeDefined();
    });

    it('exports input radius', () => {
      expect(radius.input).toBeDefined();
    });

    it('exports badge radius', () => {
      expect(radius.badge).toBeDefined();
    });
  });
});
