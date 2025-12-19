import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { passkeyClient } from '@better-auth/passkey/client';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001',
  plugins: [
    inferAdditionalFields({
      user: {
        hasOnboarded: {
          type: "boolean",
          required: false,
        },
      },
    }),
    passkeyClient(),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
} = authClient;
