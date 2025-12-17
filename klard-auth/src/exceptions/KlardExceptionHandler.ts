/**
 * Express middleware for handling KlardExceptions and unexpected errors.
 * Translates typed exceptions into structured JSON responses.
 */
import type { NextFunction, Request, Response } from "express";

import { config } from "../config/index.js";
import { KlardErrorResponse } from "./KlardErrorResponse.js";
import { KlardException } from "./KlardException.js";

/**
 * 404 handler for undefined routes.
 * Should be registered after all route handlers.
 */
export function notFoundHandler(_req: Request, res: Response, _next: NextFunction): void {
  res.status(404).json({
    error: "not_found",
    errorDescription: "The requested resource was not found",
    status: 404,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Global error handler middleware for Express.
 * Maps KlardExceptions to structured responses and handles unexpected errors.
 * Must be registered last, after all routes and other middleware.
 */
export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof KlardException) {
    const body = new KlardErrorResponse(err);

    // Log based on exception's log level
    const logLevel = err.getLogLevel();
    if (logLevel === "ERROR" || logLevel === "WARN") {
      console.error(`[${logLevel}] ${err.getLookupCode()}: ${err.message}`);
    }

    res.status(body.status).json(body);
    return;
  }

  // Unknown/unexpected error
  console.error("Unexpected error:", err);

  res.status(500).json({
    error: "internal_error",
    errorDescription: config.isDevelopment ? err.message : "An unexpected error occurred",
    status: 500,
    timestamp: new Date().toISOString(),
  });
}
