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
      passkeyButton: "Sign in with Passkey",
      passkeyLoading: "Authenticating...",
      submitButton: "Sign In",
      submitting: "Signing in...",
      orContinueWith: "or continue with",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      trustElement: "Privacy-first. No bank access required."
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
      unexpectedError: "An unexpected error occurred",
      signupFailed: "Failed to create account",
      accountExists: "An account with this email already exists"
    }
  },
  dashboard: {
    title: "Dashboard",
    signOut: "Sign out",
    welcome: "Welcome back, {{name}}! Your subscription management dashboard is coming soon.",
    greeting: "Hey, {{name}}",
    subtitle: "Here's your subscription overview",
    stats: {
      monthlySpend: "Monthly Spend",
      activeSubscriptions: "Active",
      totalSavings: "Savings",
      upcomingRenewals: "Upcoming"
    },
    tabs: {
      all: "All",
      active: "Active",
      paused: "Paused",
      expiring: "Expiring Soon"
    },
    alerts: {
      welcomeTip: "Pro tip: Create a BurnerCard for trial subscriptions to auto-block charges.",
      trialExpiring: "{{name}} trial ends in {{days}} days. Cancel now to avoid charges."
    },
    actions: {
      addSubscription: "Add Subscription",
      createBurnerCard: "Create BurnerCard"
    },
    sections: {
      recentSubscriptions: "Recent Subscriptions",
      quickActions: "Quick Actions"
    },
    empty: {
      title: "No subscriptions yet",
      description: "Start tracking your subscriptions to see insights here."
    }
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
  },
  onboarding: {
    navigation: {
      skip: "Skip",
      next: "Next",
      getStarted: "Get Started"
    },
    welcome: {
      slides: {
        track: {
          headline: "Track all your subscriptions",
          body: "See every recurring payment in one place. Never forget a renewal date again."
        },
        protect: {
          headline: "Protect with BurnerCards",
          body: "Create virtual cards that auto-block unwanted charges. You control the rules."
        },
        save: {
          headline: "Save money automatically",
          body: "Get alerts on price increases and discover cheaper alternatives."
        }
      }
    },
    addSubscription: {
      stepIndicator: "Step 1 of 2 — Add your first subscription",
      headline: "What's your first subscription?",
      searchPlaceholder: "Search services...",
      labels: {
        price: "Price",
        billingCycle: "Billing Cycle",
        renewalDate: "Next Renewal Date",
        category: "Category",
        cancellationUrl: "Cancellation Link (optional)"
      },
      helperText: {
        autoFilled: "Auto-filled • Edit if incorrect",
        optional: "Optional"
      },
      billingCycles: {
        monthly: "Monthly",
        annual: "Annual"
      },
      buttons: {
        addSubscription: "Add Subscription",
        skipForNow: "Skip for now"
      },
      toast: {
        success: "{{serviceName}} added! You'll be reminded before it renews."
      }
    },
    burnerCardTutorial: {
      stepIndicator: "Step 2 of 2 — Protect your payments",
      headline: "Meet BurnerCards",
      body: "Create disposable virtual cards that protect you from unwanted charges. Set limits, expiry rules, and auto-block renewals.",
      features: [
        {
          title: "Block surprise renewals",
          description: "Stop charges before they happen"
        },
        {
          title: "Set expiry rules",
          description: "Cards auto-lock after trial periods"
        },
        {
          title: "Control spending limits",
          description: "Cap how much a service can charge"
        }
      ],
      buttons: {
        createBurnerCard: "Create Your First BurnerCard",
        exploreDashboard: "Explore Dashboard First"
      }
    }
  }
} as const;

export type TranslationKeys = typeof en;
