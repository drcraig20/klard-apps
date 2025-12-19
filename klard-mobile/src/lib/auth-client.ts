import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { expoClient } from "@better-auth/expo/client";
import { passkeyClient } from "@better-auth/passkey/client";
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Get the appropriate auth URL based on platform and environment.
 * - Android Emulator: Uses 10.0.2.2 (gateway to host machine's localhost)
 * - iOS Simulator: Uses localhost (shares host's network stack)
 * - Production: Uses EXPO_PUBLIC_AUTH_URL env var
 */
function getAuthBaseURL(): string {
  // Use env var if explicitly set (for production or custom setups)
  if (process.env.EXPO_PUBLIC_AUTH_URL) {
    return process.env.EXPO_PUBLIC_AUTH_URL;
  }

  const port = process.env.EXPO_PUBLIC_AUTH_PORT || '3050';

  // Android emulator uses 10.0.2.2 to reach host's localhost
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${port}`;
  }

  // iOS simulator shares host network, can use localhost
  return `http://localhost:${port}`;
}

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  plugins: [
    expoClient({
      scheme: "klard",
      storagePrefix: "klard",
      storage: SecureStore,
      cookiePrefix: "better-auth", // MUST match server passkey plugin webAuthnChallengeCookie prefix
    }),
    passkeyClient(),
    inferAdditionalFields({
      user: {
        hasOnboarded: {
          type: "boolean",
          required: false,
        },
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
} = authClient;
