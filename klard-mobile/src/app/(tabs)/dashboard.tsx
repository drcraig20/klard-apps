import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSession, signOut } from '@/lib/auth-client';
import { Colors } from '@/constants/colors';

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/(auth)/login');
    }
  }, [session, isPending, router]);

  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/login');
  }

  // Show loading while checking session
  if (isPending) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Dashboard
        </Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={[styles.signOutText, { color: colors.textSecondary }]}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.welcome, { color: colors.foreground }]}>
          Welcome back, {session.user?.name ?? session.user?.email}!
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your subscription management dashboard is coming soon.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  signOutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
