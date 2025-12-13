// klard-mobile/src/__tests__/styles/colors.test.ts
import { Colors } from '@/styles/colors';

describe('Colors', () => {
  describe('light theme', () => {
    it('should have all primary colors', () => {
      expect(Colors.light.primary).toBe('#0D7C7A');
      expect(Colors.light.primaryForeground).toBe('#FFFFFF');
      expect(Colors.light.primaryHover).toBeDefined();
    });

    it('should have all alert backgrounds', () => {
      expect(Colors.light.infoBackground).toBeDefined();
      expect(Colors.light.successBackground).toBeDefined();
      expect(Colors.light.warningBackground).toBeDefined();
      expect(Colors.light.errorBackground).toBeDefined();
    });

    it('should have all alert foregrounds', () => {
      expect(Colors.light.infoForeground).toBeDefined();
      expect(Colors.light.successForeground).toBeDefined();
      expect(Colors.light.warningForeground).toBeDefined();
      expect(Colors.light.errorForeground).toBeDefined();
    });

    it('should have all alert borders', () => {
      expect(Colors.light.infoBorder).toBeDefined();
      expect(Colors.light.successBorder).toBeDefined();
      expect(Colors.light.warningBorder).toBeDefined();
      expect(Colors.light.errorBorder).toBeDefined();
    });

    it('should have surface colors', () => {
      expect(Colors.light.surface).toBeDefined();
      expect(Colors.light.surface1).toBeDefined();
      expect(Colors.light.surface2).toBeDefined();
    });

    it('should have glow colors', () => {
      expect(Colors.light.glowPrimary).toBeDefined();
      expect(Colors.light.glowSuccess).toBeDefined();
      expect(Colors.light.glowWarning).toBeDefined();
      expect(Colors.light.glowError).toBeDefined();
    });

    it('should have interactive state colors', () => {
      expect(Colors.light.hoverBackground).toBeDefined();
      expect(Colors.light.activeBackground).toBeDefined();
      expect(Colors.light.selectedBackground).toBeDefined();
      expect(Colors.light.disabledBackground).toBeDefined();
    });
  });

  describe('dark theme', () => {
    it('should have swapped primary/secondary', () => {
      expect(Colors.dark.primary).toBe('#15B5B0');
      expect(Colors.dark.secondary).toBe('#0D7C7A');
    });

    it('should have all alert backgrounds with transparency', () => {
      expect(Colors.dark.infoBackground).toContain('rgba');
      expect(Colors.dark.successBackground).toContain('rgba');
      expect(Colors.dark.warningBackground).toContain('rgba');
    });
  });

  describe('type safety', () => {
    it('light and dark should have the same keys', () => {
      const lightKeys = Object.keys(Colors.light).sort();
      const darkKeys = Object.keys(Colors.dark).sort();
      expect(lightKeys).toEqual(darkKeys);
    });
  });
});