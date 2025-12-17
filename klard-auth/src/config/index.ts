const nodeEnv = process.env["NODE_ENV"] ?? "development";

function parseAllowedOrigins(): string[] {
  const origins = process.env["ALLOWED_ORIGINS"];
  if (!origins) {
    return [];
  }
  return origins.split(",").map((origin) => origin.trim());
}

function parseIntWithDefault(value: string | undefined, defaultValue: number): number {
  if (!value) {
    return defaultValue;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

export const config = {
  port: Number.parseInt(process.env["PORT"] ?? "3050", 10),
  nodeEnv,
  isDevelopment: nodeEnv === "development",
  isProduction: nodeEnv === "production",
  allowedOrigins: parseAllowedOrigins(),
  databaseUrl: process.env["DATABASE_URL"] ?? "",
  betterAuthSecret: process.env["BETTER_AUTH_SECRET"] ?? "",
  betterAuthUrl: process.env["BETTER_AUTH_URL"] ?? "http://localhost:3050",

  // OAuth providers (only enabled if credentials present)
  google: {
    clientId: process.env["GOOGLE_CLIENT_ID"] ?? "",
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"] ?? "",
  },
  github: {
    clientId: process.env["GITHUB_CLIENT_ID"] ?? "",
    clientSecret: process.env["GITHUB_CLIENT_SECRET"] ?? "",
  },
  apple: {
    clientId: process.env["APPLE_CLIENT_ID"] ?? "",
    clientSecret: process.env["APPLE_CLIENT_SECRET"] ?? "",
  },

  // OTP configuration
  otp: {
    length: parseIntWithDefault(process.env["OTP_LENGTH"], 6),
    expiresIn: parseIntWithDefault(process.env["OTP_EXPIRES_IN"], 600), // 10 minutes
    maxAttempts: parseIntWithDefault(process.env["OTP_MAX_ATTEMPTS"], 3),
  },

  // Rate limiting configuration
  rateLimit: {
    enabled: process.env["RATE_LIMIT_ENABLED"] !== "false", // Default: true
    window: parseIntWithDefault(process.env["RATE_LIMIT_WINDOW"], 60), // seconds
    max: parseIntWithDefault(process.env["RATE_LIMIT_MAX"], 100), // requests per window
    // Custom rules for sensitive endpoints
    signIn: {
      window: parseIntWithDefault(process.env["RATE_LIMIT_SIGNIN_WINDOW"], 10),
      max: parseIntWithDefault(process.env["RATE_LIMIT_SIGNIN_MAX"], 5),
    },
    signUp: {
      window: parseIntWithDefault(process.env["RATE_LIMIT_SIGNUP_WINDOW"], 60),
      max: parseIntWithDefault(process.env["RATE_LIMIT_SIGNUP_MAX"], 3),
    },
    forgotPassword: {
      window: parseIntWithDefault(process.env["RATE_LIMIT_FORGOT_PASSWORD_WINDOW"], 60),
      max: parseIntWithDefault(process.env["RATE_LIMIT_FORGOT_PASSWORD_MAX"], 3),
    },
    twoFactorVerify: {
      window: parseIntWithDefault(process.env["RATE_LIMIT_2FA_WINDOW"], 10),
      max: parseIntWithDefault(process.env["RATE_LIMIT_2FA_MAX"], 3),
    },
  },

  // JWT configuration
  jwt: {
    algorithm: (process.env["JWT_ALGORITHM"] ?? "RS256") as "RS256" | "ES256",
    rotationInterval: parseIntWithDefault(process.env["JWT_ROTATION_INTERVAL"], 60 * 60 * 24 * 30), // 30 days
    gracePeriod: parseIntWithDefault(process.env["JWT_GRACE_PERIOD"], 60 * 60 * 24 * 7), // 7 days
  },

  // Passkey/WebAuthn configuration
  passkey: {
    rpID: process.env["PASSKEY_RP_ID"] ?? "localhost",
    rpName: process.env["PASSKEY_RP_NAME"] ?? "Klard",
    origin: process.env["PASSKEY_ORIGIN"] ?? "http://localhost:3001",
  },

  // Security configuration
  security: {
    // Paths exempt from CSP (for OpenAPI docs, etc.)
    cspExemptPaths: parseCspExemptPaths(),
  },
} as const;

function parseCspExemptPaths(): string[] {
  const paths = process.env["CSP_EXEMPT_PATHS"];
  if (!paths) {
    return ["/api/auth/reference"];
  }
  return paths.split(",").map((path) => path.trim());
}
