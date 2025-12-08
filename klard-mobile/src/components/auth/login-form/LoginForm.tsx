import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useThemeColors, useLoginForm } from '@/hooks';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { InputField } from '../input-field';
import { SocialButtons } from '../social-buttons';
import { MagicLinkSent } from '../magic-link-sent';
import { ErrorBanner } from '../error-banner';
import { styles } from './login-form.styles';

export function LoginForm() {
  const router = useRouter();
  const colors = useThemeColors();

  const {
    formState,
    errorMessage,
    magicLinkEmail,
    isSubmitting,
    control,
    errors,
    handlePasswordLogin,
    handleMagicLink,
    handleSocialError,
    resetToIdle,
    clearError,
  } = useLoginForm();

  if (formState === 'magicLinkSent' && magicLinkEmail) {
    return <MagicLinkSent email={magicLinkEmail} onBack={resetToIdle} />;
  }

  return (
    <View style={styles.container}>
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.login.emailLabel')}
              placeholder={t('auth.login.emailPlaceholder')}
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
            <InputField
              label={t('auth.login.passwordLabel')}
              placeholder={t('auth.login.passwordPlaceholder')}
              isPassword
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
              <TouchableOpacity
                onPress={() => onChange(!value)}
                style={styles.checkboxContainer}
                disabled={isSubmitting}
                accessibilityRole="checkbox"
                accessibilityLabel={t('auth.login.rememberMe')}
                accessibilityState={{ checked: value }}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.border,
                      backgroundColor: value ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {value && (
                    <Text style={{ color: colors.primaryForeground }}>✓</Text>
                  )}
                </View>
                <Text style={[typography.body, { color: colors.textSecondary }]}>
                  {t('auth.login.rememberMe')}
                </Text>
              </TouchableOpacity>
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

        <TouchableOpacity
          onPress={handlePasswordLogin}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              opacity: isSubmitting ? 0.5 : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={t('auth.login.submitButton')}
          accessibilityState={{ disabled: isSubmitting }}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[typography.button, { color: colors.primaryForeground }]}>
              {t('auth.login.submitButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

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
