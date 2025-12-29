import type { Preview } from '@storybook/react';
import React from 'react';
import { View } from 'react-native';
import { Colors } from '../src/styles/colors';
import { logMockedModules } from './mocks';

// Log mocked modules in development for debugging
if (process.env.NODE_ENV === 'development') {
  logMockedModules();
}

/**
 * Theme decorator that wraps stories with proper theme context.
 * Provides light/dark theme switching via Storybook toolbar.
 */
const ThemeDecorator = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const theme = context.globals.theme || 'light';
  const colors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Story />
    </View>
  );
};

/**
 * Safe area decorator that provides mock safe area insets.
 * This ensures components using useSafeAreaInsets work correctly.
 */
const SafeAreaDecorator = (Story: React.ComponentType) => {
  // Safe area context is provided by the mock module via webpack alias
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for previewing components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [SafeAreaDecorator, ThemeDecorator],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      disable: true, // We handle backgrounds via ThemeDecorator
    },
    layout: 'fullscreen',
  },
};

export default preview;
