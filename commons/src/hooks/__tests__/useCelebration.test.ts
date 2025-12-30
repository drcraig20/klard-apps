import { describe, it, expect } from 'vitest';
import { useCelebration, type CelebrationConfig } from '../useCelebration';

describe('useCelebration', () => {
  describe('first block celebration', () => {
    it('returns full intensity for first block (blockCount === 0)', () => {
      const config: CelebrationConfig = {
        blockCount: 0,
        totalSaved: 50,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });
  });

  describe('milestone celebrations', () => {
    it('returns full intensity when savings is exactly at milestone (100)', () => {
      const config: CelebrationConfig = {
        blockCount: 5,
        totalSaved: 100,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('returns full intensity when savings is multiple of milestone (200, 300, etc)', () => {
      const config: CelebrationConfig = {
        blockCount: 15,
        totalSaved: 200,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('returns full intensity when block count reaches milestone (10)', () => {
      const config: CelebrationConfig = {
        blockCount: 10,
        totalSaved: 75,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('returns full intensity when block count is multiple of milestone (20, 30, etc)', () => {
      const config: CelebrationConfig = {
        blockCount: 30,
        totalSaved: 85,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });
  });

  describe('custom thresholds (OCP)', () => {
    it('uses custom savings milestone threshold', () => {
      const config: CelebrationConfig = {
        blockCount: 5,
        totalSaved: 50,
        thresholds: {
          savingsMilestone: 50,
        },
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('uses custom block milestone threshold', () => {
      const config: CelebrationConfig = {
        blockCount: 5,
        totalSaved: 75,
        thresholds: {
          blockMilestone: 5,
        },
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('uses both custom thresholds together', () => {
      const config: CelebrationConfig = {
        blockCount: 25,
        totalSaved: 250,
        thresholds: {
          savingsMilestone: 250,
          blockMilestone: 25,
        },
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });
  });

  describe('user preference', () => {
    it('returns off when user preference is off (overrides everything)', () => {
      const config: CelebrationConfig = {
        blockCount: 0, // First block - would normally be full
        totalSaved: 100, // Milestone - would normally be full
        userPreference: 'off',
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('off');
    });

    it('returns user preference subtle when no milestone', () => {
      const config: CelebrationConfig = {
        blockCount: 3,
        totalSaved: 45,
        userPreference: 'subtle',
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('subtle');
    });

    it('returns full for milestone even when user preference is subtle', () => {
      const config: CelebrationConfig = {
        blockCount: 10, // Block milestone
        totalSaved: 45,
        userPreference: 'subtle',
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });

    it('returns user preference full when specified', () => {
      const config: CelebrationConfig = {
        blockCount: 3,
        totalSaved: 45,
        userPreference: 'full',
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('full');
    });
  });

  describe('default behavior', () => {
    it('returns subtle when no milestone and no user preference', () => {
      const config: CelebrationConfig = {
        blockCount: 3,
        totalSaved: 45,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('subtle');
    });

    it('returns subtle for non-milestone values near milestones', () => {
      const config: CelebrationConfig = {
        blockCount: 9, // Close to 10 but not exactly
        totalSaved: 99, // Close to 100 but not exactly
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('subtle');
    });
  });

  describe('edge cases', () => {
    it('handles zero totalSaved', () => {
      const config: CelebrationConfig = {
        blockCount: 0,
        totalSaved: 0,
      };

      const result = useCelebration(config);

      // First block takes priority
      expect(result.intensity).toBe('full');
    });

    it('handles very large numbers', () => {
      const config: CelebrationConfig = {
        blockCount: 1000,
        totalSaved: 10000,
      };

      const result = useCelebration(config);

      // 1000 % 10 === 0 (block milestone) and 10000 % 100 === 0 (savings milestone)
      expect(result.intensity).toBe('full');
    });

    it('handles decimal totalSaved (not a milestone)', () => {
      const config: CelebrationConfig = {
        blockCount: 5,
        totalSaved: 99.99,
      };

      const result = useCelebration(config);

      expect(result.intensity).toBe('subtle');
    });
  });
});
