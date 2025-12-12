import { type ImageSource } from 'expo-image';

// Illustration map - keys map to illustration sources
// Uses undefined as placeholder - real assets would be added here
export const illustrations: Record<string, ImageSource | undefined> = {
  subscriptions: undefined, // placeholder for actual asset
  cards: undefined,
  alerts: undefined,
};

// Placeholder blurhash for smooth loading
export const placeholderBlurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';
