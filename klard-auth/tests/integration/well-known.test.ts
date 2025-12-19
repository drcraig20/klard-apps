// @ts-ignore
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";

const app = createApp();

describe("Well-Known Files Integration Tests", () => {
  describe("GET /.well-known/assetlinks.json", () => {
    it("should serve assetlinks.json without authentication", async () => {
      const response = await request(app).get("/.well-known/assetlinks.json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should return valid JSON content", async () => {
      const response = await request(app).get("/.well-known/assetlinks.json");

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("relation");
      expect(response.body[0]).toHaveProperty("target");
    });
  });

  describe("GET /.well-known/apple-app-site-association", () => {
    it("should serve apple-app-site-association without authentication", async () => {
      const response = await request(app).get("/.well-known/apple-app-site-association");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should return valid JSON content", async () => {
      const response = await request(app).get("/.well-known/apple-app-site-association");

      expect(response.body).toHaveProperty("applinks");
      expect(response.body).toHaveProperty("webcredentials");
    });
  });

  describe("Static File Security", () => {
    it("should not require authentication for .well-known files", async () => {
      // No Authorization header sent
      const response = await request(app).get("/.well-known/assetlinks.json");

      // Should succeed without auth
      expect(response.status).toBe(200);
    });

    it("should not allow directory traversal", async () => {
      const response = await request(app).get("/.well-known/../package.json");

      // Should either 404 or serve the correct file without traversal
      expect(response.status).not.toBe(200);
    });
  });
});
