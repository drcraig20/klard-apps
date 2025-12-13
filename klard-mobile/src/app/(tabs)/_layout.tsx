import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks';
import { t } from '@/lib/i18n';
import { Platform } from 'react-native';

type IoniconsName = keyof typeof Ionicons.glyphMap;

interface TabBarIconProps {
  name: IoniconsName;
  color: string;
  focused: boolean;
}

function TabBarIcon({ name, color, focused }: Readonly<TabBarIconProps>) {
  return (
    <Ionicons
      name={name}
      size={24}
      color={color}
      style={{ marginBottom: Platform.OS === 'ios' ? -3 : 0 }}
    />
  );
}

export default function TabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t('navigation.dashboard'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: t('navigation.subscriptions'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'card' : 'card-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
