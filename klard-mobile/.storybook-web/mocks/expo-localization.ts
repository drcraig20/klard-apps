/**
 * expo-localization mock for Storybook web environment
 *
 * Returns English US locale settings by default.
 */

export interface Locale {
  languageTag: string;
  languageCode: string | null;
  textDirection: 'ltr' | 'rtl' | null;
  digitGroupingSeparator: string | null;
  decimalSeparator: string | null;
  measurementSystem: 'metric' | 'us' | 'uk' | null;
  currencyCode: string | null;
  currencySymbol: string | null;
  regionCode: string | null;
  temperatureUnit: 'celsius' | 'fahrenheit' | null;
}

export interface Calendar {
  calendar: string | null;
  timeZone: string | null;
  uses24hourClock: boolean | null;
  firstWeekday: number | null;
}

export function getLocales(): Locale[] {
  // Try to get browser locale if available
  const browserLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const [languageCode, regionCode] = browserLocale.split('-');

  return [
    {
      languageTag: browserLocale,
      languageCode: languageCode || 'en',
      textDirection: 'ltr',
      digitGroupingSeparator: ',',
      decimalSeparator: '.',
      measurementSystem: 'us',
      currencyCode: 'USD',
      currencySymbol: '$',
      regionCode: regionCode || 'US',
      temperatureUnit: 'fahrenheit',
    },
  ];
}

export function getCalendars(): Calendar[] {
  return [
    {
      calendar: 'gregory',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      uses24hourClock: false,
      firstWeekday: 1,
    },
  ];
}

// Legacy exports for backwards compatibility
export const locale = getLocales()[0]?.languageTag || 'en-US';
export const locales = [locale];
export const timezone = getCalendars()[0]?.timeZone || 'America/New_York';
export const isRTL = false;
export const region = getLocales()[0]?.regionCode || 'US';

export default {
  getLocales,
  getCalendars,
  locale,
  locales,
  timezone,
  isRTL,
  region,
};
