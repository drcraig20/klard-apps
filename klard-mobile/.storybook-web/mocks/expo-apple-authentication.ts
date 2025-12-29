/**
 * expo-apple-authentication mock for Storybook web environment
 *
 * Returns unavailable for Apple Sign In since it requires native iOS.
 */

import React from 'react';
import { View, Text, Pressable, type ViewStyle } from 'react-native';

export const AppleAuthenticationButtonStyle = {
  WHITE: 0,
  WHITE_OUTLINE: 1,
  BLACK: 2,
} as const;

export type AppleAuthenticationButtonStyle = typeof AppleAuthenticationButtonStyle[keyof typeof AppleAuthenticationButtonStyle];

export const AppleAuthenticationButtonType = {
  SIGN_IN: 0,
  CONTINUE: 1,
  SIGN_UP: 2,
  DEFAULT: 3,
} as const;

export type AppleAuthenticationButtonType = typeof AppleAuthenticationButtonType[keyof typeof AppleAuthenticationButtonType];

export const AppleAuthenticationScope = {
  FULL_NAME: 0,
  EMAIL: 1,
} as const;

export type AppleAuthenticationScope = typeof AppleAuthenticationScope[keyof typeof AppleAuthenticationScope];

export const AppleAuthenticationCredentialState = {
  REVOKED: 0,
  AUTHORIZED: 1,
  NOT_FOUND: 2,
  TRANSFERRED: 3,
} as const;

export type AppleAuthenticationCredentialState = typeof AppleAuthenticationCredentialState[keyof typeof AppleAuthenticationCredentialState];

export const AppleAuthenticationUserDetectionStatus = {
  UNSUPPORTED: 0,
  UNKNOWN: 1,
  LIKELY_REAL: 2,
} as const;

export interface AppleAuthenticationCredential {
  user: string;
  email: string | null;
  fullName: {
    namePrefix: string | null;
    givenName: string | null;
    middleName: string | null;
    familyName: string | null;
    nameSuffix: string | null;
    nickname: string | null;
  } | null;
  realUserStatus: number;
  identityToken: string | null;
  authorizationCode: string | null;
  state: string | null;
}

export interface AppleAuthenticationButtonProps {
  buttonStyle?: AppleAuthenticationButtonStyle;
  buttonType?: AppleAuthenticationButtonType;
  cornerRadius?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AppleAuthenticationButton: React.FC<AppleAuthenticationButtonProps> = ({
  buttonStyle = AppleAuthenticationButtonStyle.BLACK,
  buttonType = AppleAuthenticationButtonType.SIGN_IN,
  cornerRadius = 4,
  onPress,
  style,
}) => {
  const isDark = buttonStyle === AppleAuthenticationButtonStyle.BLACK;

  const buttonTexts = {
    [AppleAuthenticationButtonType.SIGN_IN]: 'Sign in with Apple',
    [AppleAuthenticationButtonType.CONTINUE]: 'Continue with Apple',
    [AppleAuthenticationButtonType.SIGN_UP]: 'Sign up with Apple',
    [AppleAuthenticationButtonType.DEFAULT]: 'Sign in with Apple',
  };

  return React.createElement(Pressable, {
    onPress: () => {
      console.log('[Storybook] Apple Sign In not available on web');
      onPress?.();
    },
    style: [
      {
        backgroundColor: isDark ? '#000' : '#fff',
        borderRadius: cornerRadius,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        borderWidth: buttonStyle === AppleAuthenticationButtonStyle.WHITE_OUTLINE ? 1 : 0,
        borderColor: '#000',
        opacity: 0.5, // Indicate unavailable
      },
      style,
    ],
  },
    React.createElement(Text, {
      style: {
        color: isDark ? '#fff' : '#000',
        fontSize: 16,
        fontWeight: '600' as const,
      },
    }, buttonTexts[buttonType])
  );
};

export async function signInAsync(
  _options?: {
    requestedScopes?: AppleAuthenticationScope[];
    state?: string;
    nonce?: string;
  }
): Promise<AppleAuthenticationCredential | null> {
  console.log('[Storybook] Apple Sign In not available on web');
  return null;
}

export async function getCredentialStateAsync(
  _user: string
): Promise<AppleAuthenticationCredentialState> {
  return AppleAuthenticationCredentialState.NOT_FOUND;
}

export async function isAvailableAsync(): Promise<boolean> {
  // Apple Sign In not available on web
  return false;
}

export async function refreshAsync(
  _options?: {
    requestedScopes?: AppleAuthenticationScope[];
    user: string;
  }
): Promise<AppleAuthenticationCredential | null> {
  return null;
}

export default {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  AppleAuthenticationCredentialState,
  AppleAuthenticationUserDetectionStatus,
  signInAsync,
  getCredentialStateAsync,
  isAvailableAsync,
  refreshAsync,
};
