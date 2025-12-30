import { describe, it, expect } from 'vitest';
import { duration, easing, animation } from '../animation';

describe('Animation Tokens', () => {
  describe('Duration Values', () => {
    it('exports instant duration', () => {
      expect(duration.instant).toBe(0);
    });

    it('exports fast duration', () => {
      expect(duration.fast).toBe(150);
    });

    it('exports normal duration', () => {
      expect(duration.normal).toBe(200);
    });

    it('exports slow duration', () => {
      expect(duration.slow).toBe(300);
    });

    it('exports slower duration', () => {
      expect(duration.slower).toBe(500);
    });

    it('all durations are numbers (milliseconds)', () => {
      Object.values(duration).forEach((value) => {
        expect(typeof value).toBe('number');
      });
    });
  });

  describe('Easing Functions', () => {
    it('exports default easing', () => {
      expect(easing.default).toBeDefined();
      expect(easing.default).toContain('cubic-bezier');
    });

    it('exports ease-in', () => {
      expect(easing.easeIn).toBeDefined();
    });

    it('exports ease-out', () => {
      expect(easing.easeOut).toBeDefined();
    });

    it('exports ease-in-out', () => {
      expect(easing.easeInOut).toBeDefined();
    });

    it('exports spring easing', () => {
      expect(easing.spring).toBeDefined();
    });
  });

  describe('Composite Animations', () => {
    it('exports button animation', () => {
      expect(animation.buttonPress).toBeDefined();
    });

    it('exports fade animation', () => {
      expect(animation.fadeIn).toBeDefined();
      expect(animation.fadeOut).toBeDefined();
    });

    it('exports scale animation', () => {
      expect(animation.scaleIn).toBeDefined();
    });

    it('exports slide animations', () => {
      expect(animation.slideInUp).toBeDefined();
      expect(animation.slideInDown).toBeDefined();
    });
  });

  describe('Scale Transform Values', () => {
    it('exports hover scale', () => {
      expect(animation.hoverScale).toBeDefined();
      expect(typeof animation.hoverScale).toBe('number');
    });

    it('exports press scale', () => {
      expect(animation.pressScale).toBeDefined();
      expect(animation.pressScale).toBeLessThan(1);
    });
  });
});
