import { betterAuth } from "better-auth";
import { bearer, emailOTP, jwt, magicLink, openAPI } from "better-auth/plugins";
import { expo } from "@better-auth/expo";
import { passkey } from "@better-auth/passkey";
import { Pool } from "pg";
import { config } from "../config/index.js";
import { sendEmail } from "../services/email.js";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: new Pool({
    connectionString: config.databaseUrl,
  }),

  // Base URL for callbacks and links
  baseURL: config.betterAuthUrl,

  // Secret for signing tokens (min 32 chars in production)
  secret: config.betterAuthSecret,

  // Email & Password Authentication
  emailAndPassword: {
    enabled: true,
    // Password strength: 8-128 chars (Better Auth default)
    minPasswordLength: 8,
    maxPasswordLength: 128,
    // Password reset handled by emailOTP plugin
  },

  // Email verification handled by emailOTP plugin with overrideDefaultEmailVerification
  emailVerification: {
    sendOnSignUp: false, // emailOTP plugin handles this
    autoSignInAfterVerification: true,
  },

  // Social OAuth Providers (only enabled if credentials present)
  socialProviders: {
    ...(config.google.clientId && {
      google: {
        clientId: config.google.clientId,
        clientSecret: config.google.clientSecret,
      },
    }),
    ...(config.github.clientId && {
      github: {
        clientId: config.github.clientId,
        clientSecret: config.github.clientSecret,
      },
    }),
    ...(config.apple.clientId && {
      apple: {
        clientId: config.apple.clientId,
        clientSecret: config.apple.clientSecret,
      },
    }),
  },

  // Account Linking - auto-link OAuth to existing accounts with matching email
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "apple"],
    },
  },

  //Rate Limiting
  rateLimit: {
    enabled: config.rateLimit.enabled,
    storage: "database",
    window: config.rateLimit.window,
    max: config.rateLimit.max,
    customRules: {
      "/sign-in/email": {
        window: config.rateLimit.signIn.window,
        max: config.rateLimit.signIn.max,
      },
      "/sign-up/email": {
        window: config.rateLimit.signUp.window,
        max: config.rateLimit.signUp.max,
      },
      "/forgot-password": {
        window: config.rateLimit.forgotPassword.window,
        max: config.rateLimit.forgotPassword.max,
      },
      "/two-factor/verify": {
        window: config.rateLimit.twoFactorVerify.window,
        max: config.rateLimit.twoFactorVerify.max,
      },
    },
  },

  //Advanced IP address configuration
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"],
    },
  },

  // Session Configuration
  session: {
    expiresIn: 60 * 60 * 24 * 5, // 5 days
    updateAge: 60 * 60 * 24, // Refresh session daily (sliding expiration)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min cache
    },
  },

  // Trusted origins for CORS
  trustedOrigins: config.allowedOrigins,

  // Custom user fields
  user: {
    additionalFields: {
      hasOnboarded: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: true
      },
    },
  },

  // Plugins
  plugins: [
    expo(),
    openAPI(),
    // Email OTP for verification and password reset
    emailOTP({
      otpLength: config.otp.length,
      expiresIn: config.otp.expiresIn,
      allowedAttempts: config.otp.maxAttempts,
      storeOTP: "hashed",
      overrideDefaultEmailVerification: true,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        const templates: Record<string, { subject: string; message: string }> = {
          "sign-in": {
            subject: "Your Klard sign-in code",
            message: "sign-in code",
          },
          "email-verification": {
            subject: "Verify your Klard email",
            message: "verification code",
          },
          "forget-password": {
            subject: "Reset your Klard password",
            message: "password reset code",
          },
        };

        const template = templates[type] ?? {
          subject: "Your Klard code",
          message: "code",
        };

        const expiresInMinutes = Math.floor(config.otp.expiresIn / 60);
        await sendEmail({
          to: email,
          subject: template.subject,
          text: `Your ${template.message} is: ${otp}\n\nThis code expires in ${expiresInMinutes} minutes.`,
          html: `<p>Your ${template.message} is: <strong>${otp}</strong></p><p>This code expires in ${expiresInMinutes} minutes.</p>`,
        });
      },
    }),

    // Magic link for passwordless sign-in
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "Sign in to Klard",
          text: `Click to sign in: ${url}`,
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
        });
      },
      expiresIn: 60 * 15, // 15 minutes
    }),

    // JWT for API integration
    jwt({
      jwks: {
        keyPairConfig: { alg: config.jwt.algorithm },
        rotationInterval: config.jwt.rotationInterval,
        gracePeriod: config.jwt.gracePeriod,
      },
    }),

    // Bearer token support for mobile
    bearer(),

    // Passkey support for passwordless biometric auth
    passkey({
      rpID: config.passkey.rpID,
      rpName: config.passkey.rpName,
      origin: config.passkey.origin,
      advanced: {
        webAuthnChallengeCookie: "better-auth-passkey",
      },
    }),
  ],
});

export type Auth = typeof auth;
