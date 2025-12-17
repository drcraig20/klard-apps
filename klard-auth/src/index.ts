import "dotenv/config";

import { createApp } from "./app.js";
import { config } from "./config/index.js";

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`Klard Auth Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`JWKS available at /api/auth/jwks`);
});

// Graceful shutdown handling
function shutdown(signal: string): void {
  console.log(`\n${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  // Force exit after timeout if graceful shutdown fails
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
