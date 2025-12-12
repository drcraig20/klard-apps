import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCategoryLabel,
  formatCategoryUppercase,
} from '../formatting';

describe('formatCurrency', () => {
  it('formats USD currency with default locale', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats EUR currency', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
  });

  it('formats GBP currency', () => {
    expect(formatCurrency(99.99, 'GBP')).toBe('£99.99');
  });

  it('handles zero amount', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('handles negative amounts', () => {
    expect(formatCurrency(-50.25)).toBe('-$50.25');
  });

  it('handles large numbers with grouping', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });
});

// Existing tests for formatCategoryLabel and formatCategoryUppercase
describe('formatCategoryLabel', () => {
  it('converts snake_case to Title Case', () => {
    expect(formatCategoryLabel('health_fitness')).toBe('Health Fitness');
  });

  it('handles single word', () => {
    expect(formatCategoryLabel('entertainment')).toBe('Entertainment');
  });
});

describe('formatCategoryUppercase', () => {
  it('converts to uppercase with spaces', () => {
    expect(formatCategoryUppercase('health_fitness')).toBe('HEALTH FITNESS');
  });
});