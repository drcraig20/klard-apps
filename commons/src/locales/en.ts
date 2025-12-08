/**
 * English translations for Klard applications
 * Shared between web and mobile platforms
 */
export const en = {
  auth: {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your account",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      magicLinkButton: "Sign in with email link",
      submitButton: "Sign In",
      submitting: "Signing in...",
      orContinueWith: "or continue with",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      trustElement: "Privacy-first. No bank access required."
    },
    magicLink: {
      title: "Check your email",
      description: "We sent a login link to",
      backToLogin: "Back to login"
    },
    social: {
      google: "Google",
      apple: "Apple",
      error: "Failed to sign in with {{provider}}. Please try again."
    },
    signup: {
      title: "Create account",
      subtitle: "Start tracking your subscriptions",
      nameLabel: "Full name",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a password",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "Re-enter your password",
      termsLabel: "I agree to the Terms of Service and Privacy Policy",
      termsLink: "Terms of Service",
      privacyLink: "Privacy Policy",
      submitButton: "Create Account",
      submitting: "Creating account...",
      orContinueWith: "or continue with",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      trustElement: "Privacy-first. No bank access required.",
      passwordStrength: {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
      },
    },
    errors: {
      invalidCredentials: "Invalid email or password",
      magicLinkFailed: "Failed to send magic link",
      unexpectedError: "An unexpected error occurred",
      invalidEmailForMagicLink: "Please enter a valid email to receive a magic link",
      signupFailed: "Failed to create account",
      accountExists: "An account with this email already exists"
    }
  },
  dashboard: {
    title: "Dashboard",
    signOut: "Sign out",
    welcome: "Welcome back, {{name}}! Your subscription management dashboard is coming soon."
  },
  common: {
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close"
  },
  brand: {
    tagline: "Track. Detect. Protect."
  },
  navigation: {
    dashboard: "Dashboard",
    settings: "Settings",
    subscriptions: "Subscriptions",
    profile: "Profile"
  }
} as const;

export type TranslationKeys = typeof en;
