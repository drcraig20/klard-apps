import { createAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL || 'http://localhost:3000',
  plugins: [
    magicLinkClient(),
    expoClient({
      scheme: "klard",
      storagePrefix: "klard",
      storage: SecureStore,
    })
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
