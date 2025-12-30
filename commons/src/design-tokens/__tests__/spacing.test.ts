import { describe, it, expect } from 'vitest';
import { spacing, spacingScale } from '../spacing';

describe('Spacing Tokens', () => {
  describe('Spacing Scale (4/8 Grid)', () => {
    it('exports standard spacing values', () => {
      expect(spacing[0]).toBe(0);
      expect(spacing[1]).toBe(4);
      expect(spacing[2]).toBe(8);
      expect(spacing[3]).toBe(12);
      expect(spacing[4]).toBe(16);
      expect(spacing[6]).toBe(24);
      expect(spacing[8]).toBe(32);
    });

    it('exports extended spacing values', () => {
      expect(spacing[10]).toBe(40);
      expect(spacing[12]).toBe(48);
      expect(spacing[16]).toBe(64);
      expect(spacing[20]).toBe(80);
      expect(spacing[24]).toBe(96);
    });

    it('follows 4px base unit multiplication for numeric keys', () => {
      const numericKeys = Object.keys(spacing).filter((key) => !isNaN(parseInt(key)));
      numericKeys.forEach((key) => {
        const multiplier = parseInt(key);
        expect(spacing[key as keyof typeof spacing]).toBe(multiplier * 4);
      });
    });
  });

  describe('Spacing Scale with Units', () => {
    it('exports pixel string values', () => {
      expect(spacingScale['0']).toBe('0px');
      expect(spacingScale['1']).toBe('4px');
      expect(spacingScale['2']).toBe('8px');
      expect(spacingScale['4']).toBe('16px');
    });

    it('includes rem values for accessibility', () => {
      expect(spacingScale['1rem']).toBe('0.25rem');
      expect(spacingScale['2rem']).toBe('0.5rem');
      expect(spacingScale['4rem']).toBe('1rem');
    });
  });

  describe('Component-Specific Spacing', () => {
    it('exports card padding', () => {
      expect(spacing.cardPadding).toBeDefined();
      expect(typeof spacing.cardPadding).toBe('number');
    });

    it('exports button padding', () => {
      expect(spacing.buttonPaddingX).toBeDefined();
      expect(spacing.buttonPaddingY).toBeDefined();
    });

    it('exports input padding', () => {
      expect(spacing.inputPaddingX).toBeDefined();
      expect(spacing.inputPaddingY).toBeDefined();
    });
  });
});
