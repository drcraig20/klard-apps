import { useLocalSearchParams } from 'expo-router';
import { PlaceholderScreen } from '@/components/common';

export default function SubscriptionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <PlaceholderScreen
      title="Subscription Details"
      subtitle={`Details for subscription ${id} coming soon...`}
    />
  );
}
