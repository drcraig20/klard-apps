// klard-web/src/types/passkey.ts
export type PasskeyErrorCode =
  | 'BIOMETRIC_UNAVAILABLE'
  | 'USER_CANCELLED'
  | 'CREDENTIAL_FAILED'
  | 'NETWORK_ERROR'
  | 'RATE_LIMITED'
  | 'INVALID_CREDENTIAL';

export interface PasskeyError {
  code: PasskeyErrorCode;
  message: string;
}

export interface Passkey {
  id: string;
  name: string;
  createdAt: Date;
  deviceType?: 'platform' | 'cross-platform';
  backedUp?: boolean;
}

export interface PasskeyAuthResult {
  success: boolean;
  data?: Passkey;
  error?: PasskeyError;
}
