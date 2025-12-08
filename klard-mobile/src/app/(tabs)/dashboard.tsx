import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors, useAuthRedirect } from '@/hooks';
import { LoadingScreen } from '@/components/common';
import { signOut } from '@/lib/auth-client';
import { typography } from '@/styles';
import { styles } from './dashboard.styles';

export default function DashboardScreen() {
  const colors = useThemeColors();
  const { session, isPending } = useAuthRedirect({ requireAuth: true });

  if (isPending || !session) {
    return <LoadingScreen />;
  }

  const userName = session.user?.name || session.user?.email || 'there';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, typography.h2, { color: colors.foreground }]}>
              Welcome back, {userName}!
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Your subscription dashboard
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => signOut()}
            style={styles.signOutButton}
            accessibilityRole="button"
            accessibilityLabel="Sign out"
          >
            <Text style={[typography.label, { color: colors.primary }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholder}>
          <Text style={[styles.placeholderText, typography.body, { color: colors.textSecondary }]}>
            Your subscription management features will appear here soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
