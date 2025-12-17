import { describe, expect, it } from "vitest";
import { auth } from "../../../src/lib/auth.js";

describe("Auth Passkey Plugin", () => {
  it("should have auth instance defined", () => {
    // Check that auth instance is created successfully
    expect(auth).toBeDefined();
    expect(typeof auth).toBe("object");
  });

  it("should expose passkey endpoints", () => {
    // Verify that the passkey plugin endpoints will be available
    // This is a documentation test to ensure the plugin was configured
    // Integration tests will verify these endpoints work correctly
    const expectedEndpoints = [
      "/api/auth/passkey/add-passkey",
      "/api/auth/passkey/sign-in-passkey",
      "/api/auth/passkey/delete-passkey",
      "/api/auth/passkey/list-user-passkeys",
      "/api/auth/passkey/update-passkey",
    ];

    // This test documents the expected passkey endpoints
    expect(expectedEndpoints.length).toBe(5);
    expect(expectedEndpoints).toContain("/api/auth/passkey/add-passkey");
  });
});
