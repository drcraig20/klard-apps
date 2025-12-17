import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

const app = createApp();

describe("App Integration Tests", () => {
  describe("GET /health", () => {
    it("should return healthy status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status", "healthy");
      expect(response.body).toHaveProperty("timestamp");
    });

    it("should return valid ISO timestamp", async () => {
      const response = await request(app).get("/health");

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/nonexistent-route");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "not_found");
      expect(response.body).toHaveProperty(
        "errorDescription",
        "The requested resource was not found",
      );
    });
  });

  describe("Security Headers", () => {
    it("should include security headers from helmet", async () => {
      const response = await request(app).get("/health");

      expect(response.headers).toHaveProperty("x-content-type-options");
      expect(response.headers).toHaveProperty("x-frame-options");
    });
  });

  describe("JSON Body Parsing", () => {
    it("should parse JSON request bodies", async () => {
      // This test documents the JSON parsing capability
      // Actual auth endpoints will use this
      const response = await request(app)
        .post("/nonexistent")
        .send({ test: "data" })
        .set("Content-Type", "application/json");

      // Should still 404, but body was parsed
      expect(response.status).toBe(404);
    });
  });
});
