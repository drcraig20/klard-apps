import { en, type TranslationKeys } from './en';

export { en, type TranslationKeys };

// Export all translations as a single object for i18n libraries
export const translations = {
  en,
};

// Alias for backwards compatibility
export const translationsSync = translations;
