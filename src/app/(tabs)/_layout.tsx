import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0B0A1A',
          borderTopColor: '#1A1930',
        },
        tabBarActiveTintColor: '#5D5FEF',
        tabBarInactiveTintColor: '#A0A0B0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Cours',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="entraide"
        options={{
          title: 'Entraide',
          tabBarIcon: ({ color }) => (
            <Ionicons name="hand-left-outline" size={24} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}
