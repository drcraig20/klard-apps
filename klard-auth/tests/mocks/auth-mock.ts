/**
 * Mock implementation of Better Auth for testing.
 * This file provides an in-memory mock of the auth system.
 *
 * Refactored using Strategy Pattern for reduced cognitive complexity.
 * Each route handler is a focused function with single responsibility.
 */

// biome-ignore lint/suspicious/noExplicitAny: Test mock uses any for simplicity
type MockRequest = any;
// biome-ignore lint/suspicious/noExplicitAny: Test mock uses any for simplicity
type MockResponse = any;
type RouteHandler = (req: MockRequest, res: MockResponse, body: RequestBody) => MockResponse;

interface RequestBody {
  email?: string;
  password?: string;
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  token?: string;
  otp?: string;
  type?: OtpType;
  provider?: string;
  callbackURL?: string;
}

// OTP types
type OtpType = "sign-in" | "email-verification" | "forget-password";

// Configured OAuth providers (mock)
const CONFIGURED_PROVIDERS = ["google", "github", "apple"] as const;
type ConfiguredProvider = (typeof CONFIGURED_PROVIDERS)[number];

// OAuth provider URLs (mock)
const OAUTH_URLS: Record<ConfiguredProvider, string> = {
  google: "https://accounts.google.com/o/oauth2/v2/auth",
  github: "https://github.com/login/oauth/authorize",
  apple: "https://appleid.apple.com/auth/authorize",
};

// In-memory stores
export const mockStore = {
  users: new Map<
    string,
    { id: string; email: string; name: string; password: string; emailVerified: boolean }
  >(),
  sessions: new Map<string, { id: string; userId: string; expiresAt: Date }>(),
  verificationTokens: new Map<string, { email: string; type: string }>(),
  otpCodes: new Map<string, { otp: string; type: OtpType; attempts: number; expiresAt: Date }>(),
  sentEmails: [] as Array<{ to: string; subject: string; url?: string; otp?: string }>,
};

// Helper functions
const hashPassword = (password: string) => `hashed_${password}`;
const verifyPassword = (password: string, hash: string) => hash === `hashed_${password}`;
const createSessionToken = () => `session_${Date.now()}_${Math.random().toString(36)}`;
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// OTP configuration
const OTP_CONFIG = {
  expiresIn: 600, // 10 minutes
  maxAttempts: 3,
};

export const clearMockStore = () => {
  mockStore.users.clear();
  mockStore.sessions.clear();
  mockStore.verificationTokens.clear();
  mockStore.otpCodes.clear();
  mockStore.sentEmails.length = 0;
};

// ============================================================================
// Common Helpers
// ============================================================================

function getSessionTokenFromRequest(req: MockRequest): string | undefined {
  const authHeader = req.headers.authorization || "";
  const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  if (bearerMatch?.[1]) {
    return bearerMatch[1];
  }

  const cookies = req.headers.cookie || "";
  const sessionMatch = cookies.match(/better-auth\.session_token=([^;]+)/);
  return sessionMatch?.[1];
}

function getSessionTokenFromCookie(req: MockRequest): string | undefined {
  const cookies = req.headers.cookie || "";
  const sessionMatch = cookies.match(/better-auth\.session_token=([^;]+)/);
  return sessionMatch?.[1];
}

function createSession(userId: string): { token: string; expiresAt: Date } {
  const sessionToken = createSessionToken();
  const expiresAt = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  mockStore.sessions.set(sessionToken, { id: sessionToken, userId, expiresAt });
  return { token: sessionToken, expiresAt };
}

function setSessionCookie(res: MockResponse, sessionToken: string): void {
  res.setHeader("Set-Cookie", `better-auth.session_token=${sessionToken}; Path=/; HttpOnly`);
}

function clearSessionCookie(res: MockResponse): void {
  res.setHeader("Set-Cookie", "better-auth.session_token=; Path=/; HttpOnly; Max-Age=0");
}

function findUserBySessionId(sessionUserId: string) {
  return Array.from(mockStore.users.values()).find((u) => u.id === sessionUserId);
}

function findUserEntryBySessionId(sessionUserId: string) {
  return Array.from(mockStore.users.entries()).find(([_, u]) => u.id === sessionUserId);
}

function userToResponse(user: { id: string; email: string; name: string; emailVerified: boolean }) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified,
  };
}

// ============================================================================
// Route Handlers
// ============================================================================

function handleSignUp(_req: MockRequest, res: MockResponse, body: RequestBody): MockResponse {
  const { email, password, name } = body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }
  if (password.length > 128) {
    return res.status(400).json({ message: "Password is too long" });
  }
  if (!email || mockStore.users.has(email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const userId = `user_${Date.now()}`;
  mockStore.users.set(email, {
    id: userId,
    email,
    name: name || "",
    password: hashPassword(password),
    emailVerified: false,
  });

  const { token: sessionToken, expiresAt } = createSession(userId);

  // Send OTP for email verification
  const otp = generateOtp();
  mockStore.otpCodes.set(email, {
    otp,
    type: "email-verification",
    attempts: 0,
    expiresAt: new Date(Date.now() + OTP_CONFIG.expiresIn * 1000),
  });
  mockStore.sentEmails.push({
    to: email,
    subject: "Verify your Klard email",
    otp,
  });

  setSessionCookie(res, sessionToken);
  return res.status(200).json({
    user: { id: userId, email, name: name || "", emailVerified: false },
    session: { id: sessionToken, userId, expiresAt: expiresAt.toISOString() },
  });
}

function handleSignIn(_req: MockRequest, res: MockResponse, body: RequestBody): MockResponse {
  const { email, password } = body;
  const user = email ? mockStore.users.get(email) : undefined;

  if (!user || !password || !verifyPassword(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { token: sessionToken, expiresAt } = createSession(user.id);

  setSessionCookie(res, sessionToken);
  return res.status(200).json({
    user: userToResponse(user),
    session: { id: sessionToken, userId: user.id, expiresAt: expiresAt.toISOString() },
  });
}

function handleGetSession(req: MockRequest, res: MockResponse, _body: RequestBody): MockResponse {
  const sessionToken = getSessionTokenFromRequest(req);

  if (!sessionToken) {
    return res.status(200).json({ user: null, session: null });
  }

  const session = mockStore.sessions.get(sessionToken);
  if (!session) {
    return res.status(200).json({ user: null, session: null });
  }

  const user = findUserBySessionId(session.userId);
  if (!user) {
    return res.status(200).json({ user: null, session: null });
  }

  return res.status(200).json({
    user: userToResponse(user),
    session: {
      id: session.id,
      userId: session.userId,
      expiresAt: session.expiresAt.toISOString(),
    },
  });
}

function handleSignOut(req: MockRequest, res: MockResponse, _body: RequestBody): MockResponse {
  const sessionToken = getSessionTokenFromCookie(req);

  if (sessionToken) {
    mockStore.sessions.delete(sessionToken);
  }

  clearSessionCookie(res);
  return res.status(200).json({ success: true });
}

function handleChangePassword(
  req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const sessionToken = getSessionTokenFromRequest(req);
  const session = sessionToken ? mockStore.sessions.get(sessionToken) : undefined;

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userEntry = findUserEntryBySessionId(session.userId);
  if (!userEntry) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { currentPassword, newPassword } = body;

  if (!currentPassword || !verifyPassword(currentPassword, userEntry[1].password)) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "New password is too short" });
  }

  userEntry[1].password = hashPassword(newPassword);
  mockStore.users.set(userEntry[0], userEntry[1]);

  return res.status(200).json({ success: true });
}

function handleForgetPassword(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { email } = body;
  const user = email ? mockStore.users.get(email) : undefined;

  if (user && email) {
    const resetToken = `reset_${Date.now()}`;
    mockStore.verificationTokens.set(resetToken, { email, type: "password-reset" });
    mockStore.sentEmails.push({
      to: email,
      subject: "Reset your Klard password",
      url: `http://localhost:3050/api/auth/reset-password?token=${resetToken}`,
    });
  }

  return res.status(200).json({ success: true });
}

function handleResetPassword(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { token, newPassword } = body;
  const tokenData = token ? mockStore.verificationTokens.get(token) : undefined;

  if (!tokenData || tokenData.type !== "password-reset") {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "New password is too short" });
  }

  const user = mockStore.users.get(tokenData.email);
  if (user && token) {
    user.password = hashPassword(newPassword);
    mockStore.users.set(tokenData.email, user);
    mockStore.verificationTokens.delete(token);
  }

  return res.status(200).json({ success: true });
}

function handleSendVerificationEmail(
  req: MockRequest,
  res: MockResponse,
  _body: RequestBody,
): MockResponse {
  const sessionToken = getSessionTokenFromCookie(req);
  const session = sessionToken ? mockStore.sessions.get(sessionToken) : undefined;

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = findUserBySessionId(session.userId);

  if (user) {
    const verificationToken = `verify_${Date.now()}`;
    mockStore.verificationTokens.set(verificationToken, {
      email: user.email,
      type: "email-verification",
    });
    mockStore.sentEmails.push({
      to: user.email,
      subject: "Verify your Klard account",
      url: `http://localhost:3050/api/auth/verify-email?token=${verificationToken}`,
    });
  }

  return res.status(200).json({ success: true });
}

function handleMagicLinkSend(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { email } = body;

  if (email) {
    const magicToken = `magic_${Date.now()}`;
    mockStore.verificationTokens.set(magicToken, { email, type: "magic-link" });
    mockStore.sentEmails.push({
      to: email,
      subject: "Sign in to Klard",
      url: `http://localhost:3050/api/auth/magic-link/verify?token=${magicToken}`,
    });
  }

  return res.status(200).json({ success: true });
}

function handleMagicLinkVerify(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
  url: string,
): MockResponse {
  const urlParams = new URL(`http://localhost${url}`).searchParams;
  const token = urlParams.get("token") || body.token;
  const tokenData = token ? mockStore.verificationTokens.get(token) : undefined;

  if (!tokenData || tokenData.type !== "magic-link") {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  return res.status(200).json({ success: true });
}

function handleSendVerificationOtp(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { email, type } = body;

  if (!email || !type) {
    return res.status(400).json({ message: "Email and type are required" });
  }

  const subjects: Record<OtpType, string> = {
    "sign-in": "Your Klard sign-in code",
    "email-verification": "Verify your Klard email",
    "forget-password": "Reset your Klard password",
  };

  const otp = generateOtp();
  mockStore.otpCodes.set(`${email}:${type}`, {
    otp,
    type,
    attempts: 0,
    expiresAt: new Date(Date.now() + OTP_CONFIG.expiresIn * 1000),
  });
  mockStore.sentEmails.push({
    to: email,
    subject: subjects[type],
    otp,
  });

  return res.status(200).json({ success: true });
}

function handleVerifyEmailOtp(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { email, otp } = body;

  if (!email) {
    return res.status(400).json({ message: "Email is required", code: "INVALID_OTP" });
  }

  // Check for OTP in order: sign-in, email-verification, email-only (from signup)
  const otpKeys = [`${email}:sign-in`, `${email}:email-verification`, email];
  let otpData: { otp: string; type: OtpType; attempts: number; expiresAt: Date } | undefined;
  let otpKey = "";

  for (const key of otpKeys) {
    otpData = mockStore.otpCodes.get(key);
    if (otpData) {
      otpKey = key;
      break;
    }
  }

  if (!otpData) {
    return res.status(400).json({ message: "No OTP found", code: "INVALID_OTP" });
  }

  if (otpData.expiresAt < new Date()) {
    mockStore.otpCodes.delete(otpKey);
    return res.status(400).json({ message: "OTP expired", code: "OTP_EXPIRED" });
  }

  if (otpData.attempts >= OTP_CONFIG.maxAttempts) {
    return res.status(400).json({ message: "Too many attempts", code: "TOO_MANY_ATTEMPTS" });
  }

  if (otpData.otp !== otp) {
    otpData.attempts++;
    mockStore.otpCodes.set(otpKey, otpData);
    return res.status(400).json({ message: "Invalid OTP", code: "INVALID_OTP" });
  }

  // OTP is valid - clean up
  mockStore.otpCodes.delete(otpKey);

  // If sign-in type, create session
  if (otpData.type === "sign-in") {
    const user = mockStore.users.get(email);
    if (user) {
      const { token: sessionToken, expiresAt } = createSession(user.id);
      setSessionCookie(res, sessionToken);
      return res.status(200).json({
        user: userToResponse(user),
        session: { id: sessionToken, userId: user.id, expiresAt: expiresAt.toISOString() },
      });
    }
  }

  // If email-verification, mark email as verified
  if (otpData.type === "email-verification") {
    const user = mockStore.users.get(email);
    if (user) {
      user.emailVerified = true;
      mockStore.users.set(email, user);
    }
  }

  return res.status(200).json({ success: true });
}

function handleResetPasswordOtp(
  _req: MockRequest,
  res: MockResponse,
  body: RequestBody,
): MockResponse {
  const { email, otp, password } = body;

  if (!email) {
    return res.status(400).json({ message: "Email is required", code: "INVALID_OTP" });
  }

  const otpData = mockStore.otpCodes.get(`${email}:forget-password`);

  if (!otpData) {
    return res.status(400).json({ message: "No OTP found", code: "INVALID_OTP" });
  }

  if (otpData.expiresAt < new Date()) {
    mockStore.otpCodes.delete(`${email}:forget-password`);
    return res.status(400).json({ message: "OTP expired", code: "OTP_EXPIRED" });
  }

  if (otpData.otp !== otp) {
    otpData.attempts++;
    mockStore.otpCodes.set(`${email}:forget-password`, otpData);
    return res.status(400).json({ message: "Invalid OTP", code: "INVALID_OTP" });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }

  const user = mockStore.users.get(email);
  if (user) {
    user.password = hashPassword(password);
    mockStore.users.set(email, user);
    mockStore.otpCodes.delete(`${email}:forget-password`);
  }

  return res.status(200).json({ success: true });
}

function handleSocialSignIn(_req: MockRequest, res: MockResponse, body: RequestBody): MockResponse {
  const { provider, callbackURL } = body;

  if (!provider || !CONFIGURED_PROVIDERS.includes(provider as ConfiguredProvider)) {
    return res.status(400).json({ message: "Provider not configured", code: "INVALID_PROVIDER" });
  }

  const oauthUrl = OAUTH_URLS[provider as ConfiguredProvider];
  const state = `state_${Date.now()}`;
  const redirectUrl = `${oauthUrl}?client_id=mock_client_id&redirect_uri=${encodeURIComponent(callbackURL || "")}&state=${state}`;

  return res.status(200).json({ url: redirectUrl });
}

function handleLinkSocial(req: MockRequest, res: MockResponse, body: RequestBody): MockResponse {
  const sessionToken = getSessionTokenFromCookie(req);

  if (!sessionToken || !mockStore.sessions.has(sessionToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { provider, callbackURL } = body;

  if (!provider || !CONFIGURED_PROVIDERS.includes(provider as ConfiguredProvider)) {
    return res.status(400).json({ message: "Provider not configured", code: "INVALID_PROVIDER" });
  }

  const oauthUrl = OAUTH_URLS[provider as ConfiguredProvider];
  const state = `link_state_${Date.now()}`;
  const redirectUrl = `${oauthUrl}?client_id=mock_client_id&redirect_uri=${encodeURIComponent(callbackURL || "")}&state=${state}`;

  return res.status(200).json({ url: redirectUrl });
}

function handleUnlinkAccount(
  req: MockRequest,
  res: MockResponse,
  _body: RequestBody,
): MockResponse {
  const sessionToken = getSessionTokenFromCookie(req);

  if (!sessionToken || !mockStore.sessions.has(sessionToken)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).json({ success: true });
}

function handleGetToken(req: MockRequest, res: MockResponse, _body: RequestBody): MockResponse {
  const sessionToken = getSessionTokenFromRequest(req);
  const session = sessionToken ? mockStore.sessions.get(sessionToken) : undefined;

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = findUserBySessionId(session.userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Mock JWT structure (header.payload.signature)
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT", kid: "mock-key-id-123" }),
  ).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    }),
  ).toString("base64url");
  const signature = `mock-signature-${Buffer.from(`${header}.${payload}`).toString("base64url").substring(0, 43)}`;

  const accessToken = `${header}.${payload}.${signature}`;

  return res.status(200).json({
    token: accessToken,
    type: "Bearer",
    expiresIn: 3600,
  });
}

function handleGetJwks(_req: MockRequest, res: MockResponse, _body: RequestBody): MockResponse {
  return res.status(200).json({
    keys: [
      {
        kty: "RSA",
        kid: "mock-key-id-123",
        use: "sig",
        alg: "RS256",
        n: `mockModulusBase64UrlEncodedValue_${"A".repeat(340)}`,
        e: "AQAB",
      },
      {
        kty: "RSA",
        kid: "mock-key-id-456",
        use: "sig",
        alg: "RS256",
        n: `mockModulusBase64UrlEncodedValue_${"B".repeat(340)}`,
        e: "AQAB",
      },
    ],
  });
}

// ============================================================================
// Route Definitions - Strategy Pattern
// ============================================================================

interface RouteDefinition {
  pattern: string;
  method: string;
  handler: RouteHandler;
  excludePattern?: string;
}

const routes: RouteDefinition[] = [
  { pattern: "/sign-up/email", method: "POST", handler: handleSignUp },
  { pattern: "/sign-in/email", method: "POST", handler: handleSignIn },
  { pattern: "/session", method: "GET", handler: handleGetSession },
  { pattern: "/sign-out", method: "POST", handler: handleSignOut },
  { pattern: "/change-password", method: "POST", handler: handleChangePassword },
  { pattern: "/forget-password", method: "POST", handler: handleForgetPassword },
  {
    pattern: "/reset-password",
    method: "POST",
    handler: handleResetPassword,
    excludePattern: "/email-otp/",
  },
  { pattern: "/send-verification-email", method: "POST", handler: handleSendVerificationEmail },
  { pattern: "/magic-link/send", method: "POST", handler: handleMagicLinkSend },
  {
    pattern: "/email-otp/send-verification-otp",
    method: "POST",
    handler: handleSendVerificationOtp,
  },
  { pattern: "/email-otp/verify-email", method: "POST", handler: handleVerifyEmailOtp },
  { pattern: "/email-otp/reset-password", method: "POST", handler: handleResetPasswordOtp },
  { pattern: "/sign-in/social", method: "POST", handler: handleSocialSignIn },
  { pattern: "/link-social", method: "POST", handler: handleLinkSocial },
  { pattern: "/unlink-account", method: "POST", handler: handleUnlinkAccount },
  { pattern: "/token", method: "GET", handler: handleGetToken },
  { pattern: "/jwks", method: "GET", handler: handleGetJwks },
];

// Magic link verify needs special handling due to GET/POST and URL params
function findRoute(
  url: string,
  method: string,
): { handler: RouteHandler; needsUrlParam: boolean } | null {
  // Special case: magic-link/verify accepts both GET and POST
  if (url.includes("/magic-link/verify")) {
    return {
      handler: (req, res, body) => handleMagicLinkVerify(req, res, body, url),
      needsUrlParam: true,
    };
  }

  for (const route of routes) {
    if (url.includes(route.pattern) && method === route.method) {
      if (route.excludePattern && url.includes(route.excludePattern)) {
        continue;
      }
      return { handler: route.handler, needsUrlParam: false };
    }
  }

  return null;
}

// ============================================================================
// Main Handler - Dispatcher
// ============================================================================

export const mockAuthHandler = async (req: MockRequest, res: MockResponse) => {
  const url = req.url || req.path;
  const method = req.method;
  const body = req.body || {};

  try {
    const route = findRoute(url, method);

    if (route) {
      return route.handler(req, res, body);
    }

    return res.status(404).json({ message: "Not found" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};
