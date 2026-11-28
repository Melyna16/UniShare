import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext'; // ✅ Added

export default function TabLayout() {
  const { colors } = useTheme();
  const { isAdminMode } = useUser(); // ✅ Check Admin

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textGray,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Cours',
          tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="entraide"
        options={{
          title: 'Entraide',
          tabBarIcon: ({ color }) => <Ionicons name="hand-left-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={24} color={color as string} />,
        }}
      />
      
      {/* ✅ NEW ADMIN TAB (Hidden if not Admin) */}
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          href: isAdminMode ? ('/admin' as any) : null, 
          tabBarIcon: ({ color }) => <Ionicons name="shield-checkmark-outline" size={24} color={color as string} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}