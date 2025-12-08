import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { Colors } from '@/constants/colors';
import { InputField } from './input-field';
import { SocialButtons } from './social-buttons';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

export function LoginForm() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

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

  async function onSubmit(data: LoginInput) {
    try {
      setFormState('submitting');
      setErrorMessage(null);

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid email or password');
      }

      // TODO: Check if user needs onboarding once custom user model is implemented
      // For now, always redirect to dashboard
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      setErrorMessage('Please enter a valid email to receive a magic link');
      setFormState('error');
      return;
    }

    try {
      setFormState('submitting');
      setErrorMessage(null);

      // Create a deep link URL that will open the app after magic link verification
      // This works for both Expo Go (exp://) and production builds (klard://)
      const callbackURL = Linking.createURL('(tabs)/dashboard');

      const result = await signIn.magicLink({
        email: validation.data.email,
        callbackURL,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send magic link');
      }

      setMagicLinkEmail(validation.data.email);
      setFormState('magicLinkSent');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send magic link'
      );
    }
  }

  function handleSocialError(error: string) {
    setErrorMessage(error);
    setFormState('error');
  }

  const isSubmitting = formState === 'submitting';

  if (formState === 'magicLinkSent') {
    return (
      <View style={styles.successContainer}>
        <View
          style={[
            styles.successIcon,
            { backgroundColor: colors.accentSuccess + '1A' },
          ]}
        >
          <Text style={{ color: colors.accentSuccess, fontSize: 32 }}>✓</Text>
        </View>
        <Text style={[styles.successTitle, { color: colors.foreground }]}>
          Check your email
        </Text>
        <Text style={[styles.successText, { color: colors.textSecondary }]}>
          We sent a login link to {magicLinkEmail}
        </Text>
        <TouchableOpacity onPress={() => setFormState('idle')}>
          <Text style={[styles.backLink, { color: colors.primary }]}>
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Error Banner */}
      {errorMessage && (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: colors.errorBackground,
              borderColor: colors.errorBorder,
            },
          ]}
        >
          <Text style={[styles.errorText, { color: colors.errorForeground }]}>
            {errorMessage}
          </Text>
          <TouchableOpacity onPress={() => setErrorMessage(null)}>
            <Text style={{ color: colors.errorForeground }}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Form */}
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Email"
              placeholder="you@example.com"
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

        <View style={{ height: 20 }} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Password"
              placeholder="Enter your password"
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

        {/* Remember me & Magic link */}
        <View style={styles.optionsRow}>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!value)}
                style={styles.checkboxContainer}
                disabled={isSubmitting}
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
                <Text style={[styles.checkboxLabel, { color: colors.textSecondary }]}>
                  Remember me
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={handleMagicLink}
            disabled={isSubmitting}
          >
            <Text style={[styles.magicLink, { color: colors.primary }]}>
              Sign in with email link
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
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
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[styles.submitText, { color: colors.primaryForeground }]}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textTertiary }]}>
          or continue with
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Sign up link */}
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: colors.textSecondary }]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={[styles.signupLink, { color: colors.primary }]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trust element */}
      <View style={styles.trustContainer}>
        <Text style={[styles.trustText, { color: colors.textTertiary }]}>
          🔒 Privacy-first. No bank access required.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  backLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
  form: {
    marginBottom: 32,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  magicLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  trustContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  trustText: {
    fontSize: 12,
  },
});
