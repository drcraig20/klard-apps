import type { KeyboardTypeOptions } from 'react-native';

export const keyboardTypeMap: Record<string, KeyboardTypeOptions> = {
  text: 'default',
  email: 'email-address',
  password: 'default',
  search: 'default',
  number: 'numeric',
  currency: 'decimal-pad',
  tel: 'phone-pad',
};

export const autoCapitalizeMap: Record<string, 'none' | 'sentences' | 'words' | 'characters'> = {
  email: 'none',
  search: 'none',
  password: 'none',
};
