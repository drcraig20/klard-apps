import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-react-native-web',
  ],
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    // Exclude mocks folder from react-docgen parsing
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      // Exclude mock files from docgen
      exclude: ['**/mocks/**'],
    },
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};

    // Node.js polyfill fallbacks for webpack 5 (disable unused ones)
    config.resolve.fallback = {
      ...config.resolve.fallback,
      console: false,
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      buffer: false,
    };

    // Path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),

      // Expo module mocks for web environment
      'expo-haptics': path.resolve(__dirname, './mocks/expo-haptics.ts'),
      'expo-secure-store': path.resolve(__dirname, './mocks/expo-secure-store.ts'),
      '@gorhom/bottom-sheet': path.resolve(__dirname, './mocks/gorhom-bottom-sheet.ts'),
      'expo-linear-gradient': path.resolve(__dirname, './mocks/expo-linear-gradient.tsx'),
      'expo-blur': path.resolve(__dirname, './mocks/expo-blur.tsx'),
      'expo-image': path.resolve(__dirname, './mocks/expo-image.tsx'),
      'expo-status-bar': path.resolve(__dirname, './mocks/expo-status-bar.tsx'),
      'expo-checkbox': path.resolve(__dirname, './mocks/expo-checkbox.tsx'),
      'expo-router': path.resolve(__dirname, './mocks/expo-router.tsx'),
      'expo-localization': path.resolve(__dirname, './mocks/expo-localization.ts'),
      'expo-local-authentication': path.resolve(__dirname, './mocks/expo-local-authentication.ts'),
      'expo-device': path.resolve(__dirname, './mocks/expo-device.ts'),
      'expo-splash-screen': path.resolve(__dirname, './mocks/expo-splash-screen.ts'),
      'expo-apple-authentication': path.resolve(__dirname, './mocks/expo-apple-authentication.ts'),
      'react-native-safe-area-context': path.resolve(__dirname, './mocks/react-native-safe-area-context.tsx'),
      'react-native-reanimated': path.resolve(__dirname, './mocks/react-native-reanimated.ts'),
      '@expo/vector-icons': path.resolve(__dirname, './mocks/expo-vector-icons.tsx'),
      'react-native-gesture-handler': path.resolve(__dirname, './mocks/react-native-gesture-handler.tsx'),
    };

    return config;
  },
};

export default config;
