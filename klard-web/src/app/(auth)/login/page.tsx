import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Klard account to manage your subscriptions.',
};

export default function LoginPage() {
  return <LoginForm />;
}
