import { describe, it, expect } from 'vitest';
import { lightColors, darkColors, semanticColors } from '../colors';

describe('Color Tokens', () => {
  describe('Light Theme', () => {
    it('exports primary color tokens', () => {
      expect(lightColors.primary).toBeDefined();
      expect(lightColors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(lightColors.primaryForeground).toBeDefined();
    });

    it('exports secondary color tokens', () => {
      expect(lightColors.secondary).toBeDefined();
      expect(lightColors.secondaryForeground).toBeDefined();
    });

    it('exports background and foreground', () => {
      expect(lightColors.background).toBeDefined();
      expect(lightColors.foreground).toBeDefined();
    });

    it('exports muted colors', () => {
      expect(lightColors.muted).toBeDefined();
      expect(lightColors.mutedForeground).toBeDefined();
    });

    it('exports card colors', () => {
      expect(lightColors.card).toBeDefined();
      expect(lightColors.cardForeground).toBeDefined();
    });

    it('exports border and input colors', () => {
      expect(lightColors.border).toBeDefined();
      expect(lightColors.input).toBeDefined();
      expect(lightColors.ring).toBeDefined();
    });
  });

  describe('Dark Theme', () => {
    it('exports primary color tokens', () => {
      expect(darkColors.primary).toBeDefined();
      expect(darkColors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(darkColors.primaryForeground).toBeDefined();
    });

    it('exports background and foreground', () => {
      expect(darkColors.background).toBeDefined();
      expect(darkColors.foreground).toBeDefined();
    });

    it('has different values from light theme', () => {
      expect(darkColors.primary).not.toBe(lightColors.primary);
      expect(darkColors.background).not.toBe(lightColors.background);
    });
  });

  describe('Semantic Colors', () => {
    it('exports success colors for both themes', () => {
      expect(semanticColors.light.success).toBeDefined();
      expect(semanticColors.dark.success).toBeDefined();
      expect(semanticColors.light.successForeground).toBeDefined();
      expect(semanticColors.dark.successForeground).toBeDefined();
    });

    it('exports warning colors for both themes', () => {
      expect(semanticColors.light.warning).toBeDefined();
      expect(semanticColors.dark.warning).toBeDefined();
      expect(semanticColors.light.warningForeground).toBeDefined();
      expect(semanticColors.dark.warningForeground).toBeDefined();
    });

    it('exports error/destructive colors for both themes', () => {
      expect(semanticColors.light.error).toBeDefined();
      expect(semanticColors.dark.error).toBeDefined();
      expect(semanticColors.light.destructive).toBeDefined();
      expect(semanticColors.dark.destructive).toBeDefined();
    });

    it('has different semantic values per theme', () => {
      expect(semanticColors.light.success).not.toBe(semanticColors.dark.success);
    });
  });

  describe('Color Format', () => {
    it('all light colors are valid hex format', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.entries(lightColors).forEach(([key, value]) => {
        expect(value, `lightColors.${key} should be valid hex`).toMatch(hexRegex);
      });
    });

    it('all dark colors are valid hex format', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.entries(darkColors).forEach(([key, value]) => {
        expect(value, `darkColors.${key} should be valid hex`).toMatch(hexRegex);
      });
    });
  });
});
