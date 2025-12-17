import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { useThemeColors, useShakeAnimation } from '@/hooks';
import { useAuthUIStore } from '@/stores';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { Button, InputField, CheckboxField } from '@/components/ui';
import { SocialButtons } from '../social-buttons';
import { MagicLinkSent } from '../magic-link-sent';
import { ErrorBanner } from '../error-banner';
import { NetworkErrorSheet } from '../network-error-sheet';
import { isNetworkError } from '@/utils/error-helpers';
import { styles } from './login-form.styles';

export function LoginForm() {
  const router = useRouter();
  const colors = useThemeColors();
  const { animatedStyle, shake } = useShakeAnimation();

  const {
    formState: uiState,
    errorMessage,
    magicLinkEmail,
    setSubmitting,
    setMagicLinkSent,
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
      rememberMe: false,
    },
  });

  const isSubmitting = uiState === 'submitting';

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

      reset();
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      shake();
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      shake();
      setError('Please enter a valid email to receive a magic link');
      return;
    }

    try {
      setSubmitting();

      const callbackURL = Linking.createURL('(tabs)/dashboard');

      const result = await signIn.magicLink({
        email: validation.data.email,
        callbackURL,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send magic link');
      }

      setMagicLinkSent(validation.data.email);
    } catch (error) {
      shake();
      setError(
        error instanceof Error ? error.message : 'Failed to send magic link'
      );
    }
  }

  function handleSocialError(error: string) {
    shake();
    setError(error);
  }

  if (uiState === 'magicLinkSent' && magicLinkEmail) {
    return <MagicLinkSent email={magicLinkEmail} onBack={reset} />;
  }

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

        <View style={styles.optionsRow}>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <CheckboxField
                checked={value}
                onChange={onChange}
                label={t('auth.login.rememberMe')}
                disabled={isSubmitting}
              />
            )}
          />

          <TouchableOpacity
            onPress={handleMagicLink}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel={t('auth.login.magicLinkButton')}
          >
            <Text style={[typography.label, { color: colors.primary }]}>
              {t('auth.login.magicLinkButton')}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          variant="primary"
          size="lg"
          loading={isSubmitting}
          fullWidth
          onPress={handleSubmit(onSubmit)}
        >
          {t('auth.login.submitButton')}
        </Button>
      </Animated.View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, typography.bodySmall, { color: colors.textTertiary }]}>
          {t('auth.login.orContinueWith')}
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

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
    </View>
  );
}