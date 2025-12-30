import { describe, it, expect } from 'vitest';
import {
  glassmorphism,
  glowEffects,
  shadowEffects,
  focusEffects,
} from '../effects';

describe('Effect Tokens', () => {
  describe('Glassmorphism', () => {
    it('exports blur values', () => {
      expect(glassmorphism.blur.card).toBeDefined();
      expect(glassmorphism.blur.nav).toBeDefined();
      expect(glassmorphism.blur.modal).toBeDefined();
    });

    it('exports glass border colors for both themes', () => {
      expect(glassmorphism.border.light).toBeDefined();
      expect(glassmorphism.border.dark).toBeDefined();
    });

    it('exports glass background colors for both themes', () => {
      expect(glassmorphism.background.light).toBeDefined();
      expect(glassmorphism.background.dark).toBeDefined();
    });

    it('blur values are pixel strings', () => {
      expect(glassmorphism.blur.card).toMatch(/^\d+px$/);
      expect(glassmorphism.blur.nav).toMatch(/^\d+px$/);
    });
  });

  describe('Glow Effects', () => {
    it('exports light theme glows', () => {
      expect(glowEffects.light.primary).toBeDefined();
      expect(glowEffects.light.success).toBeDefined();
      expect(glowEffects.light.warning).toBeDefined();
      expect(glowEffects.light.error).toBeDefined();
    });

    it('exports dark theme glows', () => {
      expect(glowEffects.dark.primary).toBeDefined();
      expect(glowEffects.dark.success).toBeDefined();
      expect(glowEffects.dark.warning).toBeDefined();
      expect(glowEffects.dark.error).toBeDefined();
    });

    it('glow values are valid box-shadow format', () => {
      // Box shadow format: offset-x offset-y blur-radius color
      const shadowRegex = /^0\s+0\s+\d+px\s+rgba\(/;
      expect(glowEffects.light.primary).toMatch(shadowRegex);
      expect(glowEffects.dark.primary).toMatch(shadowRegex);
    });

    it('dark theme has different glow intensity', () => {
      expect(glowEffects.light.primary).not.toBe(glowEffects.dark.primary);
    });
  });

  describe('Shadow Effects', () => {
    it('exports shadow scale', () => {
      expect(shadowEffects.sm).toBeDefined();
      expect(shadowEffects.md).toBeDefined();
      expect(shadowEffects.lg).toBeDefined();
      expect(shadowEffects.xl).toBeDefined();
    });

    it('exports card-specific shadow', () => {
      expect(shadowEffects.card).toBeDefined();
    });

    it('shadows are valid CSS box-shadow format', () => {
      // Should contain rgba and px values
      expect(shadowEffects.sm).toContain('px');
      expect(shadowEffects.md).toContain('rgba');
    });
  });

  describe('Focus Effects', () => {
    it('exports focus ring for both themes', () => {
      expect(focusEffects.ring.light).toBeDefined();
      expect(focusEffects.ring.dark).toBeDefined();
    });

    it('exports focus ring width', () => {
      expect(focusEffects.ringWidth).toBeDefined();
      expect(focusEffects.ringWidth).toMatch(/^\d+px$/);
    });

    it('exports focus ring offset', () => {
      expect(focusEffects.ringOffset).toBeDefined();
    });
  });
});
