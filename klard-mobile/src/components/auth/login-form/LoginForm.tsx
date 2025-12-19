import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { LoginSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';
import { usePasskeyAuth } from '@/hooks/usePasskeyAuth';
import { useHaptics } from '@/hooks/useHaptics';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { Button, InputField } from '@/components/ui';
import { SocialButtons } from '../social-buttons';
import { ErrorBanner } from '../error-banner';
import { NetworkErrorSheet } from '../network-error-sheet';
import { isNetworkError } from '@/utils/error-helpers';
import { styles } from './login-form.styles';

type PendingOperation = 'email' | null;

export function LoginForm() {
  const router = useRouter();
  const colors = useThemeColors();
  const { animatedStyle, shake } = useShakeAnimation();
  const haptics = useHaptics();

  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
    reset,
  } = useAuthUIStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Passkey authentication
  const {
    isLoading: passkeyLoading,
    isAvailable: passkeyAvailable,
    checkAvailability,
    signInWithPasskey,
  } = usePasskeyAuth();

  // Network error state
  const [networkError, setNetworkError] = useState<{ message: string; code?: string } | null>(null);
  const [pendingOperation, setPendingOperation] = useState<PendingOperation>(null);

  const isSubmitting = uiState === 'submitting';

  // Check passkey availability on mount
  useEffect(() => {
    void checkAvailability();
  }, [checkAvailability]);

  // Clear any stale error state from previous screens on mount
  useEffect(() => {
    reset();
  }, [reset]);

  async function onSubmit(data: LoginInput) {
    try {
      setSubmitting();

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid email or password');
      }

      haptics.success();
      reset();
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      shake();

      // Check if it's a network error
      if (isNetworkError(error)) {
        setNetworkError({
          message: error instanceof Error ? error.message : 'Network request failed',
          code: 'NETWORK_ERROR',
        });
        setPendingOperation('email');
      } else {
        // Show inline error banner for auth errors
        setError(
          error instanceof Error ? error.message : 'An unexpected error occurred'
        );
      }
    }
  }

  async function handlePasskeySignIn() {
    try {
      // Note: signInWithPasskey uses discoverable credentials - no email required
      const result = await signInWithPasskey();

      if (result.success) {
        haptics.success();
        reset();
        router.replace('/(tabs)/dashboard');
      } else if (result.error) {
        shake();
        setError(result.error.message);
      }
    } catch (error) {
      shake();
      setError(
        error instanceof Error ? error.message : 'Failed to sign in with passkey'
      );
    }
  }

  function handleSocialError(error: string) {
    shake();
    setError(error);
  }

  function handleSocialSuccess() {
    haptics.success();
  }

  const handleNetworkErrorRetry = useCallback(() => {
    // Close the sheet first
    setNetworkError(null);

    // Retry the pending operation with preserved form values
    if (pendingOperation === 'email') {
      const values = getValues();
      void onSubmit(values);
    }

    setPendingOperation(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingOperation, getValues]);

  const handleNetworkErrorClose = useCallback(() => {
    setNetworkError(null);
    setPendingOperation(null);
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      <Animated.View style={[styles.form, animatedStyle]}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              type="email"
              label={t('auth.login.emailLabel')}
              placeholder={t('auth.login.emailPlaceholder')}
              autoComplete="email"
              error={errors.email?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              type="password"
              label={t('auth.login.passwordLabel')}
              placeholder={t('auth.login.passwordPlaceholder')}
              autoComplete="password"
              error={errors.password?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.fieldSpacer} />

        <Button
          variant="primary"
          size="lg"
          loading={isSubmitting}
          fullWidth
          onPress={handleSubmit(onSubmit)}
        >
          {t('auth.login.submitButton')}
        </Button>

        {passkeyAvailable && (
          <>
            <View style={styles.fieldSpacer} />
            <Button
              variant="secondary"
              size="lg"
              loading={passkeyLoading}
              fullWidth
              onPress={handlePasskeySignIn}
              disabled={passkeyLoading}
            >
              {passkeyLoading ? t('auth.login.passkeyLoading') : t('auth.login.passkeyButton')}
            </Button>
          </>
        )}
      </Animated.View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, typography.bodySmall, { color: colors.textTertiary }]}>
          {t('auth.login.orContinueWith')}
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <SocialButtons disabled={isSubmitting} onError={handleSocialError} onSuccess={handleSocialSuccess} />

      <View style={styles.signupContainer}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {t('auth.login.noAccount')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/signup')}
          accessibilityRole="link"
          accessibilityLabel={t('auth.login.signUp')}
        >
          <Text style={[typography.label, { color: colors.primary }]}>
            {t('auth.login.signUp')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trustContainer}>
        <Text style={[typography.bodySmall, { color: colors.textTertiary }]}>
          🔒 {t('auth.login.trustElement')}
        </Text>
      </View>

      {networkError && (
        <NetworkErrorSheet
          open={!!networkError}
          onClose={handleNetworkErrorClose}
          onRetry={handleNetworkErrorRetry}
          error={networkError}
        />
      )}
    </View>
  );
}