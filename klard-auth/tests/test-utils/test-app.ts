/**
 * Test-specific Express app factory that uses the mock auth handler
 * instead of the real Better Auth handler.
 */
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import { mockAuthHandler } from "../mocks/auth-mock.js";

export function createTestApp(): Express {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  // Cookie parsing
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Request logging - disabled for tests to reduce noise
  // app.use(morgan("dev"));

  // Body parsing - for auth mock, we need it BEFORE the handler
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Mock Auth handler - handles all /api/auth/* routes
  app.all("/api/auth/*splat", (req, res) => mockAuthHandler(req, res));

  // Health endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      error: "not_found",
      errorDescription: "The requested resource was not found",
    });
  });

  return app;
}
