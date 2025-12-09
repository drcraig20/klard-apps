import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors, useAuthRedirect } from '@/hooks';
import { LoadingScreen } from '@/components/common';
import { signOut, useSession } from '@/lib/auth-client';
import { typography } from '@/styles';
import { styles } from '@/styles/screens/dashboard.styles';
import { t } from '@/lib/i18n';

export default function DashboardScreen() {
  const colors = useThemeColors();
  const { isPending, isAuthenticated } = useAuthRedirect({ requireAuth: true });
  const { data: session } = useSession();

  if (isPending || !isAuthenticated) {
    return <LoadingScreen />;
  }

  const userName = session?.user?.name || session?.user?.email || 'there';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, typography.h2, { color: colors.foreground }]}>
              {t('dashboard.welcome', { name: userName })}
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              {t('dashboard.title')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => signOut()}
            style={styles.signOutButton}
            accessibilityRole="button"
            accessibilityLabel={t('dashboard.signOut')}
          >
            <Text style={[typography.label, { color: colors.primary }]}>
              {t('dashboard.signOut')}
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
