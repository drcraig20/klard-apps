import { createAuthClient } from 'better-auth/react';
import { magicLinkClient, inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001',
  plugins: [
    magicLinkClient(),
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
