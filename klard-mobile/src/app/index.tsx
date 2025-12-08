import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/lib/auth-client';
import { Colors } from '@/constants/colors';

export default function IndexPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [session, isPending, router]);

  // Show loading state while checking session
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
});
