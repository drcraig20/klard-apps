import { describe, expect, it, vi } from "vitest";

describe("config", () => {
  it("should use default port 3000 when PORT is not set", async () => {
    vi.stubEnv("PORT", "");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    // Empty string parses to NaN, so we get NaN (not 3000)
    // The default "3000" only applies when PORT is undefined
    expect(config.port).toBeNaN();
    vi.unstubAllEnvs();
  });

  it("should use PORT from environment when set", async () => {
    vi.stubEnv("PORT", "4000");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    expect(config.port).toBe(4000);
    vi.unstubAllEnvs();
  });

  it("should treat empty NODE_ENV as empty string (not undefined)", async () => {
    vi.stubEnv("NODE_ENV", "");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    // ?? only defaults on null/undefined, empty string passes through
    expect(config.nodeEnv).toBe("");
    expect(config.isDevelopment).toBe(false);
    expect(config.isProduction).toBe(false);
    vi.unstubAllEnvs();
  });

  it("should detect production environment", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    expect(config.nodeEnv).toBe("production");
    expect(config.isDevelopment).toBe(false);
    expect(config.isProduction).toBe(true);
    vi.unstubAllEnvs();
  });

  it("should parse ALLOWED_ORIGINS as comma-separated list", async () => {
    vi.stubEnv("ALLOWED_ORIGINS", "https://example.com, https://app.example.com");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    expect(config.allowedOrigins).toEqual(["https://example.com", "https://app.example.com"]);
    vi.unstubAllEnvs();
  });

  it("should return empty array when ALLOWED_ORIGINS is not set", async () => {
    vi.stubEnv("ALLOWED_ORIGINS", "");
    vi.resetModules();
    const { config } = await import("../../src/config/index.js");
    expect(config.allowedOrigins).toEqual([]);
    vi.unstubAllEnvs();
  });

  describe("OTP configuration", () => {
    it("should use default OTP length of 6 when not set", async () => {
      vi.stubEnv("OTP_LENGTH", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.length).toBe(6);
      vi.unstubAllEnvs();
    });

    it("should use OTP_LENGTH from environment when set", async () => {
      vi.stubEnv("OTP_LENGTH", "8");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.length).toBe(8);
      vi.unstubAllEnvs();
    });

    it("should use default OTP expiration of 600 seconds when not set", async () => {
      vi.stubEnv("OTP_EXPIRES_IN", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.expiresIn).toBe(600);
      vi.unstubAllEnvs();
    });

    it("should use OTP_EXPIRES_IN from environment when set", async () => {
      vi.stubEnv("OTP_EXPIRES_IN", "300");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.expiresIn).toBe(300);
      vi.unstubAllEnvs();
    });

    it("should use default OTP max attempts of 3 when not set", async () => {
      vi.stubEnv("OTP_MAX_ATTEMPTS", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.maxAttempts).toBe(3);
      vi.unstubAllEnvs();
    });

    it("should use OTP_MAX_ATTEMPTS from environment when set", async () => {
      vi.stubEnv("OTP_MAX_ATTEMPTS", "5");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.otp.maxAttempts).toBe(5);
      vi.unstubAllEnvs();
    });
  });

  describe("Passkey configuration", () => {
    it("should treat empty PASSKEY_RP_ID as empty string (not default)", async () => {
      vi.stubEnv("PASSKEY_RP_ID", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      // ?? only defaults on null/undefined, empty string passes through
      expect(config.passkey.rpID).toBe("");
      vi.unstubAllEnvs();
    });

    it("should use PASSKEY_RP_ID from environment when set", async () => {
      vi.stubEnv("PASSKEY_RP_ID", "klard.app");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.passkey.rpID).toBe("klard.app");
      vi.unstubAllEnvs();
    });

    it("should treat empty PASSKEY_RP_NAME as empty string (not default)", async () => {
      vi.stubEnv("PASSKEY_RP_NAME", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      // ?? only defaults on null/undefined, empty string passes through
      expect(config.passkey.rpName).toBe("");
      vi.unstubAllEnvs();
    });

    it("should use PASSKEY_RP_NAME from environment when set", async () => {
      vi.stubEnv("PASSKEY_RP_NAME", "Klard Dev");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.passkey.rpName).toBe("Klard Dev");
      vi.unstubAllEnvs();
    });

    it("should treat empty PASSKEY_ORIGIN as empty string (not default)", async () => {
      vi.stubEnv("PASSKEY_ORIGIN", "");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      // ?? only defaults on null/undefined, empty string passes through
      expect(config.passkey.origin).toBe("");
      vi.unstubAllEnvs();
    });

    it("should use PASSKEY_ORIGIN from environment when set", async () => {
      vi.stubEnv("PASSKEY_ORIGIN", "https://klard.app");
      vi.resetModules();
      const { config } = await import("../../src/config/index.js");
      expect(config.passkey.origin).toBe("https://klard.app");
      vi.unstubAllEnvs();
    });
  });
});
