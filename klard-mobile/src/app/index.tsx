import { useAuthRedirect } from '@/hooks';
import { LoadingScreen } from '@/components/common';

export default function IndexPage() {
  useAuthRedirect({ requireAuth: false });

  return <LoadingScreen />;
}
