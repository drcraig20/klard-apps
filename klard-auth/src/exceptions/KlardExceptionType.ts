/**
 * Defines structured exception metadata (HTTP status, error codes, logging and alerting levels)
 * used throughout the application to ensure consistent error handling and observability.
 */
export enum LogLevel {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export enum AlertLevel {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
}

/**
 * Structured definition for exception metadata applied across layers.
 */
export class KlardExceptionType {
  static readonly LOOKUP_CODE_PREFIX = "010.";

  /**
   * Bundles HTTP status, machine-readable codes, alert/log levels, and human message
   * templates for constructing KlardExceptions.
   */
  readonly status: number;
  readonly errorCode: string;
  readonly message: string;
  readonly alertLevel: AlertLevel;
  readonly logLevel: LogLevel;
  readonly lookupCode: string;

  constructor(
    status: number,
    errorCode: string,
    alertLevel: AlertLevel,
    code: string,
    message: string,
    logLevel: LogLevel = LogLevel.ERROR,
  ) {
    this.status = status;
    this.errorCode = errorCode;
    this.alertLevel = alertLevel;
    this.logLevel = logLevel;
    this.lookupCode = `${KlardExceptionType.LOOKUP_CODE_PREFIX}${code}`;
    this.message = message;
  }

  /**
   * Standard 400 error for invalid client submissions with a formatted detail placeholder.
   */
  static readonly INVALID_REQUEST = new KlardExceptionType(
    400,
    "invalid_request",
    AlertLevel.ONE,
    "001.001",
    "The request is invalid: {0}",
  );
  static readonly INVALID_EMAIL = new KlardExceptionType(
    400,
    "invalid_request",
    AlertLevel.ONE,
    "001.002",
    "Please enter a valid email address",
  );
}
