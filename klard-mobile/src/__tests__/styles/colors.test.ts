// klard-mobile/src/__tests__/styles/colors.test.ts
import { lightTheme, darkTheme } from '@/styles/colors';

describe('Theme Colors', () => {
  describe('light theme', () => {
    it('should have all primary colors', () => {
      expect(lightTheme.primary).toBe('#0D7C7A');
      expect(lightTheme.primaryForeground).toBe('#FFFFFF');
      expect(lightTheme.primaryHover).toBeDefined();
    });

    it('should have all alert backgrounds', () => {
      expect(lightTheme.infoBackground).toBeDefined();
      expect(lightTheme.successBackground).toBeDefined();
      expect(lightTheme.warningBackground).toBeDefined();
      expect(lightTheme.errorBackground).toBeDefined();
    });

    it('should have all alert foregrounds', () => {
      expect(lightTheme.infoForeground).toBeDefined();
      expect(lightTheme.successForeground).toBeDefined();
      expect(lightTheme.warningForeground).toBeDefined();
      expect(lightTheme.errorForeground).toBeDefined();
    });

    it('should have all alert borders', () => {
      expect(lightTheme.infoBorder).toBeDefined();
      expect(lightTheme.successBorder).toBeDefined();
      expect(lightTheme.warningBorder).toBeDefined();
      expect(lightTheme.errorBorder).toBeDefined();
    });

    it('should have surface colors', () => {
      expect(lightTheme.surface).toBeDefined();
      expect(lightTheme.surface1).toBeDefined();
      expect(lightTheme.surface2).toBeDefined();
    });

    it('should have glow colors', () => {
      expect(lightTheme.glowPrimary).toBeDefined();
      expect(lightTheme.glowSuccess).toBeDefined();
      expect(lightTheme.glowWarning).toBeDefined();
      expect(lightTheme.glowError).toBeDefined();
    });

    it('should have interactive state colors', () => {
      expect(lightTheme.hoverBackground).toBeDefined();
      expect(lightTheme.activeBackground).toBeDefined();
      expect(lightTheme.selectedBackground).toBeDefined();
      expect(lightTheme.disabledBackground).toBeDefined();
    });
  });

  describe('dark theme', () => {
    it('should have swapped primary/secondary', () => {
      expect(darkTheme.primary).toBe('#15B5B0');
      expect(darkTheme.secondary).toBe('#0D7C7A');
    });

    it('should have all alert backgrounds with transparency', () => {
      expect(darkTheme.infoBackground).toContain('rgba');
      expect(darkTheme.successBackground).toContain('rgba');
      expect(darkTheme.warningBackground).toContain('rgba');
    });
  });

  describe('type safety', () => {
    it('light and dark themes should have the same keys', () => {
      const lightKeys = Object.keys(lightTheme).sort();
      const darkKeys = Object.keys(darkTheme).sort();
      expect(lightKeys).toEqual(darkKeys);
    });
  });
});
