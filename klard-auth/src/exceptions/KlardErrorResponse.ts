/**
 * DTO serialized to clients when a KlardException surfaces through API route wrappers.
 * Captures machine-readable codes alongside HTTP status and timestamp for troubleshooting.
 */
import type { KlardException } from "./KlardException.js";

/**
 * Maps a KlardException to a JSON-safe response shape.
 */
export class KlardErrorResponse {
  error: string;
  errorDescription: string;
  lookupCode: string;
  status: number;
  timestamp: string;

  constructor(exception: KlardException) {
    this.error = exception.getErrorCode();
    this.errorDescription = exception.message;
    this.lookupCode = exception.getLookupCode();
    this.status = exception.getHttpStatus();
    this.timestamp = new Date().toString();
  }
}
