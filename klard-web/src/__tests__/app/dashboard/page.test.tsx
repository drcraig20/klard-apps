import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DashboardPage from '@/app/dashboard/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('@/hooks/use-auth-redirect', () => ({
  useAuthRedirect: () => ({ isPending: false, isAuthenticated: true }),
}));

const mockSignOut = vi.fn();

vi.mock('@/lib/auth-client', () => ({
  signOut: (...args: unknown[]) => mockSignOut(...args),
  useSession: () => ({
    data: {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: '',
      },
    },
  }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, string>) => {
      if (key === 'dashboard.welcome' && options?.name) {
        return `Welcome, ${options.name}`;
      }
      return key;
    },
  }),
}));

describe('DashboardPage', () => {
  it('renders avatar with user initials when no image is provided', () => {
    render(<DashboardPage />);

    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="avatar-image"]')).not.toBeInTheDocument();
  });
});
