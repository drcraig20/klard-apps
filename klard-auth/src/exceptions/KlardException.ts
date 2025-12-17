/**
 * Core runtime exception that carries a typed {@link KlardExceptionType} payload and
 * formats messages using positional arguments so handlers can consistently map to HTTP,
 * logging, and alerting concerns.
 */
import type { AlertLevel, KlardExceptionType, LogLevel } from "./KlardExceptionType.js";

/**
 * Replaces placeholders in the exception type message with provided arguments.
 */
function formatMessage(template: string, args: string[]): string {
  if (!args.length) {
    return template;
  }

  return args.reduce((result, arg, index) => {
    return result.replaceAll(new RegExp(`\\{${index}\\}`, "g"), String(arg));
  }, template);
}

/**
 * Typed application exception enriched with HTTP status, error code, logging, and alerting metadata.
 */
export class KlardException extends Error {
  readonly exceptionType: KlardExceptionType;

  constructor(exceptionType: KlardExceptionType, ...messageArguments: string[]);
  constructor(exceptionType: KlardExceptionType, ...additionalMessageArgs: string[]) {
    const formattedMessage = formatMessage(exceptionType.message, additionalMessageArgs);

    super(formattedMessage);
    this.name = "KlardException";
    this.exceptionType = exceptionType;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  getHttpStatus(): number {
    return this.exceptionType.status;
  }

  getErrorCode(): string {
    return this.exceptionType.errorCode;
  }

  getLogLevel(): LogLevel {
    return this.exceptionType.logLevel;
  }

  getAlertLevel(): AlertLevel {
    return this.exceptionType.alertLevel;
  }

  getLookupCode(): string {
    return this.exceptionType.lookupCode;
  }
}
