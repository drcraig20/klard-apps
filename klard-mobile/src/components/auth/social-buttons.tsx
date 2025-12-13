import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '@/hooks';
import { signIn } from '@/lib/auth-client';

interface SocialButtonsProps {
  disabled?: boolean;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export function SocialButtons({ disabled, onError, onSuccess }: Readonly<SocialButtonsProps>) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const colors = useThemeColors();

  async function handleGoogleLogin() {
    if (disabled || loadingProvider) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setLoadingProvider('google');
      await signIn.social({ provider: 'google' });
      onSuccess?.();
    } catch {
      onError?.('Failed to sign in with google. Please try again.');
    } finally {
      setLoadingProvider(null);
    }
  }

  async function handleAppleLogin() {
    if (disabled || loadingProvider) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setLoadingProvider('apple');

      if (Platform.OS === 'ios') {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        if (!credential.identityToken) {
          throw new Error('No identity token received from Apple');
        }

        // Send credential to backend via signIn.social
        await signIn.social({
          provider: 'apple',
          idToken: { token: credential.identityToken },
        });
      } else {
        // Android fallback - use web-based OAuth
        await signIn.social({ provider: 'apple' });
      }
      onSuccess?.();
    } catch (error: unknown) {
      const errorWithCode = error as Error & { code?: string };
      if (errorWithCode?.code === 'ERR_REQUEST_CANCELED') {
        // User cancelled - don't show error
        return;
      }
      onError?.('Failed to sign in with apple. Please try again.');
    } finally {
      setLoadingProvider(null);
    }
  }

  const isDisabled = disabled || loadingProvider !== null;

  return (
    <View style={styles.container}>
      {/* Google Button */}
      <TouchableOpacity
        onPress={handleGoogleLogin}
        disabled={isDisabled}
        style={[
          styles.button,
          {
            borderColor: colors.border,
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Sign in with Google"
      >
        {loadingProvider === 'google' ? (
          <ActivityIndicator size="small" color={colors.foreground} />
        ) : (
          <View style={styles.buttonContent}>
            <GoogleIcon />
            <Text style={[styles.buttonText, { color: colors.foreground }]}>
              Google
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Apple Button - Native on iOS, Custom on Android */}
      {Platform.OS === 'ios' ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={12}
          style={[styles.appleButton, { opacity: isDisabled ? 0.5 : 1 }]}
          onPress={handleAppleLogin}
          testID="apple-native-button"
        />
      ) : (
        <TouchableOpacity
          onPress={handleAppleLogin}
          disabled={isDisabled}
          style={[
            styles.button,
            {
              borderColor: colors.border,
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Sign in with Apple"
        >
          {loadingProvider === 'apple' ? (
            <ActivityIndicator size="small" color={colors.foreground} />
          ) : (
            <View style={styles.buttonContent}>
              <AppleIcon color={colors.foreground} />
              <Text style={[styles.buttonText, { color: colors.foreground }]}>
                Apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

function AppleIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill={color}>
      <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleButton: {
    flex: 1,
    height: 48,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
