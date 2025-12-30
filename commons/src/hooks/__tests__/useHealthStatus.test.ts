import { describe, it, expect } from 'vitest';
import { useHealthStatus, type HealthStatusInput } from '../useHealthStatus';
import type { PriceHistory } from '../../types/price-change';

// Helper to create a date N days ago
function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

// Helper to create price history entries
function createPriceHistory(
  prices: number[],
  daysOffset = 30
): PriceHistory[] {
  return prices.map((price, index) => ({
    price,
    date: daysAgo((prices.length - index - 1) * daysOffset).toISOString(),
    currency: 'USD',
    source: 'transaction' as const,
  }));
}

describe('useHealthStatus', () => {
  describe('forgotten status (90+ days since last login)', () => {
    it('returns forgotten when last login was exactly 90 days ago', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(90),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('forgotten');
      expect(result.label).toBe('Forgotten?');
    });

    it('returns forgotten when last login was more than 90 days ago', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(120),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('forgotten');
      expect(result.label).toBe('Forgotten?');
    });

    it('does not return forgotten when last login was 89 days ago', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(89),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).not.toBe('forgotten');
    });
  });

  describe('price-increased status', () => {
    it('returns price-increased when latest price is higher than previous', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([9.99, 10.99]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('price-increased');
      expect(result.label).toBe('Price went up');
    });

    it('returns price-increased even with small increases', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.0, 10.01]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('price-increased');
      expect(result.label).toBe('Price went up');
    });

    it('does not return price-increased when prices are equal', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.0, 10.0]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
    });

    it('does not return price-increased when price decreased', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.99, 9.99]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
    });

    it('handles single price history entry (no previous to compare)', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.99]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
    });

    it('handles empty price history', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
    });
  });

  describe('custom thresholds (OCP)', () => {
    it('uses custom forgottenDays threshold', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(60),
        priceHistory: [],
        config: {
          forgottenDays: 60,
        },
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('forgotten');
      expect(result.label).toBe('Forgotten?');
    });

    it('uses custom priceIncreaseThreshold (percentage)', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.0, 10.05]), // 0.5% increase
        config: {
          priceIncreaseThreshold: 5, // Require 5% increase
        },
      };

      const result = useHealthStatus(config);

      // Should be healthy because increase is less than threshold
      expect(result.status).toBe('healthy');
    });

    it('detects price increase when above threshold', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.0, 10.6]), // 6% increase
        config: {
          priceIncreaseThreshold: 5, // Require 5% increase
        },
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('price-increased');
    });
  });

  describe('healthy status (default)', () => {
    it('returns healthy when no issues detected', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([10.0, 10.0]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
      expect(result.label).toBe('All good');
    });

    it('returns healthy with recent login and stable prices', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(5),
        priceHistory: createPriceHistory([9.99, 9.99, 9.99]),
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
      expect(result.label).toBe('All good');
    });
  });

  describe('priority order', () => {
    it('forgotten takes priority over price-increased', () => {
      // Both conditions are true: 90+ days AND price increased
      const config: HealthStatusInput = {
        lastLogin: daysAgo(100),
        priceHistory: createPriceHistory([9.99, 12.99]),
      };

      const result = useHealthStatus(config);

      // Forgotten should take priority
      expect(result.status).toBe('forgotten');
      expect(result.label).toBe('Forgotten?');
    });
  });

  describe('edge cases', () => {
    it('handles today as last login', () => {
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('healthy');
    });

    it('handles very old last login', () => {
      const config: HealthStatusInput = {
        lastLogin: daysAgo(365),
        priceHistory: [],
      };

      const result = useHealthStatus(config);

      expect(result.status).toBe('forgotten');
    });

    it('handles price history with many entries', () => {
      // Many entries but only last two matter for comparison
      const config: HealthStatusInput = {
        lastLogin: new Date(),
        priceHistory: createPriceHistory([8.0, 9.0, 10.0, 11.0, 12.0]),
      };

      const result = useHealthStatus(config);

      // Only comparing last two (11.0 -> 12.0 = increase)
      expect(result.status).toBe('price-increased');
    });
  });
});
