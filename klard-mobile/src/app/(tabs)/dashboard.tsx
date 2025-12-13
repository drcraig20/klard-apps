import { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useThemeColors, useAuthRedirect } from '@/hooks';
import { LoadingScreen } from '@/components/common';
import { useSession } from '@/lib/auth-client';
import { typography } from '@/styles';
import { styles } from '@/styles/screens/dashboard.styles';
import { t } from '@/lib/i18n';

import {
  StatCard,
  TabBar,
  type TabItem,
  AlertBanner,
  SubscriptionCard,
  type SubscriptionData,
  Button,
  Avatar,
  EmptyState,
} from '@/components/ui';

// Mock data - in production this would come from API/state
const MOCK_SUBSCRIPTIONS: SubscriptionData[] = [
  {
    id: '1',
    name: 'Netflix',
    logoUrl: 'https://logo.clearbit.com/netflix.com',
    price: 15.99,
    currency: 'USD',
    billingCycle: 'monthly',
    status: 'active',
    nextBillingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'Entertainment',
  },
  {
    id: '2',
    name: 'Spotify',
    logoUrl: 'https://logo.clearbit.com/spotify.com',
    price: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    status: 'active',
    nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    category: 'Entertainment',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    price: 54.99,
    currency: 'USD',
    billingCycle: 'monthly',
    status: 'trial',
    nextBillingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    category: 'Productivity',
  },
];

const DASHBOARD_TABS: TabItem[] = [
  { value: 'all', label: t('dashboard.tabs.all') },
  { value: 'active', label: t('dashboard.tabs.active'), badge: 2 },
  { value: 'paused', label: t('dashboard.tabs.paused') },
  { value: 'expiring', label: t('dashboard.tabs.expiring'), badge: 1 },
];

export default function DashboardScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { isPending, isAuthenticated } = useAuthRedirect({ requireAuth: true });
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState('all');
  const [showWelcomeTip, setShowWelcomeTip] = useState(true);

  const handleSubscriptionPress = useCallback((subscription: SubscriptionData) => {
    router.push(`/subscriptions/${subscription.id}`);
  }, [router]);

  const handleAddSubscription = useCallback(() => {
    // TODO: Navigate to add subscription flow
  }, []);

  const handleCreateBurnerCard = useCallback(() => {
    // TODO: Navigate to create burner card flow
  }, []);

  if (isPending || !isAuthenticated) {
    return <LoadingScreen />;
  }

  const userName = session?.user?.name?.split(' ')[0] || 'there';
  const userInitials = session?.user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  // Filter subscriptions based on active tab
  const filteredSubscriptions = MOCK_SUBSCRIPTIONS.filter((sub) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return sub.status === 'active';
    if (activeTab === 'paused') return sub.status === 'paused';
    if (activeTab === 'expiring') return sub.status === 'trial';
    return true;
  });

  // Calculate stats
  const totalMonthlySpend = MOCK_SUBSCRIPTIONS
    .filter((s) => s.status === 'active' || s.status === 'trial')
    .reduce((sum, s) => sum + s.price, 0);
  const activeCount = MOCK_SUBSCRIPTIONS.filter((s) => s.status === 'active').length;
  const upcomingCount = MOCK_SUBSCRIPTIONS.filter(
    (s) => s.nextBillingDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={[styles.greeting, typography.h2, { color: colors.foreground }]}>
                {t('dashboard.greeting', { name: userName })}
              </Text>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                {t('dashboard.subtitle')}
              </Text>
            </View>
            <Avatar
              src={session?.user?.image ?? undefined}
              alt={session?.user?.name || 'User avatar'}
              fallback={userInitials}
              size="md"
            />
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <StatCard
                label={t('dashboard.stats.monthlySpend')}
                value={`$${totalMonthlySpend.toFixed(0)}`}
                trend={{ direction: 'down', value: '12%' }}
                icon={<Ionicons name="wallet-outline" size={20} color={colors.primary} />}
              />
            </View>
            <View style={styles.statCard}>
              <StatCard
                label={t('dashboard.stats.activeSubscriptions')}
                value={activeCount.toString()}
                icon={<Ionicons name="checkmark-circle-outline" size={20} color={colors.accentSuccess} />}
              />
            </View>
            <View style={styles.statCard}>
              <StatCard
                label={t('dashboard.stats.totalSavings')}
                value="$48"
                trend={{ direction: 'up', value: '$12' }}
                icon={<Ionicons name="trending-up-outline" size={20} color={colors.accentSuccess} />}
              />
            </View>
            <View style={styles.statCard}>
              <StatCard
                label={t('dashboard.stats.upcomingRenewals')}
                value={upcomingCount.toString()}
                muted={upcomingCount === 0}
                icon={<Ionicons name="calendar-outline" size={20} color={colors.accentWarning} />}
              />
            </View>
          </View>

          {/* Tab Bar */}
          <View style={styles.tabBarContainer}>
            <TabBar
              value={activeTab}
              onChange={setActiveTab}
              tabs={DASHBOARD_TABS}
            />
          </View>

          {/* Welcome Tip Alert */}
          {showWelcomeTip && (
            <View style={styles.alertContainer}>
              <AlertBanner
                type="info"
                size="compact"
                dismissible
                onDismiss={() => setShowWelcomeTip(false)}
              >
                {t('dashboard.alerts.welcomeTip')}
              </AlertBanner>
            </View>
          )}

          {/* Subscriptions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[typography.label, styles.sectionTitle, { color: colors.foreground }]}>
                {t('dashboard.sections.recentSubscriptions')}
              </Text>
              <Pressable onPress={() => router.push('/subscriptions')}>
                <Text style={[typography.label, styles.seeAll, { color: colors.primary }]}>
                  See all
                </Text>
              </Pressable>
            </View>

            {filteredSubscriptions.length > 0 ? (
              <View style={styles.subscriptionsList}>
                {filteredSubscriptions.map((subscription) => (
                  <SubscriptionCard
                    key={subscription.id}
                    subscription={subscription}
                    onPress={() => handleSubscriptionPress(subscription)}
                  />
                ))}
              </View>
            ) : (
              <EmptyState
                title={t('dashboard.empty.title')}
                description={t('dashboard.empty.description')}
                illustration="noData"
              />
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[typography.label, styles.sectionTitle, { color: colors.foreground }, { marginBottom: 12 }]}>
              {t('dashboard.sections.quickActions')}
            </Text>
            <View style={styles.actionsRow}>
              <Button
                variant="outline"
                style={styles.actionButton}
                icon={<Ionicons name="add-circle-outline" size={18} color={colors.primary} />}
                onPress={handleAddSubscription}
              >
                {t('dashboard.actions.addSubscription')}
              </Button>
              <Button
                variant="secondary"
                style={styles.actionButton}
                icon={<Ionicons name="card-outline" size={18} color={colors.secondaryForeground} />}
                onPress={handleCreateBurnerCard}
              >
                {t('dashboard.actions.createBurnerCard')}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
