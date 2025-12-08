import { Metadata } from 'next';
import { SignupForm } from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Sign Up | Klard',
  description: 'Create your Klard account to start tracking subscriptions',
};

export default function SignupPage() {
  return <SignupForm />;
}