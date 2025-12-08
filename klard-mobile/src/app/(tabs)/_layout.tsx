import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useThemeColors } from '@/hooks';

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: 'Subscriptions',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Temporary placeholder - replace with proper icon component
function TabBarIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, string> = {
    home: '🏠',
    list: '📋',
    settings: '⚙️',
  };
  return <Text style={{ color, fontSize: 20 }}>{icons[name] || '•'}</Text>;
}