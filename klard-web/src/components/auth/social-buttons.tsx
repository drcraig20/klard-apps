'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { SocialButton } from '@/components/ui/social-button';
import { GoogleIcon, AppleIcon } from '@/components/ui/icons';

const SOCIAL_PROVIDERS = [
  { id: 'google', label: 'Google', icon: <GoogleIcon /> },
  { id: 'apple', label: 'Apple', icon: <AppleIcon /> },
] as const;

type ProviderId = typeof SOCIAL_PROVIDERS[number]['id'];

interface SocialButtonsProps {
  disabled?: boolean;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export function SocialButtons({ disabled, onError, onSuccess }: SocialButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<ProviderId | null>(null);

  async function handleSocialLogin(providerId: ProviderId) {
    try {
      setLoadingProvider(providerId);
      await signIn.social({ provider: providerId });
      onSuccess?.();
    } catch {
      onError?.(`Failed to sign in with ${providerId}. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="flex gap-4">
      {SOCIAL_PROVIDERS.map((provider) => (
        <SocialButton
          key={provider.id}
          provider={provider.label}
          icon={provider.icon}
          isLoading={loadingProvider === provider.id}
          disabled={disabled || loadingProvider !== null}
          onClick={() => handleSocialLogin(provider.id)}
        />
      ))}
    </div>
  );
}
