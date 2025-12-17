/**
 * Factory for constructing typed {@link KlardException} instances from predefined
 * {@link KlardExceptionType} definitions to keep creation consistent across layers.
 */
import { KlardException } from "./KlardException.js";
import type { KlardExceptionType } from "./KlardExceptionType.js";

export class KlardExceptionFactory {
  /**
   * Creates a KlardException with formatted message arguments for the given type.
   */
  static create(exceptionType: KlardExceptionType, ...messageArguments: string[]): KlardException {
    return new KlardException(exceptionType, ...messageArguments);
  }
}
