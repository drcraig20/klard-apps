import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./config/index.js";
import { globalErrorHandler, notFoundHandler } from "./exceptions/KlardExceptionHandler.js";
import { auth } from "./lib/auth.js";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp(): Express {
  const app = express();

  // Security headers - disable CSP for configured paths (e.g., OpenAPI docs with inline scripts)
  const cspExemptPaths = new Set(config.security.cspExemptPaths);
  app.use((req, res, next) => {
    if (cspExemptPaths.has(req.path)) {
      return helmet({ contentSecurityPolicy: false })(req, res, next);
    }
    return helmet()(req, res, next);
  });

  // CORS configuration
  app.use(
    cors({
      origin: config.isDevelopment ? true : config.allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  // Cookie parsing
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Request logging
  app.use(morgan(config.isDevelopment ? "dev" : "combined"));

  // Serve .well-known files for passkey domain verification
  // MUST be before Better Auth handler to be accessible without authentication
  app.use(
    "/.well-known",
    express.static(path.join(__dirname, "../public/.well-known"), {
      setHeaders: (res, filePath) => {
        // Apple requires no extension and specific content type
        if (filePath.endsWith("apple-app-site-association")) {
          res.setHeader("Content-Type", "application/json");
        }
      },
    }),
  );

  // Better Auth handler - MUST be before express.json() middleware
  // Handles: /api/auth/sign-up/email, /api/auth/sign-in/email, /api/auth/sign-out, etc.
  app.all("/api/auth/*splat", toNodeHandler(auth));

  // Body parsing - MUST be after Better Auth handler
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Health endpoint for load balancers
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Error handling - must be registered last
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
}
