import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { translationsSync, type TranslationKeys } from '@klard-apps/commons';

// Initialize i18n with translations from commons
const i18n = new I18n(translationsSync);

// Set the locale based on device settings
i18n.locale = getLocales()[0]?.languageCode ?? 'en';

// Enable fallback to default language when translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export { i18n };
export type { TranslationKeys };

/**
 * Helper hook for type-safe translations
 * Usage: const text = useT('auth.login.title');
 */
export function t(key: string, options?: Record<string, unknown>): string {
  return i18n.t(key, options);
}

/**
 * Get current locale
 */
export function getLocale(): string {
  return i18n.locale;
}

/**
 * Change locale
 */
export function setLocale(locale: string): void {
  i18n.locale = locale;
}
