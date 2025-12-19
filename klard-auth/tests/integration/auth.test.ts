// @ts-ignore
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { clearMockStore, mockStore } from "../mocks/auth-mock.js";
import { createTestApp } from "../test-utils/test-app.js";

const app = createTestApp();

describe("Better Auth Integration Tests", () => {
  beforeEach(() => {
    clearMockStore();
  });

  describe("Email/Password Authentication", () => {
    describe("POST /api/auth/sign-up/email - Registration", () => {
      it("should successfully register a new user", async () => {
        const response = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "test@example.com",
            password: "SecurePassword123!",
            name: "Test User",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("email", "test@example.com");
        expect(response.body.user).toHaveProperty("name", "Test User");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).not.toHaveProperty("password");
      });

      it("should reject registration with password shorter than 8 characters", async () => {
        const response = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "short@example.com",
            password: "Short1!",
            name: "Short Password User",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should reject registration with password longer than 128 characters", async () => {
        const longPassword = `A1!${"a".repeat(130)}`;
        const response = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "long@example.com",
            password: longPassword,
            name: "Long Password User",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should reject duplicate email registration", async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "duplicate@example.com",
            password: "SecurePassword123!",
            name: "First User",
          })
          .set("Content-Type", "application/json");

        const response = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "duplicate@example.com",
            password: "DifferentPassword123!",
            name: "Second User",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should send verification OTP on registration", async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "verify@example.com",
            password: "SecurePassword123!",
            name: "Verify Email User",
          })
          .set("Content-Type", "application/json");

        const verificationEmail = mockStore.sentEmails.find(
          (e) => e.to === "verify@example.com" && e.subject.includes("Verify"),
        );
        expect(verificationEmail).toBeDefined();
        expect(verificationEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/sign-in/email - Login", () => {
      beforeEach(async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "login@example.com",
            password: "SecurePassword123!",
            name: "Login Test User",
          })
          .set("Content-Type", "application/json");
      });

      it("should successfully login with correct credentials", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "login@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.email).toBe("login@example.com");
        expect(response.body).toHaveProperty("session");
        expect(response.headers["set-cookie"]).toBeDefined();
      });

      it("should reject login with incorrect password", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "login@example.com",
            password: "WrongPassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });

      it("should reject login with non-existent email", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "nonexistent@example.com",
            password: "SomePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });
    });

    describe("Password Hashing (scrypt)", () => {
      it("should not store or return plaintext passwords", async () => {
        const plainPassword = "SecurePassword123!";

        const response = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "hash@example.com",
            password: plainPassword,
            name: "Hash Test User",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.user).not.toHaveProperty("password");
        expect(response.body.user).not.toHaveProperty("hashedPassword");
        expect(JSON.stringify(response.body)).not.toContain(plainPassword);
      });
    });
  });

  describe("Email Verification", () => {
    describe("Verification OTP on signup", () => {
      it("should send verification OTP with 6 digits", async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "emailverify@example.com",
            password: "SecurePassword123!",
            name: "Email Verify User",
          })
          .set("Content-Type", "application/json");

        const verificationEmail = mockStore.sentEmails.find(
          (e) => e.to === "emailverify@example.com" && e.subject.includes("Verify"),
        );
        expect(verificationEmail).toBeDefined();
        expect(verificationEmail?.subject).toContain("Verify");
        expect(verificationEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/send-verification-email - Resend verification", () => {
      it("should allow resending verification email", async () => {
        const signupResponse = await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "resend@example.com",
            password: "SecurePassword123!",
            name: "Resend Verify User",
          })
          .set("Content-Type", "application/json");

        const cookies = signupResponse.headers["set-cookie"] as string[];
        mockStore.sentEmails.length = 0;

        const response = await request(app)
          .post("/api/auth/send-verification-email")
          .set("Cookie", cookies)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        const newVerificationEmail = mockStore.sentEmails.find(
          (e) => e.to === "resend@example.com" && e.subject.includes("Verify"),
        );
        expect(newVerificationEmail).toBeDefined();
      });
    });
  });

  describe("Password Reset", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: "reset@example.com",
          password: "SecurePassword123!",
          name: "Reset Test User",
        })
        .set("Content-Type", "application/json");
    });

    describe("POST /api/auth/forget-password - Initiate reset", () => {
      it("should send password reset email for existing user", async () => {
        mockStore.sentEmails.length = 0;

        const response = await request(app)
          .post("/api/auth/forget-password")
          .send({ email: "reset@example.com" })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        const resetEmail = mockStore.sentEmails.find(
          (e) => e.to === "reset@example.com" && e.subject.includes("Reset"),
        );
        expect(resetEmail).toBeDefined();
        expect(resetEmail?.url).toMatch(/token=/);
      });

      it("should not reveal if email exists (security)", async () => {
        const response = await request(app)
          .post("/api/auth/forget-password")
          .send({ email: "nonexistent-reset@example.com" })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
      });

      it("should include reset token in email URL", async () => {
        mockStore.sentEmails.length = 0;

        await request(app)
          .post("/api/auth/forget-password")
          .send({ email: "reset@example.com" })
          .set("Content-Type", "application/json");

        const resetEmail = mockStore.sentEmails.find(
          (e) => e.to === "reset@example.com" && e.subject.includes("Reset"),
        );

        expect(resetEmail?.url).toMatch(/token=/);
      });
    });

    describe("POST /api/auth/reset-password - Complete reset", () => {
      it("should reject reset with invalid token", async () => {
        const response = await request(app)
          .post("/api/auth/reset-password")
          .send({
            token: "invalid-token-12345",
            newPassword: "NewSecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });
    });
  });

  describe("Password Change", () => {
    let sessionCookies: string[];

    beforeEach(async () => {
      await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: "change@example.com",
          password: "OriginalPassword123!",
          name: "Change Password User",
        })
        .set("Content-Type", "application/json");

      const loginResponse = await request(app)
        .post("/api/auth/sign-in/email")
        .send({
          email: "change@example.com",
          password: "OriginalPassword123!",
        })
        .set("Content-Type", "application/json");

      sessionCookies = loginResponse.headers["set-cookie"] as string[];
    });

    describe("POST /api/auth/change-password", () => {
      it("should change password with correct current password", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "OriginalPassword123!",
            newPassword: "NewSecurePassword123!",
          })
          .set("Cookie", sessionCookies)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
      });

      it("should reject change with incorrect current password", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "WrongCurrentPassword!",
            newPassword: "NewSecurePassword123!",
          })
          .set("Cookie", sessionCookies)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should validate new password strength", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "OriginalPassword123!",
            newPassword: "weak",
          })
          .set("Cookie", sessionCookies)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should require authentication to change password", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "SomePassword123!",
            newPassword: "NewSecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });
    });
  });

  describe("Session Management", () => {
    let sessionCookies: string[];

    beforeEach(async () => {
      await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: "session@example.com",
          password: "SecurePassword123!",
          name: "Session Test User",
        })
        .set("Content-Type", "application/json");

      const loginResponse = await request(app)
        .post("/api/auth/sign-in/email")
        .send({
          email: "session@example.com",
          password: "SecurePassword123!",
        })
        .set("Content-Type", "application/json");

      sessionCookies = loginResponse.headers["set-cookie"] as unknown as string[];
    });

    describe("GET /api/auth/session - Get current session", () => {
      it("should return session for authenticated user", async () => {
        const response = await request(app).get("/api/auth/session").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("session");
        expect(response.body.user.email).toBe("session@example.com");
      });

      it("should return null session for unauthenticated request", async () => {
        const response = await request(app).get("/api/auth/session");

        expect(response.status).toBe(200);
        expect(response.body.session).toBeNull();
      });
    });

    describe("POST /api/auth/sign-out - Logout", () => {
      it("should end session on logout", async () => {
        const logoutResponse = await request(app)
          .post("/api/auth/sign-out")
          .set("Cookie", sessionCookies);

        expect(logoutResponse.status).toBe(200);

        const sessionResponse = await request(app)
          .get("/api/auth/session")
          .set("Cookie", sessionCookies);

        expect(sessionResponse.body.session).toBeNull();
      });
    });

    describe("Session Timeouts Configuration", () => {
      it("should set session expiration (5 days configured)", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "session@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("session");
        expect(response.body.session).toHaveProperty("expiresAt");

        const expiresAt = new Date(response.body.session.expiresAt);
        const now = new Date();
        const daysDiff = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        expect(daysDiff).toBeGreaterThan(4);
        expect(daysDiff).toBeLessThan(6);
      });

      it("should include session info with sliding expiration support", async () => {
        const response = await request(app).get("/api/auth/session").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);
        expect(response.body.session).toHaveProperty("expiresAt");
      });
    });
  });

  // Rate limiting tests removed - Better Auth handles rate limiting internally
  // with database storage. Tests for rate limiting would require real DB integration
  // and are better suited for e2e tests against the actual Better Auth instance.

  describe("Email OTP - Email Verification", () => {
    describe("OTP on signup", () => {
      it("should send OTP code on signup instead of verification link", async () => {
        mockStore.sentEmails.length = 0;

        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-signup@example.com",
            password: "SecurePassword123!",
            name: "OTP Signup User",
          })
          .set("Content-Type", "application/json");

        const verificationEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-signup@example.com" && e.subject.includes("Verify"),
        );
        expect(verificationEmail).toBeDefined();
        // Should contain OTP code, not a URL with token
        expect(verificationEmail?.otp).toBeDefined();
        expect(verificationEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/email-otp/send-verification-otp", () => {
      it("should send verification OTP to email", async () => {
        mockStore.sentEmails.length = 0;

        const response = await request(app)
          .post("/api/auth/email-otp/send-verification-otp")
          .send({
            email: "otp-verify@example.com",
            type: "email-verification",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-verify@example.com" && e.subject.includes("Verify"),
        );
        expect(otpEmail).toBeDefined();
        expect(otpEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/email-otp/verify-email", () => {
      it("should verify email with correct OTP", async () => {
        // First signup to create user
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-complete@example.com",
            password: "SecurePassword123!",
            name: "OTP Complete User",
          })
          .set("Content-Type", "application/json");

        // Get the OTP from sent emails
        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-complete@example.com" && e.subject.includes("Verify"),
        );
        const otp = otpEmail?.otp;

        // Verify with OTP
        const response = await request(app)
          .post("/api/auth/email-otp/verify-email")
          .send({
            email: "otp-complete@example.com",
            otp,
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
      });

      it("should reject invalid OTP", async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-invalid@example.com",
            password: "SecurePassword123!",
            name: "OTP Invalid User",
          })
          .set("Content-Type", "application/json");

        const response = await request(app)
          .post("/api/auth/email-otp/verify-email")
          .send({
            email: "otp-invalid@example.com",
            otp: "000000",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should reject after max attempts exceeded", async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-attempts@example.com",
            password: "SecurePassword123!",
            name: "OTP Attempts User",
          })
          .set("Content-Type", "application/json");

        // Try 3 wrong attempts
        for (let i = 0; i < 3; i++) {
          await request(app)
            .post("/api/auth/email-otp/verify-email")
            .send({
              email: "otp-attempts@example.com",
              otp: "000000",
            })
            .set("Content-Type", "application/json");
        }

        // 4th attempt should fail even with correct OTP
        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-attempts@example.com" && e.subject.includes("Verify"),
        );

        const response = await request(app)
          .post("/api/auth/email-otp/verify-email")
          .send({
            email: "otp-attempts@example.com",
            otp: otpEmail?.otp,
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body.code).toBe("TOO_MANY_ATTEMPTS");
      });
    });
  });

  describe("Email OTP - Sign In", () => {
    describe("POST /api/auth/email-otp/send-verification-otp (sign-in)", () => {
      it("should send sign-in OTP to existing user", async () => {
        // Create user first
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-signin@example.com",
            password: "SecurePassword123!",
            name: "OTP SignIn User",
          })
          .set("Content-Type", "application/json");

        mockStore.sentEmails.length = 0;

        const response = await request(app)
          .post("/api/auth/email-otp/send-verification-otp")
          .send({
            email: "otp-signin@example.com",
            type: "sign-in",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-signin@example.com" && e.subject.includes("sign-in"),
        );
        expect(otpEmail).toBeDefined();
        expect(otpEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/email-otp/verify-email (sign-in)", () => {
      it("should create session after verifying sign-in OTP", async () => {
        // Create user first
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "otp-session@example.com",
            password: "SecurePassword123!",
            name: "OTP Session User",
          })
          .set("Content-Type", "application/json");

        // Request sign-in OTP
        await request(app)
          .post("/api/auth/email-otp/send-verification-otp")
          .send({
            email: "otp-session@example.com",
            type: "sign-in",
          })
          .set("Content-Type", "application/json");

        // Get OTP
        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-session@example.com" && e.subject.includes("sign-in"),
        );

        // Verify OTP
        const response = await request(app)
          .post("/api/auth/email-otp/verify-email")
          .send({
            email: "otp-session@example.com",
            otp: otpEmail?.otp,
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("session");
        expect(response.headers["set-cookie"]).toBeDefined();
      });
    });
  });

  describe("Email OTP - Password Reset", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: "otp-reset@example.com",
          password: "SecurePassword123!",
          name: "OTP Reset User",
        })
        .set("Content-Type", "application/json");
    });

    describe("POST /api/auth/email-otp/send-verification-otp (forget-password)", () => {
      it("should send password reset OTP", async () => {
        mockStore.sentEmails.length = 0;

        const response = await request(app)
          .post("/api/auth/email-otp/send-verification-otp")
          .send({
            email: "otp-reset@example.com",
            type: "forget-password",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-reset@example.com" && e.subject.includes("Reset"),
        );
        expect(otpEmail).toBeDefined();
        expect(otpEmail?.otp).toMatch(/^\d{6}$/);
      });
    });

    describe("POST /api/auth/email-otp/reset-password", () => {
      it("should reset password with valid OTP", async () => {
        // Request reset OTP
        const sendResponse = await request(app)
          .post("/api/auth/email-otp/send-verification-otp")
          .send({
            email: "otp-reset@example.com",
            type: "forget-password",
          })
          .set("Content-Type", "application/json");

        expect(sendResponse.status).toBe(200);

        // Get OTP - find the reset email (should be the latest one)
        const otpEmail = mockStore.sentEmails.find(
          (e) => e.to === "otp-reset@example.com" && e.subject.includes("Reset"),
        );

        expect(otpEmail).toBeDefined();
        expect(otpEmail?.otp).toBeDefined();

        // Reset password
        const response = await request(app)
          .post("/api/auth/email-otp/reset-password")
          .send({
            email: "otp-reset@example.com",
            otp: otpEmail?.otp,
            password: "NewSecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);

        // Verify can login with new password
        const loginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "otp-reset@example.com",
            password: "NewSecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(loginResponse.status).toBe(200);
      });

      it("should reject reset with invalid OTP", async () => {
        const response = await request(app)
          .post("/api/auth/email-otp/reset-password")
          .send({
            email: "otp-reset@example.com",
            otp: "000000",
            password: "NewSecurePassword123!",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });
    });
  });

  describe("Social OAuth", () => {
    describe("POST /api/auth/sign-in/social - Initiate OAuth", () => {
      it("should return redirect URL for Google OAuth", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/social")
          .send({
            provider: "google",
            callbackURL: "http://localhost:3000/dashboard",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("url");
        expect(response.body.url).toContain("accounts.google.com");
      });

      it("should return redirect URL for GitHub OAuth", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/social")
          .send({
            provider: "github",
            callbackURL: "http://localhost:3000/dashboard",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("url");
        expect(response.body.url).toContain("github.com");
      });

      it("should return redirect URL for Apple OAuth", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/social")
          .send({
            provider: "apple",
            callbackURL: "http://localhost:3000/dashboard",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("url");
        expect(response.body.url).toContain("apple.com");
      });

      it("should reject invalid provider", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/social")
          .send({
            provider: "invalid-provider",
            callbackURL: "http://localhost:3000/dashboard",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });

      it("should reject unconfigured provider", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in/social")
          .send({
            provider: "discord",
            callbackURL: "http://localhost:3000/dashboard",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
      });
    });

    describe("POST /api/auth/link-social - Account Linking", () => {
      it("should require authentication", async () => {
        const response = await request(app)
          .post("/api/auth/link-social")
          .send({
            provider: "github",
            callbackURL: "http://localhost:3000/settings",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });

      it("should return redirect URL when authenticated", async () => {
        // Create and sign in user first
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "link-test@example.com",
            password: "SecurePassword123!",
            name: "Link Test User",
          })
          .set("Content-Type", "application/json");

        const loginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "link-test@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        const cookies = loginResponse.headers["set-cookie"] as string[];

        const response = await request(app)
          .post("/api/auth/link-social")
          .send({
            provider: "github",
            callbackURL: "http://localhost:3000/settings",
          })
          .set("Cookie", cookies)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("url");
        expect(response.body.url).toContain("github.com");
      });
    });

    describe("POST /api/auth/unlink-account - Remove linked account", () => {
      it("should require authentication", async () => {
        const response = await request(app)
          .post("/api/auth/unlink-account")
          .send({
            providerId: "github",
          })
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });
    });
  });

  describe("Bearer Token Authentication", () => {
    let sessionToken: string;
    let sessionCookies: string[];

    beforeEach(async () => {
      // Create and sign in user to get a session token
      await request(app)
        .post("/api/auth/sign-up/email")
        .send({
          email: "bearer@example.com",
          password: "SecurePassword123!",
          name: "Bearer Test User",
        })
        .set("Content-Type", "application/json");

      const loginResponse = await request(app)
        .post("/api/auth/sign-in/email")
        .send({
          email: "bearer@example.com",
          password: "SecurePassword123!",
        })
        .set("Content-Type", "application/json");

      sessionCookies = loginResponse.headers["set-cookie"] as string[];
      // Extract the session token from the cookie for bearer auth
      const cookieMatch = sessionCookies[0].match(/better-auth\.session_token=([^;]+)/);
      sessionToken = cookieMatch?.[1] || "";
    });

    describe("GET /api/auth/session - Bearer token authentication", () => {
      it("should authenticate request using Bearer token in Authorization header", async () => {
        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", `Bearer ${sessionToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("session");
        expect(response.body.user.email).toBe("bearer@example.com");
        expect(response.body.session.id).toBe(sessionToken);
      });

      it("should return same session data for Bearer token as cookie auth", async () => {
        // Get session with Bearer token
        const bearerResponse = await request(app)
          .get("/api/auth/session")
          .set("Authorization", `Bearer ${sessionToken}`);

        // Get session with cookie
        const cookieResponse = await request(app)
          .get("/api/auth/session")
          .set("Cookie", sessionCookies);

        expect(bearerResponse.status).toBe(200);
        expect(cookieResponse.status).toBe(200);
        expect(bearerResponse.body.session.id).toBe(cookieResponse.body.session.id);
        expect(bearerResponse.body.user.id).toBe(cookieResponse.body.user.id);
        expect(bearerResponse.body.user.email).toBe(cookieResponse.body.user.email);
      });

      it("should reject invalid bearer token", async () => {
        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", "Bearer invalid_token_12345");

        expect(response.status).toBe(200);
        expect(response.body.session).toBeNull();
        expect(response.body.user).toBeNull();
      });

      it("should reject malformed Authorization header", async () => {
        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", "InvalidFormat token123");

        expect(response.status).toBe(200);
        expect(response.body.session).toBeNull();
        expect(response.body.user).toBeNull();
      });

      it("should reject missing bearer token for protected endpoints", async () => {
        const response = await request(app).get("/api/auth/session");

        expect(response.status).toBe(200);
        expect(response.body.session).toBeNull();
        expect(response.body.user).toBeNull();
      });

      it("should handle case-insensitive Bearer keyword", async () => {
        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", `bearer ${sessionToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.email).toBe("bearer@example.com");
      });
    });

    describe("POST /api/auth/change-password - Bearer token authentication", () => {
      it("should allow password change with Bearer token", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "SecurePassword123!",
            newPassword: "NewSecurePassword456!",
          })
          .set("Authorization", `Bearer ${sessionToken}`)
          .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
      });

      it("should require valid Bearer token for password change", async () => {
        const response = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "SecurePassword123!",
            newPassword: "NewSecurePassword456!",
          })
          .set("Authorization", "Bearer invalid_token")
          .set("Content-Type", "application/json");

        expect(response.status).toBe(401);
      });

      it("should work with both Bearer and cookie auth for same endpoint", async () => {
        // Change password with Bearer token
        const bearerResponse = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "SecurePassword123!",
            newPassword: "BearerChangedPassword!",
          })
          .set("Authorization", `Bearer ${sessionToken}`)
          .set("Content-Type", "application/json");

        expect(bearerResponse.status).toBe(200);

        // Sign in again to get new session
        const loginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "bearer@example.com",
            password: "BearerChangedPassword!",
          })
          .set("Content-Type", "application/json");

        const newCookies = loginResponse.headers["set-cookie"] as string[];

        // Change password again with cookies
        const cookieResponse = await request(app)
          .post("/api/auth/change-password")
          .send({
            currentPassword: "BearerChangedPassword!",
            newPassword: "CookieChangedPassword!",
          })
          .set("Cookie", newCookies)
          .set("Content-Type", "application/json");

        expect(cookieResponse.status).toBe(200);
      });
    });

    describe("Bearer token format and security", () => {
      it("should accept session token format as bearer token", async () => {
        // Verify the session token follows the expected format (includes period in random part)
        expect(sessionToken).toMatch(/^session_\d+_[a-z0-9.]+$/);

        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", `Bearer ${sessionToken}`);

        expect(response.status).toBe(200);
        expect(response.body.session.id).toBe(sessionToken);
      });

      it("should prioritize Bearer token over cookie when both provided", async () => {
        // Create another user and get their session
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "other@example.com",
            password: "SecurePassword123!",
            name: "Other User",
          })
          .set("Content-Type", "application/json");

        const otherLoginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "other@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        const otherCookies = otherLoginResponse.headers["set-cookie"] as string[];

        // Use Bearer token from first user, but cookies from second user
        const response = await request(app)
          .get("/api/auth/session")
          .set("Authorization", `Bearer ${sessionToken}`)
          .set("Cookie", otherCookies);

        // Should use the Bearer token (first user)
        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe("bearer@example.com");
        expect(response.body.user.email).not.toBe("other@example.com");
      });
    });
  });

  describe("JWT Token & JWKS", () => {
    describe("GET /api/auth/jwks - JWKS endpoint", () => {
      it("should return valid JWKS structure", async () => {
        const response = await request(app).get("/api/auth/jwks");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("keys");
        expect(Array.isArray(response.body.keys)).toBe(true);
        expect(response.body.keys.length).toBeGreaterThan(0);
      });

      it("should return RS256 keys with required JWKS properties", async () => {
        const response = await request(app).get("/api/auth/jwks");

        expect(response.status).toBe(200);

        const firstKey = response.body.keys[0];
        expect(firstKey).toHaveProperty("kty", "RSA");
        expect(firstKey).toHaveProperty("kid");
        expect(firstKey).toHaveProperty("use", "sig");
        expect(firstKey).toHaveProperty("alg", "RS256");
        expect(firstKey).toHaveProperty("n");
        expect(firstKey).toHaveProperty("e", "AQAB");
      });

      it("should be publicly accessible without authentication", async () => {
        const response = await request(app).get("/api/auth/jwks");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("keys");
      });

      it("should include multiple keys for rotation support", async () => {
        const response = await request(app).get("/api/auth/jwks");

        expect(response.status).toBe(200);
        expect(response.body.keys.length).toBeGreaterThanOrEqual(2);

        // Each key should have unique kid
        const kids = response.body.keys.map((key: { kid: string }) => key.kid);
        const uniqueKids = new Set(kids);
        expect(uniqueKids.size).toBe(kids.length);
      });
    });

    describe("GET /api/auth/token - JWT token endpoint", () => {
      let sessionCookies: string[];

      beforeEach(async () => {
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "jwt-test@example.com",
            password: "SecurePassword123!",
            name: "JWT Test User",
          })
          .set("Content-Type", "application/json");

        const loginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "jwt-test@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        sessionCookies = loginResponse.headers["set-cookie"] as string[];
      });

      it("should require authentication", async () => {
        const response = await request(app).get("/api/auth/token");

        expect(response.status).toBe(401);
      });

      it("should return JWT access token for authenticated user", async () => {
        const response = await request(app).get("/api/auth/token").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("type", "Bearer");
        expect(response.body).toHaveProperty("expiresIn");
        expect(typeof response.body.token).toBe("string");
      });

      it("should return JWT with expected structure (header.payload.signature)", async () => {
        const response = await request(app).get("/api/auth/token").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);

        const token = response.body.token;
        const parts = token.split(".");

        // JWT must have exactly 3 parts
        expect(parts.length).toBe(3);
        expect(parts[0]).toBeTruthy(); // header
        expect(parts[1]).toBeTruthy(); // payload
        expect(parts[2]).toBeTruthy(); // signature
      });

      it("should include correct algorithm in JWT header", async () => {
        const response = await request(app).get("/api/auth/token").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);

        const token = response.body.token;
        const headerPart = token.split(".")[0];
        const header = JSON.parse(Buffer.from(headerPart, "base64url").toString());

        expect(header).toHaveProperty("alg", "RS256");
        expect(header).toHaveProperty("typ", "JWT");
        expect(header).toHaveProperty("kid");
      });

      it("should include user claims in JWT payload", async () => {
        const response = await request(app).get("/api/auth/token").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);

        const token = response.body.token;
        const payloadPart = token.split(".")[1];
        const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString());

        expect(payload).toHaveProperty("sub");
        expect(payload).toHaveProperty("email", "jwt-test@example.com");
        expect(payload).toHaveProperty("name", "JWT Test User");
        expect(payload).toHaveProperty("iat");
        expect(payload).toHaveProperty("exp");
      });

      it("should include expiration claim with future timestamp", async () => {
        const response = await request(app).get("/api/auth/token").set("Cookie", sessionCookies);

        expect(response.status).toBe(200);

        const token = response.body.token;
        const payloadPart = token.split(".")[1];
        const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString());

        const now = Math.floor(Date.now() / 1000);
        expect(payload.exp).toBeGreaterThan(now);
        expect(payload.iat).toBeLessThanOrEqual(now);
      });
    });

    describe("JWT & JWKS Integration", () => {
      it("should have matching kid in token header and JWKS", async () => {
        // Sign up and login
        await request(app)
          .post("/api/auth/sign-up/email")
          .send({
            email: "jwt-jwks@example.com",
            password: "SecurePassword123!",
            name: "JWT JWKS User",
          })
          .set("Content-Type", "application/json");

        const loginResponse = await request(app)
          .post("/api/auth/sign-in/email")
          .send({
            email: "jwt-jwks@example.com",
            password: "SecurePassword123!",
          })
          .set("Content-Type", "application/json");

        const sessionCookies = loginResponse.headers["set-cookie"] as string[];

        // Get JWT token
        const tokenResponse = await request(app)
          .get("/api/auth/token")
          .set("Cookie", sessionCookies);

        const token = tokenResponse.body.token;
        const headerPart = token.split(".")[0];
        const header = JSON.parse(Buffer.from(headerPart, "base64url").toString());
        const kid = header.kid;

        // Get JWKS
        const jwksResponse = await request(app).get("/api/auth/jwks");
        const keys = jwksResponse.body.keys;

        // Verify kid exists in JWKS
        const matchingKey = keys.find((key: { kid: string }) => key.kid === kid);
        expect(matchingKey).toBeDefined();
        expect(matchingKey.alg).toBe("RS256");
      });
    });
  });
});
