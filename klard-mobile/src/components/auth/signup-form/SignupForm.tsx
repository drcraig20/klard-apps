import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { SignupSchema, type SignupInput } from '@klard-apps/commons';
import { signUp } from '@/lib/auth-client';
import { useThemeColors } from '@/hooks';
import { useAuthUIStore } from '@/stores';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { InputField } from '../input-field';
import { PasswordStrengthIndicator } from '../password-strength-indicator';
import { TermsCheckbox } from '../terms-checkbox';
import { SocialButtons } from '../social-buttons';
import { ErrorBanner } from '../error-banner';
import { styles } from './signup-form.styles';

export function SignupForm() {
  const router = useRouter();
  const colors = useThemeColors();
  const [passwordValue, setPasswordValue] = useState('');

  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
  } = useAuthUIStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const isSubmitting = uiState === 'submitting';

  async function onSubmit(data: SignupInput) {
    try {
      setSubmitting();

      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.signupFailed'));
      }

      // New users need to complete onboarding
      router.replace('/onboarding');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  function handleSocialError(error: string) {
    setError(error);
  }

  return (
    <View style={styles.container}>
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.nameLabel')}
              placeholder={t('auth.signup.namePlaceholder')}
              autoCapitalize="words"
              autoComplete="name"
              error={errors.name?.message}
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
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.emailLabel')}
              placeholder={t('auth.signup.emailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
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
            <View>
              <InputField
                label={t('auth.signup.passwordLabel')}
                placeholder={t('auth.signup.passwordPlaceholder')}
                isPassword
                autoComplete="new-password"
                error={errors.password?.message}
                editable={!isSubmitting}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setPasswordValue(text);
                }}
                value={value}
              />
              <PasswordStrengthIndicator password={passwordValue} />
            </View>
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.confirmPasswordLabel')}
              placeholder={t('auth.signup.confirmPasswordPlaceholder')}
              isPassword
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
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
          name="agreeToTerms"
          render={({ field: { onChange, value } }) => (
            <TermsCheckbox
              value={value}
              onValueChange={onChange}
              error={errors.agreeToTerms?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              opacity: isSubmitting ? 0.5 : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={t('auth.signup.submitButton')}
          accessibilityState={{ disabled: isSubmitting }}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[typography.button, { color: colors.primaryForeground }]}>
              {t('auth.signup.submitButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, typography.bodySmall, { color: colors.textTertiary }]}>
          {t('auth.signup.orContinueWith')}
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      <View style={styles.loginContainer}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {t('auth.signup.haveAccount')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          accessibilityRole="link"
          accessibilityLabel={t('auth.signup.signIn')}
        >
          <Text style={[typography.label, { color: colors.primary }]}>
            {t('auth.signup.signIn')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trustContainer}>
        <Text style={[typography.bodySmall, { color: colors.textTertiary }]}>
          {t('auth.signup.trustElement')}
        </Text>
      </View>
    </View>
  );
}