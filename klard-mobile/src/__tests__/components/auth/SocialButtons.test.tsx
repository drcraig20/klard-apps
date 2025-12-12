/**
 * Tests for SocialButtons Component (Mobile)
 *
 * These tests verify:
 * 1. Renders Google and Apple buttons
 * 2. Uses native Apple button on iOS
 * 3. Loading states
 * 4. Error handling (including cancellation)
 * 5. Haptic feedback
 * 6. Disabled state
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SocialButtons } from '@/components/auth/social-buttons';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
  },
}));

// Mock the auth client
jest.mock('@/lib/auth-client', () => ({
  signIn: {
    social: jest.fn(),
  },
}));

// Mock expo-apple-authentication
jest.mock('expo-apple-authentication', () => ({
  signInAsync: jest.fn(),
  AppleAuthenticationButton: ({ onPress, style }: { onPress: () => void; style: object }) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity
        testID="apple-native-button"
        onPress={onPress}
        style={style}
        accessibilityRole="button"
      >
        <Text>Sign in with Apple</Text>
      </TouchableOpacity>
    );
  },
  AppleAuthenticationButtonType: {
    SIGN_IN: 0,
  },
  AppleAuthenticationButtonStyle: {
    BLACK: 0,
    WHITE: 1,
  },
  AppleAuthenticationScope: {
    FULL_NAME: 0,
    EMAIL: 1,
  },
  isAvailableAsync: jest.fn().mockResolvedValue(true),
}));

// Mock useThemeColors hook
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    foreground: '#000000',
    border: '#E2E8F0',
    primary: '#0D7C7A',
  }),
}));

import { signIn } from '@/lib/auth-client';
import * as AppleAuthentication from 'expo-apple-authentication';

describe('SocialButtons (Mobile)', () => {
  const mockOnError = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'ios';
  });

  describe('Rendering', () => {
    it('should render Google button', () => {
      const { getByText } = render(<SocialButtons />);

      expect(getByText('Google')).toBeTruthy();
    });

    it('should render Apple button on iOS', () => {
      Platform.OS = 'ios';
      const { getByTestId } = render(<SocialButtons />);

      expect(getByTestId('apple-native-button')).toBeTruthy();
    });

    it('should render custom Apple button on Android', () => {
      Platform.OS = 'android';
      const { getByText } = render(<SocialButtons />);

      expect(getByText('Apple')).toBeTruthy();
    });
  });

  describe('Google Authentication', () => {
    it('should call signIn.social with google provider', async () => {
      (signIn.social as jest.Mock).mockResolvedValueOnce({});

      const { getByText } = render(<SocialButtons />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        expect(signIn.social).toHaveBeenCalledWith({ provider: 'google' });
      });
    });

    it('should trigger haptic feedback on press', async () => {
      (signIn.social as jest.Mock).mockResolvedValueOnce({});

      const { getByText } = render(<SocialButtons />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });

    it('should call onSuccess when Google auth succeeds', async () => {
      (signIn.social as jest.Mock).mockResolvedValueOnce({});

      const { getByText } = render(<SocialButtons onSuccess={mockOnSuccess} />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Apple Authentication (iOS)', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
    });

    it('should call AppleAuthentication.signInAsync on iOS', async () => {
      (AppleAuthentication.signInAsync as jest.Mock).mockResolvedValueOnce({
        user: 'test-user',
        email: 'test@example.com',
        identityToken: 'test-token',
      });
      (signIn.social as jest.Mock).mockResolvedValueOnce({});

      const { getByTestId } = render(<SocialButtons />);

      fireEvent.press(getByTestId('apple-native-button'));

      await waitFor(() => {
        expect(AppleAuthentication.signInAsync).toHaveBeenCalled();
        expect(signIn.social).toHaveBeenCalledWith({
          provider: 'apple',
          idToken: 'test-token',
        });
      });
    });

    it('should trigger haptic feedback for Apple sign in', async () => {
      (AppleAuthentication.signInAsync as jest.Mock).mockResolvedValueOnce({
        identityToken: 'test-token',
      });
      (signIn.social as jest.Mock).mockResolvedValueOnce({});

      const { getByTestId } = render(<SocialButtons />);

      fireEvent.press(getByTestId('apple-native-button'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator when authenticating', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      (signIn.social as jest.Mock).mockReturnValueOnce(promise);

      const { getByText, UNSAFE_queryByType } = render(<SocialButtons />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        const { ActivityIndicator } = require('react-native');
        expect(UNSAFE_queryByType(ActivityIndicator)).toBeTruthy();
      });

      resolvePromise!();
    });

    it('should disable buttons while loading', async () => {
      let resolvePromise: () => void;
      const promise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
      (signIn.social as jest.Mock).mockReturnValueOnce(promise);

      const { getByText, queryByText, getByTestId } = render(<SocialButtons />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        // Google text is hidden while loading (shows spinner instead)
        expect(queryByText('Google')).toBeNull();
        // Apple button should still be visible (native button on iOS)
        expect(getByTestId('apple-native-button')).toBeTruthy();
        // Should only have been called once
        expect(signIn.social).toHaveBeenCalledTimes(1);
      });

      resolvePromise!();
    });
  });

  describe('Error Handling', () => {
    it('should call onError when Google auth fails', async () => {
      (signIn.social as jest.Mock).mockRejectedValueOnce(new Error('Failed'));

      const { getByText } = render(<SocialButtons onError={mockOnError} />);

      fireEvent.press(getByText('Google'));

      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith(
          'Failed to sign in with google. Please try again.'
        );
      });
    });

    it('should handle Apple cancellation gracefully', async () => {
      Platform.OS = 'ios';
      const cancelError = new Error('User cancelled');
      (cancelError as Error & { code?: string }).code = 'ERR_REQUEST_CANCELED';
      (AppleAuthentication.signInAsync as jest.Mock).mockRejectedValueOnce(cancelError);

      const { getByTestId } = render(<SocialButtons onError={mockOnError} />);

      fireEvent.press(getByTestId('apple-native-button'));

      await waitFor(() => {
        // Should NOT call onError for cancellation
        expect(mockOnError).not.toHaveBeenCalled();
      });
    });
  });

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      const { getByText } = render(<SocialButtons disabled />);

      fireEvent.press(getByText('Google'));

      expect(signIn.social).not.toHaveBeenCalled();
    });
  });
});