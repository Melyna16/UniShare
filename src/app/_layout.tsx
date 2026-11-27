// src/app/_layout.tsx
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { UserProvider, useUser } from '../context/UserContext';
import { AnnouncementProvider } from '../context/AnnouncementContext';

// We separate the navigation logic into a child component
function RootLayoutNav() {
  const { isAuthenticated } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      // If not logged in and not in auth screens, redirect to login
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // If logged in and trying to access auth screens, redirect to home
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AnnouncementProvider>
          <RootLayoutNav />
        </AnnouncementProvider>
      </UserProvider>
    </ThemeProvider>
  );
}