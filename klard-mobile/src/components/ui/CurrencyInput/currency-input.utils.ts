const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
};

export function getCurrencySymbol(currency: string): string {
  const key = currency.toUpperCase();
  return currencySymbols[key] ?? key;
}

export function parseCurrencyValue(rawValue: string): number {
  if (!rawValue) {
    return 0;
  }

  const hasNegativeSign = rawValue.includes('-');
  const sanitized = rawValue.trim();
  const hasDot = sanitized.includes('.');
  const hasComma = sanitized.includes(',');

  // Treat commas as thousand separators when a dot is present; otherwise allow comma as decimal
  const withNormalizedSeparators =
    hasComma && !hasDot ? sanitized.replace(/,/g, '.') : sanitized.replace(/,/g, '');

  const normalized = withNormalizedSeparators.replace(/[^0-9.]/g, '');
  const [integerPart, decimalPart] = normalized.split('.');
  const composed = decimalPart !== undefined ? `${integerPart || '0'}.${decimalPart}` : integerPart;
  const parsed = Number.parseFloat(composed);

  if (hasNegativeSign || Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

export function clampValue(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined && result < min) {
    result = min;
  }
  if (max !== undefined && result > max) {
    result = max;
  }
  return result;
}

export function formatValue(value: number): string {
  if (!Number.isFinite(value)) {
    return '0.00';
  }
  return value.toFixed(2);
}
