import { describe, it, expect } from 'vitest';
import { useProtectionStatus, type ProtectionConfig } from '../useProtectionStatus';
import type { ICard } from '../../types/card';

// Helper to create mock cards (DIP: depends on ICard abstraction)
function createMockCard(id: string, status: string): ICard {
  return {
    id,
    name: `Card ${id}`,
    status,
    createdAt: new Date(),
  };
}

describe('useProtectionStatus', () => {
  describe('active card counting', () => {
    it('counts active cards correctly', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'active'),
          createMockCard('3', 'active'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(3);
    });

    it('excludes inactive cards from count', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'locked'),
          createMockCard('3', 'expired'),
          createMockCard('4', 'active'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(2);
    });

    it('returns zero when no cards are active', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'locked'),
          createMockCard('2', 'burned'),
          createMockCard('3', 'awaiting'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(0);
    });

    it('handles empty cards array', () => {
      const config: ProtectionConfig = {
        cards: [],
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(0);
    });
  });

  describe('message formatting', () => {
    it('returns singular form for 1 card', () => {
      const config: ProtectionConfig = {
        cards: [createMockCard('1', 'active')],
      };

      const result = useProtectionStatus(config);

      expect(result.message).toBe('1 card watching');
    });

    it('returns plural form for 0 cards', () => {
      const config: ProtectionConfig = {
        cards: [],
      };

      const result = useProtectionStatus(config);

      expect(result.message).toBe('0 cards watching');
    });

    it('returns plural form for 2 cards', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'active'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.message).toBe('2 cards watching');
    });

    it('returns plural form for many cards', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'active'),
          createMockCard('3', 'active'),
          createMockCard('4', 'active'),
          createMockCard('5', 'active'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.message).toBe('5 cards watching');
    });
  });

  describe('DIP compliance (depends on ICard abstraction)', () => {
    it('works with any object implementing ICard interface', () => {
      // Custom implementation of ICard
      const customCards: readonly ICard[] = [
        {
          id: 'custom-1',
          name: 'Custom Card',
          status: 'active',
          createdAt: new Date('2024-01-01'),
        },
        {
          id: 'custom-2',
          name: 'Another Card',
          status: 'active',
          createdAt: new Date('2024-02-01'),
        },
      ];

      const config: ProtectionConfig = {
        cards: customCards,
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(2);
      expect(result.message).toBe('2 cards watching');
    });

    it('handles cards with extended properties', () => {
      // Cards with additional properties beyond ICard
      const extendedCards: readonly ICard[] = [
        {
          id: 'ext-1',
          name: 'Extended Card',
          status: 'active',
          createdAt: new Date(),
          // These extra properties should be ignored
        },
      ];

      const config: ProtectionConfig = {
        cards: extendedCards,
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('handles all card statuses correctly', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'locked'),
          createMockCard('3', 'awaiting'),
          createMockCard('4', 'expired'),
          createMockCard('5', 'burned'),
        ],
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(1);
      expect(result.message).toBe('1 card watching');
    });

    it('handles case-sensitive status matching', () => {
      const config: ProtectionConfig = {
        cards: [
          createMockCard('1', 'active'),
          createMockCard('2', 'Active'), // uppercase - should NOT count
          createMockCard('3', 'ACTIVE'), // all caps - should NOT count
        ],
      };

      const result = useProtectionStatus(config);

      // Only exact 'active' match should count
      expect(result.activeCount).toBe(1);
    });

    it('handles readonly cards array', () => {
      const readonlyCards = Object.freeze([
        createMockCard('1', 'active'),
        createMockCard('2', 'active'),
      ]) as readonly ICard[];

      const config: ProtectionConfig = {
        cards: readonlyCards,
      };

      const result = useProtectionStatus(config);

      expect(result.activeCount).toBe(2);
    });
  });
});
