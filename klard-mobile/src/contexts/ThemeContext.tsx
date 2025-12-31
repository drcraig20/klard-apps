/**
 * ThemeContext - Programmatic theme control for React Native
 *
 * SOLID Compliance:
 * - SRP: Only manages theme state and persistence
 * - OCP: Extend by adding new theme options without modifying existing code
 * - DIP: Components depend on context abstraction, not concrete implementation
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, type ColorScheme, type ThemeColors } from '@/styles';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  /** Current resolved theme ('light' or 'dark') */
  theme: ColorScheme;
  /** User's theme preference ('light', 'dark', or 'system') */
  themePreference: ThemePreference;
  /** Current theme colors object */
  colors: ThemeColors;
  /** Whether current theme is dark */
  isDark: boolean;
  /** Update the theme preference (persisted to AsyncStorage) */
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = '@klard/theme-preference';
const VALID_PREFERENCES: readonly ThemePreference[] = ['light', 'dark', 'system'];

function isValidThemePreference(value: unknown): value is ThemePreference {
  return typeof value === 'string' && VALID_PREFERENCES.includes(value as ThemePreference);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted theme preference on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((saved) => {
        if (isValidThemePreference(saved)) {
          setThemePreferenceState(saved);
        }
      })
      .catch(() => {
        // Silently fail - use default 'system' preference
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  const setThemePreference = useCallback((preference: ThemePreference) => {
    setThemePreferenceState(preference);
    AsyncStorage.setItem(THEME_STORAGE_KEY, preference).catch(() => {
      // Silently fail - preference still applied in memory
    });
  }, []);

  // Resolve the actual theme based on preference and system setting
  const theme: ColorScheme = useMemo(() => {
    if (themePreference === 'system') {
      return systemColorScheme ?? 'light';
    }
    return themePreference;
  }, [themePreference, systemColorScheme]);

  const colors = useMemo(() => (theme === 'dark' ? darkTheme : lightTheme), [theme]);
  const isDark = theme === 'dark';

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      themePreference,
      colors,
      isDark,
      setThemePreference,
    }),
    [theme, themePreference, colors, isDark, setThemePreference]
  );

  // Don't render children until we've loaded the persisted preference
  // This prevents a flash of the wrong theme
  if (!isLoaded) {
    return null;
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
