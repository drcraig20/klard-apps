import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components/error-boundary';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Prevent auto-hide to control splash screen timing
SplashScreen.preventAutoHideAsync();

// Configure splash screen animation (optional)
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Add any async initialization here (fonts, auth check, etc.)
        // For now, just a brief delay to ensure smooth transition
        await new Promise((resolve) => setTimeout(resolve, 100));
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
